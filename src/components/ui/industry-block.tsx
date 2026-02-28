import type { Industry } from "@/types";

export function IndustryBlock({ name, bottlenecks, outcomes }: Industry) {
  return (
    <article className="data-card">
      <h3 className="headline-tight font-heading text-xl font-bold">{name}</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="label-precision text-text-muted">Common Bottlenecks</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-text-muted">
            {bottlenecks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label-precision text-accent">Expected Outcomes</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-text-muted">
            {outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}


