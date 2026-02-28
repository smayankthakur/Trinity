import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function generateRevenueChecklistPdf(): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  let y = 790;
  const x = 52;
  const lineGap = 18;

  const write = (
    text: string,
    opts?: { bold?: boolean; size?: number; color?: ReturnType<typeof rgb> },
  ) => {
    const size = opts?.size ?? 11;
    page.drawText(text, {
      x,
      y,
      size,
      font: opts?.bold ? fontBold : font,
      color: opts?.color ?? rgb(0.12, 0.13, 0.16),
    });
    y -= lineGap;
  };

  write("Website Revenue Leak Checklist", { bold: true, size: 20, color: rgb(0.04, 0.11, 0.2) });
  y -= 8;

  write("Conversion Architecture Audit", { bold: true, size: 13 });
  write("- Homepage clarity");
  write("- CTA hierarchy");
  write("- Offer positioning");
  y -= 6;

  write("Funnel Breakdown", { bold: true, size: 13 });
  write("- Landing page alignment");
  write("- Drop-off points");
  write("- Message match");
  y -= 6;

  write("Checkout Friction", { bold: true, size: 13 });
  write("- Steps count");
  write("- Trust indicators");
  write("- Payment UX");
  y -= 6;

  write("AOV Engineering", { bold: true, size: 13 });
  write("- Bundles");
  write("- Upsells");
  write("- Cross-sells");
  y -= 6;

  write("Retention Systems", { bold: true, size: 13 });
  write("- Email flows");
  write("- Repeat triggers");
  write("- Subscription logic");
  y -= 12;

  write("Schedule Strategy Call", { bold: true, size: 13, color: rgb(0.6, 0.45, 0.2) });
  write("https://calendly.com/sitelytc/sitelytc-meet", { size: 11, color: rgb(0.1, 0.1, 0.35) });

  return pdf.save();
}
