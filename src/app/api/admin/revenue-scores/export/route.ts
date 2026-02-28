import { NextResponse } from "next/server";
import { listRevenueScoreLeads, type RevenueScoreLeadRow } from "@/lib/server/revenue-score-leads";

function isAuthorized(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  return Boolean(process.env.ADMIN_EXPORT_KEY && key === process.env.ADMIN_EXPORT_KEY);
}

function csvEscape(value: string | number | null) {
  const raw = value == null ? "" : String(value);
  if (raw.includes(",") || raw.includes('"') || raw.includes("\n")) {
    return `"${raw.replaceAll('"', '""')}"`;
  }
  return raw;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const riskLevel = searchParams.get("risk_level") ?? undefined;

  try {
    const leads = await listRevenueScoreLeads(riskLevel);
    const header = "Name,Email,Company,Revenue Range,Total Score,Risk Level,Date";
    const rows = leads.map((lead: RevenueScoreLeadRow) =>
      [
        csvEscape(lead.name),
        csvEscape(lead.email),
        csvEscape(lead.company),
        csvEscape(lead.revenue_range),
        csvEscape(lead.total_score),
        csvEscape(lead.risk_level),
        csvEscape(new Date(lead.created_at).toISOString()),
      ].join(","),
    );
    const csv = `${header}\n${rows.join("\n")}`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=revenue-score-leads.csv",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ ok: false, message: "Unable to export score leads." }, { status: 500 });
  }
}
