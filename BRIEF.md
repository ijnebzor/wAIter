# wAIter — Build Brief

**Single source of truth for Phase 0–3.** Every builder reads this before touching code. Every SecOps audit references this. If you find an ambiguity, surface it in `#waiterSU` — don't invent.

---

## Mission

Ship a polished landing page, interactive demo, and scrollable deck on GitHub Pages **today**.

Audience: founder's prospective partners (review pass). Outcome they should feel after 60 seconds: *"why don't I already have this?"*

## Brand

- **Name**: wAIter
- **Tagline**: *The wait is over.*
- **Wordmark**: lowercase `w` + uppercase `AI` + lowercase `ter` — the "AI" emphasised via weight contrast or saffron tint.
- **Palette**: "Mise en place"
- **Voice**: confident, technical-but-warm, restaurateur-respecting. We do not condescend. We do not mock the incumbents. We solve the problem.

### Colour tokens (use these names, exact values)

```css
:root {
  /* Surfaces */
  --ink:        #0B0D0E;
  --char:       #14161A;
  --steel:      #1F2227;
  --bone:       #F2EDE4;
  --paper:      #FAF7F1;
  --graphite:   #2A2D33;

  /* Type on dark */
  --text-dark:    #ECE6DA;
  --muted-dark:   #A29C90;
  --dim-dark:     #6F6A60;

  /* Type on light */
  --text-light:   #14161A;
  --muted-light:  #5A5A55;
  --dim-light:    #8A8A82;

  /* Signature accents */
  --saffron:    #E8A33D;  /* primary accent / brand pop */
  --ember:      #C24A2A;  /* alerts, overdue, out-of-stock */
  --olive:      #8FA055;  /* success, paid, on-track */
  --brass:      #C9A86A;  /* premium, pro tier, contracts */

  /* Borders / hairlines */
  --border-light: rgba(20, 22, 26, 0.08);
  --border-dark:  rgba(242, 237, 228, 0.10);
}
```

### Typography

- **Display (hero, section titles)**: `'Fraunces', Georgia, serif` — variable axis. Hero weight 700–800, line-height 1.05, letter-spacing −0.02em.
- **Body (paragraphs, UI labels)**: `'Inter', system-ui, sans-serif` — 400/500/600/700 weights, line-height 1.65.
- **Mono (data, timestamps, status pills, kitchen-ticket flavour)**: `'JetBrains Mono', ui-monospace, monospace` — 400/600. Uppercase labels with letter-spacing 0.18em.

### Font hosting (DECIDED — Phase 0, Trevor + Bartholomew)

**Self-hosted woff2 in `assets/fonts/`. NO Google Fonts CDN.** Reasons: stricter CSP (no `font-src https://fonts.gstatic.com` carve-out), SRI hashing possible, no GDPR/EDPB exposure on third-party font requests, better caching, faster paint.

- Subset: **latin** only (English-language demo).
- `font-display: swap`.
- `@font-face` declarations in `assets/styles.css` referencing local files.
- **Trevor** pulls the woff2 files + SHA-256s them; **Bartholomew** references them in `styles.css`.
- **`OFL.txt` committed at repo root** with attribution for Fraunces (Open Font License), Inter (OFL), JetBrains Mono (OFL).

Weights to ship:
- Fraunces — 700, 800
- Inter — 400, 500, 600, 700
- JetBrains Mono — 400, 600

### Default theme

**Light-mode default** — paper bg + ink text. Hospitality runs in daylight; ops dashboards live on stainless tablets in glare. Dark-mode auto-applies for users with `prefers-color-scheme: dark`.

### Layout

- Wrap: `max-width: 880px` (landing) / `max-width: 1200px` (demo dashboard).
- Section vertical rhythm: 96px desktop, 56px mobile.
- Hairline borders only — no heavy shadows.
- Pills: 1px border, 100px radius, JetBrains Mono labels.
- Status dots: 8px diameter, soft glow via `box-shadow`.

### Shared chrome

`.site-header`, `.site-nav`, `.site-footer` — defined in `assets/styles.css`, consumed by both `index.html` and `demo/index.html`. Single source of truth, zero stitched feel.

---

## Working repo

- **Remote**: `ijnebzor/wAIter` (currently empty + private; flipping public in Phase 0)
- **Default branch**: `main`

---

## Site map

| Path | Purpose | Owner |
|---|---|---|
| `/` (`index.html`) | Landing — hero, problem, trifecta, ROI calculator, connector story, pilot offer, CTA | Dr. Lucas Marquardt of the Forbidden Snack Drawer |
| `/demo/` | Interactive demo — coordination panel, persona switcher, three hero flows | Mr. Natasha Schulist |
| `/deck/` | 12-section scrollable pitch deck | Dr. Lucas Marquardt of the Forbidden Snack Drawer (after landing) |
| `/assets/` | Shared brand system — `styles.css`, `wordmark.svg`, `icons/`, `sample-screens/`, `fonts/` | Bartholomew the Unready |

