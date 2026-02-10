"use client";

import Image from "next/image";
import { FadeIn, TextReveal } from "@/components/ui";

const advisors = [
  {
    name: "Dr Anant Vinjamoori",
    title: "Superpower Chief Longevity Officer, Harvard MD & MBA",
    image: "/images/AdobeStock_608751415.jpeg",
  },
  {
    name: "Dr Leigh Erin Connealy",
    title: "Clinician & Founder of The Centre for New Medicine",
    image: "/images/AdobeStock_307669822.jpeg",
  },
  {
    name: "Dr Abe Malkin",
    title: "Founder & Medical Director of Concierge MD",
    image: "/images/AdobeStock_406504478.jpeg",
  },
  {
    name: "Dr Robert Lufkin",
    title: "UCLA Medical Professor, NYT Bestselling Author",
    image: "/images/AdobeStock_1682131487.jpeg",
  },
];

const institutions = [
  { name: "Stanford", logo: "/images/stanford.svg", height: 24 },
  { name: "Harvard Medical School", logo: "/images/harvardmedicalschool.svg", height: 28 },
  { name: "UCLA", logo: "/images/ucla.svg", height: 22 },
];

export function Advisors() {
  return (
    <section id="advisors" className="relative px-6 py-section-md">
      <div className="max-w-[1100px] mx-auto">
        {/* ── Header: centered title + institutions below ── */}
        <div className="text-center mb-14">
          <FadeIn variant="fade-up" delay={0.1} y={16}>
            <p className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-terra mb-4">
              Advisory Board
            </p>
          </FadeIn>
          <TextReveal
            as="h2"
            className="font-display text-[28px] md:text-[42px] leading-[1.12] font-normal text-charcoal tracking-tight mb-4 max-w-[600px] mx-auto"
            delay={0.2}
            stagger={0.12}
          >
            Developed by world-class{" "}
            <span className="text-terra font-medium">medical professionals</span>
          </TextReveal>
          <FadeIn variant="blur-up" delay={0.55} y={16}>
            <p className="font-body text-[16px] text-warm-gray leading-relaxed">
              Supported by the world&apos;s top longevity clinicians and MDs.
            </p>
          </FadeIn>

          {/* Institution logos */}
          <FadeIn variant="fade-up" delay={0.4} y={12}>
            <div className="flex items-center justify-center gap-10 md:gap-14 mt-8">
              {institutions.map((inst) => (
                <Image
                  key={inst.name}
                  src={inst.logo}
                  alt={inst.name}
                  width={inst.height * 4}
                  height={inst.height}
                  className="h-[20px] md:h-[26px] w-auto opacity-40"
                />
              ))}
            </div>
          </FadeIn>
        </div>

        {/* ── Advisor cards — 4 column grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {advisors.map((advisor, i) => (
            <FadeIn
              key={advisor.name}
              variant="fade-up"
              delay={0.15 + i * 0.1}
              duration={0.8}
              y={24}
            >
              <div className="group">
                {/* Photo */}
                <div className="relative aspect-[4/5] rounded-[16px] overflow-hidden bg-cream mb-5">
                  <Image
                    src={advisor.image}
                    alt={advisor.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>

                {/* Name & title */}
                <h3 className="font-display text-[18px] font-medium text-charcoal leading-snug mb-1">
                  {advisor.name}
                </h3>
                <p className="font-body text-[14px] text-warm-gray leading-relaxed">
                  {advisor.title}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
