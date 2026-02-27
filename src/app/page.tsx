import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { RAP90FrameworkBlock } from "@/components/sections/rap90-framework-block";
import { MetricCard } from "@/components/ui/metric-card";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { homeMetrics, rapPhases } from "@/lib/data/site-data";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Sitelytc builds revenue infrastructure for INR 4Cr-50Cr companies that need measurable growth outcomes, not website redesigns.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="We Engineer Revenue Infrastructure for Scaling Businesses"
        subtitle="Not websites. Structured digital architecture that converts existing demand into measurable profit."
        qualifier="Best fit: INR 4Cr-50Cr companies. RAP-90 investment range: INR 12L-28L."
        primaryCta={{ href: "/book-diagnostic", label: "Book Strategic Diagnostic" }}
        secondaryCta={{ href: "/rap-90", label: "View Revenue Framework" }}
      />

      <section className="section-wrap">
        <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">The Scaling Ceiling</h2>
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
      </section>

      <section className="section-wrap pt-0">
        {/* Conversion trigger: framework clarity before proof blocks. */}
        <RAP90FrameworkBlock phases={rapPhases} />
      </section>

      <section className="section-wrap pt-0">
        <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">Measured Outcomes</h2>
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
        title="Ready to Remove Revenue Bottlenecks and Scale With Control?"
        qualifier="If your team is operating in the INR 4Cr-50Cr range, start with a Strategic Diagnostic."
      />
    </>
  );
}

