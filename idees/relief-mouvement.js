/* Écrin · les mouvements (maquette 20/11 soir). Deux versions, choisies par la classe sur .ecran :
   m-a « Reflets » : chaque bloc monte en douceur, un reflet de lumière passe sur les cartes comme sur un vernis gel,
                    la note des avis compte jusqu'à 5,0, les étoiles s'allument une à une, les photos bougent doucement au défilement,
                    les réalisations défilent toutes seules tant qu'on n'y touche pas.
   m-b « Cartes empilées » : chaque bloc vient se poser PAR-DESSUS le précédent, qui recule et s'assombrit (comme des cartes qu'on empile),
                    + les mêmes petits gestes (note qui compte, étoiles, réalisations qui défilent).
   Règles : seulement transform / opacity, rien ne reste caché si le mouvement ne démarre pas, « mouvements réduits » = tout immobile. */
(function(){
const E=document.querySelector('.ecran.ecrin');if(!E)return;
const DF=document.querySelector('.defile');if(!DF)return;
const calme=matchMedia('(prefers-reduced-motion: reduce)').matches;
const A=E.classList.contains('m-a'),B=E.classList.contains('m-b');if(calme||(!A&&!B))return;
const secs=[...DF.querySelectorAll(':scope>.sec')];

/* --- commun : la note qui compte, les étoiles qui s'allument, les réalisations qui défilent seules --- */
const note=document.querySelector('.e-avis .al-tete b');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;io.unobserve(t);
  if(t===note){const fin=parseFloat(t.textContent.replace(',','.'))||5,t0=performance.now();(function pas(n){const k=Math.min(1,(n-t0)/1100),v=fin*(1-Math.pow(1-k,3));t.textContent=v.toFixed(1).replace('.',',');if(k<1)requestAnimationFrame(pas)})(t0)}
  if(t.classList.contains('e-mt'))t.classList.add('e-vu');
  if(t.classList.contains('et'))t.classList.add('e-allume');
}),{root:DF,threshold:.35});
if(note)io.observe(note);
document.querySelectorAll('.e-avis .et, .e-avis .al-i .et').forEach(s=>{if(s.querySelector('i'))return;s.innerHTML=[...s.textContent].map((c,i)=>`<i style="--k:${i}">${c}</i>`).join('');io.observe(s)});
const car=document.querySelector('.e-real .car');
if(car){let touche=false;['pointerdown','touchstart','wheel'].forEach(ev=>car.addEventListener(ev,()=>touche=true,{passive:true}));
  setInterval(()=>{if(touche||document.hidden)return;const r=car.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;
    const ims=[...car.querySelectorAll('img')],on=car.querySelector('img.e-on')||ims[0],i=ims.indexOf(on),n=ims[(i+1)%ims.length];
    car.scrollTo({left:n.offsetLeft-(car.clientWidth-n.offsetWidth)/2,behavior:'smooth'})},3200)}

/* --- A « Reflets » --- */
if(A){
  /* les blocs qui montent (seulement ceux qu'on n'a pas encore vus) */
  /* (les blocs entiers ne montent plus : ce sont les titres et les cartes qui arrivent, voir A+) */
  /* le reflet de lumière sur les cartes */
  const cartes=document.querySelectorAll('.e-presta .tir,.e-moi .mots,.e-salon .cadre,.e-avant ul.avant,.e-horaires .infos,.e-avis .al-i,.e-real .car img');
  cartes.forEach((c,i)=>{if(c.tagName==='IMG'){return}const r=document.createElement('span');r.className='e-reflet';r.style.setProperty('--r',(i%5)*.9+'s');c.appendChild(r);if(getComputedStyle(c).position==='static')c.style.position='relative';c.style.overflow='hidden'});
  /* les photos qui bougent doucement au défilement (À propos, Le salon) */
  const ph=[...document.querySelectorAll('.e-moi .moi-q img,.e-salon .cadre img')];
  let att=false;DF.addEventListener('scroll',()=>{if(att)return;att=true;requestAnimationFrame(()=>{att=false;const h=DF.clientHeight;
    ph.forEach(im=>{const r=im.parentElement.getBoundingClientRect(),k=(r.top+r.height/2-h/2)/h;if(Math.abs(k)>1.2)return;im.style.transform=`translateY(${(k*-28).toFixed(1)}px) scale(1.12)`})})},{passive:true});
}

