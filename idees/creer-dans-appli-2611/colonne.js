/* 27/11 · Personnaliser « B · Écran + colonne à droite » (Marie : « la création de site, on comprend rien […] les en-têtes à droite, qui défilent », puis « Oui, la B »).
   MAQUETTE : posé PAR-DESSUS le vrai Personnaliser (D127 : 6 en-têtes, 8 familles de fonds, 10 écritures, tous les charms) sans rien changer à ses réglages.
   · son site en GRAND à gauche (sans contour de téléphone), toute la largeur qui reste ;
   · les choix dans une COLONNE à droite, qui défile de haut en bas ;
   · les 4 onglets (En-tête · Fond · Écriture · Charms) en bas, sur toute la largeur ;
   · pour Fond et Charms, les familles sur une ligne juste au-dessus des onglets.
   Utilisation : COLONNE.pose(document_de_personnaliser). */
(() => {
  const CSS = `
html.col,html.col body{overflow:hidden}
html.col body #app{display:block!important}
html.col body #app .haut{position:fixed!important;top:0;left:0;right:0;z-index:40}
html.col body #app .ouvB,html.col body #app .tireT,html.col body #app #poignee,html.col body #app .pied,html.col body #app #titreP,html.col body #app #aide,html.col body #app .etoBox,html.col body #app #defileIndice,html.col body #app #revenir{display:none!important}
/* 1 · son site, en grand à gauche */
html.col body #app #scene{position:fixed!important;top:calc(var(--sat,0px) + 52px);left:0;right:var(--colW);bottom:var(--basH);padding:4px 6px 8px 10px!important;display:block!important;transition:bottom .25s cubic-bezier(.2,.9,.25,1)}
html.col body #app #tel{background:#fff!important;padding:0!important;border-radius:22px!important;overflow:hidden;box-shadow:0 10px 28px -12px rgba(60,30,40,.45),0 0 0 1px rgba(30,28,27,.06)!important;transform:none!important}
html.col body #app #tel .ecr{width:100%!important;height:100%!important;border-radius:22px!important;overflow:hidden}
html.col body #app #site{transform-origin:0 0!important}
/* 2 · la colonne des choix, à droite */
html.col body #app #reglages{position:fixed!important;top:calc(var(--sat,0px) + 52px);right:0;width:var(--colW);bottom:var(--basH);background:transparent!important;box-shadow:none!important;border-radius:0!important;padding:0!important;transform:none!important;display:flex!important;flex-direction:column;z-index:20;transition:bottom .25s cubic-bezier(.2,.9,.25,1)}
html.col body #app .choix{flex:1;height:auto!important;min-height:0;position:relative}
html.col body #app .panneau{position:absolute!important;inset:0!important;display:block!important;overflow-y:auto!important;overflow-x:hidden!important;padding:4px 8px 24px 2px!important;scrollbar-width:none;transform:none!important}
html.col body #app .panneau::-webkit-scrollbar{display:none}
html.col body #app .panneau:not(.on){opacity:0!important;visibility:hidden!important;pointer-events:none}
html.col body #app .colT{display:block;font:500 10.5px Jost,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#B5475E;text-align:center;margin:2px 0 8px}
html.col body #app .colT small{display:block;font:400 10.5px Jost,sans-serif;letter-spacing:0;text-transform:none;color:#8A817A;margin-top:1px}
/* en-têtes : une par ligne, grandes */
html.col body #app #lEnt{display:flex!important;flex-direction:column!important;gap:12px!important;padding:0!important;overflow:visible!important;height:auto!important;grid-template-columns:none!important}
html.col body #app #lEnt .ent{width:100%!important;max-width:none!important;min-width:0!important;display:flex!important;flex-direction:column;align-items:center;gap:4px;font-size:11.5px!important;white-space:normal!important;line-height:1.15}
html.col body #app #lEnt .ent:not(.d127),html.col body #app #lPol .ecr-c:not(.d127){display:none!important}
html.col body #app #lEnt .ent .mi{width:100%!important;height:auto!important;aspect-ratio:.72;border-radius:14px!important}
html.col body #app .d127Titre{margin:16px 0 6px!important;font-size:11px!important;text-align:center}
html.col body #app #lPhG{display:grid!important;grid-template-columns:1fr 1fr;gap:6px!important;padding:0!important;height:auto!important;overflow:visible!important}
html.col body #app #lPhG .phw{width:auto!important;height:auto!important;aspect-ratio:1}
/* fonds : 2 par ligne */
html.col body #app .fondDeux{display:block!important;padding:0!important;height:auto!important}
html.col body #app #lFond{display:grid!important;grid-template-columns:1fr 1fr!important;grid-template-rows:none!important;grid-auto-flow:row!important;gap:6px!important;padding:0!important;height:auto!important;overflow:visible!important;width:auto!important}
html.col body #app #lFond .vg{width:auto!important;height:auto!important;aspect-ratio:1;min-width:0!important}
/* écritures : son nom écrit dans chaque écriture, une par ligne */
html.col body #app #lPol{display:flex!important;flex-direction:column!important;gap:8px!important;padding:0!important;overflow:visible!important;height:auto!important;grid-template-rows:none!important}
html.col body #app #lPol .ecr-c{width:100%!important;height:auto!important;min-height:64px;padding:8px 4px!important;display:flex!important;flex-direction:column;align-items:center;justify-content:center;gap:3px;text-align:center}
html.col body #app #lPol .ecr-c span{font-size:17px!important;line-height:1.05!important;white-space:normal!important;overflow:visible!important;text-overflow:clip!important}
html.col body #app #lPol .ecr-c small{font-size:10.5px!important}
/* charms : 2 par ligne */
html.col body #app .outilsC{display:none!important}
html.col body #app .chDeux{display:block!important;padding:0!important;height:auto!important}
html.col body #app #lCh{display:grid!important;grid-template-columns:1fr 1fr!important;grid-template-rows:none!important;grid-auto-flow:row!important;gap:6px!important;padding:0!important;height:auto!important;overflow:visible!important;width:auto!important}
html.col body #app #lCh>*{width:auto!important;height:auto!important;aspect-ratio:1;min-width:0!important}
/* 3 · les familles (Fond, Charms) : une ligne au-dessus des onglets */
html.col body #app .catBoxF,html.col body #app #catBox{position:fixed!important;left:0;right:0;bottom:var(--ongH);height:46px!important;min-height:0!important;width:auto!important;display:block!important;z-index:35;background:rgba(251,246,243,.96);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);margin:0!important;padding:0!important;border-top:1px solid rgba(30,28,27,.06)}
html.col body #app .panneau:not(.on) .catBoxF,html.col body #app .panneau:not(.on) #catBox{display:none!important}
html.col body #app .catBoxF>*:not(#catF),html.col body #app #catBox>*:not(.rg),html.col body #app #catBox>.rg.rgCache{display:none!important}
html.col body #app #catBox>.rg{display:block!important;height:46px!important;min-height:0!important;padding:0!important;margin:0!important}
html.col body #app #catF,html.col body #app #famCh{display:flex!important;flex-wrap:nowrap!important;gap:6px!important;align-items:center!important;height:46px!important;min-height:0!important;flex-direction:row!important;mask:none!important;-webkit-mask:none!important;overflow-x:auto!important;overflow-y:hidden!important;padding:0 12px!important;scrollbar-width:none;grid-template-rows:none!important}
html.col body #app #catF::-webkit-scrollbar,html.col body #app #famCh::-webkit-scrollbar{display:none}
html.col body #app #catF .catI,html.col body #app #famCh .rayonC{flex:none!important;flex-direction:row!important;width:auto!important;height:32px!important;min-height:0!important;min-width:0!important;padding:0 13px!important;gap:0!important;line-height:1!important;border-radius:99px!important;background:#fff!important;box-shadow:0 0 0 1px rgba(30,28,27,.1)!important;display:flex!important;align-items:center;font:400 13px Jost,sans-serif!important;color:#4F4643!important;white-space:nowrap}
html.col body #app #catF .catI .vgI,html.col body #app #famCh .rayonC i{display:none!important}
html.col body #app #catF .catI span,html.col body #app #famCh .rayonC span{font-size:13px!important;margin:0!important;white-space:nowrap}
html.col body #app #catF .catI.on,html.col body #app #famCh .rayonC.on{background:#2B1D20!important;color:#fff!important;box-shadow:none!important}
html.col body #app #catF .catI.on span,html.col body #app #famCh .rayonC.on span{color:#fff!important}
/* 4 · les onglets, en bas sur toute la largeur */
html.col body #app #onglets{position:fixed!important;left:0;right:0;bottom:0;height:var(--ongH);z-index:36;display:flex!important;justify-content:space-around!important;align-items:center;gap:0!important;margin:0!important;padding:0 6px var(--sab,0px)!important;background:#fff!important;border:0!important;border-radius:22px 22px 0 0!important;box-shadow:0 -8px 24px -16px rgba(0,0,0,.3)!important;overflow:visible!important;max-width:none!important}
html.col body #app #onglets>*{flex:1;display:flex!important;flex-direction:column;align-items:center;gap:3px;font:400 12px Jost,sans-serif!important;color:#8A817A!important;padding:0!important;background:none!important;border:0!important;box-shadow:none!important}
html.col body #app #onglets>*::before{content:"";width:40px;height:30px;border-radius:99px;background:#F6F1EE center/20px no-repeat;transition:background-color .15s}
html.col body #app #onglets>*.on{color:#B5475E!important;font-weight:500!important}
html.col body #app #onglets>*.on::before{background-color:#FBE6EF}
html.col body #app #onglets>*::after{display:none!important}
html.col body #app #onglets>[data-o="entete"]::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234F4643' stroke-width='1.6'%3E%3Crect x='4' y='3' width='16' height='18' rx='3'/%3E%3Cpath d='M4 11h16'/%3E%3Ccircle cx='12' cy='7' r='1.6'/%3E%3C/svg%3E")}
html.col body #app #onglets>[data-o="fond"]::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234F4643' stroke-width='1.6'%3E%3Cpath d='M5 11l6-6 7 7-6 6z'/%3E%3Cpath d='M11 5L9 3'/%3E%3Cpath d='M19 15c0 2 1.5 3 1.5 4.3a1.5 1.5 0 01-3 0C17.5 18 19 17 19 15z'/%3E%3C/svg%3E")}
html.col body #app #onglets>[data-o="ecriture"]::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctext x='12' y='17' text-anchor='middle' font-family='Georgia,serif' font-style='italic' font-size='14' fill='%234F4643'%3EAa%3C/text%3E%3C/svg%3E")}
html.col body #app #onglets>[data-o="charms"]::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234F4643' stroke-width='1.6' stroke-linejoin='round'%3E%3Cpath d='M7 4h10l4 5-9 11L3 9z'/%3E%3Cpath d='M3 9h18M9 4l3 16 3-16'/%3E%3C/svg%3E")}
html.col body #app #onglets>:not([data-o]),html.col body #app #onglets>[data-o]:not([data-o="entete"]):not([data-o="fond"]):not([data-o="ecriture"]):not([data-o="charms"]){display:none!important}
`;
  function pose(D, opt = {}) {
    const W = D.defaultView; if (!W || D.documentElement.classList.contains("col")) return;
    const st = D.createElement("style"); st.id = "colCss"; st.textContent = CSS; D.head.appendChild(st);
    const R = D.documentElement; R.classList.add("col"); R.style.setProperty("--colW", "112px"); R.style.setProperty("--ongH", "66px"); if (opt.sat != null) R.style.setProperty("--sat", opt.sat + "px");   /* la place de l'encoche du téléphone (maquette) */
    /* la hauteur du bas : les onglets, + la ligne des familles pour Fond et Charms */
    const bas = () => { const on = D.querySelector(".panneau.on"), fam = !!(on && on.querySelector(".catBoxF,#catBox")); R.style.setProperty("--basH", (66 + (fam ? 46 : 0)) + "px"); };
    /* son site prend toute la largeur qui reste ; on voit le haut de son site, plus long qu'un téléphone */
    const taille = () => { const s = D.getElementById("scene"), T = D.getElementById("tel"), f = D.getElementById("site"); if (!s || !T || !f) return;
      const cs = W.getComputedStyle(s), w = s.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight), h = s.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom), k = w / 390;
      T.style.width = w + "px"; T.style.height = h + "px"; f.style.width = "390px"; f.style.height = (h / k) + "px"; f.style.transform = `scale(${k})`; s.style.setProperty("--tw", w + "px"); };
    W.taille = taille; W.addEventListener("resize", () => setTimeout(taille, 0));
    /* un petit titre en haut de la colonne */
    const TT = { entete: ["Ton en-tête", "6 au choix ↓"], fond: ["Ton fond", "Touche pour essayer ↓"], ecriture: ["Ton écriture", "10 au choix ↓"], charms: ["Tes charms", "Touche pour poser ↓"] };
    const titres = () => D.querySelectorAll(".panneau").forEach(p => { if (p.querySelector(".colT")) return; const k = p.querySelector("#lEnt") ? "entete" : p.querySelector("#lFond") ? "fond" : p.querySelector("#lPol") ? "ecriture" : p.querySelector("#lCh") ? "charms" : "";
      if (!k) return; const t = D.createElement("div"); t.className = "colT"; t.innerHTML = `${TT[k][0]}<small>${TT[k][1]}</small>`; p.prepend(t); });
    /* certaines règles de la page gagnent quand même (posées après) : on force en direct */
    const force = () => { D.querySelectorAll("#lEnt .ent.d127, #lEnt .ent.d127 .mi").forEach(e => e.style.setProperty("width", "100%", "important"));
 };
    const tour = () => { bas(); titres(); force(); };
    let tm = 0; new W.MutationObserver(() => { if (tm) return; tm = W.requestAnimationFrame(() => { tm = 0; tour(); clearTimeout(tour._t); tour._t = setTimeout(taille, 260); }); }).observe(D.getElementById("reglages") || D.body, { attributes: true, childList: true, subtree: true, attributeFilter: ["class"] });
    tour(); taille(); [150, 600, 1500].forEach(t => setTimeout(() => { tour(); taille(); }, t));
  }
  /* suit une fenêtre et toutes ses fenêtres intérieures : chaque fois qu'un Personnaliser (re)charge, on repose la colonne */
  function suit(racine, opt) { const tour = w => { try { const D = w.document; if (/personnaliser\.html$/.test(w.location.pathname) && D.getElementById("reglages") && D.getElementById("onglets") && !D.documentElement.classList.contains("col")) pose(D, opt);
      for (let i = 0; i < w.frames.length; i++) tour(w.frames[i]); } catch (e) {} };
    setInterval(() => tour(racine), 200); }
  window.COLONNE = { pose, suit, CSS };
})();
