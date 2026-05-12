const buildCards = [
  {
    title: "Custom software systems",
    description:
      "Purpose-built applications and operational tools shaped around the way a business actually works.",
  },
  {
    title: "Web and mobile applications",
    description:
      "Responsive web experiences, mobile-ready interfaces, and Android-oriented tools for customer and internal use.",
  },
  {
    title: "Workflow automation",
    description:
      "Automated steps for intake, follow-up, routing, reminders, reporting, and repetitive back-office work.",
  },
  {
    title: "AI-assisted business tools",
    description:
      "Useful AI support for summarizing, organizing, drafting, searching, and making information easier to act on.",
  },
  {
    title: "Data and information systems",
    description:
      "Structured information flows that turn scattered notes, files, requests, and records into usable systems.",
  },
  {
    title: "Platform and integration architecture",
    description:
      "APIs, service layers, backend logic, and integration patterns for systems that need to connect and grow.",
  },
];

const platformItems = [
  "Web applications",
  "Android and mobile systems",
  "Backend services",
  "APIs and integration layers",
  "Business websites",
  "Local tools and internal utilities",
  "Cloud deployments",
  "Custom operational workflows",
];

const innovationTracks = [
  {
    title: "StarBridge",
    description:
      "A governed AI and runtime systems initiative focused on controlled workflows, context-aware operation, and dependable human-directed use.",
  },
  {
    title: "FIP",
    description:
      "Identity and context infrastructure research and development for managing trusted context across software and AI-assisted environments.",
  },
  {
    title: "IaaS direction",
    description:
      "A future direction for trusted identity and context services that can support safer, more consistent digital operations.",
  },
];

const practicalSupport = [
  "Websites and public presence",
  "Customer intake",
  "Internal tools",
  "Automating repetitive work",
  "Organizing scattered information",
  "Connecting systems",
  "Preparing demos and prototypes",
  "Improving operations",
];

const reasons = [
  "Hands-on building",
  "Movement from idea to working system",
  "Practical problem solving",
  "Broad technical range",
  "Serious architecture where needed",
  "Small-business practicality without enterprise complexity",
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
              Software systems built for real-world operations.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              Innovation Strategies LLC designs and builds custom software,
              automation workflows, AI-assisted tools, and digital
              infrastructure for businesses that need practical systems and
              serious technical execution.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="mailto:info@innovationstrategies.pro"
              className="inline-flex w-fit items-center justify-center rounded-md bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.24)] transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-[#060a11]"
            >
              Start a conversation
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
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
              What We Build
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Software capability across platforms and operational needs.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              The work spans practical business systems, custom applications,
              automation, AI-assisted workflows, information architecture, and
              the integration layers that make tools work together.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {buildCards.map((item) => (
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

      <section className="bg-[#060a11] py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Built Across Platforms
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Flexible enough for the environment the work requires.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              Innovation Strategies can work across web applications,
              Android/mobile systems, backend services, APIs, business
              websites, local tools, cloud deployments, and custom operational
              workflows. The goal is not to add complexity, but to build the
              right technical shape for the problem.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {platformItems.map((item) => (
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
                Advanced Innovation Track
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Deeper platform work, explained at a practical level.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-400">
                Innovation Strategies also develops deeper platform concepts
                focused on governed AI workflows, identity/context
                infrastructure, secure information handling, and
                runtime-controlled automation. Public descriptions stay
                high-level and focused on the business value of trusted systems.
              </p>
            </div>
            <div className="space-y-4">
              {innovationTracks.map((track) => (
                <article
                  key={track.title}
                  className="rounded-lg border border-cyan-300/20 bg-gradient-to-br from-cyan-300/10 via-white/[0.035] to-blue-500/10 p-5 shadow-2xl shadow-cyan-950/20"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {track.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {track.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#060a11] py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Practical Business Support
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Advanced capability applied to everyday operating needs.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              The same technical range can support the practical work that
              keeps a business moving, from public presence and intake flows to
              internal tools, prototypes, and connected systems.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {practicalSupport.map((item) => (
              <div
                key={item}
                className="rounded-md border border-white/10 bg-white/[0.04] p-4 font-medium text-slate-100"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0a101a] py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Why Innovation Strategies
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Builder-oriented technical work without enterprise overhead.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              Innovation Strategies is built around hands-on execution: turning
              unclear operational problems into working systems, using serious
              architecture where it matters and practical delivery where speed
              and clarity matter most.
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

      <section className="relative bg-[#060a11] py-16">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
          <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.025] p-6 shadow-2xl shadow-black/30 sm:p-8">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  Contact
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                  Start a conversation about the system you need.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
                  For custom software, automation, AI-assisted workflows,
                  digital infrastructure, or practical operations support,
                  contact Innovation Strategies LLC.
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
