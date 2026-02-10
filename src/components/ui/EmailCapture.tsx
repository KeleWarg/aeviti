"use client";

import { useState, useRef, FormEvent } from "react";

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
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    <form onSubmit={handleSubmit} className={`inline-flex items-center gap-3 ${className}`}>
      <div
        className="relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ width: focused ? 320 : 220 }}
      >
        <input
          ref={inputRef}
          type="email"
          required
          placeholder={placeholder}
          value={email}
          onFocus={() => setFocused(true)}
          onBlur={() => { if (!email) setFocused(false); }}
          onChange={(e) => setEmail(e.target.value)}
          className={`
            w-full font-body text-[15px] outline-none
            px-6 py-3.5 rounded-full
            transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${light
              ? `backdrop-blur-[20px] backdrop-saturate-[1.6] text-white placeholder:text-white/40
                 ${focused
                   ? "bg-white/[0.14] border border-white/[0.25] shadow-[0_4px_32px_rgba(0,0,0,0.12),inset_0_0.5px_0_rgba(255,255,255,0.2)]"
                   : "bg-white/[0.08] border border-white/[0.15] shadow-[0_4px_24px_rgba(0,0,0,0.08),inset_0_0.5px_0_rgba(255,255,255,0.1)]"
                 }`
              : "bg-white border-[1.5px] border-stone/60 text-charcoal"
            }
          `}
        />
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 bg-terra text-white font-body text-[15px] font-medium px-7 py-3.5 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#006641] transition-colors shrink-0"
      >
        {buttonText} <span>→</span>
      </button>
    </form>
  );
}
