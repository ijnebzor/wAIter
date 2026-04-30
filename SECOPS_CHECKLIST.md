# wAIter — SecOps Gate Checklist

**Owners:** Jaycee (lead) · Trevor (co-audit)
**Both signatures required to advance any phase.**
**Findings → fix in-phase → re-audit → retro → next phase.**

Frameworks gated against:
- **OWASP** Top 10 2021 + 2025 (and ASVS L1 where applicable)
- **NIST CSF v2** (GV / ID / PR / DE / RS / RC)
- **ISO/IEC 27001:2022** Annex A controls
- **ASD Essential Eight** (Maturity Level One baseline)
- **WCAG 2.2 AA**

This is a public-repo, static-site demo on GitHub Pages. No backend, no DB, no auth, no PII. Threat surface is: leaked secrets/strategy in repo, client-side XSS, supply-chain (CDN/3p deps), tampering, accessibility regressions, brand/IP leakage.

---

## Lane split (auditor of record per area; the other co-signs)

| Area | Lead | Co-sign |
|---|---|---|
| Secrets / credentials (incl. full-history scan) | Trevor | Jaycee |
| Repo config (branch protection, GH Pages posture, signed commits) | Trevor | Jaycee |
| `.gitignore` completeness | Trevor | Jaycee |
| Supply chain (SRI, lockfiles, GH Actions pinning) | Trevor | Jaycee |
| Content / copy (no PII, no client names beyond brief, no internal URLs) | Jaycee | Trevor |
| WCAG 2.2 AA (contrast, focus, alt, aria, keyboard) | Jaycee | Trevor |
| CSP draft + headers | Jaycee | Trevor |
| Privacy (no trackers, no third-party fonts/CDNs that phone home) | Jaycee | Trevor |

A finding in your peer's lane is flagged but the lead makes the call. Both sign in `#waiterSU` per phase before it advances.

---

## How to run a gate

1. Lead and co-auditor each run the relevant phase block **independently**.
2. Compare findings. Reconcile. Either both PASS or block the phase.
3. Findings are fixed **in the same phase** by the originating builder. Re-audit. Then sign.
4. Sign-off posted in `#waiterSU` as: `GATE PHASE N — PASS · Jaycee` + `GATE PHASE N — PASS · Trevor`.

A single FAIL on a hard-gate item blocks the phase. Soft-gate items are recorded as advisories but do not block.

---

## Phase 0 — Setup & Repo Posture

**Goal:** Repo is safe to flip public. No secrets, no leaks, sane hygiene.

### 0.1 — Secrets & credentials (HARD GATE) — Trevor lead
| # | Check | Pass criteria | Maps to |
|---|---|---|---|
| 0.1.1 | No tracked secret files | `git ls-files \| grep -E '\\.(env\|key\|pem\|p12\|pfx\|crt\|jks\|kdbx)$\|^\\.aws/\|^\\.npmrc$\|^secrets/'` returns empty | OWASP A02:2021 / A07:2025 · NIST PR.DS-01 · ISO A.8.10 · E8 (App Hardening) |
| 0.1.2 | No secrets in working tree | Filesystem scan for the same patterns returns empty (or covered by .gitignore) | NIST PR.DS-01 · ISO A.5.10 |
| 0.1.3 | No high-entropy strings in tracked content | Grep for `AKIA[0-9A-Z]{16}`, `ASIA[0-9A-Z]{16}` (AWS STS), `xox[abprs]-`, `xapp-` (Slack), `gh[psoru]_[A-Za-z0-9]{36,}` (GitHub), `sk-[A-Za-z0-9]{20,}`, `sk-ant-[A-Za-z0-9_-]{20,}` (Anthropic — non-trivial in an AI-built project), `"type":\\s*"service_account"` (GCP SA JSON), `-----BEGIN .* PRIVATE KEY-----`, `eyJ[A-Za-z0-9_-]+\\.eyJ[A-Za-z0-9_-]+\\.` (JWT) — all clean | OWASP A02:2021 · NIST PR.DS-02 · ISO A.8.24 |
| 0.1.4 | No hardcoded API keys / tokens / passwords in code | Grep `api[_-]?key`, `secret`, `token`, `password`, `bearer ` — review every hit; none real | OWASP A07:2025 · ISO A.8.24 |
| 0.1.5 | Git history clean (full-history scan) | `gitleaks detect` (or `trufflehog`) on full history returns no findings | NIST PR.DS-02 |

