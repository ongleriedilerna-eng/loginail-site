/* 16/11 (Marie) : 10 NOUVELLES en-têtes « waouh » — maquette, ajoutée au site par le serveur de l'outil (le projet n'est pas touché).
   Celles que Marie garde seront intégrées dans pret.html (fonction entete + ENTETES). */
(function(){
/* 16/11 : seules les en-têtes choisies par Marie restent proposées (les autres : poubelle-16-11/) */
const NOUV=[["couv", "Couverture de magazine"], ["story", "Story"], ["feed", "Profil Insta"]];
try{NOUV.forEach(e=>{if(!ENTETES.some(x=>x[0]===e[0]))ENTETES.push(e)})}catch(e){}

const css=`
/* communs */
.hent[class*="he-n-"]{justify-content:flex-start;padding:84px 0 44px}
.hent[class*="he-n-"] .he-ph{position:absolute;inset:0;background-size:cover;background-position:center}
@keyframes nFlotte{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes nBrille{0%{transform:translateX(-160%) rotate(20deg)}60%,100%{transform:translateX(260%) rotate(20deg)}}
@keyframes nPose{from{opacity:0;transform:translateY(40px) rotate(var(--r,0deg)) scale(.92)}to{opacity:1;transform:translateY(0) rotate(var(--r,0deg)) scale(1)}}
/* 1 Polaroïds */
.he-n-polaroids .nx-pz{position:relative;width:min(330px,86%);height:390px;flex:none;margin-bottom:6px}
.he-n-polaroids .nx-pp{position:absolute;width:64%;padding:10px 10px 44px;background:#fff;border-radius:4px;box-shadow:0 18px 34px -16px rgba(0,0,0,.55);animation:nPose .9s both}
.he-n-polaroids .nx-pp .nx-ph{position:relative;aspect-ratio:4/5;overflow:hidden}
.he-n-polaroids .nx-pp:nth-child(1){left:0;top:30px;--r:-9deg;transform:rotate(-9deg);animation-delay:.05s}
.he-n-polaroids .nx-pp:nth-child(2){right:0;top:8px;--r:8deg;transform:rotate(8deg);animation-delay:.2s}
.he-n-polaroids .nx-pp:nth-child(3){left:18%;top:70px;width:66%;--r:-1.5deg;transform:rotate(-1.5deg);animation-delay:.35s;z-index:2}
.he-n-polaroids .nx-pp b{position:absolute;left:0;right:0;bottom:12px;font:400 15px "Caveat","Segoe Print",cursive;color:#333}
.he-n-polaroids .nx-tape{position:absolute;top:-12px;left:50%;width:84px;height:26px;margin-left:-42px;background:color-mix(in srgb,var(--acc) 35%,rgba(255,255,255,.6));transform:rotate(-4deg);opacity:.85}
/* 2 Couverture de magazine */
.hent.he-n-couv{padding:0 0 44px}
.he-n-couv .nx-cv{position:relative;width:100%;height:clamp(520px,78vh,700px);flex:none;overflow:hidden;color:#fff;text-align:left}
.he-n-couv .nx-cv:after{content:"";position:absolute;inset:0;background:linear-gradient(rgba(0,0,0,.35),transparent 30%,transparent 60%,rgba(0,0,0,.55))}
.he-n-couv .nx-cv h1{position:absolute;z-index:2;left:16px;right:16px;top:calc(env(safe-area-inset-top,0px) + 58px);margin:0!important;color:#fff!important;font-size:64px!important;line-height:.86!important;text-transform:uppercase;letter-spacing:-.01em;text-shadow:0 4px 24px rgba(0,0,0,.35);animation:heMonte 1s both}
.he-n-couv .nx-cl{position:absolute;z-index:2;left:18px;bottom:96px;width:56%;font:600 13px/1.25 Jost,sans-serif;text-transform:uppercase;letter-spacing:.04em;text-shadow:0 2px 10px rgba(0,0,0,.5)}
.he-n-couv .nx-cl em{display:block;font:italic 400 30px/1 "Playfair Display",Georgia,serif;text-transform:none;color:color-mix(in srgb,var(--acc) 40%,#fff)}
.he-n-couv .nx-cl span{display:block;margin-top:10px;font-weight:400;font-size:11px;letter-spacing:.14em}
.he-n-couv .nx-bc{position:absolute;z-index:2;right:16px;bottom:22px;background:#fff;padding:6px 8px 4px;color:#111;font:500 8px Jost;letter-spacing:.2em;text-align:center}
.he-n-couv .nx-bc i{display:block;width:74px;height:30px;background:repeating-linear-gradient(90deg,#111 0 2px,#fff 2px 3px,#111 3px 4px,#fff 4px 6px,#111 6px 9px,#fff 9px 10px)}
.he-n-couv .nx-ex{position:absolute;z-index:2;right:16px;top:calc(env(safe-area-inset-top,0px) + 30px);width:74px;height:74px;border-radius:50%;background:var(--acc);display:grid;place-items:center;font:600 10px/1.1 Jost;letter-spacing:.06em;text-transform:uppercase;transform:rotate(12deg);box-shadow:0 8px 20px -8px rgba(0,0,0,.6);animation:nEx 3s ease-in-out infinite}
@keyframes nEx{0%,100%{transform:rotate(12deg)}50%{transform:translateY(-6px) rotate(6deg)}}
.hent.he-n-couv>.he-txt{margin-top:-60px}
/* 3 Story */
.he-n-story .nx-st{position:relative;width:min(320px,84%);aspect-ratio:9/15;border-radius:26px;overflow:hidden;flex:none;box-shadow:0 26px 50px -22px rgba(0,0,0,.65);animation:heMonte 1s both;text-align:left}
.he-n-story .nx-st:after{content:"";position:absolute;inset:0;background:linear-gradient(rgba(0,0,0,.45),transparent 22%,transparent 72%,rgba(0,0,0,.55))}
.he-n-story .nx-bars{position:absolute;z-index:2;left:10px;right:10px;top:10px;display:flex;gap:4px}
.he-n-story .nx-bars i{flex:1;height:3px;border-radius:3px;background:rgba(255,255,255,.4);overflow:hidden}
.he-n-story .nx-bars i:first-child:after{content:"";display:block;height:100%;background:#fff;animation:nBarre 5s linear infinite}
@keyframes nBarre{from{width:0}to{width:100%}}
.he-n-story .nx-who{position:absolute;z-index:2;left:12px;top:24px;display:flex;align-items:center;gap:9px;color:#fff;font:600 13px Jost}
.he-n-story .nx-who .nx-av{width:34px;height:34px;border-radius:50%;padding:2px;background:conic-gradient(#F9CE34,#EE2A7B,#6228D7,#F9CE34)}
.he-n-story .nx-who .nx-av span{display:block;width:100%;height:100%;border-radius:50%;background-size:cover;background-position:center;border:2px solid #fff}
.he-n-story .nx-who small{font-weight:400;opacity:.8;margin-left:2px}
.he-n-story .nx-stk{position:absolute;z-index:2;left:50%;top:42%;transform:translateX(-50%) rotate(-4deg);background:#fff;color:#111;padding:8px 14px;border-radius:10px;font:600 12px Jost;letter-spacing:.06em;text-transform:uppercase;box-shadow:0 10px 24px -10px rgba(0,0,0,.5);white-space:nowrap;animation:nStk 3s ease-in-out infinite}
@keyframes nStk{0%,100%{transform:translateX(-50%) rotate(-4deg)}50%{transform:translateX(-50%) translateY(-8px) rotate(-4deg)}}
.he-n-story .nx-stk b{color:var(--acc)}
.he-n-story .nx-rep{position:absolute;z-index:2;left:12px;right:12px;bottom:12px;display:flex;gap:10px;align-items:center}
.he-n-story .nx-rep span{flex:1;border:1.5px solid rgba(255,255,255,.85);border-radius:99px;padding:9px 14px;color:#fff;font:400 12px Jost}
.he-n-story .nx-rep svg{width:24px;height:24px;fill:none;stroke:#fff;stroke-width:2}
.he-n-story .he-txt{margin-top:22px}
/* 4 Flacon de vernis */
.he-n-flacon .nx-fl{position:relative;width:min(270px,70%);flex:none;display:flex;flex-direction:column;align-items:center;animation:heMonte 1s both;margin-bottom:8px}
.he-n-flacon .nx-bouchon{width:38%;height:96px;border-radius:12px 12px 6px 6px;background:linear-gradient(90deg,#111,#3a3a3a 30%,#111 55%,#000);box-shadow:inset 0 -6px 0 rgba(255,255,255,.08)}
.he-n-flacon .nx-col{width:46%;height:14px;background:rgba(255,255,255,.55);border-radius:3px;margin-top:-2px;backdrop-filter:blur(4px)}
.he-n-flacon .nx-verre{position:relative;width:100%;height:330px;border-radius:44px 44px 54px 54px;overflow:hidden;box-shadow:0 0 0 7px rgba(255,255,255,.55),0 28px 50px -22px rgba(0,0,0,.6)}
.he-n-flacon .nx-verre:after{content:"";position:absolute;top:18px;left:16px;width:22px;height:70%;border-radius:20px;background:linear-gradient(rgba(255,255,255,.75),rgba(255,255,255,0));filter:blur(1px)}
.he-n-flacon .nx-verre:before{content:"";position:absolute;z-index:2;top:-20%;left:0;width:30%;height:140%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);animation:nBrille 4.5s ease-in-out infinite}
.he-n-flacon .nx-lab{position:absolute;z-index:3;left:50%;bottom:28px;transform:translateX(-50%);width:76%;background:var(--papier,#fff);border-radius:10px;padding:10px 10px 8px;box-shadow:0 10px 20px -10px rgba(0,0,0,.45)}
.he-n-flacon .nx-lab h1{font-size:26px!important;margin:0!important;line-height:1!important;color:var(--noir)}
.he-n-flacon .nx-lab small{display:block;font:500 8.5px Jost;letter-spacing:.3em;text-transform:uppercase;color:var(--gris,#8c847d);margin-top:5px}
.he-n-flacon .he-txt{margin-top:18px}
/* 5 Grand ongle */
.he-n-ongle .nx-on{position:relative;width:min(230px,60%);aspect-ratio:.56;flex:none;transform:rotate(-7deg);animation:nPose 1s both;--r:-7deg;margin:0 0 18px;filter:drop-shadow(4px 0 0 #fff) drop-shadow(-4px 0 0 #fff) drop-shadow(0 4px 0 #fff) drop-shadow(0 -4px 0 #fff) drop-shadow(0 26px 26px rgba(0,0,0,.45))}
.he-n-ongle .nx-on .nx-forme{position:absolute;inset:0;clip-path:url(#nOngle);overflow:hidden}
.he-n-ongle .nx-on .nx-forme:after{content:"";position:absolute;z-index:2;top:12%;left:18%;width:13%;height:52%;border-radius:50%;background:linear-gradient(rgba(255,255,255,.9),rgba(255,255,255,0));transform:rotate(6deg)}
.he-n-ongle .nx-svgdef{position:absolute;width:0;height:0}
.he-n-ongle .nx-on .nx-forme:before{content:"";position:absolute;z-index:2;top:-20%;left:0;width:40%;height:140%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent);animation:nBrille 4s ease-in-out infinite}
/* 6 Néon */
.ecran .hent.he-n-neon,.ecran:has(>.fond-site) .hent.he-n-neon{background:radial-gradient(120% 70% at 50% 25%,#2a1f2b,#0c090d 70%)!important;color:#fff;padding-top:96px}
.he-n-neon h1{color:#fff!important;text-shadow:0 0 4px #fff,0 0 12px var(--neon),0 0 26px var(--neon),0 0 52px var(--neon);animation:nGresille 4s infinite;padding:0 18px;margin:0 0 22px!important}
@keyframes nGresille{0%,18%,22%,62%,64%,100%{opacity:1}20%,63%{opacity:.45}}
.he-n-neon .nx-nf{position:relative;width:min(300px,78%);height:330px;flex:none;border-radius:22px;padding:6px;box-shadow:0 0 0 2px #fff,0 0 14px 2px var(--neon),inset 0 0 14px 2px var(--neon);animation:heMonte 1s .2s both}
.he-n-neon .nx-nf .nx-in{position:absolute;inset:8px;border-radius:16px;overflow:hidden}
.he-n-neon .nx-ouv{margin-top:18px;font:500 12px Jost;letter-spacing:.4em;text-transform:uppercase;color:#fff;text-shadow:0 0 8px var(--neon),0 0 18px var(--neon)}
.he-n-neon .he-txt{margin-top:20px;color:var(--noir)}
.he-n-neon{--neon:color-mix(in srgb,var(--acc) 70%,#ff4fa3)}
/* 7 Profil Insta */
.he-n-feed .nx-pf{width:calc(100% - 32px);max-width:520px;background:var(--papier,#fff);border-radius:26px;padding:18px 14px 14px;box-shadow:0 20px 40px -24px rgba(0,0,0,.5);animation:heMonte 1s both;color:var(--noir)}
.he-n-feed .nx-top{display:flex;align-items:center;gap:14px;text-align:left;padding:0 4px}
.he-n-feed .nx-av{width:78px;height:78px;flex:none;border-radius:50%;padding:3px;background:conic-gradient(#F9CE34,#EE2A7B,#6228D7,#F9CE34)}
.he-n-feed .nx-av span{display:block;width:100%;height:100%;border-radius:50%;border:3px solid var(--papier,#fff);background-size:cover;background-position:center}
.he-n-feed .nx-top h1{font-size:30px!important;margin:0 0 4px!important;line-height:1!important}
.he-n-feed .nx-top>div{min-width:0;flex:1}.he-n-feed .nx-id{display:block;font:600 17px/1.15 Jost,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:3px}
.he-n-feed .nx-top small{font:400 12px Jost;color:var(--gris,#8c847d)}
.he-n-feed .nx-stats{display:flex;justify-content:space-around;margin:14px 0 12px;font:400 11px Jost;color:var(--gris,#8c847d)}
.he-n-feed .nx-stats b{display:block;font:600 16px Jost;color:var(--noir)}
.he-n-feed .nx-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;border-radius:14px;overflow:hidden}
.he-n-feed .nx-grid div{position:relative;aspect-ratio:4/5;overflow:hidden;animation:nPose .7s both}
.he-n-feed .nx-grid div:nth-child(2){animation-delay:.08s}.he-n-feed .nx-grid div:nth-child(3){animation-delay:.16s}.he-n-feed .nx-grid div:nth-child(4){animation-delay:.24s}.he-n-feed .nx-grid div:nth-child(5){animation-delay:.32s}.he-n-feed .nx-grid div:nth-child(6){animation-delay:.4s}
.he-n-feed .he-txt{margin-top:18px}
/* 8 Cœur */
.he-n-coeur .nx-cz{position:relative;width:min(320px,84%);aspect-ratio:1/.92;flex:none;margin:4px 0 10px;animation:nBat 2.6s ease-in-out infinite;filter:drop-shadow(0 0 0 #fff) drop-shadow(5px 0 0 #fff) drop-shadow(-5px 0 0 #fff) drop-shadow(0 5px 0 #fff) drop-shadow(0 -5px 0 #fff) drop-shadow(0 22px 22px rgba(0,0,0,.4))}
.he-n-coeur .nx-cz .nx-forme{position:absolute;inset:0;clip-path:path("M160 290 C 60 220 0 160 0 92 C 0 40 40 0 92 0 C 124 0 148 18 160 42 C 172 18 196 0 228 0 C 280 0 320 40 320 92 C 320 160 260 220 160 290 Z");overflow:hidden}
@keyframes nBat{0%,100%{transform:scale(1)}12%{transform:scale(1.04)}24%{transform:scale(.99)}36%{transform:scale(1.03)}}
.he-n-coeur .nx-pc{position:absolute;font-size:20px;color:var(--acc);animation:nMonteC 4s linear infinite;opacity:0}
@keyframes nMonteC{0%{opacity:0;transform:translateY(0) scale(.6)}15%{opacity:1}100%{opacity:0;transform:translateY(-140px) scale(1.1)}}
/* 9 Carte holo */
.he-n-holo .nx-ca{position:relative;width:min(290px,76%);aspect-ratio:5/7;flex:none;border-radius:20px;padding:8px;background:conic-gradient(from var(--a,0deg),#ff9ad5,#9be7ff,#c6a6ff,#fff3a6,#9bffcf,#ff9ad5);animation:nHolo 6s linear infinite,heMonte 1s both;box-shadow:0 28px 50px -22px rgba(0,0,0,.65);margin-bottom:6px}
@property --a{syntax:"<angle>";inherits:false;initial-value:0deg}
@keyframes nHolo{to{--a:360deg}}
.he-n-holo .nx-ca .nx-in{position:relative;height:100%;border-radius:14px;overflow:hidden;background:var(--papier,#fff);display:flex;flex-direction:column}
.he-n-holo .nx-bd{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;gap:8px;color:var(--noir)}
.he-n-holo .nx-bd h1{font-size:22px!important;margin:0!important;line-height:1!important;text-align:left}
.he-n-holo .nx-bd b{font:600 12px Jost;white-space:nowrap}
.he-n-holo .nx-fen{position:relative;flex:1;margin:0 10px;border-radius:8px;overflow:hidden;box-shadow:inset 0 0 0 3px color-mix(in srgb,var(--acc) 50%,#fff)}
.he-n-holo .nx-fen:after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.55) 45%,rgba(180,140,255,.35) 52%,transparent 66%);background-size:250% 100%;animation:nReflet 3.5s ease-in-out infinite;mix-blend-mode:screen}
@keyframes nReflet{0%{background-position:120% 0}100%{background-position:-120% 0}}
.he-n-holo .nx-bas{padding:8px 12px 10px;font:500 9px Jost;letter-spacing:.24em;text-transform:uppercase;color:var(--gris,#8c847d);text-align:left}
.he-n-holo .nx-bas i{float:right;font-style:normal;letter-spacing:.05em}
/* 10 Pellicule */
.he-n-pellicule h1{padding:6px 22px 10px;margin:10px 18px 18px!important;background:var(--papier,#fff);border-radius:18px;box-shadow:0 14px 26px -16px rgba(0,0,0,.5)}
.he-n-pellicule>.kick{background:var(--papier,#fff);color:var(--noir);padding:7px 14px;border-radius:99px;opacity:1}
.he-n-pellicule .nx-film{position:relative;width:100%;height:250px;flex:none;background:#141414;overflow:hidden;transform:rotate(-3deg);margin:6px 0 26px;box-shadow:0 22px 40px -22px rgba(0,0,0,.6)}
.he-n-pellicule .nx-film:before,.he-n-pellicule .nx-film:after{content:"";position:absolute;left:0;right:0;height:16px;background:repeating-linear-gradient(90deg,transparent 0 10px,#f4efe9 10px 22px,transparent 22px 30px);background-size:30px 10px;background-repeat:repeat-x;background-position:0 3px;z-index:2}
.he-n-pellicule .nx-film:before{top:2px}.he-n-pellicule .nx-film:after{bottom:2px}
.he-n-pellicule .nx-rail{position:absolute;top:24px;bottom:24px;left:0;display:flex;gap:10px;animation:nDefile 22s linear infinite}
.he-n-pellicule .nx-rail div{position:relative;width:160px;height:100%;flex:none;border-radius:3px;overflow:hidden}
@keyframes nDefile{to{transform:translateX(-50%)}}
`;
/* capture automatique : on montre l'état final (sans l'animation d'entrée) */
let css2=css;try{if(new URLSearchParams(location.search).has("capt"))css2+=`.hent[class*="he-n-"] .nx-pp,.hent[class*="he-n-"] .nx-st,.hent[class*="he-n-"] .nx-fl,.hent[class*="he-n-"] .nx-on,.hent[class*="he-n-"] .nx-nf,.hent[class*="he-n-"] .nx-pf,.hent[class*="he-n-"] .nx-grid div,.hent[class*="he-n-"] .nx-cv h1{animation:none!important;opacity:1!important}.hent[class*="he-n-"] .nx-ca{animation:nHolo 6s linear infinite!important}`}catch(e){}
const st=document.createElement("style");st.id="entetes-plus";st.textContent=css2;document.head.appendChild(st);

const vieux=window.entete;
window.entete=function(k,t,lang){
  if(!NOUV.some(e=>e[0]===k))return vieux(k,t,lang);
  const ph=x=>`<div class="he-ph" style="background-image:url('${P(x)}')"></div>`,N=(D.nails&&D.nails.length?D.nails:[D.hero]);
  const n=i=>N[i%N.length];
  const kick=`<div class="kick">${t.type} · ${D.ville}</div>`,note=D.nb?`<div class="note"><span class="et">${etoiles}</span>${D.note} · ${D.nb} ${t.avisG}</div>`:"";
  const btn=`<button class="he-btn" data-res>${t.creneau}${creneau(t)?`<small>${t.dispo} : ${creneau(t)}</small>`:""}</button>`;
  const nom=`<h1>${D.nom}</h1>`,txt=(h=true)=>`<div class="he-txt">${kick}${h?nom:""}${note}${btn}</div>`;
  const c=`hent he-n-${k}`;
  if(k==="polaroids")return `<div class="${c}" data-s="accueil"><div class="nx-pz">${[n(1),n(2),D.hero].map((x,i)=>`<div class="nx-pp">${i===2?'<span class="nx-tape"></span>':""}<div class="nx-ph">${ph(x)}</div>${i===2?`<b>${D.ville} ♡</b>`:""}</div>`).join("")}</div>${txt()}</div>`;
  if(k==="couv")return `<div class="${c}" data-s="accueil"><div class="nx-cv">${ph(D.hero)}<div class="nx-ex">Nouvelle<br>saison</div><div class="nx-cl"><em>Nail art</em>Les tendances qui font craquer ${D.ville}<span>Réservation en ligne · 24 h/24</span></div><div class="nx-bc"><i></i>N° 1</div></div>${txt()}</div>`;   /* 18/11 (Marie) : le nom écrit dans le carré, comme les autres */
  if(k==="story")return `<div class="${c}" data-s="accueil"><div class="nx-st">${ph(D.hero)}<div class="nx-bars"><i></i><i></i><i></i></div><div class="nx-who"><span class="nx-av"><span style="background-image:url('${P(n(0))}')"></span></span>${D.nom}<small>2 h</small></div><div class="nx-stk">Créneaux <b>dispo</b> ✦</div><div class="nx-rep"><span>Envoyer un message…</span><svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.5-9.2C1 8.3 3.4 4.5 7 4.5c2 0 3.6 1.2 5 3 1.4-1.8 3-3 5-3 3.6 0 6 3.8 4.5 7.3C19.5 16.4 12 21 12 21z"/></svg></div></div>${txt()}</div>`;
  if(k==="flacon")return `<div class="${c}" data-s="accueil"><div class="nx-fl"><div class="nx-bouchon"></div><div class="nx-col"></div><div class="nx-verre">${ph(D.hero)}<div class="nx-lab">${nom}<small>${D.ville}</small></div></div></div>${`<div class="he-txt">${kick}${note}${btn}</div>`}</div>`;
  if(k==="ongle")return `<div class="${c}" data-s="accueil"><svg class="nx-svgdef" aria-hidden="true"><clipPath id="nOngle" clipPathUnits="objectBoundingBox"><path d="M.5,0 C.6,0 .97,.3 1,.62 L1,.9 Q1,.99 .86,1 Q.5,.95 .14,1 Q0,.99 0,.9 L0,.62 C.03,.3 .4,0 .5,0Z"/></clipPath></svg><div class="nx-on"><div class="nx-forme">${ph(D.hero)}</div></div>${txt()}</div>`;
  if(k==="neon")return `<div class="${c}" data-s="accueil">${nom}<div class="nx-nf"><div class="nx-in">${ph(D.hero)}</div></div><div class="nx-ouv">Ouvert</div>${`<div class="he-txt">${kick}${note}${btn}</div>`}</div>`;
  if(k==="feed")return `<div class="${c}" data-s="accueil"><div class="nx-pf"><div class="nx-top"><span class="nx-av"><span style="background-image:url('${P(D.hero)}')"></span></span><div><b class="nx-id">${D.nom}</b><small>${t.type} · ${D.ville}</small></div></div><div class="nx-stats"><span><b>${D.note||"5,0"}</b>note</span><span><b>${D.nb||3}</b>avis</span><span><b>0 %</b>commission</span></div><div class="nx-grid">${[D.hero,n(0),n(1),n(2),n(3),n(4)].map(x=>`<div>${ph(x)}</div>`).join("")}</div></div>${`<div class="he-txt">${nom}${note}${btn}</div>`}</div>`;   /* 18/11 (Marie) : le nom ne sort plus : petit en haut, grand dans le carré */
  if(k==="coeur")return `<div class="${c}" data-s="accueil"><div class="nx-cz"><div class="nx-forme">${ph(D.hero)}</div></div>${[[8,"0s"],[86,"1.3s"],[20,"2.4s"],[74,"3.1s"]].map(([x,d])=>`<span class="nx-pc" style="left:${x}%;top:340px;animation-delay:${d}">♥</span>`).join("")}${txt()}</div>`;
  if(k==="holo")return `<div class="${c}" data-s="accueil"><div class="nx-ca"><div class="nx-in"><div class="nx-bd">${nom}<b>★ ${D.note||"5,0"}</b></div><div class="nx-fen">${ph(D.hero)}</div><div class="nx-bas">${t.type}<i>${D.ville}</i></div></div></div>${`<div class="he-txt">${note}${btn}</div>`}</div>`;
  if(k==="pellicule"){const L=[D.hero,n(0),n(1),n(2),n(3)];const r=L.concat(L).map(x=>`<div>${ph(x)}</div>`).join("");
    return `<div class="${c}" data-s="accueil">${kick}${nom}<div class="nx-film"><div class="nx-rail">${r}</div></div>${`<div class="he-txt">${note}${btn}</div>`}</div>`;}
  return "";
};
try{const k=enteteChoisie();if(NOUV.some(e=>e[0]===k)){const ok=window.__changeEntete&&window.__changeEntete();if(!ok)setTimeout(()=>window.__changeEntete&&window.__changeEntete(),600)}}catch(e){}
})();
