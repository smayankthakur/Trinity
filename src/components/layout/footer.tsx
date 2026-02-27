import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="section-wrap py-10 md:py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-text-muted">
          <p>Precision Digital Architecture for Scaling Businesses.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/book-diagnostic" className="font-semibold text-ink">
              Book Strategic Diagnostic
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

