import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { IndustryBlock } from "@/components/ui/industry-block";
import { industries } from "@/lib/data/site-data";

export const metadata: Metadata = {
  title: "Industries",
  description: "Revenue bottleneck patterns across e-commerce, SaaS, and legacy firms.",
};

export default function IndustriesPage() {
  return (
    <>
      <HeroSection
        title="Industry-Specific Revenue Architecture"
        subtitle="Sector-specific bottlenecks and operating model adjustments for growth-stage teams."
        primaryCta={{ href: "/book-diagnostic", label: "Book Strategic Diagnostic" }}
        secondaryCta={{ href: "/case-results", label: "View Case Results" }}
      />

      <section className="section-wrap">
        <div className="grid gap-4">
          {industries.map((industry) => (
            <IndustryBlock key={industry.slug} {...industry} />
          ))}
        </div>
      </section>

      <FinalCtaSection title="If Your Team Matches This Profile, Book Strategic Diagnostic" />
    </>
  );
}

