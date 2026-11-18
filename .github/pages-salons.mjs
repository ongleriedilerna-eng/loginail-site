/* 18/11 (Marie : « une page par salon ») — fabrique loginail.fr/nom-du-salon/index.html pour chaque site EN LIGNE.
   Cette petite page porte le nom du salon, sa photo et une phrase : c'est ce que lisent iMessage, WhatsApp, Instagram, Facebook
   pour dessiner l'aperçu du lien (ils ne lancent pas le JavaScript du vrai site). Puis elle ouvre tout de suite le vrai site.
   Lancé par .github/workflows/pages-salons.yml (toutes les 10 minutes, ou à la main). */
import fs from "node:fs";
import path from "node:path";

const RACINE = process.cwd();
const API = "https://scfhaombuptmrlkdhcsl.supabase.co/rest/v1/rpc/";
const CLE = "sb_publishable_lYx1ZH0k3EFrUhZ3v0W8gw_yhGPOhbq";   /* la clé publique, déjà écrite dans le site */
const MARQUE = '<meta name="loginail-page-salon" content="1">';  /* seules les pages qui portent cette marque peuvent être effacées */

const rpc = async (nom, corps) => { const r = await fetch(API + nom, { method: "POST", headers: { apikey: CLE, "Content-Type": "application/json" }, body: JSON.stringify(corps || {}) });
  if (!r.ok) throw new Error(nom + " : " + r.status + " " + (await r.text())); return r.json(); };
const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const court = (s, n) => { s = String(s || "").replace(/\s+/g, " ").trim(); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : s; };
const absolue = u => !u ? "" : /^https?:\/\//.test(u) ? u : "https://loginail.fr/" + String(u).replace(/^(\.\.\/|\.\/|\/)+/, "");

function page(slug, b) {
  const nom = court(b.nom || slug, 60), ville = court(b.ville, 40);
  const titre = ville ? `${nom} · Prothésiste ongulaire à ${ville}` : `${nom} · Prothésiste ongulaire`;
  const avis = b.note && b.nbAvis ? ` ${String(b.note).replace(".", ",")}/5 sur Google (${b.nbAvis} avis).` : "";
  const desc = court(`Réservez en ligne chez ${nom}${ville ? " à " + ville : ""}, 24 h/24.${avis}`, 160);
  const ph = (b.photos || [])[+b.principale || 0] || (b.photos || [])[0], img = absolue(ph && ph.url);
  const url = `https://loginail.fr/${slug}/`, vers = `/loginail-creer/pret.html?public&s=${slug}`;
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
${MARQUE}
<title>${esc(titre)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(nom)}">
<meta property="og:title" content="${esc(titre)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="fr_FR">
${img ? `<meta property="og:image" content="${esc(img)}">\n<meta name="twitter:image" content="${esc(img)}">\n` : ""}<meta name="twitter:card" content="${img ? "summary_large_image" : "summary"}">
<meta name="twitter:title" content="${esc(titre)}">
<meta name="twitter:description" content="${esc(desc)}">
<script>location.replace(${JSON.stringify(vers)} + location.hash);</script>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#F6F3EF;color:#1E1C1B;font:16px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;text-align:center;padding:16px}a{color:inherit}</style>
</head>
<body><p><a href="${vers}">${esc(nom)} · Réserver en ligne</a></p></body>
</html>
`;
}

const liste = await rpc("sites_en_ligne");
const enLigne = new Set();
let ecrites = 0, effacees = 0, sautees = [];
for (const { slug } of liste) {
  if (!/^[a-z0-9-]{3,40}$/.test(slug)) continue;
  const dos = path.join(RACINE, slug), fic = path.join(dos, "index.html");
  /* une adresse déjà prise par le site Loginail lui-même (dossier ou fichier) : on n'y touche jamais */
  if ((fs.existsSync(dos) && !(fs.existsSync(fic) && fs.readFileSync(fic, "utf8").includes(MARQUE))) || fs.existsSync(dos + ".html")) { sautees.push(slug); continue; }
  let b; try { b = await rpc("lire_site", { s: slug }); } catch (e) { console.log("lecture impossible", slug, e.message); enLigne.add(slug); continue; }
  if (!b || typeof b !== "object" || Array.isArray(b) || !b.nom) continue;
  enLigne.add(slug);
  const h = page(slug, b);
  if (!fs.existsSync(fic) || fs.readFileSync(fic, "utf8") !== h) { fs.mkdirSync(dos, { recursive: true }); fs.writeFileSync(fic, h); ecrites++; }
}
/* un site qui n'est plus en ligne : sa page s'en va (l'adresse retombe sur 404.html, comme avant) */
for (const d of fs.readdirSync(RACINE, { withFileTypes: true })) {
  if (!d.isDirectory() || enLigne.has(d.name)) continue;
  const fic = path.join(RACINE, d.name, "index.html");
  if (fs.existsSync(fic) && fs.readFileSync(fic, "utf8").includes(MARQUE) && fs.readdirSync(path.join(RACINE, d.name)).length === 1) { fs.rmSync(path.join(RACINE, d.name), { recursive: true }); effacees++; }
}
console.log(`${liste.length} site(s) en ligne · ${ecrites} page(s) écrite(s) · ${effacees} effacée(s)` + (sautees.length ? ` · adresses déjà prises : ${sautees.join(", ")}` : ""));
