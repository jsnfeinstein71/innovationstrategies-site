import {test,mock} from 'node:test';
import assert from 'node:assert/strict';
import {createHmac} from 'node:crypto';
const pending=[],mails=[];
mock.module('next/server.js',{namedExports:{after:callback=>pending.push(callback)}});
mock.module('nodemailer',{defaultExport:{createTransport:()=>({sendMail:async mail=>{mails.push(mail);throw Error('private provider error');},close(){}})}});
const {POST}=await import('../app/api/internal-sms/inbound/route.ts');
test('enabled route acknowledges before background work; failures and duplicates do not change ACK',async()=>{
  process.env.TWILIO_AUTH_TOKEN='synthetic-token';process.env.TWILIO_ACCOUNT_SID='AC'+'2'.repeat(32);
  process.env.CARLA_SMS_EMAIL_ENABLED='true';process.env.CARLA_GMAIL_APP_PASSWORD='synthetic-password';
  const url='https://www.innovationstrategies.pro/api/internal-sms/inbound';
  const fields={From:'+12517860538',To:'+12513335587',Body:'Private content',MessageSid:'SM'+'3'.repeat(32),AccountSid:process.env.TWILIO_ACCOUNT_SID,NumMedia:'0'};
  const signature=createHmac('sha1',process.env.TWILIO_AUTH_TOKEN).update(url+Object.keys(fields).sort().map(k=>k+fields[k]).join('')).digest('base64');
  const request=()=>new Request(url,{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded','x-twilio-signature':signature},body:new URLSearchParams(fields)});
  const previousFetch=globalThis.fetch,previousInfo=console.info,logs=[];
  console.info=(...args)=>logs.push(args);
  globalThis.fetch=async()=>Response.json({sid:fields.MessageSid,account_sid:fields.AccountSid,from:fields.From,to:fields.To,body:fields.Body,num_media:'0',direction:'inbound',date_created:new Date().toISOString()});
  try {
    for(let i=0;i<2;i++){
      const response=await POST(request());assert.equal(response.status,200);assert.match(await response.text(),/Message received/);
    }
    assert.equal(mails.length,0);assert.equal(pending.length,2);
    await Promise.all(pending.map(callback=>callback()));assert.equal(mails.length,1);
    assert.ok(!JSON.stringify(logs).includes('private provider error'));
    assert.ok(!JSON.stringify(mails).includes(fields.Body));
  }finally{globalThis.fetch=previousFetch;console.info=previousInfo;}
});
