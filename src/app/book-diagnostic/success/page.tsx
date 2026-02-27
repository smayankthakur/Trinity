import type { Metadata } from "next";
import { CTAButton } from "@/components/ui/cta-button";

export const metadata: Metadata = {
  title: "Diagnostic Application Received",
  description: "Qualified application confirmation for Strategic Diagnostic.",
};

export default function DiagnosticSuccessPage() {
  return (
    <section className="section-wrap">
      <div className="data-card max-w-3xl">
        <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          Application Received
        </h1>
        <p className="mt-4 text-sm text-text-muted">
          Your submission is qualified for review. You will receive scheduling access and preparation
          requirements within one business day.
        </p>
        <p className="mt-2 text-xs text-text-muted">
          For NDA-sensitive data, share details only after confirmation from our team.
        </p>
        <div className="mt-6">
          <CTAButton href="/rap-90" label="Review RAP-90 Framework" variant="secondary" eventName="success_page_framework_click" />
        </div>
      </div>
    </section>
  );
}

