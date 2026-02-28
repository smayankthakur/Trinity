import { NextResponse } from "next/server";
import { consumeChecklistToken } from "@/lib/server/revenue-leads";
import { generateRevenueChecklistPdf } from "@/lib/server/revenue-checklist-pdf";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ ok: false, message: "Missing token." }, { status: 400 });
  }

  try {
    const leadId = await consumeChecklistToken(token);
    if (!leadId) {
      return NextResponse.json(
        { ok: false, message: "Download link invalid or expired." },
        { status: 410 },
      );
    }

    const bytes = await generateRevenueChecklistPdf();
    return new Response(Buffer.from(bytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="website-revenue-leak-checklist.pdf"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    return NextResponse.json({ ok: false, message: "Unable to generate checklist." }, { status: 500 });
  }
}
