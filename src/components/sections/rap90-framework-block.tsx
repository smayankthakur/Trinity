import type { Phase } from "@/types";

type RAP90FrameworkBlockProps = {
  phases: Phase[];
};

export function RAP90FrameworkBlock({ phases }: RAP90FrameworkBlockProps) {
  return (
    <section aria-labelledby="framework-heading" className="space-y-8">
      <div>
        <h2 id="framework-heading" className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          RAP-90 Framework
        </h2>
        <p className="mt-3 max-w-3xl text-base text-text-muted md:text-lg">
          Three governed phases to diagnose leakage, rebuild critical systems, and stabilize growth.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {phases.map((phase, index) => (
          <article key={phase.title} className="data-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Phase {index + 1}</p>
            <h3 className="mt-2 font-heading text-xl font-semibold">{phase.title}</h3>
            <p className="mt-2 text-sm text-text-muted">{phase.goal}</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-text-muted">
              {phase.outputs.map((output) => (
                <li key={output}>{output}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-semibold">Primary KPI: {phase.kpi}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

