/* 21/11 (Marie) — OUVERTURE DE LA CRÉATION (remplace le « coup de baguette » D49).
   1. Elle arrive dans Personnaliser : son site apparaît DÉJÀ habillé du look de Marie « Sirène gothique »
      (fond coquillages et perles, en-tête perles, écriture gothique, charms coquillages) avec la photo de la fille aux coquillages.
      À droite : SES photos (la photo de la fille est en plus, en premier).
   2. Au bout de 5 secondes, sur l'écran du téléphone : « Créer le mien ».
   3. Elle touche → la photo de la fille s'en va, SA photo revient, et son site passe en « classique » :
      fond Quadrillage crème, en-tête Bandeau, écriture Meuh, couleur Vanille, bouton Chocolat, nom Chocolat, encadrés en verre, aucun charm.
   Tant qu'elle n'a pas touché « Créer le mien » : rien n'est enregistré dans son brouillon (pas de photo de la fille dans SON site),
   et si elle touche un réglage, on passe d'abord au classique puis son choix s'applique.
   21/11 (Marie : « montre-le à chaque fois ») : à CHAQUE arrivée (avant : une seule fois). ?ouverture=0 : jamais.
   Si elle REVIENT (elle a déjà touché « Créer le mien » et son brouillon a ses réglages) : « Créer le mien » lui rend SON site
   (rien n'a été enregistré pendant la Sirène : on recharge la page sans l'ouverture, son brouillon est intact) au lieu du classique. */
