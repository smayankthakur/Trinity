import nodemailer from "nodemailer";
import type { DiagnosticFormInput, QualificationResult } from "@/lib/validation/diagnostic";

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
