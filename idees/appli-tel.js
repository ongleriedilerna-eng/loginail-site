/* Maquette Design 19/11 au soir — « L'appli qui gère tout », TÉLÉPHONE SEULEMENT.
   Chargé par idees/telephone.html?v=P1 ou ?v=P2 (&go=appli pour arriver directement sur la partie).
   Remplace seulement la grande case rose « Ta journée · Ton agenda, d'un coup d'œil » ; les cartes qui s'empilent restent.
   P1 « En vedette »   : pas de cadre rose, un grand téléphone (l'accueil de l'appli) + 2 bulles qui flottent.
   P2 « Les écrans »    : 3 vrais écrans de l'appli (Accueil, Agenda, Fiche cliente) qui glissent au doigt, avec une légende. */
(function () {
  const IMG = '../loginail-site/apercus-univers/';
  const COMMUN = `
@media (max-width:760px){
  .apx{padding:6px 0 34px;text-align:center;min-width:0;width:100%;max-width:100%}
  .apx b.t .l{display:block;white-space:nowrap}
  .apx .q{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#6b625c;font-weight:500}
  .apx b.t{display:block;font-family:'Abril Fatface',serif;font-weight:400;font-size:28px;line-height:1.15;margin:10px 0 8px;color:#1E1C1B}
  .apx b.t em{font-style:normal;color:#B03562}
  .apx p.s{font-size:15px;color:#5F5751;line-height:1.5;margin:0 auto;max-width:300px}
  .apx .cadre{border-radius:34px;background:#111;padding:7px;box-shadow:0 30px 60px -22px rgba(60,30,40,.4),0 6px 18px rgba(0,0,0,.08);position:relative}
  .apx .cadre img{display:block;width:100%;border-radius:28px;aspect-ratio:600/1298;object-fit:cover;object-position:top}
  .apx .cadre::before{content:"";position:absolute;top:14px;left:50%;transform:translateX(-50%);width:28%;height:13px;border-radius:9px;background:#111;z-index:2}
}`;
  const P1 = COMMUN + `
@media (max-width:760px){
  .apv .scene{position:relative;width:250px;margin:26px auto 0}
  .apv .bulle{position:absolute;z-index:3;background:#fff;border-radius:16px;padding:9px 12px 9px 9px;display:flex;align-items:center;gap:9px;text-align:left;
     box-shadow:0 18px 36px -14px rgba(60,30,40,.32);white-space:nowrap;animation:apvFlotte 5.5s ease-in-out infinite}
  .apv .bulle i{width:30px;height:30px;border-radius:9px;background:#FBEFF3;display:grid;place-items:center;font-style:normal;color:#B03562;font-size:15px;flex:none}
  .apv .bulle strong{display:block;font-size:13px;font-weight:500;color:#1E1C1B}
  .apv .bulle small{font-size:11px;color:#6b625c}
  .apv .b1{left:-46px;top:34px;rotate:-3deg}
  .apv .b2{right:-48px;top:300px;rotate:3deg;animation-delay:-2.7s}
}
@keyframes apvFlotte{0%,100%{translate:0 0}50%{translate:0 -8px}}
@media (prefers-reduced-motion:reduce){.apv .bulle{animation:none}}`;
  const P2 = COMMUN + `
@media (max-width:760px){
  .ape .rail{max-width:calc(100% + 36px);display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding:26px calc(50% - 105px) 8px;margin:0 -18px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
  .ape .rail::-webkit-scrollbar{display:none}
  .ape .ecran{flex:none;width:210px;scroll-snap-align:center;transition:scale .35s ease,opacity .35s ease;scale:.9;opacity:.55}
  .ape .ecran.ici{scale:1;opacity:1}
  .ape .ecran figcaption{margin-top:14px;font-size:14px;font-weight:500;color:#1E1C1B}
  .ape .ecran figcaption small{display:block;font-weight:400;font-size:12.5px;color:#6b625c;margin-top:2px}
  .ape .points{display:flex;justify-content:center;gap:7px;margin-top:14px}
  .ape .points span{width:7px;height:7px;border-radius:50%;background:#E8D9D4;transition:background .3s,width .3s}
  .ape .points span.ici{background:#B03562;width:20px;border-radius:4px}
  .ape.coucou .rail{animation:apeCoucou 4.2s cubic-bezier(.45,0,.2,1) infinite}
}
@keyframes apeCoucou{0%,55%,100%{translate:0 0}20%,35%{translate:-40px 0}}
@media (prefers-reduced-motion:reduce){.ape.coucou .rail{animation:none}}`;
  function remplace(doc, win, html) {
    if (win.innerWidth > 760) return null;
    const g = doc.querySelector('.appli .case.grande'); if (!g) return null;
    const n = doc.createElement('div'); n.innerHTML = html; const el = n.firstElementChild;
    g.replaceWith(el); return el;
  }
  function va(doc, win) {
    if (new URLSearchParams(location.search).get('go') !== 'appli') return;
    const a = doc.querySelector('section.appli'); if (a) win.scrollTo({ top: a.getBoundingClientRect().top + win.scrollY - 70, behavior: 'instant' });
  }
  window.HAUT_TEL = Object.assign(window.HAUT_TEL || {}, {
    P1: { nom: 'P1 · L’appli en vedette', css: P1, js(doc, win) {
      remplace(doc, win, `<div class="apx apv">
        <div class="q">Ta journée</div>
        <b class="t"><span class="l">Ton agenda,</span> <span class="l"><em>d’un coup d’œil.</em></span></b>
        <p class="s">Elle réserve sur ton site, le rendez-vous arrive ici tout seul.</p>
        <div class="scene">
          <div class="cadre"><img src="${IMG}app-accueil-1911.webp" alt="L’accueil de l’appli Loginail"></div>
          <div class="bulle b1"><i>✓</i><div><strong>Tout depuis ton téléphone</strong><small>rien à installer sur un ordi</small></div></div>
          <div class="bulle b2"><i>♡</i><div><strong>Tes clientes, leur fidélité</strong><small>visites, notes, photos</small></div></div>
        </div></div>`);
      va(doc, win);
    } },
    P2: { nom: 'P2 · les écrans qui glissent', css: P2, js(doc, win) {
      const el = remplace(doc, win, `<div class="apx ape">
        <div class="q">Ta journée</div>
        <b class="t"><span class="l">Tout se fait</span> <span class="l"><em>depuis ton téléphone.</em></span></b>
        <p class="s">Fais glisser pour voir l’appli.</p>
        <div class="rail">
          <figure class="ecran ici"><div class="cadre"><img src="${IMG}app-accueil-1911.webp" alt="L’accueil de l’appli"></div><figcaption>Ta journée<small>ta prochaine cliente en grand</small></figcaption></figure>
          <figure class="ecran"><div class="cadre"><img src="${IMG}app-agenda-1911.webp" alt="L’agenda de l’appli"></div><figcaption>Ton agenda<small>les réservations arrivent toutes seules</small></figcaption></figure>
          <figure class="ecran"><div class="cadre"><img src="${IMG}app-fiche-1911.webp" alt="La fiche d’une cliente"></div><figcaption>Tes clientes<small>visites, fidélité, historique</small></figcaption></figure>
        </div>
        <div class="points"><span class="ici"></span><span></span><span></span></div></div>`);
      if (el) {
        const rail = el.querySelector('.rail'), ecr = [...rail.children], pts = [...el.querySelectorAll('.points span')];
        const maj = () => { const c = rail.scrollLeft + rail.clientWidth / 2; let best = 0, dmin = 1e9;
          ecr.forEach((e, i) => { const m = e.offsetLeft + e.offsetWidth / 2, dd = Math.abs(m - c); if (dd < dmin) { dmin = dd; best = i } });
          ecr.forEach((e, i) => e.classList.toggle('ici', i === best)); pts.forEach((p, i) => p.classList.toggle('ici', i === best)); };
        rail.addEventListener('scroll', maj, { passive: true });
        let fini = false; const stop = () => { fini = true; el.classList.remove('coucou') };
        ['pointerdown', 'touchstart', 'wheel'].forEach(t => rail.addEventListener(t, stop, { passive: true, once: true }));
        new win.IntersectionObserver(es => es.forEach(e => el.classList.toggle('coucou', !fini && e.isIntersecting)), { threshold: .5 }).observe(el);
      }
      va(doc, win);
    } },
  });
})();

