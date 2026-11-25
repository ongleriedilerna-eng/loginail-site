/* 17/11 (Marie, D28) : UN SEUL menu sur tous les sites — trois traits en haut à droite,
   un « rideau » glisse depuis la droite : Accueil · Prestations · Avis · À propos · Bon à savoir · Infos pratiques,
   bouton Réserver, Mentions légales. Couleur et écriture = celles du titre du site.
   Remplace tous les anciens menus (dock, fab, idx, burger, barre-nav, Carré, onglets Coffin). */
(() => {
  const MOTS = {
    fr: { avis: "Avis", infos: "Infos pratiques", res: "Réserver", ml: "Mentions légales", menu: "Menu", fermer: "Fermer le menu" },
    en: { avis: "Reviews", infos: "Practical info", res: "Book", ml: "Legal notice", menu: "Menu", fermer: "Close menu" },
    it: { avis: "Recensioni", infos: "Info pratiche", res: "Prenota", ml: "Note legali", menu: "Menu", fermer: "Chiudi il menu" },
    es: { avis: "Reseñas", infos: "Información práctica", res: "Reservar", ml: "Aviso legal", menu: "Menú", fermer: "Cerrar el menú" },
    de: { avis: "Bewertungen", infos: "Praktische Infos", res: "Buchen", ml: "Impressum", menu: "Menü", fermer: "Menü schließen" }
  };
  const css = document.createElement("style");
  css.textContent = `
  .ecran .fab,.ecran .fab-menu,.ecran .dock,.ecran .dk-panel,.ecran .idx,.ecran .lgt,.ecran .burger,.ecran .menu,.ecran .voileM,
  .ecran .barre-nav,.ecran .mcb-haut,.ecran .mcb-plein,.ecran .cof-barre{display:none!important}
  .lm-btn{position:absolute;top:var(--lm-h,14px);right:14px;z-index:90;width:46px;height:46px;border-radius:23px;border:0;padding:0;cursor:pointer;
    background:var(--lm-b,color-mix(in srgb,var(--lm-c) 86%,transparent));backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
    box-shadow:0 6px 18px -8px rgba(0,0,0,.35);-webkit-tap-highlight-color:transparent;transition:transform .15s}
  .lm-btn:active{transform:scale(.94)}
  .lm-btn i{position:absolute;left:14px;width:18px;height:1.8px;border-radius:2px;background:var(--lm-bi,var(--lm-e));transition:transform .28s cubic-bezier(.32,.72,0,1),opacity .2s}
  .lm-btn i:nth-child(1){top:16.5px}.lm-btn i:nth-child(2){top:22px}.lm-btn i:nth-child(3){top:27.5px}
  .lm-on .lm-btn i:nth-child(1){transform:translateY(5.5px) rotate(45deg)}
  .lm-on .lm-btn i:nth-child(2){opacity:0}
  .lm-on .lm-btn i:nth-child(3){transform:translateY(-5.5px) rotate(-45deg)}
  .lm-voile{position:absolute;inset:0;z-index:80;background:rgba(20,14,15,.32);opacity:0;pointer-events:none;transition:opacity .28s}
  .lm-on .lm-voile{opacity:1;pointer-events:auto}
  .lm-pan{position:absolute;z-index:85;top:0;right:0;bottom:0;width:84%;max-width:380px;box-sizing:border-box;display:flex;flex-direction:column;
    padding:calc(var(--lm-h,14px) + 70px) 26px calc(env(safe-area-inset-bottom,0px) + 28px);overflow-y:auto;
    color:var(--lm-e);background:var(--lm-c);border-radius:26px 0 0 26px;box-shadow:-20px 0 40px -20px rgba(0,0,0,.35);
    transform:translateX(102%);visibility:hidden;transition:transform .32s cubic-bezier(.32,.72,0,1),visibility 0s .32s}
  .lm-on .lm-pan{transform:none;visibility:visible;transition:transform .32s cubic-bezier(.32,.72,0,1),visibility 0s}
  .lm-nom{font:500 10.5px Jost,sans-serif;letter-spacing:.2em;text-transform:uppercase;opacity:.6;line-height:1.5}
  .lm-liste{margin:22px 0 28px}
  html body .ecran .lm-pan a.lm-l{display:flex;align-items:center;justify-content:space-between;gap:10px;text-decoration:none;color:var(--lm-e);
    font-family:var(--lm-p,"Cormorant Garamond",serif)!important;font-size:28px;line-height:1.1;padding:13px 0;cursor:pointer;
    border-bottom:1px solid color-mix(in srgb,var(--lm-e) 14%,transparent);
    opacity:0;transform:translateY(8px);transition:opacity .25s,transform .3s cubic-bezier(.32,.72,0,1)}
  html body .ecran .lm-pan a.lm-l::after{content:"›";font:300 22px Jost,sans-serif;opacity:.45}
  .lm-on .lm-pan a.lm-l{opacity:1!important;transform:none!important}
  .lm-res{flex:none;border:0;border-radius:30px;height:54px;width:100%;background:var(--lm-b,var(--lm-e));color:var(--lm-bi,var(--lm-c));
    font:500 12px Jost,sans-serif;letter-spacing:.16em;text-transform:uppercase;cursor:pointer}
  .lm-leg{margin-top:auto;padding-top:18px;font:400 11px Jost,sans-serif;opacity:.6;text-align:center;color:var(--lm-e);
    text-decoration:underline;text-underline-offset:3px;cursor:pointer;background:none;border:0}
  .lm-langues{display:flex;justify-content:center;gap:6px;margin-top:auto;padding-top:22px}
  .lm-langues button{min-width:44px;height:34px;border-radius:17px;border:1px solid color-mix(in srgb,var(--lm-e) 22%,transparent);background:none;
    color:var(--lm-e);font:500 11px Jost,sans-serif;letter-spacing:.12em;cursor:pointer;padding:0 10px}
  .lm-langues button.on{background:var(--lm-e);color:var(--lm-c);border-color:var(--lm-e)}
  .lm-langues+.lm-leg{margin-top:0;padding-top:14px}
  .lm-sans .lm-pan,.lm-sans .lm-pan a.lm-l,.lm-sans .lm-voile,.lm-sans .lm-btn i{transition:none!important}
  @media (prefers-reduced-motion:reduce){.lm-pan,.lm-pan a.lm-l,.lm-btn i,.lm-voile{transition:none!important}}`;
  document.head.append(css);

  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const visible = el => el && el.offsetParent !== null && el.getBoundingClientRect().width > 0;
  const rgb = c => { c = String(c).trim(); let m = c.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (m) { let h = m[1]; if (h.length === 3) h = h.replace(/./g, x => x + x); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); }
    m = c.match(/rgba?\(([^)]+)\)/); return m ? m[1].split(/[ ,\/]+/).slice(0, 3).map(Number) : [128, 128, 128]; };
  const lum = c => { const [r, g, b] = rgb(c).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; };
  const contraste = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
  const texte = el => (el ? el.textContent : "").replace(/§/g, "").trim();

  /* les rubriques réellement présentes sur SON site, dans l'ordre de la page */
  function rubriques(e, lang) {
    const d = e.querySelector(".defile"), t = (typeof L !== "undefined" && L[lang]) || {}, m = MOTS[lang] || MOTS.fr;
    const secs = [...d.querySelectorAll(".sec")];
    const titre = s => texte(s.querySelector(".ti,.ti3,h2,h3"));
    const par = re => secs.find(s => re.test(titre(s)));
    const parS = k => { const c = d.querySelector(`[data-s="${k}"]`); return c ? (c.closest(".sec") || c) : null; };
    const debut = s => s ? new RegExp("^" + s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") : /^$/;
    const liste = [
      [t.accueil || "Accueil", "haut"],
      [t.presta || "Prestations", parS("presta") || par(debut(t.presta))],
      [m.avis, par(/^(avis|reviews|recensioni)/i) || par(debut(t.avis))],
      [t.apropos || "À propos", parS("apropos") || par(debut(t.apropos))],
      [t.savoir || "Bon à savoir", par(debut(t.savoir)) || par(/^bon à savoir/i)],
      [m.infos, parS("horaires") || par(debut(t.horaires))]
    ];
    return liste.filter(x => x[1]);
  }

  function pose(e, lang) {
    const d = e.querySelector(".defile");
    if (!d || e.querySelector(":scope > .lm-btn")) return;
    lang = lang || e._lmLang || "fr";
    e._lmLang = lang;
    const m = MOTS[lang] || MOTS.fr;
    const nom = (typeof D !== "undefined" && D && D.nom) || (typeof BR !== "undefined" && BR && BR.nom) || "";
    e.insertAdjacentHTML("beforeend", `<div class="lm-voile"></div>
      <nav class="lm-pan" aria-label="${m.menu}" aria-hidden="true"><div class="lm-nom">${esc(nom)}</div><div class="lm-liste"></div>
        <button class="lm-res" data-res>${m.res}</button>
        ${typeof monte === "function" ? `<div class="lm-langues">${["fr", "en", "it", "es", "de"].map(l => `<button class="${l === lang ? "on" : ""}" data-lml="${l}" aria-label="${{ fr: "Français", en: "English", it: "Italiano", es: "Español", de: "Deutsch" }[l]}">${l.toUpperCase()}</button>`).join("")}</div>` : ""}${window.LOGI_LEGAL ? `<button class="lm-leg">${m.ml}</button>` : ""}</nav>
      <button class="lm-btn" aria-label="${m.menu}" aria-expanded="false"><i></i><i></i><i></i></button>`);
    const btn = e.querySelector(":scope > .lm-btn"), pan = e.querySelector(":scope > .lm-pan"), voile = e.querySelector(":scope > .lm-voile");
    let items = [];
    const couleurs = () => {
      /* couleur, fond et écriture pris sur SON site au moment d'ouvrir (le style peut changer dans Personnaliser) */
      const cs = getComputedStyle(e);
      const ti = [...e.querySelectorAll(".hf-nom,.defile h1")].find(visible);
      /* texte = couleur du titre de SON site (claire en mode nuit, foncée le jour) */
      let car = cs.getPropertyValue("--carte").trim();
      if (!car) { const bg = getComputedStyle(d).backgroundColor; car = bg && bg !== "rgba(0, 0, 0, 0)" ? bg : "#FBF8F3"; }
      /* lisibilité : on garde la 1re couleur assez contrastée sur le fond du menu (ex. titre blanc posé sur une photo) */
      const choix = [ti && getComputedStyle(ti).color, cs.getPropertyValue("--encre").trim(), cs.color, "#1E1C1B", "#F6F3EF"].filter(Boolean);
      const enc = choix.find(c => contraste(c, car) >= 4.5) || choix.sort((a, b) => contraste(b, car) - contraste(a, car))[0];
      e.style.setProperty("--lm-e", enc); e.style.setProperty("--lm-c", car);
      if (ti) e.style.setProperty("--lm-p", getComputedStyle(ti).fontFamily);
      /* 25/11 (Marie) : le rond du menu et son bouton Réserver prennent la couleur du bouton « Réserver un créneau » choisi par la pro */
      const cta = [...d.querySelectorAll("[data-res],.cta,.hbtn")].find(b => visible(b) && !b.closest(".lm-pan") && (() => { const c = getComputedStyle(b).backgroundColor; return c && !/rgba\(\d+, \d+, \d+, 0\)|transparent/.test(c); })());
      if (cta) { const cc = getComputedStyle(cta); e.style.setProperty("--lm-b", cc.backgroundColor); e.style.setProperty("--lm-bi", contraste(cc.color, cc.backgroundColor) >= 3 ? cc.color : (lum(cc.backgroundColor) > .4 ? "#1E1C1B" : "#FFFFFF")); }
      else { e.style.removeProperty("--lm-b"); e.style.removeProperty("--lm-bi"); }
      /* sous l'encoche (téléphone dessiné) ou sous la zone de l'heure (vrai téléphone) */
      const ile = e.querySelector(":scope > .ile");
      e.style.setProperty("--lm-h", visible(ile) ? (ile.offsetTop + ile.offsetHeight + 8) + "px" : "calc(env(safe-area-inset-top,0px) + 14px)");
    };
    const ouvre = v => {
      if (v) {
        couleurs();
        items = rubriques(e, e._lmLang);
        pan.querySelector(".lm-liste").innerHTML = items.map((x, i) => `<a class="lm-l" href="#" data-i="${i}" style="transition-delay:${60 + i * 35}ms">${esc(x[0])}</a>`).join("");
      }
      e.classList.toggle("lm-on", v);
      btn.setAttribute("aria-expanded", v); btn.setAttribute("aria-label", v ? m.fermer : m.menu);
      pan.setAttribute("aria-hidden", !v);
    };
    btn.addEventListener("click", ev => { ev.stopPropagation(); ouvre(!e.classList.contains("lm-on")); });
    voile.addEventListener("click", ev => { ev.stopPropagation(); ouvre(false); });
    pan.addEventListener("click", ev => {
      const a = ev.target.closest(".lm-l"); if (!a) return;
      ev.preventDefault(); ev.stopPropagation();
      const cible = items[+a.dataset.i][1]; ouvre(false);
      setTimeout(() => d.scrollTo({ top: cible === "haut" ? 0 : Math.max(0, cible.offsetTop - 70), behavior: "smooth" }), 220);
    });
    /* Réserver : la réservation l'attrape avant nous (data-res) → on ferme dès qu'on appuie */
    pan.querySelector(".lm-res").addEventListener("pointerdown", () => setTimeout(() => ouvre(false), 120));
    /* langue : le site est refait dans la nouvelle langue, le menu reste ouvert (sans rejouer l'animation) */
    pan.querySelectorAll("[data-lml]").forEach(b => b.addEventListener("click", ev => {
      ev.stopPropagation(); const l = b.dataset.lml; if (l === e._lmLang) return;
      const y = e.querySelector(".defile").scrollTop;
      monte(e, l);
      const d2 = e.querySelector(".defile"); if (d2) d2.scrollTop = y;
      if (e._lmOuvre) { e.classList.add("lm-sans"); e._lmOuvre(true); setTimeout(() => e.classList.remove("lm-sans"), 60); }
      /* le titre du site finit de se dessiner juste après : on reprend ses couleurs */
      [120, 400, 900].forEach(t => setTimeout(() => e._lmCouleurs && e._lmCouleurs(), t));
    }));
    const leg = pan.querySelector(".lm-leg");
    if (leg) leg.addEventListener("click", ev => { ev.stopPropagation(); ouvre(false); setTimeout(() => window.LOGI_LEGAL && window.LOGI_LEGAL.ouvre("ml"), 200); });
    e._lmOuvre = ouvre;
    e._lmCouleurs = couleurs;
    couleurs();
  }

  /* le site est refait à chaque changement de langue ou de style : on repose le menu après */
  if (typeof monte === "function") {
    const avant = monte;
    monte = function (ecran, lang) { const r = avant.apply(this, arguments); try { ecran._lmLang = lang; pose(ecran, lang); } catch (err) { console.warn(err); } return r; };
  }
  /* pose le menu sur chaque site, et remet ses couleurs à jour quand le style change (Personnaliser) */
  let prevu = 0;
  const tout = () => { if (prevu) return; prevu = requestAnimationFrame(() => { prevu = 0;
    document.querySelectorAll(".ecran").forEach(e => { if (!e.querySelector(":scope > .defile")) return; pose(e);
      const k = e.className.replace(/\s*lm-on/, ""); if (e._lmCls !== k) { e._lmCls = k; try { e._lmCouleurs && e._lmCouleurs(); } catch (err) {} } }); }); };
  new MutationObserver(tout).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
  setTimeout(tout, 300);
})();
