import { NextResponse } from "next/server";
import { listRevenueScoreLeads } from "@/lib/server/revenue-score-leads";

function isAuthorized(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  return Boolean(process.env.ADMIN_EXPORT_KEY && key === process.env.ADMIN_EXPORT_KEY);
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const riskLevel = searchParams.get("risk_level") ?? undefined;

  try {
    const leads = await listRevenueScoreLeads(riskLevel);
    return NextResponse.json({ ok: true, leads });
  } catch {
    return NextResponse.json({ ok: false, message: "Unable to load score leads." }, { status: 500 });
  }
}
