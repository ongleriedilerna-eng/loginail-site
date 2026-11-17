/* 16/11 · Script commun des 5 versions (creer-1-v1 … v5) : page 1 « Collez votre lien » + chargement.
   Paramètres : ?salon=moka (2e salon d'essai « Marie Onglerie ») · ?ecran=charge (le chargement tourne en boucle)
                ?demo (la page 1 se joue toute seule : lien collé → chargement → retour, en boucle).
   Chaque version peut définir window.V = { etape(i,k,moment), pret(), reset(), lien() } avant ce script. */
(() => {
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const Q = new URLSearchParams(location.search);
const calme = matchMedia("(prefers-reduced-motion:reduce)").matches;
const attends = ms => new Promise(r => setTimeout(r, ms));
const V = window.V || {};
const B = document.body;

/* ---------- les deux salons d'essai ---------- */
const P = "../loginail-site/univers-photos/";
const SALONS = {
  cerise: { nom: "Les Ongles de Cerise", ville: "Lille", note: "4,9", nbAvis: 48, nbPhotos: 12, horaires: "Du mardi au samedi", hCourt: "Mar → sam", prix: 9,
    photos: ["1", "2", "3", "4", "5"].map(n => P + "cerise/" + n + ".webp") },
  moka: { nom: "Marie Onglerie", ville: "Lyon", note: "4,8", nbAvis: 112, nbPhotos: 9, horaires: "Du lundi au samedi", hCourt: "Lun → sam", prix: 14,
    photos: ["1", "2", "3", "4", "salon"].map(n => P + "moka/" + n + ".webp") }
};
const S = SALONS[Q.get("salon")] || SALONS.cerise;
const VAL = { salon: S.nom + " · " + S.ville, photos: S.nbPhotos + " photos", avis: S.note + " ★ · " + S.nbAvis + " avis", horaires: S.horaires, prix: S.prix + " prestations" };
const COURT = { salon: S.nom, photos: S.nbPhotos + " photos", avis: S.note + " ★", horaires: S.hCourt, prix: S.prix + " prix" };
window.SALON = S;
$$("[data-v]").forEach(e => { const k = e.dataset.v; e.textContent = k in S ? S[k] : ""; });
$$("img[data-ph]").forEach(i => { i.src = S.photos[+i.dataset.ph % S.photos.length]; i.alt = ""; });
S.photos.forEach(s => { const i = new Image(); i.src = s; });

/* ---------- logo + colonnes de l'ordinateur ---------- */
const LOGO = '<svg viewBox="0 -2 330 72" aria-label="Loginail"><g transform="scale(.5)"><rect x="0" y="5" width="225" height="120" rx="60" fill="currentColor"/><path d="M172 21H215C254 21 282 42 282 65C282 88 254 109 215 109H172A44 44 0 0 1 172 21Z" fill="currentColor"/><path d="M172 28H213C247 28 274 47 274 65C274 83 247 102 213 102H172A37 37 0 0 1 172 28Z" fill="var(--logo-fond,#F6F3EF)"/></g><text x="160" y="42" font-family="Jost,sans-serif" font-weight="300" font-size="22" letter-spacing="9" fill="currentColor">LOGINAIL</text></svg>';
$$("[data-logo]").forEach(e => e.innerHTML = LOGO);
const cadre = $(".cadre");
if (cadre) {
  const lp = document.createElement("a"); lp.className = "logo-page"; lp.href = "../"; lp.innerHTML = LOGO; cadre.prepend(lp);
  const g = $("[data-cote=g]"), d = $("[data-cote=d]");
  if (g && !g.innerHTML.trim()) g.innerHTML = `<h2>4 étapes,<br><em>une minute.</em></h2><p>Collez votre lien : votre nom, vos photos, vos avis, vos horaires et vos prix se remplissent tout seuls.</p>
    <ol class="pas"><li class="on">Votre lien <i>1</i></li><li>Votre style <i>2</i></li><li>Vos couleurs et votre fond <i>3</i></li><li>Vos charms <i>4</i></li></ol>`;
  if (d && !d.innerHTML.trim()) d.innerHTML = `<h2>Vu comme<br><em>vos clientes.</em></h2><p>Votre site se fait au format téléphone : c’est comme ça que vos clientes le verront.</p>
    <div class="offre"><b>1er mois offert</b><span>sans carte bancaire · sans engagement</span></div>`;
}

/* ---------- la case du lien (mêmes règles que le vrai site) ---------- */
const PIN = '<svg viewBox="0 0 13 16"><path d="M6.5 0A6.5 6.5 0 0 0 0 6.5C0 11 6.5 16 6.5 16S13 11 13 6.5A6.5 6.5 0 0 0 6.5 0Zm0 9A2.5 2.5 0 1 1 6.5 4a2.5 2.5 0 0 1 0 5Z" fill="#D9473B"/></svg>';
const COCHE = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 7.5l3 3 6-7"/></svg>';
const estInsta = l => /(^|\/\/|\.)(instagram\.com|instagr\.am|tiktok\.com|facebook\.com|fb\.com)/i.test(l);
const estGoogle = l => /^https?:\/\/(maps\.app\.goo\.gl|goo\.gl\/maps|(www\.)?google\.[a-z.]+\/maps|maps\.google\.[a-z.]+)/i.test(l);
function lienDe(t) { t = String(t || "").trim(); const h = t.match(/https?:\/\/\S+/)?.[0]; if (h) return h;
  const d = t.match(/(?:^|\s)((?:www\.)?[a-z0-9àâäéèêëîïôöùûüç-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}(?:\/\S*)?)\s*$/i)?.[1]; return d ? "https://" + d.replace(/^\/+/, "") : ""; }
const sorte = l => !l || estInsta(l) ? "" : estGoogle(l) ? "google" : /planity\.com/i.test(l) ? "planity" : /booksy\.com/i.test(l) ? "booksy" : /^https?:\/\/[^\s/]+\.[a-z]{2,}/i.test(l) ? "site" : "";
const NOMS = { google: "<b>Fiche Google Maps</b> reconnue", planity: "<b>Page Planity</b> reconnue", booksy: "<b>Page Booksy</b> reconnue", site: "<b>Votre site</b> reconnu" };
const EXEMPLE = "https://maps.app.goo.gl/cerise";
const champ = $("#champ"), boite = champ?.closest(".lien"), msg = $("#msg");
let puce;
if (boite) {
  puce = document.createElement("div"); puce.className = "puce";
  puce.innerHTML = `<i class="ic">${PIN}</i><span></span><button type="button" class="chg">Changer</button><i class="ok">${COCHE}</i>`;
  boite.appendChild(puce);
  puce.querySelector(".chg").onclick = () => { champ.value = ""; verifie(); champ.focus(); };
}
const dit = (t, c = "") => { if (!msg) return; msg.textContent = t; msg.className = "msg " + c; };
function verifie() { const s = sorte(lienDe(champ.value)); boite.classList.toggle("reconnue", !!s);
  if (s) { puce.querySelector("span").innerHTML = NOMS[s]; dit(""); V.lien?.(s); } else if (!champ.value.trim()) dit(""); return s; }
if (champ) {
  champ.addEventListener("input", verifie);
  champ.addEventListener("keydown", e => { if (e.key === "Enter") $("#creer").click(); });
}
/* « Coller » : dans la maquette, on colle le lien d'exemple (le vrai site lit le presse-papier) */
async function colle() { let t = ""; try { t = await navigator.clipboard.readText(); } catch (e) {}
  if (!sorte(lienDe(t))) t = EXEMPLE; champ.value = t.trim(); verifie(); return true; }
$("#coller") && ($("#coller").onclick = colle);
$("#creer") && ($("#creer").onclick = async () => {
  if (!champ.value.trim()) await colle();
  const l = lienDe(champ.value);
  if (estInsta(l)) return dit("Instagram ne suffit pas : collez votre fiche Google Maps, Planity, Booksy ou votre site.", "err");
  if (!sorte(l)) return dit("Ce lien n’est pas reconnu. Touchez « Où trouver mon lien ? ».", "err");
  charge();
});
$("#sans") && ($("#sans").onclick = () => suite("→ Page suivante : vous écrivez vous-même"));

/* ---------- petit message « page suivante » ---------- */
const app = $(".app");
const toast = document.createElement("div"); toast.className = "suite"; app.appendChild(toast);
function suite(t) { toast.textContent = t; toast.classList.add("on"); clearTimeout(toast._t); toast._t = setTimeout(() => toast.classList.remove("on"), 2200); }

/* ---------- le chargement ---------- */
const K = ["salon", "photos", "avis", "horaires", "prix"];
const PHRASES = ["Recherche de votre salon…", "Vos photos arrivent…", "Lecture de vos avis…", "Lecture de vos horaires…", "Lecture de vos prix…"];
const FIN = "Le voilà, votre salon.";
const phrase = $("#phrase");
function dire(t, fini) { if (!phrase) return; phrase.classList.add("change");
  setTimeout(() => { phrase.textContent = t; phrase.classList.toggle("fini", !!fini); phrase.classList.remove("change"); }, 170); }
let jeton = 0;
const boucle = Q.get("ecran") === "charge" || Q.has("demo");
const fige = Q.get("ecran") === "pret";   // ?ecran=pret : l'écran de chargement déjà fini, immobile (pour comparer)
function reset() {
  K.forEach(k => B.classList.remove("en-" + k, "k-" + k)); B.classList.remove("pret", "attend");
  $$("#s2 [data-k]").forEach(x => { x.classList.remove("cours", "ok"); x.querySelectorAll("small,[data-val],[data-court]").forEach(s => s.textContent = ""); });
  B.style.setProperty("--p", 0); if (phrase) { phrase.textContent = ""; phrase.classList.remove("fini"); }
  V.reset?.();
}
async function charge() {
  const j = ++jeton; reset(); B.dataset.e = "charge"; await attends(500);
  for (let i = 0; i < K.length; i++) {
    if (j !== jeton) return; const k = K[i];
    B.classList.add("en-" + k); B.dataset.k = k;
    $$(`#s2 [data-k="${k}"]`).forEach(x => x.classList.add("cours"));
    dire(PHRASES[i]); V.etape?.(i, k, "debut");
    await attends(fige ? 60 : calme ? 300 : (i === 1 ? 1500 : 1100)); if (j !== jeton) return;
    $$(`#s2 [data-k="${k}"]`).forEach(x => { x.classList.remove("cours"); x.classList.add("ok");
      x.querySelectorAll("small,[data-val]").forEach(s => s.textContent = VAL[k]); x.querySelectorAll("[data-court]").forEach(s => s.textContent = COURT[k]); });
    B.classList.add("k-" + k); B.style.setProperty("--p", (i + 1) / K.length); V.etape?.(i, k, "fin");
  }
  await attends(350); if (j !== jeton) return;
  B.classList.add("pret"); dire(FIN, true); if (!fige) eclate(); V.pret?.();
  if (fige) return B.classList.add("attend");
  if (boucle) { await attends(4200); if (j !== jeton) return; if (Q.has("demo")) return retour(); return charge(); }
  await attends(700); if (j === jeton) B.classList.add("attend");
}
function retour() { jeton++; reset(); B.dataset.e = "lien"; if (champ) { champ.value = ""; verifie(); } if (Q.has("demo")) demo(); }
$("#continuer") && ($("#continuer").onclick = () => { suite("→ Page suivante : « Votre salon, presque prêt »"); setTimeout(retour, 1800); });

/* les étoiles ✦ qui jaillissent quand c'est prêt */
function eclate(nb = 22) {
  const z = $(".eclat"); if (!z || calme) return;
  for (let i = 0; i < nb; i++) { const e = document.createElement("i"); e.textContent = "✦"; e.style.fontSize = (11 + Math.random() * 10) + "px";
    const a = Math.random() * Math.PI * 2, r = 50 + Math.random() * 110; z.appendChild(e);
    e.animate([{ transform: "translate(-50%,-50%) scale(.3)", opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * r}px),calc(-50% + ${Math.sin(a) * r}px)) scale(1.15)`, opacity: 0 }],
      { duration: 850 + Math.random() * 450, easing: "cubic-bezier(.1,.8,.3,1)" }).onfinish = () => e.remove(); }
}
window.eclate = eclate;

/* ---------- « Où trouver mon lien ? » : on MONTRE le geste ---------- */
const SLUG = S.nom.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "");
const AIDE = {
  google: { nom: S.nom, t: ["Ouvrez <b>Google Maps</b> et touchez votre salon.", "Touchez <b>Partager</b>, puis <b>Copier le lien</b>.", "Revenez ici et touchez <b>Coller</b>."] },
  planity: { nom: "Planity · " + S.nom, t: ["Ouvrez <b>votre page Planity</b>.", "Touchez <b>Partager</b>, puis <b>Copier le lien</b>.", "Revenez ici et touchez <b>Coller</b>."] },
  booksy: { nom: "Booksy · " + S.nom, t: ["Ouvrez <b>votre page Booksy</b>.", "Touchez <b>Partager</b>, puis <b>Copier le lien</b>.", "Revenez ici et touchez <b>Coller</b>."] },
  site: { nav: SLUG + ".fr", t: ["Ouvrez <b>votre site</b>.", "Touchez <b>l’adresse en haut</b>, puis <b>Copier</b>.", "Revenez ici et touchez <b>Coller</b>."] },
  autre: { nav: "fresha.com/" + SLUG, t: ["Ouvrez <b>votre page</b> : Fresha, Treatwell, iara…", "Touchez <b>l’adresse en haut</b>, puis <b>Copier</b>.", "Revenez ici et touchez <b>Coller</b>."] } };
const voile = document.createElement("div"); voile.className = "voile";
const f = document.createElement("div"); f.className = "feuille"; f.setAttribute("role", "dialog"); f.setAttribute("aria-label", "Où trouver mon lien ?");
f.innerHTML = `<div class="poignee"></div><h3>Où trouver mon lien ?</h3>
  <div class="srcs"><button data-o="google" class="on">Google Maps</button><button data-o="planity">Planity</button><button data-o="booksy">Booksy</button><button data-o="site">Mon site</button><button data-o="autre">Autre lien</button></div>
  <div class="montre"><div class="mm"><div class="e"><div class="carte"></div><div class="fi"><b class="mn"></b><small>★ ${S.note} (${S.nbAvis}) · Prothésiste ongulaire</small>
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
  f.querySelector(".mn").textContent = A.nom || S.nom; li.forEach((l, i) => l.querySelector("span").innerHTML = A.t[i]);
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
f.querySelectorAll(".srcs button").forEach(b => b.onclick = () => aide(b.dataset.o));
$$("[data-aide]").forEach(b => b.onclick = () => aide(b.dataset.aide || "google"));
$("#aideB") && ($("#aideB").onclick = () => aide());

/* ---------- démarrage ---------- */
async function demo() { await attends(1800); if (B.dataset.e !== "lien") return;
  champ.value = EXEMPLE; verifie(); await attends(1100); if (B.dataset.e === "lien") charge(); }
B.dataset.e = "lien";
if (Q.get("ecran") === "charge" || fige) charge();
else if (Q.has("demo")) demo();
})();
