/* 16/11 (Marie) : série 7 — 20 en-têtes animées avec UNE SEULE photo (D.hero). Maquette (projet non touché). */
(function(){
/* 16/11 : seules les en-têtes choisies par Marie restent proposées */
const NOUV=[["ondes", "Ondes"], ["confettis", "Confettis"], ["arcenciel", "Arc-en-ciel"], ["ballons", "Ballons"], ["chromecadre", "Cadre chrome"], ["enveloppe", "Enveloppe"], ["machine", "Machine à écrire"]];
try{NOUV.forEach(e=>{if(!ENTETES.some(x=>x[0]===e[0]))ENTETES.push(e)})}catch(e){}
const capt=/[?&]capt/.test(location.search);
const OR="linear-gradient(135deg,#6f4a12 0%,#f8e7a6 18%,#b8862b 34%,#fff4c4 50%,#a8761f 66%,#f3d98a 82%,#6f4a12 100%)";
let css=`
.hent[class*="he-t-"]{justify-content:flex-start;padding:84px 0 44px}
.hent[class*="he-t-"] .he-ph{position:absolute;inset:0;background-size:cover;background-position:center}
.hent[class*="he-t-"] .he-txt{position:relative;z-index:5}
@keyframes tMonte{from{opacity:0;transform:translateY(36px) scale(.94)}to{opacity:1;transform:none}}
@keyframes tTour{to{transform:rotate(360deg)}}
.tx-cad{position:relative;width:calc(100% - 40px);max-width:520px;height:clamp(380px,56vh,500px);flex:none;border-radius:26px;overflow:hidden;box-shadow:0 26px 46px -22px rgba(0,0,0,.6);margin-bottom:18px;animation:tMonte 1s both}
.tx-ciel{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:4}
/* 1 Ondes */
.he-t-ondes .tx-on{position:absolute;z-index:2;left:50%;top:50%;width:40px;height:40px;margin:-20px;border-radius:50%;border:2px solid rgba(255,255,255,.85);box-shadow:0 0 12px rgba(255,255,255,.6);animation:tOnde 3.6s ease-out infinite}
@keyframes tOnde{from{transform:scale(.2);opacity:1}to{transform:scale(12);opacity:0}}
.he-t-ondes .he-ph{animation:tFlotte 3.6s ease-in-out infinite}
@keyframes tFlotte{0%,100%{transform:scale(1.03)}50%{transform:scale(1.08)}}
/* 2 Projecteurs */
.ecran .hent.he-t-projecteurs,.ecran:has(>.fond-site) .hent.he-t-projecteurs{background:radial-gradient(80% 50% at 50% 40%,#2a1c2a,#0b080c 75%)!important;color:#fff}
.he-t-projecteurs .tx-fx{position:absolute;z-index:1;top:-40px;width:180px;height:640px;margin-left:-90px;background:linear-gradient(rgba(255,250,225,.55),rgba(255,250,225,0) 85%);clip-path:polygon(45% 0,55% 0,100% 100%,0 100%);transform-origin:50% 0;mix-blend-mode:screen;filter:blur(2px)}
.he-t-projecteurs .tx-fx.g{left:15%;animation:tBalG 5s ease-in-out infinite}.he-t-projecteurs .tx-fx.d{left:85%;animation:tBalD 5s ease-in-out infinite}
@keyframes tBalG{0%,100%{transform:rotate(-28deg)}50%{transform:rotate(-6deg)}}
@keyframes tBalD{0%,100%{transform:rotate(28deg)}50%{transform:rotate(6deg)}}
.he-t-projecteurs .tx-cad{z-index:2;margin-top:20px}
.he-t-projecteurs .he-txt{color:var(--noir)}
/* 3 Confettis */
.he-t-confettis .tx-cf{position:absolute;left:50%;top:44%;width:9px;height:14px;border-radius:2px;animation:tBoum 3.2s cubic-bezier(.1,.6,.3,1) infinite}
@keyframes tBoum{0%{transform:translate(0,0) rotate(0);opacity:0}4%{opacity:1}60%{opacity:1}100%{transform:translate(var(--dx),calc(var(--dy) + 260px)) rotate(var(--r));opacity:0}}
/* 4 Boule à neige */
.he-t-neige .tx-bn{position:relative;width:min(300px,80%);flex:none;margin:6px 0 24px;animation:tMonte 1s both}
.he-t-neige .tx-gl{position:relative;aspect-ratio:1;border-radius:50%;overflow:hidden;box-shadow:inset 0 0 0 4px rgba(255,255,255,.6),inset -20px -20px 40px rgba(0,0,0,.25),0 20px 40px -18px rgba(0,0,0,.6)}
.he-t-neige .tx-gl:after{content:"";position:absolute;top:8%;left:14%;width:30%;height:18%;border-radius:50%;background:radial-gradient(rgba(255,255,255,.75),transparent 70%);transform:rotate(-30deg)}
.he-t-neige .tx-so{height:56px;margin:-26px 12% 0;border-radius:10px 10px 22px 22px;background:${OR};box-shadow:0 14px 22px -10px rgba(0,0,0,.6)}
.he-t-neige .tx-fl{position:absolute;top:-10px;width:6px;height:6px;border-radius:50%;background:#fff;box-shadow:0 0 4px #fff;animation:tTombe linear infinite}
@keyframes tTombe{from{transform:translate(0,0)}to{transform:translate(var(--dx),340px)}}
/* 5 Hublot */
.he-t-hublot .tx-hb{position:relative;width:min(300px,80%);aspect-ratio:1;flex:none;margin:10px 0 24px;border-radius:50%;padding:18px;background:linear-gradient(135deg,#5d6470,#f4f6fa 30%,#9aa3b2 55%,#ffffff 70%,#4a515c);box-shadow:0 26px 40px -16px rgba(0,0,0,.6);animation:tMonte 1s both}
.he-t-hublot .tx-vi{position:relative;width:100%;height:100%;border-radius:50%;overflow:hidden;box-shadow:inset 0 0 0 3px rgba(0,0,0,.4)}
.he-t-hublot .tx-eau{position:absolute;left:-20%;right:-20%;bottom:0;height:34%;background:linear-gradient(rgba(120,200,240,.55),rgba(40,120,190,.75));border-radius:40% 45% 0 0;animation:tVague 4s ease-in-out infinite}
@keyframes tVague{0%,100%{transform:translateX(-6%) rotate(-3deg)}50%{transform:translateX(6%) rotate(3deg)}}
.he-t-hublot .tx-bu{position:absolute;bottom:-10px;border-radius:50%;border:1.5px solid rgba(255,255,255,.85);animation:tBulle linear infinite}
@keyframes tBulle{to{transform:translateY(-320px)}}
.he-t-hublot .tx-vis{position:absolute;width:12px;height:12px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#777)}
/* 6 Grand nom */
.he-t-zoom{overflow:hidden}
.he-t-zoom .tx-gn{position:absolute;z-index:0;left:0;top:70px;white-space:nowrap;font:900 150px/1 Jost,sans-serif;letter-spacing:-.02em;color:transparent;-webkit-text-stroke:2px color-mix(in srgb,var(--acc) 70%,transparent);text-transform:uppercase;animation:tDefile 16s linear infinite}
.he-t-zoom .tx-gn.b{top:auto;bottom:110px;animation-direction:reverse}
@keyframes tDefile{to{transform:translateX(-50%)}}
.he-t-zoom .tx-cad{z-index:2;width:min(280px,75%);height:auto;aspect-ratio:3/4;margin-top:16px}
.he-t-zoom .tx-cad .he-ph{animation:tKen 12s ease-in-out infinite alternate}
@keyframes tKen{from{transform:scale(1)}to{transform:scale(1.15) translate(-3%,-2%)}}
/* 7 Store */
.he-t-lames .tx-la{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column}
.he-t-lames .tx-la i{flex:1;background:linear-gradient(var(--papier,#fff),color-mix(in srgb,var(--papier,#fff) 80%,#888));transform-origin:50% 0;animation:tLame 5s ease-in-out infinite;box-shadow:0 1px 0 rgba(0,0,0,.15)}
@keyframes tLame{0%,10%{transform:scaleY(1)}35%,85%{transform:scaleY(.04)}100%{transform:scaleY(1)}}
/* 8 Instantané */
.he-t-instantane .tx-pol{position:relative;width:min(290px,78%);flex:none;background:#fff;padding:14px 14px 58px;border-radius:4px;box-shadow:0 26px 40px -16px rgba(0,0,0,.55);transform:rotate(-3deg);margin:10px 0 24px;animation:tSort 1.2s cubic-bezier(.2,.8,.2,1) both}
@keyframes tSort{from{transform:translateY(-120px) rotate(-3deg);opacity:0}to{transform:rotate(-3deg);opacity:1}}
.he-t-instantane .tx-im{position:relative;aspect-ratio:1;overflow:hidden;background:#1d1a18}
.he-t-instantane .tx-im .he-ph{animation:tDev 7s ease-in-out infinite}
@keyframes tDev{0%{opacity:0;filter:sepia(1) brightness(.4)}45%{opacity:1;filter:sepia(.5) brightness(.9)}70%,92%{opacity:1;filter:none}100%{opacity:0}}
.he-t-instantane .tx-leg{position:absolute;left:0;right:0;bottom:14px;text-align:center;font:400 22px "Caveat","Segoe Print",cursive;color:#333}
/* 9 Bisous */
.he-t-bisous .tx-bi{position:absolute;z-index:3;width:56px;height:40px;opacity:0;animation:tBisou 6s ease-out infinite}
.he-t-bisous .tx-bi svg{width:100%;height:100%}
.he-t-bisous .tx-bi path{fill:color-mix(in srgb,var(--acc) 70%,#d4145a)}
@keyframes tBisou{0%{opacity:0;transform:scale(1.8) rotate(var(--r))}6%{opacity:.95;transform:scale(1) rotate(var(--r))}80%{opacity:.95}100%{opacity:0;transform:scale(1) rotate(var(--r))}}
/* 10 Arc-en-ciel */
.he-t-arcenciel .tx-pr{position:absolute;inset:-30%;z-index:2;background:linear-gradient(115deg,transparent 38%,rgba(255,80,80,.35) 42%,rgba(255,200,60,.35) 45%,rgba(120,255,120,.35) 48%,rgba(80,180,255,.35) 51%,rgba(180,90,255,.35) 54%,transparent 58%);mix-blend-mode:screen;animation:tPrisme 4.5s ease-in-out infinite}
@keyframes tPrisme{from{transform:translateX(-40%)}to{transform:translateX(40%)}}
.he-t-arcenciel .tx-cad{box-shadow:0 0 0 5px #fff,0 0 30px 6px rgba(255,180,240,.5),0 26px 46px -22px rgba(0,0,0,.5)}
/* 11 Ballons */
.he-t-ballons .tx-bw{position:relative;flex:none;width:min(260px,70%);margin:150px 0 24px;animation:tMonteBal 4s ease-in-out infinite}
@keyframes tMonteBal{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-14px) rotate(2deg)}}
.he-t-ballons .tx-ph{position:relative;aspect-ratio:3/4;border-radius:18px;overflow:hidden;box-shadow:0 0 0 5px var(--papier,#fff),0 24px 36px -16px rgba(0,0,0,.55)}
.he-t-ballons .tx-bal{position:absolute;bottom:100%;width:66px;height:78px;border-radius:50% 50% 50% 50%/45% 45% 55% 55%;box-shadow:inset -8px -10px 0 rgba(0,0,0,.12),inset 8px 8px 12px rgba(255,255,255,.45)}
.he-t-ballons .tx-bal:after{content:"";position:absolute;left:50%;top:100%;width:1px;height:90px;background:rgba(80,80,80,.6)}
.he-t-ballons .tx-bal.c{clip-path:path("M33 78 C 10 60 0 44 0 26 C 0 10 12 0 24 0 C 30 0 33 4 33 8 C 33 4 36 0 42 0 C 54 0 66 10 66 26 C 66 44 56 60 33 78 Z");border-radius:0}
/* 12 Couronne */
.he-t-couronne .tx-cw{position:relative;flex:none;width:min(280px,76%);margin:70px 0 24px}
.he-t-couronne .tx-ph{position:relative;aspect-ratio:3/4;border-radius:22px;overflow:hidden;box-shadow:0 0 0 4px #e9cf86,0 24px 36px -16px rgba(0,0,0,.55);animation:tMonte 1s both}
.he-t-couronne .tx-cr{position:absolute;z-index:3;left:50%;top:-74px;width:150px;height:96px;margin-left:-75px;background:${OR};clip-path:polygon(0 100%,0 30%,18% 60%,30% 10%,50% 50%,70% 10%,82% 60%,100% 30%,100% 100%);filter:drop-shadow(0 6px 8px rgba(0,0,0,.4));animation:tPose 1.4s .3s cubic-bezier(.3,1.4,.5,1) both,tBrilleC 3s 1.7s ease-in-out infinite}
@keyframes tPose{from{transform:translateY(-140px) rotate(-14deg);opacity:0}to{transform:rotate(-8deg);opacity:1}}
@keyframes tBrilleC{0%,100%{transform:rotate(-8deg);filter:drop-shadow(0 6px 8px rgba(0,0,0,.4)) brightness(1)}50%{transform:rotate(-5deg);filter:drop-shadow(0 6px 8px rgba(0,0,0,.4)) brightness(1.25)}}
.he-t-couronne .tx-gem{position:absolute;z-index:4;width:12px;height:12px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ffd1e0,var(--acc) 60%,#5a0f2a)}
/* 13 Pétales */
.he-t-petales .tx-pe{position:absolute;top:-30px;width:18px;height:22px;border-radius:80% 0 80% 0;background:linear-gradient(135deg,#ffd1dc,color-mix(in srgb,var(--acc) 60%,#ff7aa2));opacity:.9;animation:tPetale linear infinite}
@keyframes tPetale{0%{transform:translate(0,0) rotate(0)}25%{transform:translate(30px,220px) rotate(120deg)}50%{transform:translate(-20px,450px) rotate(240deg)}75%{transform:translate(25px,680px) rotate(330deg)}100%{transform:translate(0,900px) rotate(420deg)}}
.he-t-petales .tx-cad{border-radius:999px 999px 26px 26px}
/* 14 Cadre chrome */
.he-t-chromecadre .tx-cc{position:relative;width:calc(100% - 40px);max-width:520px;flex:none;padding:10px;border-radius:32px;background:conic-gradient(from var(--ang,0deg),#5d6470,#f4f6fa,#9aa3b2,#fff,#7d8796,#e3e8ef,#5d6470);animation:tChrome 4s linear infinite,tMonte 1s both;margin-bottom:18px;box-shadow:0 26px 46px -22px rgba(0,0,0,.6)}
@property --ang{syntax:"<angle>";inherits:false;initial-value:0deg}
@keyframes tChrome{to{--ang:360deg}}
.he-t-chromecadre .tx-cc>div{position:relative;height:clamp(360px,54vh,480px);border-radius:24px;overflow:hidden}
/* 15 Timbre */
.he-t-timbre .tx-tb{position:relative;width:min(280px,76%);flex:none;padding:14px;margin:14px 0 26px;background:#fff;
 background:radial-gradient(circle at 9px 9px,transparent 5px,#fff 5.5px) -9px -9px/18px 18px;filter:drop-shadow(0 10px 14px rgba(0,0,0,.35));transform:rotate(3deg)}
.he-t-timbre .tx-ti{position:relative;aspect-ratio:3/4;overflow:hidden}
.he-t-timbre .tx-px{position:absolute;z-index:2;right:10px;top:8px;color:#fff;font:700 18px Jost;text-shadow:0 1px 6px rgba(0,0,0,.6)}
.he-t-timbre .tx-ca{position:absolute;z-index:6;right:4%;top:130px;width:130px;height:130px;border-radius:50%;border:3px solid color-mix(in srgb,var(--acc) 80%,#000);color:color-mix(in srgb,var(--acc) 80%,#000);display:grid;place-items:center;text-align:center;font:700 11px/1.3 Jost;letter-spacing:.14em;text-transform:uppercase;opacity:.85;animation:tTampon 4s ease-in infinite}
.he-t-timbre .tx-ca:before{content:"";position:absolute;inset:8px;border-radius:50%;border:1.5px solid currentColor}
@keyframes tTampon{0%,30%{transform:scale(2.2) rotate(-20deg);opacity:0}38%{transform:scale(1) rotate(-12deg);opacity:.85}90%{opacity:.85}100%{opacity:0;transform:rotate(-12deg)}}
/* 16 Enveloppe */
.he-t-enveloppe .tx-en{position:relative;width:min(320px,86%);height:420px;flex:none;margin:10px 0 16px;overflow:hidden;border-radius:10px}
.he-t-enveloppe .tx-dos{position:absolute;left:0;right:0;bottom:0;height:200px;background:color-mix(in srgb,var(--acc) 55%,#fff);border-radius:10px;box-shadow:0 22px 34px -16px rgba(0,0,0,.55)}
.he-t-enveloppe .tx-carte{position:absolute;z-index:2;left:8%;right:8%;bottom:20px;height:330px;border-radius:10px;overflow:hidden;box-shadow:0 0 0 6px #fff,0 10px 20px -8px rgba(0,0,0,.4);animation:tCarte 6s cubic-bezier(.3,.8,.3,1) infinite}
@keyframes tCarte{0%,12%{transform:translateY(160px)}40%,88%{transform:translateY(-40px)}100%{transform:translateY(160px)}}
.he-t-enveloppe .tx-face{position:absolute;z-index:3;left:0;right:0;bottom:0;height:200px;border-radius:10px;background:linear-gradient(to top right,color-mix(in srgb,var(--acc) 70%,#fff) 50%,transparent 50.5%),linear-gradient(to top left,color-mix(in srgb,var(--acc) 62%,#fff) 50%,transparent 50.5%)}
.he-t-enveloppe .tx-cachet{position:absolute;z-index:4;left:50%;bottom:62px;width:46px;height:46px;margin-left:-23px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#e8667f,#8a1530);box-shadow:0 4px 8px rgba(0,0,0,.4);color:#ffd6de;display:grid;place-items:center;font-size:20px}
/* 17 Notes */
.he-t-notes .tx-no{position:absolute;bottom:20%;font-size:30px;color:var(--acc);text-shadow:0 2px 6px rgba(0,0,0,.25);animation:tNote 5s ease-in infinite;opacity:0}
@keyframes tNote{0%{transform:translate(0,0) rotate(-10deg);opacity:0}10%{opacity:1}100%{transform:translate(var(--dx),-480px) rotate(20deg);opacity:0}}
.he-t-notes .tx-cad{border-radius:50%;width:min(300px,80%);height:auto;aspect-ratio:1;box-shadow:0 0 0 6px var(--papier,#fff),0 26px 46px -22px rgba(0,0,0,.6);margin-top:16px;animation:tMonte 1s both,tPulse 1.2s ease-in-out infinite}
@keyframes tPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.025)}}
/* 18 Coucher de soleil */
.ecran .hent.he-t-coucher,.ecran:has(>.fond-site) .hent.he-t-coucher{background:linear-gradient(#ff8a5b,#ff5e8a 40%,#7a3b8f 80%,#2b1a3f)!important;background-size:100% 250%!important;animation:tCiel 10s ease-in-out infinite alternate;color:#fff}
@keyframes tCiel{from{background-position:0 0}to{background-position:0 100%}}
.he-t-coucher .tx-sol{position:absolute;z-index:0;left:50%;top:90px;width:260px;height:260px;margin-left:-130px;border-radius:50%;background:radial-gradient(#fff3b0,#ffc04d 50%,#ff8a3d);box-shadow:0 0 80px 30px rgba(255,190,90,.55);animation:tSoleil 10s ease-in-out infinite alternate}
@keyframes tSoleil{from{transform:translateY(0)}to{transform:translateY(160px)}}
.he-t-coucher .tx-cad{z-index:2;margin-top:40px;border-radius:999px 999px 26px 26px;box-shadow:0 0 0 5px rgba(255,255,255,.8),0 26px 46px -22px rgba(0,0,0,.6)}
.he-t-coucher .he-txt{color:var(--noir)}
/* 19 Machine à écrire */
.he-t-machine .tx-cad{height:clamp(330px,48vh,430px)}
.he-t-machine .tx-pa{width:calc(100% - 60px);max-width:480px;flex:none;background:#fdfbf6;color:#1b1715;border-radius:4px;padding:18px 20px 22px;box-shadow:0 18px 30px -16px rgba(0,0,0,.5);text-align:left;margin:-50px 0 14px;position:relative;z-index:3;background-image:repeating-linear-gradient(transparent 0 25px,rgba(120,150,200,.18) 25px 26px)}
.he-t-machine .tx-h1{position:absolute!important;left:20px;top:14px;margin:0!important;font-size:20px!important;opacity:0!important;pointer-events:none}
.he-t-machine .tx-ty{font:500 15px/26px "Courier New",ui-monospace,monospace;min-height:78px}
.he-t-machine .tx-ty b{font-weight:700;font-size:20px}
.he-t-machine .tx-cu{display:inline-block;width:9px;height:18px;background:#1b1715;vertical-align:-3px;animation:tCur .8s steps(1) infinite}
@keyframes tCur{50%{opacity:0}}
/* 20 Feu d'artifice */
.ecran .hent.he-t-artifice,.ecran:has(>.fond-site) .hent.he-t-artifice{background:radial-gradient(90% 60% at 50% 30%,#1d1838,#07060f 75%)!important;color:#fff}
.he-t-artifice .tx-fe{position:absolute;width:4px;height:4px;border-radius:50%;animation:tFeu 2.8s ease-out infinite}
.he-t-artifice .tx-fe i{position:absolute;left:0;top:0;width:4px;height:4px;border-radius:50%;background:currentColor;box-shadow:0 0 6px currentColor;animation:tEtin 2.8s ease-out infinite;animation-delay:inherit}
@keyframes tEtin{0%,20%{transform:translate(0,0);opacity:0}24%{opacity:1}90%{opacity:.8}100%{transform:translate(var(--x),calc(var(--y) + 30px));opacity:0}}
@keyframes tFeu{0%{transform:translateY(240px);opacity:1}20%{transform:translateY(0);opacity:1}21%,100%{opacity:1}}
.he-t-artifice .tx-cad{z-index:3;margin-top:120px;box-shadow:0 0 0 4px rgba(255,255,255,.85),0 26px 46px -22px rgba(0,0,0,.7)}
.he-t-artifice .he-txt{color:var(--noir)}
`;
if(capt)css+=`.hent[class*="he-t-"] .tx-cad,.hent[class*="he-t-"] .tx-bn,.hent[class*="he-t-"] .tx-hb,.hent[class*="he-t-"] .tx-pol,.hent[class*="he-t-"] .tx-ph,.hent[class*="he-t-"] .tx-cc{animation:none!important}
.he-t-lames .tx-la i{animation:none!important;transform:scaleY(.04)}.he-t-instantane .tx-im .he-ph{animation:none!important}.he-t-bisous .tx-bi{animation:none!important;opacity:.95;transform:rotate(var(--r))}
.he-t-couronne .tx-cr{animation:none!important;transform:rotate(-8deg)}.he-t-timbre .tx-ca{animation:none!important;transform:rotate(-12deg)}.he-t-enveloppe .tx-carte{animation:none!important;transform:translateY(-40px)}
.he-t-confettis .tx-cf,.he-t-neige .tx-fl,.he-t-hublot .tx-bu,.he-t-petales .tx-pe,.he-t-notes .tx-no,.he-t-artifice .tx-fe,.he-t-artifice .tx-fe i,.he-t-ondes .tx-on,.he-t-zoom .tx-gn,.he-t-arcenciel .tx-pr{animation-play-state:paused!important}
.he-t-notes .tx-no{opacity:1}.he-t-confettis .tx-cf{animation-delay:-1.3s!important}`;
const st=document.createElement("style");st.id="entetes-plus7";st.textContent=css;document.head.appendChild(st);

const LEV=`<svg viewBox="0 0 56 40"><path d="M28 14 C 22 2, 4 2, 2 16 C 6 14 14 12 28 18 C 42 12 50 14 54 16 C 52 2, 34 2, 28 14Z M2 18 C 10 34 22 38 28 38 C 34 38 46 34 54 18 C 44 22 36 24 28 24 C 20 24 12 22 2 18Z"/></svg>`;
const vieux=window.entete;
window.entete=function(k,t,lang){
  if(!NOUV.some(e=>e[0]===k))return vieux(k,t,lang);
  const ph=`<div class="he-ph" style="background-image:url('${P(D.hero)}')"></div>`;
  const kick=`<div class="kick">${t.type} · ${D.ville}</div>`,note=D.nb?`<div class="note"><span class="et">${etoiles}</span>${D.note} · ${D.nb} ${t.avisG}</div>`:"";
  const btn=`<button class="he-btn" data-res>${t.creneau}${creneau(t)?`<small>${t.dispo} : ${creneau(t)}</small>`:""}</button>`;
  const nom=`<h1>${D.nom}</h1>`,txt=(h=true)=>`<div class="he-txt">${kick}${h?nom:""}${note}${btn}</div>`,txt2=`<div class="he-txt">${kick}${note}${btn}</div>`;
  const c=`hent he-t-${k}`,H=x=>`<div class="${c}" data-s="accueil">${x}</div>`,R=(n,f)=>Array.from({length:n},(_,i)=>f(i)).join("");
  if(k==="ondes")return H(`<div class="tx-cad">${ph}${R(3,i=>`<span class="tx-on" style="animation-delay:${i*1.2}s"></span>`)}</div>${txt()}`);
  if(k==="projecteurs")return H(`<span class="tx-fx g"></span><span class="tx-fx d"></span><div class="tx-cad">${ph}</div>${txt()}`);
  if(k==="confettis"){const col=["#ff5fa2","#ffd447","#5fd4ff","#9b6bff","#ff8a3d","#ffffff","var(--acc)"];
    return H(`<div class="tx-ciel">${R(40,i=>{const a=i/40*Math.PI*2,d=90+(i*37)%140;return `<span class="tx-cf" style="background:${col[i%7]};--dx:${Math.round(Math.cos(a)*d*1.3)}px;--dy:${Math.round(Math.sin(a)*d)}px;--r:${(i*97)%720}deg;animation-delay:${(i%4)*.05}s"></span>`})}</div><div class="tx-cad">${ph}</div>${txt()}`);}
  if(k==="neige")return H(`<div class="tx-bn"><div class="tx-gl">${ph}${R(26,i=>`<span class="tx-fl" style="left:${(i*37)%100}%;--dx:${((i*13)%40)-20}px;animation-duration:${4+(i%5)}s;animation-delay:${-((i*.7)%8)}s;transform:scale(${.5+(i%3)*.3})"></span>`)}</div><div class="tx-so"></div></div>${txt()}`);
  if(k==="hublot")return H(`<div class="tx-hb">${R(8,i=>{const a=i/8*Math.PI*2;return `<span class="tx-vis" style="left:calc(50% + ${Math.cos(a)*47}% - 6px);top:calc(50% + ${Math.sin(a)*47}% - 6px)"></span>`})}<div class="tx-vi">${ph}<div class="tx-eau"></div>${R(10,i=>{const s=8+(i*7)%16;return `<span class="tx-bu" style="left:${(i*29)%90+5}%;width:${s}px;height:${s}px;animation-duration:${4+(i%4)}s;animation-delay:${-((i*.9)%6)}s"></span>`})}</div></div>${txt()}`);
  if(k==="zoom"){const w=(D.nom+" · ").repeat(6);return H(`<div class="tx-gn">${w}</div><div class="tx-gn b">${w}</div><div class="tx-cad">${ph}</div>${txt()}`);}
  if(k==="lames")return H(`<div class="tx-cad">${ph}<div class="tx-la">${R(10,i=>`<i style="animation-delay:${i*.06}s"></i>`)}</div></div>${txt()}`);
  if(k==="instantane")return H(`<div class="tx-pol"><div class="tx-im">${ph}</div><div class="tx-leg">${D.ville} ♡</div></div>${txt()}`);
  if(k==="bisous"){const B=[[2,8,-20,"0s"],[78,4,15,".8s"],[6,62,10,"1.6s"],[76,70,-12,"2.4s"],[40,-2,6,"3.2s"]];
    return H(`<div class="tx-cad">${ph}${B.map(([x,y,r,d])=>`<span class="tx-bi" style="left:${x}%;top:${y}%;--r:${r}deg;animation-delay:${d}">${LEV}</span>`).join("")}</div>${txt()}`);}
  if(k==="arcenciel")return H(`<div class="tx-cad">${ph}<div class="tx-pr"></div></div>${txt()}`);
  if(k==="ballons"){const col=["#ff8fb8","#ffd1e0","var(--acc)","#f3d98a","#ffffff"];const P2=[[-6,-10],[22,-30],[48,-14],[70,-36],[90,-8]];
    return H(`<div class="tx-bw">${P2.map(([x,y],i)=>`<span class="tx-bal${i%2?" c":""}" style="left:calc(${x}% - 33px);margin-bottom:${-y}px;background:${col[i]}"></span>`).join("")}<div class="tx-ph">${ph}</div></div>${txt()}`);}
  if(k==="couronne")return H(`<div class="tx-cw"><span class="tx-cr"></span><div class="tx-ph">${ph}</div></div>${txt()}`);
  if(k==="petales")return H(`<div class="tx-ciel">${R(22,i=>`<span class="tx-pe" style="left:${(i*41)%100}%;animation-duration:${7+(i%5)}s;animation-delay:${-((i*1.1)%10)}s;transform:scale(${.6+(i%3)*.25})"></span>`)}</div><div class="tx-cad">${ph}</div>${txt()}`);
  if(k==="chromecadre")return H(`<div class="tx-cc"><div>${ph}</div></div>${txt()}`);
  if(k==="timbre")return H(`<div class="tx-tb"><div class="tx-ti">${ph}<span class="tx-px">1€</span></div></div><span class="tx-ca">${D.ville}<br>✦ 2026 ✦</span>${txt()}`);
  if(k==="enveloppe")return H(`<div class="tx-en"><div class="tx-dos"></div><div class="tx-carte">${ph}</div><div class="tx-face"></div><span class="tx-cachet">♥</span></div>${txt()}`);
  if(k==="notes"){const S=["♪","♫","♬","♩"];return H(`<div class="tx-ciel">${R(12,i=>`<span class="tx-no" style="left:${(i*31)%90+3}%;--dx:${((i*23)%80)-40}px;animation-delay:${-((i*.43)%5)}s">${S[i%4]}</span>`)}</div><div class="tx-cad">${ph}</div>${txt()}`);}
  if(k==="coucher")return H(`<span class="tx-sol"></span><div class="tx-cad">${ph}</div>${txt()}`);
  if(k==="machine")return H(`<div class="tx-cad">${ph}</div><div class="tx-pa"><h1 class="tx-h1" aria-hidden="true">${D.nom}</h1><div class="tx-ty" data-tape="${(D.nom+"|"+t.type+" à "+D.ville+"|Sur rendez-vous ✦").replace(/"/g,"&quot;")}"></div></div><div class="he-txt">${note}${btn}</div>`);
  if(k==="artifice"){const col=["#ff5fa2","#ffd447","#7fe0ff","#c69bff","#ffffff"];const F=[[18,70,"0s"],[80,50,".9s"],[50,20,"1.8s"]];
    return H(`<div class="tx-ciel">${F.map(([x,y,d],j)=>`<span class="tx-fe" style="left:${x}%;top:${y}px;color:${col[j]};animation-delay:${d}">${R(16,i=>{const a=i/16*Math.PI*2;return `<i style="--x:${Math.round(Math.cos(a)*70)}px;--y:${Math.round(Math.sin(a)*70)}px"></i>`})}</span>`).join("")}</div><div class="tx-cad">${ph}</div>${txt()}`);}
  return "";
};
/* machine à écrire */
setInterval(()=>{document.querySelectorAll("[data-tape]").forEach(z=>{const L=z.dataset.tape.split("|"),tot=L.join("").length;let n=z._n||0;if(capt)n=tot;
  let rest=n,h="";L.forEach((l,i)=>{const s=l.slice(0,Math.max(0,rest));rest-=l.length;const e=s.replace(/&/g,"&amp;").replace(/</g,"&lt;");h+=(i===0?`<b>${e}</b>`:e)+(i<L.length-1&&rest>=0?"<br>":"")});
  z.innerHTML=h+'<span class="tx-cu"></span>';z._n=n>=tot+25?0:n+1})},110);
try{const k=enteteChoisie();if(NOUV.some(e=>e[0]===k)){const ok=window.__changeEntete&&window.__changeEntete();if(!ok)setTimeout(()=>window.__changeEntete&&window.__changeEntete(),600)}}catch(e){}
})();
