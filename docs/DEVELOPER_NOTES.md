# Developer Notes

## Tailwind Tokens
- Global tokens live in `src/app/globals.css` as CSS variables.
- Keep semantic naming (`--color-ink`, `--color-accent`) instead of visual names.
- Utilities:
  - `.section-wrap` for consistent page spacing.
  - `.data-card` for metrics/proof containers.
  - `.kpi-number` for prominent numbers.

## Reusable Conversion Blocks
- `HeroSection` for all page intros.
- `RAP90FrameworkBlock` for framework communication on Home and RAP-90.
- `FinalCtaSection` as the only primary conversion endpoint reinforcement.
- Keep CTA label constant: `Book Strategic Diagnostic`.
- `ConversionTriggers` for floating CTA, mobile sticky CTA, and exit-intent modal.

## Performance Notes
- Favor server components.
- Keep animation to opacity/transform transitions only.
- Use SVG for diagrams and avoid heavy client-side chart libraries unless required.

## SEO Notes
- Route-level metadata is already configured per page.
- `robots.ts` and `sitemap.ts` are included.
- Add Organization and Service schema in future iteration.

## Lead Qualification QA Checklist
- Submit valid qualified lead and confirm redirect to `/book-diagnostic/success`.
- Submit revenue below INR 4Cr and confirm redirect to `/not-qualified`.
- Submit with `keyDecisionMaker = no` and confirm disqualification flow.
- Submit invalid payload via API and confirm `400` response with validation issues.

## Analytics Events
- `cta_click_book_diagnostic`
- `floating_cta_click`
- `mobile_sticky_cta_click`
- `exit_intent_shown`
- `exit_intent_cta_click`
- `diagnostic_form_started`
- `diagnostic_form_submit_clicked`
- `diagnostic_form_submitted`
- `lead_qualified`
- `lead_disqualified`
- `diagnostic_form_submit_failed`

## Deployment Notes
- Set `CRM_PROVIDER` env to `hubspot`, `salesforce`, or `airtable` when integration is implemented.
- Keep privacy and terms pages updated for GDPR and India data-processing requirements.
