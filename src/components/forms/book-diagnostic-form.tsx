"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics/events";
import type { DiagnosticFormInput } from "@/lib/validation/diagnostic";

type SubmissionState = {
  loading: boolean;
  error: string | null;
};

type DiagnosticFormDraft = Omit<DiagnosticFormInput, "privacyConsent"> & {
  privacyConsent: boolean;
};

const initialForm: DiagnosticFormDraft = {
  companyName: "",
  industry: "ecommerce",
  annualRevenue: "4to10",
  numberOfEmployees: "11to50",
  keyDecisionMaker: "yes",
  bottleneck: "",
  privacyConsent: false,
};

export function BookDiagnosticForm() {
  const router = useRouter();
  const [form, setForm] = useState<DiagnosticFormDraft>(initialForm);
  const [hasStarted, setHasStarted] = useState(false);
  const [status, setStatus] = useState<SubmissionState>({ loading: false, error: null });

  const onFieldInteraction = () => {
    if (hasStarted) {
      return;
    }
    setHasStarted(true);
    trackEvent("diagnostic_form_started");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ loading: true, error: null });
    trackEvent("diagnostic_form_submit_clicked");

    try {
      const response = await fetch("/api/book-diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        issues?: string[];
        qualified?: boolean;
        reasonCode?: string | null;
      };

      if (!response.ok || !data.ok) {
        const fallback = data.issues?.[0] ?? data.message ?? "Submission failed. Try again.";
        setStatus({ loading: false, error: fallback });
        trackEvent("diagnostic_form_submit_failed", { reason: fallback });
        return;
      }

      trackEvent("diagnostic_form_submitted", {
        qualified: data.qualified,
        annualRevenue: form.annualRevenue,
        industry: form.industry,
      });

      if (!data.qualified) {
        trackEvent("lead_disqualified", { reasonCode: data.reasonCode ?? "unknown" });
        router.push(`/not-qualified?reason=${encodeURIComponent(data.reasonCode ?? "unknown")}`);
        return;
      }

      trackEvent("lead_qualified");
      router.push("/book-diagnostic/success");
    } catch {
      setStatus({ loading: false, error: "Network error. Please retry in a moment." });
      trackEvent("diagnostic_form_submit_failed", { reason: "network_error" });
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <form className="data-card grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      {/* Conversion trigger: qualification-first form filters low-budget and low-authority inquiries. */}
      <div className="md:col-span-2">
        <p className="text-sm font-semibold">
          Strategic Diagnostic Application | 6-8 minutes | Reviewed within 1 business day
        </p>
        <p className="mt-2 text-xs text-text-muted">
          This process is designed for growth-stage companies. Submissions below qualification
          thresholds are declined.
        </p>
      </div>

      <label className="grid gap-2 text-sm">
        Company Name
        <input
          required
          name="companyName"
          value={form.companyName}
          onFocus={onFieldInteraction}
          onChange={(event) => setForm((prev) => ({ ...prev, companyName: event.target.value }))}
          className="rounded-md border border-line px-3 py-2"
          autoComplete="organization"
        />
      </label>

      <label className="grid gap-2 text-sm">
        Industry
        <select
          required
          name="industry"
          value={form.industry}
          onFocus={onFieldInteraction}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              industry: event.target.value as DiagnosticFormInput["industry"],
            }))
          }
          className="rounded-md border border-line px-3 py-2"
        >
          <option value="ecommerce">E-commerce</option>
          <option value="saas">SaaS</option>
          <option value="legacy">Legacy Professional Firm</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm">
        Annual Revenue
        <select
          required
          name="annualRevenue"
          value={form.annualRevenue}
          onFocus={onFieldInteraction}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              annualRevenue: event.target.value as DiagnosticFormInput["annualRevenue"],
            }))
          }
          className="rounded-md border border-line px-3 py-2"
        >
          <option value="lt4">Below INR 4Cr</option>
          <option value="4to10">INR 4Cr-10Cr</option>
          <option value="10to25">INR 10Cr-25Cr</option>
          <option value="25to50">INR 25Cr-50Cr</option>
          <option value="50plus">INR 50Cr+</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm">
        Number of Employees
        <select
          required
          name="numberOfEmployees"
          value={form.numberOfEmployees}
          onFocus={onFieldInteraction}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              numberOfEmployees: event.target.value as DiagnosticFormInput["numberOfEmployees"],
            }))
          }
          className="rounded-md border border-line px-3 py-2"
        >
          <option value="1to10">1-10</option>
          <option value="11to50">11-50</option>
          <option value="51to200">51-200</option>
          <option value="201plus">201+</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm">
        Are You a Key Decision Maker?
        <select
          required
          name="keyDecisionMaker"
          value={form.keyDecisionMaker}
          onFocus={onFieldInteraction}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              keyDecisionMaker: event.target.value as DiagnosticFormInput["keyDecisionMaker"],
            }))
          }
          className="rounded-md border border-line px-3 py-2"
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm md:col-span-2">
        Current Revenue Bottleneck
        <textarea
          required
          minLength={20}
          maxLength={350}
          name="bottleneck"
          value={form.bottleneck}
          onFocus={onFieldInteraction}
          onChange={(event) => setForm((prev) => ({ ...prev, bottleneck: event.target.value }))}
          className="min-h-28 rounded-md border border-line px-3 py-2"
          placeholder="Describe the main bottleneck affecting conversion, operations, or reporting."
        />
      </label>

      <label className="flex items-start gap-2 text-xs text-text-muted md:col-span-2">
        <input
          required
          type="checkbox"
          checked={form.privacyConsent}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, privacyConsent: event.target.checked }))
          }
          onFocus={onFieldInteraction}
          className="mt-0.5"
        />
        <span>
          I consent to data processing for qualification under the{" "}
          <a href="/privacy-policy" className="font-semibold text-ink underline">
            Privacy Policy
          </a>
          . NDA-sensitive details can be shared after qualification.
        </span>
      </label>

      {status.error ? (
        <p className="text-sm font-medium text-red-700 md:col-span-2" role="alert">
          {status.error}
        </p>
      ) : null}

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={status.loading}
          className="command-button disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status.loading ? "Submitting..." : "Start Your Revenue Leakage Audit"}
        </button>
      </div>
    </form>
  );
}

