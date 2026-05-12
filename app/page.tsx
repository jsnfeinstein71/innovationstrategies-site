const services = [
  "Digital workflow design",
  "Business process automation",
  "AI-assisted information management",
  "Website and operations support",
];

const audiences = [
  "Small businesses",
  "Service businesses",
  "Local operators",
  "Teams dealing with scattered information, manual follow-up, and disconnected tools",
];

const focusAreas = [
  "Building practical customer-facing digital infrastructure",
  "Developing workflow demos and service offerings",
  "Supporting small-business modernization",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-6 py-20 sm:px-8 lg:px-10">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
            Innovation Strategies LLC
          </p>
          <div className="max-w-4xl">
            <h1 className="text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Practical digital systems for small business operations.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 sm:text-xl">
              Innovation Strategies LLC helps small businesses improve
              workflows, organize information, and adopt useful automation and
              AI-assisted tools without enterprise complexity.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="mailto:info@innovationstrategies.pro"
              className="inline-flex w-fit items-center justify-center rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
            >
              Contact us
            </a>
            <a
              href="mailto:info@innovationstrategies.pro"
              className="text-sm font-medium text-slate-700 transition hover:text-cyan-800"
            >
              info@innovationstrategies.pro
            </a>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">
              What We Do
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-700">
              We design practical systems that make day-to-day operations easier
              to manage, maintain, and improve.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="font-medium text-slate-950">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">
              Who We Help
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-700">
              Our work is built for businesses that need useful tools and clear
              operations support without heavy enterprise overhead.
            </p>
          </div>
          <ul className="grid gap-3 text-base leading-7 text-slate-700">
            {audiences.map((audience) => (
              <li
                key={audience}
                className="flex gap-3 rounded-md border border-slate-200 bg-slate-50 p-4"
              >
                <span className="mt-2 size-2 shrink-0 rounded-full bg-cyan-700" />
                <span>{audience}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">
              Current Focus
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-700">
              Innovation Strategies is focused on practical modernization work
              that helps small businesses serve customers and keep operations
              moving.
            </p>
          </div>
          <div className="space-y-4">
            {focusAreas.map((focus) => (
              <div
                key={focus}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="font-medium text-slate-950">{focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">
                Contact
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-700">
                For business inquiries, workflow support, or digital operations
                planning, contact Innovation Strategies LLC.
              </p>
            </div>
            <a
              href="mailto:info@innovationstrategies.pro"
              className="text-lg font-semibold text-cyan-800 transition hover:text-cyan-950"
            >
              info@innovationstrategies.pro
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-950 px-6 py-6 text-sm text-slate-300 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">© Innovation Strategies LLC</div>
      </footer>
    </main>
  );
}
