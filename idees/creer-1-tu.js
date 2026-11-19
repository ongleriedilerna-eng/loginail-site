/* 18/11 (Produit, D26) : page 1 « Un lien suffit. » + chargement C « Tourbillon », EN VRAI.
   Le dessin et les mouvements viennent de la maquette validée par Marie (idees/creer-1-v1f.html + creer-1-v.js) ;
   la lecture du lien vient de l'ancienne page (remplir.html) : fonction Supabase « lire-fiche », Google Maps, Planity, Booksy, son site ; jamais Instagram.
   À la fin : les charms et les cartes sont avalés par l'anneau, halo rose, et Personnaliser s'ouvre en cercle depuis l'anneau (plus de bouton).
   ?demo : un faux salon (Nails by Drimf ; ?salon=moka → Marie Onglerie), rien n'est lu sur internet, Personnaliser en exemple.
   ?lien=… : le lien collé sur l'accueil de loginail.fr (la création démarre toute seule). */
(() => {
const $ = id => document.getElementById(id), $$ = s => [...document.querySelectorAll(s)];
const Q = new URLSearchParams(location.search);
const BODY = document.body, app = document.querySelector(".app");
const RM = matchMedia("(prefers-reduced-motion:reduce)").matches;
const attends = ms => new Promise(r => setTimeout(r, ms));
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const DEMO = Q.has("demo");

/* ---------- le coffre ---------- */
const FONCTION = "https://scfhaombuptmrlkdhcsl.supabase.co/functions/v1/lire-fiche";
const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjZmhhb21idXB0bXJsa2RoY3NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM2MTg0NzQsImV4cCI6MjEwOTE5NDQ3NH0.CYfWbG_UmTsqCeRDyab6HN5oZKveoiFlNMZcMYkYYjc";

/* ---------- après le chargement : Personnaliser (son site, au style de départ « classique » ; le style se change dans « Looks ») ---------- */
const DEMOS = { cerise: { nom: "Nails by Drimf", ville: "Lille", note: "4,9", nbAvis: 48, nbPhotos: 12, horaires: "Du mardi au samedi", hCourt: "Mar → sam", prix: 9 },
  moka: { nom: "Marie Onglerie", ville: "Lyon", note: "4,8", nbAvis: 112, nbPhotos: 9, horaires: "Du lundi au samedi", hCourt: "Lun → sam", prix: 14 } };
const SD = DEMOS[Q.get("salon")] || DEMOS.cerise;
const PERSO = DEMO ? "personnaliser.html" + (Q.get("salon") === "moka" ? "?salon=marie" : "")
  : "personnaliser.html?vrai=1&genre=classique&src=" + encodeURIComponent("loginail-creer/pret.html?v=1511m&nouveau&essai&style=1&couleur=lin&police=elegante&paillettes=non&mode=jour");

/* ---------- le logo ---------- */
const LOGO = '<svg viewBox="0 -2 330 72" aria-label="Loginail"><g transform="scale(.5)"><rect x="0" y="5" width="225" height="120" rx="60" fill="currentColor"/><path d="M172 21H215C254 21 282 42 282 65C282 88 254 109 215 109H172A44 44 0 0 1 172 21Z" fill="currentColor"/><path d="M172 28H213C247 28 274 47 274 65C274 83 247 102 213 102H172A37 37 0 0 1 172 28Z" fill="var(--logo-fond,#F6F3EF)"/></g><text x="160" y="42" font-family="Jost,sans-serif" font-weight="300" font-size="22" letter-spacing="9" fill="currentColor">LOGINAIL</text></svg>';
$$("[data-logo]").forEach(e => { const a = document.createElement("a"); a.className = e.className; a.href = "../"; a.setAttribute("aria-label", "Loginail, accueil"); a.innerHTML = LOGO; a.style.color = "inherit"; e.replaceWith(a); });

/* =====================================================================
   1 · CE QU'ON SAIT D'ELLE (rien n'est inventé : vide tant que ce n'est pas lu)
   ===================================================================== */
const JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
let B = { source: "main", nom: "", prenom: "", rue: "", cp: "", ville: "", telephone: "", position: null, placeId: "", lienGoogle: "",
  horaires: null, note: null, nbAvis: 0, avis: [], photos: [], prestations: [] };
const hhmm = (h, m) => `${String(h).padStart(2, "0")}:${String(m || 0).padStart(2, "0")}`;
/* horaires Google (0 = dimanche) → 7 jours en partant du lundi ; deux plages le même jour = une pause */
function horairesGoogle(periods) {
  if (!periods?.length) return null;
  const j = Array.from({ length: 7 }, () => []);
  periods.forEach(p => {
    if (!p.close) { for (let k = 0; k < 7; k++) j[k].push(["00:00", "23:59"]); return; }
    const k = (p.open.day + 6) % 7;
    const fin = p.close.day !== p.open.day && p.close.hour === 0 ? "23:59" : hhmm(p.close.hour, p.close.minute);
    j[k].push([hhmm(p.open.hour, p.open.minute), fin]);
  });
  return j.map(pl => { if (!pl.length) return null; pl.sort((a, b) => a[0] < b[0] ? -1 : 1);
    const h = { d: pl[0][0], f: pl[pl.length - 1][1] }; if (pl.length > 1) { h.pd = pl[0][1]; h.pf = pl[1][0]; } return h; });
}
/* le nom Google rallongé de mots-clés (« Institut X - Onglerie - Ajaccio ») → le vrai nom (« Institut X ») */
const nomCourt = (n, ville) => {
  const plat = x => x.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const GEN = /^(onglerie|ongles?|nails?|bar|prothesiste|ongulaire|manucure|pedicure|institut|salon|beaute|esthetique|studio|spa|art|by|a|au|aux|de|des|du|d|la|le|les|l|et|&|en|sur|chez)$/;
  const v = plat(ville || "");
  const generique = p => plat(p).split(/[\s'’,]+/).filter(Boolean).every(m => GEN.test(m) || (v && v.includes(m)) || /^\d{5}$/.test(m));
  const s = String(n || "").replace(/\s*\(([^)]*)\)\s*$/, (m, x) => generique(x) ? "" : m).trim();
  const parts = s.split(/\s+[-–—|·•:]\s+|\s*\|\s*/).map(x => x.trim()).filter(Boolean);
  return parts.length < 2 ? s : parts.find(p => !generique(p)) || parts[0];
};
function depuisGoogle(g) {
  const m = (g.adresse || "").match(/^(.*?),\s*(\d{5})\s+([^,]+)/);
  B = { ...B, source: "google", placeId: g.placeId, lienGoogle: g.lienGoogle, nom: nomCourt(g.nom, g.ville || (m ? m[3] : "")), nomGoogle: g.nom || "",
    rue: m ? m[1] : (g.adresse || "").replace(/,\s*France$/, ""), cp: m ? m[2] : "", ville: g.ville || (m ? m[3] : ""),
    telephone: g.telephone || "", position: g.position, horaires: horairesGoogle(g.horaires),
    note: g.note, nbAvis: g.nbAvis || 0, avis: (g.avis || []).filter(a => a.texte).map(a => ({ auteur: a.auteur, note: a.note, texte: a.texte })),
    photos: g.photos || [], apropos: g.apropos || null };
}
/* son prénom : seulement s'il revient dans au moins 2 avis (« Merci Léa ! ») ; elle le vérifie ensuite */
const PAS_PRENOM = new Set("Merci Bravo Encore Beaucoup Pour Elle Il Je Tu Vous Toi Le La Les Un Une Des Très Super Top Trop Salon Madame Mme Mlle Mademoiselle Mr Monsieur Toute Tout Tous Mille Infiniment Grand Grande Gros Chère Cher Ma Mon Notre Votre Equipe Équipe Institut Nails Ongles Onglerie Pour Avec".split(" "));
function devinePrenom(avis) {
  const vu = {}, mots = new Set((B.nom || "").split(/[^A-Za-zÀ-ÿ]+/).map(m => m.toLowerCase()));
  (avis || []).forEach(a => { const dans = new Set();
    for (const m of (a.texte || "").matchAll(/(?:merci|remercie|bravo)[\s,!]+(?:encore\s+|beaucoup\s+|infiniment\s+)?(?:à\s+|a\s+)?([A-ZÀ-Ý][a-zà-ÿ]{2,}(?:-[A-ZÀ-Ý][a-zà-ÿ]+)?)/gi)) {
      const n = m[1]; if (n[0] !== n[0].toUpperCase() || PAS_PRENOM.has(n) || mots.has(n.toLowerCase())) continue; dans.add(n); }
    dans.forEach(n => vu[n] = (vu[n] || 0) + 1); });
  const [n, c] = Object.entries(vu).sort((x, y) => y[1] - x[1])[0] || [];
  return c >= 2 ? n : "";
}
/* ses prestations et ses prix, lus sur son site (ou sa page de réservation) ; au plus 75 s, sinon elle les écrira */
async function litTarifs() {
  if (!B.site && !B.photos.length) return;
  const corps = JSON.stringify({ quoi: "tarifs", site: B.site, nom: B.nom, ville: B.ville, cp: B.cp, rue: B.rue, photos: B.photos.map(p => p.url) });
  const essai = () => fetch(FONCTION, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${ANON}`, apikey: ANON }, body: corps })
    .then(r => r.ok ? r.json() : null).catch(() => null);
  const t = await Promise.race([essai().then(t => t || essai()), attends(75000).then(() => null)]);
  if (!t) return;
  if (t.instagram) B.insta = t.instagram;
  if (t.presentation) B.presentation = t.presentation;
  if (t.prestations?.length) { B.prestations = t.prestations.map(p => ({ nom: p.nom, prix: p.prix ?? "", duree: Math.round(p.duree_min || 60) })); B.prestationsTrouvees = true; }
}
const prechargePhotos = photos => Promise.all(photos.slice(0, 8).map(p => new Promise(ok => { const i = new Image(); i.onload = i.onerror = ok; i.src = p.url; })));
/* les jours ouverts : « Du mardi au samedi » (dans l'anneau) et « Mar → sam » (sur la carte) */
function jours(h, court) {
  const idx = (h || []).map((x, i) => x ? i : -1).filter(i => i >= 0);
  if (!idx.length) return "";
  if (idx.length === 7) return court ? "7 j / 7" : "7 jours sur 7";
  const a = idx[0], z = idx[idx.length - 1];
  if (z - a + 1 === idx.length) return court ? `${JOURS[a].slice(0, 3)} → ${JOURS[z].slice(0, 3).toLowerCase()}` : `Du ${JOURS[a].toLowerCase()} au ${JOURS[z].toLowerCase()}`;
  return `${idx.length} jours par semaine`;
}
const virgule = n => String(n).replace(".", ",");
/* ce qui s'écrit dans l'anneau (long) et sur la carte (court) ; "" = pas trouvé : pas de carte */
function trouve(k, court) {
  if (DEMO) { const S = SD; return { salon: S.nom, photos: S.nbPhotos + " photos", avis: court ? S.note + " ★" : S.note + " ★ · " + S.nbAvis + " avis",
    horaires: court ? S.hCourt : S.horaires, prix: court ? S.prix + " prix" : S.prix + " prestations" }[k]; }
  const n = B.photos.length, np = B.prestations.length;
  if (k === "salon") return B.nom || "";
  if (k === "photos") return n ? `${n} photo${n > 1 ? "s" : ""}` : "";
  if (k === "avis") return B.nbAvis ? (court ? (B.note != null ? virgule(B.note) + " ★" : `${B.nbAvis} avis`) : `${B.note != null ? virgule(B.note) + " ★ · " : ""}${B.nbAvis} avis`) : "";
  if (k === "horaires") return jours(B.horaires, court);
  if (k === "prix") return B.prestationsTrouvees && np ? (court ? `${np} prix` : `${np} prestation${np > 1 ? "s" : ""}`) : "";
}
/* son brouillon : ce que pret.html et Personnaliser lisent */
function garde() {
  if (!DEMO) {
    const dv = !B.prenom && devinePrenom(B.avis); if (dv) { B.prenom = dv; B.prenomDevine = true; }
    try { localStorage.setItem("loginail-brouillon", JSON.stringify(B)); } catch (e) {}
  }
  try { localStorage.removeItem("loginail-reprise"); } catch (e) {}
}

/* =====================================================================
   2 · LA PAGE 1 : la case du lien
   ===================================================================== */
const PIN = '<svg viewBox="0 0 13 16"><path d="M6.5 0A6.5 6.5 0 0 0 0 6.5C0 11 6.5 16 6.5 16S13 11 13 6.5A6.5 6.5 0 0 0 6.5 0Zm0 9A2.5 2.5 0 1 1 6.5 4a2.5 2.5 0 0 1 0 5Z" fill="#1E1C1B"/></svg>';   /* 18/11 (Marie) : épingle noire */
const COCHE = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 7.5l3 3 6-7"/></svg>';
/* 09/11 (Marie) : Google Maps, Planity, Booksy, ou son propre site (.fr, .com…). Jamais Instagram. */
const estInsta = l => /(^|\/\/|\.)(instagram\.com|instagr\.am|tiktok\.com|facebook\.com|fb\.com)/i.test(l);
const estGoogle = l => /^https?:\/\/(maps\.app\.goo\.gl|goo\.gl\/maps|(www\.)?google\.[a-z.]+\/maps|maps\.google\.[a-z.]+)/i.test(l);
/* le partage iPhone ajoute parfois le nom avant le lien ; « monsalon.fr » sans https:// marche aussi */
function lienDe(t) { t = String(t || "").trim(); const h = t.match(/https?:\/\/\S+/)?.[0]; if (h) return h;
  const d = t.match(/(?:^|\s)((?:www\.)?[a-z0-9àâäéèêëîïôöùûüç-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}(?:\/\S*)?)\s*$/i)?.[1]; return d ? "https://" + d.replace(/^\/+/, "") : ""; }
const sorte = l => !l || estInsta(l) ? "" : estGoogle(l) ? "google" : /planity\.com/i.test(l) ? "planity" : /booksy\.com/i.test(l) ? "booksy" : /^https?:\/\/[^\s/]+\.[a-z]{2,}/i.test(l) ? "site" : "";
const NOMS = { google: "<b>Fiche Google Maps</b> reconnue", planity: "<b>Page Planity</b> reconnue", booksy: "<b>Page Booksy</b> reconnue", site: "<b>Ton site</b> reconnu" };
const champ = $("champ"), boite = champ.closest(".lien"), msg = $("msg");
const puce = document.createElement("div"); puce.className = "puce";
puce.innerHTML = `<i class="ic">${PIN}</i><span></span><button type="button" class="chg">Changer</button><i class="ok">${COCHE}</i>`;
boite.appendChild(puce);
puce.querySelector(".chg").onclick = () => { champ.value = ""; verifie(); champ.focus(); };
const dit = (t, c = "") => { msg.textContent = t; msg.className = "msg " + c; };
function verifie() { const s = sorte(lienDe(champ.value)); boite.classList.toggle("reconnue", !!s);
  if (s) { puce.querySelector("span").innerHTML = NOMS[s]; dit(""); } else if (!champ.value.trim()) dit(""); return s; }
champ.addEventListener("input", verifie);
champ.addEventListener("keydown", e => { if (e.key === "Enter") $("creer").click(); });
/* « Coller » : le presse-papier ; si le téléphone refuse, on lui dit comment faire */
$("coller").onclick = async () => {
  let t = ""; try { t = await navigator.clipboard.readText(); } catch (e) {}
  if (t && t.trim()) { champ.value = t.trim(); if (verifie()) return; }
  champ.focus(); dit(t ? "Ce lien n’est pas reconnu. Touche Google Maps, Planity… pour voir où le trouver." : "Reste appuyée dans la case, puis touche « Coller ».");
};
$("creer").onclick = () => {
  const l = lienDe(champ.value);
  if (!l) { dit("Colle d’abord ton lien.", "err"); champ.focus(); return; }
  if (estInsta(l)) return dit("Instagram ne suffit pas : colle ta fiche Google Maps, ta page Planity ou Booksy, ou ton site.", "err");
  if (!sorte(l)) return dit("Ce lien n’est pas reconnu. Touche Google Maps, Planity… pour voir où le trouver.", "err");
  dit(""); champ.blur(); charge(l);
};
/* « Je n'ai pas de lien, je le remplis moi-même » → la page où elle écrit tout (remplir.html) */
$("sans").onclick = () => { location.href = "remplir.html?sans"; };

/* téléphone : les 3 cartes « 1er mois offert / Sans carte bancaire / Prêt en 1 minute » se relaient toutes les 2,6 s */
{ const c = $$(".offres .offre-c"); let i = 0;
  setInterval(() => { if (matchMedia("(min-width:900px)").matches || document.hidden || BODY.dataset.e !== "lien") return; c[i].classList.remove("vue"); i = (i + 1) % c.length; c[i].classList.add("vue"); }, 2600); }

/* =====================================================================
   3 · LES CHARMS PARTOUT, posés seulement dans les espaces vides (jamais sur un texte, la case, un bouton ; jamais coupés)
   ===================================================================== */
const M = "../loginail-site/charms-mini/";
const CH = ["coeurchrome", "noeudgelee", "bouledisco", "lampeuv", "coeurgeleerose", "cadeau", "bottedisco", "coeurcristal", "coeurperles", "libellule", "coeurdisco", "flamme", "cocktail", "pinceacheveux", "baladeur", "cabriolet", "serum", "croissant"];
const ORDI = [[.05,.16,110,-14],[.17,.32,62,10],[.07,.5,86,-8],[.2,.66,56,12],[.05,.82,104,8],[.18,.9,58,-10],[.29,.22,46,6],[.3,.78,50,-6],[.12,.06,44,10],
              [.94,.18,100,12],[.83,.32,60,-10],[.92,.5,88,8],[.8,.66,58,-12],[.94,.84,110,-8],[.82,.92,56,10],[.71,.2,46,-6],[.7,.8,50,8],[.62,.92,42,-10],[.38,.92,44,6],[.5,.95,36,0]];
const TEL = [[.09,.09,50,-14],[.91,.1,52,12],[.33,.13,32,8],[.7,.15,36,-8],[.07,.3,38,10],[.93,.33,40,-10],[.06,.47,34,-6],[.94,.5,36,8],
             [.1,.67,42,6],[.5,.68,32,-6],[.9,.67,46,-10],[.06,.93,34,12],[.94,.94,34,-12]];
const ETOILES_O = [[.24,.12],[.76,.1],[.12,.4],[.88,.42],[.26,.56],[.74,.6],[.14,.72],[.86,.7],[.4,.86],[.6,.88]], ETOILES_T = [[.2,.06],[.82,.2],[.06,.58],[.94,.62],[.3,.62],[.7,.62]];
const ordi = () => matchMedia("(min-width:900px)").matches;
const rect = el => el.getBoundingClientRect();
function pose(sec, cible) {
  const S = rect(sec), O = ordi(), m = O ? 22 : 6;
  const sel = O ? ".tete .logo,.pas-h,h1,.sous,.ou,.sources,.ligne-lien,.msg,.offre-c,.pied,.milieu>*,.points.cartes li,#phrase"
                : ".logo,.etape,h1,.sous,.ou,.sources,.lien,.go,.offre-c,.pied,.milieu>*,.points.cartes li,#phrase";
  const evite = [];
  /* les cartes du chargement sont mesurées comme si elles étaient toutes là (elles apparaissent une à une) */
  sec.querySelectorAll(sel).forEach(el => {
    if (/^(H1|H2|P)$/.test(el.tagName) && !el.classList.contains("msg")) { const g = document.createRange(); g.selectNodeContents(el); [...g.getClientRects()].forEach(r => evite.push(r)); }
    else if (el.matches(".sources,.pied,.pas-h")) [...el.children].forEach(c => evite.push(rect(c)));
    else evite.push(rect(el));
  });
  const ev = evite.filter(r => r.width && r.height);
  const libre = (x, y, t) => ev.every(r => x + t + m < r.left || x - m > r.right || y + t + m < r.top || y - m > r.bottom);
  const ech = O ? Math.min(S.width / 1440, S.height / 900) : Math.min(1, S.height / 844);
  let h = "", n = 0;
  (O ? ORDI : TEL).forEach(([fx, fy, t, r]) => {
    const tt = Math.round(t * Math.max(.7, ech)), x = S.left + fx * S.width - tt / 2, y = S.top + fy * S.height - tt / 2;
    if (y < S.top || y + tt > S.bottom || x < S.left + 2 || x + tt > S.right - 2) return;
    if (!libre(x, y, tt)) return;
    h += `<img src="${M}${CH[n % CH.length]}.webp" alt="" style="left:${x - S.left}px;top:${y - S.top}px;--t:${tt}px;--r:${r}deg;--d:${(.15 + n * .09).toFixed(2)}s;--f:${(4.2 + (n % 5) * .37).toFixed(2)}s">`; n++;
  });
  (O ? ETOILES_O : ETOILES_T).forEach(([fx, fy], i) => { const x = S.left + fx * S.width, y = S.top + fy * S.height;
    if (libre(x - 8, y - 8, 16)) h += `<i style="left:${x - S.left}px;top:${y - S.top}px;--d:${(i * .4).toFixed(1)}s;--t:${O ? 17 : 13}px">✦</i>`; });
  cible.innerHTML = h;
}
/* l'écran caché se mesure quand même : on le rend « visible » sans le montrer, le temps de mesurer */
function poseCache(sec, cible) {
  const vu = getComputedStyle(sec).visibility !== "hidden";
  if (!vu) { sec.style.transition = "none"; sec.style.visibility = "visible"; sec.style.transform = "none"; sec.style.opacity = "0"; }
  const c2 = $$("#s2 .points.cartes li"); c2.forEach(li => li.style.transition = "none");
  pose(sec, cible);
  if (!vu) { sec.style.visibility = sec.style.transform = sec.style.opacity = ""; void sec.offsetWidth; sec.style.transition = ""; }
  c2.forEach(li => li.style.transition = "");
}
const place = () => { if (BODY.classList.contains("tourbillon")) return; poseCache($("s1"), $("deco1")); poseCache($("s2"), $("deco2")); };
addEventListener("load", place); addEventListener("resize", () => { clearTimeout(place.t); place.t = setTimeout(place, 150); });
if (document.fonts) document.fonts.ready.then(place);

/* =====================================================================
   4 · LES CHARMS VIVANTS : ils réagissent au curseur et au doigt (comme sur l'accueil), frissonnent à partir de la 3e info,
       puis le TOURBILLON (ils tournent en spirale autour de l'anneau et s'y glissent)
   ===================================================================== */
const E = new WeakMap(); let mx = -9e3, my = -9e3, pmx = -9e3, pmy = -9e3, tSei = 0, tTour = 0;
addEventListener("pointermove", e => { mx = e.clientX; my = e.clientY; }, { passive: true });
addEventListener("pointerdown", e => { mx = e.clientX; my = e.clientY; }, { passive: true });
document.addEventListener("pointerleave", () => { mx = my = -9e3; });
addEventListener("pointerup", e => { if (e.pointerType !== "mouse") mx = my = -9e3; });
const alea = a => (Math.random() * 2 - 1) * a;
function tick(now) {
  const mvx = mx > -9e3 && pmx > -9e3 ? mx - pmx : 0, mvy = my > -9e3 && pmy > -9e3 ? my - pmy : 0; pmx = mx; pmy = my;
  const tour = BODY.classList.contains("tourbillon"), sei = BODY.classList.contains("seisme"), enCharge = BODY.dataset.e === "charge";
  const ring = document.querySelector("#s2 .anneau"), RR = ring && ring.getBoundingClientRect();
  const p = enCharge ? (parseFloat(BODY.style.getPropertyValue("--p")) || 0) : 0;
  const amp = sei ? .6 + Math.min(1, (now - tSei) / 700) * 1.6 : enCharge && p > .5 ? (p - .5) / .5 * .8 : 0;
  if (!document.hidden) $$(".ecran .deco").forEach(d => {
    const sec = d.parentNode; if (getComputedStyle(sec).visibility === "hidden") return;
    const S = sec.getBoundingClientRect(), estCharge = d.id === "deco2";
    d.querySelectorAll("img").forEach((im, i) => {
      let it = E.get(im); if (!it) E.set(im, it = { dx: 0, dy: 0, vx: 0, vy: 0, rot: 0, vr: 0, cool: 0 });
      const s = im.offsetWidth, bx = im.offsetLeft, by = im.offsetTop;
      if (estCharge && tour && RR) {
        const rcx = RR.left + RR.width / 2, rcy = RR.top + RR.height / 2, hx = S.left + bx + s / 2, hy = S.top + by + s / 2;
        if (!it.tb) { const X0 = hx + it.dx - rcx, Y0 = hy + it.dy - rcy; it.tb = { r0: Math.hypot(X0, Y0), a0: Math.atan2(Y0, X0), t0: tTour + i * 55, T: 1500 + (i % 5) * 90, r0t: it.rot }; }
        const u = Math.min(1, Math.max(0, (now - it.tb.t0) / it.tb.T)), e = u < .5 ? 4 * u * u * u : 1 - (-2 * u + 2) ** 3 / 2;
        const r = it.tb.r0 * (1 - e), a = it.tb.a0 + e * e * Math.PI * 1.6;
        im.style.translate = `${(rcx + r * Math.cos(a) - hx).toFixed(1)}px ${(rcy + r * Math.sin(a) - hy).toFixed(1)}px`; im.style.rotate = `${(it.tb.r0t + e * 220).toFixed(1)}deg`;
        im.style.scale = (.1 + .9 * (1 - e)).toFixed(3); im.style.opacity = u > .96 ? "0" : ""; im.classList.add("chaud"); return;
      }
      const cx = S.left + bx + it.dx + s / 2, cy = S.top + by + it.dy + s / 2;
      const ux = cx - mx, uy = cy - my, dd = Math.hypot(ux, uy) || 1, hit = s / 2 + 22;
      if (dd < hit && it.cool <= 0) { const kk = 1 - dd / hit; it.vx += ux / dd * (10 + kk * 12) + mvx * .85; it.vy += uy / dd * (10 + kk * 12) + mvy * .85; it.vr += (ux > 0 ? 1 : -1) * (6 + Math.min(14, Math.abs(mvx) * .3)); it.cool = 8; }
      it.cool--;
      it.vx += -it.dx * .0011; it.vy += -it.dy * .0011; it.vx *= .984; it.vy *= .984; it.vr *= .95;
      const sp = Math.hypot(it.vx, it.vy); if (sp > 60) { it.vx *= 60 / sp; it.vy *= 60 / sp; }
      it.dx += it.vx; it.dy += it.vy; it.rot += it.vr * .35; it.rot *= .982;
      const px = bx + it.dx, py = by + it.dy, W = S.width, H = S.height;
      if (px < 4) { it.dx = 4 - bx; it.vx = Math.abs(it.vx) * .7; } else if (px > W - s - 4) { it.dx = W - s - 4 - bx; it.vx = -Math.abs(it.vx) * .7; }
      if (py < 4) { it.dy = 4 - by; it.vy = Math.abs(it.vy) * .7; } else if (py > H - s - 4) { it.dy = H - s - 4 - by; it.vy = -Math.abs(it.vy) * .7; }
      const tr = estCharge ? amp : 0;
      im.classList.toggle("chaud", sp > 1.2 || tr > 3);
      const X = it.dx + alea(tr), Y = it.dy + alea(tr), Rz = it.rot + alea(tr * 1.6);
      if (Math.abs(X) + Math.abs(Y) + Math.abs(Rz) > .05) { im.style.translate = `${X.toFixed(1)}px ${Y.toFixed(1)}px`; im.style.rotate = `${Rz.toFixed(1)}deg`; im.style.scale = ""; }
      else if (im.style.translate) { im.style.translate = ""; im.style.rotate = ""; im.style.scale = ""; }
      im.style.opacity = "";
    });
  });
  if (sei && !tour) $$("#s2 .points.cartes li").forEach(li => { li.style.translate = `${alea(amp * .6).toFixed(1)}px ${alea(amp * .6).toFixed(1)}px`; });
  requestAnimationFrame(tick);
}
if (!RM) requestAnimationFrame(tick);

/* =====================================================================
   5 · LE CHARGEMENT : l'anneau se remplit, une info à la fois ; chaque info trouvée devient une carte (pas trouvée = pas de carte)
   ===================================================================== */
const K = ["salon", "photos", "avis", "horaires", "prix"];
const LAB = { salon: "Ton salon", photos: "Tes photos", avis: "Tes avis", horaires: "Tes horaires", prix: "Tes prix" };
const PHRASES = ["Recherche de ton salon…", "Tes photos arrivent…", "Lecture de tes avis…", "Lecture de tes horaires…", "Lecture de tes prix…"];
const phrase = $("phrase");
function dire(t) { phrase.classList.add("change"); setTimeout(() => { phrase.textContent = t; phrase.classList.remove("change"); }, 170); }
let jeton = 0;
function reset() {
  K.forEach(k => BODY.classList.remove("en-" + k, "k-" + k)); BODY.classList.remove("pret", "attend", "seisme", "bam", "tourbillon", "ouvert");
  $$("#s2 [data-k]").forEach(x => { x.classList.remove("cours", "ok"); x.querySelectorAll("[data-court]").forEach(s => s.textContent = ""); x.style.translate = ""; x.getAnimations().forEach(a => a.cancel()); });
  BODY.style.setProperty("--pd", "0ms"); BODY.style.setProperty("--p", 0); phrase.textContent = ""; $("cLab").textContent = ""; $("cVal").textContent = ""; $("cVal").classList.remove("on");
  port.classList.remove("on"); port.getAnimations().forEach(a => a.cancel());
  $$("#deco2 img").forEach(im => { E.delete(im); im.style.translate = im.style.rotate = im.style.scale = im.style.opacity = ""; });
}
/* les étoiles ✦ qui jaillissent */
function eclate(nb = 22) {
  const z = document.querySelector("#s2 .eclat"); if (!z || RM) return;
  for (let i = 0; i < nb; i++) { const e = document.createElement("i"); e.textContent = "✦"; e.style.fontSize = (11 + Math.random() * 10) + "px";
    const a = Math.random() * Math.PI * 2, r = 50 + Math.random() * 110; z.appendChild(e);
    e.animate([{ transform: "translate(-50%,-50%) scale(.3)", opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * r}px),calc(-50% + ${Math.sin(a) * r}px)) scale(1.15)`, opacity: 0 }],
      { duration: 850 + Math.random() * 450, easing: "cubic-bezier(.1,.8,.3,1)" }).onfinish = () => e.remove(); }
}