## File ownership map (zero merge conflicts)

```
/
├── BRIEF.md              ← Kailee
├── COPY.md               ← Kailee
├── README.md             ← Kailee
├── LICENSE               ← Kailee
├── OFL.txt               ← Bartholomew (font licences)
├── .gitignore            ← Kailee
├── SECOPS_CHECKLIST.md   ← Jaycee
├── index.html            ← Lucas (Landing)
├── assets/
│   ├── styles.css        ← Bartholomew (BRAND)
│   ├── tokens.md         ← Bartholomew (token cheatsheet)
│   ├── landing.js        ← Lucas (Landing)
│   ├── wordmark.svg      ← Bartholomew (BRAND)
│   ├── icons/*.svg       ← Bartholomew (BRAND)
│   ├── sample-screens/*.html ← Bartholomew (BRAND, standalone HTML)
│   └── fonts/*.woff2     ← Trevor pulls, Bartholomew references
├── demo/
│   ├── index.html        ← Natasha (DEMO)
│   ├── data.js           ← Natasha (DEMO)
│   └── scripts.js        ← Natasha (DEMO)
└── deck/
    └── index.html        ← Lucas (DECK)
```

If your file isn't on this list, ask in `#waiterSU` before creating it.

---

## What's in scope today

✅ Landing page with interactive ROI calculator
✅ Demo with persona switcher + 3 hero flows on mock data
✅ Scrollable deck (12 sections)
✅ Brand system (tokens, type, primitives, ~10 icons, wordmark, 3 sample screens)
✅ Self-hosted fonts (woff2 latin subset)
✅ GitHub Pages deployment
✅ SecOps audit at every phase gate (OWASP 2021+2025, NIST CSF v2, ISO 27001, ASD E8, WCAG 2.2 AA)

## What's NOT in scope today

❌ Real backend — no API calls, no auth, no database
❌ Real payments / Stripe / smart contracts — UI mocks only, with "wired in dev" placeholder if asked
❌ Real connector adapters (Lightspeed, Square, etc.) — mock data only
❌ Multi-venue group view — single-venue Stagione only
❌ Mobile-perfect — desktop-first, mobile-responsive but not optimised
❌ User accounts / sign-up — landing CTA captures email to `console.log` + `localStorage`, no backend
❌ Analytics / trackers — none. Privacy-by-default.
❌ Third-party JS frameworks — vanilla JS only. No React/Vue/Svelte.
❌ Build steps — no webpack/vite/esbuild. Files served as-is.
❌ Third-party CDN fetches — fonts, icons, scripts all local.

---

## Hero flows (Demo)

### Flow 1 — Morning Briefing
**Trigger**: GM persona, "Morning briefing" CTA on coordination panel.
**Sequence**:
1. Modal opens with AI Manager voice: *"Friday's bookings are up 22% on last week. Based on Saturday's typical mix, you're 12kg short on chicken thigh and 4 bottles short on the house pinot. I've drafted an order with Mt Pleasant Poultry and Lonely Vines; approve when ready. Also, Maria's roster shifts next week conflict with her certified-supervisor coverage on Thursday."*
2. Order draft preview (table: SKU, supplier, qty, unit cost, line total).
3. CTA: **Approve order**.
4. On approve: 1.5s "funds locked" animation (saffron → olive transition with smart-contract icon). Status updates to *"Smart contract escrowed. Paid on delivery scan."*
5. Subtle check tick. Modal closes. Coordination panel shows new pending order with olive status pill.

### Flow 2 — Marketplace Cross-Reference
**Trigger**: Head Chef persona, "Sourcing" tab on coordination panel.
**Sequence**:
1. Default supplier (Mt Pleasant Poultry) shown with current order.
2. AI flag (saffron callout): *"Mt Pleasant is 14% above market this week. New supplier Hudson Valley Farms — verified by 8 venues you trust, 4.8 reputation score, $0.40/kg cheaper. Want to try a $200 trial order? Smart contract handles dispute if it's not up to spec."*
3. Reputation card for Hudson Valley Farms: 4.8★, 12 venues, 18 months on platform, "Reputation NFT — portable" badge in brass.
4. CTA: **Trial $200 order**.
5. On click: smart-contract escrow animation. Confirmation: *"Trial order escrowed. Funds release on your delivery scan."*

### Flow 3 — ROI Mirror
**Trigger**: Owner persona (treat as same as GM for this demo), "Insights" tab.
**Sequence**:
1. Header: *"Last 30 days — what wAIter would have saved you."*
2. Three big numbers (Fraunces serif):
   - **$4,217** stock waste avoided
   - **$1,840** labour optimised
   - **$620** subscription consolidation
3. Total tile: **$6,677 saved · $199 wAIter cost · $6,478 net** (olive accent, large).
4. Sparkline chart of weekly net savings (4 weeks).
5. CTA: **Start your pilot — free for 2 months**.

---

## ROI calculator (Landing)

