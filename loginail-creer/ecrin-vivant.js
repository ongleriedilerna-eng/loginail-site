/* 20/11 (Marie, D63) : « Écrin vivant », le nouvel habit du BAS des sites des prothésistes (tous les salons, les 3 styles ;
   sur ordinateur le site s'affiche dans un téléphone, c'est donc le même habit).
   Maquette de référence : site/idees/relief-looks.html?v=vivant (habit d'origine : idees/relief-ecrin.css/js + idees/relief-x.js).
   Rien n'est enlevé du site : on ajoute des classes et quelques petits éléments ; tous les clics restent ceux du site.
   Couleurs : celles du salon (couleur du bouton Réserver, couleur du site) ; écriture des grands titres = celle du NOM du salon.
   Branché après chaque monte() (changement de langue ou de style), comme menu-site.js. CSS : ecrin-vivant.css. */
(function () {
  const calme = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SURTITRE = { presta: ["Le menu", "Mes <em>prestations</em>"], real: ["Mon travail", "Mes <em>réalisations</em>"], avis: ["Elles en parlent", null],
    moi: ["Qui suis-je", "À <em>propos</em>"], salon: ["Où me trouver", "Le <em>salon</em>"], visite: ["Comment ça marche", "Première <em>visite&nbsp;?</em>"],
    avant: ["Petit mot", "Avant votre <em>rendez&#8209;vous</em>"], savoir: ["Pratique", "Bon à <em>savoir</em>"], horaires: ["Quand venir", "Mes <em>horaires</em>"],
    acces: ["Accès", "Comment <em>venir</em>"], insta: ["Suivez-moi", "Sur <em>Instagram</em>"], faq: ["Vous vous demandez", null], offres: ["Les offres", null] };
  /* chaque rubrique est reconnue par ce qu'elle contient (pas par son titre : le site existe en 5 langues) */
  const QUOI = [["presta", ".tir,.onglets,.liste,.pk,.pc,.rowf,.pcard,.seg"], ["real", ".car,.unepar,.rmos,.cen,.flc,.vth"], ["avis", ".al,.ava,.al-tete"],
    ["moi", ".mots,.moi-q,.cit,.tape,.surphoto,.sign"], ["salon", ".cadre,.cadre2,.sal-tx,.sal-dg,.sal-rd,.salc2"], ["visite", "ol.visite"], ["avant", "ul.avant"],
    ["savoir", ".puce,.tuiles,.ronds,.tags,.flot"], ["horaires", ".infos,.hp,.planfond"], ["acces", "dl.acces"], ["insta", ".insta,.igprof,.ig-top,.ig3,.ig4"], ["faq", ".bul"], ["offres", ".tickets"]];

  function habille(ecran) {
    if (!ecran) return; const DF = ecran.querySelector(".defile"); if (!DF) return;
    if (DF._ecrinAC) DF._ecrinAC.abort(); const AC = new AbortController(), sig = { signal: AC.signal, passive: true }; DF._ecrinAC = AC;
    (DF._ecrinIO || []).forEach(o => o.disconnect()); DF._ecrinIO = []; const IO = (f, o) => { const x = new IntersectionObserver(f, Object.assign({ root: DF }, o)); DF._ecrinIO.push(x); return x; };
    ecran.classList.add("ecrin");
    const fr = !ecran._lang || ecran._lang === "fr";
    const btn = ecran.querySelector(".hent [data-res],.hent .he-btn") || ecran.querySelector("[data-res]"), h1 = ecran.querySelector(".hent h1,h1");
    /* la couleur d'accent : celle du bouton Réserver si elle est bien pleine (certains boutons sont « en verre », presque transparents),
       sinon la couleur des boutons du site (--btn), sinon la couleur du nom, sinon un brun foncé */
    const plein = c => { const m = String(c || "").match(/rgba?\(([^)]+)\)/); if (!m) return false; const v = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); const a = v.length > 3 ? v[3] : 1;
      const lum = (v[0] * .299 + v[1] * .587 + v[2] * .114) / 255; return a > .6 && lum < .8; };
    const autres = [...ecran.querySelectorAll(".btns .plein,.onglets button.on,.hp .plein,.bouton,.pc-cat .on,.seg .on")].map(e => getComputedStyle(e).backgroundColor);
    const cands = [btn && getComputedStyle(btn).backgroundColor, ...autres, getComputedStyle(ecran).getPropertyValue("--btn").trim(), h1 && getComputedStyle(h1).color];
    const probe = document.createElement("i"); probe.style.cssText = "position:absolute;visibility:hidden"; ecran.appendChild(probe);
    const acc = cands.map(c => { if (!c) return ""; probe.style.color = ""; probe.style.color = c; return getComputedStyle(probe).color; }).find(plein); probe.remove();
    ecran.style.setProperty("--e-acc", acc || "#2A1B1E");
    if (h1) ecran.style.setProperty("--e-titre", getComputedStyle(h1).fontFamily);
    const secs = [...DF.querySelectorAll(":scope>.sec")];
    secs.forEach(s => { s.classList.remove(...[...s.classList].filter(c => c.startsWith("e-")));
      const q = QUOI.find(([, sel]) => s.querySelector(sel)); if (q) { s.classList.add("e-" + q[0]); s.dataset.ecrin = q[0]; } });
    /* titres : petit surtitre + grand titre dans l'écriture du nom */
    secs.forEach(s => { const t = s.querySelector(":scope>.ti,:scope>.ti3"); if (!t || t.querySelector(".e-tt")) return;
      const k = s.dataset.ecrin, sur = fr && SURTITRE[k] ? SURTITRE[k] : null;
      const brut = [...t.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join("").trim() || t.textContent.trim();
      t.classList.add("e-titre");
      t.innerHTML = `${sur ? `<small>${sur[0]}</small>` : ""}<span class="e-tt">${sur && sur[1] ? sur[1] : brut}</span>`; });
    /* prestations : une photo de ses réalisations sur chaque catégorie, le trait entre nom et prix, les lignes qui tombent à l'ouverture */
    const ph = [...ecran.querySelectorAll(".e-real img")].map(i => i.currentSrc || i.src).filter(Boolean);
    ecran.querySelectorAll(".e-presta .tir-h").forEach((h, i) => { if (!ph.length || h.querySelector(".e-vi")) return; const im = document.createElement("img"); im.className = "e-vi"; im.alt = ""; im.loading = "lazy"; im.src = ph[(i + 1) % ph.length]; h.prepend(im); });
    ecran.querySelectorAll(".e-presta .pk-t").forEach(t => { if (t.querySelector(".x-trait")) return; const pp = t.querySelector(".pp"); if (pp) { const tr = document.createElement("i"); tr.className = "x-trait"; pp.before(tr); } });
    ecran.querySelectorAll(".e-presta .tir").forEach(tir => { if (tir._eMO) return; tir._eMO = new MutationObserver(() => { if (!tir.classList.contains("ouv")) return;
      tir.querySelectorAll(".pk-c").forEach((c, i) => { c.style.setProperty("--k", i); c.classList.remove("x-tombe"); void c.offsetWidth; c.classList.add("x-tombe"); }); }); tir._eMO.observe(tir, { attributes: true, attributeFilter: ["class"] }); });
    /* réalisations : la photo du milieu passe devant + « Je veux ces ongles » (ouvre la réservation) */
    const car = ecran.querySelector(".e-real .car");
    if (car) { car.querySelectorAll(":scope>img").forEach(im => { const w = document.createElement("span"); w.className = "x-cadre"; im.before(w); w.appendChild(im);
        const b = document.createElement("button"); b.type = "button"; b.className = "x-veux"; b.setAttribute("data-res", ""); b.innerHTML = fr ? "♡ Je veux ces ongles" : "♡ Book this look"; w.appendChild(b); });
      let at = false; const maj = () => { at = false; const c = car.scrollLeft + car.clientWidth / 2; let best = null, d = 1e9; [...car.children].forEach(p => { const m = Math.abs(p.offsetLeft + p.offsetWidth / 2 - c); if (m < d) { d = m; best = p; } }); [...car.children].forEach(p => p.classList.toggle("e-on", p === best)); };
      car.addEventListener("scroll", () => { if (!at) { at = true; requestAnimationFrame(maj); setTimeout(() => { if (at) maj(); }, 120); } }, sig); maj(); }
    /* bon à savoir : un symbole et un titre court par info */
    ecran.querySelectorAll(".e-savoir .puce").forEach(p => { if (p.querySelector(".e-sy")) return; const t = p.textContent.toLowerCase();
      const s = /parking|park/.test(t) ? "P" : /paiement|espèce|carte|pay|cash/.test(t) ? "€" : /toilette|toilet|wc/.test(t) ? "WC" : /fauteuil|accessible|wheelchair/.test(t) ? "FAUT" : /acompte|annul|retard|deposit|cancel/.test(t) ? "!" : "✦";
      const i = document.createElement("i"); i.className = "e-sy";
      if (s === "FAUT") i.innerHTML = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="4" r="1.6" fill="currentColor"/><path d="M11 7v6h6l2 5"/><path d="M8.5 10.5a5.5 5.5 0 1 0 7 7"/></svg>'; else i.textContent = s;
      if (/^(pas |non |no )/.test(t.trim())) p.classList.add("e-non");
      const nodes = [...p.childNodes].filter(n => n.nodeType === 3), brut = nodes.map(n => n.textContent).join("").trim(), m = brut.match(/^([^:]+):\s*(.+)$/);
      const tit = m ? m[1].trim() : brut, det = m ? m[2].trim() : ""; nodes.forEach(n => n.remove());
      const lb = document.createElement("span"); lb.className = "e-lb"; lb.innerHTML = `<b>${tit.charAt(0).toUpperCase() + tit.slice(1)}</b>${det ? `<em>${det.charAt(0).toUpperCase() + det.slice(1)}</em>` : ""}`;
      p.prepend(lb); p.prepend(i); });
    { const ps = ecran.querySelectorAll(".e-savoir .puce"); if (ps.length) { ps[0].classList.add("e-prem"); ps[ps.length - 1].classList.add("e-der"); } }
    /* horaires : « Ouvert · encore 2 h 15 » en grand + la semaine en 7 pastilles (style avec la liste .infos) */
    const inf = ecran.querySelector(".e-horaires .infos");
    if (inf && !inf.querySelector(".e-sem")) { const H = [...inf.querySelectorAll(".h")];
      if (H.length === 7) { const J = H.map(h => { const s = h.querySelectorAll("span"); return { n: s[0].textContent.trim(), v: s[s.length - 1].textContent.trim(), auj: h.classList.contains("auj") }; });
        const fe = v => !/\d/.test(v), ia = Math.max(0, J.findIndex(j => j.auj)), ja = J[ia], hh = t => { const m = String(t).match(/(\d+)\s*h\s*(\d*)/); return m ? (+m[1]) + (+(m[2] || 0)) / 60 : null; };
        const pl = ja.v.split(/[–-]/).map(hh), now = new Date(), hn = now.getHours() + now.getMinutes() / 60, ferme = fe(ja.v), ouvert = !ferme && pl[0] != null && hn >= pl[0] && hn < pl[1];
        const debut = ja.v.split(/[–-]/)[0].trim(); let proch = ""; for (let k = 1; k <= 7; k++) { const j = J[(ia + k) % 7]; if (!fe(j.v)) { proch = `${k === 1 ? (fr ? "demain" : "tomorrow") : j.n.toLowerCase()} ${fr ? "à" : "at"} ${j.v.split(/[–-]/)[0].trim()}`; break; } }
        const reste = ouvert ? pl[1] - hn : 0, rh = Math.floor(reste), rm = Math.round((reste - rh) * 60);
        const etat = fr ? (ferme ? "Fermé aujourd'hui" : ouvert ? `Ouvert · encore ${rh ? rh + " h " + String(rm).padStart(2, "0") : rm + " min"}` : hn < pl[0] ? `Ouvre à ${debut}` : "Fermé pour aujourd'hui")
          : (ferme ? "Closed today" : ouvert ? "Open now" : hn < pl[0] ? `Opens at ${debut}` : "Closed for today");
        const sous = (ferme || (!ouvert && hn >= pl[1])) ? (fr ? "Réouverture " : "Reopens ") + proch : `${fr ? "Aujourd'hui" : "Today"} · ${ja.v}`;
        const sem = document.createElement("div"); sem.className = "e-sem";
        sem.innerHTML = `<div class="e-etat ${ouvert ? "e-ok" : ""}"><i></i><div><b>${etat}</b><span>${sous}</span></div></div><div class="e-pills">${J.map(j => `<div class="e-pi ${j.auj ? "e-auj" : ""} ${fe(j.v) ? "e-fe" : ""}"><small>${j.n.slice(0, 1)}</small><span>${fe(j.v) ? "—" : j.v.replace(/\s/g, "").replace(/[–-]/, "<br>")}</span></div>`).join("")}</div>`;
        inf.prepend(sem); inf.classList.add("e-a-sem"); } }
    /* (le voile qui se lève sur les grandes photos a été retiré : si le mouvement ne démarre pas, la photo resterait cachée) */
    /* les titres « vernis qui sèche » : chaque lettre devient nette au fil du doigt (et repart si on remonte) */
    if (!calme) { const tis = []; ecran.querySelectorAll(".e-titre .e-tt").forEach(sp => { if (sp.dataset.x) return; sp.dataset.x = 1;
        const w = document.createTreeWalker(sp, NodeFilter.SHOW_TEXT), ns = []; while (w.nextNode()) ns.push(w.currentNode); const ls = [];
        ns.forEach(n => { const f = document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(m => { if (!m) return; if (/^\s+$/.test(m)) { f.appendChild(document.createTextNode(m)); return; }
          const w = document.createElement("span"); w.className = "x-w"; [...m].forEach(c => { const i = document.createElement("i"); i.className = "x-l"; i.textContent = c; w.appendChild(i); ls.push(i); }); f.appendChild(w); }); n.replaceWith(f); });
        tis.push({ sp, ls }); });
      let at = false; const peint = () => { at = false; const h = DF.clientHeight, top = DF.getBoundingClientRect().top; tis.forEach(({ sp, ls }) => { const y = sp.getBoundingClientRect().top - top; if (y < -80 || y > h + 40) return;
          const k = Math.max(0, Math.min(1, (h * .88 - y) / (h * .33))); ls.forEach((l, i) => { const q = Math.max(0, Math.min(1, k * 1.6 - i / ls.length * .6));
            l.style.transform = q >= 1 ? "" : `translateY(${((1 - q) * 7).toFixed(1)}px) scaleY(${(1 + (1 - q) * .1).toFixed(3)})`; l.style.opacity = q >= 1 ? "" : (.35 + q * .65).toFixed(2); }); }); };
      DF.addEventListener("scroll", () => { if (!at) { at = true; requestAnimationFrame(peint); setTimeout(() => { if (at) peint(); }, 120); } }, sig); peint(); }
    /* appui : ce qu'on touche s'enfonce un peu */
    DF.addEventListener("pointerdown", e => { const c = e.target.closest(".pk-c,.tir-h,.x-veux"); if (!c) return; c.classList.add("x-appui"); const f = () => c.classList.remove("x-appui"); addEventListener("pointerup", f, { once: true }); addEventListener("pointercancel", f, { once: true }); }, sig);
    /* la pilule « Réserver » : apparaît une fois l'en-tête passé, se cache aux Horaires (qui ont leur bouton) */
    ecran.querySelectorAll(":scope>.x-pil").forEach(x => x.remove());
    const vraiSite = document.documentElement.classList.contains("public") || document.documentElement.classList.contains("vuappli");
    if (btn && vraiSite) { const pr = ((btn.querySelector("small") || {}).textContent || "").trim();
      const p = document.createElement("button"); p.type = "button"; p.className = "x-pil"; p.setAttribute("data-res", "");
      p.innerHTML = `<span><b>${fr ? "Réserver" : (btn.childNodes[0] && btn.childNodes[0].textContent.trim()) || "Book"}</b>${pr ? `<small>${pr.replace(/^Prochain créneau\s*:\s*/i, "Prochain : ")}</small>` : ""}</span><i>›</i>`; ecran.appendChild(p);
      const hent = DF.querySelector(".hent,[data-s='accueil']"), hor = ecran.querySelector(".e-horaires");
      let at = false; const maj = () => { at = false; const top = DF.getBoundingClientRect().top, h = DF.clientHeight;
        const passe = hent ? hent.getBoundingClientRect().bottom - top < 60 : DF.scrollTop > 500, auxH = hor && hor.getBoundingClientRect().top - top < h * .75 && hor.getBoundingClientRect().bottom - top > 0;
        p.classList.toggle("x-on", passe && !auxH && !ecran.querySelector(".resbar.on,.dock.on")); };
      DF.addEventListener("scroll", () => { if (!at) { at = true; requestAnimationFrame(maj); setTimeout(() => { if (at) maj(); }, 120); } }, sig); maj(); }
  }
  window.ecrinVivant = habille;
  /* après chaque monte() (langue, style…) et aussi un peu plus tard (les rubriques ajoutées après coup) */
  const lance = e => { habille(e); setTimeout(() => habille(e), 700); };
  if (typeof monte === "function") { const avant = monte; monte = function (ecran) { const r = avant.apply(this, arguments); try { lance(ecran); } catch (err) { console.warn(err); } return r; }; }
  document.querySelectorAll(".ecran").forEach(e => { if (e.querySelector(".defile .sec")) lance(e); });
})();
