import { FadeIn } from "@/components/ui";

export function Signal() {
  return (
    <section className="bg-cream px-6 md:px-12 py-section-md">
      <FadeIn variant="scale-up" duration={1}>
        <div className="max-w-[900px] mx-auto bg-ivory rounded-2xl p-6 md:p-14 border border-stone/[0.18] flex flex-col md:flex-row md:justify-between md:items-center gap-8 md:gap-12">
          <div className="flex-1">
            <h2 className="font-display text-[32px] md:text-[40px] font-normal text-charcoal leading-[1.15] tracking-tight mb-4">
              Less noise.{" "}
              <span className="text-terra font-medium">More signal.</span>
            </h2>
            <p className="font-body text-body-sm text-warm-gray max-w-[420px] leading-relaxed">
              You shouldn't need to interpret a spreadsheet to understand your
              health. Aeviti Baseline translates the important categories into a
              calm, steady next step.
            </p>
          </div>
          <div className="flex gap-2.5 flex-wrap md:max-w-[280px]">
            {["Conservative guidance", "Long-term view", "Clear priorities"].map(
              (t, i) => (
                <div
                  key={i}
                  className="font-body text-body-xs font-semibold text-petrol bg-petrol/[0.06] border border-petrol/[0.08] px-4 py-2 rounded-full"
                >
                  {t}
                </div>
              )
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
