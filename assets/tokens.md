# wAIter — Token Cheatsheet

Quick lookup for builders. Authoritative source: `assets/styles.css`.

## Colour

```
--ink         #0B0D0E   near-black, warmer than pure black
--char        #14161A   surface (dark)
--steel       #1F2227   border (dark)
--graphite    #2A2D33   chip / muted bg

--bone        #F2EDE4   surface (light)
--paper       #FAF7F1   bg (light, default)

--text        — adapts: ink on light, bone-tinted on dark
--muted       — secondary text
--dim         — tertiary text, labels
--bg          — page background (light: paper, dark: ink)
--surface     — elevated card bg
--border      — hairline 10% opacity
--border-strong — 18% opacity

--saffron       #E8A33D   PRIMARY ACCENT — brand pop, CTAs, highlights
--saffron-deep  #C8861E   hover / active state for saffron
--ember         #C24A2A   ALERTS — overdue, out-of-stock, errors
--olive         #8FA055   SUCCESS — paid, on-track, complete
--olive-deep    #6B7C3C   hover / active state for olive
--brass         #C9A86A   PREMIUM — pro tier, contracts, NFT badges
```

Light theme is default. Dark theme auto-applies via `prefers-color-scheme: dark`.

## Type

```
--display    Fraunces (700, 800)            — hero, section titles
--body       Inter (400, 500, 600, 700)     — paragraphs, UI
--mono       JetBrains Mono (400, 600)      — labels, data, kitchen-ticket flavour
```

## Scale

```
--space-1     4px
--space-2     8px
--space-3    12px
--space-4    16px
--space-5    24px
--space-6    32px
--space-7    48px
--space-8    64px
--space-9    96px
```

## Radii

```
--radius-1    3px      pills/badges (small)
--radius-2    6px      buttons, inputs
--radius-3   10px      cards
--radius-pill 100px    big rounded pills
```

## Layout wrappers

```
.wrap         max-width 880px (landing default)
.wrap-narrow  max-width 760px (text-heavy)
.wrap-wide    max-width 1200px (demo, header)
```

## Atoms ready to use

- `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-mono` — buttons
- `.pill`, `.pill-saffron`, `.pill-olive`, `.pill-ember`, `.pill-brass` — status pills
- `.dot`, `.dot-saffron`, `.dot-olive`, `.dot-ember`, `.dot-dim` — status dots with glow
- `.card`, `.card-saffron`, `.card-olive`, `.card-ember`, `.card-brass` — cards with accent border
- `.kpi`, `.kpi-label` — big numbers + their labels
- `.input`, `.select`, `.range` — form fields
- `.eyebrow`, `.section-title` — small uppercase mono labels

## Shared chrome (consumed by landing + demo)

- `.site-header` — sticky top, blurred bg
- `.site-nav` — link list inside header
- `.site-footer` — page footer

## Motion

```
--ease       cubic-bezier(0.2, 0.8, 0.2, 1)
--t-quick    120ms
--t-base     240ms
--t-slow     480ms
```

`prefers-reduced-motion` is respected globally.

## Accessibility primitives

- `.skip-link` — keyboard skip-to-content
- `.sr-only` — screen-reader-only content
- Global `:focus-visible` outline → 2px saffron, 3px offset

## SVG icons

All icons live in `assets/icons/` as standalone files. They use `currentColor` for fills/strokes — set the colour via the parent's CSS `color` property. Default viewBox is `0 0 24 24`.
