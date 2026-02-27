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
          {/* Primary conversion trigger: consistent Request Strategic Diagnostic CTA. */}
          <CTAButton href={primaryCta.href} label={primaryCta.label} />
          {secondaryCta ? (
            <CTAButton href={secondaryCta.href} label={secondaryCta.label} variant="secondary" />
          ) : null}
        </div>
      </div>
      <div className="surface-panel overflow-hidden p-7 md:p-8">
        <p className="label-precision text-text-muted">Revenue Infrastructure Engine</p>
        <p className="mt-3 text-sm text-text-muted">Traffic {"->"} UX {"->"} CRM {"->"} Ops {"->"} Reporting</p>
        <div className="mt-6 rounded-xl border border-line bg-surface-alt/30 p-6">
          <div className="relative mx-auto h-52 w-full max-w-sm">
            <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50" />
            <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line" />
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
            {[
              "left-2 top-12",
              "left-16 top-2",
              "right-16 top-2",
              "right-2 top-12",
              "right-2 bottom-12",
              "right-16 bottom-2",
              "left-16 bottom-2",
              "left-2 bottom-12",
            ].map((position) => (
              <div key={position} className={`absolute ${position} h-2.5 w-2.5 rounded-full bg-ink ring-2 ring-accent`} />
            ))}
          </div>
          <p className="label-precision mt-3 text-center text-text-muted">
            Blueprint View: Revenue Signal Topology
          </p>
        </div>
      </div>
    </section>
  );
}

