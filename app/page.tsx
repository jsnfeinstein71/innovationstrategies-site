const builds = [
  {
    title: "Digital workflow systems",
    description:
      "Clear operating flows for intake, task tracking, document handling, and customer follow-up.",
  },
  {
    title: "Business process automation",
    description:
      "Practical automations that reduce repeated manual steps and keep routine work moving.",
  },
  {
    title: "AI-assisted information management",
    description:
      "Structured ways to organize notes, documents, requests, and knowledge so teams can find what matters.",
  },
  {
    title: "Website and operations support",
    description:
      "Customer-facing web presence and operational support tools that fit the way a small business works.",
  },
];

const operators = [
  "Small businesses",
  "Service businesses",
  "Local operators",
  "Early-stage teams",
];

const focusAreas = [
  "Building customer-facing digital infrastructure",
  "Developing workflow demos and service offerings",
  "Supporting small-business modernization",
  "Preparing practical market validation",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070b12] text-slate-100">
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.24),transparent_32%),radial-gradient(circle_at_75%_15%,rgba(59,130,246,0.18),transparent_28%),linear-gradient(135deg,#070b12_0%,#101827_54%,#07111d_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
        <div className="relative mx-auto flex min-h-[82vh] max-w-6xl flex-col justify-center px-6 py-20 sm:px-8 lg:px-10">
          <div className="mb-8 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100 shadow-2xl shadow-cyan-950/30">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
            Innovation Strategies LLC
          </div>
          <div className="max-w-4xl">
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Practical digital systems for small business operations.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              Innovation Strategies LLC helps small businesses improve
              workflows, organize information, and adopt useful automation and
              AI-assisted tools without enterprise complexity.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="mailto:info@innovationstrategies.pro"
              className="inline-flex w-fit items-center justify-center rounded-md bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.24)] transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-[#070b12]"
            >
              Contact us
            </a>
            <a
              href="mailto:info@innovationstrategies.pro"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              info@innovationstrategies.pro
            </a>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/10 bg-[#0a101a] py-16 sm:py-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
                What We Build
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Practical systems with a clear operating purpose.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-400">
                We focus on useful digital infrastructure: the connective work
                between a business, its customers, its information, and the
                recurring tasks that keep operations moving.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {builds.map((item) => (
                <article
                  key={item.title}
                  className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 backdrop-blur"
                >
                  <div className="mb-5 h-px w-16 bg-gradient-to-r from-cyan-300 to-blue-400" />
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#070b12] py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-10">
          <div className="rounded-lg border border-cyan-300/20 bg-gradient-to-br from-cyan-300/10 via-white/[0.035] to-blue-500/10 p-6 shadow-2xl shadow-cyan-950/20 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Why It Matters
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
              Less scattered work. More usable operations.
            </h2>
          </div>
          <div className="flex items-center">
            <p className="text-lg leading-8 text-slate-300">
              Small businesses often deal with scattered information, manual
              follow-up, disconnected tools, and limited time. Innovation
              Strategies helps turn that complexity into organized, usable
              systems that support daily work without adding enterprise
              overhead.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0a101a] py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Built For Practical Operators
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
              Designed for teams that need clarity more than complexity.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              The work is shaped around smaller organizations that need
              reliable systems, straightforward support, and tools that can be
              adopted in real operating environments.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {operators.map((operator) => (
              <div
                key={operator}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] p-4"
              >
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                <span className="font-medium text-slate-100">{operator}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#070b12] py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Current Focus
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
              Building toward practical market use.
            </h2>
          </div>
          <div className="space-y-3">
            {focusAreas.map((focus, index) => (
              <div
                key={focus}
                className="grid grid-cols-[auto_1fr] gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-5"
              >
                <span className="text-sm font-semibold text-cyan-300">
                  0{index + 1}
                </span>
                <p className="font-medium leading-6 text-slate-100">{focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10 bg-[#0a101a] py-16">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
          <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.025] p-6 shadow-2xl shadow-black/30 sm:p-8">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  Contact
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                  Start with a practical operations conversation.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
                  For workflow support, digital infrastructure planning, or
                  small-business modernization inquiries, contact Innovation
                  Strategies LLC.
                </p>
              </div>
              <a
                href="mailto:info@innovationstrategies.pro"
                className="text-lg font-semibold text-cyan-200 transition hover:text-white"
              >
                info@innovationstrategies.pro
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#05070d] px-6 py-6 text-sm text-slate-500 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">&copy; Innovation Strategies LLC</div>
      </footer>
    </main>
  );
}