/* Personnaliser se charge derrière (dès que son brouillon est écrit), puis s'ouvre en cercle depuis l'anneau */
const port = document.createElement("div"); port.className = "portail"; port.setAttribute("aria-hidden", "true");
port.innerHTML = '<iframe title="Personnaliser mon site"></iframe>';
app.appendChild(port);
const ifr = port.querySelector("iframe"), flash = document.createElement("div"); flash.className = "flash"; app.appendChild(flash);
let ifrPret = null;
function prepareSuite() { ifrPret = new Promise(ok => { ifr.addEventListener("load", ok, { once: true }); setTimeout(ok, 8000); }); ifr.src = PERSO; }
/* une fois ouverte, Personnaliser devient LA page : l'adresse change (actualiser = Personnaliser), et si elle va ailleurs, toute la page suit */
function devientPerso() {
  try { history.replaceState(null, "", ifr.contentWindow.location.href); document.title = ifr.contentDocument.title; } catch (e) { location.replace(PERSO); return; }
  port.setAttribute("aria-hidden", "false"); $("s1").inert = true; $("s2").inert = true;
  ifr.addEventListener("load", () => { let u = ""; try { u = ifr.contentWindow.location.href; } catch (e) {} if (!/personnaliser\.html/.test(u)) location.replace(u || PERSO); });
  try { ifr.contentWindow.focus(); } catch (e) {}
}

