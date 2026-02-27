import { CTAButton } from "@/components/ui/cta-button";

type FinalCtaSectionProps = {
  title: string;
  qualifier?: string;
};

export function FinalCtaSection({ title, qualifier }: FinalCtaSectionProps) {
  return (
    <section className="section-wrap">
      <div className="rounded-lg border border-line bg-white p-8 md:p-10">
        <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
        {qualifier ? <p className="mt-3 text-sm text-text-muted">{qualifier}</p> : null}
        <div className="mt-6">
          <CTAButton href="/book-diagnostic" label="Book Strategic Diagnostic" />
        </div>
      </div>
    </section>
  );
}

