import { RevenueLeakCalculator } from "@/components/forms/revenue-leak-calculator";

export function RevenueLeakScoreSection() {
  return (
    <section className="section-wrap pt-0">
      <div className="surface-panel p-7 md:p-9">
        <h2 className="headline-tight font-heading text-3xl font-bold md:text-4xl">
          Revenue Leak Score Calculator
        </h2>
        <p className="mt-4 max-w-3xl text-base text-text-muted">
          Assess structural funnel risk in under 3 minutes and see where growth is leaking.
        </p>
        <RevenueLeakCalculator />
      </div>
    </section>
  );
}