### 0.2 — `.gitignore` coverage (HARD GATE) — Trevor lead
Required entries (minimum):
```
# secrets
.env
.env.*
!.env.example
*.key
*.pem
*.p12
*.pfx
*.crt
*.jks
id_rsa*
.aws/
.ssh/
.npmrc
secrets/

# OS / editor
.DS_Store
Thumbs.db
.vscode/
.idea/
*.swp

# build / deps
node_modules/
dist/
build/
.cache/
.parcel-cache/
.next/
coverage/
*.log

# agent / VCS sidecars
.jj/
.claude/
.meridian/

# sibling projects living inside the working dir (must NOT enter public repo)
carcAIre/
TrAIdie reference material/
```

**Why the last block matters:** the wAIter git root contains two sibling-named directories — `carcAIre/` (separate project) and `TrAIdie reference material/` (private inspiration). They are currently untracked but a single `git add .` or `git add -A` would stage them into a public repo. Hard-gate ignore.

Maps to: OWASP A02:2021 · NIST PR.DS-01 · ISO A.5.10 / A.8.10

### 0.3 — Repository readiness for public (HARD GATE) — Jaycee lead on content; Trevor lead on config
| # | Check | Pass criteria | Maps to |
|---|---|---|---|
| 0.3.1 | LICENSE present | File exists, valid OSI-approved or explicit "All rights reserved" with intent | ISO A.5.32 |
| 0.3.2 | README placeholder present | Describes project at a level safe for public; no internal codenames/strategy | NIST GV.PO |
| 0.3.3 | No personal/internal URLs, IPs, paths | Grep for `192.168.`, `10.0.`, internal hostnames, and **absolute paths**: `/Users/ijneb/` (this machine's home dir — exact), `/Users/[a-zA-Z0-9_-]+/`, `/home/[a-z]+/`, `C:\\\\Users\\\\` in tracked content | ISO A.5.14 · CWE-540 |
| 0.3.4 | No partner/client PII | No emails, phone numbers, real names of Antoine/Kaavya beyond what BRIEF authorizes | ISO A.5.34 (Privacy) · NIST GV.OC |
| 0.3.5 | Default branch is `main`, not `master` | `git symbolic-ref HEAD` → `refs/heads/main` | Repo posture |
| 0.3.6 | Repo description / topics on GitHub do not leak strategy | Manual: visit GH settings, confirm | NIST GV.OC |
| 0.3.7 | GH Pages source set safely | `main` branch / `/` (or `/docs`) — confirmed before flip-public | OWASP A05:2021 |

### 0.4 — Branch protection readiness (SOFT GATE for Phase 0; HARD before any external collaborator) — Trevor lead
| # | Check | Pass criteria |
|---|---|---|
| 0.4.1 | `main` branch protection plan documented | Either rules applied OR rationale recorded (small team / today-only sprint) |
| 0.4.2 | Force-push disabled on `main` | Configured if branch protection is on |
| 0.4.3 | Required-review policy decided | Yes/no recorded |
| 0.4.4 | Signed commits | **Advisory-only for today's sprint** (headless agent commits won't be GPG-signed). Re-promote to hard gate in any post-launch hardening pass. |

Maps to: NIST PR.AA · ISO A.8.4 · E8 (Restrict Admin Privileges)

### 0.5 — Supply-chain pre-flight (SOFT GATE; HARD in Phase 1) — Trevor lead
| # | Check | Pass criteria |
|---|---|---|
| 0.5.1 | No `package.json` yet, or pinned versions only | If present: no `^` / `~` on prod deps; lockfile committed |
| 0.5.2 | No external CDN scripts approved | Door is closed. Any introduction in Phase 1+ requires SRI + cross-auditor sign-off (Jaycee + Trevor). |
| 0.5.3 | Webfont strategy decided | **Decision (Phase 0): self-host woff2** for Fraunces / Inter / JetBrains Mono. Rationale: GDPR (no Google IP-logging on render), CSP tightness (`font-src 'self'` + `style-src 'self'`), supply-chain (SRI not supported on `@import`), perf (one origin). OFL.txt to be included alongside fonts. — confirmed by Jaycee + Trevor in `#waiterSU`. |

Maps to: OWASP A06:2021 / A06:2025 · A08:2021 · NIST PR.DS-06 · ISO A.8.30 · E8 (Patch Apps)

