import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { GoogleDiagnosticEmbed } from "@/components/forms/google-diagnostic-embed";

export const metadata: Metadata = {
  title: "Strategic Diagnostic",
  description:
    "Start your Revenue Leakage Audit through Sitelytc's progressive Strategic Diagnostic funnel.",
  openGraph: {
    title: "Strategic Diagnostic | Sitelytc Digital Media",
    description:
      "Start your Revenue Leakage Audit through Sitelytc's progressive Strategic Diagnostic funnel.",
    type: "website",
    url: "https://sitelytc.com/diagnostic",
  },
};

export default function DiagnosticPage() {
  return (
    <>
      <HeroSection
        title="Start Your Revenue Leakage Audit"
        subtitle="A structured, qualification-first diagnostic for teams that treat growth decisions as financial architecture."
        primaryCta={{ href: "/diagnostic", label: "Start Your Revenue Leakage Audit" }}
        secondaryCta={{ href: "/rap-90", label: "View Revenue Framework" }}
      />

      <section className="section-wrap pt-0">
        <GoogleDiagnosticEmbed />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Strategic Diagnostic",
            url: "https://sitelytc.com/diagnostic",
            description:
              "Start your Revenue Leakage Audit through Sitelytc's progressive Strategic Diagnostic funnel.",
          }),
        }}
      />
    </>
  );
}

