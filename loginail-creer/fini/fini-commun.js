/* 18/11 nuit · maquettes de la page « J'ai fini mon site » (versions A et B) — aides communes. Rien n'est envoyé : pas de vrai compte. */
window.FINI = (() => {
  let br = {}; try { br = JSON.parse(localStorage.getItem("loginail-brouillon") || "{}") || {}; } catch (e) {}
  const nom = br.nom || "Les Ongles de Léa", prenom = br.prenom || "Léa";
  const slug = nom.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 34) || "mon-salon";
  const aDuSite = !!(br && br.nom);
  /* son site, en vrai, dans un téléphone (l'éditeur caché) ; sans brouillon : l'exemple de Cerise */
  function telephone(boite) {
    boite.innerHTML = `<div class="fT-cadre"><iframe title="Votre site" tabindex="-1" src="${aDuSite ? "../loginail-creer/pret.html" : "../loginail-creer/pret.html?demo"}"></iframe><div class="fT-encoche"></div></div>`;
    const f = boite.querySelector("iframe"), c = boite.querySelector(".fT-cadre");
    const echelle = () => { const k = c.clientWidth / 390; f.style.transform = `scale(${k})`; c.style.height = Math.round(844 * k) + "px"; };
    echelle(); new ResizeObserver(echelle).observe(c);   /* le téléphone suit sa taille (il rétrécit aux étapes suivantes) */
    f.addEventListener("load", () => { try { const d = f.contentDocument, s = d.createElement("style");
      s.textContent = ".pret,.langues,.indiceD,.act{display:none!important}html{scrollbar-width:none}::-webkit-scrollbar{display:none}"; d.head.appendChild(s); } catch (e) {} });
    return f;
  }
  /* un petit défilement automatique du site, pour montrer qu'il est vivant */
  function defile(f) { let t = 0; const go = () => { try { const d = f.contentDocument, b = d.querySelector(".defile") || d.scrollingElement; if (!b) return;
      const max = Math.min(b.scrollHeight - b.clientHeight, 900); t = (t + 1) % 3; b.scrollTo({ top: [0, max * .45, max][t], behavior: "smooth" }); } catch (e) {} };
    setTimeout(() => { go(); setInterval(go, 3200); }, 2600); }
  const mailOk = v => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim());
  return { br, nom, prenom, slug, aDuSite, telephone, defile, mailOk };
})();
