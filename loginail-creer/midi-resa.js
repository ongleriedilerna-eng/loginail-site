/* ===== 22/11 (Marie : « Oui, la A », puis « Oui, code-la », D98) : le midi, « Contactez le salon » =====
   Si le salon ferme le midi (horaires[jour].pd / .pf), une bande prend la place du trou dans les heures.
   Elle n'ouvre que les contacts déjà affichés sur son site, et rien ne se réserve : c'est la pro qui place la cliente.
   Maquette : site/idees/midi-2211/. Appelé par resa-simu.js (pose, refus). */
window.LOGI_MIDI = (() => {
  const st = document.createElement("style");
  st.textContent = `.rs .h button.md-bande,.rs button.md-bande{grid-column:1/-1;display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;min-height:52px;margin:2px 0;padding:8px 16px;box-sizing:border-box;border:1px dashed rgba(30,28,27,.28);border-radius:18px;background:rgba(255,255,255,.6);color:#1E1C1B;text-align:left;font:400 13.5px/1.3 Jost;cursor:pointer}
.rs .complet+button.md-bande,.rs .rien+button.md-bande{margin-top:10px}
.rs .md-bande small{display:block;margin-top:2px;font:400 12.5px/1.3 Jost;color:#5d554e;text-decoration:underline;text-underline-offset:3px}
.rs .md-bande i{flex:none;font:normal 300 22px Jost;color:var(--rs)}
.rs .md-info{margin:0 4px 14px;text-align:center;font:400 14px/1.45 Jost;color:#5d554e}
.rs .md-act{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.rs .md-act a{display:grid;place-items:center;min-height:48px;padding:0 8px;box-sizing:border-box;border:1px solid rgba(30,28,27,.2);border-radius:999px;background:#fff;color:#1E1C1B;font:400 14px Jost;text-decoration:none}
.rs .md-act a.md-seul{grid-column:1/-1}
.rs .md-act a.md-env{grid-column:1/-1;min-height:54px;border:0;background:var(--rs);color:#F6F3EF;font:500 13px Jost;letter-spacing:.18em}
.rs .md-note{margin:14px 4px 0;text-align:center;font:400 12.5px/1.45 Jost;color:#6B625C}
.rs .md-non{margin:0 0 8px;padding:12px 14px;border-radius:18px;background:#F6E4E2;color:#7E2F2F;text-align:center;font:400 13.5px/1.4 Jost}
.rs .md-non b{display:block;margin-bottom:2px;font:500 15px/1.3 Jost}`;
  document.head.appendChild(st);

  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const minutes = s => { const m = /^(\d{1,2}):(\d\d)/.exec(typeof s === "string" ? s : ""); return m ? +m[1] * 60 + +m[2] : null; };
  const heure = n => `${Math.floor(n / 60)} h${n % 60 ? " " + String(n % 60).padStart(2, "0") : ""}`;
  const serre = n => `${Math.floor(n / 60)}h${String(n % 60).padStart(2, "0")}`;

  /* la pause de ce jour, si elle tombe dans ses heures d'ouverture */
  function pause(h) {
    if (!h) return null;
    const a = minutes(h.pd), b = minutes(h.pf), d = minutes(h.d), f = minutes(h.f);
    return a !== null && b !== null && d !== null && f !== null && a < b && a < f && b > d ? { a, b } : null;
  }

  /* les contacts de son site. Un fixe ne reçoit ni SMS ni WhatsApp : on l'appelle. */
  function contacts(BR) {
    let t = String(BR.telephone || "").replace(/\(0\)/g, "").replace(/[^\d+]/g, "").replace(/^00/, "+");
    if (/^0[1-9]\d{8}$/.test(t)) t = "+33" + t.slice(1);
    else if (/^\+330[1-9]\d{8}$/.test(t)) t = "+33" + t.slice(4);
    else if (/^33[1-9]\d{8}$/.test(t)) t = "+" + t;
    if (!/^\+[1-9]\d{7,14}$/.test(t)) t = "";
    const ig = String(BR.insta || "").trim().replace(/^(https?:\/\/)?(www\.)?instagram\.com\//i, "").replace(/^@+/, "").replace(/[/?#].*$/, "");
    return { tel: t, mobile: !!t && (!t.startsWith("+33") || /^\+33[67]/.test(t)), insta: /^[\w.]{1,30}$/.test(ig) && ig !== "votre.instagram" ? ig : "" };
  }

  function boutons(C, message, mort) {
    const L = [];
    if (C.mobile) L.push(["Envoyer un message", `sms:${C.tel}?&body=${encodeURIComponent(message)}`]);
    if (C.tel) L.push(["Appeler", `tel:${C.tel}`]);
    if (C.mobile) L.push(["WhatsApp", `https://wa.me/${C.tel.slice(1)}?text=${encodeURIComponent(message)}`, 1]);
    if (C.insta) L.push(["Instagram", `https://ig.me/m/${C.insta}`, 1]);
    return L.map(([mot, lien, dehors], i) => {
      const cl = i === 0 ? "md-env" : i === L.length - 1 && i % 2 ? "md-seul" : "";
      return `<a class="${cl}"${mort ? "" : ` href="${esc(lien)}"${dehors ? ' target="_blank" rel="noopener"' : ""}`}>${i === 0 ? mot.toUpperCase() : mot}</a>`;
    }).join("");
  }

  function ouvreContact(rf, o, P, C) {
    const jour = o.jour.date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    const message = `Bonjour, auriez-vous une place ${jour} entre ${heure(P.a)} et ${heure(P.b)} pour « ${o.R.nom} » ? Merci !`;
    const carte = rf.querySelector(".rdv");
    if (carte && !carte.querySelector(".md-jour")) carte.insertAdjacentHTML("beforeend", `<span class="rdv-q md-jour">${esc(jour.charAt(0).toUpperCase() + jour.slice(1))}</span>`);
    /* data-rx et data-att-ret : fermer et revenir aux heures, déjà gérés par resa-simu.js */
    rf.innerHTML = `<div class="poi"></div><button class="x" data-rx aria-label="Fermer">×</button><button class="ret" data-att-ret>‹ Retour</button>${carte ? carte.outerHTML : ""}
      <div class="kick">ENTRE ${esc(heure(P.a).toUpperCase())} ET ${esc(heure(P.b).toUpperCase())}</div><h2>Demandez au salon</h2>
      <p class="md-info">Ce créneau ne se réserve pas en ligne.<br>${C.mobile ? "Votre message est déjà écrit." : "Dites au salon le jour et la prestation."}</p>
      <div class="md-act">${boutons(C, message, !!o.BR.exempleFictif)}</div>
      <p class="md-note">${o.BR.exempleFictif ? "Ceci est un exemple : aucun message ne part." : "Rien n’est réservé tant que le salon ne vous a pas répondu."}</p>`;
    rf.scrollTop = 0;
  }

  /* après chaque dessin de « Le jour et l'heure ». ici = elle vient pour une place libérée : on la laisse dessus */
  function pose(rf, o) {
    if (o.ici) return;
    const P = pause(o.jour && o.jour.h); if (!P) return;
    const n = new Date();
    if (o.jour.date.toDateString() === n.toDateString() && n.getHours() * 60 + n.getMinutes() + 60 >= P.b) return;   /* la pause d'aujourd'hui est finie */
    const C = contacts(o.BR); if (!C.tel && !C.insta) return;
    const b = document.createElement("button"); b.type = "button"; b.className = "md-bande";
    b.innerHTML = `<span>Besoin d’un créneau entre ${heure(P.a).replace(/ /g, "&nbsp;")} et ${heure(P.b).replace(/ /g, "&nbsp;")}&nbsp;?<small>Contactez le salon</small></span><i aria-hidden="true">›</i>`;
    b.addEventListener("click", e => { e.stopPropagation(); ouvreContact(rf, o, P, C); });
    const g = rf.querySelector(".h");
    if (g) { g.insertBefore(b, [...g.querySelectorAll("button[data-t]")].find(x => +x.dataset.t >= P.b) || null); return; }
    const vide = rf.querySelector(".complet,.rien"); if (vide) vide.after(b);
  }

  /* le serveur a refusé (pause mise pendant que la page était ouverte) : rien n'est enregistré, on l'explique */
  function refus(rf, o) {
    const P = pause(o.jour && o.jour.h), h2 = rf.querySelector("h2"); if (!h2) return;
    const titre = !o.aJour || !P ? "Ce créneau n’est plus ouvert en ligne."
      : o.heure >= P.a && o.heure < P.b ? `Le salon fait une pause à ${serre(o.heure)}.` : `Le salon fait une pause de ${heure(P.a)} à ${heure(P.b)}.`;
    h2.insertAdjacentHTML("afterend", `<div class="md-non" role="alert"><b>${esc(titre)}</b>Rien n’a été réservé. ${o.aJour ? "Choisissez une autre heure." : "Rechargez la page pour voir les heures à jour."}</div>`);
    rf.scrollTop = 0;
  }

  return { pose, refus };
})();
