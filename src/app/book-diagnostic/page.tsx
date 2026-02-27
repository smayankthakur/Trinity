import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { BookDiagnosticForm } from "@/components/forms/book-diagnostic-form";

export const metadata: Metadata = {
  title: "Book Diagnostic",
  description: "Qualification-first booking for the RAP-90 strategic diagnostic.",
};

export default function BookDiagnosticPage() {
  return (
    <>
      <HeroSection
        title="Book Strategic Diagnostic"
        subtitle="Qualification-first process for growth-stage companies pursuing infrastructure-led revenue gains."
        qualifier="Best fit: INR 4Cr-50Cr annual revenue | Program: INR 12L-28L"
        primaryCta={{ href: "/book-diagnostic", label: "Book Strategic Diagnostic" }}
      />

      <section className="section-wrap pt-0">
        <BookDiagnosticForm />
      </section>
    </>
  );
}

