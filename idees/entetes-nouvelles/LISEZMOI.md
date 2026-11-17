# Nouvelles en-têtes choisies par Marie (16/11/2026) — D21

19 en-têtes animées, en plus des 16 actuelles. Code de maquette (non intégré) :
- entetes-plus.js  : couv (Couverture de magazine), story (Story), flacon (Flacon de vernis), neon (Néon), feed (Profil Insta), coeur (Cœur)
- entetes-plus2.js : bijou (Bijou serti), flash (Flash tatouage), loupe (Loupe)
- entetes-plus3.js : vinyle (Vinyle), coulure (Vernis qui coule), diamant (Diamant), pluieor (Pluie d'or)
- entetes-plus4.js : disco (Boule disco), papillons (Papillons), bulles (Bulles)
- entetes-plus5.js : tele (Télé rétro), jackpot (Jackpot), carrousel (Carrousel 3D)
- entetes-plus6.js : viseur (Viseur photo), feuilleter (Feuilleter), swipe (Swipe) — Feuilleter et Swipe utilisent D.nails
- entetes-plus7.js : ondes, confettis, bisous, arcenciel, ballons, chromecadre, enveloppe, machine (une seule photo : D.hero)

Comment c'est branché dans la maquette : chaque fichier ajoute ses clés à ENTETES et enveloppe la fonction entete(k,t,lang)
de loginail-creer/pret.html (mêmes variables D, P, etoiles, creneau, t.type…). Il était injecté en fin de page par un petit
serveur local, le projet n'a jamais été modifié. Pour intégrer : déplacer le CSS dans le <style> des en-têtes et les branches
dans entete(), ajouter les 19 lignes à ENTETES (liste de Personnaliser), garder le mode « capt » seulement pour les captures.
Points à respecter : la couleur des éléments (vernis qui coule, etc.) vient de --acc = couleur du fond choisi (accDuFond) ;
Jackpot et Carrousel utilisent D.nails (photos d'ongles de la fiche) ; si une seule photo, elle est répétée.
Respecter « mouvements réduits » (prefers-reduced-motion) : à ajouter à l'intégration. Tester téléphone + ordinateur, 3 styles.
