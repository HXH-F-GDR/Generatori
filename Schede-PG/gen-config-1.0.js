// ============================================================
// GEN-CONFIG 1.0
// Configurazione di status, popolarità, abitazione, abilità di specie,
// bonus staff e motore che calcola bonus e valori effettivi del PG.
// Va caricato PRIMA di gen-logica. Per cambiare un testo di bonus o
// una soglia si tocca solo questo file.
// ============================================================

// ------------------------------------------------------------
// STATUS
// ------------------------------------------------------------
var STATUS = [
 'Nessuno',
 'Hunter',
 'Presidente dell\'Associazione Hunter',
 'Zodiaco',
 'Ombra',
 'Ragno',
 'Assassino/a',
 'Criminale',
 'Lottatore/trice Celeste'
];

var GRADI_HUNTER = ['Hunter', 'Single Hunter', 'Double Hunter', 'Triple Hunter'];

// Punti Stella necessari per passare al grado successivo.
// Triple Hunter è l'ultimo grado: il conto resta fermo a 200/200.
var SOGLIE_STELLE = {
 'Hunter': 100,
 'Single Hunter': 150,
 'Double Hunter': 200,
 'Triple Hunter': 200
};

var SPECIALIZZAZIONI_HUNTER = [
 'Blacklist Hunter', 'Crime Hunter', 'Terrorist Hunter', 'Hunter dei Bracconieri',
 'Treasure Hunter', 'Stone Hunter', 'Ruins Hunter', 'Paleograph Hunter',
 'Beast Hunter', 'UMA Hunter', 'Hunter delle Bestie Fantasma', 'Botanical Hunter',
 'Sea Hunter', 'Hunter delle Malattie Incurabili', 'Virus Hunter', 'Poison Hunter',
 'Music Hunter', 'Gourmet Hunter', 'Hunter della Bellezza', 'Jackpot Hunter',
 'Hacker Hunter', 'Problem Hunter', 'Card Hunter', 'Head Hunter',
 'Hunter da Contratto', 'Lost Hunter', 'Hunter Supplementare', 'Journalist Hunter'
];

var BONUS_SPECIALIZZAZIONE_HUNTER = [
 'Informazioni aggiuntive nelle Quest, relative al proprio campo, consultando il Sito degli Hunter',
 'Vantaggi nei lanci dei dadi nelle prove affini con la propria categoria',
 '+25% delle ricompense totali nelle Quest dove si sfrutta o approfondisce il proprio campo di ricerca'
];

var LETTERE_GRECHE = [
 'Alfa', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
 'Iota', 'Kappa', 'Lambda', 'Mi', 'Ni', 'Xi', 'Omicron', 'Pi',
 'Rho', 'Sigma', 'Tau', 'Ypsilon', 'Phi', 'Chi', 'Psi', 'Omega'
];

