import {test,mock} from 'node:test';
import assert from 'node:assert/strict';
import {createHmac} from 'node:crypto';
const pending=[],mails=[];
mock.module('next/server.js',{namedExports:{after:callback=>pending.push(callback)}});
mock.module('nodemailer',{defaultExport:{createTransport:()=>({
  sendMail:async mail=>{mails.push(mail);return {accepted:[mail.to]};},close(){},
})}});
const {POST}=await import('../app/api/internal-sms/inbound/route.ts');

test('Holly runtime switch defaults off and permits only her signed original when explicitly enabled',async()=>{
  const keys=['TWILIO_AUTH_TOKEN','TWILIO_ACCOUNT_SID','CARLA_SMS_EMAIL_ENABLED','CARLA_GMAIL_APP_PASSWORD','CARLA_SMS_HOLLY_ENABLED','CARLA_SMS_HOLLY_NUMBER'];
  const original=Object.fromEntries(keys.map(key=>[key,process.env[key]]));
  process.env.TWILIO_AUTH_TOKEN='synthetic-token';
  process.env.TWILIO_ACCOUNT_SID='AC'+'2'.repeat(32);
  process.env.CARLA_SMS_EMAIL_ENABLED='true';
  process.env.CARLA_GMAIL_APP_PASSWORD='synthetic-password';
  delete process.env.CARLA_SMS_HOLLY_ENABLED;
  const url='https://www.innovationstrategies.pro/api/internal-sms/inbound';
  const fields={From:'+15555550123',To:'+12513335587',Body:'Synthetic private Holly content',
    MessageSid:'SM'+'7'.repeat(32),AccountSid:process.env.TWILIO_ACCOUNT_SID,NumMedia:'0'};
  const request=(patch={})=>{
    const values={...fields,...patch};
    const signature=createHmac('sha1',process.env.TWILIO_AUTH_TOKEN)
      .update(url+Object.keys(values).sort().map(k=>k+values[k]).join('')).digest('base64');
    return new Request(url,{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded',
      'x-twilio-signature':signature},body:new URLSearchParams(values)});
  };
  const previousFetch=globalThis.fetch,previousInfo=console.info;
  let reads=0;
  globalThis.fetch=async()=>{reads++;return Response.json({sid:fields.MessageSid,
    account_sid:fields.AccountSid,from:fields.From,to:fields.To,body:fields.Body,
    num_media:'0',direction:'inbound',date_created:new Date().toISOString()});};
  console.info=()=>{};
  try {
    assert.equal((await POST(request())).status,200);
    assert.equal(pending.length,0);
    process.env.CARLA_SMS_HOLLY_ENABLED='true';
    delete process.env.CARLA_SMS_HOLLY_NUMBER;
    assert.equal((await POST(request())).status,200);
    assert.equal(pending.length,0);
    process.env.CARLA_SMS_HOLLY_NUMBER=fields.From;
    for(const patch of [{From:'+15555550124'},{Body:'STOP'},{OptOutType:'STOP'},{NumMedia:'1'}])
      assert.equal((await POST(request(patch))).status,200);
    assert.equal(pending.length,0);
    assert.equal((await POST(request())).status,200);
    assert.equal(pending.length,1);
    assert.equal(mails.length,0);
    await pending[0]();
    assert.equal(reads,1);assert.equal(mails.length,1);
    assert.equal(mails[0].subject,`CARLA_SMS_WAKE_V1 ${fields.MessageSid}`);
    assert.equal(JSON.stringify(mails).includes(fields.Body),false);
    assert.equal(JSON.stringify(mails).includes(fields.From),false);
  } finally {
    globalThis.fetch=previousFetch;console.info=previousInfo;
    for(const key of keys) {
      if(original[key]===undefined)delete process.env[key];else process.env[key]=original[key];
    }
  }
});
