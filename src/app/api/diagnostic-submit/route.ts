import { NextResponse } from "next/server";
import { sendStrategicDiagnosticEmail } from "@/lib/server/email";
import { isHighValueProspect, strategicDiagnosticSchema } from "@/lib/validation/strategic-diagnostic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = strategicDiagnosticSchema.safeParse(body);

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

    const highValue = isHighValueProspect(parsed.data);
    const email = await sendStrategicDiagnosticEmail(parsed.data, highValue);

    return NextResponse.json({
      ok: true,
      highValue,
      emailSent: email.sent,
      emailTo: email.to,
      emailReason: email.reason ?? null,
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to process audit request at this time." },
      { status: 500 },
    );
  }
}
