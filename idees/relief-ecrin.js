/* Écrin (D63) : maquette qui habille le VRAI site (rien n'est enlevé, tous les clics restent ceux du site).
   Les couleurs viennent du site lui-même : accent = couleur du bouton Réserver, écriture des titres = celle du nom. */
(function(){
const E=document.querySelector('.ecran')||document.body;E.classList.add('ecrin');
const btn=document.querySelector('.he-btn,[data-res]'),h1=document.querySelector('h1');
const acc=btn?getComputedStyle(btn).backgroundColor:'#2A1B1E';
E.style.setProperty('--e-acc',acc);
if(h1)E.style.setProperty('--e-titre',getComputedStyle(h1).fontFamily);
/* titres : petit surtitre + grand titre */
const TI={"Prestations":["Le menu","Mes <em>prestations</em>"],"Réalisations":["Mon travail","Mes <em>réalisations</em>"],"Avis clientes":["Elles en parlent","Avis <em>clientes</em>"],"Avis Google":["Elles en parlent","Avis <em>Google</em>"],
 "À propos":["Qui suis-je","À <em>propos</em>"],"Le salon":["Où me trouver","Le <em>salon</em>"],"Première visite ?":["Comment ça marche","Première <em>visite&nbsp;?</em>"],
 "Avant votre rendez-vous":["Petit mot","Avant votre <em>rendez&#8209;vous</em>"],"Bon à savoir":["Pratique","Bon à <em>savoir</em>"],"Horaires":["Quand venir","Mes <em>horaires</em>"],
 "Comment venir":["Accès","Comment <em>venir</em>"],"Instagram":["Suivez-moi","Sur <em>Instagram</em>"]};
const CL={"Prestations":"e-presta","Réalisations":"e-real","Avis clientes":"e-avis","Avis Google":"e-avis","À propos":"e-moi","Le salon":"e-salon","Première visite ?":"e-visite","Avant votre rendez-vous":"e-avant","Bon à savoir":"e-savoir","Horaires":"e-horaires","Comment venir":"e-acces","Instagram":"e-insta"};
document.querySelectorAll('.sec>.ti').forEach(t=>{const k=t.textContent.trim(),v=TI[k];if(CL[k])t.parentElement.classList.add(CL[k]);if(v)t.innerHTML=`<small>${v[0]}</small><span>${v[1]}</span>`});
/* prestations : une photo de ses réalisations sur chaque catégorie (elle déborde de la carte) */
const ph=[...document.querySelectorAll('.e-real .car img')].map(i=>i.src);
document.querySelectorAll('.e-presta .tir-h').forEach((h,i)=>{if(!ph.length||h.querySelector('.e-vi'))return;const im=document.createElement('img');im.className='e-vi';im.alt='';im.src=ph[(i+1)%ph.length];h.prepend(im)});
/* réalisations : la photo du milieu passe devant */
const car=document.querySelector('.e-real .car');
if(car){const maj=()=>{const c=car.scrollLeft+car.clientWidth/2;let b=null,d=1e9;[...car.children].forEach(p=>{const m=Math.abs(p.offsetLeft+p.offsetWidth/2-c);if(m<d){d=m;b=p}});[...car.children].forEach(p=>p.classList.toggle('e-on',p===b))};car.addEventListener('scroll',()=>requestAnimationFrame(maj),{passive:true});maj()}
/* bon à savoir : un symbole par info */
document.querySelectorAll('.e-savoir .puce').forEach(p=>{const t=p.textContent.toLowerCase();const s=/parking/.test(t)?'P':/paiement|espèce|carte/.test(t)?'€':/toilette/.test(t)?'WC':/fauteuil|accessible/.test(t)?'FAUT':/acompte|annul|retard/.test(t)?'!':'✦';
 const i=document.createElement('i');i.className='e-sy';if(s==='FAUT')i.innerHTML='<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="4" r="1.6" fill="currentColor"/><path d="M11 7v6h6l2 5"/><path d="M8.5 10.5a5.5 5.5 0 1 0 7 7"/></svg>';else i.textContent=s;p.prepend(i);if(/^pas |non /.test(t))p.classList.add('e-non')});
/* horaires : le haut du ticket (nom du salon + ouvert / fermé) */
const inf=document.querySelector('.e-horaires .infos');
if(inf&&!inf.querySelector('.e-tk')){const auj=inf.querySelector('.h.auj span:last-child'),ferme=!auj||/ferm/i.test(auj.textContent);
 const tk=document.createElement('div');tk.className='e-tk';tk.innerHTML=`<b>${h1?h1.textContent.trim():''}</b><span class="e-st${ferme?' e-f':''}"><i></i>${ferme?"Fermé aujourd'hui":"Ouvert aujourd'hui · "+auj.textContent.trim()}</span>`;inf.prepend(tk);
 const adr=inf.querySelector('.adr');if(adr){const p=document.createElement('div');p.className='e-perfo';adr.before(p)}}
})();

