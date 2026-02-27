"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CTAButton } from "@/components/ui/cta-button";

export function FloatingCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const depth = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
      setVisible(depth > 0.35);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible || pathname === "/book-diagnostic") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 hidden lg:block">
      <CTAButton
        href="/book-diagnostic"
        label="Book Strategic Diagnostic"
        className="shadow-card"
        eventName="floating_cta_click"
      />
    </div>
  );
}
