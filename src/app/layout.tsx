import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { StickyHeader } from "@/components/layout/sticky-header";
import { Footer } from "@/components/layout/footer";
import { AnalyticsScripts } from "@/components/layout/analytics-scripts";
import { ConversionTriggers } from "@/components/conversion/conversion-triggers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Sitelytc Digital Media | Revenue Infrastructure Partner",
    template: "%s | Sitelytc Digital Media",
  },
  description:
    "RAP-90 helps INR 4Cr-50Cr growth-stage companies remove revenue bottlenecks in 90 days.",
  metadataBase: new URL("https://sitelytc.com"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <AnalyticsScripts />
        <StickyHeader />
        <main className="grain-overlay">{children}</main>
        <ConversionTriggers />
        <Footer />
      </body>
    </html>
  );
}

