"use client";

import { useRef, useState, useEffect, useCallback } from "react";

/**
 * Intersection Observer hook — triggers once when element enters viewport.
 */
export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
}

/**
 * Scroll position hook — returns true when scrolled past threshold.
 */
export function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return scrolled;
}

/**
 * Scroll progress hook — returns a 0-1 value representing how far
 * through the viewport an element has scrolled.
 * 0 = element bottom just entering viewport
 * 1 = element top just leaving viewport
 */
export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;
    // Element bottom enters viewport -> 0
    // Element top leaves viewport -> 1
    const raw = (windowH - rect.top) / (windowH + rect.height);
    setProgress(Math.max(0, Math.min(1, raw)));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial calc
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return [ref, progress] as const;
}

/**
 * Parallax wrapper hook — returns a ref and a CSS transform value
 * that moves the element at a different rate than scroll.
 * speed < 0 = moves slower (background feel)
 * speed > 0 = moves faster (foreground feel)
 */
export function useParallax(speed = -0.15) {
  const [ref, progress] = useScrollProgress();
  const y = (progress - 0.5) * speed * 200;
  return [ref, { transform: `translateY(${y}px)` }] as const;
}
