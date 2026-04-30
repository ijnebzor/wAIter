/* ============================================================
   wAIter — demo/data.js
   Mock data for the fictional venue Stagione (Mod AU, Surry Hills).
   Single source of truth for the demo. No PII; all names fictional.
   ============================================================ */
window.WAITER_DEMO = (function () {
  'use strict';

  const venue = {
    name: 'Stagione',
    cuisine: 'Modern Australian',
    location: 'Surry Hills, Sydney',
    revenue: 1800000,
    coversWeekly: 620,
    staff: { foh: 12, boh: 6 }
  };

  // Personas — fictional characters in fictional venue Stagione.
  const personas = {
    gm:    { id: 'gm',    label: 'GM',         name: 'James',  role: 'General Manager',
             tabs: ['today', 'insights', 'sourcing', 'roster', 'compliance'] },
    chef:  { id: 'chef',  label: 'Head Chef',  name: 'Yuki',   role: 'Head Chef',
             tabs: ['today', 'sourcing', 'stock', 'recipes'] },
    foh:   { id: 'foh',   label: 'FOH',        name: 'Maria',  role: 'FOH Manager',
             tabs: ['today', 'bookings', 'roster', 'comps'] },
    bar:   { id: 'bar',   label: 'Bar',        name: 'Tomás',  role: 'Bar / Cellar Lead',
             tabs: ['today', 'sourcing', 'stock', 'compliance'] }
  };

  const today = {
    date: 'Saturday 30 Apr 2026',
    bookings: 142,
    confirmed: 128,
    walkIn: 18,
    weekOverWeek: '+22%'
  };

  const briefingByPersona = {
    gm: {
      title: 'Morning briefing — 4 things to know before service',
      bullets: [
        ["Friday's bookings up ", { strong: '22% w/w' }, '. Saturday at 142 confirmed (vs avg 124).'],
        [{ strong: 'Chicken thigh short by 12kg' }, ' for projected covers. Order draft below.'],
        ['House pinot 4 bottles short. Lonely Vines order draft below.'],
        [{ strong: 'Roster gap' }, ' — Thursday certified-supervisor coverage. 1 conflict to resolve.']
      ]
    },
    chef: {
      title: 'BOH briefing — prep + supply for service',
      bullets: [
        ['Saturday covers up ', { strong: '14% on average' }, '. Build prep list +14% across mains.'],
        [{ strong: 'Chicken thigh short by 12kg' }, ' — order draft drawn against Mt Pleasant.'],
        ['Pork belly delivery confirmed 09:30, Northbridge.'],
        ["Last week's waste hot-spot: dessert mise — pivot to a smaller batch?"]
      ]
    },
    foh: {
      title: 'Floor briefing — covers, comps, staffing',
      bullets: [
        ['142 covers booked. Walk-in projection ', { strong: '+18' }, '. Plan for 158-160.'],
        ['VIP arrivals: 7. Allergen flags: 3 (gluten, dairy, peanut).'],
        [{ strong: 'Maria' }, ' Thursday shift conflicts with certified-supervisor coverage. Resolve.'],
        ['Last 4 Saturdays: 9pm dessert sales up 31% when special is featured.']
      ]
    },
    bar: {
      title: 'Bar briefing — pour cost, stock, licensing',
      bullets: [
        ['House pinot 4 bottles short. Lonely Vines order draft drawn.'],
        [{ strong: 'Espresso beans' }, ' (The Daily Grind) at 2-day cover. Auto-reorder?'],
        [{ strong: 'RSA recert' }, ' due in 14 days for Tomás. Book?'],
        ['Pour cost on the negroni up 1.2pp w/w — gin batch variance.']
      ]
    }
  };

  // Suggestion cards under the briefing — a mix per persona.
  const suggestionsByPersona = {
    gm: [
      { tone: 'saffron', tag: 'LOW STOCK', body: 'Espresso beans (The Daily Grind) at 2-day cover.', action: 'Auto-reorder?' },
      { tone: 'olive',   tag: 'OPPORTUNITY', body: 'Hudson Valley Farms 14% under Mt Pleasant on chicken this week.', action: 'Compare?' },
      { tone: 'ember',   tag: 'COMPLIANCE', body: 'RSA recert due in 14 days for Tomás.', action: 'Book?' },
      { tone: 'olive',   tag: 'INSIGHT', body: 'Last 4 Saturdays: post-9pm dessert sales up 31% when special is featured.', action: 'Feature tonight?' }
    ],
    chef: [
      { tone: 'saffron', tag: 'PREP', body: 'Build prep list +14% across mains for tonight.', action: 'Generate list →' },
      { tone: 'olive',   tag: 'WASTE', body: 'Dessert mise hot-spot — smaller batch could save $180/wk.', action: 'Apply?' },
      { tone: 'olive',   tag: 'OPPORTUNITY', body: 'Hudson Valley Farms 14% under Mt Pleasant on chicken.', action: 'Compare?' },
      { tone: 'saffron', tag: 'RECIPE', body: 'Margin on lamb shoulder up 4pp if portion held at 240g.', action: 'Lock spec?' }
    ],
    foh: [
      { tone: 'saffron', tag: 'VIP', body: '7 VIP arrivals tonight. Pre-brief floor at 17:30?', action: 'Set brief →' },
      { tone: 'ember',   tag: 'ROSTER', body: 'Maria Thursday conflict with certified-supervisor.', action: 'Resolve?' },
      { tone: 'olive',   tag: 'INSIGHT', body: '9pm dessert sales up 31% when feature is highlighted on the floor.', action: 'Highlight?' },
      { tone: 'olive',   tag: 'BOOKING', body: '4 unconfirmed reservations — ETA reminder send?', action: 'Send?' }
    ],
    bar: [
      { tone: 'saffron', tag: 'LOW STOCK', body: 'Espresso beans 2-day cover, house pinot 4 bottles short.', action: 'Auto-reorder?' },
      { tone: 'ember',   tag: 'COMPLIANCE', body: 'RSA recert due in 14 days for Tomás.', action: 'Book?' },
      { tone: 'olive',   tag: 'POUR COST', body: 'Negroni up 1.2pp on gin batch variance — re-spec for the week?', action: 'Re-spec?' },
      { tone: 'saffron', tag: 'OPPORTUNITY', body: 'Wine: 3 unmoved bottles >120 days. Pair with weekend special?', action: 'Pair?' }
    ]
  };

  // Order draft (Flow 1) — opens from the briefing.
  const orderDraft = {
    title: 'Order draft — for tonight\'s service',
    badge: 'P2P SETTLEMENT · NO PROCESSOR · INSPECTION WINDOW: 24H',
    lines: [
      { sku: 'CHKN-THGH-2KG', supplier: 'Mt Pleasant Poultry', qty: '6 × 2kg', unit: 12.40, total: 148.80 },
      { sku: 'PINOT-HSE-750', supplier: 'Lonely Vines',         qty: '4 × 750ml', unit: 18.50, total: 74.00 },
      { sku: 'EBEAN-GRD-1KG', supplier: 'The Daily Grind',      qty: '2 × 1kg',   unit: 42.00, total: 84.00 }
    ],
    subtotal: 306.80,
    fee: 0.77,
    total: 307.57
  };

  // Suppliers (Flow 2 + general).
  const suppliers = [
    { name: 'Mt Pleasant Poultry', category: 'Poultry',  rep: 4.5, venues: 24, status: 'current' },
    { name: 'Hudson Valley Farms', category: 'Poultry',  rep: 4.8, venues: 12, status: 'recommended', months: 18, disputes: 0 },
    { name: 'Lonely Vines',        category: 'Wine',     rep: 4.7, venues: 38, status: 'current' },
    { name: 'Northbridge Greens',  category: 'Produce',  rep: 4.6, venues: 51, status: 'current' },
    { name: 'The Daily Grind',     category: 'Coffee',   rep: 4.9, venues: 88, status: 'current' },
    { name: 'Coastal Catch',       category: 'Seafood',  rep: 4.4, venues: 19, status: 'current' }
  ];

  // ROI Mirror (Flow 3).
  const roiMirror = {
    period: 'Last 30 days',
    cards: [
      { value: 4217, label: 'Stock waste avoided', desc: 'Better par levels + supplier alerts' },
      { value: 1840, label: 'Labour optimised',     desc: 'Roster gaps closed before peak' },
      { value:  620, label: 'Subscription consolidation', desc: '3 tools you don\'t need anymore' }
    ],
    saved: 6677,
    cost:  199,
    net:   6478,
    pctOfMonthlyRev: '4.3%',
    sparkline: [1280, 1950, 1620, 1628] // weekly net for 4 weeks
  };

  return { venue, personas, today, briefingByPersona, suggestionsByPersona, orderDraft, suppliers, roiMirror };
})();
