# Aeviti — Steady Health Intelligence

Landing page for Aeviti Baseline, a biomarker interpretation and wellness planning platform.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** with custom design system tokens
- **Google Fonts** via `next/font` (Cormorant Garamond, Plus Jakarta Sans, JetBrains Mono)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + font loading
│   └── page.tsx            # Landing page (composes sections)
├── components/
│   ├── ui/                 # Atomic components
│   │   ├── FadeIn.tsx      # Scroll-triggered animation wrapper
│   │   ├── Typography.tsx  # Overline, SectionTitle, Pill
│   │   ├── Button.tsx      # 5 variants (primary/secondary/outline/warm/ghost)
│   │   └── EmailCapture.tsx # Waitlist email form
│   ├── sections/           # Page sections
│   │   ├── Nav.tsx         # Sticky nav with scroll blur effect
│   │   ├── Hero.tsx        # Full-viewport hero with Baseline card
│   │   ├── Baseline.tsx    # 3 cards with visual panels
│   │   ├── Coverage.tsx    # 5-col marker categories (dark)
│   │   ├── Signal.tsx      # "Less noise. More signal." banner
│   │   ├── Approach.tsx    # 3-step cards with visuals
│   │   ├── Trust.tsx       # Lab stats with map + chart
│   │   ├── Principles.tsx  # 3 principles (dark)
│   │   ├── CTA.tsx         # Waitlist signup
│   │   ├── FAQ.tsx         # Accordion
│   │   └── Footer.tsx      # Links + disclaimer
│   └── visuals/            # Rich card illustrations
│       └── Panels.tsx      # SchedulingVisual, BiomarkerChart, Protocol, etc.
├── lib/
│   ├── tokens.ts           # Design system tokens (colors, categories, nav data)
│   └── hooks.ts            # useInView, useScrolled
└── styles/
    └── globals.css         # Tailwind + custom utilities
```

## Design System

All brand tokens live in `src/lib/tokens.ts` and `tailwind.config.ts`.

### Key Patterns

- **Light/dark alternation**: Sections alternate between ivory/cream and petrol gradient backgrounds
- **Typography**: Cormorant Garamond (display) + Plus Jakarta Sans (body) + JetBrains Mono (data)
- **Signature accent**: Italic text in terra (light bg) or sand (dark bg) inside headlines
- **Rich cards**: Every feature card includes a visual illustration component (chart, scheduling widget, etc.)
- **Terracotta reserved for CTAs**: Only buttons and overlines use the terra accent color

See `.cursorrules` for full design system documentation.

## Deployment

Build for production:

```bash
npm run build
npm start
```

Deploy to Vercel, Replit, or any Node.js host.
