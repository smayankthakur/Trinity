"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics/events";
import type { StrategicDiagnosticInput } from "@/lib/validation/strategic-diagnostic";
import { isHighValueProspect } from "@/lib/validation/strategic-diagnostic";

type Draft = Omit<StrategicDiagnosticInput, "privacyConsent"> & {
  privacyConsent: boolean;
};

type SubmissionState = {
  loading: boolean;
  error: string | null;
  success: string | null;
};

const initialDraft: Draft = {
  annualRevenue: "lt5",
  industry: "ecommerce",
  primaryBottleneck: "conversion",
  monthlyAdSpend: "lt5",
  expectedRevenueUpside: "10to30",
  roughImpactInr: "25to100",
  cac: "",
  ltvToCac: "",
  techStack: "",
  decisionMaker: "yes",
  email: "",
  whatsapp: "",
  privacyConsent: false,
};

const totalSteps = 4;

type StepFieldErrors = Partial<Record<keyof Draft, string>>;

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validateWhatsapp(value: string) {
  return /^\+?[0-9\s\-()]{8,20}$/.test(value.trim());
}

function getLeadScoringSeed(payload: Draft) {
  // Placeholder hook for lead scoring integration.
  return {
    revenueBand: payload.annualRevenue,
    adSpendBand: payload.monthlyAdSpend,
    expectedUpsideBand: payload.expectedRevenueUpside,
    decisionMaker: payload.decisionMaker,
  };
}

function getEnrichmentSeed(payload: Draft) {
  // Placeholder hook for Clearbit/ZoomInfo enrichment integration.
  return {
    emailDomain: payload.email.split("@")[1] ?? "",
    industry: payload.industry,
    whatsapp: payload.whatsapp,
  };
}

