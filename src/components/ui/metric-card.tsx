import type { Metric } from "@/types";

export function MetricCard({ label, value, context }: Metric) {
  return (
    <article className="data-card">
      <p className="kpi-number">{value}</p>
      <p className="mt-2 font-heading text-base font-semibold">{label}</p>
      <p className="mt-2 text-sm text-text-muted">{context}</p>
    </article>
  );
}

