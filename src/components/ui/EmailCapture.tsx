"use client";

import { useState, FormEvent } from "react";

interface EmailCaptureProps {
  light?: boolean;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export function EmailCapture({
  light,
  placeholder = "Email for early access",
  buttonText = "Get updates",
  className = "",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: integrate with your email service (Mailchimp, ConvertKit, etc.)
    console.log("Email submitted:", email);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`flex items-center gap-2 font-body text-body-sm ${light ? "text-sand" : "text-sage"} ${className}`}>
        <span className="w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center text-xs text-success">✓</span>
        You're on the list. We'll be in touch.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex max-w-[460px] ${className}`}>
      <input
        type="email"
        required
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`
          flex-1 font-body text-[15px] outline-none
          px-5 py-3.5 rounded-l-full
          ${light
            ? "bg-white/[0.06] border border-white/10 border-r-0 text-white placeholder:text-white/25"
            : "bg-white border-[1.5px] border-stone/60 border-r-0 text-charcoal"
          }
        `}
      />
      <button
        type="submit"
        className="flex items-center gap-2 bg-terra text-white font-body text-[15px] font-semibold px-7 py-3.5 rounded-r-full whitespace-nowrap cursor-pointer hover:bg-terra-dark transition-colors"
      >
        {buttonText} <span>→</span>
      </button>
    </form>
  );
}
