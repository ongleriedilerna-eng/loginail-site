/* ===== 26/11 · D127 (Marie : « quand une pro clique sur la personnalisation… on va tout revoir ») — suite de D124 / D126 =====
   Personnaliser = 4 étapes : En-tête → Fond → Écriture → Charms (plus de Looks, de Photo à part, de Couleurs : elles suivent le fond).
   · En-tête : 6 au choix, dans cet ordre (planche site/idees/perso-simple-2511/choix-6-10.html) ; « Ta photo » juste dessous.
   · Écriture : 10 au choix.
   · Fonds : les 107 enlevés par Marie ne sont plus proposés (fonds-enleves-2611.json) ; 8 familles (le regroupement est dans fusionFonds, plus bas dans la page).
   · Un site qui a déjà une autre en-tête ou une autre écriture la GARDE : elle reste proposée, en premier, pour lui.
   · Tout au « tu » (D67).
   Chargé tout en bas de personnaliser.html (il lit ORDRE, TXT, SUITE, P de la page). */
(() => {
  const ENTETES = ["hsans", "wfeuille", "bandeau", "cadre", "harche", "medaillon"];
  const ECRITURES = ["manuscrite", "chic", "pinup", "bonbon", "seventies", "y2k", "gothique", "calligraphie", "feminine", "feutre"];
  window.FONDS_ENLEVES_NOMS = ["Cœurs qui flottent","Vitrail lune et étoiles","Vitrail hirondelles et roses","Azulejo bleu","Sardines et citrons","Forêt de bambous","Dentelle bordeaux","Lierre et fougères","Lunes sur bleu nuit","Oranges et étoiles","Hot Girls Club noir","Flammes noires sur rouge","Vague rouge sur crème","Ruban vert sapin sur crème","Collage disco bleu glacé","Collage disco violet","Verre irisé bleu et poisson","Verre irisé rose et poisson","Train sous la lune enneigée","Collage méditerranéen bleu azur et citronné","Collage opalescent de mer et d’astres","Collage surréaliste aux motifs éclatants","Collage aquatique irisé et scintillant","Cerises et nœuds roses","Cœurs léopard sur cuir","Orchidées aquarelle","Pin-up rose et rouge","Salon rétro en linogravure","Lampe à lave et marguerites","Nœuds au crayon violet","Vagues et perles chocolat","Vichy prune et vert","Étoiles émeraude sur menthe pastel","Éventails Art déco en velours nuit","Velours côtelé bleu nuit","Velours bleu pétrole, motifs Art déco","Velours côtelé vert forêt luxueux","Vichy en lin jaune et olive","Élégance botanique ivoire, cobalt et or","Épingles et cadenas sur denim charbon","Trois olives vertes sur pique","Rubans chromés sur fond jaune beurre","Rosaces ivoire d’un palais néoclassique","Main chromée sur boule noire","Miroir baroque argenté sur mur bleu fumé","Mosaïque céleste en terre cuite","Lunes et étoiles dorées sur bleu nuit","Cœurs en verre arc-en-ciel sur soie","Dentelle florale bordeaux sur satin ivoire","Dentelle noire sur satin cerise","Cœurs bronze chromés sur fond crème","Cheval au fusain","Paysage d’automne en papier","Cabine rouge sous l’aurore","Magnolia blanc","Couloir aux néons violets","Rose prise dans la glace","Éclat tropical orange et hibiscus satinés","Étoiles argentées sur soie bleue scintillante","Étoiles argentées sur soie bleue","Îles flottantes","Peinture bleue et orange","Cerises sous l’eau","Fenêtre gothique sur la forêt","Chaton endormi sur la lune","Éclair rouge","Canard dans la brume","Terrain de basket sous la lune","Art déco vert et or","Dunes sous la voie lactée","Aurore boréale","Ratons laveurs pâtissiers","Néon bleu électrique","Baleine dans le ciel","Piscine face aux planètes","Champignons sous la lune","Aile de papillon bleu","Mer déchaînée","Chambre douillette la nuit","Spirale rétro orange et violette","Méduses bleues","Coucher de soleil sur la mer","Ruelle japonaise sous la pluie","Tortue et île enchantée","Poisson dans les vagues turquoise","Cheval au bord du canyon","Vagues de verre liquide iridescentes","Ondes iridescentes bleu et violet","Pleine lune sur la mer","Diner aux néons rouges","Motif hibiscus turquoise scintillant","Motif céleste brodé bleu cobalt","Papillons dorés sur satin scintillant","Baddie Club","Bisous et étoiles sur gris","Clés anciennes","Cadenas cœur","Flacons de parfum","Rose métallisé et étoiles","Satin noir et étoiles","Nœuds bordeaux sur taupe","Étoiles noires sur crème","Notes de musique","Matcha latte","Hot Girls Club étoiles","Teckels dans l’herbe","Nature morte aux figues"];

  /* plus de familles d'écritures (10 seulement) : la page montre alors toutes les écritures, et le tri ci-dessous n'en garde que 10 */
  window.FAMILLES_ECRITURES = [];

  /* ---------- 1 · les 4 étapes ---------- */
  ORDRE.splice(0, ORDRE.length, "entete", "fond", "ecriture", "charms");
  Object.assign(SUITE, { entete: "Ensuite : le fond", fond: "Ensuite : l’écriture", ecriture: "Ensuite : les charms", charms: "C’est parfait ✦" });
  const tu = () => Object.assign(TXT, {
    entete: ["Ton <em>en-tête</em>", "Le haut de ton site et ta plus belle photo : la 1re chose que tes clientes voient."],
    fond: ["Ton <em>fond</em>", "Touche un fond : tes couleurs suivent toutes seules."],
    ecriture: ["Ton <em>écriture</em>", "Le nom de ton salon, dans le style qui te ressemble."],
    charms: ["Tes <em>charms</em>", "Touche un charm : il se pose. Glisse-le, agrandis-le, penche-le."] });
  tu();

  const st = document.createElement("style");
  st.textContent = `#onglets [data-o="look"],#onglets [data-o="photo"],#onglets [data-o="couleurs"],.btnLooks,#assortirF,.panneau[data-p="ecriture"] #famE{display:none!important}
.panneau[data-p="entete"] #famEnt,.panneau[data-p="entete"] .famTraits,.panneau[data-p="entete"] .tr,.panneau[data-p="entete"] .flecheA{display:none!important}
#lEnt .ent:not(.d127){display:none!important}
#lEnt{grid-template-columns:repeat(3,minmax(0,1fr))!important}
#lEnt .ent.d127{order:var(--rang)}
#lEnt .ent .nv,#lEnt .ent .neuf,#lEnt .ent b.nouveau,#lEnt .ent .badge{display:none!important}
#lPol .ecr-c:not(.d127){display:none!important}
#lPol .ecr-c.d127{order:var(--rang)}
#lPol{display:grid}
.d127Titre{font:500 12.5px Jost,sans-serif;color:#7a6f69;margin:16px 18px 6px}
#app #lPhG.d127Photos,#lPhG.d127Photos.d127Photos{display:flex!important;flex-wrap:nowrap!important;gap:8px!important;overflow-x:auto!important;overflow-y:hidden!important;grid-template-columns:none!important;height:auto!important;max-height:none!important;padding:2px 18px 6px!important;scroll-padding:0 18px;scrollbar-width:none}
#lPhG.d127Photos::-webkit-scrollbar{display:none}
#app #lPhG.d127Photos>*,#lPhG.d127Photos.d127Photos>*{flex:0 0 72px!important;width:72px!important;height:72px!important;min-height:0!important;max-width:none!important;aspect-ratio:auto!important;grid-column:auto!important;margin:0!important}
#lPhG.d127Photos.d127Photos .sup,#lPhG.d127Photos.d127Photos .ajout{display:none!important}
.ent.d127.actuel::after,.ecr-c.d127.actuel::after{content:"ton actuel";position:absolute;left:8px;top:8px;z-index:3;background:#fff;color:#b5475e;font:500 9.5px Jost,sans-serif;border-radius:99px;padding:1px 7px;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,.15)}
.ent.d127,.ecr-c.d127{position:relative}`;
  document.head.appendChild(st);

  /* ---------- 2 · les 6 en-têtes (et celle de son site, si elle en a une autre) ---------- */
  const trie = (liste, sel, cle) => { const l = document.getElementById(liste); if (!l) return;
    const a = (typeof P !== "undefined" && P.etat && P.etat[cle]) || "", rangs = a && !sel.includes(a) ? [a, ...sel] : sel;
    l.querySelectorAll(":scope > [data-k]").forEach(b => { const i = rangs.indexOf(b.dataset.k); b.classList.toggle("d127", i >= 0); b.style.setProperty("--rang", i); b.classList.toggle("actuel", i === 0 && a && !sel.includes(a)); }); };
  const lesDeux = () => { trie("lEnt", ENTETES, "entete"); trie("lPol", ECRITURES, "police"); };
  /* quand son en-tête ou son écriture change (ou arrive avec son site), on refait le tri */
  const branche = () => { if (typeof P !== "undefined" && typeof P.change === "function" && !branche.ok) { branche.ok = 1; P.change(q => { if (q === "entete" || q === "police") setTimeout(lesDeux, 0); }); } };
  ["lEnt", "lPol"].forEach(id => { const l = document.getElementById(id); if (l) { let t; new MutationObserver(() => { clearTimeout(t); t = setTimeout(lesDeux, 40); }).observe(l, { childList: true }); } });

  /* ---------- 3 · « Ta photo » sous les en-têtes ---------- */
  const photos = () => { const ph = document.getElementById("lPhG"), lEnt = document.getElementById("lEnt"); if (!ph || !lEnt || ph.classList.contains("d127Photos")) return;
    const t = document.createElement("div"); t.className = "d127Titre"; t.textContent = "Ta photo"; lEnt.after(t); t.after(ph); ph.classList.add("d127Photos"); };

  /* tout ce qui arrive après le chargement (listes, photos, textes remis par d'autres morceaux de la page) */
  const encore = () => { branche(); lesDeux(); photos(); tu(); if (typeof onglet !== "undefined" && TXT[onglet] && document.getElementById("aide")) { const h = document.getElementById("titreP"); if (h && h.innerHTML !== TXT[onglet][0]) { h.innerHTML = TXT[onglet][0]; document.getElementById("aide").textContent = TXT[onglet][1]; } }
    if (typeof onglet !== "undefined" && !ORDRE.includes(onglet) && typeof ouvre === "function" && typeof P !== "undefined" && P.pret) ouvre("entete"); };
  [300, 1000, 2500, 5000, 9000].forEach(ms => setTimeout(encore, ms));
  /* son en-tête et son écriture arrivent avec son site (sans prévenir) : on regarde de temps en temps, et on ne retrie que si ça a changé */
  let vu = ""; setInterval(() => { const e = typeof P !== "undefined" && P.etat ? P.etat.entete + "|" + P.etat.police + "|" + document.querySelectorAll("#lEnt > [data-k], #lPol > [data-k]").length : ""; if (e !== vu) { vu = e; lesDeux(); } }, 800);
  document.getElementById("onglets").addEventListener("click", () => setTimeout(encore, 30));

  /* ordinateur : les étapes du haut et la colonne d'astuces, au « tu » (D67) et à jour (plus de Couleurs à part) */
  try {
    const et = document.getElementById("etapes");
    if (et) { const li = et.querySelectorAll("li"); const T = ["Ton lien", "Ton style", "Ton en-tête, ton fond, ton écriture", "Tes charms"];
      li.forEach((l, i) => { const n = [...l.childNodes].find(x => x.nodeType === 3); if (n && T[i]) n.nodeValue = T[i]; }); }
    if (typeof ASTUCES !== "undefined") Object.assign(ASTUCES, {
      entete: [["▣", "<b>Ta photo</b> se place toute seule dans chaque en-tête."], ["↻", "Elles bougent comme sur ton vrai site : <b>regarde-les vivre</b>."], ["♥", "<b>Reste appuyée</b> sur une en-tête pour la mettre en favori."]],
      fond: [["✦", "Tes couleurs s'<b>accordent toutes seules</b> au fond choisi."], ["‹›", "Près de 500 fonds, rangés en <b>8 familles</b> : Animés, Girly, Chic, Y2K…"], ["♥", "<b>Reste appuyée</b> sur un fond pour le mettre en favori."]],
      ecriture: [["Aa", "Ton nom est montré <b>sur ton fond</b>, comme tes clientes le verront."], ["↔", "Ton nom tient <b>toujours sur une ligne</b> : il se règle tout seul."], ["♥", "<b>Reste appuyée</b> sur une écriture pour la mettre en favori."]],
      charms: [["⤡", "Touche un charm posé : <b>⤡ agrandir</b>, <b>↻ tourner</b>, <b>⇋ miroir</b>, <b>✕ enlever</b>."], ["✦", "Ajoute des <b>étoiles qui brillent</b> : glisse-les où tu veux."], ["⌕", "<b>Cherche un charm</b> par son nom : cœur, cerise, nœud…"], ["♥", "<b>Reste appuyée</b> sur un charm pour le mettre en favori."]] });
    if (typeof COMMUNES !== "undefined") COMMUNES.splice(0, COMMUNES.length, ["‹›", "<b>Tire la poignée</b> pour agrandir tes réglages."], ["↶", "Une erreur ? <b>Annuler</b>, en haut à droite."], ["✎", "<b>Publie quand tu veux</b> : tout reste modifiable ensuite, depuis l'appli."]);
    if (typeof rendAstuces === "function" && typeof onglet !== "undefined") rendAstuces(onglet);
  } catch (e) { console.warn("d127", e); }

  /* quelques mots encore au « vous » dans la page */
  const mots = () => { const a = document.getElementById("attente"); if (a && /Votre site/.test(a.textContent)) a.textContent = a.textContent.replace("Votre site", "Ton site");
    const p = document.querySelector("#poignee small"); if (p) p.textContent = "Tire pour agrandir"; };
  mots(); setTimeout(mots, 1500);
})();