/* 19/11 au soir — la carte « Ton site » (dans la pile de cartes), TÉLÉPHONE seulement : 2 idées à la place de « Tu sais combien de filles l'ont vu. 128 »
   (vrai dans l'appli : compteur « Ce mois sur votre site » = visites › Réserver › réservations + provenance). ?v=T1 ou ?v=T2 (&go=site) */
(function () {
  const CSS = `
@media (max-width:760px){
  .tsx b.tt{display:block;font-family:'Abril Fatface',serif;font-weight:400;font-size:21px;line-height:1.2;margin:6px 0 14px;color:#1E1C1B}
  .tsx b.tt em{font-style:normal;color:#B03562}
  .tsx .note{font-size:11.5px;color:#6b625c;margin-top:12px}
  .ts1 .chemin{display:flex;align-items:flex-start;justify-content:space-between;gap:4px}
  .ts1 .et{flex:1;text-align:center}
  .ts1 .et span{display:block;font-family:'Abril Fatface',serif;font-size:30px;line-height:1;color:#B03562}
  .ts1 .et small{display:block;font-size:11.5px;color:#5F5751;margin-top:6px;line-height:1.3}
  .ts1 .fl{color:#D9B9C2;font-size:22px;margin-top:4px}
  .ts1 .et.fin span{color:#1E1C1B}
  .ts2 .ligne{display:grid;grid-template-columns:112px 1fr 48px;white-space:nowrap;align-items:center;gap:8px;font-size:13px;color:#1E1C1B;margin:7px 0}
  .ts2 .barre{height:9px;border-radius:5px;background:#F4E8E5;overflow:hidden}
  .ts2 .barre i{display:block;height:100%;border-radius:5px;background:#B03562;width:0;transition:width 1s cubic-bezier(.2,.8,.2,1)}
  .ts2.vu-la .barre i{width:var(--p)}
  .ts2 .ligne b{font-weight:500;text-align:right}
}
@media (prefers-reduced-motion:reduce){.ts2 .barre i{transition:none}}`;
  function carte(doc, win, html) {
    if (win.innerWidth > 760) return null;
    const c = [...doc.querySelectorAll('.appli .bento .case')].find(e => /combien de filles/.test(e.textContent)); if (!c) return null;
    c.classList.add('tsx'); c.innerHTML = html; return c;
  }
  function va(doc, win) {
    if (new URLSearchParams(location.search).get('go') !== 'site') return;
    const c = doc.querySelector('.tsx'); if (c) win.scrollTo({ top: c.getBoundingClientRect().top + win.scrollY - 140, behavior: 'instant' });
  }
  window.HAUT_TEL = Object.assign(window.HAUT_TEL || {}, {
    T1: { nom: 'T1 · le chemin (vues → réservations)', css: CSS, js(doc, win) {
      const c = carte(doc, win, `<div class="q">Ton site</div><b class="tt">Tu vois qui vient, <em>et qui réserve.</em></b>
        <div class="chemin"><div class="et"><span>128</span><small>l’ont vu</small></div><div class="fl">›</div>
        <div class="et"><span>41</span><small>ont touché<br>« Réserver »</small></div><div class="fl">›</div>
        <div class="et fin"><span>23</span><small>ont réservé</small></div></div>
        <div class="note">ce mois sur ton site · exemple</div>`);
      if (c) c.classList.add('ts1'); va(doc, win);
    } },
    T2: { nom: 'T2 · d’où elles viennent', css: CSS, js(doc, win) {
      const c = carte(doc, win, `<div class="q">Ton site</div><b class="tt">Tu sais d’où viennent <em>tes clientes.</em></b>
        <div class="ligne"><span>Instagram</span><div class="barre"><i style="--p:58%"></i></div><b>58 %</b></div>
        <div class="ligne"><span>Google</span><div class="barre"><i style="--p:31%"></i></div><b>31 %</b></div>
        <div class="ligne"><span>Bouche-à-oreille</span><div class="barre"><i style="--p:11%"></i></div><b>11 %</b></div>
        <div class="note">23 réservations ce mois · exemple</div>`);
      if (c) { c.classList.add('ts2'); new win.IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) c.classList.add('vu-la') }), { threshold: .4 }).observe(c); }
      va(doc, win);
    } },
  });
})();

/* 19/11 au soir — l'effet des cartes « l'un sur l'autre » (Pendant que tu dors / La veille / Une annulation / Ton site), TÉLÉPHONE seulement.
   ?v=S1 « notifications d'iPhone » : la carte du dessous rétrécit et s'assombrit quand la suivante arrive dessus.
   ?v=S2 « paquet de cartes » : chaque carte se pose un peu penchée, d'un côté puis de l'autre.   (&go=pile pour arriver dessus) */
(function () {
  const BASE = `@media (max-width:760px){ html body:not(#_) .appli .bento .case:not(.grande){will-change:transform} }`;
  const S1 = BASE + `
@media (max-width:760px){
  html body:not(#_) .appli .bento .case:not(.grande){top:calc(84px + var(--pile,0) * 9px);transform-origin:50% 0;
     transform:scale(calc(1 - var(--p,0) * .07));filter:brightness(calc(1 - var(--p,0) * .1));transition:none}
}`;
  const S2 = BASE + `
@media (max-width:760px){
  html body:not(#_) .appli .bento .case:not(.grande){top:calc(92px + var(--pile,0) * 5px);transform-origin:50% 60%;
     transform:rotate(calc(var(--sens) * (1.2deg + var(--p,0) * 1.6deg))) translateY(calc(var(--p,0) * 4px))}
  html body:not(#_) .appli .bento .case:not(.grande):nth-child(odd){--sens:-1}
  html body:not(#_) .appli .bento .case:not(.grande):nth-child(even){--sens:1}
}`;
  function suit(doc, win) {
    if (win.innerWidth > 760) return;
    const cs = [...doc.querySelectorAll('.appli .bento .case:not(.grande)')];
    const maj = () => cs.forEach((c, i) => { const n = cs[i + 1]; if (!n) { c.style.setProperty('--p', 0); return; }
      const a = c.getBoundingClientRect(), b = n.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, 1 - (b.top - a.top) / Math.max(1, a.height)));
      c.style.setProperty('--p', p.toFixed(3)); });
    win.addEventListener('scroll', maj, { passive: true }); maj();
    if (new URLSearchParams(location.search).get('go') === 'pile') {
      const b = doc.querySelector('.appli .bento .case:not(.grande)');
      if (b) win.scrollTo({ top: b.getBoundingClientRect().top + win.scrollY - 300, behavior: 'instant' });
    }
  }
  window.HAUT_TEL = Object.assign(window.HAUT_TEL || {}, {
    S0: { nom: 'S0 · la pile d’aujourd’hui', css: '', js: (d, w) => { if (new URLSearchParams(location.search).get('go') === 'pile') { const b = d.querySelector('.appli .bento .case:not(.grande)'); if (b) w.scrollTo({ top: b.getBoundingClientRect().top + w.scrollY - 300, behavior: 'instant' }); } } },
    S1: { nom: 'S1 · comme les notifications d’iPhone', css: S1, js: suit },
    S2: { nom: 'S2 · comme un paquet de cartes', css: S2, js: suit },
  });
})();

