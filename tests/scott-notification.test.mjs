import {test} from 'node:test';
import assert from 'node:assert/strict';
import {eligible,createNotifier,mailFor} from '../app/api/internal-sms/inbound/email-notification.mjs';

const time=Date.parse('2026-11-03T12:00:00Z');
const holly='+15555550123',scott='+15555550125';
const fields={From:scott,To:'+12513335587',Body:'Synthetic Scott-only content',
  MessageSid:'SM'+'9'.repeat(32),AccountSid:'AC'+'2'.repeat(32),NumMedia:'0'};
const record={sid:fields.MessageSid,account_sid:fields.AccountSid,from:scott,
  to:fields.To,body:fields.Body,direction:'inbound',date_created:new Date(time).toISOString(),num_media:'0'};
const config={now:()=>time,hollyNumber:()=>holly,scottEnabled:()=>true,scottNumber:()=>scott};

test('Scott is default-off and independently enabled without changing existing participants',()=>{
  assert.equal(eligible(fields),false);
  for(const enabled of [undefined,null,false,'true','TRUE',1])
    assert.equal(eligible(fields,false,holly,enabled,scott),false);
  for(const hollyEnabled of [false,true])for(const scottEnabled of [false,true]) {
    assert.equal(eligible(fields,hollyEnabled,holly,scottEnabled,scott),scottEnabled);
    assert.equal(eligible({...fields,From:holly},hollyEnabled,holly,scottEnabled,scott),hollyEnabled);
    for(const From of ['+12517860538','+12512344861'])
      assert.equal(eligible({...fields,From,NumMedia:'1'},hollyEnabled,holly,scottEnabled,scott),true);
  }
  assert.equal(eligible(fields,false,undefined,true,scott),true);
  assert.equal(eligible({...fields,From:holly},true,holly,true,undefined),true);
});

test('Scott requires an exact valid non-owner number and cannot occupy Holly’s binding',()=>{
  for(const number of [undefined,'',' '+scott,scott+' ',[scott],
    '+12517860538','+12512344861','+12513335587',holly,'15555550125',
    '+05555550125','+15555550125000000','+15555550126'])
    assert.equal(eligible(fields,false,holly,true,number),false);
  for(const From of ['+15555550126','15555550125','Scott','+16155550123'])
    assert.equal(eligible({...fields,From},false,holly,true,scott),false);
  assert.equal(eligible({...fields,From:holly},false,holly,true,holly),false);
  assert.equal(eligible({...fields,From:holly},true,holly,true,holly),true);
  for(const patch of [{To:'+15555550999'},{MessageSid:'invalid'}])
    assert.equal(eligible({...fields,...patch},false,holly,true,scott),false);
});

test('disabled, unlisted and media-bearing Scott events perform no provider or mail I/O',async()=>{
  let reads=0,sends=0;
  const io={readMessage:async()=>{reads++;return record;},sendMail:async()=>{sends++;}};
  const disabled=createNotifier({...config,...io,scottEnabled:()=>false});
  assert.equal(await disabled(fields),'ignored');
  const notify=createNotifier({...config,...io});
  for(const patch of [{From:'+15555550126'},...['1','2','00',undefined,0].map(NumMedia=>({NumMedia}))])
    assert.equal(await notify({...fields,...patch}),'ignored');
  assert.equal(reads,0);assert.equal(sends,0);
});

test('Scott controls cannot create AI notifications',async()=>{
  let calls=0;
  const notify=createNotifier({...config,readMessage:async()=>{calls++;return record;},sendMail:async()=>{calls++;}});
  for(const Body of ['STOP','STOPALL','UNSUBSCRIBE','CANCEL','END','QUIT','REVOKE','OPTOUT','HELP','INFO','START'])
    assert.equal(await notify({...fields,Body:' '+Body.toLowerCase()+' '}),'ignored');
  for(const OptOutType of ['STOP','HELP','START'])
    assert.equal(await notify({...fields,OptOutType}),'ignored');
  assert.equal(calls,0);
});

test('Scott original-record identity, ownership, content, media and age are verified before email',async()=>{
  for(const changed of [
    {sid:'SM'+'a'.repeat(32)},{from:holly},{from:'+12517860538'},{from:'+12512344861'},
    {to:'+15555550999'},{account_sid:'AC'+'3'.repeat(32)},{direction:'outbound-api'},
    {body:'changed'},{num_media:'1'},{date_created:new Date(time-600001).toISOString()},
    {date_created:new Date(time+30001).toISOString()},{date_created:'invalid'},
  ]) {
    let sends=0;
    const notify=createNotifier({...config,readMessage:async()=>({...record,...changed}),sendMail:async()=>{sends++;}});
    assert.equal(await notify(fields),'skipped');assert.equal(sends,0);
  }
  const mails=[];
  const notify=createNotifier({...config,readMessage:async()=>record,sendMail:async mail=>mails.push(mail)});
  assert.equal(await notify(fields),'accepted');
  assert.deepEqual(mails,[mailFor(fields.MessageSid)]);
  for(const value of [fields.Body,fields.From,fields.To,fields.AccountSid])
    assert.equal(JSON.stringify(mails).includes(value),false);
});

test('Scott admission is rechecked after the awaited provider read',async()=>{
  for(const change of ['disable','renumber','reserve-for-holly']) {
    let enabled=true,number=scott,hollyBinding=holly,sends=0;
    const notify=createNotifier({...config,scottEnabled:()=>enabled,scottNumber:()=>number,
      hollyNumber:()=>hollyBinding,readMessage:async()=>{
        if(change==='disable')enabled=false;
        if(change==='renumber')number='+15555550126';
        if(change==='reserve-for-holly')hollyBinding=scott;
        return record;
      },sendMail:async()=>{sends++;}});
    assert.equal(await notify(fields),'ignored');assert.equal(sends,0);
  }
});

test('Scott concurrent duplicates and uncertain attempts never create a second email attempt',async()=>{
  for(const failAt of ['none','read','mail']) {
    let reads=0,sends=0;
    const notify=createNotifier({...config,readMessage:async()=>{
      reads++;if(failAt==='read')throw Error('synthetic read uncertainty');return record;
    },sendMail:async()=>{sends++;if(failAt==='mail')throw Error('synthetic mail uncertainty');}});
    assert.deepEqual(await Promise.all([notify(fields),notify(fields)]),
      [failAt==='none'?'accepted':'unconfirmed','duplicate']);
    assert.equal(await notify(fields),'duplicate');
    assert.equal(reads,1);assert.equal(sends,failAt==='read'?0:1);
  }
});