(() => {
  const CLE = "lgnOuvertureVue", Q = new URLSearchParams(location.search);
  if (Q.get("ouverture") === "0") return;
  let revient = false;
  try { const br = JSON.parse(localStorage.getItem("loginail-brouillon") || "null");
    revient = !!(localStorage.getItem(CLE) && Q.has("vrai") && br && br.entete); } catch (e) { return; }
  window.OUVERTURE_ON = true;   /* le coup de baguette ne se lance pas */

  const LOOK_DEPART = "Sirène gothique";
  const CLASSIQUE = { e: "bandeau", f: "Quadrillage crème", p: "meuh", co: "vanille", v: "chocob", nc: "choco", bl: "verre", lb: { bl: null, nm: null, bt: null }, c: [], pos: {}, et: [] };
  const P = window.Pilote, ecr = document.querySelector("#tel>.ecr");
  if (!P || !ecr) return;

  let actif = false, fini = false, photoFille = "", saPhoto = "", vraiSetItem = null;

  const css = document.createElement("style");
  css.textContent = `
  .tel>.ecr{container-type:inline-size}
  /* 21/11 (Marie : « pas rose », « pas sur le site », « de ce côté-là ») : le bouton sort de l'écran, en haut à gauche du téléphone,
     couleurs du fond (nacre, crème, doré), il arrive en rebondissant puis flotte doucement */
  .ouvB{position:absolute;z-index:30;left:-34px;bottom:calc(100% + 10px);display:flex;flex-direction:column;align-items:flex-start;gap:5px;pointer-events:none;
    opacity:0;transform:translateY(16px) scale(.7) rotate(-10deg);transform-origin:80% 100%;transition:opacity .3s,transform .6s cubic-bezier(.34,1.56,.64,1)}
  .ouvB.on{opacity:1;transform:rotate(-4deg);pointer-events:auto}
  .ouvB.on .flotte{animation:ouvFl 3.2s ease-in-out .7s infinite}
  .ouvB.part{opacity:0;transform:translateY(10px) scale(.85) rotate(-4deg);transition:opacity .2s,transform .25s;pointer-events:none}
  .ouvB .flotte{position:relative;display:block}
  .ouvB button{position:relative;overflow:hidden;border:1px solid rgba(201,168,106,.75);cursor:pointer;white-space:nowrap;
    padding:13px 26px 13px 22px;border-radius:99px;color:#3E352C;font:500 15px Jost,sans-serif;letter-spacing:.05em;
    background:radial-gradient(120% 140% at 20% 0%,#FFFFFF 0%,rgba(255,255,255,0) 55%),linear-gradient(135deg,#FFFDF9 0%,#F3ECE2 45%,#E4D8C6 100%);
    box-shadow:0 14px 28px -12px rgba(110,90,60,.55),inset 0 1px 0 #fff,inset 0 -2px 6px rgba(180,160,130,.25)}
  .ouvB button:after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;
    background:linear-gradient(105deg,transparent 30%,rgba(255,214,230,.55) 44%,rgba(205,232,240,.55) 52%,rgba(255,255,255,.8) 56%,transparent 70%);
    translate:-130% 0;animation:ouvBr 3s ease-in-out 1.2s infinite}
  .ouvB button i{font-style:normal;display:inline-block;margin-left:7px;color:#C9A86A;animation:ouvEt 2.2s ease-in-out infinite}
  .ouvB button:hover{border-color:#C9A86A}
  .ouvB button:active{transform:scale(.96)}
  .ouvB .queue{position:absolute;right:26px;bottom:-7px;width:14px;height:14px;rotate:45deg;border-radius:0 0 4px 0;
    background:#E8DECF;border-right:1px solid rgba(201,168,106,.75);border-bottom:1px solid rgba(201,168,106,.75)}
  .ouvB .coq{position:absolute;width:34px;height:34px;left:-14px;top:-15px;rotate:-18deg;pointer-events:none;filter:drop-shadow(0 3px 4px rgba(0,0,0,.2))}
  .ouvB small{margin-left:16px;font:400 11.5px Jost,sans-serif;color:#7A6F64;letter-spacing:.02em}
  @media (max-width:899px){
    .ouvB{left:-8px;bottom:auto;top:-14px;flex-direction:column-reverse;transform-origin:20% 0}
    .ouvB button{padding:10px 18px 10px 17px;font-size:13px}
    .ouvB .queue{display:none}
    .ouvB small{display:none}
    .ouvB .coq{width:28px;height:28px;left:auto;right:-12px;top:-10px;rotate:16deg}}
  @keyframes ouvFl{0%,100%{translate:0 0}50%{translate:0 -5px}}
  @keyframes ouvBr{0%,55%{translate:-130% 0}100%{translate:130% 0}}
  @keyframes ouvEt{0%,100%{opacity:.6;transform:scale(.85)}50%{opacity:1;transform:scale(1.15) rotate(20deg)}}
  .ouvVoile{position:absolute;inset:0;z-index:39;border-radius:inherit;pointer-events:none;background:#F7F3EE;opacity:0;transition:opacity .22s;display:grid;place-items:center}
  .ouvVoile.on{opacity:1}
  .ouvVoile i{font-style:normal;color:#C9A86A;font-size:clamp(18px,8cqw,30px);animation:ouvEt 1s ease-in-out infinite}
  @media (prefers-reduced-motion:reduce){.ouvB button:after,.ouvB button i,.ouvVoile i,.ouvB.on .flotte{animation:none}}`;
  document.head.appendChild(css);

  /* poser les charms fait descendre le site dans le téléphone : on le remet en haut */
  const enHaut = () => [0, 150, 400, 800, 1400].forEach(t => setTimeout(() => { try { const b = P.D.querySelector(".defile") || P.D.scrollingElement; b.scrollTop = 0; } catch (e) {} }, t));
  /* 21/11 (Marie : « il s'ouvre sur mes prestations ») : tant qu'elle n'a pas fait défiler son site elle-même, il reste en haut */
  function verrouHaut() { let elle = false; const D = P.D; if (!D) return;
    ["wheel", "touchstart", "pointerdown", "keydown"].forEach(t => D.addEventListener(t, () => { elle = true; }, { capture: true, passive: true }));
    D.addEventListener("scroll", e => { if (elle) return; const b = e.target === D ? D.scrollingElement : e.target; if (b && b.scrollTop) b.scrollTop = 0; }, true);
    setTimeout(() => { elle = true; }, 30000); }
  const pause = ms => new Promise(r => setTimeout(r, ms));
  const quand = (test, max = 20000) => new Promise(ok => { const t0 = Date.now(), f = () => { let v = false; try { v = test(); } catch (e) {} if (v || Date.now() - t0 > max) return ok(v); setTimeout(f, 80); }; f(); });

  /* rien ne s'enregistre dans SON brouillon tant que le look de départ est affiché */
  function bloqueEnregistrement() { try { const S = P.W.Storage.prototype; vraiSetItem = S.setItem;
    S.setItem = function (k, v) { if (actif && k === "loginail-brouillon") return; return vraiSetItem.call(this, k, v); }; } catch (e) {} }
  function debloqueEnregistrement() { try { if (vraiSetItem) P.W.Storage.prototype.setItem = vraiSetItem; } catch (e) {} }

  async function depart() {
    if (!(await quand(() => P.pret && window.LOOKS_MARIE && typeof appliqueLook === "function"))) return;
    const L = (window.LOOKS_MARIE || []).find(x => x.n === LOOK_DEPART); if (!L) return;
    const m = L.ph && L.ph.h && L.ph.h.match(/\/loginail-site\/looks-photos\/[a-z0-9]+\.webp/i); if (!m) return;
    photoFille = new URL(m[0], location.href).href;
    try { const ph = P.photos(), i = P.W.eval("BR.principale||0"); saPhoto = ph[i] || ph[0] || ""; } catch (e) {}
    actif = true; bloqueEnregistrement(); verrouHaut();
    P.choisitPhoto(photoFille);
    await appliqueLook(L);
    try { if (typeof rendPhotos === "function") rendPhotos(); } catch (e) {}
    videAnnuler(); enHaut();
    await quand(() => document.getElementById("attente").classList.contains("part"));
    enHaut(); setTimeout(montreBouton, 5000);
  }

  let bouton = null;
  function montreBouton() { if (fini) return;
    bouton = document.createElement("div"); bouton.className = "ouvB";
    bouton.innerHTML = `<span class="flotte"><button type="button">Créer le mien <i>✦</i></button><span class="queue"></span><img class="coq" src="../loginail-site/charms/coquillage.webp" alt=""></span><small>Ce site est un exemple</small>`;
    document.getElementById("tel").appendChild(bouton); requestAnimationFrame(() => requestAnimationFrame(() => bouton.classList.add("on")));
    bouton.querySelector("button").onclick = e => { e.stopPropagation(); creerLeMien(); }; }

  /* « Annuler » ne doit pas ramener le look de départ */
  function videAnnuler() { try { pile.length = 0; avant.length = 0; document.getElementById("annul").disabled = true; const r = document.getElementById("refaire"); if (r) r.disabled = true; } catch (e) {} }

  let enCours = null;
  function creerLeMien() { if (enCours) return enCours; return enCours = (async () => {
    fini = true; try { localStorage.setItem(CLE, "1"); } catch (e) {}
    if (bouton) { bouton.classList.add("part"); setTimeout(() => bouton && bouton.remove(), 300); }
    const voile = document.createElement("div"); voile.className = "ouvVoile"; voile.innerHTML = "<i>✦</i>"; ecr.appendChild(voile);
    requestAnimationFrame(() => voile.classList.add("on")); await pause(240);
    if (revient) { const u = new URL(location.href); u.searchParams.set("ouverture", "0"); location.replace(u.href); return new Promise(() => {}); }   /* SON site revient, tel qu'elle l'a laissé */
    if (saPhoto) P.choisitPhoto(saPhoto);
    await pause(60); P.retirePhoto(photoFille);
    await pause(1000);   /* le pilote remet les charms jusqu'à 0,9 s après un changement de photo : on attend avant de les enlever */
    await appliqueLook(CLASSIQUE);
    try { P.D.querySelectorAll(".lgn-sticker").forEach(x => x.remove()); } catch (e) {}
    try { if (typeof rendPhotos === "function") rendPhotos(); } catch (e) {}
    enHaut(); await pause(500); videAnnuler();
    actif = false; debloqueEnregistrement();
    try { if (window.enregistrePerso) window.enregistrePerso(); } catch (e) {}
    voile.classList.remove("on"); setTimeout(() => voile.remove(), 300);
  })(); }

  /* elle touche un réglage avant « Créer le mien » : on passe au classique d'abord, puis son choix s'applique */
  document.addEventListener("click", e => { if (!actif || fini) return;
    const r = e.target.closest("#reglages"); if (!r || e.target.closest("#onglets")) return;
    const cible = e.target, x = e.clientX, y = e.clientY; e.preventDefault(); e.stopImmediatePropagation();
    creerLeMien().then(() => { try { const c = cible.isConnected ? cible : document.elementFromPoint(x, y); if (c && c.closest("#reglages")) c.click(); } catch (er) {} }); }, true);
  /* « Publier » pendant le look de départ : on passe au classique avant */
  const pub = window.PUBLIER; if (typeof pub === "function") window.PUBLIER = async (...a) => { if (actif) await creerLeMien(); return pub.apply(window, a); };

  depart();
})();
