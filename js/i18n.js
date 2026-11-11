// Language engine. Arabic is read from the page itself; other languages live in js/lang/<code>.js
// To add a language: copy js/lang/en.js, translate the 42 strings in the same order, add a <script> tag and an <option>.
(function () {
  var S = ['nav a[href="#names"]','nav a[href="#timeline"]','nav a[href="#population"]','nav a[href="#people"]','nav a[href="#economy"]','nav a[href="#land"]','nav a[href="#sources"]',
    '.hero h1','.hero .lead','.actions .primary','.actions .btn:not(.primary)',
    '#names h2','#timeline h2','#population h2','#people h2','#economy h2','#land h2','#sources h2','#card h2',
    '.chip[data-era="all"]','.chip[data-era="pre"]','.chip[data-era="protect"]','.chip[data-era="after"]',
    '.chip[data-cat="all"]','.chip[data-cat="politics"]','.chip[data-cat="arts"]','.chip[data-cat="history"]','.chip[data-cat="sport"]'];
  for (var i = 1; i <= 8; i++) S.push('.card-grid > div:nth-child(' + i + ') dt');
  [1, 2, 6, 7, 8].forEach(function (n) { S.push('.card-grid > div:nth-child(' + n + ') dd'); });
  S.push('footer span:first-child');

  var L = window.LANGS || {};
  L.ar = { dir: "rtl", t: [] };
  var els = S.map(function (s) { return document.querySelector(s); });
  var orig = els.map(function (e) { return e ? e.innerHTML : null; });
  var origTitle = document.title, root = document.documentElement;
  var sel = document.getElementById("langSel");

  function apply(code) {
    var l = L[code] || L.ar;
    root.lang = code; root.dir = l.dir;
    els.forEach(function (e, i) {
      if (!e) return;
      var v = l.t[i];
      e.innerHTML = (v == null) ? orig[i] : v;
    });
    document.title = l.title || origTitle;
    if (sel) sel.value = code;
  }
  if (sel) sel.addEventListener("change", function () {
    apply(sel.value);
    try { localStorage.setItem("ot-lang", sel.value); } catch (e) {}
  });
  var saved = null;
  try { saved = localStorage.getItem("ot-lang"); } catch (e) {}
  if (saved && L[saved]) apply(saved);
})();
