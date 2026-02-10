"use client";

import { FadeIn, TextReveal } from "@/components/ui";
import { categories, categoryColors, colors } from "@/lib/tokens";

const categorySubtitles: Record<string, string> = {
  blood: "to understand your foundation",
  metabolic: "to map your energy systems",
  inflammation: "to track silent signals",
  hormone: "to decode your balance",
};

export function Coverage() {
  const colorMap: Record<string, string> = categoryColors;

  return (
    <section id="coverage" className="relative">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* ── Section header — full width above grid ── */}
        <div className="mb-10">
          <FadeIn variant="fade-up" delay={0.2} y={16}>
            <p className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-terra mb-4">
              Coverage
            </p>
          </FadeIn>
          <TextReveal
            as="h2"
            className="font-display text-[42px] leading-[1.12] font-normal text-charcoal tracking-tight mb-4 max-w-[600px]"
            delay={0.3}
            stagger={0.12}
          >
            70 markers,{" "}
            <span className="text-terra font-medium">interpreted with care</span>
          </TextReveal>
          <FadeIn variant="blur-up" delay={0.65} y={16}>
            <p className="font-body text-[16px] text-warm-gray leading-relaxed max-w-[520px]">
              We focus on the categories that matter for long-horizon
              wellness — with steady interpretation and careful next steps.
            </p>
          </FadeIn>
        </div>

        {/* ── Cards in a 2-col grid ── */}
        <div className="grid grid-cols-2 gap-5 pb-16">
            {categories.map((cat, i) => {
              const color = colorMap[cat.key] || colors.sand.DEFAULT;
              const subtitle = categorySubtitles[cat.key] || cat.desc;

              return (
                <FadeIn
                  key={cat.key}
                  variant="fade-up"
                  delay={i * 0.08}
                  duration={0.8}
                  y={30}
                >
                  <div className="bg-cream rounded-[20px] border border-stone/10 flex flex-col overflow-hidden card-hover">
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

                    {/* Image placeholder */}
                    <div className="mx-4 mb-4 h-[200px] rounded-2xl bg-stone/[0.07] border border-stone/[0.05] flex items-center justify-center">
                      <span className="font-body text-[12px] text-stone/40">
                        Image coming soon
                      </span>
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
                        className="shrink-0 font-body text-[13px] font-medium text-white px-5 py-2.5 rounded-full transition-colors hover:opacity-90"
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
    </section>
  );
}
