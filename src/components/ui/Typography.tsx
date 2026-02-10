import { ReactNode } from "react";

interface OverlineProps {
  children: ReactNode;
  light?: boolean;
}

export function Overline({ children, light }: OverlineProps) {
  return (
    <div
      className={`font-body text-overline font-semibold uppercase tracking-[0.14em] mb-3.5 ${
        light ? "text-terra-light" : "text-terra"
      }`}
    >
      {children}
    </div>
  );
}

interface SectionTitleProps {
  children: ReactNode;
  light?: boolean;
  /** Word or phrase to render in italic terra/sand accent */
  accent?: string;
  className?: string;
}

export function SectionTitle({ children, light, accent, className = "" }: SectionTitleProps) {
  const baseColor = light ? "text-white" : "text-charcoal";
  const accentColor = light ? "text-terra-light" : "text-terra";

  if (!accent || typeof children !== "string") {
    return (
      <h2 className={`font-display text-display-lg font-normal ${baseColor} ${className}`}>
        {children}
      </h2>
    );
  }

  const parts = children.split(accent);
  return (
    <h2 className={`font-display text-display-lg font-normal ${baseColor} ${className}`}>
      {parts[0]}
      <span className={`font-medium ${accentColor}`}>{accent}</span>
      {parts[1] || ""}
    </h2>
  );
}

interface PillProps {
  children: ReactNode;
  light?: boolean;
  dotColor?: string;
}

export function Pill({ children, light, dotColor }: PillProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 font-body text-body-xs font-medium px-3.5 py-1.5 rounded-full ${
        light
          ? "bg-white/[0.06] border border-white/[0.08] text-white/70 backdrop-blur-sm"
          : "bg-petrol/[0.06] border border-petrol/[0.08] text-petrol"
      }`}
    >
      {dotColor && (
        <span
          className="w-[5px] h-[5px] rounded-full"
          style={{ background: dotColor }}
        />
      )}
      {children}
    </div>
  );
}
