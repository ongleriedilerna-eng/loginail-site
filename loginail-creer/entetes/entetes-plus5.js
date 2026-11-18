/* 16/11 (Marie) : série 5 — 10 en-têtes animées de plus. Maquette (projet non touché). */
(function(){
/* 16/11 : seules les en-têtes choisies par Marie restent proposées (les autres : poubelle-16-11/) */
const NOUV=[["tele", "Télé rétro"], ["carrousel", "Carrousel 3D"]];
try{NOUV.forEach(e=>{if(!ENTETES.some(x=>x[0]===e[0]))ENTETES.push(e)})}catch(e){}
const capt=/[?&]capt/.test(location.search);
const OR="linear-gradient(135deg,#6f4a12 0%,#f8e7a6 18%,#b8862b 34%,#fff4c4 50%,#a8761f 66%,#f3d98a 82%,#6f4a12 100%)";
const CHR="linear-gradient(135deg,#5d6470 0%,#f4f6fa 22%,#9aa3b2 40%,#ffffff 52%,#7d8796 70%,#e3e8ef 86%,#4a515c 100%)";
let css=`
.hent[class*="he-r-"]{justify-content:flex-start;padding:84px 0 44px}
.hent[class*="he-r-"] .he-ph{position:absolute;inset:0;background-size:cover;background-position:center}
.hent[class*="he-r-"] .he-txt{position:relative;z-index:5}
@keyframes rMonte{from{opacity:0;transform:translateY(36px) scale(.94)}to{opacity:1;transform:none}}
@keyframes rTour{to{transform:rotate(360deg)}}
.rx-cad{position:relative;width:calc(100% - 40px);max-width:520px;height:clamp(380px,56vh,500px);flex:none;border-radius:26px;overflow:hidden;box-shadow:0 26px 46px -22px rgba(0,0,0,.6);animation:rMonte 1s both;margin-bottom:18px}
/* 1 Flammes */
.he-r-flammes .rx-cad{overflow:visible}
.he-r-flammes .rx-in{position:absolute;inset:0;border-radius:26px;overflow:hidden}
.he-r-flammes .rx-feu{position:absolute;z-index:2;left:-10px;right:-10px;bottom:-26px;height:150px;pointer-events:none;filter:blur(.6px)}
.he-r-flammes .rx-fl{position:absolute;bottom:0;width:70px;height:140px;margin-left:-35px;border-radius:50% 50% 45% 45%/62% 62% 38% 38%;transform-origin:50% 100%;mix-blend-mode:screen;
 background:radial-gradient(ellipse at 50% 85%,#fff7c2 0 12%,#ffd23f 28%,#ff8a1f 52%,rgba(230,40,20,.9) 72%,rgba(200,20,20,0) 86%);animation:rFlam 1.1s ease-in-out infinite alternate}
@keyframes rFlam{0%{transform:scaleY(.82) scaleX(1.05) skewX(-3deg)}50%{transform:scaleY(1.08) scaleX(.94) skewX(4deg)}100%{transform:scaleY(.92) scaleX(1) skewX(-5deg)}}
.he-r-flammes .rx-br{position:absolute;bottom:20px;width:4px;height:4px;border-radius:50%;background:#ffb347;box-shadow:0 0 6px 2px #ff7a1a;animation:rBraise 2.6s linear infinite}
@keyframes rBraise{0%{transform:translate(0,0);opacity:1}100%{transform:translate(18px,-220px);opacity:0}}
/* 2 Étoiles filantes */
.ecran .hent.he-r-filantes,.ecran:has(>.fond-site) .hent.he-r-filantes{background:radial-gradient(90% 60% at 50% 30%,#2b2552,#0c0b1f 75%)!important;color:#fff}
.he-r-filantes .rx-ciel{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.he-r-filantes .rx-pt{position:absolute;width:2px;height:2px;border-radius:50%;background:#fff;box-shadow:0 0 4px #fff;animation:rBrill 2.4s ease-in-out infinite}
@keyframes rBrill{0%,100%{opacity:.25}50%{opacity:1}}
.he-r-filantes .rx-fi{position:absolute;width:160px;height:2px;background:linear-gradient(90deg,#fff,rgba(255,255,255,0));border-radius:2px;transform:rotate(-30deg);animation:rFile 4.5s ease-in infinite;opacity:0}
.he-r-filantes .rx-fi:before{content:"";position:absolute;left:-3px;top:-3px;width:8px;height:8px;border-radius:50%;background:#fff;box-shadow:0 0 12px 3px #fff}
@keyframes rFile{0%{transform:rotate(-30deg) translateX(0);opacity:0}5%{opacity:1}30%{transform:rotate(-30deg) translateX(-520px);opacity:0}100%{opacity:0;transform:rotate(-30deg) translateX(-520px)}}
.he-r-filantes .rx-lune{position:relative;z-index:2;width:min(290px,78%);aspect-ratio:1;flex:none;border-radius:50%;overflow:hidden;margin:6px 0 22px;box-shadow:0 0 0 4px rgba(255,255,255,.85),0 0 40px 10px rgba(180,170,255,.45),0 0 90px 20px rgba(120,110,255,.25);animation:rMonte 1s both}
/* 3 Paillettes */
.he-r-paillettes .rx-pl{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:4}
.he-r-paillettes .rx-pa{position:absolute;top:-10px;width:5px;height:5px;transform:rotate(45deg);animation:rPaillette linear infinite}
@keyframes rPaillette{0%{transform:translateY(0) rotate(45deg) scale(.6);opacity:0}10%{opacity:1}50%{transform:translateY(450px) rotate(225deg) scale(1.1)}100%{transform:translateY(900px) rotate(405deg) scale(.7);opacity:.2}}
.he-r-paillettes .rx-cad{padding:8px;background:${OR};background-size:300% 300%;animation:rMonte 1s both,rGlit 4s linear infinite}
@keyframes rGlit{to{background-position:300% 0}}
.he-r-paillettes .rx-cad>div{position:relative;height:100%;border-radius:20px;overflow:hidden}
/* 4 Ruban défilant */
.he-r-ruban .rx-cad{overflow:hidden}
.he-r-ruban .rx-bd{position:absolute;z-index:3;left:-30%;width:160%;height:42px;display:flex;align-items:center;overflow:hidden;box-shadow:0 8px 18px -6px rgba(0,0,0,.5)}
.he-r-ruban .rx-bd.a{top:24%;transform:rotate(-9deg);background:var(--acc);color:#fff}
.he-r-ruban .rx-bd.b{top:62%;transform:rotate(7deg);background:#111;color:#fff}
.he-r-ruban .rx-bd span{flex:none;white-space:nowrap;font:700 15px Jost;letter-spacing:.24em;text-transform:uppercase;padding-right:24px;animation:rDefile 9s linear infinite}
.he-r-ruban .rx-bd.b span{animation-direction:reverse}
@keyframes rDefile{to{transform:translateX(-100%)}}
/* 5 Aura */
.he-r-aura .rx-au{position:absolute;inset:0;overflow:hidden;pointer-events:none;filter:blur(40px);opacity:.9}
.he-r-aura .rx-ta{position:absolute;width:300px;height:300px;border-radius:50%;animation:rDerive 9s ease-in-out infinite alternate;mix-blend-mode:multiply}
@keyframes rDerive{0%{transform:translate(0,0) scale(1)}50%{transform:translate(60px,-40px) scale(1.2)}100%{transform:translate(-50px,50px) scale(.9)}}
.he-r-aura .rx-cad{border:6px solid rgba(255,255,255,.85);box-shadow:0 0 50px 10px rgba(255,255,255,.55),0 26px 46px -22px rgba(0,0,0,.5);animation:rMonte 1s both,rPulse 3s ease-in-out infinite}
@keyframes rPulse{0%,100%{box-shadow:0 0 30px 6px rgba(255,255,255,.45),0 26px 46px -22px rgba(0,0,0,.5)}50%{box-shadow:0 0 60px 16px rgba(255,255,255,.75),0 26px 46px -22px rgba(0,0,0,.5)}}
/* 6 Télé rétro */
.he-r-tele .rx-tv{position:relative;width:min(330px,88%);flex:none;margin:30px 0 22px;padding:18px 18px 46px;border-radius:34px;background:linear-gradient(160deg,color-mix(in srgb,var(--acc) 70%,#fff 20%),var(--acc));box-shadow:inset 0 -8px 0 rgba(0,0,0,.18),inset 0 4px 0 rgba(255,255,255,.3),0 30px 50px -20px rgba(0,0,0,.7);animation:rMonte 1s both}
.he-r-tele .rx-ant{position:absolute;top:-46px;left:50%;width:4px;height:60px;background:#222;transform-origin:bottom;border-radius:4px}
.he-r-tele .rx-ant.g{transform:rotate(-30deg)}.he-r-tele .rx-ant.d{transform:rotate(30deg)}
.he-r-tele .rx-ant:after{content:"";position:absolute;top:-6px;left:-4px;width:12px;height:12px;border-radius:50%;background:#222}
.he-r-tele .rx-ecr{position:relative;aspect-ratio:4/4.4;border-radius:30px/40px;overflow:hidden;background:#000;box-shadow:inset 0 0 0 6px rgba(0,0,0,.6),inset 0 0 30px rgba(0,0,0,.8)}
.he-r-tele .rx-ecr .he-ph{animation:rGlitch 5s steps(1) infinite}
@keyframes rGlitch{0%,91%,100%{transform:none;filter:none}92%{transform:translateX(-8px);filter:hue-rotate(80deg) saturate(2)}94%{transform:translateX(6px) skewX(4deg);filter:contrast(1.6)}96%{transform:none;filter:invert(.1)}}
.he-r-tele .rx-ecr:before{content:"";position:absolute;inset:0;z-index:2;background:repeating-linear-gradient(rgba(0,0,0,.18) 0 2px,transparent 2px 4px);pointer-events:none}
.he-r-tele .rx-ecr:after{content:"";position:absolute;left:0;right:0;z-index:2;height:60px;background:linear-gradient(transparent,rgba(255,255,255,.18),transparent);animation:rBalai 3.2s linear infinite}
@keyframes rBalai{from{top:-60px}to{top:100%}}
.he-r-tele .rx-onair{position:absolute;z-index:3;top:28px;right:30px;background:#e0182d;color:#fff;font:700 10px Jost;letter-spacing:.2em;padding:5px 9px;border-radius:5px;animation:rBrill 1.2s steps(2) infinite}
.he-r-tele .rx-bt{position:absolute;bottom:12px;width:20px;height:20px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#bbb 40%,#555)}
.he-r-tele .rx-bt.a{right:30px}.he-r-tele .rx-bt.b{right:60px}
.he-r-tele .rx-gr{position:absolute;left:30px;bottom:16px;width:90px;height:12px;background:repeating-linear-gradient(90deg,rgba(0,0,0,.35) 0 3px,transparent 3px 7px);border-radius:3px}
/* 7 Jackpot */
.he-r-jackpot .rx-ma{position:relative;width:min(340px,90%);flex:none;margin:6px 0 20px;padding:62px 16px 18px;border-radius:28px 28px 18px 18px;background:linear-gradient(#c3122a,#7c0816);box-shadow:inset 0 0 0 5px #e9c46a,inset 0 0 0 9px #8a5a12,0 30px 50px -20px rgba(0,0,0,.7);animation:rMonte 1s both}
.he-r-jackpot .rx-tit{position:absolute;top:14px;left:0;right:0;text-align:center;font:800 26px/1 Jost;letter-spacing:.14em;color:#fff3c4;text-shadow:0 0 8px #ffd56b,0 0 18px #ff9f1a,0 3px 0 #7c0816}
.he-r-jackpot .rx-am{position:absolute;width:10px;height:10px;border-radius:50%;background:#fff6d0;box-shadow:0 0 8px 3px #ffd56b;animation:rBrill .9s steps(2) infinite}
.he-r-jackpot .rx-rx{display:flex;gap:8px;background:#1b0b0e;padding:8px;border-radius:12px;box-shadow:inset 0 6px 14px rgba(0,0,0,.8)}
.he-r-jackpot .rx-ro{position:relative;flex:1;height:200px;overflow:hidden;border-radius:8px;background:#fff;box-shadow:inset 0 14px 14px -10px rgba(0,0,0,.6),inset 0 -14px 14px -10px rgba(0,0,0,.6)}
.he-r-jackpot .rx-ba{position:absolute;left:0;right:0;top:0;animation:rRoule 6s cubic-bezier(.3,.05,.2,1) infinite}
.he-r-jackpot .rx-ro:nth-child(2) .rx-ba{animation-delay:.25s}.he-r-jackpot .rx-ro:nth-child(3) .rx-ba{animation-delay:.5s}
.he-r-jackpot .rx-ba div{position:relative;height:200px}
@keyframes rRoule{0%{transform:translateY(0)}45%,100%{transform:translateY(-1600px)}}
.he-r-jackpot .rx-lev{position:absolute;right:-26px;top:70px;width:10px;height:110px;background:${CHR};border-radius:5px}
.he-r-jackpot .rx-lev:before{content:"";position:absolute;top:-18px;left:-9px;width:28px;height:28px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ff8a9a,#c3122a 60%,#6d0712)}
/* 8 Carrousel 3D */
.he-r-carrousel .rx-sc{position:relative;width:100%;height:330px;flex:none;perspective:1000px;margin:10px 0 18px}
.he-r-carrousel .rx-an{position:absolute;left:50%;top:20px;width:170px;height:240px;margin-left:-85px;transform-style:preserve-3d;animation:rCar 16s linear infinite}
@keyframes rCar{from{transform:rotateY(0)}to{transform:rotateY(-360deg)}}
.he-r-carrousel .rx-ca{position:absolute;inset:0;border-radius:18px;overflow:hidden;box-shadow:0 0 0 4px var(--papier,#fff),0 20px 30px -14px rgba(0,0,0,.6);backface-visibility:hidden}
.he-r-carrousel .rx-sol{position:absolute;left:50%;bottom:6px;width:280px;height:30px;margin-left:-140px;border-radius:50%;background:radial-gradient(rgba(0,0,0,.35),transparent 70%)}
/* 9 Orbite */
.he-r-orbite .rx-or{position:relative;width:min(300px,80%);aspect-ratio:1;flex:none;margin:20px 0 26px}
.he-r-orbite .rx-ce{position:absolute;inset:14%;border-radius:50%;overflow:hidden;box-shadow:0 0 0 6px var(--papier,#fff),0 26px 40px -16px rgba(0,0,0,.6);animation:rMonte 1s both}
.he-r-orbite .rx-an{position:absolute;inset:-6%;border-radius:50%;border:1.5px dashed color-mix(in srgb,var(--acc) 50%,transparent);transform:rotateX(68deg);transform-style:preserve-3d}
.he-r-orbite .rx-tr{position:absolute;inset:0;animation:rTour 7s linear infinite}
.he-r-orbite .rx-tr:nth-of-type(2){animation-duration:9s;animation-direction:reverse}
.he-r-orbite .rx-ob{position:absolute;left:50%;top:-14px;margin-left:-20px;width:40px;height:40px;display:grid;place-items:center;font-size:40px;line-height:1;background:${CHR};-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 4px 6px rgba(0,0,0,.45));animation:rTour 7s linear infinite reverse}
/* 10 Enseigne Broadway */
.he-r-broadway .rx-en{position:relative;z-index:2;max-width:calc(100% - 30px);padding:22px 26px 18px;border-radius:16px;background:linear-gradient(#2a1d14,#120c08);box-shadow:inset 0 0 0 3px #d9b86a,0 20px 36px -16px rgba(0,0,0,.8);margin-bottom:-24px;animation:rMonte 1s both}
.he-r-broadway .rx-en h1{color:#fff3c4!important;-webkit-text-fill-color:#fff3c4!important;margin:0!important;line-height:1!important;text-shadow:0 0 6px #ffd56b,0 0 16px #ff9f1a}
.he-r-broadway .rx-en small{display:block;font:600 9.5px Jost;letter-spacing:.44em;text-transform:uppercase;color:#d9b86a;margin-top:8px}
.he-r-broadway .rx-amp{position:absolute;width:9px;height:9px;border-radius:50%;background:#fff6d0;box-shadow:0 0 8px 3px #ffd56b;animation:rChen 1.2s steps(1) infinite}
@keyframes rChen{0%,49%{opacity:1}50%,100%{opacity:.25;box-shadow:none}}
.he-r-broadway .rx-cad{margin-top:0}
`;
if(capt)css+=`.hent[class*="he-r-"] .rx-cad,.hent[class*="he-r-"] .rx-lune,.hent[class*="he-r-"] .rx-tv,.hent[class*="he-r-"] .rx-ma,.hent[class*="he-r-"] .rx-ce,.hent[class*="he-r-"] .rx-en{animation:none!important}
.hent[class*="he-r-"] .rx-fi,.hent[class*="he-r-"] .rx-pa,.hent[class*="he-r-"] .rx-br,.hent[class*="he-r-"] .rx-ta,.hent[class*="he-r-"] .rx-an,.hent[class*="he-r-"] .rx-tr,.hent[class*="he-r-"] .rx-ob,.hent[class*="he-r-"] .rx-bd span,.hent[class*="he-r-"] .rx-ba{animation-play-state:paused!important}
.he-r-filantes .rx-fi{opacity:1!important;transform:rotate(-30deg) translateX(-120px)!important}.he-r-jackpot .rx-ba{animation:none!important;transform:translateY(-1600px)!important}`;
const st=document.createElement("style");st.id="entetes-plus5";st.textContent=css;document.head.appendChild(st);

const vieux=window.entete;
window.entete=function(k,t,lang){
  if(!NOUV.some(e=>e[0]===k))return vieux(k,t,lang);
  const ph=x=>`<div class="he-ph" style="background-image:url('${P(x)}')"></div>`,N=(()=>{const vu=new Set([P(D.hero)]),L=(D.nails||[]).filter(x=>{const u=P(x);if(!u||/undefined|null/.test(u)||vu.has(u))return false;vu.add(u);return true});return L.length?L:[D.hero]})(),n=i=>N[i%N.length];
  const kick=`<div class="kick">${t.type} · ${D.ville}</div>`,note=D.nb?`<div class="note"><span class="et">${etoiles}</span>${D.note} · ${D.nb} ${t.avisG}</div>`:"";
  const btn=`<button class="he-btn" data-res>${t.creneau}${creneau(t)?`<small>${t.dispo} : ${creneau(t)}</small>`:""}</button>`;
  const nom=`<h1>${D.nom}</h1>`,txt=(h=true)=>`<div class="he-txt">${kick}${h?nom:""}${note}${btn}</div>`,txt2=`<div class="he-txt">${kick}${note}${btn}</div>`;
  const c=`hent he-r-${k}`;
  if(k==="flammes"){let f="";[4,15,27,39,50,61,73,85,96].forEach((x,i)=>{f+=`<span class="rx-fl" style="left:${x}%;height:${100+(i*37)%60}px;animation-delay:${-(i*.23)}s;animation-duration:${.8+(i%4)*.18}s"></span>`});
    let b="";for(let i=0;i<10;i++)b+=`<span class="rx-br" style="left:${8+i*9}%;animation-delay:${-(i*.41)}s"></span>`;
    return `<div class="${c}" data-s="accueil"><div class="rx-cad"><div class="rx-in">${ph(D.hero)}</div><div class="rx-feu">${f}${b}</div></div>${txt()}</div>`;}
  if(k==="filantes"){let s="";for(let i=0;i<40;i++)s+=`<span class="rx-pt" style="left:${(i*37)%100}%;top:${(i*53)%100}%;animation-delay:${-(i*.3)}s"></span>`;
    [[96,8,"0s"],[110,28,"1.6s"],[90,48,"3s"]].forEach(([x,y,d])=>{s+=`<span class="rx-fi" style="left:${x}%;top:${y}%;animation-delay:${d}"></span>`});
    return `<div class="${c}" data-s="accueil"><div class="rx-ciel">${s}</div><div class="rx-lune">${ph(D.hero)}</div>${txt()}</div>`;}
  if(k==="paillettes"){const col=["#fff6d0","#f3d98a","#ffffff","#ffc8e6","#d9e2ff"];let p="";for(let i=0;i<46;i++)p+=`<span class="rx-pa" style="left:${(i*29)%100}%;background:${col[i%5]};box-shadow:0 0 6px ${col[i%5]};animation-duration:${6+(i%5)}s;animation-delay:${-((i*.77)%9)}s"></span>`;
    return `<div class="${c}" data-s="accueil"><div class="rx-pl">${p}</div><div class="rx-cad"><div>${ph(D.hero)}</div></div>${txt()}</div>`;}
  if(k==="ruban"){const tx=`${D.nom} ✦ ${D.ville} ✦ Réservez en ligne ✦ `.repeat(3);
    return `<div class="${c}" data-s="accueil"><div class="rx-cad">${ph(D.hero)}<div class="rx-bd a"><span>${tx}</span><span>${tx}</span></div><div class="rx-bd b"><span>${tx}</span><span>${tx}</span></div></div>${txt()}</div>`;}
  if(k==="aura")return `<div class="${c}" data-s="accueil"><div class="rx-au"><span class="rx-ta" style="left:-60px;top:40px;background:#ff9fd2"></span><span class="rx-ta" style="right:-80px;top:180px;background:#b9a6ff;animation-delay:-3s"></span><span class="rx-ta" style="left:20%;top:420px;background:#ffd3a6;animation-delay:-6s"></span><span class="rx-ta" style="left:40%;top:-60px;background:var(--acc);opacity:.6;animation-delay:-2s"></span></div><div class="rx-cad">${ph(D.hero)}</div>${txt()}</div>`;
  if(k==="tele")return `<div class="${c}" data-s="accueil"><div class="rx-tv"><span class="rx-ant g"></span><span class="rx-ant d"></span><div class="rx-ecr">${ph(D.hero)}</div><span class="rx-onair">ON AIR</span><span class="rx-gr"></span><span class="rx-bt a"></span><span class="rx-bt b"></span></div>${txt()}</div>`;
  if(k==="jackpot"){const ims=[D.hero,n(0),n(1),n(2),n(3),n(4),n(5),n(0),D.hero,n(2)];const ba=`<div class="rx-ba">${ims.map(x=>`<div>${ph(x)}</div>`).join("")}</div>`;
    let am="";for(let i=0;i<9;i++)am+=`<span class="rx-am" style="left:${8+i*10.5}%;top:48px;animation-delay:${(i%2)*.45}s"></span>`;
    return `<div class="${c}" data-s="accueil"><div class="rx-ma"><div class="rx-tit">JACKPOT</div>${am}<div class="rx-rx"><div class="rx-ro">${ba}</div><div class="rx-ro">${ba}</div><div class="rx-ro">${ba}</div></div><span class="rx-lev"></span></div>${txt()}</div>`;}
  if(k==="carrousel"){const L=[D.hero,n(0),n(1),n(2),n(3),n(4)];const R=230;
    return `<div class="${c}" data-s="accueil"><div class="rx-sc"><div class="rx-an">${L.map((x,i)=>`<div class="rx-ca" style="transform:rotateY(${i*60}deg) translateZ(${R}px)">${ph(x)}</div>`).join("")}</div><span class="rx-sol"></span></div>${txt()}</div>`;}
  if(k==="orbite"){const ob=s=>`<div class="rx-tr">${s}</div>`;
    return `<div class="${c}" data-s="accueil"><div class="rx-or"><div class="rx-ce">${ph(D.hero)}</div>${ob('<span class="rx-ob">★</span>')}${ob('<span class="rx-ob" style="top:auto;bottom:-14px">♥</span>')}<div class="rx-tr" style="animation-duration:11s"><span class="rx-ob" style="top:50%;left:-10px;margin:-20px 0 0">✦</span></div></div>${txt()}</div>`;}
  if(k==="broadway"){let a="";const per=[];for(let i=0;i<12;i++)per.push([`left:${4+i*8.4}%;top:7px`]);for(let i=0;i<12;i++)per.push([`left:${96-i*8.4}%;bottom:7px`]);
    a=per.map(([s],i)=>`<span class="rx-amp" style="${s};animation-delay:${-(i%3)*.4}s"></span>`).join("");
    return `<div class="${c}" data-s="accueil"><div class="rx-en">${a}${nom}<small>Ce soir · ${D.ville}</small></div><div class="rx-cad">${ph(D.hero)}</div>${txt2}</div>`;}
  return "";
};
try{const k=enteteChoisie();if(NOUV.some(e=>e[0]===k)){const ok=window.__changeEntete&&window.__changeEntete();if(!ok)setTimeout(()=>window.__changeEntete&&window.__changeEntete(),600)}}catch(e){}
})();
