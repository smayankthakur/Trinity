import { z } from "zod";

export const industryEnum = z.enum(["ecommerce", "saas", "legacy"]);
export const annualRevenueEnum = z.enum(["lt4", "4to10", "10to25", "25to50", "50plus"]);
export const employeeEnum = z.enum(["1to10", "11to50", "51to200", "201plus"]);
export const decisionMakerEnum = z.enum(["yes", "no"]);

export const diagnosticFormSchema = z.object({
  companyName: z.string().trim().min(2, "Company name is required."),
  industry: industryEnum,
  annualRevenue: annualRevenueEnum,
  numberOfEmployees: employeeEnum,
  keyDecisionMaker: decisionMakerEnum,
  bottleneck: z
    .string()
    .trim()
    .min(20, "Please provide a specific bottleneck (minimum 20 characters).")
    .max(350, "Keep bottleneck details under 350 characters."),
  privacyConsent: z.literal(true),
});

export type DiagnosticFormInput = z.infer<typeof diagnosticFormSchema>;

export type QualificationResult = {
  qualified: boolean;
  reasonCode?: "revenue_floor" | "non_decision_maker";
};

export function evaluateQualification(input: DiagnosticFormInput): QualificationResult {
  if (input.annualRevenue === "lt4") {
    return { qualified: false, reasonCode: "revenue_floor" };
  }

  if (input.keyDecisionMaker === "no") {
    return { qualified: false, reasonCode: "non_decision_maker" };
  }

  return { qualified: true };
}