/* 19/11 nuit — l'ORDRE de la page sur TÉLÉPHONE (Marie) :
   « Loginail, c'est quoi ? » (2 téléphones + SMS, SANS la carte du prix) → « L'appli qui gère tout, dans ta poche » (lueurs)
   → la carte « Loginail 49,99 € » → R1 : les cartes « Elles réservent la nuit… » puis Classe ou baddie / R2 : Classe ou baddie directement.
   ?v=R1 ou ?v=R2 (&go=prix pour arriver sur la carte du prix) */
(function () {
  const CSS = `
@media (max-width:760px){
  .cq.cq-bis{background:none!important;margin:0!important;padding:26px 0 8px!important;overflow:visible!important;z-index:auto!important}
  .cq.cq-bis .cq-res{margin:0 auto}
}`;
  function ordre(doc, win, sansCartes) {
    if (win.innerWidth > 760) return;
    const res = doc.querySelector('#cest-quoi .cq-res'), ape = doc.getElementById('ape'); if (!res || !ape) return;
    const w = doc.createElement('div'); w.className = 'cq cq-bis'; w.appendChild(res); ape.after(w);
    if (sansCartes) { const b = doc.querySelector('.appli .bento'); if (b) b.style.display = 'none'; }
    if (new URLSearchParams(location.search).get('go') === 'prix') win.scrollTo({ top: w.getBoundingClientRect().top + win.scrollY - 160, behavior: 'instant' });
  }
  window.HAUT_TEL = Object.assign(window.HAUT_TEL || {}, {
    R1: { nom: 'R1 · prix après l’appli, puis les cartes', css: CSS, js: (d, w) => ordre(d, w, false) },
    R2: { nom: 'R2 · prix après l’appli, puis Classe ou baddie', css: CSS, js: (d, w) => ordre(d, w, true) },
  });
})();

/* 19/11 nuit — R3 = R2 + sous « L'appli qui gère tout, dans ta poche » : une zone (taille de la carte du prix) où des petites
   notifications NON cliquables « popent » de partout, l'une après l'autre : tout ce que l'appli fait. Plus de cartes « Elles réservent la nuit… ».
   ?v=R3 (&go=pop pour arriver dessus) */
(function () {
  const CSS = `
@media (max-width:760px){
  .cq.cq-bis{background:none!important;margin:0!important;padding:26px 0 8px!important;overflow:visible!important;z-index:auto!important}
  .cq.cq-bis .cq-res{margin:0 auto}
  .popz{position:relative;height:380px;max-width:380px;margin:18px auto 0;pointer-events:none}
  .popz .pz{position:absolute;display:flex;align-items:center;gap:9px;background:#fff;border-radius:16px;padding:9px 13px 9px 9px;white-space:nowrap;
     box-shadow:0 16px 32px -14px rgba(60,30,40,.3),0 2px 6px rgba(60,30,40,.05);opacity:0;scale:.6;rotate:var(--r);transform-origin:50% 50%;
     transition:opacity .35s ease,scale .45s cubic-bezier(.3,1.5,.5,1)}
  .popz .pz.la{opacity:1;scale:1}
  .popz .pz.part{opacity:0;scale:.85;transition:opacity .4s ease,scale .4s ease}
  .popz .pz i{width:32px;height:32px;border-radius:10px;background:#FBEFF3;color:#B03562;display:grid;place-items:center;font-style:normal;font-size:15px;flex:none;font-weight:600}
  .popz .pz b{display:block;font-size:13px;font-weight:500;color:#1E1C1B}
  .popz .pz small{display:block;font-size:11px;color:#6b625c;margin-top:1px}
}
@media (max-width:760px) and (prefers-reduced-motion:reduce){ .popz .pz{transition:opacity .2s linear} }`;
  const ITEMS = [
    ['☾', 'Nouvelle réservation · 2 h', 'elle réserve pendant que tu dors'],
    ['✉', 'Rappel SMS envoyé', 'inclus, sans limite'],
    ['◉', '128 vues cette semaine', 'tu sais combien l’ont vu'],
    ['◷', 'Une place se libère', 'la liste d’attente est prévenue'],
    ['♡', 'Anniversaire d’Inès', 'un petit mot, en un clic'],
    ['★', 'Fidélité · 6 sur 10', 'sa carte se remplit toute seule'],
    ['€', '55 € encaissés', 'ta caisse du jour'],
    ['↗', 'Instagram · 58 %', 'tu sais d’où elles viennent'],
    ['✕', 'Annulation', 'la place se remet en ligne'],
    ['%', '0 % de commission', 'tout est pour toi'],
  ];
  // 6 places dans la zone (gauche / droite en quinconce), une bulle par place à la fois
  const PLACES = [[2, 10, -3], [44, 66, 2], [6, 128, 2], [38, 190, -2], [3, 252, -3], [40, 314, 3]];
  function ordre(doc, win, bullesEnHaut) {
    if (win.innerWidth > 760) return;
    const res = doc.querySelector('#cest-quoi .cq-res'), ape = doc.getElementById('ape'); if (!res || !ape) return;
    const z = doc.createElement('div'); z.className = 'popz'; z.setAttribute('aria-label', 'Tout ce que fait l’appli');
    const w = doc.createElement('div'); w.className = 'cq cq-bis'; w.appendChild(res);
    if (bullesEnHaut) { const t = ape.querySelector('.t'); (t || ape.firstElementChild).after(z); ape.after(w); } else { ape.after(z); z.after(w); }
    const b = doc.querySelector('.appli .bento'); if (b) b.style.display = 'none';
    const els = ITEMS.map(([ic, t, s2], k) => { const e = doc.createElement('div'); e.className = 'pz';
      e.innerHTML = `<i>${ic}</i><div><b>${t}</b><small>${s2}</small></div>`; z.appendChild(e); return e; });
    let n = 0; const occupe = new Array(PLACES.length).fill(null);
    const pop = () => {
      const p = n % PLACES.length, e = els[n % els.length];
      const ancien = occupe[p]; if (ancien) { ancien.classList.remove('la'); ancien.classList.add('part'); setTimeout(() => ancien.classList.remove('part'), 420); }
      const [x, y, r] = PLACES[p]; e.style.left = x + '%'; e.style.top = y + 'px'; e.style.setProperty('--r', r + 'deg');
      e.classList.remove('part'); occupe[p] = e; n++; setTimeout(() => { void e.offsetWidth; e.classList.add('la'); }, ancien ? 300 : 0);
    };
    // on remplit d'abord les 6 places vite, puis une nouvelle bulle remplace la plus ancienne toutes les 0,9 s
    let lance = false;
    new win.IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting && !lance) { lance = true;
      for (let k = 0; k < PLACES.length; k++) setTimeout(pop, k * 260); setTimeout(() => win.setInterval(pop, 1100), PLACES.length * 260 + 600); } }), { threshold: .3 }).observe(z);
    const go = new URLSearchParams(location.search).get('go');
    if (go === 'pop' || go === 'prix') win.scrollTo({ top: z.getBoundingClientRect().top + win.scrollY - 230, behavior: 'instant' });
  }
  window.HAUT_TEL = Object.assign(window.HAUT_TEL || {}, {
    R3: { nom: 'R3 · les bulles qui popent sous l’appli', css: CSS, js: ordre },
    R4: { nom: 'R4 · titre, bulles, écrans, prix', css: CSS + `@media (max-width:760px){ #ape .popz{margin-top:14px;height:370px} }`, js: (d, w) => ordre(d, w, true) },
  });
})();

