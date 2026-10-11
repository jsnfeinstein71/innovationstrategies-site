import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { afterEach, beforeEach, test } from "node:test";
import { POST } from "../app/api/internal-sms/inbound/route.ts";

const URL = "https://www.innovationstrategies.pro/api/internal-sms/inbound";
const TOKEN = "test-token-not-a-live-secret";
const ACCOUNT = "AC" + "1".repeat(32);
const EMPTY_XML = '<?xml version="1.0" encoding="UTF-8"?><Response></Response>';
const ACK = "Innovation Strategies: Message received. Reply STOP to opt out or HELP for help.";
const HELP = "Innovation Strategies: Internal SMS support. Reply STOP to unsubscribe. Message and data rates may apply.";
const STOP = "Innovation Strategies: You have been unsubscribed from internal SMS messages. Reply START to resubscribe.";
const ENV_KEYS = ["TWILIO_AUTH_TOKEN", "TWILIO_ACCOUNT_SID", "TWILIO_INTERNAL_SMS_WEBHOOK_URL"];
let originalEnv;
let originalInfo;
let originalError;
let logs;

beforeEach(() => {
  originalEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));
  process.env.TWILIO_AUTH_TOKEN = TOKEN;
  process.env.TWILIO_ACCOUNT_SID = ACCOUNT;
  delete process.env.TWILIO_INTERNAL_SMS_WEBHOOK_URL;
  logs = [];
  originalInfo = console.info;
  originalError = console.error;
  console.info = (...args) => logs.push(args);
  console.error = (...args) => logs.push(args);
});

afterEach(() => {
  console.info = originalInfo;
  console.error = originalError;
  for (const key of ENV_KEYS) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

function fields(overrides = {}) {
  return {
    From: "+16155550123",
    To: "+12513335587",
    Body: "Hello & <internal> team",
    MessageSid: "SM" + "2".repeat(32),
    AccountSid: ACCOUNT,
    NumMedia: "0",
    ...overrides,
  };
}

function signedRequest(params = fields(), options = {}) {
  const publicUrl = options.publicUrl ?? URL;
  const data = Object.keys(params).sort().map((key) => key + params[key]).join("");
  const signature = createHmac("sha1", TOKEN).update(publicUrl + data).digest("base64");
  return new Request(options.requestUrl ?? publicUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Twilio-Signature": signature,
      ...options.headers,
    },
    body: options.body ?? new URLSearchParams(params).toString(),
  });
}

async function expectReply(request, message) {
  const response = await POST(request);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/xml; charset=utf-8");
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(await response.text(),
    '<?xml version="1.0" encoding="UTF-8"?><Response><Message>' + message + "</Message></Response>");
}

test("normal messages return the exact acknowledgment and redact logs", async () => {
  await expectReply(signedRequest(), ACK);
  assert.deepEqual(logs, [["[internal-sms/inbound]", {
    messageSid: fields().MessageSid,
    from: "***0123",
    to: "***5587",
    bodyLength: fields().Body.length,
    numMedia: 0,
    command: "MESSAGE",
    handledByTwilio: false,
  }]]);
  const summary = JSON.stringify(logs);
  for (const sensitive of [fields().From, fields().To, fields().Body, ACCOUNT, TOKEN]) {
    assert.ok(!summary.includes(sensitive));
  }
});

test("accepts a fixed signature generated independently by Twilio SDK 5.13.1", async () => {
  const publicUrl = "https://innovationstrategies.pro/api/internal-sms/inbound";
  process.env.TWILIO_INTERNAL_SMS_WEBHOOK_URL = publicUrl;
  await expectReply(signedRequest(fields(), {
    publicUrl,
    headers: { "X-Twilio-Signature": "W7TUzHPn3tzobLnckUXnFfUMXEM=" },
  }), ACK);
});

test("HELP and INFO match case-insensitively with surrounding whitespace", async () => {
  for (const Body of ["HELP", " info ", "\nHeLp\t"]) {
    await expectReply(signedRequest(fields({ Body })), HELP);
  }
});

test("all standard opt-out keywords return the exact unsubscribe reply", async () => {
  for (const Body of ["STOP", "STOPALL", "UNSUBSCRIBE", "CANCEL", "END", "QUIT", "REVOKE", "OPTOUT"]) {
    await expectReply(signedRequest(fields({ Body: " " + Body.toLowerCase() + " " })), STOP);
  }
});

test("keywords inside a sentence are not commands", async () => {
  await expectReply(signedRequest(fields({ Body: "Can you help with this?" })), ACK);
  await expectReply(signedRequest(fields({ Body: "stop the build please" })), ACK);
});

test("MMS with an empty body parses media count without exposing media URLs", async () => {
  const mediaUrl = "https://example.invalid/private-media";
  await expectReply(signedRequest(fields({ Body: "", NumMedia: "1", MediaUrl0: mediaUrl, MediaContentType0: "image/jpeg" })), ACK);
  assert.equal(logs[0][1].numMedia, 1);
  assert.ok(!JSON.stringify(logs).includes(mediaUrl));
});

