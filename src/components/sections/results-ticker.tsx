import Image from "next/image";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { homeMetrics } from "@/lib/data/site-data";

async function getClientLogos() {
  const logoDir = path.join(process.cwd(), "public", "assets", "Client");
  const allowedExt = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg"]);

  try {
    const entries = await readdir(logoDir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => allowedExt.has(path.extname(name).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
      .map((fileName) => ({
        fileName,
        label: path
          .parse(fileName)
          .name.replaceAll("_", " ")
          .replaceAll("&", " & ")
          .replace(/\s+/g, " ")
          .trim(),
      }));
  } catch {
    return [];
  }
}

export async function ResultsTicker() {
  const logos = await getClientLogos();

  return (
    <section className="section-wrap pt-0">
      <div className="surface-panel overflow-hidden p-4 md:p-5">
        <p className="label-precision px-2 text-text-muted">Wall of Proof</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 border-b border-line/70 px-2 pb-4">
          {logos.length > 0 ? (
            logos.map((logo) => (
              <div
                key={logo.fileName}
                className="flex h-16 w-40 items-center justify-center rounded-md border border-line bg-surface px-3 py-2"
              >
                <Image
                  src={`/assets/Client/${encodeURIComponent(logo.fileName)}`}
                  alt={`${logo.label} logo`}
                  width={140}
                  height={36}
                  className="max-h-9 w-auto object-contain opacity-90 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
                  loading="lazy"
                  unoptimized
                />
              </div>
            ))
          ) : (
            <p className="px-2 text-sm text-text-muted">No client logos found in /assets/Client.</p>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2 md:flex-nowrap">
          {homeMetrics.map((metric) => (
            <article
              key={metric.label}
              className="min-w-[14rem] flex-1 rounded-md border border-line bg-surface/80 p-4"
            >
              <p className="headline-tight font-heading text-xl font-bold">{metric.value}</p>
              <p className="label-precision mt-1 text-text-muted">{metric.label}</p>
              <p className="mt-2 text-xs text-text-muted">{metric.context}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