export function StrategicDiagnosticForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [errors, setErrors] = useState<StepFieldErrors>({});
  const [status, setStatus] = useState<SubmissionState>({
    loading: false,
    error: null,
    success: null,
  });

  const highValueLead = useMemo(
    () => isHighValueProspect({ annualRevenue: draft.annualRevenue }),
    [draft.annualRevenue],
  );

  const progressPercent = (step / totalSteps) * 100;

  const stepContent = useMemo(() => {
    if (step === 1) {
      return {
        eyebrow: "Step 1 of 4 - Ego Entry",
        title: "Establish your operating scale",
        description:
          "We use this to calibrate how aggressive and financially meaningful your diagnostic should be.",
      };
    }
    if (step === 2) {
      return {
        eyebrow: "Step 2 of 4 - Pain Exposure",
        title: "Pinpoint the bottleneck slowing growth",
        description:
          "We diagnose where revenue leaks are compounding and where system intervention creates the highest return.",
      };
    }
    if (step === 3) {
      return {
        eyebrow: "Step 3 of 4 - Value Anchoring",
        title: "Quantify upside before execution",
        description:
          "Serious teams define upside math before deciding implementation priority and investment velocity.",
      };
    }
    return {
      eyebrow: "Step 4 of 4 - Authority Gate",
      title: "Confirm ownership and decision path",
      description:
        "This gate ensures strategic recommendations are reviewed by stakeholders with allocation authority.",
    };
  }, [step]);

  const validateCurrentStep = () => {
    const nextErrors: StepFieldErrors = {};

    if (step === 1) {
      if (!draft.annualRevenue) nextErrors.annualRevenue = "Select an annual revenue range.";
      if (!draft.industry) nextErrors.industry = "Select your industry.";
    }

    if (step === 2) {
      if (!draft.primaryBottleneck) nextErrors.primaryBottleneck = "Select your primary bottleneck.";
      if (!draft.monthlyAdSpend) nextErrors.monthlyAdSpend = "Select monthly ad spend.";
    }

    if (step === 3) {
      if (!draft.expectedRevenueUpside)
        nextErrors.expectedRevenueUpside = "Select expected revenue upside.";
      if (!draft.roughImpactInr) nextErrors.roughImpactInr = "Select expected INR impact.";
    }

    if (step === 4) {
      if (!draft.decisionMaker) {
        nextErrors.decisionMaker = "Confirm decision-maker status.";
      }
      if (!draft.email.trim()) {
        nextErrors.email = "Work email is required.";
      } else if (!validateEmail(draft.email)) {
        nextErrors.email = "Enter a valid work email.";
      }
      if (!draft.whatsapp.trim()) {
        nextErrors.whatsapp = "WhatsApp number is required.";
      } else if (!validateWhatsapp(draft.whatsapp)) {
        nextErrors.whatsapp = "Enter a valid WhatsApp number.";
      }
      if (!draft.privacyConsent) {
        nextErrors.privacyConsent = "Consent is required to proceed.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateCurrentStep()) {
      return;
    }
    setStatus({ loading: false, error: null, success: null });
    setStep((prev) => Math.min(prev + 1, totalSteps));
    trackEvent("diagnostic_step_next", { step, flow: "strategic_diagnostic_v3" });
  };

  const prevStep = () => {
    setStatus({ loading: false, error: null, success: null });
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 1));
    trackEvent("diagnostic_step_back", { step, flow: "strategic_diagnostic_v3" });
  };

  const submit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setStatus({ loading: true, error: null, success: null });
    trackEvent("diagnostic_form_submit_clicked", {
      flow: "strategic_diagnostic_v3",
      leadScoringSeed: getLeadScoringSeed(draft),
    });

    try {
      const response = await fetch("/api/diagnostic-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...draft,
          integration: {
            leadScoringSeed: getLeadScoringSeed(draft),
            enrichmentSeed: getEnrichmentSeed(draft),
          },
        }),
      });

      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        issues?: string[];
      };

      if (!response.ok || !data.ok) {
        const fallback = data.issues?.[0] ?? data.message ?? "Submission failed. Please retry.";
        setStatus({ loading: false, error: fallback, success: null });
        trackEvent("diagnostic_form_submit_failed", { reason: fallback, flow: "strategic_diagnostic_v3" });
        return;
      }

      setStatus({
        loading: false,
        error: null,
        success: "Application received. Redirecting to Phase 0 self-assessment...",
      });

      trackEvent("diagnostic_form_submitted", {
        flow: "strategic_diagnostic_v3",
        annualRevenue: draft.annualRevenue,
        industry: draft.industry,
        highValueLead,
      });

      setTimeout(() => {
        router.push("/diagnostic/phase-0");
      }, 600);
    } catch {
      setStatus({
        loading: false,
        error: "Network issue. Please retry in a moment.",
        success: null,
      });
      trackEvent("diagnostic_form_submit_failed", { reason: "network_error", flow: "strategic_diagnostic_v3" });
    }
  };

  return (
    <div className="data-card grid gap-6">
      <div className="space-y-2">
        <p className="label-precision text-accent">{stepContent.eyebrow}</p>
        <h2 className="headline-tight font-heading text-2xl font-bold md:text-3xl">{stepContent.title}</h2>
        <p className="text-sm text-text-muted">{stepContent.description}</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span>Progress</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-alt">
          <div
            className="h-full bg-accent transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="min-h-[280px] transition-all duration-300 ease-out">
        {step === 1 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              Annual Revenue
              <select
                className="rounded-md border border-line bg-surface px-3 py-2"
                value={draft.annualRevenue}
                onChange={(event) =>
                  setDraft((prev) => ({
                    ...prev,
                    annualRevenue: event.target.value as Draft["annualRevenue"],
                  }))
                }
              >
                <option value="lt5">Below INR 5Cr</option>
                <option value="5to20">INR 5Cr-20Cr</option>
                <option value="20to100">INR 20Cr-100Cr</option>
                <option value="100plus">INR 100Cr+</option>
              </select>
              {errors.annualRevenue ? <span className="text-xs text-red-400">{errors.annualRevenue}</span> : null}
            </label>

            <label className="grid gap-2 text-sm">
              Industry
              <select
                className="rounded-md border border-line bg-surface px-3 py-2"
                value={draft.industry}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, industry: event.target.value as Draft["industry"] }))
                }
              >
                <option value="ecommerce">E-commerce</option>
                <option value="saas">SaaS</option>
                <option value="legacy">Legacy Professional Firm</option>
                <option value="other">Other</option>
              </select>
              {errors.industry ? <span className="text-xs text-red-400">{errors.industry}</span> : null}
            </label>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              Primary Bottleneck
              <select
                className="rounded-md border border-line bg-surface px-3 py-2"
                value={draft.primaryBottleneck}
                onChange={(event) =>
                  setDraft((prev) => ({
                    ...prev,
                    primaryBottleneck: event.target.value as Draft["primaryBottleneck"],
                  }))
                }
              >
                <option value="traffic">Traffic Quality</option>
                <option value="conversion">Conversion Leakage</option>
                <option value="retention">Retention Weakness</option>
                <option value="operations">Operations Drag</option>
                <option value="reporting">Reporting Blind Spots</option>
              </select>
              {errors.primaryBottleneck ? (
                <span className="text-xs text-red-400">{errors.primaryBottleneck}</span>
              ) : null}
            </label>

            <label className="grid gap-2 text-sm">
              Monthly Ad Spend
              <select
                className="rounded-md border border-line bg-surface px-3 py-2"
                value={draft.monthlyAdSpend}
                onChange={(event) =>
                  setDraft((prev) => ({
                    ...prev,
                    monthlyAdSpend: event.target.value as Draft["monthlyAdSpend"],
                  }))
                }
              >
                <option value="lt5">Below INR 5L</option>
                <option value="5to20">INR 5L-20L</option>
                <option value="20to50">INR 20L-50L</option>
                <option value="50plus">INR 50L+</option>
              </select>
              {errors.monthlyAdSpend ? <span className="text-xs text-red-400">{errors.monthlyAdSpend}</span> : null}
            </label>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              Expected Revenue Upside (12 months)
              <select
                className="rounded-md border border-line bg-surface px-3 py-2"
                value={draft.expectedRevenueUpside}
                onChange={(event) =>
                  setDraft((prev) => ({
                    ...prev,
                    expectedRevenueUpside: event.target.value as Draft["expectedRevenueUpside"],
                  }))
                }
              >
                <option value="lt10">Below 10%</option>
                <option value="10to30">10%-30%</option>
                <option value="30to60">30%-60%</option>
                <option value="60plus">60%+</option>
              </select>
              {errors.expectedRevenueUpside ? (
                <span className="text-xs text-red-400">{errors.expectedRevenueUpside}</span>
              ) : null}
            </label>

            <label className="grid gap-2 text-sm">
              Rough INR Impact
              <select
                className="rounded-md border border-line bg-surface px-3 py-2"
                value={draft.roughImpactInr}
                onChange={(event) =>
                  setDraft((prev) => ({
                    ...prev,
                    roughImpactInr: event.target.value as Draft["roughImpactInr"],
                  }))
                }
              >
                <option value="lt25">Below INR 25L</option>
                <option value="25to100">INR 25L-1Cr</option>
                <option value="100to300">INR 1Cr-3Cr</option>
                <option value="300plus">INR 3Cr+</option>
              </select>
              {errors.roughImpactInr ? <span className="text-xs text-red-400">{errors.roughImpactInr}</span> : null}
            </label>

            {highValueLead ? (
              <>
                <p className="md:col-span-2 rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm">
                  High-value profile detected (INR 20Cr+). Optional advanced diagnostics improve recommendation
                  precision.
                </p>
                <label className="grid gap-2 text-sm">
                  CAC (optional)
                  <input
                    className="rounded-md border border-line bg-surface px-3 py-2"
                    value={draft.cac ?? ""}
                    onChange={(event) => setDraft((prev) => ({ ...prev, cac: event.target.value }))}
                    placeholder="e.g., INR 4,800"
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  LTV:CAC (optional)
                  <input
                    className="rounded-md border border-line bg-surface px-3 py-2"
                    value={draft.ltvToCac ?? ""}
                    onChange={(event) => setDraft((prev) => ({ ...prev, ltvToCac: event.target.value }))}
                    placeholder="e.g., 4.2:1"
                  />
                </label>
                <label className="grid gap-2 text-sm md:col-span-2">
                  Current Tech Stack (optional)
                  <input
                    className="rounded-md border border-line bg-surface px-3 py-2"
                    value={draft.techStack ?? ""}
                    onChange={(event) => setDraft((prev) => ({ ...prev, techStack: event.target.value }))}
                    placeholder="e.g., Shopify + HubSpot + GA4 + Meta + Klaviyo"
                  />
                </label>
              </>
            ) : null}
          </div>
        ) : null}

        {step === 4 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm md:col-span-2">
              Are you the final decision-maker for INR 15L+ spend?
              <select
                className="rounded-md border border-line bg-surface px-3 py-2"
                value={draft.decisionMaker}
                onChange={(event) =>
                  setDraft((prev) => ({
                    ...prev,
                    decisionMaker: event.target.value as Draft["decisionMaker"],
                  }))
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.decisionMaker ? <span className="text-xs text-red-400">{errors.decisionMaker}</span> : null}
            </label>

            <label className="grid gap-2 text-sm">
              Work Email
              <input
                type="email"
                className="rounded-md border border-line bg-surface px-3 py-2"
                value={draft.email}
                onChange={(event) => setDraft((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="name@company.com"
              />
              {errors.email ? <span className="text-xs text-red-400">{errors.email}</span> : null}
            </label>

            <label className="grid gap-2 text-sm">
              WhatsApp
              <input
                className="rounded-md border border-line bg-surface px-3 py-2"
                value={draft.whatsapp}
                onChange={(event) => setDraft((prev) => ({ ...prev, whatsapp: event.target.value }))}
                placeholder="+91XXXXXXXXXX"
              />
              {errors.whatsapp ? <span className="text-xs text-red-400">{errors.whatsapp}</span> : null}
            </label>

            <label className="md:col-span-2 flex items-start gap-2 text-xs text-text-muted">
              <input
                type="checkbox"
                checked={draft.privacyConsent}
                onChange={(event) => setDraft((prev) => ({ ...prev, privacyConsent: event.target.checked }))}
                className="mt-0.5"
              />
              <span>
                I consent to processing this information for qualification and strategic review under the{" "}
                <a href="/privacy-policy" className="font-semibold text-accent underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {errors.privacyConsent ? <span className="text-xs text-red-400">{errors.privacyConsent}</span> : null}
          </div>
        ) : null}
      </div>

      {status.error ? (
        <p className="rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300" role="alert">
          {status.error}
        </p>
      ) : null}

      {status.success ? (
        <p
          className="rounded-md border border-green-400/30 bg-green-500/10 px-3 py-2 text-sm text-green-300"
          role="status"
        >
          {status.success}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        {step > 1 ? (
          <button type="button" className="ghost-command-button" onClick={prevStep} disabled={status.loading}>
            Back
          </button>
        ) : null}

        {step < totalSteps ? (
          <button type="button" className="command-button" onClick={nextStep} disabled={status.loading}>
            Next
          </button>
        ) : (
          <button type="button" className="command-button" onClick={submit} disabled={status.loading}>
            {status.loading ? "Submitting..." : "Apply for Strategic Diagnostic"}
          </button>
        )}
      </div>
    </div>
  );
}