### Inputs
- Annual venue revenue (slider, $250k → $5M, default $1.5M, step $50k)
- Cuisine type (select: Italian / Chinese / Indian / Modern Australian, default "Modern Australian")
- Number of venues (number, default 1)

### Output (live as user changes inputs)
- Month 1 net savings range
- Month 3 net savings range
- Month 6 net savings range
- 6-month cumulative
- Visual: bar chart per month (M1–M6) with savings bars + cumulative line

### Math (cuisine multipliers per dollar of revenue)

| Cuisine | M1 low | M1 high | M3 low | M3 high | M6 low | M6 high |
|---|---|---|---|---|---|---|
| Italian | 0.0010 | 0.0020 | 0.0035 | 0.0055 | 0.0055 | 0.0085 |
| Chinese | 0.0009 | 0.0018 | 0.0030 | 0.0050 | 0.0050 | 0.0080 |
| Indian | 0.0012 | 0.0022 | 0.0040 | 0.0060 | 0.0060 | 0.0095 |
| Modern Australian | 0.0010 | 0.0021 | 0.0036 | 0.0058 | 0.0056 | 0.0090 |

(Calibration: $1.5M Mod AU → $1.5–3.2k M1, $5.4–8.7k M3, $8.4–13.5k M6 — within the spec band.)

Multiply: `revenue × multiplier × number_of_venues`. Use midpoint for headline, show low–high range underneath.

---

## Mock data — Stagione

- **Venue**: Stagione
- **Cuisine**: Modern Australian
- **Location**: Surry Hills, Sydney
- **Annual revenue**: $1.8M
- **Covers / week**: ~620 average
- **Staff headcount**: 18 (12 FOH, 6 BOH)

### Personas (real names for the demo)
- **GM**: James Holcombe
- **Head Chef**: Yuki Andersson
- **FOH Manager**: Maria Cervantes
- **Bar/Cellar Lead**: Tomás Reyes

### Suppliers (mock — all fictional)
| Supplier | Category | Reputation | Status |
|---|---|---|---|
| Mt Pleasant Poultry | Poultry | 4.5★ (24 venues) | Current |
| Hudson Valley Farms | Poultry | 4.8★ (12 venues) | Recommended |
| Lonely Vines | Wine | 4.7★ (38 venues) | Current |
| Northbridge Greens | Produce | 4.6★ (51 venues) | Current |
| The Daily Grind | Coffee | 4.9★ (88 venues) | Current |
| Coastal Catch | Seafood | 4.4★ (19 venues) | Current |

---

## SecOps standing baseline (every phase)

- **OWASP Top 10 (2021)** — XSS, broken auth, injection, broken access control, security misconfiguration, vulnerable components, identification/auth failures, software/data integrity failures, logging/monitoring failures, SSRF.
- **OWASP Top 10 (2025)** — supply-chain, AI/LLM risks, broken object property authorization, server-side template injection (where applicable).
- **NIST CSF v2** — Identify, Protect, Detect, Respond, Recover, Govern.
- **ISO 27001** — A.5 Org, A.6 People, A.7 Physical, A.8 Tech.
- **WCAG 2.2 AA** — perceivable, operable, understandable, robust.
- **ASD Essential 8** — application control, patch apps, configure macros, user app hardening, restrict admin, patch OS, MFA, regular backups.
- **PCI DSS** — adds at Phase 5 (Stripe live).
- **SOC 2** — Type 1 by Phase 12, Type 2 by Phase 13.

### What this means for today's static site

- No `innerHTML` from user input. Use `textContent` or sanitised template literals.
- No inline `onclick=` handlers in HTML — use `addEventListener` from JS.
- All `target="_blank"` links carry `rel="noopener noreferrer"`.
- No third-party trackers, no analytics, no cookies.
- Email capture: `console.log` + `localStorage` (no PII to network in demo).
- Strict CSP via `<meta http-equiv="Content-Security-Policy" ...>`.
- All assets local — no CDN fetches.
- All images carry alt text. All inputs carry labels. Keyboard navigation works.
- Colour contrast ≥ 4.5:1 for body, ≥ 3:1 for large text and UI components.
- No secrets in repo. `.gitignore` covers `.env`, keys, certs.

### Sign-off rule

**Every commit gated by Jaycee + Trevor. Both signatures required. Findings → fix in-phase → re-audit → retro → next phase. No exceptions.**

---

## Working agreements

- One commit per agent per logical unit. Clear conventional-style commit messages.
- All work on `main` branch (small team, fast feedback). Branch protection added in Phase 0 SecOps gate per Jaycee/Trevor's call.
- Standup → work → SecOps gate → retro → TLDR. Every phase. No skipping.
- Block on SecOps findings. Don't argue them — address them.
- TLDR Benji at every phase end. Concise. He reads them all.
- If something blocks you, surface it in `#waiterSU` immediately. Don't sit on it.

---

*Last updated: 2026-04-30 by Kailee. Update this file whenever scope changes; flag updates in `#waiterSU`.*
