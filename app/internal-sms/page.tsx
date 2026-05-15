import Link from "next/link";

export const metadata = {
  title: "Innovation Strategies Internal SMS Program",
  description:
    "Internal SMS program information for Innovation Strategies LLC for operational, research, and development messaging.",
};

export default function InternalSmsPage() {
  return (
    <main className="min-h-screen bg-[#060a11] text-slate-100">
      <section className="relative border-b border-white/10 bg-[#0a101a] py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(34,211,238,0.15),transparent_32%),linear-gradient(135deg,#060a11_0%,#101827_58%,#08111d_100%)]" />
        <div className="relative mx-auto max-w-4xl px-6 sm:px-8 lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
            Internal Program Information
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Innovation Strategies Internal SMS Program
          </h1>
          <div className="mt-8 space-y-5 text-base leading-7 text-slate-300">
            <p>
              Innovation Strategies LLC uses SMS for internal operational,
              research, and development notifications related to StarBridge,
              FIP, RAGtigm, PSA, and related company systems.
            </p>
            <p>
              This SMS program is not a public signup, marketing list, or
              customer messaging program. Recipients are company-owned numbers
              or authorized internal testers who have given permission to
              receive internal development, testing, operational, and
              system-status SMS messages.
            </p>
            <p>
              Message frequency varies. Message and data rates may apply. Reply
              STOP to opt out and HELP for help. Consent is not a condition of
              purchase.
            </p>
            <p>
              Mobile information and SMS opt-in data will not be shared with
              third parties or affiliates for marketing or promotional
              purposes.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
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
        </div>
      </section>
    </main>
  );
}
