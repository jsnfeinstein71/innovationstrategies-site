import {test} from 'node:test';
import assert from 'node:assert/strict';
import {eligible,createNotifier,mailFor} from '../app/api/internal-sms/inbound/email-notification.mjs';

const time=Date.parse('2026-11-03T12:00:00Z');
const holly='+15555550123';
const fields={From:holly,To:'+12513335587',Body:'Synthetic Holly-only message',
  MessageSid:'SM'+'8'.repeat(32),AccountSid:'AC'+'2'.repeat(32),NumMedia:'0'};
const record={sid:fields.MessageSid,account_sid:fields.AccountSid,from:holly,
  to:fields.To,body:fields.Body,direction:'inbound',date_created:new Date(time).toISOString(),num_media:'0'};

test('Holly is default-off; only exact true admits the one exact number',()=>{
  assert.equal(eligible(fields),false);
  for(const enabled of [undefined,null,false,'true',1]) assert.equal(eligible(fields,enabled,holly),false);
  assert.equal(eligible(fields,true,holly),true);
  for(const From of ['+15555550124','15555550123','Holly','+16155550123'])
    assert.equal(eligible({...fields,From},true,holly),false);
  for(const From of ['+12517860538','+12512344861'])
    assert.equal(eligible({...fields,From}),true);
  for(const NumMedia of ['1','2',undefined])assert.equal(eligible({...fields,NumMedia},true,holly),false);
  for(const From of ['+12517860538','+12512344861'])
    assert.equal(eligible({...fields,From,NumMedia:'1'}),true);
});

test('disabled Holly and unknown senders cannot read a provider record or send email',async()=>{
  let calls=0;
  const notify=createNotifier({readMessage:async()=>{calls++;return record;},sendMail:async()=>{calls++;}});
  assert.equal(await notify(fields),'ignored');
  assert.equal(await notify({...fields,From:'+16155550123'}),'ignored');
  const enabled=createNotifier({hollyEnabled:()=>true,hollyNumber:()=>holly,readMessage:async()=>{calls++;return record;},sendMail:async()=>{calls++;}});
  assert.equal(await enabled({...fields,From:'+15555550124'}),'ignored');
  assert.equal(await enabled({...fields,NumMedia:'1'}),'ignored');
  assert.equal(calls,0);
});

test('Holly requires one valid server-configured number and cannot replace an existing identity',()=>{
  for(const number of [undefined,'',' '+holly,holly+' ',['+15555550123'],
    '+12517860538','+12512344861','+12513335587','15555550123','+15555550124'])
    assert.equal(eligible(fields,true,number),false);
  for(const From of ['+12517860538','+12512344861'])
    assert.equal(eligible({...fields,From},true,undefined),true);
});

test('changing the configured number during verification prevents a pending Holly notification',async()=>{
  let number=holly,sends=0;
  const notify=createNotifier({now:()=>time,hollyEnabled:()=>true,hollyNumber:()=>number,
    readMessage:async()=>{number='+15555550124';return record;},sendMail:async()=>{sends++;}});
  assert.equal(await notify(fields),'ignored');assert.equal(sends,0);
});

test('Holly notification verifies exact original sender and emits only the SID',async()=>{
  for(const from of [holly,'+12517860538','+12512344861','+16155550123']) {
    const mails=[];
    const notify=createNotifier({now:()=>time,hollyEnabled:()=>true,hollyNumber:()=>holly,
      readMessage:async()=>({...record,from}),sendMail:async mail=>mails.push(mail)});
    assert.equal(await notify(fields),from===holly?'accepted':'skipped');
    assert.equal(mails.length,from===holly?1:0);
    if(mails.length) {
      assert.deepEqual(mails[0],mailFor(fields.MessageSid));
      for(const privateValue of [fields.Body,holly,fields.To,fields.AccountSid])
        assert.equal(JSON.stringify(mails[0]).includes(privateValue),false);
    }
  }
});

test('Holly STOP, HELP and START controls never schedule an AI notification',async()=>{
  let calls=0;
  const notify=createNotifier({hollyEnabled:()=>true,hollyNumber:()=>holly,readMessage:async()=>{calls++;return record;},sendMail:async()=>{calls++;}});
  for(const Body of ['STOP','STOPALL','UNSUBSCRIBE','CANCEL','END','QUIT','REVOKE','OPTOUT','HELP','INFO','START'])
    assert.equal(await notify({...fields,Body:' '+Body.toLowerCase()+' '}),'ignored');
  for(const OptOutType of ['STOP','HELP','START'])
    assert.equal(await notify({...fields,OptOutType}),'ignored');
  assert.equal(calls,0);
});

test('disabling Holly during provider verification prevents the pending email',async()=>{
  let enabled=true,sends=0;
  const notify=createNotifier({now:()=>time,hollyEnabled:()=>enabled,hollyNumber:()=>holly,
    readMessage:async()=>{enabled=false;return record;},sendMail:async()=>{sends++;}});
  assert.equal(await notify(fields),'ignored');
  assert.equal(sends,0);
});

test('Holly concurrent duplicate notifications make one attempt; uncertain SMTP is not retried',async()=>{
  let reads=0,sends=0;
  const notify=createNotifier({now:()=>time,hollyEnabled:()=>true,hollyNumber:()=>holly,
    readMessage:async()=>{reads++;return record;},sendMail:async()=>{sends++;throw Error('synthetic uncertainty');}});
  assert.deepEqual(await Promise.all([notify(fields),notify(fields)]),['unconfirmed','duplicate']);
  assert.equal(await notify(fields),'duplicate');
  assert.equal(reads,1);assert.equal(sends,1);
});
