/* 16/11 · Pôle Design · MAQUETTES « Personnaliser » (perso-A.html, perso-B.html).
   Ce fichier pilote le VRAI site de la prothésiste (loginail-creer/pret.html dans une iframe),
   avec les mêmes boutons cachés que la page actuelle (maquette-perso.html) : rien n'est inventé,
   les écritures, fonds, couleurs, en-têtes et charms sont les vrais.
   ?salon=marie → « Marie Onglerie » (photos moka) au lieu des Ongles de Cerise. */
(function () {
  const Q = new URLSearchParams(location.search);
  const SALONS = {
    cerise: { nom: "les Ongles de Cerise", src: "photos=cerise-5&photoune=haut&photosalon=1&portrait=cerise" },
    marie: { nom: "Marie Onglerie", vrai: "Maison Moka", src: "photos=moka-4&photosalon=1&portrait=moka" }
  };
  const SALON = SALONS[Q.get("salon")] || SALONS.cerise;
  const ENT = [["fleurs", "Fleurs"], ["bandeau", "Bandeau"], ["medaillon", "Médaillon"], ["magazine", "Magazine"], ["pleinecran", "Plein écran"],
    ["diagonale", "Diagonale"], ["vague", "Vague"], ["ticket", "Ticket"], ["vitrine", "Vitrine"], ["rideau", "Rideau"], ["loge", "Loge de star"],
    ["balcon", "Balcon"], ["devanture", "Devanture"], ["classique", "Classique"], ["couverture", "Couverture"], ["grandtitre", "Grand titre"]];
  const POP = ["cerisedisco", "libellule", "croissant", "cocktail", "ramenoeuf", "casquette", "flamme", "clapet", "bouledisco", "boule8", "cabriolet", "cadeau", "baladeur", "lampeuv", "serum", "pinceacheveux", "cremeconcombre", "bottedisco"];
  /* les couleurs du site, rangées par teinte, 16 seulement d'abord (les 51 restent derrière « Plus de couleurs ») */
  const COUL_VUES = ["noir", "choco", "taupe", "greige", "nude", "poudre", "rose", "framboise", "cerise", "bordeaux", "terracotta", "sable", "sauge", "sapin", "lilas", "marine"];
  const VIFS_VUS = ["noirb", "chocob", "caramelb", "bordeauxb", "fuchsiab", "framboiseb", "cerise", "orb", "emeraudeb", "sapinb", "bleunuitb", "pruneb"];
  const NOMS = { noir: "Noir", choco: "Chocolat", taupe: "Taupe", greige: "Greige", nude: "Nude", poudre: "Poudre", rose: "Rose", framboise: "Framboise", cerise: "Cerise", bordeaux: "Bordeaux", terracotta: "Terracotta", sable: "Sable", sauge: "Sauge", sapin: "Sapin", lilas: "Lilas", marine: "Marine",
    noirb: "Noir", chocob: "Chocolat", caramelb: "Caramel", bordeauxb: "Bordeaux", fuchsiab: "Fuchsia", framboiseb: "Framboise", orb: "Or", emeraudeb: "Émeraude", sapinb: "Sapin", bleunuitb: "Bleu nuit", pruneb: "Prune" };

  const P = { SALON, ENT, POP, COUL_VUES, VIFS_VUS, NOMS, W: null, D: null, pret: false, etat: { entete: "fleurs", police: "affiche", fond: "", couleur: "noir", vif: "noirb" } };
  const ecoute = [];
  P.change = fn => ecoute.push(fn);
  const signale = quoi => ecoute.forEach(f => { try { f(quoi); } catch (e) { console.warn(e); } });
  const clique = sel => { const b = P.D && P.D.querySelector(sel); if (b) b.click(); return b; };
  const attends = ms => new Promise(r => setTimeout(r, ms));

  P.src = () => `../loginail-creer/pret.html?v=1511m&nouveau&exemple=dilerna&style=1&couleur=noir&mode=jour&police=affiche&paillettes=nacre&${SALON.src}`;

  /* le nom du 2e salon : on remplace « Maison Moka » partout où il s'écrit (le site d'exemple ne sait pas encore s'appeler autrement) */
  function renomme(D) {
    if (!SALON.vrai) return;
    const [a, b] = SALON.vrai.split(" "), [x, y] = SALON.nom.split(" ");
    const passe = root => { const w = D.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) {
      let t = n.nodeValue; if (!t || !/Maison|Moka/.test(t)) continue;
      t = t.replace(new RegExp(SALON.vrai, "g"), SALON.nom).replace(new RegExp(SALON.vrai.toUpperCase(), "g"), SALON.nom.toUpperCase());
      if (t.trim() === a) t = t.replace(a, x); else if (t.trim() === b) t = t.replace(b, y);
      else if (t.trim() === a.toUpperCase()) t = t.replace(a.toUpperCase(), x.toUpperCase()); else if (t.trim() === b.toUpperCase()) t = t.replace(b.toUpperCase(), y.toUpperCase());
      if (t !== n.nodeValue) n.nodeValue = t; } };
    passe(D.body); try { D.title = SALON.nom; } catch (e) {}
    new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => n.nodeType === 1 ? passe(n) : n.nodeType === 3 && passe(n.parentNode || D.body)))).observe(D.body, { childList: true, subtree: true, characterData: false });
  }

  /* les vignettes de fonds ont besoin des styles .f100/.tuile du site : on les recopie dans la maquette */
  function copieStyles() { P.D.querySelectorAll("style").forEach(s => { if (s.dataset.copie) return;
    if (s.id === "pzCss") { s.dataset.copie = 1; const c = document.createElement("style"); c.textContent = s.textContent; document.head.appendChild(c); return; }
    let t = ""; try { [...s.sheet.cssRules].forEach(r => { if ((r.selectorText && /rond-f|\.f100|\.tuile|pz-ronds/.test(r.selectorText)) || r.type === 7) t += r.cssText + "\n"; }); } catch (e) {}
    if (t) { s.dataset.copie = 1; const c = document.createElement("style"); c.textContent = t; document.head.appendChild(c); } }); }

  P.branche = iframe => new Promise(ok => {
    iframe.src = P.src();
    iframe.addEventListener("load", async () => {
      const W = P.W = iframe.contentWindow, D = P.D = iframe.contentDocument; W.__pzFixe = 1; W.F100_AUSSI = 1;
      const st = D.createElement("style"); st.textContent = ".pret,.langues,.indiceD{display:none!important}html{scrollbar-width:none}::-webkit-scrollbar{display:none}*:focus,*:focus-visible{outline:none!important}*{-webkit-tap-highlight-color:transparent}.lgn-sticker{outline:none!important}"; D.head.appendChild(st);
      renomme(D);
      if (!W.F100) { const s = D.createElement("script"); s.src = "../loginail-site/fonds-100.js?v=1511"; D.head.appendChild(s); await new Promise(r => { W.addEventListener("f100", r, { once: true }); setTimeout(r, 4000); }); }
      await attends(250); copieStyles();
      /* départ sobre (comme la page actuelle) : Fleurs, Affiche, noir, blocs « verre » */
      P.entete("fleurs", true); await attends(200);
      clique('#pzPol [data-p="affiche"]'); clique('.pf-dots [data-co="noir"]'); clique('.pf-vifs [data-vif="noirb"]');
      try { W.eval('if(typeof BR!=="undefined"&&BR){BR.nomc="noir";BR.blocs="verre"}window.__lgnChoix=Object.assign(window.__lgnChoix||{},{nomc:"noir",blocs:"verre"})'); } catch (e) {}
      [900, 2200].forEach(t => setTimeout(() => { if (P.etat.police === "affiche") clique('#pzPol [data-p="affiche"]'); }, t));
      P.pret = true; ok(P); signale("pret");
    }, { once: true });
  });

  P.nomSalon = () => SALON.nom;
  P.polices = () => [...P.D.querySelectorAll("#pzPol [data-p]")].map(b => [b.dataset.p, b.textContent.trim()]);
  P.police = k => { P.etat.police = k; clique(`#pzPol [data-p="${k}"]`); signale("police"); };
  /* la vraie famille de police d'une écriture (pour écrire SON nom dans chaque écriture) */
  const famCache = {};
  P.famille = k => { if (famCache[k]) return famCache[k]; const b = P.D.querySelector(`#pzPol [data-p="${k}"]`); let f = "";
    if (b) { const el = b.querySelector("span,b,i") || b; f = P.W.getComputedStyle(el).fontFamily; } return (famCache[k] = f || "Jost"); };
  P.policesCss = () => { /* les @font-face du site, recopiées une fois dans la maquette */
    if (document.getElementById("fontesSite")) return; const fontes = [];
    for (const sh of P.D.styleSheets) { let rs; try { rs = sh.cssRules; } catch (e) { continue; } const base = sh.href || P.D.baseURI;
      for (const r of rs) if (r.type === 5) fontes.push(r.cssText.replace(/url\((['"]?)(?!data:|https?:|blob:|#)([^'")]+)\1\)/g, (m, q, u) => `url("${new URL(u, base).href}")`)); }
    const s = document.createElement("style"); s.id = "fontesSite"; s.textContent = fontes.join("\n"); document.head.appendChild(s); };

  P.fonds = () => (P.W.FONDS100?.f || []);
  P.categories = () => { const n = {}; P.fonds().forEach(x => (x[3] || []).forEach(c => n[c] = (n[c] || 0) + 1)); return Object.keys(n).filter(c => c !== "Phrases"); };
  P.vignetteFond = i => { const W = P.W; if (!W.F100) return ""; const t = document.createElement("div"); t.innerHTML = W.F100.rond(i); const c = t.querySelector(".f100"); if (!c) return "";
    c.removeAttribute("style"); const tu = c.querySelector(".tuile"); if (tu) ["width", "height", "border-radius"].forEach(k => tu.style.removeProperty(k));
    return c.outerHTML.replace(/fonds-img\//g, "fonds-mini/"); };
  P.fond = n => { const Pz = P.D.getElementById("pzFonds"); if (!Pz) return; const b = P.D.createElement("button"); b.dataset.f = n; b.style.display = "none"; Pz.appendChild(b); b.click(); b.remove();
    P.etat.fond = n; signale("fond"); };
  /* « Assortir à mon fond » : chaque fond connaît sa couleur d'encre ; on prend le bouton le plus proche */
  const rgb = s => { const h = (String(s).match(/#([0-9a-f]{6})/i) || [])[1]; if (h) return [0, 2, 4].map(k => parseInt(h.substr(k, 2), 16)); const m = String(s).match(/\d+/g); return m ? m.slice(0, 3).map(Number) : [0, 0, 0]; };
  const dist = (a, b) => { const x = rgb(a), y = rgb(b); return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2; };
  P.assortir = () => { const f = P.fonds().find(x => x[0] === P.etat.fond); if (!f || !f[4]) return false;
    const vifs = [...P.D.querySelectorAll(".pf-vifs [data-vif]")].filter(b => b.dataset.vif !== "blancb"); if (!vifs.length) return false;
    const v = vifs.reduce((m, b) => dist(b.style.background, f[4]) < dist(m.style.background, f[4]) ? b : m); P.vif(v.dataset.vif);
    const dots = [...P.D.querySelectorAll(".pf-dots [data-co]")]; const d = dots.reduce((m, b) => dist(b.style.background, f[4]) < dist(m.style.background, f[4]) ? b : m); P.couleur(d.dataset.co, true); return true; };

  P.couleurs = () => [...P.D.querySelectorAll(".pf-dots [data-co]")].map(b => [b.dataset.co, b.style.background]);
  P.vifs = () => [...P.D.querySelectorAll(".pf-vifs [data-vif]")].map(b => [b.dataset.vif, b.style.background]);
  P.couleur = (k, muet) => { P.etat.couleur = k; clique(`.pf-dots [data-co="${k}"]`); if (P.etat.vif) clique(`.pf-vifs [data-vif="${P.etat.vif}"]`); if (!muet) signale("couleur"); };
  P.vif = k => { P.etat.vif = k; clique(`.pf-vifs [data-vif="${k}"]`); signale("couleur"); };

  P.entete = (k, muet) => { P.etat.entete = k; const W = P.W;
    try { W.eval(`window.__entete=${JSON.stringify(k)};if(typeof BR!=="undefined"&&BR)BR.entete=${JSON.stringify(k)};if(!(window.__changeEntete&&window.__changeEntete())){const b=document.querySelector("[data-pf]");b&&b._maj&&b._maj(1)}`); } catch (e) {}
    setTimeout(() => { if (P.etat.police) clique(`#pzPol [data-p="${P.etat.police}"]`); }, 90);
    if (!muet) signale("entete"); };

  /* les en-têtes en petites images : une copie de SON site en tout petit (même méthode que la page actuelle) */
  let feuille = null;
  function feuilleSite() { if (feuille) return feuille; const regles = [];
    for (const sh of P.D.styleSheets) { let rs; try { rs = sh.cssRules; } catch (e) { continue; } const base = sh.href || P.D.baseURI;
      const abs = t => t.replace(/url\((['"]?)(?!data:|https?:|blob:|#)([^'")]+)\1\)/g, (m, q, u) => `url("${new URL(u, base).href}")`);
      for (const r of rs) { if (r.type === 3 || r.type === 5) continue; regles.push(abs(r.cssText).replace(/:root/g, ":host")); } }
    P.policesCss(); feuille = new CSSStyleSheet(); feuille.replaceSync(regles.join("\n") + "\n:host{display:block;position:relative;overflow:hidden}\n:host>.ecran::before{display:none!important}"); return feuille; }
  P.miniEntete = (hote, k, largeur) => { const W = P.W, D = P.D; try {
    const ec = D.querySelector(".ecran"); if (!ec || !W.entete || !W.__eT) return; feuille = null; const fs = feuilleSite(), root = D.documentElement.style.cssText, sc = largeur / 390;
    let acc = "#1E1C1B"; try { acc = W.eval('accDuFond()||"#1E1C1B"'); } catch (e) {}
    const nomV = D.querySelector(".ecran .hent h1, .ecran .hf-nom, .ecran h1"), police = nomV ? getComputedStyle(nomV).fontFamily : "";
    if (police) fs.insertRule(`.hent h1,.hent .pol span{font-family:${police}!important}`, fs.cssRules.length);
    const c = document.importNode(ec, true); c.querySelectorAll(".lgn-sticker,.indiceD,.cookies,.grand,.defile>.hf").forEach(x => x.remove());
    c.querySelectorAll("[style*='url(']").forEach(x => x.setAttribute("style", x.getAttribute("style").replace(/url\((['"]?)(?!data:|https?:|blob:|#)([^'")]+)\1\)/g, (q, z, u) => `url("${new URL(u, D.baseURI).href}")`)));
    c.querySelectorAll("img[src]").forEach(x => { x.src = new URL(x.getAttribute("src"), D.baseURI).href; x.loading = "eager"; });
    const tmp = document.createElement("div"); tmp.innerHTML = W.entete(k, ...W.__eT); const n = tmp.firstElementChild; if (!n) return; n.style.setProperty("--acc", acc);
    const h = c.querySelector(".defile>.hent,.defile>[data-s='accueil']") || c.querySelector(".hent,[data-s='accueil']"); if (h) { h.replaceWith(n); n.classList.remove("hf-cache"); } else (c.querySelector(".defile") || c).prepend(n); c.classList.add("a-entete");
    if (SALON.vrai) { const w = document.createTreeWalker(c, NodeFilter.SHOW_TEXT); let t; while ((t = w.nextNode())) t.nodeValue = t.nodeValue.replace(SALON.vrai, SALON.nom).replace(SALON.vrai.toUpperCase(), SALON.nom.toUpperCase()); }
    Object.assign(c.style, { position: "absolute", left: "0", top: "0", width: "390px", height: "844px", borderRadius: "0", transform: `scale(${sc})`, transformOrigin: "0 0" });
    const sr = hote.shadowRoot || hote.attachShadow({ mode: "open" }); sr.adoptedStyleSheets = [fs]; sr.innerHTML = ""; hote.setAttribute("style", root); sr.appendChild(c);
  } catch (e) { console.warn("mini en-tête", e); } };

  /* les charms : posés DANS son site, ils flottent ; on les glisse au doigt ou à la souris */
  P.charmsTous = () => Object.keys(P.W.CH_IMG || {});
  P.familles = () => (window.CH_FAMS || []).filter(f => !f[1].startsWith("*")).map(f => f[0]);
  P.charmsDe = fam => fam === "Populaires" ? POP : P.charmsTous().filter(n => (window.CH_CAT || {})[n] === fam);
  P.imgCharm = n => `../loginail-site/charms/${n}.png`;
  P.poses = () => [...P.D.querySelectorAll(".lgn-sticker")].map(x => x.dataset.n);
  P.charm = n => { const D = P.D, box = D.querySelector(".defile") || D.scrollingElement;
    const deja = D.querySelector(`.lgn-sticker[data-n="${n}"]`); if (deja) { deja.remove(); signale("charms"); return false; }
    if (P.poses().length >= 12) return false;
    const im = D.createElement("img"); im.src = "../loginail-site/charms/" + n + ".png"; im.className = "lgn-sticker"; im.draggable = false; im.dataset.n = n;
    const i = P.poses().length, places = [[.08, .16], [.7, .12], [.74, .44], [.06, .5], [.4, .06], [.78, .7], [.1, .74], [.5, .52]], pl = places[i % places.length];
    const x = box.clientWidth * pl[0], y = box.scrollTop + box.clientHeight * pl[1];
    im.style.cssText = `position:absolute;z-index:9000;left:${x}px;top:${y}px;width:74px;height:74px;rotate:${Math.round(Math.random() * 30 - 15)}deg;touch-action:none;cursor:grab;user-select:none;filter:drop-shadow(0 4px 6px rgba(0,0,0,.25));animation:pzArrive .5s cubic-bezier(.3,1.5,.5,1) both`;
    box.appendChild(im);
    let sx, sy, ox, oy; im.addEventListener("pointerdown", e => { e.preventDefault(); im.setPointerCapture(e.pointerId); sx = e.clientX; sy = e.clientY; ox = parseFloat(im.style.left); oy = parseFloat(im.style.top); im.style.cursor = "grabbing"; });
    im.addEventListener("pointermove", e => { if (sx == null) return; im.style.left = ox + e.clientX - sx + "px"; im.style.top = oy + e.clientY - sy + "px"; });
    im.addEventListener("pointerup", () => { sx = null; im.style.cursor = "grab"; });
    if (!D.getElementById("pzArriveK")) { const s = D.createElement("style"); s.id = "pzArriveK"; s.textContent = "@keyframes pzArrive{from{opacity:0;transform:scale(.3)}to{opacity:1;transform:none}}"; D.head.appendChild(s); }
    signale("charms"); return true; };
  /* sa photo du haut (même méthode que la page actuelle : choisitPhoto / litPhoto) */
  P.photos = () => { try { return P.W.eval("(BR.photos||[]).map(p=>p.url)").map(u => new URL(u, P.D.baseURI).href); } catch (e) { return []; } };
  P.photoUne = () => { try { const u = P.W.eval("(BR.photos||[])[BR.principale||0]?.url||''"); return u ? new URL(u, P.D.baseURI).href : ""; } catch (e) { return ""; } };
  P.choisitPhoto = u => { try { P.W.eval(`(()=>{const u=${JSON.stringify(u)};let i=BR.photos.findIndex(p=>new URL(p.url,document.baseURI).href===u);if(i<0){BR.photos.unshift({url:u,auteurs:[]});if(BR.salon!=null)BR.salon++;i=0}
    BR.principale=i;const o=BR.photos.map((_,k)=>k);if(i>0){o.splice(i,1);o.unshift(i)}o.forEach((k,j)=>PH["g"+j]=BR.photos[k].url);const b=document.querySelector("[data-pf]");b&&b._maj&&b._maj(1)})()`); } catch (e) { console.warn(e); }
    setTimeout(() => { if (P.etat.police) clique(`#pzPol [data-p="${P.etat.police}"]`); }, 120); signale("photo"); };
  P.litPhoto = fi => { const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const m = 1400, k = Math.min(1, m / Math.max(im.width, im.height)), cv = document.createElement("canvas");
    cv.width = Math.round(im.width * k); cv.height = Math.round(im.height * k); cv.getContext("2d").drawImage(im, 0, 0, cv.width, cv.height); P.choisitPhoto(cv.toDataURL("image/jpeg", .85)); }; im.src = r.result; }; r.readAsDataURL(fi); };
  P.enHaut = () => { try { const b = P.D.querySelector(".defile") || P.D.scrollingElement; b.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) {} };

  window.Pilote = P;
})();
