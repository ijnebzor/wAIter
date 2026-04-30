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

--focus         var(--ember)   FOCUS RING — used by :focus-visible globally
```

Light theme is default. Dark theme auto-applies via `prefers-color-scheme: dark`.

### Text-safety on light surfaces (WCAG 2.2 AA)

Verified contrast ratios against `--paper` (#FAF7F1). On light backgrounds, only some accents are safe as **text**; the rest are **surface / border / fill only**.

| Token        | On paper | Body text (4.5:1) | Large/UI (3:1) | Use as |
|---|---|---|---|---|
| `--text` `--ink` `--char` `--graphite` | ≥12.9:1 | ✅ | ✅ | text + UI + surface |
| `--muted`    | 6.49:1   | ✅ | ✅ | secondary text |
| `--dim`      | 5.02:1 (4.61:1 on bone surface) | ✅ | ✅ | tertiary text, labels, eyebrows |
| `--ember`    | 4.56:1   | ✅ | ✅ | text + UI (focus ring) + fill |
| `--olive-deep` | 4.29:1 | ❌ | ✅ | large text / UI only — **not body text on light** |
| `--saffron-deep` | 2.85:1 | ❌ | ❌ | surface / border only — **not text on light** |
| `--brass`    | 2.11:1   | ❌ | ❌ | surface / border / decorative — **not text on light** |
| `--saffron`  | 2.02:1   | ❌ | ❌ | fill / border / dot only — **not text on light** |
| `--olive`    | 2.68:1   | ❌ | ❌ | fill / border only — **not text on light** |

**On dark surfaces** (against `--ink`), all named accents pass body-text contrast: saffron 9.03:1, brass 8.62:1, olive 6.80:1, ember 3.99:1 (UI-only on dark — passes 3:1 but not 4.5:1, so fine for focus-ring/borders/icons but not body text).

When you need a text-coloured pill/callout on light, use `var(--text)` and let the border carry the brand colour — that's the pattern in `.pill-saffron / .pill-olive / .pill-brass`.

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