// Per ogni status:
// - bonus: righe del "Bonus <status>:" in scheda
// - rep / pop: punti sommati a Reputazione / Popolarità effettive
// - campi: voci extra sbloccate in Dati Personali
//   tipo 'select'  → menu con opzioni
//   tipo 'testo'   → testo libero
//   tipo 'ruolonum'→ menu + numero (es. "Zampa n° 4")
//   tipo 'stelle'  → Punti Stella x/soglia, soglia dal grado
//   soloDaSingle   → il campo compare solo da Single Hunter in su
var STATUS_CONFIG = {
 'Hunter': {
  rep: 0, pop: 0,
  bonus: [
   '5.000 Jenny extra al completamento delle Quest',
   '10% di sconto su tutti gli articoli dei Mercanti',
   '+1 al lancio di dado se si prova a Spiare una Role',
   'Accesso alla Sede dell\'Associazione Hunter'
  ],
  campi: [
   { id: 'hunter-grado',  label: 'Grado Hunter:',            tipo: 'select', opzioni: GRADI_HUNTER },
   { id: 'hunter-stelle', label: 'Punti Stella:',            tipo: 'stelle' },
   // vuota: prima opzione del menu, con valore vuoto. Finché resta
   // selezionata, il Bonus Specializzazione Hunter non scatta.
   { id: 'hunter-spec',   label: 'Specializzazione Hunter:', tipo: 'select', opzioni: SPECIALIZZAZIONI_HUNTER, soloDaSingle: true, vuota: 'Non ancora scelta' }
  ]
 },
 'Presidente dell\'Associazione Hunter': {
  rep: 3, pop: 1,
  bonus: [
   '+3 al proprio grado di Reputazione',
   '+1 al proprio grado di Popolarità',
   '25% di sconto su tutti gli articoli dei Mercanti',
   '+50% Punti Stella per ogni missione da Hunter completata (arrotondati per eccesso)'
  ],
  campi: [
   { id: 'presidente-ordine', label: 'Ordine di Successione:', tipo: 'testo' }
  ]
 },
 'Zodiaco': {
  rep: 2, pop: 1,
  bonus: [
   '+2 al proprio grado di Reputazione',
   '+1 al proprio grado di Popolarità',
   '20% di sconto su tutti gli articoli dei Mercanti',
   '+50% Punti Stella per ogni missione da Hunter completata (arrotondati per eccesso)'
  ],
  campi: [
   // SEGNI_CINESI è definito in gen-logica: la lista viene letta al
   // momento di costruire il form (vedi opzioniCampoStatus).
   { id: 'zodiaco-ruolo', label: 'Ruolo nello Zodiaco:', tipo: 'select', opzioni: 'SEGNI_CINESI' }
  ]
 },
 'Ombra': {
  rep: 0, pop: 0,
  bonus: [
   '+10% EXP per ogni Quest completata',
   '+25% Jenny per ogni Quest completata'
  ],
  campi: [
   { id: 'ombra-membro', label: 'Membro dell\'Ombra:', tipo: 'select', opzioni: ['Discendente dei membri originali', 'Convocato direttamente dall\'attuale leader'] },
   { id: 'ombra-ruolo',  label: 'Ruolo nell\'Ombra:',  tipo: 'select', opzioni: LETTERE_GRECHE }
  ]
 },
 'Ragno': {
  rep: 0, pop: 0,
  bonus: [
   '10% di possibilità di riuscire a rubare l\'oggetto che si desidera acquistare, ottenendolo quindi gratuitamente. La percentuale si applica singolarmente ad ogni oggetto (di rarità pari o inferiore a "Epico" e valore pari o inferiore a 50.000 Jenny) che si desidera rubare. Sommando le proprie Stats di Destrezza e Fortuna, per ogni 100 punti si ottiene un 5% aggiuntivo alla possibilità di compiere il furto',
   '+3 al lancio del dado su ogni uso di Intimidazione (SOLO se viene palesato di far parte del Ragno)',
   'Accesso alla sede nascosta'
  ],
  campi: [
   { id: 'ragno-ruolo', label: 'Ruolo nel Ragno:', tipo: 'ruolonum', opzioni: ['Testa', 'Zampa'] }
  ]
 },
 'Assassino/a': {
  rep: 2, pop: 0,
  bonus: [
   'Nessuna variazione sulla fedina penale per ogni lavoro da assassino portato a termine',
   '+2 al proprio grado di Reputazione',
   '+50% Jenny alla riscossione di una taglia',
   'Accesso a sede nascosta'
  ],
  campi: [
   { id: 'assassino-ruolo', label: 'Ruolo tra gli Assassini affiliati della Famiglia Zaoldyeck:', tipo: 'select', opzioni: ['Caposquadra', 'Membro'] }
  ]
 },
 'Criminale': {
  rep: 0, pop: 0,
  bonus: [
   '+25% Jenny per ogni lavoro inerente alla Mafia portato a termine',
   '10% di sconto dai Mercanti',
   '10% di sconto sugli oggetti ottenuti alle Aste'
  ],
  campi: [
   { id: 'criminale-ruolo', label: 'Ruolo nella Mafia:', tipo: 'select', opzioni: ['Capofamiglia', 'Membro'] }
  ]
 },
 'Lottatore/trice Celeste': {
  rep: 0, pop: 0,
  bonus: [
   '20% di sconto da un solo Mercante a scelta (Sponsor). Il Mercante scelto può essere cambiato solo durante i Censimenti',
   '+10.000 Jenny extra ad ogni Quest completata'
  ],
  campi: [
   { id: 'celeste-piano',   label: 'Piano alla Torre Celeste:', tipo: 'testo' },
   { id: 'celeste-sponsor', label: 'Sponsorizzato da:',        tipo: 'testo' }
  ]
 }
};

