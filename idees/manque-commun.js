/* 18/11 nuit · maquettes de la page « Il manque… » (versions A et B) — données et petites aides communes. Rien n'est enregistré. */
window.ICO = {
  nom: '<path d="M4 10l1.5-5h13L20 10M4 10v9.5h16V10M4 10c0 1.7 1.8 2.5 4 2.5S12 11.7 12 10c0 1.7 1.8 2.5 4 2.5s4-.8 4-2.5M10 19.5v-4h4v4"/>',
  prenom: '<circle cx="12" cy="8.5" r="4"/><path d="M4.5 20c.8-3.8 3.8-6 7.5-6s6.7 2.2 7.5 6"/>',
  insta: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r=".6" fill="currentColor"/>',
  adr: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
  tel: '<path d="M6.5 3.5h3l1.5 4-2 1.3a10.5 10.5 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2C10.5 19 5 13.5 4.5 5.7a2 2 0 0 1 2-2.2z"/>',
  hor: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  photos: '<rect x="3.5" y="5" width="17" height="14" rx="2.5"/><circle cx="9" cy="10" r="1.8"/><path d="M20.5 15.5l-4.5-4.5-8 8"/>',
  presta: '<path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3-8.7 8.7z"/><circle cx="8" cy="8" r="1.4"/>'
};
window.svg = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICO[k]}</svg>`;
/* l'ordre (D16) : ce qu'on écrit d'abord, Instagram obligatoire, les prix TOUJOURS en dernier */
window.MQ = [
  { k: "nom", t: "Le nom de votre salon", q: "Il s’affiche en grand en haut de votre site.", ph: "Ex. : Les Ongles de Léa", type: "texte" },
  { k: "prenom", t: "Votre prénom", q: "Pour signer votre site et votre espace.", ph: "Votre prénom", type: "texte" },
  { k: "insta", t: "Votre Instagram", q: "Vos clientes vous suivent depuis votre site.", ph: "votre.compte", type: "insta" },
  { k: "adr", t: "Votre adresse", q: "Pour le plan et l’itinéraire de vos clientes.", ph: "N°, rue, code postal, ville", type: "texte" },
  { k: "tel", t: "Votre téléphone", q: "Pour que vos clientes puissent vous appeler.", ph: "06 00 00 00 00", type: "tel" },
  { k: "hor", t: "Vos horaires", q: "Touchez les jours où vous travaillez.", type: "jours" },
  { k: "photos", t: "Vos photos", q: "Vos plus belles créations : la 1re chose que vos clientes voient.", type: "photos" },
  { k: "presta", t: "Vos prestations et vos prix", q: "Touchez ce que vous proposez, puis écrivez le prix.", type: "presta" }
];
window.JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
window.SUGG = ["Pose gel", "Remplissage", "Semi-permanent", "Manucure", "Beauté des pieds", "Nail art", "Dépose"];
window.PHOTOS = [1, 2, 3, 4].map(i => `../loginail-site/univers-photos/cerise/${i}.webp`);
window.NOMBRES = ["", "une", "deux", "trois", "quatre", "cinq", "six", "sept", "huit"];
window.titreReste = n => n === 0 ? "Tout est <em>prêt</em>." : n === 1 ? "Plus qu’une <em>petite chose</em>." : `Plus que ${NOMBRES[n]} <em>petites choses</em>.`;
window.LOGO = `<svg viewBox="0 -2 330 72" aria-label="Loginail"><g transform="scale(.5)"><rect x="0" y="5" width="225" height="120" rx="60" fill="currentColor"/><path d="M172 21H215C254 21 282 42 282 65C282 88 254 109 215 109H172A44 44 0 0 1 172 21Z" fill="currentColor"/><path d="M172 28H213C247 28 274 47 274 65C274 83 247 102 213 102H172A37 37 0 0 1 172 28Z" fill="var(--fond,#F6F3EF)"/></g><text x="160" y="42" font-family="Jost,sans-serif" font-weight="300" font-size="22" letter-spacing="9" fill="currentColor">LOGINAIL</text></svg>`;
/* l'éclat d'étoiles quand tout est prêt */
window.eclat = (el, nb = 18) => { if (matchMedia("(prefers-reduced-motion:reduce)").matches) return; const r = el.getBoundingClientRect();
  for (let i = 0; i < nb; i++) { const e = document.createElement("i"); e.textContent = "✦"; e.className = "etoileV"; e.style.left = r.left + r.width / 2 + "px"; e.style.top = r.top + r.height / 2 + "px"; e.style.fontSize = 10 + Math.random() * 10 + "px"; document.body.appendChild(e);
    const a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 90;
    e.animate([{ transform: "translate(-50%,-50%) scale(.3)", opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * d}px),calc(-50% + ${Math.sin(a) * d}px)) scale(1.1)`, opacity: 0 }], { duration: 800 + Math.random() * 400, easing: "cubic-bezier(.1,.8,.3,1)" }).onfinish = () => e.remove(); } };
