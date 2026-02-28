import { Pool } from "pg";

declare global {
  var __sitelytcPgPool: Pool | undefined;
}

function createPool() {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    max: Number(process.env.PG_POOL_MAX ?? 20),
    idleTimeoutMillis: Number(process.env.PG_IDLE_TIMEOUT_MS ?? 30000),
    connectionTimeoutMillis: Number(process.env.PG_CONNECTION_TIMEOUT_MS ?? 5000),
    ssl: process.env.PG_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  });
}

export function getPgPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("Missing DATABASE_URL environment variable.");
  }

  if (!global.__sitelytcPgPool) {
    global.__sitelytcPgPool = createPool();
  }

  return global.__sitelytcPgPool;
}
