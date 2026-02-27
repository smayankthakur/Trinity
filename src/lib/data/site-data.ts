import type { CaseResult, Industry, Metric, Phase } from "@/types";

export const homeMetrics: Metric[] = [
  {
    label: "Conversion Lift",
    value: "+38%",
    context: "Median improvement from diagnosed bottlenecks in qualified engagements",
  },
  {
    label: "AOV Increase",
    value: "+22%",
    context: "Journey and checkout architecture improvements across key buyer steps",
  },
  {
    label: "Ops Load Reduced",
    value: "-40 hrs/mo",
    context: "Manual handoff and reporting tasks removed through system redesign",
  },
  {
    label: "Decision Speed",
    value: "2.1x",
    context: "Faster weekly leadership decisions through cleaner revenue reporting",
  },
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
    problem:
      "High traffic volume, but weak checkout completion and disconnected CRM automation.",
    fix: "Rebuilt checkout flow, cart recovery sequencing, and CRM event architecture.",
    before: "1.8% CVR",
    after: "2.6% CVR",
    impact: "INR 1.4Cr annualized revenue upside",
  },
  {
    companyType: "VC-backed B2B SaaS",
    problem:
      "Qualified demo velocity slowed by fragmented lead routing and weak attribution confidence.",
    fix: "Refactored lead routing, scoring rules, and weekly decision dashboard structure.",
    before: "21-day sales cycle",
    after: "15-day sales cycle",
    impact: "31% faster revenue realization",
  },
  {
    companyType: "Legacy Professional Firm",
    problem: "Manual handoffs, delayed follow-up, and no reliable source-to-revenue visibility.",
    fix: "Unified intake, CRM workflows, and governance-level performance reporting.",
    before: "Opaque ROI",
    after: "Weekly source-level clarity",
    impact: "26 hrs/month of partner and operations time recovered",
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
    name: "Legacy Professional Firms",
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

