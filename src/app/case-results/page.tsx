import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { CaseResultCard } from "@/components/ui/case-result-card";
import { caseResults } from "@/lib/data/site-data";

export const metadata: Metadata = {
  title: "Case Results",
  description:
    "Quantified before-after outcomes from Sitelytc revenue architecture engagements across e-commerce, SaaS, and legacy firms.",
};

export default function CaseResultsPage() {
  return (
    <>
      <HeroSection
        title="Case Results: Measured Commercial Outcomes"
        subtitle="Every case links system-level changes to conversion efficiency, operating leverage, and annualized revenue impact."
        primaryCta={{ href: "/book-diagnostic", label: "Request Strategic Diagnostic" }}
        secondaryCta={{ href: "/rap-90", label: "View Revenue Framework" }}
      />

      <section className="section-wrap">
        <p className="max-w-3xl text-base text-text-muted">
          These outcomes represent architecture-led improvements, not short-term campaign spikes. Each
          engagement starts with baseline diagnostics and ends with accountable implementation metrics.
        </p>
        {/* Conversion trigger: metrics-first case format by company type. */}
        <div className="mt-8 grid gap-4">
          {caseResults.map((item) => (
            <CaseResultCard key={item.companyType} {...item} />
          ))}
        </div>
      </section>

      <FinalCtaSection
        title="Review Fit and Request Strategic Diagnostic"
        qualifier="If your company is operating in the INR 4Cr-50Cr range, begin with a qualification-first diagnostic."
      />
    </>
  );
}


