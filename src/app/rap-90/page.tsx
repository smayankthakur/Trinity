import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { RAP90FrameworkBlock } from "@/components/sections/rap90-framework-block";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { rapPhases } from "@/lib/data/site-data";

export const metadata: Metadata = {
  title: "RAP-90",
  description:
    "RAP-90 is Sitelytc's 90-day Revenue Architecture Program for growth-stage firms needing measurable conversion, operations, and reporting impact.",
};

export default function RAP90Page() {
  return (
    <>
      <HeroSection
        title="RAP-90: Revenue Architecture Program"
        subtitle="A structured 90-day engagement that diagnoses leakage, rebuilds core infrastructure, and installs a repeatable optimization system."
        primaryCta={{ href: "/diagnostic", label: "Start Your Revenue Leakage Audit" }}
        secondaryCta={{ href: "/case-results", label: "View Case Results" }}
      />

      <section className="section-wrap">
        <h2 className="headline-tight font-heading text-3xl font-bold md:text-4xl">
          The Revenue Bottleneck Explained
        </h2>
        <p className="mt-4 max-w-3xl text-base text-text-muted">
          Most teams scale acquisition first, while their internal revenue path remains fragmented.
          RAP-90 aligns the full path from traffic to cash collection so growth compounds instead of
          leaking through disconnected systems.
        </p>
      </section>

      <section className="section-wrap pt-0">
        <RAP90FrameworkBlock phases={rapPhases} />
      </section>

      <section className="section-wrap">
        <h2 className="headline-tight font-heading text-3xl font-bold md:text-4xl">Financial Impact Model</h2>
        <p className="mt-4 max-w-3xl text-base text-text-muted">
          We model impact using your current baseline: traffic quality, conversion rates, average value,
          operational load, and decision speed.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="data-card">
            <p className="font-heading text-lg font-semibold">Before</p>
            <p className="mt-2 text-sm text-text-muted">
              Conversion: 1.8% | AOV: INR 4,500 | Manual Ops: 60 hrs/mo
            </p>
          </article>
          <article className="data-card">
            <p className="font-heading text-lg font-semibold">After (modeled)</p>
            <p className="mt-2 text-sm text-text-muted">
              Conversion: 2.6% | AOV: INR 5,400 | Manual Ops: 20 hrs/mo
            </p>
          </article>
        </div>
      </section>

      <section className="section-wrap">
        {/* Conversion trigger: explicit investment range filters low-budget leads early. */}
        <div className="surface-panel p-8 md:p-10">
          <h2 className="headline-tight font-heading text-3xl font-bold md:text-4xl">Investment Range</h2>
          <p className="mt-6 headline-tight font-heading text-2xl font-bold md:text-4xl">INR 12L-28L</p>
          <p className="mt-3 text-sm text-text-muted">
            This is a commercial transformation engagement, not a design-only project. Approvals are given
            to teams with decision authority, baseline data access, and execution commitment.
          </p>
        </div>
      </section>

      <section className="section-wrap">
        <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          What Leadership Teams Value
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="data-card">
            <p className="text-sm text-text-muted">
              &ldquo;We stopped discussing channel noise and started making weekly decisions from a
              reliable revenue system.&rdquo;
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
              COO, Growth-Stage D2C Brand
            </p>
          </article>
          <article className="data-card">
            <p className="text-sm text-text-muted">
              &ldquo;RAP-90 gave us operational clarity, faster pipeline movement, and a measurable
              business case for each architecture change.&rdquo;
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Founder, VC-backed SaaS
            </p>
          </article>
        </div>
      </section>

      <section className="section-wrap">
        <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">FAQ</h2>
        <div className="mt-6 grid gap-4">
          {[
            {
              q: "What does RAP-90 include?",
              a: "A full diagnostic, infrastructure rebuild priorities, implementation architecture, and a weekly optimization governance layer.",
            },
            {
              q: "How is impact measured?",
              a: "We measure conversion, value per transaction or deal, operating effort saved, and decision speed from reporting clarity.",
            },
            {
              q: "Can RAP-90 work with internal teams?",
              a: "Yes. We design the architecture and governance model so internal marketing, operations, and sales teams execute with alignment.",
            },
            {
              q: "How quickly can implementation start?",
              a: "Qualified teams typically enter onboarding within 1-2 weeks after diagnostic approval.",
            },
          ].map((item) => (
            <details key={item.q} className="data-card">
              <summary className="cursor-pointer font-semibold">{item.q}</summary>
              <p className="mt-3 text-sm text-text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <FinalCtaSection
        title="Start Your Revenue Leakage Audit"
        qualifier="Qualified applicants receive an approval decision and next-step timeline within one business day."
      />
    </>
  );
}




