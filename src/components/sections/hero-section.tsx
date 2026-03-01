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
    <section className="section-wrap blueprint-grid grid items-center gap-12 lg:grid-cols-[1.08fr_1fr]">
      <div className="surface-panel p-8 md:p-10">
        <p className="label-precision text-text-muted">Sitelytc Digital Media</p>
        <h1 className="headline-tight mt-5 font-heading text-4xl font-extrabold md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base text-text-muted md:text-lg">{subtitle}</p>
        {qualifier ? <p className="mt-4 text-sm font-semibold text-accent">{qualifier}</p> : null}
        <div className="mt-8 flex flex-wrap gap-3">
          {/* Primary conversion trigger: consistent Start Your Revenue Leakage Audit CTA. */}
          <CTAButton href={primaryCta.href} label={primaryCta.label} />
          {secondaryCta ? (
            <CTAButton href={secondaryCta.href} label={secondaryCta.label} variant="secondary" />
          ) : null}
        </div>
      </div>
      <div className="infrastructure-card">
        <div className="infrastructure-header">
          <span className="label-precision text-text-muted">REVENUE INFRASTRUCTURE ENGINE</span>
          <p className="sub mt-3 text-sm text-text-muted">
            Traffic {"->"} UX {"->"} CRM {"->"} Ops {"->"} Reporting
          </p>
        </div>
        <div className="infrastructure-image-wrapper">
          <img
            src="/assets/revenue-infrastructure.png"
            alt="Revenue Infrastructure Engine - Traffic UX CRM Ops Reporting Architecture"
            width={1200}
            height={760}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}


