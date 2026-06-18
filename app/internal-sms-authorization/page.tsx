import Link from "next/link";

export const metadata = {
  title: "Internal SMS Authorization | Innovation Strategies LLC",
  description:
    "SMS opt-in authorization form for company-owned numbers and authorized internal testers.",
};

export default function InternalSmsAuthorizationPage() {
  return (
    <main className="min-h-screen bg-[#060a11] text-slate-100">
      <section className="relative border-b border-white/10 bg-[#0a101a] py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(34,211,238,0.15),transparent_32%),linear-gradient(135deg,#060a11_0%,#101827_58%,#08111d_100%)]" />
        <div className="relative mx-auto max-w-4xl px-6 sm:px-8 lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
            Internal SMS Authorization
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Internal SMS Opt-In Form
          </h1>
          <div className="mt-8 space-y-5 text-base leading-7 text-slate-300">
            <p>
              This form is for company-owned numbers and authorized internal
              testers only. To receive SMS messages, check the optional SMS
              consent box below. If checked, you authorize Innovation
              Strategies LLC to send internal operational, research,
              development, testing, and system-status SMS messages to the phone
              number provided.
            </p>
            <p>
              Message frequency varies. Message and data rates may apply. Reply
              STOP to opt out and HELP for help. Consent is not a condition of
              purchase.
            </p>
          </div>

          <form className="mt-10 rounded-lg border border-white/10 bg-white/[0.03] p-6 sm:p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-100">
                  Full name
                </span>
                <input
                  required
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  className="mt-2 w-full rounded-md border border-white/15 bg-[#060a11] px-3 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-100">
                  Phone number
                </span>
                <input
                  required
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  className="mt-2 w-full rounded-md border border-white/15 bg-[#060a11] px-3 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-100">
                  Email address
                </span>
                <input
                  required
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="mt-2 w-full rounded-md border border-white/15 bg-[#060a11] px-3 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-100">
                  Role / authorized tester
                </span>
                <input
                  required
                  name="role"
                  type="text"
                  className="mt-2 w-full rounded-md border border-white/15 bg-[#060a11] px-3 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-medium text-slate-100">
                Message / purpose
              </span>
              <textarea
                required
                name="message"
                rows={5}
                className="mt-2 w-full rounded-md border border-white/15 bg-[#060a11] px-3 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
              />
            </label>

            <label className="mt-6 flex gap-3 rounded-md border border-cyan-300/20 bg-cyan-300/5 p-4 text-sm leading-6 text-slate-200">
              <input
                name="smsConsent"
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 accent-cyan-300"
              />
              <span>
                Optional SMS consent: I agree to receive internal SMS messages
                from Innovation Strategies LLC related to StarBridge, FIP,
                RAGtigm, PSA, development testing, operational alerts, research
                workflows, and system-status notifications. Message frequency
                varies. Message and data rates may apply. Reply STOP to opt out
                and HELP for help. Consent is not a condition of purchase.
              </span>
            </label>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="rounded-md bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Submit form
              </button>
              <Link
                href="/privacy-policy"
                className="rounded-md border border-white/20 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/[0.08]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="rounded-md border border-white/20 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/[0.08]"
              >
                Terms and Conditions
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
