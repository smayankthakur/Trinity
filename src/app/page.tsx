import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { RAP90FrameworkBlock } from "@/components/sections/rap90-framework-block";
import { MetricCard } from "@/components/ui/metric-card";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { homeMetrics, rapPhases, caseResults, industries } from "@/lib/data/site-data";
import { ResultsTicker } from "@/components/sections/results-ticker";
import { CaseResultCard } from "@/components/ui/case-result-card";
import { IndustryBlock } from "@/components/ui/industry-block";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Sitelytc builds revenue infrastructure for INR 4Cr-50Cr companies that need measurable growth outcomes, not website redesigns.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="Precision Digital Architecture for Scaling Businesses"
        subtitle="Infrastructure engineering for revenue systems. Built for executive teams that optimize profit, not vanity metrics."
        primaryCta={{ href: "/diagnostic", label: "Start Your Revenue Leakage Audit" }}
        secondaryCta={{ href: "/rap-90", label: "View Revenue Framework" }}
      />

      <section className="section-wrap">
        <div className="surface-panel p-7 md:p-9">
          <h2 className="headline-tight font-heading text-3xl font-bold md:text-4xl">
            The Scaling Ceiling
          </h2>
        <p className="mt-4 max-w-3xl text-base text-text-muted">
          Growth usually stalls when traffic, journey design, CRM, operations, and reporting are managed
          as separate systems. RAP-90 closes those gaps with one accountable revenue architecture.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            "Revenue plateaus despite higher acquisition spend",
            "Conversion leakage between landing, checkout, and CRM",
            "Backend operations consume strategic time each week",
            "Leadership decisions delayed by fragmented reporting",
          ].map((item) => (
            <div key={item} className="data-card">
              <p className="text-sm text-text-muted">{item}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className="section-wrap pt-0">
        {/* Conversion trigger: framework clarity before proof blocks. */}
        <RAP90FrameworkBlock phases={rapPhases} />
      </section>

      <ResultsTicker />

      <section className="section-wrap pt-0">
        <h2 className="headline-tight font-heading text-3xl font-bold md:text-4xl">Measured Outcomes</h2>
        <p className="mt-4 max-w-3xl text-base text-text-muted">
          We quantify impact in business terms: conversion efficiency, order value, operating load, and
          decision velocity.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {homeMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </section>

      <section className="section-wrap">
        <h2 className="headline-tight font-heading text-3xl font-bold md:text-4xl">
          Case Results Snapshot
        </h2>
        <div className="mt-8 grid gap-4">
          {caseResults.slice(0, 2).map((item) => (
            <CaseResultCard key={item.companyType} {...item} />
          ))}
        </div>
      </section>

      <section className="section-wrap pt-0">
        <h2 className="headline-tight font-heading text-3xl font-bold md:text-4xl">
          Industry-Specific Infrastructure Models
        </h2>
        <div className="mt-8 grid gap-4">
          {industries.map((industry) => (
            <IndustryBlock key={industry.slug} {...industry} />
          ))}
        </div>
      </section>

      <section className="section-wrap pt-0">
        <div className="data-card grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Who This Is For</p>
            <p className="mt-2 text-sm text-text-muted">
              Growth-stage e-commerce, SaaS, and legacy firms with active demand and infrastructure
              constraints that are limiting scale.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Not For</p>
            <p className="mt-2 text-sm text-text-muted">
              Early-stage startups, aesthetic-only redesigns, and one-off execution projects without
              ownership of business outcomes.
            </p>
          </div>
        </div>
      </section>

      <FinalCtaSection
        title="Ready to Engineer Revenue Infrastructure With Executive Control?"
        qualifier="If your team is operating in the INR 4Cr-50Cr range, start with a Strategic Diagnostic."
      />
    </>
  );
}




