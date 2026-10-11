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

Run the focused webhook tests with Node.js 22.18+ or 24+:

```bash
node --test tests/internal-sms-inbound.test.mjs
```
