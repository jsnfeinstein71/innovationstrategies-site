# Innovation Strategies Site

A simple Next.js site for Innovation Strategies LLC.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Production Build

Create a production build:

```bash
npm run build
```

Run the production server locally:

```bash
npm run start
```

## Deployment

Deploy to a platform with a Next.js server runtime, including Vercel, Netlify,
or a Node-compatible host. The inbound SMS webhook requires a server runtime
and will not work with a static export.

For Vercel:

1. Connect this repository to Vercel.
2. Use the default Next.js build settings.
3. Set the production domain to `innovationstrategies.pro`.

The public pages do not require environment variables.

## Internal SMS Inbound Webhook

`POST /api/internal-sms/inbound` receives Twilio SMS/MMS for `+12513335587`
and returns TwiML acknowledgments, HELP/INFO replies, or opt-out replies.
It logs only the message SID, masked phone numbers, body length, media count,
and command category. Message bodies, account credentials, and media URLs are
not logged or returned.

Set these server-side environment variables in the deployment:

- `TWILIO_ACCOUNT_SID`: the account that owns the internal SMS number.
- `TWILIO_AUTH_TOKEN`: that account's Auth Token, used to validate
  `X-Twilio-Signature` (an API key secret cannot replace it).
- `TWILIO_INTERNAL_SMS_WEBHOOK_URL` (optional): the exact public webhook URL
  configured in Twilio, including any query string. Defaults to
  `https://www.innovationstrategies.pro/api/internal-sms/inbound`. Set this explicitly
  if using a different domain, a preview deployment, or a tunnel.

Configure the number's inbound messaging webhook (or its Messaging Service's
inbound webhook, if that service controls incoming messages) to use this URL
with HTTP POST. Use the final HTTPS URL without a redirect.
Missing credentials return 503; invalid signatures, accounts, or destinations
return 403. Only form-encoded POST requests are accepted, with a 64 KiB limit.

There is no database or application-level subscription store.
Twilio's opt-out handling owns the blocklist and resubscription state.
When `OptOutType` is present for STOP, HELP, or START, Twilio has already sent
its confirmation, so the route returns an empty `<Response>` to avoid a duplicate.
To use the exact custom HELP and STOP text for those events, configure the
corresponding confirmations in the Messaging Service's Advanced Opt-Out settings.
Adding this route does not change those settings.

### Holly text-only admission

The notification allowlist admits exactly the verified number supplied in the
server-only `CARLA_SMS_HOLLY_NUMBER` variable when `CARLA_SMS_HOLLY_ENABLED` is
exactly `true`. Keep the phone number out of this public repository. Missing,
malformed, owner-number or cArla-number configuration cannot add a new sender.
Jason and Jeanne retain their existing behavior. The route can be activated
before the introduction, but routing is not evidence of ongoing-contact consent
and must never clear a provider block or controller hold. The sole controller
owns consent, privacy, financial exclusions, reservations and outbound reconciliation.
An invitation remains held until the reply path is verified and the parents have
told Holly to expect it; no invitation or test SMS is sent by this deployment.

The existing global email switch, fixed Gmail sender/recipient, SID-only email,
webhook URL/signature/account/recipient checks and acknowledgments are unchanged.
Holly receives the generic acknowledgment already used for other non-owner
numbers; this does not imply that AI handling has been enabled. No additional
media-processing permission is granted. Holly's messages with media do not
generate a notification, and the controller must reject media before retrieval.

### Scott text-only admission

Scott has an independent server-only number, `CARLA_SMS_SCOTT_NUMBER`, and
default-off switch, `CARLA_SMS_SCOTT_ENABLED`. Only the exact string `true`
enables his notification route. Store the approved number in private deployment
configuration, never in this public repository. The number must be valid E.164,
must not match cArla, Jason, Jeanne, or Holly's configured number, and must match
the verified provider sender exactly. Missing or invalid settings admit nobody
new. Scott's switch does not change Holly's switch or the existing owner routes.

Only zero-media messages qualify. Existing STOP/HELP/START exclusions, original
provider ownership checks, and the admission recheck after provider verification
also apply to Scott. The fixed SID-only email and generic acknowledgment remain
unchanged. This enables routing, not unrestricted disclosure or access to email,
contacts, financial records, media, or another person's private information.
The sole controller owns sender-bound consent, approved context, current opt-outs,
durable handling and one-attempt reply admission. Deployment itself sends no
introduction, test message, or health information.

Run the focused webhook tests with Node.js 22.18+ or 24+:

```bash
node --test tests/internal-sms-inbound.test.mjs
```