/* 19/11 nuit — 5 AUTRES façons de faire bouger les bulles (placement R4 gardé : titre → bulles → écrans → prix → Classe ou baddie).
   ?v=B1 … B5 (&go=pop). B1 la pile de notifs · B2 le défilé · B3 l'orbite · B4 la pluie · B5 le tas */
(function () {
  const ITEMS = [
    ['☾', 'Nouvelle réservation · 2 h', 'elle réserve pendant que tu dors'],
    ['✉', 'Rappel SMS envoyé', 'inclus, sans limite'],
    ['◉', '128 vues cette semaine', 'tu sais combien l’ont vu'],
    ['◷', 'Une place se libère', 'la liste d’attente est prévenue'],
    ['♡', 'Anniversaire d’Inès', 'un petit mot, en un clic'],
    ['★', 'Fidélité · 6 sur 10', 'sa carte se remplit toute seule'],
    ['€', '55 € encaissés', 'ta caisse du jour'],
    ['↗', 'Instagram · 58 %', 'tu sais d’où elles viennent'],
    ['✕', 'Annulation', 'la place se remet en ligne'],
    ['%', '0 % de commission', 'tout est pour toi'],
  ];
  const CSS = `
@media (max-width:760px){
  .cq.cq-bis{background:none!important;margin:0!important;padding:26px 0 8px!important;overflow:visible!important;z-index:auto!important}
  .cq.cq-bis .cq-res{margin:0 auto}
  .bz{position:relative;height:370px;max-width:380px;margin:14px auto 0;pointer-events:none}
  .bz .b{display:flex;align-items:center;gap:9px;background:#fff;border-radius:16px;padding:9px 13px 9px 9px;white-space:nowrap;width:max-content;
     box-shadow:0 16px 32px -14px rgba(60,30,40,.3),0 2px 6px rgba(60,30,40,.05)}
  .bz .b i{width:32px;height:32px;border-radius:10px;background:#FBEFF3;color:#B03562;display:grid;place-items:center;font-style:normal;font-size:15px;flex:none;font-weight:600}
  .bz .b b{display:block;font-size:13px;font-weight:500;color:#1E1C1B}
  .bz .b small{display:block;font-size:11px;color:#6b625c;margin-top:1px}
  /* B1 pile */
  .bz.b1 .b{position:absolute;left:50%;translate:-50% 0;transition:top .55s cubic-bezier(.2,.8,.2,1),opacity .45s ease,scale .45s ease;width:300px}
  /* B2 défilé */
  .bz.b2{display:flex;flex-direction:column;justify-content:center;gap:16px;overflow:hidden;margin-left:-18px;margin-right:-18px;max-width:none;
     -webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
  .bz.b2 .piste{display:flex;gap:12px;width:max-content;animation:bzDefile 34s linear infinite;padding:4px 0}
  .bz.b2 .piste.r{animation-direction:reverse;animation-duration:40s}
  /* B3 orbite */
  .bz.b3 .coeur{position:absolute;left:50%;top:50%;width:84px;height:84px;margin:-42px 0 0 -42px;border-radius:24px;background:#1E1C1B;display:grid;place-items:center;
     box-shadow:0 20px 40px -16px rgba(60,30,40,.45)}
  .bz.b3 .coeur img{width:46px;height:46px}
  .bz.b3 .b{position:absolute;left:50%;top:50%;padding:7px 11px 7px 7px}
  .bz.b3 .b small{display:none}
  .bz.b3 .b i{width:26px;height:26px;font-size:13px;border-radius:8px}
  /* B4 pluie */
  .bz.b4{overflow:hidden;-webkit-mask-image:linear-gradient(180deg,transparent,#000 14%,#000 82%,transparent);mask-image:linear-gradient(180deg,transparent,#000 14%,#000 82%,transparent)}
  .bz.b4 .b{position:absolute;top:-70px;animation:bzPluie var(--d) linear infinite;animation-delay:var(--dl);rotate:var(--r)}
  /* B5 tas */
  .bz.b5 .b{position:absolute;left:50%;opacity:0;transition:none}
  .bz.b5 .b.tombe{animation:bzTombe .7s cubic-bezier(.3,1.4,.5,1) forwards}
  .bz.b5.vide .b{transition:opacity .5s ease,translate .5s ease;opacity:0!important;translate:-50% 30px!important}
}
@keyframes bzDefile{to{transform:translateX(-50%)}}
@keyframes bzPluie{0%{transform:translateY(0)}100%{transform:translateY(470px)}}
@keyframes bzTombe{0%{opacity:0;translate:-50% -260px;rotate:0deg}70%{opacity:1}100%{opacity:1;translate:-50% 0;rotate:var(--r)}}
@media (prefers-reduced-motion:reduce){.bz.b2 .piste,.bz.b4 .b{animation:none}}`;
  const bulle = (doc, [ic, t, s2]) => { const e = doc.createElement('div'); e.className = 'b'; e.innerHTML = `<i>${ic}</i><div><b>${t}</b><small>${s2}</small></div>`; return e; };
  function place(doc, win) {
    if (win.innerWidth > 760) return null;
    const res = doc.querySelector('#cest-quoi .cq-res'), ape = doc.getElementById('ape'); if (!res || !ape) return null;
    const z = doc.createElement('div'); z.className = 'bz'; z.setAttribute('aria-label', 'Tout ce que fait l’appli');
    const w = doc.createElement('div'); w.className = 'cq cq-bis'; w.appendChild(res);
    const t = ape.querySelector('.t'); (t || ape.firstElementChild).after(z); ape.after(w);
    const b = doc.querySelector('.appli .bento'); if (b) b.style.display = 'none';
    if (new URLSearchParams(location.search).get('go') === 'pop') win.scrollTo({ top: z.getBoundingClientRect().top + win.scrollY - 230, behavior: 'instant' });
    return z;
  }
  const quandVisible = (win, el, f) => { let ok = false; new win.IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting && !ok) { ok = true; f(); } }), { threshold: .3 }).observe(el); };
  const MODES = {
    // B1 : comme l'écran verrouillé d'un iPhone, la nouvelle arrive en haut et pousse les autres vers le bas
    B1(doc, win, z) { z.classList.add('b1'); const pile = []; let n = 0; const H = 62;
      const ajoute = () => { const e = bulle(doc, ITEMS[n++ % ITEMS.length]); e.style.top = '-40px'; e.style.opacity = '0'; e.style.scale = '.92'; z.appendChild(e); pile.unshift(e);
        requestAnimationFrame(() => requestAnimationFrame(() => pile.forEach((x, i) => { x.style.top = (8 + i * H) + 'px'; x.style.opacity = i > 4 ? '0' : String(1 - i * .12); x.style.scale = String(1 - i * .025); })));
        if (pile.length > 6) { const v = pile.pop(); setTimeout(() => v.remove(), 600); } };
      quandVisible(win, z, () => { for (let k = 0; k < 4; k++) setTimeout(ajoute, k * 350); setTimeout(() => win.setInterval(ajoute, 1500), 1800); }); },
    // B2 : deux rubans qui défilent en sens contraire, sans fin
    B2(doc, win, z) { z.classList.add('b2');
      [[0, 5], [5, 10]].forEach(([a, b2], k) => { const p = doc.createElement('div'); p.className = 'piste' + (k ? ' r' : '');
        const lot = ITEMS.slice(a, b2).concat(ITEMS.slice(a, b2)); lot.concat(lot).forEach(it => p.appendChild(bulle(doc, it))); z.appendChild(p); });
      const p3 = doc.createElement('div'); p3.className = 'piste'; p3.style.animationDuration = '46s'; ITEMS.concat(ITEMS).forEach(it => p3.appendChild(bulle(doc, it))); z.appendChild(p3); },
    // B3 : les bulles tournent doucement autour de l'icône Loginail
    B3(doc, win, z) { z.classList.add('b3'); const c = doc.createElement('div'); c.className = 'coeur'; c.innerHTML = '<img src="../favicon.svg" alt="">'; z.appendChild(c);
      const els = ITEMS.slice(0, 8).map(it => { const e = bulle(doc, it); z.appendChild(e); return e; }); let a0 = 0;
      const tour = () => { a0 += .0035; els.forEach((e, i) => { const a = a0 + i * Math.PI * 2 / els.length, x = Math.cos(a) * 112, y = Math.sin(a) * 150, p = (Math.sin(a) + 1) / 2;
        e.style.transform = `translate(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px)) scale(${(.82 + p * .22).toFixed(3)})`; e.style.zIndex = Math.round(p * 10); e.style.opacity = (.55 + p * .45).toFixed(2); });
        win.requestAnimationFrame(tour); }; tour(); },
    // B4 : les bulles tombent doucement en 3 colonnes, comme une pluie
    B4(doc, win, z) { z.classList.add('b4');
      ITEMS.forEach((it, i) => { const e = bulle(doc, it), droite = i % 2 === 1, k = Math.floor(i / 2);
        if (droite) { e.style.right = '0'; } else { e.style.left = '0'; }
        e.style.setProperty('--r', (droite ? 2 : -2) + 'deg'); e.style.setProperty('--d', '12s'); e.style.setProperty('--dl', (-(k * 2.4) - (droite ? 1.2 : 0)) + 's'); z.appendChild(e); }); },
    // B5 : elles tombent du haut et s'empilent en tas, puis le tas s'envole et ça recommence
    B5(doc, win, z) { z.classList.add('b5'); let n = 0, tas = [], pause = 0;
      const tombe = () => { if (pause > 0) { pause--; return; }
        if (tas.length >= 6) { z.classList.add('vide'); setTimeout(() => { tas.forEach(e => e.remove()); tas = []; z.classList.remove('vide'); }, 550); pause = 1; return; }
        const e = bulle(doc, ITEMS[n++ % ITEMS.length]), k = tas.length; e.style.top = (306 - k * 58) + 'px'; e.style.marginLeft = ((k % 2 ? 1 : -1) * (8 + (k * 7) % 22)) + 'px';
        e.style.setProperty('--r', ((k % 2 ? 1 : -1) * (2 + (k * 3) % 5)) + 'deg'); z.appendChild(e); tas.push(e); requestAnimationFrame(() => e.classList.add('tombe'));
        if (tas.length === 6) pause = 3; };
      setTimeout(tombe, 200); win.setInterval(tombe, 850); },
  };
  const NOMS = { B1: 'B1 · la pile de notifs', B2: 'B2 · le défilé', B3: 'B3 · l’orbite', B4: 'B4 · la pluie', B5: 'B5 · le tas' };
  const V = {}; Object.keys(MODES).forEach(k => V[k] = { nom: NOMS[k], css: CSS, js: (d, w) => { const z = place(d, w); if (z) MODES[k](d, w, z); } });
  window.HAUT_TEL = Object.assign(window.HAUT_TEL || {}, V);
})();

