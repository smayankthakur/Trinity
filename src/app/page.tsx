import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { RevenueLeakChecklistSection } from "@/components/sections/revenue-leak-checklist-section";
import { RevenueLeakScoreSection } from "@/components/sections/revenue-leak-score-section";

const calendlyUrl = "https://calendly.com/sitelytc/sitelytc-meet";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Strategy-led revenue optimization platform for D2C and B2B brands between INR 50L and INR 5Cr revenue.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="If Your Website Isn't Converting, It's Bleeding Money."
        subtitle="We help D2C & B2B brands between INR 50L-INR 5Cr revenue eliminate revenue leaks and turn underperforming traffic into measurable profit."
        qualifier="Most brands don't have a traffic problem. They have a conversion architecture problem."
        primaryCta={{ href: calendlyUrl, label: "Schedule Strategy Call" }}
      />

      {/* 50/50 diagnostic split section: left narrative + right embedded form */}
      <section className="w-full py-10 lg:min-h-screen lg:py-0">
        <div className="mx-auto flex min-h-screen w-full max-w-[1200px] items-center px-5 lg:px-10">
          {/* Desktop: equal columns with 60px gap | Mobile: stacked with content first */}
          <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-[60px]">
            {/* Left column: existing headline + bullet blocks + authority footer line */}
            <div className="min-w-0">
              <h2 className="headline-tight font-heading text-3xl font-bold md:text-4xl">
                Your Website Is Not a Growth Engine. It&apos;s a Leak.
              </h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {[
                  "Rising CAC with no AOV engineering",
                  "High traffic, low conversion",
                  "Checkout friction",
                  "No funnel psychology",
                  "No retention mechanics",
                ].map((item) => (
                  <article
                    key={item}
                    className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-surface-alt/20 px-5 py-4 transition hover:shadow-[0_0_22px_rgba(197,160,89,0.12)]"
                  >
                    <p className="text-sm text-text-muted">{item}</p>
                  </article>
                ))}
              </div>
              <p className="mt-6 border-t border-line pt-5 text-base font-semibold text-accent">
                Traffic amplifies structure. If structure is weak, traffic magnifies loss.
              </p>
            </div>

            {/* Right column: Google Form iframe exactly as embedded */}
            <aside className="min-w-0">
              <div className="rounded-2xl border border-white/10 bg-[#111] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                <iframe
                  title="Strategic Diagnostic Form"
                  src="https://docs.google.com/forms/d/e/1FAIpQLSf75Hi80X2SR0tICo3cFglwRDqfRIBHUUqwGG2m4F9_N7L5fQ/viewform?embedded=true"
                  width="100%"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  loading="lazy"
                  className="block w-full rounded-xl border-0"
                  style={{ minHeight: "900px" }}
                >
                  Loading...
                </iframe>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <RevenueLeakChecklistSection />
      <RevenueLeakScoreSection />

      <section className="section-wrap pt-0">
        <div className="surface-panel p-7 md:p-9">
          <h2 className="headline-tight font-heading text-3xl font-bold md:text-4xl">
            The SITELYTC Growth Engine(TM)
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Phase 1 - Audit",
                points: [
                  "Conversion architecture breakdown",
                  "Traffic quality analysis",
                  "Funnel performance heatmap",
                ],
              },
              {
                title: "Phase 2 - Structural Fix",
                points: [
                  "Funnel restructuring",
                  "UX friction elimination",
                  "Messaging repositioning",
                ],
              },
              {
                title: "Phase 3 - Conversion Layer",
                points: [
                  "Psychological triggers",
                  "Checkout optimization",
                  "AOV mechanics",
                ],
              },
              {
                title: "Phase 4 - Scale Optimization",
                points: [
                  "Paid traffic alignment",
                  "Retention loops",
                  "Profit scaling model",
                ],
              },
            ].map((phase) => (
              <article key={phase.title} className="data-card">
                <p className="label-precision text-text-muted">{phase.title}</p>
                <ul className="mt-3 grid gap-2 text-sm text-text-muted">
                  {phase.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap pt-0">
        <div className="surface-panel p-7 md:p-9">
          <h2 className="headline-tight font-heading text-3xl font-bold md:text-4xl">
            Deep Case Study
          </h2>
          <p className="mt-3 text-base text-text-muted">BabyDocShop (Irish D2C brand)</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="data-card">
              <p className="label-precision text-text-muted">Client Situation</p>
              <p className="mt-2 text-sm text-text-muted">
                Stagnant growth despite strong traffic.
              </p>
            </article>
            <article className="data-card">
              <p className="label-precision text-text-muted">Hidden Revenue Problem</p>
              <ul className="mt-2 grid gap-2 text-sm text-text-muted">
                <li>Catalog-based homepage</li>
                <li>Weak buyer education</li>
                <li>No AOV structure</li>
                <li>Checkout friction</li>
              </ul>
            </article>
            <article className="data-card">
              <p className="label-precision text-text-muted">Strategic Fix</p>
              <p className="mt-2 text-sm text-text-muted">
                Applied SITELYTC Growth Engine(TM).
              </p>
            </article>
            <article className="data-card">
              <p className="label-precision text-text-muted">Measured Results (within 120 days)</p>
              <ul className="mt-2 grid gap-2 text-sm text-text-muted">
                <li>Conversion: 1.3% -&gt; 2.9%</li>
                <li>AOV: EUR 42 -&gt; EUR 61</li>
                <li>Revenue: +112%</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section-wrap pt-0">
        <div className="surface-panel p-7 md:p-9">
          <h2 className="headline-tight font-heading text-3xl font-bold md:text-4xl">
            I&apos;m Not Here to Design Your Website. I&apos;m Here to Challenge Your Assumptions.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="data-card">
              <p className="label-precision text-text-muted">Hard Truths</p>
              <ul className="mt-2 grid gap-2 text-sm text-text-muted">
                <li>More traffic won&apos;t fix structural inefficiency.</li>
                <li>Beautiful does not equal profitable.</li>
                <li>Most agencies optimize visuals, not economics.</li>
              </ul>
            </article>
            <article className="data-card">
              <p className="label-precision text-text-muted">Contrarian Insight</p>
              <p className="mt-2 text-sm text-text-muted">
                High-growth brands scale because their funnel architecture compounds
                performance.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-wrap pt-0">
        <div className="surface-panel grid gap-4 p-7 md:grid-cols-2 md:p-9">
          <article className="data-card">
            <p className="label-precision text-text-muted">We Work With</p>
            <ul className="mt-2 grid gap-2 text-sm text-text-muted">
              <li>Brands doing INR 50L-INR 5Cr revenue</li>
              <li>Businesses ready for INR 50L+ retainers</li>
              <li>Founders serious about structural growth</li>
            </ul>
          </article>
          <article className="data-card">
            <p className="label-precision text-text-muted">We Are Not For</p>
            <ul className="mt-2 grid gap-2 text-sm text-text-muted">
              <li>Idea stage</li>
              <li>Budget under INR 50L</li>
              <li>Quick redesign requests</li>
              <li>Short-term campaign mindset</li>
            </ul>
          </article>
        </div>
      </section>

      <FinalCtaSection
        title="Ready to Stop Bleeding Revenue?"
        qualifier="This is a structural evaluation, not a sales pitch."
        ctaHref={calendlyUrl}
        ctaLabel="Schedule Strategy Call"
      />
    </>
  );
}
