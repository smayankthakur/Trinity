import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/sections/hero-section";
import { DiagnosticSuccessContent } from "@/components/diagnostic/diagnostic-success-content";

export const metadata: Metadata = {
  title: "Diagnostic Success",
  description: "Confirmation page after Strategic Diagnostic submission.",
  openGraph: {
    title: "Diagnostic Success | Sitelytc Digital Media",
    description: "Confirmation page after Strategic Diagnostic submission.",
    type: "website",
    url: "https://sitelytc.com/diagnostic-success",
  },
};

export default function DiagnosticSuccessPage() {
  return (
    <>
      <HeroSection
        title="Diagnostic Submitted"
        subtitle="Your revenue leak analysis is being processed."
        primaryCta={{ href: "https://calendly.com/sitelytc/sitelytc-meet", label: "Book Strategy Call" }}
      />

      <section className="section-wrap pt-0">
        <DiagnosticSuccessContent />
        <div className="mx-auto mt-4 max-w-[960px] px-4 md:px-0">
          <Link href="/" className="text-sm text-accent hover:underline">
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
