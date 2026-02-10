"use client";

import { useState } from "react";
import { FadeIn, TextReveal, Overline } from "@/components/ui";

const faqs = [
  {
    q: "What is Aeviti Baseline?",
    a: "Aeviti Baseline is your comprehensive wellness snapshot — core biomarker categories organized into a clear, steady plan. We interpret each category in plain language and map results to prioritized next steps across sleep, nutrition, activity, stress, and follow-up.",
  },
  {
    q: "Is this about pricing, protocols, or fads?",
    a: "None of the above. Aeviti Baseline is designed around conservative guidance and long-term consistency. We don't sell protocols, push supplements, or chase trends. We help you understand what your markers mean and what steady steps to take.",
  },
  {
    q: "Do I need to be an expert to understand my results?",
    a: "Not at all. Every result comes with a plain-language interpretation — context over charts. Clear explanations you can repeat back in one sentence, not a spreadsheet you need a PhD to decode.",
  },
  {
    q: "Is Aeviti medical care?",
    a: "No. Aeviti is a wellness interpretation tool, not a medical provider. We don't diagnose or treat conditions. When something needs a doctor's eye, we tell you clearly and calmly — with specific guidance on what kind of follow-up to seek.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-cream px-12 py-section-md">
      <div className="max-w-[680px] mx-auto">
        <div className="text-center mb-12">
          <FadeIn variant="fade-up" y={16}>
            <Overline>FAQ</Overline>
          </FadeIn>
          <TextReveal
            as="h2"
            className="font-display text-[42px] font-normal text-charcoal leading-[1.12] tracking-tight"
            delay={0.1}
          >
            Clear answers,{" "}
            <span className="text-terra font-medium">calm tone</span>
          </TextReveal>
          <FadeIn variant="blur-up" delay={0.3} y={16}>
            <p className="font-body text-body-sm text-warm-gray mt-3 leading-relaxed">
              We&rsquo;re building Aeviti Baseline to feel steady, safe, and
              easy to trust — especially when the topic is your health.
            </p>
          </FadeIn>
        </div>

        <div className="flex flex-col gap-[3px]">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <FadeIn key={i} delay={i * 0.06}>
                <div
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`
                    bg-white rounded-[10px] px-6 py-[18px] cursor-pointer
                    border transition-colors duration-200
                    ${isOpen ? "border-terra/[0.15]" : "border-stone/[0.12]"}
                  `}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-body text-body-sm font-semibold text-charcoal">
                      {faq.q}
                    </span>
                    <span
                      className="font-body text-[22px] text-terra leading-none"
                      style={{
                        transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    >
                      +
                    </span>
                  </div>
                  <div
                    className="overflow-hidden"
                    style={{
                      maxHeight: isOpen ? 200 : 0,
                      opacity: isOpen ? 1 : 0,
                      transition: "max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <p className="font-body text-body-sm text-warm-gray leading-relaxed mt-3.5 pt-3.5 border-t border-stone/[0.15]">
                      {faq.a}
                    </p>
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
