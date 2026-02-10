"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { navItems } from "@/lib/tokens";

/** IDs (or selectors) of sections that have dark backgrounds */
const DARK_SECTIONS = new Set(["hero"]);

/** Scroll distance (px) over which the nav shrinks from wide to compact */
const SHRINK_THRESHOLD = 100;

export function Nav() {
  const [onDark, setOnDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);

  const detect = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const header = headerRef.current;
      if (!header) return;

      // Track scroll for width transition
      setScrolled(window.scrollY > SHRINK_THRESHOLD);

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

  /* Close mobile menu on scroll */
  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [mobileOpen]);

  const linkClass = onDark
    ? "text-white/65 hover:text-white hover:bg-white/[0.08]"
    : "text-charcoal/60 hover:text-charcoal hover:bg-black/[0.05]";

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 md:px-6 pt-4"
    >
      <nav
        className={`
          pointer-events-auto flex items-center gap-2
          w-full
          backdrop-blur-[20px] backdrop-saturate-[1.8]
          rounded-full px-3 py-2
          transition-[max-width,background-color,border-color,box-shadow] duration-500 ease-out
          ${scrolled ? "max-w-[780px]" : "max-w-[1100px]"}
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

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`font-body text-[13px] px-4 py-2 rounded-full transition-colors duration-300 cursor-pointer whitespace-nowrap ${linkClass}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#faq"
            className={`font-body text-[13px] px-4 py-2 rounded-full transition-colors duration-300 cursor-pointer whitespace-nowrap ${linkClass}`}
          >
            FAQs
          </a>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Desktop CTA */}
        <a
          href="#waitlist"
          className="hidden md:inline-flex items-center gap-1.5 bg-terra text-white font-body text-[13px] font-medium pl-5 pr-4 py-2.5 rounded-full cursor-pointer hover:bg-terra-dark transition-colors whitespace-nowrap shrink-0"
        >
          Join waitlist
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
            onDark ? "text-white hover:bg-white/[0.08]" : "text-charcoal hover:bg-black/[0.05]"
          }`}
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {mobileOpen ? (
              <path d="M5 5L13 13M13 5L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M3 5.5H15M3 9H15M3 12.5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      <div
        className={`
          pointer-events-auto md:hidden absolute top-full left-4 right-4 mt-2
          backdrop-blur-[20px] backdrop-saturate-[1.8]
          rounded-2xl overflow-hidden
          transition-all duration-300 ease-out
          ${
            onDark
              ? "bg-petrol-dark/90 border border-white/[0.1]"
              : "bg-white/80 border border-black/[0.06]"
          }
          ${
            mobileOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-2 invisible"
          }
        `}
      >
        <div className="flex flex-col p-4 gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`font-body text-[15px] px-4 py-3 rounded-xl transition-colors ${
                onDark
                  ? "text-white/70 hover:text-white hover:bg-white/[0.06]"
                  : "text-charcoal/70 hover:text-charcoal hover:bg-black/[0.04]"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#faq"
            onClick={() => setMobileOpen(false)}
            className={`font-body text-[15px] px-4 py-3 rounded-xl transition-colors ${
              onDark
                ? "text-white/70 hover:text-white hover:bg-white/[0.06]"
                : "text-charcoal/70 hover:text-charcoal hover:bg-black/[0.04]"
            }`}
          >
            FAQs
          </a>
          <div className="pt-2 px-2">
            <a
              href="#waitlist"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center bg-terra text-white font-body text-[14px] font-medium py-3 rounded-full hover:bg-terra-dark transition-colors w-full"
            >
              Join waitlist
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
