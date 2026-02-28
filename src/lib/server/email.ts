import nodemailer from "nodemailer";
import type { DiagnosticFormInput, QualificationResult } from "@/lib/validation/diagnostic";
import type { StrategicDiagnosticInput } from "@/lib/validation/strategic-diagnostic";

type EmailResult = {
  sent: boolean;
  to: string;
  reason?: string;
};

function getRecipientEmail() {
  return process.env.LEAD_TO_EMAIL ?? "sitelytc@gmail.com";
}

function getTransport() {
  if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  return null;
}

function asLabel<T extends string>(value: T) {
  return value.replaceAll("_", " ");
}

export async function sendLeadEmail(
  payload: DiagnosticFormInput,
  qualification: QualificationResult,
): Promise<EmailResult> {
  const to = getRecipientEmail();
  const transport = getTransport();

  if (!transport) {
    return {
      sent: false,
      to,
      reason: "missing_email_transport_config",
    };
  }

  const from = process.env.LEAD_FROM_EMAIL ?? process.env.SMTP_USER ?? process.env.GMAIL_USER;

  if (!from) {
    return {
      sent: false,
      to,
      reason: "missing_from_email",
    };
  }

  const qualificationLabel = qualification.qualified ? "Qualified" : "Disqualified";
  const reasonLabel = qualification.reasonCode ? asLabel(qualification.reasonCode) : "none";

  const subject = `[Sitelytc Lead] ${payload.companyName} - ${qualificationLabel}`;
  const text = [
    `Company: ${payload.companyName}`,
    `Industry: ${payload.industry}`,
    `Annual Revenue: ${payload.annualRevenue}`,
    `Employees: ${payload.numberOfEmployees}`,
    `Decision Maker: ${payload.keyDecisionMaker}`,
    `Qualified: ${qualificationLabel}`,
    `Reason: ${reasonLabel}`,
    "",
    "Current Revenue Bottleneck:",
    payload.bottleneck,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #1f2937; line-height: 1.5;">
      <h2 style="margin-bottom: 8px;">New Strategic Diagnostic Submission</h2>
      <p style="margin-top: 0; color: #6b7280;">Qualification status: <strong>${qualificationLabel}</strong></p>
      <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
        <tbody>
          <tr><td style="padding: 6px 0; font-weight: 600;">Company</td><td style="padding: 6px 0;">${payload.companyName}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 600;">Industry</td><td style="padding: 6px 0;">${payload.industry}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 600;">Annual Revenue</td><td style="padding: 6px 0;">${payload.annualRevenue}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 600;">Employees</td><td style="padding: 6px 0;">${payload.numberOfEmployees}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 600;">Decision Maker</td><td style="padding: 6px 0;">${payload.keyDecisionMaker}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 600;">Qualification Reason</td><td style="padding: 6px 0;">${reasonLabel}</td></tr>
        </tbody>
      </table>
      <h3 style="margin-bottom: 6px; margin-top: 20px;">Current Revenue Bottleneck</h3>
      <p style="margin-top: 0;">${payload.bottleneck.replaceAll("\n", "<br/>")}</p>
    </div>
  `;

  await transport.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

  return { sent: true, to };
}

export async function sendStrategicDiagnosticEmail(
  payload: StrategicDiagnosticInput,
  highValue: boolean,
): Promise<EmailResult> {
  const to = getRecipientEmail();
  const transport = getTransport();

  if (!transport) {
    return {
      sent: false,
      to,
      reason: "missing_email_transport_config",
    };
  }

  const from = process.env.LEAD_FROM_EMAIL ?? process.env.SMTP_USER ?? process.env.GMAIL_USER;

  if (!from) {
    return {
      sent: false,
      to,
      reason: "missing_from_email",
    };
  }

  const subject = `[Strategic Audit] ${payload.industry.toUpperCase()} | ${payload.annualRevenue}`;
  const text = [
    `Annual Revenue: ${payload.annualRevenue}`,
    `Industry: ${payload.industry}`,
    `Primary Bottleneck: ${payload.primaryBottleneck}`,
    `Monthly Ad Spend: ${payload.monthlyAdSpend}`,
    `Expected Revenue Upside: ${payload.expectedRevenueUpside}`,
    `Estimated INR Impact: ${payload.roughImpactInr}`,
    `High-Value Tier: ${highValue ? "Yes" : "No"}`,
    "",
    `CAC: ${payload.cac ?? "-"}`,
    `LTV:CAC: ${payload.ltvToCac ?? "-"}`,
    `Tech Stack: ${payload.techStack ?? "-"}`,
    "",
    `Decision Maker: ${payload.decisionMaker}`,
    `Email: ${payload.email}`,
    `WhatsApp: ${payload.whatsapp}`,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #1f2937; line-height: 1.5;">
      <h2 style="margin-bottom: 8px;">Revenue Leakage Audit Submission</h2>
      <p style="margin-top: 0; color: #6b7280;">High-value tier: <strong>${highValue ? "Yes" : "No"}</strong></p>
      <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
        <tbody>
          <tr><td style="padding: 6px 0; font-weight: 600;">Annual Revenue</td><td style="padding: 6px 0;">${payload.annualRevenue}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 600;">Industry</td><td style="padding: 6px 0;">${payload.industry}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 600;">Primary Bottleneck</td><td style="padding: 6px 0;">${payload.primaryBottleneck}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 600;">Monthly Ad Spend</td><td style="padding: 6px 0;">${payload.monthlyAdSpend}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 600;">Expected Upside</td><td style="padding: 6px 0;">${payload.expectedRevenueUpside}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 600;">Estimated INR Impact</td><td style="padding: 6px 0;">${payload.roughImpactInr}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 600;">CAC</td><td style="padding: 6px 0;">${payload.cac ?? "-"}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 600;">LTV:CAC</td><td style="padding: 6px 0;">${payload.ltvToCac ?? "-"}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 600;">Tech Stack</td><td style="padding: 6px 0;">${payload.techStack ?? "-"}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 600;">Decision Maker</td><td style="padding: 6px 0;">${payload.decisionMaker}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 600;">Email</td><td style="padding: 6px 0;">${payload.email}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 600;">WhatsApp</td><td style="padding: 6px 0;">${payload.whatsapp}</td></tr>
        </tbody>
      </table>
    </div>
  `;

  await transport.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

  return { sent: true, to };
}

