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
        title="If Your Website Isn’t Converting, It’s Bleeding Money."
        subtitle="We help D2C & B2B brands between INR 50L-INR 5Cr revenue eliminate revenue leaks and turn underperforming traffic into measurable profit."
        qualifier="Most brands don’t have a traffic problem. They have a conversion architecture problem."
        primaryCta={{ href: calendlyUrl, label: "Schedule Strategy Call" }}
      />

      <section className="section-wrap">
        <div className="surface-panel p-7 md:p-9">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
            <div>
              <h2 className="headline-tight font-heading text-3xl font-bold md:text-4xl">
                Your Website Is Not a Growth Engine. It’s a Leak.
              </h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {[
                  "Rising CAC with no AOV engineering",
                  "High traffic, low conversion",
                  "Checkout friction",
                  "No funnel psychology",
                  "No retention mechanics",
                ].map((item) => (
                  <div key={item} className="data-card">
                    <p className="text-sm text-text-muted">{item}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-line pt-5 text-base font-semibold text-accent">
                Traffic amplifies structure. If structure is weak, traffic magnifies loss.
              </p>
            </div>

            <aside className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_14px_40px_rgba(0,0,0,0.2)]">
              <iframe
                title="Strategic Diagnostic Form"
                src="https://docs.google.com/forms/d/e/1FAIpQLSf75Hi80X2SR0tICo3cFglwRDqfRIBHUUqwGG2m4F9_N7L5fQ/viewform?embedded=true"
                width="100%"
                height={820}
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                loading="lazy"
                className="block w-full"
              >
                Loading...
              </iframe>
            </aside>
          </div>
        </div>
      </section>

      <RevenueLeakChecklistSection />
      <RevenueLeakScoreSection />

      <section className="section-wrap pt-0">
        <div className="surface-panel p-7 md:p-9">
          <h2 className="headline-tight font-heading text-3xl font-bold md:text-4xl">
            The SITELYTC Growth Engine™
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
                Applied SITELYTC Growth Engine™.
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
            I’m Not Here to Design Your Website. I’m Here to Challenge Your Assumptions.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="data-card">
              <p className="label-precision text-text-muted">Hard Truths</p>
              <ul className="mt-2 grid gap-2 text-sm text-text-muted">
                <li>More traffic won’t fix structural inefficiency.</li>
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
