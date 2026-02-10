import { FadeIn, TextReveal } from "@/components/ui";
import { USMapDots } from "@/components/visuals/Panels";
import { colors } from "@/lib/tokens";

export function Trust() {
  const barHeights = [22, 30, 35, 40, 38, 48, 55, 60, 65, 72];

  return (
    <section className="bg-cream px-12 py-section-md">
      <div className="max-w-[1100px] mx-auto">
        <FadeIn variant="fade-up" y={24}>
          <div className="grid grid-cols-3 gap-6 items-stretch">
            {/* Left: Statement */}
            <div className="flex flex-col justify-center">
              <TextReveal
                as="h2"
                className="font-display text-[42px] font-normal text-charcoal leading-[1.12] tracking-tight mb-4"
              >
                <span className="text-terra font-medium">Built on trust,</span>
                <br />
                not trends
              </TextReveal>
              <p className="font-body text-body-sm text-warm-gray leading-relaxed mb-6">
                Labs trusted by the medical community. No startup labs. No
                unreliable at-home draws. Just gold-standard diagnostics.
              </p>
              <div className="flex gap-6 items-center">
                {["CLIA certified", "CAP accredited"].map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-1.5 font-body text-[13px] font-semibold text-petrol"
                  >
                    <div className="w-2 h-2 rounded-full bg-sage" />
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            {/* Middle: Map card */}
            <div className="bg-ivory rounded-card p-7 border border-stone/[0.18] flex flex-col items-center">
              <div className="font-body text-body-xs font-semibold text-terra mb-1">
                2,000+ partner lab locations
              </div>
              <div className="font-body text-[11px] text-warm-gray mb-2">
                across the United States
              </div>
              <USMapDots />
              <div className="font-display text-[56px] font-light text-petrol leading-none mt-2">
                2,000
              </div>
            </div>

            {/* Right: Bar chart card */}
            <div className="bg-ivory rounded-card p-7 border border-stone/[0.18] flex flex-col">
              <div className="font-body text-body-xs font-semibold text-terra mb-0.5">
                Designed for long-term tracking
              </div>
              <div className="font-body text-[11px] text-warm-gray mb-3">
                Your wellness score over time
              </div>
              <div className="flex-1 flex items-end gap-2 py-2">
                {barHeights.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-[3px]"
                    style={{
                      height: `${h}%`,
                      background:
                        i === barHeights.length - 1
                          ? `linear-gradient(to top, ${colors.terra.DEFAULT}, ${colors.terra.light})`
                          : `linear-gradient(to top, ${colors.sand.DEFAULT}50, ${colors.sand.DEFAULT}25)`,
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-mono text-[9px] text-stone">Jan</span>
                <span className="font-mono text-[9px] text-stone">Dec</span>
              </div>
              <div className="font-display text-[48px] font-light text-petrol leading-none mt-3">
                +72%
              </div>
              <div className="font-body text-[11px] text-warm-gray">
                avg. member improvement in year one
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
