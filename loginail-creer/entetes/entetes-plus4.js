/* 16/11 (Marie) : série 4 — 5 en-têtes qui BOUGENT (elle adore). Maquette (projet non touché). */
(function(){
/* 16/11 : seules les en-têtes choisies par Marie restent proposées (les autres : poubelle-16-11/) */
const NOUV=[["disco", "Boule disco"], ["papillons", "Papillons"], ["bulles", "Bulles"]];
try{NOUV.forEach(e=>{if(!ENTETES.some(x=>x[0]===e[0]))ENTETES.push(e)})}catch(e){}
const capt=/[?&]capt/.test(location.search);
let css=`
.hent[class*="he-q-"]{justify-content:flex-start;padding:84px 0 44px}
.hent[class*="he-q-"] .he-ph{position:absolute;inset:0;background-size:cover;background-position:center}
@keyframes qMonte{from{opacity:0;transform:translateY(36px) scale(.94)}to{opacity:1;transform:none}}
/* 1 Boule disco */
.he-q-disco .qx-lum{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:4}
.he-q-disco .qx-rot{position:absolute;left:50%;top:90px;width:900px;height:900px;margin:-450px 0 0 -450px;animation:qTour 14s linear infinite}
.he-q-disco .qx-rot i{position:absolute;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 0 10px 3px currentColor;opacity:.75;mix-blend-mode:screen}
@keyframes qTour{to{transform:rotate(360deg)}}
.he-q-disco .qx-fil{width:2px;height:40px;background:linear-gradient(#999,#ddd);margin-top:-30px;flex:none}
.he-q-disco .qx-boule{position:relative;z-index:3;width:120px;height:120px;flex:none;border-radius:50%;margin-bottom:-34px;
 background:linear-gradient(90deg,rgba(0,0,0,.35) 1px,transparent 1px) 0 0/11px 11px,linear-gradient(rgba(0,0,0,.35) 1px,transparent 1px) 0 0/11px 11px,
 conic-gradient(from 0deg,#fff,#9aa,#eef,#677,#fff,#bcc,#556,#fff),radial-gradient(circle at 35% 30%,#fff,#bbb 40%,#555 78%,#222);
 background-blend-mode:normal,normal,overlay,normal;box-shadow:inset -14px -14px 26px rgba(0,0,0,.55),inset 8px 8px 18px rgba(255,255,255,.5),0 16px 30px -10px rgba(0,0,0,.6);animation:qFacette 3s linear infinite}
@keyframes qFacette{to{background-position:44px 0,0 0,0 0,0 0}}
.he-q-disco .qx-boule:after{content:"✦";position:absolute;left:22px;top:16px;color:#fff;font-size:22px;text-shadow:0 0 10px #fff;animation:qScint 1.6s ease-in-out infinite}
@keyframes qScint{0%,100%{opacity:.2;transform:scale(.5)}50%{opacity:1;transform:scale(1.1) rotate(45deg)}}
.he-q-disco .qx-ph{position:relative;width:calc(100% - 40px);max-width:520px;height:clamp(360px,52vh,470px);flex:none;border-radius:26px;overflow:hidden;box-shadow:0 26px 46px -22px rgba(0,0,0,.6);animation:qMonte 1s both;margin-bottom:18px}
/* 16/11 (Marie) : le bouton Réserver reste TOUJOURS dans l'en-tête ; si le nom grandit, la carte monte par-dessus la photo */
.ecran .defile>.hent.he-q-disco{height:100%;min-height:0;padding:0}
.he-q-disco .qx-fil{position:absolute;z-index:3;left:50%;top:52px;margin:0 0 0 -1px}
.he-q-disco .qx-boule{position:absolute;z-index:4;left:50%;top:84px;margin:0 0 0 -60px}
.he-q-disco .qx-ph{position:absolute;top:150px;left:20px;right:20px;bottom:140px;width:auto;max-width:none;height:auto;margin:0}
.ecran .hent.he-q-disco>.he-txt{position:absolute;z-index:5;left:0;right:0;bottom:22px;margin:0 auto;-webkit-backdrop-filter:blur(14px) saturate(1.2);backdrop-filter:blur(14px) saturate(1.2)}
/* 2 Papillons */
.he-q-papillons .qx-arc{position:relative;width:min(300px,80%);aspect-ratio:3/4;flex:none;border-radius:999px 999px 24px 24px;overflow:hidden;box-shadow:0 0 0 6px var(--papier,#fff),0 30px 50px -20px rgba(0,0,0,.6);margin:10px 0 22px;animation:qMonte 1s both}
.he-q-papillons .qx-vol{position:absolute;inset:0;pointer-events:none;z-index:4;overflow:hidden}
.he-q-papillons .qx-pa{position:absolute;left:0;top:0;width:54px;animation:qVol1 9s ease-in-out infinite}
.he-q-papillons .qx-pa:nth-child(2){width:40px;animation-name:qVol2;animation-duration:11s}
.he-q-papillons .qx-pa:nth-child(3){width:46px;animation-name:qVol3;animation-duration:8s}
.he-q-papillons .qx-pa:nth-child(4){width:34px;animation-name:qVol2;animation-duration:13s;animation-direction:reverse}
.he-q-papillons .qx-pa:nth-child(5){width:42px;animation-name:qVol1;animation-duration:12s;animation-direction:reverse}
@keyframes qVol1{0%{transform:translate(-60px,520px) rotate(20deg)}25%{transform:translate(120px,330px) rotate(-10deg)}50%{transform:translate(300px,420px) rotate(15deg)}75%{transform:translate(230px,140px) rotate(-20deg)}100%{transform:translate(-60px,520px) rotate(20deg)}}
@keyframes qVol2{0%{transform:translate(420px,180px) rotate(-15deg)}30%{transform:translate(250px,60px) rotate(10deg)}60%{transform:translate(40px,250px) rotate(-10deg)}100%{transform:translate(420px,180px) rotate(-15deg)}}
@keyframes qVol3{0%{transform:translate(160px,620px) rotate(0)}35%{transform:translate(320px,300px) rotate(18deg)}70%{transform:translate(30px,120px) rotate(-12deg)}100%{transform:translate(160px,620px) rotate(0)}}
.he-q-papillons .qx-pa svg{display:block;width:100%;overflow:visible;filter:drop-shadow(0 6px 8px rgba(0,0,0,.35))}
.he-q-papillons .qx-pa .ai{transform-box:view-box;transform-origin:30px 25px;animation:qBat .22s ease-in-out infinite alternate}
.he-q-papillons .qx-pa .ai.d{animation-name:qBatD}
@keyframes qBat{from{transform:scaleX(1)}to{transform:scaleX(.25)}}
@keyframes qBatD{from{transform:scaleX(1)}to{transform:scaleX(.25)}}
.he-q-papillons .qx-pa path{fill:url(#qxGr);stroke:#c9a14a;stroke-width:1.2}
.he-q-papillons .qx-pa ellipse{fill:#2a1f1a}
/* 3 Rideau de strass */
.he-q-strass .qx-sc{position:relative;width:calc(100% - 36px);max-width:520px;height:clamp(400px,58vh,520px);flex:none;border-radius:26px;overflow:hidden;box-shadow:0 26px 46px -22px rgba(0,0,0,.65);animation:qMonte 1s both;margin-bottom:18px}
.he-q-strass .qx-tr{position:absolute;z-index:3;left:0;right:0;top:0;height:14px;background:linear-gradient(#e9eef8,#9aa6bd);box-shadow:0 3px 8px rgba(0,0,0,.4)}
.he-q-strass .qx-ch{position:absolute;z-index:2;top:8px;width:12px;transform-origin:top center;animation:qBalance 3.4s ease-in-out infinite;
 background:radial-gradient(circle,#fff 0 2px,#e6ecff 2.6px,#9aa7c4 4.4px,rgba(0,0,0,.35) 5.4px,transparent 6px) 0 0/12px 13px repeat-y;filter:drop-shadow(0 2px 2px rgba(0,0,0,.35))}
.he-q-strass .qx-ch:after{content:"";position:absolute;left:-4px;bottom:-14px;width:20px;height:20px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#dfe6ff 30%,#8f9bb8 70%,#4a5368);box-shadow:0 0 10px rgba(255,255,255,.8)}
@keyframes qBalance{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
.he-q-strass .qx-gl{position:absolute;z-index:3;color:#fff;font-size:16px;text-shadow:0 0 10px #fff;animation:qScint 1.8s ease-in-out infinite}
/* 4 Bulles */
.he-q-bulles .qx-gb{position:relative;z-index:2;width:min(300px,80%);aspect-ratio:1;flex:none;border-radius:50%;overflow:hidden;margin:16px 0 26px;animation:qFlotte 5s ease-in-out infinite;
 box-shadow:0 0 0 5px rgba(255,255,255,.35),0 0 0 6px rgba(190,230,255,.6),0 30px 50px -22px rgba(0,0,0,.5)}
.he-q-bulles .qx-gb:after{content:"";position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 30% 24%,rgba(255,255,255,.9) 0 5%,transparent 10%),radial-gradient(circle,transparent 62%,rgba(255,170,230,.35) 74%,rgba(150,215,255,.5) 84%,rgba(255,240,160,.45) 92%,rgba(255,255,255,.6) 99%)}
@keyframes qFlotte{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.he-q-bulles .qx-ciel{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:4}
.he-q-bulles .qx-bu{position:absolute;bottom:-80px;border-radius:50%;animation:qMonteB linear infinite;
 background:radial-gradient(circle at 32% 28%,rgba(255,255,255,.9) 0 7%,transparent 10%),radial-gradient(circle,transparent 55%,rgba(255,180,230,.4) 68%,rgba(160,220,255,.6) 80%,rgba(255,245,170,.5) 90%,rgba(255,255,255,.75) 97%)}
@keyframes qMonteB{0%{transform:translate(0,0)}25%{transform:translate(14px,-260px)}50%{transform:translate(-10px,-520px)}75%{transform:translate(16px,-780px)}100%{transform:translate(0,-1040px)}}
/* 5 Coup de pinceau */
.he-q-pinceau .qx-tl{position:relative;width:calc(100% - 40px);max-width:520px;height:clamp(390px,58vh,520px);flex:none;border-radius:26px;overflow:hidden;background:var(--papier,#fff);box-shadow:0 26px 46px -22px rgba(0,0,0,.6);margin-bottom:18px}
.he-q-pinceau .qx-pe{position:absolute;inset:0;animation:qPeint 6s cubic-bezier(.5,.1,.3,1) infinite}
@keyframes qPeint{0%{clip-path:inset(0 100% 0 0)}30%,88%{clip-path:inset(0 0 0 0)}100%{clip-path:inset(0 0 0 0);opacity:0}}
.he-q-pinceau .qx-bord{position:absolute;z-index:2;top:-4%;bottom:-4%;width:46px;margin-left:-30px;left:0;background:var(--acc);border-radius:40% 60% 50% 50%/8% 6% 6% 8%;filter:drop-shadow(0 0 6px rgba(0,0,0,.25));animation:qBord 6s cubic-bezier(.5,.1,.3,1) infinite}
@keyframes qBord{0%{left:0;opacity:1}30%{left:100%;opacity:1}32%,100%{left:100%;opacity:0}}
.he-q-pinceau .qx-pin{position:absolute;z-index:3;top:34%;width:44px;height:170px;margin-left:-12px;left:0;transform:rotate(18deg);animation:qPin 6s cubic-bezier(.5,.1,.3,1) infinite}
@keyframes qPin{0%{left:0;opacity:1}30%{left:100%;opacity:1}36%,100%{left:110%;opacity:0}}
.he-q-pinceau .qx-pin:before{content:"";position:absolute;left:8px;top:0;width:28px;height:118px;border-radius:8px 8px 4px 4px;background:linear-gradient(90deg,#111,#444 40%,#111)}
.he-q-pinceau .qx-pin:after{content:"";position:absolute;left:11px;top:116px;width:22px;height:46px;background:var(--acc);clip-path:polygon(0 0,100% 0,70% 100%,30% 100%);filter:brightness(1.05)}
`;
if(capt)css+=`.hent[class*="he-q-"] .qx-lum *,.hent[class*="he-q-"] .qx-vol *,.hent[class*="he-q-"] .qx-ciel *,.hent[class*="he-q-"] .qx-ch,.hent[class*="he-q-"] .qx-boule,.hent[class*="he-q-"] .qx-gb{animation-play-state:paused!important}.hent[class*="he-q-"] .qx-ph,.hent[class*="he-q-"] .qx-arc,.hent[class*="he-q-"] .qx-sc{animation:none!important}
.he-q-pinceau .qx-pe{animation:none!important;clip-path:inset(0 0 0 0)}.he-q-pinceau .qx-bord{animation:none!important;left:72%}.he-q-pinceau .qx-pin{animation:none!important;left:74%}`;
const st=document.createElement("style");st.id="entetes-plus4";st.textContent=css;document.head.appendChild(st);

const PAP=`<svg viewBox="0 0 60 50"><defs><linearGradient id="qxGr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:#fff"/><stop offset=".45" style="stop-color:var(--acc)"/><stop offset="1" style="stop-color:#f3d98a"/></linearGradient></defs><g class="ai g"><path d="M30 25 C 22 4, 2 0, 4 16 C 5 26, 20 29, 30 25Z"/><path d="M30 26 C 19 30, 9 43, 18 46 C 26 48, 30 37, 30 26Z"/></g><g class="ai d"><path d="M30 25 C 38 4, 58 0, 56 16 C 55 26, 40 29, 30 25Z"/><path d="M30 26 C 41 30, 51 43, 42 46 C 34 48, 30 37, 30 26Z"/></g><ellipse cx="30" cy="27" rx="2.2" ry="11"/></svg>`;
const vieux=window.entete;
window.entete=function(k,t,lang){
  if(!NOUV.some(e=>e[0]===k))return vieux(k,t,lang);
  const ph=x=>`<div class="he-ph" style="background-image:url('${P(x)}')"></div>`;
  const kick=`<div class="kick">${t.type} · ${D.ville}</div>`,note=D.nb?`<div class="note"><span class="et">${etoiles}</span>${D.note} · ${D.nb} ${t.avisG}</div>`:"";
  const btn=`<button class="he-btn" data-res>${t.creneau}${creneau(t)?`<small>${t.dispo} : ${creneau(t)}</small>`:""}</button>`;
  const nom=`<h1>${D.nom}</h1>`,txt=(h=true)=>`<div class="he-txt">${kick}${h?nom:""}${note}${btn}</div>`;
  const c=`hent he-q-${k}`;
  if(k==="disco"){const col=["#ff8fd0","#ffe39a","#ffffff","#9fe3ff","#d7a8ff"];let d="";for(let i=0;i<46;i++){const a=i*137.5*Math.PI/180,r=60+((i*53)%380);d+=`<i style="left:${450+r*Math.cos(a)}px;top:${450+r*Math.sin(a)}px;color:${col[i%5]};transform:scale(${.5+(i%4)*.25})"></i>`}
    return `<div class="${c}" data-s="accueil"><div class="qx-lum"><div class="qx-rot">${d}</div></div><div class="qx-fil"></div><div class="qx-boule"></div><div class="qx-ph">${ph(D.hero)}</div>${txt()}</div>`;}
  if(k==="papillons")return `<div class="${c}" data-s="accueil"><div class="qx-vol">${[0,-3,-5,-7,-2].map(d=>`<span class="qx-pa" style="animation-delay:${d}s">${PAP}</span>`).join("")}</div><div class="qx-arc">${ph(D.hero)}</div>${txt()}</div>`;
  if(k==="strass"){let ch="";const L=[150,230,120,280,180,250,140,210,170];L.forEach((h,i)=>{ch+=`<span class="qx-ch" style="left:${4+i*11.5}%;height:${h}px;animation-delay:${-i*.37}s"></span>`});
    return `<div class="${c}" data-s="accueil"><div class="qx-sc">${ph(D.hero)}<span class="qx-tr"></span>${ch}<span class="qx-gl" style="left:20%;top:30%">✦</span><span class="qx-gl" style="left:70%;top:46%;animation-delay:.8s">✦</span></div>${txt()}</div>`;}
  if(k==="bulles"){let b="";for(let i=0;i<16;i++){const s=18+(i*13)%52,x=(i*41)%96,du=7+(i%6),dl=-((i*1.7)%11);b+=`<span class="qx-bu" style="left:${x}%;width:${s}px;height:${s}px;animation-duration:${du}s;animation-delay:${dl}s"></span>`}
    return `<div class="${c}" data-s="accueil"><div class="qx-ciel">${b}</div><div class="qx-gb">${ph(D.hero)}</div>${txt()}</div>`;}
  if(k==="pinceau")return `<div class="${c}" data-s="accueil"><div class="qx-tl"><div class="qx-pe">${ph(D.hero)}</div><span class="qx-bord"></span><span class="qx-pin"></span></div>${txt()}</div>`;
  return "";
};
try{const k=enteteChoisie();if(NOUV.some(e=>e[0]===k)){const ok=window.__changeEntete&&window.__changeEntete();if(!ok)setTimeout(()=>window.__changeEntete&&window.__changeEntete(),600)}}catch(e){}
})();
