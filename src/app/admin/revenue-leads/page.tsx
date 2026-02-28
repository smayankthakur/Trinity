import type { Metadata } from "next";
import { listRevenueLeads, type RevenueLeadRow } from "@/lib/server/revenue-leads";

export const metadata: Metadata = {
  title: "Revenue Leads Admin",
  description: "Admin view for Revenue Leak Checklist leads.",
};
export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ key?: string; revenue_range?: string }>;
};

export default async function RevenueLeadsAdminPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const key = params.key ?? "";
  const revenueRange = params.revenue_range;
  const authorized = Boolean(process.env.ADMIN_EXPORT_KEY && key === process.env.ADMIN_EXPORT_KEY);

  if (!authorized) {
    return (
      <section className="section-wrap">
        <div className="surface-panel p-7 md:p-9">
          <h1 className="headline-tight font-heading text-3xl font-bold md:text-4xl">Unauthorized</h1>
          <p className="mt-3 text-sm text-text-muted">Provide a valid admin key via query params.</p>
        </div>
      </section>
    );
  }

  let leads: Awaited<ReturnType<typeof listRevenueLeads>> = [];
  try {
    leads = await listRevenueLeads(revenueRange);
  } catch {
    leads = [];
  }
  const exportHref = `/api/admin/revenue-leads/export?key=${encodeURIComponent(key)}${
    revenueRange ? `&revenue_range=${encodeURIComponent(revenueRange)}` : ""
  }`;

  return (
    <section className="section-wrap">
      <div className="surface-panel p-7 md:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="headline-tight font-heading text-3xl font-bold md:text-4xl">Revenue Leads</h1>
          <a href={exportHref} className="command-button">
            Export CSV
          </a>
        </div>

        <form className="mt-4 flex flex-wrap items-end gap-3" method="get">
          <input type="hidden" name="key" value={key} />
          <label className="grid gap-1 text-sm">
            Revenue Range
            <select
              name="revenue_range"
              defaultValue={revenueRange ?? ""}
              className="rounded-md border border-line bg-surface px-3 py-2"
            >
              <option value="">All</option>
              <option value="50l-1cr">INR 50L-INR 1Cr</option>
              <option value="1cr-3cr">INR 1Cr-INR 3Cr</option>
              <option value="3cr-5cr">INR 3Cr-INR 5Cr</option>
              <option value="5crplus">INR 5Cr+</option>
            </select>
          </label>
          <button type="submit" className="ghost-command-button">
            Apply
          </button>
        </form>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-text-muted">
                <th className="px-2 py-2 font-medium">Name</th>
                <th className="px-2 py-2 font-medium">Email</th>
                <th className="px-2 py-2 font-medium">Company</th>
                <th className="px-2 py-2 font-medium">Revenue Range</th>
                <th className="px-2 py-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead: RevenueLeadRow) => (
                <tr key={lead.id} className="border-b border-line/60">
                  <td className="px-2 py-2">{lead.name}</td>
                  <td className="px-2 py-2">{lead.email}</td>
                  <td className="px-2 py-2">{lead.company ?? "-"}</td>
                  <td className="px-2 py-2">{lead.revenue_range}</td>
                  <td className="px-2 py-2">{new Date(lead.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
