/* ============================================================
   wAIter — demo/scripts.js
   Coordination panel + persona switcher + 3 hero flows.
   Pure DOM, no innerHTML of dynamic strings, no eval, no remote calls.
   ============================================================ */
(function () {
  'use strict';

  const D = window.WAITER_DEMO;
  if (!D) return;

  const $ = function (sel, root) { return (root || document).querySelector(sel); };
  const $$ = function (sel, root) { return Array.from((root || document).querySelectorAll(sel)); };

  // ---------- Element factory (textContent only, attribute whitelist) ----------
  // Defence-in-depth (S9): page CSP already forbids inline event handlers
  // (script-src 'self', no 'unsafe-inline'), but the factory also rejects any
  // attribute key not on this list — notably all 'on*' handlers and 'style'.
  // Future callers cannot accidentally route handler strings or inline styles
  // through el(). Use direct property access (.addEventListener, .style.foo)
  // when those are genuinely needed.
  const SAFE_ATTRS = new Set([
    'type', 'role', 'href', 'src', 'alt', 'title',
    'disabled', 'value', 'name', 'id', 'checked', 'selected',
    'placeholder', 'tabindex', 'rel', 'target', 'for', 'autocomplete'
  ]);
  function el(tag, attrs, kids) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class')              node.className = attrs[k];
        else if (k === 'text')          node.textContent = attrs[k];
        else if (k.startsWith('data-')) node.setAttribute(k, attrs[k]);
        else if (k.startsWith('aria-')) node.setAttribute(k, attrs[k]);
        else if (SAFE_ATTRS.has(k)) {
          if (k in node) node[k] = attrs[k];
          else node.setAttribute(k, attrs[k]);
        }
        // else: silently rejected.
      });
    }
    if (kids) {
      (Array.isArray(kids) ? kids : [kids]).forEach(function (k) {
        if (k == null) return;
        if (typeof k === 'string') node.appendChild(document.createTextNode(k));
        else node.appendChild(k);
      });
    }
    return node;
  }

  // Render a "rich" bullet array: ['plain ', {strong:'bold'}, ' more'].
  function richSpan(parts) {
    const wrap = el('span');
    parts.forEach(function (p) {
      if (typeof p === 'string') {
        wrap.appendChild(document.createTextNode(p));
      } else if (p && p.strong) {
        wrap.appendChild(el('strong', { text: p.strong }));
      }
    });
    return wrap;
  }

  // ---------- State ----------
  const state = {
    persona: 'gm',
    tab: 'today'
  };

  // ---------- Render: top bar (persona switcher) ----------
  function renderPersonaSwitcher() {
    const wrap = $('#persona-switcher');
    wrap.replaceChildren();
    Object.values(D.personas).forEach(function (p) {
      const btn = el('button', {
        type: 'button',
        class: 'persona-btn' + (state.persona === p.id ? ' active' : ''),
        'data-persona': p.id,
        'aria-pressed': state.persona === p.id ? 'true' : 'false'
      }, p.label);
      btn.addEventListener('click', function () {
        if (state.persona === p.id) return;
        state.persona = p.id;
        state.tab = 'today';
        render();
      });
      wrap.appendChild(btn);
    });
    const persona = D.personas[state.persona];
    $('#persona-context').textContent = persona.name + ' · ' + persona.role;
  }

  // ---------- Render: tabs ----------
  function renderTabs() {
    const wrap = $('#tab-bar');
    wrap.replaceChildren();
    const persona = D.personas[state.persona];
    persona.tabs.forEach(function (t) {
      const btn = el('button', {
        type: 'button',
        class: 'tab-btn' + (state.tab === t ? ' active' : ''),
        'data-tab': t,
        'aria-pressed': state.tab === t ? 'true' : 'false'
      }, t.charAt(0).toUpperCase() + t.slice(1));
      btn.addEventListener('click', function () {
        if (state.tab === t) return;
        state.tab = t;
        renderTabs();
        renderPanel();
      });
      wrap.appendChild(btn);
    });
  }

  // ---------- Render: main panel ----------
  function renderPanel() {
    const panel = $('#panel');
    panel.replaceChildren();
    if (state.tab === 'today')      panel.appendChild(renderToday());
    else if (state.tab === 'sourcing') panel.appendChild(renderSourcing());
    else if (state.tab === 'insights') panel.appendChild(renderInsights());
    else                             panel.appendChild(renderPlaceholder(state.tab));
  }

  // ---------- Today ----------
  function renderToday() {
    const persona = D.personas[state.persona];
    const briefing = D.briefingByPersona[state.persona];
    const suggestions = D.suggestionsByPersona[state.persona];

    const root = el('div', { class: 'today' });

    // Header strip
    const head = el('div', { class: 'today-head' }, [
      el('div', { class: 'today-date' }, D.today.date),
      el('div', { class: 'today-meta mono' },
        'BOOKINGS ' + D.today.bookings + ' · CONFIRMED ' + D.today.confirmed + ' · WALK-IN ' + D.today.walkIn)
    ]);
    root.appendChild(head);

    // Briefing card
    const briefCard = el('div', { class: 'card briefing-card' }, [
      el('div', { class: 'briefing-head' }, [
        el('span', { class: 'dot dot-saffron', 'aria-hidden': 'true' }),
        el('span', { class: 'briefing-agent' }, 'AI MANAGER · 06:14 · ' + persona.role.toUpperCase())
      ]),
      el('h2', { class: 'serif briefing-title' }, briefing.title),
      (function () {
        const ol = el('ol', { class: 'briefing-bullets' });
        briefing.bullets.forEach(function (b, i) {
          const li = el('li', null, [
            el('span', { class: 'briefing-num mono dim' }, String(i + 1).padStart(2, '0')),
            richSpan(b)
          ]);
          ol.appendChild(li);
        });
        return ol;
      })(),
      el('div', { class: 'briefing-actions' }, [
        (function () {
          const btn = el('button', { class: 'btn btn-primary', type: 'button' }, 'Review draft order →');
          btn.addEventListener('click', openOrderModal);
          return btn;
        })(),
        el('button', { class: 'btn btn-ghost', type: 'button' }, 'Dismiss')
      ])
    ]);
    root.appendChild(briefCard);

    // Suggestions
    const sugWrap = el('div', { class: 'suggestions' });
    suggestions.forEach(function (s) {
      sugWrap.appendChild(
        el('div', { class: 'suggestion' }, [
          el('span', { class: 'pill pill-' + s.tone }, s.tag),
          el('span', { class: 'suggestion-body' }, s.body),
          el('button', { class: 'btn btn-ghost btn-mono', type: 'button' }, s.action)
        ])
      );
    });
    root.appendChild(sugWrap);

    return root;
  }

  // ---------- Sourcing ----------
  function renderSourcing() {
    const root = el('div', { class: 'sourcing' });

    // Cross-reference card (Flow 2)
    const xref = el('div', { class: 'card briefing-card' }, [
      el('div', { class: 'briefing-head' }, [
        el('span', { class: 'dot dot-saffron', 'aria-hidden': 'true' }),
        el('span', { class: 'briefing-agent' }, 'AI MANAGER · CROSS-REFERENCE')
      ]),
      el('h2', { class: 'serif briefing-title' }, 'Mt Pleasant is 14% above market this week.'),
      el('p', { class: 'muted' }, [
        document.createTextNode('A new supplier in your trust graph: '),
        el('strong', { text: 'Hudson Valley Farms' }),
        document.createTextNode(' — verified by 8 venues you trust, $0.40/kg cheaper. Reputation NFT (soulbound, portable across platforms). Want to try a $200 trial order?')
      ]),
      // reputation card
      (function () {
        const repCard = el('div', { class: 'rep-card' });
        const grid = el('div', { class: 'rep-grid' }, [
          el('div', null, [el('strong', null, '4.8 ★'), 'reputation']),
          el('div', null, [el('strong', null, '12'), 'venues']),
          el('div', null, [el('strong', null, '18 mo'), 'on platform']),
          el('div', null, [el('strong', null, '0'), 'disputes'])
        ]);
        const badge = el('span', { class: 'rep-badge', title: 'You and your supplier are paying each other directly. wAIter never touches the money.' }, 'REPUTATION NFT · PORTABLE');
        repCard.appendChild(grid);
        repCard.appendChild(badge);
        return repCard;
      })(),
      el('div', { class: 'briefing-actions' }, [
        (function () {
          const btn = el('button', { class: 'btn btn-primary', type: 'button' }, 'Trial $200 order →');
          btn.addEventListener('click', function () { runEscrowAnimation(btn, 'Trial order escrowed. Released on your delivery scan.'); });
          return btn;
        })(),
        el('button', { class: 'btn btn-ghost', type: 'button' }, 'Stay with Mt Pleasant')
      ])
    ]);
    root.appendChild(xref);

    // Supplier list
    const list = el('div', { class: 'supplier-list' });
    list.appendChild(el('div', { class: 'section-title' }, 'CURRENT SUPPLIERS'));
    D.suppliers.forEach(function (s) {
      list.appendChild(
        el('div', { class: 'supplier-row' }, [
          el('div', { class: 'supplier-name' }, [
            el('strong', { text: s.name }),
            el('span', { class: 'mono dim supplier-cat' }, s.category)
          ]),
          el('div', { class: 'supplier-meta' }, [
            el('span', { class: 'mono' }, s.rep.toFixed(1) + ' ★'),
            el('span', { class: 'mono dim' }, s.venues + ' venues'),
            el('span', { class: 'pill pill-' + (s.status === 'recommended' ? 'saffron' : 'olive') }, s.status)
          ])
        ])
      );
    });
    root.appendChild(list);

    return root;
  }

  // ---------- Insights (ROI Mirror) ----------
  function renderInsights() {
    const m = D.roiMirror;
    const root = el('div', { class: 'insights' });

    root.appendChild(
      el('div', { class: 'insights-head' }, [
        el('span', { class: 'eyebrow' }, 'INSIGHTS · ' + m.period.toUpperCase()),
        el('h2', { class: 'serif' }, 'What wAIter would have saved you.'),
        el('p', { class: 'muted' }, 'Read-only mirror. We\'re watching what your stack already produces. Imagine if you\'d acted on it.')
      ])
    );

    const cards = el('div', { class: 'savings-grid' });
    m.cards.forEach(function (c) {
      cards.appendChild(
        el('div', { class: 'card saving-card' }, [
          el('div', { class: 'saving-num serif' }, '$' + c.value.toLocaleString('en-AU')),
          el('div', { class: 'saving-lbl mono' }, c.label.toUpperCase()),
          el('div', { class: 'saving-desc muted' }, c.desc)
        ])
      );
    });
    root.appendChild(cards);

    // Total tile
    const total = el('div', { class: 'card total-tile' }, [
      el('div', { class: 'total-left' }, [
        el('div', { class: 'total-num serif' }, '$' + m.net.toLocaleString('en-AU') + ' net'),
        el('div', { class: 'total-pct mono dim' }, '= ' + m.pctOfMonthlyRev + ' of monthly revenue, recovered.')
      ]),
      el('div', { class: 'total-formula mono dim' }, '$' + m.saved.toLocaleString('en-AU') + ' saved  −  $' + m.cost + ' wAIter cost')
    ]);
    root.appendChild(total);

    // Sparkline
    const max = Math.max.apply(null, m.sparkline);
    const sparkWrap = el('div', { class: 'sparkline' });
    m.sparkline.forEach(function (v, i) {
      const h = Math.round((v / max) * 100);
      const bar = el('div', { class: 'spark-bar', title: 'Week ' + (i + 1) + ': $' + v.toLocaleString('en-AU') });
      bar.style.height = h + '%';
      sparkWrap.appendChild(bar);
    });
    const sparkBox = el('div', { class: 'card spark-box' }, [
      el('div', { class: 'section-title' }, 'WEEKLY NET — LAST 4 WEEKS'),
      sparkWrap
    ]);
    root.appendChild(sparkBox);

    // CTA
    const cta = el('div', { class: 'insights-cta' }, [
      el('a', { href: '../#pilot', class: 'btn btn-primary' }, 'Start your pilot — free for 2 months')
    ]);
    root.appendChild(cta);

    return root;
  }

  function renderPlaceholder(tab) {
    return el('div', { class: 'placeholder' }, [
      el('div', { class: 'eyebrow' }, tab.toUpperCase()),
      el('h2', { class: 'serif' }, 'Coming up in the next pass.'),
      el('p', { class: 'muted' }, 'This tab is wired in dev — for the partner-review pass we\'re focusing on the three hero flows: Today (briefing), Sourcing (cross-reference), Insights (ROI mirror).')
    ]);
  }

  // ---------- Modal: Order draft (Flow 1) ----------
  // Focus management (S6, WCAG 2.1.2 No Keyboard Trap, 2.4.3 Focus Order,
  // 2.4.11 Focus Not Obscured Min):
  //   - opener saved before open; focus restored to it on close
  //   - Tab / Shift-Tab cycle within modal — focus cannot escape behind overlay
  //   - ESC closes
  function openOrderModal() {
    const opener = document.activeElement;
    const draft = D.orderDraft;
    const overlay = el('div', { class: 'modal-overlay', role: 'presentation' });
    const modal = el('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Order draft' });
    const close = el('button', { class: 'modal-close', type: 'button', 'aria-label': 'Close' }, '✕');
    close.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', onKeydown);

    function closeModal() {
      document.removeEventListener('keydown', onKeydown);
      overlay.remove();
      document.body.style.overflow = '';
      if (opener && typeof opener.focus === 'function') opener.focus();
    }
    function onKeydown(e) {
      if (e.key === 'Escape') { closeModal(); return; }
      if (e.key !== 'Tab') return;
      const focusables = modal.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
      );
      if (focusables.length === 0) { e.preventDefault(); return; }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !modal.contains(active))) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && (active === last || !modal.contains(active))) {
        e.preventDefault(); first.focus();
      }
    }

    modal.appendChild(close);
    modal.appendChild(el('div', { class: 'eyebrow' }, 'ORDER DRAFT'));
    modal.appendChild(el('h3', { class: 'serif modal-title' }, draft.title));

    const tbl = el('table', { class: 'order-table' });
    const thead = el('thead', null,
      el('tr', null, [
        el('th', null, 'SKU'),
        el('th', null, 'Supplier'),
        el('th', null, 'Qty'),
        el('th', { class: 'right' }, 'Total')
      ]));
    tbl.appendChild(thead);
    const tbody = el('tbody');
    draft.lines.forEach(function (l) {
      tbody.appendChild(el('tr', null, [
        el('td', { class: 'mono' }, l.sku),
        el('td', null, l.supplier),
        el('td', { class: 'mono' }, l.qty),
        el('td', { class: 'mono right' }, '$' + l.total.toFixed(2))
      ]));
    });
    tbl.appendChild(tbody);
    modal.appendChild(tbl);

    modal.appendChild(el('div', { class: 'order-totals' }, [
      el('div', null, [el('span', { class: 'mono dim' }, 'SUBTOTAL'), el('span', { class: 'mono' }, '$' + draft.subtotal.toFixed(2))]),
      el('div', null, [el('span', { class: 'mono dim' }, 'PROTOCOL FEE 0.25%'), el('span', { class: 'mono' }, '$' + draft.fee.toFixed(2))]),
      el('div', { class: 'order-total-row' }, [el('span', { class: 'mono' }, 'TOTAL'), el('span', { class: 'mono total-amount' }, '$' + draft.total.toFixed(2))])
    ]));

    const approveBtn = el('button', { class: 'btn btn-primary modal-approve', type: 'button' }, 'Approve order');
    approveBtn.addEventListener('click', function () {
      runEscrowAnimation(approveBtn, 'Smart contract escrowed. Paid on delivery scan.');
    });
    modal.appendChild(el('div', { class: 'modal-actions' }, [
      approveBtn,
      el('button', { class: 'btn btn-ghost', type: 'button' }, 'Edit')
    ]));
    modal.appendChild(el('div', { class: 'mono dim modal-badge', title: 'You and your supplier are paying each other directly. wAIter never touches the money.' }, draft.badge));

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    setTimeout(function () { close.focus(); }, 50);
  }

  // ---------- Smart-contract escrow animation (Flow 1 + 2) ----------
  function runEscrowAnimation(btn, finalMsg) {
    if (btn.disabled) return;
    btn.disabled = true;
    btn.classList.add('escrowing');
    btn.textContent = 'LOCKING FUNDS…';
    setTimeout(function () {
      btn.classList.remove('escrowing');
      btn.classList.add('escrowed');
      btn.textContent = '✓ FUNDS ESCROWED';
    }, 900);
    setTimeout(function () {
      // Find or create a status line below the button
      let status = btn.parentElement.querySelector('.escrow-status');
      if (!status) {
        status = el('div', { class: 'escrow-status mono', role: 'status' });
        btn.parentElement.parentElement.appendChild(status);
      }
      status.textContent = finalMsg;
      status.classList.add('visible');
    }, 1500);
  }

  // ---------- Boot ----------
  function render() {
    renderPersonaSwitcher();
    renderTabs();
    renderPanel();
  }

  document.addEventListener('DOMContentLoaded', render);
})();
