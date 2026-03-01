"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/events";
import { CTAButton } from "@/components/ui/cta-button";

const CALENDLY_URL = "https://calendly.com/sitelytc/sitelytc-meet";

export function DiagnosticSuccessContent() {
  useEffect(() => {
    trackEvent("diagnostic_success_viewed", { page: "/diagnostic-success" });
    trackEvent("crm_pixel_fired", { page: "/diagnostic-success" });

    fetch("/api/form-capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page_source: "/diagnostic-success",
        timestamp: new Date().toISOString(),
        event_name: "diagnostic_success",
      }),
      keepalive: true,
    }).catch(() => undefined);
  }, []);

  return (
    <div className="surface-panel p-4 md:p-6">
      <div className="mx-auto max-w-[960px] space-y-5">
        <div className="rounded-xl border border-line bg-surface p-5 md:p-7">
          <h1 className="font-heading text-3xl font-semibold md:text-4xl">Thank You</h1>
          <p className="mt-3 max-w-3xl text-sm text-text-muted">
            Your diagnostic has been submitted. Choose a suitable slot to discuss your revenue leak
            architecture with our strategy team.
          </p>
          <div className="mt-4">
            <CTAButton
              href={CALENDLY_URL}
              label="Book Strategy Call"
              eventName="revenue_score_strategy_call_click"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_14px_40px_rgba(0,0,0,0.2)]">
          <iframe
            title="Calendly Booking"
            src="https://calendly.com/sitelytc/sitelytc-meet?hide_gdpr_banner=1"
            className="block w-full"
            style={{ minHeight: "850px" }}
          />
        </div>
      </div>
    </div>
  );
}
