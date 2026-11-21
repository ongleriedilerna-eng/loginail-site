/* 16/11 (Marie) : série 10 — 10 en-têtes qui bougent EN PERMANENCE (pas seulement à l'ouverture), UNE seule photo. Maquette. */
(function(){
/* 16/11 : seules les en-têtes choisies par Marie restent proposées */
const NOUV=[["levitation", "Lévitation"], ["live", "En direct"], ["pendentif", "Pendentif"], ["foil", "Reflet holographique"], ["cadre", "Photo encadrée"]];   /* 18/11 (Marie) : « cadre » = le Reflet holographique SANS reflet (en-tête de départ) */
try{NOUV.forEach(e=>{if(!ENTETES.some(x=>x[0]===e[0]))ENTETES.push(e)})}catch(e){}
const capt=/[?&]capt/.test(location.search);
const OR="linear-gradient(135deg,#6f4a12 0%,#f8e7a6 18%,#b8862b 34%,#fff4c4 50%,#a8761f 66%,#f3d98a 82%,#6f4a12 100%)";
let css=`
.hent[class*="he-w-"]{justify-content:flex-start;padding:84px 0 44px}
.hent[class*="he-w-"] .he-ph{position:absolute;inset:0;background-size:cover;background-position:center}
.hent[class*="he-w-"] .he-txt{position:relative;z-index:6}
@keyframes wTour{to{transform:rotate(360deg)}}
.wx-cad{position:relative;width:calc(100% - 40px);max-width:520px;height:clamp(380px,56vh,500px);flex:none;border-radius:26px;overflow:hidden;box-shadow:0 26px 46px -22px rgba(0,0,0,.6);margin-bottom:18px}
/* 1 Photo liquide : la photo ondule comme la surface de l'eau, sans arrêt */
.he-w-liquide .wx-cad .he-ph{filter:url(#wxEau);inset:-14px}
/* 2 Lévitation */
.he-w-levitation{perspective:900px}
.he-w-levitation .wx-lv{position:relative;width:min(280px,76%);aspect-ratio:3/4;flex:none;margin:14px 0 40px;animation:wFlotte 4s ease-in-out infinite;transform-style:preserve-3d}
@keyframes wFlotte{0%,100%{transform:translateY(0) rotateX(6deg) rotateY(-10deg)}50%{transform:translateY(-22px) rotateX(-4deg) rotateY(10deg)}}
.he-w-levitation .wx-lv>div{position:absolute;inset:0;border-radius:22px;overflow:hidden;box-shadow:0 0 0 4px rgba(255,255,255,.85)}
.he-w-levitation .wx-om{width:200px;height:26px;flex:none;margin:-26px 0 24px;border-radius:50%;background:radial-gradient(rgba(0,0,0,.45),transparent 70%);animation:wOmbre 4s ease-in-out infinite}
@keyframes wOmbre{0%,100%{transform:scale(1);opacity:.9}50%{transform:scale(.7);opacity:.45}}
.he-w-levitation .wx-ha{position:absolute;inset:-30px;border-radius:40px;background:radial-gradient(color-mix(in srgb,var(--acc) 50%,transparent),transparent 70%);filter:blur(10px);z-index:-1;animation:wHalo 4s ease-in-out infinite}
@keyframes wHalo{50%{opacity:.4;transform:scale(1.1)}}
/* 3 En direct */
.he-w-live .wx-badge{position:absolute;z-index:4;left:14px;top:14px;display:flex;gap:8px}
.he-w-live .wx-badge span{padding:6px 10px;border-radius:6px;font:700 11px Jost;letter-spacing:.12em;color:#fff}
.he-w-live .wx-badge .wx-rouge{background:#ff2d55;animation:wClig 1.2s steps(1) infinite}
.he-w-live .wx-badge .wx-vue{background:rgba(0,0,0,.55)}
@keyframes wClig{50%{opacity:.55}}
.he-w-live .wx-co{position:absolute;z-index:4;right:16px;bottom:16px;width:60px;height:300px;pointer-events:none}
.he-w-live .wx-co i{position:absolute;bottom:0;left:18px;font-style:normal;font-size:24px;animation:wMonteC 3.2s ease-in infinite;opacity:0}
@keyframes wMonteC{0%{transform:translate(0,0) scale(.5);opacity:0}10%{opacity:1}100%{transform:translate(var(--dx),-290px) scale(1.2);opacity:0}}
.he-w-live .wx-msg{position:absolute;z-index:4;left:14px;bottom:14px;width:62%;display:flex;flex-direction:column;gap:6px;height:118px;overflow:hidden;justify-content:flex-end}
.he-w-live .wx-msg div{background:rgba(0,0,0,.45);color:#fff;font:400 12.5px Jost;padding:6px 10px;border-radius:14px;width:fit-content;animation:wDefMsg 8s linear infinite}
@keyframes wDefMsg{0%{transform:translateY(130px)}100%{transform:translateY(-200px)}}
/* 4 Pendentif */
.he-w-pendentif .wx-pd{position:relative;flex:none;width:min(260px,70%);margin:0 0 26px;transform-origin:50% -150px;animation:wBalance 3.4s ease-in-out infinite}
@keyframes wBalance{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}
.he-w-pendentif .wx-ch{position:absolute;left:50%;bottom:100%;width:10px;height:150px;margin-left:-5px;background:radial-gradient(ellipse 4px 6px at 50% 50%,transparent 2px,#d9b86a 2.5px,#8a6a2a 4px,transparent 4.5px) 0 0/10px 11px repeat-y}
.he-w-pendentif .wx-an{position:absolute;left:50%;top:-22px;width:30px;height:30px;margin-left:-15px;border-radius:50%;border:5px solid #d9b86a;z-index:2}
.he-w-pendentif .wx-me{position:relative;aspect-ratio:3/4;border-radius:50%;padding:12px;background:${OR};background-size:200% 200%;animation:wOr 3s linear infinite;box-shadow:0 26px 40px -16px rgba(0,0,0,.6)}
@keyframes wOr{to{background-position:200% 0}}
.he-w-pendentif .wx-me>div{position:relative;width:100%;height:100%;border-radius:50%;overflow:hidden}
.he-w-pendentif .wx-me>div:after{content:"";position:absolute;inset:-20%;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.5) 50%,transparent 60%);animation:wReflet 3.4s ease-in-out infinite}
@keyframes wReflet{from{transform:translateX(-50%)}to{transform:translateX(50%)}}
.he-w-pendentif .wx-hd{height:70px}
/* 5 Égaliseur */
.he-w-egaliseur .wx-eq{position:absolute;z-index:3;left:0;right:0;bottom:0;height:120px;display:flex;align-items:flex-end;gap:4px;padding:0 10px 12px;background:linear-gradient(transparent,rgba(0,0,0,.5))}
.he-w-egaliseur .wx-eq i{flex:1;border-radius:4px 4px 2px 2px;background:linear-gradient(#fff,var(--acc));transform-origin:bottom;animation:wBarre .9s ease-in-out infinite alternate;box-shadow:0 0 8px color-mix(in srgb,var(--acc) 60%,transparent)}
@keyframes wBarre{from{transform:scaleY(.15)}to{transform:scaleY(1)}}
.he-w-egaliseur .wx-pl{position:absolute;z-index:3;left:14px;top:14px;display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.88);border-radius:99px;padding:6px 12px 6px 6px;font:600 12px Jost;color:#1E1C1B}
.he-w-egaliseur .wx-pl b{width:24px;height:24px;border-radius:50%;background:var(--acc);display:grid;place-items:center;color:#fff;font-size:10px}
/* 6 Damier qui ondule */
.he-w-damier .wx-dm{position:absolute;inset:0;z-index:0;overflow:hidden}
.he-w-damier .wx-dm div{position:absolute;inset:-30%;background:conic-gradient(var(--acc) 25%,#fff 0 50%,var(--acc) 0 75%,#fff 0) 0 0/64px 64px;filter:url(#wxVague);animation:wDam 8s linear infinite;opacity:.85}
@keyframes wDam{to{transform:translate(64px,64px)}}
.he-w-damier .wx-cad{z-index:2;box-shadow:0 0 0 6px #fff,0 26px 46px -22px rgba(0,0,0,.55)}
/* 7 Lampe à lave */
.he-w-lavalampe .wx-lp{position:relative;width:min(290px,78%);flex:none;margin:6px 0 24px}
.he-w-lavalampe .wx-ch2{position:absolute;inset:0;z-index:1;border-radius:46% 46% 26px 26px/20% 20% 26px 26px;overflow:hidden;background:linear-gradient(color-mix(in srgb,var(--acc) 30%,#1a0b24),#1a0b24)}
.he-w-lavalampe .wx-bl{position:absolute;border-radius:50%;filter:blur(6px);background:radial-gradient(circle at 40% 35%,#ffd1f0,var(--acc) 60%);animation:wLave ease-in-out infinite alternate;mix-blend-mode:screen}
@keyframes wLave{0%{transform:translateY(110%) scale(.8,1.1)}50%{transform:translateY(20%) scale(1.15,.9)}100%{transform:translateY(-90%) scale(.9,1.2)}}
.he-w-lavalampe .wx-ph2{position:relative;z-index:2;margin:44px 30px 60px;aspect-ratio:3/4;border-radius:50% 50% 20px 20px/26% 26% 20px 20px;overflow:hidden;box-shadow:0 0 0 3px rgba(255,255,255,.7),0 0 30px 6px color-mix(in srgb,var(--acc) 50%,transparent);opacity:.94}
.he-w-lavalampe .wx-ca{position:absolute;z-index:3;left:24%;right:24%;height:30px;background:${OR};border-radius:6px}
.he-w-lavalampe .wx-ca.h{top:-14px}.he-w-lavalampe .wx-ca.b{bottom:-14px;left:16%;right:16%;height:36px;border-radius:6px 6px 16px 16px}
.he-w-lavalampe .wx-lp{aspect-ratio:auto}
/* 8 Cadre scintillant */
.he-w-scintille .wx-sc{position:relative;width:calc(100% - 40px);max-width:520px;height:clamp(380px,56vh,500px);flex:none;margin-bottom:18px;padding:12px;border-radius:30px;background:${OR};background-size:200% 200%;animation:wOr 4s linear infinite;box-shadow:0 26px 46px -22px rgba(0,0,0,.6)}
.he-w-scintille .wx-sc>div{position:relative;height:100%;border-radius:20px;overflow:hidden}
.he-w-scintille .wx-st{position:absolute;z-index:3;width:16px;height:16px;margin:-8px;color:#fff;font-size:16px;line-height:16px;text-align:center;text-shadow:0 0 8px #fff,0 0 14px #ffe9a8;animation:wScint 1.8s ease-in-out infinite}
@keyframes wScint{0%,100%{opacity:0;transform:scale(.2) rotate(0)}50%{opacity:1;transform:scale(1.2) rotate(90deg)}}
/* 9 Mosaïque qui défile */
.he-w-mosaique .wx-mo{position:absolute;inset:0;z-index:0;overflow:hidden}
.he-w-mosaique .wx-rg{position:absolute;left:-10%;width:120%;display:flex;gap:10px;animation:wMo 30s linear infinite}
.he-w-mosaique .wx-rg.b{animation-direction:reverse}
.he-w-mosaique .wx-rg div{position:relative;flex:none;width:120px;height:150px;border-radius:14px;overflow:hidden;opacity:.55;filter:saturate(.8)}
@keyframes wMo{from{transform:translateX(0)}to{transform:translateX(-650px)}}
.he-w-mosaique .wx-cad{z-index:2;width:min(290px,78%);height:auto;aspect-ratio:3/4;box-shadow:0 0 0 6px #fff,0 30px 50px -18px rgba(0,0,0,.7)}
/* 10 Reflet holographique */
.he-w-foil .wx-cad{box-shadow:0 0 0 6px transparent,0 26px 46px -22px rgba(0,0,0,.5)}
.he-w-foil .wx-fo{position:absolute;inset:0;z-index:2;background:linear-gradient(115deg,rgba(255,120,200,.0) 20%,rgba(255,120,200,.45) 32%,rgba(120,220,255,.45) 42%,rgba(190,140,255,.45) 52%,rgba(255,240,150,.4) 62%,rgba(255,255,255,0) 74%);background-size:260% 100%;mix-blend-mode:color-dodge;animation:wFoil 4s ease-in-out infinite alternate}
@keyframes wFoil{from{background-position:110% 0}to{background-position:-10% 0}}
.he-w-foil .wx-bd{position:absolute;inset:-6px;z-index:-1;border-radius:32px;background:conic-gradient(from var(--angw,0deg),#ff9ad5,#9be7ff,#c6a6ff,#fff3a6,#9bffcf,#ff9ad5);animation:wAng 5s linear infinite}
@property --angw{syntax:"<angle>";inherits:false;initial-value:0deg}
@keyframes wAng{to{--angw:360deg}}
.he-w-foil .wx-wrap{position:relative;width:calc(100% - 40px);max-width:520px;flex:none;margin-bottom:18px}
.he-w-foil .wx-wrap .wx-cad{width:100%;margin:0}
/* 11 Photo encadrée (18/11) : la même carte que le Reflet holographique, sans reflet ni contour irisé */
.he-w-cadre .wx-cad{box-shadow:0 0 0 5px rgba(255,255,255,.95),0 26px 46px -22px rgba(0,0,0,.45)}
`;
if(capt)css+=`.hent[class*="he-w-"] *{animation-delay:-1.3s!important;animation-play-state:paused!important}`;
const st=document.createElement("style");st.id="entetes-plus10";st.textContent=css;document.head.appendChild(st);
/* filtres SVG (eau + vagues) animés en continu */
const sv=document.createElement("div");sv.style.cssText="position:absolute;width:0;height:0;overflow:hidden";
sv.innerHTML=`<svg width="0" height="0"><filter id="wxEau"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" seed="3" result="t"><animate attributeName="baseFrequency" dur="9s" values="0.012 0.03;0.02 0.045;0.012 0.03" repeatCount="indefinite"/></feTurbulence><feDisplacementMap in="SourceGraphic" in2="t" scale="22"/></filter>
<filter id="wxVague"><feTurbulence type="turbulence" baseFrequency="0.006 0.012" numOctaves="1" result="t"><animate attributeName="baseFrequency" dur="7s" values="0.006 0.012;0.01 0.02;0.006 0.012" repeatCount="indefinite"/></feTurbulence><feDisplacementMap in="SourceGraphic" in2="t" scale="60"/></filter></svg>`;
document.body.appendChild(sv);

const vieux=window.entete;
window.entete=function(k,t,lang){
  if(!NOUV.some(e=>e[0]===k))return vieux(k,t,lang);
  const ph=`<div class="he-ph" style="background-image:url('${P(D.hero)}')"></div>`;
  const kick=`<div class="kick">${t.type} · ${D.ville}</div>`,note=D.nb?`<div class="note"><span class="et">${etoiles}</span>${D.note} · ${D.nb} ${t.avisG}</div>`:"";
  const btn=`<button class="he-btn" data-res>${t.creneau}${creneau(t)?`<small>${t.dispo} : ${creneau(t)}</small>`:""}</button>`;
  const nom=`<h1>${D.nom}</h1>`,txt=()=>`<div class="he-txt">${kick}${nom}${note}${btn}</div>`;
  const c=`hent he-w-${k}`,H=x=>`<div class="${c}" data-s="accueil">${x}</div>`,R=(n,f)=>Array.from({length:n},(_,i)=>f(i)).join("");
  const cad=x=>`<div class="wx-cad">${ph}${x||""}</div>`;
  if(k==="liquide")return H(cad()+txt());
  if(k==="levitation")return H(`<div class="wx-lv"><span class="wx-ha"></span><div>${ph}</div></div><span class="wx-om"></span>${txt()}`);
  if(k==="live"){const em=["♥","💅","✨","♥","😍","♥"];const M=["Trop beau 😍","Dispo samedi ?","Je veux les mêmes 💅","Wow ✨","Je réserve !","Sublime ♥"];
    return H(cad(`<div class="wx-badge"><span class="wx-rouge">● EN DIRECT</span><span class="wx-vue">👁 1,2 k</span></div><div class="wx-co">${R(10,i=>`<i style="--dx:${((i*17)%40)-20}px;animation-delay:${-(i*.33)}s;color:${i%2?"#ff4f8b":"#fff"}">${em[i%6]}</i>`)}</div><div class="wx-msg">${R(6,i=>`<div style="animation-delay:${-(i*1.33)}s">${M[i]}</div>`)}</div>`)+txt());}
  if(k==="pendentif")return H(`<div class="wx-hd"></div><div class="wx-pd"><span class="wx-ch"></span><span class="wx-an"></span><div class="wx-me"><div>${ph}</div></div></div>${txt()}`);
  if(k==="egaliseur")return H(cad(`<div class="wx-pl"><b>▶</b>Ma playlist du salon</div><div class="wx-eq">${R(22,i=>`<i style="animation-duration:${.45+((i*37)%50)/100}s;animation-delay:${-(i*.13)}s;height:${40+((i*29)%60)}%"></i>`)}</div>`)+txt());
  if(k==="damier")return H(`<div class="wx-dm"><div></div></div>${cad()}${txt()}`);
  if(k==="lavalampe")return H(`<div class="wx-lp"><div class="wx-ch2">${R(6,i=>`<span class="wx-bl" style="left:${(i*29)%70}%;bottom:0;width:${70+(i*23)%60}px;height:${80+(i*31)%70}px;animation-duration:${7+(i%4)*2}s;animation-delay:${-(i*1.6)}s"></span>`)}</div><span class="wx-ca h"></span><div class="wx-ph2">${ph}</div><span class="wx-ca b"></span></div>${txt()}`);
  if(k==="scintille"){const pos=[];for(let i=0;i<10;i++)pos.push([i*10+5,0],[i*10+5,100]);for(let i=1;i<9;i++)pos.push([0,i*11],[100,i*11]);
    return H(`<div class="wx-sc"><div>${ph}</div>${pos.map(([x,y],i)=>`<span class="wx-st" style="left:${x}%;top:${y}%;animation-delay:${-((i*.37)%1.8)}s">✦</span>`).join("")}</div>${txt()}`);}
  if(k==="mosaique"){const rg=(top,b)=>`<div class="wx-rg${b?" b":""}" style="top:${top}px">${R(12,i=>`<div style="filter:${["none","sepia(.4)","grayscale(.6)","saturate(1.4)"][i%4]}">${ph}</div>`)}</div>`;
    return H(`<div class="wx-mo">${rg(10)}${rg(170,1)}${rg(330)}${rg(490,1)}</div>${cad()}${txt()}`);}
  if(k==="cadre")return H(cad()+txt());
  if(k==="foil")return H(`<div class="wx-wrap"><span class="wx-bd"></span>${cad('<span class="wx-fo"></span>')}</div>${txt()}`);
  return "";
};
try{const k=enteteChoisie();if(NOUV.some(e=>e[0]===k)){const ok=window.__changeEntete&&window.__changeEntete();if(!ok)setTimeout(()=>window.__changeEntete&&window.__changeEntete(),600)}}catch(e){}
})();
