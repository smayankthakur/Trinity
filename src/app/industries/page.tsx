import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { IndustryBlock } from "@/components/ui/industry-block";
import { industries } from "@/lib/data/site-data";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Industry-specific revenue bottleneck patterns and infrastructure priorities across e-commerce, SaaS, and legacy firms.",
};

export default function IndustriesPage() {
  return (
    <>
      <HeroSection
        title="Industry-Specific Revenue Architecture"
        subtitle="Different business models fail at different points in the revenue path. We adapt RAP-90 architecture to the constraints that actually matter."
        primaryCta={{ href: "/diagnostic", label: "Start Your Revenue Leakage Audit" }}
        secondaryCta={{ href: "/case-results", label: "View Case Results" }}
      />

      <section className="section-wrap">
        <p className="max-w-3xl text-base text-text-muted">
          Choose the model closest to your operating environment. Each block shows common bottlenecks,
          expected outcomes, and where leadership teams usually recover the highest financial leverage.
        </p>
        <div className="grid gap-4">
          {industries.map((industry) => (
            <IndustryBlock key={industry.slug} {...industry} />
          ))}
        </div>
      </section>

      <FinalCtaSection
        title="If Your Team Matches This Profile, Start Your Revenue Leakage Audit"
        qualifier="Qualification is based on business stage, decision ownership, and implementation readiness."
      />
    </>
  );
}



