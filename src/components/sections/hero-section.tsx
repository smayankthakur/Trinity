import { CTAButton } from "@/components/ui/cta-button";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  qualifier?: string;
};

export function HeroSection({ title, subtitle, primaryCta, secondaryCta, qualifier }: HeroSectionProps) {
  return (
    <section className="section-wrap grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Sitelytc Digital Media</p>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base text-text-muted md:text-lg">{subtitle}</p>
        {qualifier ? <p className="mt-3 text-sm font-semibold">{qualifier}</p> : null}
        <div className="mt-8 flex flex-wrap gap-3">
          {/* Primary conversion trigger: consistent Book Strategic Diagnostic CTA. */}
          <CTAButton href={primaryCta.href} label={primaryCta.label} />
          {secondaryCta ? (
            <CTAButton href={secondaryCta.href} label={secondaryCta.label} variant="secondary" />
          ) : null}
        </div>
      </div>
      <div className="data-card">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Revenue System Diagram</p>
        <p className="mt-3 text-sm text-text-muted">
          Traffic {"->"} UX {"->"} Checkout {"->"} CRM {"->"} Operations {"->"} Reporting
        </p>
        <div className="mt-5 rounded-md border border-dashed border-line p-4 text-sm text-text-muted">
          Diagram placeholder for leakage markers and handoff points.
        </div>
      </div>
    </section>
  );
}

