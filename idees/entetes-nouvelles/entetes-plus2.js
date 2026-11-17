/* 16/11 (Marie) : série 2 — 6 en-têtes « bijou / tatouage / luxe » inspirées de ses nouvelles photos. Maquette (projet non touché). */
(function(){
/* 16/11 : seules les en-têtes choisies par Marie restent proposées (les autres : poubelle-16-11/) */
const NOUV=[["bijou", "Bijou serti"]];
try{NOUV.forEach(e=>{if(!ENTETES.some(x=>x[0]===e[0]))ENTETES.push(e)})}catch(e){}
const OR="linear-gradient(135deg,#6f4a12 0%,#f8e7a6 18%,#b8862b 34%,#fff4c4 50%,#a8761f 66%,#f3d98a 82%,#6f4a12 100%)";
let css=`
.hent[class*="he-m-"]{justify-content:flex-start;padding:84px 0 44px}
.hent[class*="he-m-"] .he-ph{position:absolute;inset:0;background-size:cover;background-position:center}
@keyframes mBrille{0%{transform:translateX(-170%) rotate(20deg)}55%,100%{transform:translateX(320%) rotate(20deg)}}
@keyframes mMonte{from{opacity:0;transform:translateY(36px) scale(.94)}to{opacity:1;transform:none}}
.mx-or{background:${OR}}
/* 1 Bijou serti */
.he-m-bijou .mx-bj{position:relative;width:min(280px,74%);aspect-ratio:3/4;flex:none;border-radius:50%;padding:16px;margin:8px 0 22px;background:${OR};box-shadow:0 0 0 3px #5a3a0c,0 0 0 9px #e9cf86,0 0 0 11px #6f4a12,0 30px 50px -18px rgba(0,0,0,.7);animation:mMonte 1s both}
.he-m-bijou .mx-bj:before{content:"";position:absolute;inset:-22px;border-radius:50%;background:radial-gradient(circle,#fff6d0 0 3.5px,#c99a3a 4.5px,transparent 6px) 0 0/22px 22px;-webkit-mask:radial-gradient(closest-side,transparent calc(100% - 13px),#000 calc(100% - 12px));mask:radial-gradient(closest-side,transparent calc(100% - 13px),#000 calc(100% - 12px));opacity:.95}
.he-m-bijou .mx-pi{position:relative;width:100%;height:100%;border-radius:50%;overflow:hidden;box-shadow:inset 0 0 0 3px rgba(80,50,10,.7),inset 0 10px 30px rgba(0,0,0,.45)}
.he-m-bijou .mx-pi:after{content:"";position:absolute;top:7%;left:20%;width:34%;height:20%;border-radius:50%;background:radial-gradient(rgba(255,255,255,.75),rgba(255,255,255,0) 70%);transform:rotate(-24deg)}
.he-m-bijou .mx-pi:before{content:"";position:absolute;z-index:2;top:-20%;left:0;width:30%;height:140%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent);animation:mBrille 4.2s ease-in-out infinite}
.he-m-bijou .mx-gr{position:absolute;width:30px;height:42px;background:${OR};border-radius:50% 50% 45% 45%/60% 60% 40% 40%;box-shadow:0 4px 8px -2px rgba(0,0,0,.5)}
.he-m-bijou .mx-gr.h{top:-14px;left:50%;margin-left:-15px}.he-m-bijou .mx-gr.b{bottom:-14px;left:50%;margin-left:-15px;transform:rotate(180deg)}
.he-m-bijou .mx-gr.g{left:-12px;top:50%;margin-top:-21px;transform:rotate(-90deg)}.he-m-bijou .mx-gr.d{right:-12px;top:50%;margin-top:-21px;transform:rotate(90deg)}
/* 2 Roman */
.he-m-livre{perspective:1200px}
.he-m-livre .mx-lv{position:relative;width:min(300px,80%);aspect-ratio:2/3;flex:none;border-radius:4px 14px 14px 4px;padding:22px 20px 18px 30px;color:#E9CC86;text-align:center;
 background:radial-gradient(120% 80% at 30% 20%,color-mix(in srgb,var(--acc) 55%,#2a0d1c),color-mix(in srgb,var(--acc) 30%,#12060c));box-shadow:inset 10px 0 18px -8px rgba(0,0,0,.7),inset -2px 0 0 rgba(255,255,255,.08),0 34px 50px -20px rgba(0,0,0,.75);
 transform-origin:left center;animation:mOuvre 1.4s cubic-bezier(.2,.8,.2,1) both;margin-bottom:18px;display:flex;flex-direction:column;align-items:center}
@keyframes mOuvre{from{transform:rotateY(-38deg);opacity:0}to{transform:none;opacity:1}}
.he-m-livre .mx-lv:before{content:"";position:absolute;inset:10px 10px 10px 18px;border:1.5px solid #D7B567;border-radius:3px 10px 10px 3px;box-shadow:inset 0 0 0 4px transparent,inset 0 0 0 5px rgba(215,181,103,.55);pointer-events:none}
.he-m-livre .mx-co{position:absolute;color:#E9CC86;font-size:16px;line-height:1}
.he-m-livre .mx-co.a{top:16px;left:24px}.he-m-livre .mx-co.b{top:16px;right:16px}.he-m-livre .mx-co.c{bottom:14px;left:24px}.he-m-livre .mx-co.d{bottom:14px;right:16px}
.he-m-livre .mx-lune{font-size:22px;margin:6px 0 4px;letter-spacing:.4em}
.he-m-livre .mx-fe{position:relative;width:74%;flex:1;min-height:0;border-radius:999px 999px 8px 8px;overflow:hidden;box-shadow:0 0 0 2px #D7B567,0 0 0 6px rgba(0,0,0,.25),0 0 0 7px #D7B567}
.he-m-livre h1{color:#EDD08F!important;-webkit-text-fill-color:#EDD08F!important;font-size:30px!important;margin:12px 0 2px!important;line-height:1!important;text-shadow:0 1px 0 #7a5418,0 6px 18px rgba(0,0,0,.5)}
.he-m-livre .mx-rm{font:500 9px Jost;letter-spacing:.5em;text-transform:uppercase;opacity:.85}
/* 3 Flash tatouage */
.he-m-flash .mx-fl{position:relative;width:calc(100% - 28px);max-width:520px;flex:none;background:#F3EADB;border-radius:6px;padding:16px 14px 18px;box-shadow:0 24px 44px -24px rgba(0,0,0,.6);color:#1b1715;margin-bottom:16px;
 background-image:radial-gradient(rgba(120,90,50,.08) 1px,transparent 1.5px);background-size:7px 7px}
.he-m-flash .mx-tt{font:600 10px Jost;letter-spacing:.42em;text-transform:uppercase;display:flex;justify-content:space-between;border-bottom:1.5px solid #1b1715;padding-bottom:8px;margin-bottom:12px}
.he-m-flash .mx-zone{position:relative;height:380px}
.he-m-flash .mx-cad{position:absolute;left:18%;right:18%;top:10px;bottom:56px;border:2.5px solid #1b1715;border-radius:120px 120px 10px 10px;overflow:hidden;background:#fff}
.he-m-flash svg.mx-dess{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.he-m-flash .mx-dess path,.he-m-flash .mx-dess circle{fill:none;stroke:#1b1715;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:900;stroke-dashoffset:900;animation:mTrace 2.6s .3s ease-out forwards}
.he-m-flash .mx-dess .r{stroke:color-mix(in srgb,var(--acc) 80%,#c0392b);animation-delay:1.1s}
@keyframes mTrace{to{stroke-dashoffset:0}}
.he-m-flash .mx-ban{position:absolute;left:0;right:0;bottom:6px;height:70px;display:grid;place-items:center}
.he-m-flash .mx-ban svg{position:absolute;inset:0;width:100%;height:100%}
.he-m-flash .mx-ban svg path{fill:#F3EADB;stroke:#1b1715;stroke-width:2.2;stroke-linejoin:round}
.he-m-flash .mx-ban svg .ombre{fill:color-mix(in srgb,var(--acc) 75%,#7a1020)}
.he-m-flash .mx-ban h1{position:relative;font-size:28px!important;margin:-6px 0 0!important;line-height:1!important;color:#1b1715}
/* 4 Musée */
.ecran .hent.he-m-musee,.ecran:has(>.fond-site) .hent.he-m-musee{background:radial-gradient(60% 46% at 50% 36%,rgba(255,240,205,.55),transparent 70%),linear-gradient(color-mix(in srgb,var(--acc) 40%,#1c1716),color-mix(in srgb,var(--acc) 20%,#0d0b0a))!important;color:#fff}
.he-m-musee .mx-spot{position:absolute;top:0;left:50%;width:300px;height:520px;margin-left:-150px;background:linear-gradient(rgba(255,244,214,.28),rgba(255,244,214,0) 80%);clip-path:polygon(44% 0,56% 0,100% 100%,0 100%);animation:mAllume 1.6s both;pointer-events:none}
@keyframes mAllume{0%{opacity:0}30%{opacity:.8}36%{opacity:.2}50%,100%{opacity:1}}
.he-m-musee .mx-cadre{position:relative;width:min(270px,72%);aspect-ratio:4/5;flex:none;padding:22px;margin:30px 0 22px;background:${OR};box-shadow:inset 0 0 0 3px #6f4a12,inset 0 0 0 8px #e7c97c,inset 0 0 0 10px #6f4a12,0 30px 50px -18px rgba(0,0,0,.8);animation:mMonte 1.1s .3s both}
.he-m-musee .mx-cadre:before{content:"";position:absolute;inset:12px;border:3px dotted rgba(111,74,18,.75);pointer-events:none}
.he-m-musee .mx-pass{position:relative;width:100%;height:100%;background:#F6F0E4;padding:12px;box-shadow:inset 0 3px 8px rgba(0,0,0,.35)}
.he-m-musee .mx-pass>div{position:relative;width:100%;height:100%;overflow:hidden}
.he-m-musee .mx-cart{background:#F6F0E4;color:#1E1C1B;padding:10px 16px 12px;border-radius:2px;box-shadow:0 12px 24px -12px rgba(0,0,0,.7);text-align:left;min-width:220px;max-width:calc(100% - 60px);margin-bottom:6px;animation:mMonte 1s .7s both}
.he-m-musee .mx-cart h1{font-size:24px!important;margin:0 0 4px!important;line-height:1.05!important;color:#1E1C1B!important;-webkit-text-fill-color:#1E1C1B!important}
.he-m-musee .mx-cart small{display:block;font:400 11px/1.4 Jost;color:#5b534c}
.he-m-musee .he-txt{margin-top:18px}
/* 5 Loupe */
.he-m-loupe .mx-lp{position:relative;width:calc(100% - 32px);max-width:520px;height:clamp(380px,56vh,500px);flex:none;border-radius:26px;overflow:hidden;box-shadow:0 26px 46px -24px rgba(0,0,0,.6);animation:mMonte 1s both;margin-bottom:18px}
.he-m-loupe .mx-lens{position:absolute;z-index:3;width:150px;height:150px;border-radius:50%;left:0;top:0;background-repeat:no-repeat;box-shadow:0 0 0 7px #1b1715,0 0 0 10px #d9b86a,0 18px 30px -8px rgba(0,0,0,.6),inset 0 0 22px rgba(255,255,255,.35);will-change:transform}
.he-m-loupe .mx-lens:after{content:"";position:absolute;width:16px;height:74px;right:-34px;bottom:-62px;border-radius:8px;background:linear-gradient(90deg,#1b1715,#4a3f36,#1b1715);transform:rotate(-45deg);box-shadow:0 0 0 2px #d9b86a}
.he-m-loupe .mx-lens:before{content:"";position:absolute;top:16%;left:20%;width:30%;height:16%;border-radius:50%;background:rgba(255,255,255,.4);transform:rotate(-30deg)}
.he-m-loupe .mx-tag{position:absolute;z-index:4;left:14px;top:14px;background:var(--papier,#fff);color:var(--noir);font:600 10px Jost;letter-spacing:.24em;text-transform:uppercase;padding:7px 12px;border-radius:99px}
/* 6 Écrin */
.he-m-ecrin{perspective:900px}
.he-m-ecrin .mx-ec{position:relative;width:min(300px,80%);flex:none;margin:20px 0 20px;animation:mMonte 1s both}
.he-m-ecrin .mx-cou{position:relative;height:120px;border-radius:22px 22px 6px 6px;background:radial-gradient(120% 120% at 30% 0,color-mix(in srgb,var(--acc) 70%,#fff 8%),color-mix(in srgb,var(--acc) 55%,#000));transform-origin:bottom center;animation:mCouv 1.6s .2s cubic-bezier(.2,.8,.2,1) both;display:grid;place-items:center;box-shadow:inset 0 -10px 18px rgba(0,0,0,.35),inset 0 2px 0 rgba(255,255,255,.2)}
@keyframes mCouv{from{transform:rotateX(-90deg)}to{transform:rotateX(-18deg)}}
.he-m-ecrin .mx-cou:after{content:"";position:absolute;inset:10px;border-radius:16px 16px 4px 4px;box-shadow:inset 0 0 0 1.5px rgba(233,204,134,.75)}
.he-m-ecrin .mx-cou h1{font-size:28px!important;margin:0!important;line-height:1!important;color:#EDD08F!important;-webkit-text-fill-color:#EDD08F!important;text-shadow:0 1px 0 #6f4a12,0 4px 14px rgba(0,0,0,.5);padding:0 18px}
.he-m-ecrin .mx-boi{position:relative;height:330px;margin-top:-4px;border-radius:6px 6px 26px 26px;padding:16px;background:radial-gradient(120% 120% at 30% 0,color-mix(in srgb,var(--acc) 70%,#fff 8%),color-mix(in srgb,var(--acc) 50%,#000));box-shadow:inset 0 10px 18px rgba(0,0,0,.4),0 34px 50px -22px rgba(0,0,0,.75)}
.he-m-ecrin .mx-sat{position:relative;height:100%;border-radius:14px;padding:12px;background:linear-gradient(135deg,#f7efe6,#e4d4c4 40%,#fbf6f0 55%,#dccab8);box-shadow:inset 0 6px 14px rgba(0,0,0,.25)}
.he-m-ecrin .mx-sat>div{position:relative;height:100%;border-radius:10px;overflow:hidden;box-shadow:0 0 0 3px #d9b86a,0 10px 20px -8px rgba(0,0,0,.5)}
.he-m-ecrin .mx-fer{position:absolute;z-index:3;left:50%;top:-12px;width:34px;height:20px;margin-left:-17px;border-radius:4px;background:${OR};box-shadow:0 3px 6px rgba(0,0,0,.4)}
`;
try{if(new URLSearchParams(location.search).has("capt"))css+=`.hent[class*="he-m-"] *{animation-delay:0s!important;animation-duration:.01s!important}.he-m-bijou .mx-pi:before{animation:none!important}`}catch(e){}
const st=document.createElement("style");st.id="entetes-plus2";st.textContent=css;document.head.appendChild(st);

const vieux=window.entete;
window.entete=function(k,t,lang){
  if(!NOUV.some(e=>e[0]===k))return vieux(k,t,lang);
  const ph=x=>`<div class="he-ph" style="background-image:url('${P(x)}')"></div>`;
  const kick=`<div class="kick">${t.type} · ${D.ville}</div>`,note=D.nb?`<div class="note"><span class="et">${etoiles}</span>${D.note} · ${D.nb} ${t.avisG}</div>`:"";
  const btn=`<button class="he-btn" data-res>${t.creneau}${creneau(t)?`<small>${t.dispo} : ${creneau(t)}</small>`:""}</button>`;
  const nom=`<h1>${D.nom}</h1>`,txt=(h=true)=>`<div class="he-txt">${kick}${h?nom:""}${note}${btn}</div>`;
  const c=`hent he-m-${k}`;
  if(k==="bijou")return `<div class="${c}" data-s="accueil"><div class="mx-bj"><div class="mx-pi">${ph(D.hero)}</div><span class="mx-gr h"></span><span class="mx-gr b"></span><span class="mx-gr g"></span><span class="mx-gr d"></span></div>${txt()}</div>`;
  if(k==="livre")return `<div class="${c}" data-s="accueil"><div class="mx-lv"><span class="mx-co a">✦</span><span class="mx-co b">✦</span><span class="mx-co c">✦</span><span class="mx-co d">✦</span><div class="mx-lune">☾ ✦ ☽</div><div class="mx-fe">${ph(D.hero)}</div>${nom}<div class="mx-rm">— ${D.ville} —</div></div><div class="he-txt">${kick}${note}${btn}</div></div>`;
  if(k==="flash")return `<div class="${c}" data-s="accueil"><div class="mx-fl"><div class="mx-tt"><span>Flash</span><span>${D.ville}</span><span>N° 01</span></div><div class="mx-zone"><div class="mx-cad">${ph(D.hero)}</div>
<svg class="mx-dess" viewBox="0 0 360 380" preserveAspectRatio="none"><path d="M40 330 C 10 290 60 260 40 220 C 20 180 70 160 50 120 C 36 92 54 64 78 70"/><path d="M78 70 l10 -6 m-10 6 l6 9"/><path class="r" d="M300 52 c-14 -18 -38 -10 -36 10 c-20 -6 -30 20 -12 30 c-14 14 2 36 20 26 c4 20 32 20 34 0 c18 8 32 -14 18 -28 c16 -10 6 -36 -14 -30 c2 -20 -22 -26 -30 -8z"/><circle class="r" cx="292" cy="80" r="7"/><path d="M314 220 l0 26 m-13 -13 l26 0"/><path d="M28 30 l0 20 m-10 -10 l20 0"/><path d="M330 300 l0 16 m-8 -8 l16 0"/></svg>
<div class="mx-ban"><svg viewBox="0 0 360 70" preserveAspectRatio="none"><path class="ombre" d="M6 30 L40 22 L34 46 L6 54 L18 42 Z"/><path class="ombre" d="M354 30 L320 22 L326 46 L354 54 L342 42 Z"/><path d="M36 14 Q180 -4 324 14 L324 52 Q180 34 36 52 Z"/></svg>${nom}</div></div></div>${`<div class="he-txt">${kick}${note}${btn}</div>`}</div>`;
  if(k==="musee")return `<div class="${c}" data-s="accueil"><div class="mx-spot"></div><div class="mx-cadre"><div class="mx-pass"><div>${ph(D.hero)}</div></div></div><div class="mx-cart">${nom}<small>${D.ville}, 2026<br>Gel, strass et feuille d'or sur ongles</small></div><div class="he-txt">${note}${btn}</div></div>`;
  if(k==="loupe")return `<div class="${c}" data-s="accueil"><div class="mx-lp" data-src="${P(D.hero)}">${ph(D.hero)}<div class="mx-tag">Regardez de près</div><div class="mx-lens" style="background-image:url('${P(D.hero)}')"></div></div>${txt()}</div>`;
  if(k==="ecrin")return `<div class="${c}" data-s="accueil"><div class="mx-ec"><div class="mx-cou">${nom}</div><span class="mx-fer"></span><div class="mx-boi"><div class="mx-sat"><div>${ph(D.hero)}</div></div></div></div><div class="he-txt">${kick}${note}${btn}</div></div>`;
  return "";
};
/* Loupe : elle se promène sur les ongles et grossit 2,4 fois ce qu'elle survole */
const Z=2.4,R=75,capt=/[?&]capt/.test(location.search);
function loupe(ts){document.querySelectorAll(".he-m-loupe .mx-lp").forEach(b=>{const l=b.querySelector(".mx-lens");if(!l)return;const W=b.clientWidth,H=b.clientHeight;
  const t=capt?2.2:ts/1000,x=W*(.5+.3*Math.sin(t*.7)),y=H*(.45+.22*Math.sin(t*1.1+1));
  /* l'image d'origine est en « cover » : on reproduit le même cadrage, agrandi */
  const im=b._im||(b._im=Object.assign(new Image(),{src:b.dataset.src}));const iw=im.naturalWidth||3,ih=im.naturalHeight||4;const s=Math.max(W/iw,H/ih),dw=iw*s,dh=ih*s,ox=(W-dw)/2,oy=(H-dh)/2;
  l.style.transform=`translate(${x-R}px,${y-R}px)`;l.style.backgroundSize=`${dw*Z}px ${dh*Z}px`;l.style.backgroundPosition=`${-(x-ox)*Z+R}px ${-(y-oy)*Z+R}px`;});
  requestAnimationFrame(loupe)}
requestAnimationFrame(loupe);
try{const k=enteteChoisie();if(NOUV.some(e=>e[0]===k)){const ok=window.__changeEntete&&window.__changeEntete();if(!ok)setTimeout(()=>window.__changeEntete&&window.__changeEntete(),600)}}catch(e){}
})();
