"use client";

import { FormEvent, useMemo, useState } from "react";
import { CTAButton } from "@/components/ui/cta-button";
import {
  calculateRevenueScore,
  getScoreBucket,
  revenueScoreSections,
  type RevenueScoreAnswers,
  type RevenueScoreBreakdown,
} from "@/lib/revenue-score";
import { trackEvent } from "@/lib/analytics/events";

const calendlyUrl = "https://calendly.com/sitelytc/sitelytc-meet";

type SubmitResponse = {
  ok: boolean;
  message?: string;
  totalScore?: number;
  riskLevel?: string;
  breakdown?: RevenueScoreBreakdown[];
  scoreBucket?: string;
  revenueRange?: string;
};

type ResultState = {
  totalScore: number;
  riskLevel: string;
  breakdown: RevenueScoreBreakdown[];
};

const revenueOptions = [
  { value: "50l-1cr", label: "INR 50L-INR 1Cr" },
  { value: "1cr-3cr", label: "INR 1Cr-INR 3Cr" },
  { value: "3cr-5cr", label: "INR 3Cr-INR 5Cr" },
  { value: "5crplus", label: "INR 5Cr+" },
];

function getRiskCopy(score: number) {
  if (score > 50) {
    return "Your growth is being constrained by structural inefficiencies. Traffic amplification will increase waste, not profit.";
  }
  if (score < 30) {
    return "You have a strong base. Scale optimization could unlock exponential gains.";
  }
  return "Your current structure has hidden leak points that are suppressing compounding growth.";
}

