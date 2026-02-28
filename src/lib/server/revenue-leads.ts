import { createHash, randomBytes } from "node:crypto";
import { getPgPool } from "@/lib/server/db";

export type RevenueLeadRow = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  revenue_range: string;
  created_at: string;
  ip_address: string | null;
  user_agent: string | null;
};

export async function createRevenueLead(input: {
  name: string;
  email: string;
  company?: string;
  revenueRange: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  const pgPool = getPgPool();
  const result = await pgPool.query<RevenueLeadRow>(
    `INSERT INTO revenue_leads (name, email, company, revenue_range, ip_address, user_agent)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, name, email, company, revenue_range, created_at, ip_address, user_agent`,
    [
      input.name,
      input.email,
      input.company || null,
      input.revenueRange,
      input.ipAddress || null,
      input.userAgent || null,
    ],
  );
  return result.rows[0];
}

export async function upsertRevenueLead(input: {
  name: string;
  email: string;
  company?: string;
  revenueRange: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  const pgPool = getPgPool();
  await pgPool.query(
    `INSERT INTO revenue_leads (name, email, company, revenue_range, ip_address, user_agent)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (email)
     DO UPDATE
       SET name = EXCLUDED.name,
           company = EXCLUDED.company,
           revenue_range = EXCLUDED.revenue_range,
           ip_address = EXCLUDED.ip_address,
           user_agent = EXCLUDED.user_agent`,
    [
      input.name,
      input.email,
      input.company || null,
      input.revenueRange,
      input.ipAddress || null,
      input.userAgent || null,
    ],
  );
}

function hashToken(raw: string) {
  return createHash("sha256").update(raw).digest("hex");
}

export async function createChecklistToken(leadId: string) {
  const pgPool = getPgPool();
  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);

  await pgPool.query(
    `INSERT INTO revenue_download_tokens (lead_id, token_hash, expires_at)
     VALUES ($1, $2, NOW() + INTERVAL '24 hours')`,
    [leadId, tokenHash],
  );

  return rawToken;
}

export async function consumeChecklistToken(rawToken: string) {
  const pgPool = getPgPool();
  const tokenHash = hashToken(rawToken);
  const client = await pgPool.connect();

  try {
    await client.query("BEGIN");
    const tokenResult = await client.query<{ id: string; lead_id: string }>(
      `SELECT id, lead_id
       FROM revenue_download_tokens
       WHERE token_hash = $1
         AND used_at IS NULL
         AND expires_at > NOW()
       FOR UPDATE`,
      [tokenHash],
    );

    if (!tokenResult.rows[0]) {
      await client.query("ROLLBACK");
      return null;
    }

    const token = tokenResult.rows[0];
    await client.query(
      `UPDATE revenue_download_tokens
       SET used_at = NOW()
       WHERE id = $1`,
      [token.id],
    );

    await client.query("COMMIT");
    return token.lead_id;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function listRevenueLeads(revenueRange?: string) {
  const pgPool = getPgPool();
  const hasFilter = Boolean(revenueRange);
  const result = await pgPool.query<RevenueLeadRow>(
    `SELECT id, name, email, company, revenue_range, created_at, ip_address, user_agent
     FROM revenue_leads
     ${hasFilter ? "WHERE revenue_range = $1" : ""}
     ORDER BY created_at DESC`,
    hasFilter ? [revenueRange] : [],
  );
  return result.rows;
}
