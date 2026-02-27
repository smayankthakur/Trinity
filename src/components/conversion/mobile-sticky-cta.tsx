"use client";

import { usePathname } from "next/navigation";
import { CTAButton } from "@/components/ui/cta-button";

export function MobileStickyCta() {
  const pathname = usePathname();

  if (pathname === "/book-diagnostic") {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-white p-3 lg:hidden">
      <CTAButton
        href="/book-diagnostic"
        label="Book Strategic Diagnostic"
        className="w-full"
        eventName="mobile_sticky_cta_click"
      />
    </div>
  );
}
