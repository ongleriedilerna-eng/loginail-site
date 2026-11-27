/* 27/11 · Création du site « PAS À PAS » (Marie : « d'abord elle doit choisir une en-tête, puis un fond, puis une typo, et elle met ses charms et sa déco après… comment on rend ça fluide et simple ? »).
   MAQUETTE : posé PAR-DESSUS la colonne B (colonne.js), elle-même posée sur le vrai Personnaliser D127. Rien n'est changé dans les réglages.
   · les onglets du bas disparaissent : à la place, 4 étapes (En-tête → Fond → Écriture → Charms) et UN gros bouton nacré « Suivant » ;
   · tout est DÉJÀ choisi par la création (son site est déjà beau) : chaque étape = « change si tu veux », jamais bloquée ;
   · quand elle touche un choix, son site change tout de suite et le bouton « Suivant » fait un petit saut (« c'est bon, on continue ») ;
   · elle peut revenir en arrière (‹ ou en touchant une étape déjà faite) ;
   · dernière étape : le bouton devient « J'ai fini mon site ✦ ».
   Utilisation : GUIDE.suit(fenêtre). */
(() => {
  const ETAPES = [
    { o: "entete", nom: "En-tête", titre: "Ton en-tête", fam: false },
    { o: "fond", nom: "Fond", titre: "Ton fond", fam: true },
    { o: "ecriture", nom: "Écriture", titre: "Ton écriture", fam: false },
    { o: "charms", nom: "Charms", titre: "Tes charms", fam: true },
  ];
  const CSS = `
html.col.guide{--ongH:96px!important;--basH:96px!important}
html.col.guide.gFam{--basH:142px!important}
html.col.guide body #app #onglets{display:none!important}
html.col.guide body #app .haut #publier{visibility:hidden!important}
/* la barre du bas : les 4 étapes + le gros bouton */
#gBar{position:fixed;left:0;right:0;bottom:0;height:calc(96px + var(--sab,0px));z-index:37;background:#fff;border-radius:22px 22px 0 0;box-shadow:0 -8px 24px -16px rgba(0,0,0,.3);padding:8px 12px var(--sab,0px);box-sizing:border-box;font-family:Jost,sans-serif}
#gEt{display:flex;gap:4px;margin:0 2px 8px}
#gEt button{flex:1;border:0;background:none;padding:0;display:flex;flex-direction:column;gap:4px;align-items:stretch;font:400 11px Jost,sans-serif;color:#A39A94;cursor:pointer;-webkit-tap-highlight-color:transparent}
#gEt button i{display:block;height:4px;border-radius:9px;background:#EFE8E4;overflow:hidden;position:relative}
#gEt button i::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#E58FB0,#B7A0E0,#F2B79B);transform:scaleX(0);transform-origin:0 50%;transition:transform .35s cubic-bezier(.2,.9,.25,1)}
#gEt button.fait i::after,#gEt button.on i::after{transform:scaleX(1)}
#gEt button.fait{color:#6B625C}
#gEt button.on{color:#B5475E;font-weight:500}
#gEt button:disabled{cursor:default}
#gLigne{display:flex;gap:8px;align-items:center}
#gRet{flex:none;width:50px;height:50px;border-radius:99px;border:0;background:#F6F1EE;color:#4F4643;font:400 24px Jost,sans-serif;line-height:1;cursor:pointer;transition:opacity .2s,width .25s,margin .25s;-webkit-tap-highlight-color:transparent}
#gRet.cache{opacity:0;width:0;margin-right:-8px;pointer-events:none}
#gSuiv{flex:1;height:50px;border:0;border-radius:99px;color:#fff;font:500 16px Jost,sans-serif;letter-spacing:.01em;cursor:pointer;background:linear-gradient(110deg,#D9779B,#B58BD6,#EE9F86,#D9779B);background-size:300% 100%;animation:gNacre 6s ease-in-out infinite;box-shadow:0 10px 22px -12px rgba(181,71,94,.7),inset 0 1px 0 rgba(255,255,255,.35);-webkit-tap-highlight-color:transparent;transition:transform .12s}
#gSuiv:active{transform:scale(.97)}
#gSuiv.saut{animation:gNacre 6s ease-in-out infinite,gSaut .5s cubic-bezier(.3,1.6,.4,1)}
@keyframes gNacre{0%,100%{background-position:0 50%}50%{background-position:100% 50%}}
@keyframes gSaut{0%{transform:scale(1)}35%{transform:scale(1.06)}100%{transform:scale(1)}}
/* la colonne glisse quand on change d'étape */
html.col.guide body #app .panneau.on.gIn{animation:gIn .3s cubic-bezier(.2,.9,.25,1)}
html.col.guide body #app .panneau.on.gOut{animation:gOut .3s cubic-bezier(.2,.9,.25,1)}
@keyframes gIn{from{opacity:0;transform:translateX(18px)!important}}
@keyframes gOut{from{opacity:0;transform:translateX(-18px)!important}}
/* la petite bulle du début, sur son site */
#gBulle{position:fixed;left:16px;right:calc(var(--colW) + 10px);bottom:calc(var(--basH) + 14px);z-index:38;background:rgba(43,29,32,.92);color:#fff;border-radius:16px;padding:10px 13px;font:400 13px/1.35 Jost,sans-serif;box-shadow:0 12px 26px -14px rgba(0,0,0,.6);transition:opacity .35s,transform .35s;pointer-events:none}
#gBulle b{font-weight:500;color:#FBD3E2}
#gBulle.part{opacity:0;transform:translateY(8px)}
`;
  function pose(D) {
    const W = D.defaultView, R = D.documentElement; if (R.classList.contains("guide")) return;
    const st = D.createElement("style"); st.textContent = CSS; D.head.appendChild(st); R.classList.add("guide");
    const bar = D.createElement("div"); bar.id = "gBar";
    bar.innerHTML = `<div id="gEt">${ETAPES.map((e, i) => `<button type="button" data-i="${i}"><i></i>${i + 1} · ${e.nom}</button>`).join("")}</div>
      <div id="gLigne"><button type="button" id="gRet" class="cache" aria-label="Étape d'avant">‹</button><button type="button" id="gSuiv"></button></div>`;
    D.body.appendChild(bar);
    const bulle = D.createElement("div"); bulle.id = "gBulle";
    bulle.innerHTML = `<b>Ton site est déjà prêt ✦</b><br>Touche un choix à droite pour changer, ou « Suivant ».`;
    D.body.appendChild(bulle);
    const ferme = () => bulle.classList.add("part"); setTimeout(ferme, 4500);
    let cur = 0, vu = 0;
    const suiv = D.getElementById("gSuiv"), ret = D.getElementById("gRet");
    const montre = (i, sens) => {
      cur = i; vu = Math.max(vu, i); const e = ETAPES[i];
      const t = D.querySelector(`#onglets>[data-o="${e.o}"]`); if (t) t.click();
      R.classList.toggle("gFam", e.fam);
      D.querySelectorAll("#gEt button").forEach((b, k) => { b.classList.toggle("on", k === i); b.classList.toggle("fait", k < i || (k <= vu && k !== i)); b.disabled = k > vu; });
      ret.classList.toggle("cache", i === 0);
      suiv.textContent = i < ETAPES.length - 1 ? `Suivant · ${ETAPES[i + 1].titre} →` : "J'ai fini mon site ✦";
      setTimeout(() => { const p = D.querySelector(".panneau.on"); if (!p) return;
        const st = p.querySelector(".colT small"); if (st) st.textContent = `Étape ${i + 1} sur 4 ↓`;
        p.scrollTop = 0; if (sens) { p.classList.remove("gIn", "gOut"); void p.offsetWidth; p.classList.add(sens > 0 ? "gIn" : "gOut"); } }, 30);
      W.taille && setTimeout(W.taille, 280);
    };
    suiv.onclick = () => { ferme(); if (cur < ETAPES.length - 1) montre(cur + 1, 1); else { const p = D.getElementById("publier"); if (p) p.click(); } };
    ret.onclick = () => { if (cur > 0) montre(cur - 1, -1); };
    D.getElementById("gEt").onclick = ev => { const b = ev.target.closest("button"); if (!b || b.disabled) return; const i = +b.dataset.i; if (i !== cur) montre(i, i > cur ? 1 : -1); };
    /* elle touche un choix : son site change (la vraie page s'en charge) et « Suivant » fait un petit saut */
    D.getElementById("reglages").addEventListener("click", ev => {
      if (!ev.target.closest(".ent, .vg, .ecr-c, #lCh>*, .phw")) return; ferme();
      suiv.classList.remove("saut"); void suiv.offsetWidth; suiv.classList.add("saut");
    }, true);
    montre(0, 0);
  }
  function suit(racine) { const tour = w => { try { const D = w.document;
      if (D.documentElement.classList.contains("col") && !D.documentElement.classList.contains("guide") && D.getElementById("onglets")) pose(D);
      for (let i = 0; i < w.frames.length; i++) tour(w.frames[i]); } catch (e) {} };
    setInterval(() => tour(racine), 250); }
  window.GUIDE = { pose, suit };
})();
