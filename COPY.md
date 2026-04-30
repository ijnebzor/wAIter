# wAIter — COPY

**Every word that appears on the site lives here.** Builders pull from this file. If a word isn't here, ask in `#waiterSU` before inventing.

---

## Brand

- **Name**: wAIter
- **Wordmark**: wAIter (lowercase w + uppercase AI + lowercase ter — the "AI" subtly emphasised, saffron tint or weight contrast)
- **Tagline**: The wait is over.
- **One-liner**: AI-run operations, peer-to-peer supplier marketplace, and self-paying invoices for restaurants who already know what they're doing.

---

## Landing page (`index.html`)

### Nav
- **Left**: wAIter wordmark (logo)
- **Right links** (mono, dim): `the product` · `roi` · `pilot` · `demo →`
- **CTA button**: Get on the pilot list

### Hero
- **Eyebrow** (mono, uppercase, dim): `HOSPITALITY OPERATIONS · AU PILOT INTAKE OPEN`
- **H1** (Fraunces, large): The wait is over.
- **Subhead** (Inter, body): AI-run operations, peer-to-peer supplier marketplace, and self-paying invoices for restaurants who already know what they're doing.
- **Primary CTA**: See the demo →
- **Secondary CTA**: Book a pilot

### Section: The Problem
- **Eyebrow**: `THE PROBLEM`
- **Headline** (Fraunces): You don't need another POS.
- **Body**: Your stack already works. Your team already knows how to use it. The trouble is what it doesn't tell you — the 5–8% of margin bleeding out through the gaps between your POS, your roster app, your inventory sheet, and your supplier's email replies.
- **Three stats** (mono, large numbers, body labels):
  - **5–8%** revenue lost to invisible operational drift
  - **$2.4k–$13k** monthly margin recoverable for a typical $1.5M venue
  - **0 incumbents** offering AI ops + sourcing + smart settlement in one panel

### Section: The Trifecta
- **Eyebrow**: `THE TRIFECTA`
- **Headline** (Fraunces): Three pieces nobody else has put together.

#### Card 1 — AI Manager
- **Icon**: chef hat
- **Title**: AI Manager
- **Body**: A persistent agent that reads everything your stack already produces — bookings, sales, roster, stock, supplier invoices — and tells you what's about to go wrong before it does. Persona-scoped: GM, Head Chef, FOH Manager, Bar Lead. Same data, different decisions.
- **Tag** (pill): runs alongside your existing stack

#### Card 2 — Sourcing Marketplace
- **Icon**: supplier truck
- **Title**: Sourcing Marketplace
- **Body**: Order from your suppliers like always. Or compare against suppliers your trusted peers use, with portable reputation that follows them between platforms. Peer-to-peer, transparent, no middleman taking a cut on the trade.
- **Tag**: portable supplier reputation, on-chain

#### Card 3 — Self-paying invoices
- **Icon**: contract
- **Title**: Self-paying invoices
- **Body**: Approve an order. Funds escrow. Goods arrive. Smart contract pays your supplier on delivery confirmation. You never chase a payment again. wAIter never touches your money — we sit outside the rail entirely.
- **Tag**: P2P · stablecoin-settled · no payment processor

### Section: ROI Calculator
- **Eyebrow**: `WHAT YOU'D KEEP`
- **Headline** (Fraunces): Tell us what you do. We'll tell you what you'd save.
- **Body intro**: Numbers based on observed waste, labour, and supplier-overpay rates across the Australian independent hospitality cohort. Conservative midpoint shown.

#### Inputs
- Label: `Annual revenue` — slider $250k → $5M, default $1.5M
- Label: `Cuisine` — Italian / Chinese / Indian / Modern Australian (default Modern Australian)
- Label: `Number of venues` — number, default 1

#### Output card (saffron border, prominent)
- Header (mono): `ESTIMATED SAVINGS — 6 MONTHS`
- Three rows:
  - **Month 1**: `$X,XXX–$X,XXX net`
  - **Month 3**: `$X,XXX–$X,XXX net`
  - **Month 6**: `$X,XXX–$X,XXX net`
- Total tile: **6-month cumulative net: $XX,XXX**
- Footnote (dim): About 3% of your annual revenue — and that's before we replace your stack.

### Section: How we plug in
- **Eyebrow**: `THE PROCESS`
- **Headline** (Fraunces): We don't ask you to switch off anything.
- **Body**: wAIter mirrors what your existing tools produce. Lightspeed, Kounta, Square, MarketMan, Deputy, SevenRooms, Xero — we read them. The AI Manager surfaces what they hide. You decide which tool to switch off, and when. Some operators sit at "mirror + insights" forever and never replace anything else. That's fine. The savings are real either way.
- **Connector list** (small mono pills, neutral colour):
  Lightspeed · Kounta · Square · H&L · Impos · OrderMate · Bepoz · MarketMan · xtraCHEF · Deputy · Tanda · 7shifts · Foundu · SevenRooms · OpenTable · ResDiary · NowBookIt · Quandoo · Xero · MYOB · KeyPay · Employment Hero · Bidvest · PFD · Foodbomb