// ------------------------------------------------------------
// POPOLARITÀ (0-5) — un solo livello attivo alla volta
// ------------------------------------------------------------
var POPOLARITA_MIN = 0, POPOLARITA_MAX = 5;
var POPOLARITA_CONFIG = {
 1: { carisma: 5,  bonus: ['+5 Carisma'],  malus: ['-1 al Grado di Privacy'] },
 2: { carisma: 10, bonus: ['+10 Carisma'], malus: ['-2 al Grado di Privacy in ogni Role Libera', '-1 al Grado di Privacy in ogni Quest o Mini Quest'] },
 3: { carisma: 20, bonus: ['+20 Carisma'], malus: ['-2 al Grado di Privacy'] },
 4: { carisma: 25, bonus: ['+25 Carisma'], malus: ['-3 al Grado di Privacy in ogni Role Libera', '-2 al Grado di Privacy in ogni Quest o Mini Quest'] },
 5: { carisma: 30, bonus: ['+30 Carisma'], malus: ['-3 al Grado di Privacy'] }
};

// ------------------------------------------------------------
// REPUTAZIONE (-5/+5)
// ------------------------------------------------------------
var REPUTAZIONE_MIN = -5, REPUTAZIONE_MAX = 5;

// Reputazione di partenza per una scheda nuova.
// Bestie A/B/C (Ricercate con taglia E): -1. Ricercati di grado D: -2.
// Incensurati: 0.
function reputazioneIniziale(fedina, classTaglia) {
 if (fedina !== 'Ricercato') return 0;
 if (classTaglia === 'E') return -1;
 if (classTaglia === 'D') return -2;
 return 0;
}

// Reputazione come appare in scheda: +2, 0, -1
function formattaReputazione(v) {
 var n = parseInt(v, 10) || 0;
 var out = n > 0 ? '+' + n : String(n);
 return out;
}

// ------------------------------------------------------------
// ABITAZIONE — livello (1-5) e specializzazione
// ------------------------------------------------------------
var ABITAZIONE_LIVELLI = [1, 2, 3, 4, 5];
var ABITAZIONE_CONFIG = {
 1: { carisma: 15,  rep: 0, bonus: ['+15 Carisma Base', '+10% ai Materiali ottenuti in Quest e Miniquest (arrotondati per eccesso)', '+5% EXP ottenuta durante le Quest (arrotondata per difetto)'] },
 2: { carisma: 30,  rep: 0, bonus: ['+30 Carisma Base', '+15% ai Materiali ottenuti in Quest e Miniquest (arrotondati per eccesso)', '+8% EXP ottenuta durante le Quest (arrotondata per difetto)'] },
 3: { carisma: 60,  rep: 0, bonus: ['+60 Carisma Base', '+20% ai Materiali ottenuti in Quest e Miniquest (arrotondati per eccesso)', '+12% EXP ottenuta durante le Quest (arrotondata per difetto)'] },
 4: { carisma: 95,  rep: 2, bonus: ['+95 Carisma Base', '+25% ai Materiali ottenuti in Quest e Miniquest (arrotondati per eccesso)', '+18% EXP ottenuta durante le Quest (arrotondata per difetto)', '+2 Reputazione'] },
 5: { carisma: 150, rep: 3, bonus: ['+150 Carisma Base', '+35% ai Materiali ottenuti in Quest e Miniquest (arrotondati per eccesso)', '+25% EXP ottenuta durante le Quest (arrotondata per difetto)', '+3 Reputazione'] }
};

var ABITAZIONE_SPECIALIZZAZIONI = ['Dimora Combattente', 'Dimora Collezionista', 'Dimora Sociale'];
var ABITAZIONE_SPEC_CONFIG = {
 'Dimora Combattente':   { bonus: ['+10% Ricompense (arrotondate per difetto) ogni volta che effettua una role di Allenamento in casa'] },
 'Dimora Collezionista': { bonus: ['+10% Materiali extra ottenuti nelle Quest/Miniquest (cumulabile con il Bonus Livello dell\'Abitazione)'] },
 // Dimora Sociale: +20% del Carisma dato dal livello dell'abitazione.
 // Valori espliciti per livello, così non ci sono arrotondamenti a sorpresa.
 'Dimora Sociale':       { bonus: ['+20% Carisma Base dato dal Bonus Livello dell\'Abitazione'], carismaPerLivello: { 1: 3, 2: 6, 3: 12, 4: 19, 5: 30 } }
};

