"use client";

import { type FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics/events";
import { CTAButton } from "@/components/ui/cta-button";

const calendlyUrl = "https://calendly.com/sitelytc/sitelytc-meet";

export function RevenueLeakForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [revenueRange, setRevenueRange] = useState("50l-1cr");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Full Name is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/revenue-leak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          company: company.trim(),
          revenueRange,
          website,
        }),
      });

      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        revenueRange?: string;
        timestamp?: string;
      };

      if (!response.ok || !data.ok) {
        setError(data.message ?? "Unable to submit form.");
        return;
      }

      trackEvent("revenue_checklist_download", {
        revenue_range: data.revenueRange ?? revenueRange,
        timestamp: data.timestamp ?? new Date().toISOString(),
      });
      setSuccess(true);
    } catch {
      setError("Network error. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mt-6 rounded-md border border-line bg-surface p-4">
        <p className="text-sm text-text-muted">
          Checklist Sent. Check your inbox. If you’re serious about structural growth, book your strategy
          call.
        </p>
        <div className="mt-4">
          <CTAButton href={calendlyUrl} label="Schedule Strategy Call" />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-3 md:max-w-2xl md:grid-cols-2">
      <label className="grid gap-1 text-sm">
        Full Name
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-md border border-line bg-surface px-3 py-2"
          required
        />
      </label>
      <label className="grid gap-1 text-sm">
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-md border border-line bg-surface px-3 py-2"
          required
        />
      </label>
      <label className="grid gap-1 text-sm">
        Company Name (optional)
        <input
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="rounded-md border border-line bg-surface px-3 py-2"
        />
      </label>
      <label className="grid gap-1 text-sm">
        Monthly Revenue Range
        <select
          value={revenueRange}
          onChange={(event) => setRevenueRange(event.target.value)}
          className="rounded-md border border-line bg-surface px-3 py-2"
        >
          <option value="50l-1cr">INR 50L-INR 1Cr</option>
          <option value="1cr-3cr">INR 1Cr-INR 3Cr</option>
          <option value="3cr-5cr">INR 3Cr-INR 5Cr</option>
          <option value="5crplus">INR 5Cr+</option>
        </select>
      </label>
      <label className="sr-only" aria-hidden="true">
        Website
        <input
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </label>

      {error ? (
        <p className="md:col-span-2 text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <div className="md:col-span-2">
        <button type="submit" className="command-button w-full md:w-auto" disabled={loading}>
          {loading ? "Submitting..." : "Download Checklist"}
        </button>
      </div>
    </form>
  );
}
