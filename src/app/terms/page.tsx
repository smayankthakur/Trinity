import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <section className="section-wrap">
      <h1 className="font-heading text-4xl font-bold tracking-tight">Terms and Conditions</h1>
      <p className="mt-4 max-w-3xl text-sm text-text-muted">
        Placeholder page for engagement terms, delivery scope boundaries, and jurisdiction clauses.
      </p>
    </section>
  );
}

