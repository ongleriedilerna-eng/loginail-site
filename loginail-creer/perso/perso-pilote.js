/* COPIE DE PRODUCTION fabriquée par outils/fabrique-personnaliser.js — ne pas modifier ici, modifier idees/perso-pilote.js puis relancer. */
/* 16/11 · Pôle Design · MAQUETTES « Personnaliser » (perso-A.html, perso-B.html).
   Ce fichier pilote le VRAI site de la prothésiste (loginail-creer/pret.html dans une iframe),
   avec les mêmes boutons cachés que la page actuelle (maquette-perso.html) : rien n'est inventé,
   les écritures, fonds, couleurs, en-têtes et charms sont les vrais.
   ?salon=marie → « Marie Onglerie » (photos moka) au lieu de Nails by Drimf. */
(function () {
  const Q = new URLSearchParams(location.search);
  const SALONS = {
    cerise: { nom: "Nails by Drimf", src: "photos=cerise-5&photoune=haut&photosalon=1&portrait=cerise" },
    marie: { nom: "Marie Onglerie", vrai: "Maison Moka", src: "photos=moka-4&photosalon=1&portrait=moka" }
  };
  const SALON = SALONS[Q.get("salon")] || SALONS.cerise;
  const ENT = [["fleurs", "Fleurs"], ["bandeau", "Bandeau"], ["medaillon", "Médaillon"], ["magazine", "Magazine"], ["pleinecran", "Plein écran"],
    ["diagonale", "Diagonale"], ["vague", "Vague"], ["ticket", "Ticket"], ["vitrine", "Vitrine"], ["rideau", "Rideau"], ["loge", "Loge de star"],
    ["balcon", "Balcon"], ["devanture", "Devanture"], ["classique", "Classique"], ["couverture", "Couverture"], ["grandtitre", "Grand titre"]];
  /* D22 · les 39 en-têtes gardées par Marie, dans l'ordre (les anciennes d'abord, puis les nouvelles) */
  const GARDEES = ["cadre", /* 19/11 (Marie, D54) : ses 8 en-têtes qui bougent */ "zpoints", "zpluie", "zbulles", "zdisco", "zetoiles", "zvagues", "zfeu", "ztombe", /* 20/11 (Marie, D55 à D58) : 10 en-têtes de plus */ "wenseigne", "wtele", "wfil", "wronde", "whuit", "wtourb", "wetor", "wetoile", "wcachet", "wnotif", /* 19/11 (Marie, D36) : ses 23 nouvelles en-têtes */ "xperlecoeur", "xguirch", "xsusp", "xbracelet", "xgum", "xbulch", "xchrome", "xgeant", "xcollier", "xlustre", "xperles", "xloge", "xstrass", "xguirlande", "xbokeh", "xscint", "xsavon", "xmusique", "xlecteur", "xbonbons", "xtap", "xreac", "xnuancier", "medaillon", "bandeau",   /* 18/11 (Marie) : « Photo encadrée » en premier = l'en-tête de départ */ "magazine", "pleinecran", "couv", "story", "feed", "bijou", "vinyle", "coulure", "diamant", "disco", "papillons", "bulles",
    "tele", "carrousel", "viseur", "feuilleter", "swipe", "ondes", "confettis", "arcenciel", "ballons", "chromecadre", "enveloppe",   /* 18/11 soir : « Machine à écrire » retirée (Marie) */
    "aquarelle", "rayons", "popart", "etoile", "brume", "lueurs", "trace", "coeurparticules", "levitation", "live", "pendentif", "foil"];
  /* 17/11 soir : « Pour vous » = les 42 charms choisis par Marie (page idees/choix-pour-vous.html) */
  const POP = ["cerisedisco", "libellule", "croissant", "cocktail", "ramenoeuf", "casquette", "flamme", "clapet", "bouledisco", "boule8", "cabriolet", "cadeau", "baladeur", "lampeuv", "serum", "pinceacheveux", "cremeconcombre", "bottedisco", "canard", "ourson", "papillonroseverre", "papilloncyber", "bougielotus", "levresgrillz", "planeteetincelles", "coeurpixel", "fleursixties", "tulipe", "cerisesor", "baguettetradition", "onigiri", "painchocolat", "potionviolette", "boueeflamant", "hautsirene", "etoiledemerrose", "hippocampe", "basketargent", "chapeaupaille", "cible", "cassette", "manetteblanche"];
  /* les couleurs du site, rangées par teinte, 16 seulement d'abord (les 51 restent derrière « Plus de couleurs ») */
  const COUL_VUES = ["noir", "choco", "taupe", "greige", "nude", "poudre", "rose", "framboise", "cerise", "bordeaux", "terracotta", "sable", "sauge", "sapin", "lilas", "marine"];
  const VIFS_VUS = ["noirb", "chocob", "caramelb", "bordeauxb", "fuchsiab", "framboiseb", "cerise", "orb", "emeraudeb", "sapinb", "bleunuitb", "pruneb"];
  const NOMS = { noir: "Noir", choco: "Chocolat", taupe: "Taupe", greige: "Greige", nude: "Nude", poudre: "Poudre", rose: "Rose", framboise: "Framboise", cerise: "Cerise", bordeaux: "Bordeaux", terracotta: "Terracotta", sable: "Sable", sauge: "Sauge", sapin: "Sapin", lilas: "Lilas", marine: "Marine",
    noirb: "Noir", chocob: "Chocolat", caramelb: "Caramel", bordeauxb: "Bordeaux", fuchsiab: "Fuchsia", framboiseb: "Framboise", orb: "Or", emeraudeb: "Émeraude", sapinb: "Sapin", bleunuitb: "Bleu nuit", pruneb: "Prune" };

  const P = { SALON, ENT, POP, COUL_VUES, VIFS_VUS, NOMS, W: null, D: null, pret: false, etat: { entete: "medaillon", police: "affiche", fond: "", couleur: "noir", vif: "noirb", nomc: "noir", blocs: "verre" } };
  const ecoute = [];
  P.change = fn => ecoute.push(fn);
  const signale = quoi => ecoute.forEach(f => { try { f(quoi); } catch (e) { console.warn(e); } });
  const clique = sel => { const b = P.D && P.D.querySelector(sel); if (b) b.click(); return b; };
  const attends = ms => new Promise(r => setTimeout(r, ms));

  /* 18/11 (Produit) : ?src=loginail-creer/pret.html?… → SON site (le parcours de création l'envoie) */
  P.src = () => { const s = Q.get("src") || ""; if (/^loginail-creer\/pret\.html(\?|$)/.test(s)) return "../" + s; return P.srcExemple(); };
  P.srcExemple = () => `../loginail-creer/pret.html?v=1511m&nouveau&exemple=dilerna&style=1&couleur=noir&mode=jour&police=affiche&paillettes=nacre&${SALON.src}`;

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
      /* 17/11 soir (Marie : « on doit mettre toutes les en-têtes ») : les 23 nouvelles en-têtes gardées (D21, D22),
         code de maquette idees/entetes-nouvelles/, injectées dans son site comme dans la maquette des en-têtes */
      /* 18/11 (Produit) : les nouvelles en-têtes sont maintenant DANS le site (pret.html charge entetes/entetes-plus*.js) */
      if (!W.ENTETES || W.ENTETES.length < 40) for (const n of ["", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]) await new Promise(r => { const s = D.createElement("script"); s.src = `entetes/entetes-plus${n}.js?v=1811b`; s.onload = s.onerror = r; D.body.appendChild(s); });
      try { const tous = W.eval("ENTETES"); const nom = k => (tous.find(x => x[0] === k) || [k, k])[1];
        P.ENT = GARDEES.filter(k => tous.some(x => x[0] === k)).map(k => [k, nom(k)]); } catch (e) { console.warn(e); }
      await attends(250); copieStyles();
      /* départ sobre (comme la page actuelle) : Fleurs, Affiche, noir, blocs « verre » */
      if (P.reprend && P.reprend()) { brancheGestes(); P.pret = true; ok(P); signale("pret"); return; }   /* 18/11 : elle revient → SES choix */
      P.entete("cadre", true);   /* 18/11 (Marie) : au départ, le Reflet holographique SANS reflet (« la cliente se projette ») */ await attends(200);
      clique('#pzPol [data-p="affiche"]'); clique('.pf-dots [data-co="noir"]'); clique('.pf-vifs [data-vif="noirb"]');
      try { W.eval('if(typeof BR!=="undefined"&&BR){BR.nomc="noir";BR.blocs="verre"}window.__lgnChoix=Object.assign(window.__lgnChoix||{},{nomc:"noir",blocs:"verre"})'); } catch (e) {}
      [900, 2200].forEach(t => setTimeout(() => { if (P.etat.police === "affiche") clique('#pzPol [data-p="affiche"]'); }, t));
      /* 18/11 (Marie : « un fond de base, pour l'effet waouh ») : le fond Agrumes dès l'arrivée, couleurs assorties */
      if (P.fonds().some(x => x[0] === P.FOND_DEPART)) { P.fond(P.FOND_DEPART); P.change(function q1(q) { if (q === "fond" && P.etat.fond === P.FOND_DEPART && !P._departFait) { P._departFait = true; if (P.autoAssort !== false) { P.assortir(); P.DEPART_COUL && P.DEPART_COUL(); } } }); }
      setTimeout(() => P.prechargePhotos(), 1500);
      brancheGestes();   /* 17/11 (Marie) : on ne touche plus le site pour choisir la partie à colorer (inutile) */
      P.pret = true; ok(P); signale("pret");
    }, { once: true });
  });

  /* 17/11 (Marie : « écran blanc, puis noir, ça bug ») — le RIDEAU : juste avant un changement, une copie figée de ce qu'elle voit
     se pose sur l'aperçu ; le site se reconstruit derrière (remontage, écriture remise, fond chargé) ; puis la copie s'efface en 140 ms.
     Elle ne voit plus jamais les étapes intermédiaires. */
  let rideau = null, tRideau = 0;
  const animsFinies = () => { try { return !P.D.getAnimations().some(a => a.playState === "running" && a.effect && a.effect.getTiming().iterations !== Infinity); } catch (e) { return true; } };
  P.rideau = (duree = 420, maxi = 1800) => { const D = P.D; if (!D) return; clearTimeout(tRideau); P._verrou = false;
    if (!rideau || !rideau.isConnected) { const e = D.querySelector(".ecran"); if (!e || !e.parentElement) return;
      const c = e.cloneNode(true); c.removeAttribute("id"); c.dataset.rideau = 1; c.querySelectorAll("[id]").forEach(x => x.removeAttribute("id"));
      Object.assign(c.style, { position: "absolute", left: e.offsetLeft + "px", top: e.offsetTop + "px", width: e.offsetWidth + "px", height: e.offsetHeight + "px", zIndex: 99999, pointerEvents: "none", transition: "opacity .14s ease", margin: 0 });
      c.querySelectorAll(".pzPoign").forEach(x => x.remove());
      /* 18/11 soir (Marie : « le carré s'affiche ou pas », « le nom fait un bond ») : la copie est VRAIMENT figée —
         ses couleurs sont recopiées telles quelles (sinon elles changent avec le site) et ses animations d'entrée ne rejouent pas */
      try { const cs = P.W.getComputedStyle(e); for (let i = 0; i < cs.length; i++) { const k = cs[i]; if (k.startsWith("--")) c.style.setProperty(k, cs.getPropertyValue(k)); } } catch (x) {}
      try { const sel = ".he-btn,.he-txt,.hent h1,.hf-nom,.fiche,.note,.kick,button"; const o = [...e.querySelectorAll(sel)], k = [...c.querySelectorAll(sel)];
        o.forEach((x, i) => { const y = k[i]; if (!y) return; const z = P.W.getComputedStyle(x); ["background-color", "background-image", "color", "border-color", "box-shadow"].forEach(p => y.style.setProperty(p, z.getPropertyValue(p), "important")); }); } catch (x) {}
      if (!D.getElementById("pzFige")) { const st = D.createElement("style"); st.id = "pzFige"; st.textContent = "[data-rideau],[data-rideau] *{animation:none!important;transition:none!important}"; D.head.appendChild(st); }
      e.after(c); const d0 = e.querySelector(".defile"), d1 = c.querySelector(".defile"); if (d0 && d1) d1.scrollTop = d0.scrollTop; rideau = c; }
    garde(); const t0 = Date.now(); let sig0 = null;
    /* 18/11 soir (Marie : « le nom fait un bond ») : sous la copie, on règle la taille du nom comme elle sera à l'écran (copie masquée le temps de mesurer,
       dans la même image : rien ne se voit), et on ne dévoile qu'une fois la taille STABLE deux fois de suite (images chargées, mise en page finie) */
    const mesure = () => { const c = rideau, par = c && c.parentNode, suiv = c && c.nextSibling; try { if (c) c.remove(); P.ajusteBouton(999); const n = P.D.querySelector(".ecran .hent h1, .ecran .hf-nom, .ecran h1"), b = n && (n.closest(".he-txt") || n.parentElement);
        return n ? n.style.fontSize + "|" + Math.round(n.getBoundingClientRect().height) + "|" + (b ? b.style.translate : "") : ""; } catch (e) { return ""; } finally { if (c && par) par.insertBefore(c, suiv); } };
    const leve = () => { const sig = mesure(), stable = sig === sig0; sig0 = sig;
      if (Date.now() - t0 < maxi && (!animsFinies() || P._attente > 0 || !ecritureOk() || !stable)) { tRideau = setTimeout(leve, 60); return; }
      const c = rideau; rideau = null; if (!c) return; c.remove(); P._verrou = true; P.leves.forEach(f => { try { f(); } catch (e) {} }); };   /* la taille du nom est calculée APRÈS avoir enlevé la copie, dans la même image : plus de bond */   /* d'un coup : le téléphone et la page changent au même instant */
    tRideau = setTimeout(leve, duree); };
  P._attente = 0; P.leves = []; P.auLever = f => P.leves.push(f);
  /* le GARDIEN de l'écriture : le site remet parfois l'écriture de départ ~0,5 s après un changement ; on la remet aussitôt */
  const premiere = s => String(s || "").split(",")[0].replace(/["']/g, "").trim().toLowerCase();
  const ecritureOk = () => { try { const k = P.etat.police; if (!k) return true; const n = P.D.querySelector(".ecran .hent h1, .ecran .hf-nom, .ecran h1"); if (!n) return true;
    const b = P.D.querySelector(`#pzPol [data-p="${k}"]`); if (!b) return true; return premiere(P.W.getComputedStyle(n).fontFamily) === premiere(b.style.fontFamily || P.W.getComputedStyle(b).fontFamily); } catch (e) { return true; } };
  /* 18/11 soir (Marie : « quand je change de photo, ça change la couleur du bouton ») : le site se reconstruit d'abord avec son bouton doré par défaut ;
     le rideau reste posé tant que le bouton n'a pas retrouvé SA couleur */
  const boutonOk = () => { try { const b = P.D.querySelector(".ecran .he-btn"); if (!b) return true; let att = P.libre && P.libre.bt;
      if (!att) { const v = P.D.querySelector(`.pf-vifs [data-vif="${P.etat.vif}"]`); if (!v) return true; const cv = P.W.getComputedStyle(v); if (cv.backgroundImage !== "none") return true; att = cv.backgroundColor; }
      const t = P.D.createElement("i"); t.style.color = att; P.D.body.appendChild(t); const want = P.W.getComputedStyle(t).color; t.remove();
      return P.W.getComputedStyle(b).backgroundColor === want; } catch (e) { return true; } };
  let gardeJusqua = 0, tGarde = 0;
  const garde = () => { gardeJusqua = Date.now() + 1600; if (tGarde) return;
    const tour = () => { if (!ecritureOk()) { clique(`#pzPol [data-p="${P.etat.police}"]`); P.calme(); P.ajusteBouton(99); }
      if (Date.now() < gardeJusqua) tGarde = setTimeout(tour, 50); else tGarde = 0; }; tour(); };
  /* l'image d'un fond est chargée AVANT de le poser (sinon : écran blanc le temps qu'elle arrive) */
  const fondsPrets = new Set();
  const precharge = nom => new Promise(ok => { const x = P.fonds().find(f => f[0] === nom); const u = x && ((x[1] || "").match(/url\((['"]?)([^'")]+)['"]?\)/) || [])[2];
    if (!u || /^data:/.test(u) || fondsPrets.has(u)) return ok(); const im = new Image(); const fin = () => { fondsPrets.add(u); ok(); }; im.onload = () => (im.decode ? im.decode().catch(() => {}) : Promise.resolve()).then(fin); im.onerror = fin; setTimeout(fin, 1500);
    im.src = new URL(u, P.D.baseURI).href; });
  P.nomSalon = () => { if (Q.has("vrai")) try { const n = P.W.eval("typeof BR!=='undefined'&&BR&&BR.nom||''"); if (n) return n; } catch (e) {} return SALON.nom; };
  P.polices = () => [...P.D.querySelectorAll("#pzPol [data-p]")].map(b => [b.dataset.p, b.textContent.trim()]);
  P.police = k => { P.etat.police = k; P.rideau(); clique(`#pzPol [data-p="${k}"]`); P.calme(); ajusteBientot(); signale("police"); };
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
  /* 18/11 soir (Marie : « le carré bug quand je change de fond ») : avec assort=true, les couleurs assorties sont posées DANS LE MÊME INSTANT que le fond,
     derrière le rideau (avant : 80 ms après, on voyait le carré changer de couleur) */
  P.fond = (n, assort) => { const Pz = P.D.getElementById("pzFonds"); if (!Pz) return; P.etat.fond = n; P.rideau(90); P._attente++;
    precharge(n).then(() => { P._attente--; if (P.etat.fond !== n) return; const b = P.D.createElement("button"); b.dataset.f = n; b.style.display = "none"; Pz.appendChild(b); b.click(); b.remove();
      if (assort) try { P.assortir(); } catch (e) {}
      P.calme(); haloEtoiles(); signale("fond"); }); };
  /* « Assortir à mon fond » : chaque fond connaît sa couleur d'encre ; on prend le bouton le plus proche */
  const rgb = s => { const h = (String(s).match(/#([0-9a-f]{6})/i) || [])[1]; if (h) return [0, 2, 4].map(k => parseInt(h.substr(k, 2), 16)); const m = String(s).match(/\d+/g); return m ? m.slice(0, 3).map(Number) : [0, 0, 0]; };
  const dist = (a, b) => { const x = rgb(a), y = rgb(b); return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2; };
  P.FOND_DEPART = "Ruban framboise sur crème";
  /* son trait framboise n'est pas dans la couleur moyenne : on pose nous-mêmes encadrés poudre + bouton framboise */
  P.DEPART_COUL = () => { if (P.D.querySelector('.pf-dots [data-co="poudre"]')) P.couleur("poudre", true); if (P.D.querySelector('.pf-vifs [data-vif="framboiseb"]')) P.vif("framboiseb"); P.nomc("bordeaux"); };   /* 18/11 soir (Marie) : le beige avec le trait rose */
  /* 18/11 (Marie : « sur un fond rose, il me met du jaune ») : avant, on suivait UNE couleur de détail du fond (f[4]), parfois jaune sur un fond rose.
     Maintenant : la couleur DOMINANTE du fond (mesurée, teintes-fonds.js) décide ; le détail n'est gardé que s'il est de la même famille. */
  const tsl = c => { const [r, g, b] = rgb(c).map(v => v / 255), mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
    const s = d ? d / (1 - Math.abs(2 * l - 1)) : 0; let h = 0; if (d) h = mx === r ? 60 * (((g - b) / d) % 6) : mx === g ? 60 * ((b - r) / d + 2) : 60 * ((r - g) / d + 4); return [(h + 360) % 360, s, l]; };
  const ecH = (a, b) => Math.min(Math.abs(a - b), 360 - Math.abs(a - b));
  const proche = (cible, liste) => { const C = tsl(cible); return liste.reduce((m, b) => { const note = x => { const X = tsl(x.style.background);
      if (C[1] < .15) return dist(x.style.background, cible) / 65025;                     /* fond neutre (blanc, beige, noir) : la plus proche, tout simplement */
      return ecH(X[0], C[0]) / 60 + Math.abs(X[2] - C[2]) * 1.2 + (X[1] < .15 ? 1.5 : 0); };   /* sinon : même famille de couleur d'abord */
    return note(b) < note(m) ? b : m; }); };
  P.assortir = () => { const f = P.fonds().find(x => x[0] === P.etat.fond); if (!f) return false;
    const dom = (window.TEINTES_FONDS || {})[f[0]] || f[4], acc = f[4] || dom; if (!dom) return false;
    const D = tsl(dom), A = tsl(acc);
    /* 18/11 soir : beaucoup de fonds ont reçu la même couleur de détail « moutarde » par défaut (#B?8?2?) : on l'ignore.
       Un fond crème, beige, gris, noir ou blanc compte comme « sans couleur ». */
    const dore = A[0] >= 28 && A[0] <= 62 && A[1] > .3 && !/dor|or|gold|mimosa|soleil|citron|jaune|miel|tournesol|banane/i.test(f[0]);   /* du doré seulement si le fond EST doré ou jaune */
    const moutarde = dore || (A[0] >= 34 && A[0] <= 50 && A[1] > .5 && A[2] > .28 && A[2] < .5), accVrai = !moutarde && A[1] >= .35 && A[2] > .15 && A[2] < .8;
    if (D[1] < .15 || (D[2] > .65 && D[1] < .45) || D[2] < .2) D[1] = 0;
    const ref = accVrai ? acc : dom;
    const vifs = [...P.D.querySelectorAll(".pf-vifs [data-vif]")].filter(b => b.dataset.vif !== "blancb"); if (!vifs.length) return false;
    const R = tsl(ref); if (R[2] > .6 && (R[0] >= 315 || R[0] <= 15)) R[0] = 338;   /* un rose pâle → un bouton framboise, pas rouge */
    const cibleV = R[1] < .15 ? ref : `hsl(${R[0]},${Math.max(45, R[1] * 100)}%,${Math.min(48, R[2] * 100)}%)`;   /* le bouton : la même famille, assez soutenue pour se lire */
    /* 18/11 soir (Marie : « fond noir et bouton jaune ??? ») : fond sans couleur (noir, gris, blanc, beige) → bouton noir, sobre */
    const vifChoisi = (D[1] < .15 && !accVrai) ? (vifs.find(b => b.dataset.vif === "noirb") || proche(dom, vifs)) : proche(hexDe(cibleV), vifs);
    P.vif(vifChoisi.dataset.vif);
    const dots = [...P.D.querySelectorAll(".pf-dots [data-co]")]; const dot = proche(dom, dots); P.couleur(dot.dataset.co, true);
    /* 18/11 soir (Marie : « le nom n'a pas bougé ») : le nom suit aussi — même famille que le bouton, assez foncé pour se lire ; sur encadrés foncés, en blanc */
    try { const clair = tsl(dot.style.background)[2] > .45;
      let nc = "noir"; if (!clair) nc = "blanc";
      else if (D[1] >= .15 || accVrai) { const V = tsl(vifChoisi.style.background); const cand = Object.entries(P.NOMC).filter(([k, v]) => !/gradient/.test(v) && v.startsWith("#")).map(([k, v]) => [k, tsl(v)]).filter(([, x]) => x[2] < .5 && x[1] > .2);
        const best = cand.reduce((m, x) => { const n = ecH(x[1][0], V[0]) / 60 + Math.abs(x[1][2] - Math.min(V[2], .4)); return !m || n < m[0] ? [n, x[0]] : m; }, null); if (best && best[0] < .6) nc = best[1]; }
      P.nomc(nc); } catch (e) {}
    return true; };
  const hexDe = c => { if (/^#/.test(c)) return c; const d = document.createElement("i"); d.style.color = c; document.body.appendChild(d); const m = getComputedStyle(d).color.match(/\d+/g).slice(0, 3); d.remove(); return "#" + m.map(x => (+x).toString(16).padStart(2, "0")).join(""); };

  /* 17/11 soir (Marie) : remettre « Votre site » — la couleur du NOM a sa propre palette (comme l'ancienne page, hero-format.js),
     .pf-dots = la couleur du SITE, et les blocs « Sur blanc / Sur couleur » */
  P.NOMC = {"noir": "#1E1C1B", "blanc": "#FFFFFF", "or": "linear-gradient(170deg,#FFF3C4 0%,#E8C66A 38%,#B8862E 62%,#F6DE92 100%)", "argent": "linear-gradient(170deg,#FFFFFF 0%,#D9DCE2 35%,#8C9098 60%,#F2F3F6 100%)", "rosegold": "linear-gradient(170deg,#FCE3DA 0%,#E8A99A 40%,#B9706A 65%,#F6CFC4 100%)", "champagne": "linear-gradient(170deg,#FFF8EA 0%,#E9D3A8 40%,#B8975E 65%,#F6E7C6 100%)", "cuivre": "linear-gradient(170deg,#FBE0C8 0%,#D98B5A 40%,#9A5530 65%,#F2C29E 100%)", "holo": "linear-gradient(100deg,#FFB3E6 0%,#B3D4FF 30%,#B9FFE0 60%,#FFF3B0 100%)", "pastel": "linear-gradient(100deg,#F7B9CF 0%,#D9C2F2 35%,#B9DAF5 65%,#BDEBD7 100%)", "coucher": "linear-gradient(100deg,#F9C49A 0%,#F6A99B 45%,#F4B6C8 100%)", "glace": "linear-gradient(100deg,#B7D3F0 0%,#CDB8EE 50%,#F4B6C8 100%)", "citron": "linear-gradient(100deg,#F6E3A1 0%,#B9E6D3 100%)", "rosep": "#F4B6C8", "lilasp": "#CDB8EE", "bleup": "#B7D3F0", "mentep": "#B9E6D3", "peche": "#F7C6A8", "orangep": "#F9C49A", "jaunep": "#F6E3A1", "corailp": "#F6A99B", "lavande": "#B9A6E8", "sauge": "#A9C3A2", "ciel": "#9FCBEB", "creme": "#F4EADB", "beige": "#D9C4A8", "corail": "#F07A65", "rouge": "#C8243A", "bordeaux": "#7A1F33", "fuchsia": "#E0368C", "violet": "#7B3FB5", "turquoise": "#2BB3B1", "vert": "#1F7A55", "bleunuit": "#1F2E5C", "choco": "#5A3A28", "bleuroi": "#2F57E8", "bleuneon": "linear-gradient(100deg,#6FA8FF 0%,#2F57E8 50%,#7B5CFF 100%)"};
  const reveille = () => { const i = P.D.createElement("i"); P.D.body.appendChild(i); setTimeout(() => i.remove(), 30); };
  P.nomc = k => { P.etat.nomc = k; if (!P._libreEnCours) P.effaceLibre("nm"); P.calme(); try { P.W.eval(`if(typeof BR!=="undefined"&&BR)BR.nomc=${JSON.stringify(k)};window.__lgnChoix=Object.assign(window.__lgnChoix||{},{nomc:${JSON.stringify(k)}})`); } catch (e) {} reveille(); signale("couleur"); };
  P.blocs = v => { P.etat.blocs = v; P.calme(); try { P.W.eval(`if(typeof BR!=="undefined"&&BR)BR.blocs=${JSON.stringify(v)};window.__lgnChoix=Object.assign(window.__lgnChoix||{},{blocs:${JSON.stringify(v)}})`); } catch (e) {} reveille();
    try { const d = P.D.querySelector(".ecran .defile"), sec = P.D.querySelector(".ecran .defile>.sec"); if (d && sec && d.scrollTop < sec.offsetTop - 300) d.scrollTo({ top: sec.offsetTop - 150, behavior: "smooth" }); } catch (e) {} signale("couleur"); };
  /* 17/11 (Marie : « que les couleurs soient impeccables ») : la couleur EXACTE choisie au doigt, sans l'arrondir à une des ~50 couleurs du site.
     Encadrés : on règle --creme (fond clair) et --noir (encre) de la page ; nom : sa couleur ; bouton : --encre. */
  P.libre = { bl: null, nm: null, bt: null };
  const hx = h => { const m = String(h).match(/#([0-9a-f]{6})/i); return m ? [0, 2, 4].map(i => parseInt(m[1].substr(i, 2), 16)) : [0, 0, 0]; };
  const toHex = a => "#" + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
  const melange = (a, b, k) => toHex(hx(a).map((v, i) => v * (1 - k) + hx(b)[i] * k));
  function peintLibre() { const D = P.D; if (!D) return; let st = D.getElementById("pzLibre"); if (!st) { st = D.createElement("style"); st.id = "pzLibre"; D.head.appendChild(st); }
    const L = P.libre; let css = "";
    try { P.W.eval(`if(typeof BR!=="undefined"&&BR)BR.libre=${JSON.stringify(L)}`); } catch (e) {}   /* 18/11 : gardée dans son brouillon (le site publié la pose avec couleur-libre.js) */
    if (L.bl) { const fonce = melange(L.bl, "#141210", .78); css += `.ecran{--creme:${L.bl}!important;--noir:${fonce}!important;--gris:${melange(L.bl, "#141210", .5)}!important;--lgn-bloc:${L.bl}!important}`; }
    if (L.bt) css += `.ecran,.ecran [data-vif]{--encre:${L.bt}!important;--btn:${L.bt}!important;--acc:${L.bt}!important}.ecran .hent .he-btn,.ecran .defile :is(.hf-res,.hbtn){background:${L.bt}!important;border-color:${L.bt}!important}`;
    st.textContent = css; peintNomLibre(); }
  /* le site pose la couleur du nom DIRECTEMENT sur le nom (style « important ») : on fait pareil, et on la remet si le site la repeint */
  const NOMSEL = ".ecran h1, .ecran .hf-nom";
  function peintNomLibre() { const D = P.D, c = P.libre.nm; if (!D) return;
    D.querySelectorAll(NOMSEL).forEach(el => { const tous = [el, ...el.querySelectorAll("*:not(i)")];
      if (c) { el.style.setProperty("background", "none", "important"); tous.forEach(x => { x.style.setProperty("color", c, "important"); x.style.setProperty("-webkit-text-fill-color", c, "important"); }); el._libre = 1; }
      else if (el._libre) { el._libre = 0; ["color", "-webkit-text-fill-color", "background"].forEach(k => tous.forEach(x => x.style.removeProperty(k)));
        const z = D.createElement("i"); D.body.appendChild(z); z.remove(); } });   /* petit signal : le site repeint son nom normal */
    if (!D._obsLibre) { D._obsLibre = new P.W.MutationObserver(() => { if (P.libre.nm) { clearTimeout(D._tLibre); D._tLibre = setTimeout(peintNomLibre, 160); } });
      D._obsLibre.observe(D.body, { childList: true, subtree: true }); } }
  P.couleurLibre = (q, hex) => { P.libre[q] = hex; peintLibre(); };
  P.effaceLibre = (...qs) => { (qs.length ? qs : ["bl", "nm", "bt"]).forEach(q => P.libre[q] = null); peintLibre(); };
  P.couleurs = () => [...P.D.querySelectorAll(".pf-dots [data-co]")].map(b => [b.dataset.co, b.style.background]);
  P.vifs = () => [...P.D.querySelectorAll(".pf-vifs [data-vif]")].map(b => [b.dataset.vif, b.style.background]);
  /* après un remontage du site (couleur, boutons), on remet TOUT DE SUITE son écriture et ses réglages, sous le rideau */
  const remet = () => { if (P.etat.police) clique(`#pzPol [data-p="${P.etat.police}"]`);
    try { const e = P.etat; P.W.eval(`if(typeof BR!=="undefined"&&BR){BR.nomc=${JSON.stringify(e.nomc || "noir")};BR.blocs=${JSON.stringify(e.blocs || "verre")}}window.__lgnChoix=Object.assign(window.__lgnChoix||{},{nomc:${JSON.stringify(e.nomc || "noir")},blocs:${JSON.stringify(e.blocs || "verre")}})`); } catch (x) {}
    P.calme(); };
  /* 17/11 : la couleur du site change DIRECTEMENT (on remplace la classe c-xxx), sans reconstruire le site : instantané, même résultat
     (vérifié : blocs, bouton, sections, nom identiques). Si ça ne marche pas, on revient à l'ancienne façon, sous le rideau. */
  P.couleur = (k, muet) => { P.etat.couleur = k; if (!P._libreEnCours) P.effaceLibre("bl"); let ok = false;
    try { ok = P.W.eval(`(()=>{const box=document.querySelector("[data-pf]");if(!box)return false;const e=box.querySelector(".ecran"),o=box._c,k=${JSON.stringify(k)};if(o===k)return true;const r=new RegExp("(^| )([cn])-"+o+"( |$)");if(!r.test(e.className))return false;e.className=e.className.replace(r,"$1$2-"+k+"$3");box._c=k;if(typeof BR!=="undefined"&&BR)BR.couleur=k;box.querySelectorAll("[data-co]").forEach(b=>b.classList.toggle("on",b.dataset.co===k));return true})()`); } catch (e) {}
    if (!ok) { P.rideau(650); clique(`.pf-dots [data-co="${k}"]`); if (P.etat.vif) P.vif(P.etat.vif, true); remet(); [60, 200].forEach(ms => setTimeout(remet, ms)); }
    if (!muet) signale("couleur"); };
  /* attention : recliquer la même couleur de boutons l'ENLÈVE dans le site ; on ne clique que si elle change */
  P.vif = (k, force) => { P.etat.vif = k; if (!P._libreEnCours) P.effaceLibre("bt"); let cur = ""; try { cur = P.W.eval('typeof BR!=="undefined"&&BR?BR.vif||"":""'); } catch (e) {}
    if (cur !== k || force) { if (force && cur === k) return; clique(`.pf-vifs [data-vif="${k}"]`); } signale("couleur"); };

  P.entete = (k, muet) => { P.etat.entete = k; const W = P.W; if (!muet) P.rideau();
    try { W.eval(`window.__entete=${JSON.stringify(k)};if(typeof BR!=="undefined"&&BR)BR.entete=${JSON.stringify(k)};if(!(window.__changeEntete&&window.__changeEntete())){const b=document.querySelector("[data-pf]");b&&b._maj&&b._maj(1)}`); } catch (e) {}
    setTimeout(() => { if (P.etat.police) clique(`#pzPol [data-p="${P.etat.police}"]`); }, 90);
    P.calme(); ajusteBientot(); if (!muet) signale("entete"); };

  /* les en-têtes en petites images : une copie de SON site en tout petit (même méthode que la page actuelle) */
  let feuille = null;
  function feuilleSite() { if (feuille) return feuille; const regles = [];
    for (const sh of P.D.styleSheets) { let rs; try { rs = sh.cssRules; } catch (e) { continue; } const base = sh.href || P.D.baseURI;
      const abs = t => t.replace(/url\((['"]?)(?!data:|https?:|blob:|#)([^'")]+)\1\)/g, (m, q, u) => `url("${new URL(u, base).href}")`);
      /* 19/11 (Marie : « les looks ne sont pas en format téléphone, ça dénature mes créations ») : les petits téléphones (looks,
         en-têtes) prenaient les tailles de l'ÉCRAN de l'ordinateur (règles « téléphone » sautées, hauteurs en vh de l'ordinateur).
         On les calcule comme dans le vrai téléphone du milieu (390 × 844) : même rendu sur ordinateur et sur téléphone. */
      const W = P.W, vw = (W && W.innerWidth) || 390, vh = (W && W.innerHeight) || 844;
      const unites = t => t.replace(/(^|[^\w.-])(\d*\.?\d+)[dsl]?v(h|w|min|max)\b/g, (m, a, n, u) => a + (+n * (u === "h" ? vh : u === "w" ? vw : u === "min" ? Math.min(vw, vh) : Math.max(vw, vh)) / 100).toFixed(2) + "px");
      const ajoute = liste => { for (const r of liste) { if (r.type === 3 || r.type === 5) continue;
        if (r.type === 4) { let ok = false; try { ok = (W || window).matchMedia(r.conditionText || r.media.mediaText).matches; } catch (e) {} if (ok) ajoute(r.cssRules); continue; }
        regles.push(unites(abs(r.cssText)).replace(/:root/g, ":host")); } };
      ajoute(rs); }
    P.policesCss(); feuille = new CSSStyleSheet(); feuille.replaceSync(regles.join("\n") + "\n:host{display:block;position:relative;overflow:hidden}\n:host>.ecran::before{display:none!important}\n:host *{overflow:hidden!important;scroll-behavior:auto!important}\n.ile{display:none!important}\n:host(.off) *,:host(.off) *::after{animation-play-state:paused!important}"); return feuille; }
  /* 17/11 (Marie : « ça met grave du temps ») : la mise en forme du site est recopiée UNE fois par tournée, plus 37 fois */
  P.nouvelleFeuille = () => { feuille = null; };
  /* changer de fond / d'écriture / de couleur ne rejoue plus l'animation d'arrivée du site : on la termine tout de suite
     (les animations qui tournent en boucle, elles, continuent) */
  P.calme = () => { const fin = () => { try { P.D.getAnimations().forEach(a => { const it = a.effect && a.effect.getTiming().iterations; if (it !== Infinity && (a.playState === "running" || a.playState === "pending")) a.finish(); }); } catch (e) {} };
    fin(); [0, 16, 50, 120, 250, 500].forEach(ms => setTimeout(fin, ms)); };
  /* 17/11 (Marie : « le bouton Réserver un créneau ne doit jamais dépasser ») : si le bouton du haut du site touche le bas
     du 1er écran, le nom rapetisse doucement jusqu'à ce que le bouton soit entier (règle pour TOUTES les en-têtes et écritures) */
  const enMouvement = () => { try { return P.D.getAnimations().some(a => a.playState === "running" && a.effect && a.effect.getTiming().iterations !== Infinity); } catch (e) { return false; } };
  P.ajusteBouton = (essai = 0) => { if (P._verrou && essai !== 999) return;   /* 18/11 soir : une fois le site dévoilé, la taille du nom ne bouge plus jusqu'au prochain changement */
    if (enMouvement() && essai < 25) return setTimeout(() => P.ajusteBouton(essai + 1), 120);   /* 17/11 : on mesure quand plus rien ne bouge (sinon le nom rapetissait à chaque clic) */
    try { const D = P.D, W = P.W, H = W.innerHeight, marge = 30;
    const b = [...D.querySelectorAll(".ecran button")].find(x => /r[ée]server un cr[ée]neau/i.test(x.textContent)); if (!b) return;
    const nom = D.querySelector(".ecran .hent h1, .ecran .hf-nom, .ecran h1"); if (!nom) return;
    const bloc = b.closest(".fiche") || b.parentElement; bloc.style.removeProperty("translate");
    nom.style.removeProperty("font-size"); const f0 = parseFloat(W.getComputedStyle(nom).fontSize); let f = f0, n = 0;
    /* 17/11 (Marie) : le nom tient TOUJOURS sur une seule ligne : on rapetisse juste ce qu'il faut */
    nom.style.setProperty("white-space", "nowrap", "important");
    const cadre = nom.parentElement, cs = W.getComputedStyle(cadre), dispo = cadre.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - 4;
    /* 18/11 soir (Marie : « le nom fait un bond ») : EXACTEMENT le même calcul que le site (hero-format.js, ajusteNom) — avant, les deux ne tombaient
       pas d'accord (44 px ici, 42 px là-bas) et le nom sautait de l'un à l'autre */
    const large = () => nom.scrollWidth > nom.clientWidth + 1 || Math.max(nom.scrollWidth, nom.getBoundingClientRect().width) > dispo + 40;
    let m = 0; while (large() && f > 18 && m++ < 40) { f *= .95; nom.style.setProperty("font-size", f.toFixed(1) + "px", "important"); }
    const touche = () => { const r = b.getBoundingClientRect(); return r.top < H && r.bottom > H - marge; };
    /* 18/11 soir : on ne rétrécit plus le nom pour faire remonter le bouton (le site retenait cette taille et le nom faisait des bonds) : le carré remonte, c'est tout */
    if (touche()) { const d = Math.ceil(b.getBoundingClientRect().bottom - (H - marge)); bloc.style.setProperty("translate", `0 -${d}px`); }
    } catch (e) {} };
  let tAj = 0; const ajusteBientot = () => { clearTimeout(tAj); tAj = setTimeout(() => P.ajusteBouton(), 80); };
  P.miniEntete = (hote, k, largeur) => { const W = P.W, D = P.D; try { try { CSS.registerProperty({ name: "--pzr", syntax: "<length>", inherits: false, initialValue: "0px" }); } catch (e) {}   /* 19/11 (D54) : la trame de points anime ce réglage */
    const ec = D.querySelector(".ecran"); if (!ec || !W.entete || !W.__eT) return; const fs = feuilleSite(), root = D.documentElement.style.cssText, sc = largeur / 390;
    let acc = "#1E1C1B"; try { acc = W.eval('accDuFond()||"#1E1C1B"'); } catch (e) {}
    const nomV = D.querySelector(".ecran .hent h1, .ecran .hf-nom, .ecran h1"), police = nomV ? getComputedStyle(nomV).fontFamily : "";
    if (police && fs._pol !== police) { fs.insertRule(`.hent h1,.hent .pol span{font-family:${police}!important}`, fs.cssRules.length); fs._pol = police; }
    const c = document.importNode(ec, true); c.querySelectorAll(".lgn-sticker,.indiceD,.cookies,.grand,.defile>.hf,.ile,.lm-btn").forEach(x => x.remove());
    c.querySelectorAll("[style*='url(']").forEach(x => x.setAttribute("style", x.getAttribute("style").replace(/url\((['"]?)(?!data:|https?:|blob:|#)([^'")]+)\1\)/g, (q, z, u) => `url("${new URL(u, D.baseURI).href}")`)));
    c.querySelectorAll("img[src]").forEach(x => { x.src = new URL(x.getAttribute("src"), D.baseURI).href; x.loading = "eager"; });
    const tmp = document.createElement("div"); tmp.innerHTML = W.entete(k, ...W.__eT); const n = tmp.firstElementChild; if (!n) return; n.style.setProperty("--acc", acc);
    const h = c.querySelector(".defile>.hent,.defile>[data-s='accueil']") || c.querySelector(".hent,[data-s='accueil']"); if (h) { h.replaceWith(n); n.classList.remove("hf-cache"); } else (c.querySelector(".defile") || c).prepend(n); c.classList.add("a-entete");
    if (SALON.vrai) { const w = document.createTreeWalker(c, NodeFilter.SHOW_TEXT); let t; while ((t = w.nextNode())) t.nodeValue = t.nodeValue.replace(SALON.vrai, SALON.nom).replace(SALON.vrai.toUpperCase(), SALON.nom.toUpperCase()); }
    Object.assign(c.style, { position: "absolute", left: "0", top: "0", width: "390px", height: "844px", borderRadius: "0", transform: `scale(${sc})`, transformOrigin: "0 0" });
    const sr = hote.shadowRoot || hote.attachShadow({ mode: "open" }); sr.adoptedStyleSheets = [fs]; sr.innerHTML = ""; hote.setAttribute("style", root); sr.appendChild(c);
  } catch (e) { console.warn("mini en-tête", e); } };

  /* 17/11 (Marie : « mon look 1, c'est pas joli : il faut que le carré soit SON look ») : une copie figée du haut de son site
     (en-tête, fond, écriture, couleurs, charms), gardée avec le look, puis remontrée en tout petit */
  P.photoSite = () => { const D = P.D; try { const ec = D.querySelector(".ecran"); if (!ec) return null;
    const c = ec.cloneNode(true); c.querySelectorAll(".indiceD,.cookies,.grand,.ile,.lm-btn,.pzVise,script,.pz-poignee,.pzPoig").forEach(x => x.remove());
    c.querySelectorAll(".lgn-sticker").forEach(x => x.classList.remove("choisi", "pzChoisi"));
    const df = c.querySelector(".defile"); if (df) [...df.children].slice(3).forEach(x => x.remove());   /* seulement le haut : plus léger */
    c.querySelectorAll("[style*='url(']").forEach(x => x.setAttribute("style", x.getAttribute("style").replace(/url\((['"]?)(?!data:|https?:|blob:|#)([^'")]+)\1\)/g, (q, z, u) => `url("${new URL(u, D.baseURI).href}")`)));
    c.querySelectorAll("img[src]").forEach(x => { x.setAttribute("src", new URL(x.getAttribute("src"), D.baseURI).href); x.removeAttribute("loading"); });
    if (SALON.vrai) { const w = D.createTreeWalker(c, NodeFilter.SHOW_TEXT); let t; while ((t = w.nextNode())) t.nodeValue = t.nodeValue.replace(SALON.vrai, SALON.nom).replace(SALON.vrai.toUpperCase(), SALON.nom.toUpperCase()); }
    return { h: c.outerHTML, r: D.documentElement.style.cssText, w: ec.offsetWidth || 390, ht: ec.offsetHeight || 844 }; } catch (e) { console.warn("photo du site", e); return null; } };
  P.montreSite = (hote, ph, largeur) => { try { const fs = feuilleSite(), sc = largeur / ph.w;
    const sr = hote.shadowRoot || hote.attachShadow({ mode: "open" }); sr.adoptedStyleSheets = [fs]; sr.innerHTML = ph.h; hote.setAttribute("style", ph.r);
    const c = sr.firstElementChild; Object.assign(c.style, { position: "absolute", left: "0", top: "0", width: ph.w + "px", height: ph.ht + "px", borderRadius: "0", transform: `scale(${sc})`, transformOrigin: "0 0", pointerEvents: "none" });
  } catch (e) { console.warn("montre site", e); } };

  /* les charms : posés DANS son site, ils flottent ; on les glisse au doigt ou à la souris */
  P.charmsTous = () => Object.keys(P.W.CH_IMG || {});
  P.familles = () => (window.CH_FAMS || []).filter(f => !f[1].startsWith("*")).map(f => f[0]);
  P.charmsDe = fam => fam === "Populaires" ? POP : P.charmsTous().filter(n => (window.CH_CAT || {})[n] === fam);
  P.imgCharm = n => `../loginail-site/charms/${n}.webp`;   /* 20/11 : WebP sans perte (pixels identiques) */
  P.MAX = 21;   /* 17/11 (Marie) : 21 charms maximum, comme l'ancienne page */
  P.poses = () => [...P.D.querySelectorAll(".lgn-sticker:not(.lgn-etoile)")].map(x => x.dataset.n);
  const boite = () => P.D.querySelector(".defile") || P.D.scrollingElement;
  const majS = im => { im.style.width = im.style.height = im._s + "px"; im.style.rotate = im._r + "deg"; im.style.scale = im._f === -1 ? "-1 1" : ""; cadre(); };
  P.charm = n => { const D = P.D, box = boite();
    const deja = D.querySelector(`.lgn-sticker[data-n="${n}"]`); if (deja) { if (choisi === deja) choisit(null); deja.remove(); signale("charms"); return false; }
    if (P.poses().length >= P.MAX) return false;
    const im = D.createElement("img"); im.src = "../loginail-site/charms/" + n + ".webp"; im.className = "lgn-sticker"; im.draggable = false; im.dataset.n = n;
    const i = P.poses().length, places = [[.08, .16], [.7, .12], [.74, .44], [.06, .5], [.4, .06], [.78, .7], [.1, .74], [.5, .52]], pl = places[i % places.length];
    im._s = 74; im._r = Math.round(Math.random() * 30 - 15);
    im.style.cssText = `position:absolute;z-index:9000;left:${box.clientWidth * pl[0]}px;top:${box.scrollTop + box.clientHeight * pl[1]}px;touch-action:none;cursor:grab;user-select:none;filter:drop-shadow(0 4px 6px rgba(0,0,0,.25));animation:pzArrive .5s cubic-bezier(.3,1.5,.5,1) both`;
    im.addEventListener("animationend", () => { im.style.animation = "none"; }, { once: true });   /* 17/11 (Marie : « les charms sont flous ») : l'animation d'arrivée laissait l'image en basse qualité */
    majS(im); box.appendChild(im); signale("charms"); return true; };

  /* 17/11 (Marie) : BOUGER, AGRANDIR, PENCHER — comme l'ancienne page :
     téléphone : un doigt = déplacer, deux doigts = agrandir et pencher ; glisser tout en bas = enlever
     ordinateur : on clique un charm → un cadre avec 2 poignées : ◢ (tirer = agrandir + pencher) et ✕ (enlever) ; la molette agrandit, Maj + molette penche */
  let choisi = null, poign = null;
  function cadre() { if (!poign) return; const c = choisi; if (!c || !c.isConnected) { poign.hidden = true; return; }
    if (poign.parentNode !== c.parentNode) c.parentNode.appendChild(poign);
    poign.hidden = false; Object.assign(poign.style, { left: c.style.left, top: c.style.top, width: c._s + "px", height: c._s + "px", rotate: c._r + "deg" }); }
  function choisit(c) { choisi = c; P.D.querySelectorAll(".lgn-sticker.choisiC").forEach(x => x.classList.toggle("choisiC", x === c)); if (c) c.classList.add("choisiC"); cadre(); }
  P.enleve = c => { if (!c) return; if (choisi === c) choisit(null); c.animate([{ scale: 1 }, { scale: 0, opacity: 0 }], { duration: 220 }).onfinish = () => { c.remove(); signale("charms"); }; };
  function brancheGestes() { const D = P.D, W = P.W;
    const st = D.createElement("style"); st.textContent = `@keyframes pzArrive{from{opacity:0;transform:scale(.3)}to{opacity:1;transform:none}}
      @keyframes lgnSc{0%,100%{opacity:.2;transform:scale(.6)}50%{opacity:1;transform:scale(1.1)}}
      .lgn-etoile{container-type:size;display:grid;place-items:center;filter:none!important}
      .lgn-etoile i{font-style:normal;font-size:100cqmin;line-height:1;color:#fff;text-shadow:0 0 6px color-mix(in srgb,var(--lgn-halo,#ffa0c8) 92%,transparent),0 0 14px color-mix(in srgb,var(--lgn-halo,#ffa0c8) 70%,transparent),0 0 1.5px color-mix(in srgb,var(--lgn-halo,#c0508c) 75%,#000 10%);animation:lgnSc 1.6s ease-in-out infinite;pointer-events:none}
      .pzPoign{position:absolute;z-index:9500;pointer-events:none;box-sizing:border-box;border:1.5px dashed rgba(181,71,94,.9);border-radius:10px;margin:-6px 0 0 -6px;padding:6px;box-sizing:content-box}
      .pzPoign[hidden]{display:none}
      .pzPoign b{position:absolute;width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.35),0 0 0 1.5px #B5475E;display:grid;place-items:center;font:600 11px/1 Jost,sans-serif;color:#B5475E;pointer-events:auto;touch-action:none}
      .pzPoign .tg{right:-11px;bottom:-11px;cursor:nwse-resize}.pzPoign .sx{right:-11px;top:-11px;cursor:pointer}.pzPoign .tr{left:-11px;top:-11px;cursor:grab;font-size:13px}.pzPoign .mi{left:-11px;bottom:-11px;cursor:pointer;font-size:13px}
      .pzPoign b:active{transform:scale(.9)}
      @keyframes lgnFlotte{0%,100%{translate:0 0}50%{translate:0 -7px}}
      /* 17/11 (Marie : « les charms, directement comme la cliente les voit ») : ils flottent TOUJOURS ; celui qu'elle touche s'arrête (pour le bouger, l'agrandir…) */
      .lgn-sticker:not(.lgn-etoile):not(.choisiC){animation-name:lgnFlotte!important;animation-duration:3.2s!important;animation-timing-function:ease-in-out!important;animation-iteration-count:infinite!important}
      .lgn-sticker.choisiC{animation:none!important;translate:none!important}
      html.pzCliente .pzPoign{display:none!important}`;
    D.head.appendChild(st);
    poign = D.createElement("div"); poign.className = "pzPoign"; poign.hidden = true; poign.innerHTML = '<b class="sx" title="Enlever">✕</b><b class="tg" title="Tirer pour agrandir">⤡</b><b class="tr" title="Tirer pour tourner">↻</b><b class="mi" title="Effet miroir">⇋</b>';
    boite().appendChild(poign);
    const doigts = new Map(); let cible = null, dep = null, coin = null;
    const deux = () => { const p = [...doigts.values()]; if (p.length < 2) return null; const dx = p[1].x - p[0].x, dy = p[1].y - p[0].y; return { d: Math.hypot(dx, dy) || 1, a: Math.atan2(dy, dx) * 180 / Math.PI }; };
    const repart = (x, y) => { dep = { l: parseFloat(cible.style.left), t: parseFloat(cible.style.top), x, y, s: cible._s, r: cible._r, g: deux() }; };
    const centre = c => { const r = c.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
    D.addEventListener("pointerdown", e => {
      const k = e.target.closest?.(".pzPoign b");
      if (k && choisi) { e.preventDefault(); e.stopPropagation();
        if (k.classList.contains("sx")) { P.enleve(choisi); return; }
        if (k.classList.contains("mi")) { choisi._f = choisi._f === -1 ? 1 : -1; majS(choisi); signale("charms"); return; }
        const [cx, cy] = centre(choisi); coin = { tourne: k.classList.contains("tr"), cx, cy, d: Math.hypot(e.clientX - cx, e.clientY - cy) || 1, a: Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI, s: choisi._s, r: choisi._r, id: e.pointerId }; k.setPointerCapture?.(e.pointerId); return; }
      const t = e.target.closest?.(".lgn-sticker"); if (!t && !cible) { choisit(null); return; } if (t && !cible) { cible = t; choisit(t); }
      e.preventDefault(); doigts.set(e.pointerId, { x: e.clientX, y: e.clientY }); repart(e.clientX, e.clientY); cible.style.cursor = "grabbing";
    }, { passive: false, capture: true });
    D.addEventListener("pointermove", e => {
      if (coin && e.pointerId === coin.id && choisi) { e.preventDefault(); const d = Math.hypot(e.clientX - coin.cx, e.clientY - coin.cy), a = Math.atan2(e.clientY - coin.cy, e.clientX - coin.cx) * 180 / Math.PI;
        if (coin.tourne) { choisi._r = Math.round(coin.r + a - coin.a); majS(choisi); return; }   /* ↻ : tourner seulement */
        const s0 = coin.s, s = Math.max(28, Math.min(260, s0 * d / coin.d)); choisi.style.left = parseFloat(choisi.style.left) - (s - choisi._s) / 2 + "px"; choisi.style.top = parseFloat(choisi.style.top) - (s - choisi._s) / 2 + "px";
        choisi._s = s; majS(choisi); return; }   /* ⤡ : agrandir seulement */
      if (!cible || !doigts.has(e.pointerId)) return; e.preventDefault(); doigts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const g = deux();
      if (g && dep.g) { cible._s = Math.max(28, Math.min(260, dep.s * g.d / dep.g.d)); cible._r = dep.r + (g.a - dep.g.a); majS(cible); }
      else if (!g) { cible.style.left = (dep.l + e.clientX - dep.x) + "px"; cible.style.top = (dep.t + e.clientY - dep.y) + "px"; cible.style.opacity = e.clientY > W.innerHeight - 60 ? .35 : 1; cadre(); }
    }, { passive: false });
    const leve = e => { if (coin && e.pointerId === coin.id) { coin = null; signale("charms"); return; }
      if (!doigts.has(e.pointerId)) return; doigts.delete(e.pointerId); if (!cible) return;
      if (!doigts.size) { const c = cible; c.style.cursor = "grab"; cible = null;
        if (e.clientY > W.innerHeight - 60) { c.style.opacity = 1; P.enleve(c); } else signale("charms"); }   /* glissé tout en bas = enlevé */
      else { const p = [...doigts.values()][0]; repart(p.x, p.y); } };
    D.addEventListener("pointerup", leve); D.addEventListener("pointercancel", leve);
    D.addEventListener("wheel", e => { const t = e.target.closest?.(".lgn-sticker"); if (!t) return; e.preventDefault(); choisit(t);
      if (e.shiftKey) t._r += e.deltaY > 0 ? 10 : -10; else t._s = Math.max(28, Math.min(260, t._s * (e.deltaY > 0 ? .92 : 1.08))); majS(t); }, { passive: false });
    D.addEventListener("keydown", e => { if ((e.key === "Delete" || e.key === "Backspace") && choisi) P.enleve(choisi); });
  }
  P.choisit = choisit;
  /* 17/11 (Marie) : onglet Couleurs — toucher l'encadré, le nom ou le bouton dans l'aperçu = choisir la partie à colorer ;
     la partie choisie clignote en pointillés roses */
  let viseQ = null;
  const cibles = () => { const D = P.D, b = [...D.querySelectorAll(".ecran button")].find(x => /r[ée]server un cr[ée]neau/i.test(x.textContent)), nom = D.querySelector(".ecran .hent h1, .ecran .hf-nom, .ecran h1");
    return { bt: b, nm: nom, bl: (b && b.closest(".fiche")) || (nom && nom.closest(".fiche")) }; };
  P.vise = () => {}; P._viseAncien = q => { viseQ = q; const D = P.D; if (!D) return; D.querySelectorAll(".pzVise").forEach(x => x.classList.remove("pzVise")); if (!q) return; const c = cibles()[q]; if (c) c.classList.add("pzVise"); };
  function brancheVise() { const D = P.D; const st = D.createElement("style");
    st.textContent = `.pzVise{outline:2px dashed #B5475E!important;outline-offset:5px!important;border-radius:12px;animation:pzViseA 1.6s ease-in-out infinite!important}@keyframes pzViseA{50%{outline-color:rgba(181,71,94,.25)}}`;
    D.head.appendChild(st);
    D.addEventListener("click", e => { if (!viseQ) return; const c = cibles(); let q = null;
      if (c.bt && (c.bt.contains(e.target) || (e.target.closest && e.target.closest(".etoiles,.avis,[class*=etoile]") && c.bl && c.bl.contains(e.target)))) q = "bt";
      else if (c.nm && c.nm.contains(e.target)) q = "nm"; else if (c.bl && c.bl.contains(e.target)) q = "bl";
      if (!q) return; e.preventDefault(); e.stopPropagation(); P.vise(q); signale("vise:" + q); }, true); }
  /* 17/11 (Marie) : « Voir comme ma cliente » : les charms flottent comme sur le vrai site, plus de cadre ni de poignées */
  setInterval(() => { try { P.D.querySelectorAll(".lgn-sticker:not(.lgn-etoile)").forEach((x, i) => { if (!x.style.animationDelay) x.style.animationDelay = (-(i * .7) % 3.2).toFixed(2) + "s"; }); } catch (e) {} }, 700);
  P.modeCliente = on => { choisit(null); P.D.documentElement.classList.toggle("pzCliente", !!on);
    P.D.querySelectorAll(".lgn-sticker:not(.lgn-etoile)").forEach((x, i) => x.style.animationDelay = on ? (-(i * .7) % 3.2).toFixed(2) + "s" : ""); };

  /* 17/11 (Marie) : les ÉTOILES QUI BRILLENT (« ✦ Étoiles ») : un bouquet de 3 à chaque toucher, 12 maximum, la croix enlève le dernier bouquet */
  P.MAX_ETOILES = 12;
  P.nbEtoiles = () => P.D.querySelectorAll(".lgn-etoile").length;
  /* 17/11 (Marie : « si le fond est bleu, le halo des étoiles doit être bleu ») : le halo prend la couleur DOMINANTE du fond
     (teintes-fonds.js), rendue lumineuse pour briller ; fond blanc/gris → la couleur d'encre du fond */
  const haloDuFond = n => { const h = (window.TEINTES_FONDS || {})[n]; if (!h) return "";
    const [r, g, b] = [1, 3, 5].map(k => parseInt(h.substr(k, 2), 16) / 255), mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
    const sat = d ? d / (1 - Math.abs(2 * l - 1)) : 0; if (sat < .12) return ""; let hu = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; hu = (hu * 60 + 360) % 360;
    return `hsl(${Math.round(hu)} ${Math.round(Math.max(sat, .7) * 100)}% 64%)`; };
  function haloEtoiles() { try { const f = P.fonds().find(x => x[0] === P.etat.fond); let c = haloDuFond(P.etat.fond) || (f && f[4]);
    if (!c) { const b = P.D.querySelector(".appel"); c = b ? P.W.getComputedStyle(b).backgroundColor : ""; }
    if (c && !/rgba?\(0, 0, 0, 0\)|transparent/.test(c)) P.D.documentElement.style.setProperty("--lgn-halo", c); else P.D.documentElement.style.removeProperty("--lgn-halo"); } catch (e) {} }
  P.etoiles = () => { const D = P.D; if (P.nbEtoiles() >= P.MAX_ETOILES) return false; haloEtoiles(); const g = "g" + Date.now(), box = boite();
    const cx = box.clientWidth / 2 + (Math.random() * 160 - 80), cy = box.scrollTop + box.clientHeight * (.25 + Math.random() * .4);
    [[0, 0, 34], [38, -26, 20], [-30, 30, 15]].forEach(([dx, dy, s]) => { const e = D.createElement("div"); e.className = "lgn-sticker lgn-etoile"; e.dataset.n = "__etoile"; e.dataset.g = g;
      e.innerHTML = `<i style="animation-delay:${(-Math.random() * 1.6).toFixed(2)}s">✦</i>`; e._s = s; e._r = 0;
      e.style.cssText = `position:absolute;z-index:9000;left:${cx + dx - s / 2}px;top:${cy + dy - s / 2}px;touch-action:none;cursor:grab;user-select:none;animation:pzArrive .5s cubic-bezier(.3,1.5,.5,1) both`;
      majS(e); box.appendChild(e); });
    signale("charms"); return true; };
  P.enleveEtoiles = () => { const l = [...P.D.querySelectorAll(".lgn-etoile")]; if (!l.length) return; const g = l[l.length - 1].dataset.g; l.filter(e => e.dataset.g === g).forEach(e => e.remove()); signale("charms"); };
  P.nomCharm = n => (window.CHNOM || {})[n] || (window.NOM || {})[n] || n;   /* 20/11 : les noms de charms-cat.js en secours (charms-noms.js peut être en retard) */

  /* sa photo du haut (même méthode que la page actuelle : choisitPhoto / litPhoto) */
  P.photos = () => { try { return P.W.eval("(BR.photos||[]).map(p=>p.url)").map(u => new URL(u, P.D.baseURI).href); } catch (e) { return []; } };
  P.photoUne = () => { try { const u = P.W.eval("(BR.photos||[])[BR.principale||0]?.url||''"); return u ? new URL(u, P.D.baseURI).href : ""; } catch (e) { return ""; } };
  /* 18/11 soir (Marie : « changer de photo, ça met 3 heures ») : toutes ses photos sont chargées d'avance ;
     au clic, on attend juste que LA photo soit prête, puis le changement se fait en moins d'une demi-seconde */
  const photoPrete = {}; P.prechargePhotos = () => { try { P.photos().forEach(u => { if (!photoPrete[u]) { const im = new Image(); im.decoding = "async"; im.src = u; photoPrete[u] = im; } }); } catch (e) {} };
  /* 19/11 (Marie : « quand je change une photo, ça enlève les charms ») : changer, retirer ou remettre une photo redessine
     tout l'écran du site, et les charms posés (et les étoiles) partaient avec. On les garde de côté et on les remet à leur place. */
  const cleCh = x => [x.dataset.n, x.dataset.g || "", x.style.left, x.style.top].join("|");
  const gardeCharms = fn => { const pris = [], vus = new Set();
    try { P.D.querySelectorAll(".lgn-sticker").forEach(x => { const k = cleCh(x); if (vus.has(k)) x.remove(); else { vus.add(k); pris.push(x); } }); } catch (e) {}
    /* le site peut aussi recopier les charms dans son nouvel écran : on garde les nôtres, on enlève les copies (sinon ils se dédoublent) */
    const remet = () => { try { const box = boite(), k0 = new Set(pris.map(cleCh)); pris.forEach(x => { if (!x.isConnected) box.appendChild(x); });
      P.D.querySelectorAll(".lgn-sticker").forEach(x => { if (!pris.includes(x) && k0.has(cleCh(x))) x.remove(); }); } catch (e) {} };
    try { return fn(); } finally { if (pris.length) { remet(); [0, 60, 200, 500, 900].forEach(t => setTimeout(remet, t)); } } };
  P.choisitPhoto = u => { const im = photoPrete[u] || Object.assign(new Image(), { src: u }); photoPrete[u] = im; let fait = false;
    const go = () => { if (fait) return; fait = true; gardeCharms(() => P._choisitPhoto(u)); };
    if (im.complete) go(); else { im.onload = im.onerror = go; setTimeout(go, 1200); } };
  P._choisitPhoto = u => { P.rideau(600, 900); try {   /* le site remet ses couleurs ~0,5 s après une nouvelle photo : la copie reste jusque-là ; 18/11 : sa 1re photo remplace « Votre photo apparaîtra ici » partout */ P.W.eval(`(()=>{const u=${JSON.stringify(u)};let i=BR.photos.findIndex(p=>new URL(p.url,document.baseURI).href===u);if(i<0){BR.photos.unshift({url:u,auteurs:[]});if(BR.salon!=null)BR.salon++;i=0;if(BR.photos.length===1)PH.vide=u}
    BR.principale=i;const o=BR.photos.map((_,k)=>k);if(i>0){o.splice(i,1);o.unshift(i)}o.forEach((k,j)=>PH["g"+j]=BR.photos[k].url);const b=document.querySelector("[data-pf]");b&&b._maj&&b._maj(1)})()`); } catch (e) { console.warn(e); }
    setTimeout(() => { if (P.etat.police) clique(`#pzPol [data-p="${P.etat.police}"]`); }, 120); P.calme(); ajusteBientot(); signale("photo"); };
  /* 17/11 (Marie) : elle peut retirer une photo (on en garde toujours au moins une) ; remetPhoto = « Annuler » */
  P.retirePhoto = u => gardeCharms(() => { try { return P.W.eval(`(()=>{const u=${JSON.stringify(u)};if(BR.photos.length<2)return null;const i=BR.photos.findIndex(p=>new URL(p.url,document.baseURI).href===u);if(i<0)return null;
    const p=BR.photos.splice(i,1)[0];if(BR.salon!=null){if(BR.salon===i)BR.salon=null;else if(BR.salon>i)BR.salon--}const une=(BR.principale||0);if(une===i)BR.principale=0;else if(une>i)BR.principale=une-1;
    const i0=BR.principale||0,o=BR.photos.map((_,k)=>k);if(i0>0){o.splice(i0,1);o.unshift(i0)}o.forEach((k,j)=>PH["g"+j]=BR.photos[k].url);delete PH["g"+BR.photos.length];const b=document.querySelector("[data-pf]");b&&b._maj&&b._maj(1);return {p,i,une}})()`); } catch (e) { console.warn(e); return null; } finally { signale("photo"); } });
  P.remetPhoto = r => { if (!r) return; gardeCharms(() => { try { P.W.eval(`(()=>{const r=${JSON.stringify(r)};BR.photos.splice(r.i,0,r.p);BR.principale=r.une;const i0=r.une,o=BR.photos.map((_,k)=>k);if(i0>0){o.splice(i0,1);o.unshift(i0)}o.forEach((k,j)=>PH["g"+j]=BR.photos[k].url);const b=document.querySelector("[data-pf]");b&&b._maj&&b._maj(1)})()`); } catch (e) {} signale("photo"); }); };
  P.litPhoto = fi => { const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const m = 1400, k = Math.min(1, m / Math.max(im.width, im.height)), cv = document.createElement("canvas");
    cv.width = Math.round(im.width * k); cv.height = Math.round(im.height * k); cv.getContext("2d").drawImage(im, 0, 0, cv.width, cv.height); P.choisitPhoto(cv.toDataURL("image/jpeg", .85)); }; im.src = r.result; }; r.readAsDataURL(fi); };
  /* 18/11 (Marie : « si elle appuie sur plusieurs photos, elle doit pouvoir en ajouter plusieurs ») : la 1re devient la photo du haut,
     les autres s'ajoutent à ses photos (grilles, réalisations…) sans changer la photo du haut */
  const enImage = fi => new Promise(ok => { const r = new FileReader(); r.onerror = () => ok(null); r.onload = () => { const im = new Image(); im.onerror = () => ok(null); im.onload = () => { const m = 1400, k = Math.min(1, m / Math.max(im.width, im.height)), cv = document.createElement("canvas");
    cv.width = Math.round(im.width * k); cv.height = Math.round(im.height * k); cv.getContext("2d").drawImage(im, 0, 0, cv.width, cv.height); ok(cv.toDataURL("image/jpeg", .85)); }; im.src = r.result; }; r.readAsDataURL(fi); });
  P.litPhotos = async fichiers => { const L = (await Promise.all([...fichiers].slice(0, 12).map(enImage))).filter(Boolean); if (!L.length) return 0;
    if (L.length > 1) try { P.W.eval(`(()=>{const L=${JSON.stringify(L.slice(1))};L.forEach(u=>BR.photos.push({url:u,auteurs:[]}))})()`); } catch (e) { console.warn(e); }
    P.choisitPhoto(L[0]); return L.length; };
  P.enHaut = () => { try { const b = P.D.querySelector(".defile") || P.D.scrollingElement; b.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) {} };

  window.Pilote = P;
})();
