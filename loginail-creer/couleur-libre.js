/* 18/11 (Produit, D31) : la couleur EXACTE choisie au doigt dans Personnaliser (BR.libre = { bl, nm, bt } en #rrggbb),
   sans l'arrondir à une des ~50 couleurs du site. Même méthode que la maquette (idees/perso-pilote.js, peintLibre) :
   bl = encadrés (--creme, --noir, --gris), nm = le nom (posé directement sur le nom, « important »), bt = bouton Réserver (--btn).
   Personnaliser change BR.libre puis appelle window.__peintLibre() ; le site publié (?s=…) le lit dans son brouillon. */
(function () {
  const ok = h => /^#[0-9a-f]{6}$/i.test(h || "") ? h : null;
  const lib = () => { try { const L = (typeof BR !== "undefined" && BR && BR.libre) || {}; return { bl: ok(L.bl), nm: ok(L.nm), bt: ok(L.bt) }; } catch (e) { return {}; } };
  const hx = h => [0, 2, 4].map(i => parseInt(h.substr(1 + i, 2), 16));
  const toHex = a => "#" + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
  const melange = (a, b, k) => toHex(hx(a).map((v, i) => v * (1 - k) + hx(b)[i] * k));
  const NOMSEL = ".ecran h1, .ecran .hf-nom";
  function peintNom() { const c = lib().nm;
    document.querySelectorAll(NOMSEL).forEach(el => { const tous = [el, ...el.querySelectorAll("*:not(i)")];
      if (c) { el.style.setProperty("background", "none", "important"); tous.forEach(x => { x.style.setProperty("color", c, "important"); x.style.setProperty("-webkit-text-fill-color", c, "important"); }); el._libre = 1; }
      else if (el._libre) { el._libre = 0; ["color", "-webkit-text-fill-color", "background"].forEach(k => tous.forEach(x => x.style.removeProperty(k)));
        const z = document.createElement("i"); document.body.appendChild(z); z.remove(); } }); }   /* petit signal : le site repeint son nom normal */
  function peint() { const L = lib(); let st = document.getElementById("pzLibre");
    if (!st) { st = document.createElement("style"); st.id = "pzLibre"; document.head.appendChild(st); }
    let css = "";
    if (L.bl) css += `.ecran{--creme:${L.bl}!important;--noir:${melange(L.bl, "#141210", .78)}!important;--gris:${melange(L.bl, "#141210", .5)}!important;--lgn-bloc:${L.bl}!important}`;
    if (L.bt) css += `.ecran,.ecran [data-vif]{--encre:${L.bt}!important;--btn:${L.bt}!important;--acc:${L.bt}!important}.ecran .hent .he-btn,.ecran .defile :is(.hf-res,.hbtn){background:${L.bt}!important;border-color:${L.bt}!important}`;
    if (st.textContent !== css) st.textContent = css; peintNom(); }
  window.__peintLibre = peint;
  /* le site repeint parfois son nom (hero-format.js, 120 ms) : on repasse juste après */
  new MutationObserver(() => { if (!lib().nm) return; clearTimeout(peint.t); peint.t = setTimeout(peintNom, 160); }).observe(document.documentElement, { childList: true, subtree: true });
  peint(); [400, 1200, 2500].forEach(ms => setTimeout(peint, ms));
})();
