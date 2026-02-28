import { z } from "zod";

export const revenueRangeEnum = z.enum(["50l-1cr", "1cr-3cr", "3cr-5cr", "5crplus"]);

export const revenueLeakSchema = z.object({
  name: z.string().trim().min(2, "Full Name is required.").max(120),
  email: z.string().trim().email("Enter a valid email address."),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  revenueRange: revenueRangeEnum,
  website: z.string().max(0).optional().or(z.literal("")),
});

export type RevenueLeakInput = z.infer<typeof revenueLeakSchema>;
