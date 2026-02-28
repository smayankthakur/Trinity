"use client";

import { usePathname } from "next/navigation";
import { CTAButton } from "@/components/ui/cta-button";

export function MobileStickyCta() {
  const pathname = usePathname();

  if (pathname.startsWith("/diagnostic")) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-surface p-3 lg:hidden">
      <CTAButton
        href="/diagnostic"
        label="Start Your Revenue Leakage Audit"
        className="w-full"
        eventName="mobile_sticky_cta_click"
      />
    </div>
  );
}

