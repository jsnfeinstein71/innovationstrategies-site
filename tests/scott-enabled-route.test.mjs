import {test,mock} from 'node:test';
import assert from 'node:assert/strict';
import {createHmac} from 'node:crypto';
const pending=[],mails=[];
mock.module('next/server.js',{namedExports:{after:callback=>pending.push(callback)}});
mock.module('nodemailer',{defaultExport:{createTransport:()=>({
  sendMail:async mail=>{mails.push(mail);return {accepted:[mail.to]};},close(){},
})}});
const {POST}=await import('../app/api/internal-sms/inbound/route.ts');

test('Scott runtime wiring keeps exact flag, signature, controls and original sender checks',async()=>{
  const keys=['TWILIO_AUTH_TOKEN','TWILIO_ACCOUNT_SID','CARLA_SMS_EMAIL_ENABLED',
    'CARLA_GMAIL_APP_PASSWORD','CARLA_SMS_HOLLY_ENABLED','CARLA_SMS_HOLLY_NUMBER',
    'CARLA_SMS_SCOTT_ENABLED','CARLA_SMS_SCOTT_NUMBER'];
  const original=Object.fromEntries(keys.map(key=>[key,process.env[key]]));
  const previousFetch=globalThis.fetch,previousInfo=console.info;
  const holly='+15555550123',scott='+15555550125';
  process.env.TWILIO_AUTH_TOKEN='synthetic-token';
  process.env.TWILIO_ACCOUNT_SID='AC'+'2'.repeat(32);
  process.env.CARLA_SMS_EMAIL_ENABLED='true';
  process.env.CARLA_GMAIL_APP_PASSWORD='synthetic-password';
  process.env.CARLA_SMS_HOLLY_ENABLED='false';
  process.env.CARLA_SMS_HOLLY_NUMBER=holly;
  process.env.CARLA_SMS_SCOTT_NUMBER=scott;
  const url='https://www.innovationstrategies.pro/api/internal-sms/inbound';
  const fields={From:scott,To:'+12513335587',Body:'Synthetic Scott private text',
    MessageSid:'SM'+'b'.repeat(32),AccountSid:process.env.TWILIO_ACCOUNT_SID,NumMedia:'0'};
  const records=new Map();let reads=0;
  const request=(patch={},tamper)=>{
    const values={...fields,...patch};
    records.set(values.MessageSid,{sid:values.MessageSid,account_sid:values.AccountSid,
      from:values.From,to:values.To,body:values.Body,num_media:values.NumMedia,
      direction:'inbound',date_created:new Date().toISOString()});
    const signature=createHmac('sha1',process.env.TWILIO_AUTH_TOKEN)
      .update(url+Object.keys(values).sort().map(k=>k+values[k]).join('')).digest('base64');
    return new Request(url,{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded',
      'x-twilio-signature':signature},body:new URLSearchParams(tamper?{...values,...tamper}:values)});
  };
  globalThis.fetch=async input=>{
    reads++;const sid=new URL(input).pathname.split('/').at(-1).replace(/\.json$/,'');
    assert.ok(records.has(sid));return Response.json(records.get(sid));
  };
  console.info=()=>{};
  try {
    for(const flag of [undefined,'false','TRUE','1',' true ']) {
      if(flag===undefined)delete process.env.CARLA_SMS_SCOTT_ENABLED;
      else process.env.CARLA_SMS_SCOTT_ENABLED=flag;
      assert.equal((await POST(request())).status,200);
      assert.equal(pending.length,0);
    }
    process.env.CARLA_SMS_SCOTT_ENABLED='true';
    delete process.env.CARLA_SMS_SCOTT_NUMBER;
    assert.equal((await POST(request())).status,200);assert.equal(pending.length,0);
    process.env.CARLA_SMS_SCOTT_NUMBER=scott;
    for(const patch of [{From:'+15555550126'},{Body:'STOP'},{Body:'HELP'},
      {Body:'START'},{OptOutType:'STOP'},{OptOutType:'HELP'},{OptOutType:'START'},{NumMedia:'1'}])
      assert.equal((await POST(request(patch))).status,200);
    assert.equal((await POST(request({}, {Body:'tampered'}))).status,403);
    assert.equal((await POST(request({AccountSid:'AC'+'3'.repeat(32)}))).status,403);
    assert.equal((await POST(request({To:'+15555550999'}))).status,403);
    assert.equal(pending.length,0);assert.equal(reads,0);assert.equal(mails.length,0);

    const response=await POST(request());
    assert.equal(response.status,200);
    assert.match(await response.text(),/Innovation Strategies: Message received\. Reply STOP/);
    assert.equal(pending.length,1);assert.equal(mails.length,0);
    await pending[0]();assert.equal(reads,1);assert.equal(mails.length,1);
    assert.equal(mails[0].subject,`CARLA_SMS_WAKE_V1 ${fields.MessageSid}`);
    for(const value of [fields.Body,scott,fields.To,fields.AccountSid])
      assert.equal(JSON.stringify(mails).includes(value),false);

    process.env.CARLA_SMS_SCOTT_ENABLED='false';
    process.env.CARLA_SMS_HOLLY_ENABLED='true';
    const hollySid='SM'+'c'.repeat(32);
    assert.equal((await POST(request({From:holly,MessageSid:hollySid}))).status,200);
    assert.equal(pending.length,2);await pending[1]();
    assert.equal(reads,2);assert.equal(mails.length,2);
    assert.equal(mails[1].subject,`CARLA_SMS_WAKE_V1 ${hollySid}`);
    assert.equal((await POST(request({MessageSid:'SM'+'d'.repeat(32)}))).status,200);
    assert.equal(pending.length,2);
  } finally {
    globalThis.fetch=previousFetch;console.info=previousInfo;
    for(const key of keys) {
      if(original[key]===undefined)delete process.env[key];else process.env[key]=original[key];
    }
  }
});
