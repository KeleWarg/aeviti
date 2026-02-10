import { FadeIn, TextReveal, Overline } from "@/components/ui";
import { ResultCardVisual, ProtocolVisual, TimelineVisual } from "@/components/visuals/Panels";
import { colors } from "@/lib/tokens";

export function Baseline() {
  return (
    <section id="baseline" className="relative z-10 bg-ivory px-12 py-section-md rounded-t-[28px] -mt-7 shadow-[0_-8px_40px_rgba(0,0,0,0.08)]">
      <div className="max-w-[1100px] mx-auto">
        <FadeIn variant="fade-up" duration={0.7} y={20}>
          <div className="text-center max-w-[620px] mx-auto mb-14">
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

        <div className="grid grid-cols-3 gap-5">
          {/* Card 1: Interpretation */}
          <FadeIn variant="scale-up" delay={0}>
            <div className="bg-cream rounded-card p-8 border border-stone/[0.12] min-h-[380px] card-hover">
              <div className="font-body text-body-xs font-bold text-terra mb-3.5">01</div>
              <h3 className="font-display text-[24px] font-medium text-charcoal mb-2 leading-tight">
                Meaningful interpretation
              </h3>
              <p className="font-body text-body-sm text-warm-gray">
                Context over charts. Clear explanations you can repeat back in
                one sentence.
              </p>
              <ResultCardVisual />
            </div>
          </FadeIn>

          {/* Card 2: Action */}
          <FadeIn variant="scale-up" delay={0.1}>
            <div className="bg-cream rounded-card p-8 border border-stone/[0.12] min-h-[380px] card-hover">
              <div className="font-body text-body-xs font-bold text-terra mb-3.5">02</div>
              <h3 className="font-display text-[24px] font-medium text-charcoal mb-2 leading-tight">
                Actionable next steps
              </h3>
              <p className="font-body text-body-sm text-warm-gray">
                A prioritized plan — sleep, nutrition, activity, stress, and
                follow-ups — built for real life.
              </p>
              <ProtocolVisual />
            </div>
          </FadeIn>

          {/* Card 3: Steadiness */}
          <FadeIn variant="scale-up" delay={0.2}>
            <div className="bg-cream rounded-card p-8 border border-stone/[0.12] min-h-[380px] card-hover">
              <div className="font-body text-body-xs font-bold text-terra mb-3.5">03</div>
              <h3 className="font-display text-[24px] font-medium text-charcoal mb-2 leading-tight">
                Steady progress
              </h3>
              <p className="font-body text-body-sm text-warm-gray">
                Track movement over weeks and months, not daily swings. No hype
                cycles.
              </p>
              <TimelineVisual />
              {/* Trend indicator */}
              <div className="mt-3.5 flex items-center gap-2 bg-white rounded-lg p-2.5 border border-stone/[0.12]">
                <div className="w-7 h-7 rounded-[7px] bg-sage/[0.12] flex items-center justify-center text-xs text-success">
                  ↑
                </div>
                <div>
                  <div className="font-body text-[11px] font-semibold text-charcoal">
                    Wellness score improving
                  </div>
                  <div className="font-mono text-[9px] text-sage">
                    +12% over 6 months
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
