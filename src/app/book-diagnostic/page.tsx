import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { BookDiagnosticForm } from "@/components/forms/book-diagnostic-form";

export const metadata: Metadata = {
  title: "Book Diagnostic",
  description:
    "Book a qualification-first Strategic Diagnostic for RAP-90. Designed for INR 4Cr-50Cr companies with implementation readiness.",
};

export default function BookDiagnosticPage() {
  return (
    <>
      <HeroSection
        title="Request Strategic Diagnostic"
        subtitle="A qualification-first process for growth-stage teams that need revenue architecture decisions, not generic website advice."
        qualifier="Best fit: INR 4Cr-50Cr annual revenue | RAP-90 investment: INR 12L-28L"
        primaryCta={{ href: "/book-diagnostic", label: "Request Strategic Diagnostic" }}
      />

      <section className="section-wrap pt-0">
        <div className="mb-6 data-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Before You Apply
          </p>
          <p className="mt-2 text-sm text-text-muted">
            This diagnostic is built for decision-makers with active growth mandates. If approved, your team
            receives a bottleneck map, architecture priorities, and next-step execution sequence.
          </p>
        </div>
        <BookDiagnosticForm />
      </section>
    </>
  );
}


