import { FadeIn, TextReveal, Overline } from "@/components/ui";
import { ResultCardVisual, ProtocolVisual, TimelineVisual } from "@/components/visuals/Panels";

export function Baseline() {
  return (
    <section
      id="baseline"
      className="relative z-10 px-6 md:px-12 py-section-md"
    >
      <div className="max-w-[1100px] mx-auto">
        <FadeIn variant="fade-up" duration={0.7} y={20}>
          <div className="text-center max-w-[620px] mx-auto mb-16">
            <Overline>Aeviti Baseline</Overline>
            <TextReveal
              as="h2"
              className="font-display text-display-lg font-normal text-charcoal mb-4"
              delay={0.1}
              stagger={0.12}
            >
              A digital baseline{" "}
              <span className="text-terra font-medium">you can trust</span>
            </TextReveal>
            <FadeIn variant="blur-up" delay={0.35} y={16}>
              <p className="font-body text-body-md text-warm-gray">
                We center interpretation, safety, and steadiness — so your
                biomarkers become a sustainable plan, not a stressful dashboard.
              </p>
            </FadeIn>
          </div>
        </FadeIn>

        {/* Open 3-column layout with horizontal rules and vertical dividers */}
        <div className="border-y border-terra grid grid-cols-1 md:grid-cols-3">
          {/* Column 1: Interpretation */}
          <FadeIn variant="fade-up" delay={0} className="h-full">
            <div className="px-8 py-10 h-full">
              <div className="font-body text-body-xs font-bold text-terra mb-3.5">01</div>
              <h3 className="font-display text-[24px] font-medium text-charcoal mb-2 leading-tight">
                Meaningful interpretation
              </h3>
              <p className="font-body text-body-sm text-warm-gray mb-6">
                Context over charts. Clear explanations you can repeat back in
                one sentence.
              </p>
              <ResultCardVisual />
            </div>
          </FadeIn>

          {/* Column 2: Action */}
          <FadeIn variant="fade-up" delay={0.1} className="h-full">
            <div className="px-8 py-10 h-full border-t md:border-t-0 md:border-l border-terra">
              <div className="font-body text-body-xs font-bold text-terra mb-3.5">02</div>
              <h3 className="font-display text-[24px] font-medium text-charcoal mb-2 leading-tight">
                Actionable next steps
              </h3>
              <p className="font-body text-body-sm text-warm-gray mb-6">
                A prioritized plan — sleep, nutrition, activity, stress, and
                follow-ups — built for real life.
              </p>
              <ProtocolVisual />
            </div>
          </FadeIn>

          {/* Column 3: Steadiness */}
          <FadeIn variant="fade-up" delay={0.2} className="h-full">
            <div className="px-8 py-10 h-full border-t md:border-t-0 md:border-l border-terra">
              <div className="font-body text-body-xs font-bold text-terra mb-3.5">03</div>
              <h3 className="font-display text-[24px] font-medium text-charcoal mb-2 leading-tight">
                Steady progress
              </h3>
              <p className="font-body text-body-sm text-warm-gray mb-6">
                Track movement over weeks and months, not daily swings. No hype
                cycles.
              </p>
              <TimelineVisual />
              {/* Trend indicator — delayed slide-up after bar chart */}
              <FadeIn variant="fade-up" delay={0.5} duration={0.7} y={12}>
                <div className="mt-3.5 flex items-center gap-2 bg-white rounded-lg p-2.5 border border-stone/[0.12]">
                  <div className="w-7 h-7 rounded-[7px] bg-sage/[0.12] flex items-center justify-center text-xs text-success">
                    ↑
                  </div>
                  <div>
                    <div className="font-body text-[11px] font-semibold text-charcoal">
                      Wellness score improving
                    </div>
                    <div className="font-body text-[9px] text-sage tabular-nums">
                      +12% over 6 months
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
