/* Écrin · idées de la table ronde (20/11 nuit). Deux versions, par la classe sur .ecran :
   x-vivant : on garde les cartes Écrin, mais plus rien ne bouge tout seul : c'est le doigt qui pilote.
   x-edito  : page de magazine : plus plate, aérée, grands numéros de chapitre, photos en très grand.
   Commun aux deux : pilule « Réserver » qui suit, prestations façon carte de grand restaurant (trait qui se trace, ressort),
   « Je veux ces ongles » sur chaque réalisation, photos d'À propos et du Salon qui se dévoilent, horaires vivants (« encore 2 h 15 »).
   Seulement transform / opacity ; mouvements réduits = tout à sa place, rien ne bouge. */
(function(){
const E=document.querySelector('.ecran.ecrin');if(!E)return;
const DF=document.querySelector('.defile');if(!DF)return;
const V=E.classList.contains('x-vivant'),ED=E.classList.contains('x-edito');if(!V&&!ED)return;
const calme=matchMedia('(prefers-reduced-motion: reduce)').matches;
const secs=[...DF.querySelectorAll(':scope>.sec')];
const H=()=>DF.clientHeight,haut=el=>el.getBoundingClientRect().top-DF.getBoundingClientRect().top;

/* 1. la pilule « Réserver » : apparaît quand l'en-tête est passé, se cache aux Horaires (qui ont leur bouton) */
const hb=document.querySelector('.he-btn');
if(hb&&!E.querySelector('.x-pil')){const pr=(hb.querySelector('small')||{}).textContent||'';
  const p=document.createElement('button');p.type='button';p.className='x-pil';p.setAttribute('data-res','');
  p.innerHTML=`<span><b>Réserver</b>${pr?`<small>${pr.replace(/^Prochain créneau\s*:\s*/i,'Prochain : ')}</small>`:''}</span><i>›</i>`;E.appendChild(p);
  const hent=DF.querySelector('.hent'),hor=document.querySelector('.e-horaires');
  let at=false;const maj=()=>{at=false;const apres=hent?haut(hent)+hent.offsetHeight<60:DF.scrollTop>500,auxH=hor&&haut(hor)<H()*.75&&haut(hor)+hor.offsetHeight>0;
    p.classList.toggle('x-on',apres&&!auxH)};DF.addEventListener('scroll',()=>{if(!at){at=true;requestAnimationFrame(maj);setTimeout(()=>{if(at)maj()},120)}},{passive:true});maj();}

/* 2. prestations : carte de grand restaurant ; à l'ouverture, les lignes tombent en ressort et le trait se trace */
document.querySelectorAll('.e-presta .pk-t').forEach(t=>{if(t.querySelector('.x-trait'))return;const pp=t.querySelector('.pp');if(pp){const tr=document.createElement('i');tr.className='x-trait';pp.before(tr)}});
document.querySelectorAll('.e-presta .tir').forEach(tir=>{new MutationObserver(()=>{if(!tir.classList.contains('ouv'))return;tir.querySelectorAll('.pk-c').forEach((c,i)=>{c.style.setProperty('--k',i);c.classList.remove('x-tombe');void c.offsetWidth;c.classList.add('x-tombe')})}).observe(tir,{attributes:true,attributeFilter:['class']})});
/* appui : la carte s'enfonce un peu */
DF.addEventListener('pointerdown',e=>{const c=e.target.closest('.pk-c,.tir-h,.x-veux,.x-pil');if(!c)return;c.classList.add('x-appui');const f=()=>{c.classList.remove('x-appui');removeEventListener('pointerup',f);removeEventListener('pointercancel',f)};addEventListener('pointerup',f);addEventListener('pointercancel',f)},{passive:true});

/* 3. « Je veux ces ongles » sur chaque réalisation (ouvre la réservation) */
document.querySelectorAll('.e-real .car img').forEach(im=>{if(im.nextElementSibling&&im.nextElementSibling.classList.contains('x-veux'))return;
  const w=document.createElement('span');w.className='x-cadre';im.before(w);w.appendChild(im);
  const b=document.createElement('button');b.type='button';b.className='x-veux';b.setAttribute('data-res','');b.innerHTML='♡ Je veux ces ongles';w.appendChild(b)});
/* le carrousel ne défile plus tout seul : rien ne bouge sans le doigt */

/* 4. les grandes photos qui se dévoilent (un voile de la couleur du salon se lève) */
if(!calme)document.querySelectorAll('.e-moi .moi-q,.e-salon .cadre').forEach(bx=>{if(bx.querySelector('.x-voile')||haut(bx)<H())return;
  const v=document.createElement('span');v.className='x-voile';bx.appendChild(v);bx.classList.add('x-cache');
  const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();bx.classList.add('x-leve')}},{root:DF,threshold:.3});io.observe(bx)});

