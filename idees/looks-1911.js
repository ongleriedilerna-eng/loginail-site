/* 19/11 — nouveaux looks des sites d'exemple (roue de l'accueil loginail.fr + onglet Looks de Personnaliser).
   Faits par Claude avec les charms récents de Marie (envois 8 à 13 : Bohème, Néon, Pixel, Jean, Léopard, Cyber rose,
   Cyber chrome, Corse, Paris + les 112 du 18/11). Règles « charms-choix-palette » : la palette du fond d'abord,
   un charm qui fait le lien avec le fond, UNE histoire par look, charms regardés en image.
   Même format que looks-marie.js. Les places : 7 places autour de la photo et du nom, jamais dessus. */
(() => {
  /* [x %, y %, taille, inclinaison] dans l'ordre des charms */
  const PL = [[4, 4, 100, -12], [71, 4, 102, 12], [77, 22, 82, -8], [1, 24, 84, 10], [-2, 52, 56, -14], [86, 50, 58, 10], [42, 2, 60, 0]];
  const look = (o, c) => ({ ...o, c, pos: Object.fromEntries(c.map((n, i) => [n, [...PL[i], 1]])) });
  window.LOOKS_1911 = [
    look({ n: "Bohème solaire", d: "Terre cuite, macramé et soleils", s: "Chic", e: "rayons", f: "Soleils sur terracotta", p: "seventies", co: "terracotta", v: "terracottab",
      et: [] }, ["bohosoleil", "bohoterracottalune", "bohomacrame", "bohovaselagurus", "bohohirondelle", "bohoplume", "bohotournesol"]),
    look({ n: "Paris chic", d: "Le café, le métro et la tour Eiffel", s: "Chic", e: "xloge", f: "Fines rayures vert sapin", p: "parisienne", co: "sapin", v: "sapinb",
      et: [[30, 9, 22]] }, ["paristoureiffel", "pariscafe", "parismetro", "parisimmeuble", "pariscroissant", "parisfontaine", "parissacrecoeur"]),
    look({ n: "Été en Corse", d: "Volets bleus, voilier et clémentines", s: "Chic", e: "aquarelle", f: "Mosaïque méditerranéenne bleu cobalt et ivoire", p: "romantique", co: "cobalt", v: "bleuroib",
      et: [] }, ["corsefenetre", "corsevoilier", "corsetourgenoise", "corsemaison", "corseclementines", "corsecoquillage", "corseciste"]),
    look({ n: "Cyber Barbie", d: "Chrome fuchsia et talons", s: "Y2K", e: "diamant", f: "Paillettes roses sur noir", p: "futur", co: "fuchsia", v: "fuchsiab",
      et: [[30, 10, 30], [37, 6, 18], [63, 31, 22]] }, ["cyberpapillon", "cybercoeur", "cyberescarpin", "cyberlunettes", "cybergloss", "cyberdiademe", "cybermiroir"]),
    look({ n: "Lilas 2003", d: "Clapet, baladeur CD et pince papillon", s: "Y2K", e: "papillons", f: "Étoiles chrome violettes sur fond lilas", p: "y2k", co: "lilas", v: "violet",
      et: [[30, 10, 26], [64, 31, 20]] }, ["clapetlilas", "baladeurlilas", "pincepapillonholo", "lisseurlilas", "brossestrass", "tongcompensee", "vernisdamier"]),
    look({ n: "Jardin chromé", d: "Ginkgo, jonquille et abeille en chrome", s: "Y2K", e: "pendentif", f: "Étoiles chrome émeraude sur dégradé menthe", p: "futur", co: "emeraude", v: "emeraudeb",
      et: [[31, 10, 26]] }, ["cyberginkgo", "cyberjonquille", "cyberlibellulejaune", "cyberabeille", "cybercoeurvert", "cybernoeudvert", "cyberfougere"]),
    look({ n: "Néon acidulé", d: "Axolotl, cœur qui fond et champignons fluo", s: "Fun", e: "bulles", f: "Marbrure holographique irisée scintillante", p: "bombee", co: "fuchsia", v: "violet",
      et: [[31, 10, 26], [63, 31, 20]] }, ["axolotlneon", "coeurfonduneon", "champignonsneon", "hippocampeneon", "spiraleneon", "cactusfleurneon", "grenadeneon"]),
    look({ n: "Pixel girl", d: "Manette, ourson et cerises en pixels", s: "Fun", e: "viseur", f: "Étoiles holographiques", p: "pixel", co: "fuchsia", v: "fuchsia",
      et: [[31, 10, 24]] }, ["manettepixel", "oursonpixel", "cerisespixelrouges", "papillonpixel", "notepixel", "cadenaspixel", "champignonpixel"]),
    look({ n: "Denim & strass", d: "Jean, nœud à strass et casquette", s: "Fun", e: "bijou", f: "Jean noir et étoiles", p: "graffiti", co: "bleunuit", v: "bleunuitb",
      et: [[30, 10, 24], [63, 31, 18]] }, ["noeudjeanstrass", "coeurjean", "gavrochejean", "sacjeanetoiles", "patinjean", "manchettejean", "casquettejean"]),
    look({ n: "Baddie léopard", d: "Talons, lisseur et lunettes léopard rose", s: "Baddie", e: "coeurparticules", f: "Léopard rose", p: "graffiti", co: "fuchsia", v: "noirb",
      et: [[31, 10, 28], [63, 31, 20]] }, ["escarpinleopard", "bottineleopardrose", "lunettespapillonleopard", "lisseurleopard", "pinceleopard", "poudriercoeurleopard", "appareilphotoleopard"]),
    look({ n: "Rose noire", d: "Roses noires, chandelier et vitrail", s: "Dark", e: "medaillon", f: "Dentelle noire sur satin cerise", p: "gothique", co: "bordeaux", v: "bordeauxb",
      et: [] }, ["rosenoirenoeud", "chandelier", "vitrailrouge", "rosenoire", "sablierrouge", "levresvampirerock", "miroironyx"]),
  ];
})();
