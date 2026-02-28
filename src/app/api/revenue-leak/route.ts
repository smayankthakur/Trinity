import { NextResponse } from "next/server";
import { createChecklistToken, createRevenueLead } from "@/lib/server/revenue-leads";
import { sendRevenueChecklistEmail } from "@/lib/server/email";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { revenueLeakSchema } from "@/lib/validation/revenue-leak";

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ipAddress = getClientIp(request);
  const userAgent = request.headers.get("user-agent") ?? "unknown";

  const limit = checkRateLimit(`revenue_leak:${ipAddress}`, 60_000, 10);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Please retry shortly." },
      { status: 429, headers: { "Retry-After": `${limit.retryAfterSeconds}` } },
    );
  }

  try {
    const body = await request.json();
    const parsed = revenueLeakSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Validation failed.",
          issues: parsed.error.issues.map((issue) => issue.message),
        },
        { status: 400 },
      );
    }

    const payload = parsed.data;
    if (payload.website) {
      return NextResponse.json({ ok: true });
    }

    let lead;
    try {
      lead = await createRevenueLead({
        name: payload.name,
        email: payload.email.toLowerCase(),
        company: payload.company || "",
        revenueRange: payload.revenueRange,
        ipAddress,
        userAgent,
      });
    } catch (error) {
      const pg = error as { code?: string };
      if (pg.code === "23505") {
        return NextResponse.json(
          { ok: false, message: "This email is already registered for the checklist." },
          { status: 409 },
        );
      }
      throw error;
    }

    const token = await createChecklistToken(lead.id);
    const appUrl = process.env.APP_URL ?? "http://localhost:3000";
    const downloadUrl = `${appUrl}/download/revenue-leak?token=${encodeURIComponent(token)}`;

    const emailResult = await sendRevenueChecklistEmail({
      to: lead.email,
      name: lead.name,
      downloadUrl,
    });

    return NextResponse.json({
      ok: true,
      emailSent: emailResult.sent,
      revenueRange: payload.revenueRange,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to process checklist request." },
      { status: 500 },
    );
  }
}
