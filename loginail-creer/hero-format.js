/* 06/11 (Marie) : le haut du site en « format » au choix, par-dessus n'importe quel template.
   A = photo plein écran, le nom en grand en blanc dessus ; C = magazine (grande photo, le nom à cheval dessus).
   Activé par &fmt=A / &fmt=C ou BR.fmt. Le haut d'origine est seulement caché (rien n'est perdu). */
(() => {
  /* 06/11 (Marie) : plus de « haut du site » à choisir : c'est la FORME qui décide.
     Stiletto = plein écran (A), Carré = bandeau (F), Ovale = magazine (C), Carré arrondi = titre géant (E), Amande et Coffin = leur haut à eux. */
  const fmt = () => { try { const q = new URLSearchParams(location.search), b = (typeof BR !== "undefined" && BR) || {};
      const on = k => q.get(k) === "1" || b[k] === true || b[k] === "1";
      if (on("arrondi")) return "E"; if (on("coffin")) return ""; if (on("epure")) return "C";
      const st = String(q.get("style") || b.style || "1"); return st === "2" ? "A" : st === "3" ? "F" : "G";   /* 07/11 (Marie) : Amande = photo en forme d’amande */ } catch (e) { return ""; } };
  const css = document.createElement("style");
  css.textContent = `.hf-cache{display:none!important}
  .hf{position:relative;overflow:hidden;color:#fff}
  .hf img.hf-ph{display:block;width:100%;object-fit:cover}
  .hf-k{font:400 10px Jost,sans-serif;letter-spacing:.26em;text-transform:uppercase}
  .hf-nom{font-weight:400;line-height:.92;word-break:normal;overflow-wrap:normal}
  .hf-et{font:400 11.5px Jost,sans-serif;letter-spacing:.04em;margin-top:8px;opacity:.9}
  .hf-res{display:inline-flex;align-items:center;justify-content:center;height:50px;padding:0 26px;border-radius:25px;border:0;font:500 11px Jost,sans-serif;letter-spacing:.2em;text-transform:uppercase;cursor:pointer}
  .hf .dispo-t,.hf .dispo-p{margin:0 0 12px!important}
  /* A */
  .hf.A{height:var(--hf-h,100vh)}
  .hf.A img.hf-ph{position:absolute;left:0;right:0;top:0;height:calc(100% + 90px)}
  .hf.A::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.38) 0%,rgba(0,0,0,0) 26%,rgba(0,0,0,.12) 50%,rgba(0,0,0,.8) 100%);pointer-events:none}
  .hf.A .hf-haut{position:absolute;left:0;right:0;top:var(--hf-top,22px);z-index:2;text-align:center}
  .hf.A .hf-bas{position:absolute;left:24px;right:24px;bottom:calc(var(--hf-bas,0px) + 34px);z-index:2}
  .hf.A .hf-nom{font-size:clamp(54px,17vw,84px);margin:8px 0 2px;color:#fff}
  .hf.A .hf-res{margin-top:18px;background:#fff;color:#1E1C1B}
  /* C */
  .hf.C{color:var(--encre,#1E1C1B)}
  .hf.C img.hf-ph{height:calc(var(--hf-h,100vh) * .64)}
  .hf.C .hf-nom{position:relative;z-index:2;margin:-0.95em 22px 0;font-size:clamp(60px,19vw,92px)}
  .hf.C .hf-nom span{display:block}
  .hf.C .hf-nom .sur{color:#fff;text-shadow:0 2px 18px rgba(0,0,0,.28)}
  .hf.C .hf-bas{padding:14px 24px 30px}.ecran:has(.fond-site) .hf.C .hf-nom span:not(.sur),.ecran:has(.fond-site) .hf.C .hf-bas{background:var(--creme,#F6F3EF)}.ecran:has(.fond-site) .hf.C .hf-nom span:not(.sur){box-shadow:-22px 0 0 var(--creme,#F6F3EF),22px 0 0 var(--creme,#F6F3EF)}
  .hf.C .hf-res{margin-top:16px;background:var(--encre,#1E1C1B);color:#F6F3EF}
  /* B : arche : le nom en haut, une photo d'ongles dans une arche arrondie (comme un ongle amande) */
  .hf.B{color:var(--encre,#1E1C1B);text-align:center;padding:calc(var(--hf-top,22px) + 30px) 22px 34px}
  .hf.B .hf-nom{font-size:clamp(54px,16vw,80px);margin:10px 0 6px;color:var(--encre,#1E1C1B)}
  .hf.B .hf-arche{width:min(74%,300px);aspect-ratio:3/4.2;margin:20px auto 0;border-radius:999px 999px 18px 18px;overflow:hidden;box-shadow:0 20px 40px -24px rgba(0,0,0,.5)}
  .hf.B .hf-arche img{width:100%;height:100%;object-fit:cover;display:block}
  .hf.B .hf-res{margin-top:22px;background:var(--encre,#1E1C1B);color:#F6F3EF}
  /* G : Amande (07/11, Marie) : le nom du salon en petit en haut, la photo dans une forme d’amande (comme un ongle), le nom en grand dessous */
  .hf.G{color:var(--noir,#1E1C1B);text-align:center;padding:calc(var(--hf-top,22px) + 8px) 16px 36px;background:transparent}
  .hf.G .hf-haut{color:var(--noir,#1E1C1B);opacity:.8}
  .hf.G .hf-amande{width:100%;aspect-ratio:4/4.6;margin:18px auto 0;border-radius:22px;overflow:hidden;box-shadow:0 26px 50px -28px rgba(0,0,0,.55),0 0 0 6px color-mix(in srgb,var(--noir,#1E1C1B) 10%,transparent)}
  .hf.G .hf-amande img{width:100%;height:100%;object-fit:cover;display:block}
  .hf.G .hf-k{margin-top:24px;opacity:.75}
  .hf.G .hf-nom{font-size:clamp(46px,14vw,74px);margin:8px 0 4px;color:var(--noir,#1E1C1B)}
  .hf.G .hf-res{margin-top:20px;background:var(--noir,#1E1C1B);color:var(--creme,#F6F3EF)}
  .hf.G .hf-dispo{margin-top:16px}
  /* 07/11 (Marie) : on voit le fond du site (zèbre, pois…) autour ; le nom est posé sur une carte pour rester lisible */
  .hf.G .hf-haut{display:inline-block;padding:6px 14px;border-radius:99px;background:color-mix(in srgb,var(--carte,#fff) 88%,transparent);opacity:1}
  .hf.G .hf-carte{margin-top:16px;padding:18px 16px 22px;border-radius:24px;background:color-mix(in srgb,var(--carte,#fff) 92%,transparent);box-shadow:0 14px 34px -22px rgba(0,0,0,.4)}
  .hf.G .hf-carte .hf-k{margin-top:0}
  /* 13/11 nuit (Marie ne voyait aucune différence) : le bloc du nom suit aussi le choix « blocs blancs / en verre » */
  .ecran.blocs-blanc:not(.v1) .hf.G .hf-carte{background:#fff}
  .ecran.blocs-verre:not(.v1) .hf.G .hf-carte{background:rgba(255,255,255,.2);-webkit-backdrop-filter:blur(9px) saturate(1.3);backdrop-filter:blur(9px) saturate(1.3);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.75),0 10px 26px -14px rgba(0,0,0,.35)}
  .ecran.btn-c:not(.btn-pastel) .hf.G .hf-res{background:var(--btn)!important;color:#fff!important}   /* 07/11 : la couleur des boutons aussi sur Amande */
  /* versions d'Amande (&amv=2,3,4) */
  .hf.G.am2 .hf-amande{display:none}.hf.G .hf-duo{display:none}
  .hf.G.am2 .hf-duo{display:flex;gap:10px;margin-top:18px;align-items:flex-start}
  .hf.G.am2 .hf-duo img{flex:1.25;min-width:0;height:300px;object-fit:cover;border-radius:20px;display:block}
  .hf.G.am2 .hf-duo img:last-child{flex:1;margin-top:40px;height:260px}
  .hf.G.am3 .hf-amande{width:86%;aspect-ratio:4/4.8;border-radius:4px;border:10px solid #fff;border-bottom-width:44px;transform:rotate(-2.5deg);box-shadow:0 22px 40px -22px rgba(0,0,0,.5)}
  .hf.G.am3 .hf-k{margin-top:20px}
  .hf.G.am4{text-align:left;padding:0 0 36px}
  .hf.G.am4 .hf-haut{position:absolute;top:var(--hf-top,22px);left:0;right:0;text-align:center;color:#fff;z-index:2;opacity:1;text-shadow:0 1px 8px rgba(0,0,0,.4)}
  .hf.G.am4 .hf-amande{margin:0;aspect-ratio:auto;height:calc(var(--hf-h,100vh) * .56);border-radius:0 0 34px 34px}
  .hf.G.am4 .hf-k,.hf.G.am4 .hf-nom,.hf.G.am4 .hf-et,.hf.G.am4 .hf-dispo{margin-left:24px;margin-right:24px}
  .hf.G.am4 .hf-res{margin-left:24px}
  /* écriture « Astres » : dorée comme le soleil, des étoiles qui scintillent autour */
  .hf .hf-nom.astres{position:relative;letter-spacing:.03em;line-height:1.02;background:linear-gradient(170deg,#FFF3C4 0%,#E8C66A 38%,#B8862E 62%,#F6DE92 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 2px 10px rgba(0,0,0,.35))}
  .hf .hf-nom.astres i{position:absolute;font-style:normal;-webkit-text-fill-color:#F6DE92;color:#F6DE92;animation:hfScint 2.6s ease-in-out infinite}
  .hf .hf-nom.astres .hf-et1{font-size:.28em;left:-.1em;top:-.25em}.hf .hf-nom.astres .hf-et2{font-size:.22em;right:12%;top:-.1em;animation-delay:.9s}.hf .hf-nom.astres .hf-et3{font-size:.18em;right:2%;bottom:.15em;animation-delay:1.7s}
  .hf .hf-nom.astres.argent{background:linear-gradient(170deg,#FFFFFF 0%,#D9DCE2 35%,#8C9098 60%,#F2F3F6 100%);-webkit-background-clip:text;background-clip:text}
  .hf .hf-nom.astres.argent i{-webkit-text-fill-color:#F2F3F6;color:#F2F3F6}
  @keyframes hfScint{0%,100%{opacity:.35;transform:scale(.8)}50%{opacity:1;transform:scale(1.15)}}
  /* E : titre géant (« Carré arrondi ») : le nom énorme en haut, la photo du salon dessous jusqu'en bas, coins arrondis */
  .hf.E{height:var(--hf-h,100vh);display:flex;flex-direction:column;color:var(--encre,#1E1C1B);padding:calc(var(--hf-top,22px) + 34px) 0 0}
  .hf.E .hf-k{padding:0 24px;opacity:.75}
  .hf.E .hf-nom{word-break:normal!important;overflow-wrap:normal;font-size:clamp(50px,17vw,92px);line-height:.86;margin:10px 20px 16px;color:var(--encre,#1E1C1B)}
  .hf.E .hf-ph{flex:1;min-height:0;margin:0 14px calc(var(--hf-bas,0px) + 14px);border-radius:28px;overflow:hidden;position:relative}
  .hf.E .hf-ph img{width:100%;height:100%;object-fit:cover;display:block}
  .hf.E .hf-res{position:absolute;left:16px;bottom:16px;background:#fff;color:#1E1C1B;box-shadow:0 10px 24px -12px rgba(0,0,0,.5)}
  .hf.E .hf-et{padding:0 24px;margin:-6px 0 14px}
  /* F : bandeau : photo plein écran, le nom dans une bande claire au milieu */
  .hf.F{height:var(--hf-h,100vh);color:#1E1C1B}
  .hf.F img.hf-ph{position:absolute;left:0;right:0;top:0;height:calc(100% + 90px)}   /* 07/11 (Marie) : la photo remonte un peu en bougeant : plus haute pour ne jamais laisser de trait en bas */
  .hf.F .hf-band{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);z-index:2;background:rgba(246,243,239,.93);padding:24px 20px 20px;text-align:center}
  .hf.F .hf-nom{font-size:clamp(50px,15vw,74px);margin:8px 0 4px;color:#1E1C1B}
  .hf.F .hf-haut{position:absolute;left:0;right:0;top:var(--hf-top,22px);z-index:2;text-align:center;color:#fff;text-shadow:0 1px 8px rgba(0,0,0,.35)}
  .hf.F .hf-bas{position:absolute;left:0;right:0;bottom:calc(var(--hf-bas,0px) + 30px);z-index:2;text-align:center}
  .hf.F .hf-res{background:#fff;color:#1E1C1B;box-shadow:0 10px 24px -12px rgba(0,0,0,.5)}`;
  /* 10/11 (Marie) : la couleur des boutons colore aussi le bouton Réserver de toutes les formes (pas seulement Amande) */
  css.textContent += `html body .ecran.btn-c.btn-c .defile :is(.hf-res,.hbtn,.hf-res:hover){background:var(--btn)!important;border-color:var(--btn)!important;color:#fff!important}
  html body .ecran.btn-c.btn-pastel.btn-pastel .defile :is(.hf-res,.hbtn){color:#1E1C1B!important}`;
  document.head.append(css);
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  /* 06/11 (Marie) : couleurs vives (qui pètent) pour les boutons et les détails : &vif=fuchsia… ou BR.vif */
  const VIF = { fuchsia: "#E5197E", orange: "#FF5A14", electrique: "#2747FF", cerise: "#E3122C", violet: "#8B2CF5", vert: "#22A845", turquoise: "#00A3A8", noirb: "#1E1C1B", chocob: "#5A3A28", caramelb: "#A8703A", terracottab: "#BE5A38", bordeauxb: "#7A1F33", rougefonceb: "#7C1218", fuchsiab: "#B3125F", emeraudeb: "#1F7A55", orb: "#B8923A", rouilleb: "#A8492A", kakib: "#6B6B40", anthraciteb: "#3A3D42", bleunuitb: "#1F2E5C", framboiseb: "#C8326A", pruneb: "#6E3A62", sapinb: "#2F5A45", sauged: "#5E7454", marineb: "#24344F", bleuroib: "#2F57E8", moutardeb: "#B8861A" };
  const PAST = { blancb: "#FFFFFF", rosep: "#F6C1D1", lilasp: "#D7C6F2", bleup: "#BDD7F2", mentep: "#BFE8D6", pechep: "#F9CDB3", jaunep: "#F7E39A", sableb: "#E6D6BC", nudeb: "#E9C9BB", poudreb: "#EBC9C6", lavandeb: "#D4C6F0", vertdeaub: "#C9E4D8", beurreb: "#F5E6A8", corailb: "#F4B3A3", perleb: "#E0E0E5", vertdouxb: "#C8DDBF" };
  /* 06/11 (Marie) : le texte clair posé sur une photo claire (Amande, Coffin…) devenait invisible : ombre douce + voile en bas de la photo */
  /* 06/11 (Marie) : Stiletto et Carré avec un fond : plus de « vitre fumée » avec texte blanc (illisible) → cartes claires, texte foncé */
  css.textContent += `:is(.ecran.sa.ma,.ecran.s3c):has(>.fond-site){--fond-carte:rgba(255,255,255,.88)!important}
  :is(.ecran.sa.ma,.ecran.s3c):has(>.fond-site) .defile>.sec,:is(.ecran.sa.ma,.ecran.s3c):has(>.fond-site) .defile>.pied{--encre:var(--encre0,#1E1C1B)!important;color:var(--encre0,#1E1C1B)!important;box-shadow:0 10px 30px -18px rgba(0,0,0,.35)!important}
  :is(.ecran.sa.ma,.ecran.s3c):has(>.fond-site) .defile :is(.pf-l,.ava,.tuile,.visite>li,.avant>li,.cadenas,dl.acces){background:rgba(30,28,27,.04)!important;color:var(--encre0,#1E1C1B)!important;box-shadow:inset 0 0 0 1px rgba(30,28,27,.08)!important}
  :is(.ecran.sa.ma,.ecran.s3c):has(>.fond-site) .defile :is(.pf-l,.ava,.visite>li,.avant>li,.cadenas,dl.acces) *:not(b):not(svg *){color:var(--encre0,#1E1C1B)!important}
  :is(.ecran.sa.ma,.ecran.s3c):has(>.fond-site) .defile .visite>li>b{background:var(--encre0,#1E1C1B)!important;color:#F6F3EF!important}
  :is(.ecran.sa.ma,.ecran.s3c):has(>.fond-site) .defile :is(.ouv,a.plein,.plein,.plein *){color:#F6F3EF!important}   /* 07/11 (Marie) : jours d’ouverture et bouton « Appeler » lisibles */
  :is(.ecran.sa.ma,.ecran.s3c):has(>.fond-site) .defile>.sec :is(p,span,li,small,h2,h3,h4,b,strong,dt,dd,a):not(button *):not([data-res]):not([data-res] *):not(.visite b){color:var(--encre0,#1E1C1B)}`;
  css.textContent += `.ecran .hero::before{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,rgba(0,0,0,.22) 0%,rgba(0,0,0,0) 28%,rgba(0,0,0,.18) 55%,rgba(0,0,0,.62) 100%)}
  .ecran .hero>*:not(img):not(picture){z-index:2}
  .ecran .hero h1,.ecran .hero .kick,.ecran .hero .bas,.ecran .hero .haut{text-shadow:0 2px 16px rgba(0,0,0,.5),0 0 2px rgba(0,0,0,.3)}`;
  css.textContent += `.ecran.btn-c .sec{background-color:color-mix(in srgb,var(--btn) 9%,#ffffff)!important}
  /* les parties claires gardent l'encre du site (un fond foncé la passait en blanc : titres illisibles, surtout sur Carré) */
  .ecran.btn-c .sec,.ecran.s3c .sec{--encre:var(--encre0,#1E1C1B)}
  /* textes des parties claires (avis, à propos…) : l'encre du site, jamais blanc */
  .ecran.btn-c .sec :is(p,b,strong,span,li,small,div,h4,em):not(button *):not([data-res] *):not(.et):not(.et *),.ecran.s3c .sec :is(.al-tete,.al-i,.al-i b,.al-i p,.al-tete b){color:var(--encre0,#1E1C1B)}
  .ecran.btn-c .sec .al-i p,.ecran.s3c .sec .al-i p,.ecran.btn-c .sec small,.ecran.s3c .sec .al-nb{color:#6B625C!important}
  .ecran.btn-c .sec .al-i b,.ecran.btn-c .sec .al-tete b,.ecran.s3c .sec .al-i b,.ecran.s3c .sec .al-tete b{color:var(--encre0,#1E1C1B)!important}
  .ecran.btn-pastel .pk-c,.ecran.btn-pastel .pk-c[data-res]{background:none!important;color:inherit!important}
  .ecran.btn-c .sec .ti3,.ecran.s3c .sec .ti3{color:var(--encre0,#1E1C1B)!important;text-shadow:none!important}
  .ecran.btn-c .sec .pk-t b,.ecran.s3c .sec .pk-t b,.ecran.btn-c .sec .pk-t .pp,.ecran.s3c .sec .pk-t .pp{color:var(--encre0,#1E1C1B)!important}.ecran.btn-c .sec .pk-t small,.ecran.s3c .sec .pk-t small{color:#8a8076!important}
  .ecran.btn-pastel button[data-res],.ecran.btn-pastel a[data-res]:not(.pk-c),.ecran.btn-pastel .hf-res,.ecran.btn-pastel .cta,.ecran.btn-pastel .bouton,.ecran.btn-pastel .cof-barre a.res,.ecran.btn-pastel .mcb-res,.ecran.btn-pastel .mcb-res2{background:var(--btn)!important;color:#1E1C1B!important;border-color:var(--btn)!important}.ecran.btn-c .hero .hbtn{background:var(--btn)!important;color:#FFFFFF!important}/* 13/11 (Marie) : les étoiles de l’avis Google prennent la couleur des boutons, un peu plus foncée */.ecran.btn-c .et,.ecran.btn-c .hf-et{color:color-mix(in srgb,var(--btn) 80%,#000)!important}/* 13/11 (Marie) : chaque partie du site (prestations, réalisations, avis…) est posée sur un BLOC plus clair que le fond, pour bien ressortir. Deux choix : blocs blancs (par défaut) ou blocs en verre. Pas en mode nuit, ni sur les formes à vitre fumée quand un fond est choisi. */.ecran.blocs-blanc:not(.v1):not(.ep):not(:has(>.fond-site)) .defile>.sec,.ecran.blocs-blanc:not(.v1):not(.ep):not(.s3c):not(.sa.ma):has(>.fond-site) .defile>.sec,.ecran.blocs-blanc:not(.v1):not(.ep):not(.s3c):not(.sa.ma):has(>.fond-site) .defile>.pied{background:#FFFFFF!important;margin:12px 12px 0;border-radius:24px;padding-left:20px;padding-right:20px}.ecran.blocs-verre:not(.v1):not(.ep):not(:has(>.fond-site)) .defile>.sec,.ecran.blocs-verre:not(.v1):not(.ep):not(.s3c):not(.sa.ma):has(>.fond-site) .defile>.sec,.ecran.blocs-verre:not(.v1):not(.ep):not(.s3c):not(.sa.ma):has(>.fond-site) .defile>.pied{background:rgba(255,255,255,.2)!important;-webkit-backdrop-filter:blur(9px) saturate(1.3);backdrop-filter:blur(9px) saturate(1.3);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.75),0 10px 26px -14px rgba(0,0,0,.35);margin:12px 12px 0;border-radius:24px;padding-left:20px;padding-right:20px}.ecran.blocs-verre:not(.v1):has(>.fond-site) .tir{background:rgba(255,255,255,.55)}.ecran.btn-pastel .hero .hbtn{color:#1E1C1B!important}`;
  /* 13/11 : ce qu’elle vient de choisir dans la personnalisation passe AVANT la couleur de la carte (dans l’adresse) */
  const vif = () => { try { if (window.__lgnChoix && "vif" in window.__lgnChoix) return window.__lgnChoix.vif || ""; return new URLSearchParams(location.search).get("vif") || (typeof BR !== "undefined" && BR && BR.vif) || ""; } catch (e) { return ""; } };
  /* 08/11 : les écritures, connues aussi en dehors de pose() (pour changer l’écriture du nom sans tout refaire) */
  const HF_POLF = { elegante: "Italiana", manuscrite: "'Great Vibes'", ronde: "'Bagel Fat One'", retro: "'Abril Fatface'", calligraphie: "'Pinyon Script'", parisienne: "Parisienne", chic: "'Playfair Display'", luxe: "Cinzel", surf: "Pacifico", seventies: "Shrikhand", bulle: "'Rubik Bubbles'", bonbon: "'Cherry Bomb One'", y2k: "Monoton", gothique: "UnifrakturMaguntia", feutre: "'Permanent Marker'", moderne: "Jost", mystique: "'Cormorant Garamond'", romantique: "Allura", astres: "'Cinzel Decorative'", danse: "'Dancing Script'", vintage: "'Lobster'", satin: "'Satisfy'", doudou: "'Fredoka'", mode: "'Bodoni Moda'", magazine: "'DM Serif Display'", affiche: "'Bebas Neue'", guimauve: "'Sniglet'", relief: "'Bungee Shade'", pixel: "Silkscreen", artdeco: "Fascinate", graffiti: "'Sedgwick Ave Display'", fondue: "'Climate Crisis'", cinema: "Limelight", feminine: "'Yeseva One'", pinup: "'Lily Script One'", couture: "Gloock", arrondie: "Righteous", douce: "Corben", gala: "Playball" };
  const policeChoisie = () => { try { return (window.__pzEtat && window.__pzEtat().police) || ""; } catch (e) { return ""; } };
  function pose(e) {
    const v = VIF[vif()], pa = PAST[vif()];
    if (!e.style.getPropertyValue("--encre0")) { const cc = (typeof BR !== "undefined" && BR && BR.couleur) || new URLSearchParams(location.search).get("couleur"); const ec = (window.INKJ && INKJ[cc]) || "#1E1C1B"; e.style.setProperty("--encre0", ec); }
    if (v) { if (e.style.getPropertyValue("--encre") !== v) e.style.setProperty("--encre", v); e.dataset.vif = 1; } else if (e.dataset.vif) { e.style.removeProperty("--encre"); delete e.dataset.vif; }
    /* 06/11 (Marie) : la couleur du bouton (vive ou pastel) teinte aussi, très très clair, les parties du site (À propos, Le salon…) */
    { let bl = "blanc"; try { bl = (window.__lgnChoix && window.__lgnChoix.blocs) || new URLSearchParams(location.search).get("blocs") || (typeof BR !== "undefined" && BR && BR.blocs) || "blanc"; } catch (x) {} e.classList.toggle("blocs-blanc", bl !== "verre"); e.classList.toggle("blocs-verre", bl === "verre"); }
    const btn = v || pa; if (btn) { e.style.setProperty("--btn", btn); e.classList.add("btn-c"); e.classList.toggle("btn-pastel", !!pa); } else { e.style.removeProperty("--btn"); e.classList.remove("btn-c", "btn-pastel"); }
    const f = fmt(); const d = e.querySelector(".defile"); if (!d) return;
    const vieux = d.querySelector(":scope>.hf");
    if (!["A", "C", "E", "F", "G"].includes(f)) {   /* 06/11 (Marie) : l’arche (B) est retirée */ if (vieux) vieux.remove(); d.querySelectorAll(".hf-cache").forEach(x => x.classList.remove("hf-cache")); return; }
    /* 08/11 (Marie) : « l’écriture ne change pas » — le nom en grand garde l’écriture choisie dans Personnaliser */
    if (vieux && vieux.dataset.f.charAt(0) === f) { const pz = HF_POLF[policeChoisie()], n = vieux.querySelector(".hf-nom"); if (pz && n && !n.style.fontFamily.includes(pz.replace(/'/g, ""))) n.style.setProperty("font-family", pz + ", serif", "important"); return; }
    if (vieux) vieux.remove();
    const h = [...d.children].find(x => !x.classList.contains("hf")); if (!h) return;
    const b = typeof BR !== "undefined" && BR ? BR : {}; const nom = b.nom || "";
    /* l'écriture du nom : celle du site */
    const cible = null;
    const gros = [...h.querySelectorAll("*")].filter(x => x.offsetWidth && x.childElementCount <= 1 && (x.textContent || "").trim()).sort((p, q) => parseFloat(getComputedStyle(q).fontSize) - parseFloat(getComputedStyle(p).fontSize))[0];
    const POLF = { elegante: "Italiana", manuscrite: "'Great Vibes'", ronde: "'Bagel Fat One'", retro: "'Abril Fatface'", calligraphie: "'Pinyon Script'", parisienne: "Parisienne", chic: "'Playfair Display'", luxe: "Cinzel", surf: "Pacifico", seventies: "Shrikhand", bulle: "'Rubik Bubbles'", bonbon: "'Cherry Bomb One'", y2k: "Monoton", gothique: "UnifrakturMaguntia", feutre: "'Permanent Marker'", moderne: "Jost", mystique: "'Cormorant Garamond'", romantique: "Allura", astres: "'Cinzel Decorative'", danse: "'Dancing Script'", vintage: "'Lobster'", satin: "'Satisfy'", doudou: "'Fredoka'", mode: "'Bodoni Moda'", magazine: "'DM Serif Display'", affiche: "'Bebas Neue'", guimauve: "'Sniglet'", relief: "'Bungee Shade'", pixel: "Silkscreen", artdeco: "Fascinate", graffiti: "'Sedgwick Ave Display'", fondue: "'Climate Crisis'", cinema: "Limelight", feminine: "'Yeseva One'", pinup: "'Lily Script One'", couture: "Gloock", arrondie: "Righteous", douce: "Corben", gala: "Playball" };
    const pc = (policeChoisie() || new URLSearchParams(location.search).get("police") || b.police || "").toLowerCase();
    const police = (POLF[pc] && POLF[pc] + ", serif") || (cible && getComputedStyle(cible).fontFamily) || (gros && getComputedStyle(gros).fontFamily) || "Italiana, serif";
    const ph = (b.photos || [])[b.principale != null ? b.principale : (b.salon || 0)];   /* 06/11 : la photo choisie « En haut du site » d’abord */ const src = (ph && (ph.url || ph)) || (h.querySelector("img") || {}).src || "";
    const dispo = h.querySelector(".dispo-t,.dispo-p"); const note = typeof D !== "undefined" && D && D.note ? `★★★★★ ${D.note}${D.nb ? ` · ${D.nb} avis` : ""}${/exemple/i.test(h.innerText) ? " (exemple)" : ""}` : "";
    const k = `Prothésiste ongulaire${b.ville ? " · " + esc(b.ville) : ""}`;
    const mots = esc(nom).split(" "); const coupe = mots.length > 1 ? [mots.slice(0, Math.ceil(mots.length / 2)).join(" "), mots.slice(Math.ceil(mots.length / 2)).join(" ")] : [mots[0], ""];
    const z = document.createElement("div"); z.className = "hf " + f; z.dataset.f = f; if (f === "G") { const av = new URLSearchParams(location.search).get("amv") || b.amv || "1"; z.classList.add("am" + av); z.dataset.f = f + av; }
    z.style.setProperty("--hf-h", e.clientHeight + "px");
    if (f === "A") z.innerHTML = `<img class="hf-ph" src="${esc(src)}" alt=""><div class="hf-haut hf-k">${esc(nom)}</div><div class="hf-bas"><div class="hf-dispo"></div><div class="hf-k">${k}</div><div class="hf-nom" style="font-family:${police}!important">${coupe.filter(Boolean).join("<br>")}</div>${note ? `<div class="hf-et">${note}</div>` : ""}<button class="hf-res" data-res>Réserver un créneau</button></div>`;
    else if (f === "B") { const ongle = (b.photos || []).map(p => p && (p.url || p)).filter((u, i) => u && i !== (b.salon != null ? b.salon : (b.principale || 0)))[0] || src;
      z.innerHTML = `<div class="hf-dispo"></div><div class="hf-k" style="opacity:.75">${k}</div><div class="hf-nom" style="font-family:${police}!important">${coupe.filter(Boolean).join("<br>")}</div>${note ? `<div class="hf-et">${note}</div>` : ""}<div class="hf-arche"><img src="${esc(ongle)}" alt=""></div><button class="hf-res" data-res>Réserver un créneau</button>`; }
    else if (f === "G") z.innerHTML = `<div class="hf-haut hf-k">${esc(nom)}</div><div class="hf-amande"><img src="${esc(src)}" alt=""></div><div class="hf-duo"><img src="${esc(src)}" alt=""><img src="${esc(((b.photos || []).map(p => p && (p.url || p)).filter(u => u && u !== src)[0]) || src)}" alt=""></div><div class="hf-carte"><div class="hf-k">${k}</div><div class="hf-nom" style="font-family:${police}!important">${coupe.filter(Boolean).join("<br>")}</div>${note ? `<div class="hf-et">${note}</div>` : ""}<div class="hf-dispo"></div><button class="hf-res" data-res>Réserver un créneau</button></div>`;
    else if (f === "E") z.innerHTML = `<div class="hf-dispo" style="padding:0 24px"></div><div class="hf-k">${k}</div><div class="hf-nom" style="font-family:${police}!important">${coupe.filter(Boolean).join("<br>")}</div>${note ? `<div class="hf-et">${note}</div>` : ""}<div class="hf-ph"><img src="${esc(src)}" alt=""><button class="hf-res" data-res>Réserver un créneau</button></div>`;
    else if (f === "F") z.innerHTML = `<img class="hf-ph" src="${esc(src)}" alt=""><div class="hf-haut hf-k">${esc(nom)}</div><div class="hf-band"><div class="hf-dispo"></div><div class="hf-k" style="opacity:.75">${k}</div><div class="hf-nom" style="font-family:${police}!important">${coupe.filter(Boolean).join("<br>")}</div>${note ? `<div class="hf-et">${note}</div>` : ""}</div><div class="hf-bas"><button class="hf-res" data-res>Réserver un créneau</button></div>`;
    else z.innerHTML = `<img class="hf-ph" src="${esc(src)}" alt=""><div class="hf-nom" style="font-family:${police}!important">${coupe.filter(Boolean).map((x, i) => `<span class="${i ? "" : "sur"}">${x}</span>`).join("")}</div><div class="hf-bas"><div class="hf-dispo"></div><div class="hf-k" style="opacity:.75">${k}</div>${note ? `<div class="hf-et">${note}</div>` : ""}<button class="hf-res" data-res>Réserver un créneau</button></div>`;
    if (dispo) z.querySelector(".hf-dispo").append(dispo.cloneNode(true));
    const iph = document.documentElement.classList.contains("iph") || !!document.querySelector(".tel .ile, .c-ile");
    z.style.setProperty("--hf-top", iph ? "54px" : "calc(env(safe-area-inset-top,0px) + 20px)");
    if (e.querySelector(".cof-barre")) z.style.setProperty("--hf-bas", "70px");
    if (pc === "astres") z.querySelectorAll(".hf-nom").forEach(n => { n.classList.add("astres"); if (/argent/.test(new URLSearchParams(location.search).get("paillettes") || b.paillettes || "")) n.classList.add("argent"); n.insertAdjacentHTML("afterbegin", '<i class="hf-et1">✦</i><i class="hf-et2">✧</i><i class="hf-et3">✦</i>'); });   /* l'écriture des astres : dorée, avec des petites étoiles qui scintillent */
    if (e.querySelector(".mcb-haut")) { const hh = z.querySelector(".hf-haut"); if (hh) hh.remove(); z.style.marginTop = "-44px"; }   /* Carré : sa propre barre en haut */
    h.classList.add("hf-cache"); d.prepend(z); { const mt = parseFloat(getComputedStyle(z).marginTop) || 0; if (mt < 0) z.style.setProperty("--hf-h", (e.clientHeight - mt) + "px"); }   /* 07/11 (Marie) : le haut remonte sous la barre du téléphone : on l’allonge d’autant, plus de trait en bas */
  }
  const tout = () => document.querySelectorAll(".ecran").forEach(pose);
  /* 06/11 (Marie) : la couleur du nom (&nomc=…) : pastel, doré, argent, holographique… */
  const NOMC = { blanc: "#FFFFFF", noir: "#1E1C1B", rosep: "#F4B6C8", lilasp: "#CDB8EE", bleup: "#B7D3F0", mentep: "#B9E6D3", peche: "#F7C6A8",
    pastel: "linear-gradient(100deg,#F7B9CF 0%,#D9C2F2 35%,#B9DAF5 65%,#BDEBD7 100%)", or: "linear-gradient(170deg,#FFF3C4 0%,#E8C66A 38%,#B8862E 62%,#F6DE92 100%)",
    argent: "linear-gradient(170deg,#FFFFFF 0%,#D9DCE2 35%,#8C9098 60%,#F2F3F6 100%)", rosegold: "linear-gradient(170deg,#FCE3DA 0%,#E8A99A 40%,#B9706A 65%,#F6CFC4 100%)",
    holo: "linear-gradient(100deg,#FFB3E6 0%,#B3D4FF 30%,#B9FFE0 60%,#FFF3B0 100%)",
    orangep: "#F9C49A", jaunep: "#F6E3A1", corailp: "#F6A99B", lavande: "#B9A6E8", sauge: "#A9C3A2", saugef: "#4F5A45", ciel: "#9FCBEB", creme: "#F4EADB", beige: "#D9C4A8", corail: "#F07A65", rouge: "#C8243A", bordeaux: "#7A1F33", rougefonce: "#7C1218", cobalt: "#2F57E8", caramel: "#A8703A", terracotta: "#C66B4A", prune: "#6E3A62", rouille: "#A8492A", moutarde: "#B8861A", anthracite: "#3A3D42", kaki: "#6B6B40", sapin: "#2F5A45", fuchsia: "#E0368C", violet: "#7B3FB5", turquoise: "#2BB3B1", vert: "#1F7A55", bleunuit: "#1F2E5C", choco: "#5A3A28", coucher: "linear-gradient(100deg,#F9C49A 0%,#F6A99B 45%,#F4B6C8 100%)", glace: "linear-gradient(100deg,#B7D3F0 0%,#CDB8EE 50%,#F4B6C8 100%)", citron: "linear-gradient(100deg,#F6E3A1 0%,#B9E6D3 100%)", cuivre: "linear-gradient(170deg,#FBE0C8 0%,#D98B5A 40%,#9A5530 65%,#F2C29E 100%)", champagne: "linear-gradient(170deg,#FFF8EA 0%,#E9D3A8 40%,#B8975E 65%,#F6E7C6 100%)", bleuroi: "#2F57E8", bleuneon: "linear-gradient(100deg,#6FA8FF 0%,#2F57E8 50%,#7B5CFF 100%)" };
  const nomc = () => { try { if (window.__lgnChoix && window.__lgnChoix.nomc) return window.__lgnChoix.nomc; return new URLSearchParams(location.search).get("nomc") || (typeof BR !== "undefined" && BR && BR.nomc) || ""; } catch (e) { return ""; } };
  const peintNom = () => { const c = NOMC[nomc()]; document.querySelectorAll(".ecran h1, .ecran .hf-nom").forEach(el => {
      const deg = c && c.startsWith("linear"); el.querySelectorAll("*:not(i)").forEach(x => { x.style.removeProperty("color"); x.style.removeProperty("-webkit-text-fill-color"); });
      if (!c) { ["color", "background", "-webkit-background-clip", "background-clip", "-webkit-text-fill-color"].forEach(k => el.style.removeProperty(k)); return; }
      if (deg) { el.style.setProperty("background", c, "important"); el.style.setProperty("-webkit-background-clip", "text", "important"); el.style.setProperty("background-clip", "text", "important"); el.style.setProperty("-webkit-text-fill-color", "transparent", "important");
        el.querySelectorAll("*:not(i)").forEach(x => x.style.setProperty("-webkit-text-fill-color", "transparent", "important")); }
      else { el.style.setProperty("color", c, "important"); el.style.setProperty("-webkit-text-fill-color", c, "important"); el.querySelectorAll("*:not(i)").forEach(x => { x.style.setProperty("color", c, "important"); x.style.setProperty("-webkit-text-fill-color", c, "important"); }); } }); };
  new MutationObserver(() => { clearTimeout(peintNom.t); peintNom.t = setTimeout(peintNom, 120); }).observe(document.body, { childList: true, subtree: true });
  setTimeout(peintNom, 700); setTimeout(peintNom, 1500);
  /* 09/11 (Marie) : le nom ne doit jamais être coupé (« Priscil… » avec une écriture très large) : s'il dépasse, il rapetisse juste assez */
  const ajusteNom = () => document.querySelectorAll(".ecran .hf-nom, .ecran h1").forEach(el => {
    if (!el.offsetWidth) return; const pol = getComputedStyle(el).fontFamily + "|" + el.textContent + "|" + el.parentElement.clientWidth;
    if (el._fitCle === pol) return; if (el._fs0 === undefined) el._fs0 = el.style.getPropertyValue("font-size");
    if (el._fs0) el.style.setProperty("font-size", el._fs0); else el.style.removeProperty("font-size");
    let fs = parseFloat(getComputedStyle(el).fontSize), n = 0;
    while (el.scrollWidth > el.clientWidth + 1 && fs > 18 && n++ < 40) { fs *= .95; el.style.setProperty("font-size", fs.toFixed(1) + "px", "important"); }
    el._fitCle = pol; });
  setInterval(ajusteNom, 500); if (document.fonts) document.fonts.ready.then(ajusteNom);
  /* dans « Personnaliser » : les couleurs vives (elles remplacent la couleur des boutons ; une couleur normale les enlève) */
  css.textContent += `.pf-vifk{font-size:11px;letter-spacing:.14em;text-transform:uppercase;opacity:.7;margin:12px 0 6px;text-align:center}.pf-vifs .pf-d.on{box-shadow:0 0 0 2px #fff,0 0 0 4px #1E1C1B}`;
  const marque = () => document.querySelectorAll("[data-vif]").forEach(b => b.classList.toggle("on", typeof BR !== "undefined" && BR && BR.vif === b.dataset.vif));
  document.addEventListener("click", ev => { const b = ev.target.closest("[data-vif],[data-co]"); if (!b || typeof BR === "undefined" || !BR) return;
    if (b.dataset.vif) BR.vif = BR.vif === b.dataset.vif ? "" : b.dataset.vif; else BR.vif = "";
    marque(); setTimeout(tout, 30); }, true);
  setTimeout(marque, 600);
  document.addEventListener("click", ev => { if (ev.target.closest("#pzPol [data-p], #pzUni [data-u]")) [60, 250].forEach(t => setTimeout(tout, t)); }, true);   // 08/11 : une nouvelle écriture → le nom en grand suit
  new MutationObserver(() => { clearTimeout(tout.t); tout.t = setTimeout(tout, 80); }).observe(document.body, { childList: true, subtree: true });
  setTimeout(tout, 350);
})();
