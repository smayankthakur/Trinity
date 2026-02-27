import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { RAP90FrameworkBlock } from "@/components/sections/rap90-framework-block";
import { MetricCard } from "@/components/ui/metric-card";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { homeMetrics, rapPhases } from "@/lib/data/site-data";

export const metadata: Metadata = {
  title: "Home",
  description: "Revenue infrastructure partner for growth-stage businesses.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="We Engineer Revenue Infrastructure for Scaling Businesses"
        subtitle="Not websites. Structured digital systems that unlock measurable growth in 90 days."
        qualifier="For companies in the INR 4Cr-50Cr revenue range. Program investment: INR 12L-28L."
        primaryCta={{ href: "/book-diagnostic", label: "Book Strategic Diagnostic" }}
        secondaryCta={{ href: "/rap-90", label: "View RAP-90 Framework" }}
      />

      <section className="section-wrap">
        <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">The Scaling Ceiling</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            "Revenue plateau despite media spend",
            "Rising acquisition cost and lower efficiency",
            "Backend process bottlenecks",
            "Fragmented reporting and slow decisions",
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
              Growth-stage companies with active demand and infrastructure constraints.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Not For</p>
            <p className="mt-2 text-sm text-text-muted">
              Early-stage startups and one-off redesign requests without operational scope.
            </p>
          </div>
        </div>
      </section>

      <FinalCtaSection
        title="Ready to Remove Revenue Bottlenecks?"
        qualifier="Single primary action across the site: Book Strategic Diagnostic."
      />
    </>
  );
}