async function charge(lien) {
  const j = ++jeton; reset(); BODY.dataset.e = "charge";
  let fini = false, gOk = false, erreur = "";
  const lecture = DEMO ? attends(400).then(() => { gOk = true; fini = true; })
    : fetch(FONCTION, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${ANON}`, apikey: ANON }, body: JSON.stringify({ lien }) })
      .then(r => r.json()).then(async g => { if (g.erreur) throw new Error(g.erreur); depuisGoogle(g); B.site = g.site || ""; gOk = true;
        await Promise.all([prechargePhotos(B.photos), litTarifs()]); })
      .catch(e => { erreur = e.message && !/fetch|json/i.test(e.message) ? e.message : "Pas de connexion. Vérifie ton réseau et réessaie."; })
      .finally(() => { fini = true; });
  await attends(500);
  for (let i = 0; i < K.length; i++) {
    if (j !== jeton || erreur) break; const k = K[i];
    BODY.classList.add("en-" + k); BODY.dataset.k = k;
    $$(`#s2 [data-k="${k}"]`).forEach(x => x.classList.add("cours"));
    dire(PHRASES[i]); $("cLab").textContent = LAB[k]; $("cVal").textContent = ""; $("cVal").classList.remove("on");
    /* 18/11 (Marie : « que ça coulisse ») : le trait avance en continu pendant toute l'étape, au lieu de sauter à la fin */
    const duree = RM ? 300 : i === 1 ? 1500 : 1100; void BODY.offsetWidth; BODY.style.setProperty("--pd", (duree + 250) + "ms"); BODY.style.setProperty("--p", (i + 1) / K.length);
    await attends(duree);
    while (!fini && !(i < 4 && gOk)) await attends(200);   // les prix attendent la lecture de son site
    if (j !== jeton || erreur) break;
    const t = trouve(k), tc = trouve(k, true);
    $$(`#s2 [data-k="${k}"]`).forEach(x => { x.classList.remove("cours"); if (tc) { x.classList.add("ok"); x.querySelectorAll("[data-court]").forEach(s => s.textContent = tc); } });
    $("cVal").textContent = t || "À ajouter ensuite"; $("cVal").classList.add("on");
    BODY.classList.add("k-" + k); BODY.style.setProperty("--p", (i + 1) / K.length);
  }
  await lecture; if (j !== jeton) return;
  if (erreur) {
    /* Planity, Booksy, son site : salon pas retrouvé sur Google → elle complète (ses prix se liront depuis son lien) */
    if (!estGoogle(lien) && !/connexion/i.test(erreur)) { location.href = "remplir.html?sans&site=" + encodeURIComponent(lien); return; }
    BODY.dataset.e = "lien"; dit(erreur, "err"); return;
  }
  garde(); prepareSuite();
  if (RM) { location.replace(PERSO); return; }   // mouvements réduits : directement Personnaliser
  await attends(350); if (j !== jeton) return;
  BODY.classList.add("pret"); eclate();
  fin(j);
}

