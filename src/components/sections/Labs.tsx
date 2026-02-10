"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FadeIn, TextReveal } from "@/components/ui";
import { useInView } from "@/lib/hooks";

/* ── Animation helpers ── */
const EASE_OUT_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_SMOOTH = "cubic-bezier(0.4, 0, 0.2, 1)";
function tr(props: string[], dur: number, ease: string, delay: number) {
  return props.map((p) => `${p} ${dur}s ${ease} ${delay}s`).join(", ");
}

export function Labs() {
  const [heroRef, v] = useInView(0.1);
  const [looping, setLooping] = useState(false);

  /* After all entrance animations finish (~2.5s), switch to looping mode */
  useEffect(() => {
    if (!v) return;
    const timer = setTimeout(() => setLooping(true), 3000);
    return () => clearTimeout(timer);
  }, [v]);

  return (
    <section
      id="labs"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #E8D5C4 0%, #DFC9A8 40%, #E2CBAE 70%, #E8D5C4 100%)",
      }}
    >
      {/* ── Hero: headline + lifestyle photo with floating UI cards ── */}
      <div className="relative px-6 pt-24 pb-0">
        {/* Headline */}
        <div className="text-center mb-14 relative z-20">
          <FadeIn variant="fade-up" y={16}>
            <p className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal/40 mb-4">
              Aeviti Labs
            </p>
          </FadeIn>
          <TextReveal
            as="h2"
            className="font-display text-[42px] leading-[1.12] font-normal text-charcoal tracking-tight"
            delay={0.1}
            stagger={0.15}
          >
            Get your labs.
            <br />
            <span className="text-terra font-medium">
              Go for your optimal.
            </span>
          </TextReveal>
        </div>

        {/* Photo + floating cards container */}
        <div ref={heroRef} className="relative max-w-[1000px] mx-auto min-h-[540px]">
          {/* ── Floating UI cards (staggered entrances + internal micro-animations) ── */}

          {/* Top-left: Wellness Score */}
          <FadeIn variant="slide-right" delay={0.3} x={30} className="absolute left-0 top-[8%] z-10">
            <div className="w-[210px] bg-white/75 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 -rotate-3">
              <div className="text-[10px] font-semibold text-charcoal/45 uppercase tracking-wider mb-2">
                Wellness Score
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[34px] font-bold text-charcoal leading-none">
                  78
                </span>
                <span className="text-[13px] text-warm-gray">/100</span>
              </div>
              {/* Progress bar — fills from 0% to 78%, then loops */}
              <div className="mt-2.5 h-[6px] rounded-full bg-stone/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-terra"
                  style={looping ? {
                    width: "78%",
                    animation: `labs-bar-fill 7s ${EASE_SMOOTH} infinite`,
                  } : {
                    width: v ? "78%" : "0%",
                    transition: tr(["width"], 1, EASE_OUT_EXPO, 0.6),
                  }}
                />
              </div>
              <div
                className="text-[10px] text-terra font-medium mt-1.5"
                style={looping ? {
                  animation: `labs-text-reveal 7s ${EASE_SMOOTH} 0.15s infinite`,
                } : {
                  opacity: v ? 1 : 0,
                  transition: tr(["opacity"], 0.6, EASE_OUT_EXPO, 0.7),
                }}
              >
                On track
              </div>
            </div>
          </FadeIn>

          {/* Top-right: Metabolic Health ring */}
          <FadeIn variant="slide-left" delay={0.45} x={30} className="absolute right-0 top-[5%] z-10">
            <div className="w-[230px] bg-white/75 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 rotate-2">
              <div className="text-[10px] font-semibold text-charcoal/45 uppercase tracking-wider mb-3">
                Metabolic Health
              </div>
              <div className="flex items-center gap-3">
                {/* Ring chart — draws in via strokeDashoffset */}
                <svg width="48" height="48" viewBox="0 0 48 48" className="shrink-0">
                  <circle cx="24" cy="24" r="19" fill="none" stroke="#D4CEC4" strokeWidth="5" opacity="0.3" />
                  <circle
                    cx="24" cy="24" r="19"
                    fill="none" stroke="#00774D" strokeWidth="5"
                    strokeDasharray="95 120"
                    strokeLinecap="round"
                    transform="rotate(-90 24 24)"
                    style={looping ? {
                      strokeDashoffset: 0,
                      animation: `labs-ring-draw 8s ${EASE_SMOOTH} infinite`,
                    } : {
                      strokeDashoffset: v ? 0 : 95,
                      transition: tr(["stroke-dashoffset"], 1.2, EASE_OUT_EXPO, 0.75),
                    }}
                  />
                </svg>
                <div>
                  <div className="text-[13px] font-semibold text-charcoal">
                    On track
                  </div>
                  <div className="text-[10px] text-warm-gray">
                    14/18 markers optimal
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Mid-left: Heart Health card */}
          <FadeIn variant="slide-right" delay={0.6} x={30} className="absolute left-[-2%] top-[45%] z-10">
            <div className="w-[195px] bg-white/75 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 rotate-1">
              <div className="text-[10px] font-semibold text-charcoal/45 uppercase tracking-wider mb-2">
                Heart Health
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-terra" />
                <span className="text-[12px] font-medium text-charcoal">
                  Apolipoprotein B
                </span>
              </div>
              {/* Value — fades up, then loops */}
              <div
                className="flex items-baseline gap-1"
                style={looping ? {
                  animation: `labs-value-reveal 7.5s ${EASE_SMOOTH} infinite`,
                } : {
                  opacity: v ? 1 : 0,
                  transform: v ? "translateY(0)" : "translateY(8px)",
                  transition: tr(["opacity", "transform"], 0.7, EASE_OUT_EXPO, 0.9),
                }}
              >
                <span className="text-[22px] font-bold text-charcoal leading-none">
                  82
                </span>
                <span className="text-[11px] text-warm-gray">mg/dL</span>
              </div>
              <div
                className="text-[10px] text-terra font-medium mt-1"
                style={looping ? {
                  animation: `labs-text-reveal 7.5s ${EASE_SMOOTH} 0.15s infinite`,
                } : {
                  opacity: v ? 1 : 0,
                  transition: tr(["opacity"], 0.6, EASE_OUT_EXPO, 1.0),
                }}
              >
                Optimal range
              </div>
            </div>
          </FadeIn>

          {/* Right-mid: Action Plan */}
          <FadeIn variant="slide-left" delay={0.75} x={30} className="absolute right-[-1%] top-[40%] z-10">
            <div className="w-[215px] bg-white/75 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 -rotate-1">
              <div className="text-[10px] font-semibold text-charcoal/45 uppercase tracking-wider mb-2.5">
                Action Plan
              </div>
              {/* Rows — staggered fade-up, then loops */}
              <div className="space-y-2">
                {[
                  { icon: "🥗", label: "Nutrition", status: "Active" },
                  { icon: "💊", label: "Supplements", status: "Active" },
                  { icon: "🏃", label: "Movement", status: "Pending" },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-[11px]"
                    style={looping ? {
                      animation: `labs-row-reveal 8.5s ${EASE_SMOOTH} ${i * 0.12}s infinite`,
                    } : {
                      opacity: v ? 1 : 0,
                      transform: v ? "translateY(0)" : "translateY(10px)",
                      transition: tr(["opacity", "transform"], 0.6, EASE_OUT_EXPO, 1.05 + i * 0.1),
                    }}
                  >
                    <span>{item.icon}</span>
                    <span className="text-charcoal font-medium">
                      {item.label}
                    </span>
                    <span
                      className={`ml-auto text-[9px] font-semibold ${item.status === "Active" ? "text-terra" : "text-warm-gray"}`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Bottom-left: Biological Age */}
          <FadeIn variant="slide-right" delay={0.9} x={30} className="absolute left-[8%] bottom-[5%] z-10">
            <div className="w-[185px] bg-white/75 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 rotate-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-sky" />
                <span className="text-[10px] font-semibold text-charcoal/45 uppercase tracking-wider">
                  Biological Age
                </span>
              </div>
              {/* Value — fades up, then loops */}
              <div
                className="text-[24px] font-bold text-charcoal leading-none"
                style={looping ? {
                  animation: `labs-value-reveal 8s ${EASE_SMOOTH} infinite`,
                } : {
                  opacity: v ? 1 : 0,
                  transform: v ? "translateY(0)" : "translateY(8px)",
                  transition: tr(["opacity", "transform"], 0.7, EASE_OUT_EXPO, 1.2),
                }}
              >
                2.5 yrs
              </div>
              <div
                className="text-[10px] text-terra font-medium mt-1"
                style={looping ? {
                  animation: `labs-text-reveal 8s ${EASE_SMOOTH} 0.15s infinite`,
                } : {
                  opacity: v ? 1 : 0,
                  transition: tr(["opacity"], 0.6, EASE_OUT_EXPO, 1.3),
                }}
              >
                younger than average
              </div>
            </div>
          </FadeIn>

          {/* Bottom-right: Inflammation */}
          <FadeIn variant="slide-left" delay={1.05} x={30} className="absolute right-[7%] bottom-[8%] z-10">
            <div className="w-[190px] bg-white/75 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 -rotate-2">
              <div className="text-[10px] font-semibold text-charcoal/45 uppercase tracking-wider mb-2">
                Inflammation
              </div>
              {/* Sparkline — draws in, then loops */}
              <svg width="140" height="32" viewBox="0 0 140 32" className="mb-1">
                <polyline
                  points="0,28 30,22 60,18 90,12 120,6 140,4"
                  fill="none"
                  stroke="#7A9E8E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={looping ? {
                    strokeDasharray: 145,
                    strokeDashoffset: 0,
                    animation: `labs-sparkline-draw 8.5s ${EASE_SMOOTH} infinite`,
                  } : {
                    strokeDasharray: 145,
                    strokeDashoffset: v ? 0 : 145,
                    transition: tr(["stroke-dashoffset"], 1.2, EASE_OUT_EXPO, 1.35),
                  }}
                />
              </svg>
              <div
                className="flex items-center gap-1.5"
                style={looping ? {
                  animation: `labs-text-reveal 8.5s ${EASE_SMOOTH} 0.2s infinite`,
                } : {
                  opacity: v ? 1 : 0,
                  transition: tr(["opacity"], 0.6, EASE_OUT_EXPO, 1.55),
                }}
              >
                <span className="text-[10px] text-sage font-semibold">↓</span>
                <span className="text-[10px] text-sage font-medium">
                  Trending down — good
                </span>
              </div>
            </div>
          </FadeIn>

          {/* ── Central lifestyle photo ── */}
          <FadeIn variant="blur-in" delay={0.15} duration={1.2}>
            <div className="relative mx-auto z-[5]">
              <Image
                src="/images/run-lifestyle-opt.png"
                alt="Active lifestyle"
                width={2000}
                height={1334}
                className="w-auto max-h-[520px] mx-auto"
                quality={100}
                priority
              />
            </div>
          </FadeIn>
        </div>

        {/* Dual CTAs */}
        <FadeIn variant="fade-up" delay={0.5} y={20}>
          <div className="flex items-center justify-center gap-4 mt-10 pb-20 relative z-20">
            <a
              href="#waitlist"
              className="font-body text-[14px] font-medium text-white bg-charcoal px-8 py-3.5 rounded-full hover:bg-rich-black transition-colors shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
            >
              Start my labs
            </a>
            <a
              href="#baseline"
              className="font-body text-[14px] font-medium text-charcoal bg-white/60 backdrop-blur-sm border border-charcoal/10 px-8 py-3.5 rounded-full hover:bg-white/80 transition-colors"
            >
              Learn more
            </a>
          </div>
        </FadeIn>
      </div>

      {/* ── Three-column feature block ── */}
      <div className="max-w-[1100px] mx-auto px-6 pb-12">
        <FadeIn variant="scale-up" duration={1}>
          <div className="bg-[#dcc5a9]/40 rounded-[28px] border border-[#c9a87c]/15 px-10 py-16 flex items-center gap-6">
            {/* Left text */}
            <div className="flex-1 text-right pr-6">
              <h3 className="font-display text-[36px] font-bold text-charcoal leading-tight mb-2">
                Find your
                <br />
                baseline
              </h3>
              <p className="font-body text-[15px] text-warm-gray leading-relaxed">
                Get a clear picture of your
                <br />
                health with a simple lab test.
              </p>
            </div>

            {/* Center phone mockup */}
            <div className="w-[250px] shrink-0">
              <div className="bg-white rounded-[28px] shadow-[0_12px_40px_rgba(0,0,0,0.1)] border border-white/80 p-2.5 mx-auto w-[230px]">
                {/* Phone notch */}
                <div className="w-[70px] h-[18px] bg-charcoal rounded-full mx-auto mb-2.5" />
                {/* Screen content */}
                <div className="bg-[#F5E6D4] rounded-[20px] p-4 min-h-[310px]">
                  <div className="text-[15px] font-bold text-charcoal mb-1">
                    Action Plan
                  </div>
                  <div className="w-full h-px bg-charcoal/8 mb-3" />
                  <p className="text-[10px] text-warm-gray leading-relaxed mb-3">
                    It&apos;s time to put your insights into action. Two areas of
                    your health need attention — let&apos;s get things on track.
                  </p>
                  <div className="space-y-2">
                    <div className="bg-white/70 rounded-xl p-3 border border-white/50">
                      <div className="text-[9px] font-semibold text-terra uppercase tracking-wider mb-1">
                        Focus on first
                      </div>
                      <div className="text-[11px] font-medium text-charcoal">
                        Improve metabolic health
                      </div>
                      <p className="text-[9px] text-warm-gray mt-0.5 leading-snug">
                        Your health profile, biomarkers, and BMI show added
                        strain on your metabolism.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-1">
                      <div className="text-[9px] text-warm-gray">↓</div>
                      <div className="text-[9px] font-medium text-charcoal">
                        A1c
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-1">
                      <div className="text-[10px] text-sand-dark font-medium">
                        Out of range
                      </div>
                      <div className="text-[9px] text-warm-gray ml-auto">
                        · 6.3%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right text */}
            <div className="flex-1 pl-6">
              <h3 className="font-display text-[36px] font-bold text-charcoal leading-tight mb-2">
                Plan your
                <br />
                breakthrough
              </h3>
              <p className="font-body text-[15px] text-warm-gray leading-relaxed mb-5">
                Optimize your health with a<br />
                doctor-informed Action Plan.
              </p>
              <a
                href="#approach"
                className="inline-flex items-center gap-2 font-body text-[13px] font-medium text-charcoal bg-white/50 border border-charcoal/8 px-6 py-2.5 rounded-full hover:bg-white/70 transition-colors"
              >
                Explore the plan
              </a>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ── Two-card grid ── */}
      <div className="max-w-[1100px] mx-auto px-6 pb-12">
        <div className="grid grid-cols-2 gap-5">
          {/* Card 1: Biomarkers */}
          <FadeIn variant="scale-up">
            <div className="relative bg-[#dcc5a9]/35 rounded-[28px] border border-[#c9a87c]/12 overflow-hidden min-h-[460px] flex flex-col hover-scale">
              <div className="px-10 pt-10 pb-4 z-10 relative">
                <h3 className="font-display text-[42px] font-bold text-charcoal leading-[1.08]">
                  Test 82+
                  <br />
                  biomarkers
                </h3>
              </div>

              {/* Floating marker tags + photo placeholder */}
              <div className="relative flex-1 px-6 overflow-hidden">
                {/* Marquee pill rows — infinite looping carousel */}
                <div className="flex flex-col gap-1.5 opacity-35 px-2">
                  {(
                    [
                      {
                        tags: ["Cholesterol", "Heart", "LDL", "ApoB", "Glucose", "Metabolism", "HbA1c"],
                        anim: "animate-marquee",
                      },
                      {
                        tags: ["Globin A1c", "Fasting Insulin", "TSH", "Thyroid", "Cortisol", "Inflammation"],
                        anim: "animate-marquee-reverse",
                      },
                      {
                        tags: ["Hormone", "Follicle", "DHEA-Sulfate", "Testosterone", "Sulfate", "Iron", "Ferritin"],
                        anim: "animate-marquee-slow",
                      },
                      {
                        tags: ["T3", "Free T4", "Ratio", "Total Protein", "Immune", "Count", "Homocysteine"],
                        anim: "animate-marquee-reverse-slow",
                      },
                    ] as const
                  ).map((row, ri) => (
                    <div key={ri} className="overflow-hidden">
                      <div className={`flex gap-1.5 ${row.anim}`} style={{ width: "max-content" }}>
                        {/* Original + duplicate for seamless loop */}
                        {[0, 1].map((copy) =>
                          row.tags.map((tag) => (
                            <span
                              key={`${copy}-${tag}`}
                              className="font-body text-[11px] font-medium text-charcoal bg-white/45 border border-charcoal/5 px-2.5 py-1 rounded-full whitespace-nowrap"
                            >
                              {tag}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gradient fade */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#dcc5a9]/80 to-transparent" />

                {/* Person photo placeholder */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[200px] h-[230px] rounded-t-[24px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#c9a87c]/60 via-[#c9a87c]/40 to-[#c9a87c]/25" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-charcoal/12"
                    >
                      <path
                        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="12"
                        cy="7"
                        r="4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span className="font-body text-[10px] text-charcoal/15">
                      Photo
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-10 pb-8 pt-4 relative z-10">
                <a
                  href="#coverage"
                  className="inline-flex items-center font-body text-[13px] font-medium text-white bg-charcoal/80 px-6 py-2.5 rounded-full hover:bg-charcoal transition-colors"
                >
                  Meet the markers
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Card 2: Interpretation */}
          <FadeIn variant="scale-up" delay={0.1}>
            <div className="relative bg-[#dcc5a9]/35 rounded-[28px] border border-[#c9a87c]/12 overflow-hidden min-h-[460px] flex flex-col hover-scale">
              <div className="px-10 pt-10 pb-4 z-10 relative">
                <h3 className="font-display text-[42px] font-bold text-charcoal leading-[1.08]">
                  Interpreted
                  <br />
                  with care
                </h3>
              </div>

              {/* Visual: abstract figure with glow */}
              <div className="relative flex-1 flex items-center justify-center px-6">
                {/* Ambient glow */}
                <div className="absolute w-[260px] h-[260px] rounded-full bg-terra/[0.06] blur-[50px]" />

                {/* Abstract figure */}
                <div className="relative">
                  {/* Body silhouette */}
                  <div className="w-[120px] h-[180px] mx-auto">
                    {/* Head */}
                    <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-b from-[#eedcc5] to-[#dfc9a8] mx-auto mb-1 border border-[#c9a87c]/20" />
                    {/* Torso */}
                    <div className="w-[80px] h-[100px] rounded-[30px] bg-gradient-to-b from-[#eedcc5] to-[#dfc9a8] mx-auto border border-[#c9a87c]/20" />
                  </div>

                  {/* Glow rings — gentle pulse scale */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-terra/10 animate-pulse-ring" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full border border-terra/5 animate-pulse-ring-slow" />

                  {/* Badge */}
                  <div className="absolute top-[25%] right-[-50px] bg-white/80 backdrop-blur-sm rounded-full pl-2 pr-3.5 py-1.5 shadow-md border border-white/50 flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-terra flex items-center justify-center">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-[11px] font-medium text-charcoal whitespace-nowrap">
                      No concerns detected
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-10 pb-8 pt-4 relative z-10">
                <a
                  href="#baseline"
                  className="inline-flex items-center font-body text-[13px] font-medium text-white bg-charcoal/80 px-6 py-2.5 rounded-full hover:bg-charcoal transition-colors"
                >
                  Learn more
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-center px-6 pb-14">
        <p className="font-body text-[11px] text-charcoal/30 max-w-[600px] mx-auto leading-relaxed">
          Not available in all states. Aeviti is a wellness interpretation tool
          and does not provide medical diagnosis or treatment. Lab results alone
          are not intended to diagnose, treat, or cure any condition.
        </p>
      </div>
    </section>
  );
}