test("Twilio-managed STOP, HELP and START events do not send duplicate replies", async () => {
  for (const OptOutType of ["STOP", "HELP", "START"]) {
    const response = await POST(signedRequest(fields({ Body: "custom keyword", OptOutType })));
    assert.equal(response.status, 200);
    assert.equal(await response.text(), EMPTY_XML);
    assert.equal(logs.at(-1)[1].command, OptOutType);
    assert.equal(logs.at(-1)[1].handledByTwilio, true);
  }
});

test("missing, invalid and malformed signatures fail without logging payloads", async () => {
  for (const signature of ["", "bad", "A".repeat(27) + "="]) {
    const response = await POST(signedRequest(fields(), { headers: { "X-Twilio-Signature": signature } }));
    assert.equal(response.status, 403);
    assert.equal(await response.text(), EMPTY_XML);
  }
  assert.equal(logs.length, 0);
});

test("a signature for the redirecting apex URL is rejected at the www endpoint", async () => {
  const response = await POST(signedRequest(fields(), {
    publicUrl: "https://innovationstrategies.pro/api/internal-sms/inbound",
    requestUrl: URL,
  }));
  assert.equal(response.status, 403);
  assert.equal(logs.length, 0);
});

test("OptOutType cannot be added or changed without a matching signature", async () => {
  const params = fields({ OptOutType: "STOP" });
  for (const OptOutType of ["START", "HELP"]) {
    const response = await POST(signedRequest(params, {
      body: new URLSearchParams({ ...params, OptOutType }).toString(),
    }));
    assert.equal(response.status, 403);
  }
  assert.equal((await POST(signedRequest(fields(), {
    body: new URLSearchParams(params).toString(),
  }))).status, 403);
  assert.equal(logs.length, 0);
});

test("tampering with the body or an additional form field fails signature validation", async () => {
  const params = fields({ FutureTwilioField: "signed value" });
  await expectReply(signedRequest(params), ACK);
  for (const changed of [{ ...params, Body: "changed" }, { ...params, FutureTwilioField: "changed" }]) {
    const response = await POST(signedRequest(params, { body: new URLSearchParams(changed).toString() }));
    assert.equal(response.status, 403);
  }
  assert.equal(logs.length, 1);
});

test("valid signatures for another account or destination are rejected", async () => {
  for (const override of [{ AccountSid: "AC" + "3".repeat(32) }, { To: "+12515550123" }]) {
    const response = await POST(signedRequest(fields(override)));
    assert.equal(response.status, 403);
  }
  assert.equal(logs.length, 0);
});

test("invalid or missing core fields fail validation", async () => {
  for (const override of [{ From: "" }, { MessageSid: "invalid" }, { NumMedia: "-1" }, { NumMedia: "1.5" }, { NumMedia: "9007199254740992" }]) {
    assert.equal((await POST(signedRequest(fields(override)))).status, 400);
  }
  const missing = fields();
  delete missing.Body;
  assert.equal((await POST(signedRequest(missing))).status, 400);
  assert.equal(logs.length, 0);
});

test("missing credentials fail closed without disclosing configuration values", async () => {
  for (const key of ["TWILIO_AUTH_TOKEN", "TWILIO_ACCOUNT_SID"]) {
    const previous = process.env[key];
    delete process.env[key];
    const response = await POST(signedRequest());
    assert.equal(response.status, 503);
    assert.equal(await response.text(), EMPTY_XML);
    process.env[key] = previous;
  }
  assert.ok(!JSON.stringify(logs).includes(TOKEN));
});

test("canonical public URL validates behind a proxy without trusting forwarded hosts", async () => {
  await expectReply(signedRequest(fields(), {
    requestUrl: "http://localhost:3000/api/internal-sms/inbound",
    headers: { "X-Forwarded-Host": "attacker.invalid" },
  }), ACK);
  assert.equal((await POST(signedRequest(fields(), { publicUrl: "https://attacker.invalid/api/internal-sms/inbound" }))).status, 403);
});

test("configured webhook URLs include the exact signed query string", async () => {
  const publicUrl = "https://www.innovationstrategies.pro/api/internal-sms/inbound?source=internal";
  process.env.TWILIO_INTERNAL_SMS_WEBHOOK_URL = publicUrl;
  await expectReply(signedRequest(fields(), { publicUrl }), ACK);
  assert.equal((await POST(signedRequest(fields(), { publicUrl, requestUrl: URL + "?source=other" }))).status, 403);
});

test("invalid configured webhook URL fails closed", async () => {
  process.env.TWILIO_INTERNAL_SMS_WEBHOOK_URL = "invalid";
  assert.equal((await POST(signedRequest())).status, 503);
});

test("duplicate form fields and unsupported content types are rejected", async () => {
  const body = new URLSearchParams(fields()).toString() + "&Body=second";
  assert.equal((await POST(signedRequest(fields(), { body }))).status, 400);
  assert.equal((await POST(signedRequest(fields(), { headers: { "Content-Type": "application/json" } }))).status, 415);
});

test("oversized streams are rejected even without Content-Length", async () => {
  const request = signedRequest(fields(), { body: "x".repeat(64 * 1024 + 1) });
  assert.equal(request.headers.get("content-length"), null);
  assert.equal((await POST(request)).status, 413);
  assert.equal(logs.length, 0);
});
