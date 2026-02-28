import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { StrategicDiagnosticForm } from "@/components/forms/strategic-diagnostic-form";

export const metadata: Metadata = {
  title: "Strategic Diagnostic",
  description:
    "Start your Revenue Leakage Audit through Sitelytc's progressive Strategic Diagnostic funnel.",
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
        <StrategicDiagnosticForm />
      </section>
    </>
  );
}

