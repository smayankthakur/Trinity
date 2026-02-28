import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sitelytc's authority model: disciplined delivery governance, measurable systems architecture, and decision-grade reporting.",
};

export default function AboutPage() {
  return (
    <>
      <HeroSection
        title="Authority Through Delivery Discipline"
        subtitle="Sitelytc combines conversion architecture, operating system design, and reporting governance for executive-level growth decisions."
        primaryCta={{ href: "/diagnostic", label: "Start Your Revenue Leakage Audit" }}
        secondaryCta={{ href: "/rap-90", label: "View RAP-90 Framework" }}
      />

      <section className="section-wrap">
        <p className="max-w-3xl text-base text-text-muted">
          We are structured as a revenue infrastructure partner, not a design vendor. Engagement quality is
          managed through accountable cadence, KPI ownership, and executive reporting standards.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Structured governance with weekly leadership checkpoints and decision logs",
            "Single source of metric truth across demand, conversion, and operations",
            "NDA-ready delivery model for commercially sensitive infrastructure data",
          ].map((item) => (
            <article key={item} className="data-card text-sm text-text-muted">
              {item}
            </article>
          ))}
        </div>
      </section>

      <FinalCtaSection
        title="Work With a Revenue Infrastructure Partner, Not a Website Vendor"
        qualifier="For teams ready to tie digital execution to measurable financial outcomes."
      />
    </>
  );
}



