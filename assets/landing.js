/* ============================================================
   wAIter — landing.js
   ROI calculator + pilot-list email capture (client-side only).
   No third-party fetches. No PII to network.
   ============================================================ */
(function () {
  'use strict';

  // ---------- ROI calculator ----------
  // Multipliers per BRIEF.md (revenue × multiplier × venues = monthly net).
  const MULTIPLIERS = {
    italian:    { m1: [0.0010, 0.0020], m3: [0.0035, 0.0055], m6: [0.0055, 0.0085] },
    chinese:    { m1: [0.0009, 0.0018], m3: [0.0030, 0.0050], m6: [0.0050, 0.0080] },
    indian:     { m1: [0.0012, 0.0022], m3: [0.0040, 0.0060], m6: [0.0060, 0.0095] },
    modern_aus: { m1: [0.0010, 0.0021], m3: [0.0036, 0.0058], m6: [0.0056, 0.0090] }
  };

  const $revenue = document.getElementById('roi-revenue');
  const $cuisine = document.getElementById('roi-cuisine');
  const $venues  = document.getElementById('roi-venues');
  const $revenueOut = document.getElementById('roi-revenue-out');
  const $m1 = document.getElementById('roi-m1');
  const $m3 = document.getElementById('roi-m3');
  const $m6 = document.getElementById('roi-m6');
  const $total = document.getElementById('roi-total');

  function fmtRevenue(n) {
    if (n >= 1000000) return '$' + (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + 'M';
    return '$' + Math.round(n / 1000) + 'k';
  }
  function fmtMoney(n) {
    return '$' + Math.round(n).toLocaleString('en-AU');
  }
  function fmtRange(low, high) {
    return fmtMoney(low) + '–' + fmtMoney(high) + ' net';
  }

  function clamp(n, min, max) {
    if (!Number.isFinite(n)) return min;
    return Math.min(Math.max(n, min), max);
  }

  function calculate() {
    const rev = clamp(Number($revenue.value), 250000, 5000000);
    const cuisine = (MULTIPLIERS[$cuisine.value] ? $cuisine.value : 'modern_aus');
    const venues = clamp(parseInt($venues.value, 10), 1, 20);
    const mult = MULTIPLIERS[cuisine];

    const m1Low  = rev * mult.m1[0] * venues;
    const m1High = rev * mult.m1[1] * venues;
    const m3Low  = rev * mult.m3[0] * venues;
    const m3High = rev * mult.m3[1] * venues;
    const m6Low  = rev * mult.m6[0] * venues;
    const m6High = rev * mult.m6[1] * venues;

    // Monthly midpoints, summed across 6 months (linear ramp from M1 to M6 at midpoints).
    const m1Mid = (m1Low + m1High) / 2;
    const m3Mid = (m3Low + m3High) / 2;
    const m6Mid = (m6Low + m6High) / 2;
    // Approximate cumulative: linear interp from M1 to M3 to M6.
    // M1, M2 ≈ avg(M1,M3), M3, M4 ≈ avg(M3,M6), M5 ≈ avg(M3,M6)*0.85, M6
    const m2Mid = (m1Mid + m3Mid) / 2;
    const m4Mid = (m3Mid + m6Mid) / 2;
    const m5Mid = (m4Mid + m6Mid) / 2;
    const cumulative = m1Mid + m2Mid + m3Mid + m4Mid + m5Mid + m6Mid;

    $revenueOut.textContent = fmtRevenue(rev);
    $m1.textContent = fmtRange(m1Low, m1High);
    $m3.textContent = fmtRange(m3Low, m3High);
    $m6.textContent = fmtRange(m6Low, m6High);
    $total.textContent = fmtMoney(cumulative);
  }

  if ($revenue && $cuisine && $venues) {
    [$revenue, $cuisine, $venues].forEach(function (el) {
      el.addEventListener('input', calculate);
      el.addEventListener('change', calculate);
    });
    calculate();
  }

  // ---------- Pilot list email capture (frontend-only) ----------
  const $form = document.getElementById('pilot-form');
  const $email = document.getElementById('pilot-email');
  const $msg = document.getElementById('pilot-msg');
  const STORAGE_KEY = 'waiter:pilot-list';

  function isValidEmail(s) {
    if (typeof s !== 'string') return false;
    if (s.length > 254) return false;
    // Simple, defensive — RFC-compliant validation lives on the backend.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  }

  if ($form && $email && $msg) {
    $form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = $email.value.trim();
      if (!isValidEmail(email)) {
        $msg.textContent = 'Looks like that email isn’t quite right. Try again?';
        $msg.style.color = 'var(--ember)';
        $email.focus();
        return;
      }
      try {
        const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        if (!list.includes(email)) list.push(email);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch (_) { /* storage may be disabled — silent */ }
      // No network call — captured client-side only per BRIEF.md.
      console.log('[wAIter] pilot-list capture:', email);
      $email.value = '';
      $msg.textContent = 'Saved. We’ll be in touch within 48 hours.';
      $msg.style.color = 'var(--olive-deep)';
    });
  }

  // ---------- Smooth scroll polyfill kicker (browsers without scroll-behavior) ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
})();
