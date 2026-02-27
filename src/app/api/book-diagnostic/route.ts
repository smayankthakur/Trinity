import { NextResponse } from "next/server";
import { syncLeadToCrm } from "@/lib/server/crm";
import { diagnosticFormSchema, evaluateQualification } from "@/lib/validation/diagnostic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = diagnosticFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Validation failed.",
          issues: parsed.error.issues.map((issue) => issue.message),
        },
        { status: 400 },
      );
    }

    const qualification = evaluateQualification(parsed.data);
    const crm = await syncLeadToCrm(parsed.data, qualification);

    return NextResponse.json({
      ok: true,
      qualified: qualification.qualified,
      reasonCode: qualification.reasonCode ?? null,
      crmProvider: crm.provider,
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to process submission at this time." },
      { status: 500 },
    );
  }
}

