import type { CaseResult } from "@/types";

export function CaseResultCard({ companyType, problem, fix, before, after, impact }: CaseResult) {
  return (
    <article className="data-card space-y-3">
      <p className="label-precision text-accent">{companyType}</p>
      <p className="headline-tight font-heading text-lg font-bold">Problem</p>
      <p className="text-sm text-text-muted">{problem}</p>
      <p className="headline-tight font-heading text-lg font-bold">Infrastructure Fix</p>
      <p className="text-sm text-text-muted">{fix}</p>
      <div className="grid gap-2 text-sm md:grid-cols-3">
        <p className="rounded-md border border-line bg-surface-alt/40 px-3 py-2">
          <span className="font-semibold">Before:</span> {before}
        </p>
        <p className="rounded-md border border-line bg-surface-alt/40 px-3 py-2">
          <span className="font-semibold">After:</span> {after}
        </p>
        <p className="rounded-md border border-accent/40 bg-surface-alt/40 px-3 py-2">
          <span className="font-semibold">Impact:</span> {impact}
        </p>
      </div>
    </article>
  );
}