/* 19/11 nuit — la FIN de l'accueil sur TÉLÉPHONE (après Classe ou baddie), 2 versions. Communs :
   « Combien ça coûte », les questions et le pied en rose poudré avec le bord festonné (comme l'ordinateur, choix de Marie),
   et plus de 2e carte « 49,99 € » (elle est déjà juste après l'appli) : la frise + un seul bouton.
   F1 : le texte de Marie complet · F2 : le texte de Marie raccourci (3 phrases).  ?v=F1 / F2 (&go=fin) */
(function () {
  const CSS = `
@media (max-width:760px){
  html body:not(#_) .v3 .v3prix{background:linear-gradient(180deg,#F7E4EC 0,#F4E1EA 100%);color:var(--encre);border-radius:0;position:relative;overflow:visible;margin-top:40px;padding:60px 0 30px}
  html body:not(#_) .v3 .v3prix::before{content:"";position:absolute;left:0;right:0;top:-17px;height:18px;pointer-events:none;background:radial-gradient(circle at 50% 100%,#F7E4EC 17px,transparent 18px) 0 0/36px 18px repeat-x}
  html body:not(#_) .v3 .v3prix::after{content:"";position:absolute;left:0;right:0;top:12px;height:4px;pointer-events:none;background:radial-gradient(circle,rgba(224,98,140,.55) 1.6px,transparent 2.2px) 9px 0/18px 4px repeat-x}
  html body:not(#_) .v3 .v3prix .k{color:var(--fram)}
  html body:not(#_) .v3 .v3prix .titre em{color:var(--fram)}
  html body:not(#_) .v3 .v3frise{border-left-color:rgba(176,53,98,.25)}
  html body:not(#_) .v3 .v3frise li span{color:#5b524d}
  html body:not(#_) .v3 .v3carte{display:none}
  html body:not(#_) .v3 .v3faq,html body:not(#_) .v3 .pied,html body:not(#_) footer.pied{background:#F4E1EA;color:var(--encre)}
  html body:not(#_) .v3 .v3faq .k{color:var(--fram)!important}
  html body:not(#_) .v3 .v3faq details{border-top-color:rgba(30,28,27,.1)}
  html body:not(#_) .v3 .v3faq summary::after{color:var(--fram)}
  html body:not(#_) .v3 .v3faq details p{color:#5b524d}
  html body:not(#_) .v3 .pied{color:#7a6f69}
  html body:not(#_) .v3 .pied a{color:#5b524d}
  .fin-go{display:flex;flex-direction:column;align-items:center;gap:10px;margin:30px 0 10px}
  .fin-go a{display:inline-flex;align-items:center;justify-content:center;height:56px;padding:0 26px;border-radius:99px;background:#1E1C1B;color:#fff;font:500 15px Jost,sans-serif;text-decoration:none;box-shadow:0 16px 30px -14px rgba(30,28,27,.5)}
  .fin-go small{font-size:12.5px;color:#6b625c}
}`;
  function fin(doc, win, court) {
    if (win.innerWidth > 760) return;
    const fr = doc.querySelector('.v3frise');
    if (fr && !doc.querySelector('.fin-go')) { const g = doc.createElement('div'); g.className = 'fin-go';
      g.innerHTML = '<a href="../loginail-creer/index.html">Créer mon site gratuitement →</a><small>1er mois offert · sans engagement · tu arrêtes en 1 clic</small>'; fr.after(g); }
    if (court) { const t = doc.querySelector('.marie .texte-long'); if (t) t.innerHTML = '<p>Je passe mes journées à poser des ongles, comme toi.</p><p>Je voulais un site <b>aussi beau que nos ongles</b>, qui se fasse tout seul, <b>sans commission</b>. Il n’existait pas. Alors je l’ai créé.</p>'; }
    if (new URLSearchParams(location.search).get('go') === 'fin') { const m = doc.querySelector('section.marie'); if (m) win.scrollTo({ top: m.getBoundingClientRect().top + win.scrollY - 60, behavior: 'instant' }); }
  }
  window.HAUT_TEL = Object.assign(window.HAUT_TEL || {}, {
    F0: { nom: 'F0 · la fin d’aujourd’hui', css: '', js: (d, w) => { if (w.innerWidth > 760) return; const m = d.querySelector('section.marie'); if (m && new URLSearchParams(location.search).get('go') === 'fin') w.scrollTo({ top: m.getBoundingClientRect().top + w.scrollY - 60, behavior: 'instant' }); } },
    F1: { nom: 'F1 · fin rose, texte de Marie complet', css: CSS, js: (d, w) => fin(d, w, false) },
    F2: { nom: 'F2 · fin rose, texte de Marie raccourci', css: CSS, js: (d, w) => fin(d, w, true) },
  });
})();

