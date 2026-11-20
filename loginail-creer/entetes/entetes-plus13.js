/* 19/11 (Marie, D55 à D58) — série 13 : 10 en-têtes de plus, choisies sur les planches site/idees/entetes-1911-b/c/d/e.html
   16 Enseigne lumineuse, 20 Télécabine de charms, 28 Fil de lumière, 29 Ronde de charms, 30 Grand huit, 33 Tourbillon,
   37 Étoiles d'or, 44 Étoile de charms, 53 Cachet rond, 57 Notification.
   Même règles que la série 12 (entetes-plus12.js, dont on réutilise la base « pzh ») : photos / charms / couleurs du salon, mêmes 4 infos
   (métier · ville, nom sur UNE ligne, avis, « Réserver un créneau »), « mouvements réduits » = image fixe, on n'anime que
   translate / rotate / scale / opacity (+ offset-distance pour les charms qui suivent un tracé : il y en a 12 au plus par en-tête). */
(function(){
const NOUV=[["wenseigne","Enseigne lumineuse"],["wtele","Télécabine de charms"],["wfil","Fil de lumière"],["wronde","Ronde de charms"],["whuit","Grand huit"],["wtourb","Tourbillon"],["wetor","Étoiles d'or"],["wetoile","Étoile de charms"],["wcachet","Cachet rond"],["wnotif","Notification"],["wfeuille","Feuille du bas"],["wverrou","Écran verrouillé"],["wcachet2","Cachet et étoiles"]];
try{NOUV.forEach(e=>{if(!ENTETES.some(x=>x[0]===e[0]))ENTETES.push(e)})}catch(e){}

let g=57;const r=()=>{g=(g*9301+49297)%233280;return g/233280},rx=(a,b)=>a+r()*(b-a),R=(n,f)=>Array.from({length:n},(_,i)=>f(i)).join(""),f1=n=>Math.round(n*10)/10;
const CHB="../loginail-site/charms/";
const DEF=["coeurchrome","etoilechrome","coeurcristal","coeurgeleerose","collierperlescoeur","coeurchromemou"];
const ses=()=>{let l=[];try{l=(window.__pzEtat?window.__pzEtat().charms:(typeof BR!=="undefined"&&BR&&BR.charms))||[]}catch(e){}
  if(!l.length)try{l=(new URLSearchParams(location.search).get("charm")||"").split(",").filter(Boolean)}catch(e){}
  if(!l.length)l=DEF;return l};
const src=k=>{try{if(typeof CHI!=="undefined"&&CHI[k])return CHI[k]}catch(e){}return CHB+k+".webp"};   /* 20/11 : .webp (les .png ne sont pas en ligne) */
const ch=i=>{const l=ses();return src(l[i%l.length])};

/* taille par défaut du rectangle (le vrai est mesuré dans le site : voir place()) */
const CW=350,CHT=214,MR=11,Q=30;
const rr=(w,h,m=MR,q=Q)=>{const x0=-m,y0=-m,x1=w+m,y1=h+m;return `M ${x0+q} ${y0} H ${x1-q} A ${q} ${q} 0 0 1 ${x1} ${y0+q} V ${y1-q} A ${q} ${q} 0 0 1 ${x1-q} ${y1} H ${x0+q} A ${q} ${q} 0 0 1 ${x0} ${y1-q} V ${y0+q} A ${q} ${q} 0 0 1 ${x0+q} ${y0} Z`};
/* tracés de la maquette (254 × 544) agrandis à 390 × 844 */
const SX=390/254,SY=844/544;
const sc=d=>d.replace(/(-?\d+\.?\d*)[ ,]+(-?\d+\.?\d*)/g,(m,x,y)=>`${f1(x*SX)} ${f1(y*SY)}`);
const poly=(f,N,close)=>{let s="";for(let i=0;i<=N;i++){const p=f(i/N);s+=(i?"L ":"M ")+p[0].toFixed(1)+" "+p[1].toFixed(1)+" "}return s+(close?"Z":"")};
const PA=sc("M -50 120 C 30 10, 90 10, 127 90 S 230 190, 320 70"),PB=sc("M 320 450 C 230 545, 170 545, 127 465 S 30 360, -50 480");
const HUIT=poly(u=>{const t=u*Math.PI*2;return [195+192*Math.sin(2*t),422+333*Math.cos(t)]},90,true);
const SPI=poly(u=>{const a=u*Math.PI*2*3.2,rad=414*(1-u)+18;return [195+rad*Math.cos(a),422+rad*Math.sin(a)]},110,false);
const ETO=(()=>{const Rr=203,pts=[0,2,4,1,3,0].map(k=>{const a=-Math.PI/2+k*2*Math.PI/5;return [195+Rr*Math.cos(a),419+Rr*Math.sin(a)]});return pts.map((p,i)=>(i?"L ":"M ")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" ")+" Z"})();

const css=`
/* base : on réutilise celle de la série 12 (.hent.pzh, .pz-st, le rectangle .he-txt). Ici, le rectangle est dans un bloc .pz-blk
   (pour que les lumières / charms autour suivent sa vraie taille) */
.ecran .hent.pzw>.pz-blk{position:absolute;left:0;right:0;z-index:20;margin:0!important}
.hent.pzw .pz-cd{position:relative;margin:0 20px}
.ecran .hent.pzw .pz-cd>.he-txt{position:relative;left:auto;right:auto;top:auto;bottom:auto;width:auto!important;max-width:none!important;margin:0!important;z-index:2}
.hent.pzw .pz-cd>.pz-av{position:absolute;inset:0;pointer-events:none}
.hent.pzw .pz-cd>.pz-ar{position:absolute;inset:0;pointer-events:none;z-index:1}
.pz-box{position:absolute;left:50%;top:0;width:390px;height:844px;margin-left:-195px;transform-origin:50% 0;scale:var(--k,1)}
.pz-box>*{position:absolute}
.pz-trait{left:0;top:0;width:390px;height:844px;overflow:visible}
@keyframes pwTourne{to{rotate:360deg}}
@keyframes pwTc{to{offset-distance:100%}}
@keyframes pwTcv{0%{offset-distance:0%;scale:1;opacity:0}6%{opacity:1}85%{opacity:1}100%{offset-distance:100%;scale:.25;opacity:0}}
@keyframes pwTwk{0%,100%{opacity:.1;scale:.4}50%{opacity:1;scale:1.1}}
@keyframes pwAmp{0%{opacity:1}33%,100%{opacity:.18}}
@keyframes pwChute{from{translate:0 0;rotate:0deg}to{translate:0 1000px;rotate:300deg}}
@keyframes pwNotif{0%{translate:0 -300px;animation-timing-function:cubic-bezier(.3,0,.2,1.2)}9%{translate:0 0}90%{translate:0 0;animation-timing-function:ease-in}100%{translate:0 -300px}}
.pz-tc{left:0;top:0;offset-rotate:0deg;offset-distance:0%;animation:pwTc linear infinite;z-index:6;will-change:transform}
.pz-tc img{display:block;width:100%}
.pz-tcv{animation-name:pwTcv}
.pz-ts{position:absolute;color:#fff;text-shadow:0 0 10px #fff;z-index:7;animation:pwTwk ease-in-out infinite}
.pz-lum{--lum:color-mix(in srgb,var(--acc,#1E1C1B) 35%,#fff)}
/* 16 Enseigne lumineuse : des ampoules tout autour du rectangle, qui courent (3 groupes qui clignotent à tour de rôle) */
.pz-bg{position:absolute;inset:0;animation:pwAmp 1s steps(1) infinite}
.pz-bg i{position:absolute;width:11px;height:11px;margin:-5px 0 0 -5px;border-radius:50%;background:#ffe28a;box-shadow:0 0 9px 3px rgba(255,200,80,.85)}
.he-w-wenseigne .pz-st .he-ph{filter:brightness(.8)}
/* 28 Fil de lumière : un éclat qui fait le tour du rectangle */
.pz-beam{position:absolute;inset:-4px;border-radius:28px;overflow:hidden;box-shadow:0 0 16px 2px var(--lum)}
.pz-beam i{position:absolute;left:50%;top:50%;width:640px;height:640px;margin:-320px 0 0 -320px;background:conic-gradient(from 0deg,rgba(255,255,255,.22) 0 40%,color-mix(in srgb,var(--lum) 70%,transparent) 62%,var(--lum) 88%,#fff 100%);will-change:transform;animation:pwTourne 3s linear infinite}
.he-w-wfil .pz-st .he-ph{filter:brightness(.7)}
/* 29 Ronde de charms */
.pz-ligne{position:absolute;inset:-11px;border:1.4px solid rgba(255,255,255,.8);border-radius:35px}
.he-w-wronde .pz-st .he-ph{filter:brightness(.82)}
.pz-ring .pz-tc{width:44px;z-index:3}
/* 30 Grand huit / 33 Tourbillon / 20 Télécabine / 44 Étoile : les charms sur un tracé */
.he-w-whuit .pz-st .he-ph{filter:brightness(.6) saturate(1.2)}
.he-w-wtourb .pz-st .he-ph{filter:brightness(.55) saturate(1.25)}
.he-w-wetoile .pz-st .he-ph{filter:brightness(.7)}
.pz-box .pz-tc{width:46px}
/* 37 Étoiles d'or */
.he-w-wetor .pz-st .he-ph{filter:brightness(.78)}
.pz-etd{top:-50px;color:#ffd24a;text-shadow:0 0 8px rgba(255,210,74,.9);line-height:1;will-change:transform;animation:pwChute linear infinite}
.pz-etd b{display:block;font-weight:400;animation:pwTwk ease-in-out infinite}
/* 53 Cachet rond : le bloc d'infos est un grand rond */
.ecran .hent.pzh:is(.he-w-wcachet,.he-w-wcachet2)>.pz-blk{left:50%;top:48.7%;right:auto;width:328px;margin-left:-164px!important;translate:0 -50%}
:is(.he-w-wcachet,.he-w-wcachet2) .pz-cd{margin:0;width:328px;height:328px}
.ecran .hent.pzw:is(.he-w-wcachet,.he-w-wcachet2) .pz-cd>.he-txt{width:100%!important;height:100%;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 34px;text-align:center}
:is(.he-w-wcachet,.he-w-wcachet2) .he-txt .he-btn{height:42px;padding:0 22px;margin-top:10px}
:is(.he-w-wcachet,.he-w-wcachet2) .he-txt .he-btn small{display:none}
:is(.he-w-wcachet,.he-w-wcachet2) .he-txt h1{margin:5px 0 5px!important}
.he-w-wcachet .pz-st .he-ph{filter:brightness(.78)}
.pz-dash{position:absolute;inset:-7px;border-radius:50%;border:2px dashed rgba(255,255,255,.92);will-change:transform;animation:pwTourne 30s linear infinite;z-index:1}
.pz-ring2{position:absolute;left:50%;top:50%;width:0;height:0;will-change:transform;animation:pwTourne 30s linear infinite;z-index:1}
.pz-ring2 img{position:absolute;margin:-24px 0 0 -24px;width:48px;animation:pwTourne 30s linear infinite reverse}
/* 57 Notification : le bloc est une notification qui descend du haut, avec le bouton dedans */
.ecran .hent.pzh.he-w-wnotif>.pz-blk{top:64px;animation:pwNotif 7s infinite}
:is(.he-w-wnotif,.he-w-wverrou) .pz-cd{margin:0 14px}
.ecran .hent.pzw:is(.he-w-wnotif,.he-w-wverrou) .pz-cd>.he-txt{border-radius:26px;padding:14px 16px 16px;background:color-mix(in srgb,var(--papier,#fff) 94%,transparent);text-align:left;align-items:stretch}
:is(.he-w-wnotif,.he-w-wverrou) .pz-ic{position:absolute;left:16px;top:14px;width:46px;height:46px;border-radius:12px;background:linear-gradient(135deg,color-mix(in srgb,var(--acc,#1E1C1B) 40%,#fff),var(--acc,#1E1C1B));display:grid;place-items:center}
:is(.he-w-wnotif,.he-w-wverrou) .pz-ic img{width:32px;height:32px;object-fit:contain}
:is(.he-w-wnotif,.he-w-wverrou) .he-txt{padding-left:72px!important}
:is(.he-w-wnotif,.he-w-wverrou) .he-txt .kick{text-align:left;text-transform:none;letter-spacing:.02em;font-size:11px}
:is(.he-w-wnotif,.he-w-wverrou) .he-txt h1{margin:2px 0 2px!important;text-align:left}
:is(.he-w-wnotif,.he-w-wverrou) .he-txt .note{justify-content:flex-start;margin:0}
:is(.he-w-wnotif,.he-w-wverrou) .he-txt .he-btn{margin:12px 0 0 -56px;align-self:stretch;width:auto;border-radius:14px;height:46px}
.pz-ghost{position:absolute;inset:10px 12px -9px;border-radius:26px;background:rgba(255,255,255,.55);z-index:0}
.he-w-wnotif .pz-st .he-ph{filter:brightness(.85)}
/* 65 Feuille du bas : une feuille blanche remonte du bas avec les 4 infos, la photo reste visible au-dessus */
@keyframes pwFeuille{0%{translate:0 400px;animation-timing-function:cubic-bezier(.2,1.3,.4,1)}12%{translate:0 0}88%{translate:0 0;animation-timing-function:ease-in}100%{translate:0 400px}}
.ecran .hent.pzh.he-w-wfeuille .he-txt{left:0;right:0;bottom:0;top:auto;border-radius:30px 30px 0 0;padding:12px 24px calc(26px + env(safe-area-inset-bottom,0px));box-shadow:0 -14px 34px rgba(0,0,0,.4);animation:pwFeuille 8s infinite}
.he-w-wfeuille .he-txt::before{content:"";width:44px;height:5px;border-radius:3px;background:#d8cdd0;margin:0 auto 6px;flex:none}
.pz-degrade{inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.35))}
/* 66 Écran verrouillé : l'heure en grand, la notification arrive dessous, la barre d'accueil en bas */
@keyframes pwVerrou{0%{translate:0 100px;opacity:0;scale:.92}8%{translate:0 0;opacity:1;scale:1}88%{opacity:1}96%,100%{translate:0 0;opacity:0}}
.ecran .hent.pzh.he-w-wverrou>.pz-blk{top:41%;animation:pwVerrou 8s infinite}
.he-w-wverrou .pz-st .he-ph{filter:brightness(.8)}
.pz-lk{left:0;right:0;top:70px;text-align:center;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.45);z-index:3}
.pz-lk .d{font:500 15px Jost,sans-serif;letter-spacing:.02em}
.pz-lk .h{font:300 92px/1 Jost,sans-serif;margin-top:4px}
.pz-hb{left:50%;bottom:10px;width:140px;height:5px;margin-left:-70px;border-radius:3px;background:rgba(255,255,255,.9);z-index:3}
@media (prefers-reduced-motion:reduce){.hent.pzh.pzw *,.hent.pzh.pzw *::after{animation:none!important}.hent.pzw .pz-etd,.hent.pzw .pz-tc,.hent.pzw .pz-ts{display:none}.hent.pzw .pz-bg{opacity:1}}
`;
const st=document.createElement("style");st.id="entetes-plus13";st.textContent=css;document.head.appendChild(st);

/* quand le site est vraiment à l'écran : le tracé de la ronde suit le vrai rectangle ; les décors de 390 × 844 s'adaptent aux écrans plus courts */
const place=()=>{try{document.querySelectorAll(".hent.pzw .pz-ring").forEach(el=>{const cd=el.closest(".pz-cd");if(!cd)return;const d="path('"+rr(cd.offsetWidth,cd.offsetHeight)+"')";el.querySelectorAll(".pz-tc").forEach(c=>{c.style.offsetPath=d})});
  document.querySelectorAll(".hent.pzw").forEach(h=>{const k=Math.min(1,h.clientHeight/844);h.querySelectorAll(".pz-box").forEach(b=>b.style.setProperty("--k",f1(k)))})}catch(e){}};
let tp=0;try{new MutationObserver(()=>{clearTimeout(tp);tp=setTimeout(place,150)}).observe(document.body,{childList:true,subtree:true});window.addEventListener("resize",()=>{clearTimeout(tp);tp=setTimeout(place,150)});
  if(document.fonts){document.fonts.ready.then(()=>setTimeout(place,150))}}catch(e){}

const vieux=window.entete;
window.entete=function(k,t,lang){
  if(!NOUV.some(e=>e[0]===k))return vieux(k,t,lang);
  g=57;
  const U=n=>P(n),h1=D.hero,h2=D.hero2||D.hero,h3=D.hero3||D.hero;
  const ph=u=>`<div class="he-ph" style="background-image:url('${U(u)}')"></div>`;
  const kick=`<div class="kick">${t.type} · ${D.ville}</div>`,note=D.nb?`<div class="note"><span class="et">${etoiles}</span>${D.note} · ${D.nb} ${t.avisG}</div>`:"";
  const btn=`<button class="he-btn" data-res>${t.creneau}${creneau(t)?`<small>${t.dispo} : ${creneau(t)}</small>`:""}</button>`;
  const f0=Math.max(18,Math.min(/^wcachet/.test(k)?34:/^w(notif|verrou)$/.test(k)?30:44,Math.floor((/^wcachet/.test(k)?250:/^w(notif|verrou)$/.test(k)?240:300)/(String(D.nom||"").length*.58||1))));
  const txt=`<div class="he-txt">${kick}<h1 data-f0="${f0}" style="font-size:${f0}px">${D.nom}</h1>${note}${btn}</div>`;
  /* rectangle (avec ses décors) + décor du fond */
  const W=(top,arriere,avant,fond)=>`<div class="hent he-w-${k} pzh pzw" data-s="accueil"><div class="pz-blk" style="top:${top}"><div class="pz-cd">${arriere?`<div class="pz-ar">${arriere}</div>`:""}${txt}${avant?`<div class="pz-av">${avant}</div>`:""}</div></div><div class="pz-st">${fond}</div></div>`;
  const tc=(d,n,dur,off,cls,iOff)=>R(n,i=>`<div class="pz-tc ${cls||""}" style="offset-path:path('${d}');animation-duration:${dur}s;animation-delay:-${f1(i*dur/n+(off||0))}s"><img src="${ch(i+(iOff||0))}" alt=""></div>`);
  const trait=(d,w,a)=>`<svg class="pz-trait" viewBox="0 0 390 844"><path d="${d}" fill="none" stroke="rgba(255,255,255,${a||.85})" stroke-width="${w||1.6}" stroke-linejoin="round"/></svg>`;
  const etinc=n=>R(n,()=>`<span class="pz-ts" style="left:${f1(rx(2,94))}%;top:${f1(rx(4,92))}%;font-size:${Math.round(rx(14,30))}px;animation-duration:${f1(rx(1.4,2.8))}s;animation-delay:-${f1(rx(0,3))}s">✦</span>`);
  switch(k){
  case "wenseigne":{const nx=20,ny=11;
    const bulbs=[[],[],[]];let n=0;
    for(let i=0;i<nx;i++){bulbs[n++%3].push(`left:${f1(i*100/nx)}%;top:-12px`)}
    for(let i=0;i<ny;i++){bulbs[n++%3].push(`left:calc(100% + 12px);top:${f1(i*100/ny)}%`)}
    for(let i=0;i<nx;i++){bulbs[n++%3].push(`left:${f1(100-i*100/nx)}%;top:calc(100% + 12px)`)}
    for(let i=0;i<ny;i++){bulbs[n++%3].push(`left:-12px;top:${f1(100-i*100/ny)}%`)}
    const av=bulbs.map((l,j)=>`<div class="pz-bg" style="animation-delay:-${f1(j/3)}s">${l.map(s=>`<i style="${s}"></i>`).join("")}</div>`).join("");
    return W("38%","",av,ph(h1));}
  case "wtele":return W("38%","","",ph(h2)+`<div class="pz-box">${trait(PA)}${trait(PB)}${tc(PA,6,13,0)}${tc(PB,6,13,6.5,"",4)}</div>`);
  case "wfil":return W("38%",`<div class="pz-beam pz-lum"><i></i></div>`,"",ph(h1)+etinc(10));
  case "wronde":{const d=rr(CW,CHT);return W("38%",`<i class="pz-ligne"></i>`,`<div class="pz-ring">${R(12,i=>`<div class="pz-tc" style="offset-path:path('${d}');animation-duration:14s;animation-delay:-${f1(i*14/12)}s"><img src="${ch(i)}" alt=""></div>`)}</div>`,ph(h2));}
  case "whuit":return W("55%","","",ph(h3)+`<div class="pz-box">${trait(HUIT)}${tc(HUIT,12,18,0)}</div>`);
  case "wtourb":return W("38%","","",ph(h3)+`<div class="pz-box">${tc(SPI,13,15,0,"pz-tcv")}</div>`);
  case "wetor":return W("64px","","",ph(h2)+R(15,()=>{const s=Math.round(rx(20,44));return `<div class="pz-etd" style="z-index:8;left:${f1(rx(0,92))}%;font-size:${s}px;animation-duration:${f1(rx(5,9))}s;animation-delay:-${f1(rx(0,9))}s"><b style="animation-duration:${f1(rx(1,2.2))}s;animation-delay:-${f1(rx(0,2))}s">★</b></div>`}));
  case "wetoile":return W("39.5%","","",ph(h1)+`<div class="pz-box">${trait(ETO)}${tc(ETO,15,18,0)}</div>`);
  case "wcachet":{const Rr=164+26;return W("48.7%",`<i class="pz-dash"></i>`,`<div class="pz-ring2">${R(9,i=>{const a=i/9*Math.PI*2;return `<img src="${ch(i)}" alt="" style="left:${Math.round(Math.cos(a)*Rr)}px;top:${Math.round(Math.sin(a)*Rr)}px">`})}</div>`,ph(h2)+etinc(8));}
  case "wfeuille":return `<div class="hent he-w-${k} pzh" data-s="accueil">${txt}<div class="pz-st">${ph(h2)}<div class="pz-degrade"></div></div></div>`;
  case "wverrou":{let dt="",hh="";try{const n=new Date();dt=n.toLocaleDateString(lang||"fr",{weekday:"long",day:"numeric",month:"long"});hh=n.toLocaleTimeString(lang||"fr",{hour:"numeric",minute:"2-digit",hour12:false}).replace(/^(\d):/,"$1:")}catch(e){dt="";hh="9:41"}
    return `<div class="hent he-w-${k} pzh pzw" data-s="accueil"><div class="pz-blk"><div class="pz-cd">${txt.replace('<div class="he-txt">','<div class="he-txt"><span class="pz-ic"><img src="'+ch(2)+'" alt=""></span>')}</div></div><div class="pz-st">${ph(h3)}<div class="pz-lk"><div class="d">${dt}</div><div class="h">${hh}</div></div><i class="pz-hb"></i></div></div>`;}
  case "wcachet2":return W("48.7%","","",ph(h2)+etinc(14));
  case "wnotif":return `<div class="hent he-w-${k} pzh pzw" data-s="accueil"><div class="pz-blk" style="top:64px"><div class="pz-cd"><div class="pz-ghost"></div>${txt.replace('<div class="he-txt">','<div class="he-txt"><span class="pz-ic"><img src="'+ch(2)+'" alt=""></span>')}</div></div><div class="pz-st">${ph(h2)}</div></div>`;
  }
  return "";
};
try{const k=enteteChoisie();if(NOUV.some(e=>e[0]===k)){const ok=window.__changeEntete&&window.__changeEntete();if(!ok)setTimeout(()=>window.__changeEntete&&window.__changeEntete(),600)}}catch(e){}
})();
