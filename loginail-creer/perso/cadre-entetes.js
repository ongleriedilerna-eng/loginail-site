/* 23/11 (Marie : « replacer les en-têtes dans leurs carrés, la boule disco est coupée ») :
   chaque en-tête peut avoir SON cadrage dans son petit carré de Personnaliser (pour toutes les prothésistes).
   x, y = le coin haut-gauche de ce qu'on voit, en pixels du téléphone (390 de large) ; z = le zoom (1 = tout le haut du téléphone).
   Les réglages de Marie sont écrits ici (ENT_CADRE). Mode réglage : personnaliser.html?cadrer=1 (glisser = déplacer, boutons − + = zoom). */
/* Les 19 carrés placés à la main par Marie (23/11) : ils servent de modèle à la règle automatique plus bas */
window.ENT_CADRE = {"hticket":{"x":4,"y":385,"z":1},"feed":{"x":-1,"y":54,"z":1},"xbulch":{"x":7,"y":63,"z":1},"xloge":{"x":-1,"y":79,"z":1},"xgum":{"x":0,"y":79,"z":1},"xguirch":{"x":4,"y":66,"z":1},"xperles":{"x":3,"y":70,"z":1},"xbracelet":{"x":7,"y":60,"z":1},"disco":{"x":0,"y":76,"z":1},"xlecteur":{"x":6,"y":69,"z":1},"live":{"x":9,"y":79,"z":1},"diamant":{"x":1,"y":25,"z":1},"zfeu":{"x":-11,"y":5,"z":1},"xnuancier":{"x":3,"y":66,"z":1},"xreac":{"x":13,"y":70,"z":1},"xbonbons":{"x":7,"y":64,"z":1},"medaillon":{"x":0,"y":51,"z":1},"hflacon":{"x":-4,"y":-5,"z":0.967}};

