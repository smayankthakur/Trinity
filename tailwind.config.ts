import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        surface: "var(--color-surface)",
        surfaceAlt: "var(--color-surface-alt)",
        textMuted: "var(--color-text-muted)",
        line: "var(--color-line)",
        accent: "var(--color-accent)",
      },
      fontFamily: {
        heading: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        container: "80rem",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(15 23 32 / 0.08), 0 1px 3px 1px rgb(15 23 32 / 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
