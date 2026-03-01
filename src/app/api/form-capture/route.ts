import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/server/rate-limit";

const formCaptureSchema = z.object({
  page_source: z.string().trim().min(1).max(120),
  timestamp: z.string().datetime().optional(),
  event_name: z.string().trim().max(120).optional(),
  utm_source: z.string().trim().max(120).optional().or(z.literal("")),
  utm_medium: z.string().trim().max(120).optional().or(z.literal("")),
  utm_campaign: z.string().trim().max(160).optional().or(z.literal("")),
  utm_term: z.string().trim().max(160).optional().or(z.literal("")),
  utm_content: z.string().trim().max(160).optional().or(z.literal("")),
});

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = checkRateLimit(`form_capture:${ip}`, 60_000, 24);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many requests." },
      { status: 429, headers: { "Retry-After": `${limit.retryAfterSeconds}` } },
    );
  }

  try {
    const body = await request.json();
    const parsed = formCaptureSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Invalid payload." }, { status: 400 });
    }

    const payload = parsed.data;
    // Readiness layer: capture for future CRM/webhook migration.
    console.info("[form-capture]", {
      ...payload,
      ip_address: ip,
      user_agent: request.headers.get("user-agent") ?? "unknown",
    });

    return NextResponse.json({ ok: true, receivedAt: new Date().toISOString() });
  } catch {
    return NextResponse.json({ ok: false, message: "Unable to capture form event." }, { status: 500 });
  }
}
