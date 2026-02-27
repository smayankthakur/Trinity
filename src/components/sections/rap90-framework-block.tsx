import type { Phase } from "@/types";

type RAP90FrameworkBlockProps = {
  phases: Phase[];
};

export function RAP90FrameworkBlock({ phases }: RAP90FrameworkBlockProps) {
  return (
    <section aria-labelledby="framework-heading" className="space-y-8">
      <div>
        <h2 id="framework-heading" className="font-heading text-3xl font-semibold tracking-[0.06em] md:text-4xl">
          RAP-90 Framework
        </h2>
        <p className="mt-3 max-w-3xl text-base text-text-muted md:text-lg">
          Structured as an interactive implementation timeline: diagnose, rebuild, and optimize with
          measurable control at every phase.
        </p>
      </div>
      <div className="relative grid gap-4 md:grid-cols-3">
        <div className="pointer-events-none absolute left-0 right-0 top-5 hidden border-t border-dashed border-line md:block" />
        {phases.map((phase, index) => (
          <article
            key={phase.title}
            className="data-card group relative transition duration-200 hover:-translate-y-1 hover:border-accent/60"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-xs font-semibold text-text-muted">
                {index + 1}
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Phase Timeline</p>
            </div>
            <h3 className="mt-2 font-heading text-xl font-semibold tracking-[0.04em]">{phase.title}</h3>
            <p className="mt-2 text-sm text-text-muted">{phase.goal}</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-text-muted transition duration-200 group-hover:text-ink">
              {phase.outputs.map((output) => (
                <li key={output}>{output}</li>
              ))}
            </ul>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Primary KPI: {phase.kpi}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

