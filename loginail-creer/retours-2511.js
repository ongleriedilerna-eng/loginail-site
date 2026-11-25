/* 25/11 (Marie) : retours sur le site des salons
   1. Les charms : la cliente peut jouer avec. Un toucher = le charm saute et tourne ; pendant 4 s il se laisse
      ensuite attraper et lancer. Règle du 15/11 gardée : un charm posé sur un bouton ne bloque jamais le bouton.
   2. « Message » et « WhatsApp » : le texte est déjà écrit avec la prestation que la cliente a touchée
      (« Bonjour, je souhaiterais prendre rendez-vous pour : Pose américaine. »). Gratuit : c'est son téléphone qui envoie. */
(() => {
  const BOUTON = "a,button,input,select,textarea,label,summary,[data-res],[role=button],.pk-c,.tir-h,.lm-btn,.lm-pan,.x-pil";
  const mouvementDoux = !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* ---------- 1. jouer avec les charms ---------- */
  const saute = el => {
    const corps = el.querySelector(".ch-corps"); if (!corps || !mouvementDoux) return;
    corps.classList.remove("saute"); void corps.offsetWidth; corps.classList.add("saute");
    clearTimeout(corps._st); corps._st = setTimeout(() => corps.classList.remove("saute"), 650);
  };
  const reveille = el => { el.classList.add("eveille"); clearTimeout(el._ev); el._ev = setTimeout(() => el.classList.remove("eveille"), 4000); };
  const charmSous = (x, y) => {
    const l = [...document.querySelectorAll(".ch-couche .charm")].reverse();
    return l.find(c => { const r = c.getBoundingClientRect(); return r.width && x >= r.left + 6 && x <= r.right - 6 && y >= r.top + 6 && y <= r.bottom - 6; });
  };
  const etatDe = el => { const def = el.closest(".defile"); return def && def._ch ? def._ch.items.find(c => c.el === el) : null; };
  let jeu = null, bloqueClic = 0;
  document.addEventListener("pointerdown", e => {
    if (window.CH_PLACER || e.button > 0) return;
    const direct = e.target.closest && e.target.closest(".ch-couche .charm");
    if (direct) { const c = etatDe(direct); jeu = { el: direct, x: e.clientX, y: e.clientY, t: performance.now(), direct: true, c, mode: c && c.mode, y0: c && c.y }; return; }
    if (e.target.closest && e.target.closest(BOUTON)) return;          /* le bouton gagne toujours */
    const el = charmSous(e.clientX, e.clientY); if (!el) return;
    jeu = { el, x: e.clientX, y: e.clientY, t: performance.now(), direct: false };
  }, true);
  document.addEventListener("pointerup", e => {
    const j = jeu; jeu = null; if (!j) return;
    const tape = Math.hypot(e.clientX - j.x, e.clientY - j.y) < 10 && performance.now() - j.t < 450;
    if (!tape) return;
    if (j.direct && j.c) {
      /* un simple toucher sur un charm réveillé : il saute sur place au lieu de s'envoler */
      const c = j.c, m = j.mode, y0 = j.y0;
      setTimeout(() => { if (m === "haut" || m === "sol") { c.mode = m; c.vy = 0; c.y = y0; } }, 0);
    }
    if (!j.direct) bloqueClic = performance.now();
    saute(j.el); reveille(j.el);
  }, true);
  document.addEventListener("pointercancel", () => { jeu = null; }, true);
  /* le toucher sur le charm ne déclenche pas aussi ce qu'il y a dessous (photo, carte…) */
  document.addEventListener("click", e => { if (performance.now() - bloqueClic < 500) { bloqueClic = 0; e.preventDefault(); e.stopPropagation(); } }, true);

  /* ---------- 2. message déjà écrit ---------- */
  const MSG = {
    fr: ["Bonjour, je souhaiterais prendre rendez-vous pour : ", "Bonjour, je souhaiterais prendre rendez-vous."],
    en: ["Hello, I would like to book an appointment for: ", "Hello, I would like to book an appointment."],
    it: ["Buongiorno, vorrei prenotare un appuntamento per: ", "Buongiorno, vorrei prenotare un appuntamento."],
    es: ["Hola, me gustaría reservar una cita para: ", "Hola, me gustaría reservar una cita."],
    de: ["Hallo, ich möchte gerne einen Termin buchen für: ", "Hallo, ich möchte gerne einen Termin buchen."]
  };
  let presta = null;   /* { nom, t } : la dernière prestation touchée */
  const nomDe = el => {
    if (el.dataset.pn) return el.dataset.pn;
    const n = el.querySelector && el.querySelector(".prd-n");
    if (n) return n.textContent;
    return el.dataset.n || "";
  };
  document.addEventListener("pointerdown", e => {
    const el = e.target.closest && e.target.closest("[data-pn],.prd-r,.rowf[data-n],.mini2[data-n],.chip[data-n]");
    if (!el || el.closest(".ch-couche")) return;
    const nom = String(nomDe(el) || "").replace(/\s+/g, " ").trim();
    if (nom) presta = { nom: nom.slice(0, 80), t: Date.now() };
  }, true);
  const texte = a => {
    const ec = a.closest(".ecran"), l = (ec && ec._lang) || document.documentElement.lang || "fr", m = MSG[l] || MSG.fr;
    return presta && Date.now() - presta.t < 15 * 60 * 1000 ? m[0] + presta.nom + "." : m[1];
  };
  document.addEventListener("click", e => {
    const a = e.target.closest && e.target.closest('a[href^="sms:"],a[href*="wa.me/"]'); if (!a) return;
    const h = a.getAttribute("href") || "";
    if (/[?&](body|text)=/.test(h) && !a.hasAttribute("data-lg-msg")) return;   /* un message déjà prévu (ex. le midi) : on n'y touche pas */
    a.setAttribute("data-lg-msg", "");
    const txt = encodeURIComponent(texte(a));
    if (h.startsWith("sms:")) a.setAttribute("href", "sms:" + h.slice(4).split(/[?&]/)[0] + "?&body=" + txt);
    else a.setAttribute("href", h.split("?")[0] + "?text=" + txt);
  }, true);
})();