### 0.6 — Workstation / posture hygiene (SOFT GATE — informational)
- `.DS_Store` not tracked (covered in 0.2)
- Editor history files not tracked
- No swap files / `.orig` / `.bak` tracked

---

## Phase 1 — Brand System (Bartholomew)

### 1.1 — Asset hygiene (HARD GATE) — Jaycee lead
- All raster/vector assets are project-original or properly licensed; provenance recorded in `assets/CREDITS.md` or inline.
- No EXIF/metadata leaking author/location: `exiftool` strip on any photos.
- SVG sanitised: no `<script>`, no `on*` handlers, no external `xlink:href` / `<use href="...">` to non-self origins, no `<foreignObject>` (HTML-injection vector inside SVG).
- Font licensing: Fraunces (OFL), Inter (OFL), JetBrains Mono (OFL) — self-hosted woff2; `OFL.txt` ships alongside fonts.

Maps to: OWASP A03:2021 (Injection via SVG) · ISO A.5.32 · A.8.32

### 1.2 — CSS / token integrity (HARD GATE) — Jaycee lead
- `assets/styles.css` contains no `expression(...)`, no `javascript:` URLs, no `@import` from third-party origins.
- All `@font-face` `src:` URLs are same-origin (`/assets/fonts/...`).
- Tokens documented (CSS custom properties) so downstream builders cannot drift.

Maps to: OWASP A03:2021 · A05:2021

### 1.3 — Accessibility tokens (HARD GATE) — Jaycee lead (WCAG 2.2 AA)
- All defined fg/bg pairs in the Mise en place palette pass **WCAG 2.2 AA** (4.5:1 normal text, 3:1 large/UI). Document any non-text decorative pair as such.
- Focus-ring token defined and visible (≥3:1 against adjacent colours).

Maps to: WCAG 2.2 — 1.4.3 · 1.4.11 · 2.4.7 · 2.4.13

### 1.4 — Brand integrity
- Wordmark consistent; no duplicate "wAIter" spellings.
- Tagline exact: *"The wait is over."*

---

## Phase 2 — Landing + Deck (Lucas) and Demo Flow (Natasha)

### 2.1 — Client-side injection / XSS (HARD GATE) — Jaycee lead
- No `innerHTML` / `outerHTML` writes of user-derived or URL-derived data without escaping.
- No `eval`, no `new Function(...)`, no `setTimeout/setInterval(string, …)`.
- No `document.write` / `document.writeln`.
- No `<a href="javascript:...">` (CSP catches it but a grep gate is cheap).
- All DOM strings rendered via `textContent` or a documented sanitiser.
- ROI calculator: numeric inputs validated and clamped (`Number.isFinite`, sane bounds).

Maps to: OWASP A03:2021 (Injection) · A03:2025 · NIST PR.PS · ISO A.8.28

### 2.2 — Content Security Policy (HARD GATE) — Jaycee lead
- `<meta http-equiv="Content-Security-Policy">` present on `index.html`, `demo/index.html`, `deck/index.html`.
- Baseline directives:
  ```
  default-src 'self';
  img-src 'self' data:;
  style-src 'self';
  script-src 'self';
  font-src 'self';
  connect-src 'self';
  frame-src 'none';
  frame-ancestors 'none';
  worker-src 'none';
  manifest-src 'self';
  base-uri 'self';
  form-action 'self';
  object-src 'none';
  upgrade-insecure-requests;
  ```
  (If no PWA manifest, downgrade `manifest-src` to `'none'`.)
- Tighten by removing `'unsafe-inline'` everywhere — hash inline styles/scripts if any exist.
- Any third-party origin in CSP must have an explicit need, documented in BRIEF or COPY.

Maps to: OWASP A05:2021 (Security Misconfig) · A07:2025 · NIST PR.IR · ISO A.8.9

### 2.3 — Subresource Integrity (HARD GATE if any CDN) — Trevor lead
- Every `<script src=...>` and `<link rel="stylesheet" href=...>` to a third-party origin carries `integrity="sha384-..."` and `crossorigin="anonymous"`.

Maps to: OWASP A06:2021 / A06:2025 · A08:2021 · NIST PR.DS-06 · ISO A.8.30 · E8 (Patch Apps)

