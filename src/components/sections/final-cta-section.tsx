import { CTAButton } from "@/components/ui/cta-button";

type FinalCtaSectionProps = {
  title: string;
  qualifier?: string;
};

export function FinalCtaSection({ title, qualifier }: FinalCtaSectionProps) {
  return (
    <section className="section-wrap">
      <div className="surface-panel p-8 md:p-10">
        <h2 className="headline-tight font-heading text-3xl font-bold md:text-4xl">{title}</h2>
        {qualifier ? <p className="mt-3 text-sm text-text-muted">{qualifier}</p> : null}
        <div className="mt-6">
          <CTAButton href="/book-diagnostic" label="Request Strategic Diagnostic" />
        </div>
      </div>
    </section>
  );
}


