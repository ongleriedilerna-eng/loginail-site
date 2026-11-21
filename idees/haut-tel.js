/* Maquette Design 19/11 — le HAUT de l'accueil, TÉLÉPHONE SEULEMENT (≤ 760 px).
   Chargé par idees/telephone.html?v=A ou ?v=B : injecte ce CSS/JS dans l'accueil affiché dans le téléphone.
   Commun aux 2 versions :
   - les 3 « ✓ 1 mois offert · Sans engagement · 0 % de commission » sur UNE ligne ;
   - les 4 petites notifications (Léa · nouveau RDV, Rappel SMS, Journée complète ?, tonsalon.fr) passent l'une après l'autre
     au même endroit : arrive (0,5 s), reste ~2,6 s, s'en va, la suivante arrive. « Mouvements réduits » : elles changent sans bouger.
   A « Une ligne » : « Un site à ton image. » sur une seule ligne, le reste ne change pas.
   B « Épuré »    : titre sur 2 lignes comme aujourd'hui, mais on retire la phrase grise « Elles réservent… » (elle redit le rose). */
window.HAUT_TEL = (function () {
  const COMMUN = `
@media (max-width:760px){
  html body:not(#_) .np-micro{flex-wrap:nowrap!important; gap:0 14px!important; font-size:12.5px!important; white-space:nowrap; justify-content:center}
  html body:not(#_) .np-micro span{gap:4px}
  html body:not(#_) .np-micro svg{width:13px!important; height:13px!important}
  .np-tourne{position:relative; width:100%; display:flex; justify-content:center; order:var(--ordre,0)}
  .np-tourne .np-float{display:flex!important; position:absolute!important; left:50%!important; top:0!important; right:auto!important;
     transform:translate(-50%,10px)!important; opacity:0; animation:none!important; transition:opacity .5s ease, transform .5s cubic-bezier(.2,.8,.2,1);
     pointer-events:none; white-space:nowrap; margin:0!important}
  .np-tourne .np-float.np-la{opacity:1; transform:translate(-50%,0)!important}
  .np-tourne .np-float.np-part{opacity:0; transform:translate(-50%,-10px)!important}
  .np-tourne .np-pop{display:none!important}
}
@media (max-width:760px) and (prefers-reduced-motion:reduce){ .np-tourne .np-float{transition:opacity .2s linear; transform:translate(-50%,0)!important} }
`;
  const A = `
@media (max-width:760px){
  html body:not(#_) .np h1.serif{font-size:min(9.1vw,38px)!important; line-height:1.05!important; white-space:nowrap}
  html body:not(#_) .np h1.serif .np-sw{white-space:nowrap}
  html body:not(#_) .np h1.serif .np-l2{white-space:normal; font-size:min(5.4vw,21px)!important; margin-top:.35em; display:block}
}`;
  const B = `
@media (max-width:760px){
  html body:not(#_) .np-lead{display:none!important}
  html body:not(#_) .np h1.serif{margin-bottom:22px!important}
}`;
  // C = B + titre plus grand + téléphones plus haut (espaces resserrés, la notification se pose sur le haut des téléphones)
  const C = B + `
@media (max-width:760px){
  html body:not(#_) .np-top{padding-top:10px!important}
  html body:not(#_) .np h1.serif{font-size:min(15.4vw,62px)!important; line-height:.98!important; margin-top:12px!important; margin-bottom:14px!important}
  html body:not(#_) .np h1.serif .np-l2{font-size:.36em!important; margin-top:.62em!important}
  html body:not(#_) .np-paste{margin-top:16px!important}
  html body:not(#_) .np-micro{margin-top:10px!important}
  .np-tourne{margin-top:14px!important; margin-bottom:-46px!important; z-index:6}
}`;
  // les 4 notifications au même endroit, l'une après l'autre
  function tourne(doc, win) {
    if (win.innerWidth > 760) return;
    const f2 = doc.querySelector('.np-f2'); if (!f2) return;
    const all = ['.np-f2', '.np-f3', '.np-f4', '.np-f1'].map(s => doc.querySelector(s)).filter(Boolean);
    const box = doc.createElement('div'); box.className = 'np-tourne';
    box.style.setProperty('--ordre', win.getComputedStyle(f2).order);
    box.style.height = (f2.offsetHeight || 64) + 'px';
    box.style.marginTop = win.getComputedStyle(f2).marginTop; box.style.marginBottom = win.getComputedStyle(f2).marginBottom;
    f2.parentNode.insertBefore(box, f2);
    all.forEach(e => box.appendChild(e));
    let i = 0; all[0].classList.add('np-la');
    win.setInterval(() => {
      const a = all[i]; a.classList.remove('np-la'); a.classList.add('np-part');
      win.setTimeout(() => a.classList.remove('np-part'), 520);
      i = (i + 1) % all.length;
      win.setTimeout(() => all[i].classList.add('np-la'), 350);
    }, 3400);
  }
  return {
    A: { nom: 'A · titre sur une ligne', css: COMMUN + A, js: tourne },
    B: { nom: 'B · épuré (sans la phrase grise)', css: COMMUN + B, js: tourne },
    C: { nom: 'C · épuré, grand titre, téléphones plus haut', css: COMMUN + C, js: tourne },
  };
})();
