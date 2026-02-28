export type RevenueScoreOption = {
  value: "strong" | "partial" | "weak";
  label: string;
  leakPoints: number;
};

export type RevenueScoreQuestion = {
  id: string;
  prompt: string;
  options: RevenueScoreOption[];
};

export type RevenueScoreSection = {
  id: string;
  title: string;
  weight: number;
  explanation: string;
  questions: RevenueScoreQuestion[];
};

export const revenueScoreSections: RevenueScoreSection[] = [
  {
    id: "conversion_architecture",
    title: "Conversion Architecture",
    weight: 25,
    explanation:
      "Architecture defines whether traffic gets translated into buying momentum or confusion.",
    questions: [
      {
        id: "homepage_conversion_rate_known",
        prompt: "Do you know your exact homepage conversion rate?",
        options: [
          { value: "strong", label: "Yes, tracked weekly", leakPoints: 0 },
          { value: "partial", label: "Tracked occasionally", leakPoints: 5 },
          { value: "weak", label: "No clear tracking", leakPoints: 10 },
        ],
      },
      {
        id: "cta_above_fold",
        prompt: "Is your primary CTA above the fold?",
        options: [
          { value: "strong", label: "Always visible", leakPoints: 0 },
          { value: "partial", label: "Visible on some pages", leakPoints: 5 },
          { value: "weak", label: "Often below fold", leakPoints: 10 },
        ],
      },
      {
        id: "offer_clarity_5s",
        prompt: "Is your offer immediately clear within 5 seconds?",
        options: [
          { value: "strong", label: "Clear immediately", leakPoints: 0 },
          { value: "partial", label: "Partially clear", leakPoints: 5 },
          { value: "weak", label: "Unclear", leakPoints: 10 },
        ],
      },
      {
        id: "buyer_journey_structure",
        prompt: "Do you have a structured buyer journey flow?",
        options: [
          { value: "strong", label: "Mapped and optimized", leakPoints: 0 },
          { value: "partial", label: "Partially mapped", leakPoints: 5 },
          { value: "weak", label: "No clear flow", leakPoints: 10 },
        ],
      },
    ],
  },
  {
    id: "funnel_breakdown",
    title: "Funnel Breakdown",
    weight: 20,
    explanation: "Message alignment and stage-level visibility drive efficient movement through the funnel.",
    questions: [
      {
        id: "landing_intent_match",
        prompt: "Do landing pages match ad intent?",
        options: [
          { value: "strong", label: "Consistently aligned", leakPoints: 0 },
          { value: "partial", label: "Partially aligned", leakPoints: 5 },
          { value: "weak", label: "Frequent mismatch", leakPoints: 10 },
        ],
      },
      {
        id: "dropoff_stage_tracking",
        prompt: "Do you track drop-off by stage?",
        options: [
          { value: "strong", label: "Stage-level tracking active", leakPoints: 0 },
          { value: "partial", label: "Limited tracking", leakPoints: 5 },
          { value: "weak", label: "No stage tracking", leakPoints: 10 },
        ],
      },
      {
        id: "bounce_rate_55",
        prompt: "Is bounce rate under 55%?",
        options: [
          { value: "strong", label: "Under 55%", leakPoints: 0 },
          { value: "partial", label: "55-65%", leakPoints: 5 },
          { value: "weak", label: "Above 65%", leakPoints: 10 },
        ],
      },
      {
        id: "headline_testing",
        prompt: "Do you test headlines?",
        options: [
          { value: "strong", label: "Continuous testing", leakPoints: 0 },
          { value: "partial", label: "Occasional tests", leakPoints: 5 },
          { value: "weak", label: "No testing", leakPoints: 10 },
        ],
      },
    ],
  },
  {
    id: "checkout_friction",
    title: "Checkout Friction",
    weight: 20,
    explanation: "Checkout structure determines whether buying intent converts or drops.",
    questions: [
      {
        id: "checkout_steps",
        prompt: "Is checkout completed in 3 steps or fewer?",
        options: [
          { value: "strong", label: "3 or fewer", leakPoints: 0 },
          { value: "partial", label: "4-5 steps", leakPoints: 5 },
          { value: "weak", label: "More than 5", leakPoints: 10 },
        ],
      },
      {
        id: "guest_checkout",
        prompt: "Is guest checkout enabled?",
        options: [
          { value: "strong", label: "Yes", leakPoints: 0 },
          { value: "partial", label: "Only on select flows", leakPoints: 5 },
          { value: "weak", label: "No", leakPoints: 10 },
        ],
      },
      {
        id: "trust_signals_checkout",
        prompt: "Are trust signals visible during checkout?",
        options: [
          { value: "strong", label: "Consistently visible", leakPoints: 0 },
          { value: "partial", label: "Partially visible", leakPoints: 5 },
          { value: "weak", label: "Not visible", leakPoints: 10 },
        ],
      },
      {
        id: "mobile_checkout_optimized",
        prompt: "Is mobile checkout optimized?",
        options: [
          { value: "strong", label: "Fully optimized", leakPoints: 0 },
          { value: "partial", label: "Partially optimized", leakPoints: 5 },
          { value: "weak", label: "Not optimized", leakPoints: 10 },
        ],
      },
    ],
  },
  {
    id: "aov_engineering",
    title: "AOV Engineering",
    weight: 20,
    explanation: "AOV mechanics convert each transaction into larger margin leverage.",
    questions: [
      {
        id: "bundles",
        prompt: "Do you have bundle architecture implemented?",
        options: [
          { value: "strong", label: "Yes, active", leakPoints: 0 },
          { value: "partial", label: "Limited bundle logic", leakPoints: 5 },
          { value: "weak", label: "No bundles", leakPoints: 10 },
        ],
      },
      {
        id: "upsell_cross_sell",
        prompt: "Do you have upsell/cross-sell systems?",
        options: [
          { value: "strong", label: "Both active", leakPoints: 0 },
          { value: "partial", label: "One of them active", leakPoints: 5 },
          { value: "weak", label: "Neither active", leakPoints: 10 },
        ],
      },
      {
        id: "post_purchase_offer",
        prompt: "Do you run post-purchase offers?",
        options: [
          { value: "strong", label: "Yes", leakPoints: 0 },
          { value: "partial", label: "Occasional", leakPoints: 5 },
          { value: "weak", label: "No", leakPoints: 10 },
        ],
      },
      {
        id: "subscription_option",
        prompt: "Is a subscription option available where relevant?",
        options: [
          { value: "strong", label: "Yes", leakPoints: 0 },
          { value: "partial", label: "Partially", leakPoints: 5 },
          { value: "weak", label: "No", leakPoints: 10 },
        ],
      },
    ],
  },
  {
    id: "retention_ltv",
    title: "Retention Systems",
    weight: 15,
    explanation:
      "Retention architecture determines whether acquisition spend compounds or resets every cycle.",
    questions: [
      {
        id: "email_flows",
        prompt: "Do you have automated email flows?",
        options: [
          { value: "strong", label: "Fully automated", leakPoints: 0 },
          { value: "partial", label: "Partial automation", leakPoints: 5 },
          { value: "weak", label: "No automation", leakPoints: 10 },
        ],
      },
      {
        id: "repeat_purchase_campaigns",
        prompt: "Do you run repeat purchase campaigns?",
        options: [
          { value: "strong", label: "Consistent", leakPoints: 0 },
          { value: "partial", label: "Inconsistent", leakPoints: 5 },
          { value: "weak", label: "No campaigns", leakPoints: 10 },
        ],
      },
      {
        id: "customer_segmentation",
        prompt: "Is customer segmentation actively used?",
        options: [
          { value: "strong", label: "Advanced segmentation", leakPoints: 0 },
          { value: "partial", label: "Basic segmentation", leakPoints: 5 },
          { value: "weak", label: "No segmentation", leakPoints: 10 },
        ],
      },
      {
        id: "ltv_cac_tracking",
        prompt: "Do you track LTV:CAC ratio?",
        options: [
          { value: "strong", label: "Tracked regularly", leakPoints: 0 },
          { value: "partial", label: "Tracked occasionally", leakPoints: 5 },
          { value: "weak", label: "Not tracked", leakPoints: 10 },
        ],
      },
    ],
  },
];

