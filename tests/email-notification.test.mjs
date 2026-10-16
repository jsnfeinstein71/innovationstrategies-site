import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createNotifier,mailFor,smtpOptions,eligible,deliverMail,SENDER,RECIPIENT} from '../app/api/internal-sms/inbound/email-notification.mjs';
import {EventEmitter} from 'node:events';
const time=Date.parse('2026-10-16T21:00:00Z');
const fields={From:'+12517860538',To:'+12513335587',Body:'Private SMS text',MessageSid:'SM'+'1'.repeat(32),AccountSid:'AC'+'2'.repeat(32),NumMedia:'0'};
const record={sid:fields.MessageSid,account_sid:fields.AccountSid,from:fields.From,to:fields.To,body:fields.Body,direction:'inbound',date_created:new Date(time).toISOString(),num_media:'0'};

test('fixed email exposes only marker and validated SID, never SMS content or phone numbers',()=>{
  const mail=mailFor(fields.MessageSid);assert.equal(mail.from,SENDER);assert.equal(mail.to,RECIPIENT);
  for(const value of [fields.Body,fields.From,fields.To,fields.AccountSid])assert.ok(!JSON.stringify(mail).includes(value));
  assert.deepEqual(mailFor(fields.MessageSid),mail);assert.throws(()=>mailFor('x\r\nBcc: attacker'));
});
test('unlisted sender and every opt-out/help/start form cannot notify',()=>{
  for(const Body of ['STOP','STOPALL','UNSUBSCRIBE','CANCEL','END','QUIT','REVOKE','OPTOUT','HELP','INFO','START'])assert.equal(eligible({...fields,Body:' '+Body.toLowerCase()+' '}),false);
  for(const OptOutType of ['STOP','HELP','START'])assert.equal(eligible({...fields,OptOutType}),false);
  assert.equal(eligible({...fields,From:'+16155550123'}),false);
  assert.equal(eligible({...fields,To:'+18555550123'}),false);
});
test('both allowed senders notify only when the Twilio record matches the signed sender',async()=>{
  const senders=['+12517860538','+12512344861'];
  for(const From of senders){
    const incoming={...fields,From};
    assert.equal(eligible(incoming),true);
    for(const from of senders){
      const mails=[];
      const notify=createNotifier({now:()=>time,readMessage:async()=>({...record,from}),sendMail:async mail=>mails.push(mail)});
      assert.equal(await notify(incoming),from===From?'accepted':'skipped');
      assert.equal(mails.length,from===From?1:0);
      if(mails.length)assert.deepEqual(mails[0],mailFor(fields.MessageSid));
    }
    for(const Body of ['STOP','STOPALL','UNSUBSCRIBE','CANCEL','END','QUIT','REVOKE','OPTOUT','HELP','INFO','START'])assert.equal(eligible({...incoming,Body}),false);
    for(const OptOutType of ['STOP','HELP','START'])assert.equal(eligible({...incoming,OptOutType}),false);
  }
});

test('concurrent replays cause one warm-instance attempt',async()=>{
  let reads=0,sends=0;const notify=createNotifier({now:()=>time,readMessage:async()=>{reads++;return record;},sendMail:async()=>{sends++;}});
  const result=await Promise.all([notify(fields),notify(fields),notify(fields)]);
  assert.deepEqual(result,['accepted','duplicate','duplicate']);assert.equal(reads,1);assert.equal(sends,1);
});
test('old, outbound, forged and mismatching Twilio records cannot send',async()=>{
  for(const changed of [{date_created:new Date(time-600001).toISOString()},{direction:'outbound-api'},{account_sid:'AC'+'9'.repeat(32)},{body:'changed'},{from:'+16155550123'},{num_media:'1'}]){
    let sends=0;const notify=createNotifier({now:()=>time,readMessage:async()=>({...record,...changed}),sendMail:async()=>{sends++;}});
    assert.equal(await notify(fields),'skipped');assert.equal(sends,0);
  }
});
test('uncertain SMTP delivery is sanitized and not automatically retried',async()=>{
  const reports=[];let sends=0;const notify=createNotifier({now:()=>time,readMessage:async()=>record,sendMail:async()=>{sends++;throw Error('SECRET provider response');},report:s=>reports.push(s)});
  assert.equal(await notify(fields),'unconfirmed');assert.equal(await notify(fields),'duplicate');
  assert.equal(sends,1);assert.deepEqual(reports,['unconfirmed']);
});
test('SMTP transport verifies TLS with fixed destination, bounded timeouts and logging off',()=>{
  const options=smtpOptions('synthetic-only');assert.equal(options.host,'smtp.gmail.com');assert.equal(options.port,465);
  assert.equal(options.secure,true);assert.equal(options.tls.rejectUnauthorized,true);assert.equal(options.logger,false);assert.equal(options.debug,false);assert.equal(options.auth.user,SENDER);
});
test('overall SMTP deadline destroys the active TLS socket and closes transport',async()=>{
  let destroyed=false,closed=false,options;
  const socket=new EventEmitter();socket.destroy=()=>{destroyed=true;};
  const nodemailer={createTransport:o=>{options=o;return {sendMail:()=>{o.getSocket({},()=>{});return new Promise(()=>{});},close:()=>{closed=true;}};}};
  await assert.rejects(deliverMail(mailFor(fields.MessageSid),{nodemailer,password:'synthetic',timeoutMs:5,connect:o=>{assert.equal(o.rejectUnauthorized,true);assert.equal(o.servername,'smtp.gmail.com');return socket;}}));
  assert.equal(destroyed,true);assert.equal(closed,true);assert.equal(options.logger,false);
});
