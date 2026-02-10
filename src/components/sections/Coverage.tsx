"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FadeIn, TextReveal } from "@/components/ui";
import { categories, categoryColors, colors } from "@/lib/tokens";

const categorySubtitles: Record<string, string> = {
  blood: "to understand your foundation",
  metabolic: "to map your energy systems",
  inflammation: "to track silent signals",
  hormone: "to decode your balance",
};

const categoryImages: Record<string, string> = {
  blood: "/images/AdobeStock_322101536.jpeg",
  metabolic: "/images/AdobeStock_1704733245.jpeg",
  inflammation: "/images/AdobeStock_1686757631.jpeg",
  hormone: "/images/AdobeStock_1894199441.jpeg",
};

/** Card width + gap used for scroll calculations */
const GAP = 20;

export function Coverage() {
  const colorMap: Record<string, string> = categoryColors;
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /** Get the width of one card from the DOM */
  const getCardWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children[0]) return 0;
    return (track.children[0] as HTMLElement).offsetWidth;
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(index, categories.length - 1));
      const cardW = getCardWidth();
      track.scrollTo({
        left: clamped * (cardW + GAP),
        behavior: "smooth",
      });
    },
    [getCardWidth]
  );

  /** Sync active index from scroll position */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const cardW = getCardWidth();
        if (cardW > 0) {
          const idx = Math.round(track.scrollLeft / (cardW + GAP));
          setActiveIndex(
            Math.max(0, Math.min(idx, categories.length - 1))
          );
        }
        ticking = false;
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [getCardWidth]);

  return (
    <section id="coverage" className="relative overflow-x-clip">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* ── Section header ── */}
        <div className="mb-10">
          <FadeIn variant="fade-up" delay={0.2} y={16}>
            <p className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-terra mb-4">
              Coverage
            </p>
          </FadeIn>
          <div className="flex items-end justify-between gap-8">
            <div>
              <TextReveal
                as="h2"
                className="font-display text-[42px] leading-[1.12] font-normal text-charcoal tracking-tight mb-4 max-w-[600px]"
                delay={0.3}
                stagger={0.12}
              >
                70 markers,{" "}
                <span className="text-terra font-medium">
                  interpreted with care
                </span>
              </TextReveal>
              <FadeIn variant="blur-up" delay={0.65} y={16}>
                <p className="font-body text-[16px] text-warm-gray leading-relaxed max-w-[520px]">
                  We focus on the categories that matter for long-horizon
                  wellness — with steady interpretation and careful next steps.
                </p>
              </FadeIn>
            </div>

            {/* Navigation arrows */}
            <FadeIn variant="fade-up" delay={0.5} y={12}>
              <div className="flex items-center gap-2 shrink-0 pb-1">
                <button
                  type="button"
                  onClick={() => scrollToIndex(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  className="w-10 h-10 rounded-full border border-stone/20 flex items-center justify-center text-charcoal/60 hover:bg-cream hover:border-stone/40 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                  aria-label="Previous card"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M10 12L6 8L10 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToIndex(activeIndex + 1)}
                  disabled={activeIndex === categories.length - 1}
                  className="w-10 h-10 rounded-full border border-stone/20 flex items-center justify-center text-charcoal/60 hover:bg-cream hover:border-stone/40 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                  aria-label="Next card"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </FadeIn>
          </div>
        </div>

      </div>

      {/* ── Carousel track — bleeds to viewport edge ── */}
      <FadeIn variant="fade-up" delay={0.3} y={24}>
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto pb-8 hide-scrollbar"
          style={{
            paddingLeft: "max(24px, calc((100vw - 1100px) / 2 + 24px))",
            paddingRight: "max(24px, calc((100vw - 1100px) / 2 + 24px))",
          }}
        >
          {categories.map((cat) => {
            const color = colorMap[cat.key] || colors.sand.DEFAULT;
            const subtitle = categorySubtitles[cat.key] || cat.desc;

            return (
              <div
                key={cat.key}
                className="group shrink-0"
                style={{ width: 420 }}
              >
                <div className="bg-cream rounded-[20px] border border-stone/10 flex flex-col overflow-hidden card-hover h-full">
                  {/* Text content */}
                  <div className="px-7 pt-7 pb-3">
                    <h3 className="font-display text-[24px] font-bold text-charcoal leading-tight">
                      {cat.name}
                    </h3>
                    <p className="font-body text-[15px] font-light text-warm-gray leading-snug mt-0.5">
                      {subtitle}
                    </p>
                    <span
                      className="inline-block mt-2.5 font-body text-[11px] font-semibold tabular-nums"
                      style={{ color }}
                    >
                      {cat.count} markers
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative mx-4 mb-4 h-[200px] rounded-2xl overflow-hidden bg-stone/[0.07] border border-stone/[0.05]">
                    <Image
                      src={categoryImages[cat.key]}
                      alt={`${cat.name} category`}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="420px"
                    />
                  </div>

                  {/* Footer: tags + CTA */}
                  <div className="px-7 pb-6 flex items-end justify-between gap-4 mt-auto">
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
                      className="shrink-0 font-body text-[13px] font-medium text-white px-5 py-2.5 rounded-full transition-colors hover:opacity-90"
                      style={{ background: color }}
                    >
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 pb-16">
          {categories.map((cat, i) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => scrollToIndex(i)}
              className={`h-[6px] rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 bg-terra"
                  : "w-[6px] bg-stone/30 hover:bg-stone/50"
              }`}
              aria-label={`Go to ${cat.name}`}
            />
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
