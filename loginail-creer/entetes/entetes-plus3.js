/* 16/11 (Marie) : série 3 — 6 en-têtes « encore plus waouh ». Maquette (projet non touché). */
(function(){
/* 16/11 : seules les en-têtes choisies par Marie restent proposées (les autres : poubelle-16-11/) */
const NOUV=[["vinyle", "Vinyle"], ["coulure", "Vernis qui coule"], ["diamant", "Diamant"]];
try{NOUV.forEach(e=>{if(!ENTETES.some(x=>x[0]===e[0]))ENTETES.push(e)})}catch(e){}
const OR="linear-gradient(135deg,#6f4a12 0%,#f8e7a6 18%,#b8862b 34%,#fff4c4 50%,#a8761f 66%,#f3d98a 82%,#6f4a12 100%)";
const capt=/[?&]capt/.test(location.search);
let css=`
.hent[class*="he-p-"]{justify-content:flex-start;padding:84px 0 44px}
.hent[class*="he-p-"] .he-ph{position:absolute;inset:0;background-size:cover;background-position:center}
@keyframes pMonte{from{opacity:0;transform:translateY(36px) scale(.94)}to{opacity:1;transform:none}}
@keyframes pBrille{0%{transform:translateX(-170%) rotate(20deg)}55%,100%{transform:translateX(330%) rotate(20deg)}}
.px-dore{background:${OR};background-size:200% 200%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent!important;color:transparent;animation:pDore 4s linear infinite;filter:drop-shadow(0 2px 0 rgba(90,60,10,.6)) drop-shadow(0 8px 14px rgba(0,0,0,.35))}
@keyframes pDore{to{background-position:200% 0}}
/* 1 Carte VIP */
.he-p-vip{perspective:1000px}
.he-p-vip .px-sur{font:600 10px Jost;letter-spacing:.4em;text-transform:uppercase;margin-bottom:14px;opacity:.85}
.he-p-vip .px-cv{position:relative;width:min(262px,70%);aspect-ratio:.63;flex:none;border-radius:20px;overflow:hidden;transform-style:preserve-3d;animation:pTourne 7s ease-in-out infinite;box-shadow:0 0 0 1.5px rgba(240,215,150,.9),0 34px 50px -18px rgba(0,0,0,.75);margin-bottom:22px;color:#F3DFA6;text-align:left}
@keyframes pTourne{0%,100%{transform:rotateY(-14deg) rotateX(4deg)}50%{transform:rotateY(14deg) rotateX(-3deg)}}
.he-p-vip .px-cv:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.15),transparent 30%,transparent 50%,rgba(10,8,6,.92) 82%)}
.he-p-vip .px-cv:before{content:"";position:absolute;z-index:3;top:-30%;left:0;width:34%;height:160%;background:linear-gradient(90deg,transparent,rgba(255,240,200,.45),transparent);animation:pBrille 3.8s ease-in-out infinite}
.he-p-vip .px-vip{position:absolute;z-index:2;top:16px;right:16px;font:700 15px Jost;letter-spacing:.3em}
.he-p-vip .px-puce{position:absolute;z-index:2;top:18px;left:16px;width:40px;height:30px;border-radius:6px;background:${OR};box-shadow:inset 0 0 0 1px rgba(90,60,10,.5)}
.he-p-vip .px-puce:after{content:"";position:absolute;inset:6px 5px;border-top:1px solid rgba(90,60,10,.6);border-bottom:1px solid rgba(90,60,10,.6)}
.he-p-vip .px-bas{position:absolute;z-index:2;left:16px;right:16px;bottom:16px}
.he-p-vip .px-bas h1{font-size:26px!important;margin:0 0 6px!important;line-height:1!important}
.he-p-vip .px-bas small{display:flex;justify-content:space-between;font:500 8.5px Jost;letter-spacing:.24em;text-transform:uppercase;color:#d8c48e}
/* 2 Tapis rouge */
.ecran .hent.he-p-paparazzi,.ecran:has(>.fond-site) .hent.he-p-paparazzi{background:radial-gradient(80% 50% at 50% 30%,#3a1216,#120708 75%)!important;color:#fff}
.he-p-paparazzi .px-sc{position:relative;width:calc(100% - 36px);max-width:520px;height:clamp(380px,56vh,500px);flex:none;border-radius:18px;overflow:hidden;box-shadow:0 0 0 3px #d9b86a,0 30px 50px -20px rgba(0,0,0,.8);animation:pMonte 1s both}
.he-p-paparazzi .px-fl{position:absolute;z-index:4;width:150px;height:150px;margin:-75px 0 0 -75px;border-radius:50%;background:radial-gradient(circle,#fff 0 6%,rgba(255,255,255,.85) 12%,rgba(255,255,255,0) 60%);opacity:0;animation:pFlash 2.6s infinite;pointer-events:none}
.he-p-paparazzi .px-fl:after{content:"";position:absolute;left:50%;top:50%;width:220px;height:3px;margin:-1.5px 0 0 -110px;background:linear-gradient(90deg,transparent,#fff,transparent)}
@keyframes pFlash{0%,86%,100%{opacity:0;transform:scale(.4)}88%{opacity:1;transform:scale(1)}94%{opacity:0;transform:scale(1.2)}}
.he-p-paparazzi .px-tapis{position:relative;width:100%;height:46px;flex:none;margin-top:-6px;background:linear-gradient(#b3121f,#7c0b14);clip-path:polygon(22% 0,78% 0,100% 100%,0 100%)}
.he-p-paparazzi .px-pot{position:absolute;bottom:2px;width:10px;height:56px;background:${OR};border-radius:6px 6px 2px 2px}
.he-p-paparazzi .px-pot.g{left:9%}.he-p-paparazzi .px-pot.d{right:9%}
.he-p-paparazzi .px-cor{position:absolute;bottom:28px;left:calc(9% + 8px);right:calc(9% + 8px);height:26px;border-bottom:7px solid #7a0d18;border-radius:0 0 50% 50%}
.he-p-paparazzi .px-pl{position:relative;z-index:2;margin:-4px 0 10px;padding:10px 22px 12px;background:linear-gradient(#2a2523,#151211);border:2px solid #d9b86a;border-radius:10px;box-shadow:0 14px 28px -14px rgba(0,0,0,.8);max-width:calc(100% - 40px)}
.he-p-paparazzi .px-pl h1{font-size:30px!important;margin:0!important;line-height:1.05!important}
.he-p-paparazzi .px-pl small{display:block;font:500 9px Jost;letter-spacing:.4em;text-transform:uppercase;color:#d9b86a;margin-top:6px}
.he-p-paparazzi .he-txt{color:var(--noir)}
/* 3 Vinyle */
.he-p-vinyle h1{margin:0 18px 4px!important;line-height:1!important}
.he-p-vinyle .px-face{font:600 10px Jost;letter-spacing:.4em;text-transform:uppercase;margin-bottom:18px;opacity:.85}
.he-p-vinyle .px-al{position:relative;width:min(250px,64%);aspect-ratio:1;flex:none;margin:0 26% 26px 0}
.he-p-vinyle .px-disq{position:absolute;top:4%;bottom:4%;left:30%;aspect-ratio:1;border-radius:50%;background:repeating-radial-gradient(circle,#141414 0 2px,#2c2c2c 2px 3px),#111;box-shadow:0 0 0 2px rgba(255,255,255,.22),0 0 26px 2px color-mix(in srgb,var(--acc) 45%,transparent),0 18px 30px -12px rgba(0,0,0,.7);animation:pSort 1.4s .4s cubic-bezier(.2,.8,.2,1) both,pTour 3.2s linear infinite}
.he-p-vinyle .px-disq:before{content:"";position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 20deg,transparent 0 20%,rgba(255,255,255,.32) 25%,transparent 30% 70%,rgba(255,255,255,.24) 75%,transparent 80%)}
.he-p-vinyle .px-disq:after{content:"";position:absolute;inset:34%;border-radius:50%;background:radial-gradient(circle,#111 0 5%,var(--acc) 6%);box-shadow:inset 0 0 0 3px rgba(255,255,255,.25)}
@keyframes pSort{from{translate:-30% 0}to{translate:0 0}}
@keyframes pTour{to{transform:rotate(360deg)}}
.he-p-vinyle .px-poch{position:absolute;inset:0;border-radius:6px;overflow:hidden;box-shadow:0 26px 40px -18px rgba(0,0,0,.7),inset 0 0 0 1px rgba(255,255,255,.2)}
.he-p-vinyle .px-poch:after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,rgba(255,255,255,.22),transparent 40%)}
.he-p-vinyle .px-st{position:absolute;z-index:3;right:-8%;top:-6%;width:70px;height:70px;border-radius:50%;background:var(--acc);color:#fff;display:grid;place-items:center;text-align:center;font:700 9.5px/1.15 Jost;letter-spacing:.06em;text-transform:uppercase;transform:rotate(14deg);box-shadow:0 8px 16px -6px rgba(0,0,0,.6)}
/* 4 Vernis qui coule */
.he-p-coulure .px-cl{position:relative;width:calc(100% - 40px);max-width:520px;height:clamp(390px,58vh,520px);flex:none;border-radius:28px;overflow:hidden;box-shadow:0 26px 46px -22px rgba(0,0,0,.6);animation:pMonte 1s both;margin-bottom:18px}
.he-p-coulure svg.px-drip{position:absolute;z-index:2;left:-2px;right:-2px;top:-2px;width:calc(100% + 4px);height:62%;overflow:visible}
.he-p-coulure .px-drip .v{fill:var(--acc)}
.he-p-coulure .px-drip .g{fill:none;stroke:rgba(255,255,255,.55);stroke-width:5;stroke-linecap:round}
.he-p-coulure .px-drip g{transform-origin:top;animation:pCoule 2.4s .3s cubic-bezier(.3,.6,.3,1) both}
@keyframes pCoule{from{transform:scaleY(.15)}to{transform:scaleY(1)}}
.he-p-coulure .px-goutte{position:absolute;z-index:2;width:16px;height:22px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:var(--acc);animation:pTombe 3.4s ease-in infinite;box-shadow:inset -3px -3px 0 rgba(0,0,0,.15),inset 3px 3px 0 rgba(255,255,255,.35)}
@keyframes pTombe{0%,40%{transform:translateY(0) scale(.2);opacity:0}48%{opacity:1;transform:translateY(0) scale(1)}100%{transform:translateY(240px) scale(1);opacity:0}}
.he-p-coulure .px-cl h1{position:absolute;z-index:3;left:18px;right:18px;top:20px;margin:0!important;line-height:1!important;color:#fff}
/* 5 Diamant */
.he-p-diamant .px-dm{position:relative;width:min(320px,86%);aspect-ratio:1/.95;flex:none;margin:6px 0 16px}
.he-p-diamant .px-ray{position:absolute;inset:-26%;border-radius:50%;background:repeating-conic-gradient(from 0deg,rgba(255,255,255,.55) 0 4deg,transparent 4deg 18deg);-webkit-mask:radial-gradient(circle,#000 20%,transparent 68%);mask:radial-gradient(circle,#000 20%,transparent 68%);animation:pTour 26s linear infinite;opacity:.8}
.he-p-diamant .px-taille{position:absolute;inset:0;clip-path:polygon(22% 0,78% 0,100% 30%,50% 100%,0 30%);filter:drop-shadow(0 20px 26px rgba(0,0,0,.5));animation:pMonte 1s both}
.he-p-diamant .px-taille svg{position:absolute;inset:0;width:100%;height:100%;z-index:2}
.he-p-diamant .px-taille svg path{fill:none;stroke:rgba(255,255,255,.75);stroke-width:1.6}
.he-p-diamant .px-taille svg .f1{fill:rgba(255,255,255,.18);stroke:none}.he-p-diamant .px-taille svg .f2{fill:rgba(255,255,255,.08);stroke:none}
.he-p-diamant .px-et{position:absolute;z-index:3;color:#fff;font-size:26px;text-shadow:0 0 12px #fff,0 0 22px var(--acc);animation:pScint 2.2s ease-in-out infinite}
@keyframes pScint{0%,100%{opacity:0;transform:scale(.3) rotate(0)}50%{opacity:1;transform:scale(1) rotate(45deg)}}
/* 6 Pluie d'or */
.he-p-pluieor .px-po{position:relative;width:min(300px,80%);aspect-ratio:3/4;flex:none;border-radius:999px 999px 26px 26px;padding:8px;background:${OR};box-shadow:0 30px 50px -20px rgba(0,0,0,.7);margin:8px 0 20px;animation:pMonte 1s both}
.he-p-pluieor .px-po>div{position:relative;width:100%;height:100%;border-radius:999px 999px 20px 20px;overflow:hidden}
.he-p-pluieor .px-ciel{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:1}
.he-p-pluieor .px-cf{position:absolute;top:-30px;width:10px;height:16px;background:${OR};border-radius:2px;animation:pChute linear infinite;opacity:.95;box-shadow:0 0 6px rgba(255,220,140,.6)}
.he-p-pluieor .px-cf.r{border-radius:50%;width:10px;height:10px}
@keyframes pChute{from{transform:translateY(0) rotate(0) rotateY(0)}to{transform:translateY(900px) rotate(540deg) rotateY(720deg)}}
.he-p-pluieor h1{position:relative;z-index:2}
.he-p-pluieor .he-txt{position:relative;z-index:2}
`;
if(capt)css+=`.hent[class*="he-p-"] .px-cv,.hent[class*="he-p-"] .px-sc,.hent[class*="he-p-"] .px-cl,.hent[class*="he-p-"] .px-taille,.hent[class*="he-p-"] .px-po,.hent[class*="he-p-"] .px-drip g{animation:none!important}
.he-p-vinyle .px-disq{animation:none!important;left:30%!important}.he-p-pluieor .px-cf{animation:none!important;top:var(--y)!important;transform:rotate(var(--r))}
.he-p-paparazzi .px-fl:nth-of-type(1),.he-p-paparazzi .px-fl:nth-of-type(3){animation:none!important;opacity:.95}.he-p-diamant .px-et{animation:none!important;opacity:1}.he-p-coulure .px-goutte{animation:none!important;opacity:1;transform:translateY(40px)}.he-p-vip .px-cv{animation:none!important;transform:rotateY(-10deg)}`;
const st=document.createElement("style");st.id="entetes-plus3";st.textContent=css;document.head.appendChild(st);

const vieux=window.entete;
window.entete=function(k,t,lang){
  if(!NOUV.some(e=>e[0]===k))return vieux(k,t,lang);
  const ph=x=>`<div class="he-ph" style="background-image:url('${P(x)}')"></div>`;
  const kick=`<div class="kick">${t.type} · ${D.ville}</div>`,note=D.nb?`<div class="note"><span class="et">${etoiles}</span>${D.note} · ${D.nb} ${t.avisG}</div>`:"";
  const btn=`<button class="he-btn" data-res>${t.creneau}${creneau(t)?`<small>${t.dispo} : ${creneau(t)}</small>`:""}</button>`;
  const nom=`<h1>${D.nom}</h1>`,nomOr=nom,txt=(h=true)=>`<div class="he-txt">${kick}${h?nom:""}${note}${btn}</div>`,txt2=`<div class="he-txt">${kick}${note}${btn}</div>`;
  const c=`hent he-p-${k}`;
  if(k==="vip")return `<div class="${c}" data-s="accueil"><div class="px-sur">Votre carte de membre</div><div class="px-cv">${ph(D.hero)}<span class="px-puce"></span><span class="px-vip">VIP</span><div class="px-bas">${nomOr}<small><span>Membre 2026</span><span>${D.ville}</span></small></div></div>${txt2}</div>`;
  if(k==="paparazzi"){const F=[[12,14,"0s"],[86,22,".7s"],[20,70,"1.3s"],[80,64,"1.9s"],[50,8,"2.3s"]];
    return `<div class="${c}" data-s="accueil"><div class="px-sc">${ph(D.hero)}${F.map(([x,y,d])=>`<span class="px-fl" style="left:${x}%;top:${y}%;animation-delay:${d}"></span>`).join("")}</div><div class="px-tapis"><span class="px-pot g"></span><span class="px-pot d"></span><span class="px-cor"></span></div><div class="px-pl">${nomOr}<small>★ ${D.ville} ★</small></div>${txt2}</div>`;}
  if(k==="vinyle")return `<div class="${c}" data-s="accueil">${nom}<div class="px-face">Face A · ${D.ville}</div><div class="px-al"><div class="px-disq"></div><div class="px-poch">${ph(D.hero)}</div><span class="px-st">Nouveau<br>set</span></div>${txt2}</div>`;
  if(k==="coulure")return `<div class="${c}" data-s="accueil"><div class="px-cl">${ph(D.hero)}<svg class="px-drip" viewBox="0 0 400 300" preserveAspectRatio="none"><g><path class="v" d="M0 0 H400 V58 C392 58 388 70 388 96 C388 120 372 120 372 96 V70 C372 60 360 58 352 62 C340 68 344 150 330 150 C316 150 320 72 306 66 C294 62 290 84 286 100 C282 116 268 114 268 98 V74 C268 64 254 60 246 66 C236 74 240 200 224 200 C208 200 214 80 200 72 C190 66 182 76 180 90 C178 104 164 104 164 90 V70 C164 60 150 58 142 64 C130 72 136 132 120 132 C104 132 110 70 96 64 C86 60 80 70 78 84 C76 98 62 98 62 84 V70 C62 58 48 56 40 62 C28 72 34 178 18 178 C2 178 8 70 0 64 Z"/><path class="g" d="M228 120 V176 M34 110 V150 M338 96 V128"/></g></svg>
<span class="px-goutte" style="left:calc(56% - 8px);top:50%"></span><span class="px-goutte" style="left:calc(4.5% - 8px);top:44%;animation-delay:1.6s"></span></div>${txt()}</div>`;
  if(k==="diamant")return `<div class="${c}" data-s="accueil"><div class="px-dm"><div class="px-ray"></div><div class="px-taille">${ph(D.hero)}<svg viewBox="0 0 100 100" preserveAspectRatio="none"><path class="f1" d="M22 0 L50 30 L0 30 Z"/><path class="f2" d="M78 0 L100 30 L50 30 Z"/><path d="M0 30 H100 M22 0 L36 30 L50 0 L64 30 L78 0 M0 30 L50 100 M36 30 L50 100 M64 30 L50 100 M100 30 L50 100"/></svg></div>
<span class="px-et" style="left:6%;top:18%">✦</span><span class="px-et" style="right:4%;top:6%;animation-delay:.7s">✦</span><span class="px-et" style="right:16%;top:58%;animation-delay:1.3s;font-size:18px">✦</span><span class="px-et" style="left:20%;top:62%;animation-delay:1.8s;font-size:16px">✦</span></div>${txt()}</div>`;
  if(k==="pluieor"){let cf="";for(let i=0;i<34;i++){const x=(i*37)%100,d=-(i*0.53)%7,du=5+(i%5),y=(i*29)%95,r=(i*47)%360;cf+=`<span class="px-cf${i%3===0?" r":""}" style="left:${x}%;animation-duration:${du}s;animation-delay:${d}s;--y:${y}%;--r:${r}deg"></span>`}
    return `<div class="${c}" data-s="accueil"><div class="px-ciel">${cf}</div><div class="px-po"><div>${ph(D.hero)}</div></div><div class="he-txt">${kick}${nomOr}${note}${btn}</div></div>`;}
  return "";
};
try{const k=enteteChoisie();if(NOUV.some(e=>e[0]===k)){const ok=window.__changeEntete&&window.__changeEntete();if(!ok)setTimeout(()=>window.__changeEntete&&window.__changeEntete(),600)}}catch(e){}
})();
