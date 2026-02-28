import { getPgPool } from "@/lib/server/db";
import type { RevenueScoreBreakdown } from "@/lib/revenue-score";

export type RevenueScoreLeadRow = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  revenue_range: string;
  answers: Record<string, string>;
  total_score: number;
  risk_level: string;
  breakdown: RevenueScoreBreakdown[];
  created_at: string;
  ip_address: string | null;
  user_agent: string | null;
};

export async function hasRecentRevenueScoreSubmission(email: string, hours = 24) {
  const pool = getPgPool();
  const result = await pool.query<{ count: string }>(
    `SELECT COUNT(*)::text as count
     FROM revenue_score_leads
     WHERE email = $1
       AND created_at > NOW() - ($2 || ' hours')::interval`,
    [email, `${hours}`],
  );
  return Number(result.rows[0]?.count ?? "0") > 0;
}

export async function createRevenueScoreLead(input: {
  name: string;
  email: string;
  company?: string;
  revenueRange: string;
  answers: Record<string, string>;
  totalScore: number;
  riskLevel: string;
  breakdown: RevenueScoreBreakdown[];
  ipAddress?: string;
  userAgent?: string;
}) {
  const pool = getPgPool();
  const result = await pool.query<RevenueScoreLeadRow>(
    `INSERT INTO revenue_score_leads
      (name, email, company, revenue_range, answers, total_score, risk_level, breakdown, ip_address, user_agent)
     VALUES ($1,$2,$3,$4,$5::jsonb,$6,$7,$8::jsonb,$9,$10)
     RETURNING id, name, email, company, revenue_range, answers, total_score, risk_level, breakdown, created_at, ip_address, user_agent`,
    [
      input.name,
      input.email,
      input.company || null,
      input.revenueRange,
      JSON.stringify(input.answers),
      input.totalScore,
      input.riskLevel,
      JSON.stringify(input.breakdown),
      input.ipAddress || null,
      input.userAgent || null,
    ],
  );
  return result.rows[0];
}

export async function listRevenueScoreLeads(riskLevel?: string) {
  const pool = getPgPool();
  const hasFilter = Boolean(riskLevel);
  const result = await pool.query<RevenueScoreLeadRow>(
    `SELECT id, name, email, company, revenue_range, answers, total_score, risk_level, breakdown, created_at, ip_address, user_agent
     FROM revenue_score_leads
     ${hasFilter ? "WHERE risk_level = $1" : ""}
     ORDER BY total_score DESC, created_at DESC`,
    hasFilter ? [riskLevel] : [],
  );
  return result.rows;
}
