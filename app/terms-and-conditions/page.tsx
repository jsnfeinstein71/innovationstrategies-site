import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions | Innovation Strategies LLC",
  description:
    "Terms and Conditions for Innovation Strategies LLC, including internal SMS program terms.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#060a11] text-slate-100">
      <section className="border-b border-white/10 bg-[#0a101a] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
            Legal
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Terms and Conditions
          </h1>
          <div className="mt-8 space-y-5 text-base leading-7 text-slate-300">
            <p>
              By using Innovation Strategies LLC sites and services, you agree
              to these terms and to use company resources lawfully and
              appropriately.
            </p>
            <p>
              Innovation Strategies LLC may use SMS for internal operational,
              research, development, system-status, and testing notifications
              related to StarBridge, FIP, RAGtigm, PSA, and related company
              systems. Recipients are company-owned numbers or authorized
              internal testers who have agreed to receive these messages.
              Message frequency varies. Message and data rates may apply. Reply
              STOP to opt out and HELP for help. Mobile information and SMS
              opt-in data will not be shared with third parties or affiliates
              for marketing or promotional purposes.
            </p>
          </div>
          <div className="mt-10">
            <Link
              href="/internal-sms"
              className="rounded-md border border-white/20 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/[0.08]"
            >
              View Internal SMS Program
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
