import type { CaseResult } from "@/types";

export function CaseResultCard({ companyType, problem, fix, before, after, impact }: CaseResult) {
  return (
    <article className="data-card space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">{companyType}</p>
      <p className="font-heading text-lg font-semibold">Problem</p>
      <p className="text-sm text-text-muted">{problem}</p>
      <p className="font-heading text-lg font-semibold">Infrastructure Fix</p>
      <p className="text-sm text-text-muted">{fix}</p>
      <div className="grid gap-2 text-sm md:grid-cols-3">
        <p>
          <span className="font-semibold">Before:</span> {before}
        </p>
        <p>
          <span className="font-semibold">After:</span> {after}
        </p>
        <p>
          <span className="font-semibold">Impact:</span> {impact}
        </p>
      </div>
    </article>
  );
}

