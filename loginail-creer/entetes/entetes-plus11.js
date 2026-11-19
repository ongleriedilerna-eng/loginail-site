/* 19/11 (Marie, D36) — série 11 : les 23 en-têtes choisies sur les planches du 18/11
   (site/idees/entetes-carre.html, entetes-30.html, entetes-24.html).
   Règle de Marie : on ne casse JAMAIS le rectangle (kick, nom sur UNE ligne, avis, « Réserver un créneau ») :
   l'effet se passe sur la photo encadrée, au-dessus. Les charms utilisés sont CEUX de la prothésiste. */
(function(){
const NOUV=[["xbokeh","Bokeh"],["xscint","Scintillement"],["xsavon","Bulles de savon"],["xgum","Bubble-gum"],["xsusp","Charms suspendus"],
 ["xbracelet","Bracelet de charms"],["xperles","Rideau de perles"],["xguirlande","Guirlande lumineuse"],["xmusique","Musique"],["xstrass","Cadre en strass"],
 ["xloge","Miroir de loge"],["xperlecoeur","Perles et charms"],["xchrome","Cœurs chromés"],["xgeant","Charm géant"],["xguirch","Guirlande de charms"],
 ["xbulch","Charms dans des bulles"],["xcollier","Collier de perles"],["xlustre","Lustre"],["xlecteur","Lecteur de musique"],["xbonbons","Pluie de bonbons"],
 ["xtap","Tap ♡"],["xreac","Réactions"],["xnuancier","Nuancier de vernis"]];
try{NOUV.forEach(e=>{if(!ENTETES.some(x=>x[0]===e[0]))ENTETES.push(e)})}catch(e){}

/* petit hasard toujours pareil (le même site s'affiche pareil à chaque visite) */
let g=11;const r=()=>{g=(g*9301+49297)%233280;return g/233280},rx=(a,b)=>a+r()*(b-a),R=(n,f)=>Array.from({length:n},(_,i)=>f(i)).join("");
const CHB="../loginail-site/charms/";
const DEF=["coeurchrome","etoilechrome","coeurcristal","coeurgeleerose","collierperlescoeur","coeurchromemou"];
/* les charms de la prothésiste (ceux posés sur son site), sinon des charms neutres qui vont avec tout */
const ses=()=>{let l=[];try{l=(window.__pzEtat?window.__pzEtat().charms:(typeof BR!=="undefined"&&BR&&BR.charms))||[]}catch(e){}
  if(!l.length)try{l=(new URLSearchParams(location.search).get("charm")||"").split(",").filter(Boolean)}catch(e){}
  if(!l.length)l=DEF;return l};
const src=k=>{try{if(typeof CHI!=="undefined"&&CHI[k])return CHI[k]}catch(e){}return CHB+k+".webp"};   /* 19/11 nuit : .webp (les .png ne sont pas en ligne) */
const ch=(i)=>{const l=ses();return src(l[i%l.length])};

const css=`
/* base commune : la photo encadrée (comme « Photo encadrée ») */
.hent[class*="he-w-x"] .wx-cad{overflow:hidden}
.hent[class*="he-w-x"] .x-fx{position:absolute;inset:0;z-index:3;pointer-events:none;overflow:hidden}
.hent[class*="he-w-x"] .x-fx>*{position:absolute;display:block}
@keyframes xTombe{from{transform:translateY(-60px) rotate(0)}to{transform:translateY(560px) rotate(360deg)}}
@keyframes xMonte{from{transform:translateY(0);opacity:0}10%{opacity:1}to{transform:translateY(-520px) translateX(20px);opacity:0}}
@keyframes xBal{0%,100%{rotate:-5deg}50%{rotate:5deg}}
@keyframes xBalp{0%,100%{rotate:-2deg}50%{rotate:2deg}}
@keyframes xBril{0%,100%{opacity:0;scale:.2}50%{opacity:1;scale:1}}
@keyframes xBok{from{transform:translate(0,0);opacity:.3}to{transform:translate(18px,-30px);opacity:1}}
@keyframes xAmp{from{opacity:.35}to{opacity:1}}
@keyframes xRef{from{background-position:150% 0}to{background-position:-60% 0}}
@keyframes xTourne{to{rotate:360deg}}
@keyframes xEq{from{height:3px}to{height:16px}}
/* charm qui pend */
.x-susp{position:absolute;top:0;transform-origin:50% 0;z-index:5;animation:xBal ease-in-out infinite;pointer-events:none}
.x-susp .x-f{width:1.5px;margin:0 auto;background:linear-gradient(#fff,rgba(255,255,255,.7))}
.x-susp img{display:block;margin:-2px auto 0;filter:drop-shadow(0 4px 6px rgba(0,0,0,.3))}
/* 1 Bokeh */
.x-bk{border-radius:50%;background:radial-gradient(circle,rgba(255,230,240,.9),rgba(255,160,200,.35) 60%,transparent 70%);filter:blur(2px);mix-blend-mode:screen;animation:xBok ease-in-out infinite alternate}
/* 2 Scintillement */
.x-sc{background:#fff;clip-path:polygon(50% 0,58% 42%,100% 50%,58% 58%,50% 100%,42% 58%,0 50%,42% 42%);filter:drop-shadow(0 0 6px #fff);animation:xBril ease-in-out infinite}
/* 3 Bulles de savon */
.x-sav{bottom:20px;border-radius:50%;background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.9) 0 8%,transparent 10%),radial-gradient(circle,transparent 60%,rgba(255,170,220,.5) 70%,rgba(170,220,255,.6) 85%,rgba(255,255,255,.8) 100%);animation:xMonte linear infinite}
/* 4 Bubble-gum */
.x-gb{left:50%;top:38%;width:44%;aspect-ratio:1;margin-left:-22%;border-radius:50%;background:radial-gradient(circle at 32% 28%,rgba(255,255,255,.85) 0 7%,transparent 9%),radial-gradient(circle,#ffb3cf 0,#ff7aa8 70%,#f45c92 100%);opacity:.93;animation:xGum 3.4s ease-in infinite}
@keyframes xGum{0%{scale:0}80%{scale:1.15;opacity:.93}82%{scale:1.3;opacity:0}100%{scale:0;opacity:0}}
.x-pop{left:50%;top:calc(38% + 22% * .75);width:12px;height:12px;margin:-6px;border-radius:50%;box-shadow:0 -80px 0 -1px #ff7aa8,56px -56px 0 -2px #ff7aa8,80px 0 0 -1px #ffb3cf,56px 56px 0 -2px #ff7aa8,0 80px 0 -1px #ffb3cf,-56px 56px 0 -2px #ff7aa8,-80px 0 0 -1px #ff7aa8,-56px -56px 0 -2px #ffb3cf;opacity:0;animation:xPop 3.4s infinite}
@keyframes xPop{0%,81%{opacity:0;scale:.4}83%{opacity:1;scale:1}95%,100%{opacity:0;scale:1.5}}
/* 6 Bracelet / 11 guirlande de charms : la chaîne */
.x-chaine{left:-10px;right:-10px;top:0;height:90px;z-index:5;border-bottom:3px dotted #f1d48a;border-radius:0 0 50% 50%;filter:drop-shadow(0 1px 1px rgba(0,0,0,.4))}
.x-chaine.b{border-bottom:2px solid rgba(255,255,255,.9)}
/* 7 Rideau de perles */
.x-pl{top:-10px;width:10px;background:radial-gradient(circle,#fff 0 3px,#f4dfe6 4px,transparent 5px) 0 0/10px 13px repeat-y;filter:drop-shadow(0 1px 1px rgba(0,0,0,.25));transform-origin:50% 0;animation:xBalp ease-in-out infinite}
/* 8 Guirlande lumineuse */
.x-fil{left:-20px;right:-20px;top:-10px;height:96px;border-bottom:1.5px solid #2c1b1f;border-radius:0 0 50% 50%}
.x-amp{width:13px;height:17px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:#ffe9a8;box-shadow:0 0 10px 4px rgba(255,220,130,.8);animation:xAmp 1.6s ease-in-out infinite alternate}
/* 9 Musique */
.x-stk{left:50%;top:9%;translate:-50% 0;z-index:5;background:#fff;border-radius:14px;padding:10px 14px 10px 10px;display:flex;gap:10px;align-items:center;box-shadow:0 8px 20px rgba(0,0,0,.25);rotate:-4deg;animation:xBalp 3s ease-in-out infinite;display:flex!important;color:#1e1c1b;font:400 13px/1.3 Jost,sans-serif;text-align:left;white-space:nowrap}
.x-stk img,.x-stk .x-pho{width:48px;height:48px;border-radius:50%;background-size:cover;background-position:center;animation:xTourne 6s linear infinite}
.x-eq{display:flex;gap:2px;align-items:flex-end;height:16px;margin-left:4px}
.x-eq i{width:3px;background:#ff5d8f;border-radius:2px;animation:xEq .8s ease-in-out infinite alternate}
.x-par{left:0;right:0;top:calc(9% + 84px);text-align:center;font:600 16px Jost,sans-serif;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.55);height:24px;overflow:hidden;z-index:5}
.x-par div{animation:xPar 8s steps(1) infinite}
.x-par p{height:24px;margin:0}
@keyframes xPar{0%{transform:translateY(0)}25%{transform:translateY(-24px)}50%{transform:translateY(-48px)}75%{transform:translateY(-72px)}}
/* 10 Cadre en strass */
.x-str{inset:14px;border-radius:20px;border:7px dotted #fff;filter:drop-shadow(0 0 2px #fff) drop-shadow(0 0 5px rgba(255,190,215,.9))}
.x-str2{inset:26px;border-radius:14px;border:4px dotted #ffd6e3;filter:drop-shadow(0 0 3px #fff)}
.x-str::after{content:"";position:absolute;inset:-7px;background:linear-gradient(110deg,transparent 40%,rgba(255,255,255,.9) 50%,transparent 60%);background-size:300% 100%;animation:xRef 2.4s linear infinite;mix-blend-mode:overlay}
/* 12 Miroir de loge */
.x-bulbe{width:14px;height:14px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#fff,#ffe9a8 60%,#f3c45c);box-shadow:0 0 10px 3px rgba(255,220,140,.8);animation:xAmp 1.2s ease-in-out infinite alternate}
/* 13 Perles et charms */
.x-cp{position:absolute;top:0;z-index:5;transform-origin:50% 0;animation:xBalp ease-in-out infinite;pointer-events:none}
.x-cp .x-f2{width:8px;margin:0 auto;background:radial-gradient(circle,#fff 0 3px,#f6dfe6 3.6px,transparent 4.2px) 0 0/8px 10px repeat-y;filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
.x-cp img{width:38px;display:block;margin:-3px auto 0;filter:drop-shadow(0 3px 5px rgba(0,0,0,.3))}
/* 16 Charms dans des bulles */
.x-bch{bottom:20px;border-radius:50%;background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.9) 0 7%,transparent 9%),radial-gradient(circle,rgba(255,255,255,.06) 55%,rgba(255,170,220,.45) 72%,rgba(170,220,255,.55) 86%,rgba(255,255,255,.8) 100%);animation:xMonte linear infinite;display:grid!important;place-items:center}
.x-bch img{width:58%}
/* 17 Collier de perles */
.x-col{left:-10px;right:-10px;top:0;height:100px;z-index:5;border-bottom:9px dotted #fff;border-radius:0 0 50% 50%;filter:drop-shadow(0 1px 1px rgba(0,0,0,.35))}
/* 18 Lustre */
.x-lu{top:0;width:1px;background:rgba(255,255,255,.75);transform-origin:50% 0;animation:xBalp ease-in-out infinite}
.x-lu::after{content:"";position:absolute;bottom:-20px;left:-8px;width:17px;height:22px;background:linear-gradient(135deg,#fff,#e2f0ff 40%,#ffd8e8 70%,#fff);clip-path:polygon(50% 0,100% 40%,50% 100%,0 40%);filter:drop-shadow(0 0 4px #fff);animation:xAmp 1.5s ease-in-out infinite alternate}
/* 19 Lecteur de musique */
.x-lect{left:16px;right:16px;top:30%;z-index:5;background:rgba(30,20,24,.55);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-radius:18px;padding:12px 14px;color:#fff;text-align:left;font:400 13px/1.3 Jost,sans-serif}
.x-lect .x-h{display:flex;gap:10px;align-items:center}
.x-lect .x-pho{width:42px;height:42px;border-radius:8px;background-size:cover;background-position:center;flex:none}
.x-lect .x-h div{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.x-onde{display:flex;gap:2px;align-items:center;height:24px;margin-top:8px}
.x-onde i{flex:1;background:#ff8fb1;border-radius:2px;animation:xEq .7s ease-in-out infinite alternate}
.x-barre{height:3px;background:rgba(255,255,255,.3);border-radius:3px;margin-top:9px;overflow:hidden}
.x-barre i{display:block;height:100%;background:#fff;animation:xPrg 8s linear infinite}
@keyframes xPrg{from{width:0}to{width:100%}}
/* 20 Pluie de bonbons */
.x-bon{animation:xTombe linear infinite}
/* 21 Tap */
.x-onde2{left:58%;top:34%;width:24px;height:24px;margin:-12px;border-radius:50%;border:2px solid #fff;animation:xOnd 2.6s ease-out infinite}
@keyframes xOnd{0%{scale:.3;opacity:0}10%{opacity:1}60%,100%{scale:5;opacity:0}}
.x-pt{left:58%;top:34%;width:40px;height:40px;margin:-20px;border-radius:50%;background:rgba(255,255,255,.55);animation:xPt 2.6s ease-out infinite}
@keyframes xPt{0%{scale:1.5;opacity:0}8%{scale:1;opacity:1}20%{scale:.8;opacity:0}100%{opacity:0}}
.x-cp2{left:58%;top:calc(34% - 50px);width:56px;height:52px;margin-left:-28px;background:#ff5d8f;clip-path:path("M28 51 C11 38 0 28 0 16 C0 7 7 0 15 0 C20 0 25 3 28 8 C31 3 36 0 41 0 C49 0 56 7 56 16 C56 28 45 38 28 51Z");filter:drop-shadow(0 4px 10px rgba(0,0,0,.25));animation:xCp 2.6s ease-out infinite}
@keyframes xCp{0%,10%{scale:0;opacity:0;translate:0 0}22%{scale:1.2;opacity:1}30%{scale:1}70%{opacity:1;translate:0 -60px}85%,100%{opacity:0;translate:0 -80px}}
/* 22 Réactions */
.x-rb{left:18px;right:18px;top:18px;z-index:5;background:rgba(0,0,0,.35);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border-radius:30px;display:flex!important;justify-content:space-around;padding:7px 4px;font-size:24px;line-height:1}
.x-rb span{animation:xRp 4s infinite;display:inline-block}
@keyframes xRp{0%,10%{transform:scale(0)}18%{transform:scale(1.3)}24%,100%{transform:scale(1)}}
.x-vole{font-size:34px;top:70px;animation:xRv 4s ease-out infinite}
@keyframes xRv{0%,40%{opacity:0;transform:translate(0,0) scale(.5)}45%{opacity:1}100%{opacity:0;transform:translate(var(--dx),240px) scale(1.6)}}
/* 23 Nuancier de vernis */
.x-nu{left:50%;top:38%;width:0;height:0;animation:xTourne 14s linear infinite}
.x-nu i{position:absolute;width:42px;height:42px;margin:-21px;border-radius:50%;border:3px solid #fff;box-shadow:0 4px 10px rgba(0,0,0,.3),inset -5px -6px 0 rgba(0,0,0,.12),inset 5px 5px 0 rgba(255,255,255,.35)}
@media (prefers-reduced-motion:reduce){.hent[class*="he-w-x"] *{animation-duration:0s!important;animation-iteration-count:1!important}}

/* 19/11 nuit (Marie : « dans les petites vignettes, on dirait la photo seule ») : SEULEMENT dans les vignettes de l'onglet
   En-tête de Personnaliser (:root>.a-entete = la copie en miniature, perso-pilote.js miniEntete) : l'effet est figé au moment où
   il se voit le mieux, et en plus gros. Le site en grand ne change pas. */
:root>.a-entete .hent[class*="he-w-x"] .x-fx *,:root>.a-entete .hent[class*="he-w-x"] .x-fx *::after{animation-play-state:paused!important}
/* Bokeh : ronds de lumière pleins et 2 × plus gros */
:root>.a-entete .he-w-xbokeh .x-bk{opacity:1!important;scale:2.1;filter:blur(2.5px);mix-blend-mode:normal;background:radial-gradient(circle,rgba(255,240,248,.95),rgba(255,150,200,.6) 60%,transparent 71%)}
/* Scintillement : étoiles allumées, 2,4 × plus grosses */
:root>.a-entete .he-w-xscint .x-sc{opacity:1!important;scale:2.4!important;filter:drop-shadow(0 0 10px #fff) drop-shadow(0 0 4px #fff)}
/* Bulles de savon / charms dans des bulles : bulles bien visibles, réparties sur la photo */
:root>.a-entete .he-w-xsavon .x-sav{opacity:1!important;scale:1.7;box-shadow:0 0 8px rgba(255,255,255,.85);background:radial-gradient(circle at 30% 30%,#fff 0 9%,transparent 11%),radial-gradient(circle,rgba(255,255,255,.12) 52%,rgba(255,150,210,.8) 68%,rgba(150,210,255,.9) 84%,#fff 100%)}
:root>.a-entete .he-w-xbulch .x-bch{opacity:1!important;scale:1.25}
:root>.a-entete .he-w-xsavon .x-sav,:root>.a-entete .he-w-xbulch .x-bch{animation:none!important;transform:none!important}
:root>.a-entete .he-w-xsavon .x-sav:nth-child(1){bottom:6%}:root>.a-entete .he-w-xsavon .x-sav:nth-child(2){bottom:60%}:root>.a-entete .he-w-xsavon .x-sav:nth-child(3){bottom:30%}
:root>.a-entete .he-w-xsavon .x-sav:nth-child(4){bottom:78%}:root>.a-entete .he-w-xsavon .x-sav:nth-child(5){bottom:16%}:root>.a-entete .he-w-xsavon .x-sav:nth-child(6){bottom:46%}
:root>.a-entete .he-w-xsavon .x-sav:nth-child(7){bottom:70%}:root>.a-entete .he-w-xsavon .x-sav:nth-child(8){bottom:36%}:root>.a-entete .he-w-xsavon .x-sav:nth-child(9){bottom:86%}
:root>.a-entete .he-w-xbulch .x-bch:nth-child(1){bottom:8%}:root>.a-entete .he-w-xbulch .x-bch:nth-child(2){bottom:56%}:root>.a-entete .he-w-xbulch .x-bch:nth-child(3){bottom:30%}
:root>.a-entete .he-w-xbulch .x-bch:nth-child(4){bottom:74%}:root>.a-entete .he-w-xbulch .x-bch:nth-child(5){bottom:18%}:root>.a-entete .he-w-xbulch .x-bch:nth-child(6){bottom:44%}
/* Bubble-gum : la bulle à son plus gros, juste avant d'éclater */
:root>.a-entete .he-w-xgum .x-gb{scale:1.12!important;opacity:.95!important}
/* Rideau de perles : perles 2 × plus grosses */
:root>.a-entete .he-w-xperles .x-pl{width:20px;background:radial-gradient(circle,#fff 0 6px,#f4dfe6 7.5px,transparent 9px) 0 0/20px 24px repeat-y;filter:drop-shadow(0 2px 2px rgba(0,0,0,.35))}
/* Guirlande lumineuse : ampoules allumées, plus grosses */
:root>.a-entete .he-w-xguirlande .x-amp{opacity:1!important;scale:1.5;box-shadow:0 0 16px 7px rgba(255,220,130,.9)}
/* Lustre : fils plus épais, pampilles 2 × plus grosses et allumées */
:root>.a-entete .he-w-xlustre .x-lu{width:2px;overflow:visible!important}
:root>.a-entete .he-w-xlustre .x-lu::after{opacity:1!important;width:34px;height:44px;left:-16px;bottom:-40px;filter:drop-shadow(0 0 8px #fff)}
/* Tap ♡ : le cœur au moment où il apparaît, avec ses ondes */
:root>.a-entete .he-w-xtap .x-cp2{opacity:1!important;scale:1.7!important;translate:0 -10px!important}
:root>.a-entete .he-w-xtap .x-onde2{opacity:.95!important;scale:2.6!important;border-width:3px}
:root>.a-entete .he-w-xtap .x-onde2+.x-onde2{opacity:.55!important;scale:4.2!important}
:root>.a-entete .he-w-xtap .x-pt{opacity:1!important;scale:1.3!important}
/* Réactions : barre plus grande + 3 émojis qui volent, visibles */
:root>.a-entete .he-w-xreac .x-rb{font-size:34px;padding:10px 4px}
:root>.a-entete .he-w-xreac .x-rb span{transform:none!important}
:root>.a-entete .he-w-xreac .x-vole{opacity:1!important;font-size:58px;transform:translate(var(--dx),90px)!important}
/* Pluie de bonbons : bonbons 1,8 × plus gros */
:root>.a-entete .he-w-xbonbons .x-bon{scale:1.8}
/* Nuancier : la roue était coupée (le cadre de la vignette cache ce qui dépasse) : on la montre, un peu plus grande */
:root>.a-entete .he-w-xnuancier .x-nu{overflow:visible!important;scale:1.25}
:root>.a-entete .he-w-xnuancier .x-nu i{width:52px;height:52px;margin:-26px}
`;
const st=document.createElement("style");st.id="entetes-plus11";st.textContent=css;document.head.appendChild(st);

const vieux=window.entete;
window.entete=function(k,t,lang){
  if(!NOUV.some(e=>e[0]===k))return vieux(k,t,lang);
  g=11;   /* même hasard à chaque dessin */
  const img=P(D.hero),ph=`<div class="he-ph" style="background-image:url('${img}')"></div>`;
  const kick=`<div class="kick">${t.type} · ${D.ville}</div>`,note=D.nb?`<div class="note"><span class="et">${etoiles}</span>${D.note} · ${D.nb} ${t.avisG}</div>`:"";
  const btn=`<button class="he-btn" data-res>${t.creneau}${creneau(t)?`<small>${t.dispo} : ${creneau(t)}</small>`:""}</button>`;
  const txt=`<div class="he-txt">${kick}<h1>${D.nom}</h1>${note}${btn}</div>`;
  const H=fx=>`<div class="hent he-w-${k}" data-s="accueil"><div class="wx-cad">${ph}<div class="x-fx">${fx}</div></div>${txt}</div>`;
  const susp=(left,len,i,dur,del,w,top)=>`<div class="x-susp" style="left:${left}%;top:${top||0}px;animation-duration:${dur}s;animation-delay:-${del}s"><div class="x-f" style="height:${len}px"></div><img src="${ch(i)}" style="width:${w||54}px" alt=""></div>`;
  const arc=(n,h,f)=>R(n,i=>{const x=(i+.5)/n*100,y=h-Math.pow((x-50)/50,2)*h;return f(i,x,y)});
  switch(k){
  case "xbokeh":return H(R(14,()=>{const s=rx(16,56);return `<i class="x-bk" style="width:${s}px;height:${s}px;left:${rx(0,90)}%;top:${rx(0,85)}%;animation-duration:${rx(2,4)}s;animation-delay:-${rx(0,4)}s"></i>`}));
  case "xscint":return H(R(9,()=>{const s=rx(14,30);return `<i class="x-sc" style="width:${s}px;height:${s}px;left:${rx(4,90)}%;top:${rx(4,88)}%;animation-duration:${rx(1.6,3.6)}s;animation-delay:-${rx(0,3)}s"></i>`}));
  case "xsavon":return H(R(9,()=>{const s=rx(26,56);return `<i class="x-sav" style="width:${s}px;height:${s}px;left:${rx(0,82)}%;animation-duration:${rx(6,10)}s;animation-delay:-${rx(0,8)}s"></i>`}));
  case "xgum":return H(`<i class="x-gb"></i><i class="x-pop"></i>`);
  case "xsusp":return H(susp(12,80,0,3.2,0)+susp(44,140,1,3.8,1)+susp(76,60,2,3,2));
  case "xbracelet":return H(`<i class="x-chaine"></i>`+arc(5,60,(i,x,y)=>susp(x-6,y+10,i,2.4+i*.2,i*.4,46)));
  case "xperles":return H(R(13,i=>`<i class="x-pl" style="left:${i<6?i*5+1:(i-6)*5+68}%;height:${rx(140,340)}px;animation-duration:${rx(2.5,4.5)}s;animation-delay:-${rx(0,3)}s"></i>`));
  case "xguirlande":return H(`<i class="x-fil"></i>`+arc(10,86,(i,x,y)=>`<i class="x-amp" style="left:calc(${x}% - 6px);top:${y-4}px;animation-delay:-${rx(0,1.6)}s"></i>`));
  case "xmusique":return H(`<div class="x-stk"><span class="x-pho" style="background-image:url('${img}')"></span><div><b>${D.nom}</b><br>Ongles parfaits</div><div class="x-eq">${R(4,i=>`<i style="animation-delay:-${i*.2}s"></i>`)}</div></div><div class="x-par"><div><p>♪ mes ongles sont parfaits ♪</p><p>♪ réserve ton créneau ♪</p><p>♪ on se voit bientôt ♪</p><p>♪ ${D.nom} ♪</p></div></div>`);
  case "xstrass":return H(`<i class="x-str"></i><i class="x-str2"></i>`);
  case "xloge":{let s="";for(let i=0;i<7;i++){s+=`<i class="x-bulbe" style="left:10px;top:${8+i*13}%;animation-delay:-${rx(0,1.2)}s"></i><i class="x-bulbe" style="right:10px;top:${8+i*13}%;animation-delay:-${rx(0,1.2)}s"></i>`}
    for(let i=0;i<6;i++)s+=`<i class="x-bulbe" style="left:${14+i*14}%;top:10px;animation-delay:-${rx(0,1.2)}s"></i>`;return H(s);}
  case "xperlecoeur":return H(R(6,i=>`<div class="x-cp" style="left:${4+i*16}%;animation-duration:${rx(2.5,4)}s;animation-delay:-${rx(0,3)}s"><div class="x-f2" style="height:${[100,170,70,150,90,190][i]}px"></div><img src="${ch(i)}" alt=""></div>`));
  case "xchrome":return H(susp(6,50,0,2.6,0,58)+susp(30,140,1,3.2,1,58)+susp(56,80,2,2.8,.5,58)+susp(80,160,3,3.4,1.6,58));
  case "xgeant":return H(susp(30,110,0,3.6,0,130));
  case "xguirch":return H(`<i class="x-chaine b"></i>`+arc(6,64,(i,x,y)=>susp(x-6,y+6,i,2.4+i*.2,i*.4,44)));
  case "xbulch":return H(R(6,i=>{const s=rx(64,96);return `<i class="x-bch" style="width:${s}px;height:${s}px;left:${rx(0,72)}%;animation-duration:${rx(7,10)}s;animation-delay:-${rx(0,9)}s"><img src="${ch(i)}" alt=""></i>`}));
  case "xcollier":return H(`<i class="x-col"></i>`+susp(22,14,0,2.6,0,50,96)+susp(46,14,1,3,1,56,104)+susp(70,14,2,2.8,.5,50,96));
  case "xlustre":return H(R(16,i=>`<i class="x-lu" style="left:${4+i*6}%;height:${50+Math.sin(i/15*Math.PI)*150}px;animation-duration:${rx(2.5,4)}s;animation-delay:-${rx(0,3)}s"></i>`));
  case "xlecteur":return H(`<div class="x-lect"><div class="x-h"><span class="x-pho" style="background-image:url('${img}')"></span><div><b>Ongles parfaits</b><br><span style="opacity:.8">${D.nom}</span></div></div><div class="x-onde">${R(24,()=>`<i style="animation-delay:-${rx(0,.7)}s"></i>`)}</div><div class="x-barre"><i></i></div></div>`);
  case "xbonbons":return H(R(10,i=>`<img class="x-bon" src="${CHB+["bonbon","bonbonvert","anneaubonbon","coeurgeleerose","coeurgeleejaune"][i%5]}.webp" style="left:${rx(2,86)}%;width:${rx(30,48)}px;animation-duration:${rx(5,8)}s;animation-delay:-${rx(0,8)}s" alt="">`));
  case "xtap":return H(`<i class="x-onde2"></i><i class="x-onde2" style="animation-delay:.25s"></i><i class="x-pt"></i><i class="x-cp2"></i>`);
  case "xreac":return H(`<div class="x-rb">${["😍","🔥","💅","✨","❤️","😮"].map((e,i)=>`<span style="animation-delay:${i*.08}s">${e}</span>`).join("")}</div>`+[["😍","20%","-30px"],["💅","48%","10px"],["✨","72%","-20px"]].map((v,i)=>`<span class="x-vole" style="left:${v[1]};--dx:${v[2]};animation-delay:${i*.3}s">${v[0]}</span>`).join(""));
  case "xnuancier":{const C=["var(--acc,#B5475E)","#E8C4B8","#9CAF88","#B9A3D6","#4A4A4F","#C8693F","#2E3A5C","#FF8FB1"];
    return H(`<div class="x-nu">${C.map((c,i)=>{const a=i/C.length*Math.PI*2;return `<i style="background:${c};left:${Math.round(Math.cos(a)*105)}px;top:${Math.round(Math.sin(a)*105)}px"></i>`}).join("")}</div>`);}
  }
  return "";
};
try{const k=enteteChoisie();if(NOUV.some(e=>e[0]===k)){const ok=window.__changeEntete&&window.__changeEntete();if(!ok)setTimeout(()=>window.__changeEntete&&window.__changeEntete(),600)}}catch(e){}
})();
