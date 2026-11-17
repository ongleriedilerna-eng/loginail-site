/* 16/11 (Marie) : série 8 — 8 en-têtes pour arriver à 30, UNE seule photo. Maquette (projet non touché). */
(function(){
/* 16/11 : seules les en-têtes choisies par Marie restent proposées */
const NOUV=[["aquarelle", "Tache d'aquarelle"], ["rayons", "Soleil rayonnant"], ["popart", "Bulle BD"], ["etoile", "Étoile"]];
try{NOUV.forEach(e=>{if(!ENTETES.some(x=>x[0]===e[0]))ENTETES.push(e)})}catch(e){}
const capt=/[?&]capt/.test(location.search);
const OR="linear-gradient(135deg,#6f4a12 0%,#f8e7a6 18%,#b8862b 34%,#fff4c4 50%,#a8761f 66%,#f3d98a 82%,#6f4a12 100%)";
let css=`
.hent[class*="he-u-"]{justify-content:flex-start;padding:84px 0 44px}
.hent[class*="he-u-"] .he-ph{position:absolute;inset:0;background-size:cover;background-position:center}
.hent[class*="he-u-"] .he-txt{position:relative;z-index:5}
@keyframes uMonte{from{opacity:0;transform:translateY(36px) scale(.94)}to{opacity:1;transform:none}}
@keyframes uTour{to{transform:rotate(360deg)}}
.ux-cad{position:relative;width:calc(100% - 40px);max-width:520px;height:clamp(380px,56vh,500px);flex:none;border-radius:26px;overflow:hidden;box-shadow:0 26px 46px -22px rgba(0,0,0,.6);margin-bottom:18px}
/* 1 Aquarelle : la photo apparaît comme une tache d'eau qui s'étale */
.he-u-aquarelle .ux-aq{position:relative;width:calc(100% - 30px);max-width:520px;height:clamp(390px,58vh,510px);flex:none;margin-bottom:18px}
.he-u-aquarelle .ux-aq .he-ph{-webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath d='M100 8c22 0 30 18 50 20s40 20 36 46-4 30 6 50-6 48-30 56-28 18-56 14-36-20-58-26-38-30-34-58 20-34 18-56S78 8 100 8z'/%3E%3C/svg%3E") center/100% 100% no-repeat;mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath d='M100 8c22 0 30 18 50 20s40 20 36 46-4 30 6 50-6 48-30 56-28 18-56 14-36-20-58-26-38-30-34-58 20-34 18-56S78 8 100 8z'/%3E%3C/svg%3E") center/100% 100% no-repeat;animation:uTache 7s ease-in-out infinite}
@keyframes uTache{0%{-webkit-mask-size:0% 0%;mask-size:0% 0%}30%,88%{-webkit-mask-size:105% 105%;mask-size:105% 105%}100%{-webkit-mask-size:0% 0%;mask-size:0% 0%}}
.he-u-aquarelle .ux-ta{position:absolute;border-radius:50%;filter:blur(18px);opacity:.55;background:var(--acc);animation:uRespire 6s ease-in-out infinite alternate}
@keyframes uRespire{from{transform:scale(.8)}to{transform:scale(1.15)}}
/* 2 Stickers */
.he-u-stickers .ux-st{position:absolute;z-index:3;padding:8px 14px;border-radius:12px;background:#fff;color:#1E1C1B;font:800 15px Jost;letter-spacing:.04em;box-shadow:0 0 0 3px #fff,0 8px 16px -6px rgba(0,0,0,.45);transform:rotate(var(--r)) scale(0);animation:uColle 6s cubic-bezier(.3,1.6,.5,1) infinite}
@keyframes uColle{0%,5%{transform:rotate(var(--r)) scale(0)}12%,90%{transform:rotate(var(--r)) scale(1)}100%{transform:rotate(var(--r)) scale(0)}}
.he-u-stickers .ux-st.r{border-radius:50%;width:74px;height:74px;padding:0;display:grid;place-items:center;text-align:center;font-size:12px;line-height:1.1;background:var(--acc);color:#fff}
/* 3 Soleil rayonnant */
.he-u-rayons .ux-ra{position:relative;width:min(300px,80%);aspect-ratio:1;flex:none;margin:20px 0 26px}
.he-u-rayons .ux-ray{position:absolute;inset:-40%;border-radius:50%;background:repeating-conic-gradient(from 0deg,color-mix(in srgb,var(--acc) 55%,#fff) 0 10deg,transparent 10deg 20deg);-webkit-mask:radial-gradient(circle,#000 30%,transparent 70%);mask:radial-gradient(circle,#000 30%,transparent 70%);animation:uTour 20s linear infinite}
.he-u-rayons .ux-ro{position:absolute;inset:0;border-radius:50%;overflow:hidden;box-shadow:0 0 0 6px var(--papier,#fff),0 26px 40px -18px rgba(0,0,0,.55);animation:uMonte 1s both}
/* 4 Tranches : 4 bandes de la photo qui glissent puis s'alignent */
.he-u-tranches .ux-tr{position:relative;width:calc(100% - 40px);max-width:520px;height:clamp(380px,56vh,500px);flex:none;display:flex;gap:6px;margin-bottom:18px}
.he-u-tranches .ux-b{position:relative;flex:1;border-radius:14px;overflow:hidden;box-shadow:0 18px 30px -16px rgba(0,0,0,.55);animation:uGlisse 6s cubic-bezier(.5,0,.3,1) infinite}
.he-u-tranches .ux-b .he-ph{width:400%;inset:0 auto 0 calc(var(--i) * -100% - var(--i) * 6px)}
@keyframes uGlisse{0%,8%{transform:translateY(var(--d))}30%,85%{transform:none}100%{transform:translateY(var(--d))}}
/* 5 Bulle BD (pop art) */
.he-u-popart .ux-pa{position:relative;width:calc(100% - 40px);max-width:520px;height:clamp(380px,56vh,500px);flex:none;margin-bottom:18px;border:4px solid #111;border-radius:6px;overflow:hidden;box-shadow:8px 8px 0 #111}
.he-u-popart .ux-pa:after{content:"";position:absolute;inset:0;background:radial-gradient(circle,rgba(0,0,0,.18) 1.4px,transparent 1.8px) 0 0/9px 9px;mix-blend-mode:multiply}
.he-u-popart .ux-bu{position:absolute;z-index:3;left:18px;top:18px;max-width:64%;background:#fff;border:3px solid #111;border-radius:50% / 40%;padding:16px 20px;font:900 20px/1.05 "Bangers","Impact",sans-serif;letter-spacing:.03em;text-transform:uppercase;color:#111;text-align:center;transform-origin:20% 100%;animation:uPop 4s cubic-bezier(.3,1.7,.5,1) infinite}
.he-u-popart .ux-bu:after{content:"";position:absolute;left:30px;bottom:-22px;border:12px solid transparent;border-top:18px solid #111}
@keyframes uPop{0%,6%{transform:scale(0)}16%,90%{transform:scale(1)}100%{transform:scale(0)}}
.he-u-popart .ux-boum{position:absolute;z-index:3;right:12px;bottom:16px;width:110px;height:110px;display:grid;place-items:center;font:900 22px "Bangers","Impact",sans-serif;color:#111;background:#ffe14d;clip-path:polygon(50% 0,61% 30%,95% 20%,72% 46%,100% 66%,66% 68%,70% 100%,50% 76%,30% 100%,34% 68%,0 66%,28% 46%,5% 20%,39% 30%);animation:uPop 4s .4s cubic-bezier(.3,1.7,.5,1) infinite}
/* 6 Carte à gratter */
.he-u-gratter .ux-gc{position:relative;width:calc(100% - 40px);max-width:520px;height:clamp(380px,56vh,500px);flex:none;border-radius:26px;overflow:hidden;box-shadow:0 26px 46px -22px rgba(0,0,0,.6);margin-bottom:18px}
.he-u-gratter canvas{position:absolute;inset:0;width:100%;height:100%;z-index:2}
.he-u-gratter .ux-ind{position:absolute;z-index:3;left:50%;bottom:16px;transform:translateX(-50%);background:rgba(255,255,255,.9);color:#1E1C1B;font:600 10px Jost;letter-spacing:.24em;text-transform:uppercase;padding:7px 14px;border-radius:99px;pointer-events:none}
/* 7 Étoile */
.he-u-etoile .ux-et{position:relative;width:min(320px,86%);aspect-ratio:1;flex:none;margin:6px 0 20px;animation:uBalE 6s ease-in-out infinite}
@keyframes uBalE{0%,100%{transform:rotate(-6deg) scale(1)}50%{transform:rotate(6deg) scale(1.04)}}
.he-u-etoile .ux-ef{position:absolute;inset:0;clip-path:polygon(50% 0,61.8% 35.4%,100% 35.4%,69.1% 57.3%,80.9% 92.7%,50% 70.8%,19.1% 92.7%,30.9% 57.3%,0 35.4%,38.2% 35.4%);filter:drop-shadow(0 0 0 #fff)}
.he-u-etoile .ux-bord{position:absolute;inset:-12px;clip-path:polygon(50% 0,61.8% 35.4%,100% 35.4%,69.1% 57.3%,80.9% 92.7%,50% 70.8%,19.1% 92.7%,30.9% 57.3%,0 35.4%,38.2% 35.4%);background:${OR};background-size:300% 300%;animation:uOr 4s linear infinite}
@keyframes uOr{to{background-position:300% 0}}
.he-u-etoile .ux-sc{position:absolute;z-index:3;color:#fff;font-size:22px;text-shadow:0 0 10px #fff,0 0 16px var(--acc);animation:uScint 2s ease-in-out infinite}
@keyframes uScint{0%,100%{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1) rotate(45deg)}}
/* 8 Messages */
.he-u-messages .ux-ms{width:calc(100% - 36px);max-width:520px;flex:none;display:flex;flex-direction:column;gap:8px;margin-bottom:18px}
.he-u-messages .ux-m{max-width:78%;padding:10px 14px;border-radius:20px;font:400 15px/1.35 -apple-system,"Segoe UI",Jost,sans-serif;box-shadow:0 6px 14px -8px rgba(0,0,0,.35);opacity:0;transform:translateY(12px) scale(.96);animation:uMsg 9s ease-out infinite}
.he-u-messages .ux-m.c{align-self:flex-start;background:#fff;color:#1E1C1B;border-bottom-left-radius:6px}
.he-u-messages .ux-m.p{align-self:flex-end;background:var(--acc);color:#fff;border-bottom-right-radius:6px}
.he-u-messages .ux-m.ph{padding:5px;background:var(--acc);width:62%;max-width:62%}
.he-u-messages .ux-m.ph div{position:relative;height:clamp(220px,32vh,290px);border-radius:16px;overflow:hidden}
@keyframes uMsg{0%{opacity:0;transform:translateY(12px) scale(.96)}6%,92%{opacity:1;transform:none}100%{opacity:0}}
.he-u-messages .ux-tape{align-self:flex-start;background:#fff;border-radius:20px;padding:12px 16px;display:flex;gap:5px;opacity:0;animation:uTape 9s infinite}
.he-u-messages .ux-tape i{width:7px;height:7px;border-radius:50%;background:#aaa;animation:uPoint 1s infinite}
.he-u-messages .ux-tape i:nth-child(2){animation-delay:.15s}.he-u-messages .ux-tape i:nth-child(3){animation-delay:.3s}
@keyframes uPoint{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes uTape{0%,52%{opacity:0;height:0;padding:0 16px}54%,66%{opacity:1;height:auto;padding:12px 16px}68%,100%{opacity:0}}
.he-u-messages .ux-hd{display:flex;align-items:center;gap:10px;align-self:center;margin-bottom:4px;font:600 13px Jost}
.he-u-messages .ux-hd span{width:34px;height:34px;border-radius:50%;background-size:cover;background-position:center;box-shadow:0 0 0 2px #fff}
`;
if(capt)css+=`.hent[class*="he-u-"] *{animation-delay:-2.6s!important;animation-play-state:paused!important}.he-u-messages .ux-m{animation-delay:-5s!important}.he-u-messages .ux-tape{display:none}`;
const st=document.createElement("style");st.id="entetes-plus8";st.textContent=css;document.head.appendChild(st);

const vieux=window.entete;
window.entete=function(k,t,lang){
  if(!NOUV.some(e=>e[0]===k))return vieux(k,t,lang);
  const ph=`<div class="he-ph" style="background-image:url('${P(D.hero)}')"></div>`;
  const kick=`<div class="kick">${t.type} · ${D.ville}</div>`,note=D.nb?`<div class="note"><span class="et">${etoiles}</span>${D.note} · ${D.nb} ${t.avisG}</div>`:"";
  const btn=`<button class="he-btn" data-res>${t.creneau}${creneau(t)?`<small>${t.dispo} : ${creneau(t)}</small>`:""}</button>`;
  const nom=`<h1>${D.nom}</h1>`,txt=(h=true)=>`<div class="he-txt">${kick}${h?nom:""}${note}${btn}</div>`;
  const c=`hent he-u-${k}`,H=x=>`<div class="${c}" data-s="accueil">${x}</div>`;
  if(k==="aquarelle")return H(`<div class="ux-aq"><span class="ux-ta" style="left:4%;top:8%;width:46%;height:40%"></span><span class="ux-ta" style="right:2%;bottom:10%;width:52%;height:44%;animation-delay:-3s"></span>${ph}</div>${txt()}`);
  if(k==="stickers"){const S=[["NEW SET ✦",8,8,-8,"0s",""],["♥ 5,0",62,14,9,".25s",""],["Dispo<br>demain",70,62,12,".5s"," r"],["WOW",6,70,-12,".75s",""]];
    return H(`<div class="ux-cad" style="animation:uMonte 1s both">${ph}${S.map(([tx,x,y,r,d,cl])=>`<span class="ux-st${cl}" style="left:${x}%;top:${y}%;--r:${r}deg;animation-delay:${d}">${tx}</span>`).join("")}</div>${txt()}`);}
  if(k==="rayons")return H(`<div class="ux-ra"><div class="ux-ray"></div><div class="ux-ro">${ph}</div></div>${txt()}`);
  if(k==="tranches"){const d=["-110%","110%","-90%","90%"];return H(`<div class="ux-tr">${d.map((v,i)=>`<div class="ux-b" style="--i:${i};--d:${v};animation-delay:${i*.08}s">${ph}</div>`).join("")}</div>${txt()}`);}
  if(k==="popart")return H(`<div class="ux-pa">${ph}<div class="ux-bu">Nouveau set&nbsp;!</div><div class="ux-boum">WOW!</div></div>${txt()}`);
  if(k==="gratter")return H(`<div class="ux-gc" data-gratte>${ph}<canvas></canvas><span class="ux-ind">Grattez pour découvrir ✦</span></div>${txt()}`);
  if(k==="etoile")return H(`<div class="ux-et"><div class="ux-bord"></div><div class="ux-ef">${ph}</div><span class="ux-sc" style="left:2%;top:4%">✦</span><span class="ux-sc" style="right:0;top:52%;animation-delay:.7s">✦</span><span class="ux-sc" style="left:42%;bottom:-4%;animation-delay:1.3s">✦</span></div>${txt()}`);
  if(k==="messages"){const A=`<div class="ux-hd"><span style="background-image:url('${P(D.hero)}')"></span>${D.nom}</div>`;
    return H(`<div class="ux-ms">${A}<div class="ux-m c" style="animation-delay:0s">Coucou ! Tu as une place samedi ? 💅</div><div class="ux-m p" style="animation-delay:1.2s">Oui ! 14 h ou 16 h ✨</div><div class="ux-m ph" style="animation-delay:2.4s"><div>${ph}</div></div><div class="ux-tape"><i></i><i></i><i></i></div><div class="ux-m c" style="animation-delay:6.2s">Je réserve 14 h 😍</div></div>${txt()}`);}
  return "";
};
/* Carte à gratter : couche dorée qui se gratte toute seule (et au doigt / à la souris), puis revient */
function prepare(z){const cv=z.querySelector("canvas");if(!cv||cv._ok)return;const r=z.getBoundingClientRect();if(!r.width)return;cv._ok=1;
  cv.width=r.width;cv.height=r.height;const x=cv.getContext("2d");
  const remplir=()=>{x.globalCompositeOperation="source-over";const g=x.createLinearGradient(0,0,cv.width,cv.height);["#6f4a12","#f8e7a6","#b8862b","#fff4c4","#a8761f","#f3d98a"].forEach((c,i)=>g.addColorStop(i/5,c));
    x.fillStyle=g;x.fillRect(0,0,cv.width,cv.height);x.fillStyle="rgba(255,255,255,.35)";for(let i=0;i<220;i++)x.fillRect(Math.random()*cv.width,Math.random()*cv.height,2,2);
    x.fillStyle="#6f4a12";x.font="600 15px Jost, sans-serif";x.textAlign="center";x.fillText("✦  GRATTEZ  ✦",cv.width/2,cv.height/2)};
  const gr=(px,py)=>{x.globalCompositeOperation="destination-out";x.beginPath();x.arc(px,py,34,0,7);x.fill()};
  remplir();let t=0;
  const auto=()=>{if(capt){for(let i=0;i<70;i++){const a=i/70;gr(cv.width*(.1+.8*a),cv.height*(.5+.32*Math.sin(a*12)))}for(let i=0;i<50;i++){const a=i/50;gr(cv.width*(.9-.8*a),cv.height*(.3+.2*Math.sin(a*10)))}return}
    t++;const a=(t%160)/160;if(t%160===0){remplir()}else if(a<.75){const s=a/.75;gr(cv.width*(.1+.8*((s*3)%1)),cv.height*(.15+.7*s)+Math.sin(s*30)*30)}requestAnimationFrame(auto)};auto();
  const mv=e=>{if(e.buttons||e.pointerType==="touch"){const b=cv.getBoundingClientRect();gr(e.clientX-b.left,e.clientY-b.top)}};cv.addEventListener("pointermove",mv);cv.addEventListener("pointerdown",mv)}
setInterval(()=>document.querySelectorAll("[data-gratte]").forEach(prepare),300);
try{const k=enteteChoisie();if(NOUV.some(e=>e[0]===k)){const ok=window.__changeEntete&&window.__changeEntete();if(!ok)setTimeout(()=>window.__changeEntete&&window.__changeEntete(),600)}}catch(e){}
})();
