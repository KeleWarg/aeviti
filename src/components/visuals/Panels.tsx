"use client";

/**
 * Rich visual illustrations for inside cards.
 * Inspired by Function Health's approach of showing mini product UIs.
 */

import { colors } from "@/lib/tokens";
import { useInView } from "@/lib/hooks";

/* ── Animation helpers ── */
const EASE_OUT_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

/** Build a CSS transition string from props, duration, easing, and delay */
function tr(props: string[], duration: number, easing: string, delay: number) {
  return props.map((p) => `${p} ${duration}s ${easing} ${delay}s`).join(", ");
}

/* ── Mini scheduling widget ── */
export function SchedulingVisual() {
  const days = [
    { day: "MON", num: 10 },
    { day: "TUE", num: 11 },
    { day: "WED", num: 12, active: true },
    { day: "THU", num: 13 },
    { day: "FRI", num: 14 },
  ];
  const times = ["8:30", "9:00", "9:15", "9:30", "9:45"];

  return (
    <div className="mt-6">
      <div className="flex gap-1.5 mb-3.5">
        {days.map((d, i) => (
          <div
            key={i}
            className={`flex-1 text-center py-2 rounded-[10px] ${
              d.active
                ? "bg-terra"
                : "border border-stone/40"
            }`}
          >
            <div className={`font-body text-[9px] font-semibold tracking-wide mb-0.5 ${d.active ? "text-white/70" : "text-stone"}`}>
              {d.day}
            </div>
            <div className={`font-body text-[15px] font-semibold ${d.active ? "text-white" : "text-charcoal"}`}>
              {d.num}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        {times.map((t, i) => (
          <div
            key={i}
            className={`flex-1 text-center py-[7px] rounded-lg font-mono text-[11px] ${
              i === 1
                ? "bg-terra text-white"
                : "border border-stone/40 text-warm-gray"
            }`}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Biomarker trend chart (SVG) ── */
export function BiomarkerChartVisual() {
  return (
    <div className="mt-5 relative">
      {["ABOVE RANGE", "IN RANGE", "BELOW RANGE"].map((label, i) => (
        <div
          key={i}
          className={`flex items-center gap-2 ${i < 2 ? "border-b border-dashed border-stone/30" : ""}`}
          style={{ height: i === 1 ? 56 : 28 }}
        >
          <span className="font-mono text-[8px] text-stone tracking-wide w-[60px] shrink-0">
            {label}
          </span>
          {i === 1 && (
            <div className="flex-1 relative h-full">
              <div className="absolute inset-0 bg-sage/[0.06] rounded" />
              <svg viewBox="0 0 200 56" className="absolute inset-0 w-full h-full overflow-visible">
                <polyline
                  points="20,8 70,32 120,36 160,28"
                  fill="none"
                  stroke={colors.terra.DEFAULT}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {[
                  [20, 8, "16.7"],
                  [70, 32, ""],
                  [120, 36, "10.0"],
                  [160, 28, "12.5"],
                ].map(([cx, cy, label], j) => (
                  <g key={j}>
                    <circle cx={Number(cx)} cy={Number(cy)} r="4" fill={colors.terra.DEFAULT} />
                    <circle cx={Number(cx)} cy={Number(cy)} r="6" fill="none" stroke={colors.terra.DEFAULT} strokeWidth="1" opacity="0.3" />
                    {label && (
                      <text
                        x={Number(cx)}
                        y={Number(cy) - 10}
                        textAnchor="middle"
                        style={{ fontSize: 9, fontFamily: "'GT Walsheim', system-ui, sans-serif", fontWeight: 500, fill: colors.charcoal }}
                      >
                        {String(label)}
                      </text>
                    )}
                  </g>
                ))}
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Protocol / action items (animated) ── */
export function ProtocolVisual() {
  const [ref, v] = useInView(0.15);

  const items = [
    { emoji: "🥗", label: "Nutrition", desc: "Anti-inflammatory foods, omega-3 rich...", color: colors.sage.DEFAULT },
    { emoji: "💊", label: "Supplements", desc: "Vitamin D3, Magnesium glycinate...", color: colors.terra.DEFAULT },
    { emoji: "🏃", label: "Movement", desc: "Zone 2 cardio, resistance training...", color: colors.sky },
  ];

  return (
    <div ref={ref} className="mt-5 flex flex-col gap-2">
      {items.map((item, i) => {
        const d = i * 0.12; // stagger delay per item
        return (
          <div
            key={i}
            className="flex items-center gap-3 bg-white rounded-[10px] px-3.5 py-2.5 border border-stone/[0.15]"
            style={{
              opacity: v ? 1 : 0,
              transform: v ? "translateY(0)" : "translateY(14px)",
              transition: tr(["opacity", "transform"], 0.7, EASE_OUT_EXPO, d),
            }}
          >
            {/* Emoji icon — spring scale-in */}
            <div
              className="w-[34px] h-[34px] rounded-[9px] shrink-0 flex items-center justify-center text-[15px]"
              style={{
                background: item.color + "15",
                transform: v ? "scale(1)" : "scale(0.5)",
                opacity: v ? 1 : 0,
                transition: tr(["transform", "opacity"], 0.5, SPRING, d + 0.08),
              }}
            >
              {item.emoji}
            </div>
            <div className="min-w-0">
              <div className="font-body text-[13px] font-semibold text-charcoal">{item.label}</div>
              <div className="font-body text-[11px] text-warm-gray truncate">{item.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Biomarker result card (animated) ── */
export function ResultCardVisual() {
  const [ref, v] = useInView(0.15);

  return (
    <div ref={ref} className="bg-white rounded-[10px] p-3.5 border border-stone/[0.15] mt-4">
      {/* Title + category + pill */}
      <div className="flex justify-between items-center mb-2.5">
        <div
          style={{
            opacity: v ? 1 : 0,
            transform: v ? "translateY(0)" : "translateY(8px)",
            transition: tr(["opacity", "transform"], 0.7, EASE_OUT_EXPO, 0),
          }}
        >
          <div className="font-body text-body-xs font-semibold text-charcoal">Apolipoprotein B</div>
          <div className="font-body text-[10px] text-warm-gray">Heart & metabolic</div>
        </div>
        {/* Optimal pill — spring scale-in */}
        <div
          className="bg-sage/[0.12] text-success font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{
            opacity: v ? 1 : 0,
            transform: v ? "scale(1)" : "scale(0.7)",
            transition: tr(["opacity", "transform"], 0.6, SPRING, 0.15),
          }}
        >
          Optimal
        </div>
      </div>

      {/* Value */}
      <div
        className="flex items-baseline gap-1 mb-2"
        style={{
          opacity: v ? 1 : 0,
          transform: v ? "translateY(0)" : "translateY(10px)",
          transition: tr(["opacity", "transform"], 0.7, EASE_OUT_EXPO, 0.25),
        }}
      >
        <span className="font-display text-[28px] font-normal text-petrol">82</span>
        <span className="font-body text-[11px] text-warm-gray">mg/dL</span>
      </div>

      {/* Range bar */}
      <div
        className="w-full h-[5px] bg-cream rounded-full relative"
        style={{
          opacity: v ? 1 : 0,
          transition: tr(["opacity"], 0.5, EASE_OUT_EXPO, 0.3),
        }}
      >
        {/* Fill zone — scaleX from left */}
        <div
          className="absolute left-[20%] right-[15%] top-0 h-[5px] bg-sage/20 rounded-full"
          style={{
            transform: v ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: tr(["transform"], 0.8, EASE_OUT_EXPO, 0.4),
          }}
        />
        {/* Indicator dot — spring pop */}
        <div
          className="absolute left-[52%] top-[-3px] w-[11px] h-[11px] bg-sage rounded-full border-2 border-white"
          style={{
            opacity: v ? 1 : 0,
            transform: v ? "scale(1)" : "scale(0)",
            transition: tr(["opacity", "transform"], 0.5, SPRING, 0.55),
          }}
        />
      </div>
    </div>
  );
}

/* ── Progress bar chart (animated) ── */
export function TimelineVisual() {
  const [ref, v] = useInView(0.15);

  const heights = [30, 42, 55, 62, 70];
  const months = ["Jan", "Mar", "Jun", "Sep", "Dec"];

  return (
    <div ref={ref} className="mt-4">
      <div className="flex items-end gap-1.5 h-20 mb-1.5">
        {heights.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t"
            style={{
              height: h,
              background:
                i === heights.length - 1
                  ? `linear-gradient(to top, ${colors.terra.DEFAULT}, ${colors.terra.light})`
                  : `linear-gradient(to top, ${colors.sand.DEFAULT}40, ${colors.sand.DEFAULT}20)`,
              transform: v ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "bottom",
              transition: tr(["transform"], 0.7, EASE_OUT_EXPO, i * 0.08),
            }}
          />
        ))}
      </div>
      <div className="flex gap-1.5">
        {months.map((m, i) => (
          <div
            key={i}
            className="flex-1 text-center font-mono text-[9px] text-stone"
            style={{
              opacity: v ? 1 : 0,
              transition: tr(["opacity"], 0.5, EASE_OUT_EXPO, i * 0.08 + 0.1),
            }}
          >
            {m}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Biomarker Summary Bar (Blood card) ── */
export function BiomarkerSummaryBar() {
  const segments = [
    { label: "16 Optimal", pct: 73, color: colors.terra.DEFAULT },
    { label: "4 In range", pct: 18, color: colors.sand.DEFAULT },
    { label: "2 Review", pct: 9, color: colors.alert },
  ];

  return (
    <div className="mt-5">
      <div className="flex gap-4 mb-2.5">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
            <span className="font-body text-[11px] font-medium text-charcoal">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="flex h-3 rounded-full overflow-hidden">
        {segments.map((s, i) => (
          <div
            key={i}
            className={`${i === 0 ? "rounded-l-full" : ""} ${i === segments.length - 1 ? "rounded-r-full" : ""}`}
            style={{ width: `${s.pct}%`, background: s.color }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Wellness Score Widget (Metabolic card) ── */
export function WellnessScoreWidget() {
  const score = 78;

  return (
    <div className="mt-5">
      <div className="flex items-baseline gap-1 mb-1">
        <span className="font-display text-[36px] font-bold text-charcoal tabular-nums">{score}</span>
        <span className="font-body text-body-sm text-stone">/100</span>
      </div>
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-4 h-4 rounded-full bg-terra/10 flex items-center justify-center">
          <span className="text-[9px] text-terra">✓</span>
        </div>
        <span className="font-body text-[12px] font-medium text-terra">On track</span>
      </div>
      <div className="relative h-2.5 bg-stone/10 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${score}%`, background: `linear-gradient(90deg, ${colors.terra.DEFAULT}, ${colors.terra.light})` }}
        />
      </div>
    </div>
  );
}

/* ── Trend Sparkline (Inflammation card) ── */
export function TrendSparkline() {
  const points = [
    [10, 28],
    [40, 22],
    [70, 18],
    [100, 14],
    [130, 8],
  ] as const;
  const polyline = points.map((p) => p.join(",")).join(" ");

  return (
    <div className="mt-5">
      <svg viewBox="0 0 140 36" className="w-full h-10 overflow-visible">
        <polyline
          points={polyline}
          fill="none"
          stroke={colors.sage.DEFAULT}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={i === points.length - 1 ? 4 : 2.5}
            fill={i === points.length - 1 ? colors.sage.DEFAULT : "white"}
            stroke={colors.sage.DEFAULT}
            strokeWidth={i === points.length - 1 ? 0 : 1.5}
          />
        ))}
      </svg>
      <div className="flex items-center gap-1.5 mt-2">
        <span className="font-body text-[11px] font-semibold text-sage">↓</span>
        <span className="font-body text-[12px] font-medium text-sage">Trending down</span>
      </div>
    </div>
  );
}

/* ── Range Indicator (Hormone card) ── */
export function RangeIndicator() {
  const zones = [
    { label: "Low", width: "25%", color: colors.sand.DEFAULT + "30" },
    { label: "Optimal", width: "50%", color: colors.terra.DEFAULT + "20" },
    { label: "High", width: "25%", color: colors.alert + "25" },
  ];
  const dotPosition = "48%"; // in optimal zone

  return (
    <div className="mt-5">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <span className="font-body text-[11px] font-medium text-warm-gray">TSH</span>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-[24px] font-bold text-charcoal tabular-nums">2.4</span>
            <span className="font-body text-[11px] text-stone">mIU/L</span>
          </div>
        </div>
        <div className="font-body text-[11px] font-medium text-terra px-2 py-0.5 bg-terra/10 rounded-full">
          Optimal
        </div>
      </div>
      <div className="relative">
        <div className="flex h-2.5 rounded-full overflow-hidden">
          {zones.map((z, i) => (
            <div key={i} style={{ width: z.width, background: z.color }} />
          ))}
        </div>
        <div
          className="absolute top-[-2px] w-[14px] h-[14px] rounded-full bg-terra border-2 border-white shadow-sm -translate-x-1/2"
          style={{ left: dotPosition }}
        />
        <div className="flex justify-between mt-1.5">
          {zones.map((z, i) => (
            <span key={i} className="font-body text-[9px] text-stone" style={{ width: z.width, textAlign: "center" }}>
              {z.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Biological Age Widget (Aging card) ── */
export function BiologicalAgeWidget() {
  const bioAge = 25;
  const chronAge = 27.5;
  const bioPct = (bioAge / 40) * 100;
  const chronPct = (chronAge / 40) * 100;

  return (
    <div className="mt-5">
      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="font-body text-[11px] text-warm-gray">Biological age</span>
      </div>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="font-display text-[28px] font-bold text-charcoal tabular-nums">{bioAge}</span>
        <span className="font-body text-body-sm text-stone">years</span>
      </div>
      <div className="flex items-center gap-1.5 mb-3">
        <span className="font-body text-[12px] font-medium text-terra">2.5 years younger</span>
      </div>
      <div className="relative h-2.5 bg-stone/10 rounded-full">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${bioPct}%`, background: `linear-gradient(90deg, ${colors.terra.DEFAULT}, ${colors.terra.light})` }}
        />
        <div
          className="absolute top-[-2px] w-[14px] h-[14px] rounded-full bg-white border-2 border-stone/40 shadow-sm -translate-x-1/2"
          style={{ left: `${chronPct}%` }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="font-body text-[9px] text-terra font-medium">Bio: {bioAge}</span>
        <span className="font-body text-[9px] text-stone">Chronological: {chronAge}</span>
      </div>
    </div>
  );
}

/* ── US dot map ── */
export function USMapDots() {
  const rows = [
    "        ·····    ",
    "   ···········   ",
    "  ·············  ",
    " ··············· ",
    "·················",
    " ··············· ",
    "  ··········· ·  ",
    "   ········· ·   ",
    "    ·······      ",
    "     ·····       ",
  ];

  return (
    <div className="flex flex-col items-center gap-[1px] py-2">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-[2px]">
          {row.split("").map((ch, j) => (
            <div
              key={j}
              className="w-1 h-1 rounded-full"
              style={{
                background:
                  ch === "·"
                    ? Math.random() > 0.6
                      ? colors.terra.DEFAULT
                      : colors.sand.DEFAULT + "60"
                    : "transparent",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
