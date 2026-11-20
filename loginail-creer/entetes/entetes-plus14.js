/* 20/11 (Marie, D51 + D62) — série 14 : les 4 nouveaux HABITS du carré « Réserver », choisis comme des en-têtes
   (Personnaliser → En-tête, en haut : « Nouveau · votre carré change d'habit »).
   Maquettes : site/idees/carre-reserver.html?v=2 (Ticket) ; carre-reserver-2.html?v=1 (Flacon géant), ?v=3 (Arche), ?v=4 (Sans carré).
   « Aujourd'hui » = l'en-tête existante « Photo encadrée » (cadre).
   Règles (D36) : métier · ville, nom sur UNE ligne, avis, « Réserver un créneau » + prochain créneau ; SA photo, SON fond, SES couleurs.
   Rien ne bouge : pas besoin de « mouvements réduits ». */
(function(){
const NOUV=[["hticket","Ticket"],["hflacon","Flacon géant"],["harche","Arche"],["hsans","Sans carré"]];
try{NOUV.forEach(e=>{if(!ENTETES.some(x=>x[0]===e[0]))ENTETES.push(e)})}catch(e){}

const css=`
/* base commune : marqueur .hb ; le nom est ajusté sur une ligne par fit() plus bas */
.hent.hb h1{white-space:nowrap!important;overflow:visible;overflow-wrap:normal}
.hent.hb .he-btn small{white-space:nowrap}

/* ===== TICKET : la photo encadrée au-dessus, le carré est un ticket de rendez-vous (bords découpés) ===== */
.ecran .hent.hb.he-w-hticket .he-txt{background:var(--papier,#FFFDF8)!important;color:var(--noir);width:calc(100% - 40px);max-width:520px;border-radius:0!important;
  padding:26px 22px 26px!important;box-shadow:none!important;font-family:ui-monospace,"SF Mono",Menlo,Consolas,"Courier New",monospace;
  -webkit-mask:radial-gradient(circle 8px at 50% 0,#0000 98%,#000) 0 0/26px 51% repeat-x,radial-gradient(circle 8px at 50% 100%,#0000 98%,#000) 0 100%/26px 51% repeat-x;
          mask:radial-gradient(circle 8px at 50% 0,#0000 98%,#000) 0 0/26px 51% repeat-x,radial-gradient(circle 8px at 50% 100%,#0000 98%,#000) 0 100%/26px 51% repeat-x}
/* le ticket est plus haut que la carte « Photo encadrée » : la photo est un peu plus courte, pour que le bouton reste dans le 1er écran (iPhone SE 375 × 667 compris) */
.hent.hb.he-w-hticket .wx-cad{height:clamp(230px,42vh,440px)}
.hent.hb.he-w-hticket .hb-tk{width:calc(100% - 40px);max-width:520px;filter:drop-shadow(0 8px 12px rgba(0,0,0,.2));position:relative;z-index:6}
.hent.hb.he-w-hticket .hb-tk .he-txt{width:100%!important;max-width:none!important}
.hent.hb.he-w-hticket .kick{font-family:inherit;letter-spacing:.05em;font-size:10.5px}
.ecran .defile .hent.hb.he-w-hticket h1{margin:6px 0 2px}
.hent.hb.he-w-hticket .hb-sep{align-self:stretch;border-top:2px dashed color-mix(in srgb,var(--noir,#1E1C1B) 35%,transparent);margin:14px 0}
.hent.hb.he-w-hticket .hb-l{align-self:stretch;display:flex;justify-content:space-between;gap:10px;font-size:12px;line-height:1.7;text-align:left}
.hent.hb.he-w-hticket .hb-l b{font-weight:700;text-align:right}
.hent.hb.he-w-hticket .he-btn{margin-top:0;border-radius:6px;font-family:inherit;font-weight:700;letter-spacing:.12em}
.hent.hb.he-w-hticket .he-btn small{display:none}

/* ===== les 3 habits où LA PHOTO FAIT PARTIE DE L'HABIT : tout est placé en % de l'écran (comme la maquette) ===== */
.ecran .hent.hb.hb-k{display:block;position:relative;min-height:100%;height:100%;overflow:hidden;padding:0!important}
.hent.hb .hb-z{position:absolute;inset:0;container-type:size;--u:calc(min(100cqw,56cqh)/100)}
.hent.hb .hb-z>*{position:absolute}
.hent.hb .hb-z .he-ph{position:absolute;background-size:cover;background-position:center}
.ecran .hent.hb .hb-z .he-txt{position:absolute;margin:0!important;max-width:none!important;animation:none;box-shadow:none;display:flex;flex-direction:column;align-items:center;text-align:center}
.hent.hb .hb-z .kick{font-size:calc(var(--u)*2.8);letter-spacing:.13em;white-space:nowrap}
.hent.hb .hb-z .note{margin:0;font-size:calc(var(--u)*3)}
.hent.hb .hb-z .he-btn{margin:0;height:auto;padding:calc(var(--u)*3.6) calc(var(--u)*6.5);font-size:calc(var(--u)*3.2);white-space:nowrap}

/* FLACON GÉANT : la photo est DANS un grand flacon de vernis et dépasse sur les côtés ; le nom sur l'étiquette */
.he-w-hflacon .hb-bouchon{left:35%;width:30%;top:3%;height:13%;border-radius:calc(var(--u)*3) calc(var(--u)*3) calc(var(--u)*1) calc(var(--u)*1);
  background:linear-gradient(90deg,#141210,#55504C 28%,#1E1C1B 55%,#0E0C0B);box-shadow:0 calc(var(--u)*1) calc(var(--u)*2) rgba(0,0,0,.3)}
.he-w-hflacon .hb-bague{left:32%;width:36%;top:15.5%;height:3.2%;border-radius:calc(var(--u)*1);background:linear-gradient(90deg,#BFBFC9,#F4F4F8 40%,#A9A9B6)}
.he-w-hflacon .hb-verre{left:9%;right:9%;top:18%;bottom:4%;border-radius:calc(var(--u)*16);background:color-mix(in srgb,color-mix(in srgb,var(--acc,#B5475E) 38%,#fff) 72%,transparent);
  box-shadow:inset 0 0 0 calc(var(--u)*1.4) rgba(255,255,255,.75),0 calc(var(--u)*3) calc(var(--u)*9) rgba(0,0,0,.25)}
.hent.hb.he-w-hflacon .hb-z .he-ph{left:2%;right:2%;top:23%;height:40%;border-radius:calc(var(--u)*4);box-shadow:0 0 0 calc(var(--u)*1.2) #fff,0 calc(var(--u)*2) calc(var(--u)*5) rgba(0,0,0,.25);transform:rotate(-3deg)}
.he-w-hflacon .hb-reflet{left:9%;right:9%;top:18%;bottom:4%;border-radius:calc(var(--u)*16);pointer-events:none;
  background:linear-gradient(105deg,rgba(255,255,255,.55) 0 7%,rgba(255,255,255,0) 16%,rgba(255,255,255,0) 82%,rgba(255,255,255,.3) 90%)}
.ecran .hent.hb.he-w-hflacon .hb-z .he-txt{left:14%;right:14%;top:65%;width:auto!important;background:#FFFBF5!important;color:#1E1C1B;border-radius:calc(var(--u)*3);padding:calc(var(--u)*3) calc(var(--u)*2.5)!important;
  box-shadow:0 calc(var(--u)*1) calc(var(--u)*2) rgba(0,0,0,.12)}
.ecran .defile .hent.hb.he-w-hflacon h1{margin:calc(var(--u)*1.2) 0}
.he-w-hflacon .hb-act{left:0;right:0;top:85.5%;display:flex;justify-content:center}

/* ARCHE : la photo en grand se fond dans le fond, l'arche (double filet) monte par-dessus */
.hent.hb.he-w-harche .hb-z .he-ph{left:0;right:0;top:0;height:62%;-webkit-mask:linear-gradient(#000 70%,transparent);mask:linear-gradient(#000 70%,transparent)}
.ecran .hent.hb.he-w-harche .hb-z .he-txt{left:13%;right:13%;top:42%;bottom:5%;width:auto!important;background:var(--papier,#FFF8F2)!important;color:var(--noir);
  border-radius:calc(var(--u)*40) calc(var(--u)*40) calc(var(--u)*4) calc(var(--u)*4)!important;justify-content:center;padding:calc(var(--u)*14) calc(var(--u)*4) calc(var(--u)*5)!important;
  box-shadow:inset 0 0 0 calc(var(--u)*1.4) var(--acc,#9A6234),inset 0 0 0 calc(var(--u)*2.8) var(--papier,#FFF8F2),inset 0 0 0 calc(var(--u)*3.3) var(--acc,#9A6234),0 calc(var(--u)*3) calc(var(--u)*9) rgba(0,0,0,.2)!important}
.ecran .defile .hent.hb.he-w-harche h1{margin:calc(var(--u)*1.2) 0}
.hent.hb.he-w-harche .he-btn{border-radius:calc(var(--u)*2);margin:calc(var(--u)*4) 0 0}

/* SANS CARRÉ : photo presque plein écran au bord festonné, le nom en énorme dessus, le bouton en dessous */
.hent.hb.he-w-hsans .hb-z .he-ph{left:0;right:0;top:0;height:76%;
  -webkit-mask:radial-gradient(circle calc(var(--u)*5.2) at 50% 100%,transparent 98%,#000) 0 0/calc(var(--u)*10.4) 100% repeat-x;
          mask:radial-gradient(circle calc(var(--u)*5.2) at 50% 100%,transparent 98%,#000) 0 0/calc(var(--u)*10.4) 100% repeat-x}
.he-w-hsans .hb-ombre{left:0;right:0;top:30%;height:46%;background:linear-gradient(transparent,rgba(0,0,0,.45));
  -webkit-mask:radial-gradient(circle calc(var(--u)*5.2) at 50% 100%,transparent 98%,#000) 0 0/calc(var(--u)*10.4) 100% repeat-x;
          mask:radial-gradient(circle calc(var(--u)*5.2) at 50% 100%,transparent 98%,#000) 0 0/calc(var(--u)*10.4) 100% repeat-x}
.ecran .hent.hb.he-w-hsans .hb-z .he-txt{left:4%;right:4%;top:44%;width:auto!important;background:none!important;padding:0!important;border-radius:0}
.hent.hb.he-w-hsans .kick{display:inline-block;background:#fff;color:#1E1C1B;border-radius:999px;padding:calc(var(--u)*1.5) calc(var(--u)*4);opacity:1}
.ecran .defile .hent.hb.he-w-hsans h1{color:#fff;margin:calc(var(--u)*1.2) 0;text-shadow:0 calc(var(--u)*.8) calc(var(--u)*3) rgba(0,0,0,.4)}
.hent.hb.he-w-hsans .note{color:#fff;opacity:1;text-shadow:0 1px 3px rgba(0,0,0,.5)}
.he-w-hsans .hb-bas{left:0;right:0;top:79%;display:flex;flex-direction:column;align-items:center}
.hent.hb.he-w-hsans .he-btn{font-size:calc(var(--u)*3.6);padding:calc(var(--u)*4.2) calc(var(--u)*8);box-shadow:0 0 0 calc(var(--u)*1.4) #fff,0 calc(var(--u)*2) calc(var(--u)*6) rgba(0,0,0,.3)}
.hent.hb.he-w-hsans .he-btn small{display:none}
.he-w-hsans .hb-dispo{margin-top:calc(var(--u)*3);background:#fff;color:#1E1C1B;border-radius:999px;padding:calc(var(--u)*1) calc(var(--u)*3);font-size:calc(var(--u)*2.8)}
`;
const st=document.createElement("style");st.id="entetes-plus14";st.textContent=css;document.head.appendChild(st);

/* le nom reste sur UNE ligne (D36) : on réduit la taille s'il est trop large (écriture choisie comprise) */
const fit=()=>{try{document.querySelectorAll(".hent.hb h1[data-f0]").forEach(h=>{let f=parseFloat(h.dataset.f0)||40,m=0;h.style.fontSize=f+"px";
  const lim=()=>{const p=h.parentElement;return p?p.clientWidth-(parseFloat(getComputedStyle(p).paddingLeft)||0)-(parseFloat(getComputedStyle(p).paddingRight)||0):h.clientWidth};
  while((h.scrollWidth>h.clientWidth+1||h.scrollWidth>lim()+1)&&f>14&&m++<50){f-=1;h.style.fontSize=f+"px"}});
  document.querySelectorAll(".hent.hb .hb-z .kick").forEach(k=>{k.style.fontSize="";let f=parseFloat(getComputedStyle(k).fontSize),m=0;const p=k.parentElement;
    while(p&&k.scrollWidth>p.clientWidth-4&&f>6&&m++<20){f-=.5;k.style.fontSize=f+"px"}})}catch(e){}};
let tf=0;try{new MutationObserver(()=>{clearTimeout(tf);tf=setTimeout(fit,60)}).observe(document.body,{childList:true,subtree:true});addEventListener("resize",()=>{clearTimeout(tf);tf=setTimeout(fit,100)});
  if(document.fonts){document.fonts.ready.then(fit);document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",fit)}}catch(e){}

const AVIS={fr:"Avis",en:"Reviews",it:"Recensioni",es:"Reseñas",de:"Bewertungen"};
const vieux=window.entete;
window.entete=function(k,t,lang){
  if(!NOUV.some(e=>e[0]===k))return vieux(k,t,lang);
  const ph=u=>`<div class="he-ph" style="background-image:url('${P(u)}')"></div>`;
  const kick=`<div class="kick">${t.type} · ${D.ville}</div>`,note=D.nb?`<div class="note"><span class="et">${etoiles}</span>${D.note} · ${D.nb} ${t.avisG}</div>`:"";
  const cr=creneau(t),btn=`<button class="he-btn" data-res>${t.creneau}${cr?`<small>${t.dispo} : ${cr}</small>`:""}</button>`;
  /* taille de départ du nom, selon la place de chaque habit (fit() la réduit si besoin) */
  const L=String(D.nom||"").length||1,f0=(larg,max)=>Math.max(16,Math.min(max,Math.floor(larg/(L*.58))));
  const h1=(larg,max)=>{const f=f0(larg,max);return `<h1 data-f0="${f}" style="font-size:${f}px">${D.nom}</h1>`};
  const c=`hent hb he-w-${k}`;
  if(k==="hticket"){
    const lignes=(cr?`<div class="hb-l"><span>${t.dispo}</span><b>${cr}</b></div>`:"")+(D.nb?`<div class="hb-l"><span>${AVIS[lang]||AVIS.fr}</span><b>★ ${D.note} (${D.nb})</b></div>`:"");
    return `<div class="${c}" data-s="accueil"><div class="wx-cad">${ph(D.hero)}</div><div class="hb-tk"><div class="he-txt">${kick}${h1(300,40)}${lignes?`<div class="hb-sep"></div>${lignes}`:""}<div class="hb-sep"></div>${btn}</div></div></div>`;
  }
  if(k==="hflacon")return `<div class="${c} hb-k" data-s="accueil"><div class="hb-z"><div class="hb-bouchon"></div><div class="hb-bague"></div><div class="hb-verre"></div>${ph(D.hero)}<div class="hb-reflet"></div><div class="he-txt">${kick}${h1(230,30)}${note}</div><div class="hb-act">${btn}</div></div></div>`;
  if(k==="harche")return `<div class="${c} hb-k" data-s="accueil"><div class="hb-z">${ph(D.hero2||D.hero)}<div class="he-txt">${kick}${h1(250,34)}${note}${btn}</div></div></div>`;
  if(k==="hsans")return `<div class="${c} hb-k" data-s="accueil"><div class="hb-z">${ph(D.hero)}<div class="hb-ombre"></div><div class="he-txt">${kick}${h1(340,56)}${note}</div><div class="hb-bas">${btn.replace(/<small>.*<\/small>/,"")}${cr?`<div class="hb-dispo">${t.dispo} : ${cr}</div>`:""}</div></div></div>`;
  return "";
};
try{const k=enteteChoisie();if(NOUV.some(e=>e[0]===k)){const ok=window.__changeEntete&&window.__changeEntete();if(!ok)setTimeout(()=>window.__changeEntete&&window.__changeEntete(),600)}}catch(e){}
})();