// ------------------------------------------------------------
// ABILITÀ DI SPECIE (Bestie Demoniache, dal livello 15)
// ------------------------------------------------------------
var LIVELLO_ABILITA_SPECIE = 15;
var ABILITA_SPECIE = {
 'Kiriko':               'Volo - Permette di volare (fuori dai Combattimenti) per un tempo non superiore ai 15 minuti.',
 'Scimmia Antropomorfa': 'Ira - Permette di potenziare tre Fasi Offensive (consecutive) del 10% durante un Combattimento. Inoltre se l\'alleato è un\'altra Scimmia Antropomorfa (PG) questo potenziamento sale al 15%.',
 'Guardiano':            'Guida - Permette di evocare un essere spirituale ("Guida") e trasformare (anche in Combattimento) il proprio Famiglio Animale: quello sarà in grado di intercettare (ed annullare) un colpo avversario diretto ad un alleato umano (una volta massimo per Combattimento).',
 'Kitsune':              'Canto - Permette di immobilizzare un avversario umano facendogli saltare una Fase Offensiva (una volta massimo per Combattimento).',
 'Dai Tengu':            'Volo - Permette di volare (fuori dai Combattimenti) per un tempo non superiore ai 15 minuti.',
 'Karasu Tengu':         'Volo - Permette di volare (fuori dai Combattimenti) per un tempo non superiore ai 15 minuti.',
 'Were-pire':            'Sanguisuga - Permette di succhiare o bere sangue dal nemico durante una Fase Offensiva (una volta per Combattimento): questo si traduce con un malus alla Vita Totale del 10% (nemico) e un Bonus alla Vita Totale dei Were-pires del 10%.',
 'Formichimera Umana':   'Genesi - Permette di fagocitare un avversario umano sconfitto, così da acquisirne i ricordi.'
};

// ------------------------------------------------------------
// BONUS ASSEGNABILI DALLO STAFF
// ------------------------------------------------------------
var BONUS_STAFF = ['Scorza dura', 'Imperturbabile', 'Sesto senso', 'Alcatraz'];
var BONUS_STAFF_CONFIG = {
 'Scorza dura':    ['+50% Punti Tenacia in una sola Fase per Combattimento'],
 'Imperturbabile': ['+1 a ogni lancio del dado su Intimidazione'],
 'Sesto senso':    ['Una sola volta per Quest, Istinto base +50'],
 'Alcatraz':       ['+50% Punti Tenacia in una sola Fase per Combattimento', '+1 a ogni lancio del dado su Intimidazione', 'Una sola volta per Quest, Istinto base +50']
};

// ============================================================
// MOTORE BONUS
// ============================================================
function cfgClamp(v, min, max) {
 if (v < min) return min;
 if (v > max) return max;
 return v;
}

function cfgHaStatus(lista, nome) {
 if (!lista) return false;
 for (var i = 0; i < lista.length; i++) if (lista[i] === nome) return true;
 return false;
}

