"use client";

import { ReactNode } from "react";
import { useInView } from "@/lib/hooks";

const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

interface TextRevealProps {
  children: ReactNode;
  /** Tag to render */
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  /** Base delay before animation starts */
  delay?: number;
  /** Delay between each line/word */
  stagger?: number;
  /** Duration per element */
  duration?: number;
  /** Split mode */
  split?: "lines" | "words";
  /** Additional className */
  className?: string;
  /** Whether to blur in */
  blur?: boolean;
}

/**
 * TextReveal — Apple-style text animation.
 * Wraps each line (defined by <br/>) in a clip container and
 * animates them upward with staggered timing.
 *
 * Usage:
 * <TextReveal as="h2" className="text-4xl font-bold">
 *   Know your health.<br />
 *   Not just your data.
 * </TextReveal>
 */
export function TextReveal({
  children,
  as: Tag = "div",
  delay = 0,
  stagger = 0.12,
  duration = 0.8,
  className = "",
  blur = false,
}: TextRevealProps) {
  const [ref, isVisible] = useInView(0.1);

  // Split children by <br /> elements into lines
  const lines = splitChildrenIntoLines(children);

  return (
    <Tag ref={ref as never} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span
            className="block"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(110%)",
              opacity: isVisible ? 1 : 0,
              filter: blur
                ? isVisible
                  ? "blur(0px)"
                  : "blur(8px)"
                : undefined,
              transition: [
                `transform ${duration}s ${EASING} ${delay + i * stagger}s`,
                `opacity ${duration * 0.6}s ${EASING} ${delay + i * stagger}s`,
                blur
                  ? `filter ${duration}s ${EASING} ${delay + i * stagger}s`
                  : "",
              ]
                .filter(Boolean)
                .join(", "),
              willChange: !isVisible ? "transform, opacity" : "auto",
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Splits React children into lines based on <br/> elements.
 * If no <br/> found, returns the entire content as one line.
 */
function splitChildrenIntoLines(children: ReactNode): ReactNode[] {
  if (typeof children === "string") {
    return children.split("\n").filter((s) => s.trim());
  }

  if (!Array.isArray(children)) {
    // Check if it's a fragment or element with children containing <br/>
    const childArray = flattenChildren(children);
    if (childArray.length <= 1) return [children];

    const lines: ReactNode[][] = [[]];
    for (const child of childArray) {
      if (
        child &&
        typeof child === "object" &&
        "type" in child &&
        child.type === "br"
      ) {
        lines.push([]);
      } else {
        lines[lines.length - 1].push(child);
      }
    }

    return lines
      .filter((line) => line.length > 0)
      .map((line, i) => (line.length === 1 ? line[0] : <span key={i}>{line}</span>));
  }

  // Array of children — split on <br/> elements
  const lines: ReactNode[][] = [[]];
  for (const child of children) {
    if (
      child &&
      typeof child === "object" &&
      "type" in child &&
      child.type === "br"
    ) {
      lines.push([]);
    } else {
      lines[lines.length - 1].push(child);
    }
  }

  return lines
    .filter((line) => line.length > 0)
    .map((line, i) => (line.length === 1 ? line[0] : <span key={i}>{line}</span>));
}

function flattenChildren(children: ReactNode): ReactNode[] {
  if (children == null || typeof children === "boolean") return [];
  if (typeof children === "string" || typeof children === "number")
    return [children];
  if (Array.isArray(children)) return children.flatMap(flattenChildren);
  if (typeof children === "object" && "props" in children && children.props?.children) {
    return [children]; // Keep complex elements whole
  }
  return [children];
}
