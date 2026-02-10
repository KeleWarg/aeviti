"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FadeIn, TextReveal } from "@/components/ui";
import { useInView } from "@/lib/hooks";
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

/* ── Animation helpers ── */
const EASE_OUT_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
function tr(props: string[], dur: number, ease: string, delay: number) {
  return props.map((p) => `${p} ${dur}s ${ease} ${delay}s`).join(", ");
}

export function Coverage() {
  const colorMap: Record<string, string> = categoryColors;
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsRef, cardsVisible] = useInView(0.15);

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
                className="font-display text-[28px] md:text-[42px] leading-[1.12] font-normal text-charcoal tracking-tight mb-4 max-w-[600px]"
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
              <div className="hidden md:flex items-center gap-2 shrink-0 pb-1">
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
      <div ref={cardsRef}>
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto pb-8 hide-scrollbar"
          style={{
            paddingLeft: "max(24px, calc((100vw - 1100px) / 2 + 24px))",
            paddingRight: "max(24px, calc((100vw - 1100px) / 2 + 24px))",
          }}
        >
          {categories.map((cat, cardIndex) => {
            const color = colorMap[cat.key] || colors.sand.DEFAULT;
            const subtitle = categorySubtitles[cat.key] || cat.desc;
            // Each card staggers by 0.12s after a base delay
            const cardDelay = 0.15 + cardIndex * 0.12;

            return (
              <div
                key={cat.key}
                className="group shrink-0"
                style={{
                  width: "min(420px, 85vw)",
                  opacity: cardsVisible ? 1 : 0,
                  transform: cardsVisible
                    ? "translateY(0) scale(1)"
                    : "translateY(32px) scale(0.97)",
                  transition: tr(
                    ["opacity", "transform"],
                    0.85,
                    EASE_OUT_EXPO,
                    cardDelay
                  ),
                }}
              >
                <div className="bg-cream rounded-[20px] border border-stone/10 flex flex-col overflow-hidden card-hover h-full">
                  {/* Text content — staggered internals */}
                  <div className="px-7 pt-7 pb-3">
                    <h3
                      className="font-display text-[24px] font-bold text-charcoal leading-tight"
                      style={{
                        opacity: cardsVisible ? 1 : 0,
                        transform: cardsVisible
                          ? "translateY(0)"
                          : "translateY(12px)",
                        transition: tr(
                          ["opacity", "transform"],
                          0.7,
                          EASE_OUT_EXPO,
                          cardDelay + 0.1
                        ),
                      }}
                    >
                      {cat.name}
                    </h3>
                    <p
                      className="font-body text-[15px] font-light text-warm-gray leading-snug mt-0.5"
                      style={{
                        opacity: cardsVisible ? 1 : 0,
                        transform: cardsVisible
                          ? "translateY(0)"
                          : "translateY(10px)",
                        transition: tr(
                          ["opacity", "transform"],
                          0.7,
                          EASE_OUT_EXPO,
                          cardDelay + 0.18
                        ),
                      }}
                    >
                      {subtitle}
                    </p>
                    <span
                      className="inline-block mt-2.5 font-body text-[11px] font-semibold tabular-nums"
                      style={{
                        color,
                        opacity: cardsVisible ? 1 : 0,
                        transform: cardsVisible
                          ? "translateY(0)"
                          : "translateY(8px)",
                        transition: tr(
                          ["opacity", "transform"],
                          0.6,
                          EASE_OUT_EXPO,
                          cardDelay + 0.25
                        ),
                      }}
                    >
                      {cat.count} markers
                    </span>
                  </div>

                  {/* Image — scale reveal */}
                  <div
                    className="relative mx-4 mb-4 h-[200px] rounded-2xl overflow-hidden bg-stone/[0.07] border border-stone/[0.05]"
                    style={{
                      opacity: cardsVisible ? 1 : 0,
                      transform: cardsVisible ? "scale(1)" : "scale(0.94)",
                      transition: tr(
                        ["opacity", "transform"],
                        0.8,
                        EASE_OUT_EXPO,
                        cardDelay + 0.2
                      ),
                    }}
                  >
                    <Image
                      src={categoryImages[cat.key]}
                      alt={`${cat.name} category`}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="420px"
                    />
                  </div>

                  {/* Footer: tags + CTA — staggered */}
                  <div className="px-7 pb-6 flex items-end justify-between gap-4 mt-auto">
                    <div className="flex flex-wrap gap-1.5 flex-1">
                      {cat.markers.map((m, mi) => (
                        <span
                          key={m}
                          className="font-body text-[11px] font-medium text-warm-gray/60 bg-white border border-stone/10 px-2.5 py-1 rounded-lg"
                          style={{
                            opacity: cardsVisible ? 1 : 0,
                            transform: cardsVisible
                              ? "translateY(0)"
                              : "translateY(8px)",
                            transition: tr(
                              ["opacity", "transform"],
                              0.5,
                              EASE_OUT_EXPO,
                              cardDelay + 0.32 + mi * 0.04
                            ),
                          }}
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="shrink-0 font-body text-[13px] font-medium text-white px-5 py-2.5 rounded-full transition-colors hover:opacity-90"
                      style={{
                        background: color,
                        opacity: cardsVisible ? 1 : 0,
                        transform: cardsVisible
                          ? "translateY(0)"
                          : "translateY(10px)",
                        transition: tr(
                          ["opacity", "transform"],
                          0.6,
                          EASE_OUT_EXPO,
                          cardDelay + 0.38
                        ),
                      }}
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
              style={{
                opacity: cardsVisible ? 1 : 0,
                transition: tr(
                  ["opacity"],
                  0.5,
                  EASE_OUT_EXPO,
                  0.6 + i * 0.06
                ),
              }}
              aria-label={`Go to ${cat.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