### Section: The pilot offer
- **Eyebrow**: `AU PILOT — 50 VENUES, 5–10 SEATS`
- **Headline** (Fraunces): We pay your costs for two months.
- **Body**: You keep your existing stack. We just plug in alongside and start surfacing where you're leaking money. After two months, two outcomes: you've already saved more than what we cost — in which case we move you onto a paid plan and start migrating tools off as fast or as slow as you want — or you've saved nothing and we walk away. No obligation. Hardware appliance included for the trial. Training for two staff included.
- **Bullet list**:
  - All software costs covered for 2 months
  - All API costs covered
  - Free hardware appliance (NUC + tablet + printers + scale)
  - Training for two staff (operator certification)
  - No obligation — walk if it doesn't earn

### Section: Closing CTA
- **Eyebrow**: `READY?`
- **Headline** (Fraunces, large): The wait is over.
- **Form**: Email field + button "Get on the pilot list"
- **Confirmation** (after submit): "Saved. We'll be in touch within 48 hours."
- **Microcopy** (dim): No spam. No newsletter. We email once when your pilot slot opens.

### Footer
- Wordmark + tagline
- `© 2026 wAIter · Surry Hills, Sydney`
- `Contact: open an issue on GitHub`
- Links: privacy · terms · github (greyed out, "soon")

---

## Demo (`/demo/`)

### Top bar
- Wordmark (links back to `/`)
- Venue name: **Stagione · Surry Hills** (mono, dim)
- Persona switcher (right): four pills, current selected in saffron
  - GM
  - Head Chef
  - FOH
  - Bar
- Demo banner (small, mono, on saffron strip): `DEMO MODE · NO LIVE DATA · NO LIVE PAYMENTS`

### Main panel (varies by persona, same data shape)

Default tabs visible per persona:

| Persona | Visible tabs |
|---|---|
| GM | Today · Insights · Sourcing · Roster · Compliance |
| Head Chef | Today · Sourcing · Stock · Recipes |
| FOH | Today · Bookings · Roster · Comps |
| Bar | Today · Sourcing · Stock · Compliance |

### "Today" tab content

#### Header
- **Date**: Saturday 30 Apr 2026
- **Forecast** (mono, small): `BOOKINGS 142 · CONFIRMED 128 · WALK-IN PROJECTION 18`

#### Briefing card (top of panel)
- AI Manager voice — bordered card, saffron accent
- Headline: **Morning briefing — 4 things to know before service**
- Bullets:
  1. Friday's bookings up 22% w/w. Saturday at 142 confirmed (vs avg 124).
  2. **Chicken thigh short by 12kg** for projected covers. Ordering draft below.
  3. House pinot 4 bottles short. Lonely Vines order draft below.
  4. **Maria** — Thursday roster gap on certified-supervisor coverage. 1 conflict to resolve.
- CTA: **Review draft order →** (opens Flow 1)

#### Suggestions list (below briefing)
Each is a single-line card with status pill + body + action:
- 🟡 `LOW STOCK` — Espresso beans (The Daily Grind) at 2-day cover. Auto-reorder?
- 🟢 `OPPORTUNITY` — Hudson Valley Farms 14% under Mt Pleasant on chicken this week. Compare?
- 🔴 `COMPLIANCE` — RSA recert due in 14 days for Tomás. Book?
- 🟢 `INSIGHT` — Last 4 Saturdays: post-9pm dessert sales up 31% when special is featured.

### "Sourcing" tab content (Flow 2 location)

- Default supplier (Mt Pleasant Poultry) — order draft from Flow 1
- AI cross-reference card (saffron, prominent):
  - Headline: **Mt Pleasant is 14% above market this week.**
  - Body: **Hudson Valley Farms** — verified by 8 venues you trust, 4.8★ reputation, $0.40/kg cheaper. Reputation NFT (soulbound, portable across platforms). Want to try a $200 trial order?
  - Reputation card (brass border):
    - 4.8★
    - 12 venues
    - 18 months on platform
    - 0 disputes
    - Badge: `REPUTATION NFT · PORTABLE`
  - CTA: **Trial $200 order →** (triggers smart-contract escrow animation)
- Supplier list below (Mt Pleasant, Lonely Vines, Northbridge Greens, The Daily Grind, Coastal Catch)