/* 5. horaires vivants : « Ouvert · encore 2 h 15 » */
const eb=document.querySelector('.e-etat b');
if(eb&&/Ouvert maintenant/.test(eb.textContent)){const s=(document.querySelector('.e-etat span')||{}).textContent||'',m=s.match(/(\d+)\s*h\s*(\d*)/);
  if(m){const fin=+m[1]+(+(m[2]||0))/60,n=new Date(),r=fin-(n.getHours()+n.getMinutes()/60);if(r>0){const h=Math.floor(r),mn=Math.round((r-h)*60);eb.textContent=`Ouvert · encore ${h?h+' h ':''}${String(mn).padStart(h?2:1,'0')}${h?'':' min'}`}}}

/* 6a. VIVANT : les titres « vernis qui sèche » : chaque lettre devient nette au fil du doigt (et repart si on remonte) */
if(V&&!calme){const tis=[];document.querySelectorAll('.sec>.ti>span').forEach(sp=>{if(sp.dataset.x)return;sp.dataset.x=1;
    const w=document.createTreeWalker(sp,NodeFilter.SHOW_TEXT),ns=[];while(w.nextNode())ns.push(w.currentNode);
    const ls=[];ns.forEach(n=>{const f=document.createDocumentFragment();[...n.textContent].forEach(c=>{if(c===' '){f.appendChild(document.createTextNode(' '));return}const i=document.createElement('i');i.className='x-l';i.textContent=c;f.appendChild(i);ls.push(i)});n.replaceWith(f)});
    tis.push({sp,ls})});
  let at=false;const peint=()=>{at=false;const h=H();tis.forEach(({sp,ls})=>{const y=haut(sp);if(y<-80||y>h+40)return;
    const k=Math.max(0,Math.min(1,(h*.88-y)/(h*.33)));ls.forEach((l,i)=>{const q=Math.max(0,Math.min(1,k*1.6-i/ls.length*.6));
      l.style.transform=q>=1?'':`translateY(${((1-q)*7).toFixed(1)}px) scaleY(${(1+(1-q)*.1).toFixed(3)})`;l.style.opacity=q>=1?'':(.35+q*.65).toFixed(2)})})};
  DF.addEventListener('scroll',()=>{if(!at){at=true;requestAnimationFrame(peint);setTimeout(()=>{if(at)peint()},120)}},{passive:true});peint();}

/* 6b. ÉDITO : les grands numéros de chapitre, qui glissent moins vite que le texte */
if(ED){const nums=[];let k=0;secs.forEach(s=>{const t=s.querySelector(':scope>.ti');if(!t||s.classList.contains('e-savoir')||s.classList.contains('e-horaires')||s.classList.contains('e-acces'))return;
    if(s.querySelector('.x-num'))return;const n=document.createElement('span');n.className='x-num';n.textContent=String(++k).padStart(2,'0');s.prepend(n);nums.push(n)});
  if(!calme){let at=false;const pl=()=>{at=false;const h=H();nums.forEach(n=>{const y=haut(n.parentElement);if(y<-600||y>h+100)return;n.style.transform=`translateY(${((y-h*.3)*-.3).toFixed(1)}px)`})};
    DF.addEventListener('scroll',()=>{if(!at){at=true;requestAnimationFrame(pl);setTimeout(()=>{if(at)pl()},120)}},{passive:true});pl();}}
})();
