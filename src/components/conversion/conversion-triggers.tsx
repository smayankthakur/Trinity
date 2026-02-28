"use client";

import { ExitIntentModal } from "@/components/conversion/exit-intent-modal";
import { FloatingCta } from "@/components/conversion/floating-cta";
import { MobileStickyCta } from "@/components/conversion/mobile-sticky-cta";

export function ConversionTriggers() {
  return (
    <>
      <FloatingCta />
      <MobileStickyCta />
      <ExitIntentModal />
    </>
  );
}

