import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      /* ── Brand Colors ── */
      colors: {
        petrol: {
          DEFAULT: "#1B3A4B",
          light: "#2A5468",
          dark: "#0F2530",
        },
        sand: {
          DEFAULT: "#C9A87C",
          light: "#DFC9A8",
          dark: "#A8865A",
        },
        terra: {
          DEFAULT: "#00774D",
          light: "#1A9B6B",
          dark: "#005C3A",
        },
        ivory: "#FAF7F2",
        cream: "#F0EBE3",
        stone: "#D4CEC4",
        "warm-gray": "#666666",
        charcoal: "#111111",
        "rich-black": "#000000",
        sage: {
          DEFAULT: "#7A9E8E",
          light: "#A4C4B5",
        },
        blush: "#E8D5C4",
        sky: "#89B4C8",
        alert: "#C75D45",
        success: "#5E8E6E",
      },

      /* ── Typography ── */
      fontFamily: {
        display: ["'GT Walsheim'", "system-ui", "sans-serif"],
        body: ["'GT Walsheim'", "system-ui", "sans-serif"],
        mono: ["'GT Walsheim'", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["76px", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-lg": ["46px", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        "display-md": ["36px", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "display-sm": ["26px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-xs": ["22px", { lineHeight: "1.25" }],
        "body-lg": ["18px", { lineHeight: "1.7" }],
        "body-md": ["16px", { lineHeight: "1.7" }],
        "body-sm": ["14px", { lineHeight: "1.65" }],
        "body-xs": ["12px", { lineHeight: "1.5" }],
        overline: ["11px", { lineHeight: "1.2", letterSpacing: "0.14em" }],
        mono: ["11px", { lineHeight: "1.4", letterSpacing: "0.02em" }],
      },

      /* ── Spacing (brand scale) ── */
      spacing: {
        "section-lg": "128px",
        "section-md": "96px",
        "section-sm": "64px",
        "section-xs": "48px",
      },

      /* ── Border Radius ── */
      borderRadius: {
        card: "14px",
        button: "9999px",
        badge: "8px",
        tag: "4px",
      },

      /* ── Shadows ── */
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 8px 40px rgba(0,0,0,0.03)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.05)",
        glow: "0 0 12px var(--tw-shadow-color)",
      },

      /* ── Animations ── */
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s ease forwards",
        "fade-in": "fade-in 0.5s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
