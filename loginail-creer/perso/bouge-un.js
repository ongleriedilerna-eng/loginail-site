/* 25/11 (Marie, point 2, choisi) : « seul le carré que tu touches bouge » — la règle pour toutes, téléphone et ordinateur.
   En-têtes et fonds : tous les carrés sont figés (sur une belle image), sauf celui qu'on vient de toucher (au départ : celui qui est choisi).
   ?bouge=tous = l'ancienne façon (pour comparer). */
(function () {
  if (/[?&]bouge=tous/.test(location.search)) return;
  window.BOUGE_UN = true;
  const st = document.createElement("style");
  st.textContent = `#app#app#app #lFond .vg:not(.bouge),#app#app#app #lFond .vg:not(.bouge) *,#app#app#app #lFond .vg:not(.bouge) *::before,#app#app#app #lFond .vg:not(.bouge) *::after{animation-play-state:paused!important}`;
  document.head.appendChild(st);
  const marque = b => { const l = b.parentElement; l.querySelectorAll(":scope>.bouge").forEach(x => x !== b && x.classList.remove("bouge")); b.classList.add("bouge");
    if (b.classList.contains("ent")) document.querySelectorAll("#lEnt .ent .mi").forEach(m => m.classList.toggle("off", !m.parentElement.classList.contains("bouge"))); };
  document.addEventListener("pointerdown", e => { const b = e.target.closest && e.target.closest("#lEnt .ent, #lFond .vg"); if (b) marque(b); }, true);
  /* au départ : le carré choisi bouge */
  setInterval(() => { ["#lEnt", "#lFond"].forEach(s => { const l = document.querySelector(s); if (!l || l.querySelector(":scope>.bouge")) return; const on = l.querySelector(":scope>.on"); if (on) marque(on); }); }, 500);
})();
