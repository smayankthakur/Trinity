import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

export const metadata: Metadata = {
  title: "About",
  description: "Operating philosophy and delivery governance behind RAP-90.",
};

export default function AboutPage() {
  return (
    <>
      <HeroSection
        title="Authority Through Delivery Discipline"
        subtitle="Sitelytc combines conversion architecture, operations design, and decision-grade reporting."
        primaryCta={{ href: "/book-diagnostic", label: "Book Strategic Diagnostic" }}
        secondaryCta={{ href: "/rap-90", label: "View RAP-90 Method" }}
      />

      <section className="section-wrap">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Structured governance: weekly leadership checkpoints",
            "Single source of metric truth across demand and operations",
            "NDA-ready delivery model for sensitive commercial data",
          ].map((item) => (
            <article key={item} className="data-card text-sm text-text-muted">
              {item}
            </article>
          ))}
        </div>
      </section>

      <FinalCtaSection title="Work With a Revenue Infrastructure Partner, Not a Website Vendor" />
    </>
  );
}