(function () {
  const reglage = /[?&]cadrer=1/.test(location.search), CLE = "cadreEnt";
  if (reglage) { try { Object.assign(window.ENT_CADRE, JSON.parse(localStorage.getItem(CLE) || "{}")); } catch (e) {} }
  /* La règle de Marie, pour toutes les autres en-têtes (calculée sur le vrai dessin, donc juste pour chaque salon) :
     - grande photo (plus haute que le carré) : on saute la barre du haut, la photo commence 14 px sous le haut du carré ;
     - petite photo (médaillon, diamant, bijou…) : centrée dans le carré, un peu dézoomée si elle est presque aussi grande que lui ;
     - « habits » du carré Réserver (ticket, flacon…) : centré sur l'habit. */
  const AUTO = {};
  /* la place d'un élément sur le téléphone (en comptant le « translate » que le site ajoute, ex. la carte remontée au-dessus du bouton) */
  const dec = x => { try { const v = (x.style.translate || "").split(/\s+/).map(parseFloat); return [v[0] || 0, v[1] || 0]; } catch (e) { return [0, 0]; } };
  const pos = (e, c) => { let t = 0, l = 0, x = e; while (x && x !== c) { t += x.offsetTop; l += x.offsetLeft; x = x.offsetParent; }
    for (let y = e; y && y !== c; y = y.parentElement) { const d = dec(y); l += d[0]; t += d[1]; } return { t, l, h: e.offsetHeight, w: e.offsetWidth }; };
  const centre = p => { const z = Math.max(.6, Math.min(1, 390 / (p.h + 88), 390 / (p.w + 40))), v = 390 / z; return { x: Math.round((390 - v) / 2), y: Math.round(p.t + p.h / 2 - v / 2), z: +z.toFixed(3) }; };
  /* 24/11 (Marie : « bien au milieu, bien centré ») : le sujet au centre du carré, en largeur ET en hauteur, dézoomé juste ce qu'il faut pour le voir en entier */
  /* la place VUE à l'écran (la carte du nom est parfois remontée par le site) */
  const vrai = (e, c) => { const r = e.getBoundingClientRect(), q = c.getBoundingClientRect(), s = (q.width / 390) || 1; return { l: (r.left - q.left) / s, t: (r.top - q.top) / s, w: r.width / s, h: r.height / s }; };
  const vise = (p, zmin) => { const z = Math.max(zmin || .6, Math.min(1, 390 / (p.h + 40), 390 / (p.w + 40))), v = 390 / z; return { x: Math.round(p.l + p.w / 2 - v / 2), y: Math.round(p.t + p.h / 2 - v / 2), z: +z.toFixed(3) }; };
  const unit = L => { const l = Math.min(...L.map(p => p.l)), t = Math.min(...L.map(p => p.t)); return { l, t, w: Math.max(...L.map(p => p.l + p.w)) - l, h: Math.max(...L.map(p => p.t + p.h)) - t }; };
  const auto = (c, k) => { try {
      /* Enseigne, Notification, Cachet : l'effet, c'est la carte elle-même (néon, notification, tampon rond) → on la montre en entier, au milieu */
      if (/^w(enseigne|notif|cachet|cachet2)$/.test(k)) { const e = c.querySelector(".pz-cd"); if (e) { const r = vise(vrai(e, c), .8); r.y = Math.max(0, r.y); return r; } }
      /* Étoile de charms : on cache la carte, l'étoile (autour de la carte) au milieu */
      if (k === "wetoile") { const e = c.querySelector(".pz-cd"), p = e && vrai(e, c); c.querySelectorAll(".pz-blk,.pz-cd,.hent>.he-txt").forEach(x => x.style.visibility = "hidden"); if (e) { return { x: 0, y: Math.round(p.t + p.h / 2 - 195), z: 1 }; } }
      /* Tache d'aquarelle : les deux taches ensemble, au milieu */
      if (k === "aquarelle") { const L = [...c.querySelectorAll(".ux-ta")].map(e => pos(e, c)); if (L.length) return vise(unit(L), .8); }
      /* Ondes, Tap, Bijou serti : le cadre de la photo en entier, au milieu */
      if (/^(ondes|xtap|bijou)$/.test(k)) { const e = c.querySelector(".tx-cad,.wx-cad,.mx-bj") || c.querySelector(".he-ph"); if (e) return vise(pos(e, c), .8); }
      if (/^h(ticket|flacon|arche|sans)$/.test(k)) { const e = c.querySelector(".hb-tk") || c.querySelector(".hb-verre .he-ph") || c.querySelector(".hent .he-txt"); return e ? centre(pos(e, c)) : null; }
      /* 24/11 (Marie : « Enseigne, Télécabine, Étoiles filantes, Grand huit… c'est mal foutu ») : photo sur tout l'écran + carte du nom par-dessus,
         coupée en bas du carré → dans le carré on cache la carte (on voit la photo et son effet) ; si la photo est plus bas (Étoiles filantes), on descend jusqu'à elle */
      if (c.querySelector(".pz-st")) { c.querySelectorAll(".pz-blk,.pz-cd,.hent>.he-txt").forEach(e => e.style.visibility = "hidden");
        const b = [...c.querySelectorAll(".he-ph")].map(e => pos(e, c)).find(p => p.t > 150 && p.h > 200); return { x: 0, y: b ? b.t - 14 : 60, z: 1 }; }
      const L = [...c.querySelectorAll(".he-ph,[class$='-ph'],[class*='-ph ']")].map(e => pos(e, c)).filter(p => p.w > 80 && p.h > 80 && !(p.w > 385 && p.h > 700));
      if (!L.length) return null; const p = L.sort((a, b) => b.w * b.h - a.w * a.h)[0];
      return p.h >= 390 ? { x: 0, y: Math.max(0, p.t - 14), z: 1 } : centre(p);
    } catch (e) { return null; } };
  const tr = (k, sc) => { const r = window.ENT_CADRE[k] || AUTO[k]; if (!r) return `scale(${sc})`; const z = r.z || 1; return `scale(${sc * z}) translate(${-(r.x || 0)}px,${-(r.y || 0)}px)`; };
  window.ENT_TR = tr;
  window.ENT_PLACE = (c, k, sc) => { if (!window.ENT_CADRE[k]) { const a = auto(c, k); if (a) AUTO[k] = a; else delete AUTO[k]; } c.style.transform = tr(k, sc); };
  window.ENT_AUTO = AUTO;
  if (!reglage) return;

  /* ---------- mode réglage (Marie seulement) ---------- */
  const sauve = () => { try { localStorage.setItem(CLE, JSON.stringify(window.ENT_CADRE)); } catch (e) {} compte(); };
  const st = document.createElement("style");
  /* Marie : « cache-moi le téléphone, ça m'empêche de tout voir » : en mode réglage, seulement les en-têtes, sur tout l'écran */
  st.textContent = `#scene,#app>.haut,#revenir,#reglages .tire,#reglages .poignee{display:none!important}
#reglages{position:fixed!important;inset:0!important;top:0!important;height:100%!important;max-height:none!important;transform:none!important;translate:none!important;border-radius:0!important;display:flex!important;flex-direction:column!important}
#reglages .choix{flex:1 1 auto!important;height:auto!important;max-height:none!important;min-height:0!important}
#reglages .panneau.on{height:100%!important;max-height:none!important;overflow-y:auto!important;padding-bottom:140px!important}
#lEnt .ent{touch-action:none;cursor:grab}
#lEnt .ent.cadSel .mi{box-shadow:0 0 0 2px #fff,0 0 0 4px #2E7DF6!important}
#lEnt .ent.cadOk .mi::after{content:"✓";position:absolute;right:5px;top:5px;width:18px;height:18px;border-radius:50%;background:#2E7DF6;color:#fff;font:600 11px/18px Jost,sans-serif;text-align:center;z-index:5}
#lEnt .ent .mi{position:relative}
#cadBarre{position:fixed;left:50%;bottom:78px;translate:-50% 0;z-index:99999;display:flex;gap:6px;align-items:center;background:#1E1C1B;color:#fff;border-radius:999px;padding:6px 8px 6px 14px;font:500 12.5px Jost,sans-serif;box-shadow:0 10px 30px -10px rgba(0,0,0,.6);white-space:nowrap}
#cadNom{width:112px;overflow:hidden;text-overflow:ellipsis}
#cadNb{width:64px;overflow:hidden}
#cadBarre button{all:unset;cursor:pointer;min-width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.14);display:grid;place-items:center;font-size:18px}
#cadBarre button.txt{border-radius:999px;padding:0 12px;font-size:12.5px}
#cadBarre button:active{transform:scale(.92)}`;
  document.head.appendChild(st);
  const barre = document.createElement("div"); barre.id = "cadBarre";
  barre.innerHTML = `<span id="cadNom">Touche un carré</span><button data-a="moins" aria-label="Dézoomer">−</button><button data-a="plus" aria-label="Zoomer">+</button><button class="txt" data-a="zero">Remettre</button><span id="cadNb" style="opacity:.7;margin-left:4px"></span>`;
  addEventListener("DOMContentLoaded", () => document.body.appendChild(barre)); if (document.body) document.body.appendChild(barre);

  let sel = null;
  const vue = m => m && m.shadowRoot && m.shadowRoot.lastElementChild;
  const applique = m => { const c = vue(m); if (!c) return; const k = m.parentElement.dataset.k, sc = (m.clientWidth || 100) / 390; c.style.transform = tr(k, sc); m.parentElement.classList.toggle("cadOk", !!window.ENT_CADRE[k]); };
  const compte = () => { const n = Object.keys(window.ENT_CADRE).length, e = document.getElementById("cadNb"); if (e) e.textContent = n ? `· ${n} réglé${n > 1 ? "s" : ""}` : ""; };
  const choisit = b => { document.querySelectorAll("#lEnt .ent.cadSel").forEach(x => x.classList.remove("cadSel")); sel = b; if (!b) return; b.classList.add("cadSel"); const n = document.getElementById("cadNom"); if (n) n.textContent = (b.textContent || "").replace("NOUVEAU", "").trim().slice(0, 22); };
  const zoom = (b, f) => { const k = b.dataset.k, r = { ...(window.ENT_CADRE[k] || AUTO[k] || { x: 0, y: 0, z: 1 }) }, z0 = r.z || 1, z1 = Math.min(4, Math.max(.5, z0 * f));
    const cx = r.x + 195 / z0, cy = r.y + 195 / z0; r.z = +z1.toFixed(3); r.x = Math.round(cx - 195 / z1); r.y = Math.round(cy - 195 / z1); window.ENT_CADRE[k] = r; applique(b.querySelector(".mi")); sauve(); };

  barre.addEventListener("click", e => { const a = e.target.closest("button"); if (!a || !sel) return; e.stopPropagation();
    if (a.dataset.a === "plus") zoom(sel, 1.1); else if (a.dataset.a === "moins") zoom(sel, 1 / 1.1);
    else { delete window.ENT_CADRE[sel.dataset.k]; applique(sel.querySelector(".mi")); sauve(); } });

  let tire = null, aBouge = false;
  document.addEventListener("pointerdown", e => { const b = e.target.closest && e.target.closest("#lEnt .ent"), m = b && b.querySelector(".mi"); if (!m) return; choisit(b);
    const r = window.ENT_CADRE[b.dataset.k] || AUTO[b.dataset.k] || { x: 0, y: 0, z: 1 }; tire = { m, b, x0: e.clientX, y0: e.clientY, rx: r.x || 0, ry: r.y || 0, z: r.z || 1 }; aBouge = false; try { m.setPointerCapture(e.pointerId); } catch (er) {} }, true);
  document.addEventListener("pointermove", e => { if (!tire) return; const dx = e.clientX - tire.x0, dy = e.clientY - tire.y0; if (!aBouge && Math.hypot(dx, dy) < 4) return; aBouge = true; e.preventDefault();
    const s = (tire.m.clientWidth / 390) * tire.z; window.ENT_CADRE[tire.b.dataset.k] = { x: Math.round(tire.rx - dx / s), y: Math.round(tire.ry - dy / s), z: tire.z }; applique(tire.m); }, true);
  document.addEventListener("pointerup", () => { if (tire && aBouge) sauve(); tire = null; }, true);
  document.addEventListener("click", e => { if (aBouge && e.target.closest && e.target.closest("#lEnt .ent")) { e.stopPropagation(); e.preventDefault(); aBouge = false; } }, true);
  /* on ouvre directement l'onglet En-tête */
  { let n = 0; const go = setInterval(() => { n++; const o = document.querySelector('#reglages [data-o="entete"]'), l = document.getElementById("lEnt");
    if ((o && o.getAttribute("aria-selected") === "true" && l && l.children.length) || n > 60) return clearInterval(go); if (o && n > 3) o.click(); }, 400); }
  /* les coches ✓ sur les carrés déjà réglés */
  setInterval(() => { document.querySelectorAll("#lEnt .ent").forEach(b => b.classList.toggle("cadOk", !!window.ENT_CADRE[b.dataset.k])); compte(); }, 800);
})();
