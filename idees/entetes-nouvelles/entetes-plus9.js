/* 16/11 (Marie) : série 9 — 20 en-têtes « waouh » (lumière, 3D, particules, matières), UNE seule photo. Maquette (projet non touché). */
(function(){
/* 16/11 : seules les en-têtes choisies par Marie restent proposées */
const NOUV=[["brume", "Brume colorée"], ["lueurs", "Lueurs de film"], ["trace", "Trait de lumière"], ["coeurparticules", "Cœur d'étincelles"]];
try{NOUV.forEach(e=>{if(!ENTETES.some(x=>x[0]===e[0]))ENTETES.push(e)})}catch(e){}
const capt=/[?&]capt/.test(location.search);
const OR="linear-gradient(135deg,#6f4a12 0%,#f8e7a6 18%,#b8862b 34%,#fff4c4 50%,#a8761f 66%,#f3d98a 82%,#6f4a12 100%)";
const NUIT=k=>`.ecran .hent.he-v-${k},.ecran:has(>.fond-site) .hent.he-v-${k}`;
let css=`
.hent[class*="he-v-"]{justify-content:flex-start;padding:84px 0 44px}
.hent[class*="he-v-"] .he-ph{position:absolute;inset:0;background-size:cover;background-position:center}
.hent[class*="he-v-"] .he-txt{position:relative;z-index:6}
@keyframes vMonte{from{opacity:0;transform:translateY(36px) scale(.94)}to{opacity:1;transform:none}}
@keyframes vTour{to{transform:rotate(360deg)}}
.vx-cad{position:relative;width:calc(100% - 40px);max-width:520px;height:clamp(380px,56vh,500px);flex:none;border-radius:26px;overflow:hidden;box-shadow:0 26px 46px -22px rgba(0,0,0,.6);margin-bottom:18px}
.vx-rd{position:relative;width:min(300px,80%);aspect-ratio:1;flex:none;margin:20px 0 26px}
.vx-ciel{position:absolute;inset:0;overflow:hidden;pointer-events:none}
/* 1 Portail */
${NUIT("portail")}{background:radial-gradient(70% 45% at 50% 34%,#2b1440,#0a0612 75%)!important;color:#fff}
.he-v-portail .vx-an{position:absolute;inset:-14px;border-radius:50%;background:conic-gradient(from 0deg,#ff5fd2,#7a5cff,#3fe0ff,#ffd56b,#ff5fd2);filter:blur(6px);animation:vTour 3s linear infinite}
.he-v-portail .vx-an2{position:absolute;inset:-34px;border-radius:50%;background:conic-gradient(from 180deg,transparent,#ff5fd2 20%,transparent 40%,#3fe0ff 60%,transparent 80%);filter:blur(16px);opacity:.8;animation:vTour 5s linear infinite reverse}
.he-v-portail .vx-in{position:absolute;inset:0;border-radius:50%;overflow:hidden;animation:vOuvre 6s cubic-bezier(.3,.8,.3,1) infinite}
@keyframes vOuvre{0%{clip-path:circle(0% at 50% 50%)}25%,90%{clip-path:circle(50% at 50% 50%)}100%{clip-path:circle(0% at 50% 50%)}}
.he-v-portail .he-txt{color:var(--noir)}
/* 2 Verre brisé */
.he-v-verre .vx-ec{position:absolute;inset:0;z-index:2;background:rgba(230,240,255,.55);backdrop-filter:blur(3px);box-shadow:inset 0 0 0 1px rgba(255,255,255,.7);animation:vTombe 6s cubic-bezier(.5,0,.8,.5) infinite}
@keyframes vTombe{0%,22%{transform:none;opacity:1}55%,100%{transform:translate(var(--x),620px) rotate(var(--r));opacity:0}}
.he-v-verre .vx-imp{position:absolute;z-index:3;left:50%;top:40%;width:24px;height:24px;margin:-12px;border-radius:50%;background:#fff;box-shadow:0 0 30px 14px #fff;opacity:0;animation:vImpact 6s infinite}
@keyframes vImpact{0%,19%{opacity:0;transform:scale(.2)}21%{opacity:1;transform:scale(1.6)}30%,100%{opacity:0}}
/* 3 Brume */
.he-v-brume .vx-br{position:absolute;z-index:2;width:70%;height:60%;border-radius:50%;filter:blur(30px);mix-blend-mode:screen;animation:vBrume 7s ease-in-out infinite}
@keyframes vBrume{0%{opacity:.95;transform:translate(0,0) scale(1.2)}45%,85%{opacity:0;transform:translate(var(--x),var(--y)) scale(1.8)}100%{opacity:.95;transform:translate(0,0) scale(1.2)}}
/* 4 Laser */
${NUIT("laser")}{background:radial-gradient(80% 50% at 50% 40%,#140b1f,#050308 75%)!important;color:#fff}
.he-v-laser .vx-lz{position:absolute;z-index:1;bottom:-20px;width:3px;height:900px;transform-origin:50% 100%;border-radius:2px;filter:drop-shadow(0 0 6px currentColor) drop-shadow(0 0 14px currentColor);background:linear-gradient(transparent,currentColor 60%,#fff);animation:vBal 3.4s ease-in-out infinite alternate}
@keyframes vBal{from{transform:rotate(var(--a))}to{transform:rotate(var(--b))}}
.he-v-laser .vx-cad{z-index:2;box-shadow:0 0 0 2px rgba(255,255,255,.7),0 0 40px 6px rgba(255,80,220,.45)}
.he-v-laser .he-txt{color:var(--noir)}
/* 5 Aurore */
${NUIT("aurore")}{background:linear-gradient(#071226,#0d1f3d 50%,#091527)!important;color:#fff}
.he-v-aurore .vx-au{position:absolute;left:-30%;right:-30%;height:240px;border-radius:50%;filter:blur(28px);mix-blend-mode:screen;opacity:.85;animation:vVoile 9s ease-in-out infinite alternate}
@keyframes vVoile{0%{transform:translateX(-12%) skewX(-12deg) scaleY(.8)}50%{transform:translateX(8%) skewX(10deg) scaleY(1.2)}100%{transform:translateX(-4%) skewX(-6deg) scaleY(.9)}}
.he-v-aurore .vx-pt{position:absolute;width:2px;height:2px;border-radius:50%;background:#fff;opacity:.8}
.he-v-aurore .vx-cad{z-index:2;border-radius:999px 999px 26px 26px;box-shadow:0 0 0 4px rgba(255,255,255,.8),0 0 50px 10px rgba(80,255,190,.35)}
.he-v-aurore .he-txt{color:var(--noir)}
/* 6 Galaxie */
${NUIT("galaxie")}{background:#05040c!important;color:#fff}
.he-v-galaxie .vx-ga{position:absolute;left:50%;top:250px;width:900px;height:900px;margin:-450px 0 0 -450px;border-radius:50%;
 background:radial-gradient(circle,rgba(255,240,255,.9) 0 2%,rgba(255,120,220,.5) 8%,transparent 30%),conic-gradient(from 0deg,transparent,rgba(160,110,255,.55) 10%,transparent 22%,rgba(255,110,200,.45) 35%,transparent 47%,rgba(110,200,255,.45) 60%,transparent 72%,rgba(255,200,120,.35) 85%,transparent);
 -webkit-mask:radial-gradient(circle,#000 10%,transparent 62%);mask:radial-gradient(circle,#000 10%,transparent 62%);filter:blur(4px);animation:vTour 40s linear infinite}
.he-v-galaxie .vx-pt{position:absolute;border-radius:50%;background:#fff;animation:vBrill 2.6s ease-in-out infinite}
@keyframes vBrill{0%,100%{opacity:.3}50%{opacity:1}}
.he-v-galaxie .vx-rd .vx-ph{position:absolute;inset:0;border-radius:50%;overflow:hidden;box-shadow:0 0 0 3px rgba(255,255,255,.85),0 0 60px 16px rgba(190,120,255,.5)}
.he-v-galaxie .he-txt{color:var(--noir)}
/* 7 Lueurs de film */
.he-v-lueurs .vx-lk{position:absolute;z-index:2;inset:0;mix-blend-mode:screen;animation:vLueur 5s ease-in-out infinite;background:radial-gradient(60% 50% at var(--x) 30%,rgba(255,120,40,.85),transparent 70%),radial-gradient(40% 60% at calc(100% - var(--x)) 80%,rgba(255,60,120,.6),transparent 70%)}
@keyframes vLueur{0%,100%{opacity:0;--x:0%}20%{opacity:1}50%{opacity:.4;--x:60%}70%{opacity:.9}}
@property --x{syntax:"<percentage>";inherits:false;initial-value:0%}
.he-v-lueurs .vx-gr{position:absolute;z-index:3;inset:0;opacity:.18;background:repeating-radial-gradient(circle at 30% 40%,#000 0 1px,transparent 1px 3px);animation:vGrain .3s steps(2) infinite}
@keyframes vGrain{50%{transform:translate(2px,-1px)}}
/* 8 Trait de lumière */
.he-v-trace .vx-tc{position:relative;width:calc(100% - 40px);max-width:520px;height:clamp(380px,56vh,500px);flex:none;margin-bottom:18px}
.he-v-trace .vx-tc>.vx-in{position:absolute;inset:0;border-radius:26px;overflow:hidden;box-shadow:0 26px 46px -22px rgba(0,0,0,.6)}
.he-v-trace svg{position:absolute;inset:-6px;width:calc(100% + 12px);height:calc(100% + 12px);overflow:visible;z-index:3}
.he-v-trace rect{fill:none;stroke-width:5;stroke-linecap:round;stroke-dasharray:22 78;animation:vCourt 2.4s linear infinite}
.he-v-trace rect.a{stroke:#fff;filter:drop-shadow(0 0 6px #fff) drop-shadow(0 0 14px var(--acc))}
.he-v-trace rect.b{stroke:var(--acc);stroke-width:3;opacity:.5;stroke-dasharray:none}
@keyframes vCourt{to{stroke-dashoffset:-100}}
/* 9 Tourbillon */
.he-v-vortex .vx-vo{position:absolute;inset:-60%;z-index:1;border-radius:50%;background:repeating-conic-gradient(from 0deg,color-mix(in srgb,var(--acc) 50%,#fff) 0 8deg,transparent 8deg 24deg);-webkit-mask:radial-gradient(circle,transparent 18%,#000 30%,transparent 62%);mask:radial-gradient(circle,transparent 18%,#000 30%,transparent 62%);animation:vTour 6s linear infinite;opacity:.8}
.he-v-vortex .vx-ph{position:absolute;inset:0;z-index:2;border-radius:50%;overflow:hidden;box-shadow:0 0 0 6px var(--papier,#fff),0 26px 40px -18px rgba(0,0,0,.6);animation:vAspire 6s cubic-bezier(.5,0,.3,1) infinite}
@keyframes vAspire{0%{transform:scale(0) rotate(-540deg)}30%,88%{transform:none}100%{transform:scale(0) rotate(360deg)}}
/* 10 Cube 3D */
.he-v-cube .vx-sc{width:240px;height:240px;flex:none;perspective:900px;margin:40px 0 50px}
.he-v-cube .vx-cu{position:relative;width:100%;height:100%;transform-style:preserve-3d;animation:vCube 10s cubic-bezier(.6,0,.4,1) infinite}
@keyframes vCube{0%,15%{transform:rotateX(-14deg) rotateY(-20deg)}25%,40%{transform:rotateX(-14deg) rotateY(-110deg)}50%,65%{transform:rotateX(-14deg) rotateY(-200deg)}75%,90%{transform:rotateX(-14deg) rotateY(-290deg)}100%{transform:rotateX(-14deg) rotateY(-380deg)}}
.he-v-cube .vx-fa{position:absolute;inset:0;border-radius:6px;overflow:hidden;backface-visibility:hidden;box-shadow:inset 0 0 0 3px rgba(255,255,255,.7)}
.he-v-cube .vx-fa.t{background:${OR};display:grid;place-items:center}
.he-v-cube .vx-fa.t span{font:600 12px Jost;letter-spacing:.3em;color:#6f4a12;text-transform:uppercase}
/* 11 Cœur d'étincelles */
.he-v-coeurparticules .vx-cp{position:absolute;inset:0;z-index:3;pointer-events:none}
.he-v-coeurparticules .vx-et{position:absolute;width:6px;height:6px;border-radius:50%;background:#fff;box-shadow:0 0 8px 2px var(--acc);animation:vCoeur 5s cubic-bezier(.3,.8,.3,1) infinite}
@keyframes vCoeur{0%{transform:translate(var(--sx),var(--sy)) scale(.4);opacity:0}10%{opacity:1}35%,75%{transform:translate(var(--hx),var(--hy)) scale(1);opacity:1}100%{transform:translate(var(--ex),var(--ey)) scale(.2);opacity:0}}
/* 12 Fleur qui éclot */
.he-v-eclosion .vx-fl{position:relative;width:min(310px,84%);aspect-ratio:1;flex:none;margin:16px 0 22px}
.he-v-eclosion .vx-pe{position:absolute;left:50%;top:50%;width:46%;height:56%;margin:-56% 0 0 -23%;transform-origin:50% 100%;border-radius:50% 50% 50% 50%/70% 70% 30% 30%;background:radial-gradient(120% 100% at 50% 100%,color-mix(in srgb,var(--acc) 70%,#fff),color-mix(in srgb,var(--acc) 30%,#fff));box-shadow:inset 0 -14px 20px rgba(0,0,0,.08);animation:vPetale 6s cubic-bezier(.3,.8,.3,1) infinite}
@keyframes vPetale{0%,6%{transform:rotate(var(--r)) scale(.4) translateY(30%)}30%,85%{transform:rotate(var(--r)) scale(1.18) translateY(-6%)}100%{transform:rotate(var(--r)) scale(.4) translateY(30%)}}
.he-v-eclosion .vx-co{position:absolute;inset:22%;border-radius:50%;overflow:hidden;z-index:2;box-shadow:0 0 0 5px #fff,0 12px 24px -8px rgba(0,0,0,.5);animation:vCoeurF 6s cubic-bezier(.3,.8,.3,1) infinite}
@keyframes vCoeurF{0%,6%{transform:scale(.2)}30%,85%{transform:scale(1)}100%{transform:scale(.2)}}
/* 13 Lumières floues */
.he-v-bokeh .vx-bk{position:absolute;border-radius:50%;filter:blur(2px);mix-blend-mode:screen;animation:vBokeh linear infinite}
@keyframes vBokeh{0%{transform:translate(0,0)}50%{transform:translate(var(--dx),-40px)}100%{transform:translate(0,0)}}
.he-v-bokeh .vx-cad .he-ph{animation:vNet 6s ease-in-out infinite}
@keyframes vNet{0%,100%{filter:blur(14px);transform:scale(1.08)}30%,80%{filter:blur(0);transform:scale(1)}}
/* 14 Nacre liquide */
.he-v-irise .vx-blob{position:absolute;z-index:0;left:50%;top:300px;width:560px;height:620px;margin:-310px 0 0 -280px;background:conic-gradient(from var(--ang2,0deg),#ffd1f0,#c8b8ff,#a8f0ff,#d4ffd8,#fff1b8,#ffd1f0);filter:blur(10px);animation:vBlob 8s ease-in-out infinite,vIri 6s linear infinite;opacity:.9}
@property --ang2{syntax:"<angle>";inherits:false;initial-value:0deg}
@keyframes vIri{to{--ang2:360deg}}
@keyframes vBlob{0%,100%{border-radius:42% 58% 63% 37%/45% 40% 60% 55%}33%{border-radius:60% 40% 35% 65%/58% 62% 38% 42%}66%{border-radius:38% 62% 52% 48%/38% 55% 45% 62%}}
.he-v-irise .vx-cad{z-index:2;box-shadow:0 0 0 5px rgba(255,255,255,.85),0 26px 46px -22px rgba(0,0,0,.5)}
/* 15 Mur de sequins */
.he-v-sequins .vx-sq{position:absolute;inset:0;z-index:2;display:grid;grid-template-columns:repeat(12,1fr);pointer-events:none}
.he-v-sequins .vx-sq i{aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,var(--acc) 45%,color-mix(in srgb,var(--acc) 50%,#000));box-shadow:0 1px 2px rgba(0,0,0,.3);animation:vSeq 7s ease-in-out infinite}
@keyframes vSeq{0%,8%{transform:rotateY(0);opacity:1}30%,82%{transform:rotateY(90deg);opacity:0}100%{transform:rotateY(0);opacity:1}}
/* 16 Papier déchiré */
.he-v-dechire .vx-pa{position:absolute;z-index:2;left:-2%;right:-2%;height:52%;background:var(--papier,#fff);filter:drop-shadow(0 6px 8px rgba(0,0,0,.25));animation:vDech 6s cubic-bezier(.6,0,.3,1) infinite}
.he-v-dechire .vx-pa.h{top:0;clip-path:polygon(0 0,100% 0,100% 88%,92% 96%,84% 86%,75% 98%,66% 87%,58% 97%,49% 85%,40% 96%,31% 86%,22% 98%,13% 87%,5% 96%,0 88%)}
.he-v-dechire .vx-pa.b{bottom:0;clip-path:polygon(0 12%,6% 3%,14% 14%,23% 2%,32% 13%,41% 4%,50% 15%,59% 3%,67% 13%,76% 2%,85% 14%,93% 4%,100% 12%,100% 100%,0 100%);--d:1}
@keyframes vDech{0%,12%{transform:none}40%,86%{transform:translateY(calc(-110% + var(--d,0) * 220%)) rotate(calc(-4deg + var(--d,0) * 8deg))}100%{transform:none}}
.he-v-dechire .vx-pa span{position:absolute;left:0;right:0;top:40%;text-align:center;font:600 12px Jost;letter-spacing:.4em;text-transform:uppercase;color:var(--noir)}
/* 17 Boule de cristal */
.he-v-cristal .vx-bc{position:relative;width:min(290px,78%);flex:none;margin:6px 0 22px}
.he-v-cristal .vx-gl{position:relative;aspect-ratio:1;border-radius:50%;overflow:hidden;box-shadow:inset 0 0 40px rgba(255,255,255,.6),0 0 40px 8px color-mix(in srgb,var(--acc) 50%,transparent),0 20px 36px -16px rgba(0,0,0,.5)}
.he-v-cristal .vx-gl .he-ph{animation:vFlou 7s ease-in-out infinite}
@keyframes vFlou{0%,100%{filter:blur(10px) saturate(1.4);transform:scale(1.1) rotate(-4deg)}35%,80%{filter:none;transform:none}}
.he-v-cristal .vx-mi{position:absolute;inset:-20%;border-radius:50%;background:conic-gradient(from 0deg,transparent,rgba(255,255,255,.7) 15%,transparent 30%,rgba(200,170,255,.6) 55%,transparent 70%);filter:blur(14px);animation:vTour 4s linear infinite,vMi 7s ease-in-out infinite;mix-blend-mode:screen}
@keyframes vMi{0%,100%{opacity:1}35%,80%{opacity:.15}}
.he-v-cristal .vx-gl:after{content:"";position:absolute;top:8%;left:16%;width:30%;height:16%;border-radius:50%;background:radial-gradient(rgba(255,255,255,.85),transparent 70%);transform:rotate(-30deg)}
.he-v-cristal .vx-pied{height:54px;margin:-22px 16% 0;border-radius:6px 6px 26px 26px;background:${OR};box-shadow:0 14px 22px -10px rgba(0,0,0,.6)}
/* 18 Miroir infini */
.he-v-infini .vx-mf{position:relative;width:calc(100% - 40px);max-width:520px;height:clamp(380px,56vh,500px);flex:none;margin-bottom:18px;perspective:600px}
.he-v-infini .vx-cs{position:absolute;inset:0;border-radius:22px;overflow:hidden;box-shadow:0 0 0 3px #fff,0 0 18px 2px var(--acc);animation:vInf 4s linear infinite}
@keyframes vInf{from{transform:translateZ(-900px);opacity:0}25%{opacity:1}to{transform:translateZ(0);opacity:1}}
/* 19 Coup d'éclair */
.he-v-eclair .vx-cad{animation:vMonte 1s both,vSec 4s infinite}
@keyframes vSec{0%,58%,64%,100%{transform:none}60%{transform:translate(-5px,2px)}62%{transform:translate(4px,-2px)}}
.he-v-eclair .vx-fl{position:absolute;inset:0;z-index:3;background:#fff;opacity:0;animation:vFlash 4s infinite}
@keyframes vFlash{0%,57%,100%{opacity:0}58%{opacity:.95}60%{opacity:.2}61%{opacity:.8}66%{opacity:0}}
.he-v-eclair svg{position:absolute;z-index:4;left:20%;top:-10px;width:60%;height:70%;opacity:0;filter:drop-shadow(0 0 8px #fff) drop-shadow(0 0 18px var(--acc));animation:vFlash 4s infinite}
.he-v-eclair svg path{fill:#fff8d6}
.he-v-eclair .he-ph{animation:vNuit 4s infinite}
@keyframes vNuit{0%,56%{filter:brightness(.55) saturate(.8)}62%,95%{filter:brightness(1.05) saturate(1.1)}100%{filter:brightness(.55) saturate(.8)}}
/* 20 Comète */
.he-v-comete .vx-orb{position:absolute;inset:-26px;z-index:3;animation:vTour 3.6s linear infinite}
.he-v-comete .vx-tete{position:absolute;left:50%;top:-6px;width:14px;height:14px;margin-left:-7px;border-radius:50%;background:#fff;box-shadow:0 0 12px 5px #fff,0 0 30px 10px var(--acc)}
.he-v-comete .vx-queue{position:absolute;inset:0;border-radius:50%;background:conic-gradient(from -90deg,transparent 0 60%,color-mix(in srgb,var(--acc) 60%,#fff) 98%,transparent 100%);-webkit-mask:radial-gradient(circle,transparent calc(50% - 5px),#000 calc(50% - 4px),#000 calc(50% + 2px),transparent calc(50% + 3px));mask:radial-gradient(circle,transparent calc(50% - 5px),#000 calc(50% - 4px),#000 calc(50% + 2px),transparent calc(50% + 3px));filter:blur(1px) drop-shadow(0 0 6px #fff)}
.he-v-comete .vx-ph{position:absolute;inset:0;border-radius:50%;overflow:hidden;box-shadow:0 0 0 5px var(--papier,#fff),0 26px 40px -18px rgba(0,0,0,.55)}
`;
if(capt)css+=`.hent[class*="he-v-"] *{animation-delay:-2.2s!important;animation-play-state:paused!important}
.he-v-verre .vx-ec,.he-v-brume .vx-br{animation-delay:-1.2s!important}.he-v-infini .vx-cs{animation-delay:calc(var(--i) * -1s)!important}
.he-v-eclair .vx-fl,.he-v-eclair svg,.he-v-eclair .he-ph{animation-delay:-2.43s!important}.he-v-eclair .vx-fl{animation:none!important;opacity:.25}
.he-v-coeurparticules .vx-et{animation-delay:-2.5s!important}.he-v-eclosion *{animation-delay:-2.5s!important}`;
const st=document.createElement("style");st.id="entetes-plus9";st.textContent=css;document.head.appendChild(st);

const vieux=window.entete;
window.entete=function(k,t,lang){
  if(!NOUV.some(e=>e[0]===k))return vieux(k,t,lang);
  const ph=`<div class="he-ph" style="background-image:url('${P(D.hero)}')"></div>`;
  const kick=`<div class="kick">${t.type} · ${D.ville}</div>`,note=D.nb?`<div class="note"><span class="et">${etoiles}</span>${D.note} · ${D.nb} ${t.avisG}</div>`:"";
  const btn=`<button class="he-btn" data-res>${t.creneau}${creneau(t)?`<small>${t.dispo} : ${creneau(t)}</small>`:""}</button>`;
  const nom=`<h1>${D.nom}</h1>`,txt=()=>`<div class="he-txt">${kick}${nom}${note}${btn}</div>`;
  const c=`hent he-v-${k}`,H=x=>`<div class="${c}" data-s="accueil">${x}</div>`,R=(n,f)=>Array.from({length:n},(_,i)=>f(i)).join("");
  const cad=x=>`<div class="vx-cad">${ph}${x||""}</div>`,etoiles2=n=>R(n,i=>`<span class="vx-pt" style="left:${(i*37)%100}%;top:${(i*53)%100}%;width:${1+i%3}px;height:${1+i%3}px;animation-delay:${-(i*.3)}s"></span>`);
  if(k==="portail")return H(`<div class="vx-rd"><div class="vx-an2"></div><div class="vx-an"></div><div class="vx-in">${ph}</div></div>${txt()}`);
  if(k==="verre"){const E=[[0,0,50,40,-80,-40],[50,0,100,35,90,50],[0,40,45,100,-60,30],[45,35,100,70,70,-30],[45,70,100,100,40,60]];
    return H(cad(E.map(([a,b,c2,d,x,r])=>`<span class="vx-ec" style="clip-path:polygon(${a}% ${b}%,${c2}% ${b}%,${c2-6}% ${d}%,${a+4}% ${d}%);--x:${x}px;--r:${r}deg"></span>`).join("")+'<span class="vx-imp"></span>')+txt());}
  if(k==="brume"){const B=[["#ff8fc8",-10,-6,"-60px","-80px"],["#b49cff",40,30,"80px","-40px"],["#ffd08a",10,50,"-50px","90px"],["#8fe3ff",50,-10,"70px","60px"]];
    return H(cad(B.map(([col,x,y,dx,dy])=>`<span class="vx-br" style="background:${col};left:${x}%;top:${y}%;--x:${dx};--y:${dy}"></span>`).join(""))+txt());}
  if(k==="laser"){const L=[["#ff3fd2",8,-35,10],["#3fe0ff",30,-10,25],["#7cff6b",70,10,-25],["#ffe14d",92,35,-10],["#ff3fd2",50,-20,20]];
    return H(L.map(([col,x,a,b],i)=>`<span class="vx-lz" style="left:${x}%;color:${col};--a:${a}deg;--b:${b}deg;animation-delay:${-i*.7}s"></span>`).join("")+cad()+txt());}
  if(k==="aurore")return H(`<div class="vx-ciel">${etoiles2(40)}<span class="vx-au" style="top:20px;background:linear-gradient(90deg,transparent,#3dffb0,#36d0ff,transparent)"></span><span class="vx-au" style="top:120px;background:linear-gradient(90deg,transparent,#b06bff,#3dffb0,transparent);animation-delay:-4s"></span></div>${cad()}${txt()}`);
  if(k==="galaxie")return H(`<div class="vx-ciel"><div class="vx-ga"></div>${etoiles2(60)}</div><div class="vx-rd"><div class="vx-ph">${ph}</div></div>${txt()}`);
  if(k==="lueurs")return H(cad('<span class="vx-lk"></span><span class="vx-gr"></span>')+txt());
  if(k==="trace")return H(`<div class="vx-tc"><div class="vx-in">${ph}</div><svg viewBox="0 0 100 100" preserveAspectRatio="none"><rect class="b" x="1" y="1" width="98" height="98" rx="7" ry="5" pathLength="100" vector-effect="non-scaling-stroke"/><rect class="a" x="1" y="1" width="98" height="98" rx="7" ry="5" pathLength="100" vector-effect="non-scaling-stroke"/></svg></div>${txt()}`);
  if(k==="vortex")return H(`<div class="vx-rd"><div class="vx-vo"></div><div class="vx-ph">${ph}</div></div>${txt()}`);
  if(k==="cube"){const F=["rotateY(0) translateZ(120px)","rotateY(90deg) translateZ(120px)","rotateY(180deg) translateZ(120px)","rotateY(270deg) translateZ(120px)"],flt=["none","sepia(.35) saturate(1.3)","grayscale(1) contrast(1.1)","hue-rotate(-20deg) saturate(1.5)"];
    return H(`<div class="vx-sc"><div class="vx-cu">${F.map((tr,i)=>i===2?`<div class="vx-fa t" style="transform:${tr}"><span>${D.ville}</span></div>`:`<div class="vx-fa" style="transform:${tr};filter:${flt[i]}">${ph}</div>`).join("")}</div></div>${txt()}`);}
  if(k==="coeurparticules"){const N=46;return H(cad(`<div class="vx-cp">${R(N,i=>{const a=i/N*Math.PI*2,hx=16*Math.pow(Math.sin(a),3),hy=-(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a));
      return `<span class="vx-et" style="left:50%;top:45%;--sx:${Math.round(Math.cos(i*2.4)*220)}px;--sy:${Math.round(Math.sin(i*1.7)*260)}px;--hx:${Math.round(hx*7.5)}px;--hy:${Math.round(hy*7.5)}px;--ex:${Math.round(hx*16)}px;--ey:${Math.round(hy*16-80)}px;animation-delay:${(i%6)*.04}s"></span>`})}</div>`)+txt());}
  if(k==="eclosion")return H(`<div class="vx-fl">${R(8,i=>`<span class="vx-pe" style="--r:${i*45}deg;animation-delay:${i*.05}s"></span>`)}<div class="vx-co">${ph}</div></div>${txt()}`);
  if(k==="bokeh"){const col=["#fff3c4","#ffc8e6","#ffffff","#d9c4ff","#ffe0a8"];return H(cad(R(14,i=>{const s=24+(i*17)%60;return `<span class="vx-bk" style="left:${(i*31)%90}%;top:${(i*47)%90}%;width:${s}px;height:${s}px;background:radial-gradient(circle,${col[i%5]} 0 40%,transparent 72%);opacity:.75;--dx:${((i*13)%50)-25}px;animation-duration:${6+(i%5)}s"></span>`}))+txt());}
  if(k==="irise")return H(`<div class="vx-blob"></div>${cad()}${txt()}`);
  if(k==="sequins")return H(cad(`<div class="vx-sq">${R(12*18,i=>`<i style="animation-delay:${((i%12)+(i/12|0))*.04}s"></i>`)}</div>`)+txt());
  if(k==="dechire")return H(cad(`<div class="vx-pa h"><span>${D.ville}</span></div><div class="vx-pa b"></div>`)+txt());
  if(k==="cristal")return H(`<div class="vx-bc"><div class="vx-gl">${ph}<div class="vx-mi"></div></div><div class="vx-pied"></div></div>${txt()}`);
  if(k==="infini")return H(`<div class="vx-mf">${R(4,i=>`<div class="vx-cs" style="--i:${i};animation-delay:${-i}s">${ph}</div>`)}</div>${txt()}`);
  if(k==="eclair")return H(cad(`<span class="vx-fl"></span><svg viewBox="0 0 100 200" preserveAspectRatio="none"><path d="M58 0 L22 92 L48 92 L30 200 L80 74 L52 74 L74 0Z"/></svg>`)+txt());
  if(k==="comete")return H(`<div class="vx-rd"><div class="vx-ph">${ph}</div><div class="vx-orb"><div class="vx-queue"></div><span class="vx-tete"></span></div></div>${txt()}`);
  return "";
};
try{const k=enteteChoisie();if(NOUV.some(e=>e[0]===k)){const ok=window.__changeEntete&&window.__changeEntete();if(!ok)setTimeout(()=>window.__changeEntete&&window.__changeEntete(),600)}}catch(e){}
})();
