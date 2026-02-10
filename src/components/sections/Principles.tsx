import { FadeIn, TextReveal, Overline } from "@/components/ui";
import { colors } from "@/lib/tokens";

const principles = [
  { title: "Safety-first", desc: "We default to conservative guidance and clear escalation when needed.", icon: "◎" },
  { title: "Steady over extreme", desc: "We optimize for habits you'll keep — not aggressive changes you'll abandon.", icon: "◐" },
  { title: "Long-term lens", desc: "We care about what compounds: sleep, movement, nutrition, stress, and follow-up.", icon: "◑" },
];

export function Principles() {
  return (
    <section
      className="relative px-12 py-section-md overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${colors.petrol.dark} 0%, ${colors.petrol.DEFAULT} 100%)` }}
    >
      <div className="grain-overlay" />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <FadeIn variant="fade-up" y={16}>
            <Overline light>Our principles</Overline>
          </FadeIn>
          <TextReveal
            as="h2"
            className="font-display text-display-lg font-normal text-white"
            delay={0.1}
          >
            Built on <span className="text-terra-light font-medium">what matters</span>
          </TextReveal>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {principles.map((p, i) => (
            <FadeIn key={p.title} variant="blur-up" delay={i * 0.1}>
              <div className="bg-white/[0.04] rounded-card p-9 border border-white/[0.06] text-center card-hover">
                <div
                  className="w-14 h-14 rounded-[14px] mx-auto mb-5 flex items-center justify-center font-display text-[22px] text-terra-light"
                  style={{ background: `linear-gradient(135deg, ${colors.terra.light}20, ${colors.terra.light}08)` }}
                >
                  {p.icon}
                </div>
                <h3 className="font-display text-[24px] font-medium text-white mb-2.5">
                  {p.title}
                </h3>
                <p className="font-body text-body-sm text-white/60 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
