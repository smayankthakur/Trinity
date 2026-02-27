import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Application Status",
  description: "Qualification outcome for the Strategic Diagnostic.",
};

const reasonMessages: Record<string, string> = {
  revenue_floor:
    "RAP-90 is currently scoped for companies at INR 4Cr+ annual revenue to ensure implementation depth and measurable impact.",
  non_decision_maker:
    "We require participation from a key decision maker to run a strategic diagnostic and commit execution priorities.",
  unknown: "Your application does not currently meet this cycle's qualification criteria.",
};

type NotQualifiedPageProps = {
  searchParams?: Promise<{ reason?: string }>;
};

export default async function NotQualifiedPage({ searchParams }: NotQualifiedPageProps) {
  const params = (await searchParams) ?? {};
  const reason = params.reason ?? "unknown";

  return (
    <section className="section-wrap">
      <div className="data-card max-w-3xl">
        <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          Application Not Qualified
        </h1>
        <p className="mt-4 text-sm text-text-muted">{reasonMessages[reason] ?? reasonMessages.unknown}</p>
        <p className="mt-4 text-sm text-text-muted">
          You can re-apply when eligibility criteria are met. For policy details, review our privacy
          and data processing terms.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-line px-5 py-3 text-sm font-semibold"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

