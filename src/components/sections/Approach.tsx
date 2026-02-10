import { FadeIn, TextReveal, Overline } from "@/components/ui";
import {
  SchedulingVisual,
  BiomarkerChartVisual,
  ProtocolVisual,
} from "@/components/visuals/Panels";

const steps = [
  {
    num: "01",
    title: "Establish your baseline",
    desc: "We organize core categories into a simple snapshot you can understand in minutes.",
    Visual: SchedulingVisual,
  },
  {
    num: "02",
    title: "Translate into actions",
    desc: "We map signals into safe, steady recommendations you can keep doing.",
    Visual: BiomarkerChartVisual,
  },
  {
    num: "03",
    title: "Recheck with intention",
    desc: "Progress is measured over weeks and months — so changes are meaningful, not noisy.",
    Visual: ProtocolVisual,
  },
];

export function Approach() {
  return (
    <section className="bg-ivory px-6 md:px-12 py-section-md">
      <div className="max-w-[1100px] mx-auto">
        <div className="max-w-[520px] mb-12">
          <FadeIn variant="fade-up" y={16}>
            <Overline>Approach</Overline>
          </FadeIn>
          <TextReveal
            as="h2"
            className="font-display text-[28px] md:text-[42px] font-normal text-charcoal leading-[1.12] tracking-tight mb-3.5"
            delay={0.1}
          >
            Designed for safety, steadiness,{" "}
            <span className="text-terra font-medium">and follow-through</span>
          </TextReveal>
          <FadeIn variant="blur-up" delay={0.3} y={16}>
            <p className="font-body text-body-sm text-warm-gray leading-relaxed">
              Aeviti&rsquo;s tone is calm on purpose: interpret carefully, act
              sustainably, then reassess over time.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <FadeIn key={step.num} variant="scale-up" delay={i * 0.12}>
              <div className="bg-cream rounded-card p-8 border border-stone/[0.12] min-h-[400px] card-hover">
                <div className="font-body text-body-xs font-bold text-terra mb-3.5">
                  Step {step.num}
                </div>
                <h3 className="font-display text-display-sm font-medium text-charcoal mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="font-body text-body-sm text-warm-gray">
                  {step.desc}
                </p>
                <step.Visual />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