### "Insights" tab content (Flow 3 location)

#### Header
- **Last 30 days — what wAIter would have saved you.**
- Subhead: *"This is the read-only mirror. We're watching what your stack already produces. Imagine if you'd acted on it."*

#### Three savings cards (each large, Fraunces numbers)
- **$4,217** — Stock waste avoided · *Better par levels + supplier alerts*
- **$1,840** — Labour optimised · *Roster gaps closed before peak*
- **$620** — Subscription consolidation · *3 tools you don't need anymore*

#### Total tile (olive accent, prominent)
- **$6,677 saved**
- minus **$199 wAIter cost**
- equals **$6,478 net for the month**
- *= 4.3% of monthly revenue, recovered.*

#### Sparkline
- Weekly net savings, last 4 weeks (small chart)

#### CTA (button)
- **Start your pilot — free for 2 months**

---

## AI Manager voice rules

When the AI Manager speaks (briefing modal, suggestion cards, ROI mirror narration):

- **Direct, never chatty.** "Friday's bookings are up 22% w/w." Not "Hi! I noticed Friday was a great day!"
- **Numbers first.** Quantify before qualifying.
- **Action-oriented.** Always proposes a next step.
- **No emojis.** Status icons are visual, not in speech.
- **No "as an AI" disclaimers.** Speak with authority on the data we've seen.
- **Never patronise.** Operators know their venue better than we do. We surface what's hidden, we don't lecture.

### Sample voice (good)
- ✅ "Chicken thigh short by 12kg for tonight. Drafted order with Mt Pleasant. Approve when ready."
- ✅ "Maria's Thursday shift conflicts with certified-supervisor coverage. 1 conflict to resolve."
- ✅ "Last 4 Saturdays: post-9pm dessert sales up 31% when special is featured."

### Sample voice (bad — do not write)
- ❌ "Hi James! I'm so excited to help you today!"
- ❌ "It looks like there might be a small issue with your roster perhaps?"
- ❌ "As your AI assistant, I'd recommend considering ordering more chicken."

---

## Smart-contract reveal copy (Flow 1 + Flow 2)

When user clicks **Approve order** or **Trial order**:

1. Button animates → state shifts to `LOCKING FUNDS...` (saffron)
2. ~600ms later: `FUNDS ESCROWED` (olive)
3. Final state: `Smart contract escrowed. Paid on delivery scan.`
4. Below: small mono badge: `P2P SETTLEMENT · NO PROCESSOR · INSPECTION WINDOW: 24H`

If user hovers the badge: tooltip — *"You and your supplier are paying each other directly. wAIter never touches the money."*

---

## Deck (`/deck/`)

12 sections, each its own viewport-height snap-scroll panel.

1. **Title**
   - wAIter
   - The wait is over.
   - (small) Partner review pass · April 2026

2. **The problem**
   - Established hospo runs on a stack of 4–7 disconnected tools.
   - 5–8% of margin bleeds out the gaps.
   - Operators have learned to live with it.

3. **The insight**
   - Incumbents won't switch. They'll add.
   - We're the layer that runs alongside, then absorbs.

4. **The product**
   - Single coordination panel
   - Persona-scoped (GM / Chef / FOH / Bar)
   - Powered by AI Manager

5. **The trifecta**
   - AI Manager + Sourcing Marketplace + Self-paying Invoices
   - First time anyone has put these three together

6. **Hero shots**
   - 3 screenshots: Morning Briefing, Marketplace, ROI Mirror

7. **Why now**
   - AUDD live (Novatti, AU-pegged stablecoin)
   - Account abstraction production-ready (ERC-4337 on L2)
   - Hospo AI moment (operators tired of legacy POS lock-in)

8. **The wedge**
   - AU 50-venue pilot
   - Italian / Chinese / Indian / Modern Australian
   - 5–10 seats, 2 months free, all costs covered

9. **Unit economics**
   - For a $1.5M venue: $6.5k/mo net by month 6
   - For wAIter: $79–199/venue/mo SaaS + 0.25% on settled trade volume
   - At $50M annual GMV: $1.24M/yr operating margin advantage vs Stripe Connect

10. **The moat**
    - AI grounded in live operations data
    - Portable supplier reputation (soulbound NFT)
    - Hardware + training onboarding lock-in

11. **GTM phases**
    - Closed alpha → Paid beta → Public launch → Cross-venue trade
    - AU first. NZ + UK after.

12. **The ask**
    - Funding to cover the AU 50-pilot fronting costs
    - Eat margin until volume justifies the take rate
    - Then scale.

---

*Last updated: 2026-04-30 by Kailee. Update whenever copy changes; flag in `#waiterSU`.*
