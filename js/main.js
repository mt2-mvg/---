(function () {
  var root = document.documentElement;

  // theme toggle
  try { var saved = localStorage.getItem("ot-theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
  document.getElementById("themeBtn").addEventListener("click", function () {
    var cur = root.getAttribute("data-theme");
    if (!cur) cur = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    var next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("ot-theme", next); } catch (e) {}
  });

  // generic filter groups
  function filterGroup(btnSel, itemSel, attr) {
    var btns = document.querySelectorAll(btnSel);
    var items = document.querySelectorAll(itemSel);
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.getAttribute("data-" + attr);
        btns.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        items.forEach(function (it) { it.hidden = !(v === "all" || it.getAttribute("data-" + attr) === v); });
      });
    });
  }
  filterGroup(".chip[data-era]", "#tl li", "era");
  filterGroup(".chip[data-cat]", "#people-grid .person", "cat");

  // kilometre stone counter
  var el = document.getElementById("kmNum");
  if (el && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var start = null, dur = 1100, target = 44;
    el.textContent = "0";
    function step(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step); else el.textContent = String(target);
    }
    requestAnimationFrame(step);
    setTimeout(function () { el.textContent = String(target); }, 2500);
  }
})();

// portraits: silhouette by default; a photo at assets/people/<slug>.jpg replaces it automatically
(function () {
  var slugs = { "عبد الصمد قيوح": "abdessamad-kayouh", "عمر هلال": "omar-hilale", "مليكة زارا": "malika-zarra", "رشيد أمخاو": "rachid-amkhao", "القائد بوشعيب الزموري": "caid-bouchaib", "بدر هاري": "badr-hari" };
  var colors = { politics: "#2F5D7C", arts: "#D9730D", history: "#7A4A2E", sport: "#3F5F3C" };
  document.querySelectorAll(".person").forEach(function (p) {
    var name = p.querySelector("h3").textContent.trim();
    var box = document.createElement("div");
    box.className = "portrait";
    box.style.setProperty("--pc", colors[p.getAttribute("data-cat")] || "#4D5F68");
    box.innerHTML = '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="38" r="17"/><path d="M16 94c2-22 17-34 34-34s32 12 34 34z"/></svg>';
    p.insertBefore(box, p.firstChild);
    var slug = slugs[name];
    if (!slug) return;
    var im = new Image();
    im.alt = "صورة " + name;
    im.onload = function () { box.innerHTML = ""; box.appendChild(im); };
    im.src = "assets/people/" + slug + ".jpg";
  });
})();

