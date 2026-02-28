import Script from "next/script";

export function AnalyticsScripts() {
  return (
    <>
      {/* Replace IDs with production values for GA4/PostHog once available. */}
      <Script id="analytics-placeholder" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function(){window.dataLayer.push(arguments);};
          window.gtag("consent", "default", {
            ad_storage: "denied",
            analytics_storage: "granted"
          });
        `}
      </Script>
    </>
  );
}


