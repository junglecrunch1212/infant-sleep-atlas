/* Infant Sleep Atlas — rendering and interaction. No dependencies. */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var el = function (tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  var pct = function (v) { return (Math.round(v * 1000) / 1000) + "%"; };

  /* ---------------- sources used by script-rendered content ---------------- */
  var SRC = {
    price2012: ["Price 2012", "https://doi.org/10.1542/peds.2011-3467"],
    hall2015: ["Hall 2015", "https://doi.org/10.1186/s12887-015-0492-7"],
    kempler2016: ["Kempler 2016", "https://doi.org/10.1016/j.smrv.2015.08.002"],
    gradisar2016: ["Gradisar 2016", "https://doi.org/10.1542/peds.2015-1486"],
    bilgin2020: ["Bilgin & Wolke 2020", "https://doi.org/10.1111/jcpp.13223"],
    middlemiss2012: ["Middlemiss 2012", "https://doi.org/10.1016/j.earlhumdev.2011.08.010"],
    lecuelle2025: ["Lecuelle 2025", "https://doi.org/10.1016/j.sleh.2025.01.001"],
    blunden2022: ["Blunden 2022", "https://doi.org/10.1007/s00737-022-01224-w"],
    anders1992: ["Anders 1992", "https://doi.org/10.1542/peds.90.4.554"],
    galland2017: ["Galland 2017", "https://doi.org/10.1136/bmjopen-2016-014908"],
    paul2016: ["Paul 2016", "https://doi.org/10.1542/peds.2016-0762"],
    simard2008: ["Simard 2008", "https://doi.org/10.1001/archpedi.162.4.360"],
    matzliach2025: ["Matzliach 2025", "https://doi.org/10.1016/j.sleep.2025.02.017"],
    bruni2014: ["Bruni 2014", "https://pmc.ncbi.nlm.nih.gov/articles/PMC4173090/"],
    sjr2015: ["St James-Roberts 2015", "https://doi.org/10.1097/dbp.0000000000000166"],
    burnham2002: ["Burnham 2002", "https://doi.org/10.1111/1469-7610.00076"],
    kahn2020: ["Kahn 2020", "https://doi.org/10.5664/jcsm.8488"],
    cooney2018: ["Cooney 2018", "https://doi.org/10.1016/j.sleep.2018.03.003"],
    vanij2000: ["van IJzendoorn & Hubbard 2000", "https://doi.org/10.1080/14616730010001596"],
    simard2017: ["Simard 2017", "https://doi.org/10.1080/14616734.2017.1293703"],
    voltaire2018: ["Voltaire & Teti 2018", "https://doi.org/10.1016/j.sleep.2018.07.013"],
    ficca2000: ["Ficca 2000", "https://doi.org/10.1046/j.1365-2869.2000.00172.x"],
    paavonen2020: ["Paavonen 2020", "https://doi.org/10.1016/j.sleep.2020.01.009"],
    scher2015: ["Scher & Cohen 2015", "https://doi.org/10.1111/mono.12145"],
    atun2016: ["Atun-Einy & Scher 2016", "https://doi.org/10.1016/j.infbeh.2015.11.003"],
    schoch2020: ["Schoch 2020", "https://doi.org/10.3390/s20247188"],
    canapariww: ["Canapari, on wake windows", "https://drcraigcanapari.com/wake-windows"],
    franco2004: ["Franco 2004", "https://doi.org/10.1542/peds.114.2.e192"],
    lassonde2016: ["Lassonde 2016", "https://doi.org/10.1016/j.nbscr.2016.08.001"],
    tribble2015: ["Tribble 2015", "https://doi.org/10.1016/j.psyneuen.2015.05.009"],
    berger2012: ["Berger 2012", "https://doi.org/10.1111/j.1365-2869.2011.00962.x"],
    mindell2010: ["Mindell 2010", "https://doi.org/10.1016/j.sleep.2009.04.012"],
    iglowstein2003: ["Iglowstein 2003", "https://doi.org/10.1542/peds.111.2.302"],
    adams2020: ["Adams 2020", "https://pubmed.ncbi.nlm.nih.gov/32861189/"],
    pennestri2018: ["Pennestri 2018", "https://doi.org/10.1542/peds.2017-4330"],
    brown2015: ["Brown & Harries 2015", "https://doi.org/10.1089/bfm.2014.0153"],
    olson2026: ["Olson 2026", "https://pubmed.ncbi.nlm.nih.gov/42280297/"],
    sjr2006: ["St James-Roberts 2006", "https://doi.org/10.1542/peds.2005-2387"],
    grigg2016: ["Grigg-Damberger 2016", "https://pmc.ncbi.nlm.nih.gov/articles/PMC4773630/"],
    vladimirova1979: ["Vladimirova 1979", "https://pubmed.ncbi.nlm.nih.gov/232361/"],
    mindell2016: ["Mindell 2016", "https://doi.org/10.1111/jsr.12414"],
    friedrich2015: ["Friedrich 2015", "https://doi.org/10.1038/ncomms7004"],
    seehagen2015: ["Seehagen 2015", "https://doi.org/10.1073/pnas.1414000112"],
    carpenter2013: ["Carpenter 2013", "https://doi.org/10.1136/bmjopen-2012-002299"],
    blair2014: ["Blair 2014", "https://doi.org/10.1371/journal.pone.0107799"],
    nice: ["NICE NG194", "https://www.nice.org.uk/guidance/ng194/chapter/Recommendations"],
    osawa2020: ["Osawa 2020", "https://pmc.ncbi.nlm.nih.gov/articles/PMC7444554"],
    okami2002: ["Okami 2002", "https://doi.org/10.1097/00004703-200208000-00009"],
    bilgin2024: ["Bilgin 2024", "https://pubmed.ncbi.nlm.nih.gov/39033345/"],
    parks2023: ["Parks 2023", "https://doi.org/10.1542/peds.2022-057771"],
    canapari: ["Canapari, on room-sharing", "https://drcraigcanapari.com/is-room-sharing-infancy-necessary-for-safe-sleep/"],
    paul2017: ["Paul 2017", "https://doi.org/10.1542/peds.2017-0122"],
    volkovich2015: ["Volkovich 2015", "https://doi.org/10.1016/j.sleep.2015.08.016"],
    rudzik2021: ["Rudzik & Ball 2021", "https://pubmed.ncbi.nlm.nih.gov/33729618/"],
    hauck2005: ["Hauck 2005", "https://doi.org/10.1542/peds.2004-2631"],
    jaafar2016: ["Jaafar 2016", "https://pubmed.ncbi.nlm.nih.gov/27572944/"],
    butler2016: ["Butler 2016", "https://pubmed.ncbi.nlm.nih.gov/26548755/"],
    snoofda: ["Fierce Biotech 2023 (SNOO)", "https://www.fiercebiotech.com/medtech/fda-grants-medical-device-clearance-snoo-robotic-baby-bassinet"],
    snoodenovo: ["SNOO De Novo release", "https://www.biospace.com/snoo-is-granted-fda-de-novo-approval-for-keeping-sleeping-babies-safely-positioned-on-the-back"],
    ramanathan2001: ["Ramanathan 2001", "https://doi.org/10.1001/jama.285.17.2199"],
    bonafide2018: ["Bonafide 2018", "https://jamanetwork.com/journals/jama/fullarticle/2697685"],
    npr2024: ["NPR 2024", "https://www.nprillinois.org/2024-08-06/u-s-lawmakers-urge-banning-weighted-infant-sleepwear-over-safety-concerns"],
    rudzik2018: ["Rudzik 2018", "https://doi.org/10.1016/j.sleep.2018.06.010"],
    hysing2014: ["Hysing 2014", "https://doi.org/10.1097/dbp.0000000000000064"],
    perkin2018: ["Perkin 2018", "https://openaccess.sgul.ac.uk/id/eprint/110002/1/jamapediatrics_Perkin_2018_oi_180019.pdf"],
    macknin1989: ["Macknin 1989", "https://pubmed.ncbi.nlm.nih.gov/2672785/"],
    italianer2020: ["Italianer 2020", "https://pmc.ncbi.nlm.nih.gov/articles/PMC7468880"],
    booker2022: ["Booker 2022", "https://pubmed.ncbi.nlm.nih.gov/36137055/"],
    toorop2020: ["Toorop 2020", "https://pubmed.ncbi.nlm.nih.gov/32274700/"],
    kennaway1992: ["Kennaway 1992", "https://doi.org/10.1210/jcem.75.2.1639937"],
    pinilla1993: ["Pinilla & Birch 1993", "https://pubmed.ncbi.nlm.nih.gov/8424024/"],
    sjr2001: ["St James-Roberts 2001", "https://doi.org/10.1046/j.1440-1754.2001.00699.x"],
    spencer1990: ["Spencer 1990", "https://pubmed.ncbi.nlm.nih.gov/2405784/"],
    riedy2021: ["Riedy 2021", "https://pubmed.ncbi.nlm.nih.gov/33007706/"],
    hugh2014: ["Hugh 2014", "https://doi.org/10.1542/peds.2013-3617"],
    harrison2004: ["Harrison 2004", "https://doi.org/10.1111/j.1365-2869.2004.00435.x"],
    hartstein2022: ["Hartstein 2022", "https://pubmed.ncbi.nlm.nih.gov/34997782/"],
    kahn2025t: ["Kahn 2025 (teething)", "https://doi.org/10.1016/j.jpeds.2025.114461"],
    macknin2000: ["Macknin 2000", "https://doi.org/10.1542/peds.105.4.747"],
    mindell2009: ["Mindell 2009", "https://doi.org/10.1093/sleep/32.5.599"],
    mindell2018: ["Mindell 2018", "https://pubmed.ncbi.nlm.nih.gov/29425578/"],
    tsai2022: ["Tsai 2022", "https://pubmed.ncbi.nlm.nih.gov/34245182/"],
    peirano2007: ["Peirano 2007", "https://pubmed.ncbi.nlm.nih.gov/17570059/"],
    svensson2024: ["Svensson 2024", "https://pubmed.ncbi.nlm.nih.gov/38739382/"],
    dewey2002: ["Dewey 2002", "https://pubmed.ncbi.nlm.nih.gov/12421836/"],
    domellof2014: ["Domellöf 2014", "https://pubmed.ncbi.nlm.nih.gov/24135983/"],
    franco2001: ["Franco 2001", "https://pubmed.ncbi.nlm.nih.gov/11322716/"],
    ponsonby1992: ["Ponsonby 1992", "https://doi.org/10.1136/bmj.304.6822.277"],
    carpenter2004: ["Carpenter 2004", "https://doi.org/10.1016/s0140-6736%2803%2915323-8"],
    blair2008: ["Blair 2008", "https://doi.org/10.1136/adc.2007.136366"],
    rechtman2014: ["Rechtman 2014", "https://doi.org/10.1542/peds.2014-1543"],
    blair2009: ["Blair 2009", "https://doi.org/10.1136/bmj.b3666"],
    pease2016: ["Pease 2016", "https://doi.org/10.1542/peds.2015-3275"],
    liaw2019: ["Liaw 2019", "https://doi.org/10.1542/peds.2018-2576"],
    cpscpillows: ["CPSC nursing-pillow rule", "https://www.federalregister.gov/documents/2024/10/25/2024-24403/safety-standard-for-nursing-pillows"],
    anderson2019: ["Anderson 2019", "https://doi.org/10.1542/peds.2018-3325"],
    mindell2006: ["Mindell 2006", "https://doi.org/10.1093/sleep/29.10.1263"],
    aaimh2022: ["AAIMH 2022", "https://www.aaimh.org.au/media/website_pages/resources/position-statements-and-guidelines/sleep-position-statement-AAIMH_final-March-2022.pdf"],
    smithson2018: ["Smithson 2018", "https://doi.org/10.1016/j.sleep.2018.04.005"],
    korownyk2018: ["Korownyk & Lindblad 2018", "https://www.cfp.ca/content/64/1/41"],
    franck2011: ["Franck 2011", "https://pubmed.ncbi.nlm.nih.gov/22123869/"],
    colson2013: ["Colson 2013", "https://pubmed.ncbi.nlm.nih.gov/24080961/"],
    colen2014: ["Colen & Ramey 2014", "https://doi.org/10.1016/j.socscimed.2014.01.027"],
    erck2019: ["Erck Lambert 2019", "https://doi.org/10.1542/peds.2018-3408"],
    erck2024: ["Erck Lambert 2024", "https://doi.org/10.1542/peds.2023-061984"],
    cdc: ["CDC", "https://www.cdc.gov/sudden-infant-death/data-research/data/sids-deaths-by-cause.html"],
    astm2194: ["ASTM F2194-13", "https://law.resource.org/pub/us/cfr/ibr/003/astm.f2194.2013.html"],
    astm2906: ["ASTM F2906", "https://store.astm.org/f2906-23.html"],
    chicco: ["Chicco", "https://www.chiccousa.com/baby-talk/what-to-look-for-in-a-bassinet/"],
    ecfr: ["16 CFR subchapter B", "https://www.ecfr.gov/current/title-16/chapter-II/subchapter-B"],
    tham2015: ["Tham 2015", "https://pubmed.ncbi.nlm.nih.gov/26206663/"],
    goodlin2001: ["Goodlin-Jones 2001", "https://doi.org/10.1097/00004703-200108000-00003"],
    sjr2016: ["St James-Roberts 2016", "https://pubmed.ncbi.nlm.nih.gov/27609027/"],
    blair1999: ["Blair 1999", "https://doi.org/10.1136/bmj.319.7223.1457"],
    blair2006: ["Blair 2006", "https://doi.org/10.1093/ije/dyl212"]
  };
  function cite(text) {
    return text.replace(/\[\[(\w+)\]\]/g, function (_, k) {
      var s = SRC[k];
      if (!s) { console.warn("missing source", k); return k; }
      return '<a class="c" href="' + s[1] + '">' + s[0].replace(/&/g, "&amp;") + "</a>";
    });
  }

  /* ---------------- theme ---------------- */
  var SUN = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="3.2" fill="currentColor"/><g stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M8 1v1.6M8 13.4V15M1 8h1.6M13.4 8H15M3 3l1.1 1.1M11.9 11.9 13 13M3 13l1.1-1.1M11.9 4.1 13 3"/></g></svg>';
  var MOON = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13.6 10.3A6 6 0 0 1 5.7 2.4a6 6 0 1 0 7.9 7.9Z" fill="currentColor"/></svg>';
  function isDark() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function paintThemeButtons() {
    var dark = isDark();
    $$("[data-theme-toggle]").forEach(function (b) {
      b.innerHTML = (dark ? SUN : MOON) + "<span>" + (dark ? "Day mode" : "Night mode") + "</span>";
      b.setAttribute("aria-label", dark ? "Switch to day mode" : "Switch to night mode");
    });
  }
  $$("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("isa-theme", next); } catch (e) {}
      paintThemeButtons();
      drawDial();
    });
  });
  paintThemeButtons();
  if (window.matchMedia) { var mq = window.matchMedia("(prefers-color-scheme: dark)"); var onMq = function () { paintThemeButtons(); drawDial(); }; if (mq.addEventListener) mq.addEventListener("change", onMq); }

  /* ---------------- navigation ---------------- */
  var plates = $$("section[data-plate]");
  $$("[data-nav]").forEach(function (nav) {
    plates.forEach(function (p) {
      var a = el("a");
      a.href = "#" + p.id;
      a.innerHTML = "<span>" + (p.dataset.plate === "—" ? "" : p.dataset.plate) + "</span><span>" + p.dataset.short + "</span>";
      if (nav.tagName === "OL") { var li = el("li"); li.appendChild(a); nav.appendChild(li); }
      else nav.appendChild(a);
      a.addEventListener("click", function () { var d = $("#mnav"); if (d) d.open = false; });
    });
  });
  if ("IntersectionObserver" in window) {
    var railLinks = $$(".rail a[href^='#plate'], .rail a[href='#sources']");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          railLinks.forEach(function (a) { a.setAttribute("aria-current", a.getAttribute("href") === "#" + e.target.id ? "true" : "false"); });
        }
      });
    }, { rootMargin: "-35% 0px -60% 0px" });
    plates.forEach(function (p) { io.observe(p); });
  }

  /* ---------------- tooltip ---------------- */
  var tip = $("[data-tip]");
  function showTip(html, x, y) {
    tip.innerHTML = html;
    tip.classList.add("on");
    var r = tip.getBoundingClientRect();
    var left = Math.min(window.innerWidth - r.width - 12, Math.max(12, x + 14));
    var top = y - r.height - 12;
    if (top < 8) top = y + 18;
    tip.style.left = left + "px";
    tip.style.top = top + "px";
  }
  function hideTip() { tip.classList.remove("on"); }
  function bindTip(node, htmlFn) {
    node.addEventListener("pointermove", function (e) { showTip(htmlFn(), e.clientX, e.clientY); });
    node.addEventListener("pointerleave", hideTip);
    node.addEventListener("focus", function () { var r = node.getBoundingClientRect(); showTip(htmlFn(), r.left + r.width / 2, r.top); });
    node.addEventListener("blur", hideTip);
  }
  window.addEventListener("scroll", hideTip, { passive: true });

  /* ---------------- actogram ---------------- */
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var R = rng(20261009);
  var J = function (a) { return (R() * 2 - 1) * a; };
  var X = function (h) { return ((h - 18) % 24 + 24) % 24; };   // hour of day -> clock-x (0 = 6 pm)

  function dayFrom(bed, wake, wakes, naps) {
    // returns intervals in clock-x space, plus feeds
    var segs = [];
    var a = X(bed), b = X(wake);
    var cuts = wakes.map(function (w) { return [X(w[0]), X(w[0]) + w[1]]; }).sort(function (p, q) { return p[0] - q[0]; });
    var s = a;
    cuts.forEach(function (c) { if (c[0] > s && c[0] < b) { segs.push([s, c[0]]); s = c[1]; } });
    if (b > s) segs.push([s, b]);
    naps.forEach(function (n) { var x0 = X(n[0]); segs.push([x0, Math.min(24, x0 + n[1])]); });
    return { segs: segs, feeds: cuts.map(function (c) { return (c[0] + c[1]) / 2; }) };
  }

  function weekData(w) {
    var d, wakes, naps;
    if (w <= 5) {
      var segs = [], x = R() * 0.8, sleep = true;
      while (x < 24) {
        var len = sleep ? 1.6 + R() * 1.8 : 0.5 + R() * 0.8;
        if (sleep) segs.push([x, Math.min(24, x + len)]);
        x += len; sleep = !sleep;
      }
      return { segs: segs, feeds: [], nightWakes: null, naps: null };
    }
    if (w <= 11) {
      wakes = [[0.5 + J(0.4), 0.6], [3.5 + J(0.4), 0.5]];
      naps = [[8 + J(.2), 0.8 + R() * 0.6], [10.6 + J(.2), 0.8 + R() * 0.6], [13.2 + J(.2), 0.8 + R() * 0.6], [15.8 + J(.2), 0.7 + R() * 0.5], [18.4 + J(.15), 0.45]];
      d = dayFrom(21.5 + J(0.3), 6.5 + J(0.3), wakes, naps);
    } else if (w <= 17) {
      wakes = [[2.5 + J(0.5), 0.4]];
      if (w <= 14) wakes.push([5 + J(0.3), 0.35]);
      naps = [[8.9 + J(.15), 0.8 + R() * 0.35], [11.6 + J(.15), 0.75 + R() * 0.45], [14.3 + J(.15), 0.75 + R() * 0.35], [17 + J(.1), 0.5 + R() * 0.25]];
      d = dayFrom(20.75 + J(0.2), 7 + J(0.2), wakes, naps);
    } else if (w === 18) {
      wakes = [[2.25, 0.4]];
      naps = [[9, 0.75], [11.75, 0.75], [14.5, 0.75], [17.25, 0.6]];
      d = dayFrom(20.5, 7.5, wakes, naps);
    } else if (w <= 26) {
      wakes = [[2.5 + J(0.6), 0.35]];
      naps = [[9.25 + J(.15), 0.8 + R() * 0.2], [12.5 + J(.15), 0.9 + R() * 0.4], [15.75 + J(.15), 0.6 + R() * 0.2]];
      if (w <= 22) naps.push([17.75, 0.5]);
      d = dayFrom(20.5 + J(0.15), 7.5 + J(0.15), wakes, naps);
    } else if (w <= 32) {
      wakes = w % 3 === 0 ? [] : [[2.75 + J(0.6), 0.3]];
      naps = [[9.5 + J(.15), 0.9 + R() * 0.2], [13 + J(.15), 1.1 + R() * 0.3], [16.5 + J(.1), 0.55 + R() * 0.1]];
      d = dayFrom(20.5 + J(0.1), 7.5 + J(0.1), wakes, naps);
    } else if (w <= 40) {
      var bump = [33, 34, 35, 37, 38, 40].indexOf(w) >= 0;
      wakes = bump ? [[1.5 + J(0.4), 0.5], [4 + J(0.4), 0.4]] : [[2.75 + J(0.6), 0.3]];
      naps = w <= 35 ? [[9.5 + J(.1), 1], [13.25 + J(.1), 1.2], [16.75, 0.5]] : [[9.75 + J(.1), 1.2 + R() * 0.15], [14 + J(.1), 1.4 + R() * 0.2]];
      d = dayFrom(20.5 + J(0.1), 7.25 + J(0.1), wakes, naps);
    } else {
      wakes = w % 2 === 0 ? [[3 + J(1), 0.3]] : [];
      naps = [[10 + J(.15), 1.1 + R() * 0.2], [14.5 + J(.15), 1.25 + R() * 0.25]];
      d = dayFrom(20.25 + J(0.1), 7.25 + J(0.1), wakes, naps);
    }
    d.nightWakes = wakes.length; d.naps = naps.length;
    return d;
  }
  var CLOCK = function (x) {
    var h = (x + 18) % 24, hh = Math.floor(h), mm = Math.round((h - hh) * 60 / 15) * 15;
    if (mm === 60) { hh = (hh + 1) % 24; mm = 0; }
    var ap = hh >= 12 ? "pm" : "am", h12 = hh % 12 === 0 ? 12 : hh % 12;
    return h12 + ":" + (mm < 10 ? "0" : "") + mm + " " + ap;
  };

  function buildActogram() {
    var host = $("[data-acto]");
    if (!host) return;
    var weeks = [];
    for (var w = 1; w <= 52; w++) weeks.push(weekData(w));
    var HER = 18;

    var hours = el("div", "acto-hours");
    [[0, "6 pm", "edge-l"], [3, "9 pm", "minor"], [6, "midnight"], [9, "3 am", "minor"], [12, "6 am"], [15, "9 am", "minor"], [18, "noon"], [21, "3 pm", "minor"], [24, "6 pm", "edge-r"]].forEach(function (t) {
      var s = el("span", t[2] || "", t[1]); s.style.left = (t[0] / 24 * 100) + "%"; hours.appendChild(s);
    });
    var months = el("div", "acto-months");
    var track = el("div", "acto-track");
    track.tabIndex = 0;
    track.setAttribute("role", "img");
    track.setAttribute("aria-label", "Actogram of 52 weeks. Sleep consolidates from scattered newborn bouts into a night block from about 8:30 pm to 7:30 am plus naps that fall from five to two. Use arrow keys to read individual weeks.");
    [0, 6, 12, 18, 24].forEach(function (h) { var g = el("div", "acto-gl"); g.style.left = (h / 24 * 100) + "%"; track.appendChild(g); });
    var rows = [];
    weeks.forEach(function (d, i) {
      var w = i + 1;
      var row = el("div", "acto-row " + (w < HER ? "past" : w === HER ? "her" : "future"));
      row.style.setProperty("--r", i);
      d.segs.forEach(function (s) {
        var b = el("i"); b.style.left = (s[0] / 24 * 100) + "%"; b.style.width = Math.max(0.25, (s[1] - s[0]) / 24 * 100) + "%"; row.appendChild(b);
      });
      if (w === HER) d.feeds.forEach(function (f) { var dot = el("span", "feed"); dot.style.left = (f / 24 * 100) + "%"; row.appendChild(dot); });
      track.appendChild(row); rows.push(row);
    });
    var note = el("div", "acto-note");
    var p = el("p", null, "<b>Her reported day, week 18.</b> Asleep 8:30 pm to 7:30 am with one feed, then 45-minute contact naps.");
    note.appendChild(p);

    host.appendChild(hours); host.appendChild(months); host.appendChild(track); host.appendChild(note);

    function placeLabels() {
      months.innerHTML = "";
      [[1, "birth"], [9, "2 mo"], [18, "4 mo"], [26, "6 mo"], [35, "8 mo"], [44, "10 mo"], [52, "12 mo"]].forEach(function (m) {
        var r = rows[m[0] - 1];
        var s = el("span", null, m[1]); s.style.top = (r.offsetTop + r.offsetHeight / 2) + "px"; months.appendChild(s);
      });
      months.style.height = track.offsetHeight + "px";
      var her = rows[HER - 1];
      p.style.top = (her.offsetTop + her.offsetHeight / 2) + "px";
      if (window.innerWidth < 900) p.style.top = "";
    }
    placeLabels();
    window.addEventListener("resize", placeLabels);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeLabels);

    function sum(d) { return d.segs.reduce(function (a, s) { return a + (s[1] - s[0]); }, 0); }
    function describe(i) {
      var d = weeks[i], w = i + 1, mo = (w / 4.345).toFixed(1);
      var total = sum(d).toFixed(1);
      var kind = w === HER ? "Her reported night; nap times schematic" : w < HER ? "Drawn from age norms" : "Projected from age norms";
      var body;
      if (d.naps == null) body = "Newborn pattern: sleep scattered across the clock in 2–3 hour bouts";
      else {
        var night = d.segs.filter(function (s) { return s[0] < 14 && s[1] > 3; });
        var start = night.length ? Math.min.apply(null, night.map(function (s) { return s[0]; })) : 0;
        var end = night.length ? Math.max.apply(null, night.map(function (s) { return s[1]; })) : 0;
        body = "Night " + CLOCK(start) + " to " + CLOCK(end) + ", " + d.nightWakes + (d.nightWakes === 1 ? " waking" : " wakings") + "; " + d.naps + " naps";
      }
      return "<b>Week " + w + ", about " + mo + " months</b>" + body + "; about " + total + " h asleep in 24 h<i>" + kind + "</i>";
    }
    var cur = -1;
    function setRow(i, x, y) {
      if (cur >= 0) rows[cur].classList.remove("hover");
      cur = i; rows[i].classList.add("hover");
      showTip(describe(i), x, y);
    }
    track.addEventListener("pointermove", function (e) {
      var r = track.getBoundingClientRect();
      var y = e.clientY - r.top;
      var i = 0, best = 1e9;
      rows.forEach(function (row, k) { var c = row.offsetTop + row.offsetHeight / 2; var dd = Math.abs(c - y); if (dd < best) { best = dd; i = k; } });
      setRow(i, e.clientX, e.clientY);
    });
    track.addEventListener("pointerleave", function () { if (cur >= 0) rows[cur].classList.remove("hover"); cur = -1; hideTip(); });
    track.addEventListener("focus", function () { var r = rows[HER - 1].getBoundingClientRect(); setRow(HER - 1, r.left + r.width / 2, r.top); });
    track.addEventListener("blur", function () { if (cur >= 0) rows[cur].classList.remove("hover"); cur = -1; hideTip(); });
    track.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      var i = Math.max(0, Math.min(51, (cur < 0 ? HER - 1 : cur) + (e.key === "ArrowDown" ? 1 : -1)));
      var r = rows[i].getBoundingClientRect(); setRow(i, r.left + r.width / 2, r.top);
    });
    $("#acto").classList.add("animate");
  }

  /* ---------------- variance explained ---------------- */
  function buildVariance() {
    var host = $("[data-variance]"); if (!host) return;
    var MAX = 30;
    var data = [
      { l: "Sleep duration and cognitive performance", s: "School-age, r = .08, 86 studies, 35,936 children", v: 0.64, g: "sleep", src: "Astill 2012" },
      { l: "Sleep duration and behaviour problems", s: "School-age, r = .09", v: 0.81, g: "sleep", src: "Astill 2012" },
      { l: "Objectively measured sleep and cognition", s: "r = .06", v: 0.36, g: "sleep", src: "Short 2018" },
      { l: "Sensitive parenting and attachment security", s: "r = .24", v: 5.76, g: "wake", src: "De Wolff & van IJzendoorn 1997" },
      { l: "Sensitive parenting and child language", s: "r = .27, 36 samples", v: 7.29, g: "wake", src: "Madigan 2019" },
      { l: "Conversational turns at 18–24 months and IQ, verbal scores 10 years later", s: "n = 146, after socioeconomic status", lo: 14, hi: 27, g: "wake", src: "Gilkerson 2018" }
    ];
    var plot = el("div", "hb-plot");
    var wrap = el("div", "hb");
    data.forEach(function (d) {
      var row = el("div", "hb-row");
      row.appendChild(el("div", "hb-label", d.l + "<small>" + d.s + "</small>"));
      var tr = el("div", "hb-track"); tr.tabIndex = 0;
      var color = d.g === "sleep" ? "var(--sleep)" : "var(--day)";
      var bar = el("div", "hb-bar" + (d.lo != null ? " range" : ""));
      bar.style.background = color;
      var lab = el("div", "hb-val");
      if (d.lo != null) {
        bar.style.left = (d.lo / MAX * 100) + "%"; bar.style.width = ((d.hi - d.lo) / MAX * 100) + "%";
        lab.textContent = d.lo + "–" + d.hi + "%";
        lab.style.right = "calc(" + (100 - d.lo / MAX * 100) + "% + 8px)";
      } else {
        bar.style.left = "0"; bar.style.width = Math.max(0.6, d.v / MAX * 100) + "%";
        lab.textContent = (d.v < 1 ? d.v.toFixed(1) : d.v.toFixed(1)) + "%";
        lab.style.left = "calc(" + Math.max(0.6, d.v / MAX * 100) + "% + 8px)";
      }
      tr.appendChild(bar); tr.appendChild(lab);
      bindTip(tr, function () { return "<b>" + lab.textContent + " of variance</b>" + d.l + "<i>" + d.s + ". " + d.src + "</i>"; });
      row.appendChild(tr);
      wrap.appendChild(row);
    });
    plot.appendChild(wrap);
    host.appendChild(plot);
    // grid + axis aligned to the track column
    var axisRow = el("div", "hb-row");
    axisRow.appendChild(el("div"));
    var axis = el("div", "hb-axis");
    [0, 10, 20, 30].forEach(function (t) { var s = el("span", null, t + "%"); s.style.left = (t / MAX * 100) + "%"; axis.appendChild(s); });
    axisRow.appendChild(axis);
    host.appendChild(axisRow);
    // gridlines inside each track
    $$(".hb-track", host).forEach(function (tr) {
      [10, 20, 30].forEach(function (t) { var g = el("div", "hb-grid"); g.style.left = (t / MAX * 100) + "%"; tr.insertBefore(g, tr.firstChild); });
    });
    var tbl = "<table><thead><tr><th>Predictor</th><th class='num'>Variance explained</th><th>Detail</th><th>Source</th></tr></thead><tbody>" +
      data.map(function (d) { return "<tr><td>" + d.l + "</td><td class='num'>" + (d.lo != null ? d.lo + "–" + d.hi + "%" : d.v.toFixed(2) + "%") + "</td><td>" + d.s + "</td><td>" + d.src.replace(/&/g, "&amp;") + "</td></tr>"; }).join("") + "</tbody></table>";
    $("[data-variance-table]").innerHTML = tbl;
  }

  /* ---------------- SUID by age ---------------- */
  function buildAgeCols() {
    var host = $("[data-agecols]"); if (!host) return;
    var labs = $("[data-agelabels]");
    var data = [
      { k: "0–3 months", v: 66.5, s: "behind her", past: true },
      { k: "4–6 months", v: 24.3, s: "she is here" },
      { k: "7–12 months", v: 9.2, s: "ahead" }
    ];
    var H = 190;
    data.forEach(function (d) {
      var c = el("div", "col"); c.tabIndex = 0;
      c.appendChild(el("div", "v", d.v + "%"));
      var b = el("div", "bar"); b.style.height = (d.v / 66.5 * H) + "px"; b.style.background = d.past ? "var(--past)" : "var(--sleep)";
      c.appendChild(b);
      bindTip(c, function () { return "<b>" + d.v + "% of deaths</b>" + d.k + ": about " + Math.round(7595 * d.v / 100).toLocaleString() + " of 7,595 registry deaths<i>Erck Lambert 2024, CDC SUID registry 2011–2020</i>"; });
      host.appendChild(c);
      labs.appendChild(el("span", null, d.k + "<small>" + d.s + "</small>"));
    });
  }

  /* ---------------- risk ladder ---------------- */
  function buildLadder() {
    var host = $("[data-ladder]"); if (!host) return;
    var LO = 1, HI = 100;
    var pos = function (v) { return (Math.log10(v) - Math.log10(LO)) / (Math.log10(HI) - Math.log10(LO)) * 100; };
    var data = [
      { l: "Low-risk profile", s: "Term, breast milk, on her back, bare crib in your room, smoke-free", lo: 3, hi: 5, k: "safe", val: "3–5", one: "1 in 20,000 to 1 in 33,000; about 1–2 per 10 million infant-nights" },
      { l: "Same, plus hazard-free bed-sharing every night", s: "Central estimate adds about nothing; pessimistic bound adds 6–10. At her ~10% of nights, about a tenth of that", lo: 3, hi: 15, mid: 4, k: "safe", val: "3–15", one: "SIDS-based, so it under-counts wedging, suffocation and falls" },
      { l: "US population average, all practices", s: "2024 rate times registry age split; about 9 of these fall after 7 months", lo: 31, hi: 31, k: "ref", val: "31", one: "About 1 in 3,200" },
      { l: "Sleeping with an adult on a sofa or recliner, habitually", s: "OR 18.3 at all ages; other studies 24–67", lo: 15, hi: 90, k: "hazard", val: "15–90", one: "Modelled from the low-risk baseline" },
      { l: "Bed-sharing after more than 2 units of alcohol, habitually", s: "OR 18.3 at all ages; about 6 in older infants", lo: 15, hi: 90, k: "hazard", val: "same order", one: "Modelled; same order as the sofa row" }
    ];
    var HZ = '<svg class="hz" viewBox="0 0 16 16" aria-label="Hazard" role="img"><path d="M8 1.5 15 14H1z" style="fill:var(--hazard)"/><path d="M8 6v4" style="stroke:var(--surface)" stroke-width="1.6" stroke-linecap="round"/><circle cx="8" cy="12" r=".9" style="fill:var(--surface)"/></svg>';
    var wrap = el("div", "ladder");
    data.forEach(function (d) {
      var row = el("div", "lad-row");
      row.appendChild(el("div", "lad-label", (d.k === "hazard" ? HZ : "") + "<span>" + d.l + "<small>" + d.s + "</small></span>"));
      var tr = el("div", "lad-track"); tr.tabIndex = 0;
      [3, 10, 30].forEach(function (t) { var g = el("div", "hb-grid"); g.style.left = pos(t) + "%"; tr.appendChild(g); });
      var color = d.k === "hazard" ? "var(--hazard)" : d.k === "ref" ? "var(--muted)" : "var(--sleep)";
      if (d.lo === d.hi) {
        var dot = el("div", "lad-dot"); dot.style.left = pos(d.lo) + "%"; dot.style.background = color; tr.appendChild(dot);
      } else {
        var b = el("div", "lad-bar"); b.style.left = pos(d.lo) + "%"; b.style.width = (pos(d.hi) - pos(d.lo)) + "%"; b.style.background = color; tr.appendChild(b);
        if (d.mid) { var m = el("div", "lad-dot"); m.style.left = pos(d.mid) + "%"; m.style.background = color; tr.appendChild(m); }
      }
      var lab = el("div", "lad-val", d.val);
      if (pos(d.hi) > 70) lab.style.right = "calc(" + (100 - pos(d.lo)) + "% + 10px)";
      else lab.style.left = "calc(" + pos(d.hi) + "% + 12px)";
      tr.appendChild(lab);
      bindTip(tr, function () { return "<b>" + d.val + " per 100,000</b>" + d.l + "<i>" + d.one + "</i>"; });
      row.appendChild(tr);
      wrap.appendChild(row);
    });
    host.appendChild(wrap);
    var axisRow = el("div", "lad-row");
    axisRow.appendChild(el("div"));
    var axis = el("div", "lad-axis");
    [1, 3, 10, 30, 100].forEach(function (t) { var s = el("span", null, String(t)); s.style.left = pos(t) + "%"; axis.appendChild(s); });
    axisRow.appendChild(axis);
    host.appendChild(axisRow);
    $("[data-ladder-table]").innerHTML = "<table><thead><tr><th>Scenario, months 4–12</th><th class='num'>Per 100,000</th><th>Note</th></tr></thead><tbody>" +
      data.map(function (d) { return "<tr><td>" + d.l + "</td><td class='num'>" + (d.val === "same order" ? "≈15–90" : d.val) + "</td><td>" + d.s + ". " + d.one + "</td></tr>"; }).join("") + "</tbody></table>";
  }

  /* ---------------- bassinet lanes ---------------- */
  function buildLanes() {
    var host = $("[data-lanes]"); if (!host) return;
    var M = 12, NOW = 4.3;
    var p = function (m) { return m / M * 100; };
    var lanes = [
      { l: "Bassinet", s: "ASTM F2194 / 16 CFR 1218", to: 5, c: "var(--sleep)", end: "~5 mo or hands-and-knees", tip: "Scope: “up to approximately 5 months in age or when the child begins to push up on hands and knees, whichever comes first.” Some makers (Chicco, an Evenflo insert) say stop at rolling." },
      { l: "Bedside sleeper", s: "ASTM F2906", to: 5, c: "var(--sleep)", end: "same limit", tip: "Bedside sleepers carry the same 5-month, hands-and-knees limit." },
      { l: "SNOO", s: "FDA De Novo indication", to: 4, c: "var(--sleep)", end: "until rolling consistently", tip: "Indicated for infants “not yet able to roll over consistently”. FDA: not intended to reduce SIDS risk." },
      { l: "Crib, mini crib or play yard", s: "16 CFR 1219, 1220, 1221", to: 12, c: "var(--good)", end: "", fade: true, tip: "Rated until the child reaches 35 inches or can climb out, which covers the whole first year." }
    ];
    var plot = el("div", "lane-plot");
    lanes.forEach(function (d) {
      var row = el("div", "lane");
      row.appendChild(el("div", "lane-label", d.l + "<small>" + d.s + "</small>"));
      var tr = el("div", "lane-track"); tr.tabIndex = 0;
      var b = el("div", "lane-bar" + (d.fade ? " fade-r" : "")); b.style.left = "0"; b.style.width = p(d.to) + "%"; b.style.background = d.c;
      tr.appendChild(b);
      if (d.end) { var e = el("div", "lane-end", d.end); e.style.left = "calc(" + p(Math.max(d.to, NOW)) + "% + 8px)"; e.style.top = "4px"; tr.appendChild(e); }
      else { var e2 = el("div", "lane-end", "through month 12 and beyond"); e2.style.right = "0"; e2.style.top = "-10px"; tr.appendChild(e2); }
      bindTip(tr, function () { return "<b>" + d.l + "</b>" + d.tip; });
      row.appendChild(tr);
      plot.appendChild(row);
    });
    host.appendChild(plot);
    var axisRow = el("div", "lane"); axisRow.appendChild(el("div"));
    var axWrap = el("div"); axWrap.style.position = "relative";
    var axis = el("div", "lane-axis");
    [0, 2, 4, 6, 8, 10, 12].forEach(function (t) { var s = el("span", null, t === 0 ? "birth" : t + " mo"); s.style.left = p(t) + "%"; if (t === 0) s.style.transform = "none"; if (t === 12) s.style.transform = "translateX(-100%)"; axis.appendChild(s); });
    axWrap.appendChild(axis);
    axisRow.appendChild(axWrap);
    host.appendChild(axisRow);
    // now line across every track
    $$(".lane-track", host).forEach(function (tr, i) {
      var n = el("div", "now-line"); n.style.left = p(NOW) + "%"; n.style.top = "0"; n.style.bottom = "0";
      tr.appendChild(n);
    });
  }

  /* ---------------- pumped-milk dial ---------------- */
  function drawDial() {
    var svg = $("[data-dial]"); if (!svg) return;
    var cs = getComputedStyle(document.documentElement);
    var sleep = cs.getPropertyValue("--sleep").trim(), day = cs.getPropertyValue("--day").trim();
    var cx = 130, cy = 120, r = 72, sw = 24;
    var ang = function (h) { return (h / 24) * 2 * Math.PI - Math.PI / 2; };
    var pt = function (h, rad) { return [cx + rad * Math.cos(ang(h)), cy + rad * Math.sin(ang(h))]; };
    var arc = function (h0, h1) {
      var g = 0.12; var a = pt(h0 + g, r), b = pt(h1 - g, r);
      var large = (h1 - h0) > 12 ? 1 : 0;
      return "M" + a[0].toFixed(2) + " " + a[1].toFixed(2) + " A" + r + " " + r + " 0 " + large + " 1 " + b[0].toFixed(2) + " " + b[1].toFixed(2);
    };
    var bins = [[5, 11, day, 1, "05:00–11:00 morning"], [11, 17, day, 0.45, "11:00–17:00 day"], [17, 22, sleep, 0.55, "17:00–22:00 evening"], [22, 29, sleep, 1, "22:00–05:00 night"]];
    var html = "";
    bins.forEach(function (b) { html += '<path d="' + arc(b[0], b[1]) + '" fill="none" stroke="' + b[2] + '" stroke-opacity="' + b[3] + '" stroke-width="' + sw + '"><title>' + b[4] + "</title></path>"; });
    [[0, "midnight"], [6, "6 am"], [12, "noon"], [18, "6 pm"]].forEach(function (t) {
      var q = pt(t[0], r + sw / 2 + 12);
      var anchor = t[0] === 6 ? "start" : t[0] === 18 ? "end" : "middle";
      var dy = t[0] === 0 ? -2 : t[0] === 12 ? 10 : 4;
      html += '<text x="' + q[0].toFixed(1) + '" y="' + (q[1] + dy).toFixed(1) + '" text-anchor="' + anchor + '">' + t[1] + "</text>";
    });
    // bedtime and wake ticks
    [[20.5, "bed"], [7.5, "wake"]].forEach(function (t) {
      var a = pt(t[0], r - sw / 2 - 2), b = pt(t[0], r + sw / 2 + 2);
      html += '<line x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) + '" x2="' + b[0].toFixed(1) + '" y2="' + b[1].toFixed(1) + '" style="stroke:var(--ink)" stroke-width="2"/>';
      var q = pt(t[0], r - sw / 2 - 12);
      html += '<text x="' + q[0].toFixed(1) + '" y="' + (q[1] + 4).toFixed(1) + '" text-anchor="middle">' + t[1] + "</text>";
    });
    html += '<text class="ctr" x="130" y="116" text-anchor="middle">Pump time</text><text x="130" y="132" text-anchor="middle">sets the bin</text>';
    svg.innerHTML = html;
  }

  /* ---------------- timeline (months 4–12) ---------------- */
  function buildTimeline() {
    var host = $("[data-timeline]"); if (!host) return;
    var A = 4, B = 12, NOW = 4.3;
    var p = function (m) { return (m - A) / (B - A) * 100; };
    var lanes = [
      { n: "Sleep surface", rows: [
        [{ t: "hzd", a: 4, b: 5, x: "Bassinet rating ends", tip: "~5 months, pushing up on hands and knees, or (some makers) rolling. ASTM F2194; Chicco; Evenflo." }],
        [{ t: "band", a: 4.3, b: 12, x: "Crib, mini crib or play yard, rated to 35 in or climbing out", tip: "16 CFR 1219–1221." }]
      ] },
      { n: "Room", rows: [
        [{ t: "band", a: 4, b: 6, x: "Room-share", tip: "Case-control evidence is consistent but old and pooled across the first year; sound to about 6 months." }, { t: "band", a: 6, b: 12, x: "Preference after 6 months", tip: "No age-specific evidence either way after 6 months; under 10% of sudden deaths occur at 7–12 months." }]
      ] },
      { n: "Naps", rows: [
        [{ t: "band", a: 4, b: 6, x: "3–4 naps", tip: "Individually short; nap length bottoms out near 5 months, then lengthens on its own (Mindell 2016, J&J-funded app data)." }, { t: "band", a: 6, b: 9, x: "3 become 2", tip: "72% take two naps at 8 months (Paavonen 2020)." }, { t: "band", a: 9, b: 12, x: "2 naps, ~2.5–3 h", tip: "Two naps established; the two-to-one transition belongs to months 15–24." }]
      ] },
      { n: "Motor", rows: [
        [{ t: "amber", a: 4.5, b: 6.5, x: "Push-up, sit", tip: "Pushing up on hands and knees is also the bassinet stop point." }, { t: "mark", a: 7, x: "Crawls (~7 mo)", tip: "Mean crawling onset about 7 months; time-linked to more long wake episodes on actigraphy (n = 28, Scher & Cohen 2015)." }],
        [{ t: "amber", a: 9, b: 11.5, x: "Pulling to stand", tip: "Disrupts sleep in early achievers (n = 20, Atun-Einy & Scher 2016). One laboratory, small samples." }]
      ] },
      { n: "Night waking", rows: [
        [{ t: "amber", a: 7, b: 10, x: "Waking bump (peak 8 mo)", tip: "Parent-rated sleep problems peak at 39.7% at 8 months in Finland (Paavonen 2020). Real for some infants, transient." }],
        [{ t: "band", a: 4, b: 12, x: "One night feed remains normal: ~60% still feed at 6–12 months", tip: "UK survey of roughly 750 mothers, self-selected (Brown & Harries 2015). Night weaning not associated with longer night sleep (Olson 2026)." }]
      ] },
      { n: "Safety", rows: [
        [{ t: "hzd", a: 5, b: 8, x: "Wedging deaths peak", tip: "Median 6 months; 58% at 5–8 months; 73% in adult beds (Erck Lambert 2019)." }],
        [{ t: "mark", a: 7, x: "Overlay deaths essentially absent after 7 months", tip: "Overlay median age 2 months; none after 7 months in 250 explained suffocations (Erck Lambert 2019)." }]
      ] },
      { n: "Feeding", rows: [
        [{ t: "mark", a: 4.3, x: "Test iron", tip: "Measure ferritin and haemoglobin; supplement only if low (Dewey 2002; Svensson 2024)." }, { t: "mark", a: 6, x: "Solids, iron-rich first", tip: "About 6 months on readiness, iron and allergy grounds. Early solids added 16.6 minutes of night sleep at 6 months at best (Perkin 2018)." }]
      ] }
    ];
    var head = el("div", "tl-head");
    head.appendChild(el("div"));
    var mh = el("div", "tl-months");
    for (var m = A; m <= B; m++) { var s = el("span", null, m + " mo"); s.style.left = p(m) + "%"; if (m === A) s.style.transform = "none"; if (m === B) s.style.transform = "translateX(-100%)"; mh.appendChild(s); }
    head.appendChild(mh);
    host.appendChild(head);
    lanes.forEach(function (lane) {
      var L = el("div", "tl-lane");
      L.appendChild(el("div", "tl-name", lane.n));
      var body = el("div", "tl-body");
      body.style.height = (lane.rows.length * 30 - 4) + "px";
      lane.rows.forEach(function (row, ri) {
        row.forEach(function (it) {
          var n = el("div", "tl-item " + it.t, it.x);
          n.tabIndex = 0;
          n.style.top = (ri * 30) + "px";
          n.style.left = p(it.a) + "%";
          if (it.b != null) n.style.width = (p(it.b) - p(it.a)) + "%";
          bindTip(n, function () { return "<b>" + it.x + "</b>" + it.tip; });
          body.appendChild(n);
        });
      });
      L.appendChild(body);
      host.appendChild(L);
    });
    // gridlines and now line, positioned over the body column
    var overlay = el("div"); overlay.style.cssText = "position:absolute;top:0;bottom:0;left:142px;right:0;pointer-events:none;z-index:0";
    for (var g = A + 1; g < B; g++) { var gl = el("div", "tl-gl"); gl.style.left = p(g) + "%"; overlay.appendChild(gl); }
    var now = el("div", "tl-now"); now.style.left = p(NOW) + "%"; overlay.appendChild(now);
    host.appendChild(overlay);
    requestAnimationFrame(function () {
      $$(".tl-item:not(.mark)", host).forEach(function (n) {
        if (n.scrollWidth > n.clientWidth + 1) {
          var out = el("span", "tl-out", n.textContent);
          out.style.top = n.style.top;
          out.style.left = "calc(" + n.style.left + " + " + n.style.width + " + 6px)";
          n.textContent = "";
          n.setAttribute("aria-label", out.textContent);
          n.parentNode.appendChild(out);
        }
      });
    });
  }

  /* ---------------- claims audit ---------------- */
  var VERD = { supported: "Holds up", partly: "Partly true", unsupported: "Unsupported", contradicted: "Contradicted" };
  var SERVES = { time: "Time-poor parents", momentum: "Consensus momentum", messaging: "Messaging simplicity", commercial: "Commercial interest", contrarian: "Contrarian camp", hype: "Press hype", evidence: "Holds on evidence" };
  var GROUPS = ["Sleep training and settling", "Schedules, naps and regressions", "Sleep location and products", "Feeding, environment and daily inputs", "Claims that hold up"];
  var CLAIMS = [
    { g: 0, c: "Sleep training is necessary", v: "unsupported", conf: "high", sv: ["time", "commercial"], vt: "False for her.",
      e: "No trial has enrolled an infant without a parent-reported problem. No child benefit on any measure at age 6 ([[price2012]]). No professional body's text says a well-sleeping infant should be trained." },
    { g: 0, c: "Sleep training makes babies sleep more", v: "partly", conf: "high", sv: ["time", "commercial"], vt: "True for parent-reported problems and parental fatigue from about 6 months; mostly false for objectively measured infant sleep.",
      e: "In 235 infants aged 6–8 months, diary wakings fell (1.7 vs 2.2) while actigraph wakings did not (7.9 vs 7.7); about 97% in both arms still woke at least twice a night; longest stretch +20 minutes; parent-rated severe problem 4% vs 14% ([[hall2015]]). Nine RCTs pooled: night wakings g = 0.10, not significant ([[kempler2016]]). Group differences gone by ages 2–6." },
    { g: 0, c: "Sleep training is proven safe", v: "partly", conf: "moderate", sv: ["commercial", "momentum"], vt: "Overstated. Large harm is excluded; small or subgroup harm is not; nothing tested under about 6–7 months.",
      e: "One diluted trial to age 6: 31% lost to follow-up, 57% of intervention mothers attended, parent-report outcomes, cortisol on 46% ([[price2012]]). One 43-infant trial with about 10 per arm at 12 months ([[gradisar2016]]); its reported actigraphy null rests on secondary sources. Coarse cohort data ([[bilgin2020]]). Several pro-training authors have consulted for Johnson & Johnson." },
    { g: 0, c: "Sleep training harms the brain or attachment", v: "unsupported", conf: "high that large harm is absent", sv: ["contrarian"], vt: "No study shows harm; large harm is ruled out for the methods tested.",
      e: "The sole “harm” study: 25 dyads, no control group, 12 analysed, no significant rise in infant cortisol across settling ([[middlemiss2012]]; critique in [[lecuelle2025]]). The only RCT sampling cortisol at separation had 4–7 infants per arm, null ([[blunden2022]]). The rest is extrapolation from rodent separation and institutional neglect. AAIMH's own 2022 statement concedes harm is not demonstrated ([[aaimh2022]])." },
    { g: 0, c: "Put her down drowsy but awake", v: "partly", conf: "moderate", sv: ["momentum"], vt: "Weak, cheap habit; not a requirement.",
      e: "Origin is 1990s video observation ([[anders1992]]); AAP and Canadian handouts state it without citing trials, and it has never been isolated in one. An 802-family trial could not shift the practice (p = .052) and found no sleep effect ([[galland2017]]); a 279-family trial gained 22–35 parent-reported minutes to 40 weeks, nothing at 1 year ([[paul2016]])." },
    { g: 0, c: "Don't feed or rock to sleep: it creates sleep associations", v: "partly", conf: "moderate", sv: ["momentum", "commercial"], vt: "Partly true for parent-noticed waking at 6–12 months; no long-term consequence shown; her current nights contradict the mechanism.",
      e: "Correlates with more signalled waking in at least six datasets, but direction is mixed: early sleep trouble predicted later parental presence, and presence at onset was protective for long latency ([[simard2008]]); bedtime involvement at 4 months predicted rising night wakings to 8 months in 207 families ([[matzliach2025]]). Independent sleepers' advantage vanished by 9–12 months in 704 Italian infants, about 80% of whom needed help to fall asleep at every age ([[bruni2014]])." },
    { g: 0, c: "Self-soothing is a skill that must be taught", v: "unsupported", conf: "moderate–high", sv: ["commercial"], vt: "Many infants resettle untaught, and no study links the skill to later emotional regulation.",
      e: "About a quarter of infants resettle unaided on video at 5 weeks with no training ([[sjr2015]]). At 12 months fewer than half of awakenings are self-soothed and 43% of infants declined in self-soothing over the year; temperament was unrelated ([[burnham2002]]). “Self-soothing” is an operational label for “no parent intervened”. No study links it to later emotional regulation." },
    { g: 0, c: "There is a window: learn it by 6 months or it gets harder", v: "unsupported", conf: "moderate", sv: ["commercial"], vt: "No comparative data; waiting forfeits nothing.",
      e: "No comparative data. Interventions work by parent report at 9–18 months ([[kahn2020]]) and at 1.5–4 years ([[cooney2018]])." },
    { g: 0, c: "Prompt responding builds secure attachment; never let her cry", v: "unsupported", conf: "moderate", sv: ["contrarian"], vt: "The attachment dividend is unsupported; responding to distress is harmless and possibly helpful early.",
      e: "The founding 26-dyad finding failed replication: more ignoring in weeks 1–9 went with less crying later, and crying did not separate secure from insecure infants ([[vanij2000]]). Attachment–sleep correlation r = .18 ([[simard2017]]). Responding to distress at 1 and 3 months went with faster decline in night waking ([[voltaire2018]])." },

    { g: 1, c: "The 4-month sleep regression", v: "partly", conf: "moderate", sv: ["commercial"], vt: "Not a discrete or universal event; a rise in signalled waking in a subgroup between 3 and 9 months is real.",
      e: "No indexed study defines or tests it. Architecture matures gradually from 2 to 6 months (slow-wave sleep within cycles from week 21, [[ficca2000]]). On video in 80 infants the longest sleep period was 281 minutes at 3 months and 286 at 6, a plateau rather than a fall, though a third of infants had rising awakenings across the year ([[burnham2002]]). Parent-reported “more than 2 wakings” rose from 9% at 3 months to 21% at 6 ([[bruni2014]])." },
    { g: 1, c: "The 8–10 month regression", v: "partly", conf: "weak–moderate", sv: ["commercial"], vt: "Real for some infants, transient, best explained by motor milestones.",
      e: "Parent-rated problems peak at 39.7% at 8 months in Finland ([[paavonen2020]]). Actigraphy time-links more long wake episodes to crawling onset (n = 28, [[scher2015]]) and to pulling to stand in early achievers (n = 20, [[atun2016]]). One laboratory, small samples; absent from longitudinal video means." },
    { g: 1, c: "Wake windows", v: "unsupported", conf: "high", sv: ["commercial"], vt: "The principle (tolerable wake time rises with age) is sound; the chart numbers are unsupported.",
      e: "No study derives or tests the chart numbers. Actigraph-measured longest wake bout: 162 minutes at 3 months (range 101–292), 212 at 6 (139–348), 293 at 12 ([[schoch2020]]). The between-infant range is wider than the age-to-age steps in the charts ([[canapariww]])." },
    { g: 1, c: "Overtired babies sleep worse; sleep begets sleep", v: "contradicted", conf: "moderate", sv: ["commercial"], vt: "The cortisol story is contradicted; “tired means fussier” is true. Don't keep her awake deliberately: deeper sleep with blunted arousal is the unsafe profile.",
      e: "Infants kept awake 120 minutes past nap time slept longer, with higher arousal thresholds and more obstructive apnoeas (n = 14, [[franco2004]]). Toddlers who missed a nap fell asleep in 11.9 vs 37.3 minutes ([[lassonde2016]]) with no cortisol rise ([[tribble2015]]). Between infants, more day sleep goes with less night sleep (r = −0.26, [[schoch2020]]). A missed nap does worsen same-day mood in toddlers (n = 10, [[berger2012]])." },
    { g: 1, c: "Bedtime should be 7 pm", v: "unsupported", conf: "high", sv: ["time"], vt: "No special clock time; her 8:30 pm to 7:30 am equals the reference mean.",
      e: "National mean bedtimes span 19:27 to 22:17 ([[mindell2010]], J&J-funded). Reference night at 6 months is 11.0 h (SD 1.1) in bed ([[iglowstein2003]]). Within an infant, each hour earlier onset added 34 minutes of night sleep in 24 younger infants ([[adams2020]]): wake time is the fixed end, so move both or neither." },
    { g: 1, c: "Sleeping through the night matters", v: "contradicted", conf: "high", sv: ["time"], vt: "Wrong as a norm and as a developmental marker.",
      e: "38% of 6-month-olds don't sleep 6 h straight and 57% don't sleep 8 h; 28% and 43% at 12 months; unrelated to development ([[pennestri2018]]). On video essentially all infants wake 2–4 times a night; 24% of infants reported to sleep 5+ h had woken and resettled unseen ([[sjr2015]])." },
    { g: 1, c: "Night-wean by 6 months", v: "unsupported", conf: "moderate", sv: ["time"], vt: "Optional; no child benefit shown.",
      e: "About 60% of 6–12-month-olds take at least one night feed and about 78% wake at least once (UK survey of roughly 750 mothers, self-selected, [[brown2015]]). Night weaning was not associated with longer night sleep in 193 infants followed to 52 weeks ([[olson2026]]). No authority sets an age; no trial tests weaning against milk supply." },
    { g: 1, c: "Contact naps create bad habits", v: "unsupported", conf: "low", sv: ["momentum"], vt: "Untested, and so is the mirror claim that contact naps aid development (the kangaroo-care data are preterm infants versus incubators).",
      e: "No study compares contact with cot naps on nap length, architecture, night sleep or later independence. Nearest analogue: parents holding infants 15–16 h a day had infants who cried less but woke most at night at 12 weeks, confounded by 85% vs 37% exclusive breastfeeding ([[sjr2006]])." },
    { g: 1, c: "Short naps are a problem", v: "unsupported", conf: "moderate–high", sv: ["commercial"], vt: "A 45-minute nap is one cycle and typical at this age.",
      e: "Infant cycles run 50–60 minutes, range 30–70 ([[grigg2016]]); the afternoon nap at 4–6 months averaged 41.9 minutes and one cycle (n = 6, [[vladimirova1979]]). App logs put minimum nap length at about 5 months, rising after ([[mindell2016]], J&J-funded). The canonical nap-and-memory result used naps averaging 45 minutes ([[friedrich2015]]); nap duration was uncorrelated or negatively correlated with retention ([[seehagen2015]])." },

    { g: 2, c: "Never bed-share, under any circumstances", v: "partly", conf: "high for hazards; moderate for her", sv: ["messaging"], vt: "Correct for sofas, alcohol, sedatives, smoking, prematurity and the first 3 months. Not an accurate statement of her individual risk. Suffocation and wedging risk in a prepared adult bed is unquantified.",
      e: "The pooled analysis the AAP relies on: adjusted OR 5.1 (2.3–11.4) under 3 months for breastfed infants of non-smoking, non-drinking parents, 1.0 (0.3–3.0) at 3 months and over ([[carpenter2013]]). The opposing analysis: hazard-free bed-sharing OR 1.62 (0.96–2.73) under 98 days, 0.08 (0.01–0.52) after, the latter from one case ([[blair2014]]). England's NICE tells clinicians to discuss safer bed-sharing and to advise strongly against it only with low birth weight, alcohol, smoking or sedating drugs ([[nice]]). No randomised evidence exists." },
    { g: 2, c: "Bed-sharing is the evolved norm, so it is safe and better", v: "unsupported", conf: "moderate–high", sv: ["contrarian"], vt: "No benefit shown; safety is a property of the conditions, not the practice.",
      e: "Co-sleeping featured in 61% of 259 Japanese sleep-related deaths ([[osawa2020]]). Long-term outcome studies are null in both directions ([[okami2002]]; [[bilgin2024]]). Ancestral conditions included firm ground bedding and no alcohol, sedatives or duvets. One leading advocate is a paid consultant to a co-sleeper maker." },
    { g: 2, c: "Room-share for 6–12 months", v: "partly", conf: "moderate–high to 6 months; low after", sv: ["momentum"], vt: "Sound to about 6 months; undemonstrated from 6 to 12.",
      e: "Solitary sleep carried 3- to 10-fold SIDS odds in 1987–2003 case-control data, and adjusted OR 7.6 (4.7–12.2) in US 2016–17 data where case and control exposure were defined differently ([[parks2023]]). All studies pooled the first year; under 10% of sudden deaths occur at 7–12 months. The AAP's “as much as 50%” figure could not be traced by a paediatric sleep physician ([[canapari]])." },
    { g: 2, c: "Her own room will improve her sleep", v: "partly", conf: "moderate", sv: ["time"], vt: "Improves what parents notice and how mothers sleep; objective infant benefit unconfirmed.",
      e: "Observational, parent-reported: 40 minutes more night sleep at 9 months for early independent sleepers, and room-sharers had 4 times the odds of unplanned overnight bed-sharing (n = 230, [[paul2017]]). Actigraphy at 3 and 6 months: no infant difference; room-sharing mothers slept worse (n = 153, [[volkovich2015]]); reported gains after moving rooms “were not borne out by actigraphy” ([[rudzik2021]])." },
    { g: 2, c: "A pacifier prevents SIDS", v: "partly", conf: "moderate", sv: ["messaging"], vt: "Consistent association; negligible absolute effect at her risk level; optional.",
      e: "Use at last sleep OR 0.39 (0.31–0.50) across 7 case-control studies; number needed to treat 2,733 at the then-US SIDS rate ([[hauck2005]]); mechanism unknown. No effect on breastfeeding in trials ([[jaafar2016]]); no effect on sleep ([[butler2016]])." },
    { g: 2, c: "Monitors and smart bassinets keep babies safe", v: "unsupported", conf: "high", sv: ["commercial"], vt: "No safety benefit shown; a SNOO is outside its indication for a rolling baby.",
      e: "FDA states the SNOO “is not intended to prevent or reduce the risk of SIDS/SUID” ([[snoofda]]), and its indication is infants “not yet able to roll over consistently” ([[snoodenovo]]). In 1,079 monitored infants, alarm-threshold events occurred in 41%, including healthy term infants, and were not precursors of SIDS ([[ramanathan2001]]). An early consumer oximeter read normal at least once in 5 of 12 hypoxaemic infants ([[bonafide2018]])." },
    { g: 2, c: "Weighted sleep sacks calm babies", v: "unsupported", conf: "precautionary", sv: ["commercial"], vt: "Don't use: no benefit shown, plausible harm.",
      e: "Opposed by AAP, CPSC, CDC and NIH; five deaths at ages 1–6 months under CPSC investigation; no controlled safety or benefit data ([[npr2024]])." },

    { g: 3, c: "Breastfed babies sleep worse", v: "partly", conf: "moderate–high", sv: ["commercial"], vt: "True for parent-noticed waking; false for measured sleep.",
      e: "Actigraphy from 4 to 18 weeks found no difference by feed type, while formula-feeding mothers over-reported sleep ([[rudzik2018]]). On video at 3 months, long sleepers were as likely to be solely breast-milk fed (65.6% vs 62.5%, p = .83, [[sjr2015]]). Parent report shows more noticed waking, concurrent but not later (55,831 reports, [[hysing2014]])." },
    { g: 3, c: "Solids, formula top-ups or cereal help sleep", v: "partly", conf: "moderate–high", sv: ["time"], vt: "Solids: real but too small to act on. Cereal: contradicted. Formula: unsupported.",
      e: "Early solids in 1,303 infants: +16.6 minutes of night sleep at 6 months (95% CI 7.8–25.4), 7.3 minutes averaged over the study, 9% fewer wakings; unblinded parent report, 42% adherence ([[perkin2018]]). Cereal in the bedtime bottle: null in the only trial (n = 106, [[macknin1989]])." },
    { g: 3, c: "Pumped milk must be fed at the time of day it was pumped", v: "unsupported", conf: "low", sv: ["hype"], vt: "Plausible, untested, probably small after 3 months. Match by time of day anyway, because it costs nothing.",
      e: "Composition does cycle: melatonin peaks near 47 pg/mL around midnight and is undetectable by day; cortisol peaks in the early morning (83 reports, [[italianer2020]]). Infant-outcome evidence is one anonymous survey of 329 mothers ([[booker2022]]) and one null ([[toorop2020]]). Modelled: a night feed supplies 1% or less of her own melatonin output ([[kennaway1992]]). Press coverage called it “crucial for babies' sleep”." },
    { g: 3, c: "Add a dream feed", v: "unsupported", conf: "low", sv: ["time"], vt: "Optional; it moves the feed, it doesn't remove it.",
      e: "Worked only inside a three-part package in 26 newborns ([[pinilla1993]]); in the 610-infant replication, parents did not implement it ([[sjr2001]])." },
    { g: 3, c: "White noise helps sleep", v: "partly", conf: "low–moderate", sv: ["commercial"], vt: "Weak for sleep onset; legitimate as a low-volume mask for household noise.",
      e: "80% vs 25% of 40 newborns asleep within 5 minutes ([[spencer1990]]); nothing beyond the newborn period; wider evidence graded very low ([[riedy2021]]). All 14 machines tested exceeded 50 dBA at 30 cm at full volume, and three exceeded 85 dBA ([[hugh2014]])." },
    { g: 3, c: "Naps need blackout darkness", v: "unsupported", conf: "low", sv: ["commercial"], vt: "Dark nights and dim evenings are mechanistically sound but untested under 12 months; dark naps have no evidence either way.",
      e: "No study of nap-room light or blackout blinds exists. Better night sleepers at 6–12 weeks had about twice the light exposure from noon to 4 pm (n = 56, observational, [[harrison2004]]). In 3–4-year-olds one hour of light at 5–5,000 lux before bed suppressed melatonin by 69–99% with no clear dose-response ([[hartstein2022]]); no infant data." },
    { g: 3, c: "Teething disrupts sleep", v: "contradicted", conf: "moderate–high", sv: ["time"], vt: "Camera-measured sleep doesn’t change on teething nights.",
      e: "Camera-measured sleep in 849 infants did not differ between teething and non-teething nights although over half of parents reported disturbance ([[kahn2025t]], Nanit-affiliated authors). In 475 prospectively recorded eruptions, sleep disturbance was not associated ([[macknin2000]])." },
    { g: 3, c: "A bath, lotion and massage routine", v: "partly", conf: "moderate", sv: ["commercial"], vt: "Order and consistency are supported; bath and lotion are not the active ingredient.",
      e: "A prescribed routine in 405 families shortened settling and cut reported wakings within days ([[mindell2009]]); the massage-specific trial changed perceptions, not most sleep measures ([[mindell2018]]); Johnson & Johnson sells both and funded the trials. Independent actigraphy in 320 six-month-olds: a routine starting after 9 pm went with 23.6 minutes less night sleep, and fewer routine nights with more variable sleep ([[tsai2022]])." },
    { g: 3, c: "Iron drops from 4 months for breastfed babies", v: "partly", conf: "moderate", sv: ["momentum"], vt: "Contested. Measure ferritin and haemoglobin and act on the result.",
      e: "Iron-deficiency anaemia does alter infant sleep physiology ([[peirano2007]]). But 1 mg/kg/day from 4 to 9 months in 221 non-anaemic breastfed infants changed no Bayley score at 12, 24 or 36 months ([[svensson2024]]), and iron-replete Swedish infants given iron grew less in length and head circumference ([[dewey2002]]). European guidance finds insufficient evidence for routine supplementation ([[domellof2014]]). The AAP dose is taken from secondary sources, not verified in full text." },
    { g: 3, c: "There is a correct nursery temperature or TOG chart", v: "partly", conf: "robust for overheating; none for the numbers", sv: ["commercial"], vt: "Avoid overheating and head covering; the specific numbers are unsupported.",
      e: "No trial of temperature or sleepwear on sleep quality. At 28°C infants were harder to rouse late in the night than at 24°C (n = 62, [[franco2001]]); each excess tog raised SIDS risk 1.26-fold in 41 cases ([[ponsonby1992]])." },

    { g: 4, c: "Back to sleep, for every sleep", v: "supported", conf: "high", sv: ["evidence"], vt: "One of the largest effects in the field.",
      e: "Prone placement OR 13.1 (8.5–20.2) in 745 cases ([[carpenter2004]]). Once she rolls both ways on her own, leave her as she lies." },
    { g: 4, c: "A firm, flat, bare sleep surface", v: "supported", conf: "high", sv: ["evidence"], vt: "The dominant modifiable hazard after 4 months.",
      e: "Soft bedding adjusted OR 5.0 (3.2–8.0) for unexplained death and 16.3 (5.0–53.3) for suffocation at 2–9 months ([[parks2023]]); head covered by bedding, pooled aOR 16.9 ([[blair2008]]). At 5–11 months, blankets obstructed the airway in 55% of soft-bedding deaths ([[erck2019]])." },
    { g: 4, c: "Never sleep with a baby on a sofa or recliner", v: "supported", conf: "high", sv: ["evidence"], vt: "Holds at every age; roughly 18-fold.",
      e: "OR 18.3 (7.1–47.4) at all ages ([[blair2014]]); other studies 24–67; 12.9% of sleep-related deaths in 24 states occurred on sofas ([[rechtman2014]])." },
    { g: 4, c: "No bed-sharing after alcohol or sedatives", v: "supported", conf: "high", sv: ["evidence"], vt: "Binds both adults; roughly 18-fold.",
      e: "More than 2 units of alcohol: OR 18.3 (7.7–43.5) at all ages, about 6 in older infants ([[blair2014]]); recent alcohol or drugs in 31% of SIDS co-sleepers vs 3% of controls ([[blair2009]])." },
    { g: 4, c: "Stop swaddling once she can roll", v: "supported", conf: "high", sv: ["evidence"], vt: "Swaddled and prone carries about 13-fold odds.",
      e: "Swaddled and prone OR 12.99 (4.14–40.77) ([[pease2016]])." },
    { g: 4, c: "Car seats, swings and loungers are not for sleep", v: "supported", conf: "high", sv: ["evidence"], vt: "Risk is higher under non-parental supervision.",
      e: "348 of 11,779 sleep-related deaths occurred in sitting devices, 63% in car seats, half of those at home; odds 2.8 times higher under child-care providers ([[liaw2019]]). Nursing pillows: 154 deaths 2010–2022, 142 during sleep ([[cpscpillows]])." },
    { g: 4, c: "Smoke-free home", v: "supported", conf: "high", sv: ["evidence"], vt: "Roughly 2.4-fold for prenatal smoking.",
      e: "Prenatal smoking adjusted OR 2.44 in 20.7 million births ([[anderson2019]])." },
    { g: 4, c: "A consistent, short bedtime routine helps", v: "supported", conf: "moderate", sv: ["evidence"], vt: "Small effects, tens of minutes, but consistent.",
      e: "Effects within days in a J&J-funded RCT ([[mindell2009]]); independent actigraphy in 320 six-month-olds links later and less regular routines to shorter, more variable night sleep ([[tsai2022]])." }
  ];

  function buildClaims() {
    var host = $("[data-claims]"); if (!host) return;
    var state = { v: "all", s: "all" };
    var vRow = $("[data-filter='verdict']"), sRow = $("[data-filter='serves']");
    function chip(row, key, val, label, glyph, n) {
      var b = el("button", "chip");
      b.type = "button";
      b.setAttribute("aria-pressed", val === "all" ? "true" : "false");
      b.dataset.val = val;
      b.innerHTML = (glyph ? '<i class="g ' + glyph + '"></i>' : "") + label + (n != null ? ' <span class="n">' + n + "</span>" : "");
      b.addEventListener("click", function () {
        state[key] = val;
        $$("button", row).forEach(function (x) { x.setAttribute("aria-pressed", x.dataset.val === val ? "true" : "false"); });
        render();
      });
      row.appendChild(b);
    }
    chip(vRow, "v", "all", "All", null, CLAIMS.length);
    Object.keys(VERD).forEach(function (k) { chip(vRow, "v", k, VERD[k], k, CLAIMS.filter(function (c) { return c.v === k; }).length); });
    chip(sRow, "s", "all", "All");
    Object.keys(SERVES).forEach(function (k) { chip(sRow, "s", k, SERVES[k], null, CLAIMS.filter(function (c) { return c.sv.indexOf(k) >= 0; }).length); });

    function render() {
      host.innerHTML = "";
      var shown = 0;
      GROUPS.forEach(function (gname, gi) {
        var items = CLAIMS.filter(function (c) { return c.g === gi && (state.v === "all" || c.v === state.v) && (state.s === "all" || c.sv.indexOf(state.s) >= 0); });
        if (!items.length) return;
        host.appendChild(el("h3", "grp", gname));
        items.forEach(function (c) {
          shown++;
          var d = el("details", "claim");
          var sum = el("summary");
          sum.innerHTML = '<i class="g ' + c.v + '" role="img" aria-label="' + VERD[c.v] + '"></i>' +
            '<span class="ct">' + c.c + "</span><i class=\"chev\" aria-hidden=\"true\"></i>" +
            '<span class="cv"><b>' + VERD[c.v] + ".</b> " + c.vt + ' <span class="serves">' + c.sv.map(function (k) { return "<span>" + SERVES[k] + "</span>"; }).join("") + "</span></span>";
          d.appendChild(sum);
          var body = el("div", "body",
            '<p><span class="lbl">What the evidence shows</span>' + cite(c.e) + "</p>" +
            '<p><span class="lbl">Confidence</span>' + c.conf.charAt(0).toUpperCase() + c.conf.slice(1) + "</p>");
          d.appendChild(body);
          host.appendChild(d);
        });
      });
      if (!shown) host.appendChild(el("p", "empty", "No claim matches both filters. Set either filter to All to see more."));
      $("[data-count]").textContent = "Showing " + shown + " of " + CLAIMS.length + " claims. Open any claim for its evidence.";
    }
    render();
  }

  /* ---------------- decision rules ---------------- */
  var RULES = [
    ["She pushes up on hands and knees, or the bassinet label names rolling", "Crib, mini crib or play yard tonight", "Bedside sleeper, SNOO, in-bed sleeper", "Standard and manufacturer criteria"],
    ["She rolls onto her front asleep", "Leave her if she rolls both ways; always start her on her back", "Positioners, wedges, rolled towels", "AAP guidance; support cushions carry a “not for sleep” rule"],
    ["Whoever is holding her for a nap feels drowsy", "Put her down on her back, or hand her off, at once", "“Rest your eyes”; recline on a sofa or recliner", "Sofa OR 18–67; measured"],
    ["A parent wants to sleep beside her", "Prepared bed, both adults sober and rested, mother's side", "The sofa; any night with alcohol, sedating medication or exhaustion", "[[blair2014]]; [[carpenter2013]]"],
    ["She stirs, grunts, fusses or calls briefly at night", "Watch for 2–4 minutes, the latency ordinary parents show", "Lift her at the first sound", "Observational; Plate XI"],
    ["She cries in distress", "Respond promptly and fully", "Timed ignoring, at this age or without a problem you yourselves define", "No body endorses it under 6 months; no child benefit shown"],
    ["A nap ends at 45 minutes", "Content: the nap is over. Upset or irritable afterwards: rock her on", "Run the day by a wake-window clock; keep her awake to “build pressure”", "Norms; [[franco2004]]"],
    ["Night waking rises alongside crawling or pulling up", "Same responses, same timing, floor practice by day; expect it to pass", "Overhaul the routine; blame teething", "Actigraphy cohorts, one laboratory"],
    ["Three or more wakings nightly for several weeks, loud snoring or laboured breathing, or 24-hour sleep under about 11 h", "Look for illness and sleep-disordered breathing; re-measure ferritin", "Assume it is behavioural", "Persistent breathing symptoms went with 5.3 fewer language points at age 2 ([[smithson2018]])"],
    ["After 6 months you come to regard night waking as a problem", "In order: feed earlier in the routine, put her down awake with a parent present, then graduated checks. Expect improvement in what you notice for 1 in 4 to 1 in 10 infants", "Expect more total sleep, a lasting effect, or the advertised harm or benefit", "[[korownyk2018]]; [[hall2015]]; [[price2012]]"],
    ["She drops the night feed herself", "Let it go", "Add a dream feed back", "No evidence a feed is required at a given age"],
    ["You want to drop the night feed after 6 months", "Taper gradually, shift intake to the day, keep total daily milk removals up", "Expect longer sleep", "24-hour intake unchanged when night intervals were stretched in 26 infants ([[pinilla1993]]); supply advice is mechanistic judgement"],
    ["Only morning-pumped milk is on hand at bedtime", "Nurse, or use it anyway", "Pump overnight to bank night milk", "Untested hypothesis; maternal sleep matters more"],
    ["She is ill or just vaccinated", "Respond fully; resume the routine when she is well", "Treat the interruption as a lost habit", "Infants slept more in the 24 h after immunisation (n = 70, [[franck2011]])"],
    ["Travel or a clock change", "Shift with light: morning light to move earlier, evening light to move later, 15–20 minutes a day; safe-sleep rules apply with extra force in unfamiliar rooms", "Melatonin", "Mechanism only; no infant studies"]
  ];
  function buildRules() {
    var host = $("[data-rules]"); if (!host) return;
    RULES.forEach(function (r) {
      var row = el("div", "rule");
      row.innerHTML = '<div class="if"><span class="lb">If</span>' + r[0] + '</div><div><span class="lb">Do</span>' + r[1] + '</div><div class="dont"><span class="lb">Don’t</span>' + r[2] + '</div><div class="basis"><span class="lb">Basis</span>' + cite(r[3]) + "</div>";
      host.appendChild(row);
    });
  }

  /* ---------------- latency strip ---------------- */
  function buildLatency() {
    var host = $("[data-latency]"); if (!host) return;
    var MAX = 5;
    var p = function (m) { return m / MAX * 100; };
    var data = [
      { l: "Parents within arm's reach, no next-day cost", s: "Judgement for this household", v: 0.08, val: "≈ 0" },
      { l: "Infant fussing before London parents arrived", s: "Mean, St James-Roberts 2016", v: 1.0, val: "≈ 1 min" },
      { l: "Parental response at 3 months; longer times predicted unaided resettling at 12 months", s: "Mean, Burnham 2002", v: 3.3, val: "3.3 min" },
      { l: "Ordinary London parents' response at night", s: "Mean, St James-Roberts 2016", v: 3.5, val: "3.5 min" }
    ];
    var plotRow = el("div");
    plotRow.style.position = "relative";
    plotRow.style.paddingTop = "26px";
    data.forEach(function (d, i) {
      var row = el("div", "lat-row");
      row.appendChild(el("div", "lat-label", d.l + "<small>" + d.s + "</small>"));
      var tr = el("div", "lat-track"); tr.tabIndex = 0;
      [1, 2, 3, 4].forEach(function (t) { var g = el("div", "lat-grid"); g.style.left = p(t) + "%"; tr.appendChild(g); });
      var band = el("div", "lat-band"); band.style.left = p(2) + "%"; band.style.width = (p(4) - p(2)) + "%"; band.style.top = "-6px"; band.style.bottom = "-6px";
      if (i === 0) band.innerHTML = "<span>Pause here for stirring and brief calls</span>";
      tr.appendChild(band);
      var dot = el("div", "lat-dot"); dot.style.left = p(d.v) + "%"; tr.appendChild(dot);
      var lab = el("div", "lat-val", d.val); lab.style.left = "calc(" + p(d.v) + "% + 12px)"; tr.appendChild(lab);
      bindTip(tr, function () { return "<b>" + d.val + "</b>" + d.l + "<i>" + d.s + "</i>"; });
      row.appendChild(tr);
      plotRow.appendChild(row);
    });
    host.appendChild(plotRow);
    var axisRow = el("div", "lat-row"); axisRow.appendChild(el("div"));
    var axis = el("div", "lat-axis");
    [0, 1, 2, 3, 4, 5].forEach(function (t) { var s = el("span", null, t + (t === 5 ? " min" : "")); s.style.left = p(t) + "%"; if (t === 0) s.style.transform = "none"; if (t === 5) s.style.transform = "translateX(-100%)"; axis.appendChild(s); });
    axisRow.appendChild(axis);
    host.appendChild(axisRow);
  }

  /* ---------------- revision scale ---------------- */
  var REV = [
    [5, "Most likely", "AAP: “unable to recommend bed sharing under any circumstances”", "Toward risk-stratified counselling for breastfed infants past 3 months of sober non-smokers. The AAP's own cited analysis gives 1.0 there; England, Norway and Spain have moved; US rates are flat under the absolute. Counter-pressure: clinician neutrality was associated with more bed-sharing (aOR 1.38, [[colson2013]]) in a population where most deaths involve stacked hazards."],
    [4, "Very likely", "Room-sharing duration and the “50%” figure", "Shortened or reframed as “first 4–6 months, mechanism unknown”; already cut once."],
    [3, "Likely", "“Sleep training improves infant sleep and is proven safe”", "Restated as “improves parental report and mood; little objective change; no detectable long-term effect either way” as objective measurement spreads."],
    [3, "Likely", "“Self-soothing must be taught”; sleeping through by 6 months as the norm", "Replaced by wider normative ranges and the signalling-versus-waking distinction."],
    [2, "Possible", "Pacifier advice; breastfeeding's independent SIDS effect; routine iron from 4 months", "Downgraded or re-explained: no mechanism for pacifiers; proximity may confound breastfeeding (in sibling comparisons, breastfeeding's associations with 10 of 11 child outcomes lost significance, [[colen2014]]); the only modern iron trial is null."],
    [3, "Will fade, never having been consensus", "Wake windows, regression calendars, “drowsy but awake” as a requirement", "No outcome data to defend them."],
    [1, "Unlikely to be confirmed", "Brain or attachment damage from limited crying; attachment dividends from co-sleeping", "Neither claim has direct evidence; the follow-ups that exist are null."],
    [0, "Least likely to move", "Back sleeping; smoke avoidance; no sofa sleep; no surface-sharing after alcohol or sedatives; firm, flat, bare surfaces; risk concentrated in the first 6 months", "Large, consistent effects with physical mechanisms and population-level natural experiments."],
    [0, "Least likely to move", "Wide normal variation; consolidation is mostly maturation; caregiver mental health outweighs technique; no demonstrated long-term effect of sleep-practice choices within normal care", "Could be overturned only by trials much larger than any yet run."]
  ];
  function buildRev() {
    var host = $("[data-rev]"); if (!host) return;
    REV.forEach(function (r) {
      var row = el("div", "rev-row");
      var pips = ""; for (var i = 1; i <= 5; i++) pips += '<i class="' + (i <= r[0] ? "on" : "") + '"></i>';
      row.innerHTML = '<div class="rev-tier">' + r[1] + '<span class="pips" role="img" aria-label="' + r[0] + ' of 5 likelihood of revision">' + pips + '</span></div><div class="rev-pos">' + r[2] + '</div><div class="rev-why">' + cite(r[3]) + "</div>";
      host.appendChild(row);
    });
  }

  /* ---------------- bibliography ---------------- */
  function buildBiblio() {
    var host = $("[data-biblio]"); if (!host) return;
    var seen = {}, items = [];
    $$("a.c").forEach(function (a) {
      var href = a.getAttribute("href");
      if (seen[href]) return;
      seen[href] = 1;
      items.push([a.dataset.bib || a.textContent.trim(), href]);
    });
    items.sort(function (x, y) { return x[0].localeCompare(y[0], "en", { sensitivity: "base" }); });
    items.forEach(function (it) {
      var li = el("li"); var a = el("a"); a.href = it[1]; a.textContent = it[0]; li.appendChild(a); host.appendChild(li);
    });
    var cl = $("#sources .count-line");
    if (cl) cl.insertAdjacentText("afterbegin", items.length + " distinct sources. ");
  }

  /* ---------------- print the caregiver card ---------------- */
  var pb = $("[data-print-card]");
  if (pb) pb.addEventListener("click", function () {
    document.body.classList.add("print-card");
    window.print();
    setTimeout(function () { document.body.classList.remove("print-card"); }, 500);
  });

  buildActogram();
  buildVariance();
  buildAgeCols();
  buildLadder();
  buildLanes();
  drawDial();
  buildTimeline();
  buildClaims();
  buildRules();
  buildLatency();
  buildRev();
  buildBiblio();
})();
