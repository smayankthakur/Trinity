"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CTAButton } from "@/components/ui/cta-button";
import { trackEvent } from "@/lib/analytics/events";

export function ExitIntentModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/book-diagnostic") {
      return;
    }

    const shown = sessionStorage.getItem("exit-intent-shown");
    if (shown) {
      return;
    }

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        setOpen(true);
        sessionStorage.setItem("exit-intent-shown", "1");
        trackEvent("exit_intent_shown");
      }
    };

    document.addEventListener("mouseout", handleMouseLeave);
    return () => document.removeEventListener("mouseout", handleMouseLeave);
  }, [pathname]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 hidden items-center justify-center bg-black/65 p-4 lg:flex">
      <div className="surface-panel w-full max-w-xl p-8">
        <h2 className="font-heading text-2xl font-semibold">Before You Leave</h2>
        <p className="mt-3 text-sm text-text-muted">
          If your company is in the INR 4Cr-50Cr range, the Strategic Diagnostic identifies revenue
          leakage, infrastructure gaps, and a 90-day priority sequence.
        </p>
        <div className="mt-6 flex gap-3">
          <CTAButton
            href="/book-diagnostic"
            label="Request Strategic Diagnostic"
            eventName="exit_intent_cta_click"
          />
          <button
            type="button"
            className="rounded-md border border-line px-5 py-3 text-sm font-semibold hover:border-accent hover:text-accent"
            onClick={() => setOpen(false)}
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}
