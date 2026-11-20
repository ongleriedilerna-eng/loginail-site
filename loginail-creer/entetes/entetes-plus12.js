/* 19/11 (Marie, D54) — série 12 : les 8 en-têtes « qui bougent » choisies sur la planche site/idees/entetes-1911.html
   (1 Trame de points, 2 Pluie de charms, 3 Bulles de charms, 4 Disco, 5 Étoiles filantes, 9 Vagues, 10 Feu d'artifice, 11 Carte qui tombe).
   Le RECTANGLE (métier · ville, nom sur UNE ligne, avis, « Réserver un créneau ») garde ses mots et sa forme : seule SA PLACE change.
   Les photos, les charms et les couleurs sont CEUX du salon (photos D.hero…, charms de la prothésiste, couleur --acc).
   PERFORMANCE (leçon D54 : 15 téléphones animés = 21 images/s) : on n'anime QUE translate / rotate / scale / opacity
   (jamais margin, background-position, flou animé, mix-blend-mode, backdrop-filter, filtre SVG). */
(function(){
const NOUV=[["zpoints","Trame de points"],["zpluie","Pluie de charms"],["zbulles","Bulles de charms"],["zdisco","Disco"],["zetoiles","Étoiles filantes"],["zvagues","Vagues"],["zfeu","Feu d'artifice"],["ztombe","Carte qui tombe"]];
try{NOUV.forEach(e=>{if(!ENTETES.some(x=>x[0]===e[0]))ENTETES.push(e)})}catch(e){}

/* petit hasard toujours pareil (le même site s'affiche pareil à chaque visite) */
let g=54;const r=()=>{g=(g*9301+49297)%233280;return g/233280},rx=(a,b)=>a+r()*(b-a),R=(n,f)=>Array.from({length:n},(_,i)=>f(i)).join(""),f1=n=>Math.round(n*10)/10;
const CHB="../loginail-site/charms/";
const DEF=["coeurchrome","etoilechrome","coeurcristal","coeurgeleerose","collierperlescoeur","coeurchromemou"];
/* les charms de la prothésiste (ceux posés sur son site), sinon des charms neutres qui vont avec tout */
const ses=()=>{let l=[];try{l=(window.__pzEtat?window.__pzEtat().charms:(typeof BR!=="undefined"&&BR&&BR.charms))||[]}catch(e){}
  if(!l.length)try{l=(new URLSearchParams(location.search).get("charm")||"").split(",").filter(Boolean)}catch(e){}
  if(!l.length)l=DEF;return l};
const src=k=>{try{if(typeof CHI!=="undefined"&&CHI[k])return CHI[k]}catch(e){}return CHB+k+".webp"};   /* 20/11 : .webp (les .png ne sont pas en ligne) */
const ch=i=>{const l=ses();return src(l[i%l.length])};

const css=`
/* base : l'en-tête remplit l'écran, le décor est à l'intérieur, le rectangle est posé par-dessus */
.hent.pzh{display:block;position:relative;min-height:100%;overflow:hidden;background:var(--creme)}
.ecran .hent.pzh>.pz-st{position:absolute;inset:0;overflow:hidden;margin:0!important}
.hent.pzh .pz-st>*{position:absolute;display:block}
.hent.pzh .he-ph{position:absolute;inset:0;background-size:cover;background-position:center}
/* LE RECTANGLE : mêmes mots, même forme, nom sur une ligne — sa place change selon l'en-tête */
.ecran .hent.pzh .he-txt{position:absolute;left:20px;right:20px;width:auto;max-width:none;margin:0!important;z-index:20;padding:18px 22px 22px;border-radius:24px;background:var(--papier,#fff);color:var(--noir);box-shadow:0 16px 30px -22px rgba(0,0,0,.45);animation:none}
.ecran .hent.pzh .he-txt h1{align-self:stretch;white-space:nowrap;overflow:visible;overflow-wrap:normal;text-align:center;margin:8px 0 8px}
.ecran .hent.pzh .he-txt .kick,.ecran .hent.pzh .he-txt .note{color:var(--gris,#8c847d);opacity:1}
.ecran .hent.pzh .he-txt .kick{white-space:nowrap;font-size:10px;letter-spacing:.16em;align-self:stretch}
.ecran .hent.pzh .he-txt .he-btn{margin-top:12px;height:50px}
@keyframes pzTombeCh{from{translate:0 0;rotate:0deg}to{translate:0 980px;rotate:360deg}}
@keyframes pzBalan{from{translate:-20px 0}to{translate:20px 0}}
@keyframes pzMonte{0%{translate:0 0}25%{translate:20px -260px}50%{translate:-18px -520px}75%{translate:20px -780px}100%{translate:0 -1040px}}
@keyframes pzTwk{0%,100%{opacity:.1;scale:.4}50%{opacity:1;scale:1.1}}
@keyframes pzTourne{to{rotate:360deg}}
@keyframes pzGlisse{0%{translate:130% 0}8%,86%{translate:0 0}94%,100%{translate:-130% 0}}
@keyframes pzFile{0%{translate:0 0;opacity:0}6%{opacity:1}28%{translate:285px 200px;opacity:0}100%{translate:285px 200px;opacity:0}}
@keyframes pzZoom{from{scale:1;translate:0 0}to{scale:1.18;translate:-3% -2%}}
@keyframes pzVague{to{translate:-390px 0}}
@keyframes pzBob{0%,100%{translate:0 0;rotate:-1.4deg}50%{translate:0 -12px;rotate:1.4deg}}
@keyframes pzTombe{0%{translate:0 -620px;animation-timing-function:cubic-bezier(.55,0,1,.7)}9%{translate:0 0;animation-timing-function:ease-out}13%{translate:0 -52px;animation-timing-function:ease-in}17%{translate:0 0;animation-timing-function:ease-out}20%{translate:0 -18px;animation-timing-function:ease-in}23%,86%{translate:0 0;animation-timing-function:ease-in}100%{translate:0 -620px}}
@keyframes pzFusee{0%{translate:0 var(--dy);opacity:1}11%{translate:0 0;opacity:1}12%,100%{translate:0 0;opacity:0}}
@keyframes pzBurst{0%,11%{scale:0;opacity:0}12%{scale:.04;opacity:1}55%{scale:1;opacity:1}100%{scale:1.1;opacity:0;translate:0 38px}}

/* 1 Trame de points : la photo apparaît par des points qui grossissent (comme la maquette) */
@property --pzr{syntax:'<length>';inherits:false;initial-value:0px}
.he-w-zpoints .pz-ph{left:0;right:0;top:0;height:82%;overflow:hidden}
.he-w-zpoints .pz-ph .he-ph{-webkit-mask:radial-gradient(circle at 50% 50%,#000 var(--pzr),transparent calc(var(--pzr) + .6px)) 0 0/22px 22px;mask:radial-gradient(circle at 50% 50%,#000 var(--pzr),transparent calc(var(--pzr) + .6px)) 0 0/22px 22px;animation:pzTr 7s ease-in-out infinite}
@keyframes pzTr{0%{--pzr:0px}35%,70%{--pzr:16.5px}100%{--pzr:0px}}
.ecran .he-w-zpoints .he-txt{top:62%}
/* 2 Pluie de charms */
.he-w-zpluie .he-txt{top:38%}
.pz-chu{top:-90px;will-change:transform;animation:pzTombeCh linear infinite}
.pz-chu img{display:block;width:100%;animation:pzBalan ease-in-out infinite alternate}
/* 3 Bulles de charms */
.ecran .he-w-zbulles .he-txt{bottom:32px}
.pz-bul{bottom:-140px;border-radius:50%;will-change:transform;background:radial-gradient(circle at 30% 28%,rgba(255,255,255,.95),rgba(255,255,255,.2) 38%,rgba(255,150,220,.28));box-shadow:inset 0 0 14px rgba(255,255,255,.7),0 0 12px rgba(255,170,230,.5);display:grid!important;place-items:center;animation:pzMonte linear infinite}
.pz-bul img{width:58%;height:58%;object-fit:contain}
/* 4 Disco */
.ecran .he-w-zdisco .he-txt{bottom:32px;animation:pzGlisse 9s ease-in-out infinite}
.pz-tint{left:0;top:0;width:1170px;height:100%;opacity:.32;background:linear-gradient(90deg,#ff4fa0,#6d6bff,#ffb347,#ff4fa0);will-change:transform;animation:pzTint 7s linear infinite}
@keyframes pzTint{to{translate:-780px 0}}
.pz-ray{width:1250px;height:1250px;left:-430px;top:-560px;background:repeating-conic-gradient(from 0deg,rgba(255,255,255,.32) 0 4deg,transparent 4deg 20deg);will-change:transform;animation:pzTourne 16s linear infinite;-webkit-mask:radial-gradient(circle,#000 0,#000 55%,transparent 70%);mask:radial-gradient(circle,#000 0,#000 55%,transparent 70%)}
.pz-boule{left:calc(50% - 34px);top:46px;width:68px;height:68px;border-radius:50%;z-index:6;background:repeating-linear-gradient(0deg,rgba(0,0,0,.28) 0 1px,transparent 1px 10px),repeating-linear-gradient(90deg,rgba(0,0,0,.28) 0 1px,transparent 1px 10px),radial-gradient(circle at 35% 30%,#fff,#cfd3dc 40%,#7d8196);box-shadow:0 0 26px 6px rgba(255,255,255,.7)}
.pz-fil1{left:50%;top:0;width:1px;height:48px;background:#ddd;z-index:6}
.pz-ts{color:#fff;text-shadow:0 0 10px #fff;z-index:7;animation:pzTwk ease-in-out infinite}
/* 5 Étoiles filantes */
.pz-nuit{inset:0;background:linear-gradient(180deg,color-mix(in srgb,var(--acc,#1E1C1B) 30%,#1c0b40),color-mix(in srgb,var(--acc,#1E1C1B) 50%,#7a2a78) 55%,color-mix(in srgb,var(--acc,#1E1C1B) 62%,#e0689a))}
.pz-pt{border-radius:50%;background:#fff;animation:pzTwk ease-in-out infinite}
.pz-fs{width:140px;height:2px;background:linear-gradient(90deg,transparent,#fff);rotate:35deg;opacity:0;box-shadow:0 0 6px #fff;animation:pzFile 3.4s linear infinite}
.he-w-zetoiles .pz-bas{left:0;right:0;top:43%;bottom:0;overflow:hidden;-webkit-mask:linear-gradient(transparent,#000 70px);mask:linear-gradient(transparent,#000 70px)}
.he-w-zetoiles .pz-bas .he-ph{will-change:transform;animation:pzZoom 10s ease-in-out infinite alternate}
.he-w-zetoiles .he-txt{top:20%}
/* 9 Vagues : les couleurs de la mer viennent de la couleur du site */
.he-w-zvagues{--mer1:color-mix(in srgb,var(--acc,#1E1C1B) 22%,#fff);--mer2:color-mix(in srgb,var(--acc,#1E1C1B) 45%,#fff);--mer3:color-mix(in srgb,var(--acc,#1E1C1B) 75%,#fff)}
.he-w-zvagues .pz-ph{left:0;right:0;top:0;height:62%}
.pz-w{left:0;width:780px;height:124px;will-change:transform;animation:pzVague linear infinite;-webkit-mask:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='390' height='124' viewBox='0 0 390 124' preserveAspectRatio='none'><path d='M0 34 Q97 -6 195 34 T390 34 V124 H0Z'/></svg>") 0 0/390px 124px repeat-x;mask:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='390' height='124' viewBox='0 0 390 124' preserveAspectRatio='none'><path d='M0 34 Q97 -6 195 34 T390 34 V124 H0Z'/></svg>") 0 0/390px 124px repeat-x}
.pz-w1{top:54%;background:var(--mer1);animation-duration:9s}
.pz-w2{top:57%;background:var(--mer2);animation-duration:6s;animation-direction:reverse}
.pz-w3{top:61%;background:var(--mer3);animation-duration:4.5s}
.pz-mer{left:0;right:0;top:73%;bottom:0;background:var(--mer3)}
.ecran .he-w-zvagues .he-txt{top:63%;animation:pzBob 3.4s ease-in-out infinite}
/* 10 Feu d'artifice */
.pz-nuit2{inset:0;background:#120a22}
.he-w-zfeu .pz-ph .he-ph{filter:brightness(.42) saturate(1.15)}
.he-w-zfeu .pz-ph{inset:0}
.pz-fz{width:8px;height:8px;margin:-4px;border-radius:50%;opacity:0;animation:pzBurst 3.6s ease-out infinite}
.pz-fr{width:3px;height:22px;border-radius:2px;background:linear-gradient(transparent,#fff);opacity:0;animation:pzFusee 3.6s ease-in infinite}
.ecran .he-w-zfeu .he-txt{bottom:32px}
/* 11 Carte qui tombe */
.ecran .he-w-ztombe .he-txt{top:38%;animation:pzTombe 7s infinite}
.pz-cf{top:-24px;width:9px;height:16px;will-change:transform;animation:pzTombeCh linear infinite}
.pz-cf b{display:block;width:100%;height:100%;animation:pzBalan ease-in-out infinite alternate}
/* mouvements réduits = image fixe */
@media (prefers-reduced-motion:reduce){.hent.pzh *,.hent.pzh *::after{animation:none!important}.hent.pzh .pz-chu,.hent.pzh .pz-cf,.hent.pzh .pz-bul,.hent.pzh .pz-fz,.hent.pzh .pz-fr,.hent.pzh .pz-fs{display:none}.he-w-zpoints .pz-ph .he-ph{-webkit-mask:none;mask:none}}
`;
const st=document.createElement("style");st.id="entetes-plus12";st.textContent=css;document.head.appendChild(st);

/* le nom reste sur UNE ligne : on réduit la taille s'il est trop large pour le rectangle (écriture choisie comprise) */
const fit=()=>{try{document.querySelectorAll(".hent.pzh .he-txt .kick").forEach(h=>{let f=10,m=0;h.style.fontSize=f+"px";while(h.scrollWidth>h.clientWidth+1&&f>6&&m++<20){f-=.5;h.style.fontSize=f+"px"}});document.querySelectorAll(".hent.pzh .he-txt h1").forEach(h=>{let f=parseFloat(h.dataset.f0)||44,m=0;h.style.fontSize=f+"px";
  while(h.scrollWidth>h.clientWidth+1&&f>16&&m++<40){f-=1.5;h.style.fontSize=f+"px"}})}catch(e){}};
let tf=0;try{new MutationObserver(()=>{clearTimeout(tf);tf=setTimeout(fit,60)}).observe(document.body,{childList:true,subtree:true});
  if(document.fonts){document.fonts.ready.then(fit);document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",fit)}}catch(e){}

const vieux=window.entete;
window.entete=function(k,t,lang){
  if(!NOUV.some(e=>e[0]===k))return vieux(k,t,lang);
  g=54;   /* même hasard à chaque dessin */
  const U=n=>P(n),h1=D.hero,h2=D.hero2||D.hero,h3=D.hero3||D.hero;
  const ph=(u,cl,sty)=>`<div class="he-ph ${cl||""}" style="background-image:url('${U(u)}');${sty||""}"></div>`;
  const kick=`<div class="kick">${t.type} · ${D.ville}</div>`,note=D.nb?`<div class="note"><span class="et">${etoiles}</span>${D.note} · ${D.nb} ${t.avisG}</div>`:"";
  const btn=`<button class="he-btn" data-res>${t.creneau}${creneau(t)?`<small>${t.dispo} : ${creneau(t)}</small>`:""}</button>`;
  const f0=Math.max(18,Math.min(44,Math.floor(300/(String(D.nom||"").length*.58||1))));
  const txt=`<div class="he-txt">${kick}<h1 data-f0="${f0}" style="font-size:${f0}px">${D.nom}</h1>${note}${btn}</div>`;
  const H=(fx,carteAvant)=>`<div class="hent he-w-${k} pzh" data-s="accueil">${txt}<div class="pz-st">${fx}</div></div>`;
  const chute=(n,z,a,b)=>R(n,i=>`<div class="pz-chu" style="z-index:${z};left:${f1(rx(0,86))}%;width:${f1(rx(a,b))}px;animation-duration:${f1(rx(5,8))}s;animation-delay:-${f1(rx(0,8))}s"><img src="${ch(i)}" alt="" style="animation-duration:${f1(rx(1.6,2.8))}s;animation-delay:-${f1(rx(0,2))}s"></div>`);
  switch(k){
  case "zpoints":return H(`<div class="pz-ph">${ph(h1)}</div>`);
  case "zpluie":return H(ph(h2)+chute(8,10,42,66)+chute(5,25,34,50));
  case "zbulles":return H(ph(h3)+R(9,i=>{const s=f1(rx(70,118));return `<i class="pz-bul" style="z-index:${i%2?10:25};left:${f1(rx(0,78))}%;width:${s}px;height:${s}px;animation-duration:${f1(rx(7,11))}s;animation-delay:-${f1(rx(0,10))}s"><img src="${ch(i)}" alt=""></i>`}));
  case "zdisco":return H(ph(h1)+`<div class="pz-tint"></div><div class="pz-ray"></div><i class="pz-fil1"></i><i class="pz-boule"></i>`+R(14,()=>`<span class="pz-ts" style="left:${f1(rx(2,94))}%;top:${f1(rx(8,70))}%;font-size:${Math.round(rx(14,32))}px;animation-duration:${f1(rx(1.4,2.8))}s;animation-delay:-${f1(rx(0,3))}s">✦</span>`));
  case "zetoiles":return H(`<div class="pz-nuit"></div>`+R(34,()=>{const s=f1(rx(2,4.6));return `<i class="pz-pt" style="left:${f1(rx(1,98))}%;top:${f1(rx(1,60))}%;width:${s}px;height:${s}px;animation-duration:${f1(rx(1.5,3.5))}s;animation-delay:-${f1(rx(0,3))}s"></i>`})+R(5,i=>`<i class="pz-fs" style="left:${f1(rx(0,45))}%;top:${f1(rx(0,25))}%;animation-delay:-${f1(i*.7)}s"></i>`)+`<div class="pz-bas">${ph(h2)}</div>`);
  case "zvagues":return H(`<div class="pz-ph">${ph(h1)}</div><div class="pz-w pz-w1"></div><div class="pz-w pz-w2"></div><div class="pz-w pz-w3"></div><div class="pz-mer"></div>`);
  case "zfeu":{const cols=["#ff5d8f","#ffd76a","#9ad0ff","#fff","#b5f2c8","#d8a6ff","#ff9f43"];
    const burst=(c,rad)=>{const s=[];for(let j=0;j<3;j++)for(let i=0;i<16;i++){const a=(i/16+j*.03)*Math.PI*2,d=rad*[1,.7,.4][j];s.push(`${Math.round(Math.cos(a)*d)}px ${Math.round(Math.sin(a)*d)}px 0 ${[0,-1,-2][j]}px ${c}`)}return s.join(",")};
    return H(`<div class="pz-nuit2"></div><div class="pz-ph">${ph(h3)}</div>`+R(7,i=>{const x=f1(rx(12,88)),y=f1(rx(10,40)),c=cols[i%cols.length],d=f1(i*.5),du=3.6;
      return `<i class="pz-fr" style="left:${x}%;top:calc(${y}% - 22px);--dy:${Math.round(rx(300,420))}px;animation-delay:-${d}s"></i><i class="pz-fz" style="left:${x}%;top:${y}%;background:${c};box-shadow:${burst(c,Math.round(rx(80,140)))};animation-delay:-${d}s"></i>`}));}
  case "ztombe":{const C=["#ff5d8f","#ffd76a","#9ad0ff","#fff","#b5f2c8","#d8a6ff","var(--acc,#B5475E)"];
    return H(ph(h2)+R(26,()=>`<i class="pz-cf" style="z-index:30;left:${f1(rx(0,96))}%;animation-duration:${f1(rx(3,5))}s;animation-delay:-${f1(rx(0,5))}s"><b style="background:${C[Math.floor(r()*C.length)]};animation-duration:${f1(rx(1.5,2.5))}s;animation-delay:-${f1(rx(0,2))}s"></b></i>`));}
  }
  return "";
};
try{const k=enteteChoisie();if(NOUV.some(e=>e[0]===k)){const ok=window.__changeEntete&&window.__changeEntete();if(!ok)setTimeout(()=>window.__changeEntete&&window.__changeEntete(),600)}}catch(e){}
})();