/* la fin C « Tourbillon » : coche rose → petit frisson → charms en spirale + cartes une à une dans l'anneau → halo rose → Personnaliser en cercle */
const centre = () => { const a = $("s2").querySelector(".anneau").getBoundingClientRect(), A = app.getBoundingClientRect();
  const cx = a.left + a.width / 2 - A.left, cy = a.top + a.height / 2 - A.top;
  return { a, cx, cy, r0: a.width / 2, rmax: Math.hypot(Math.max(cx, A.width - cx), Math.max(cy, A.height - cy)) + 20 }; };
async function fin(j) {
  await attends(450); if (j !== jeton) return;
  BODY.classList.add("seisme"); tSei = performance.now();
  await attends(750); if (j !== jeton) return;
  const C = centre();
  BODY.classList.remove("seisme"); BODY.classList.add("tourbillon"); tTour = performance.now();
  const ring = $("s2").querySelector(".anneau .cercle");
  $$("#s2 .points.cartes li.ok").forEach((li, i) => { li.style.translate = "";
    const r = li.getBoundingClientRect(), ux = C.a.left + C.a.width / 2 - (r.left + r.width / 2), uy = C.a.top + C.a.height / 2 - (r.top + r.height / 2), d = Math.hypot(ux, uy) || 1;
    const px = -uy / d * 46, py = ux / d * 46, dl = 250 + i * 170;   // une petite courbe en chemin
    li.animate([{ translate: "0 0", scale: 1, opacity: 1 }, { translate: `${ux * .5 + px}px ${uy * .5 + py}px`, scale: .75, opacity: 1, offset: .55 }, { translate: `${ux}px ${uy}px`, scale: .12, opacity: 0 }],
      { duration: 950, delay: dl, easing: "cubic-bezier(.45,0,.25,1)", fill: "forwards" });
    if (ring) ring.animate([{ scale: 1 }, { scale: 1.045 }, { scale: 1 }], { duration: 320, delay: dl + 900, easing: "ease-out" }); });   // l'anneau « avale » la carte
  await attends(2050); if (j !== jeton) return;
  await ifrPret; if (j !== jeton) return;   // Personnaliser est prête (elle s'est chargée pendant le tourbillon)
  /* 18/11 (Marie : « je ne veux pas le halo, ni le site en petit puis en grand ») : plus de flash rose ni d'ouverture en cercle :
     Personnaliser apparaît simplement en fondu, à sa vraie taille */
  port.style.clipPath = "none"; port.classList.add("on");
  port.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 480, easing: "ease-out", fill: "forwards" });
  await attends(500); if (j !== jeton) return;
  BODY.classList.add("ouvert"); devientPerso();
}

