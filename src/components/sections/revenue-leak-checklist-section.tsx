import { RevenueLeakForm } from "@/components/forms/revenue-leak-form";

export function RevenueLeakChecklistSection() {
  return (
    <section className="section-wrap pt-0">
      <div className="surface-panel p-7 md:p-9">
        <h2 className="headline-tight font-heading text-3xl font-bold md:text-4xl">
          Free Revenue Leak Checklist
        </h2>
        <p className="mt-4 max-w-3xl text-base text-text-muted">
          21 structural conversion checks to identify where your funnel is bleeding profit.
        </p>
        <RevenueLeakForm />
      </div>
    </section>
  );
}