// Calcola bonus e valori effettivi. Le "basi" sono i valori senza
// bonus (quelli che lo staff assegna); gli effettivi sono quelli che
// finiscono in scheda.
//
// p = {
//  status: ['Hunter', ...],
//  gradoHunter: 'Single Hunter', specHunter: 'Beast Hunter',
//  popBase: 0-5, repBase: -5/+5,
//  carismaBase: numero, carismaOver: true/false,
//  abitazioneLv: 0-5 (0 o vuoto = nessuna abitazione), abitazioneSpec: '...',
//  bonusStaff: ['Scorza dura', ...],
//  razza, specie, livello
// }
function calcolaBonusPG(p) {
 var voci = [];
 var status = p.status || [];
 var repBonus = 0, popBonus = 0, carismaBonus = 0;

 // 1) Status, nell'ordine in cui sono assegnati
 for (var i = 0; i < status.length; i++) {
  var cfg = STATUS_CONFIG[status[i]];
  if (!cfg) continue;
  voci.push({ tipo: 'bonus', label: 'Bonus ' + status[i] + ':', righe: cfg.bonus });
  repBonus += cfg.rep || 0;
  popBonus += cfg.pop || 0;
  // Specializzazione Hunter subito dopo il bonus Hunter
  if (status[i] === 'Hunter' && p.gradoHunter && p.gradoHunter !== 'Hunter' && p.specHunter) {
   voci.push({ tipo: 'bonus', label: 'Bonus Specializzazione Hunter:', righe: BONUS_SPECIALIZZAZIONE_HUNTER });
  }
 }

 // 2) Popolarità effettiva (base + bonus status), poi la sua fascia
 var popBase = parseInt(p.popBase, 10); if (isNaN(popBase)) popBase = 0;
 var popolarita = cfgClamp(popBase + popBonus, POPOLARITA_MIN, POPOLARITA_MAX);
 var popCfg = POPOLARITA_CONFIG[popolarita];
 if (popCfg) {
  voci.push({ tipo: 'bonus', label: 'Bonus Popolarità ' + popolarita + ':', righe: popCfg.bonus });
  voci.push({ tipo: 'malus', label: 'Malus Popolarità ' + popolarita + ':', righe: popCfg.malus });
  carismaBonus += popCfg.carisma;
 }

 // 3) Abitazione: livello e specializzazione
 var abLv = parseInt(p.abitazioneLv, 10); if (isNaN(abLv)) abLv = 0;
 var abCfg = ABITAZIONE_CONFIG[abLv];
 if (abCfg) {
  voci.push({ tipo: 'bonus', label: 'Bonus Abitazione di Livello ' + abLv + ':', righe: abCfg.bonus });
  carismaBonus += abCfg.carisma;
  repBonus += abCfg.rep || 0;
  var specCfg = ABITAZIONE_SPEC_CONFIG[p.abitazioneSpec];
  if (specCfg) {
   voci.push({ tipo: 'bonus', label: 'Bonus ' + p.abitazioneSpec + ':', righe: specCfg.bonus });
   if (specCfg.carismaPerLivello) carismaBonus += specCfg.carismaPerLivello[abLv] || 0;
  }
 }

 // 4) Bonus staff
 var bs = p.bonusStaff || [];
 for (var b = 0; b < bs.length; b++) {
  if (BONUS_STAFF_CONFIG[bs[b]]) voci.push({ tipo: 'bonus', label: 'Bonus ' + bs[b] + ':', righe: BONUS_STAFF_CONFIG[bs[b]] });
 }

 // 5) Reputazione effettiva
 var repBase = parseInt(p.repBase, 10); if (isNaN(repBase)) repBase = 0;
 var reputazione = cfgClamp(repBase + repBonus, REPUTAZIONE_MIN, REPUTAZIONE_MAX);

 // 6) Carisma effettivo: mai oltre 250 (400 se overlivellato)
 var carBase = parseInt(p.carismaBase, 10); if (isNaN(carBase)) carBase = 5;
 var tetto = p.carismaOver ? 400 : 250;
 var carisma = Math.min(tetto, carBase + carismaBonus);

 // 7) Abilità di specie
 var abilita = null;
 var lv = parseInt(p.livello, 10) || 0;
 if (p.razza === 'Bestia Demoniaca' && lv >= LIVELLO_ABILITA_SPECIE && ABILITA_SPECIE[p.specie]) {
  abilita = ABILITA_SPECIE[p.specie];
 }

 return {
  voci: voci,
  popolarita: popolarita, popBonus: popBonus,
  reputazione: reputazione, repBonus: repBonus,
  carisma: carisma, carismaBonus: carismaBonus, carismaTetto: tetto,
  carismaTagliato: (carBase + carismaBonus) > tetto,
  abilitaSpecie: abilita
 };
}

// Campi extra da mostrare per gli status assegnati (la Specializzazione
// Hunter solo da Single Hunter in su).
function campiStatusAttivi(status, gradoHunter) {
 var out = [];
 for (var i = 0; i < (status || []).length; i++) {
  var cfg = STATUS_CONFIG[status[i]];
  if (!cfg) continue;
  for (var c = 0; c < cfg.campi.length; c++) {
   var campo = cfg.campi[c];
   if (campo.soloDaSingle && (!gradoHunter || gradoHunter === 'Hunter')) continue;
   out.push(campo);
  }
 }
 return out;
}

// Opzioni di un campo select: risolve i riferimenti per nome (es.
// 'SEGNI_CINESI', definito in gen-logica).
function opzioniCampoStatus(campo) {
 if (typeof campo.opzioni === 'string') return window[campo.opzioni] || [];
 return campo.opzioni || [];
}

// Punti Stella: aggiunge punti e promuove automaticamente, riportando
// il resto. Al Triple Hunter i punti si fermano a 200/200.
function accreditaPuntiStella(grado, punti, delta) {
 var g = grado || 'Hunter';
 var pt = (parseInt(punti, 10) || 0) + (parseInt(delta, 10) || 0);
 if (pt < 0) pt = 0;
 var promozioni = 0;
 var guardia = 0;
 while (g !== 'Triple Hunter' && pt >= SOGLIE_STELLE[g] && guardia < 10) {
  pt -= SOGLIE_STELLE[g];
  g = GRADI_HUNTER[GRADI_HUNTER.indexOf(g) + 1];
  promozioni++;
  guardia++;
 }
 if (g === 'Triple Hunter' && pt > SOGLIE_STELLE[g]) pt = SOGLIE_STELLE[g];
 return { grado: g, punti: pt, soglia: SOGLIE_STELLE[g], promozioni: promozioni };
}
