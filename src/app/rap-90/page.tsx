import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { RAP90FrameworkBlock } from "@/components/sections/rap90-framework-block";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { rapPhases } from "@/lib/data/site-data";

export const metadata: Metadata = {
  title: "RAP-90",
  description: "Revenue Architecture Program in three controlled phases.",
};

export default function RAP90Page() {
  return (
    <>
      <HeroSection
        title="Revenue Architecture Program (RAP-90)"
        subtitle="A 90-day transformation model to diagnose, rebuild, and optimize revenue systems."
        qualifier="Program investment: INR 12L-28L."
        primaryCta={{ href: "/book-diagnostic", label: "Book Strategic Diagnostic" }}
        secondaryCta={{ href: "/case-results", label: "View Case Results" }}
      />

      <section className="section-wrap">
        <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          The Revenue Bottleneck Explained
        </h2>
        <p className="mt-4 max-w-3xl text-base text-text-muted">
          Most growth-stage teams optimize channels while the internal revenue path remains fragmented.
          RAP-90 aligns conversion flow, handoffs, and reporting into one operating system.
        </p>
      </section>

      <section className="section-wrap pt-0">
        <RAP90FrameworkBlock phases={rapPhases} />
      </section>

      <section className="section-wrap">
        <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">Financial Impact Model</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="data-card">
            <p className="font-heading text-lg font-semibold">Before</p>
            <p className="mt-2 text-sm text-text-muted">Conversion: 1.8% | AOV: INR 4,500 | Manual Ops: 60 hrs/mo</p>
          </article>
          <article className="data-card">
            <p className="font-heading text-lg font-semibold">After (modeled)</p>
            <p className="mt-2 text-sm text-text-muted">Conversion: 2.6% | AOV: INR 5,400 | Manual Ops: 20 hrs/mo</p>
          </article>
        </div>
      </section>

      <section className="section-wrap">
        {/* Conversion trigger: explicit investment range filters low-budget leads early. */}
        <div className="data-card">
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">Investment Range</h2>
          <p className="mt-4 text-lg font-semibold">INR 12L-28L</p>
          <p className="mt-3 text-sm text-text-muted">
            Engagements are approved for companies with clear revenue ownership and decision authority.
          </p>
        </div>
      </section>

      <section className="section-wrap">
        <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">FAQ</h2>
        <div className="mt-6 grid gap-4">
          {[
            "What does RAP-90 include?",
            "How do you measure impact?",
            "What if we have an in-house team?",
            "How quickly can implementation start?",
          ].map((question) => (
            <details key={question} className="data-card">
              <summary className="cursor-pointer font-semibold">{question}</summary>
              <p className="mt-3 text-sm text-text-muted">
                Answer placeholder aligned to objection handling and decision clarity.
              </p>
            </details>
          ))}
        </div>
      </section>

      <FinalCtaSection title="Book Strategic Diagnostic" qualifier="Qualified applicants receive a response within one business day." />
    </>
  );
}

