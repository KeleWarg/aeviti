/**
 * Aeviti Design System Tokens
 * Single source of truth for brand colors, typography, spacing, and component styles.
 * These map 1:1 to tailwind.config.ts — use Tailwind classes where possible,
 * fall back to these tokens for inline styles or CSS-in-JS.
 */

export const colors = {
  // Primary — clinical authority
  petrol: { DEFAULT: "#1B3A4B", light: "#2A5468", dark: "#0F2530" },
  // Secondary — human warmth
  sand: { DEFAULT: "#C9A87C", light: "#DFC9A8", dark: "#A8865A" },
  // Accent — CTAs, buttons, overlines, step numbers
  terra: { DEFAULT: "#00774D", light: "#1A9B6B", dark: "#005C3A" },
  // Neutrals
  ivory: "#FAF7F2",
  cream: "#F0EBE3",
  stone: "#D4CEC4",
  warmGray: "#666666",
  charcoal: "#111111",
  richBlack: "#000000",
  // Semantic
  sage: { DEFAULT: "#7A9E8E", light: "#A4C4B5" },
  blush: "#E8D5C4",
  sky: "#89B4C8",
  alert: "#C75D45",
  success: "#5E8E6E",
} as const;

export const fonts = {
  display: "'GT Walsheim', system-ui, sans-serif",
  body: "'GT Walsheim', system-ui, sans-serif",
  mono: "'GT Walsheim', system-ui, sans-serif",
} as const;

export const spacing = {
  sectionLg: "128px",
  sectionMd: "96px",
  sectionSm: "64px",
  sectionXs: "48px",
} as const;

export const radii = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  card: "14px",
  xl: "16px",
  pill: "9999px",
} as const;

/**
 * Category colors — used for biomarker category indicators
 */
export const categoryColors = {
  blood: colors.terra.DEFAULT,
  metabolic: colors.sand.DEFAULT,
  inflammation: colors.sage.DEFAULT,
  hormone: colors.sky,
  aging: colors.blush,
} as const;

/**
 * Biomarker categories — content data
 */
export const categories = [
  { key: "blood", name: "Blood", count: 22, desc: "Essential blood markers, contextualized to your life and goals.", markers: ["CBC", "Ferritin", "Iron", "GFR"] },
  { key: "metabolic", name: "Metabolic", count: 18, desc: "Glucose, lipids, insulin signals — mapped to steady habits.", markers: ["HbA1c", "Insulin", "LDL-P", "ApoB"] },
  { key: "inflammation", name: "Inflammation", count: 14, desc: "Interpreted with conservative, safe guidance.", markers: ["hs-CRP", "IL-6", "Homocysteine", "ESR"] },
  { key: "hormone", name: "Hormone", count: 16, desc: "Explained clearly, without hype.", markers: ["TSH", "Free T4", "Cortisol", "DHEA"] },
  { key: "aging", name: "Aging", count: 12, desc: "Long-horizon signals for longevity-minded decisions.", markers: ["IGF-1", "SHBG", "Vitamin D", "Telomere"] },
] as const;

/**
 * Navigation items
 */
export const navItems = [
  { label: "Aeviti Baseline", href: "#baseline" },
  { label: "Markers", href: "#coverage" },
] as const;

/**
 * Footer links
 */
export const footerLinks = {
  offerings: [
    { label: "Labs", href: "/labs" },
    { label: "Weight Loss", href: "/weight-loss" },
    { label: "Sexual Health", href: "/sexual-health" },
    { label: "Mental Health", href: "/mental-health" },
    { label: "About the Company", href: "/about" },
  ],
  tools: [
    { label: "BMI Calculator", href: "/tools/bmi" },
    { label: "TDEE Calculator", href: "/tools/tdee" },
    { label: "Calorie Deficit Calculator", href: "/tools/calorie-deficit" },
    { label: "Protein Calculator", href: "/tools/protein" },
    { label: "Water Intake Calculator", href: "/tools/water-intake" },
  ],
} as const;
