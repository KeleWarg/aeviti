"use client";

import { ReactNode } from "react";
import { useInView } from "@/lib/hooks";

/**
 * Apple-quality easing curves
 * - ease-out-expo: dramatic deceleration (hero reveals)
 * - ease-out-quart: smooth deceleration (general content)
 * - spring: slight overshoot for playful feel
 */
const EASINGS = {
  "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
  "ease-out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

type Variant =
  | "fade-up"
  | "fade-down"
  | "scale-up"
  | "blur-up"
  | "blur-in"
  | "slide-left"
  | "slide-right"
  | "none";

interface FadeInProps {
  children: ReactNode;
  /** Animation variant */
  variant?: Variant;
  /** Delay in seconds */
  delay?: number;
  /** Duration in seconds (default: 0.9) */
  duration?: number;
  /** Y-axis translation in px (for fade-up/fade-down/blur-up) */
  y?: number;
  /** X-axis translation in px (for slide variants) */
  x?: number;
  /** Easing curve */
  easing?: keyof typeof EASINGS;
  /** Additional class name */
  className?: string;
  /** Threshold for intersection observer (0-1) */
  threshold?: number;
  /** Whether to add will-change hint for GPU acceleration */
  gpu?: boolean;
}

function getVariantStyles(
  variant: Variant,
  isVisible: boolean,
  y: number,
  x: number,
) {
  const hidden: Record<string, string> = {};
  const visible: Record<string, string> = {};

  switch (variant) {
    case "fade-up":
      hidden.opacity = "0";
      hidden.transform = `translateY(${y}px)`;
      visible.opacity = "1";
      visible.transform = "translateY(0)";
      break;

    case "fade-down":
      hidden.opacity = "0";
      hidden.transform = `translateY(-${y}px)`;
      visible.opacity = "1";
      visible.transform = "translateY(0)";
      break;

    case "scale-up":
      hidden.opacity = "0";
      hidden.transform = "scale(0.92)";
      visible.opacity = "1";
      visible.transform = "scale(1)";
      break;

    case "blur-up":
      hidden.opacity = "0";
      hidden.filter = "blur(12px)";
      hidden.transform = `translateY(${y}px)`;
      visible.opacity = "1";
      visible.filter = "blur(0px)";
      visible.transform = "translateY(0)";
      break;

    case "blur-in":
      hidden.opacity = "0";
      hidden.filter = "blur(16px)";
      hidden.transform = "scale(0.95)";
      visible.opacity = "1";
      visible.filter = "blur(0px)";
      visible.transform = "scale(1)";
      break;

    case "slide-left":
      hidden.opacity = "0";
      hidden.transform = `translateX(${x}px)`;
      visible.opacity = "1";
      visible.transform = "translateX(0)";
      break;

    case "slide-right":
      hidden.opacity = "0";
      hidden.transform = `translateX(-${x}px)`;
      visible.opacity = "1";
      visible.transform = "translateX(0)";
      break;

    case "none":
      visible.opacity = "1";
      hidden.opacity = "1";
      break;
  }

  return isVisible ? visible : hidden;
}

function getTransitionProperties(variant: Variant) {
  const base = ["opacity", "transform"];
  if (variant === "blur-up" || variant === "blur-in") {
    base.push("filter");
  }
  return base;
}

export function FadeIn({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.9,
  y = 32,
  x = 60,
  easing = "ease-out-expo",
  className = "",
  threshold = 0.08,
  gpu = true,
}: FadeInProps) {
  const [ref, isVisible] = useInView(threshold);

  const variantStyles = getVariantStyles(variant, isVisible, y, x);
  const transitionProps = getTransitionProperties(variant);
  const easingValue = EASINGS[easing];

  const transition = transitionProps
    .map((prop) => `${prop} ${duration}s ${easingValue} ${delay}s`)
    .join(", ");

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...variantStyles,
        transition,
        willChange: gpu && !isVisible ? transitionProps.join(", ") : "auto",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Stagger wrapper — automatically applies increasing delays to FadeIn children.
 * Wrap multiple FadeIn components and they'll animate in sequence.
 */
interface StaggerProps {
  children: ReactNode;
  /** Base delay before first child */
  baseDelay?: number;
  /** Delay increment per child in seconds */
  stagger?: number;
  className?: string;
}

export function Stagger({
  children,
  baseDelay = 0,
  stagger = 0.08,
  className = "",
}: StaggerProps) {
  return <div className={className}>{children}</div>;
}
