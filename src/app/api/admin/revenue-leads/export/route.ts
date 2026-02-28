import { NextResponse } from "next/server";
import { listRevenueLeads, type RevenueLeadRow } from "@/lib/server/revenue-leads";

function isAuthorized(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  return Boolean(process.env.ADMIN_EXPORT_KEY && key === process.env.ADMIN_EXPORT_KEY);
}

function csvEscape(value: string | null) {
  const raw = value ?? "";
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
  const revenueRange = searchParams.get("revenue_range") ?? undefined;

  try {
    const leads = await listRevenueLeads(revenueRange);
    const header = "Name,Email,Company,Revenue Range,Date";
    const rows = leads.map((lead: RevenueLeadRow) =>
      [
        csvEscape(lead.name),
        csvEscape(lead.email),
        csvEscape(lead.company),
        csvEscape(lead.revenue_range),
        csvEscape(new Date(lead.created_at).toISOString()),
      ].join(","),
    );
    const csv = `${header}\n${rows.join("\n")}`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=revenue-leads.csv",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ ok: false, message: "Unable to export leads." }, { status: 500 });
  }
}
