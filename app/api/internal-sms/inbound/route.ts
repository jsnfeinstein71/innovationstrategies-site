import { createHmac, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";

const PHONE_NUMBER = "+12513335587";
const DEFAULT_WEBHOOK_URL =
  "https://www.innovationstrategies.pro/api/internal-sms/inbound";
const MAX_BODY_BYTES = 64 * 1024;
const STOP_KEYWORDS = new Set([
  "STOP", "STOPALL", "UNSUBSCRIBE", "CANCEL", "END", "QUIT", "REVOKE", "OPTOUT",
]);
const ACKNOWLEDGMENT =
  "Innovation Strategies: Message received. Reply STOP to opt out or HELP for help.";
const HELP_REPLY =
  "Innovation Strategies: Internal SMS support. Reply STOP to unsubscribe. Message and data rates may apply.";
const STOP_REPLY =
  "Innovation Strategies: You have been unsubscribed from internal SMS messages. Reply START to resubscribe.";

function twiml(message?: string, status = 200) {
  // Only fixed, server-owned messages are inserted into XML.
  const xml = message ? `<Message>${message}</Message>` : "";
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><Response>${xml}</Response>`,
    {
      status,
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function POST(request: Request) {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const expectedAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const webhookUrl =
    process.env.TWILIO_INTERNAL_SMS_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;

  if (!authToken || !expectedAccountSid) {
    console.error("[internal-sms/inbound] Missing Twilio configuration");
    return twiml(undefined, 503);
  }

  let canonicalUrl: URL;
  try {
    canonicalUrl = new URL(webhookUrl);
    if (!["https:", "http:"].includes(canonicalUrl.protocol)) {
      return twiml(undefined, 503);
    }
  } catch {
    console.error("[internal-sms/inbound] Invalid webhook URL configuration");
    return twiml(undefined, 503);
  }

  const signature = request.headers.get("x-twilio-signature");
  if (!signature || !/^[A-Za-z0-9+/]{27}=$/.test(signature)) {
    return twiml(undefined, 403);
  }

  const incomingUrl = new URL(request.url);
  if (
    incomingUrl.pathname !== canonicalUrl.pathname ||
    incomingUrl.search !== canonicalUrl.search
  ) {
    return twiml(undefined, 403);
  }

  const contentType = request.headers.get("content-type")?.split(";")[0].trim();
  if (contentType !== "application/x-www-form-urlencoded") {
    return twiml(undefined, 415);
  }

  // Bound the actual stream, including requests without Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return twiml(undefined, 400);
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return twiml(undefined, 413);
      }
      chunks.push(value);
    }
  } catch {
    return twiml(undefined, 400);
  } finally {
    reader.releaseLock();
  }

  const form = new URLSearchParams(Buffer.concat(chunks).toString("utf8"));
  const params: Record<string, string> = Object.create(null);
  for (const [key, value] of form) {
    if (Object.hasOwn(params, key)) return twiml(undefined, 400);
    params[key] = value;
  }

  // Twilio signs the exact public URL plus ALL decoded form fields, sorted by name.
  // Use the configured URL rather than trusting proxy/Host headers.
  const signedData = Object.keys(params)
    .sort()
    .reduce((data, key) => data + key + params[key], webhookUrl);
  const expectedSignature = createHmac("sha1", authToken)
    .update(signedData, "utf8")
    .digest();
  const receivedSignature = Buffer.from(signature, "base64");
  if (
    receivedSignature.length !== expectedSignature.length ||
    !timingSafeEqual(receivedSignature, expectedSignature)
  ) {
    return twiml(undefined, 403);
  }

  const { From, To, Body, MessageSid, AccountSid, NumMedia } = params;
  if (AccountSid !== expectedAccountSid || To !== PHONE_NUMBER) {
    return twiml(undefined, 403);
  }
  if (
    !/^\+[1-9]\d{1,14}$/.test(From ?? "") ||
    !/^(SM|MM)[a-fA-F0-9]{32}$/.test(MessageSid ?? "") ||
    typeof Body !== "string" ||
    !/^\d+$/.test(NumMedia ?? "") ||
    !Number.isSafeInteger(Number(NumMedia))
  ) {
    return twiml(undefined, 400);
  }

  const keyword = Body.trim().toUpperCase();
  const optOutType = params.OptOutType?.trim().toUpperCase();
  const handledByTwilio = ["STOP", "HELP", "START"].includes(optOutType ?? "");
  const command = handledByTwilio
    ? optOutType
    : STOP_KEYWORDS.has(keyword)
      ? "STOP"
      : ["HELP", "INFO"].includes(keyword)
        ? "HELP"
        : "MESSAGE";

  console.info("[internal-sms/inbound]", {
    messageSid: MessageSid,
    from: `***${From.slice(-4)}`,
    to: `***${To.slice(-4)}`,
    bodyLength: Body.length,
    numMedia: Number(NumMedia),
    command,
    handledByTwilio,
  });

  // Advanced Opt-Out already sent its confirmation; Twilio owns subscription state.
  if (handledByTwilio) return twiml();
  if (command === "STOP") return twiml(STOP_REPLY);
  if (command === "HELP") return twiml(HELP_REPLY);
  return twiml(ACKNOWLEDGMENT);
}
