import type { Metadata } from "next";
import { listRevenueScoreLeads, type RevenueScoreLeadRow } from "@/lib/server/revenue-score-leads";

export const metadata: Metadata = {
  title: "Revenue Score Leads Admin",
  description: "Admin view for Revenue Leak Score leads.",
};
export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ key?: string; risk_level?: string }>;
};

const riskOptions = [
  "Low Leak (Optimized Structure)",
  "Moderate Leak (Hidden Friction)",
  "Severe Structural Inefficiency",
  "Critical Revenue Bleed",
];

function formatRevenueRange(value: string) {
  if (value === "50l-1cr") return "INR 50L-INR 1Cr";
  if (value === "1cr-3cr") return "INR 1Cr-INR 3Cr";
  if (value === "3cr-5cr") return "INR 3Cr-INR 5Cr";
  if (value === "5crplus") return "INR 5Cr+";
  return value;
}

export default async function RevenueScoresAdminPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const key = params.key ?? "";
  const riskLevel = params.risk_level;
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

  let leads: Awaited<ReturnType<typeof listRevenueScoreLeads>> = [];
  try {
    leads = await listRevenueScoreLeads(riskLevel);
  } catch {
    leads = [];
  }

  const exportHref = `/api/admin/revenue-scores/export?key=${encodeURIComponent(key)}${
    riskLevel ? `&risk_level=${encodeURIComponent(riskLevel)}` : ""
  }`;

  return (
    <section className="section-wrap">
      <div className="surface-panel p-7 md:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="headline-tight font-heading text-3xl font-bold md:text-4xl">Revenue Score Leads</h1>
          <a href={exportHref} className="command-button">
            Export CSV
          </a>
        </div>

        <form className="mt-4 flex flex-wrap items-end gap-3" method="get">
          <input type="hidden" name="key" value={key} />
          <label className="grid gap-1 text-sm">
            Risk Level
            <select
              name="risk_level"
              defaultValue={riskLevel ?? ""}
              className="rounded-md border border-line bg-surface px-3 py-2"
            >
              <option value="">All</option>
              {riskOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
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
                <th className="px-2 py-2 font-medium">Total Score</th>
                <th className="px-2 py-2 font-medium">Risk Level</th>
                <th className="px-2 py-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead: RevenueScoreLeadRow) => (
                <tr key={lead.id} className="border-b border-line/60">
                  <td className="px-2 py-2">{lead.name}</td>
                  <td className="px-2 py-2">{lead.email}</td>
                  <td className="px-2 py-2">{lead.company || "-"}</td>
                  <td className="px-2 py-2">{formatRevenueRange(lead.revenue_range)}</td>
                  <td className="px-2 py-2">{lead.total_score}</td>
                  <td className="px-2 py-2">{lead.risk_level}</td>
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
