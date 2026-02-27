"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { trackEvent } from "@/lib/analytics/events";

type CTAButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
  eventName?: string;
};

export function CTAButton({
  href,
  label,
  variant = "primary",
  className,
  eventName = "cta_click_book_diagnostic",
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const styles =
    variant === "primary"
      ? "bg-ink text-white hover:opacity-90 focus-visible:outline-ink"
      : "border border-line bg-white text-ink hover:bg-surface-alt focus-visible:outline-accent";

  return (
    <Link
      href={href}
      className={cn(base, styles, className)}
      onClick={() => trackEvent(eventName, { href, label })}
    >
      {label}
    </Link>
  );
}

