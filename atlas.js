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
    blair2006: ["Blair 2006", "https://doi.org/10.1093/ije/dyl212"],
    santos2019: ["Santos 2019", "https://doi.org/10.1001/jamanetworkopen.2019.18062"],
    kerr1996: ["Kerr 1996", "https://doi.org/10.1111/j.1365-2648.1996.tb02929.x"],
    lavner2023: ["Lavner 2023", "https://doi.org/10.1001/jamanetworkopen.2023.6276"],
    higley2009: ["Higley & Dozier 2009", "https://doi.org/10.1080/14616730903016979"],
    anisfeld1990: ["Anisfeld 1990", "https://pubmed.ncbi.nlm.nih.gov/2245751/"],
    williams2020: ["Williams & Turner 2020", "https://pubmed.ncbi.nlm.nih.gov/31877392/"],
    makela2018: ["Mäkelä 2018", "https://doi.org/10.1037/dev0000503"],
    mosko1996: ["Mosko 1996", "https://pubmed.ncbi.nlm.nih.gov/9122552/"],
    tappin2005: ["Tappin 2005", "https://doi.org/10.1016/j.jpeds.2005.01.035"],
    li2006: ["Li 2006", "https://doi.org/10.1136/bmj.38671.640475.55"],
    hershon2024: ["Hershon 2024", "https://doi.org/10.1111/apa.17237"],
    cubero2007: ["Cubero 2007", "https://pubmed.ncbi.nlm.nih.gov/17693960/"],
    lullabytemp: ["Lullaby Trust, room temperature", "https://www.lullabytrust.org.uk/baby-safety/safer-sleep-information/room-temperature/"],
    esposito2013: ["Esposito 2013", "https://doi.org/10.1016/j.cub.2013.03.041"],
    ohmura2022: ["Ohmura 2022", "https://doi.org/10.1016/j.cub.2022.08.041"],
    tsai2012: ["Tsai 2012", "https://doi.org/10.1111/j.1365-2648.2011.05857.x"],
    slagt2016: ["Slagt 2016", "https://pubmed.ncbi.nlm.nih.gov/27513919/"],
    jian2016: ["Jian & Teti 2016", "https://doi.org/10.1016/j.sleep.2016.07.001"],
    iwata2017: ["Iwata 2017", "https://pubmed.ncbi.nlm.nih.gov/28303945/"],
    fisher2012: ["Fisher 2012", "https://doi.org/10.1542/peds.2011-1571"]
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
        [{ t: "hzd", a: 4, b: 5, x: "Bassinet rating ends", tip: "~5 months, pushing up on hands and knees, or (some makers) rolling. ASTM F2194; Chicco; Evenflo. P 0.73 that staying past rolling raises risk." }],
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
        [{ t: "amber", a: 7, b: 10, x: "Waking bump (peak 8 mo)", tip: "Parent-rated sleep problems peak at 39.7% at 8 months in Finland (Paavonen 2020). P 0.75 that new motor skills drive a transient rise in some infants." }],
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

  /* ---------------- claims audit (probability scoring) ---------------- */
  var BANDS = [
    { k: "vlikely", label: "Very likely", lo: 0.8, hi: 1.01 },
    { k: "likely", label: "Likely", lo: 0.6, hi: 0.8 },
    { k: "toss", label: "Toss-up", lo: 0.4, hi: 0.6 },
    { k: "unlikely", label: "Unlikely", lo: 0.2, hi: 0.4 },
    { k: "vunlikely", label: "Very unlikely", lo: 0, hi: 0.2 }
  ];
  function bandOf(p) { for (var i = 0; i < BANDS.length; i++) if (p >= BANDS[i].lo && p < BANDS[i].hi) return BANDS[i]; return BANDS[4]; }
  var DOM = { safety: "Safety", sleep: "Sleep mechanics", outcome: "Long-term outcomes" };
  var SERVES = { time: "Time-poor parents", momentum: "Consensus momentum", messaging: "Messaging simplicity", commercial: "Commercial interest", contrarian: "Contrarian camp", hype: "Press hype", evidence: "Holds on evidence", atlas: "This atlas" };
  var GROUPS = ["Sleep training and settling", "Schedules, naps and regressions", "Sleep location and products", "Feeding, environment and daily inputs", "Safety rules", "This atlas’s own advice, scored the same way"];
  var CLAIMS = [
    { id: "A1", g: 0, t: "Sleep training is necessary", s: "A healthy infant who already sleeps well (one night feed, resettles quickly) will sleep or develop worse later unless sleep-trained.", p: .05, lo: .02, hi: .12, pa: .05, pb: .05, dom: "outcome", sv: ["time", "commercial"],
      e: "Preventive settling programmes show no sleep difference at 12–24 months ([[galland2017]]; [[santos2019]]); the main trained cohort showed no child benefit at age 6 ([[price2012]]); sleeping through is unrelated to Bayley scores ([[pennestri2018]]). Consolidation is driven mostly by maturation, and a good sleeper is already near ceiling. Much of the world never trains, with no detectable cost." },
    { id: "A2", g: 0, t: "Sleep training cuts night waking and helps parents", s: "Behavioural sleep training at 6–12 months reduces signalled night waking and improves parental sleep and mood, in families who report a sleep problem.", p: .85, lo: .70, hi: .92, pa: .90, pb: .8, dom: "sleep", sv: ["time"],
      e: "Several independent RCTs and meta-analyses show fewer diary-recorded wakings and better parental fatigue and sleep ([[hall2015]]; [[mindell2006]]). Extinction of a reinforced signal is among the best-established effects in behavioural science. The weak link is maternal mood: positive in individual trials, especially in symptomatic mothers, but not in every pooled analysis ([[kempler2016]])." },
    { id: "A3", g: 0, t: "Sleep training makes babies sleep more", s: "Behavioural sleep training at 6–12 months meaningfully increases objectively measured infant sleep (fewer actual wakings or more total sleep), not just fewer signalled wakings.", p: .30, lo: .15, hi: .45, pa: .30, pb: .3, dom: "sleep", sv: ["time", "commercial"],
      e: "The best objective test (235 infants, actigraphy) found wakings unchanged, 7.9 vs 7.7, with the longest stretch up 20 minutes at p = .05 ([[hall2015]]); nine RCTs pooled show no significant drop in wakings ([[kempler2016]]). A small gain is mechanistically plausible: if parents stop prolonging wakings, each one gets shorter. A meaningful gain has been looked for and not found." },
    { id: "A4", g: 0, t: "Sleep training causes lasting harm", s: "Graduated extinction (“controlled crying”) at 6+ months, within otherwise responsive care, causes lasting harm to attachment, stress regulation or emotional development.", p: .14, lo: .06, hi: .28, pa: .15, pb: .13, dom: "outcome", sv: ["contrarian"],
      e: "Acute stress is plausible: in an uncontrolled 25-infant programme, infant cortisol at settling was still elevated on night 3 after crying had stopped ([[middlemiss2012]]; critique in [[lecuelle2025]]). Lasting harm needs more than a few nights of protest inside a sensitive relationship; the animal and orphanage evidence cited for it involves prolonged daily deprivation. Follow-ups are null: the age-6 trial excludes intention-to-treat harm above about 0.33 SD ([[price2012]]), and leaving-to-cry cohorts show no attachment difference ([[bilgin2020]]). Small or subgroup harm is not excluded, which keeps P above 0.1." },
    { id: "A5", g: 0, t: "Put her down drowsy but awake", s: "Putting a 3–6-month-old down drowsy but awake at bedtime reduces signalled night waking at 6–12 months.", p: .53, lo: .35, hi: .67, pa: .55, pb: .5, dom: "sleep", sv: ["momentum"],
      e: "For: video observation linking settling in the cot to later self-soothing ([[anders1992]]; [[burnham2002]]); a small RCT of settling advice with fewer reported problems at 9 months ([[kerr1996]]); multi-component trials that include it (+22 to +40 reported minutes, [[paul2016]]; [[lavner2023]]); learning theory. Against: never isolated in a trial; an 802-family trial could not get parents to change practice and found nothing ([[galland2017]]); reverse causation is documented ([[simard2008]]). A coin-flip leaning positive, at near-zero cost." },
    { id: "A6", g: 0, t: "Feeding or rocking to sleep creates sleep associations", s: "Being fed or rocked fully to sleep causally increases signalled night waking at 6–12 months.", p: .59, lo: .45, hi: .72, pa: .60, pb: .58, dom: "sleep", sv: ["momentum", "commercial"],
      e: "Associated with more signalled waking in at least six datasets; bedtime involvement at 4 months predicted rising wakings to 8 months in 207 families, with little infant-driven effect ([[matzliach2025]]); treatment trials show that removing parental presence at onset reduces signalling. Stimulus-control learning is a sound mechanism. Against: early sleep trouble also draws parents in ([[simard2008]]), and the gap closed by 9–12 months in 704 Italian infants ([[bruni2014]])." },
    { id: "A7", g: 0, t: "Feeding or rocking to sleep harms her later", s: "Being fed or rocked to sleep in infancy harms sleep quality or emotional development beyond infancy.", p: .08, lo: .03, hi: .18, pa: .05, pb: .1, dom: "outcome", sv: ["momentum", "commercial"],
      e: "No study shows harm past infancy, most infant sleep problems resolve, and parent-assisted sleep onset is the norm across much of the world (independent onset 4% in predominantly Asian regions vs 57% in predominantly Caucasian ones, [[mindell2010]]) with no detectable cost. No plausible mechanism links how a 4-month-old falls asleep to later emotional development, separate from total sleep and caregiving quality." },
    { id: "A8", g: 0, t: "Self-soothing is learned", s: "How parents respond to night-time arousals shapes whether an infant learns to resettle without signalling.", p: .78, lo: .62, hi: .90, pa: .70, pb: .85, dom: "sleep", sv: ["commercial"], was: "Graded “unsupported”",
      e: "Longer parental response time at 3 months predicted unaided resettling at 12 months on video (n = 80, [[burnham2002]]); interventions when the infant was not distressed predicted slower consolidation (n = 107, [[voltaire2018]]); training trials cut signalling while actigraphic waking is unchanged, which is what learned signalling predicts ([[hall2015]]). Operant learning is well established in 3-month-olds. The studies are small, but they agree with each other and with the mechanism; the earlier grade leaned on sample size alone." },
    { id: "A9", g: 0, t: "Self-soothing must be taught", s: "Without deliberate training, infants will not learn to sleep through or self-settle.", p: .05, lo: .02, hi: .12, pa: .07, pb: .03, dom: "sleep", sv: ["commercial"],
      e: "Contradicted by direct observation: about a quarter of infants resettle unaided on video at 5 weeks with no training ([[sjr2015]]), most children consolidate on their own, and much of the world never trains. Learning shapes self-soothing (A8); that does not make teaching necessary." },
    { id: "A10", g: 0, t: "There is a window: learn it by 6 months", s: "Independent settling becomes materially harder to establish if not done before about 6 months.", p: .23, lo: .10, hi: .35, pa: .25, pb: .2, dom: "sleep", sv: ["commercial"],
      e: "No comparative data. Interventions work by parent report at 9–18 months ([[kahn2020]]) and at 1.5–4 years ([[cooney2018]]), with effects at least as large. Some mechanism for the claim (more practised habits, separation protest and mobility from 8–10 months) keeps it above 0.1." },
    { id: "A11", g: 0, t: "Responsive night care builds attachment", s: "Prompt, sensitive night-time responding contributes causally to attachment security.", p: .50, lo: .30, hi: .65, pa: .50, pb: .5, dom: "outcome", sv: ["contrarian"], was: "Graded “unsupported”",
      e: "Sensitivity in general causally supports attachment, and night is a main context of infant distress. In 44 families, mothers of secure 12-month-olds were more consistent and responsive at night on video ([[higley2009]]); two small RCTs of extra carrying raised security in at-risk dyads ([[anisfeld1990]]; [[williams2020]]). Against: promptness is not sensitivity, the founding “respond fast, cry less” result failed replication ([[vanij2000]]), and leaving-to-cry cohorts find no attachment difference ([[bilgin2020]]). Given the causal sensitivity–attachment link, a coin-flip is the honest score." },
    { id: "A12", g: 0, t: "Trained or independent sleepers turn out more self-regulated", s: "Infants who settle independently or are sleep-trained have better long-term emotional regulation or independence.", p: .10, lo: .04, hi: .20, pa: .08, pb: .12, dom: "outcome", sv: ["commercial"],
      e: "No supporting data: the trained cohort showed no child difference at age 6 ([[price2012]]). Any association would mostly reflect easy temperament, which both settles independently and regulates well. No mechanism linking unaided sleep onset in infancy to daytime emotion regulation has been shown." },

    { id: "B1", g: 1, t: "The 4-month sleep regression", s: "There is a discrete, near-universal worsening of sleep at about 4 months.", p: .08, lo: .03, hi: .15, pa: .10, pb: .05, dom: "sleep", sv: ["commercial"],
      e: "Objective group trajectories plateau after 3 months rather than worsen (longest sleep period 281 minutes at 3 months, 286 at 6, on video, [[burnham2002]]); architecture matures gradually from 2 to 6 months ([[ficca2000]]). What is real is a subgroup rise in parent-reported waking (more than 2 wakings: 9% at 3 months, 21% at 6, [[bruni2014]]), P ≈ 0.7 for that weaker claim." },
    { id: "B2", g: 1, t: "The 8–10 month motor-milestone bump", s: "Some infants show a transient rise in night waking around 8–10 months linked to new motor skills (crawling, pulling to stand).", p: .75, lo: .60, hi: .88, pa: .70, pb: .8, dom: "sleep", sv: ["commercial"], was: "Graded “weak–moderate”",
      e: "Actigraphy time-links more long wake episodes to crawling onset (n = 28, [[scher2015]]) and to pulling to stand (n = 20, [[atun2016]]); parent-rated problems peak at 39.7% at 8 months in a large Finnish cohort ([[paavonen2020]]). One laboratory and small samples, but the claim is modest (“some infants”), the data are objective, and motor learning reshapes sleep in adults too." },
    { id: "B3", g: 1, t: "Wake windows", s: "Scheduling naps by age-specific wake-window charts improves infant sleep compared with following the infant's cues.", p: .28, lo: .15, hi: .42, pa: .30, pb: .25, dom: "sleep", sv: ["commercial"],
      e: "The principle is sound (P ≈ 0.95): sleep pressure builds with time awake. The chart numbers have no derivation, and the measured range between infants (longest wake bout 101–292 minutes at 3 months, [[schoch2020]]) is wider than the charts' age-to-age steps ([[canapariww]]). A chart could help parents who miss tired cues, so P is not near zero; attentive caregivers' cues carry more information than a population average." },
    { id: "B4", g: 1, t: "Overtired babies sleep worse", s: "An infant kept awake past her sleep-pressure peak sleeps less or more fragmented that night (the cortisol “second wind”).", p: .20, lo: .10, hi: .35, pa: .20, pb: .2, dom: "sleep", sv: ["commercial"], was: "Graded “contradicted”",
      e: "Experiments point the other way: infants kept awake 2 hours past nap time slept longer and deeper, with higher arousal thresholds (n = 14, [[franco2004]]); toddlers who missed a nap fell asleep faster ([[lassonde2016]]) with no cortisol rise ([[tribble2015]]). Homeostatic sleep regulation predicts this. Bedtime fussiness is real ([[berger2012]]) and acute distress could fragment some nights, so the claim is unlikely rather than contradicted. Keeping her up is the wrong lever either way: deeper sleep with blunted arousal is the less safe profile." },
    { id: "B5", g: 1, t: "Sleep begets sleep", s: "More daytime sleep produces more night sleep.", p: .13, lo: .05, hi: .22, pa: .15, pb: .1, dom: "sleep", sv: ["commercial"],
      e: "Between infants, more day sleep goes with less night sleep (r = −0.26, [[schoch2020]]); in toddlers, naps push night sleep later and shorter. Homeostatic theory predicts exactly that trade. One parent-report association in 1-month-olds points the other way ([[iwata2017]])." },
    { id: "B6", g: 1, t: "Bedtime should be 7 pm", s: "For her (8:30 pm to 7:30 am), moving bedtime to about 7 pm would add at least 30 minutes of total sleep, sustained.", p: .30, lo: .15, hi: .45, pa: .35, pb: .25, dom: "sleep", sv: ["time"],
      e: "Within infants, each hour of earlier onset added 34 minutes of night sleep when wake time stayed fixed (n = 24, younger infants, [[adams2020]]). But her night already equals the reference mean (11.0 h in bed at 6 months, [[iglowstein2003]]), naps can shrink to compensate, and 7 pm may fall before her melatonin onset. National mean bedtimes span 19:27 to 22:17 ([[mindell2010]]). Even if true, the gain matters little for a child who is not short of sleep." },
    { id: "B7", g: 1, t: "Sleeping through the night matters", s: "Sleeping through the night by 6–12 months matters for development.", p: .09, lo: .03, hi: .15, pa: .07, pb: .1, dom: "outcome", sv: ["time"],
      e: "No association with Bayley scores at 6, 12 or 36 months in 388 infants ([[pennestri2018]]); three or more wakings at 8 months made no Bayley difference at 8 or 24 months ([[makela2018]]). On video essentially all infants wake 2–4 times a night; 24% of infants reported as sleeping through had woken and resettled unseen ([[sjr2015]])." },
    { id: "B8", g: 1, t: "Night-weaning helps her sleep", s: "Night-weaning at about 6 months improves the infant's own objectively measured sleep.", p: .30, lo: .15, hi: .45, pa: .35, pb: .25, dom: "sleep", sv: ["time"],
      e: "Night weaning was not associated with longer night sleep in 193 infants followed to 52 weeks ([[olson2026]]), and programmes that cut signalling do not move actigraphic waking ([[hall2015]]). The mechanism allows fewer signalled wakings and shorter feed-related wake bouts, but arousals are intrinsic and feeds at 6 months are brief. About 60% of 6–12-month-olds still feed at night ([[brown2015]])." },
    { id: "B9", g: 1, t: "Contact naps create habits", s: "Contact naps make independent napping harder to establish later.", p: .53, lo: .35, hi: .68, pa: .55, pb: .5, dom: "sleep", sv: ["momentum"], was: "Graded “unknown”",
      e: "No direct study. The association mechanism behind A6 applies to naps, and separation from the holder's body is the measured trigger for waking on transfer ([[ohmura2022]]). Against: nap consolidation is driven mostly by maturation, and daytime sleep is the most environment-shaped part of infant sleep, so it also re-shapes easily ([[fisher2012]]). Expected cost if true: a few weeks of harder transition, not a lasting problem." },
    { id: "B10", g: 1, t: "Contact naps benefit development", s: "Contact naps measurably benefit a healthy term 4–12-month-old's development compared with cot naps.", p: .16, lo: .06, hi: .28, pa: .20, pb: .12, dom: "outcome", sv: ["contrarian"],
      e: "The benefit evidence is preterm kangaroo care against incubators, which does not transfer. Two small RCTs found extra carrying raised attachment security in at-risk dyads ([[anisfeld1990]]; [[williams2020]]); that supports contact as part of sensitive care, not naps specifically, and the marginal gain in an already high-contact household is smaller. Sleep beside the mother at about 3 months is lighter, not deeper (n = 35, polysomnography, [[mosko1996]])." },
    { id: "B11", g: 1, t: "Short naps are a problem", s: "Short (about 45-minute, single-cycle) naps impair learning compared with longer naps, and extending them helps.", p: .12, lo: .04, hi: .20, pa: .15, pb: .08, dom: "outcome", sv: ["commercial"],
      e: "The canonical nap-and-memory effect came from naps averaging 45 minutes ([[friedrich2015]]); nap length was uncorrelated or negatively correlated with retention ([[seehagen2015]]). A first cycle carries most of the slow-wave sleep and spindles linked to consolidation. No study has tested nap extension." },

    { id: "C1", g: 2, t: "Never bed-share", s: "Hazard-free bed-sharing (sober, non-smoking, breastfeeding mother, prepared firm bed) raises a 4–12-month-old's sudden-death risk (SIDS plus suffocation) at least 1.5-fold over a crib in the parents' room.", p: .38, lo: .20, hi: .55, pa: .40, pb: .35, dom: "safety", sv: ["messaging"],
      e: "SIDS data after 3 months without hazards are null or protective: adjusted OR 1.0 (0.3–3.0) ([[carpenter2013]]), 1.07 ([[tappin2005]]), 0.08 from one case ([[blair2014]]). But SIDS case-control studies under-capture suffocation and entrapment; wedging deaths peak at 5–8 months with 73% in adult beds ([[erck2019]]); and US surface-sharing carries aOR 2.1–2.5 without alcohol or drug adjustment ([[parks2023]]). The 1.5-fold threshold sits inside every confidence interval. If true, the absolute addition is a few per 100,000." },
    { id: "C2", g: 2, t: "Bed-sharing is better for the baby", s: "Bed-sharing benefits infant development or attachment.", p: .15, lo: .06, hi: .30, pa: .10, pb: .2, dom: "outcome", sv: ["contrarian"],
      e: "Long-term outcomes are null: no link with behaviour trajectories from 3 to 11 years in 16,599 children ([[bilgin2024]]) or with outcomes at 18 years ([[okami2002]]). Bed-sharing does track longer breastfeeding, in both causal directions, which gives an indirect route. Ancestral-norm arguments ignore that ancestral beds lacked duvets, alcohol and sedatives; co-sleeping featured in 61% of Japanese sleep-related deaths ([[osawa2020]])." },
    { id: "C3", g: 2, t: "Room-share to 12 months", s: "Room-sharing from 6 to 12 months reduces sudden-death risk compared with the infant's own room.", p: .48, lo: .28, hi: .65, pa: .45, pb: .5, dom: "safety", sv: ["momentum"], was: "Graded “undemonstrated (low)”",
      e: "Solitary sleep carried 3–10-fold odds in 1987–2003 case-control data and 7.6 in US 2016–17 data ([[parks2023]]), but every study pooled the first year, and under 10% of deaths occur at 7–12 months. Supervision and arousal mechanisms plausibly persist (rolling and soft-object deaths happen at these ages); against that, room-sharers are four times as likely to end up in an unplanned bed-share ([[paul2017]]). Undemonstrated with a live mechanism is a coin-flip, worth roughly 1 per 100,000 if true." },
    { id: "C4", g: 2, t: "Her own room will improve her sleep", s: "Moving her to her own room after about 6 months improves her objectively measured sleep.", p: .38, lo: .22, hi: .52, pa: .40, pb: .35, dom: "sleep", sv: ["time"],
      e: "Parent reports favour own room (+40 minutes at 9 months, n = 230, [[paul2017]]), but actigraphy found no infant difference at 3–6 months while room-sharing mothers slept worse ([[volkovich2015]]), and reported gains after moving rooms were not borne out on actigraphy ([[rudzik2021]]). The mechanism (fewer parent-triggered or parent-prolonged arousals) is the same one behind the pause rule, so a small objective gain is plausible." },
    { id: "C5", g: 2, t: "A pacifier prevents SIDS", s: "A pacifier at sleep onset causally lowers SIDS risk.", p: .58, lo: .40, hi: .73, pa: .55, pb: .6, dom: "safety", sv: ["messaging"],
      e: "Consistent protection across case-control studies: OR 0.39 pooled ([[hauck2005]]); aOR 0.08 in California, apparently attenuating other risks ([[li2006]]). No RCT, and the mechanism is unknown (arousability, airway position and preventing face-down positioning are candidates); a pacifier may partly mark a caregiving style. At her baseline the absolute effect is tiny. No effect on breastfeeding in trials ([[jaafar2016]])." },
    { id: "C6", g: 2, t: "Monitors and smart bassinets keep babies safe", s: "Consumer vital-sign monitors or smart bassinets reduce sudden-death risk.", p: .10, lo: .04, hi: .22, pa: .07, pb: .12, dom: "safety", sv: ["commercial"],
      e: "No outcome evidence. In 1,079 monitored infants, alarm-threshold events were common in healthy babies and did not precede SIDS ([[ramanathan2001]]); an early consumer oximeter missed hypoxaemia in 5 of 12 infants ([[bonafide2018]]). The residual risks at her age (entrapment, soft objects) are not obviously preceded by actionable alarms. The SNOO is indicated only for infants not yet rolling ([[snoodenovo]])." },
    { id: "C7", g: 2, t: "Weighted sleep sacks", s: "Weighted sleep sacks improve infant sleep without adding risk.", p: .15, lo: .04, hi: .22, pa: .20, pb: .1, dom: "safety", sv: ["commercial"],
      e: "A conjunction: calming from deep pressure is plausible, but there is no independent evidence of a sleep benefit, and the harm mechanism (load on the chest, blunted arousal, harder to lift the head) points the other way. AAP, CPSC, CDC and NIH oppose them; five deaths are under CPSC investigation ([[npr2024]])." },

    { id: "D1", g: 3, t: "Breastfed babies sleep worse", s: "Breastfed infants get less objectively measured total sleep than formula-fed infants.", p: .25, lo: .12, hi: .40, pa: .25, pb: .25, dom: "sleep", sv: ["commercial"],
      e: "Actigraphy from 4 to 18 weeks found no difference, while formula-feeding mothers over-reported sleep ([[rudzik2018]]); on video at 3 months long sleepers were as often breast-milk fed ([[sjr2015]]); breastfeeding shortens the longest stretch but not total sleep at 6–12 months ([[hershon2024]]). Breastfed infants do signal and feed more at night (P ≈ 0.85 for that weaker claim), which can cost a little sleep." },
    { id: "D2", g: 3, t: "Formula or cereal top-ups help sleep", s: "Formula or cereal top-ups lengthen night sleep by at least 30 minutes at 4–6 months.", p: .12, lo: .03, hi: .20, pa: .15, pb: .08, dom: "sleep", sv: ["time"],
      e: "Cereal in the bedtime bottle: null in the only RCT (n = 106, [[macknin1989]]). Early solids added 16.6 minutes of reported night sleep at 6 months at best (n = 1,303, unblinded, [[perkin2018]]). Night waking at this age is not mainly hunger, so the caloric mechanism is weak." },
    { id: "D3", g: 3, t: "Match pumped milk to the time of day", s: "Feeding expressed milk at the clock time it was pumped measurably improves a 4-month-old's sleep.", p: .29, lo: .12, hi: .45, pa: .35, pb: .22, dom: "sleep", sv: ["hype"],
      e: "Milk does cycle: melatonin peaks near midnight and is absent by day; cortisol peaks in the morning ([[italianer2020]]). Infant-outcome evidence is one anonymous survey of 329 mothers ([[booker2022]]) and a double-blind crossover of day/night-dissociated formula in 30 bottle-fed infants with sleep problems that added about 55 minutes of actigraphic sleep ([[cubero2007]]), though engineered formula exaggerates the natural day/night difference; milk cortisol rhythm was unrelated to sleep in 59 pairs ([[toorop2020]]). Modelled: at 4 months a night feed supplies about 1% of her own melatonin ([[kennaway1992]]), which shrinks the main pathway; tryptophan and morning cortisol remain. Plausible, small, costless to follow." },
    { id: "D4", g: 3, t: "A dream feed", s: "A dream feed (feeding the sleeping infant before the parents' bedtime) reduces night wakings.", p: .38, lo: .22, hi: .52, pa: .35, pb: .4, dom: "sleep", sv: ["time"],
      e: "Worked only inside a three-part package in 26 newborns ([[pinilla1993]]); in the 610-infant replication parents would not implement it ([[sjr2001]]). Moving a hunger-driven feed to the adults' bedtime can plausibly remove one later waking, but most arousals are not hunger-driven and rousing a sleeping infant can fragment sleep. More likely to move the waking than remove it." },
    { id: "D5", g: 3, t: "White noise", s: "Continuous white noise improves infant sleep at 4–12 months.", p: .48, lo: .28, hi: .62, pa: .50, pb: .45, dom: "sleep", sv: ["commercial"],
      e: "Faster sleep onset in 40 newborns, 80% vs 25% within 5 minutes ([[spencer1990]]); nothing measured beyond the newborn period, and the wider evidence is very low quality ([[riedy2021]]). Masking intermittent household noise to reduce arousals is a robust mechanism in adults, so the benefit is likeliest for daytime naps in a busy house. Keep machines quiet: all 14 tested exceeded 50 dBA at 30 cm at full volume ([[hugh2014]])." },
    { id: "D6", g: 3, t: "Blackout darkness at night", s: "A dark room during night sleep improves infant sleep compared with dim light.", p: .45, lo: .28, hi: .60, pa: .70, pb: .4, dom: "sleep", sv: ["commercial"], was: "Graded “no evidence either way”",
      e: "An hour of even 5–40 lux before bed suppressed melatonin 69–99% in preschoolers ([[hartstein2022]]), and infant lenses pass more light than adult ones. But that exposure was with eyes open; closed eyelids filter most light during sleep, and there are no infant data. Darkness also blocks summer dawn light, a plausible cause of early waking. A coin-flip for sleep itself, at zero cost. This was the one claim where the two scorers differed by more than 0.2 (0.70 vs 0.40) until pre-bed light was split out (F4)." },
    { id: "D7", g: 3, t: "Blackout darkness for naps", s: "Blackout darkness for daytime naps lengthens naps.", p: .40, lo: .22, hi: .55, pa: .45, pb: .35, dom: "sleep", sv: ["commercial"], was: "Graded “no evidence either way”",
      e: "No data. Reducing visual stimulation during light-sleep transitions plausibly helps link cycles, but naps are only weakly gated by melatonin, daylight exposure helps entrain the clock ([[harrison2004]]), and Nordic outdoor daylight naps are reported as long." },
    { id: "D8", g: 3, t: "Teething disrupts sleep", s: "Teething measurably disrupts night sleep around eruptions.", p: .30, lo: .15, hi: .45, pa: .30, pb: .3, dom: "sleep", sv: ["time"], was: "Graded “contradicted”",
      e: "Camera-measured sleep in 849 infants did not differ on teething nights, though over half of parents reported disturbance ([[kahn2025t]], Nanit-affiliated). But in 475 prospectively recorded eruptions, wakefulness and irritability were associated with the 8-day teething window even though rated “sleep disturbance” was not ([[macknin2000]]), and local inflammation is a plausible arousal source. Unlikely as a general rule; a few wakeful days around some teeth is likely (P ≈ 0.7). The earlier grade omitted the wakefulness finding." },
    { id: "D9", g: 3, t: "A consistent bedtime routine", s: "A consistent bedtime routine improves infant sleep.", p: .75, lo: .60, hi: .87, pa: .80, pb: .7, dom: "sleep", sv: ["commercial"],
      e: "Several RCTs show faster settling and fewer reported wakings within days ([[mindell2009]]), but they are Johnson & Johnson-funded and parent-reported, and the massage-specific trial moved perceptions more than sleep ([[mindell2018]]). Independent actigraphy in 320 six-month-olds links later and irregular routines to shorter, more variable sleep ([[tsai2022]]). Conditioned cues and regularity are sound mechanisms. Bath and lotion are not the active ingredient (P ≈ 0.3)." },
    { id: "D10", g: 3, t: "Iron drops from 4 months", s: "Routine iron drops from 4 months benefit iron-replete breastfed infants.", p: .14, lo: .06, hi: .28, pa: .12, pb: .15, dom: "outcome", sv: ["momentum"],
      e: "In 221 non-anaemic breastfed infants, 1 mg/kg/day from 4 to 9 months changed no Bayley score to 36 months ([[svensson2024]]); iron-replete infants given iron grew less in length and head circumference ([[dewey2002]]). Iron-deficiency anaemia does disturb infant sleep physiology ([[peirano2007]]), so the right move is to measure, not dose blind." },
    { id: "D11", g: 3, t: "There is a correct TOG chart", s: "Following a specific room-temperature or TOG chart improves safety beyond avoiding overheating and head covering.", p: .14, lo: .04, hi: .22, pa: .20, pb: .08, dom: "safety", sv: ["commercial"],
      e: "Overheating is a real risk factor (RR 1.26 per excess tog, [[ponsonby1992]]; infants were harder to rouse at 28°C than at 24°C, [[franco2001]]), but the Lullaby Trust declines tog charts because insulation varies by product ([[lullabytemp]]). A chart adds nothing to “warm chest, no hat, at most one layer more than an adult”." },

    { id: "E1", g: 4, t: "Back to sleep, every sleep", s: "Back sleeping lowers sudden-death risk compared with front or side sleeping.", p: .97, lo: .93, hi: .99, pa: .97, pb: .97, dom: "safety", sv: ["evidence"],
      e: "Prone placement OR 13.1 (8.5–20.2) in 745 cases ([[carpenter2004]]); the back-to-sleep campaigns roughly halved SIDS rates, a population-scale natural experiment; rebreathing and impaired arousal are direct mechanisms." },
    { id: "E2", g: 4, t: "A firm, flat, bare sleep surface", s: "Soft bedding or objects in the sleep space raise sudden-death risk.", p: .95, lo: .90, hi: .98, pa: .95, pb: .95, dom: "safety", sv: ["evidence"],
      e: "Soft bedding aOR 5.0 for unexplained death and 16.3 for suffocation at 2–9 months ([[parks2023]]); head covered by bedding, pooled aOR 16.9 ([[blair2008]]); airway obstruction is visible in death-scene investigations ([[erck2019]])." },
    { id: "E3", g: 4, t: "Never sleep with her on a sofa or recliner", s: "An adult falling asleep with an infant on a sofa, armchair or recliner sharply raises risk.", p: .94, lo: .85, hi: .97, pa: .95, pb: .92, dom: "safety", sv: ["evidence"],
      e: "OR 18.3 at all ages ([[blair2014]]), 24–67 in other studies; 12.9% of sleep-related deaths in 24 states occurred on sofas ([[rechtman2014]]); wedging and entrapment are direct mechanisms. Wide intervals and overlap with alcohol and smoking temper the size, not the direction." },
    { id: "E4", g: 4, t: "No bed-sharing after alcohol or sedatives", s: "Bed-sharing after alcohol or sedating drugs sharply raises risk.", p: .93, lo: .85, hi: .97, pa: .93, pb: .93, dom: "safety", sv: ["evidence"],
      e: "More than 2 units: OR 18.3 at all ages, about 6 in older infants ([[blair2014]]); recent alcohol or drugs in 31% of SIDS co-sleepers vs 3% of controls ([[blair2009]]). Blunted adult arousal is a direct mechanism." },
    { id: "E5", g: 4, t: "Stop swaddling once she can roll", s: "Swaddling once an infant can roll raises risk.", p: .87, lo: .75, hi: .95, pa: .85, pb: .88, dom: "safety", sv: ["evidence"],
      e: "Swaddled and prone OR 12.99 ([[pease2016]]). An arms-bound infant who rolls cannot lift or turn her head. A four-study meta-analysis with heterogeneity, hence below the other rules." },
    { id: "E6", g: 4, t: "Car seats, swings and loungers are not for sleep", s: "Infants left to sleep in sitting devices outside travel face raised risk.", p: .84, lo: .65, hi: .92, pa: .85, pb: .82, dom: "safety", sv: ["evidence"],
      e: "348 of 11,779 sleep-related deaths occurred in sitting devices, 63% in car seats used off-label at home, more often under paid caregivers ([[liaw2019]]); nursing pillows: 154 deaths 2010–2022 ([[cpscpillows]]). No exposure denominators, but positional asphyxia (chin to chest) is a concrete mechanism." },
    { id: "E7", g: 4, t: "Smoke-free home", s: "Pre- or postnatal smoking raises SIDS risk.", p: .95, lo: .90, hi: .98, pa: .95, pb: .95, dom: "safety", sv: ["evidence"],
      e: "Prenatal smoking aOR 2.44 in 20.7 million births, with a dose-response from one cigarette a day ([[anderson2019]]); nicotine affects brainstem arousal circuits in animal work." },

    { id: "F0", g: 5, t: "Move her out of the bassinet now", s: "Continuing in a bassinet after an infant can roll raises risk (falls, entrapment, face-against-side).", p: .73, lo: .50, hi: .85, pa: .75, pb: .7, dom: "safety", sv: ["atlas"],
      e: "The standard's scope ends at about 5 months or pushing up on hands and knees ([[astm2194]]); some makers stop at rolling ([[chicco]]). The mechanisms are concrete: shallow sides and a high centre of gravity once she pushes up, and a small soft-sided space for face-against-side positions. No death series for over-stage use was found, and rolling alone is a weaker trigger than hands-and-knees. Acting costs a crib." },
    { id: "F1", g: 5, t: "Pause 2–4 minutes for non-distress sounds", s: "Pausing 2–4 minutes before responding to stirring, grunting or brief calls increases unaided resettling.", p: .70, lo: .52, hi: .84, pa: .65, pb: .75, dom: "sleep", sv: ["atlas"], was: "Graded “low to moderate”",
      e: "Many such sounds come from active sleep or brief arousals that resolve unaided ([[goodlin2001]]). Longer response time at 3 months predicted self-soothing at 12 ([[burnham2002]]); non-distress interventions slowed consolidation ([[voltaire2018]]); a responsive-parenting trial that taught “give a few minutes” gained 40 reported minutes ([[lavner2023]]). The Pelotas trial's “wait before attending” advice showed no objective effect ([[santos2019]]), which tempers the long-run reading." },
    { id: "F2", g: 5, t: "Walk, then sit, before laying her down", s: "Walking about 5 minutes, then sitting still 5–8 minutes before laying a sleeping infant down, reduces waking on transfer.", p: .65, lo: .45, hi: .80, pa: .70, pb: .6, dom: "sleep", sv: ["atlas"],
      e: "One study (about 21 crying infants; authors hold a related patent) found the laydown outcome depended on minutes asleep beforehand ([[ohmura2022]]). It fits two independent mechanisms: the transport calming response, shown in both human infants and mouse pups ([[esposito2013]]), and infants entering light sleep first and arousing from it easily. Unreplicated and untested at home." },
    { id: "F3", g: 5, t: "Daylight by day helps nights", s: "Bright daytime light exposure, especially in the afternoon, improves infant night sleep.", p: .63, lo: .45, hi: .76, pa: .65, pb: .6, dom: "sleep", sv: ["atlas"],
      e: "Better night sleepers at 6–12 weeks had about twice the noon-to-4 pm light (n = 56, observational, [[harrison2004]]), and young infants spend little of the day above 100 lux ([[tsai2012]]). Daytime light raises circadian amplitude across mammals. At 4 months her rhythm is already entrained, so the effect may be modest." },
    { id: "F4", g: 5, t: "Dim the last hour before bed", s: "Keeping light dim in the hour before bed helps her fall asleep.", p: .60, lo: .42, hi: .75, pa: .60, pb: null, dom: "sleep", sv: ["atlas"],
      e: "In 3–4-year-olds, an hour of 5–5,000 lux before bed suppressed melatonin 69–99% ([[hartstein2022]]); infant lenses transmit more light; her melatonin rhythm is running by 4 months ([[kennaway1992]]). No infant sleep-outcome data. Added after the independent scoring, so it has no second score." },
    { id: "F5", g: 5, t: "Her easy temperament lowers the stakes", s: "Infants high in negative emotionality are more affected by parents' sleep practices than easy infants.", p: .53, lo: .35, hi: .68, pa: .55, pb: .5, dom: "outcome", sv: ["atlas"],
      e: "Differential susceptibility to parenting has meta-analytic support across 84 studies ([[slagt2016]]), though preregistered tests are mixed. For sleep no temperament-by-practice interaction has been tested; one study found moderation by surgency, not negative emotionality ([[jian2016]]). A floor effect supplies a mechanism: an easy sleeper has less signalling for any practice to move." }
  ];

  function fmtP(p) { return p.toFixed(2); }
  function median(a) { var s = a.slice().sort(function (x, y) { return x - y; }); var n = s.length; return n ? (n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2) : NaN; }

  function strip(c) {
    return '<span class="pstrip" aria-hidden="true"><i class="ps-mid"></i><i class="ps-rng" style="left:' + (c.lo * 100) + '%;width:' + ((c.hi - c.lo) * 100) + '%"></i><i class="ps-dot" style="left:' + (c.p * 100) + '%"></i></span>';
  }

  function calibration() {
    var both = CLAIMS.filter(function (c) { return c.pb != null; });
    var diffs = both.map(function (c) { return Math.abs(c.pa - c.pb); });
    var mean = diffs.reduce(function (a, b) { return a + b; }, 0) / diffs.length;
    var host = $("[data-calib]");
    if (host) host.textContent = both.length + " claims were scored twice, by two scorers working independently. Median gap " + fmtP(median(diffs)) + ", mean " + fmtP(mean) + "; " + diffs.filter(function (d) { return d > 0.2; }).length + " gap above 0.2 (D6, resolved by splitting pre-bed light into F4). Each final P is the average of the two scores, except D6, re-scored after the split.";
  }

  function buildDotPlot() {
    var host = $("[data-dotplot]"); if (!host) return;
    var by = "dom";
    var toggle = $("[data-dotby]");
    function rowsFor(mode) {
      if (mode === "dom") return Object.keys(DOM).map(function (k) { return { k: k, label: DOM[k], items: CLAIMS.filter(function (c) { return c.dom === k; }) }; });
      return Object.keys(SERVES).map(function (k) { return { k: k, label: SERVES[k], items: CLAIMS.filter(function (c) { return c.sv.indexOf(k) >= 0; }) }; }).filter(function (r) { return r.items.length; });
    }
    function draw() {
      var trackW = Math.max(200, host.getBoundingClientRect().width - (window.innerWidth >= 720 ? 208 : 0));
      var near = Math.max(0.022, 14 / trackW);
      host.innerHTML = "";
      rowsFor(by).forEach(function (r) {
        var row = el("div", "dp-row");
        var med = median(r.items.map(function (c) { return c.p; }));
        row.appendChild(el("div", "dp-label", r.label + "<small>" + r.items.length + " claims, median " + fmtP(med) + "</small>"));
        var tr = el("div", "dp-track");
        [0.2, 0.4, 0.6, 0.8].forEach(function (t) { var g = el("div", "hb-grid"); g.style.left = (t * 100) + "%"; tr.appendChild(g); });
        var m = el("div", "dp-med"); m.style.left = (med * 100) + "%"; m.title = "Median " + fmtP(med); tr.appendChild(m);
        // simple beeswarm: offset dots that sit within 2.2% of an earlier one
        var placed = [];
        r.items.slice().sort(function (a, b) { return a.p - b.p; }).forEach(function (c) {
          var lane = 0, offsets = [0, -1, 1, -2, 2, -3, 3, -4, 4];
          for (var i = 0; i < offsets.length; i++) {
            var o = offsets[i];
            if (!placed.some(function (q) { return q.lane === o && Math.abs(q.p - c.p) < near; })) { lane = o; break; }
          }
          placed.push({ p: c.p, lane: lane });
          var d = el("button", "dp-dot");
          d.type = "button";
          d.style.left = (c.p * 100) + "%";
          d.style.top = "calc(50% + " + (lane * 8) + "px)";
          d.setAttribute("aria-label", c.id + ", " + c.t + ": P " + fmtP(c.p));
          d.innerHTML = "<i></i>";
          bindTip(d, function () { return "<b>P " + fmtP(c.p) + " · " + bandOf(c.p).label + "</b>" + c.t + "<i>" + c.id + ". Click to open the evidence.</i>"; });
          d.addEventListener("click", function () { openClaim(c.id); });
          tr.appendChild(d);
        });
        row.appendChild(tr);
        host.appendChild(row);
      });
      var axisRow = el("div", "dp-row dp-axisrow"); axisRow.appendChild(el("div"));
      var axis = el("div", "hb-axis");
      [0, 0.2, 0.4, 0.6, 0.8, 1].forEach(function (t) { var s = el("span", null, t === 0 ? "0" : t === 1 ? "1" : fmtP(t)); s.style.left = (t * 100) + "%"; if (t === 0) s.style.transform = "none"; if (t === 1) s.style.transform = "translateX(-100%)"; axis.appendChild(s); });
      axisRow.appendChild(axis);
      host.appendChild(axisRow);
    }
    if (toggle) $$("button", toggle).forEach(function (b) {
      b.addEventListener("click", function () {
        by = b.dataset.by;
        $$("button", toggle).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        draw();
      });
    });
    draw();
    var lastW = window.innerWidth, rt;
    window.addEventListener("resize", function () { if (Math.abs(window.innerWidth - lastW) < 40) return; lastW = window.innerWidth; clearTimeout(rt); rt = setTimeout(draw, 150); });
    var tbl = "<table><thead><tr><th>ID</th><th>Claim</th><th class='num'>P</th><th class='num'>Range</th><th class='num'>Scorer A / B</th><th>Domain</th></tr></thead><tbody>" +
      CLAIMS.slice().sort(function (a, b) { return b.p - a.p; }).map(function (c) {
        return "<tr><td>" + c.id + "</td><td>" + c.t + "</td><td class='num'>" + fmtP(c.p) + "</td><td class='num'>" + fmtP(c.lo) + "–" + fmtP(c.hi) + "</td><td class='num'>" + fmtP(c.pa) + " / " + (c.pb == null ? "—" : fmtP(c.pb)) + "</td><td>" + DOM[c.dom] + "</td></tr>";
      }).join("") + "</tbody></table>";
    var t = $("[data-dottable]"); if (t) t.innerHTML = tbl;
  }

  var claimState = { b: "all", d: "all", s: "all", rev: false, sort: "group" };
  var renderClaims = function () {};
  function openClaim(id) {
    claimState.b = "all"; claimState.d = "all"; claimState.s = "all"; claimState.rev = false;
    $$(".filters .chip").forEach(function (x) { var on = x.dataset.val === "all" && x.dataset.key !== "rev"; if (x.dataset.key === "rev") on = false; x.setAttribute("aria-pressed", on ? "true" : "false"); });
    renderClaims();
    var d = document.getElementById("claim-" + id);
    if (d) { d.open = true; d.scrollIntoView({ block: "center" }); d.querySelector("summary").focus({ preventScroll: true }); }
  }

  function buildClaims() {
    var host = $("[data-claims]"); if (!host) return;
    var bRow = $("[data-filter='band']"), dRow = $("[data-filter='domain']"), sRow = $("[data-filter='serves']"), oRow = $("[data-filter='sort']");
    function chip(row, key, val, label, n, extraCls) {
      var b = el("button", "chip" + (extraCls ? " " + extraCls : ""));
      b.type = "button";
      b.dataset.val = val; b.dataset.key = key;
      var pressed = key === "rev" ? false : key === "sort" ? val === "group" : val === "all";
      b.setAttribute("aria-pressed", pressed ? "true" : "false");
      b.innerHTML = label + (n != null ? ' <span class="n">' + n + "</span>" : "");
      b.addEventListener("click", function () {
        if (key === "rev") { claimState.rev = !claimState.rev; b.setAttribute("aria-pressed", claimState.rev ? "true" : "false"); }
        else {
          claimState[key] = val;
          $$("button", row).forEach(function (x) { if (x.dataset.key === key) x.setAttribute("aria-pressed", x.dataset.val === val ? "true" : "false"); });
        }
        renderClaims();
      });
      row.appendChild(b);
    }
    chip(bRow, "b", "all", "All", CLAIMS.length);
    BANDS.forEach(function (bd) { chip(bRow, "b", bd.k, bd.label, CLAIMS.filter(function (c) { return bandOf(c.p).k === bd.k; }).length); });
    chip(dRow, "d", "all", "All");
    Object.keys(DOM).forEach(function (k) { chip(dRow, "d", k, DOM[k], CLAIMS.filter(function (c) { return c.dom === k; }).length); });
    chip(dRow, "rev", "rev", "Changed in re-score", CLAIMS.filter(function (c) { return c.was; }).length, "chip-rev");
    chip(sRow, "s", "all", "All");
    Object.keys(SERVES).forEach(function (k) { chip(sRow, "s", k, SERVES[k], CLAIMS.filter(function (c) { return c.sv.indexOf(k) >= 0; }).length); });
    chip(oRow, "sort", "group", "By topic");
    chip(oRow, "sort", "p", "By probability");

    function card(c) {
      var d = el("details", "claim");
      d.id = "claim-" + c.id;
      var bd = bandOf(c.p);
      var sum = el("summary");
      sum.innerHTML =
        '<span class="ct"><span class="cid">' + c.id + "</span>" + c.t + "</span>" +
        '<i class="chev" aria-hidden="true"></i>' +
        '<span class="cp"><b class="pn">P ' + fmtP(c.p) + '</b><span class="pb-label">' + bd.label + "</span>" + strip(c) + "</span>" +
        '<span class="cv">' + c.s + ' <span class="serves">' + c.sv.map(function (k) { return "<span>" + SERVES[k] + "</span>"; }).join("") +
        (c.was ? '<span class="revtag">Revised</span>' : "") + "</span></span>";
      d.appendChild(sum);
      var body = el("div", "body",
        '<p><span class="lbl">What sets the number</span>' + cite(c.e) + "</p>" +
        '<p class="meta">Range ' + fmtP(c.lo) + "–" + fmtP(c.hi) + (c.pb != null ? "; scorer A " + fmtP(c.pa) + ", scorer B " + fmtP(c.pb) : "") + (c.was ? "; previously: " + c.was : "") + "</p>");
      d.appendChild(body);
      return d;
    }
    renderClaims = function () {
      host.innerHTML = "";
      var match = function (c) {
        return (claimState.b === "all" || bandOf(c.p).k === claimState.b) && (claimState.d === "all" || c.dom === claimState.d) &&
          (claimState.s === "all" || c.sv.indexOf(claimState.s) >= 0) && (!claimState.rev || c.was);
      };
      var shown = 0;
      if (claimState.sort === "p") {
        var items = CLAIMS.filter(match).sort(function (a, b) { return b.p - a.p; });
        BANDS.forEach(function (bd) {
          var inBand = items.filter(function (c) { return bandOf(c.p).k === bd.k; });
          if (!inBand.length) return;
          host.appendChild(el("h3", "grp", bd.label));
          inBand.forEach(function (c) { shown++; host.appendChild(card(c)); });
        });
      } else {
        GROUPS.forEach(function (gname, gi) {
          var items = CLAIMS.filter(function (c) { return c.g === gi && match(c); });
          if (!items.length) return;
          host.appendChild(el("h3", "grp", gname));
          items.forEach(function (c) { shown++; host.appendChild(card(c)); });
        });
      }
      if (!shown) host.appendChild(el("p", "empty", "No claim matches every filter. Set a filter back to All to see more."));
      $("[data-count]").textContent = "Showing " + shown + " of " + CLAIMS.length + " claims. Open any claim for the evidence and mechanism behind its number.";
    };
    renderClaims();
  }

  /* ---------------- decision rules ---------------- */
  var RULES = [
    ["She pushes up on hands and knees, or the bassinet label names rolling", "Crib, mini crib or play yard tonight", "Bedside sleeper, SNOO, in-bed sleeper", "P 0.73; standard and manufacturer criteria"],
    ["She rolls onto her front asleep", "Leave her if she rolls both ways; always start her on her back", "Positioners, wedges, rolled towels", "AAP guidance; support cushions carry a “not for sleep” rule"],
    ["Whoever is holding her for a nap feels drowsy", "Put her down on her back, or hand her off, at once", "“Rest your eyes”; recline on a sofa or recliner", "P 0.94; sofa OR 18–67"],
    ["A parent wants to sleep beside her", "Prepared bed, both adults sober and rested, mother's side", "The sofa; any night with alcohol, sedating medication or exhaustion", "P 0.38 that a prepared bed adds 1.5-fold risk; P 0.93 for alcohol or sedatives ([[blair2014]]; [[carpenter2013]])"],
    ["She stirs, grunts, fusses or calls briefly at night", "Watch for 2–4 minutes, the latency ordinary parents show", "Lift her at the first sound", "P 0.70; Plate XI"],
    ["She cries in distress", "Respond promptly and fully", "Timed ignoring, at this age or without a problem you yourselves define", "P 0.50 that responsive night care feeds attachment; no body endorses extinction under 6 months"],
    ["A nap ends at 45 minutes", "Content: the nap is over. Upset or irritable afterwards: rock her on", "Run the day by a wake-window clock; keep her awake to “build pressure”", "P 0.12 that extending naps helps; P 0.20 for \u201covertired\u201d ([[franco2004]])"],
    ["Night waking rises alongside crawling or pulling up", "Same responses, same timing, floor practice by day; expect it to pass", "Overhaul the routine", "P 0.75: small actigraphy studies that fit the motor-learning mechanism"],
    ["Three or more wakings nightly for several weeks, loud snoring or laboured breathing, or 24-hour sleep under about 11 h", "Look for illness and sleep-disordered breathing; re-measure ferritin", "Assume it is behavioural", "Persistent breathing symptoms went with 5.3 fewer language points at age 2 ([[smithson2018]])"],
    ["After 6 months you come to regard night waking as a problem", "In order: feed earlier in the routine, put her down awake with a parent present, then graduated checks. Expect improvement in what you notice for 1 in 4 to 1 in 10 infants", "Expect more total sleep (P 0.30), a lasting effect, or the advertised harm (P 0.14) or benefit (P 0.10)", "P 0.85 for fewer signalled wakings; [[korownyk2018]]; [[hall2015]]; [[price2012]]"],
    ["She drops the night feed herself", "Let it go", "Add a dream feed back", "No evidence a feed is required at a given age"],
    ["You want to drop the night feed after 6 months", "Taper gradually, shift intake to the day, keep total daily milk removals up", "Expect longer sleep (P 0.30)", "24-hour intake unchanged when night intervals were stretched in 26 infants ([[pinilla1993]]); supply advice is mechanistic judgement"],
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
    [1, "Unlikely to be confirmed", "Brain or attachment damage from limited crying; attachment dividends from co-sleeping", "P 0.14 and 0.15. Neither claim has direct evidence; the follow-ups that exist are null."],
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
  buildDotPlot();
  calibration();
  buildRules();
  buildLatency();
  buildRev();
  buildBiblio();
})();