/* =====================================================================
   6 · « OÙ TROUVER MON LIEN ? » : 5 boutons, chacun MONTRE le geste (mini téléphone + doigt)
   ===================================================================== */
const AIDE = {
  google: { nom: "Ton salon", t: ["Ouvre <b>Google Maps</b> et touche ton salon.", "Touche <b>Partager</b>, puis <b>Copier le lien</b>.", "Reviens ici et touche <b>Coller</b>."] },
  planity: { nom: "Planity · Ton salon", t: ["Ouvre <b>ta page Planity</b>.", "Touche <b>Partager</b>, puis <b>Copier le lien</b>.", "Reviens ici et touche <b>Coller</b>."] },
  booksy: { nom: "Booksy · Ton salon", t: ["Ouvre <b>ta page Booksy</b>.", "Touche <b>Partager</b>, puis <b>Copier le lien</b>.", "Reviens ici et touche <b>Coller</b>."] },
  site: { nav: "votresalon.fr", t: ["Ouvre <b>ton site</b>.", "Touche <b>l’adresse en haut</b>, puis <b>Copier</b>.", "Reviens ici et touche <b>Coller</b>."] },
  autre: { nav: "fresha.com/votresalon", t: ["Ouvre <b>ta page</b> : Fresha, Treatwell, iara…", "Touche <b>l’adresse en haut</b>, puis <b>Copier</b>.", "Reviens ici et touche <b>Coller</b>."] } };
