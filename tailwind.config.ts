import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        neutral: {
          0: "#ffffff",
          50: "#f7f7f7",
          100: "#f0f0f0",
          200: "#dddddd",
          300: "#b0b0b0",
          400: "#717171",
          500: "#484848",
          600: "#363636",
          700: "#222222",
          800: "#1a1a1a",
          900: "#111111",
        },
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
        },
        success: {
          50: "#f0fdf4",
          500: "#22c55e",
          600: "#16a34a",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 2px 16px 0 rgba(0,0,0,0.08)",
        "card-hover": "0 4px 24px 0 rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
