"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { navItems } from "@/lib/tokens";

/** IDs (or selectors) of sections that have dark backgrounds */
const DARK_SECTIONS = new Set(["hero"]);

export function Nav() {
  const [onDark, setOnDark] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);

  const detect = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const header = headerRef.current;
      if (!header) return;

      // Sample point: centre-x of the nav, just below it
      const rect = header.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.bottom + 4;

      // Temporarily hide the header so elementFromPoint sees what's behind it
      header.style.pointerEvents = "none";
      header.style.visibility = "hidden";
      const el = document.elementFromPoint(x, y);
      header.style.visibility = "";
      header.style.pointerEvents = "";

      if (!el) return;

      // Walk up to find the nearest section (or the z-10 wrapper)
      let node: HTMLElement | null = el as HTMLElement;
      let isDark = false;

      while (node && node !== document.body) {
        const id = node.id || "";
        if (DARK_SECTIONS.has(id)) {
          isDark = true;
          break;
        }
        // Check computed background color
        const bg = getComputedStyle(node).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          // Parse rgb(a) and check luminance
          const match = bg.match(/(\d+),\s*(\d+),\s*(\d+)/);
          if (match) {
            const r = parseInt(match[1]);
            const g = parseInt(match[2]);
            const b = parseInt(match[3]);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            isDark = luminance < 0.45;
          }
          break;
        }
        node = node.parentElement;
      }

      setOnDark(isDark);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", detect, { passive: true });
    detect();
    return () => {
      window.removeEventListener("scroll", detect);
      cancelAnimationFrame(rafRef.current);
    };
  }, [detect]);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-6 pt-4"
    >
      <nav
        className={`
          pointer-events-auto flex items-center gap-2
          max-w-[780px] w-full
          backdrop-blur-[20px] backdrop-saturate-[1.8]
          rounded-full px-3 py-2
          transition-[background-color,border-color,box-shadow] duration-500 ease-out
          ${
            onDark
              ? "bg-white/[0.08] border border-white/[0.12] shadow-[0_4px_30px_rgba(0,0,0,0.12),inset_0_0.5px_0_rgba(255,255,255,0.15)]"
              : "bg-white/[0.55] border border-black/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.06),inset_0_0.5px_0_rgba(255,255,255,0.6)]"
          }
        `}
      >
        {/* Logo */}
        <div className="flex items-center pl-4 pr-5 shrink-0">
          <span
            className={`font-display text-[18px] font-medium tracking-tight transition-colors duration-500 ${
              onDark ? "text-white" : "text-charcoal"
            }`}
          >
            aeviti
          </span>
        </div>

        {/* Center links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`font-body text-[13px] px-4 py-2 rounded-full transition-colors duration-300 cursor-pointer whitespace-nowrap ${
                onDark
                  ? "text-white/65 hover:text-white hover:bg-white/[0.08]"
                  : "text-charcoal/60 hover:text-charcoal hover:bg-black/[0.05]"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#faq"
            className={`font-body text-[13px] px-4 py-2 rounded-full transition-colors duration-300 cursor-pointer whitespace-nowrap ${
              onDark
                ? "text-white/65 hover:text-white hover:bg-white/[0.08]"
                : "text-charcoal/60 hover:text-charcoal hover:bg-black/[0.05]"
            }`}
          >
            FAQs
          </a>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <a
          href="#waitlist"
          className="inline-flex items-center gap-1.5 bg-terra text-white font-body text-[13px] font-semibold pl-5 pr-4 py-2.5 rounded-full cursor-pointer hover:bg-terra-dark transition-colors whitespace-nowrap shrink-0"
        >
          Join waitlist
        </a>
      </nav>
    </header>
  );
}
