import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phase 0 Assessment",
  description: "Pre-call Phase 0 self-assessment for Strategic Diagnostic applicants.",
};

export default function PhaseZeroAssessmentPage() {
  return (
    <section className="section-wrap">
      <div className="data-card space-y-4">
        <p className="label-precision text-accent">Phase 0 Assessment</p>
        <h1 className="headline-tight font-heading text-3xl font-bold md:text-4xl">
          Pre-Call Strategic Intelligence Survey
        </h1>
        <p className="max-w-3xl text-sm text-text-muted">
          Your application has been received. Before the diagnostic, please prepare the following data
          points so the strategy session can move directly into financial and infrastructure decisions.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-text-muted">
          <li>Last 3 months revenue (monthly)</li>
          <li>Channel-wise revenue breakdown</li>
          <li>Primary funnel conversion rate</li>
          <li>12-month growth target</li>
        </ul>
        <p className="text-sm text-text-muted">
          Our team will follow up via email/WhatsApp with the formal survey and scheduling link.
        </p>
      </div>
    </section>
  );
}

