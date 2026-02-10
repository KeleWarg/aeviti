"use client";

import { FadeIn, TextReveal, Overline, EmailCapture } from "@/components/ui";

export function CTA() {
  return (
    <section id="waitlist" className="bg-ivory px-6 md:px-12 py-section-md">
      <FadeIn variant="fade-up" y={24}>
        <div className="max-w-[600px] mx-auto text-center">
          <Overline>Get early access</Overline>
          <TextReveal
            as="h2"
            className="font-display text-[28px] md:text-[42px] font-normal text-charcoal leading-[1.15] tracking-tight mb-3.5"
            delay={0.1}
          >
            Join the waitlist for{" "}
            <span className="text-terra font-medium">Aeviti Baseline</span>
          </TextReveal>
          <p className="font-body text-body-sm text-warm-gray leading-relaxed mb-8">
            No spam — just product progress. Be the first to experience steady
            health intelligence.
          </p>
          <EmailCapture
            placeholder="Your email address"
            buttonText="Join waitlist"
            className="mx-auto"
          />
          <p className="font-body text-body-xs text-stone mt-3">
            By joining, you agree to receive product updates.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