const voile = document.createElement("div"); voile.className = "voile";
const f = document.createElement("div"); f.className = "feuille"; f.setAttribute("role", "dialog"); f.setAttribute("aria-label", "Où trouver mon lien ?");
f.innerHTML = `<div class="poignee"></div><h3>Où trouver mon lien ?</h3>
  <div class="srcs"><button type="button" data-o="google" class="on">Google Maps</button><button type="button" data-o="planity">Planity</button><button type="button" data-o="booksy">Booksy</button><button type="button" data-o="site">Mon site</button><button type="button" data-o="autre">Autre lien</button></div>
  <div class="montre"><div class="mm"><div class="e"><div class="carte"></div><div class="fi"><b class="mn"></b><small>★ 4,9 (48) · Prothésiste ongulaire</small>
    <div class="bts"><span>Itinéraire</span><span>Appeler</span><span class="mp">Partager</span></div></div>
    <div class="mf"><div><i></i>Envoyer par message</div><div class="mc"><i></i>Copier le lien</div><div><i></i>Plus</div></div><div class="mnav"><div class="barre-n"><span class="adr"></span></div><div class="bulle">Copier</div><div class="page-n"><i></i><i></i><i></i><i></i></div></div><div class="mok">Lien copié</div></div><div class="doigt"></div></div>
    <ol class="gestes"><li><i>1</i><span></span></li><li><i>2</i><span></span></li><li><i>3</i><span></span></li></ol></div>
  <button type="button" class="go fermer">Compris</button>`;
