/* Personnaliser (perso-A) · 17/11 — demande de Marie :
   quand on descend dans une liste (en-têtes, fonds, écritures, looks, charms…),
   la phrase du haut (« Le haut de votre site… ») et, sur ordinateur, le grand titre
   (« Votre en-tête ») s'effacent ; ils reviennent quand on remonte tout en haut
   ou quand on change d'onglet. La place libérée va à la liste : le téléphone
   d'aperçu ne bouge pas. À charger APRÈS le script principal de la page. */
(() => {
  const $ = id => document.getElementById(id);
  const regl = $("reglages"); if (!regl) return;
  const DUREE = 220, COURBE = "cubic-bezier(.2,.8,.2,1)";
  const st = document.createElement("style");
  st.textContent = `.defT{overflow:hidden;transition:height ${DUREE}ms ${COURBE},margin ${DUREE}ms ${COURBE},opacity ${DUREE * .7}ms ease}
.defT.plie{opacity:0;margin-top:0!important;margin-bottom:0!important;min-height:0!important}
#reglages .choix.defC{transition:height ${DUREE}ms ${COURBE}}
@media (prefers-reduced-motion:reduce){.defT,#reglages .choix.defC{transition:none}}`;
  document.head.appendChild(st);

  let plie = false, gagne = 0;
  const textes = () => [$("titreP"), $("aide")].filter(e => e && getComputedStyle(e).display !== "none" && e.textContent.trim());
  const choix = () => regl.querySelector(".choix");
  const hautTotal = e => { const s = getComputedStyle(e); return e.offsetHeight + parseFloat(s.marginTop) + parseFloat(s.marginBottom); };

  function replier(on) {
    if (on === plie) return;
    const els = textes(), c = choix(); if (!els.length || !c) return;
    const fixe = getComputedStyle(c).flexGrow === "0";   /* téléphone : la liste a une hauteur fixe ; ordinateur : elle prend la place toute seule */
    if (on) {
      gagne = els.reduce((t, e) => t + hautTotal(e), 0);
      els.forEach(e => { e.classList.add("defT"); e.style.height = e.offsetHeight + "px"; });
      if (fixe) { c.classList.add("defC"); c.style.height = c.offsetHeight + "px"; }
      void regl.offsetHeight;
      els.forEach(e => { e.style.height = "0px"; e.classList.add("plie"); });
      if (fixe) c.style.height = (parseFloat(c.style.height) + gagne) + "px";
    } else {
      els.forEach(e => { e.classList.add("defT"); e.style.height = "auto"; const h = e.offsetHeight; e.style.height = "0px"; void e.offsetHeight; e.classList.remove("plie"); e.style.height = h + "px"; });
      if (fixe && c.style.height) { c.style.height = (parseFloat(c.style.height) - gagne) + "px"; }
      setTimeout(() => { if (plie) return; els.forEach(e => { e.style.height = ""; e.classList.remove("defT"); }); c.style.height = ""; c.classList.remove("defC"); }, DUREE + 40);
    }
    plie = on;
  }

  /* les listes qui défilent vers le bas : chaque panneau (scroll ne remonte pas : on écoute en capture) */
  regl.addEventListener("scroll", e => {
    const p = e.target; if (!(p instanceof Element) || !p.classList.contains("panneau")) return;
    const y = p.scrollTop;
    if (!plie && y > 14) {
      const reste = p.scrollHeight - p.clientHeight;   /* pas de va-et-vient si la liste dépasse à peine */
      const besoin = textes().reduce((t, el) => t + hautTotal(el), 0) + 24;
      if (reste > besoin) replier(true);
    } else if (plie && y < 3) replier(false);
  }, { capture: true, passive: true });

  /* changement d'onglet (ou de sous-onglet) : on réaffiche si la nouvelle liste est en haut */
  const verifie = () => { const p = regl.querySelector(".panneau.on"); if (plie && (!p || p.scrollTop < 3)) replier(false); };
  regl.addEventListener("click", () => setTimeout(verifie, 0), true);
  new MutationObserver(() => { if (plie) { /* le texte change (autre onglet) pendant qu'il est replié : on le laisse replié seulement si la liste est descendue */ verifie(); } })
    .observe($("aide") || regl, { childList: true, characterData: true, subtree: true });
})();
