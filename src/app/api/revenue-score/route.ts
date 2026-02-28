import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { revenueScoreLeadSchema } from "@/lib/validation/revenue-score";
import { calculateRevenueScore, getScoreBucket } from "@/lib/revenue-score";
import {
  createRevenueScoreLead,
  hasRecentRevenueScoreSubmission,
} from "@/lib/server/revenue-score-leads";
import { upsertRevenueLead } from "@/lib/server/revenue-leads";

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ipAddress = getClientIp(request);
  const userAgent = request.headers.get("user-agent") ?? "unknown";

  const limit = checkRateLimit(`revenue_score:${ipAddress}`, 60_000, 8);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Please retry shortly." },
      { status: 429, headers: { "Retry-After": `${limit.retryAfterSeconds}` } },
    );
  }

  try {
    const body = await request.json();
    const parsed = revenueScoreLeadSchema.safeParse(body);

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

    const email = payload.email.toLowerCase();
    const duplicate = await hasRecentRevenueScoreSubmission(email, 24);
    if (duplicate) {
      return NextResponse.json(
        { ok: false, message: "A recent score already exists for this email." },
        { status: 409 },
      );
    }

    const score = calculateRevenueScore(payload.answers);
    const saved = await createRevenueScoreLead({
      name: payload.name,
      email,
      company: payload.company || "",
      revenueRange: payload.revenueRange,
      answers: payload.answers,
      totalScore: score.total,
      riskLevel: score.riskLevel,
      breakdown: score.breakdown,
      ipAddress,
      userAgent,
    });

    await upsertRevenueLead({
      name: payload.name,
      email,
      company: payload.company || "",
      revenueRange: payload.revenueRange,
      ipAddress,
      userAgent,
    });

    return NextResponse.json({
      ok: true,
      leadId: saved.id,
      totalScore: score.total,
      riskLevel: score.riskLevel,
      breakdown: score.breakdown,
      scoreBucket: getScoreBucket(score.total),
      revenueRange: payload.revenueRange,
    });
  } catch {
    return NextResponse.json({ ok: false, message: "Unable to calculate score." }, { status: 500 });
  }
}
