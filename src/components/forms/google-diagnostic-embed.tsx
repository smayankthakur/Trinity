"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics/events";
import { CTAButton } from "@/components/ui/cta-button";

const FORM_SRC =
  "https://docs.google.com/forms/d/e/1FAIpQLSf75Hi80X2SR0tICo3cFglwRDqfRIBHUUqwGG2m4F9_N7L5fQ/viewform?embedded=true";
const CALENDLY_URL = "https://calendly.com/sitelytc/sitelytc-meet";

function getUtmParams() {
  if (typeof window === "undefined") {
    return { utm_source: "", utm_medium: "", utm_campaign: "", utm_term: "", utm_content: "" };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_term: params.get("utm_term") ?? "",
    utm_content: params.get("utm_content") ?? "",
  };
}

export function GoogleDiagnosticEmbed() {
  const [mounted, setMounted] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const [showSuccessPanel, setShowSuccessPanel] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(1400);
  const iframeLoadCount = useRef(0);
  const sentScroll50 = useRef(false);
  const sentScroll90 = useRef(false);
  const sentCapture = useRef(false);

  const payload = useMemo(() => {
    const utm = getUtmParams();
    return {
      page_source: "/diagnostic",
      timestamp: new Date().toISOString(),
      ...utm,
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const calcHeight = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (vw < 640) {
        setIframeHeight(Math.max(1200, Math.round(vh * 1.9)));
        return;
      }
      if (vw < 1024) {
        setIframeHeight(Math.max(1300, Math.round(vh * 1.75)));
        return;
      }
      setIframeHeight(Math.max(1400, Math.round(vh * 1.65)));
    };

    calcHeight();
    window.addEventListener("resize", calcHeight);
    return () => window.removeEventListener("resize", calcHeight);
  }, []);

  useEffect(() => {
    if (sentCapture.current) return;
    sentCapture.current = true;
    fetch("/api/form-capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => undefined);
  }, [payload]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.round((window.scrollY / max) * 100);
      if (!sentScroll50.current && pct >= 50) {
        sentScroll50.current = true;
        trackEvent("diagnostic_scroll_depth", { depth: 50, page: "/diagnostic" });
      }
      if (!sentScroll90.current && pct >= 90) {
        sentScroll90.current = true;
        trackEvent("diagnostic_scroll_depth", { depth: 90, page: "/diagnostic" });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onIframeLoad = () => {
    setIframeReady(true);
    iframeLoadCount.current += 1;
    if (iframeLoadCount.current === 1) {
      trackEvent("diagnostic_form_loaded", { page: "/diagnostic" });
    }
    if (iframeLoadCount.current > 1) {
      setShowSuccessPanel(true);
    }
  };

  return (
    <div className="surface-panel p-4 md:p-6">
      <div className="mx-auto w-full max-w-[820px]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm text-text-muted">
            Complete the diagnostic to receive the next strategic action path.
          </p>
          <Link href="/" className="text-sm text-accent hover:underline">
            Back to Home
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-xl shadow-[0_14px_40px_rgba(0,0,0,0.2)]">
          {!iframeReady && (
            <div
              className="absolute inset-0 z-10 animate-pulse bg-surface"
              aria-hidden="true"
              style={{ minHeight: `${iframeHeight}px` }}
            />
          )}

          {mounted ? (
            <iframe
              title="Strategic Diagnostic Form"
              src={FORM_SRC}
              width="100%"
              height={iframeHeight}
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              loading="lazy"
              onLoad={onIframeLoad}
              className="block w-full rounded-xl"
              style={{ minHeight: `${iframeHeight}px` }}
            >
              Loading…
            </iframe>
          ) : (
            <div className="bg-surface" style={{ minHeight: `${iframeHeight}px` }} />
          )}
        </div>
      </div>

      {showSuccessPanel ? (
        <div className="fixed inset-x-4 bottom-4 z-30 mx-auto max-w-xl rounded-xl border border-line bg-bg-primary/95 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur">
          <h3 className="font-heading text-2xl font-semibold">Diagnostic Submitted</h3>
          <p className="mt-2 text-sm text-text-muted">
            Your revenue leak analysis is being processed.
          </p>
          <div className="mt-4">
            <CTAButton
              href={CALENDLY_URL}
              label="Book Strategy Call"
              eventName="diagnostic_completion_outbound_click"
            />
          </div>
        </div>
      ) : null}

      <p className="mt-4 text-xs text-text-muted">
        MVP note: Google Forms is active for speed. This page is wired for migration to native CRM
        forms with direct scoring and backend validation.
      </p>
    </div>
  );
}