/* 19/11 nuit — 3 autres jeux de charms pour le BAS de l'accueil (téléphone), même esprit que « ils tombent et on les lance ».
   ?v=J1 le bocal (on le secoue) · J2 le collier (ils se balancent) · J3 la pluie (chaque toucher en fait tomber d'autres)   (&go=pied) */
(function () {
  const C = '../loginail-site/charms-mini/';
  const LOT = ['noeudcerise', 'perle', 'bouledisco', 'coeurchrome', 'cerisedisco', 'ceriseruban', 'cerisecoeur', 'boule8', 'bonbon', 'arcenciel', 'papilloncyber', 'saturne', 'cerisesverre', 'boulecristallune'];
  const CSS = `
@media (max-width:760px){
  .jeu{position:relative;margin:4px auto 14px;touch-action:none;user-select:none;-webkit-user-select:none}
  .jeu img{position:absolute;left:0;top:0;pointer-events:none;filter:drop-shadow(0 6px 8px rgba(80,30,45,.2));will-change:transform}
  .jeu .aide{position:absolute;left:0;right:0;bottom:-2px;text-align:center;font:500 11px Jost,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#B03562;opacity:.75}
  .jeu.j1{width:210px;height:200px}
  .jeu.j1 .verre{position:absolute;inset:18px 0 18px 0;border-radius:46px 46px 64px 64px;background:linear-gradient(120deg,rgba(255,255,255,.55),rgba(255,255,255,.18));
     box-shadow:inset 0 0 0 2px rgba(255,255,255,.9),inset 0 -14px 30px rgba(224,98,140,.12),0 18px 34px -18px rgba(120,40,70,.35);backdrop-filter:blur(2px)}
  .jeu.j1 .verre::after{content:"";position:absolute;left:18px;top:22px;width:10px;height:70px;border-radius:6px;background:rgba(255,255,255,.75)}
  .jeu.j1 .couvercle{position:absolute;left:30px;right:30px;top:6px;height:18px;border-radius:8px;background:linear-gradient(#E9B9C9,#D98FA9);box-shadow:0 4px 8px -4px rgba(120,40,70,.4)}
  .jeu.j1.secoue{animation:bocal .45s ease}
  .jeu.j2{width:100%;height:170px}
  .jeu.j2 svg{position:absolute;inset:0;width:100%;height:60px;overflow:visible}
  .jeu.j2 .fil{position:absolute;width:1.5px;background:linear-gradient(#C9A27A,#E8D2B5);transform-origin:50% 0}
  .jeu.j3{width:100%;height:220px;overflow:hidden;border-radius:20px}
}
@keyframes bocal{0%,100%{transform:rotate(0)}25%{transform:rotate(-7deg)}60%{transform:rotate(6deg)}}`;
  function scene(doc, win, cls, h) {
    if (win.innerWidth > 760) return null;
    const old = doc.querySelector('.pied-ch'); if (!old) return null;
    const z = doc.createElement('div'); z.className = 'jeu ' + cls; old.replaceWith(z);
    if (new URLSearchParams(location.search).get('go') === 'pied') setTimeout(() => win.scrollTo({ top: doc.documentElement.scrollHeight, behavior: 'instant' }), 50);
    return z;
  }
  const img = (doc, z, f, w) => { const i = doc.createElement('img'); i.src = C + f + '.webp'; i.alt = ''; i.style.width = w + 'px'; z.appendChild(i); return i; };
  // petit moteur : gravité, rebonds, roulement, chocs entre charms, dans une boîte {x0,x1,y0,y1}
  function moteur(win, B, boite, place) {
    let raf = 0;
    const pas = () => { raf = 0; const b0 = boite(); let bouge = false;
      for (const b of B) { if (b.tenu) { bouge = true; continue; }
        b.vy += .5; b.vx *= .995; b.x += b.vx; b.y += b.vy;
        if (b.y > b0.y1 - b.w) { b.y = b0.y1 - b.w; b.vy = Math.abs(b.vy) > 1.2 ? -b.vy * .4 : 0; b.vx *= .94; b.va = b.vx / (b.w / 2) * 57.3; } else b.va *= .99;
        if (b.y < b0.y0) { b.y = b0.y0; b.vy = Math.abs(b.vy) * .4; }
        if (b.x < b0.x0) { b.x = b0.x0; b.vx = Math.abs(b.vx) * .6; } if (b.x > b0.x1 - b.w) { b.x = b0.x1 - b.w; b.vx = -Math.abs(b.vx) * .6; }
        b.a += b.va; if (Math.abs(b.vx) > .05 || Math.abs(b.vy) > .05 || b.y < b0.y1 - b.w - .5) bouge = true; }
      for (let i = 0; i < B.length; i++) for (let j = i + 1; j < B.length; j++) { const p = B[i], q = B[j];
        const dx = (q.x + q.w / 2) - (p.x + p.w / 2), dy = (q.y + q.w / 2) - (p.y + p.w / 2), d = Math.hypot(dx, dy) || 1, m = (p.w + q.w) / 2 * .8;
        if (d < m) { const k = (m - d) / d / 2; if (!p.tenu) { p.x -= dx * k; p.y -= dy * k; } if (!q.tenu) { q.x += dx * k; q.y += dy * k; }
          const rv = (q.vx - p.vx) * dx / d + (q.vy - p.vy) * dy / d; if (rv < 0) { const im = -rv * .7; if (!p.tenu) { p.vx -= im * dx / d; p.vy -= im * dy / d; } if (!q.tenu) { q.vx += im * dx / d; q.vy += im * dy / d; } } bouge = true; } }
      B.forEach(place); if (bouge) raf = win.requestAnimationFrame(pas); };
    return { reveille: () => { if (!raf) raf = win.requestAnimationFrame(pas); } };
  }
  const pose = b => { b.el.style.transform = `translate(${b.x.toFixed(1)}px,${b.y.toFixed(1)}px) rotate(${b.a.toFixed(1)}deg)`; };
  function prendre(z, B, m) { // prendre un charm au doigt et le lancer (le plus proche du doigt)
    let t = null, g = false, lx = 0, ly = 0, lt = 0, ox = 0, oy = 0;
    z.addEventListener('pointerdown', e => { const R = z.getBoundingClientRect(), x = e.clientX - R.left, y = e.clientY - R.top;
      let best = null, dm = 40; B.forEach(b => { const d = Math.hypot(b.x + b.w / 2 - x, b.y + b.w / 2 - y); if (d < Math.max(dm, b.w / 2 + 6)) { dm = d; best = b; } });
      g = !!best; if (!best) return false; t = best; t.tenu = true; ox = x - t.x; oy = y - t.y; lx = e.clientX; ly = e.clientY; lt = performance.now(); z.setPointerCapture(e.pointerId); m.reveille(); });
    z.addEventListener('pointermove', e => { if (!t) return; const R = z.getBoundingClientRect(), now = performance.now(), dt = Math.max(8, now - lt);
      t.vx = (e.clientX - lx) / dt * 16; t.vy = (e.clientY - ly) / dt * 16; lx = e.clientX; ly = e.clientY; lt = now; t.x = e.clientX - R.left - ox; t.y = e.clientY - R.top - oy; pose(t); });
    const lache = () => { if (!t) return; t.tenu = false; const sp = Math.hypot(t.vx, t.vy); if (sp > 26) { t.vx *= 26 / sp; t.vy *= 26 / sp; } t = null; m.reveille(); };
    z.addEventListener('pointerup', lache); z.addEventListener('pointercancel', lache);
    return () => g; }
  const JEUX = {
    // J1 — le bocal : 9 charms dans un bocal en verre ; toucher le bocal = le secouer, et on peut aussi en attraper un
    J1(doc, win) { const z = scene(doc, win, 'j1'); if (!z) return; z.innerHTML = '<div class="verre"></div><div class="couvercle"></div><div class="aide">Secoue-moi</div>';
      const B = LOT.slice(0, 9).map((f, i) => { const w = [34, 30, 38, 28, 34, 32, 30, 36, 28][i]; return { el: img(doc, z, f, w), w, x: 20 + (i % 4) * 40, y: 30 + Math.floor(i / 4) * 30, vx: 0, vy: 0, a: 0, va: 0 }; });
      const m = moteur(win, B, () => ({ x0: 8, x1: 202, y0: 26, y1: 176 }), pose); const tenu = prendre(z, B, m); m.reveille();
      z.addEventListener('pointerup', () => { if (tenu()) return; z.classList.remove('secoue'); void z.offsetWidth; z.classList.add('secoue');
        B.forEach(b => { b.vx += (Math.random() - .5) * 14; b.vy -= 6 + Math.random() * 8; b.va = (Math.random() - .5) * 30; }); m.reveille(); }); },
    // J2 — le collier : 7 charms pendus à un fil doré ; on les touche ou on les tire, ils se balancent
    J2(doc, win) { const z = scene(doc, win, 'j2'); if (!z) return; const W = z.clientWidth;
      z.innerHTML = `<svg viewBox="0 0 ${W} 60" preserveAspectRatio="none"><path d="M0 8 Q ${W / 2} 62 ${W} 8" fill="none" stroke="#D9B98F" stroke-width="2"/></svg><div class="aide">Fais-les danser</div>`;
      const N = 7, P = []; for (let i = 0; i < N; i++) { const t = (i + 1) / (N + 1), x = t * W, y = (1 - t) * (1 - t) * 8 + 2 * (1 - t) * t * 62 + t * t * 8; const L = 34 + (i % 3) * 14, w = [34, 40, 30, 44, 30, 40, 34][i];
        const f = doc.createElement('div'); f.className = 'fil'; f.style.left = x + 'px'; f.style.top = y + 'px'; f.style.height = L + 'px'; z.appendChild(f);
        P.push({ x, y, L, w, a: 0, va: (Math.random() - .5) * .04, el: img(doc, z, LOT[i], w), fil: f }); }
      let tenu = null;
      const dessine = () => P.forEach(p => { const ex = p.x + Math.sin(p.a) * p.L, ey = p.y + Math.cos(p.a) * p.L; p.fil.style.transform = `rotate(${(-p.a * 57.3).toFixed(1)}deg)`;
        p.el.style.transform = `translate(${(ex - p.w / 2).toFixed(1)}px,${(ey - 4).toFixed(1)}px) rotate(${(-p.a * 57.3).toFixed(1)}deg)`; });
      const pas = () => { P.forEach(p => { if (p === tenu) return; p.va += -Math.sin(p.a) * .006 + (Math.random() - .5) * .0006; p.va *= .985; p.a += p.va; }); dessine(); win.requestAnimationFrame(pas); }; pas();
      z.addEventListener('pointerdown', e => { const R = z.getBoundingClientRect(), x = e.clientX - R.left, y = e.clientY - R.top; let best = null, dm = 60;
        P.forEach(p => { const ex = p.x + Math.sin(p.a) * p.L, ey = p.y + Math.cos(p.a) * p.L + p.w / 2, d = Math.hypot(ex - x, ey - y); if (d < dm) { dm = d; best = p; } });
        if (!best) return; tenu = best; z.setPointerCapture(e.pointerId); });
      z.addEventListener('pointermove', e => { if (!tenu) return; const R = z.getBoundingClientRect(), x = e.clientX - R.left, y = e.clientY - R.top;
        const na = Math.atan2(x - tenu.x, Math.max(10, y - tenu.y)); tenu.va = (na - tenu.a) * .6; tenu.a = Math.max(-1.3, Math.min(1.3, na)); });
      const lache = () => { if (tenu && Math.abs(tenu.va) < .01) tenu.va = (Math.random() < .5 ? -1 : 1) * .12; tenu = null; };
      z.addEventListener('pointerup', lache); z.addEventListener('pointercancel', lache); },
    // J3 — la pluie : 5 charms au départ ; chaque toucher en fait tomber 3 autres du haut ; ils s'entassent (24 au plus)
    J3(doc, win) { const z = scene(doc, win, 'j3'); if (!z) return; z.innerHTML = '<div class="aide">Touche pour en faire tomber</div>'; const W = z.clientWidth;
      const B = []; const ajoute = (x, f) => { const w = 28 + Math.round(Math.random() * 18); B.push({ el: img(doc, z, f, w), w, x: Math.max(0, Math.min(W - w, x - w / 2)), y: -50, vx: (Math.random() - .5) * 3, vy: 0, a: Math.random() * 360, va: (Math.random() - .5) * 8 });
        if (B.length > 24) { const v = B.shift(); v.el.style.transition = 'opacity .4s'; v.el.style.opacity = 0; setTimeout(() => v.el.remove(), 420); } };
      const m = moteur(win, B, () => ({ x0: 0, x1: W, y0: -60, y1: 206 }), pose);
      ['noeudcerise', 'perle', 'bouledisco', 'coeurchrome', 'cerisedisco'].forEach((f, i) => setTimeout(() => { ajoute(W * (.15 + i * .17), f); m.reveille(); }, 300 + i * 220));
      const tenu = prendre(z, B, m);
      z.addEventListener('pointerup', e => { if (tenu()) return; const R = z.getBoundingClientRect(), x = e.clientX - R.left;
        for (let k = 0; k < 3; k++) setTimeout(() => { ajoute(x + (k - 1) * 30, LOT[Math.floor(Math.random() * LOT.length)]); m.reveille(); }, k * 120); }); },
  };
  const NOMS = { J1: 'J1 · le bocal à secouer', J2: 'J2 · le collier qui se balance', J3: 'J3 · la pluie de charms' };
  const V = {}; Object.keys(JEUX).forEach(k => V[k] = { nom: NOMS[k], css: CSS, js: (d, w) => JEUX[k](d, w) });
  window.HAUT_TEL = Object.assign(window.HAUT_TEL || {}, V);
})();