export type RevenueScoreAnswers = Record<string, RevenueScoreOption["value"]>;

export type RevenueScoreBreakdown = {
  sectionId: string;
  sectionTitle: string;
  score: number;
  weight: number;
  explanation: string;
};

export function calculateRevenueScore(answers: RevenueScoreAnswers) {
  const breakdown: RevenueScoreBreakdown[] = revenueScoreSections.map((section) => {
    const maxSectionLeak = section.questions.reduce(
      (sum, question) => sum + Math.max(...question.options.map((opt) => opt.leakPoints)),
      0,
    );

    const sectionLeak = section.questions.reduce((sum, question) => {
      const selected = answers[question.id];
      const option = question.options.find((opt) => opt.value === selected);
      return sum + (option?.leakPoints ?? 0);
    }, 0);

    const weighted = maxSectionLeak > 0 ? Math.round((sectionLeak / maxSectionLeak) * section.weight) : 0;

    return {
      sectionId: section.id,
      sectionTitle: section.title,
      score: Math.min(section.weight, Math.max(0, weighted)),
      weight: section.weight,
      explanation: section.explanation,
    };
  });

  const total = Math.min(
    100,
    Math.max(
      0,
      breakdown.reduce((sum, section) => sum + section.score, 0),
    ),
  );

  let riskLevel = "Low Leak (Optimized Structure)";
  if (total >= 76) riskLevel = "Critical Revenue Bleed";
  else if (total >= 51) riskLevel = "Severe Structural Inefficiency";
  else if (total >= 26) riskLevel = "Moderate Leak (Hidden Friction)";

  return { total, riskLevel, breakdown };
}

export function getScoreBucket(score: number) {
  if (score >= 76) return "critical";
  if (score >= 51) return "severe";
  if (score >= 26) return "moderate";
  return "low";
}
