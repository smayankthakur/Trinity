import Image from "next/image";
import { readdir } from "node:fs/promises";
import path from "node:path";

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
        <div className="flex flex-wrap items-center gap-2 px-2 py-1">
          {logos.map((logo) => (
            <div
              key={logo.fileName}
              className="flex h-16 w-40 items-center justify-center rounded-md border border-line bg-surface px-3 py-2"
            >
              <Image
                src={`/assets/Client/${encodeURIComponent(logo.fileName)}`}
                alt={`${logo.label} logo`}
                width={140}
                height={36}
                className="max-h-9 w-auto object-contain"
                loading="lazy"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
