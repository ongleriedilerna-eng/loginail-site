/* 27/11 · 5 idées d'« AVANT » pour l'écran Bienvenue (Marie : « là c'est éclaté, propose 5 autres idées »).
   Chaque avant est dessiné en vrai format iPhone (390 × 874 px) puis réduit dans le petit téléphone : rendu net, rien de « codé ».
   Même salon partout (Nails by Drimf, Porto-Vecchio, la fille aux coquillages), pour que la transformation se croie. */
(() => {
  const PH = "../../loginail-site/looks-photos/a2cd96acc6.webp";
  const SYS = `-apple-system,"SF Pro Text","Helvetica Neue",Arial,sans-serif`;
  const css = `
  .av5{position:absolute;left:0;top:0;width:390px;height:874px;transform-origin:0 0;background:#fff;color:#1c1c1e;font-family:${SYS};overflow:hidden}
  /* 1 · lien en bio */
  .av5.bio{background:#F2F2F2;text-align:center;padding-top:96px}
  .bio .rond{width:118px;height:118px;border-radius:50%;margin:0 auto;background:url(${PH}) center 22%/cover}
  .bio h1{font:600 22px ${SYS};margin:18px 0 4px}.bio p{font:400 15px ${SYS};color:#6e6e73;margin:0}
  .bio .lnk{display:block;margin:16px 28px 0;padding:18px 0;border-radius:14px;background:#fff;font:500 16px ${SYS};color:#1c1c1e;box-shadow:0 1px 2px rgba(0,0,0,.08)}
  .bio .lnk:first-of-type{margin-top:34px}
  /* 2 · fiche d'annuaire */
  .av5.fiche{background:#fff}
  .fiche .carte{height:250px;background:#E8EAED;position:relative}
  .fiche .carte::before,.fiche .carte::after{content:"";position:absolute;background:#fff}
  .fiche .carte::before{left:0;right:0;top:120px;height:14px}.fiche .carte::after{top:0;bottom:0;left:200px;width:12px}
  .fiche .pin{position:absolute;left:198px;top:96px;width:26px;height:26px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#6e6e73}
  .fiche .c{padding:20px 22px}.fiche h1{font:400 24px ${SYS};margin:0}.fiche .n{font-size:15px;color:#5f6368;margin-top:6px}.fiche .n b{color:#6e6e73;font-weight:600}
  .fiche .t{font-size:15px;color:#5f6368;margin-top:4px}
  .fiche .bts{display:flex;gap:10px;margin-top:20px}.fiche .bts span{flex:1;text-align:center;padding:11px 0;border:1px solid #d1d1d6;border-radius:99px;font-size:14px;color:#3a3a3c}
  .fiche .ph{display:flex;gap:6px;margin-top:20px}.fiche .ph i{flex:1;height:120px;border-radius:8px;background:url(${PH}) center 30%/cover}.fiche .ph i:nth-child(2){background:#E8EAED}.fiche .ph i:nth-child(3){background:#DADCE0}
  /* 3 · page de réservation grise */
  .av5.resa{background:#F7F7F7}
  .resa .haut{height:64px;margin-top:44px;background:#fff;border-bottom:1px solid #e5e5e5;display:flex;align-items:center;padding:0 20px;font:600 17px ${SYS}}
  .resa .tete{display:flex;gap:14px;align-items:center;padding:20px;background:#fff;border-bottom:1px solid #e5e5e5}
  .resa .tete i{width:66px;height:66px;border-radius:12px;background:url(${PH}) center 22%/cover;flex:none}
  .resa .tete b{display:block;font:600 18px ${SYS}}.resa .tete small{font-size:13px;color:#8e8e93}
  .resa h2{font:600 13px ${SYS};color:#8e8e93;text-transform:uppercase;letter-spacing:.04em;margin:22px 20px 8px}
  .resa .l{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;background:#fff;border-bottom:1px solid #eee;font-size:15px}
  .resa .l span{color:#8e8e93;font-size:13px;display:block}.resa .barreR{position:absolute;left:0;right:0;bottom:0;padding:18px 20px 34px;background:#fff;border-top:1px solid #e5e5e5;text-align:center;font:600 16px ${SYS};color:#fff}.resa .barreR::before{content:"";position:absolute;left:20px;right:20px;top:12px;bottom:28px;border-radius:12px;background:#8e8e93;z-index:-1}.resa .barreR{z-index:1;isolation:isolate}.resa .l em{font-style:normal;font-size:13px;color:#fff;background:#8e8e93;border-radius:8px;padding:7px 12px}
  /* 4 · la note de tarifs */
  .av5.note{background:#FFFDF5;padding:70px 26px 0}
  .note .d{font-size:13px;color:#8e8e93;text-align:center}
  .note h1{font:700 26px ${SYS};margin:18px 0 6px}
  .note p{font:400 17px/1.55 ${SYS};margin:0;color:#1c1c1e;text-align:left}.note h1{text-align:left}
  .note .ph{height:250px;border-radius:10px;margin:20px 0 14px;background:url(${PH}) center 25%/cover}
  /* 5 · site tout simple, sans âme */
  .av5.simple{background:#fff}
  .simple .h{height:330px;background:url(${PH}) center 25%/cover}
  .simple .c{padding:28px 26px;text-align:center}
  .simple h1{font:600 28px ${SYS};letter-spacing:-.01em;margin:0}.simple p{color:#8e8e93;font-size:15px;margin:8px 0 0}
  .simple .b{margin:26px auto 0;width:220px;padding:15px 0;border-radius:4px;background:#1c1c1e;color:#fff;font:600 15px ${SYS}}
  .simple .sec{margin-top:30px;text-align:left;border-top:1px solid #eee;padding-top:20px}.simple .sec b{font:600 17px ${SYS}}.simple .sec p{text-align:left}`;
  const H = {
    bio: `<div class="rond"></div><h1>Nails by Drimf</h1><p>prothésiste ongulaire 💅 Porto-Vecchio</p><span class="lnk">📅 Prendre RDV</span><span class="lnk">💰 Mes tarifs</span><span class="lnk">📸 Instagram</span><span class="lnk">📍 Adresse</span>`,
    fiche: `<div class="carte"><span class="pin"></span></div><div class="c"><h1>Nails by Drimf</h1><div class="n"><b>5,0 ★★★★★</b> (67) · Onglerie</div><div class="t">Porto-Vecchio · Ouvert ⋅ Ferme à 19:00</div><div class="bts"><span>Itinéraire</span><span>Appeler</span><span>Site web</span></div><div class="ph"><i></i><i></i><i></i></div></div>`,
    resa: `<div class="haut">‹&nbsp;&nbsp;Réserver</div><div class="tete"><i></i><div><b>Nails by Drimf</b><small>Porto-Vecchio · 5,0 (67)</small></div></div><h2>Prestations</h2><div class="l"><div>Pose gel<span>1 h 30</span></div><em>Choisir</em></div><div class="l"><div>Remplissage<span>1 h 15</span></div><em>Choisir</em></div><div class="l"><div>Semi-permanent<span>45 min</span></div><em>Choisir</em></div><div class="l"><div>Dépose<span>30 min</span></div><em>Choisir</em></div><div class="l"><div>Nail art (par ongle)<span>10 min</span></div><em>Choisir</em></div><div class="l"><div>Beauté des mains<span>30 min</span></div><em>Choisir</em></div><h2>Infos</h2><div class="l"><div>Horaires<span>Du mardi au samedi · 9 h – 19 h</span></div></div><div class="l"><div>Adresse<span>Porto-Vecchio</span></div></div><div class="barreR">Voir les disponibilités</div>`,
    note: `<div class="d">27 novembre 2026 à 10:42</div><h1>Nails by Drimf 💅</h1><div class="ph"></div><p>Pose gel ........ 55 €<br>Remplissage ...... 45 €<br>Semi ............ 30 €<br>Dépose ........... 15 €<br><br>RDV en DM 📩</p>`,
    simple: `<div class="h"></div><div class="c"><h1>Nails by Drimf</h1><p>Prothésiste ongulaire · Porto-Vecchio</p><div class="b">Prendre rendez-vous</div><div class="sec"><b>À propos</b><p>Bienvenue sur mon site. Je vous accueille du mardi au samedi.</p></div></div>` };
  const NOMS = { bio: "Lien en bio", fiche: "Fiche d'annuaire", resa: "Page de réservation", note: "Note de tarifs", simple: "Site tout simple" };
  if (!document.getElementById("av5css")) { const st = document.createElement("style"); st.id = "av5css"; st.textContent = css; document.head.appendChild(st); }
  /* pose l'avant « k » dans un cadre, réduit à sa largeur */
  window.AVANTS = { noms: NOMS, cles: Object.keys(H), pose(el, k) { const w = el.clientWidth || 158; el.innerHTML = `<div class="av5 ${k}" style="transform:scale(${w / 390})">${H[k]}</div>`; } };
})();
