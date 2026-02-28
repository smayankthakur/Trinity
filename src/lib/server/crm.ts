import type { DiagnosticFormInput, QualificationResult } from "@/lib/validation/diagnostic";

type CrmResult = {
  provider: string;
  synced: boolean;
};

function resolveCrmProvider() {
  return process.env.CRM_PROVIDER ?? "none";
}

export async function syncLeadToCrm(
  payload: DiagnosticFormInput,
  qualification: QualificationResult,
): Promise<CrmResult> {
  const provider = resolveCrmProvider();

  if (provider === "none") {
    return { provider, synced: false };
  }

  // Placeholder integration point for HubSpot/Salesforce/Airtable.
  console.info("[crm-sync-placeholder]", {
    provider,
    qualified: qualification.qualified,
    company: payload.companyName,
  });

  return { provider, synced: true };
}

