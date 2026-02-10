"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { FadeIn, TextReveal, EmailCapture } from "@/components/ui";
import { colors } from "@/lib/tokens";

export function Hero() {
  const videoSources = [
    "/videos/AdobeStock_1624163355_Video_HD_Preview.mov",
    "/videos/AdobeStock_1887586841_Video_4K_Preview.mov",
    "/videos/AdobeStock_539933893_Video_HD_Preview.mov",
    "/videos/AdobeStock_605651631_Video_HD_Preview.mov",
  ];
  const hasVideos = videoSources.length > 0;
  const fadeDurationMs = 1000;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const activeRef = useRef<HTMLVideoElement | null>(null);
  const nextRef = useRef<HTMLVideoElement | null>(null);
  const nextIndex = hasVideos ? (activeIndex + 1) % videoSources.length : 0;

  // ── Z-space recession on scroll ──
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = innerRef.current;
      if (!el) return;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // progress: 0 at top, 1 when scrolled one full viewport
      const progress = Math.min(scrollY / vh, 1);
      // Scale: 1 → 0.88
      const scale = 1 - progress * 0.12;
      // Slight brightness dim
      const brightness = 1 - progress * 0.25;
      // Border radius reveal (0 → 24px)
      const radius = progress * 24;

      el.style.transform = `scale(${scale})`;
      el.style.borderRadius = `${radius}px`;
      el.style.filter = `brightness(${brightness})`;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!hasVideos) return;
    const active = activeRef.current;
    if (!active) return;
    active.currentTime = 0;
    const playPromise = active.play();
    if (playPromise) {
      playPromise.catch(() => {});
    }
  }, [activeIndex, hasVideos]);

  useEffect(() => {
    if (!hasVideos) return;
    if (!isFading) {
      const next = nextRef.current;
      if (next) {
        next.pause();
        next.currentTime = 0;
      }
      return;
    }

    const next = nextRef.current;
    if (next) {
      next.currentTime = 0;
      const playPromise = next.play();
      if (playPromise) {
        playPromise.catch(() => {});
      }
    }

    const timeout = window.setTimeout(() => {
      setActiveIndex(nextIndex);
      setIsFading(false);
    }, fadeDurationMs);

    return () => window.clearTimeout(timeout);
  }, [fadeDurationMs, hasVideos, isFading, nextIndex]);

  const handleEnded = () => {
    if (!hasVideos || isFading || videoSources.length < 2) return;
    setIsFading(true);
  };

  return (
    <section className="sticky top-0 z-0 min-h-screen overflow-hidden bg-rich-black">
      {/* Inner container — this is what recedes in z-space on scroll */}
      <div
        ref={innerRef}
        className="relative min-h-screen flex flex-col justify-center px-12 pt-36 pb-24 overflow-hidden bg-gradient-to-br from-rich-black via-petrol-dark to-petrol"
        style={{ willChange: "transform, filter, border-radius", transformOrigin: "center center" }}
      >
      {/* Video reel background */}
      {hasVideos && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <video
              ref={activeRef}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${isFading ? "opacity-0" : "opacity-100"}`}
              src={videoSources[activeIndex]}
              muted
              playsInline
              preload="auto"
              onEnded={handleEnded}
            />
            <video
              ref={nextRef}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${isFading ? "opacity-100" : "opacity-0"}`}
              src={videoSources[nextIndex]}
              muted
              playsInline
              preload="auto"
            />
          </div>
          <div className="absolute inset-0 bg-rich-black/65" />

          {/* Glass / water shimmer overlay */}
          <div className="absolute inset-0 z-[1] overflow-hidden mix-blend-soft-light opacity-40 pointer-events-none">
            <div className="hero-shimmer-a absolute -inset-[50%] w-[200%] h-[200%]" />
            <div className="hero-shimmer-b absolute -inset-[50%] w-[200%] h-[200%]" />
          </div>
        </div>
      )}

      {/* Ambient effects */}
      <div
        className="ambient-orb w-[500px] h-[500px] top-[8%] right-[12%] z-10"
        style={{ background: `radial-gradient(circle, ${colors.sand.DEFAULT}08 0%, transparent 60%)` }}
      />
      <div
        className="ambient-orb w-[350px] h-[350px] bottom-[10%] left-[8%] z-10"
        style={{ background: `radial-gradient(circle, ${colors.sage.DEFAULT}05 0%, transparent 60%)` }}
      />
      <div className="grain-overlay z-10" />

      {/* Content grid */}
      <div className="relative z-20 max-w-[1100px] mx-auto w-full grid grid-cols-[1fr_380px] gap-16 items-center">
        {/* Left: Copy */}
        <div>
          <TextReveal
            as="h1"
            className="font-display text-display-xl font-light text-white mb-6"
            delay={0.2}
            stagger={0.15}
            duration={0.9}
          >
            Know your health.
            <br />
            <span className="text-white font-medium">Not just your data.</span>
          </TextReveal>

          <FadeIn variant="blur-up" delay={0.55} duration={1}>
            <p className="font-body text-body-lg text-white/65 mb-9 max-w-[500px]">
              Aeviti turns core biomarker categories — blood, metabolic,
              inflammation, hormones, and aging markers — into a clear, steady
              plan you can actually act on.
            </p>
          </FadeIn>

          <FadeIn variant="fade-up" delay={0.7} duration={0.8} y={24}>
            <EmailCapture light />
            <p className="font-body text-body-xs text-white/[0.28] mt-3">
              Aeviti is a wellness tool and does not provide medical diagnosis or
              treatment.
            </p>
          </FadeIn>
        </div>

        {/* Right: Aeviti Baseline Card */}
        <FadeIn variant="blur-in" delay={0.4} duration={1.1}>
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.07] rounded-2xl p-8">
            <h3 className="font-display text-display-sm font-medium text-white mb-6">
              Aeviti Baseline
            </h3>

            {[
              { label: "Interpretation", desc: "Plain-language meaning of each marker category.", color: colors.terra.DEFAULT, icon: "◎" },
              { label: "Action", desc: "Prioritized next steps you can sustain.", color: colors.sage.DEFAULT, icon: "◐" },
              { label: "Steadiness", desc: "Progress over weeks and months — no spikes, no fads.", color: colors.sky, icon: "◑" },
              { label: "What you get", desc: "A calm dashboard that helps you decide what matters next.", color: colors.sand.DEFAULT, icon: "○" },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex gap-3.5 items-start py-4 ${i > 0 ? "border-t border-white/5" : ""}`}
              >
                <div
                  className="w-9 h-9 rounded-[10px] shrink-0 flex items-center justify-center text-sm"
                  style={{ background: item.color + "15", color: item.color }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="font-body text-body-sm font-semibold text-white mb-0.5">
                    {item.label}
                  </div>
                  <div className="font-body text-[13px] text-white/60 leading-snug">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-2 mt-5">
              {["Designed for consistency", "Built with caution"].map((t, i) => (
                <div
                  key={i}
                  className="font-body text-[11px] font-semibold text-white/40 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-badge"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="font-body text-[10px] text-white/20 tracking-[0.12em] uppercase">
          Scroll
        </span>
        <div className="w-px h-7 bg-gradient-to-b from-white/15 to-transparent" />
      </div>
      </div>{/* end inner recession container */}
    </section>
  );
}
