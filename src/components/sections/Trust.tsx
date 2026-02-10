"use client";

import { useState, useEffect } from "react";
import { FadeIn, TextReveal } from "@/components/ui";
import { useInView } from "@/lib/hooks";
import { USMapDots } from "@/components/visuals/Panels";
import { colors } from "@/lib/tokens";

/* ── Animation helpers ── */
const EASE_OUT_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
const SMOOTH = "cubic-bezier(0.4, 0, 0.2, 1)";
function tr(props: string[], dur: number, ease: string, delay: number) {
  return props.map((p) => `${p} ${dur}s ${ease} ${delay}s`).join(", ");
}

export function Trust() {
  const barHeights = [22, 30, 35, 40, 38, 48, 55, 60, 65, 72];
  const [sectionRef, v] = useInView(0.15);
  const [looping, setLooping] = useState(false);

  /* Switch to looping mode after entrance animations finish (~3s) */
  useEffect(() => {
    if (!v) return;
    const timer = setTimeout(() => setLooping(true), 3000);
    return () => clearTimeout(timer);
  }, [v]);

  // Base delay offsets for each column
  const COL_LEFT = 0;
  const COL_MID = 0.15;
  const COL_RIGHT = 0.3;

  return (
    <section className="bg-cream px-6 md:px-12 py-section-md">
      <div className="max-w-[1100px] mx-auto" ref={sectionRef}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Left: Statement */}
          <div
            className="flex flex-col justify-center"
            style={{
              opacity: v ? 1 : 0,
              transform: v ? "translateY(0)" : "translateY(24px)",
              transition: tr(["opacity", "transform"], 0.85, EASE_OUT_EXPO, COL_LEFT),
            }}
          >
            <TextReveal
              as="h2"
              className="font-display text-[28px] md:text-[42px] font-normal text-charcoal leading-[1.12] tracking-tight mb-4"
            >
              <span className="text-terra font-medium">Built on trust,</span>
              <br />
              not trends
            </TextReveal>
            <p
              className="font-body text-body-sm text-warm-gray leading-relaxed mb-6"
              style={{
                opacity: v ? 1 : 0,
                transform: v ? "translateY(0)" : "translateY(10px)",
                transition: tr(["opacity", "transform"], 0.7, EASE_OUT_EXPO, COL_LEFT + 0.2),
              }}
            >
              Labs trusted by the medical community. No startup labs. No
              unreliable at-home draws. Just gold-standard diagnostics.
            </p>
            <div className="flex gap-6 items-center">
              {["CLIA certified", "CAP accredited"].map((badge, bi) => (
                <div
                  key={badge}
                  className="flex items-center gap-1.5 font-body text-[13px] font-semibold text-petrol"
                  style={{
                    opacity: v ? 1 : 0,
                    transform: v ? "translateY(0)" : "translateY(8px)",
                    transition: tr(
                      ["opacity", "transform"],
                      0.6,
                      EASE_OUT_EXPO,
                      COL_LEFT + 0.35 + bi * 0.08
                    ),
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-sage" />
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Middle: Map card */}
          <div
            className="bg-ivory rounded-card p-7 border border-stone/[0.18] flex flex-col items-center"
            style={{
              opacity: v ? 1 : 0,
              transform: v ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
              transition: tr(["opacity", "transform"], 0.85, EASE_OUT_EXPO, COL_MID),
            }}
          >
            <div
              className="font-body text-body-xs font-semibold text-terra mb-1"
              style={looping ? {
                animation: `baseline-text-reveal 7.5s ${SMOOTH} infinite`,
              } : {
                opacity: v ? 1 : 0,
                transform: v ? "translateY(0)" : "translateY(10px)",
                transition: tr(["opacity", "transform"], 0.65, EASE_OUT_EXPO, COL_MID + 0.12),
              }}
            >
              2,000+ partner lab locations
            </div>
            <div
              className="font-body text-[11px] text-warm-gray mb-2"
              style={looping ? {
                animation: `baseline-fade 7.5s ${SMOOTH} 0.06s infinite`,
              } : {
                opacity: v ? 1 : 0,
                transition: tr(["opacity"], 0.5, EASE_OUT_EXPO, COL_MID + 0.18),
              }}
            >
              across the United States
            </div>
            <div
              style={looping ? {
                animation: `baseline-map-pulse 7.5s ${SMOOTH} 0.1s infinite`,
              } : {
                opacity: v ? 1 : 0,
                transform: v ? "scale(1)" : "scale(0.9)",
                transition: tr(["opacity", "transform"], 0.8, EASE_OUT_EXPO, COL_MID + 0.22),
              }}
            >
              <USMapDots />
            </div>
            <div
              className="font-display text-[36px] md:text-[56px] font-light text-petrol leading-none mt-2"
              style={looping ? {
                animation: `baseline-text-reveal 7.5s ${SMOOTH} 0.2s infinite`,
              } : {
                opacity: v ? 1 : 0,
                transform: v ? "translateY(0)" : "translateY(12px)",
                transition: tr(["opacity", "transform"], 0.7, EASE_OUT_EXPO, COL_MID + 0.35),
              }}
            >
              2,000
            </div>
          </div>

          {/* Right: Bar chart card */}
          <div
            className="bg-ivory rounded-card p-7 border border-stone/[0.18] flex flex-col"
            style={{
              opacity: v ? 1 : 0,
              transform: v ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
              transition: tr(["opacity", "transform"], 0.85, EASE_OUT_EXPO, COL_RIGHT),
            }}
          >
            <div
              className="font-body text-body-xs font-semibold text-terra mb-0.5"
              style={looping ? {
                animation: `baseline-text-reveal 8s ${SMOOTH} infinite`,
              } : {
                opacity: v ? 1 : 0,
                transform: v ? "translateY(0)" : "translateY(10px)",
                transition: tr(["opacity", "transform"], 0.65, EASE_OUT_EXPO, COL_RIGHT + 0.1),
              }}
            >
              Designed for long-term tracking
            </div>
            <div
              className="font-body text-[11px] text-warm-gray mb-3"
              style={looping ? {
                animation: `baseline-fade 8s ${SMOOTH} 0.06s infinite`,
              } : {
                opacity: v ? 1 : 0,
                transition: tr(["opacity"], 0.5, EASE_OUT_EXPO, COL_RIGHT + 0.16),
              }}
            >
              Your wellness score over time
            </div>
            {/* Bars — grow up from 0 with stagger, then loop */}
            <div className="flex-1 flex items-end gap-2 py-2">
              {barHeights.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-[3px]"
                  style={looping ? {
                    height: `${h}%`,
                    background:
                      i === barHeights.length - 1
                        ? `linear-gradient(to top, ${colors.terra.DEFAULT}, ${colors.terra.light})`
                        : `linear-gradient(to top, ${colors.sand.DEFAULT}50, ${colors.sand.DEFAULT}25)`,
                    transformOrigin: "bottom",
                    animation: `baseline-bar-grow 8s ${SMOOTH} ${i * 0.05}s infinite`,
                  } : {
                    height: v ? `${h}%` : "0%",
                    opacity: v ? 1 : 0,
                    background:
                      i === barHeights.length - 1
                        ? `linear-gradient(to top, ${colors.terra.DEFAULT}, ${colors.terra.light})`
                        : `linear-gradient(to top, ${colors.sand.DEFAULT}50, ${colors.sand.DEFAULT}25)`,
                    transition: tr(
                      ["height", "opacity"],
                      0.7,
                      EASE_OUT_EXPO,
                      COL_RIGHT + 0.2 + i * 0.05
                    ),
                  }}
                />
              ))}
            </div>
            <div
              className="flex justify-between mt-1"
              style={looping ? {
                animation: `baseline-fade 8s ${SMOOTH} 0.55s infinite`,
              } : {
                opacity: v ? 1 : 0,
                transition: tr(["opacity"], 0.5, EASE_OUT_EXPO, COL_RIGHT + 0.65),
              }}
            >
              <span className="font-mono text-[9px] text-stone">Jan</span>
              <span className="font-mono text-[9px] text-stone">Dec</span>
            </div>
            <div
              className="font-display text-[32px] md:text-[48px] font-light text-petrol leading-none mt-3"
              style={looping ? {
                animation: `baseline-text-reveal 8s ${SMOOTH} 0.6s infinite`,
              } : {
                opacity: v ? 1 : 0,
                transform: v ? "translateY(0)" : "translateY(12px)",
                transition: tr(["opacity", "transform"], 0.7, EASE_OUT_EXPO, COL_RIGHT + 0.7),
              }}
            >
              +72%
            </div>
            <div
              className="font-body text-[11px] text-warm-gray"
              style={looping ? {
                animation: `baseline-fade 8s ${SMOOTH} 0.68s infinite`,
              } : {
                opacity: v ? 1 : 0,
                transition: tr(["opacity"], 0.5, EASE_OUT_EXPO, COL_RIGHT + 0.78),
              }}
            >
              avg. member improvement in year one
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