/* ===== versions de Bon à savoir et des Horaires (v-a / v-b sur .ecran, choisies par la page de comparaison) ===== */
(function(){
const E=document.querySelector('.ecran')||document.body;
/* Bon à savoir : un petit texte court sous chaque info (« Gratuit », « Pas sur place »…) */
document.querySelectorAll('.e-savoir .puce').forEach(p=>{if(p.querySelector('.e-lb'))return;const brut=[...p.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim();
 const m=brut.match(/^([^:]+):\s*(.+)$/);const tit=m?m[1].trim():brut,det=m?m[2].trim():'';
 [...p.childNodes].filter(n=>n.nodeType===3).forEach(n=>n.remove());
 const b=document.createElement('span');b.className='e-lb';b.innerHTML=`<b>${tit.charAt(0).toUpperCase()+tit.slice(1)}</b>${det?`<em>${det.charAt(0).toUpperCase()+det.slice(1)}</em>`:''}`;p.querySelector('.e-sy').after(b)});
{const ps=document.querySelectorAll('.e-savoir .puce');if(ps.length){ps[0].classList.add('e-prem');ps[ps.length-1].classList.add('e-der')}}
/* Horaires : la semaine en 7 pastilles + l'état du jour avec une barre */
const inf=document.querySelector('.e-horaires .infos');if(!inf||inf.querySelector('.e-sem'))return;
const H=[...inf.querySelectorAll('.h')],J=H.map(h=>{const s=h.querySelectorAll('span');return{n:s[0].textContent.trim(),v:s[s.length-1].textContent.trim(),auj:h.classList.contains('auj')}});
const ia=J.findIndex(j=>j.auj),ja=J[ia]||J[0],ferme=/ferm/i.test(ja.v);
const hh=t=>{const m=t.match(/(\d+)\s*h\s*(\d*)/);return m?(+m[1])+(+(m[2]||0))/60:null};
const pl=ja.v.split(/[–-]/).map(hh),now=new Date(),hn=now.getHours()+now.getMinutes()/60;
const ouvert=!ferme&&pl[0]!=null&&hn>=pl[0]&&hn<pl[1];
const pct=ferme||pl[0]==null?0:Math.max(0,Math.min(100,(hn-pl[0])/(pl[1]-pl[0])*100));
let proch='';for(let k=1;k<=7;k++){const j=J[(ia+k)%7];if(!/ferm/i.test(j.v)){proch=`${k===1?'demain':j.n.toLowerCase()} à ${j.v.split(/[–-]/)[0].trim()}`;break}}
const etat=ferme?`Fermé aujourd'hui`:ouvert?`Ouvert maintenant`:(hn<pl[0]?`Ouvre à ${ja.v.split(/[–-]/)[0].trim()}`:`Fermé pour aujourd'hui`);
const sous=ferme||(!ouvert&&hn>=pl[1])?`Réouverture ${proch}`:ouvert?`Jusqu'à ${ja.v.split(/[–-]/)[1].trim()}`:`Aujourd'hui · ${ja.v}`;
const sem=document.createElement('div');sem.className='e-sem';
sem.innerHTML=`<div class="e-etat ${ouvert?'e-ok':''}"><i></i><div><b>${etat}</b><span>${sous}</span></div></div>
<div class="e-pills">${J.map(j=>`<div class="e-pi ${j.auj?'e-auj':''} ${/ferm/i.test(j.v)?'e-fe':''}"><small>${j.n.slice(0,1)}</small><span>${/ferm/i.test(j.v)?'—':j.v.replace(/\s/g,'').replace('–','<br>')}</span></div>`).join('')}</div>`;
const jour=document.createElement('div');jour.className='e-jour';
jour.innerHTML=`<small>Aujourd'hui · ${ja.n}</small><b>${ferme?'Fermé':ja.v}</b>${ferme?'':`<div class="e-barre"><div style="width:${pct}%"></div><i style="left:${pct}%"></i></div><div class="e-bornes"><span>${ja.v.split(/[–-]/)[0].trim()}</span><span>${ja.v.split(/[–-]/)[1].trim()}</span></div>`}<div class="e-etat2 ${ouvert?'e-ok':''}"><i></i>${etat}${ouvert?'':' · '+sous}</div><button type="button" class="e-voir">Toute la semaine <span>⌄</span></button>`;
inf.prepend(jour);inf.prepend(sem);
jour.querySelector('.e-voir').onclick=()=>inf.classList.toggle('e-ouv');
})();
