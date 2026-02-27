import type { CaseResult, Industry, Metric, Phase } from "@/types";

export const homeMetrics: Metric[] = [
  { label: "Conversion Lift", value: "+38%", context: "Median across qualified engagements" },
  { label: "AOV Increase", value: "+22%", context: "Driven by flow and checkout optimization" },
  { label: "Ops Time Saved", value: "40 hrs/mo", context: "Manual process reduction" },
  { label: "Decision Velocity", value: "2.1x", context: "Reporting cycle acceleration" },
];

export const rapPhases: Phase[] = [
  {
    title: "Phase 1 - Strategic Diagnostic",
    goal: "Locate measurable leakage across the revenue path.",
    outputs: ["Revenue leak map", "Baseline KPI model", "Priority architecture plan"],
    kpi: "Leakage visibility",
  },
  {
    title: "Phase 2 - Infrastructure Rebuild",
    goal: "Rebuild critical conversion and operations infrastructure.",
    outputs: ["Funnel architecture fixes", "CRM and handoff alignment", "Data model cleanup"],
    kpi: "Conversion + AOV",
  },
  {
    title: "Phase 3 - Optimization Layer",
    goal: "Stabilize gains and establish repeatable decision systems.",
    outputs: ["Testing cadence", "Leadership reporting", "Scale playbook"],
    kpi: "Margin + speed",
  },
];

export const caseResults: CaseResult[] = [
  {
    companyType: "D2C E-commerce",
    problem: "High traffic with weak checkout conversion and fragmented CRM triggers.",
    fix: "Rebuilt checkout logic, cart recovery sequencing, and CRM event mapping.",
    before: "1.8% CVR",
    after: "2.6% CVR",
    impact: "INR 1.4Cr annualized upside",
  },
  {
    companyType: "B2B SaaS",
    problem: "Qualified demos were delayed due to pipeline and attribution blind spots.",
    fix: "Refactored routing logic, lead scoring flow, and decision dashboards.",
    before: "21-day sales cycle",
    after: "15-day sales cycle",
    impact: "31% faster revenue realization",
  },
  {
    companyType: "Legacy Professional Firm",
    problem: "Manual lead handoffs and no source-to-revenue visibility.",
    fix: "Unified intake forms, CRM automation, and reporting governance.",
    before: "Opaque ROI",
    after: "Weekly source-level clarity",
    impact: "26 hrs/month admin time saved",
  },
];

export const industries: Industry[] = [
  {
    slug: "ecommerce",
    name: "E-commerce",
    bottlenecks: ["Checkout friction", "Weak post-purchase flows", "Attribution noise"],
    outcomes: ["Higher CVR", "Higher AOV", "Cleaner acquisition economics"],
  },
  {
    slug: "saas",
    name: "VC-backed SaaS",
    bottlenecks: ["Lead qualification drag", "Fragmented GTM data", "Slow funnel decisions"],
    outcomes: ["Faster velocity", "Better close efficiency", "Predictable reporting"],
  },
  {
    slug: "legacy",
    name: "Legacy Firms",
    bottlenecks: ["Manual workflows", "Untracked pipeline movement", "Delayed response time"],
    outcomes: ["Systemized operations", "Lower leakage", "Governed growth ops"],
  },
];

export const diagnosticFields = [
  "Company name",
  "Industry",
  "Annual revenue band",
  "Monthly traffic or lead volume",
  "Current bottleneck",
  "Current stack",
  "Budget range",
  "Decision-maker status",
] as const;