export function RevenueLeakCalculator() {
  const [started, setStarted] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<RevenueScoreAnswers>({});
  const [showLeadGate, setShowLeadGate] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [revenueRange, setRevenueRange] = useState("50l-1cr");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ResultState | null>(null);

  const currentSection = revenueScoreSections[sectionIndex];
  const sectionCount = revenueScoreSections.length;
  const progress = useMemo(() => {
    if (!started) return 0;
    if (result) return 100;
    if (showLeadGate) return 100;
    return Math.round(((sectionIndex + 1) / sectionCount) * 100);
  }, [sectionCount, sectionIndex, showLeadGate, started, result]);

  const sectionComplete = useMemo(
    () => currentSection.questions.every((question) => answers[question.id]),
    [answers, currentSection.questions],
  );

  const canSubmitGate = useMemo(() => {
    const validName = name.trim().length >= 2;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    return validName && validEmail && Boolean(revenueRange) && website.trim() === "";
  }, [name, email, revenueRange, website]);

  const localPreview = useMemo(() => calculateRevenueScore(answers), [answers]);

  const onStart = () => {
    setStarted(true);
    trackEvent("revenue_score_started", {
      revenue_range: "unknown",
      score_bucket: "unknown",
      timestamp: new Date().toISOString(),
    });
  };

  const onNext = () => {
    if (!sectionComplete) {
      setError("Answer every question in this step to continue.");
      return;
    }
    setError("");
    if (sectionIndex >= sectionCount - 1) {
      setShowLeadGate(true);
      return;
    }
    setSectionIndex((prev) => prev + 1);
  };

  const onBack = () => {
    setError("");
    if (showLeadGate) {
      setShowLeadGate(false);
      setSectionIndex(sectionCount - 1);
      return;
    }
    setSectionIndex((prev) => Math.max(0, prev - 1));
  };

  const onSubmitGate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!canSubmitGate) {
      setError("Complete all required fields with valid details.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/revenue-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          company: company.trim(),
          revenueRange,
          answers,
          website,
        }),
      });

      const data = (await response.json()) as SubmitResponse;
      if (
        !response.ok ||
        !data.ok ||
        typeof data.totalScore !== "number" ||
        !data.riskLevel ||
        !data.breakdown
      ) {
        setError(data.message ?? "Unable to compute score. Please retry.");
        return;
      }

      setResult({
        totalScore: data.totalScore,
        riskLevel: data.riskLevel,
        breakdown: data.breakdown,
      });
      setShowLeadGate(false);

      const bucket = data.scoreBucket ?? getScoreBucket(data.totalScore);
      trackEvent("revenue_score_completed", {
        revenue_range: data.revenueRange ?? revenueRange,
        score_bucket: bucket,
        total_score: data.totalScore,
        timestamp: new Date().toISOString(),
      });
      if (data.totalScore > 50) {
        trackEvent("revenue_score_high_risk", {
          revenue_range: data.revenueRange ?? revenueRange,
          score_bucket: bucket,
          total_score: data.totalScore,
        });
      }
    } catch {
      setError("Network error. Please retry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-6 rounded-xl border border-line bg-surface/70 p-4 md:p-6">
      {!started ? (
        <div className="space-y-4">
          <p className="text-sm text-text-muted">
            20 strategic checks across architecture, funnel, checkout, AOV, and retention.
          </p>
          <button type="button" className="command-button" onClick={onStart}>
            Calculate Your Revenue Leak Score
          </button>
        </div>
      ) : null}

      {started ? (
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em] text-text-muted">
              <span>{result ? "Result Ready" : showLeadGate ? "Lead Gate" : `Step ${sectionIndex + 1}/${sectionCount}`}</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
              <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {!result && !showLeadGate ? (
            <div className="space-y-4">
              <h3 className="headline-tight font-heading text-2xl font-bold md:text-3xl">
                {currentSection.title}
              </h3>
              <p className="text-sm text-text-muted">{currentSection.explanation}</p>

              <div className="grid gap-4">
                {currentSection.questions.map((question) => (
                  <article key={question.id} className="data-card space-y-3">
                    <p className="text-sm text-text-main">{question.prompt}</p>
                    <div className="grid gap-2 md:grid-cols-3">
                      {question.options.map((option) => {
                        const selected = answers[question.id] === option.value;
                        return (
                          <label
                            key={option.value}
                            className={`cursor-pointer rounded-md border px-3 py-2 text-xs uppercase tracking-[0.1em] transition ${
                              selected
                                ? "border-accent bg-accent/10 text-text-main"
                                : "border-line bg-surface text-text-muted hover:border-accent/60"
                            }`}
                          >
                            <input
                              type="radio"
                              name={question.id}
                              className="sr-only"
                              value={option.value}
                              checked={selected}
                              onChange={() =>
                                setAnswers((prev) => ({ ...prev, [question.id]: option.value }))
                              }
                            />
                            {option.label}
                          </label>
                        );
                      })}
                    </div>
                  </article>
                ))}
              </div>

              {error ? (
                <p role="alert" className="text-sm text-red-400">
                  {error}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3">
                {sectionIndex > 0 ? (
                  <button type="button" className="ghost-command-button" onClick={onBack}>
                    Back
                  </button>
                ) : null}
                <button type="button" className="command-button" onClick={onNext}>
                  {sectionIndex === sectionCount - 1 ? "Continue" : "Next"}
                </button>
              </div>
            </div>
          ) : null}

          {started && showLeadGate && !result ? (
            <form onSubmit={onSubmitGate} className="space-y-4">
              <h3 className="headline-tight font-heading text-2xl font-bold md:text-3xl">
                You have a structural revenue leak. Enter your email to see your full breakdown.
              </h3>
              <p className="text-sm text-text-muted">
                Preliminary score: {localPreview.total}/100 ({localPreview.riskLevel})
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-1 text-sm">
                  Name
                  <input
                    className="rounded-md border border-line bg-surface px-3 py-2"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  Email
                  <input
                    type="email"
                    className="rounded-md border border-line bg-surface px-3 py-2"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  Company
                  <input
                    className="rounded-md border border-line bg-surface px-3 py-2"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  Revenue Range
                  <select
                    className="rounded-md border border-line bg-surface px-3 py-2"
                    value={revenueRange}
                    onChange={(event) => setRevenueRange(event.target.value)}
                  >
                    {revenueOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
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
                <p role="alert" className="text-sm text-red-400">
                  {error}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <button type="button" className="ghost-command-button" onClick={onBack}>
                  Back
                </button>
                <button type="submit" className="command-button" disabled={!canSubmitGate || submitting}>
                  {submitting ? "Calculating..." : "Reveal Full Breakdown"}
                </button>
              </div>
            </form>
          ) : null}

          {result ? (
            <div className="space-y-4">
              <div className="data-card">
                <p className="label-precision text-text-muted">Revenue Leak Score</p>
                <h3 className="mt-2 font-heading text-3xl font-bold">{result.totalScore}/100</h3>
                <p className="mt-2 text-sm text-text-muted">Risk Level: {result.riskLevel}</p>
                <p className="mt-3 text-sm text-text-muted">{getRiskCopy(result.totalScore)}</p>
              </div>

              <div className="grid gap-3">
                {result.breakdown.map((item) => (
                  <article key={item.sectionId} className="data-card">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium text-text-main">{item.sectionTitle}</p>
                      <p className="text-xs uppercase tracking-[0.12em] text-text-muted">
                        {item.score}/{item.weight}
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-text-muted">{item.explanation}</p>
                  </article>
                ))}
              </div>

              <div className="rounded-md border border-line bg-surface p-4">
                <p className="font-heading text-2xl font-semibold">Fix It Structurally. Not Emotionally.</p>
                <p className="mt-2 text-sm text-text-muted">
                  This is not a design issue. It&apos;s a revenue architecture issue.
                </p>
                <div className="mt-4">
                  <CTAButton
                    href={calendlyUrl}
                    label="Schedule Strategy Call"
                    eventName="revenue_score_strategy_call_click"
                    className="w-full md:w-auto"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
