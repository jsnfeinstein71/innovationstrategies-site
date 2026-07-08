const serviceCards = [
  {
    title: "Private AI document assistants",
    description:
      "AI systems that answer from controlled business documents, cite the source material, and refuse when the provided knowledge does not support an answer.",
  },
  {
    title: "RAG with citations",
    description:
      "Retrieval workflows built around grounded answers, source labels, document boundaries, and practical review paths instead of loose chatbot responses.",
  },
  {
    title: "Governed workflow automation",
    description:
      "AI-assisted intake, routing, drafting, summarizing, classification, and internal support workflows with clear approval points.",
  },
  {
    title: "Structured AI outputs",
    description:
      "Model responses shaped into usable business formats such as JSON, reports, summaries, classifications, drafts, and review records.",
  },
  {
    title: "Audit logs and approval gates",
    description:
      "Traceable interaction records, human handoff points, and boundaries that keep AI assistance under operational control.",
  },
  {
    title: "Integration architecture",
    description:
      "APIs, backend services, document pipelines, and lightweight interfaces that connect the AI workflow to the way the business already works.",
  },
];

const engagements = [
  {
    title: "AI Workflow Diagnostic",
    description:
      "A focused review of documents, workflows, risks, and automation opportunities that produces a practical AI build plan.",
  },
  {
    title: "Governed AI Prototype",
    description:
      "A working private-document or workflow prototype with cited answers, refusal behavior, audit logging, and a simple user interface.",
  },
  {
    title: "Production AI Workflow MVP",
    description:
      "A deployable AI workflow system with controlled document access, structured outputs, tool use, human approval gates, and documentation.",
  },
  {
    title: "Monthly AI System Support",
    description:
      "Ongoing document updates, prompt and evaluation tuning, model/provider adjustments, usage review, and workflow improvements.",
  },
];

const buyerTypes = [
  "Law firms",
  "Insurance offices",
  "Medical and dental administration",
  "Home care businesses",
  "Real estate and property management",
  "Compliance-heavy service businesses",
  "Consultants and grant organizations",
  "Document-heavy operations teams",
];

const capabilityItems = [
  "Private document and SOP workflows",
  "Source-grounded answers",
  "Role-aware responses",
  "Human approval boundaries",
  "Controlled tool use",
  "Interaction audit records",
  "Intake, routing, and drafting support",
  "Cloud, local, and hybrid deployment paths",
];

const reasons = [
  "Contract and project-focused AI delivery",
  "Systems-level architecture without enterprise overhead",
  "Governance, audit, and boundary-first design",
  "Practical builds that connect to real operations",
  "Clear scope, staged delivery, and maintainable handoff",
  "Builder-led execution from diagnostic to working system",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#060a11] text-slate-100">
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_78%_12%,rgba(59,130,246,0.2),transparent_28%),radial-gradient(circle_at_50%_95%,rgba(20,184,166,0.14),transparent_34%),linear-gradient(135deg,#060a11_0%,#101827_52%,#08111d_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
        <div className="relative mx-auto flex min-h-[86vh] max-w-6xl flex-col justify-center px-6 py-20 sm:px-8 lg:px-10">
          <div className="mb-8 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100 shadow-2xl shadow-cyan-950/30">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
            Innovation Strategies LLC
          </div>
          <div className="max-w-5xl">
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-7xl">
              Governed AI systems for private documents and business workflows.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              Innovation Strategies builds private AI assistants and workflow
              systems with citations, audit logs, role boundaries, structured
              outputs, controlled tool use, and human approval points.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="mailto:info@innovationstrategies.pro?subject=AI%20Workflow%20Diagnostic"
              className="inline-flex w-fit items-center justify-center rounded-md bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.24)] transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-[#060a11]"
            >
              Request an AI Workflow Diagnostic
            </a>
            <a
              href="mailto:info@innovationstrategies.pro?subject=Governed%20AI%20Prototype"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Discuss a governed AI prototype
            </a>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/10 bg-[#0a101a] py-16 sm:py-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
              The Problem
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Businesses want AI help, but not uncontrolled AI behavior.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              Many teams have knowledge trapped in policies, SOPs, client notes,
              forms, records, emails, and internal procedures. Generic chatbots
              can be useful, but business AI needs grounding, citations,
              boundaries, approval paths, and a way to know what happened.
            </p>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/10 bg-[#060a11] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
              What We Build
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Private AI systems built around trust, workflow, and control.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              The work focuses on contract and project builds for businesses
              that need AI to work with internal knowledge without losing
              operational control.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((item) => (
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
      </section>

      <section className="bg-[#0a101a] py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Starter Engagements
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Start with a scoped diagnostic, prototype, or MVP.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              Every engagement starts with a clear business workflow, defined
              boundaries, and a practical delivery path. The goal is useful AI
              that can be tested, reviewed, and maintained.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {engagements.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-cyan-300/20 bg-gradient-to-br from-cyan-300/10 via-white/[0.035] to-blue-500/10 p-5 shadow-2xl shadow-cyan-950/20"
              >
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
      </section>

      <section className="bg-[#060a11] py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Who It Helps
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Built for document-heavy businesses and workflow-heavy teams.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              The best fit is a business with repeated internal questions,
              scattered knowledge, manual review steps, private documents, and
              real risk if AI produces an unsupported answer or takes the wrong
              action.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {buyerTypes.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] p-4"
              >
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                <span className="font-medium text-slate-100">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-[#0a101a] py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.14),transparent_30%)]" />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
                Governance-First Architecture
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Not generic chatbot work.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-400">
                Innovation Strategies focuses on the missing layer between a
                model and a real business process: private knowledge control,
                retrieval boundaries, citations, audit trails, structured
                outputs, and human approval before consequential action.
              </p>
              <p className="mt-5 text-base leading-7 text-slate-400">
                Advanced internal research informs the approach, but public
                client work is scoped around business outcomes, practical
                implementation, and clear operational safeguards.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {capabilityItems.map((item) => (
                <div
                  key={item}
                  className="rounded-md border border-white/10 bg-white/[0.04] p-4 font-medium text-slate-100"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#060a11] py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Why Innovation Strategies
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Builder-led AI systems without enterprise overhead.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              Innovation Strategies is built around hands-on execution: turning
              unclear operational problems into working systems, using
              systems-level architecture where it matters and practical delivery
              where speed, scope, and clarity matter most.
            </p>
          </div>
          <div className="space-y-3">
            {reasons.map((reason, index) => (
              <div
                key={reason}
                className="grid grid-cols-[auto_1fr] gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-5"
              >
                <span className="text-sm font-semibold text-cyan-300">
                  0{index + 1}
                </span>
                <p className="font-medium leading-6 text-slate-100">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#0a101a] py-16">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
          <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.025] p-6 shadow-2xl shadow-black/30 sm:p-8">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  Contact
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                  Start with a paid AI workflow diagnostic.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
                  If your business has private documents, repetitive internal
                  questions, manual intake, review steps, or workflow bottlenecks,
                  contact Innovation Strategies LLC to discuss a scoped AI
                  diagnostic or governed prototype.
                </p>
              </div>
              <a
                href="mailto:info@innovationstrategies.pro?subject=AI%20Workflow%20Diagnostic"
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
