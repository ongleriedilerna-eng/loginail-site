/* 18/11 (Produit, D27 + D31) : la VRAIE page Personnaliser (loginail-creer/personnaliser.html), fabriquée à partir de la maquette
   idees/perso-A.html. Ce fichier ajoute ce que la maquette ne faisait pas :
   - ?vrai : son vrai site (son brouillon, localStorage « loginail-brouillon ») ; on reprend ses choix si elle revient ;
   - ses choix sont enregistrés dans son brouillon à chaque changement (et au départ de la page) ;
   - « Publier » / « C'est parfait » : tout est enregistré (charms et étoiles compris, avec place, taille, inclinaison, miroir ;
     couleurs exactes dans BR.libre), puis « Activer mon site » (pret.html?activer) ; dans l'appli : renvoyé à l'appli. */
(function () {
  const P = window.Pilote; if (!P) return;
  const Q = new URLSearchParams(location.search);
  const VRAI = Q.has("vrai"), APPLI = Q.has("appli");
  const evalW = code => { try { return P.W.eval(code); } catch (e) { return undefined; } };
  const boite = () => P.D && (P.D.querySelector(".defile") || P.D.scrollingElement);

  /* les charms posés (maquette : coin haut-gauche en px) → format du site (centre : x en %, y en px, largeur du téléphone w) */
  function stickers() { const b = boite(); if (!b) return []; const w = b.clientWidth || 390;
    return [...P.D.querySelectorAll(".lgn-sticker")].filter(x => x.dataset.n).map(x => { const s = x._s || x.offsetWidth || 74;
      const o = { n: x.dataset.n, x: +((parseFloat(x.style.left) + s / 2) / w * 100).toFixed(2), y: Math.round(parseFloat(x.style.top) + s / 2), s: Math.round(s), r: Math.round(x._r || 0), w };
      if (x._f === -1) o.f = -1; return o; }); }

  /* ses choix → son brouillon (même méthode que l'ancienne page : la boîte [data-pf] du site + __pzEtat) */
  function enregistre() { if (!VRAI || !P.W) return false;
    const plus = { entete: P.etat.entete, nomc: P.etat.nomc || "noir", blocs: P.etat.blocs || "verre", vif: P.etat.vif || "", libre: Object.assign({}, P.libre), stickers: stickers(), charms: [] };
    return evalW(`(()=>{if(typeof BR==="undefined"||!BR)return false;const box=document.querySelector("[data-pf]");
      if(box)Object.assign(BR,{style:box._st>3?1:box._st,epure:box._st===4,coffin:box._st===5,arrondi:box._st===6,couleur:box._c,mode:box._m});
      Object.assign(BR,window.__pzEtat?__pzEtat():{},${JSON.stringify(plus)});
      try{localStorage.setItem("loginail-brouillon",JSON.stringify(BR));return true}catch(e){return "plein"}})()`); }
  window.enregistrePerso = enregistre;

  const noteReprise = () => { try { localStorage.setItem("loginail-reprise", JSON.stringify({ p: "perso", g: Q.get("genre") || "", t: Date.now() })); } catch (x) {} };
  const renvoieAppli = () => { try { const br = JSON.parse(localStorage.getItem("loginail-brouillon"));
    (location.hostname === "loginail.fr" ? ["https://app.loginail.fr", "capacitor://localhost"] : [location.origin]).forEach(o => { try { parent.postMessage({ loginail: "enregistre", br }, o); } catch (_) {} }); } catch (e) {} };

  /* « Publier » et « C'est parfait » */
  window.PUBLIER = () => {
    if (!VRAI) { location.href = "index.html"; return; }   /* sans son vrai site (démo) : on commence par coller son lien */
    const r = enregistre();
    if (r === "plein") { (window.bulle || alert)("Votre téléphone n’a plus de place pour enregistrer. Retirez une photo puis réessayez."); return; }
    if (APPLI) { renvoieAppli(); return; }
    try { localStorage.removeItem("loginail-reprise"); } catch (x) {}
    location.href = "expliquer.html"; };   /* 22/11 (D80) : ses prestations expliquées, puis fini.html */   /* 18/11 (D34) : la page « Votre site est prêt » */

  /* elle revient : on reprend SES choix au lieu du départ sobre (en-tête, écriture, fond, couleurs, couleurs exactes, charms) */
  P.reprend = () => { if (!VRAI) return false;
    const br = evalW(`typeof BR!=="undefined"&&BR?JSON.parse(JSON.stringify({entete:BR.entete,police:BR.police,fond:BR.fond,couleur:BR.couleur,vif:BR.vif,nomc:BR.nomc,blocs:BR.blocs,libre:BR.libre,stickers:BR.stickers})):null`);
    if (!br || !br.entete) return false;
    Object.assign(P.etat, { entete: br.entete, police: br.police || P.etat.police, fond: br.fond || "", couleur: br.couleur || P.etat.couleur, vif: br.vif || "", nomc: br.nomc || "noir", blocs: br.blocs || "verre" });
    P.entete(br.entete, true);
    if (br.police) setTimeout(() => { const b = P.D.querySelector(`#pzPol [data-p="${br.police}"]`); if (b) b.click(); }, 200);
    if (br.libre) Object.keys(P.libre).forEach(q => { if (br.libre[q]) P.couleurLibre(q, br.libre[q]); });
    if (Array.isArray(br.stickers) && br.stickers.length) setTimeout(() => remetCharms(br.stickers), 900);
    return true; };
  function remetCharms(L) { const b = boite(); if (!b) return; P.D.querySelectorAll(".lgn-st").forEach(x => x.remove());
    const k = b.clientWidth / (L[0].w || b.clientWidth || 390);
    L.forEach((c, i) => { const eto = c.n === "__etoile", s = c.s * k, el = P.D.createElement(eto ? "div" : "img");
      el.className = "lgn-sticker" + (eto ? " lgn-etoile" : ""); el.dataset.n = c.n;
      if (eto) { el.dataset.g = "r" + i; el.innerHTML = `<i style="animation-delay:${(-(i * .37) % 1.6).toFixed(2)}s">✦</i>`; } else { el.src = "../loginail-site/charms/" + String(c.n).replace(/[^a-z0-9-]/gi, "") + ".webp"; el.draggable = false; }
      el._s = s; el._r = c.r || 0; el._f = c.f === -1 ? -1 : 1;
      el.style.cssText = `position:absolute;z-index:9000;left:${c.x / 100 * b.clientWidth - s / 2}px;top:${c.y * k - s / 2}px;width:${s}px;height:${s}px;rotate:${el._r}deg;${el._f === -1 ? "scale:-1 1;" : ""}touch-action:none;cursor:grab;user-select:none;${eto ? "" : "filter:drop-shadow(0 4px 6px rgba(0,0,0,.25));"}`;
      b.appendChild(el); }); }

  /* enregistré à chaque changement (et quand elle quitte la page) : rien n'est perdu si elle ferme */
  if (VRAI && !APPLI) { noteReprise(); let t = 0;
    P.change(() => { clearTimeout(t); t = setTimeout(enregistre, 700); });
    addEventListener("pagehide", () => { if (P.pret) enregistre(); }); }
})();