app.append(voile, f);
let src = "google", jA = 0;
const mm = f.querySelector(".mm"), doigt = f.querySelector(".doigt"), li = [...f.querySelectorAll(".gestes li")];
const vers = el => { const a = el.getBoundingClientRect(), b = mm.getBoundingClientRect(); doigt.style.left = (a.left - b.left + a.width / 2) + "px"; doigt.style.top = (a.top - b.top + a.height / 2) + "px"; };
const appuie = async el => { el.classList.add("tap"); doigt.classList.add("appui"); await attends(170); doigt.classList.remove("appui"); await attends(200); el.classList.remove("tap"); };
async function aide(o) {
  if (o) src = o; const j = ++jA; const A = AIDE[src];
  f.querySelectorAll(".srcs button").forEach(b => b.classList.toggle("on", b.dataset.o === src));
  f.querySelector(".mn").textContent = A.nom || "Ton salon"; li.forEach((l, i) => l.querySelector("span").innerHTML = A.t[i]);
  app.classList.add("aide"); await attends(450);
  const on = n => li.forEach((l, i) => l.classList.toggle("on", i === n));
  const mf = f.querySelector(".mf"), mok = f.querySelector(".mok"), nav = f.querySelector(".mnav");
  nav.classList.toggle("on", !!A.nav); if (A.nav) nav.querySelector(".adr").textContent = A.nav;
  if (A.nav) { const bar = nav.querySelector(".barre-n"), bul = nav.querySelector(".bulle");
    while (j === jA) {
      bul.classList.remove("on"); mok.classList.remove("on"); doigt.classList.remove("on"); bar.classList.remove("sel"); on(0); await attends(1500); if (j !== jA) return;
      on(1); vers(bar); doigt.classList.add("on"); await attends(650); if (j !== jA) return;
      await appuie(bar); bar.classList.add("sel"); bul.classList.add("on"); await attends(550); if (j !== jA) return;
      vers(bul); await attends(650); if (j !== jA) return;
      await appuie(bul); bul.classList.remove("on"); mok.classList.add("on"); doigt.classList.remove("on");
      on(2); await attends(2200);
    } return; }
  while (j === jA) {
    mf.classList.remove("on"); mok.classList.remove("on"); doigt.classList.remove("on"); on(0); await attends(1500); if (j !== jA) return;
    on(1); vers(f.querySelector(".mp")); doigt.classList.add("on"); await attends(650); if (j !== jA) return;
    await appuie(f.querySelector(".mp")); mf.classList.add("on"); await attends(550); if (j !== jA) return;
    vers(f.querySelector(".mc")); await attends(650); if (j !== jA) return;
    await appuie(f.querySelector(".mc")); mf.classList.remove("on"); mok.classList.add("on"); doigt.classList.remove("on");
    on(2); await attends(2200);
  }
}
const fermeAide = () => { jA++; app.classList.remove("aide"); };
voile.onclick = fermeAide; f.querySelector(".fermer").onclick = fermeAide;
addEventListener("keydown", e => { if (e.key === "Escape" && app.classList.contains("aide")) fermeAide(); });
f.querySelectorAll(".srcs button").forEach(b => b.onclick = () => aide(b.dataset.o));
$$("[data-aide]").forEach(b => b.onclick = () => aide(b.dataset.aide || "google"));

/* =====================================================================
   7 · DÉMARRAGE
   ===================================================================== */
/* retour arrière (Safari garde la page en mémoire) : on repart de la page 1 */
addEventListener("pageshow", e => { if (e.persisted && BODY.dataset.e !== "lien" && !BODY.classList.contains("ouvert")) { jeton++; reset(); BODY.dataset.e = "lien"; } });
if (DEMO) { champ.value = "https://maps.app.goo.gl/nailsbydrimf"; verifie(); }
const venu = Q.get("lien");   // le lien collé sur l'accueil
if (venu) { champ.value = venu; verifie(); $("creer").click(); }
})();
