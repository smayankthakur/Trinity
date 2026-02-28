import { z } from "zod";

export const revenueBandEnum = z.enum(["lt5", "5to20", "20to100", "100plus"]);
export const industryBandEnum = z.enum(["ecommerce", "saas", "legacy", "other"]);
export const bottleneckEnum = z.enum(["traffic", "conversion", "retention", "operations", "reporting"]);
export const adSpendBandEnum = z.enum(["lt5", "5to20", "20to50", "50plus"]);
export const upsideBandEnum = z.enum(["lt10", "10to30", "30to60", "60plus"]);
export const impactBandEnum = z.enum(["lt25", "25to100", "100to300", "300plus"]);
export const decisionMakerEnum = z.enum(["yes", "no"]);

export const strategicDiagnosticSchema = z
  .object({
    annualRevenue: revenueBandEnum,
    industry: industryBandEnum,
    primaryBottleneck: bottleneckEnum,
    monthlyAdSpend: adSpendBandEnum,
    expectedRevenueUpside: upsideBandEnum,
    roughImpactInr: impactBandEnum,
    cac: z.string().trim().max(120).optional(),
    ltvToCac: z.string().trim().max(120).optional(),
    techStack: z.string().trim().max(200).optional(),
    decisionMaker: decisionMakerEnum,
    email: z.string().email("Enter a valid work email."),
    whatsapp: z.string().trim().min(8, "Enter a valid WhatsApp number.").max(20),
    privacyConsent: z.literal(true),
  });

export type StrategicDiagnosticInput = z.infer<typeof strategicDiagnosticSchema>;

export function isHighValueProspect(data: Pick<StrategicDiagnosticInput, "annualRevenue">) {
  return ["20to100", "100plus"].includes(data.annualRevenue);
}

