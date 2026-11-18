/* 16/11 (Marie) : série 6 — 20 nouvelles en-têtes animées (inspirées de ses photos 11 à 16 et du métier). Maquette (projet non touché). */
(function(){
/* 16/11 : seules les en-têtes choisies par Marie restent proposées */
const NOUV=[["viseur", "Viseur photo"], ["feuilleter", "Feuilleter"], ["swipe", "Swipe"]];
try{NOUV.forEach(e=>{if(!ENTETES.some(x=>x[0]===e[0]))ENTETES.push(e)})}catch(e){}
const capt=/[?&]capt/.test(location.search);
const OR="linear-gradient(135deg,#6f4a12 0%,#f8e7a6 18%,#b8862b 34%,#fff4c4 50%,#a8761f 66%,#f3d98a 82%,#6f4a12 100%)";
let css=`
.hent[class*="he-s-"]{justify-content:flex-start;padding:84px 0 44px}
.hent[class*="he-s-"] .he-ph{position:absolute;inset:0;background-size:cover;background-position:center}
.hent[class*="he-s-"] .he-txt{position:relative;z-index:5}
@keyframes sMonte{from{opacity:0;transform:translateY(36px) scale(.94)}to{opacity:1;transform:none}}
@keyframes sTour{to{transform:rotate(360deg)}}
@keyframes sClig{0%,49%{opacity:1}50%,100%{opacity:.15}}
.sx-cad{position:relative;width:calc(100% - 40px);max-width:520px;height:clamp(380px,56vh,500px);flex:none;border-radius:26px;overflow:hidden;box-shadow:0 26px 46px -22px rgba(0,0,0,.6);margin-bottom:18px}
.sx-in{animation:sMonte 1s both}
/* 1 Viseur */
.he-s-viseur .sx-co{position:absolute;z-index:2;width:34px;height:34px;border:3px solid #fff;animation:sFocus 3s ease-in-out infinite}
.he-s-viseur .sx-co.a{left:16px;top:16px;border-right:0;border-bottom:0}.he-s-viseur .sx-co.b{right:16px;top:16px;border-left:0;border-bottom:0}
.he-s-viseur .sx-co.c{left:16px;bottom:16px;border-right:0;border-top:0}.he-s-viseur .sx-co.d{right:16px;bottom:16px;border-left:0;border-top:0}
@keyframes sFocus{0%,100%{transform:scale(1)}10%{transform:scale(1.25)}20%{transform:scale(1)}}
.he-s-viseur .sx-rec{position:absolute;z-index:2;left:60px;top:22px;color:#fff;font:600 12px Jost;letter-spacing:.12em;text-shadow:0 1px 6px rgba(0,0,0,.6)}
.he-s-viseur .sx-rec i{display:inline-block;width:10px;height:10px;border-radius:50%;background:#ff2d55;margin-right:6px;animation:sClig 1s steps(1) infinite}
.he-s-viseur .sx-mire{position:absolute;z-index:2;left:50%;top:50%;width:60px;height:60px;margin:-30px;border:1.5px solid rgba(255,255,255,.85);border-radius:50%;animation:sFocus 3s ease-in-out infinite}
.he-s-viseur .sx-grille{position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,transparent 33%,rgba(255,255,255,.25) 33%,rgba(255,255,255,.25) calc(33% + 1px),transparent calc(33% + 1px),transparent 66%,rgba(255,255,255,.25) 66%,rgba(255,255,255,.25) calc(66% + 1px),transparent calc(66% + 1px)),linear-gradient(transparent 33%,rgba(255,255,255,.25) 33%,rgba(255,255,255,.25) calc(33% + 1px),transparent calc(33% + 1px),transparent 66%,rgba(255,255,255,.25) 66%,rgba(255,255,255,.25) calc(66% + 1px),transparent calc(66% + 1px))}
.he-s-viseur .sx-flash{position:absolute;inset:0;z-index:3;background:#fff;opacity:0;animation:sFlash 3s infinite}
@keyframes sFlash{0%,9%,100%{opacity:0}10%{opacity:.95}16%{opacity:0}}
/* 2 Avis de recherche */
.he-s-wanted .sx-af{position:relative;width:min(300px,80%);flex:none;padding:16px 18px 18px;background:radial-gradient(120% 90% at 50% 40%,#f3e4c4,#d9bf8e);color:#3b2412;box-shadow:0 26px 40px -18px rgba(0,0,0,.6);transform-origin:50% -10px;animation:sBalance 4s ease-in-out infinite;margin:14px 0 22px;clip-path:polygon(0 1%,4% 0,30% 1.5%,60% 0,96% 1%,100% 3%,99% 40%,100% 97%,95% 100%,60% 98.5%,25% 100%,2% 99%,0 60%)}
@keyframes sBalance{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
.he-s-wanted .sx-clou{position:absolute;z-index:3;left:50%;top:6px;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ddd,#666)}
.he-s-wanted .sx-w{font:900 46px/1 Georgia,serif;letter-spacing:.06em;text-align:center;margin-top:8px}
.he-s-wanted .sx-st{font:700 11px Georgia,serif;letter-spacing:.3em;text-align:center;margin:2px 0 10px}
.he-s-wanted .sx-ph{position:relative;aspect-ratio:4/4.4;border:3px solid #3b2412;overflow:hidden}
.he-s-wanted .sx-ph .he-ph{filter:sepia(.25) contrast(1.05)}
.he-s-wanted .sx-af h1{color:#3b2412!important;-webkit-text-fill-color:#3b2412!important;font-size:28px!important;margin:12px 0 2px!important;line-height:1!important;text-align:center}
.he-s-wanted .sx-rc{font:700 10px Georgia,serif;letter-spacing:.18em;text-align:center;text-transform:uppercase}
.he-s-wanted .sx-tb{position:absolute;z-index:4;bottom:30px;left:0;width:56px;height:56px;border-radius:50%;border:3px dotted #8a6a3c;box-shadow:inset 0 0 0 6px transparent,inset 0 0 0 8px #a5824f;animation:sRoule 7s linear infinite;opacity:.9}
@keyframes sRoule{from{transform:translateX(-80px) rotate(0)}to{transform:translateX(480px) rotate(720deg)}}
/* 3 Coups de griffes */
.he-s-griffes .sx-cad{animation:sMonte 1s both,sSecoue 5s infinite}
@keyframes sSecoue{0%,7%,13%,100%{transform:none}8%{transform:translate(-6px,3px)}10%{transform:translate(5px,-2px)}12%{transform:translate(-2px,1px)}}
.he-s-griffes .he-ph{animation:sAssomb 5s infinite}
@keyframes sAssomb{0%,6%{filter:brightness(.55)}14%,88%{filter:brightness(1)}100%{filter:brightness(.55)}}
.he-s-griffes .sx-gf{position:absolute;z-index:2;left:-10%;width:120%;height:12px;transform-origin:left center;background:linear-gradient(90deg,transparent,var(--acc) 12%,#fff 50%,var(--acc) 88%,transparent);clip-path:polygon(0 50%,8% 0,20% 60%,32% 10%,45% 55%,58% 5%,70% 60%,84% 15%,100% 50%,84% 90%,70% 45%,58% 100%,45% 50%,32% 95%,20% 45%,8% 100%);filter:drop-shadow(0 0 8px var(--acc));animation:sGriffe 5s infinite}
@keyframes sGriffe{0%,4%{transform:rotate(-28deg) scaleX(0);opacity:1}10%,86%{transform:rotate(-28deg) scaleX(1);opacity:1}100%{transform:rotate(-28deg) scaleX(1);opacity:0}}
/* 4 Vitrine de bijoutier */
.he-s-vitrinebijou .sx-vel{position:relative;width:calc(100% - 30px);max-width:520px;flex:none;padding:26px 22px 30px;border-radius:24px;background:radial-gradient(120% 90% at 50% 20%,color-mix(in srgb,var(--acc) 65%,#000 10%),color-mix(in srgb,var(--acc) 35%,#000));box-shadow:inset 0 0 40px rgba(0,0,0,.5),0 26px 46px -22px rgba(0,0,0,.7);margin-bottom:18px}
.he-s-vitrinebijou .sx-vit{position:relative;height:clamp(330px,48vh,430px);border-radius:16px;overflow:hidden;box-shadow:0 0 0 2px rgba(255,255,255,.55),0 0 0 7px rgba(255,255,255,.12),inset 0 0 0 1px rgba(255,255,255,.4)}
.he-s-vitrinebijou .sx-vit:after{content:"";position:absolute;inset:-20%;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.45) 48%,rgba(255,255,255,.1) 53%,transparent 60%);animation:sReflet 4.5s ease-in-out infinite}
@keyframes sReflet{from{transform:translateX(-60%)}to{transform:translateX(60%)}}
.he-s-vitrinebijou .sx-et{position:absolute;z-index:3;right:6px;top:52%;transform-origin:4px -40px;animation:sBalance 3s ease-in-out infinite}
.he-s-vitrinebijou .sx-et:before{content:"";position:absolute;left:3px;top:-40px;width:1px;height:40px;background:#e9d9b0}
.he-s-vitrinebijou .sx-et span{display:block;background:#fbf4e4;color:#3b2a14;font:600 9px Jost;letter-spacing:.24em;text-transform:uppercase;padding:8px 12px 8px 18px;clip-path:polygon(14px 0,100% 0,100% 100%,14px 100%,0 50%);box-shadow:0 6px 12px rgba(0,0,0,.4)}
/* 5 Lianes */
.he-s-lianes .sx-lw{width:min(290px,78%)}
.he-s-lianes .sx-arc{position:relative;width:100%;aspect-ratio:3/4;flex:none;border-radius:999px 999px 20px 20px;overflow:hidden;box-shadow:0 0 0 5px var(--papier,#fff),0 26px 40px -18px rgba(0,0,0,.55);margin:16px 0 22px}
.he-s-lianes .sx-lw{position:relative;flex:none}
.he-s-lianes svg.sx-li{position:absolute;z-index:3;left:-34px;top:-30px;width:calc(100% + 68px);height:calc(100% + 40px);overflow:visible;pointer-events:none;animation:sOndule 6s ease-in-out infinite}
@keyframes sOndule{0%,100%{transform:rotate(0)}50%{transform:rotate(.8deg)}}
.he-s-lianes .sx-li path{fill:none;stroke:#3f6b3a;stroke-width:4;stroke-linecap:round;stroke-dasharray:1200;stroke-dashoffset:1200;animation:sTrace 3s ease-out forwards}
.he-s-lianes .sx-li .f{fill:#5d9a4f;stroke:none;transform-box:fill-box;transform-origin:center;transform:scale(0);animation:sPousse .6s ease-out forwards}
.he-s-lianes .sx-li .fl{fill:var(--acc);stroke:none;transform-box:fill-box;transform-origin:center;transform:scale(0);animation:sPousse .6s ease-out forwards}
@keyframes sTrace{to{stroke-dashoffset:0}}
@keyframes sPousse{to{transform:scale(1)}}
/* 6 Paquet cadeau */
.he-s-cadeau .sx-cad{overflow:visible}
.he-s-cadeau .sx-in2{position:absolute;inset:0;border-radius:26px;overflow:hidden}
.he-s-cadeau .sx-cv{position:absolute;z-index:3;inset:0;border-radius:26px;background:linear-gradient(90deg,transparent 44%,#f3d98a 44%,#f3d98a 56%,transparent 56%),linear-gradient(transparent 44%,#f3d98a 44%,#f3d98a 56%,transparent 56%),var(--acc);box-shadow:inset 0 0 0 4px rgba(255,255,255,.25);animation:sOuvre 1.6s .5s cubic-bezier(.6,-.2,.3,1) forwards}
@keyframes sOuvre{to{transform:translateY(-120%) rotate(-12deg);opacity:0}}
.he-s-cadeau .sx-noeud{position:absolute;z-index:4;left:50%;top:-34px;width:110px;height:70px;margin-left:-55px;animation:sNoeud 2.4s ease-in-out infinite}
@keyframes sNoeud{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg) scale(1.05)}}
.he-s-cadeau .sx-noeud:before,.he-s-cadeau .sx-noeud:after{content:"";position:absolute;top:8px;width:52px;height:44px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:${OR};box-shadow:inset 0 -6px 0 rgba(0,0,0,.15)}
.he-s-cadeau .sx-noeud:before{left:0;transform:rotate(-25deg)}.he-s-cadeau .sx-noeud:after{right:0;transform:rotate(25deg)}
.he-s-cadeau .sx-noeud i{position:absolute;z-index:2;left:44px;top:18px;width:22px;height:24px;border-radius:8px;background:${OR}}
/* 7 Lampe UV */
.he-s-lampeuv .sx-lp{position:relative;width:min(330px,88%);flex:none;margin:12px 0 22px}
.he-s-lampeuv .sx-dome{position:relative;z-index:3;height:84px;border-radius:120px 120px 14px 14px;background:linear-gradient(#fdfdfd,#d9d9df);box-shadow:inset 0 -10px 18px rgba(0,0,0,.12),0 14px 26px -12px rgba(0,0,0,.5);display:flex;justify-content:center;align-items:flex-end;gap:14px;padding-bottom:12px}
.he-s-lampeuv .sx-led{width:12px;height:6px;border-radius:3px;background:#b98bff;box-shadow:0 0 10px 3px #a66bff;animation:sUV 1.6s ease-in-out infinite}
@keyframes sUV{0%,100%{opacity:.7}50%{opacity:1}}
.he-s-lampeuv .sx-ecran{position:absolute;top:18px;left:50%;margin-left:-30px;width:60px;height:26px;border-radius:6px;background:#1a1626;color:#c9a8ff;font:700 15px/26px ui-monospace,monospace;text-align:center;text-shadow:0 0 6px #a66bff}
.he-s-lampeuv .sx-cad{margin-top:-14px;width:100%}
.he-s-lampeuv .sx-cad:after{content:"";position:absolute;inset:0;background:linear-gradient(rgba(150,90,255,.55),rgba(150,90,255,.12) 60%,transparent);mix-blend-mode:screen;animation:sUV 1.6s ease-in-out infinite}
/* 8 Goutte de gel */
.he-s-gel .sx-gt{position:relative;width:min(300px,80%);aspect-ratio:1/1.1;flex:none;margin:18px 0 26px;overflow:hidden;box-shadow:0 0 0 6px color-mix(in srgb,var(--acc) 55%,#fff),0 30px 46px -20px rgba(0,0,0,.55);animation:sBlob 7s ease-in-out infinite}
@keyframes sBlob{0%,100%{border-radius:58% 42% 50% 50%/55% 45% 55% 45%}25%{border-radius:45% 55% 40% 60%/50% 60% 40% 50%}50%{border-radius:52% 48% 60% 40%/42% 52% 48% 58%}75%{border-radius:40% 60% 48% 52%/60% 42% 58% 40%}}
.he-s-gel .sx-gt:after{content:"";position:absolute;top:10%;left:16%;width:26%;height:14%;border-radius:50%;background:radial-gradient(rgba(255,255,255,.8),transparent 70%);transform:rotate(-24deg)}
/* 9 Nuancier */
.he-s-nuancier .sx-wrap{position:relative;width:calc(100% - 40px);max-width:520px;flex:none;margin-bottom:18px}
.he-s-nuancier .sx-cad{width:100%;margin:0}
.he-s-nuancier .sx-fan{position:absolute;z-index:3;left:-6px;bottom:-26px;width:170px;height:190px}
.he-s-nuancier .sx-ca{position:absolute;left:70px;bottom:0;width:30px;height:150px;border-radius:15px 15px 6px 6px;transform-origin:15px 140px;box-shadow:0 6px 12px -4px rgba(0,0,0,.4),inset 0 0 0 2px rgba(255,255,255,.3);animation:sEvent 4s ease-in-out infinite alternate}
.he-s-nuancier .sx-ca:after{content:"";position:absolute;top:10px;left:7px;width:6px;height:60px;border-radius:3px;background:rgba(255,255,255,.4)}
@keyframes sEvent{from{transform:rotate(calc(var(--r) * .55))}to{transform:rotate(var(--r))}}
.he-s-nuancier .sx-pivot{position:absolute;z-index:4;left:80px;bottom:6px;width:12px;height:12px;border-radius:50%;background:${OR}}
/* 10 Poudrier */
.he-s-poudrier .sx-pd{position:relative;width:min(290px,78%);aspect-ratio:1;flex:none;margin:150px 0 24px;perspective:900px}
.he-s-poudrier .sx-bas{position:absolute;inset:0;border-radius:50%;padding:14px;background:${OR};box-shadow:0 26px 40px -16px rgba(0,0,0,.6)}
.he-s-poudrier .sx-mir{position:relative;width:100%;height:100%;border-radius:50%;overflow:hidden;box-shadow:inset 0 0 0 3px rgba(111,74,18,.6)}
.he-s-poudrier .sx-mir:after{content:"";position:absolute;inset:0;background:linear-gradient(130deg,rgba(255,255,255,.35),transparent 40%)}
.he-s-poudrier .sx-cou{position:absolute;inset:0;border-radius:50%;background:${OR};transform-origin:50% 0;animation:sCouv 1.6s .3s cubic-bezier(.3,.8,.3,1) both;display:grid;place-items:center;box-shadow:inset 0 0 0 12px rgba(255,255,255,.2)}
@keyframes sCouv{from{transform:rotateX(0)}to{transform:rotateX(-168deg)}}
.he-s-poudrier .sx-cou span{backface-visibility:hidden;font:600 12px Jost;letter-spacing:.3em;color:#6f4a12;text-transform:uppercase}
.he-s-poudrier .sx-et{position:absolute;z-index:3;color:#fff;font-size:22px;text-shadow:0 0 10px #fff;animation:sScint 2s ease-in-out infinite}
@keyframes sScint{0%,100%{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1) rotate(45deg)}}
/* 11 Glaçon */
.he-s-glacon .sx-cad{box-shadow:0 0 0 6px rgba(220,240,255,.75),0 0 30px 6px rgba(170,215,255,.5),0 26px 46px -22px rgba(0,0,0,.5)}
.he-s-glacon .sx-gi{position:absolute;inset:0;z-index:2;background:radial-gradient(130% 90% at 50% 50%,transparent 55%,rgba(225,242,255,.8) 92%),linear-gradient(140deg,rgba(255,255,255,.35),transparent 30%,transparent 70%,rgba(255,255,255,.25));pointer-events:none}
.he-s-glacon svg{position:absolute;z-index:3;inset:0;width:100%;height:100%}
.he-s-glacon svg path{fill:none;stroke:rgba(255,255,255,.7);stroke-width:1.4}
.he-s-glacon .sx-dr{position:absolute;z-index:4;bottom:-6px;width:10px;height:14px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:rgba(200,230,255,.9);box-shadow:inset -2px -2px 0 rgba(120,170,220,.5);animation:sFond 3s ease-in infinite}
@keyframes sFond{0%,30%{transform:translateY(0) scale(.3);opacity:0}40%{opacity:1;transform:scale(1)}100%{transform:translateY(120px);opacity:0}}
.he-s-glacon .sx-lp{overflow:visible}
/* 12 Signature */
.he-s-signature .sx-cad:after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 45%,rgba(0,0,0,.6))}
.he-s-signature .sx-sig{position:absolute;z-index:3;left:18px;right:18px;bottom:26px}
.he-s-signature .sx-sig h1{color:#fff!important;-webkit-text-fill-color:#fff!important;margin:0!important;line-height:1.05!important;text-align:left;clip-path:inset(0 100% 0 0);animation:sEcrit 6s cubic-bezier(.5,0,.5,1) infinite}
@keyframes sEcrit{0%{clip-path:inset(0 100% 0 0)}40%,90%{clip-path:inset(0 0 0 0)}100%{clip-path:inset(0 0 0 0);opacity:0}}
.he-s-signature .sx-plume{position:absolute;bottom:4px;width:4px;height:44px;background:${OR};border-radius:2px;transform:rotate(30deg);animation:sPlume 6s cubic-bezier(.5,0,.5,1) infinite}
@keyframes sPlume{0%{left:0;opacity:1}40%{left:100%;opacity:1}45%,100%{left:100%;opacity:0}}
.he-s-signature .sx-sig small{display:block;margin-top:8px;font:500 9.5px Jost;letter-spacing:.4em;text-transform:uppercase;color:rgba(255,255,255,.85)}
/* 13 Kaléidoscope */
.he-s-kaleido .sx-ka{position:relative;width:min(320px,86%);aspect-ratio:1;flex:none;margin:10px 0 24px}
.he-s-kaleido .sx-ro{position:absolute;inset:0;border-radius:50%;overflow:hidden;animation:sTour 30s linear infinite;box-shadow:0 26px 40px -18px rgba(0,0,0,.5)}
.he-s-kaleido .sx-pt{position:absolute;inset:0;clip-path:polygon(50% 50%,30% 0,70% 0)}
.he-s-kaleido .sx-pt .he-ph{background-size:220%;background-position:50% 30%}
.he-s-kaleido .sx-ce{position:absolute;inset:24%;z-index:2;border-radius:50%;overflow:hidden;box-shadow:0 0 0 5px var(--papier,#fff),0 0 0 7px var(--acc),0 14px 24px -10px rgba(0,0,0,.6)}
/* 14 Carte 3D */
.he-s-tilt{perspective:900px}
.he-s-tilt .sx-tc{position:relative;width:min(290px,78%);aspect-ratio:3/4;flex:none;border-radius:22px;transform-style:preserve-3d;margin:14px 0 22px;transition:transform .15s ease-out;box-shadow:0 30px 50px -20px rgba(0,0,0,.6)}
.he-s-tilt .sx-tc>.sx-p{position:absolute;inset:0;border-radius:22px;overflow:hidden}
.he-s-tilt .sx-tc>.sx-p:after{content:"";position:absolute;inset:0;background:radial-gradient(circle at var(--lx,30%) var(--ly,20%),rgba(255,255,255,.45),transparent 50%)}
.he-s-tilt .sx-z{position:absolute;z-index:2;font-size:34px;color:#fff;text-shadow:0 0 14px var(--acc),0 6px 10px rgba(0,0,0,.4);transform:translateZ(60px)}
.he-s-tilt .sx-hint{font:500 10px Jost;letter-spacing:.3em;text-transform:uppercase;opacity:.75;margin-top:-8px;margin-bottom:12px}
/* 15 Cœurs au toucher */
.he-s-coeurstouche .sx-cad{cursor:pointer}
.he-s-coeurstouche .sx-c{position:absolute;z-index:3;font-size:22px;color:var(--acc);text-shadow:0 0 6px #fff;pointer-events:none;animation:sEclat 1.2s ease-out forwards}
@keyframes sEclat{0%{transform:translate(0,0) scale(.3);opacity:1}100%{transform:translate(var(--dx),var(--dy)) scale(1.2);opacity:0}}
.he-s-coeurstouche .sx-tap{position:absolute;z-index:3;left:50%;bottom:16px;transform:translateX(-50%);background:rgba(255,255,255,.88);color:#1E1C1B;font:600 10px Jost;letter-spacing:.24em;text-transform:uppercase;padding:7px 14px;border-radius:99px}
/* 16 Puzzle */
.he-s-puzzle .sx-pz{position:relative;width:min(300px,80%);aspect-ratio:3/4;flex:none;margin:14px 0 22px}
.he-s-puzzle .sx-pi{position:absolute;width:33.34%;height:33.34%;background-size:300% 300%;box-shadow:inset 0 0 0 1px rgba(255,255,255,.5);animation:sPiece 7s cubic-bezier(.3,.8,.3,1) infinite}
@keyframes sPiece{0%{transform:translate(var(--x),var(--y)) rotate(var(--r));opacity:0}6%{opacity:1}22%,88%{transform:none;opacity:1}100%{transform:none;opacity:1}}
.he-s-puzzle .sx-pz:after{content:"";position:absolute;inset:0;border-radius:4px;box-shadow:0 26px 40px -18px rgba(0,0,0,.55);pointer-events:none}
/* 17 Tableau des créneaux */
.he-s-flip .sx-tb{width:calc(100% - 40px);max-width:520px;flex:none;background:#141414;border-radius:16px;padding:12px 12px 14px;margin:14px 0 0;box-shadow:0 20px 34px -18px rgba(0,0,0,.7)}
.he-s-flip .sx-tt{display:flex;justify-content:space-between;color:#f5c542;font:600 9px Jost;letter-spacing:.3em;text-transform:uppercase;margin:0 4px 8px}
.he-s-flip .sx-li{display:flex;gap:3px;justify-content:center;margin-top:4px}
.he-s-flip .sx-ch{position:relative;width:21px;height:30px;border-radius:3px;background:linear-gradient(#2a2a2a 50%,#202020 50%);color:#fff;font:700 18px/30px ui-monospace,monospace;text-align:center}
.he-s-flip .sx-ch:after{content:"";position:absolute;left:0;right:0;top:50%;height:1px;background:#000}
.he-s-flip .sx-ch.go{animation:sFlap .25s ease-in}
@keyframes sFlap{0%{transform:rotateX(0)}50%{transform:rotateX(-90deg)}100%{transform:rotateX(0)}}
.he-s-flip .sx-ch.d{color:#f5c542}
.he-s-flip .sx-cad{margin-top:14px;height:clamp(300px,44vh,400px)}
/* 18 Feuilleter */
.he-s-feuilleter .sx-lv{position:relative;width:min(280px,76%);aspect-ratio:3/4;flex:none;margin:14px 0 22px;perspective:1400px}
.he-s-feuilleter .sx-pg{position:absolute;inset:0;border-radius:6px 18px 18px 6px;overflow:hidden;transform-origin:left center;box-shadow:0 20px 34px -18px rgba(0,0,0,.55),inset 6px 0 10px -6px rgba(0,0,0,.4);transition:transform 1.1s cubic-bezier(.4,.1,.3,1);backface-visibility:hidden}
.he-s-feuilleter .sx-pg.tourne{transform:rotateY(-170deg)}
/* 19 Éventail de photos */
.he-s-eventail .sx-ev{position:relative;width:100%;height:340px;flex:none;margin:8px 0 18px}
.he-s-eventail .sx-ec{position:absolute;left:50%;bottom:10px;width:150px;height:210px;margin-left:-75px;border-radius:14px;overflow:hidden;transform-origin:50% 120%;box-shadow:0 0 0 4px var(--papier,#fff),0 16px 26px -12px rgba(0,0,0,.55);animation:sOuvreEv 1.2s cubic-bezier(.3,.8,.3,1) both,sRespire 4s 1.2s ease-in-out infinite alternate}
@keyframes sOuvreEv{from{transform:rotate(0)}to{transform:rotate(var(--r))}}
@keyframes sRespire{from{transform:rotate(var(--r))}to{transform:rotate(calc(var(--r) * 1.18))}}
.he-s-eventail .sx-ec.m{width:180px;height:250px;margin-left:-90px;z-index:3}
/* 20 Swipe */
.he-s-swipe .sx-pile{position:relative;width:min(290px,78%);aspect-ratio:3/4;flex:none;margin:14px 0 22px}
.he-s-swipe .sx-sc{position:absolute;inset:0;border-radius:22px;overflow:hidden;box-shadow:0 20px 34px -16px rgba(0,0,0,.5);animation:sSwipe 9s ease-in-out infinite}
.he-s-swipe .sx-sc:nth-child(2){animation-delay:-3s}.he-s-swipe .sx-sc:nth-child(3){animation-delay:-6s}
@keyframes sSwipe{0%{transform:translateY(16px) scale(.92);z-index:1}30%{transform:none;z-index:3}55%{transform:none;z-index:3}66%{transform:translateX(140%) rotate(22deg);z-index:3;opacity:1}67%{opacity:0;z-index:0}68%{transform:translateY(24px) scale(.88);opacity:0}100%{transform:translateY(16px) scale(.92);opacity:1;z-index:1}}
.he-s-swipe .sx-sc b{position:absolute;z-index:2;left:18px;top:24px;padding:6px 12px;border:3px solid var(--acc);border-radius:8px;color:var(--acc);background:rgba(255,255,255,.85);font:800 20px Jost;letter-spacing:.08em;transform:rotate(-14deg);opacity:0;animation:sJadore 9s ease-in-out infinite;animation-delay:inherit}
@keyframes sJadore{0%,52%{opacity:0}58%,66%{opacity:1}67%,100%{opacity:0}}
.he-s-swipe .sx-bt{display:flex;gap:22px;justify-content:center;margin:-8px 0 16px}
.he-s-swipe .sx-bt span{width:52px;height:52px;border-radius:50%;background:var(--papier,#fff);display:grid;place-items:center;font-size:22px;box-shadow:0 8px 18px -8px rgba(0,0,0,.45)}
`;
if(capt)css+=`.hent[class*="he-s-"] .sx-in,.hent[class*="he-s-"] .sx-cad{animation:none!important}
.he-s-viseur .sx-flash,.he-s-cadeau .sx-cv{display:none}.he-s-griffes .sx-gf{animation:none!important;transform:rotate(-28deg) scaleX(1)}.he-s-griffes .he-ph{animation:none!important}
.he-s-lianes .sx-li path,.he-s-lianes .sx-li .f,.he-s-lianes .sx-li .fl{animation-duration:.01s!important;animation-delay:0s!important}
.he-s-poudrier .sx-cou{animation:none!important;transform:rotateX(-168deg)}.he-s-signature .sx-sig h1{animation:none!important;clip-path:none}.he-s-signature .sx-plume{display:none}
.he-s-puzzle .sx-pi{animation:none!important}.he-s-eventail .sx-ec{animation:none!important;transform:rotate(var(--r))}
.he-s-swipe .sx-sc,.he-s-swipe .sx-sc b{animation-play-state:paused!important}.he-s-wanted .sx-af,.he-s-wanted .sx-tb{animation-play-state:paused!important}`;
const st=document.createElement("style");st.id="entetes-plus6";st.textContent=css;document.head.appendChild(st);

const vieux=window.entete;
window.entete=function(k,t,lang){
  if(!NOUV.some(e=>e[0]===k))return vieux(k,t,lang);
  const ph=x=>`<div class="he-ph" style="background-image:url('${P(x)}')"></div>`,N=(()=>{const vu=new Set([P(D.hero)]),L=(D.nails||[]).filter(x=>{const u=P(x);if(!u||/undefined|null/.test(u)||vu.has(u))return false;vu.add(u);return true});return L.length?L:[D.hero]})(),n=i=>N[i%N.length];
  const kick=`<div class="kick">${t.type} · ${D.ville}</div>`,note=D.nb?`<div class="note"><span class="et">${etoiles}</span>${D.note} · ${D.nb} ${t.avisG}</div>`:"";
  const btn=`<button class="he-btn" data-res>${t.creneau}${creneau(t)?`<small>${t.dispo} : ${creneau(t)}</small>`:""}</button>`;
  const nom=`<h1>${D.nom}</h1>`,txt=(h=true)=>`<div class="he-txt">${kick}${h?nom:""}${note}${btn}</div>`,txt2=`<div class="he-txt">${kick}${note}${btn}</div>`;
  const c=`hent he-s-${k}`,H=x=>`<div class="${c}" data-s="accueil">${x}</div>`;
  if(k==="viseur")return H(`<div class="sx-cad sx-in">${ph(D.hero)}<div class="sx-grille"></div><span class="sx-co a"></span><span class="sx-co b"></span><span class="sx-co c"></span><span class="sx-co d"></span><span class="sx-mire"></span><div class="sx-rec"><i></i>REC · ${D.ville}</div><div class="sx-flash"></div></div>${txt()}`);
  if(k==="wanted")return H(`<div class="sx-af"><span class="sx-clou"></span><div class="sx-w">WANTED</div><div class="sx-st">— Ongles de rêve —</div><div class="sx-ph">${ph(D.hero)}</div>${nom}<div class="sx-rc">Récompense : un set sublime</div></div><span class="sx-tb"></span>${txt2}`);
  if(k==="griffes")return H(`<div class="sx-cad">${ph(D.hero)}${[[30,"0s"],[48,".12s"],[66,".24s"]].map(([y,d])=>`<span class="sx-gf" style="top:${y}%;animation-delay:${d}"></span>`).join("")}</div>${txt()}`);
  if(k==="vitrinebijou")return H(`<div class="sx-vel sx-in"><div class="sx-vit">${ph(D.hero)}</div><div class="sx-et"><span>Pièce unique</span></div></div>${txt()}`);
  if(k==="lianes"){const fe=[[48,120,".9s"],[30,260,"1.3s"],[50,400,"1.8s"],[318,110,"1.1s"],[336,250,"1.5s"],[314,380,"2s"]].map(([x,y,d])=>`<ellipse class="f" cx="${x}" cy="${y}" rx="12" ry="6" style="animation-delay:${d}"/>`).join("");
    const fl=[[40,190,"2.2s"],[326,320,"2.4s"],[60,460,"2.6s"]].map(([x,y,d])=>`<circle class="fl" cx="${x}" cy="${y}" r="8" style="animation-delay:${d}"/>`).join("");
    return H(`<div class="sx-lw"><div class="sx-arc sx-in">${ph(D.hero)}</div><svg class="sx-li" viewBox="0 0 360 500" preserveAspectRatio="none"><path d="M40 500 C 70 420 20 360 50 290 C 80 220 20 170 50 100 C 64 70 90 40 120 26"/><path d="M320 500 C 290 430 340 370 312 300 C 286 230 340 170 310 100 C 296 70 270 40 240 26"/>${fe}${fl}</svg></div>${txt()}`);}
  if(k==="cadeau")return H(`<div class="sx-cad sx-in"><div class="sx-in2">${ph(D.hero)}</div><div class="sx-cv"></div><div class="sx-noeud"><i></i></div></div>${txt()}`);
  if(k==="lampeuv")return H(`<div class="sx-lp"><div class="sx-dome"><span class="sx-ecran" data-uv>60</span>${'<span class="sx-led"></span>'.repeat(6)}</div><div class="sx-cad">${ph(D.hero)}</div></div>${txt()}`);
  if(k==="gel")return H(`<div class="sx-gt">${ph(D.hero)}</div>${txt()}`);
  if(k==="nuancier"){const C=["var(--acc)","color-mix(in srgb,var(--acc) 60%,#fff)","#f2c4cf","#e8a0b4","#c9a227","#2a1b1e","#f7efe6"];const R=[-60,-40,-20,0,20,40,60];
    return H(`<div class="sx-wrap sx-in"><div class="sx-cad">${ph(D.hero)}</div><div class="sx-fan">${C.map((col,i)=>`<span class="sx-ca" style="background:${col};--r:${R[i]}deg"></span>`).join("")}<span class="sx-pivot"></span></div></div>${txt()}`);}
  if(k==="poudrier")return H(`<div class="sx-pd"><div class="sx-bas"><div class="sx-mir">${ph(D.hero)}</div></div><div class="sx-cou"></div><span class="sx-et" style="left:6%;top:10%">✦</span><span class="sx-et" style="right:4%;top:40%;animation-delay:.7s">✦</span><span class="sx-et" style="left:30%;bottom:-6%;animation-delay:1.3s">✦</span></div>${txt()}`);
  if(k==="glacon")return H(`<div class="sx-lp" style="position:relative;width:calc(100% - 40px);max-width:520px"><div class="sx-cad sx-in" style="width:100%">${ph(D.hero)}<div class="sx-gi"></div><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M8 0 L18 22 L12 40 M18 22 L32 30 M92 100 L80 76 L88 60 M80 76 L64 70 M0 70 L14 64"/></svg></div>${[[18,"0s"],[46,"1.1s"],[74,"2s"]].map(([x,d])=>`<span class="sx-dr" style="left:${x}%;animation-delay:${d}"></span>`).join("")}</div>${txt()}`);
  if(k==="signature")return H(`<div class="sx-cad sx-in">${ph(D.hero)}<div class="sx-sig">${nom}<span class="sx-plume"></span><small>${t.type} · ${D.ville}</small></div></div><div class="he-txt">${note}${btn}</div>`);
  if(k==="kaleido"){let p="";for(let i=0;i<10;i++)p+=`<div class="sx-pt" style="transform:rotate(${i*36}deg)${i%2?" scaleX(-1)":""}">${ph(D.hero)}</div>`;
    return H(`<div class="sx-ka"><div class="sx-ro">${p}</div><div class="sx-ce">${ph(D.hero)}</div></div>${txt()}`);}
  if(k==="tilt")return H(`<div class="sx-tc" data-tilt><div class="sx-p">${ph(D.hero)}</div><span class="sx-z" style="left:-10px;top:20px">✦</span><span class="sx-z" style="right:-8px;top:46%">♥</span><span class="sx-z" style="left:20%;bottom:-14px">★</span></div><div class="sx-hint">Bougez votre téléphone</div>${txt()}`);
  if(k==="coeurstouche")return H(`<div class="sx-cad sx-in" data-coeurs>${ph(D.hero)}<span class="sx-tap">Touchez la photo ♥</span></div>${txt()}`);
  if(k==="puzzle"){let p="";for(let i=0;i<9;i++){const cx=i%3,cy=(i/3|0);p+=`<div class="sx-pi" style="left:${cx*33.33}%;top:${cy*33.33}%;background-image:url('${P(D.hero)}');background-position:${cx*50}% ${cy*50}%;--x:${((i*67)%240)-120}px;--y:${((i*91)%300)-150}px;--r:${((i*53)%120)-60}deg;animation-delay:${i*.06}s"></div>`}
    return H(`<div class="sx-pz">${p}</div>${txt()}`);}
  if(k==="flip")return H(`<div class="sx-tb"><div class="sx-tt"><span>Prochains créneaux</span><span>${D.ville}</span></div><div class="sx-li" data-flip></div></div><div class="sx-cad sx-in">${ph(D.hero)}</div>${txt()}`);
  if(k==="feuilleter"){const L=[D.hero,n(0),n(1),n(2),n(3)];return H(`<div class="sx-lv" data-feuil>${L.map((x,i)=>`<div class="sx-pg" style="z-index:${10-i}">${ph(x)}</div>`).join("")}</div>${txt()}`);}
  if(k==="eventail"){const L=[n(0),n(1),n(2),n(3)],R=[-36,-18,18,36];return H(`<div class="sx-ev">${L.map((x,i)=>`<div class="sx-ec" style="--r:${R[i]}deg">${ph(x)}</div>`).join("")}<div class="sx-ec m" style="--r:0deg">${ph(D.hero)}</div></div>${txt()}`);}
  if(k==="swipe"){const L=[D.hero,n(0),n(1)];return H(`<div class="sx-pile">${L.map(x=>`<div class="sx-sc">${ph(x)}<b>J'ADORE ♥</b></div>`).join("")}</div><div class="sx-bt"><span>✕</span><span style="color:var(--acc)">♥</span></div>${txt()}`);}
  return "";
};
/* petites animations pilotées */
const T0=Date.now();
setInterval(()=>{
  document.querySelectorAll("[data-uv]").forEach(e=>{const s=capt?42:60-Math.floor(((Date.now()-T0)/1000)%61);e.textContent=String(s).padStart(2,"0")});
},500);
const CR=["MAR 14:00 DISPO","MER 10:30 DISPO","JEU 17:00 DISPO","VEN 09:00 DISPO","SAM 11:30 DISPO"];let ci=0;
function flip(){document.querySelectorAll("[data-flip]").forEach(z=>{const tx=CR[ci%CR.length];if(!z.children.length)z.innerHTML=[...tx].map(()=>'<span class="sx-ch"></span>').join("");
  [...z.children].forEach((s,i)=>{const ch=tx[i]||" ";if(s.textContent!==ch){setTimeout(()=>{s.classList.remove("go");void s.offsetWidth;s.classList.add("go");s.textContent=ch===" "?" ":ch;s.classList.toggle("d",i>=10)},i*45)}})});ci++}
setInterval(()=>{if(!capt)flip()},3200);setTimeout(flip,300);setTimeout(()=>{ci=0;flip()},1500);
setInterval(()=>{if(capt)return;document.querySelectorAll("[data-feuil]").forEach(lv=>{const P=[...lv.children];const k=lv._k||0;if(k>=P.length-1){P.forEach(p=>p.classList.remove("tourne"));lv._k=0}else{P[k].classList.add("tourne");lv._k=k+1}})},2600);
document.addEventListener("pointermove",e=>{document.querySelectorAll("[data-tilt]").forEach(c=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  c._m=Date.now();c.style.transform=`rotateY(${x*24}deg) rotateX(${-y*24}deg)`;c.style.setProperty("--lx",(x+.5)*100+"%");c.style.setProperty("--ly",(y+.5)*100+"%")})});
setInterval(()=>{document.querySelectorAll("[data-tilt]").forEach(c=>{if(c._m&&Date.now()-c._m<2500)return;const a=capt?1:Date.now()/900;c.style.transform=`rotateY(${Math.sin(a)*14}deg) rotateX(${Math.cos(a*1.3)*8}deg)`;c.style.setProperty("--lx",50+Math.sin(a)*40+"%")})},60);
function eclat(z,x,y){for(let i=0;i<12;i++){const s=document.createElement("span");s.className="sx-c";s.textContent="♥";const a=i/12*Math.PI*2,d=60+Math.random()*50;
  s.style.left=x+"px";s.style.top=y+"px";s.style.setProperty("--dx",Math.cos(a)*d+"px");s.style.setProperty("--dy",Math.sin(a)*d+"px");z.appendChild(s);setTimeout(()=>s.remove(),1300)}}
document.addEventListener("pointerdown",e=>{const z=e.target.closest&&e.target.closest("[data-coeurs]");if(z){const r=z.getBoundingClientRect();eclat(z,e.clientX-r.left,e.clientY-r.top)}});
setInterval(()=>{document.querySelectorAll("[data-coeurs]").forEach(z=>{eclat(z,z.clientWidth*(.25+Math.random()*.5),z.clientHeight*(.25+Math.random()*.4))})},capt?99999:2400);
if(capt)setTimeout(()=>document.querySelectorAll("[data-coeurs]").forEach(z=>eclat(z,z.clientWidth*.5,z.clientHeight*.4)),200);
try{const k=enteteChoisie();if(NOUV.some(e=>e[0]===k)){const ok=window.__changeEntete&&window.__changeEntete();if(!ok)setTimeout(()=>window.__changeEntete&&window.__changeEntete(),600)}}catch(e){}
})();
