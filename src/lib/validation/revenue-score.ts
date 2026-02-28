import { z } from "zod";
import { revenueScoreSections } from "@/lib/revenue-score";

const questionIds = revenueScoreSections.flatMap((section) =>
  section.questions.map((question) => question.id),
);

const answerValueSchema = z.enum(["strong", "partial", "weak"]);

export const revenueScoreLeadSchema = z
  .object({
    name: z.string().trim().min(2, "Name is required.").max(120),
    email: z.string().trim().email("Valid email is required."),
    company: z.string().trim().max(160).optional().or(z.literal("")),
    revenueRange: z.enum(["50l-1cr", "1cr-3cr", "3cr-5cr", "5crplus"]),
    answers: z.record(z.string(), answerValueSchema),
    website: z.string().max(0).optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    for (const id of questionIds) {
      if (!data.answers[id]) {
        ctx.addIssue({
          code: "custom",
          path: ["answers", id],
          message: `Missing answer for ${id}.`,
        });
      }
    }
  });

export type RevenueScoreLeadInput = z.infer<typeof revenueScoreLeadSchema>;
