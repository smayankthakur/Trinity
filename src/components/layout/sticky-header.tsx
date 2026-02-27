import Link from "next/link";
import { navLinks, primaryCta } from "@/lib/constants/navigation";
import { CTAButton } from "@/components/ui/cta-button";

export function StickyHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[80rem] items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="font-heading text-lg font-semibold tracking-tight">
          Sitelytc Digital Media
        </Link>
        <nav aria-label="Primary" className="hidden gap-5 text-sm text-text-muted md:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <CTAButton href={primaryCta.href} label={primaryCta.label} className="hidden md:inline-flex" />
      </div>
    </header>
  );
}

