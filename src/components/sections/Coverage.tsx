"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { FadeIn, TextReveal } from "@/components/ui";
import { categories, categoryColors, colors } from "@/lib/tokens";

const categorySubtitles: Record<string, string> = {
  blood: "to understand your foundation",
  metabolic: "to map your energy systems",
  inflammation: "to track silent signals",
  hormone: "to decode your balance",
  aging: "to measure what matters long-term",
};

export function Coverage() {
  const colorMap: Record<string, string> = categoryColors;
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [trackHeight, setTrackHeight] = useState(0);

  // Measure carousel overflow + sticky height → compute exact track height
  useEffect(() => {
    const measure = () => {
      const scroller = scrollRef.current;
      const sticky = stickyRef.current;
      if (!scroller || !sticky) return;
      const overflow = scroller.scrollWidth - scroller.clientWidth;
      const stickyH = sticky.offsetHeight;
      setTrackHeight(stickyH + overflow);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Map vertical scroll progress through the track → horizontal carousel scroll
  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      const scroller = scrollRef.current;
      if (!track || !scroller) return;

      const trackRect = track.getBoundingClientRect();
      const sticky = stickyRef.current;
      if (!sticky) return;
      // scrollable distance = track height minus sticky height (the pinned scroll range)
      const scrollableDistance = track.offsetHeight - sticky.offsetHeight;
      if (scrollableDistance <= 0) return;

      // progress: 0 when sticky first pins, 1 when it unpins
      const progress = Math.max(0, Math.min(1, -trackRect.top / scrollableDistance));

      // Map to horizontal scroll
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      scroller.scrollLeft = progress * maxScroll;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  return (
    <section id="coverage" className="relative bg-ivory">
      {/* ── Hero image area with headline overlay ── */}
      <FadeIn variant="scale-up" duration={1.1}>
        <div className="relative max-w-[1100px] mx-auto mt-8 rounded-[28px] overflow-hidden min-h-[520px] flex flex-col justify-end">
          {/* Background image */}
          <Image
            src="/images/AdobeStock_1698621078_Preview.jpeg"
            alt="Wellness and diagnostics"
            fill
            className="object-cover"
            priority
          />

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 z-[1] bg-black/60" />
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Content overlay */}
          <div className="relative z-[5] px-12 pb-14 pt-32 max-w-[800px]">
            <FadeIn variant="fade-up" delay={0.2} y={16}>
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50 mb-4">
                Coverage
              </p>
            </FadeIn>
            <TextReveal
              as="h2"
              className="font-display text-[48px] leading-[1.08] font-bold text-white mb-4"
              delay={0.3}
              stagger={0.12}
            >
              82 markers across<br />
              5 categories, interpreted<br />
              <span className="text-terra-light font-medium">with care</span>
            </TextReveal>
            <FadeIn variant="blur-up" delay={0.65} y={16}>
              <p className="font-body text-[16px] text-white/65 leading-relaxed max-w-[480px]">
                We focus on the categories that matter for long-horizon wellness —
                with steady interpretation and careful next steps.
              </p>
            </FadeIn>
          </div>
        </div>
      </FadeIn>

      {/* ── Scroll-linked carousel ── */}
      {/* Track creates vertical space: 100vh (the pinned frame) + overflow (scroll-to-horizontal distance) */}
      <div
        ref={trackRef}
        className="relative"
        style={{ height: trackHeight > 0 ? `${trackHeight}px` : undefined }}
      >
        {/* Sticky frame keeps carousel on screen while scrolling drives it horizontally */}
        <div
          ref={stickyRef}
          className="sticky top-0 bg-ivory pt-10 pb-16"
        >
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-hidden hide-scrollbar w-full"
            style={{
              paddingLeft: "max(24px, calc((100vw - 1100px) / 2))",
              paddingRight: "40px",
              willChange: "scroll-position",
            }}
          >
            {categories.map((cat, i) => {
              const color = colorMap[cat.key] || colors.sand.DEFAULT;
              const subtitle = categorySubtitles[cat.key] || cat.desc;

              return (
                <FadeIn key={cat.key} variant="scale-up" delay={i * 0.1} duration={0.8} easing="spring" className="shrink-0">
                  <div className="w-[420px] max-w-[80vw] bg-cream rounded-[20px] border border-stone/10 flex flex-col overflow-hidden card-hover">
                    {/* Text content */}
                    <div className="px-7 pt-7 pb-3">
                      <h3 className="font-display text-[26px] font-bold text-charcoal leading-tight">
                        {cat.name}
                      </h3>
                      <p className="font-body text-[17px] font-light text-warm-gray leading-snug mt-0.5">
                        {subtitle}
                      </p>
                      <span
                        className="inline-block mt-2.5 font-body text-[11px] font-semibold tabular-nums"
                        style={{ color }}
                      >
                        {cat.count} markers
                      </span>
                    </div>

                    {/* Image placeholder */}
                    <div className="mx-4 mb-4 h-[240px] rounded-2xl bg-stone/[0.07] border border-stone/[0.05] flex items-center justify-center">
                      <span className="font-body text-[12px] text-stone/40">Image coming soon</span>
                    </div>

                    {/* Footer: tags + CTA */}
                    <div className="px-7 pb-6 flex items-end justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5 flex-1">
                        {cat.markers.map((m) => (
                          <span
                            key={m}
                            className="font-body text-[11px] font-medium text-warm-gray/60 bg-white border border-stone/10 px-2.5 py-1 rounded-lg"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="shrink-0 font-body text-[13px] font-semibold text-white px-5 py-2.5 rounded-full transition-colors hover:opacity-90"
                        style={{ background: color }}
                      >
                        Learn more
                      </button>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