/* --- B « Cartes empilées » --- */
if(B){
  E.classList.add('e-pile');
  const regle=()=>{const H=DF.clientHeight;secs.forEach(s=>{s.style.top=Math.min(14,H-s.offsetHeight-14)+'px'})};
  regle();addEventListener('resize',regle);setTimeout(regle,1500);
  let att=false;DF.addEventListener('scroll',()=>{if(att)return;att=true;requestAnimationFrame(()=>{att=false;const H=DF.clientHeight;
    secs.forEach((s,i)=>{const nx=secs[i+1];if(!nx){return}const rn=nx.getBoundingClientRect(),rs=DF.getBoundingClientRect();
      /* combien la carte suivante recouvre celle-ci (0 = pas encore, 1 = complètement) */
      const k=Math.max(0,Math.min(1,1-(rn.top-rs.top)/H));
      s.style.transform=`scale(${(1-k*.07).toFixed(4)})`;s.style.setProperty('--voile',(k*.45).toFixed(3))})})},{passive:true});
} 
/* ===== A+ « Reflets » poussé plus loin (20/11 soir, Marie : « un truc de fou, premium, qui bouge ») ===== */
if(A){
  const H=DF.clientHeight,bas=el=>el.getBoundingClientRect().top-DF.getBoundingClientRect().top>H*.92;
  const lance=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;lance.unobserve(e.target);e.target.classList.remove('e-att');e.target.classList.add('e-go')}),{root:DF,threshold:.18});
  const prepare=(el,k)=>{if(k!=null)el.style.setProperty('--k',k);if(bas(el)){el.classList.add('e-att');lance.observe(el)}};
  /* 1. les titres : chaque mot sort d'une fente, l'un après l'autre */
  document.querySelectorAll('.sec>.ti>span').forEach(sp=>{const mots=sp.innerHTML.split(/(<em>.*?<\/em>|\s+)/).filter(x=>x&&x.trim());
    sp.innerHTML=mots.map((m,i)=>`<i class="e-fente"><i class="e-mot" style="--k:${i}">${m}</i></i>`).join(' ');prepare(sp.parentElement)});
  /* 2. les cartes arrivent en cascade */
  const groupes=[['.e-presta .tir'],['.e-visite li'],['.e-savoir .puce'],['.e-avis .al-i'],['.e-horaires .e-pi'],['.e-acces .ac']];
  groupes.forEach(([q])=>document.querySelectorAll(q).forEach((el,i)=>{el.classList.add('e-cas');prepare(el,i)}));
  ['.e-avant ul.avant','.e-moi .mots','.e-salon .leg','.e-horaires .e-etat','.e-avis .al-tete','.e-avis .bouton','.e-insta .insta','.e-visite ol.visite'].forEach(q=>document.querySelectorAll(q).forEach(el=>{el.classList.add('e-pop');prepare(el)}));
  /* 3. les réalisations en carrousel 3D : les photos des côtés tournent comme des pages */
  const car=document.querySelector('.e-real .car');
  if(car){car.classList.add('e-3d');const ims=[...car.querySelectorAll('img')];let at=false;
    const tour=()=>{at=false;const c=car.scrollLeft+car.clientWidth/2;ims.forEach(im=>{const d=(im.offsetLeft+im.offsetWidth/2-c)/im.offsetWidth,a=Math.max(-1,Math.min(1,d));
      im.style.transform=`perspective(700px) rotateY(${(-a*32).toFixed(1)}deg) scale(${(1-Math.abs(a)*.14).toFixed(3)})`;im.style.opacity=(1-Math.abs(a)*.35).toFixed(2)})};
    car.addEventListener('scroll',()=>{if(!at){at=true;requestAnimationFrame(tour);setTimeout(()=>{if(at)tour()},120)}},{passive:true});tour();setTimeout(tour,600)}
  /* 4. des petites étoiles qui scintillent dans les blocs foncés */
  document.querySelectorAll('.e-avis,.e-insta').forEach(b=>{for(let i=0;i<9;i++){const s=document.createElement('span');s.className='e-etin';s.textContent='✦';
    s.style.cssText=`left:${(6+Math.random()*88).toFixed(1)}%;top:${(4+Math.random()*90).toFixed(1)}%;--t:${(8+Math.random()*10).toFixed(0)}px;--d:${(Math.random()*4).toFixed(2)}s;--v:${(2.6+Math.random()*2.4).toFixed(2)}s`;b.appendChild(s)}});
  /* 5. un reflet aussi sur les boutons dorés */
  document.querySelectorAll('.e-avis .bouton,.e-insta .insta a').forEach((b,i)=>{const r=document.createElement('span');r.className='e-reflet';r.style.setProperty('--r',(1.5+i)+'s');b.style.position='relative';b.style.overflow='hidden';b.appendChild(r)});
}

})();
