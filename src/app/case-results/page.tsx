import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { CaseResultCard } from "@/components/ui/case-result-card";
import { caseResults } from "@/lib/data/site-data";

export const metadata: Metadata = {
  title: "Case Results",
  description: "Before-after performance outcomes from revenue infrastructure engagements.",
};

export default function CaseResultsPage() {
  return (
    <>
      <HeroSection
        title="Case Results"
        subtitle="Quantified proof from conversion, operations, and reporting infrastructure improvements."
        primaryCta={{ href: "/book-diagnostic", label: "Book Strategic Diagnostic" }}
        secondaryCta={{ href: "/rap-90", label: "View RAP-90 Overview" }}
      />

      <section className="section-wrap">
        {/* Conversion trigger: metrics-first case format by company type. */}
        <div className="grid gap-4">
          {caseResults.map((item) => (
            <CaseResultCard key={item.companyType} {...item} />
          ))}
        </div>
      </section>

      <FinalCtaSection title="Review Fit and Book Strategic Diagnostic" />
    </>
  );
}

