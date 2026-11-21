/* 21/11 (Marie) · Couleurs → la PIPETTE (ordinateur seulement).
   Sur la partie choisie (Encadrés · Nom · Bouton Réserver), un petit rond « pipette » apparaît.
   On le touche, puis on clique n'importe où sur son site (une photo, un charm, le fond…) :
   la couleur EXACTE de ce point est posée sur la partie choisie (couleur libre, comme le rectangle).
   Une loupe suit la souris sur le téléphone et montre la couleur avant de cliquer. Échap = annuler.
   Ce fichier est ajouté à personnaliser.html par outils/fabrique-personnaliser.js (ne pas l'enlever). */
(function () {
  if (typeof Pilote === "undefined" || !document.getElementById("partsG")) return;
  const ORDI = () => matchMedia("(min-width:900px) and (hover:hover) and (pointer:fine)").matches;
  const NOMP = { bl: "les encadrés", nm: "votre nom", bt: "le bouton Réserver" };
  const ICO = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M14.5 4.8l1.9-1.9a2.3 2.3 0 013.3 3.3l-1.9 1.9.9.9-1.5 1.5-4.4-4.4 1.5-1.5.2.2z" fill="currentColor"/><path d="M12.4 7.8l4.4 4.4-7.6 7.6c-.4.4-1 .7-1.6.7H6.3l-2 1.6-.9-.9 1.6-2v-1.3c0-.6.3-1.2.7-1.6l6.7-6.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';

  /* ---------- le style ---------- */
  const st = document.createElement("style");
  st.textContent = `
.partsV button{position:relative}
.pipI{margin-left:auto;flex:none;width:30px;height:30px;border-radius:50%;display:none;place-items:center;background:var(--fond);color:var(--noir);
  box-shadow:inset 0 0 0 1px rgba(30,28,27,.1);cursor:pointer;transition:background .15s,color .15s,transform .2s var(--pop,cubic-bezier(.34,1.56,.64,1))}
.pipI:hover{background:var(--noir);color:#fff;transform:scale(1.08)}
.partsV button.on .pipI{display:grid}
body.pipOn .partsV button.on .pipI{background:var(--rose);color:#fff;animation:pipPouls 1.1s ease-in-out infinite}
@keyframes pipPouls{50%{box-shadow:0 0 0 6px rgba(181,71,94,.18)}}
@media (max-width:899px),(hover:none),(pointer:coarse){.pipI{display:none!important}}
body.pipOn .tel{box-shadow:0 0 0 3px #fff,0 0 0 6px var(--rose),0 26px 50px -28px rgba(0,0,0,.55)}
body.pipOn #site{cursor:none}
.pipBandeau{position:absolute;left:50%;top:12px;z-index:9;translate:-50% -6px;opacity:0;pointer-events:none;width:max-content;max-width:86%;
  display:flex;align-items:center;gap:8px;padding:7px 13px 7px 10px;border-radius:16px;background:rgba(30,28,27,.88);color:#fff;font:500 12px/1.2 Jost,sans-serif;
  box-shadow:0 10px 24px -14px rgba(0,0,0,.6);transition:opacity .18s,translate .25s var(--pop,ease)}
body.pipOn .pipBandeau{opacity:1;translate:-50% 0}
.pipBandeau svg{flex:none}.pipBandeau small{display:block;font:400 10.5px/1.3 Jost,sans-serif;opacity:.75}
.pipLoupe.auDoigt{margin-top:-96px!important;width:76px!important;height:76px!important;margin-left:-38px!important;box-shadow:0 0 0 4px #fff,0 10px 24px -8px rgba(0,0,0,.5)!important}
.pipLoupe{position:fixed;z-index:60;left:0;top:0;width:58px;height:58px;margin:-29px 0 0 -29px;border-radius:50%;pointer-events:none;opacity:0;scale:.6;
  border:4px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.18),0 10px 22px -8px rgba(0,0,0,.55);transition:opacity .12s,scale .18s var(--pop,ease)}
.pipLoupe:after{content:"";position:absolute;left:50%;top:50%;width:6px;height:6px;margin:-3px 0 0 -3px;border-radius:50%;background:#fff;box-shadow:0 0 0 1px rgba(0,0,0,.35)}
.pipLoupe.on{opacity:1;scale:1}
.pipLoupe em{position:absolute;left:50%;top:100%;margin-top:8px;translate:-50% 0;white-space:nowrap;font:500 11px Jost,sans-serif;font-style:normal;color:#fff;
  background:rgba(30,28,27,.85);padding:3px 9px;border-radius:999px}
.pipLoupe.pose{animation:pipPose .35s var(--pop,ease)}
@keyframes pipPose{40%{scale:1.35}}`;
  document.head.appendChild(st);

  /* ---------- les ronds pipette dans Encadrés · Nom · Bouton Réserver ---------- */
  $("partsG").querySelectorAll("button[data-q]").forEach(b => {
    const s = document.createElement("span"); s.className = "pipI"; s.setAttribute("role", "button"); s.innerHTML = ICO;
    s.title = "Pipette : prendre une couleur sur votre site"; s.setAttribute("aria-label", "Pipette : prendre une couleur sur votre site pour " + NOMP[b.dataset.q]); b.appendChild(s); });
  const ecr = document.querySelector("#tel .ecr"), ifr = $("site");
  const band = document.createElement("div"); band.className = "pipBandeau"; ecr.appendChild(band);
  const loupe = document.createElement("div"); loupe.className = "pipLoupe"; loupe.innerHTML = "<em></em>"; document.body.appendChild(loupe);

  /* ---------- lire la couleur exacte d'un point du site ---------- */
  const toiles = new Map();   /* adresse de l'image → sa toile (lue une seule fois) */
  function toile(url) {
    if (toiles.has(url)) return toiles.get(url);
    const t = { c: null, w: 0, h: 0, ko: false }; toiles.set(url, t);
    const im = new Image(); if (!/^(data|blob):/.test(url) && new URL(url, location.href).origin !== location.origin) im.crossOrigin = "anonymous";
    im.onload = () => { try { const k = Math.min(1, 900 / Math.max(im.naturalWidth, im.naturalHeight)), c = document.createElement("canvas");
      c.width = Math.max(1, Math.round(im.naturalWidth * k)); c.height = Math.max(1, Math.round(im.naturalHeight * k));
      const x = c.getContext("2d", { willReadFrequently: true }); x.drawImage(im, 0, 0, c.width, c.height); x.getImageData(0, 0, 1, 1);
      t.c = x; t.w = im.naturalWidth; t.h = im.naturalHeight; } catch (e) { t.ko = true; } };
    im.onerror = () => { t.ko = true; }; im.src = url; return t; }
  const pix = (t, u, v) => { if (!t.c) return null; const W = t.c.canvas.width, H = t.c.canvas.height;
    const x = Math.min(W - 1, Math.max(0, Math.floor(u * W))), y = Math.min(H - 1, Math.max(0, Math.floor(v * H))), d = t.c.getImageData(x, y, 1, 1).data;
    return d[3] < 40 ? null : hex(d[0], d[1], d[2]); };
  const hex = (r, g, b) => "#" + [r, g, b].map(n => Math.round(n).toString(16).padStart(2, "0")).join("");
  const pct = (s, i) => { const p = String(s || "50% 50%").split(/\s+/); const v = p[i] || p[0]; if (/left|top/.test(v)) return 0; if (/right|bottom/.test(v)) return 1; if (/%$/.test(v)) return parseFloat(v) / 100; return .5; };
  /* une image posée dans une boîte (object-fit ou background-size) : où tombe le point dans l'image ? */
  function dansBoite(t, r, x, y, fit, pos) {
    if (!t.w) return null; let w = r.width, h = r.height;
    if (fit === "cover" || fit === "contain") { const k = (fit === "cover" ? Math.max : Math.min)(r.width / t.w, r.height / t.h); w = t.w * k; h = t.h * k; }
    else if (fit === "none" || fit === "auto") { w = t.w; h = t.h; }
    else if (fit && fit !== "fill" && fit !== "100% 100%") { const m = fit.split(/\s+/); const f = (s, ref, nat) => /px$/.test(s) ? parseFloat(s) : /%$/.test(s) ? parseFloat(s) / 100 * ref : null;
      const a = f(m[0], r.width, t.w), b = m[1] ? f(m[1], r.height, t.h) : null; w = a || (b ? t.w * b / t.h : t.w); h = b || (a ? t.h * a / t.w : t.h); }
    const ox = r.left + (r.width - w) * pct(pos, 0), oy = r.top + (r.height - h) * pct(pos, 1);
    let u = (x - ox) / w, v = (y - oy) / h; if (fit !== "cover" && fit !== "contain" && fit !== "fill" && fit !== "100% 100%") { u -= Math.floor(u); v -= Math.floor(v); }   /* motifs répétés */
    return u < 0 || u > 1 || v < 0 || v > 1 ? null : [u, v]; }
  function couleurEn(x, y) {
    const D = Pilote.D; if (!D) return null;
    /* les photos du site sont souvent « transparentes à la souris » (pointer-events:none) : on les rend touchables le temps de chercher */
    let tout = D.getElementById("lgnPipTout"); if (!tout) { tout = D.createElement("style"); tout.id = "lgnPipTout"; tout.textContent = "*,*:before,*:after{pointer-events:auto!important}"; D.head.appendChild(tout); }
    tout.disabled = false; let L; try { L = D.elementsFromPoint(x, y); } finally { tout.disabled = true; }
    const W = D.defaultView, vu = el => { for (let a = el; a && a.nodeType === 1; a = a.parentElement) { const s = W.getComputedStyle(a); if (+s.opacity < .05 || s.visibility === "hidden" || s.display === "none") return false; } return true; };
    /* la couleur que dessine UN élément à ce point : son image, sinon son fond plein (sinon rien) */
    const image = el => { const cs = W.getComputedStyle(el), r = el.getBoundingClientRect();
      if (el.tagName === "IMG" && el.complete && el.currentSrc) { const t = toile(el.currentSrc), uv = dansBoite(t, r, x, y, cs.objectFit, cs.objectPosition); if (uv) { const c = pix(t, uv[0], uv[1]); if (c) return c; } }
      const m = cs.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
      if (m) { const t = toile(m[1]), bs = cs.backgroundSize.split(",")[0].trim(), uv = dansBoite(t, r, x, y, bs === "auto" || bs === "auto auto" ? "auto" : bs, cs.backgroundPosition.split(",")[0]); if (uv) { const c = pix(t, uv[0], uv[1]); if (c) return c; } }
      return null; };
    const plein = el => { const bg = W.getComputedStyle(el).backgroundColor.match(/[\d.]+/g); return bg && (bg[3] === undefined || +bg[3] > .5) ? hex(+bg[0], +bg[1], +bg[2]) : null; };
    const V = L.filter(vu);
    for (let i = 0; i < V.length; i++) { const el = V[i], c = image(el); if (c) return c;
      const p = plein(el); if (!p) continue;
      /* un fond plein se peint SOUS ce qu'il contient : si une photo ou un bloc coloré à l'intérieur est à ce point, c'est lui qu'on voit */
      for (let j = i + 1; j < V.length; j++) if (el.contains(V[j])) { const d = image(V[j]) || plein(V[j]); if (d) return d; }
      return p; }
    return "#ffffff"; }

  /* ---------- le mode pipette ---------- */
  let on = false, branche = null, dernier = null;
  const ech = () => { const r = ifr.getBoundingClientRect(); return [r, r.width / (ifr.offsetWidth || 390)]; };
  let raf = 0, ev = null;
  const suit = e => { ev = { clientX: e.clientX, clientY: e.clientY }; if (!raf) raf = requestAnimationFrame(() => { raf = 0; if (on && ev) bouge(ev); }); };
  function bouge(e) { const [r, k] = ech(); loupe.style.left = r.left + e.clientX * k + "px"; loupe.style.top = r.top + e.clientY * k + "px";
    const c = couleurEn(e.clientX, e.clientY); if (!c) return; dernier = c; loupe.style.background = c; loupe.classList.add("on");
    const it = procheReel(partC, c); loupe.querySelector("em").textContent = nomCoul(it[0]); }
  function prend(e) { e.preventDefault(); e.stopPropagation(); bouge(e); poseCouleur(); }
  function poseCouleur() { const c = dernier; if (!c) return false;
    const q = partC; memo(); specMain = null;
    if (q === "bl" && Pilote.etat.blocs === "blanc") { Pilote.blocs("verre"); bulle("Encadrés passés en couleur ✦"); }
    Pilote._libreEnCours = true; Pilote.couleurLibre(q, c); Pilote._libreEnCours = false;
    loupe.classList.remove("pose"); void loupe.offsetWidth; loupe.classList.add("pose");
    setTimeout(rendCouleursG, 60); bulle("Couleur posée sur " + NOMP[q] + " ✦"); setTimeout(arrete, 380); return true; }
  /* 21/11 (2.0, téléphone) : on reste appuyée sur la pipette et on la GLISSE sur son site ; la loupe suit le doigt (au-dessus de lui) ; on lâche = la couleur est posée */
  window.lgnPipGlisse = {
    bouge(px, py, auDoigt = true) { const [r, k] = ech(), x = (px - r.left) / k, y = (py - r.top) / k;
      if (x < 0 || y < 0 || x > (ifr.offsetWidth || 390) || y > (ifr.offsetHeight || 844)) { loupe.classList.remove("on"); dernier = null; return false; }
      loupe.classList.toggle("auDoigt", auDoigt); bouge({ clientX: x, clientY: y }); return !!dernier; },
    pose(px, py, garder = false, auDoigt = true) { const ok = this.bouge(px, py, auDoigt) && poseCouleur(); if (!ok && !garder) loupe.classList.remove("on");
      if (!garder) setTimeout(() => loupe.classList.remove("on", "auDoigt"), 650); else setTimeout(() => loupe.classList.add("on"), 420); return ok; },
    annule() { loupe.classList.remove("on", "auDoigt"); dernier = null; } };
  const bloque = e => { e.preventDefault(); e.stopPropagation(); };
  const sort = () => loupe.classList.remove("on");
  const touche = e => { if (e.key === "Escape") arrete(); };
  let force = false;   /* 21/11 : sur téléphone (2.0), la pipette est lancée par son bouton à côté du téléphone */
  function demarre(f) { if (f === true) force = true;
    const D = Pilote.D; if (!D || (!ORDI() && !force)) return; if (on) return arrete();
    on = true; dernier = null; document.body.classList.add("pipOn");
    band.innerHTML = `${ICO}<span>Cliquez sur une couleur de votre site<small>pour ${NOMP[partC]} · Échap pour annuler</small></span>`;
    branche = D; D.addEventListener("mousemove", suit, true); D.addEventListener("click", prend, true); D.addEventListener("mousedown", bloque, true);
    D.addEventListener("pointerdown", bloque, true); D.addEventListener("mouseleave", sort, true); D.documentElement.addEventListener("mouseleave", sort);
    D.addEventListener("keydown", touche, true); document.addEventListener("keydown", touche, true);
    setTimeout(() => document.addEventListener("click", hors, true), 0); }
  function arrete() { if (!on) return; on = false; document.body.classList.remove("pipOn"); loupe.classList.remove("on");
    const D = branche; if (D) { D.removeEventListener("mousemove", suit, true); D.removeEventListener("click", prend, true); D.removeEventListener("mousedown", bloque, true);
      D.removeEventListener("pointerdown", bloque, true); D.removeEventListener("mouseleave", sort, true); D.documentElement.removeEventListener("mouseleave", sort); D.removeEventListener("keydown", touche, true); }
    document.removeEventListener("keydown", touche, true); document.removeEventListener("click", hors, true); branche = null; }
  /* un clic ailleurs que sur le site (hors pipette) = on range la pipette */
  function hors(e) { if (e.target.closest && e.target.closest(".pipI")) return; arrete(); }
  /* le rond pipette : le clic choisit d'abord la partie (code existant), puis lance la pipette */
  $("partsG").addEventListener("click", e => { if (e.target.closest(".pipI")) demarre(); else arrete(); });
  /* on quitte « Couleurs » ou la fenêtre devient petite : la pipette se range */
  const ouvreAv = ouvre; ouvre = o => { arrete(); return ouvreAv(o); };
  addEventListener("resize", () => { if (!ORDI() && !force) arrete(); });
  window.lgnPipette = () => demarre(true); window.lgnPipetteStop = () => arrete();
  /* l'astuce, sur ordinateur */
  if (ORDI() && ASTUCES.couleurs) ASTUCES.couleurs.splice(1, 0, ["⌖", "<b>La pipette</b> : touchez le petit rond à droite de « Bouton Réserver » (ou Nom, Encadrés), puis cliquez sur une photo : sa couleur exacte est posée."]);
})();
