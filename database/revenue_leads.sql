CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS revenue_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  company TEXT,
  revenue_range TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT
);

CREATE TABLE IF NOT EXISTS revenue_download_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES revenue_leads(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_revenue_leads_created_at ON revenue_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_revenue_leads_revenue_range ON revenue_leads(revenue_range);
CREATE INDEX IF NOT EXISTS idx_revenue_download_tokens_expires_at ON revenue_download_tokens(expires_at);

CREATE TABLE IF NOT EXISTS revenue_score_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  revenue_range TEXT NOT NULL,
  answers JSONB NOT NULL,
  total_score INTEGER NOT NULL CHECK (total_score >= 0 AND total_score <= 100),
  risk_level TEXT NOT NULL,
  breakdown JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_revenue_score_leads_email ON revenue_score_leads(email);
CREATE INDEX IF NOT EXISTS idx_revenue_score_leads_score ON revenue_score_leads(total_score DESC);
CREATE INDEX IF NOT EXISTS idx_revenue_score_leads_created_at ON revenue_score_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_revenue_score_leads_risk_level ON revenue_score_leads(risk_level);
