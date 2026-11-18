/* 18/11 nuit · maquettes de la page « J'ai fini mon site » (versions A et B) — aides communes. Rien n'est envoyé : pas de vrai compte. */
window.FINI = (() => {
  let br = {}; try { br = JSON.parse(localStorage.getItem("loginail-brouillon") || "{}") || {}; } catch (e) {}
  const nom = br.nom || "Les Ongles de Léa", prenom = br.prenom || "Léa";
  const slug = nom.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 34) || "mon-salon";
  const aDuSite = !!(br && br.nom);
  /* son site, en vrai, dans un téléphone (l'éditeur caché) ; sans brouillon : l'exemple de Cerise */
  function telephone(boite) {
    boite.innerHTML = `<div class="fT-cadre"><iframe title="Votre site" tabindex="-1" src="${aDuSite ? "../loginail-creer/pret.html" : "../loginail-creer/pret.html?public&nouveau&exemple=dilerna&portrait=cerise&couleur=choco&vif=rosep&fond=Cerises%20qui%20tombent&police=ronde&charm=noeudcerise,framboise,cerisedisco,cerisecoeur,ceriseruban,cerises-roses,noeudgelee,boueeflamant,oursongelee,flamant&chpos=noeudcerise~70.7-28.5_framboise~80-10_cerisedisco~4-24_cerisecoeur~82-40_ceriseruban~3-58_cerises-roses~63.1-71.6_noeudgelee~40-5_boueeflamant~10.6-102.6_oursongelee~76.4-105.5_flamant~63.2-130.2"}"></iframe><div class="fT-encoche"></div></div>`;
    const f = boite.querySelector("iframe"), c = boite.querySelector(".fT-cadre");
    const echelle = () => { const k = c.clientWidth / 390; f.style.transform = `scale(${k})`; c.style.height = Math.round(844 * k) + "px"; };
    echelle(); new ResizeObserver(echelle).observe(c);   /* le téléphone suit sa taille (il rétrécit aux étapes suivantes) */
    f.addEventListener("load", () => { try { const d = f.contentDocument, s = d.createElement("style");
      s.textContent = ".pret,.langues,.indiceD,.act{display:none!important}html{scrollbar-width:none}::-webkit-scrollbar{display:none}"; d.head.appendChild(s);
      /* 18/11 (Marie : « qu'elle puisse le faire coulisser elle aussi ») : elle fait défiler son site au doigt ; on arrête le défilement tout seul,
         et les boutons du site ne mènent nulle part (on reste sur cette page) */
      ["pointerdown", "touchstart", "wheel"].forEach(t => d.addEventListener(t, () => { f._touche = true; }, { passive: true, capture: true }));
      d.addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); }, true); } catch (e) {} });
    return f;
  }
  /* un petit défilement automatique du site, pour montrer qu'il est vivant */
  function defile(f) { let t = 0; const go = () => { if (f._touche) return; try { const d = f.contentDocument, b = d.querySelector(".defile") || d.scrollingElement; if (!b) return;
      const max = Math.min(b.scrollHeight - b.clientHeight, 900); t = (t + 1) % 3; b.scrollTo({ top: [0, max * .45, max][t], behavior: "smooth" }); } catch (e) {} };
    setTimeout(() => { go(); setInterval(go, 3200); }, 2600); }
  const mailOk = v => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim());
  return { br, nom, prenom, slug, aDuSite, telephone, defile, mailOk };
})();