/* 19/11 nuit — le « vide » entre « Créer mon site gratuitement » (fin du prix) et « Bon à savoir », TÉLÉPHONE. ?v=K1/K2/K3 (&go=vide)
   K1 : la grande carte du prix revient (comme avant, sous la frise) · K2 : une carte « Tout est inclus » sans le prix, avec des charms
   K3 : une ligne de pastilles « sans engagement / 1 clic / 0 % » + une guirlande de charms qui se balance */
(function () {
  const CH = '../loginail-site/charms-mini/';
  const CSS = `
@media (max-width:760px){
  .k2c{background:#fff;border-radius:26px;padding:24px 20px 22px;margin:26px 0 6px;position:relative;box-shadow:0 30px 60px -34px rgba(120,40,70,.45);text-align:left}
  .k2c h3{font-family:'Abril Fatface',serif;font-weight:400;font-size:24px;margin:0 0 14px;color:#1E1C1B;text-align:center}
  .k2c h3 em{font-style:normal;color:#B03562}
  .k2c ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:12px 10px}
  .k2c li{display:flex;align-items:center;gap:8px;font-size:13.5px;color:#3d3632;line-height:1.3}
  .k2c li img{width:28px;height:28px;object-fit:contain;flex:none}
  .k2c .ch{position:absolute;width:52px;pointer-events:none;filter:drop-shadow(0 8px 10px rgba(80,30,45,.22))}
  .k3p{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:22px 0 4px}
  .k3p span{display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 13px;border-radius:99px;background:#fff;font-size:13px;color:#1E1C1B;box-shadow:0 8px 20px -14px rgba(120,40,70,.5)}
  .k3p span b{color:#B03562;font-weight:600}
  .k3g{position:relative;height:84px;margin:12px -18px 0}
  .k3g svg{position:absolute;inset:0;width:100%;height:30px}
  .k3g img{position:absolute;width:34px;transform-origin:50% -14px;animation:k3bal 3.2s ease-in-out infinite;filter:drop-shadow(0 6px 8px rgba(80,30,45,.2))}
}
@keyframes k3bal{0%,100%{rotate:-8deg}50%{rotate:8deg}}
@media (prefers-reduced-motion:reduce){.k3g img{animation:none}}`;
  function base(doc, win) { if (win.innerWidth > 760) return null; const g = doc.querySelector('.fin-go'); if (!g) return null;
    if (new URLSearchParams(location.search).get('go') === 'vide') setTimeout(() => win.scrollTo({ top: g.getBoundingClientRect().top + win.scrollY - 330, behavior: 'instant' }), 60);
    return g; }
  window.HAUT_TEL = Object.assign(window.HAUT_TEL || {}, {
    K1: { nom: 'K1 · la carte du prix revient', css: CSS + `@media (max-width:760px){ html body:not(#_) .v3 .v3carte{display:block!important;margin-top:26px} html body:not(#_) .v3 .fin-go{display:none!important} }`,
      js(doc, win) { if (win.innerWidth > 760) return; setTimeout(() => { const c = doc.querySelector('.v3 .v3carte'); if (c && new URLSearchParams(location.search).get('go') === 'vide') win.scrollTo({ top: c.getBoundingClientRect().top + win.scrollY - 200, behavior: 'instant' }); }, 120); } },
    K2: { nom: 'K2 · « Tout est inclus » avec des charms', css: CSS, js(doc, win) { const g = base(doc, win); if (!g) return;
      const c = doc.createElement('div'); c.className = 'k2c';
      const L = [['cerisedisco', 'Ton site à ton nom'], ['coeurchrome', 'Réservation jour et nuit'], ['bouledisco', 'Rappels SMS sans limite'], ['perle', 'Agenda et fiches clientes'], ['noeudcerise', 'Ta caisse du jour'], ['etoilecristal', 'Ton adresse en .fr dès le 2e mois']];
      c.innerHTML = '<img class="ch" src="' + CH + 'ceriseruban.webp" style="right:-10px;top:-22px;rotate:12deg" alt=""><h3>Tout est <em>inclus.</em></h3><ul>' + L.map(([f, t]) => '<li><img src="' + CH + f + '.webp" alt="">' + t + '</li>').join('') + '</ul>';
      g.before(c); } },
    K3: { nom: 'K3 · pastilles + guirlande de charms', css: CSS, js(doc, win) { const g = base(doc, win); if (!g) return;
      const p = doc.createElement('div'); p.className = 'k3p'; p.innerHTML = '<span><b>✓</b> Sans engagement</span><span><b>✓</b> Tu arrêtes en 1 clic</span><span><b>0 %</b> de commission</span><span><b>✓</b> Rien à installer</span>';
      const gu = doc.createElement('div'); gu.className = 'k3g'; const W = 390; let h = '<svg viewBox="0 0 390 30" preserveAspectRatio="none"><path d="M0 4 Q 195 34 390 4" fill="none" stroke="#D9B98F" stroke-width="1.6"/></svg>';
      ['noeudcerise', 'perle', 'bouledisco', 'coeurchrome', 'cerisedisco', 'etoilecristal', 'saturne'].forEach((f, i) => { const t = (i + 1) / 8, x = t * 100, y = (1 - t) * (1 - t) * 4 + 2 * (1 - t) * t * 34 + t * t * 4;
        h += '<img src="' + CH + f + '.webp" alt="" style="left:calc(' + x + '% - 17px);top:' + (y + 12) + 'px;animation-delay:' + (-i * .45) + 's">'; });
      gu.innerHTML = h; g.after(p); p.after(gu); } },
  });
})();