### 2.4 — Privacy & data — Jaycee lead
- No analytics/telemetry without an explicit BRIEF decision and a privacy line in COPY.
- `localStorage` / `sessionStorage` use is local-only, no PII; documented per key.
- Smart-contract auto-pay reveal uses **fake** data — no real wallet addresses, no real tx hashes.
- No third-party requests on initial paint (DevTools network panel: only same-origin).
- Referrer policy: `<meta name="referrer" content="strict-origin-when-cross-origin">` minimum. Prefer `no-referrer` since we have no analytics destination.
- No `<link rel="prefetch">` / `<link rel="preconnect">` / `<link rel="dns-prefetch">` to any third-party origin.

Maps to: OWASP A04:2021 (Insecure Design) · ISO A.5.34 · NIST GV.OC

### 2.5 — Accessibility (HARD GATE — WCAG 2.2 AA) — Jaycee lead
- Semantic landmarks (`<header><main><nav><footer>`); single `<h1>` per document; sequential headings.
- All interactive controls keyboard-reachable; visible focus.
- All images have `alt` (descriptive or `alt=""` for decorative).
- Form fields have associated `<label>` or `aria-label`.
- Colour contrast ≥ 4.5:1 (text), 3:1 (UI/large).
- Reduced-motion respected (`prefers-reduced-motion: reduce` disables non-essential animation).
- Snap-scroll deck: keyboard not trapped; arrow + tab navigation works; skip-to-content link present.
- New WCAG 2.2 AA: focus not obscured (2.4.11), dragging movements have alternative (2.5.7), target size ≥ 24×24 (2.5.8), accessible authentication n/a (no auth), redundant entry n/a, consistent help (3.2.6) where applicable.

Maps to: WCAG 2.2 AA · ISO A.5.34

### 2.6 — Performance & resilience (SOFT GATE)
- Page weight reasonable (<1.5MB total for landing, <3MB demo).
- No render-blocking 3p scripts.
- Lighthouse Performance ≥ 80 (informational).

### 2.7 — Link hygiene — Jaycee lead
- No broken internal links.
- No links to `localhost`, file paths, or unintended drafts.
- All `target="_blank"` external links carry `rel="noopener noreferrer"`.

Maps to: OWASP A05:2021 · WCAG 2.4.4

---

## Phase 3 — Public Release / GitHub Pages

### 3.1 — HTTP-layer posture (HARD GATE) — Trevor lead
- HTTPS enforced (`Enforce HTTPS` toggle on in GH Pages settings).
- HSTS: GH Pages auto-applies HSTS to `*.github.io` subdomains. Custom domains require separate HSTS preload registration (advisory).
- Custom domain (if any) has DNSSEC / CAA noted as advisory.
- No mixed content.

Maps to: OWASP A02:2021 (Crypto Failures) · NIST PR.DS-02 · ISO A.8.24

### 3.2 — Final secrets & strategy sweep (HARD GATE) — Trevor lead (secrets) / Jaycee lead (strategy/PII)
- Re-run all 0.1 checks against final tree.
- Re-run public-repo-readiness (0.3) — particularly that copy doesn't leak Antoine/Kaavya beyond what BRIEF authorizes.

### 3.3 — Final accessibility sweep (HARD GATE) — Jaycee lead
- Run axe / Lighthouse Accessibility ≥ 95 on `index.html`, `demo/index.html`, `deck/index.html`.
- Manual keyboard-only walkthrough of each page.
- Manual screen-reader spot-check of hero, CTA, and demo.

Maps to: WCAG 2.2 AA

### 3.4 — Release notes / TLDR
- TLDR posted to Benji.
- Retro: each agent posts 3 lines (worked / tune / blockers).

---

## Sign-off blocks (paste filled in)

### PASS template
```
GATE PHASE N — PASS · Jaycee
  Findings: <count>  Fixed in-phase: <count>  Advisories: <count>
  Frameworks: OWASP / NIST CSF v2 / ISO 27001 / ASD E8 / WCAG 2.2 AA — all green
  Notes: <one line>

GATE PHASE N — PASS · Trevor
  Findings: <count>  Fixed in-phase: <count>  Advisories: <count>
  Notes: <one line>
```

### BLOCK template
```
GATE PHASE N — BLOCK · <Jaycee | Trevor>
  Item:     <e.g. 0.3.4 — no partner/client PII>
  Where:    <file:line>
  Evidence: <one-line excerpt or grep hit>
  Maps to:  <OWASP / NIST / ISO / E8 / WCAG ref>
  Fix:      <one-line remediation path>
  Owner:    <builder responsible for fix>
```

A FAIL must list the failing item ID, evidence, and the fix path. Re-audit on remediation.
