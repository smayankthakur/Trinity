import { homeMetrics, workPageLogos } from "@/lib/data/site-data";

export function ResultsTicker() {
  return (
    <section className="section-wrap pt-0">
      <div className="surface-panel overflow-hidden p-4 md:p-5">
        <p className="label-precision px-2 text-text-muted">Wall of Proof</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 border-b border-line/70 px-2 pb-4">
          {workPageLogos.map((logo) => (
            <div
              key={logo}
              className="rounded-md border border-line bg-surface px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted"
              aria-label={`${logo} logo`}
            >
              {logo}
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2 md:flex-nowrap">
          {homeMetrics.map((metric) => (
            <article
              key={metric.label}
              className="min-w-[14rem] flex-1 rounded-md border border-line bg-surface/80 p-4"
            >
              <p className="headline-tight font-heading text-xl font-bold">{metric.value}</p>
              <p className="label-precision mt-1 text-text-muted">{metric.label}</p>
              <p className="mt-2 text-xs text-text-muted">{metric.context}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
