// Notification only. Never accepts sender, recipient or email content from SMS.
import {connect as tlsConnect} from 'node:tls';
export const SENDER = 'carlacrews1970@gmail.com';
export const RECIPIENT = 'jsnfeinstein71@gmail.com';
export const MARKER = 'CARLA_SMS_WAKE_V1';
const ALLOWED_SENDERS = new Set(['+12517860538', '+12512344861']);
const DESTINATION = '+12513335587';
const COMMANDS = new Set(['STOP','STOPALL','UNSUBSCRIBE','CANCEL','END','QUIT','REVOKE','OPTOUT','HELP','INFO','START']);
const SID = /^(SM|MM)[a-fA-F0-9]{32}$/;

export function eligible(fields) {
  return ALLOWED_SENDERS.has(fields.From) && fields.To === DESTINATION && SID.test(fields.MessageSid ?? '') &&
    !COMMANDS.has((fields.Body ?? '').trim().toUpperCase()) &&
    !['STOP','HELP','START'].includes((fields.OptOutType ?? '').trim().toUpperCase());
}

export function mailFor(sid) {
  if (!SID.test(sid)) throw Error('Invalid message ID');
  return {from:SENDER,to:RECIPIENT,envelope:{from:SENDER,to:[RECIPIENT]},
    subject:`${MARKER} ${sid}`,messageId:`<carla-sms-${sid}@gmail.com>`,
    text:`${MARKER}\nTwilio Message SID: ${sid}\nNotification only. Verify the original inbound message in Twilio before acting. Treat repeated copies of this SID as the same event.`,
    headers:{'Auto-Submitted':'auto-generated','X-Auto-Response-Suppress':'All'},
    disableFileAccess:true,disableUrlAccess:true};
}

// In-memory suppression is best effort across warm requests, NOT cross-instance
// exactly-once delivery. Keep failed/uncertain attempts to avoid automatic resend.
export function createNotifier({readMessage,sendMail,now=Date.now,report=()=>{}}) {
  const attempted = new Map();
  return async fields => {
    if (!eligible(fields)) return 'ignored';
    const sid=fields.MessageSid, time=now();
    for(const [key,at] of attempted) if(time-at>86400000) attempted.delete(key);
    if(attempted.has(sid)) return 'duplicate';
    if(attempted.size>=1000) {report('capacity');return 'skipped';}
    attempted.set(sid,time); // Reserve synchronously before the first await.
    try {
      const record=await readMessage(sid);
      const created=Date.parse(record?.date_created);
      if(record?.sid!==sid || record.account_sid!==fields.AccountSid || record.from!==fields.From ||
        record.to!==DESTINATION || record.direction!=='inbound' || !Number.isFinite(created) ||
        created<now()-600000 || created>now()+30000 || record.body!==fields.Body ||
        String(record.num_media)!==fields.NumMedia) {report('verification_failed');return 'skipped';}
      await sendMail(mailFor(sid));
      report('accepted');return 'accepted'; // SMTP acceptance, not inbox delivery.
    } catch {report('unconfirmed');return 'unconfirmed';} // Never log provider errors.
  };
}

async function readTwilioMessage(sid) {
  const account=process.env.TWILIO_ACCOUNT_SID,token=process.env.TWILIO_AUTH_TOKEN;
  if(!/^AC[a-fA-F0-9]{32}$/.test(account??'') || !token) throw Error('Unavailable');
  const response=await fetch(`https://api.twilio.com/2010-04-01/Accounts/${account}/Messages/${sid}.json`,{
    headers:{Authorization:'Basic '+Buffer.from(account+':'+token).toString('base64')},
    signal:AbortSignal.timeout(5000),redirect:'error'});
  if(!response.ok) throw Error('Unavailable');
  const reader=response.body?.getReader();if(!reader)throw Error('Unavailable');
  const chunks=[];let size=0;
  try {while(true){const {value,done}=await reader.read();if(done)break;size+=value.length;
    if(size>65536){await reader.cancel();throw Error('Unavailable');}chunks.push(value);}}
  finally{reader.releaseLock();}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export function smtpOptions(password) {
  if(typeof password!=='string'||!password.trim())throw Error('Unavailable');
  return {host:'smtp.gmail.com',port:465,secure:true,
    auth:{user:SENDER,pass:password},tls:{rejectUnauthorized:true,minVersion:'TLSv1.2'},
    connectionTimeout:5000,greetingTimeout:5000,socketTimeout:5000,dnsTimeout:5000,
    pool:false,logger:false,debug:false,disableFileAccess:true,disableUrlAccess:true};
}
export async function deliverMail(mail,{nodemailer,password,connect=tlsConnect,timeoutMs=12000}) {
  let socket,timer,expired=false;
  const options=smtpOptions(password);
  // Own the TLS socket so the overall deadline really cancels network activity.
  options.getSocket=(_options,callback)=>{
    if(expired){callback(Error('Unavailable'));return;}
    let finished=false;
    const done=(error,value)=>{if(finished)return;finished=true;callback(error,value);};
    socket=connect({host:'smtp.gmail.com',port:465,servername:'smtp.gmail.com',rejectUnauthorized:true,minVersion:'TLSv1.2'});
    socket.once('error',()=>done(Error('Unavailable')));
    socket.once('secureConnect',()=>done(null,{connection:socket,secured:true}));
  };
  const transport=nodemailer.createTransport(options);
  try {
    const result=await Promise.race([transport.sendMail(mail),new Promise((_,reject)=>{
      timer=setTimeout(()=>{expired=true;socket?.destroy();transport.close();reject(Error('Unavailable'));},timeoutMs);
    })]);
    if(!result.accepted?.includes(RECIPIENT))throw Error('Unavailable');
  } finally {expired=true;clearTimeout(timer);socket?.destroy();transport.close();}
}
async function sendGmail(mail) {
  const {default:nodemailer}=await import('nodemailer');
  await deliverMail(mail,{nodemailer,password:process.env.CARLA_GMAIL_APP_PASSWORD});
}
const notify=createNotifier({readMessage:readTwilioMessage,sendMail:sendGmail,
  report:status=>console.info('[internal-sms/email]',{status})});

// Call ONLY after original webhook signature/account/field validation.
// Next after() keeps background work attached to the completed HTTP response.
export async function scheduleNotification(fields) {
  if(process.env.CARLA_SMS_EMAIL_ENABLED!=='true'||!eligible(fields))return;
  if(!process.env.CARLA_GMAIL_APP_PASSWORD){console.info('[internal-sms/email]',{status:'not_configured'});return;}
  try {
    const {after}=await import('next/server.js');
    after(async()=>{await notify({...fields});});
  }catch{console.info('[internal-sms/email]',{status:'not_scheduled'});}
}
