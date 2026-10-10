// ============================================================ 
// COSTANTI DI CONFIGURAZIONE 
// ============================================================ 
var LIVELLO_INIZIALE = 0; 
var EXP_INIZIALE = 0; 
var EXP_MASSIMA = 100; 
var JENNY_INIZIALI = 10000; 
var HC_INIZIALI = 0; 
var NEN_INIZIALE = 0; 
var TENACIA_INIZIALE = 10; 
 
var SBLOCCO_COMPETENZE = [10, 20, 30, 40, 50]; 
 
var STAT_BASE = { 
 forza: 5, resistenza: 5, velocita: 5, riflessi: 5, destrezza: 5, 
 mira: 5, intelligenza: 5, carisma: 5, istinto: 5, fortuna: 5, 
 vita: 300, aura: 500 
}; 
 
var BONUS_LUOGO = { 
  'Narevka':            { destrezza: 5, intelligenza: 5, riflessi: 5 },
 'Solmara':     { forza: 5, intelligenza: 5, carisma: 5 },
 'Yorbian':                 { mira: 5, intelligenza: 5, carisma: 5 },
 'Azia': { intelligenza: 5, istinto: 5, destrezza: 5 },
 'Keth\'ra':                     { istinto: 5, riflessi: 5, carisma: 5 },
 'Vandros':                 { forza: 5, resistenza: 5, fortuna: 5 },
 'Isole di Balsa': { velocita: 5, resistenza: 5, riflessi: 5 },
 'Ryuseigai':                     { forza: 5, resistenza: 5, destrezza: 5 }
}; 
 
// Luoghi esclusivi Bestie Demoniache (nessun bonus stat) 
var LUOGHI_BESTIA = { 
 'Kiriko':              ['Insediamento Melioras'], 
 'Scimmia Antropomorfa':['Villaggio di Trakey'], 
 'Guardiano':           ['Villaggio di Blackbird'], 
 'Kitsune':             ['Villaggio delle Nuvole', 'Villaggio dei Fiori'], 
 'Dai Tengu':           ['Monte Hiei', 'Monte Kurama'], 
 'Karasu Tengu':        ['Monte Hiei', 'Monte Kurama'], 
 'Were-pire':           ['Città Eterna'], 
 'Formichimera Umana':  Object.keys(BONUS_LUOGO) // tutti i luoghi umani, senza bonus 
}; 
 
// Dati per ogni specie di Bestia Demoniaca 
var DATI_SPECIE = { 
 'Kiriko':              { rank: 'E', conservazione: 'Vulnerabile (VU)',                    fedina: 'Incensurato' }, 
 'Scimmia Antropomorfa':{ rank: 'A', conservazione: 'Rischio Minimo (LC)',                 fedina: 'Ricercato' }, 
 'Guardiano':           { rank: 'C', conservazione: 'Critico (CR)',                        fedina: 'Ricercato' }, 
 'Kitsune':             { rank: 'C', conservazione: 'Rischio Minimo (LC)',                 fedina: 'Ricercato' }, 
 'Dai Tengu':           { rank: 'D', conservazione: 'Vulnerabile (VU)',                    fedina: 'Incensurato' }, 
 'Karasu Tengu':        { rank: 'D', conservazione: 'Vulnerabile (VU)',                    fedina: 'Incensurato' }, 
 'Were-pire':           { rank: 'D', conservazione: 'Rischio Minimo (LC)',                 fedina: 'Incensurato' }, 
 'Formichimera Umana':  { rank: 'B', conservazione: 'Probabilmente Estinto in Natura (PEW)', fedina: 'Ricercato' } 
}; 
 
var SPECIE_BESTIA = Object.keys(DATI_SPECIE); 
 
// Valore taglia minimo per classificazione 
var VALORE_TAGLIA_BASE = { 
 'E': 1000, 'D': 50000, 'C': 100000, 'B': 250000, 
 'A': 750000, 'S': 1500000, 'SS': 3000000, 'SSS': 5000000 
}; 
var CLASSIFICAZIONI_TAGLIA = ['E','D','C','B','A','S','SS','SSS']; 
 
var BONUS_CLASSE = { 
 'Hacker': { intelligenza: 10 } 
}; 
 
var TIPI_HATSU = [ 
 'Non ancora sbloccato',
 'Irrobustimento (&#24375;&#21270;)', 
 'Emissione (&#25918;&#20986;)', 
 'Trasformazione (&#22793;&#21270;)', 
 'Manipolazione (&#25805;&#20316;)', 
 'Concretizzazione (&#20855;&#29616;&#21270;)', 
 'Specializzazione (&#29305;&#36074;)' 
]; 
 
 
// Classi attive (0 = disponibile) — usato per nuove schede 
var CLASSI = Object.keys(CLASSI_CONFIG).filter(function(c){ return CLASSI_CONFIG[c] === 0; }); 
// Tutte le classi — usato in modifica per non perdere classi disabilitate 
var CLASSI_TUTTE = Object.keys(CLASSI_CONFIG); 
 
var LUOGHI_UMANI = Object.keys(BONUS_LUOGO); 
// Tutti i luoghi visibili nel menù (umani + bestia, deduplicati) 
var LUOGHI_TUTTI = (function(){ 
 var tutti = LUOGHI_UMANI.slice(); 
 var visti = {}; 
 for (var i = 0; i < tutti.length; i++) visti[tutti[i]] = true; 
 for (var sp in LUOGHI_BESTIA) { 
  var ll = LUOGHI_BESTIA[sp]; 
  for (var j = 0; j < ll.length; j++) { 
   if (!visti[ll[j]]) { tutti.push(ll[j]); visti[ll[j]] = true; } 
  } 
 } 
 return tutti; 
})(); 
 
var STATUS = ['Nessuno', 'Criminale', 'Hunter', 'Lottatore/trice Celeste', 'Assassino/a', 'Zampa', 'Discendente dell\'Ombra', 'Membro dell\'Ombra']; 
 
var SEGNI_ZODIACALI = [ 
 'Ariete', 'Toro', 'Gemelli', 'Cancro', 'Leone', 'Vergine', 
 'Bilancia', 'Scorpione', 'Sagittario', 'Capricorno', 'Acquario', 'Pesci' 
]; 
 
var SEGNI_CINESI = [ 
 'Topo', 'Bue', 'Tigre', 'Coniglio', 'Drago', 'Serpente', 
 'Cavallo', 'Capra', 'Scimmia', 'Gallo', 'Cane', 'Maiale' 
]; 
 
var ALLINEAMENTI = [ 
 'Legale Buono', 'Neutrale Buono', 'Caotico Buono', 
 'Legale Neutrale', 'Neutrale Puro', 'Caotico Neutrale', 
 'Legale Malvagio', 'Neutrale Malvagio', 'Caotico Malvagio' 
]; 
 
 
// ============================================================ 
// STATO GLOBALE 
// ============================================================ 
var stato = { 
 modalita: null, 
 palette: null, 
 schedaOriginale: null, 
 pgId: null, 
 stafferManuale: null, 
 progressione: null 
}; 

// ============================================================ 
// AUTOSAVE BOZZA — persistenza dei campi durante la compilazione 
// Salva in localStorage TUTTI i campi compilabili del form (non solo 
// quelli "campo-": anche statistiche, taglia, status multipli, 
// competenze, potere Nen, baule...) e li ripristina al rientro. 
// Salva anche quante righe dinamiche (status, oggetti baule, tecniche 
// nen) l'utente ha aggiunto, così al ripristino vengono ricreate 
// prima di reinserire i valori. 
// Le immagini (crop) restano ESCLUSE: pesano troppo per localStorage. 
// 
// Ogni modalità ha la SUA chiave: "nuova" e "modifica" non si 
// cancellano a vicenda. La modalità "accrediti" NON viene mai 
// salvata (ritorna null): un accredito è un'operazione one-shot 
// dello staff e non deve ricomparire aprendo il generatore. 
// ============================================================ 
function bozzaKey(modalita) { 
 var m = modalita || stato.modalita; 
 if (m === 'nuova')    return 'af_bozza_scheda_nuova'; 
 if (m === 'modifica') return 'af_bozza_scheda_modifica'; 
 return null; // accrediti (o modalità sconosciuta): nessuna persistenza 
} 
var _bozzaTimer = null; 

// Contenitori con righe aggiunte dinamicamente dall'utente. Per 
// ognuno: il contenitore, la funzione che aggiunge una riga e con 
// quale argomento chiamarla. Al ripristino ricreiamo le righe 
// mancanti chiamando "fn" tante volte quante ne servono. 
var BOZZA_DINAMICI = [ 
 { cont: 'lista-status',     fn: 'aggiungiStatus',  arg: null,        base: 1 }, 
 { cont: 'lista-tecniche',   fn: 'aggiungiTecnica', arg: null,        base: 0 }, 
 { cont: 'lista-armi',       fn: 'aggiungiItem',    arg: 'armi',      base: 0 }, 
 { cont: 'lista-equip',      fn: 'aggiungiItem',    arg: 'equip',     base: 0 }, 
 { cont: 'lista-oggetti',    fn: 'aggiungiItem',    arg: 'oggetti',   base: 0 }, 
 { cont: 'lista-materiali',  fn: 'aggiungiItem',    arg: 'materiali', base: 0 } 
]; 

// Un campo va salvato se è un input/select/textarea compilabile e 
// non è readonly o disabled. 
// NB: le immagini qui sono URL (testo), non file caricati: insieme ai 
// valori di crop (crop-x/y/w/h, semplici percentuali) occupano pochi 
// byte, quindi VENGONO salvati come ogni altro campo. Escludiamo solo 
// gli input di tipo file (che porterebbero dati binari pesanti): nel 
// form attuale non ce ne sono, ma la guardia resta per sicurezza. 
function bozzaCampoValido(el) { 
 var tag = (el.tagName || '').toLowerCase(); 
 if (tag !== 'input' && tag !== 'select' && tag !== 'textarea') return false; 
 if (!el.id) return false; 
 if (el.readOnly || el.disabled) return false; 
 var t = (el.type || '').toLowerCase(); 
 if (t === 'file' || t === 'button' || t === 'submit') return false; 
 return true; 
} 

// Tutti i campi compilabili attualmente presenti nel form. 
function bozzaCampi() { 
 var root = document.getElementById('form-container') || document; 
 var tutti = root.querySelectorAll('input, select, textarea'); 
 var out = []; 
 for (var i = 0; i < tutti.length; i++) { 
  if (bozzaCampoValido(tutti[i])) out.push(tutti[i]); 
 } 
 return out; 
} 

// Conta le righe attualmente presenti in ogni contenitore dinamico. 
function bozzaContaDinamici() { 
 var conteggi = {}; 
 for (var i = 0; i < BOZZA_DINAMICI.length; i++) { 
  var d = BOZZA_DINAMICI[i]; 
  var cont = document.getElementById(d.cont); 
  conteggi[d.cont] = cont ? cont.children.length : 0; 
 } 
 return conteggi; 
} 

// Scrive SUBITO la bozza (senza debounce). Usata per le azioni 
// discrete e importanti — come la conferma del crop — dove un 
// salvataggio ritardato potrebbe non fare in tempo se l'utente 
// esce/ricarica subito dopo. 
function bozzaScriviOra() { 
 var chiave = bozzaKey(); 
 if (!chiave) return; // accrediti o modalità senza chiave 
 try { 
  var campi = bozzaCampi(); 
  var dati = {}; 
  var radios = {}; 
  for (var i = 0; i < campi.length; i++) { 
   var el = campi[i]; 
   var t = (el.type || '').toLowerCase(); 
   if (t === 'checkbox') { dati[el.id] = el.checked ? 1 : 0; } 
   else if (t === 'radio') { 
    if (el.checked && el.name) radios['radio:' + el.name] = el.value; 
   } 
   else { dati[el.id] = el.value; } 
  } 
  var pacchetto = { 
   modalita: stato.modalita, 
   palette: stato.palette, 
   campi: dati, 
   radios: radios, 
   dinamici: bozzaContaDinamici(), 
   ts: Date.now() 
  }; 
  localStorage.setItem(chiave, JSON.stringify(pacchetto)); 
 } catch (e) { /* localStorage pieno o non disponibile: si prosegue senza autosave */ } 
} 

// Salva lo stato corrente con debounce (per non scrivere a ogni tasto 
// durante la digitazione nei campi di testo). 
function bozzaSalva() { 
 if (!bozzaKey()) return; // accrediti: niente salvataggio 
 if (_bozzaTimer) clearTimeout(_bozzaTimer); 
 _bozzaTimer = setTimeout(bozzaScriviOra, 400); 
} 

// Ricrea le righe dinamiche salvate, così i loro campi esistono nel 
// DOM prima che vengano ripopolati. 
function bozzaRicreaDinamici(conteggi) { 
 if (!conteggi) return; 
 // Mappa esplicita nome→funzione: non dipende da come le funzioni 
 // sono esposte (window, scope globale ForumFree, ecc.). 
 var funzioni = { 
  aggiungiStatus:  (typeof aggiungiStatus  === 'function') ? aggiungiStatus  : null, 
  aggiungiTecnica: (typeof aggiungiTecnica === 'function') ? aggiungiTecnica : null, 
  aggiungiItem:    (typeof aggiungiItem    === 'function') ? aggiungiItem    : null 
 }; 
 for (var i = 0; i < BOZZA_DINAMICI.length; i++) { 
  var d = BOZZA_DINAMICI[i]; 
  var cont = document.getElementById(d.cont); 
  if (!cont) continue; 
  var voluto = conteggi[d.cont] || 0; 
  var presenti = cont.children.length; 
  var fn = funzioni[d.fn]; 
  if (typeof fn !== 'function') continue; 
  // Aggiunge solo le righe mancanti rispetto a quelle già presenti. 
  for (var n = presenti; n < voluto; n++) { 
   if (d.arg !== null) fn(d.arg); else fn(); 
  } 
 } 
} 

// Applica i valori salvati ai campi attualmente nel DOM. Può essere 
// chiamata più volte: la richiamiamo dopo le funzioni di dipendenza 
// (aggiornaRazza ecc.) che ripopolano le option dei select e 
// potrebbero perdere la selezione ripristinata. Idempotente. 
function bozzaApplicaValori(pacchetto) { 
 var dati = pacchetto.campi || {}; 
 for (var id in dati) { 
  if (!dati.hasOwnProperty(id)) continue; 
  var el = document.getElementById(id); 
  if (!el) continue; 
  var tag = (el.tagName || '').toLowerCase(); 
  if (tag !== 'input' && tag !== 'select' && tag !== 'textarea') continue; 
  var t = (el.type || '').toLowerCase(); 
  if (t === 'checkbox') el.checked = !!dati[id]; 
  else el.value = dati[id]; 
 } 
 // Radio per gruppo (name) 
 if (pacchetto.radios) { 
  for (var chiave in pacchetto.radios) { 
   if (!pacchetto.radios.hasOwnProperty(chiave)) continue; 
   var name = chiave.replace('radio:', ''); 
   var valore = pacchetto.radios[chiave]; 
   var gruppo = document.getElementsByName(name); 
   for (var g = 0; g < gruppo.length; g++) { 
    if (gruppo[g].value === valore) gruppo[g].checked = true; 
   } 
  } 
 } 
} 

// Legge la bozza salvata e la valida rispetto alla modalità corrente. 
// Ritorna il pacchetto (o null). Non applica ancora i valori. 
function bozzaLeggi() { 
 var chiave = bozzaKey(); 
 if (!chiave) return null; // accrediti: nessuna bozza da leggere 
 var pacchetto = null; 
 try { pacchetto = JSON.parse(localStorage.getItem(chiave)); } catch (e) { pacchetto = null; } 
 if (!pacchetto || !pacchetto.campi) return null; 
 // La chiave è già per-modalità; questo è solo un doppio controllo. 
 if (pacchetto.modalita && stato.modalita && pacchetto.modalita !== stato.modalita) return null; 
 return pacchetto; 
} 

// Ripristino completo in un colpo (ricrea righe dinamiche + applica 
// valori). Usato quando non servono passate multiple. 
function bozzaRipristina() { 
 var pacchetto = bozzaLeggi(); 
 if (!pacchetto) return false; 
 bozzaRicreaDinamici(pacchetto.dinamici); 
 bozzaApplicaValori(pacchetto); 
 return true; 
} 

// Dopo il ripristino, riallinea la parte VISIVA della slide info al 
// dato ripristinato: 
// 1) se la bozza aveva "due immagini" (radio img-info-modo = 2), 
//    attiva quella modalità così i campi della 2ª immagine compaiono 
//    (il radio da solo non basta: va chiamata aggiornaInputImgInfo). 
// 2) ridisegna le anteprime di crop nei bottoni "Modifica 
//    inquadratura", con URL e inquadrature già reinseriti. 
function bozzaRidisegnaCrop() { 
 // 1) Modo una/due immagini della slide info 
 if (typeof aggiornaInputImgInfo === 'function' && 
     document.getElementById('img-info-wrap-1')) { 
  try { aggiornaInputImgInfo(); } catch (e) {} 
 } 
 // 2) Anteprime di crop 
 if (typeof cropAggiornaBottone === 'function') { 
  var btns = document.querySelectorAll('[id^="crop-btn-"]'); 
  for (var i = 0; i < btns.length; i++) { 
   var id = btns[i].id.replace('crop-btn-', ''); 
   // Il bottone parte senza data-crop-url, quindi la guardia 
   // anti-cambio-immagine non azzera il crop appena ripristinato. 
   try { cropAggiornaBottone(id); } catch (e) {} 
  } 
 } 
} 

// Collega il salvataggio al form. Usa event delegation sul 
// contenitore, così anche i campi delle righe aggiunte DOPO (status, 
// baule, tecniche) vengono salvati senza dover riagganciare listener. 
function bozzaCollega() { 
 var root = document.getElementById('form-container'); 
 if (!root || root._bozzaBound) return; 
 root._bozzaBound = true; 
 root.addEventListener('input', bozzaSalva); 
 root.addEventListener('change', bozzaSalva); 
} 

// Cancella la bozza della modalità corrente (dopo generazione 
// riuscita o su richiesta di reset). Non tocca la bozza dell'altra 
// modalità. 
function bozzaCancella() { 
 var chiave = bozzaKey(); 
 if (!chiave) return; 
 try { localStorage.removeItem(chiave); } catch (e) {} 
} 

// Svuota i campi del form e cancella la bozza. Usata dal bottone 
// "Resetta". Chiede conferma esplicita per evitare perdite accidentali. 
function resetForm() { 
 if (!confirm('Vuoi svuotare tutti i campi compilati? L\'operazione non è reversibile.')) return; 
 bozzaCancella(); 
 // Il modo più sicuro per ripulire davvero è ricostruire il form 
 // da zero: azzera anche i campi dipendenti (razza, competenze, ecc.). 
 costruisciForm(); 
} 

// ============================================================ 
// ID PERSONAGGIO (pgId) — chiave stabile per il registro accrediti 
// ============================================================ 
function generaPgId() { 
 if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID(); 
 // Fallback per ambienti senza crypto.randomUUID (ForumFree è in https, non dovrebbe servire) 
 return 'pg_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10); 
} 

// ============================================================ 
// ACCREDITI — STAFF DETECTION (allineato ad arena.js / HxHFramework) 
// Fonte staff: HxHFramework.groups.isStaff() se presente, fallback 
// locale sulle body class. Override localStorage af_staff_override. 
// Nome staffer: af_utente → Commons.user → link profilo. 
// ============================================================ 
function accStaffDaBody() { 
 var c = document.body.className || ''; 
 return /\badmin\b/.test(c) || /\b(g1|g2|g3|g4)\b/.test(c); 
} 

function accRilevaStaff() { 
 var ov; 
 try { ov = localStorage.getItem('af_staff_override'); } catch(e) { ov = null; } 
 if (ov === '1') return true; 
 if (ov === '0') return false; 
 if (window.HxHFramework && window.HxHFramework.groups && window.HxHFramework.groups.isStaff) { 
  try { return window.HxHFramework.groups.isStaff(); } catch(e) {} 
 } 
 return accStaffDaBody(); 
} 

function accNomeStaffer() { 
 // 1) override manuale di sessione (campo "Il tuo nome staff") 
 if (stato.stafferManuale) return String(stato.stafferManuale).trim(); 
 // 2) override localStorage (condiviso con arena.js) 
 var ov; 
 try { ov = localStorage.getItem('af_utente'); } catch(e) { ov = null; } 
 if (ov) return String(ov).trim(); 
 // 3) oggetto Commons di ForumFree 
 try { 
  if (window.Commons && window.Commons.user) { 
   var u = window.Commons.user; 
   var n = u.name || u.nickname || u.username || u.display_name; 
   if (n) return String(n).trim(); 
  } 
 } catch(e) {} 
 // 4) link al proprio profilo nell'header 
 var sel = ["#logged-in-as a", ".logged-in a", "#user-info a", 
  "a[href*='act=Profile'][href*='MID=']", "#userlinks a:first-child", ".userlink"]; 
 for (var i = 0; i < sel.length; i++) { 
  var el = document.querySelector(sel[i]); 
  if (el) { 
   var t = (el.textContent || '').trim(); 
   if (t && t.length < 40) return t; 
  } 
 } 
 return ''; 
} 

// Mostra il box "Accrediti" nella schermata scelta solo se staff. 
// Usa HxHFramework.utilities.waitFor per attendere framework + body class; 
// fallback a un piccolo poller interno se il framework non è caricato. 
function accInitBottone() { 
 // La riga "Accrediti" è sempre visibile. Di default è bloccata 
 // (classe scelta-row-locked + icona lucchetto); se l'utente è staff 
 // la sblocchiamo qui, rimettendo il chevron e togliendo il blocco. 
 function sblocca() { 
  var box = document.getElementById('btn-accrediti'); 
  if (box && accRilevaStaff()) { 
   box.className = box.className.replace(/\bscelta-row-locked\b/g, '').replace(/\s+$/, ''); 
   var ico = box.querySelector('.scelta-go'); 
   if (ico) ico.className = 'fa-solid fa-chevron-right scelta-go'; 
   return true; 
  } 
  return false; 
 } 
 if (sblocca()) return; 
 if (window.HxHFramework && window.HxHFramework.utilities && window.HxHFramework.utilities.waitFor) { 
  window.HxHFramework.utilities.waitFor( 
   function(){ return document.body.className && (window.HxHFramework.groups || true); }, 
   sblocca 
  ); 
 } else { 
  // Poller di riserva: ~6s, poi si arrende (la riga resta bloccata) 
  var n = 0; 
  var t = setInterval(function(){ n++; if (sblocca() || n > 24) clearInterval(t); }, 250); 
 } 
} 
 
// ============================================================ 
// NAVIGAZIONE TRA SCHERMATE 
// ============================================================ 
function mostraSchermata(id) { 
 var schermate = ['schermata-scelta', 'schermata-palette', 'schermata-form']; 
 for (var i = 0; i < schermate.length; i++) { 
  var el = document.getElementById(schermate[i]); 
  if (el) el.style.display = 'none'; 
 } 
 var target = document.getElementById(id); 
 if (target) { 
  target.style.display = 'block'; 
  target.style.opacity = '0'; 
  target.style.transform = 'translateY(20px)'; 
  setTimeout(function() { 
   target.style.transition = 'opacity 0.4s ease, transform 0.4s ease'; 
   target.style.opacity = '1'; 
   target.style.transform = 'translateY(0)'; 
  }, 10); 
 } 
} 
 
// Indietro dal form: in modalità accrediti la palette è saltata, 
// quindi si torna direttamente alla schermata iniziale; altrimenti 
// si torna alla selezione della palette. 
function tornaIndietroDalForm() { 
 if (stato.modalita === 'accrediti') { 
  mostraSchermata('schermata-scelta'); 
 } else { 
  mostraSchermata('schermata-palette'); 
  costruisciGalleriaPalette(); 
 } 
} 

// Azzera la sezione output (anteprima + codice) ed elimina ogni 
// residuo dell'operazione di accredito precedente: il box di 
// conferma nel DOM e le variabili di stato che lo alimentano. Va 
// chiamata quando si entra in una modalità dal menu iniziale. 
function resetOutputEAccrediti() { 
 // 1) Nasconde e svuota la sezione output 
 var out = document.getElementById('sezione-output'); 
 if (out) out.style.display = 'none'; 
 var box = document.getElementById('acc-conferma-box'); 
 if (box && box.parentNode) box.parentNode.removeChild(box); 
 var ant = document.getElementById('anteprima-scheda'); 
 if (ant) ant.innerHTML = ''; 
 var cod = document.getElementById('codice-html'); 
 if (cod) cod.textContent = ''; 
 // 2) Azzera lo stato dell'accredito in RAM 
 stato.accBase = null; 
 stato.diffAccredito = null; 
 stato.accNome = null; 
 stato.progressione = null; 
 stato.schedaOriginale = null; 
 stato.pgId = null; 
} 

function scegliModalita(modalita) { 
 // Guardia accrediti: la riga è visibile a tutti ma resta accessibile 
 // solo agli staff. Se un non-staff la clicca, non facciamo nulla. 
 if (modalita === 'accrediti' && !accRilevaStaff()) return; 
 // Pulizia all'ingresso in una modalità: azzera l'output e ogni 
 // residuo dell'accredito precedente, così il box "Registra 
 // accredito" (con il diff dell'ultima operazione) non ricompare 
 // entrando in Nuova/Modifica. 
 resetOutputEAccrediti(); 
 stato.modalita = modalita; 
 var btnNuova = document.getElementById('btn-nuova'); 
 var btnModifica = document.getElementById('btn-modifica'); 
 var btnAccrediti = document.getElementById('btn-accrediti'); 
 // Reset visivo di tutte le righe (layout Variante A: accento a sinistra) 
 var boxes = [btnNuova, btnModifica, btnAccrediti]; 
 for (var bi = 0; bi < boxes.length; bi++) { 
  if (boxes[bi]) { boxes[bi].style.borderLeftColor = '#3B8686'; boxes[bi].style.background = 'rgba(59,134,134,0.10)'; } 
 } 
 var attivo = modalita === 'nuova' ? btnNuova : (modalita === 'modifica' ? btnModifica : btnAccrediti); 
 if (attivo) { attivo.style.borderLeftColor = '#CFF09E'; attivo.style.background = 'rgba(207,240,158,0.12)'; } 

 // Accrediti: salta la palette, forza "mantieni", va dritto al form 
 if (modalita === 'accrediti') { 
  stato.palette = 'mantieni'; 
  setTimeout(function() { 
   mostraSchermata('schermata-form'); 
   costruisciForm(); 
  }, 300); 
  return; 
 } 

 setTimeout(function() { 
  mostraSchermata('schermata-palette'); 
  costruisciGalleriaPalette(); 
 }, 300); 
} 
 
function costruisciGalleriaPalette() { 
 var container = document.getElementById('galleria-palette'); 
 var html = ''; 
 
 if (stato.modalita === 'modifica') { 
  html += '<div class="pal-card" onclick="selezionaPalette(\'mantieni\')" id="card-mantieni" style="cursor:pointer; border:2px dashed #3B8686; border-radius:12px; overflow:hidden; transition:all 0.3s; width:220px; display:inline-block; margin:12px; vertical-align:top; box-shadow:0 4px 15px rgba(0,0,0,0.3);">'; 
  html += '<div style="height:140px; background:#0B486B; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px;">'; 
  html += '<i class="fa-solid fa-rotate-left" style="font-size:2.2em; color:#8FBEBA;"></i>'; 
  html += '<span style="color:#8FBEBA; font-size:0.85em; font-style:italic;">Modifica solo il contenuto, non la struttura!</span>'; 
  html += '</div>'; 
  html += '<div style="padding:10px 14px; background:#0B486B; border-top:1px solid #3B8686;">'; 
  html += '<span style="color:#8FBEBA; font-family:\'Montserrat\'; font-size:1.2em;">Mantieni le Personalizzazioni!</span>'; 
  html += '</div></div>'; 
 } 
 
 for (var i = 0; i < PALETTE.length; i++) { 
  var p = PALETTE[i]; 
  html += '<div class="pal-card" onclick="selezionaPalette(\'' + p.id + '\')" id="card-' + p.id + '" style="cursor:pointer; border:2px solid ' + p.bordo + '; border-radius:12px; overflow:hidden; transition:all 0.3s; width:220px; display:inline-block; margin:12px; vertical-align:top; box-shadow:0 4px 15px rgba(0,0,0,0.3);">'; 
  html += '<div style="height:140px; background:' + p.sfondo + '; padding:14px; box-sizing:border-box;">'; 
  html += '<div style="background:' + p.titolo1 + '; border:1px solid ' + p.bordo + '; border-radius:6px; padding:6px 10px; margin-bottom:8px; display:flex; align-items:center; gap:6px;">'; 
  html += '<div style="width:28px; height:28px; border-radius:50%; background:' + p.sfondo2 + '; border:1px solid ' + p.bordo + ';"></div>'; 
  html += '<div style="flex:1;">'; 
  html += '<div style="height:6px; border-radius:3px; background:' + p.titolo2 + '; margin-bottom:4px; width:70%;"></div>'; 
  html += '<div style="height:5px; border-radius:3px; background:' + p.testo + '; opacity:0.5; width:50%;"></div>'; 
  html += '</div></div>'; 
  html += '<div style="display:flex; gap:5px; margin-bottom:6px;">'; 
  for (var b = 0; b < 4; b++) { 
   html += '<div style="flex:1; height:20px; border-radius:4px; background:' + p.sfondo2 + '; border:1px solid ' + p.bordo + '; display:flex; align-items:center; justify-content:center;">'; 
   html += '<div style="width:60%; height:4px; border-radius:2px; background:' + p.titolo2 + ';"></div>'; 
   html += '</div>'; 
  } 
  html += '</div>'; 
  html += '<div style="height:5px; border-radius:3px; background:' + p.testo + '; opacity:0.4; width:90%; margin-bottom:4px;"></div>'; 
  html += '<div style="height:5px; border-radius:3px; background:' + p.testo + '; opacity:0.3; width:70%;"></div>'; 
  html += '</div>'; 
  html += '<div style="padding:10px 14px; background:' + p.titolo1 + '; border-top:1px solid ' + p.bordo + '; display:flex; align-items:center; justify-content:space-between;">'; 
  html += '<span style="color:' + p.vitale + '; font-family:\'Montserrat\',serif; font-size:1.2em; font-weight:600;">' + p.nome + '</span>'; 
  html += '<i class="fa-solid fa-palette" style="color:' + p.testo + '; font-size:0.9em;"></i>'; 
  html += '</div></div>'; 
 } 
 
 container.innerHTML = html; 
} 
 
function selezionaPalette(paletteId) { 
 stato.palette = paletteId; 
 var allIds = []; 
 for (var i = 0; i < PALETTE.length; i++) allIds.push('card-' + PALETTE[i].id); 
 allIds.push('card-mantieni'); 
 for (var i = 0; i < allIds.length; i++) { 
  var card = document.getElementById(allIds[i]); 
  if (card) { 
   card.style.transform = 'scale(1)'; 
   card.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)'; 
   card.style.outline = 'none'; 
  } 
 } 
 var sel = document.getElementById('card-' + paletteId); 
 if (sel) { 
  sel.style.transform = 'scale(1.05)'; 
  sel.style.boxShadow = '0 0 25px rgba(207,240,158,0.35)'; 
  sel.style.outline = '2px solid #CFF09E'; 
 } 
 setTimeout(function() { 
  mostraSchermata('schermata-form'); 
  costruisciForm(); 
 }, 400); 
} 
 
// ============================================================ 
// STILI BASE 
// ============================================================ 
var STILE_SEZIONE = 'background:#0B486B; border:2px solid #292354; border-radius:12px; padding:25px; margin-bottom:20px;'; 
var STILE_INPUT = 'width:100%; padding:10px 14px; background:#292354; border:1px solid #3B8686; border-radius:6px; color:#E2F7C4; font-family:\'Montserrat\'; font-size:1em; box-sizing:border-box; outline:none;'; 
var STILE_LABEL = 'display:block; color:#CFF09E; font-size:0.9em; margin-bottom:5px; font-family:\'Montserrat\';'; 
var STILE_READONLY = 'display:block; padding:10px 14px; background:#292354; border:1px solid #3B8686; border-radius:6px; color:#8FBEBA; font-family:\'Montserrat\'; font-size:1em; opacity:0.75;'; 
 
// ============================================================ 
// HELPERS LAYOUT 
// ============================================================ 
function riga2(a, b) { 
 return '<table style="width:100%; border-collapse:collapse; table-layout:fixed;">' + 
  '<tr><td style="width:50%; padding-right:7px; vertical-align:top;">' + a + '</td>' + 
  '<td style="width:50%; padding-left:7px; vertical-align:top;">' + b + '</td></tr>' + 
  '</table>'; 
} 
 
function riga3(a, b, c) { 
 return '<table style="width:100%; border-collapse:collapse; table-layout:fixed;">' + 
  '<tr>' + 
  '<td style="width:33%; padding-right:5px; vertical-align:top;">' + a + '</td>' + 
  '<td style="width:34%; padding-left:5px; padding-right:5px; vertical-align:top;">' + b + '</td>' + 
  '<td style="width:33%; padding-left:5px; vertical-align:top;">' + c + '</td>' + 
  '</tr></table>'; 
} 
 
function riga4(a, b, c, d) { 
 return '<table style="width:100%; border-collapse:collapse; table-layout:fixed;">' + 
  '<tr>' + 
  '<td style="width:25%; padding-right:4px; vertical-align:top;">' + a + '</td>' + 
  '<td style="width:25%; padding-left:4px; padding-right:4px; vertical-align:top;">' + b + '</td>' + 
  '<td style="width:25%; padding-left:4px; padding-right:4px; vertical-align:top;">' + c + '</td>' + 
  '<td style="width:25%; padding-left:4px; vertical-align:top;">' + d + '</td>' + 
  '</tr></table>'; 
} 
 
function rigaStat5(celle) { 
 // Contenitore di celle inline-block: su desktop stanno 5 per riga 
 // (classe .stat-cell = 20%), su mobile la media query in pagina le 
 // porta a 2 per riga (50%). L'inline-block va a capo da solo, cosa 
 // che una <table> table-layout:fixed non farebbe (resterebbe a 5 
 // colonne strizzate). font-size:0 sul contenitore azzera lo spazio 
 // bianco tra gli inline-block; le celle lo ripristinano. 
 // Larghezza e box model stanno SOLO nella classe .stat-cell (nel CSS 
 // della pagina), non inline: uno stile inline batterebbe la media 
 // query mobile e le celle resterebbero a 5 per riga. Inline lasciamo 
 // solo font-size:initial, per ripristinare il testo dopo il 
 // font-size:0 del contenitore (che elimina gli spazi tra inline-block). 
 var html = '<div class="stat-grid" style="font-size:0; margin-bottom:8px;">'; 
 for (var i = 0; i < celle.length; i++) { 
  html += '<div class="stat-cell" style="font-size:initial;">' + celle[i] + '</div>'; 
 } 
 html += '</div>'; 
 return html; 
} 
 
// ============================================================ 
// COSTRUZIONE FORM 
// ============================================================ 
function costruisciForm() { 
 var container = document.getElementById('form-container'); 
 var isNuova = stato.modalita === 'nuova'; 
 var isAccrediti = stato.modalita === 'accrediti'; 
 var html = ''; 

 // ── MODALITÀ ACCREDITI: form ridotto ────────────────────── 
 if (isAccrediti) { 
  container.innerHTML = costruisciFormAccrediti(); 
  // Se il nome staffer non è rilevabile, mostra il campo manuale 
  var nome = accNomeStaffer(); 
  var wrap = document.getElementById('acc-staffer-wrap'); 
  if (wrap) wrap.style.display = nome ? 'none' : ''; 
  var badge = document.getElementById('acc-staffer-badge'); 
  if (badge) badge.textContent = nome ? nome : '(da inserire)'; 
  // Anche il form accrediti usa l'accordion: lascia aperta solo la 
  // prima sezione. (Niente autosave qui: è un flusso staff basato 
  // sull'importazione della scheda esistente.) 
  accordionInit(); 
  return; 
 } 

 // Reset contatore sezioni per l'accordion: 8 sezioni in modifica 
 // (c'è "Importa" in più), 7 in modalità nuova. 
 _sezNum = 0; 
 _sezTot = isNuova ? 7 : 8; 
 
 // PATCH 1: Importa in cima (solo modalità modifica) 
 if (!isNuova) { 
  html += sezioneForm('<i class="fa-solid fa-file-import"></i> Importa Scheda Esistente', costruisciImporta()); 
 } 
 
 html += sezioneForm('<i class="fa-solid fa-user"></i> Dati Personali', costruisciDatiPersonali(isNuova)); 
 html += sezioneForm('<i class="fa-solid fa-image"></i> Immagini', costruisciImmagini()); 
 html += sezioneForm('<i class="fa-solid fa-star"></i> Info &amp; Personalità', costruisciInfo()); 
 html += sezioneForm('<i class="fa-solid fa-chart-bar"></i> Statistiche', costruisciStatistiche(isNuova)); 
 html += sezioneForm('<i class="fa-solid fa-fire"></i> Abilità Nen', costruisciNen(isNuova)); 
 html += sezioneForm('<i class="fa-solid fa-bag-shopping"></i> Baule', costruisciBalue(isNuova));
 html += sezioneForm('<i class="fa-solid fa-music"></i> Musica', costruisciMusica()); 
 
 html += '<div style="text-align:center; margin-top:40px; padding-bottom:40px;">'; 
 html += '<button onclick="generaScheda()" style="background:linear-gradient(135deg,#A8DBA8 0%,#79BD9A 100%); color:#1a2e1a; border:none; padding:18px 60px; font-size:1.3em; font-weight:700; border-radius:10px; cursor:pointer; font-family:\'Montserrat\'; box-shadow:0 6px 25px rgba(0,0,0,0.4); text-transform:uppercase; letter-spacing:2px; transition:all 0.3s;">'; 
 html += '<i class="fa-solid fa-wand-magic-sparkles"></i> Genera Scheda</button>'; 
 html += '</div>'; 
 
 container.innerHTML = html; 
 
 if (isNuova) { 
  var luogoEl = document.getElementById('campo-luogo'); 
  var classeEl = document.getElementById('campo-classe'); 
  if (luogoEl) luogoEl.onchange = aggiornaStatNuova; 
  if (classeEl) classeEl.onchange = aggiornaStatNuova; 
  aggiornaRazza(true); 
 } else { 
  aggiornaRazza(false); 
  aggiornaCompetenze(); 
  // Fedina penale: mostra/nascondi taglia al cambio manuale 
  var feEl = document.getElementById('campo-fedina'); 
  if (feEl) feEl.onchange = function(){ aggiornaFedina(false); }; 
  // Valore taglia: valida il valore inserito a mano (non sotto il minimo) 
  var vtEl = document.getElementById('campo-valtaglia'); 
  if (vtEl) vtEl.onchange = validaValoreTaglia; 
 } 
 
 // Accordion: lascia aperta solo la prima sezione. 
 accordionInit(); 
 
 // Ripristino bozza. L'ordine è delicato perché alcune funzioni di 
 // dipendenza (aggiornaRazza ripopola le option di luogo/classe, 
 // aggiornaStatNuova azzera i punti extra, aggiornaCompetenze 
 // disabilita gli slot bloccati). Strategia a passate multiple: 
 // applichiamo i valori, chiamiamo le dipendenze, poi RIapplichiamo 
 // i valori sopra, così una selezione persa nel ripopolamento delle 
 // option viene ripristinata. 
 var pacchetto = bozzaLeggi(); 
 if (pacchetto) { 
  // Ricrea le righe dinamiche (status, baule, tecniche) una volta. 
  bozzaRicreaDinamici(pacchetto.dinamici); 
  // Passata 1: valori pilota (razza, specie, luogo, classe, fedina…) 
  bozzaApplicaValori(pacchetto); 
  if (isNuova) { 
   // Le stat base dipendono da luogo/classe; le calcoliamo (azzera 
   // gli extra), poi RIapplichiamo i valori per recuperare gli 
   // extra e le eventuali selezioni perse nel ripopolamento option. 
   aggiornaRazza(true); 
   aggiornaStatNuova(); 
   bozzaApplicaValori(pacchetto); 
   applicaStatExtraRipristinati(); 
  } else { 
   aggiornaRazza(false); 
   aggiornaCompetenze(); 
   if (typeof aggiornaFedina === 'function') aggiornaFedina(false); 
   // RIapplica dopo il ripopolamento delle option e lo stato slot. 
   bozzaApplicaValori(pacchetto); 
   aggiornaCompetenze(); 
  } 
  // Ridisegna le anteprime di crop con URL e inquadrature ripristinati. 
  bozzaRidisegnaCrop(); 
 } 
 
 // Collega l'autosave dopo il ripristino, così il primo salvataggio 
 // riflette i valori reinseriti e non li sovrascrive con dei vuoti. 
 bozzaCollega(); 
} 

// Dopo il ripristino in modalità NUOVA: ricalcola i totali visibili 
// delle statistiche come base + extra ripristinati, senza azzerare 
// gli extra (a differenza di aggiornaStatNuova). Aggiorna anche il 
// contatore dei punti rimanenti. 
function applicaStatExtraRipristinati() { 
 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
 for (var i = 0; i < ls.length; i++) { 
  var eExtra = document.getElementById('stat-extra-'+ls[i]); 
  var eBase  = document.getElementById('stat-base-'+ls[i]); 
  var eTot   = document.getElementById('stat-'+ls[i]); 
  if (!eExtra || !eBase || !eTot) continue; 
  var base  = parseInt(eBase.textContent) || 5; 
  var extra = parseInt(eExtra.value) || 0; 
  eTot.textContent = base + extra; 
 } 
 if (typeof aggiornaContatoreExtra === 'function') aggiornaContatoreExtra(); 
} 

// ============================================================ 
// ACCORDION FORM — una sezione aperta per volta 
// Ogni sezione ha classe .form-sec; l'header .form-sec-hd fa da 
// toggle. La prima resta aperta all'avvio. 
// ============================================================ 
function accordionInit() { 
 var sezioni = document.querySelectorAll('.form-sec'); 
 for (var i = 0; i < sezioni.length; i++) { 
  if (i === 0) sezioni[i].className = sezioni[i].className.replace(/\bform-sec-closed\b/g, '').replace(/\s+$/, ''); 
  else if (sezioni[i].className.indexOf('form-sec-closed') === -1) sezioni[i].className += ' form-sec-closed'; 
  accordionAggiornaChevron(sezioni[i]); 
 } 
} 

function accordionToggle(header) { 
 var sec = header.parentNode; 
 var chiusa = sec.className.indexOf('form-sec-closed') !== -1; 
 if (chiusa) { 
  // Apri questa, chiudi le altre 
  var tutte = document.querySelectorAll('.form-sec'); 
  for (var i = 0; i < tutte.length; i++) { 
   if (tutte[i] !== sec && tutte[i].className.indexOf('form-sec-closed') === -1) { 
    tutte[i].className += ' form-sec-closed'; 
    accordionAggiornaChevron(tutte[i]); 
   } 
  } 
  sec.className = sec.className.replace(/\bform-sec-closed\b/g, '').replace(/\s+$/, ''); 
  accordionAggiornaChevron(sec); 
  // Porta in vista la sezione appena aperta: chiudendo le altre la 
  // pagina può essere rimasta scrollata altrove, quindi riallineiamo 
  // l'header di questa sezione. Lo scroll-margin-top lascia un po' di 
  // spazio sopra, così il titolo (es. "Dati Personali") non finisce 
  // incollato al bordo alto ma resta ben leggibile. 
  var target = sec; 
  target.style.scrollMarginTop = '80px'; 
  setTimeout(function() { 
   if (target.scrollIntoView) target.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
  }, 60); 
 } else { 
  sec.className += ' form-sec-closed'; 
  accordionAggiornaChevron(sec); 
 } 
} 

function accordionAggiornaChevron(sec) { 
 var chev = sec.querySelector('.form-sec-chev'); 
 if (!chev) return; 
 var chiusa = sec.className.indexOf('form-sec-closed') !== -1; 
 chev.className = 'form-sec-chev fa-solid ' + (chiusa ? 'fa-chevron-down' : 'fa-chevron-up'); 
} 
 
// Contatore progressivo delle sezioni, azzerato a ogni ricostruzione 
// del form (vedi costruisciForm). Serve per il badge "n / tot". 
var _sezNum = 0; 
var _sezTot = 7; 

function sezioneForm(titolo, contenuto) { 
 _sezNum++; 
 var stileBox = 'background:#0B486B; border:2px solid #292354; border-radius:12px; margin-bottom:14px; overflow:hidden;'; 
 var stileHd = 'display:flex; align-items:center; gap:14px; padding:18px 24px; cursor:pointer; user-select:none;'; 
 var stileStrong = 'color:#CFF09E; font-family:\'Montserrat\'; font-size:1.25em; flex:1;'; 
 var stileNum = 'color:#8FBEBA; font-size:0.78em; border:1px solid #3B8686; border-radius:999px; padding:2px 11px; font-family:\'Montserrat\';'; 
 var stileBd = 'padding:22px 24px 25px; border-top:1px solid #292354;'; 
 return '<div class="form-sec" style="' + stileBox + '">' + 
  '<div class="form-sec-hd" onclick="accordionToggle(this)" style="' + stileHd + '">' + 
  '<span style="' + stileStrong + '">' + titolo + '</span>' + 
  '<span style="' + stileNum + '">' + _sezNum + ' / ' + _sezTot + '</span>' + 
  '<i class="form-sec-chev fa-solid fa-chevron-down" style="color:#3B8686;"></i>' + 
  '</div>' + 
  '<div class="form-sec-bd" style="' + stileBd + '">' + contenuto + '</div>' + 
  '</div>'; 
} 

// ============================================================ 
// FORM ACCREDITI (modalità staff) 
// Sezioni: Importa · Progressione (EXP→motore) · Statistiche 
// (contatore bloccante) · Valori diretti · Baule · Status/Taglia 
// ============================================================ 
function costruisciFormAccrediti() { 
 var html = ''; 
 // Reset contatore accordion: la modalità accrediti ha 6 sezioni 
 // collassabili (il badge staffer in cima non è una di esse). 
 // Senza questo reset erediterebbe i valori dell'ultimo form aperto. 
 _sezNum = 0; 
 _sezTot = 6; 

 // Badge staffer + campo manuale (mostrato solo se nome non rilevato) 
 html += '<div style="' + STILE_SEZIONE + '">'; 
 html += '<div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">'; 
 html += '<i class="fa-solid fa-user-shield" style="color:#CFF09E; font-size:1.2em;"></i>'; 
 html += '<span style="color:#8FBEBA;">Accredito eseguito da:</span> '; 
 html += '<span id="acc-staffer-badge" style="color:#CFF09E; font-weight:700;">—</span>'; 
 html += '</div>'; 
 html += '<div id="acc-staffer-wrap" style="display:none; margin-top:12px;">'; 
 html += '<label style="' + STILE_LABEL + '">Non riesco a identificarti automaticamente. Inserisci il tuo nome staff:</label>'; 
 html += '<input type="text" id="acc-staffer-input" placeholder="Il tuo nome staff" oninput="accAggiornaStafferManuale()" style="' + STILE_INPUT + '">'; 
 html += '</div>'; 
 html += '</div>'; 

 // Importa (riuso identico a modifica) 
 html += sezioneForm('<i class="fa-solid fa-file-import"></i> Importa Scheda del PG', costruisciImporta()); 

 // Progressione 
 html += sezioneForm('<i class="fa-solid fa-arrow-trend-up"></i> Progressione (EXP e Level Up)', costruisciProgressione()); 

 // Statistiche (contatore bloccante, budget dal motore) 
 html += sezioneForm('<i class="fa-solid fa-chart-bar"></i> Distribuzione Punti Statistica', costruisciStatAccrediti()); 

 // Valori diretti 
 html += sezioneForm('<i class="fa-solid fa-coins"></i> Valori Diretti', costruisciValoriDiretti()); 

 // Baule (riuso identico a modifica) 
 html += sezioneForm('<i class="fa-solid fa-bag-shopping"></i> Baule', costruisciBalue(false)); 

 // Status / Taglia 
 html += sezioneForm('<i class="fa-solid fa-id-badge"></i> Status e Taglia', costruisciStatusTaglia()); 

 // Pulsante genera 
 html += '<div style="text-align:center; margin-top:40px; padding-bottom:40px;">'; 
 html += '<button onclick="generaScheda()" style="background:linear-gradient(135deg,#A8DBA8 0%,#79BD9A 100%); color:#1a2e1a; border:none; padding:18px 60px; font-size:1.3em; font-weight:700; border-radius:10px; cursor:pointer; font-family:\'Montserrat\'; box-shadow:0 6px 25px rgba(0,0,0,0.4); text-transform:uppercase; letter-spacing:2px;">'; 
 html += '<i class="fa-solid fa-circle-check"></i> Registra Accredito</button>'; 
 html += '</div>'; 

 return html; 
} 

function accAggiornaStafferManuale() { 
 var el = document.getElementById('acc-staffer-input'); 
 stato.stafferManuale = el ? el.value.trim() : null; 
 var badge = document.getElementById('acc-staffer-badge'); 
 if (badge) badge.textContent = stato.stafferManuale ? stato.stafferManuale : '(da inserire)'; 
} 

function costruisciProgressione() { 
 var html = ''; 
 html += '<p style="color:#8FBEBA; font-size:0.88em; margin-bottom:14px; font-style:italic;"><i class="fa-solid fa-circle-info"></i> Importa prima la scheda, poi inserisci l\'EXP da accreditare e premi "Calcola". Il livello, Vita, Aura, Tenacia e i punti da distribuire si calcolano in automatico.</p>'; 
 // Stato attuale (readonly, popolato all'import) 
 html += '<div id="prog-attuale" style="background:#1a2e45; border:1px solid #3B8686; border-radius:8px; padding:12px 16px; margin-bottom:14px; color:#8FBEBA; font-size:0.9em;">Nessuna scheda importata.</div>'; 
 // Campo EXP da accreditare + bottone sotto 
 html += '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">EXP da accreditare</label><input type="number" id="acc-exp-delta" min="0" step="1" value="0" style="'+STILE_INPUT+'"></div>'; 
 html += '<div style="margin-bottom:14px;"><button onclick="accCalcolaProgressione()" style="width:100%; background:#292354; color:#CFF09E; border:1px solid #3B8686; padding:11px 18px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; font-size:1em;"><i class="fa-solid fa-calculator"></i> Calcola progressione</button></div>'; 
 // Anteprima risultato 
 html += '<div id="prog-risultato" style="display:none; background:#0B486B; border:2px solid #3B8686; border-radius:8px; padding:16px; margin-top:6px;"></div>'; 
 return html; 
} 

function costruisciStatAccrediti() { 
 var nomiStat = ['Forza','Resistenza','Velocità','Riflessi','Destrezza','Mira','Intelligenza','Carisma','Istinto','Fortuna']; 
 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
 var html = ''; 
 html += '<p style="color:#8FBEBA; font-size:0.88em; margin-bottom:10px; font-style:italic;">I punti da level up vanno distribuiti <b>tutti</b> per registrare l\'accredito. Puoi comunque aggiungere ulteriori punti extra (per casi slegati dal level up).</p>'; 
 html += '<div style="background:#1a2e45; border:1px solid #3B8686; border-radius:8px; padding:10px 16px; margin-bottom:14px; display:flex; align-items:center; gap:10px;">'; 
 html += '<i class="fa-solid fa-coins" style="color:#CFF09E;"></i> '; 
 html += '<span id="acc-punti-counter" style="color:#8FBEBA; font-size:0.95em; font-weight:600;">0 punti da distribuire</span>'; 
 html += '</div>'; 
 html += '<p style="color:#8FBEBA; font-size:0.82em; margin-bottom:10px; font-style:italic;">Massimo 250 per statistica (400 se overlivellata). Puoi overlivellare al massimo 2 statistiche.</p>'; 
 // Le 10 stat: valore corrente (readonly, da import) + extra distribuiti 
 var r1 = [], r2 = []; 
 for (var i = 0; i < 10; i++) { 
  var cella = 
   '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:8px 4px;">' + 
   '<div style="color:#8FBEBA; font-size:0.75em; margin-bottom:4px;">'+nomiStat[i]+'</div>' + 
   '<div id="accstat-'+ls[i]+'" style="color:#CFF09E; font-size:1.2em; font-weight:700;">5</div>' + 
   '<span style="display:none;" id="accstat-base-'+ls[i]+'">5</span>' + 
   '<input type="hidden" id="accstat-extra-'+ls[i]+'" value="0">' + 
   '<div style="display:flex; justify-content:center; gap:4px; margin-top:5px;">' + 
   '<button onclick="accModificaStat(\''+ls[i]+'\',-5)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">&#8722;</button>' + 
   '<button onclick="accModificaStat(\''+ls[i]+'\',5)"  style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">+</button>' + 
   '</div>' + 
   '<label style="display:block; color:#8FBEBA; font-size:0.72em; margin-top:5px; cursor:pointer;"><input type="checkbox" id="over-'+ls[i]+'" onchange="accToggleOver(this,\''+ls[i]+'\')"> over</label>' + 
   '</div>'; 
  if (i < 5) r1.push(cella); else r2.push(cella); 
 } 
 html += rigaStat5(r1); 
 html += rigaStat5(r2); 
 // Vita e Aura: readonly, calcolati dal motore 
 html += riga2( 
  '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:10px;"><div style="color:#8FBEBA; font-size:0.78em; margin-bottom:4px;">Vita</div><div id="accstat-vita" style="color:#CFF09E; font-size:1.3em; font-weight:700;">300</div></div>', 
  '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:10px;"><div style="color:#8FBEBA; font-size:0.78em; margin-bottom:4px;">Aura</div><div id="accstat-aura" style="color:#CFF09E; font-size:1.3em; font-weight:700;">500</div></div>' 
 ); 
 return html; 
} 

function costruisciValoriDiretti() { 
 var html = ''; 
 var stileSel = STILE_INPUT + ' background:#292354;'; 
 // Jenny: valore attuale (readonly) + operazione (aggiungi/sottrai) + importo 
 html += '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Jenny attuali</label>' + 
  '<div id="acc-jenny-attuale" style="'+STILE_READONLY+'">—</div></div>'; 
 html += riga3( 
  '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Operazione</label>' + 
   '<select id="acc-jenny-op" onchange="accAggiornaTotali()" style="'+stileSel+'">' + 
   '<option value="add">+ Aggiungi</option><option value="sub">&#8722; Sottrai</option></select></div>', 
  '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Importo Jenny</label><input type="number" id="acc-jenny-add" min="0" step="1" value="0" oninput="accAggiornaTotali()" style="'+STILE_INPUT+'"></div>', 
  '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Jenny risultanti</label><div id="acc-jenny-tot" style="'+STILE_READONLY+'">—</div></div>' 
 ); 
 // HC: stesso schema 
 html += '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">HC attuali</label>' + 
  '<div id="acc-hc-attuale" style="'+STILE_READONLY+'">—</div></div>'; 
 html += riga3( 
  '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Operazione</label>' + 
   '<select id="acc-hc-op" onchange="accAggiornaTotali()" style="'+stileSel+'">' + 
   '<option value="add">+ Aggiungi</option><option value="sub">&#8722; Sottrai</option></select></div>', 
  '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Importo HC</label><input type="number" id="acc-hc-add" min="0" step="1" value="0" oninput="accAggiornaTotali()" style="'+STILE_INPUT+'"></div>', 
  '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">HC risultanti</label><div id="acc-hc-tot" style="'+STILE_READONLY+'">—</div></div>' 
 ); 
 // Nen: campo modificabile precompilato col valore attuale 
 html += '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Nen (%) — valore attuale, modificabile</label><input type="number" id="acc-nen" min="0" max="100" step="1" style="'+STILE_INPUT+'"></div>'; 
 html += '<p style="color:#8FBEBA; font-size:0.82em; font-style:italic; margin:0;"><i class="fa-solid fa-circle-info"></i> Tenacia non si modifica qui: si aggiorna da sola coi level up.</p>'; 
 return html; 
} 

// Restituisce l'importo firmato (positivo per aggiungi, negativo per sottrai) 
function accImportoFirmato(idImporto, idOp) { 
 var imp = parseInt((document.getElementById(idImporto)||{}).value) || 0; 
 if (imp < 0) imp = 0; // il campo è sempre positivo; il segno lo dà l'operazione 
 var opEl = document.getElementById(idOp); 
 var op = opEl ? opEl.value : 'add'; 
 return op === 'sub' ? -imp : imp; 
} 

// Aggiorna i totali risultanti Jenny/HC (attuale +/- importo secondo operazione) 
function accAggiornaTotali() { 
 var b = stato.accBase || {}; 
 var jAtt = b.jenny != null ? b.jenny : 0; 
 var hAtt = b.hc != null ? b.hc : 0; 
 var jDelta = accImportoFirmato('acc-jenny-add', 'acc-jenny-op'); 
 var hDelta = accImportoFirmato('acc-hc-add', 'acc-hc-op'); 
 var jt = document.getElementById('acc-jenny-tot'); 
 var ht = document.getElementById('acc-hc-tot'); 
 // Il saldo può andare in negativo (indebitamento consentito) 
 if (jt) jt.textContent = (jAtt + jDelta).toLocaleString(); 
 if (ht) ht.textContent = (hAtt + hDelta).toLocaleString(); 
} 

// Gestione fedina/taglia in modalità accrediti (non dipende da campo-razza) 
function accAggiornaFedina() { 
 var feEl = document.getElementById('campo-fedina'); 
 var tagliaWrap = document.getElementById('campo-taglia-wrap'); 
 if (!feEl || !tagliaWrap) return; 
 // In ACCREDITI fedina e taglia sono sempre modificabili, anche per le 
 // bestie rank A/B/C: su una scheda esistente questi dati devono poter 
 // essere aggiornati (in Nuova restano fissi, qui no). 
 feEl.disabled = false; 
 tagliaWrap.style.display = feEl.value === 'Ricercato' ? '' : 'none'; 
 // La taglia E è riservata alle bestie A/B/C: option E mostrata solo per loro. 
 var isBestiaABC = isBestia && DATI_SPECIE[b.specie] && ['A','B','C'].indexOf(DATI_SPECIE[b.specie].rank) !== -1; 
 aggiornaTipoTaglia(isBestiaABC); 
} 

function costruisciStatusTaglia() { 
 var opzioni = STATUS.map(function(s){ return '<option value="'+s+'">'+s+'</option>'; }).join(''); 
 var html = ''; 
 // Status multipli (riuso lo stesso schema di modifica) 
 html += '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Status</label>'; 
 html += '<div id="lista-status">'; 
 html += '<div id="status-row-0" style="display:flex; gap:6px; margin-bottom:6px; align-items:center;">'; 
 html += '<select id="campo-status-0" style="'+STILE_INPUT+' background:#292354; flex:1;">'+opzioni+'</select>'; 
 html += '</div></div>'; 
 html += '<button onclick="aggiungiStatus()" style="background:transparent; color:#8FBEBA; border:1px dashed #3B8686; padding:5px 14px; border-radius:4px; cursor:pointer; font-family:\'Montserrat\'; font-size:0.85em; margin-top:2px;"><i class="fa-solid fa-plus"></i> Aggiungi status</button>'; 
 html += '</div>'; 
 // Fedina + Taglia 
 html += '<div id="campo-fedina-wrap" style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Fedina Penale</label>' + 
  '<select id="campo-fedina" onchange="accAggiornaFedina()" style="'+STILE_INPUT+' background:#292354;">' + 
  '<option value="Incensurato">Incensurato</option>' + 
  '<option value="Ricercato">Ricercato</option>' + 
  '</select></div>'; 
 html += '<div id="campo-taglia-wrap" style="display:none;">'; 
 // Select con tutte le classificazioni; l'option E ha un id dedicato ed 
 // è mostrata solo per le bestie A/B/C (a cui è riservata). 
 var opzioniTaglia = ''; 
 for (var ct = 0; ct < CLASSIFICAZIONI_TAGLIA.length; ct++) { 
  var clsA = CLASSIFICAZIONI_TAGLIA[ct]; 
  var idOptA = clsA === 'E' ? ' id="opt-classtaglia-E"' : ''; 
  opzioniTaglia += '<option value="'+clsA+'"'+idOptA+'>'+clsA+'</option>'; 
 } 
 html += riga2( 
  '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Classificazione Taglia</label>' + 
  '<select id="campo-classtaglia" onchange="aggiornaTaglia()" style="'+STILE_INPUT+' background:#292354;">' + opzioniTaglia + '</select></div>', 
  inputText('campo-valtaglia','Valore Taglia (Jenny)','Es. 1000') 
 ); 
 html += '</div>'; 
 return html; 
} 

// ── Progressione: calcola col motore e popola l'anteprima ──── 
function accCalcolaProgressione() { 
 if (!stato.schedaOriginale) { alert('Importa prima la scheda del PG!'); return; } 
 var expDelta = parseInt((document.getElementById('acc-exp-delta')||{}).value) || 0; 
 var base = stato.accBase || null; 
 if (!base) { alert('Dati della scheda non letti correttamente. Reimporta la scheda.'); return; } 

 var r = motoreLevelUp({ 
  livello: base.livello, exp: base.exp, expAccreditata: expDelta, 
  vita: base.vita, aura: base.aura, tenacia: base.tenacia, 
  razza: base.razza, specie: base.specie 
 }); 
 stato.progressione = r; 

 // Anteprima 
 var box = document.getElementById('prog-risultato'); 
 var freccia = ' <i class="fa-solid fa-arrow-right" style="color:#8FBEBA;"></i> '; 
 var html = '<div style="color:#CFF09E; font-weight:700; margin-bottom:10px;"><i class="fa-solid fa-arrow-up-right-dots"></i> ' + (r.levelUps > 0 ? r.levelUps + ' Level Up!' : 'Nessun level up') + '</div>'; 
 html += '<div style="color:#E2F7C4; font-size:0.95em; line-height:1.9;">'; 
 html += 'Livello: <b>'+r.livelloDa+'</b>'+freccia+'<b>'+r.livelloA+'</b><br>'; 
 html += 'EXP residua: <b>'+r.expResidua+' / '+r.expTotProssima+'</b><br>'; 
 if (r.levelUps > 0) { 
  html += 'Vita: '+r.vitaDa+freccia+'<b>'+r.vitaA+'</b> (+'+r.deltaVita+')<br>'; 
  html += 'Aura: '+r.auraDa+freccia+'<b>'+r.auraA+'</b> (+'+r.deltaAura+')<br>'; 
  html += 'Tenacia: '+r.tenaciaDa+'%'+freccia+'<b>'+r.tenaciaA+'%</b><br>'; 
  html += 'Punti da distribuire: <b style="color:#CFF09E;">'+r.puntiDaDistribuire+'</b>'; 
 } 
 html += '</div>'; 
 box.innerHTML = html; 
 box.style.display = ''; 

 // Aggiorna i valori readonly Vita/Aura nella sezione stat 
 var vEl = document.getElementById('accstat-vita'); if (vEl) vEl.textContent = r.vitaA; 
 var aEl = document.getElementById('accstat-aura'); if (aEl) aEl.textContent = r.auraA; 
 // Imposta il budget punti e aggiorna il contatore 
 accResetPuntiDistribuiti(); 
 accAggiornaContatore(); 
} 

function accResetPuntiDistribuiti() { 
 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
 for (var i = 0; i < ls.length; i++) { 
  var ex = document.getElementById('accstat-extra-'+ls[i]); 
  if (ex) ex.value = '0'; 
  var base = document.getElementById('accstat-base-'+ls[i]); 
  var disp = document.getElementById('accstat-'+ls[i]); 
  if (base && disp) disp.textContent = base.textContent; 
 } 
} 

function accModificaStat(stat, delta) { 
 var exEl = document.getElementById('accstat-extra-'+stat); 
 var baseEl = document.getElementById('accstat-base-'+stat); 
 var dispEl = document.getElementById('accstat-'+stat); 
 if (!exEl || !baseEl || !dispEl) return; 
 var extra = parseInt(exEl.value) || 0; 
 var baseV = parseInt(baseEl.textContent) || 0; 
 // Tetto: 250, o 400 se la stat è overlivellata 
 var ovEl = document.getElementById('over-'+stat); 
 var tetto = (ovEl && ovEl.checked) ? 400 : 250; 
 var nuovoVal = baseV + extra + delta; 
 // Non si scende sotto il valore importato, non si supera il tetto 
 if (delta < 0 && extra + delta < 0) return; 
 if (delta > 0 && nuovoVal > tetto) return; 
 extra += delta; 
 exEl.value = extra; 
 dispEl.textContent = baseV + extra; 
 accAggiornaContatore(); 
} 

// Overlivellamento in modalità accrediti: max 2 stat, alza il tetto a 400 
function accToggleOver(checkbox, stat) { 
 if (checkbox.checked) { 
  var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
  var attive = 0; 
  for (var i = 0; i < ls.length; i++) { 
   if (ls[i] === stat) continue; 
   var ov = document.getElementById('over-'+ls[i]); 
   if (ov && ov.checked) attive++; 
  } 
  if (attive >= 2) { 
   checkbox.checked = false; 
   alert('Puoi overlivellare al massimo 2 statistiche!'); 
   return; 
  } 
 } else { 
  // Disattivata: se il valore corrente supera 250, riportalo a 250 
  var baseEl = document.getElementById('accstat-base-'+stat); 
  var exEl   = document.getElementById('accstat-extra-'+stat); 
  var dispEl = document.getElementById('accstat-'+stat); 
  if (baseEl && exEl && dispEl) { 
   var baseV = parseInt(baseEl.textContent) || 0; 
   var tot = baseV + (parseInt(exEl.value) || 0); 
   if (tot > 250) { 
    // Riduce l'extra così che base+extra = 250 (senza scendere sotto 0) 
    var nuovoExtra = 250 - baseV; 
    if (nuovoExtra < 0) nuovoExtra = 0; 
    exEl.value = nuovoExtra; 
    dispEl.textContent = baseV + nuovoExtra; 
    accAggiornaContatore(); 
   } 
  } 
 } 
} 

function accTotDistribuito() { 
 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
 var tot = 0; 
 for (var i = 0; i < ls.length; i++) { 
  var ex = document.getElementById('accstat-extra-'+ls[i]); 
  if (ex) tot += parseInt(ex.value) || 0; 
 } 
 return tot; 
} 

function accAggiornaContatore() { 
 var budget = stato.progressione ? stato.progressione.puntiDaDistribuire : 0; 
 var distribuito = accTotDistribuito(); 
 // Punti del LEVEL UP ancora da assegnare (non va negativo: gli extra 
 // oltre il budget sono punti slegati dal level up e non contano qui). 
 var rimastiLevelUp = Math.max(0, budget - distribuito); 
 var el = document.getElementById('acc-punti-counter'); 
 if (el) { 
  if (budget === 0) { 
   el.textContent = 'Nessun punto da level up' + (distribuito > 0 ? ' (aggiunti ' + distribuito + ' punti extra)' : ''); 
   el.style.color = '#8FBEBA'; 
  } else if (rimastiLevelUp > 0) { 
   el.textContent = rimastiLevelUp + ' punti da distribuire (da level up)'; 
   el.style.color = '#F9C6C6'; 
  } else { 
   var extra = distribuito - budget; 
   el.textContent = 'Punti level up distribuiti ✓' + (extra > 0 ? ' — più ' + extra + ' punti extra' : ''); 
   el.style.color = '#A8DBA8'; 
  } 
 } 
 return rimastiLevelUp; 
} 
 
function inputText(id, label, placeholder, valore, readonly) { 
 var stile = readonly ? STILE_INPUT + ' opacity:0.55; cursor:not-allowed;' : STILE_INPUT; 
 var ro = readonly ? ' readonly' : ''; 
 return '<div style="margin-bottom:14px;">' + 
  '<label style="' + STILE_LABEL + '">' + label + '</label>' + 
  '<input type="text" id="' + id + '" placeholder="' + (placeholder||'') + '" value="' + (valore||'') + '"' + ro + ' style="' + stile + '">' + 
  '</div>'; 
} 
 
function inputDate(id, label) { 
 var mesi = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno', 
  'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']; 
 var opG = '<option value="">—</option>', opM = '<option value="">—</option>', opA = '<option value="">—</option>'; 
 for (var g = 1; g <= 31; g++) { 
  opG += '<option value="' + (g < 10 ? '0'+g : g) + '">' + g + '</option>'; 
 } 
 for (var m = 0; m < 12; m++) { 
  opM += '<option value="' + mesi[m] + '">' + mesi[m] + '</option>'; 
 } 
 for (var a = 2017; a >= 1900; a--) { 
  opA += '<option value="' + a + '">' + a + '</option>'; 
 } 
 var sel = STILE_INPUT + ' background:#292354;'; 
 return '<div style="margin-bottom:14px;">' + 
  '<label style="' + STILE_LABEL + '">' + label + '</label>' + 
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed;">' + 
  '<tr>' + 
  '<td style="width:25%; padding-right:6px; vertical-align:top;">' + 
  '<select id="' + id + '-g" style="' + sel + '">' + opG + '</select>' + 
  '<div style="color:#8FBEBA; font-size:0.75em; text-align:center; margin-top:3px;">Giorno</div>' + 
  '</td>' + 
  '<td style="width:45%; padding-left:3px; padding-right:3px; vertical-align:top;">' + 
  '<select id="' + id + '-m" style="' + sel + '">' + opM + '</select>' + 
  '<div style="color:#8FBEBA; font-size:0.75em; text-align:center; margin-top:3px;">Mese</div>' + 
  '</td>' + 
  '<td style="width:30%; padding-left:6px; vertical-align:top;">' + 
  '<select id="' + id + '-a" style="' + sel + '">' + opA + '</select>' + 
  '<div style="color:#8FBEBA; font-size:0.75em; text-align:center; margin-top:3px;">Anno</div>' + 
  '</td>' + 
  '</tr></table>' + 
  '</div>'; 
} 
 
function leggiData(id) { 
 var g = document.getElementById(id + '-g'); 
 var m = document.getElementById(id + '-m'); 
 var a = document.getElementById(id + '-a'); 
 if (!g || !m || !a) return '—'; 
 var vg = g.value, vm = m.value, va = a.value; 
 // Giorno da solo non è valido 
 if (vg && !vm && !va) return '—'; 
 if (!vg && !vm && !va) return '—'; 
 // Costruisce la stringa con solo i pezzi presenti 
 if (vg && vm && va)   return vg + ' ' + vm + ' ' + va; 
 if (vg && vm && !va)  return vg + ' ' + vm; 
 if (!vg && vm && va)  return vm + ' ' + va; 
 if (!vg && vm && !va) return vm; 
 if (!vg && !vm && va) return va; 
 return '—'; 
} 
 
function inputTextarea(id, label, placeholder, righe) { 
 righe = righe || 4; 
 return '<div style="margin-bottom:14px;">' + 
  '<label style="' + STILE_LABEL + '">' + label + '</label>' + 
  '<textarea id="' + id + '" placeholder="' + (placeholder||'') + '" rows="' + righe + '" style="' + STILE_INPUT + ' resize:vertical;"></textarea>' + 
  '</div>'; 
} 
 
function inputSelect(id, label, opzioni) { 
 var html = '<div style="margin-bottom:14px;">' + 
  '<label style="' + STILE_LABEL + '">' + label + '</label>' + 
  '<select id="' + id + '" style="' + STILE_INPUT + ' background:#292354;">'; 
 for (var i = 0; i < opzioni.length; i++) { 
  html += '<option value="' + opzioni[i] + '">' + opzioni[i] + '</option>'; 
 } 
 html += '</select></div>'; 
 return html; 
} 
 
function campoReadonly(label, valore) { 
 return '<div style="margin-bottom:14px;">' + 
  '<label style="' + STILE_LABEL + '">' + label + '</label>' + 
  '<div style="' + STILE_READONLY + '">' + valore + '</div>' + 
  '</div>'; 
} 
 
// ============================================================ 
// COSTRUTTORI SEZIONI 
// ============================================================ 
function costruisciDatiPersonali(isNuova) { 
 var html = ''; 
 html += riga2(inputText('campo-nome','Nome','Es. Gon'), inputText('campo-cognome','Cognome','Es. Freecss')); 
 html += riga2(inputText('campo-genere','Genere','Uomo / Donna / Neutro / Ecc.'), 
  '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Razza</label>' + 
  '<select id="campo-razza" onchange="aggiornaRazza('+isNuova+')" style="'+STILE_INPUT+' background:#292354;">' + 
  '<option value="Umano">Umano</option>' + 
  '<option value="Bestia Demoniaca">Bestia Demoniaca</option>' + 
  '</select></div>' 
 ); 
 // Specie (visibile solo se Bestia Demoniaca) 
 html += '<div id="campo-specie-wrap" style="display:none; margin-bottom:14px;">' + 
  '<label style="'+STILE_LABEL+'">Specie</label>' + 
  '<select id="campo-specie" onchange="aggiornaRazza('+isNuova+')" style="'+STILE_INPUT+' background:#292354;">'; 
 for (var sp = 0; sp < SPECIE_BESTIA.length; sp++) { 
  html += '<option value="'+SPECIE_BESTIA[sp]+'">'+SPECIE_BESTIA[sp]+'</option>'; 
 } 
 html += '</select></div>'; 
 // Rank e Stato di Conservazione (readonly, calcolati da specie) 
 html += '<div id="campo-rank-wrap" style="display:none;">' + 
  riga2( 
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Rank di Pericolosità</label><div id="campo-rank-val" style="'+STILE_READONLY+'">—</div></div>', 
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Stato di Conservazione</label><div id="campo-conservazione-val" style="'+STILE_READONLY+'">—</div></div>' 
  ) + 
 '</div>'; 
 // Luogo di nascita — menù unico, le opzioni vengono filtrate da aggiornaRazza 
 html += '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Luogo di nascita</label>' + 
  '<select id="campo-luogo" onchange="aggiornaStatNuova()" style="'+STILE_INPUT+' background:#292354;"></select></div>'; 
 html += inputDate('campo-datanascita', 'Data di nascita'); 
 html += riga2(inputSelect('campo-segno','Segno zodiacale', SEGNI_ZODIACALI), inputSelect('campo-segnocinese','Segno zodiacale cinese', SEGNI_CINESI)); 
 html += inputSelect('campo-allineamento','Allineamento', ALLINEAMENTI); 
 html += inputText('campo-mestiere','Mestiere','Es. Assassino'); 
 // Classe (visibile solo per Umani) 
 html += '<div id="campo-classe-wrap">' + 
  '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Classe</label>' + 
  '<select id="campo-classe" style="'+STILE_INPUT+' background:#292354;"></select></div>' + 
 '</div>'; 
 // Fedina penale 
 if (isNuova) { 
  // Umani e bestie non-A/B/C: scelta Incensurato/Ricercato (select). 
  // Bestie A/B/C: forzate a Ricercato (readonly). aggiornaFedina 
  // mostra l'uno o l'altro a seconda della razza/specie. 
  html += '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Fedina Penale</label>' + 
   '<div id="campo-fedina-val" style="'+STILE_READONLY+'; display:none;">Ricercato</div>' + 
   '<select id="campo-fedina" onchange="aggiornaFedina(true)" style="'+STILE_INPUT+' background:#292354;">' + 
   '<option value="Incensurato">Incensurato</option>' + 
   '<option value="Ricercato">Ricercato</option>' + 
   '</select></div>'; 
 } else { 
  html += '<div id="campo-fedina-wrap" style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Fedina Penale</label>' + 
   '<select id="campo-fedina" style="'+STILE_INPUT+' background:#292354;">' + 
   '<option value="Incensurato">Incensurato</option>' + 
   '<option value="Ricercato">Ricercato</option>' + 
   '</select></div>'; 
 } 
 // Taglia (visibile solo se Ricercato) 
 html += '<div id="campo-taglia-wrap" style="display:none;">'; 
 if (isNuova) { 
  // In Nuova la classificazione è fissa (readonly), ma il valore dipende 
  // dal caso: E per le bestie A/B/C (forzate), D se l'utente sceglie 
  // Ricercato manualmente (umani e bestie non-A/B/C). aggiornaFedina 
  // imposta i due valori. 
  html += riga2( 
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Classificazione Taglia</label><div id="campo-classtaglia-val" style="'+STILE_READONLY+'">D</div></div>', 
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Valore Taglia (Jenny)</label><div id="campo-valtaglia-val" style="'+STILE_READONLY+'">'+VALORE_TAGLIA_BASE['D'].toLocaleString()+'</div></div>' 
  ); 
 } else { 
  // Select con tutte le classificazioni. L'option E ha un id dedicato: 
  // è riservata alle bestie A/B/C, quindi viene mostrata solo per loro 
  // (aggiornaTipoTaglia la nasconde per gli altri). Così le bestie A/B/C 
  // possono restare su E o sceglierne un'altra, mentre umani e bestie 
  // non-A/B/C non vedono E. 
  var opzioniTaglia = ''; 
  for (var ct = 0; ct < CLASSIFICAZIONI_TAGLIA.length; ct++) { 
   var cls = CLASSIFICAZIONI_TAGLIA[ct]; 
   var idOpt = cls === 'E' ? ' id="opt-classtaglia-E"' : ''; 
   opzioniTaglia += '<option value="'+cls+'"'+idOpt+'>'+cls+'</option>'; 
  } 
  html += riga2( 
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Classificazione Taglia</label>' + 
   '<select id="campo-classtaglia" onchange="aggiornaTaglia()" style="'+STILE_INPUT+' background:#292354;">' + 
   opzioniTaglia + '</select></div>', 
   inputText('campo-valtaglia','Valore Taglia (Jenny)','Es. 1000') 
  ); 
 } 
 html += '</div>'; 
 
 if (isNuova) { 
  html += campoReadonly('Status', 'Nessuno'); 
  html += riga4( 
   campoReadonly('Livello', LIVELLO_INIZIALE), 
   campoReadonly('EXP', EXP_INIZIALE+'/'+EXP_MASSIMA), 
   campoReadonly('Jenny', JENNY_INIZIALI.toLocaleString()), 
   campoReadonly('HC', HC_INIZIALI) 
  ); 
 } else { 
  html += costruisciStatusMultipli();
  html += riga2( 
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Livello</label><input type="text" id="campo-livello" placeholder="Es. 30" oninput="aggiornaCompetenze()" style="'+STILE_INPUT+'"></div>', 
   inputText('campo-exp','EXP attuale','Es. 50') 
  ); 
  html += inputText('campo-exptot','EXP per level up','', '100', true); 
  html += riga2(inputText('campo-jenny','Jenny','Es. 10000'), inputText('campo-hc','HC','Es. 0')); 
 } 
 return html; 
} 
 
function costruisciStatusMultipli() {
 var opzioni = STATUS.map(function(s){ return '<option value="'+s+'">'+s+'</option>'; }).join('');
 var html = '<div style="margin-bottom:14px;">';
 html += '<label style="'+STILE_LABEL+'">Status</label>';
 html += '<div id="lista-status">';
 html += '<div id="status-row-0" style="display:flex; gap:6px; margin-bottom:6px; align-items:center;">';
 html += '<select id="campo-status-0" style="'+STILE_INPUT+' background:#292354; flex:1;">'+opzioni+'</select>';
 html += '</div>';
 html += '</div>';
 html += '<button onclick="aggiungiStatus()" style="background:transparent; color:#8FBEBA; border:1px dashed #3B8686; padding:5px 14px; border-radius:4px; cursor:pointer; font-family:\'Montserrat\'; font-size:0.85em; margin-top:2px;"><i class="fa-solid fa-plus"></i> Aggiungi status</button>';
 html += '</div>';
 return html;
}

function aggiungiStatus() {
 var lista = document.getElementById('lista-status');
 if (!lista) return;
 var idx = lista.children.length;
 var opzioni = STATUS.map(function(s){ return '<option value="'+s+'">'+s+'</option>'; }).join('');
 var div = document.createElement('div');
 div.id = 'status-row-' + idx;
 div.style.cssText = 'display:flex; gap:6px; margin-bottom:6px; align-items:center;';
 div.innerHTML =
  '<select id="campo-status-'+idx+'" style="'+STILE_INPUT+' background:#292354; flex:1;">'+opzioni+'</select>' +
  '<button onclick="rimuoviElemento(\'status-row-'+idx+'\')" style="background:rgba(80,0,0,0.4); color:#F9C6C6; border:1px solid #6b0b0b; padding:8px 10px; border-radius:6px; cursor:pointer; flex-shrink:0;"><i class="fa-solid fa-xmark"></i></button>';
 lista.appendChild(div);
 if (typeof bozzaSalva === 'function') bozzaSalva();
}

// ============================================================
// CROP MODAL — basato sulla logica di AvatarCropModal
// Salva x,y,w,h in % (0-100) in quattro hidden input per immagine.
// Il rendering nel template usa background-image + backgroundSize/Position.
// ============================================================
var _cropModal = {
 id: null, slotW: null, slotH: null,
 drag: null  // {mode:'move'|'resize', startX,startY, startCrop:{x,y,w,h}}
};

// ── Helper: leggi crop salvato per un id (ritorna {x,y,w,h}) ──────────────
function cropLeggi(id) {
 return {
  x: parseFloat(document.getElementById('crop-x-'+id) ? document.getElementById('crop-x-'+id).value : 0) || 0,
  y: parseFloat(document.getElementById('crop-y-'+id) ? document.getElementById('crop-y-'+id).value : 0) || 0,
  w: parseFloat(document.getElementById('crop-w-'+id) ? document.getElementById('crop-w-'+id).value : 100) || 100,
  h: parseFloat(document.getElementById('crop-h-'+id) ? document.getElementById('crop-h-'+id).value : 100) || 100
 };
}

// ── Helper: salva crop per un id ──────────────────────────────────────────
function cropScrivi(id, x, y, w, h) {
 var ex = document.getElementById('crop-x-'+id);
 var ey = document.getElementById('crop-y-'+id);
 var ew = document.getElementById('crop-w-'+id);
 var eh = document.getElementById('crop-h-'+id);
 // Conserviamo 2 decimali invece di arrotondare a intero: l'arrotondamento
 // a intero, propagato attraverso object-position (x/(100-w)), spostava
 // l'inquadratura finale di frazioni di percentuale visibili a schermo.
 function r2(v){ return Math.round(v * 100) / 100; }
 if (ex) ex.value = r2(x);
 if (ey) ey.value = r2(y);
 if (ew) ew.value = r2(w);
 if (eh) eh.value = r2(h);
 cropAggiornaBottone(id);
 // I crop sono hidden input: modificarli via JS non emette eventi, 
 // quindi salviamo esplicitamente. Scrittura IMMEDIATA (non debounced) 
 // perché è un'azione discreta: se l'utente esce subito dopo aver 
 // confermato l'inquadratura, un salvataggio ritardato la perderebbe. 
 if (typeof bozzaScriviOra === 'function') bozzaScriviOra();
}

// ── Aggiorna il bottone "Modifica inquadratura" con una preview inline ────
function cropAggiornaBottone(id) {
 var btn = document.getElementById('crop-btn-'+id);
 if (!btn) return;
 var urlEl = (document.getElementById('campo-img-'+id.replace('img-','')) ||
            document.getElementById({ 'img-laterale':'campo-img-laterale','img-dati':'campo-img-dati','img-info':'campo-img-info','img-info-a':'campo-img-info-a','img-info-b':'campo-img-info-b','img-nen':'nen-img' }[id]));
 if (!urlEl) return;
 var url = urlEl.value ? urlEl.value.trim() : '';

 // Reset del crop quando l'utente cambia immagine: se l'URL corrente è
 // diverso da quello per cui era stato calcolato il crop salvato, azzeriamo
 // i valori così alla riapertura del modal viene ricalcolato il rettangolo
 // con l'aspect ratio giusto per la NUOVA immagine (che può avere proporzioni
 // molto diverse). Senza questo, il riquadro restava tarato sull'immagine
 // precedente e non rifletteva l'inquadratura reale.
 var lastUrl = btn.getAttribute('data-crop-url');
 if (lastUrl !== null && lastUrl !== url) {
  var ex = document.getElementById('crop-x-'+id);
  var ey = document.getElementById('crop-y-'+id);
  var ew = document.getElementById('crop-w-'+id);
  var eh = document.getElementById('crop-h-'+id);
  if (ex) ex.value = 0;
  if (ey) ey.value = 0;
  if (ew) ew.value = 100;
  if (eh) eh.value = 100;
 }
 // Memorizza l'URL corrente come quello associato al crop attuale.
 btn.setAttribute('data-crop-url', url);

 var c = cropLeggi(id);
 var thumb = btn.querySelector('.crop-btn-thumb');
 if (thumb && url) {
  var bgSize = (100 / c.w * 100).toFixed(1) + '%';
  var bgX = c.w < 100 ? ((c.x / (100 - c.w)) * 100).toFixed(1) : '0';
  var bgY = c.h < 100 ? ((c.y / (100 - c.h)) * 100).toFixed(1) : '0';
  thumb.style.backgroundImage = 'url('+url+')';
  thumb.style.backgroundSize = bgSize;
  thumb.style.backgroundPosition = bgX+'% '+bgY+'%';
  thumb.style.display = 'block';
 } else if (thumb) {
  thumb.style.display = 'none';
 }
}

// ── Genera HTML del blocco campo-immagine con bottone crop ────────────────
function campoCropHTML(campoId, label, cropId, slotW, slotH) {
 var MAP_CAMPO = {
  'img-laterale':'campo-img-laterale','img-dati':'campo-img-dati',
  'img-info':'campo-img-info','img-info-a':'campo-img-info-a','img-info-b':'campo-img-info-b',
  'img-nen':'nen-img'
 };
 var html = '<div style="margin-bottom:14px;">';
 html += '<label style="'+STILE_LABEL+'">'+label+'</label>';
 html += '<input type="text" id="'+campoId+'" placeholder="https://..." '
  + 'oninput="cropAggiornaBottone(\''+cropId+'\')" style="'+STILE_INPUT+'">';
 // Bottone per aprire la modal
 html += '<div style="margin-top:8px; display:flex; align-items:center; gap:10px;">';
 html += '<button type="button" id="crop-btn-'+cropId+'" '
  + 'onclick="cropApriModal(\''+cropId+'\','+slotW+','+slotH+')" '
  + 'style="background:#292354; color:#CFF09E; border:1px solid #3B8686; '
  + 'padding:7px 14px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; '
  + 'font-size:0.85em; display:flex; align-items:center; gap:8px; transition:border-color 0.2s;">'
  + '<i class="fa-solid fa-scissors"></i> Scegli inquadratura'
  + '<span class="crop-btn-thumb" style="display:none; width:40px; height:24px; '
  + 'border-radius:3px; border:1px solid #3B8686; background-size:cover; flex-shrink:0;"></span>'
  + '</button>';
 html += '<span style="color:#8FBEBA; font-size:0.75em; font-style:italic;">Slot: '+slotW+'×'+slotH+'px</span>';
 html += '</div>';
 // 4 hidden input: x, y, w, h (percentuali 0-100)
 html += '<input type="hidden" id="crop-x-'+cropId+'" value="0">';
 html += '<input type="hidden" id="crop-y-'+cropId+'" value="0">';
 html += '<input type="hidden" id="crop-w-'+cropId+'" value="100">';
 html += '<input type="hidden" id="crop-h-'+cropId+'" value="100">';
 html += '</div>';
 return html;
}

// ── Apre la modal di crop ─────────────────────────────────────────────────
function cropApriModal(id, slotW, slotH) {
 var MAP_CAMPO = {
  'img-laterale':'campo-img-laterale','img-dati':'campo-img-dati',
  'img-info':'campo-img-info','img-info-a':'campo-img-info-a','img-info-b':'campo-img-info-b',
  'img-nen':'nen-img'
 };
 var campoEl = document.getElementById(MAP_CAMPO[id]);
 var url = campoEl ? campoEl.value.trim() : '';
 if (!url) {
  alert('Inserisci prima un URL immagine!');
  return;
 }
 _cropModal.id = id;
 _cropModal.slotW = slotW;
 _cropModal.slotH = slotH;
 _cropModal.drag = null;

 var saved = cropLeggi(id);
 _cropModal.crop = { x: saved.x, y: saved.y, w: saved.w, h: saved.h };

 // Crea la modal nel body
 var existing = document.getElementById('crop-modal-overlay');
 if (existing) existing.parentNode.removeChild(existing);

 var overlay = document.createElement('div');
 overlay.id = 'crop-modal-overlay';
 overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:9999;'
  + 'display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;';

 overlay.innerHTML =
  '<div id="crop-modal-box" style="background:#0B486B;border:2px solid #3B8686;border-radius:14px;'
  + 'padding:24px;width:100%;max-width:600px;max-height:90vh;overflow-y:auto;'
  + 'display:flex;flex-direction:column;gap:16px;font-family:\'Montserrat\';">'

  // Header
  + '<div style="display:flex;justify-content:space-between;align-items:center;width:100%;">'
  + '<span style="font-size:1.15em;font-weight:700;color:#CFF09E;"><i class="fa-solid fa-scissors"></i> Scegli inquadratura</span>'
  + '<button onclick="cropChiudiModal()" style="background:none;border:none;color:#8FBEBA;'
  + 'font-size:1.2em;cursor:pointer;padding:4px 8px;border-radius:4px;">✕</button>'
  + '</div>'

  // Hint
  + '<p style="margin:0;font-size:0.82em;color:#8FBEBA;">'
  + 'Trascina il riquadro per spostarlo'
  + '</p>'

  // Canvas
  + '<div id="crop-canvas" style="position:relative;width:100%;user-select:none;'
  + '-webkit-user-select:none;border-radius:8px;overflow:hidden;background:#111;cursor:grab;">'
  + '<img id="crop-modal-img" src="'+url+'" '
  + 'style="display:block;width:100%;height:auto;max-height:400px;object-fit:contain;pointer-events:none;" '
  + 'draggable="false" onload="cropModalImgCaricata()" '
  + 'onerror="document.getElementById(\'crop-canvas-err\').style.display=\'\'">'
  + '<div id="crop-canvas-err" style="display:none;padding:20px;color:#F9C6C6;font-size:0.9em;">'
  + '⚠️ Immagine non caricabile. Controlla il URL.</div>'
  + '<div id="crop-darken" style="position:absolute;inset:0;background:rgba(0,0,0,0.5);pointer-events:none;display:none;"></div>'
  // Crop box
  + '<div id="crop-box" style="display:none;position:absolute;box-sizing:border-box;cursor:grab;'
  + 'box-shadow:0 0 0 9999px rgba(0,0,0,0.52),inset 0 0 0 2px #CFF09E;">'
  // Griglia 3x3 interna
  + '<div style="position:absolute;inset:0;display:grid;grid-template-columns:repeat(3,1fr);'
  + 'grid-template-rows:repeat(3,1fr);pointer-events:none;">'
  + '<div style="border:1px solid rgba(255,255,255,0.12);"></div><div style="border:1px solid rgba(255,255,255,0.12);"></div>'
  + '<div style="border:1px solid rgba(255,255,255,0.12);"></div><div style="border:1px solid rgba(255,255,255,0.12);"></div>'
  + '<div style="border:1px solid rgba(255,255,255,0.12);"></div><div style="border:1px solid rgba(255,255,255,0.12);"></div>'
  + '<div style="border:1px solid rgba(255,255,255,0.12);"></div><div style="border:1px solid rgba(255,255,255,0.12);"></div>'
  + '<div style="border:1px solid rgba(255,255,255,0.12);"></div>'
  + '</div>'
  // Handle resize ↘ — rimosso, resize non supportato con object-fit
  + '</div>'
  + '</div>'

  // Footer
  + '<div style="display:flex;justify-content:flex-end;gap:12px;padding-top:12px;border-top:1px solid #3B8686;">'
  + '<button onclick="cropChiudiModal()" style="background:#292354;color:#8FBEBA;border:1px solid #3B8686;'
  + 'padding:9px 22px;border-radius:6px;cursor:pointer;font-family:\'Montserrat\';">Annulla</button>'
  + '<button onclick="cropConferma()" style="background:linear-gradient(135deg,#A8DBA8,#79BD9A);'
  + 'color:#1a2e1a;border:none;padding:9px 22px;border-radius:6px;cursor:pointer;'
  + 'font-family:\'Montserrat\';font-weight:700;">Conferma</button>'
  + '</div>'
  + '</div>';

 document.body.appendChild(overlay);

 // Chiudi cliccando fuori
 overlay.addEventListener('mousedown', function(e) {
  if (e.target === overlay) cropChiudiModal();
 });

 // Bind drag sul canvas (dopo che la modal è nel DOM)
 cropModalBindDrag();
}

function cropModalImgCaricata() {
 // Usa setTimeout per assicurarsi che il browser abbia fatto il layout
 setTimeout(function() {
  var img = document.getElementById('crop-modal-img');
  var canvas = document.getElementById('crop-canvas');
  var box = document.getElementById('crop-box');
  var darken = document.getElementById('crop-darken');
  if (!img || !canvas || !box) return;

  darken.style.display = '';
  box.style.display = '';

  var natW = img.naturalWidth;
  var natH = img.naturalHeight;
  if (!natW || !natH) return;

  // Larghezza disponibile nel canvas (il div è width:100% del box modale).
  // Questa è affidabile già al primo layout, a differenza dell'altezza che
  // dipende dall'immagine e può non essere ancora stabile qui dentro.
  var canvasW = canvas.clientWidth || canvas.offsetWidth || 600;

  // Dimensioni REALI dell'immagine renderizzata, calcolate da naturalW/H.
  // Regola CSS dell'img: width:100%, height:auto, max-height:400px.
  // Con width:100% l'immagine sarebbe larga canvasW e alta natH*(canvasW/natW).
  // Se quell'altezza supera 400 (immagini verticali/quadrate) scatta
  // max-height e l'immagine si rimpicciolisce mantenendo le proporzioni.
  var MAXH = 400;
  var dispW, dispH;
  var hFull = natH * (canvasW / natW);
  if (hFull <= MAXH) {
   // Caso orizzontale/panoramica (e molte quadrate): comanda la larghezza.
   dispW = canvasW;
   dispH = hFull;
  } else {
   // Caso verticale: comanda max-height, la larghezza si riduce.
   dispH = MAXH;
   dispW = natW * (MAXH / natH);
  }

  // Il canvas viene fatto combaciare ESATTAMENTE con l'immagine, così il box
  // di crop (posizionato in % del canvas) si allinea all'immagine senza
  // offset di centratura. dispH e canvH derivano ora dalla STESSA fonte
  // (naturalW/H): non possono più divergere. Questa divergenza tra altezza
  // teorica (400) e altezza reale del canvas era la causa del riquadro
  // sproporzionato con immagini orizzontali.
  canvas.style.width  = dispW + 'px';
  var canvW = dispW;
  var canvH = dispH;
  var ox = 0;
  var oy = 0;

  var slotW  = _cropModal.slotW;
  var slotH  = _cropModal.slotH;
  var slotAR = slotW / slotH;
  var saved  = _cropModal.crop;
  var cx, cy, cw, ch;

  if (saved.w === 100 && saved.h === 100 && saved.x === 0 && saved.y === 0) {
   // Prima apertura: rettangolo centrato con l'aspect ratio della slot
   var imgAR = dispW / dispH;
   var rectPxW, rectPxH;
   if (slotAR >= imgAR) {
    rectPxW = dispW;
    rectPxH = Math.min(dispH, rectPxW / slotAR);
   } else {
    rectPxH = dispH;
    rectPxW = Math.min(dispW, rectPxH * slotAR);
   }
   cw = rectPxW / canvW * 100;
   ch = rectPxH / canvH * 100;
   cx = (ox + (dispW - rectPxW) / 2) / canvW * 100;
   cy = (oy + (dispH - rectPxH) / 2) / canvH * 100;
  } else {
   // Crop salvato in % immagine → converti in % canvas
   cx = (ox + saved.x / 100 * dispW) / canvW * 100;
   cy = (oy + saved.y / 100 * dispH) / canvH * 100;
   cw = saved.w / 100 * dispW / canvW * 100;
   ch = saved.h / 100 * dispH / canvH * 100;
  }

  _cropModal.crop = { x: cx, y: cy, w: cw, h: ch };
  _cropModal.dispW = dispW;
  _cropModal.dispH = dispH;
  _cropModal.canvW = canvW;
  _cropModal.canvH = canvH;
  _cropModal.ox    = ox;
  _cropModal.oy    = oy;

  cropModalAggiornaBox();
 }, 0);
}

function cropModalAggiornaBox() {
 var box = document.getElementById('crop-box');
 var img = document.getElementById('crop-modal-img');
 if (!box || !img) return;
 var c = _cropModal.crop;
 box.style.left   = c.x + '%';
 box.style.top    = c.y + '%';
 box.style.width  = c.w + '%';
 box.style.height = c.h + '%';
}

function cropModalBindDrag() {
 var canvas = document.getElementById('crop-canvas');
 var box    = document.getElementById('crop-box');
 if (!canvas || !box) return;

 function getRelPct(e) {
  var r = canvas.getBoundingClientRect();
  var clientX = e.touches ? e.touches[0].clientX : e.clientX;
  var clientY = e.touches ? e.touches[0].clientY : e.clientY;
  return {
   x: ((clientX - r.left) / r.width) * 100,
   y: ((clientY - r.top) / r.height) * 100
  };
 }

 function onBoxDown(e) {
  e.preventDefault(); e.stopPropagation();
  var p = getRelPct(e);
  _cropModal.drag = { startX:p.x, startY:p.y, startCrop:{ x:_cropModal.crop.x, y:_cropModal.crop.y, w:_cropModal.crop.w, h:_cropModal.crop.h } };
  box.style.cursor = 'grabbing';
 }
 function onMove(e) {
  var d = _cropModal.drag;
  if (!d) return;
  e.preventDefault();
  var p = getRelPct(e);
  var sc = d.startCrop;

  // Bounds dell'immagine nel canvas, calcolati una volta in cropModalImgCaricata
  var canvW = _cropModal.canvW || canvas.offsetWidth  || 1;
  var canvH = _cropModal.canvH || canvas.offsetHeight || 1;
  var dispW = _cropModal.dispW || canvW;
  var dispH = _cropModal.dispH || canvH;
  var ox    = _cropModal.ox    != null ? _cropModal.ox : (canvW - dispW) / 2;
  var oy    = _cropModal.oy    != null ? _cropModal.oy : (canvH - dispH) / 2;
  var imgMinX = ox / canvW * 100;
  var imgMinY = oy / canvH * 100;
  var imgMaxX = (ox + dispW) / canvW * 100;
  var imgMaxY = (oy + dispH) / canvH * 100;

  var newX = sc.x + (p.x - d.startX);
  var newY = sc.y + (p.y - d.startY);
  _cropModal.crop.x = Math.max(imgMinX, Math.min(imgMaxX - sc.w, newX));
  _cropModal.crop.y = Math.max(imgMinY, Math.min(imgMaxY - sc.h, newY));
  cropModalAggiornaBox();
 }
 function onUp() {
  _cropModal.drag = null;
  if (box) box.style.cursor = 'grab';
 }

 // I listener sul box sono legati al box corrente (ricreato a ogni apertura),
 // quindi vanno riagganciati ogni volta.
 box.addEventListener('mousedown',   onBoxDown, {passive:false});
 box.addEventListener('touchstart',  onBoxDown, {passive:false});

 // I listener globali su document, invece, vanno agganciati UNA VOLTA SOLA,
 // altrimenti si accumulano a ogni apertura della modal. Deleghiamo a
 // funzioni stabili su _cropModal che richiamano gli handler correnti.
 _cropModal._onMove = onMove;
 _cropModal._onUp   = onUp;
 if (!_cropModal._globalBound) {
  document.addEventListener('mousemove', function(e){ if (_cropModal._onMove) _cropModal._onMove(e); }, {passive:false});
  document.addEventListener('touchmove', function(e){ if (_cropModal._onMove) _cropModal._onMove(e); }, {passive:false});
  document.addEventListener('mouseup',   function(e){ if (_cropModal._onUp)   _cropModal._onUp(e); });
  document.addEventListener('touchend',  function(e){ if (_cropModal._onUp)   _cropModal._onUp(e); });
  _cropModal._globalBound = true;
 }
}

function cropConferma() {
 var c = _cropModal.crop;
 // Converti da coordinate % del canvas a coordinate % dell'immagine
 var canvW = _cropModal.canvW || 1;
 var canvH = _cropModal.canvH || 1;
 var dispW = _cropModal.dispW || canvW;
 var dispH = _cropModal.dispH || canvH;
 var ox    = _cropModal.ox    != null ? _cropModal.ox : 0;
 var oy    = _cropModal.oy    != null ? _cropModal.oy : 0;
 // canvas% → px_canvas → px_img → img%
 var x = ((c.x / 100 * canvW) - ox) / dispW * 100;
 var y = ((c.y / 100 * canvH) - oy) / dispH * 100;
 var w = (c.w / 100 * canvW) / dispW * 100;
 var h = (c.h / 100 * canvH) / dispH * 100;
 x = Math.max(0, Math.min(100 - w, x));
 y = Math.max(0, Math.min(100 - h, y));
 w = Math.min(100, w);
 h = Math.min(100, h);
 cropScrivi(_cropModal.id, x, y, w, h);
 cropChiudiModal();
}

function cropChiudiModal() {
 var overlay = document.getElementById('crop-modal-overlay');
 if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
 _cropModal.drag = null;
}

function costruisciImmagini() {
 var html = campoCropHTML('campo-img-laterale',
  'Immagine Header (URL) — dimensioni ideali: 664×184px',
  'img-laterale', 664, 184);

 html += campoCropHTML('campo-img-dati',
  'Immagine slide Dati (URL) — dimensioni ideali: 214×429px',
  'img-dati', 214, 429);

 html += '<div style="margin-bottom:14px;">';
 html += '<label style="'+STILE_LABEL+'">Immagine slide Info</label>';
 html += '<div style="display:flex; gap:12px; margin-bottom:8px;">';
 html += '<label style="display:flex; align-items:center; gap:6px; color:#8FBEBA; font-size:0.85em; cursor:pointer;"><input type="radio" name="img-info-modo" value="1" checked onchange="aggiornaInputImgInfo()"> Una immagine</label>';
 html += '<label style="display:flex; align-items:center; gap:6px; color:#8FBEBA; font-size:0.85em; cursor:pointer;"><input type="radio" name="img-info-modo" value="2" onchange="aggiornaInputImgInfo()"> Due immagini</label>';
 html += '</div>';

 html += '<div id="img-info-wrap-1">';
 html += campoCropHTML('campo-img-info',
  'URL immagine — dimensioni ideali: 154×429px',
  'img-info', 154, 429);
 html += '</div>';

 html += '<div id="img-info-wrap-2" style="display:none;">';
 html += campoCropHTML('campo-img-info-a',
  'URL immagine 1 — dimensioni ideali: 154×204px',
  'img-info-a', 154, 204);
 html += campoCropHTML('campo-img-info-b',
  'URL immagine 2 — dimensioni ideali: 154×204px',
  'img-info-b', 154, 204);
 html += '</div>';

 html += '</div>';
 return html;
}

function aggiornaInputImgInfo() { 
 var modo = document['querySelector']('input[name="img-info-modo"]:checked'); 
 var v = modo ? modo.value : '1'; 
 document.getElementById('img-info-wrap-1').style.display = v === '1' ? '' : 'none'; 
 document.getElementById('img-info-wrap-2').style.display = v === '2' ? '' : 'none'; 
} 
 
function costruisciInfo() { 
 var html = riga3( 
  inputText('campo-agg1','Aggettivo 1','Es. Coraggioso'), 
  inputText('campo-agg2','Aggettivo 2','Es. Determinato'), 
  inputText('campo-agg3','Aggettivo 3','Es. Creativo') 
 ); 
 html += inputText('campo-citazione','Citazione del personaggio','Citazione...'); 
 html += inputTextarea('campo-aspetto','Descrizione','Descrivi aspetto fisico e carattere del tuo personaggio...', 5); 
 html += inputTextarea('campo-background','Background','Racconta la storia del tuo personaggio...', 6); 
 return html; 
} 
 
function costruisciStatistiche(isNuova) { 
 var html = ''; 
 var nomiStat = ['Forza','Resistenza','Velocità','Riflessi','Destrezza','Mira','Intelligenza','Carisma','Istinto','Fortuna']; 
 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
 
 if (isNuova) { 
  html += '<p style="color:#8FBEBA; font-size:0.9em; margin-bottom:8px; font-style:italic;">Statistiche di base calcolate da luogo e classe. Puoi ridistribuire <b>25 punti extra</b> (multipli di 5) a piacimento, escluse Vita e Aura.</p>'; 
  html += '<div style="background:#1a2e45; border:1px solid #3B8686; border-radius:8px; padding:10px 16px; margin-bottom:14px; display:flex; align-items:center; gap:10px;">'; 
  html += '<i class="fa-solid fa-coins" style="color:#CFF09E;"></i> '; 
  html += '<span id="punti-extra-counter" style="color:#8FBEBA; font-size:0.95em; font-weight:600;">25 punti rimanenti</span>'; 
  html += '</div>'; 
  var r1 = [], r2 = []; 
  for (var i = 0; i < 5; i++) { 
   r1.push( 
    '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:8px 4px;">' + 
    '<div style="color:#8FBEBA; font-size:0.75em; margin-bottom:4px;">'+nomiStat[i]+'</div>' + 
    '<div id="stat-'+ls[i]+'" style="color:#CFF09E; font-size:1.2em; font-weight:700;">5</div>' + 
    '<span style="display:none;" id="stat-base-'+ls[i]+'">5</span>' + 
    '<input type="hidden" id="stat-extra-'+ls[i]+'" value="0">' + 
    '<div style="display:flex; justify-content:center; gap:4px; margin-top:5px;">' + 
    '<button onclick="modificaStatExtra(\''+ls[i]+'\',-5)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">−</button>' + 
    '<button onclick="modificaStatExtra(\''+ls[i]+'\',5)"  style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">+</button>' + 
    '</div></div>' 
   ); 
  } 
  for (var j = 5; j < 10; j++) { 
   r2.push( 
    '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:8px 4px;">' + 
    '<div style="color:#8FBEBA; font-size:0.75em; margin-bottom:4px;">'+nomiStat[j]+'</div>' + 
    '<div id="stat-'+ls[j]+'" style="color:#CFF09E; font-size:1.2em; font-weight:700;">5</div>' + 
    '<span style="display:none;" id="stat-base-'+ls[j]+'">5</span>' + 
    '<input type="hidden" id="stat-extra-'+ls[j]+'" value="0">' + 
    '<div style="display:flex; justify-content:center; gap:4px; margin-top:5px;">' + 
    '<button onclick="modificaStatExtra(\''+ls[j]+'\',-5)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">−</button>' + 
    '<button onclick="modificaStatExtra(\''+ls[j]+'\',5)"  style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">+</button>' + 
    '</div></div>' 
   ); 
  } 
  html += rigaStat5(r1); 
  html += rigaStat5(r2); 
  html += riga2( 
   '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:10px;"><div style="color:#8FBEBA; font-size:0.78em; margin-bottom:4px;">Vita</div><div id="stat-vita" style="color:#CFF09E; font-size:1.3em; font-weight:700;">300</div></div>', 
   '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:10px;"><div style="color:#8FBEBA; font-size:0.78em; margin-bottom:4px;">Aura</div><div id="stat-aura" style="color:#CFF09E; font-size:1.3em; font-weight:700;">500</div></div>' 
  ); 
 } else { 
  html += '<p style="color:#8FBEBA; font-size:0.85em; margin-bottom:15px; font-style:italic;">Multipli di 5 (Vita e Aura: multipli di 100). Max stat normali: 250 (400 se over), Vita: 3000, Aura: 5000.</p>'; 
  var r3 = [], r4 = []; 
  for (var k = 0; k < 5; k++) { 
   r3.push('<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:8px 4px;">' + 
    '<div style="color:#8FBEBA; font-size:0.75em; margin-bottom:4px;">' + nomiStat[k] + '</div>' + 
    '<input type="number" id="stat-' + ls[k] + '" value="5" min="5" max="400" step="5" onchange="validaStat(this,false)" style="width:60px; background:transparent; border:none; color:#CFF09E; font-size:1.2em; font-weight:700; text-align:center; padding:2px 0;">' + 
    '<div style="display:flex; justify-content:center; gap:4px; margin-top:5px;">' + 
    '<button onclick="stepStat(\'' + ls[k] + '\',-5)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">&#8722;</button>' + 
    '<button onclick="stepStat(\'' + ls[k] + '\',5)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">+</button>' + 
    '</div>' + 
    '<label style="display:block; color:#8FBEBA; font-size:0.72em; margin-top:5px; cursor:pointer;"><input type="checkbox" id="over-' + ls[k] + '" onchange="toggleOver(this,\'' + ls[k] + '\')"> over</label></div>'); 
  } 
  for (var m2 = 5; m2 < 10; m2++) { 
   r4.push('<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:8px 4px;">' + 
    '<div style="color:#8FBEBA; font-size:0.75em; margin-bottom:4px;">' + nomiStat[m2] + '</div>' + 
    '<input type="number" id="stat-' + ls[m2] + '" value="5" min="5" max="400" step="5" onchange="validaStat(this,false)" style="width:60px; background:transparent; border:none; color:#CFF09E; font-size:1.2em; font-weight:700; text-align:center; padding:2px 0;">' + 
    '<div style="display:flex; justify-content:center; gap:4px; margin-top:5px;">' + 
    '<button onclick="stepStat(\'' + ls[m2] + '\',-5)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">&#8722;</button>' + 
    '<button onclick="stepStat(\'' + ls[m2] + '\',5)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">+</button>' + 
    '</div>' + 
    '<label style="display:block; color:#8FBEBA; font-size:0.72em; margin-top:5px; cursor:pointer;"><input type="checkbox" id="over-' + ls[m2] + '" onchange="toggleOver(this,\'' + ls[m2] + '\')"> over</label></div>'); 
  } 
  html += rigaStat5(r3); 
  html += rigaStat5(r4); 
  html += riga2( 
   '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:8px 4px;">' + 
   '<div style="color:#8FBEBA; font-size:0.75em; margin-bottom:4px;">Vita</div>' + 
   '<input type="number" id="stat-vita" value="300" min="300" max="3000" step="100" onchange="validaStat(this,true)" style="width:70px; background:transparent; border:none; color:#CFF09E; font-size:1.2em; font-weight:700; text-align:center; padding:2px 0;">' + 
   '<div style="display:flex; justify-content:center; gap:4px; margin-top:5px;">' + 
   '<button onclick="stepStat(\'vita\',-100)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">&#8722;</button>' + 
   '<button onclick="stepStat(\'vita\',100)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">+</button>' + 
   '</div></div>', 
   '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:8px 4px;">' + 
   '<div style="color:#8FBEBA; font-size:0.75em; margin-bottom:4px;">Aura</div>' + 
   '<input type="number" id="stat-aura" value="500" min="500" max="5000" step="100" onchange="validaStat(this,true)" style="width:70px; background:transparent; border:none; color:#CFF09E; font-size:1.2em; font-weight:700; text-align:center; padding:2px 0;">' + 
   '<div style="display:flex; justify-content:center; gap:4px; margin-top:5px;">' + 
   '<button onclick="stepStat(\'aura\',-100)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">&#8722;</button>' + 
   '<button onclick="stepStat(\'aura\',100)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">+</button>' + 
   '</div></div>' 
  ); 
  html += '<div style="margin-top:22px; border-top:1px solid #3B8686; padding-top:18px;">'; 
  html += '<h4 style="color:#CFF09E; font-family:\'Montserrat\'; margin-bottom:14px;"><i class="fa-solid fa-puzzle-piece"></i> Competenze</h4>'; 
  for (var n = 0; n < 5; n++) { 
   html += '<div id="comp-slot-'+n+'" style="background:#292354; border:1px solid #3B8686; border-radius:8px; padding:14px; margin-bottom:10px;">'; 
   html += '<div style="color:#8FBEBA; font-size:0.82em; margin-bottom:10px;" id="comp-slot-label-'+n+'"><i class="fa-solid fa-lock"></i> Slot ' + (n+1) + ' — sbloccabile al Lv. ' + SBLOCCO_COMPETENZE[n] + '</div>'; 
   html += '<div id="comp-slot-fields-'+n+'">'; 
   html += inputText('comp-nome-'+n,'Nome competenza','Es. Spadaccino Provetto'); 
   html += riga2(inputText('comp-lv-'+n,'Livello','Es. 1'), inputText('comp-oggetto-'+n,'Oggetto','Es. Spada')); 
   html += inputTextarea('comp-desc-'+n,'Descrizione','Descrizione della competenza...', 2); 
   html += '</div>'; 
   html += '</div>'; 
  } 
  html += '</div>'; 
 } 
 return html; 
} 
 
function costruisciNen(isNuova) {
 if (isNuova) {
  var html = '<p style="color:#8FBEBA; font-size:0.9em; margin-bottom:15px; font-style:italic;">L\'Hatsu viene sbloccato in seguito. Nen e Tenacia sono fissi.</p>';
  html += riga2(campoReadonly('Nen', NEN_INIZIALE+'%'), campoReadonly('Tenacia', TENACIA_INIZIALE+'%'));
  html += campoReadonly('Hatsu', '<i class="mdi mdi-fire"></i> Non ancora sbloccato');
  return html;
 }

 // Import Hatsu approvato: riempie SOLO i dati Nen (non le percentuali). 
 // Disponibile solo in Modifica (isNuova è già stato gestito sopra). 
 var html = '<div style="background:#1a2e45; border:1px dashed #CFF09E; border-radius:8px; padding:14px; margin-bottom:18px;">'; 
 html += '<div style="color:#CFF09E; font-size:0.92em; font-weight:600; margin-bottom:8px;"><i class="fa-solid fa-file-import"></i> Importa Hatsu approvato</div>'; 
 html += '<p style="color:#8FBEBA; font-size:0.82em; margin:0 0 10px; font-style:italic;">Incolla qui il codice di un Hatsu gi&agrave; approvato dallo staff: verranno compilati solo i dati di Abilit&agrave; Nen qui sotto (tipo, potere, profili, tecniche, immagine). Nen % e Tenacia % restano invariati.</p>'; 
 html += '<textarea id="campo-importa-hatsu" placeholder="Incolla qui il codice HTML della scheda Hatsu..." style="' + STILE_INPUT + ' min-height:80px; resize:vertical;"></textarea>'; 
 html += '<button type="button" onclick="importaHatsu()" style="margin-top:10px; background:#292354; color:#CFF09E; border:1px solid #CFF09E; padding:9px 20px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; font-size:0.9em;"><i class="fa-solid fa-file-import"></i> Importa Hatsu</button>'; 
 html += '</div>'; 

 html += inputSelect('campo-hatsu','Tipo Hatsu', TIPI_HATSU);
 html += riga2(inputText('campo-nen','Nen (%)','Es. 95'), inputText('campo-tenacia','Tenacia (%)','Es. 75'));

 // Toggle modalità Hatsu
 html += '<div style="margin-top:16px; border-top:1px solid #3B8686; padding-top:16px; margin-bottom:16px;">';
 html += '<label style="display:block; color:#CFF09E; font-size:0.9em; margin-bottom:8px; font-family:\'Montserrat\';">Modalità Hatsu</label>';
 html += '<div style="display:flex; gap:10px;">';
 html += '<label style="cursor:pointer; display:flex; align-items:center; gap:6px; background:#292354; border:1px solid #3B8686; border-radius:6px; padding:8px 16px; color:#CFF09E; font-size:0.88em;"><input type="radio" name="nen-modalita" value="completo" checked onchange="aggiornaModoNen()"> Completo</label>';
 html += '<label style="cursor:pointer; display:flex; align-items:center; gap:6px; background:#292354; border:1px solid #3B8686; border-radius:6px; padding:8px 16px; color:#CFF09E; font-size:0.88em;"><input type="radio" name="nen-modalita" value="speedduel" onchange="aggiornaModoNen()"> Speed Duel</label>';
 html += '</div></div>';

 // Box 1: Potere Nen
 html += '<div style="margin-top:16px; border-top:1px solid #3B8686; padding-top:16px;">';
 html += '<h4 style="color:#CFF09E; font-family:\'Montserrat\'; margin-bottom:12px;"><i class="mdi mdi-fire"></i> Potere Nen</h4>';
 html += '<p style="color:#8FBEBA; font-size:0.85em; margin-bottom:12px; font-style:italic;">Il titolo del box sarà il tipo di Hatsu selezionato sopra.</p>';
 html += inputText('nen-nomepotere', 'Nome potere', 'Es. Filo d\'Ambra');
 html += inputTextarea('nen-descrizione', 'Descrizione', 'Descrizione del potere...', 3);
 html += inputTextarea('nen-funzionamento', 'Funzionamento e regole', 'Come funziona il potere, le regole...', 3);
 html += inputTextarea('nen-condizioni', 'Condizioni e restrizioni', 'Eventuali condizioni o restrizioni...', 2);
 html += inputTextarea('nen-costo', 'Costo', 'Es. 40 Aura per fase', 1);
 html += '</div>';

 // Immagine nen
 html += '<div style="margin-top:16px; border-top:1px solid #3B8686; padding-top:16px;">';
 html += '<h4 style="color:#CFF09E; font-family:\'Montserrat\'; margin-bottom:12px;"><i class="fa-solid fa-image"></i> Immagine Nen</h4>';
 html += campoCropHTML('nen-img', 'URL immagine — dimensioni ideali: 664×200px', 'img-nen', 664, 200);
 html += '</div>';

 // Box 2: Profili (nascosto in Speed Duel)
 html += '<div id="nen-sezione-profili" style="margin-top:16px; border-top:1px solid #3B8686; padding-top:16px;">';
 html += '<h4 style="color:#CFF09E; font-family:\'Montserrat\'; margin-bottom:12px;"><i class="fa-solid fa-layer-group"></i> Profili</h4>';
 for (var p = 1; p <= 4; p++) {
  html += '<div style="background:#1a2e45; border:1px solid #3B8686; border-radius:8px; padding:14px; margin-bottom:12px;">';
  html += '<div style="color:#CFF09E; font-size:0.9em; font-weight:600; margin-bottom:10px;">Profilo ' + p + '</div>';
  html += inputText('profilo-'+p+'-nome', 'Nome profilo', 'Es. Filo Singolo');
  html += inputTextarea('profilo-'+p+'-desc', 'Descrizione', 'Descrizione del profilo...', 2);
  html += inputTextarea('profilo-'+p+'-bonus', 'Effetti e/o Bonus', 'Descrizione degli effetti e/o bonus...', 2);
  html += inputTextarea('profilo-'+p+'-malus', 'Eventuali Condizioni e/o Restrizioni e/o Malus', 'Descrizione...', 2);
  html += inputTextarea('profilo-'+p+'-costo', 'Costo', 'Es. 40 Aura per fase', 1);
  html += '</div>';
 }
 html += '</div>';

 // Box 3: Tecniche 25%
 html += costruisciBoxTecniche('25', '25%', 2);

 // Box 4: Tecniche 50% — id speciale per aggiornare il numero
 html += '<div id="nen-sezione-t50">' + costruisciBoxTecniche('50', '50%', 2) + '</div>';

 // Box 5: Tecnica Finale 100%
 html += costruisciBoxTecniche('100', '100%', 1);

 return html;
}

function costruisciBoxTecniche(id, label, num) {
 if (num === undefined) num = id === '100' ? 1 : 2;
 var html = '<div style="margin-top:16px; border-top:1px solid #3B8686; padding-top:16px;">';
 html += '<h4 style="color:#CFF09E; font-family:\'Montserrat\'; margin-bottom:12px;"><i class="fa-solid fa-bolt"></i> Tecniche ' + label + '</h4>';
 for (var t = 1; t <= num; t++) {
  html += '<div style="background:#1a2e45; border:1px solid #3B8686; border-radius:8px; padding:14px; margin-bottom:12px;">';
  html += '<div style="color:#CFF09E; font-size:0.9em; font-weight:600; margin-bottom:10px;">Tecnica ' + t + '</div>';
  html += inputText('tecnica-'+id+'-'+t+'-nome', 'Nome tecnica', 'Es. Taglio Rapido');
  html += inputTextarea('tecnica-'+id+'-'+t+'-desc', 'Descrizione', 'Descrizione della tecnica...', 2);
  html += inputTextarea('tecnica-'+id+'-'+t+'-bonus', 'Effetti e/o Bonus', 'Descrizione degli effetti e/o bonus...', 2);
  html += inputTextarea('tecnica-'+id+'-'+t+'-malus', 'Eventuali Condizioni e/o Restrizioni e/o Malus', 'Descrizione...', 2);
  html += inputTextarea('tecnica-'+id+'-'+t+'-costo', 'Costo', 'Es. 40 Aura per fase', 1);
  html += '</div>';
 }
 html += '</div>';
 return html;
}

function aggiornaModoNen() {
 var radio = document.querySelector('input[name="nen-modalita"]:checked');
 var modo = radio ? radio.value : 'completo';
 var sezioneP = document.getElementById('nen-sezione-profili');
 var sezioneT50 = document.getElementById('nen-sezione-t50');
 if (sezioneP) sezioneP.style.display = modo === 'speedduel' ? 'none' : '';
 if (sezioneT50) sezioneT50.innerHTML = costruisciBoxTecniche('50', '50%', modo === 'speedduel' ? 1 : 2);
} 
 
function aggiungiTecnica() { 
 var lista = document.getElementById('lista-tecniche'); 
 var idx = lista.children.length; 
 var div = document.createElement('div'); 
 div.id = 'tecnica-row-' + idx; 
 div.style.cssText = 'background:#1a2e45; border:1px solid #3B8686; border-radius:8px; padding:12px; margin-bottom:10px;'; 
 div.innerHTML = 
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed; margin-bottom:6px;"><tr>' + 
  '<td style="width:88%; padding-right:6px; vertical-align:bottom;">' + inputText('tecnica-nome-'+idx,'Nome tecnica','Es. Scudo di Luce') + '</td>' + 
  '<td style="width:12%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' + 
  '<button onclick="rimuoviElemento(\'tecnica-row-'+idx+'\')" style="background:rgba(80,0,0,0.4); color:#F9C6C6; border:1px solid #6b0b0b; padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' + 
  '</td></tr></table>' + 
  inputTextarea('tecnica-desc-'+idx,'Descrizione','Descrizione della tecnica...', 3); 
 lista.appendChild(div); 
 if (typeof bozzaSalva === 'function') bozzaSalva(); 
} 
 
function costruisciBalue(isNuova) {
 if (isNuova) {
  return '<p style="color:#8FBEBA; font-size:0.9em; font-style:italic;">' +
   '<i class="fa-solid fa-info-circle"></i> Un nuovo PG non ha ancora oggetti con sé. ' +
   'Il baule sarà vuoto nella scheda generata.</p>';
 }
 var categorie = [
  { nome:'Armi', id:'armi' },
  { nome:'Equipaggiamento', id:'equip' },
  { nome:'Oggetti Extra', id:'oggetti' },
  { nome:'Materiali', id:'materiali' }
 ];
 var html = '';
 for (var i = 0; i < categorie.length; i++) {
  var cat = categorie[i];
  html += '<div style="margin-bottom:18px;">';
  html += '<h4 style="color:#CFF09E; font-family:\'Montserrat\'; font-size:1.2em; margin-bottom:8px;">' + cat.nome + '</h4>';
  html += '<div id="lista-' + cat.id + '"></div>';
  html += '<button onclick="aggiungiItem(\'' + cat.id + '\')" style="background:transparent; color:#8FBEBA; border:1px dashed #3B8686; padding:6px 16px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; font-size:1em;"><i class="fa-solid fa-plus"></i> Aggiungi</button>';
  html += '</div>';
 }
 return html;
}
 
function aggiungiItem(categoria) { 
 var lista = document.getElementById('lista-' + categoria); 
 if (!lista) return; 
 var idx = lista.children.length; 
 var div = document.createElement('div'); 
 div.id = categoria + '-row-' + idx; 
 div.style.cssText = 'background:#1a2e45; border:1px solid #3B8686; border-radius:8px; padding:12px; margin-bottom:10px;'; 
 
 // Riga 1: Nome + Qt + Livello/Usi + pulsante rimuovi 
 var riga1 = ''; 
 if (categoria === 'materiali') { 
  // Materiali: solo Nome + Qt (nessun Livello/Usi) 
  riga1 = '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' + 
   '<td style="width:78%; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-nome-'+idx,'Nome','Es. Erba medicinale') + '</td>' + 
   '<td style="width:12%; padding-left:4px; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-qt-'+idx,'Qt','1') + '</td>' + 
   '<td style="width:10%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' + 
   '<button onclick="rimuoviElemento(\'' + categoria + '-row-' + idx + '\')" style="background:rgba(80,0,0,0.4); color:#F9C6C6; border:1px solid #6b0b0b; padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' + 
   '</td></tr></table>'; 
 } else if (categoria === 'oggetti') { 
  riga1 = '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' + 
   '<td style="width:52%; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-nome-'+idx,'Nome','Es. Pozione') + '</td>' + 
   '<td style="width:16%; padding-left:4px; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-qt-'+idx,'Qt','1') + '</td>' + 
   '<td style="width:22%; padding-left:4px; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-usi-'+idx,'Usi (es. 0/3)','0/3') + '</td>' + 
   '<td style="width:10%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' + 
   '<button onclick="rimuoviElemento(\'' + categoria + '-row-' + idx + '\')" style="background:rgba(80,0,0,0.4); color:#F9C6C6; border:1px solid #6b0b0b; padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' + 
   '</td></tr></table>'; 
 } else { 
  // armi / equip 
  riga1 = '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' + 
   '<td style="width:52%; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-nome-'+idx,'Nome','Es. Spada') + '</td>' + 
   '<td style="width:16%; padding-left:4px; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-qt-'+idx,'Qt','1') + '</td>' + 
   '<td style="width:22%; padding-left:4px; padding-right:4px; vertical-align:bottom;">' + 
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Livello (max 5)</label>' + 
   '<div style="display:flex; align-items:center; gap:6px;">' + 
   '<button onclick="stepLv(\''+categoria+'-lv-'+idx+'\', -1)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:28px; height:28px; cursor:pointer; font-size:1em; padding:0; flex-shrink:0;">&#8722;</button>' + 
   '<input type="number" id="'+categoria+'-lv-'+idx+'" value="0" min="0" max="5" style="'+STILE_INPUT+' text-align:center; flex:1;">' + 
   '<button onclick="stepLv(\''+categoria+'-lv-'+idx+'\', 1)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:28px; height:28px; cursor:pointer; font-size:1em; padding:0; flex-shrink:0;">+</button>' + 
   '</div></div>' + 
   '</td>' + 
   '<td style="width:10%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' + 
   '<button onclick="rimuoviElemento(\'' + categoria + '-row-' + idx + '\')" style="background:rgba(80,0,0,0.4); color:#F9C6C6; border:1px solid #6b0b0b; padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' + 
   '</td></tr></table>'; 
 } 
 
 // Riga 2: Espansione (nome + link) — per tutte le categorie 
 var riga2esp = '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' + 
  '<td style="width:50%; padding-right:6px; vertical-align:bottom;">' + inputText(categoria+'-exp-nome-'+idx,'Nome espansione','Es. Caccia al Tesoro') + '</td>' + 
  '<td style="width:50%; padding-left:6px; vertical-align:bottom;">' + inputText(categoria+'-exp-link-'+idx,'Link espansione','https://...') + '</td>' + 
  '</tr></table>';

 // Riga 3: Descrizione opzionale (HTML consentito)
 var riga3desc = '<div style="margin-bottom:6px;">' +
  '<label style="'+STILE_LABEL+'">Descrizione <span style="color:#8FBEBA; font-size:0.85em; font-weight:400;">(opzionale — HTML consentito)</span></label>' +
  '<textarea id="'+categoria+'-desc-'+idx+'" rows="2" placeholder="Es. Una spada antica forgiata in acciaio stellare..." style="'+STILE_INPUT+' font-family:\'Montserrat\'; font-size:0.95em; resize:vertical;"></textarea>' +
  '</div>';

 // Materiali: solo Nome + Quantità (niente espansione né descrizione). 
 // Le altre categorie hanno anche espansione e descrizione. 
 if (categoria === 'materiali') div.innerHTML = riga1; 
 else div.innerHTML = riga1 + riga2esp + riga3desc; 
 lista.appendChild(div); 
 if (typeof bozzaSalva === 'function') bozzaSalva(); 
} 
 
function costruisciMusica() { 
 return '<div style="display:flex; gap:10px; margin-bottom:6px; align-items:center;">' +
  '<label style="color:#8FBEBA; font-size:0.85em;">Piattaforma:</label>' +
  '<select id="campo-musica-piattaforma" onchange="aggiornaMusicaHelp()" style="background:#292354; color:#CFF09E; border:1px solid #3B8686; border-radius:6px; padding:4px 8px; font-family:\'Montserrat\';">' +
  '<option value="youtube">YouTube</option>' +
  '<option value="soundcloud">SoundCloud</option>' +
  '</select></div>' +
  inputText('campo-musica','ID traccia','Es. cjqwwIRnmuQ') +
  '<p id="musica-help" style="color:#8FBEBA; font-size:0.82em; margin-top:-10px; font-style:italic;">Inserisci SOLO l\'ID del video (Gli 11 caratteri dopo "watch?v=" nell\'URL di YouTube)</p>'; 
}

function aggiornaMusicaHelp() {
 var p = document.getElementById('campo-musica-piattaforma');
 var h = document.getElementById('musica-help');
 var i = document.getElementById('campo-musica');
 if (!p || !h) return;
 if (p.value === 'soundcloud') {
  h.textContent = 'Inserisci SOLO l\'ID numerico della traccia (i numeri dopo "/tracks/" nell\'URL dell\'API SoundCloud)';
  if (i) i.placeholder = 'Es. 1234567890';
 } else {
  h.textContent = 'Inserisci SOLO l\'ID del video (Gli 11 caratteri dopo "watch?v=" nell\'URL di YouTube)';
  if (i) i.placeholder = 'Es. cjqwwIRnmuQ';
 }
} 
 
function costruisciImporta() { 
 return '<p style="color:#8FBEBA; font-size:0.88em; margin-bottom:12px; font-style:italic;"><i class="fa-solid fa-circle-info"></i> Incolla il codice HTML della tua scheda esistente e premi "Importa Dati": i campi verranno popolati automaticamente. Potrai poi modificarli prima di generare.</p>' + 
  '<label style="' + STILE_LABEL + '">Codice HTML della scheda esistente:</label>' + 
  '<textarea id="campo-importa" placeholder="Incolla il codice HTML della tua scheda..." rows="6" style="' + STILE_INPUT + ' font-family:\'Montserrat\'; font-size:1em; resize:vertical;"></textarea>' + 
  '<button onclick="importaScheda()" style="margin-top:10px; background:#292354; color:#8FBEBA; border:1px solid #3B8686; padding:10px 25px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\';"><i class="fa-solid fa-file-import"></i> Importa Dati</button>'; 
} 
 
// ============================================================ 
// LOGICA RAZZA / SPECIE 
// ============================================================ 
function aggiornaRazza(isNuova) { 
 var razzaEl = document.getElementById('campo-razza'); 
 var specieEl = document.getElementById('campo-specie'); 
 if (!razzaEl) return; 
 var razza = razzaEl.value; 
 var isBestia = razza === 'Bestia Demoniaca'; 
 var specie = specieEl ? specieEl.value : ''; 
 
 // Mostra/nascondi specie e dati relativi 
 var spWrap = document.getElementById('campo-specie-wrap'); 
 var rankWrap = document.getElementById('campo-rank-wrap'); 
 if (spWrap) spWrap.style.display = isBestia ? '' : 'none'; 
 if (rankWrap) rankWrap.style.display = isBestia ? '' : 'none'; 
 
 // Aggiorna rank e conservazione 
 if (isBestia && DATI_SPECIE[specie]) { 
  var ds = DATI_SPECIE[specie]; 
  var rv = document.getElementById('campo-rank-val'); 
  var cv = document.getElementById('campo-conservazione-val'); 
  if (rv) rv.textContent = ds.rank; 
  if (cv) cv.textContent = ds.conservazione; 
 } 
 
 // Aggiorna menù luoghi 
 var luogoEl = document.getElementById('campo-luogo'); 
 if (luogoEl) { 
  var luogoCorrente = luogoEl.value; 
  luogoEl['inn'+'erHTML'] = ''; 
  var luoghiConsentiti, luoghiVietati; 
  if (!isBestia) { 
   // Umano: vede tutti, ma può selezionare solo luoghi umani 
   luoghiConsentiti = LUOGHI_UMANI; 
   luoghiVietati = []; 
   // Raccoglie tutti i luoghi bestia per metterli disabilitati 
   var vistiB = {}; 
   for (var sp2 in LUOGHI_BESTIA) { 
    var ll2 = LUOGHI_BESTIA[sp2]; 
    for (var j2 = 0; j2 < ll2.length; j2++) { 
     if (!BONUS_LUOGO[ll2[j2]] && !vistiB[ll2[j2]]) { 
      luoghiVietati.push(ll2[j2]); 
      vistiB[ll2[j2]] = true; 
     } 
    } 
   } 
   for (var li = 0; li < LUOGHI_UMANI.length; li++) { 
    var opt = document.createElement('option'); 
    opt.value = LUOGHI_UMANI[li]; opt.text = LUOGHI_UMANI[li]; 
    luogoEl['append'+'Child'](opt); 
   } 
   for (var li2 = 0; li2 < luoghiVietati.length; li2++) { 
    var opt2 = document.createElement('option'); 
    opt2.value = luoghiVietati[li2]; opt2.text = luoghiVietati[li2]; 
    opt2.disabled = true; 
    luogoEl['append'+'Child'](opt2); 
   } 
  } else { 
   // Bestia Demoniaca: vede tutti, ma può selezionare solo i luoghi della sua specie 
   var luoghiSpecie = specie && LUOGHI_BESTIA[specie] ? LUOGHI_BESTIA[specie] : []; 
   for (var li3 = 0; li3 < LUOGHI_TUTTI.length; li3++) { 
    var opt3 = document.createElement('option'); 
    opt3.value = LUOGHI_TUTTI[li3]; opt3.text = LUOGHI_TUTTI[li3]; 
    var consentito = luoghiSpecie.indexOf(LUOGHI_TUTTI[li3]) !== -1; 
    if (!consentito) opt3.disabled = true; 
    luogoEl['append'+'Child'](opt3); 
   } 
   // Seleziona il primo luogo consentito 
   if (luoghiSpecie.length > 0) { 
    for (var oi = 0; oi < luogoEl.options.length; oi++) { 
     if (!luogoEl.options[oi].disabled) { luogoEl.selectedIndex = oi; break; } 
    } 
   } 
  } 
  // Tenta di ripristinare il valore precedente se ancora valido 
  if (luogoCorrente) { 
   for (var oi2 = 0; oi2 < luogoEl.options.length; oi2++) { 
    if (luogoEl.options[oi2].value === luogoCorrente && !luogoEl.options[oi2].disabled) { 
     luogoEl.selectedIndex = oi2; break; 
    } 
   } 
  } 
 } 
 
 // Aggiorna menù classe 
 var classeWrap = document.getElementById('campo-classe-wrap'); 
 var classeEl = document.getElementById('campo-classe'); 
 if (classeWrap) classeWrap.style.display = isBestia ? 'none' : ''; 
 if (classeEl && !isBestia) { 
  // Ricostruisce opzioni classi (filtra disabilitate se isNuova) 
  var classiDaMostrare = isNuova ? CLASSI : CLASSI_TUTTE; 
  classeEl['inn'+'erHTML'] = ''; 
  for (var ci = 0; ci < classiDaMostrare.length; ci++) { 
   var optC = document.createElement('option'); 
   optC.value = classiDaMostrare[ci]; optC.text = classiDaMostrare[ci]; 
   classeEl['append'+'Child'](optC); 
  } 
 } 
 
 // Fedina penale 
 aggiornaFedina(isNuova); 
 
 // Aggiorna stat se scheda nuova 
 if (isNuova) aggiornaStatNuova(); 
} 
 
function aggiornaFedina(isNuova) { 
 var razzaEl = document.getElementById('campo-razza'); 
 var specieEl = document.getElementById('campo-specie'); 
 if (!razzaEl) return; 
 var isBestia = razzaEl.value === 'Bestia Demoniaca'; 
 var specie = specieEl ? specieEl.value : ''; 
 var tagliaWrap = document.getElementById('campo-taglia-wrap'); 
 
 if (isNuova) { 
  var feEl = document.getElementById('campo-fedina'); 
  var fv = document.getElementById('campo-fedina-val'); 
  var ctVal = document.getElementById('campo-classtaglia-val'); 
  var vtVal = document.getElementById('campo-valtaglia-val'); 
  var isBestiaABC = isBestia && DATI_SPECIE[specie] && ['A','B','C'].indexOf(DATI_SPECIE[specie].rank) !== -1; 
  if (isBestiaABC) { 
   // Bestie A/B/C: Ricercato forzato con taglia E. Nasconde la select, 
   // mostra il readonly "Ricercato". 
   if (feEl) feEl.style.display = 'none'; 
   if (fv) { fv.style.display = ''; fv.textContent = 'Ricercato'; } 
   if (ctVal) ctVal.textContent = 'E'; 
   if (vtVal) vtVal.textContent = VALORE_TAGLIA_BASE['E'].toLocaleString(); 
   if (tagliaWrap) tagliaWrap.style.display = ''; 
  } else { 
   // Umani e bestie non-A/B/C: l'utente sceglie Incensurato/Ricercato. 
   // Se Ricercato, taglia D fissa. 
   if (feEl) feEl.style.display = ''; 
   if (fv) fv.style.display = 'none'; 
   var scelta = feEl ? feEl.value : 'Incensurato'; 
   if (ctVal) ctVal.textContent = 'D'; 
   if (vtVal) vtVal.textContent = VALORE_TAGLIA_BASE['D'].toLocaleString(); 
   if (tagliaWrap) tagliaWrap.style.display = scelta === 'Ricercato' ? '' : 'none'; 
  } 
  if (typeof bozzaSalva === 'function') bozzaSalva(); 
 } else { 
  var feEl = document.getElementById('campo-fedina'); 
  if (!feEl) return; 
  // In MODIFICA fedina e taglia sono sempre modificabili, anche per le 
  // bestie rank A/B/C: in Nuova la taglia è fissa, ma su una scheda 
  // esistente questi dati devono poter essere aggiornati liberamente. 
  feEl.disabled = false; 
  if (tagliaWrap) tagliaWrap.style.display = feEl.value === 'Ricercato' ? '' : 'none'; 
  // La taglia E è riservata alle bestie A/B/C: mostriamo la sua option 
  // solo per loro (possono restare su E o cambiare); gli altri non la vedono. 
  var isBestiaABC = isBestia && DATI_SPECIE[specie] && ['A','B','C'].indexOf(DATI_SPECIE[specie].rank) !== -1; 
  aggiornaTipoTaglia(isBestiaABC); 
 } 
} 
 
// Chiamata all'onchange della SELECT classificazione: quando si sceglie 
// una taglia, il valore viene RESETTATO al valore base di quella taglia 
// (sia salendo sia scendendo). Il campo resta poi modificabile a mano 
// per le taglie personalizzate (vedi validaValoreTaglia). 
function aggiornaTaglia() { 
 var ctEl = document.getElementById('campo-classtaglia'); 
 var vtEl = document.getElementById('campo-valtaglia'); 
 if (!ctEl || !vtEl) return; 
 var base = VALORE_TAGLIA_BASE[ctEl.value] || 1000; 
 vtEl.value = base.toLocaleString(); 
 if (typeof bozzaSalva === 'function') bozzaSalva(); 
} 

// Validazione del valore inserito a mano nel campo valore taglia: 
// consente valori personalizzati ma non sotto il minimo della 
// classificazione scelta. Da collegare all'onchange del campo valore. 
function validaValoreTaglia() { 
 var ctEl = document.getElementById('campo-classtaglia'); 
 var vtEl = document.getElementById('campo-valtaglia'); 
 if (!ctEl || !vtEl) return; 
 var min = VALORE_TAGLIA_BASE[ctEl.value] || 1000; 
 var attuale = parseInt(vtEl.value.replace(/\./g,'').replace(/,/g,'').replace(/[^\d]/g,'')) || 0; 
 if (attuale < min) attuale = min; 
 vtEl.value = attuale.toLocaleString(); 
 if (typeof bozzaSalva === 'function') bozzaSalva(); 
} 
 
function aggiornaTipoTaglia(isBestiaABC) { 
 // La select taglia è sempre modificabile. L'unica differenza: l'option 
 // "E" è riservata alle bestie A/B/C, quindi la mostriamo solo per loro 
 // e la nascondiamo per tutti gli altri. Nessun valore viene forzato: 
 // le bestie A/B/C possono restare su E o scegliere un'altra taglia. 
 var ctSelect = document.getElementById('campo-classtaglia'); 
 var vtEl     = document.getElementById('campo-valtaglia'); 
 var optE     = document.getElementById('opt-classtaglia-E'); 
 if (!ctSelect) return; 
 ctSelect.style.display = ''; 
 if (optE) optE.style.display = isBestiaABC ? '' : 'none'; 
 // Per gli altri, se il valore era E (ora non disponibile), scala a D. 
 if (!isBestiaABC && (ctSelect.value === 'E' || !ctSelect.value)) { 
  ctSelect.value = 'D'; 
  if (vtEl) vtEl.value = VALORE_TAGLIA_BASE['D'].toLocaleString(); 
 } 
} 
 
// ============================================================ 
// LOGICA STATISTICHE 
// ============================================================ 
function aggiornaStatNuova() { 
 var luogoEl = document.getElementById('campo-luogo'); 
 var classeEl = document.getElementById('campo-classe'); 
 var razzaEl = document.getElementById('campo-razza'); 
 if (!luogoEl) return; 
 var luogo = luogoEl.value; 
 var classe = classeEl ? classeEl.value : ''; 
 var isBestia = razzaEl && razzaEl.value === 'Bestia Demoniaca'; 
 var specieEl = document.getElementById('campo-specie'); 
 var specie = specieEl ? specieEl.value : ''; 
 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
 var stat = {}; 
 for (var i = 0; i < ls.length; i++) stat[ls[i]] = STAT_BASE[ls[i]]; 
 stat.vita = STAT_BASE.vita; stat.aura = STAT_BASE.aura; 
 // Formichimera Umana usa luoghi umani ma senza bonus 
 var applicaBonus = !isBestia || specie === ''; 
 var isFormichimera = isBestia && specie === 'Formichimera Umana'; 
 if (applicaBonus && !isFormichimera && BONUS_LUOGO[luogo]) { 
  var bl = BONUS_LUOGO[luogo]; 
  for (var k in bl) if (stat[k] !== undefined) stat[k] += bl[k]; 
 } 
 if (!isBestia && BONUS_CLASSE[classe]) { 
  var bc = BONUS_CLASSE[classe]; 
  for (var m in bc) if (stat[m] !== undefined) stat[m] += bc[m]; 
 } 
 // Salva i valori base (bonus inclusi) e aggiorna i display 
 for (var s in stat) { 
  var el = document.getElementById('stat-base-'+s); 
  if (el) el.textContent = stat[s]; 
  var elTot = document.getElementById('stat-'+s); 
  if (elTot) elTot.textContent = stat[s]; 
 } 
 // Resetta i punti extra a 0 
 for (var pi = 0; pi < ls.length; pi++) { 
  var eExtra = document.getElementById('stat-extra-'+ls[pi]); 
  if (eExtra) eExtra.value = 0; 
 } 
 aggiornaContatoreExtra(); 
} 
 
var PUNTI_EXTRA_TOTALI = 25; 
 
function aggiornaContatoreExtra() { 
 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
 var usati = 0; 
 for (var i = 0; i < ls.length; i++) { 
  var eExtra = document.getElementById('stat-extra-'+ls[i]); 
  if (eExtra) usati += parseInt(eExtra.value) || 0; 
 } 
 var rimasti = PUNTI_EXTRA_TOTALI - usati; 
 var cEl = document.getElementById('punti-extra-counter'); 
 if (cEl) { 
  cEl.textContent = rimasti + ' punti rimanenti'; 
  cEl.style.color = rimasti < 0 ? '#F9C6C6' : (rimasti === 0 ? '#CFF09E' : '#8FBEBA'); 
 } 
 return rimasti; 
} 
 
function modificaStatExtra(sId, delta) { 
 var eExtra = document.getElementById('stat-extra-'+sId); 
 var eBase  = document.getElementById('stat-base-'+sId); 
 var eTot   = document.getElementById('stat-'+sId); 
 if (!eExtra || !eBase || !eTot) return; 
 var rimasti = aggiornaContatoreExtra(); 
 var nuovoExtra = (parseInt(eExtra.value) || 0) + delta; 
 if (nuovoExtra < 0) nuovoExtra = 0; 
 if (delta > 0 && rimasti <= 0) { 
  alert('Hai già distribuito tutti i 25 punti extra!'); 
  return; 
 } 
 eExtra.value = nuovoExtra; 
 var base = parseInt(eBase.textContent) || 5; 
 eTot.textContent = base + nuovoExtra; 
 aggiornaContatoreExtra(); 
 if (typeof bozzaSalva === 'function') bozzaSalva(); 
} 
 
function validaStat(input, isVitaAura) { 
 var val = parseInt(input.value); 
 var step = isVitaAura ? 100 : 5; 
 var min = isVitaAura ? (input.id==='stat-vita' ? 300 : 500) : 5; 
 var max = isVitaAura ? (input.id==='stat-vita' ? 3000 : 5000) : 250; 
 if (!isVitaAura) { var idS = input.id.replace('stat-',''); var ov = document.getElementById('over-'+idS); if (ov && ov.checked) max = 400; } 
 if (isNaN(val)||val<min) val=min; 
 if (val>max) val=max; 
 input.value = Math.round(val/step)*step; 
} 
 

function stepStat(sId, delta) { 
 var el = document.getElementById('stat-' + sId); 
 if (!el) return; 
 var isVitaAura = sId === 'vita' || sId === 'aura'; 
 var step  = isVitaAura ? 100 : 5; 
 var minV  = isVitaAura ? (sId === 'vita' ? 300 : 500) : 5; 
 var maxV  = isVitaAura ? (sId === 'vita' ? 3000 : 5000) : 400; 
 var ovEl  = document.getElementById('over-' + sId); 
 if (!isVitaAura && ovEl && !ovEl.checked) maxV = 250; 
 var cur = parseInt(el.value) || minV; 
 var nv = Math.round((cur + delta) / step) * step; 
 if (nv < minV) nv = minV; 
 if (nv > maxV) nv = maxV; 
 el.value = nv; 
 if (typeof bozzaSalva === 'function') bozzaSalva(); 
} 
 
function stepLv(id, delta) { 
 var el = document.getElementById(id); 
 if (!el) return; 
 var nv = (parseInt(el.value) || 0) + delta; 
 if (nv < 0) nv = 0; 
 if (nv > 5) nv = 5; 
 el.value = nv; 
 if (typeof bozzaSalva === 'function') bozzaSalva(); 
} 
 
function toggleOver(checkbox, sId) { 
 var input = document.getElementById('stat-'+sId); 
 if (!input) return; 
 if (checkbox.checked) { 
  // Conta quante over sono già attive (esclusa quella corrente) 
  var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
  var attive = 0; 
  for (var i = 0; i < ls.length; i++) { 
   if (ls[i] === sId) continue; 
   var ov = document.getElementById('over-'+ls[i]); 
   if (ov && ov.checked) attive++; 
  } 
  if (attive >= 2) { 
   checkbox.checked = false; 
   alert('Puoi overlivellare al massimo 2 statistiche!'); 
   return; 
  } 
  input.max = 400; 
 } else { 
  input.max = 250; 
  if (parseInt(input.value) > 250) input.value = 250; 
 } 
 if (typeof bozzaSalva === 'function') bozzaSalva(); 
} 
 
function calcolaExpTot(livello) { 
 var lv = parseInt(livello); 
 if (isNaN(lv)) lv = 0; 
 if (lv <= 14) return 100; 
 return 100 + (lv - 14) * 10; 
} 

// ============================================================ 
// MOTORE LEVEL-UP (accrediti) 
// Regole confermate: 
// - Ogni level-up: +100 Vita, +100 Aura, +25/30/35 punti stat (razza) 
// - Tenacia: Umano +5% ogni livello; Bestie/Formichimere +5% solo sui 
//   livelli PARI raggiunti. Tetto 100%. 
// - Soglia EXP: 100 fino al Lv.14, poi +10 per livello. 
// ============================================================ 
function puntiPerLevel(razza, specie) { 
 if (razza === 'Bestia Demoniaca') { 
  if (specie === 'Formichimera Umana') return 35; 
  return 30; 
 } 
 return 25; // Umano 
} 

function applicaTenaciaLevel(tenaciaCorrente, lvDa, lvA, razza) { 
 var t = tenaciaCorrente; 
 var soloPari = (razza === 'Bestia Demoniaca'); // include Formichimere (sono Bestie) 
 for (var lv = lvDa + 1; lv <= lvA; lv++) { 
  if (soloPari) { 
   if (lv % 2 === 0) t += 5; 
  } else { 
   t += 5; 
  } 
  if (t >= 100) { t = 100; break; } 
 } 
 return t; 
} 

function motoreLevelUp(opts) { 
 var livello = parseInt(opts.livello); if (isNaN(livello)) livello = 0; 
 var exp     = parseInt(opts.exp);      if (isNaN(exp)) exp = 0; 
 var expAccr = parseInt(opts.expAccreditata) || 0; 
 var vita    = parseInt(opts.vita) || 300; 
 var aura    = parseInt(opts.aura) || 500; 
 var tenacia = parseInt(opts.tenacia); if (isNaN(tenacia)) tenacia = 10; 
 var razza   = opts.razza || 'Umano'; 
 var specie  = opts.specie || ''; 

 var lvIniziale = livello; 
 var expTot = exp + expAccr; 
 var levelUps = 0; 
 var puntiTot = 0; 

 var soglia = calcolaExpTot(livello); 
 // Guardia anti-loop: max 500 level-up per singolo accredito 
 var guardia = 0; 
 while (expTot >= soglia && guardia < 500) { 
  expTot -= soglia; 
  livello += 1; 
  levelUps += 1; 
  puntiTot += puntiPerLevel(razza, specie); 
  soglia = calcolaExpTot(livello); 
  guardia++; 
 } 

 var vitaFin = vita + 100 * levelUps; 
 var auraFin = aura + 100 * levelUps; 
 // Tetti: Vita max 3000, Aura max 5000 
 if (vitaFin > 3000) vitaFin = 3000; 
 if (auraFin > 5000) auraFin = 5000; 
 var tenaciaFin = applicaTenaciaLevel(tenacia, lvIniziale, livello, razza); 

 return { 
  livelloDa: lvIniziale, livelloA: livello, levelUps: levelUps, 
  expResidua: expTot, expTotProssima: soglia, 
  vitaDa: vita, vitaA: vitaFin, deltaVita: vitaFin - vita, 
  auraDa: aura, auraA: auraFin, deltaAura: auraFin - aura, 
  tenaciaDa: tenacia, tenaciaA: tenaciaFin, 
  puntiDaDistribuire: puntiTot 
 }; 
} 
 
function aggiornaCompetenze() { 
 var livEl = document.getElementById('campo-livello'); 
 if (!livEl) return; 
 var lv = parseInt(livEl.value) || 0; 
 // Aggiorna EXP per level up (readonly, calcolato dal livello) 
 var exptotEl = document.getElementById('campo-exptot'); 
 if (exptotEl) exptotEl.value = calcolaExpTot(lv); 
 for (var n = 0; n < 5; n++) { 
  var slot       = document.getElementById('comp-slot-' + n); 
  var label      = document.getElementById('comp-slot-label-' + n); 
  var fields     = document.getElementById('comp-slot-fields-' + n); 
  if (!slot || !label || !fields) continue; 
  var sbloccato  = lv >= SBLOCCO_COMPETENZE[n]; 
  // Bordo e sfondo 
  slot.style.opacity = sbloccato ? '1' : '0.45'; 
  slot.style.borderColor = sbloccato ? '#3B8686' : '#292354'; 
  // Icona e testo label 
  label.innerHTML = sbloccato 
   ? '<i class="fa-solid fa-lock-open" style="color:#CFF09E;"></i> Slot ' + (n+1) + ' — sbloccato al Lv. ' + SBLOCCO_COMPETENZE[n] 
   : '<i class="fa-solid fa-lock"></i> Slot ' + (n+1) + ' — sbloccabile al Lv. ' + SBLOCCO_COMPETENZE[n]; 
  // Abilita / disabilita tutti gli input e textarea dentro il fields 
  var gbn = 'getElements' + 'ByTagName'; 
  var inputs = fields[gbn]('input'); 
  var textareas = fields[gbn]('textarea'); 
  for (var i = 0; i < inputs.length; i++) { 
   inputs[i].disabled = !sbloccato; 
   inputs[i].style.opacity = sbloccato ? '1' : '0.4'; 
   inputs[i].style.cursor = sbloccato ? '' : 'not-allowed'; 
  } 
  for (var j = 0; j < textareas.length; j++) { 
   textareas[j].disabled = !sbloccato; 
   textareas[j].style.opacity = sbloccato ? '1' : '0.4'; 
   textareas[j].style.cursor = sbloccato ? '' : 'not-allowed'; 
  } 
 } 
} 
 
function bbcodeToHtml(testo) {
 // [IMG=qualsiasi]...url...[/IMG] — gestisce attributi, underscore, spazi
 testo = testo.replace(/\[IMG(?:=[^\]]+)?\]([\s\S]*?)\[\/IMG[^\]]*\]/gi, function(match, interno) {
  var urlMatch = interno.match(/https?:\/\/[^\s\[\]]+/);
  return urlMatch ? '<img src="' + urlMatch[0].replace(/_+$/, '') + '">' : match;
 });
 testo = testo.replace(/\[URL=(.*?)\](.*?)\[\/URL\]/gi, '<a href="$1">$2</a>');
 testo = testo.replace(/\[URL\](.*?)\[\/URL\]/gi, '<a href="$1">$1</a>');
 return testo;
}
 
// ============================================================ 
// IMPORT SEZIONE NEN (riusabile) 
// Legge la parte Abilità Nen da un contenitore temporaneo (il DOM 
// della scheda incollata) e riempie i campi corrispondenti del form. 
// Usata sia dall'import completo sia dall'import "solo Hatsu". 
// 
// opts.percentuali: se true, imposta anche Nen%/Tenacia% (import 
//   completo di una scheda pg); se false/assente NON le tocca 
//   (import solo Hatsu: le percentuali restano quelle già presenti). 
// opts.tipoHatsu: se true, imposta anche il tipo di Hatsu. 
// 
// Ritorna true se ha trovato e importato un blocco Nen. 
// ============================================================ 
function importaNenDaTemp(temp, opts) { 
 opts = opts || {}; 
 var metodo = 'getElements' + 'ByTagName'; 
 
 function setValN(id, val) { 
  var e = document.getElementById(id); 
  if (e && val !== null && val !== undefined && val !== '') e.value = val; 
 } 
 function setTextareaN(id, val) { 
  var e = document.getElementById(id); 
  if (e && val) e.value = val; 
 } 
 function setSelectN(id, val) { 
  var e = document.getElementById(id); 
  if (!e || !val) return; 
  val = val.trim(); 
  for (var i = 0; i < e.options.length; i++) { 
   if (e.options[i].value === val || e.options[i].text === val) { e.selectedIndex = i; return; } 
  } 
 } 
 // Legge le card di un nen-box e popola i campi tecnica/profilo. 
 function leggiNenCards(box, prefisso, num) { 
  var cards = []; 
  var allDivs = box[metodo]('div'); 
  for (var d2 = 0; d2 < allDivs.length; d2++) { 
   if (allDivs[d2].className === 'nen-card') cards.push(allDivs[d2]); 
  } 
  for (var ci = 0; ci < Math.min(cards.length, num); ci++) { 
   var titleEl = cards[ci].querySelector ? cards[ci].querySelector('.nen-card-title') : null; 
   var cardSpans = cards[ci][metodo]('span'); 
   if (titleEl) { 
    var titoloTesto = titleEl.textContent.trim(); 
    var dashIdx = titoloTesto.indexOf('\u2014'); // "Profilo N — Nome" 
    var nomeCard = dashIdx !== -1 ? titoloTesto.substring(dashIdx + 2).trim() : titoloTesto; 
    setValN(prefisso + (ci + 1) + '-nome', nomeCard); 
   } 
   for (var cs = 0; cs < cardSpans.length - 1; cs++) { 
    if (cardSpans[cs].className === 'scheda-label' && cardSpans[cs + 1].className === 'scheda-entry') { 
     var lc = cardSpans[cs].textContent.trim(); 
     var vc = cardSpans[cs + 1]['inn' + 'erHTML'].trim(); 
     if (lc === 'Descrizione:')                          setTextareaN(prefisso + (ci + 1) + '-desc',  vc); 
     // Bonus: le nuove schede (profili e tecniche) usano "Effetti e/o 
     // Bonus:", le vecchie "Bonus:" — accettiamo entrambe. 
     if (lc === 'Bonus:' || lc === 'Effetti e/o Bonus:')  setTextareaN(prefisso + (ci + 1) + '-bonus', vc); 
     if (lc === 'Condizioni e/o Restrizioni e/o Malus:') setTextareaN(prefisso + (ci + 1) + '-malus', vc); 
     // Costo: le nuove usano "Costo:", le vecchie "Costo per Fase:". 
     if (lc === 'Costo per Fase:' || lc === 'Costo:')     setTextareaN(prefisso + (ci + 1) + '-costo', vc); 
    } 
   } 
  } 
 } 
 // Import crop dell'immagine nen (allinea data-crop-url per non far 
 // scattare la guardia anti-cambio-immagine). 
 function importaCropN(imgEl, cropId) { 
  if (!imgEl) return; 
  var x = parseFloat(imgEl.getAttribute('data-cx')); 
  var y = parseFloat(imgEl.getAttribute('data-cy')); 
  var w = parseFloat(imgEl.getAttribute('data-cw')); 
  var h = parseFloat(imgEl.getAttribute('data-ch')); 
  if (!isNaN(x) && !isNaN(y) && !isNaN(w) && !isNaN(h)) { 
   var btn = document.getElementById('crop-btn-' + cropId); 
   var urlEl = document.getElementById('nen-img'); 
   if (btn && urlEl) btn.setAttribute('data-crop-url', urlEl.value ? urlEl.value.trim() : ''); 
   if (typeof cropScrivi === 'function') cropScrivi(cropId, x, y, w, h); 
  } 
 } 
 
 var divs = temp[metodo]('div'); 
 var trovato = false; 
 for (var i = 0; i < divs.length; i++) { 
  if (divs[i].className !== 'poteri-box') continue; 
  trovato = true; 
  var nenBoxes = divs[i][metodo]('div'); 
  var nenBoxList = []; 
  for (var nb = 0; nb < nenBoxes.length; nb++) { 
   if (nenBoxes[nb].className === 'nen-box') nenBoxList.push(nenBoxes[nb]); 
  } 
  // Box 0: Potere Nen. Il titolo del box è il TIPO di Hatsu. 
  if (nenBoxList[0]) { 
   if (opts.tipoHatsu) { 
    var titEl = nenBoxList[0].querySelector ? nenBoxList[0].querySelector('.nen-box-title') : null; 
    if (titEl) setSelectN('campo-hatsu', titEl.textContent.trim()); 
   } 
   var b0spans = nenBoxList[0][metodo]('span'); 
   for (var s0 = 0; s0 < b0spans.length - 1; s0++) { 
    if (b0spans[s0].className === 'scheda-label' && b0spans[s0 + 1].className === 'scheda-entry') { 
     var lbl0 = b0spans[s0].textContent.trim(); 
     var val0 = b0spans[s0 + 1]['inn' + 'erHTML'].trim(); 
     if (lbl0 === 'Nome potere:')              setValN('nen-nomepotere', val0); 
     if (lbl0 === 'Descrizione:')              setTextareaN('nen-descrizione', val0); 
     if (lbl0 === 'Funzionamento e regole:')   setTextareaN('nen-funzionamento', val0); 
     if (lbl0 === 'Condizioni e restrizioni:') setTextareaN('nen-condizioni', val0); 
     if (lbl0 === 'Costo:')                    setTextareaN('nen-costo', val0); 
    } 
   } 
  } 
  // Immagine nen 
  var nenImgEl = divs[i].querySelector ? divs[i].querySelector('.nen-img') : null; 
  if (nenImgEl) { setValN('nen-img', nenImgEl.getAttribute('src') || ''); importaCropN(nenImgEl, 'img-nen'); } 
  // Modalità: Completo (box1="Profili") o Speed Duel (box1="Tecniche 25%") 
  var isSpeedDuel = true; 
  if (nenBoxList[1]) { 
   var titBox1 = nenBoxList[1].querySelector ? nenBoxList[1]['querySelector']('.nen-box-title') : null; 
   if (titBox1 && titBox1.textContent.trim() === 'Profili') isSpeedDuel = false; 
  } 
  var rd = document['querySelector']('input[name="nen-modalita"][value="' + (isSpeedDuel ? 'speedduel' : 'completo') + '"]'); 
  if (rd) { rd.checked = true; if (typeof aggiornaModoNen === 'function') aggiornaModoNen(); } 
  if (isSpeedDuel) { 
   if (nenBoxList[1]) leggiNenCards(nenBoxList[1], 'tecnica-25-', 2); 
   if (nenBoxList[2]) leggiNenCards(nenBoxList[2], 'tecnica-50-', 1); 
   if (nenBoxList[3]) leggiNenCards(nenBoxList[3], 'tecnica-100-', 1); 
  } else { 
   if (nenBoxList[1]) leggiNenCards(nenBoxList[1], 'profilo-', 4); 
   if (nenBoxList[2]) leggiNenCards(nenBoxList[2], 'tecnica-25-', 2); 
   if (nenBoxList[3]) leggiNenCards(nenBoxList[3], 'tecnica-50-', 2); 
   if (nenBoxList[4]) leggiNenCards(nenBoxList[4], 'tecnica-100-', 1); 
  } 
  break; 
 } 
 return trovato; 
} 

// Import "solo Hatsu": prende il codice di una scheda-Hatsu approvata 
// e riempie SOLO la sezione Abilità Nen, lasciando intatto tutto il 
// resto della scheda (comprese le percentuali di Nen e Tenacia). 
// Disponibile solo in modalità Modifica. 
function importaHatsu() { 
 var ta = document.getElementById('campo-importa-hatsu'); 
 if (!ta) return; 
 var codice = ta.value.trim(); 
 if (!codice) { alert('Incolla prima il codice HTML dell\'Hatsu approvato!'); return; } 
 var htmlHatsu = (typeof bbcodeToHtml === 'function') ? bbcodeToHtml(codice) : codice; 
 var temp = document.createElement('div'); 
 temp.innerHTML = htmlHatsu; 
 // Importa tipo Hatsu + tutti i dati Nen, MA non le percentuali. 
 var ok = importaNenDaTemp(temp, { tipoHatsu: true, percentuali: false }); 
 if (!ok) { alert('Non ho trovato dati Hatsu validi nel codice incollato. Controlla di aver copiato la scheda Hatsu completa.'); return; } 
 ta.value = ''; 
 // Salva la bozza con i nuovi dati Nen (i setVal non emettono eventi). 
 if (typeof bozzaScriviOra === 'function') bozzaScriviOra(); 
 alert('Hatsu importato! I dati di Abilità Nen sono stati compilati. Nen e Tenacia restano invariati.'); 
} 

// Azzera il form prima di importare una scheda: svuota le liste 
// dinamiche (baule, tecniche, status extra) e cancella la bozza, così 
// i dati importati sostituiscono e non si sommano a quelli presenti. 
function importaPuliziaForm() { 
 // 1) Svuota completamente i contenitori del baule e delle tecniche. 
 var contenitoriVuoti = ['lista-armi','lista-equip','lista-oggetti','lista-materiali','lista-tecniche']; 
 for (var i = 0; i < contenitoriVuoti.length; i++) { 
  var c = document.getElementById(contenitoriVuoti[i]); 
  if (c) c.innerHTML = ''; 
 } 
 // 2) Status: rimuove le righe extra e azzera quella base (row-0). 
 var ls = document.getElementById('lista-status'); 
 if (ls) { 
  while (ls.children.length > 1) ls.removeChild(ls.lastChild); 
  var s0 = document.getElementById('campo-status-0'); 
  if (s0) s0.selectedIndex = 0; 
 } 
 // 3) Immagini: azzera URL, valori di crop e la memoria data-crop-url 
 // di ogni bottone, così una scheda importata senza (o con) crop non 
 // eredita l'inquadratura di una importata prima. 
 var cropIds = ['img-laterale','img-dati','img-info','img-info-a','img-info-b','img-nen']; 
 var urlMap = { 
  'img-laterale':'campo-img-laterale','img-dati':'campo-img-dati', 
  'img-info':'campo-img-info','img-info-a':'campo-img-info-a', 
  'img-info-b':'campo-img-info-b','img-nen':'nen-img' 
 }; 
 for (var k = 0; k < cropIds.length; k++) { 
  var cid = cropIds[k]; 
  var u = document.getElementById(urlMap[cid]); 
  if (u) u.value = ''; 
  var cx = document.getElementById('crop-x-'+cid); if (cx) cx.value = 0; 
  var cy = document.getElementById('crop-y-'+cid); if (cy) cy.value = 0; 
  var cw = document.getElementById('crop-w-'+cid); if (cw) cw.value = 100; 
  var ch = document.getElementById('crop-h-'+cid); if (ch) ch.value = 100; 
  var b = document.getElementById('crop-btn-'+cid); 
  if (b) b.removeAttribute('data-crop-url'); 
 } 
 // 4) Cancella la bozza corrente: sta per essere rimpiazzata. 
 if (typeof bozzaCancella === 'function') bozzaCancella(); 
} 

function importaScheda() { 
 var htmlScheda = document.getElementById('campo-importa').value.trim(); 
 if (!htmlScheda) { alert('Incolla prima il codice HTML!'); return; } 
 // Prima di popolare: azzera il form. L'import RIMPIAZZA i dati, non 
 // li aggiunge. Senza questa pulizia, le righe dinamiche già presenti 
 // (da una bozza ripristinata o da un import precedente) si 
 // sommerebbero a quelle della nuova scheda (es. baule con oggetti di 
 // due schede diverse). Cancella anche la bozza, che sta per essere 
 // sostituita dai dati della scheda importata. 
 importaPuliziaForm(); 
 // Converte BBCode in HTML (ForumFree trasforma img e link in BBCode nei post) 
 htmlScheda = bbcodeToHtml(htmlScheda); 
 var temp = document.createElement('div'); 
 temp.innerHTML = htmlScheda; 
 var metodo = 'getElements' + 'ByTagName'; 
 
 // ── Helpers ─────────────────────────────────────────────── 
 function setVal(id, val) { 
  var e = document.getElementById(id); 
  if (e && val !== null && val !== undefined && val !== '') e.value = val; 
 } 
 function setSelect(id, val) { 
  var e = document.getElementById(id); 
  if (!e || !val) return; 
  val = val.trim(); 
  for (var i = 0; i < e.options.length; i++) { 
   if (e.options[i].value === val || e.options[i].text === val) { 
    e.selectedIndex = i; return; 
   } 
  } 
 } 
 function setTextarea(id, val) { 
  var e = document.getElementById(id); 
  if (e && val) e.value = val; 
 } 
 // Restituisce il textContent (per label, confronti) 
 function trovaEntryDopoLabel(spans, labelTesto) { 
  for (var i = 0; i < spans.length - 1; i++) { 
   if (spans[i].className === 'scheda-label' && spans[i].textContent.trim() === labelTesto) { 
    if (spans[i+1].className === 'scheda-entry') return spans[i+1].textContent.trim(); 
   } 
  } 
  return null; 
 } 
 // Restituisce l'innerHTML (per campi che possono contenere tag HTML) 
 function trovaEntryHTMLDopoLabel(spans, labelTesto) { 
  for (var i = 0; i < spans.length - 1; i++) { 
   if (spans[i].className === 'scheda-label' && spans[i].textContent.trim() === labelTesto) { 
    if (spans[i+1].className === 'scheda-entry') return spans[i+1]['inn'+'erHTML'].trim(); 
   } 
  } 
  return null; 
 } 
 // Imposta il valore di un input con innerHTML come valore (per campi con HTML inline) 
 function setValHTML(id, val) { 
  var e = document.getElementById(id); 
  if (e && val !== null && val !== undefined && val !== '') e.value = val; 
 } 
 
 var spans = temp[metodo]('span'); 
 var divs  = temp[metodo]('div'); 
 
 // ── Campi testo semplici ─────────────────────────────────── 
 var mappaLabel = { 
  'Nome:':     'campo-nome', 
  'Cognome:':  'campo-cognome', 
  'Genere:':   'campo-genere', 
  'Mestiere:': 'campo-mestiere' 
 }; 
 for (var i = 0; i < spans.length - 1; i++) { 
  var lbl = spans[i].textContent.trim(); 
  if (mappaLabel[lbl] && spans[i+1].className === 'scheda-entry') { 
   setValHTML(mappaLabel[lbl], spans[i+1]['inn'+'erHTML'].trim()); 
  } 
 } 
 
 // ── Select ───────────────────────────────────────────────── 
 var mappaSelect = { 
  'Luogo di nascita:':       'campo-luogo', 
  'Segno zodiacale:':        'campo-segno', 
  'Segno zodiacale cinese:': 'campo-segnocinese', 
  'Allineamento:':           'campo-allineamento' 
 }; 
 for (var i = 0; i < spans.length - 1; i++) { 
  var lbl = spans[i].textContent.trim(); 
  if (mappaSelect[lbl] && spans[i+1].className === 'scheda-entry') { 
   setSelect(mappaSelect[lbl], spans[i+1].textContent.trim()); 
  } 
 } 
 
 // ── Razza, Specie, Fedina, Taglia, Rank, Conservazione ───── 
 for (var i = 0; i < spans.length - 1; i++) { 
  if (spans[i].className !== 'scheda-label') continue; 
  var lbl2 = spans[i].textContent.trim(); 
  var val2 = spans[i+1].className === 'scheda-entry' ? spans[i+1].textContent.trim() : null; 
  if (!val2) continue; 
  if (lbl2 === 'Razza:')                   setSelect('campo-razza', val2); 
  if (lbl2 === 'Specie:')                  setSelect('campo-specie', val2); 
  if (lbl2 === 'Fedina Penale:')           setSelect('campo-fedina', val2); 
  if (lbl2 === 'Classificazione Taglia:')  setSelect('campo-classtaglia', val2); 
  if (lbl2 === 'Valore Taglia:')           setVal('campo-valtaglia', val2.replace(/\./g,'').replace(/[^\d]/g,'')); 
  if (lbl2 === 'Classe:')                  setSelect('campo-classe', val2); 
 } 
 // Riesegui aggiornaRazza per aggiornare menù luoghi, classe, fedina ecc. 
 aggiornaRazza(false); 
 
 // ── Data di nascita ──────────────────────────────────────── 
 var dataRaw = trovaEntryDopoLabel(spans, 'Data di nascita:'); 
 if (dataRaw && dataRaw !== '—') { 
  var mesiNomi = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno', 
   'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']; 
  var parti = dataRaw.split(' '); 
  if (parti.length === 3) { 
   // "15 Marzo 2001" 
   setSelect('campo-datanascita-g', parti[0]); 
   setSelect('campo-datanascita-m', parti[1]); 
   setSelect('campo-datanascita-a', parti[2]); 
  } else if (parti.length === 2) { 
   // "15 Marzo" oppure "Marzo 2001" 
   var primoEMese = mesiNomi.indexOf(parti[0]) !== -1; 
   if (primoEMese) { 
    // "Marzo 2001" 
    setSelect('campo-datanascita-m', parti[0]); 
    setSelect('campo-datanascita-a', parti[1]); 
   } else { 
    // "15 Marzo" 
    setSelect('campo-datanascita-g', parti[0]); 
    setSelect('campo-datanascita-m', parti[1]); 
   } 
  } else if (parti.length === 1) { 
   // Solo mese o solo anno 
   if (mesiNomi.indexOf(parti[0]) !== -1) { 
    setSelect('campo-datanascita-m', parti[0]); 
   } else { 
    setSelect('campo-datanascita-a', parti[0]); 
   } 
  } 
 } 
 
 // ── Classe, Status, Livello dalla riga .dati-pg ───────────── 
 for (var i = 0; i < divs.length; i++) { 
  if (divs[i].className === 'dati-pg') { 
   var dpSpans = divs[i]['getElements'+'ByTagName']('span');
   for (var p = 0; p < dpSpans.length - 1; p++) {
    var chiave = dpSpans[p].textContent.trim().replace(':','');
    var valore = dpSpans[p+1].textContent.trim();
    if (chiave === 'Classe')  setSelect('campo-classe', valore);
    if (chiave === 'Livello') setVal('campo-livello', valore);
    if (chiave === 'Status') {
     // Lo status è un singolo span che può contenere "Hunter | Zampa"
     var statusValori = valore.split('|').map(function(s){ return s.trim(); });
     setSelect('campo-status-0', statusValori[0]);
     for (var sv=1; sv<statusValori.length; sv++) {
      aggiungiStatus();
      setSelect('campo-status-'+sv, statusValori[sv]);
     }
    }
   }
   break; 
  } 
 } 
 
 // ── EXP dalla span .dati-pg2 ─────────────────────────────── 
 for (var i = 0; i < spans.length; i++) { 
  if (spans[i].className === 'dati-pg2') { 
   var t = spans[i].textContent.trim(); 
   if (t.indexOf('/') !== -1 && t.indexOf('For') !== -1) { 
    var expParts = t.replace('For Level Up!','').trim().split('/'); 
    if (expParts.length === 2) { 
     setVal('campo-exp', expParts[0].replace(/[^\d]/g,'').trim()); 
    } 
   } 
  } 
 } 
 
 // ── Jenny e HC ───────────────────────────────────────────── 
 var soldiRaw = trovaEntryDopoLabel(spans, 'Soldi:'); 
 if (soldiRaw) { 
  var soldiParts = soldiRaw.split('/'); 
  if (soldiParts.length >= 2) { 
   setVal('campo-jenny', soldiParts[0].replace('Jenny','').replace(/\./g,'').replace(/[^\d]/g,'').trim()); 
   setVal('campo-hc',    soldiParts[1].replace('HC','').replace(/[^\d]/g,'').trim()); 
  } 
 } 
 
 // ── Aggettivi ────────────────────────────────────────────── 
 var aggTrovati = []; 
 for (var i = 0; i < spans.length; i++) { 
  if (spans[i].className === 'aggettivo') aggTrovati.push(spans[i]['inn'+'erHTML'].trim()); 
 } 
 if (aggTrovati[0]) setValHTML('campo-agg1', aggTrovati[0]); 
 if (aggTrovati[1]) setValHTML('campo-agg2', aggTrovati[1]); 
 if (aggTrovati[2]) setValHTML('campo-agg3', aggTrovati[2]); 
 
 // ── Citazione ─────────────────────────────────────────────── 
 for (var i = 0; i < divs.length; i++) { 
  if (divs[i].className === 'info-citazione') { 
   var citSpan = divs[i][metodo]('span'); 
   if (citSpan.length > 0) setValHTML('campo-citazione', citSpan[0]['inn'+'erHTML'].trim()); 
   else setValHTML('campo-citazione', divs[i]['inn'+'erHTML'].trim()); 
   break; 
  } 
 } 
 
 // ── Descrizione e Background ─────────────────────────────────── 
 // Cercati specificamente nei loro div contenitori per evitare conflitti 
 // con le label "Descrizione:" presenti nelle card nen 
 var divAspetto = temp['querySelector']('.info-aspetto'); 
 var divStoria  = temp['querySelector']('.info-storia'); 
 if (divAspetto) { 
  var aspSpans = divAspetto[metodo]('span'); 
  for (var i = 0; i < aspSpans.length - 1; i++) { 
   if (aspSpans[i].className === 'scheda-label' && aspSpans[i].textContent.trim() === 'Descrizione:' && aspSpans[i+1].className === 'scheda-entry') { 
    setTextarea('campo-aspetto', aspSpans[i+1]['inn'+'erHTML'].trim()); break; 
   } 
  } 
 } 
 if (divStoria) { 
  var storSpans = divStoria[metodo]('span'); 
  for (var i = 0; i < storSpans.length - 1; i++) { 
   if (storSpans[i].className === 'scheda-label' && storSpans[i].textContent.trim() === 'Background:' && storSpans[i+1].className === 'scheda-entry') { 
    setTextarea('campo-background', storSpans[i+1]['inn'+'erHTML'].trim()); break; 
   } 
  } 
 } 
 
 // ── Statistiche ───────────────────────────────────────────── 
 var mapStat = { 
  'Forza':'forza','Resistenza':'resistenza','Velocità':'velocita', 
  'Riflessi':'riflessi','Destrezza':'destrezza','Mira':'mira', 
  'Intelligenza':'intelligenza','Carisma':'carisma','Istinto':'istinto', 
  'Fortuna':'fortuna','Vita':'vita','Aura':'aura' 
 }; 
 for (var i = 0; i < divs.length; i++) { 
  var cn = divs[i].className; 
  if (cn === 'stat-card' || cn === 'stat-card-vitale') { 
   var labelEl = divs[i].querySelector ? divs[i].querySelector('.stat-label') : null; 
   var valueEl = divs[i].querySelector ? divs[i].querySelector('.stat-value') : null; 
   if (labelEl && valueEl) { 
    var statNome = labelEl.textContent.trim(); 
    var statVal  = valueEl.textContent.trim().replace(/\./g,'').replace(/,/g,''); 
    var statId   = mapStat[statNome]; 
    if (statId) { 
     var inp = document.getElementById('stat-' + statId); 
     if (inp) inp.value = statVal; 
     if (parseInt(statVal) > 250) { 
      var ov = document.getElementById('over-' + statId); 
      if (ov) { ov.checked = true; if (inp) inp.max = 400; } 
     } 
    } 
   } 
  } 
 } 
 
 // ── Hatsu ─────────────────────────────────────────────────── 
 for (var i = 0; i < divs.length; i++) { 
  if (divs[i].className === 'hatsu-card') { 
   var valEl = divs[i].querySelector ? divs[i].querySelector('.hatsu-card-value') : null; 
   if (valEl) setSelect('campo-hatsu', valEl.textContent.trim()); 
   break; 
  } 
 } 
 
 // ── Nen e Tenacia ─────────────────────────────────────────── 
 for (var i = 0; i < divs.length; i++) { 
  if (divs[i].className === 'barra-card') { 
   var lblEl = divs[i].querySelector ? divs[i].querySelector('.barra-card-label') : null; 
   var pctEl = divs[i].querySelector ? divs[i].querySelector('.barra-card-pct') : null; 
   if (lblEl && pctEl) { 
    var nome   = lblEl.textContent.trim(); 
    var valore = pctEl.textContent.replace('%','').trim(); 
    if (nome === 'Nen')     setVal('campo-nen', valore); 
    if (nome === 'Tenacia') setVal('campo-tenacia', valore); 
   } 
  } 
 } 
 
 // ── Potere Nen, Immagine, Profili, Tecniche ───────────────── 
 for (var i = 0; i < divs.length; i++) { 
  if (divs[i].className === 'poteri-box') { 
   var nenBoxes = divs[i][metodo]('div'); 
   var nenBoxList = []; 
   for (var nb = 0; nb < nenBoxes.length; nb++) { 
    if (nenBoxes[nb].className === 'nen-box') nenBoxList.push(nenBoxes[nb]); 
   } 
   // Box 0: Potere Nen 
   if (nenBoxList[0]) { 
    var b0spans = nenBoxList[0][metodo]('span'); 
    for (var s0=0; s0<b0spans.length-1; s0++) { 
     if (b0spans[s0].className === 'scheda-label' && b0spans[s0+1].className === 'scheda-entry') { 
      var lbl0 = b0spans[s0].textContent.trim(); 
      var val0 = b0spans[s0+1]['inn'+'erHTML'].trim(); 
      if (lbl0 === 'Nome potere:')              setVal('nen-nomepotere', val0); 
      if (lbl0 === 'Descrizione:')              setTextarea('nen-descrizione', val0); 
      if (lbl0 === 'Funzionamento e regole:')   setTextarea('nen-funzionamento', val0); 
      if (lbl0 === 'Condizioni e restrizioni:') setTextarea('nen-condizioni', val0); 
      if (lbl0 === 'Costo:')                    setTextarea('nen-costo', val0); 
     } 
    } 
   } 
   // Immagine nen 
   var nenImgEl = divs[i].querySelector ? divs[i].querySelector('.nen-img') : null; 
   if (nenImgEl) { setVal('nen-img', nenImgEl.getAttribute('src')||''); importaCrop(nenImgEl, 'img-nen'); }
   // Helper: legge le card di un nen-box e popola i campi tecnica/profilo 
   function leggiNenCards(box, prefisso, num) { 
    var cards = []; 
    var allDivs = box[metodo]('div'); 
    for (var d2=0; d2<allDivs.length; d2++) { 
     if (allDivs[d2].className === 'nen-card') cards.push(allDivs[d2]); 
    } 
    for (var ci3=0; ci3<Math.min(cards.length, num); ci3++) { 
     var titleEl2 = cards[ci3].querySelector ? cards[ci3].querySelector('.nen-card-title') : null; 
     var cardSpans = cards[ci3][metodo]('span'); 
     // nome (da titolo se disponibile, altrimenti dal primo scheda-label di tipo Nome) 
     if (titleEl2) { 
      var titoloTesto = titleEl2.textContent.trim(); 
      // Rimuove "Profilo N — " o lascia il nome tecnica 
      var dashIdx = titoloTesto.indexOf('\u2014'); 
      var nomeCard = dashIdx !== -1 ? titoloTesto.substring(dashIdx+2).trim() : titoloTesto; 
      setVal(prefisso+(ci3+1)+'-nome', nomeCard); 
     } 
     for (var cs=0; cs<cardSpans.length-1; cs++) { 
      if (cardSpans[cs].className === 'scheda-label' && cardSpans[cs+1].className === 'scheda-entry') { 
       var lc = cardSpans[cs].textContent.trim(); 
       var vc = cardSpans[cs+1]['inn'+'erHTML'].trim(); 
       if (lc === 'Descrizione:')                                   setTextarea(prefisso+(ci3+1)+'-desc',  vc); 
       if (lc === 'Bonus:' || lc === 'Effetti e/o Bonus:')          setTextarea(prefisso+(ci3+1)+'-bonus', vc); 
       if (lc === 'Condizioni e/o Restrizioni e/o Malus:')          setTextarea(prefisso+(ci3+1)+'-malus', vc); 
       if (lc === 'Costo per Fase:' || lc === 'Costo:')             setTextarea(prefisso+(ci3+1)+'-costo', vc); 
      } 
     } 
    } 
   } 
   // Rileva Speed Duel leggendo i titoli dei nen-box
   // Completo: box1 ha titolo "Profili", SD: box1 ha titolo "Tecniche 25%"
   var isSpeedDuel = true;
   if (nenBoxList[1]) {
    var titBox1 = nenBoxList[1].querySelector ? nenBoxList[1]['querySelector']('.nen-box-title') : null;
    if (titBox1 && titBox1.textContent.trim() === 'Profili') isSpeedDuel = false;
   }
   if (isSpeedDuel) {
    var rdSd = document['querySelector']('input[name="nen-modalita"][value="speedduel"]');
    if (rdSd) { rdSd.checked = true; aggiornaModoNen(); }
    // SD: box1=t25, box2=t50(1), box3=t100
    if (nenBoxList[1]) leggiNenCards(nenBoxList[1], 'tecnica-25-', 2);
    if (nenBoxList[2]) leggiNenCards(nenBoxList[2], 'tecnica-50-', 1);
    if (nenBoxList[3]) leggiNenCards(nenBoxList[3], 'tecnica-100-', 1);
   } else {
    // Completo: box1=profili, box2=t25, box3=t50, box4=t100
    if (nenBoxList[1]) leggiNenCards(nenBoxList[1], 'profilo-', 4);
    if (nenBoxList[2]) leggiNenCards(nenBoxList[2], 'tecnica-25-', 2);
    if (nenBoxList[3]) leggiNenCards(nenBoxList[3], 'tecnica-50-', 2);
    if (nenBoxList[4]) leggiNenCards(nenBoxList[4], 'tecnica-100-', 1);
   }
   break; 
  } 
 } 
 
 
 // ── Competenze ────────────────────────────────────────────── 
 var compIdx = 0; 
 for (var i = 0; i < divs.length && compIdx < 5; i++) { 
  if (divs[i].className === 'competenza-card bloccata') { compIdx++; continue; } 
  if (divs[i].className === 'competenza-card') { 
   var nomeEl = divs[i].querySelector ? divs[i].querySelector('.competenza-nome') : null; 
   var lvEl   = divs[i].querySelector ? divs[i].querySelector('.competenza-livello') : null; 
   var descEl = divs[i].querySelector ? divs[i].querySelector('.competenza-desc') : null; 
   var oggEl  = divs[i].querySelector ? divs[i].querySelector('.competenza-oggetto') : null; 
   if (nomeEl) setValHTML('comp-nome-'    + compIdx, nomeEl['inn'+'erHTML'].trim()); 
   if (lvEl)   setVal('comp-lv-'          + compIdx, lvEl.textContent.replace('Lv.','').trim()); 
   if (descEl) setTextarea('comp-desc-'   + compIdx, descEl['inn'+'erHTML'].trim()); 
   if (oggEl) { 
    var oggSpanLabel = oggEl.querySelector ? oggEl.querySelector('.competenza-oggetto-label') : null; 
    var oggTesto = oggEl.textContent; 
    if (oggSpanLabel) oggTesto = oggTesto.replace(oggSpanLabel.textContent, '').trim(); 
    setVal('comp-oggetto-' + compIdx, oggTesto.trim()); 
   } 
   compIdx++; 
  } 
 } 
 
 // ── Baule ─────────────────────────────────────────────────── 
 var catMap    = ['armi','equip','oggetti','materiali']; 
 var catTitoli = ['Armi','Equipaggiamento','Oggetti Extra','Materiali']; 
 for (var i = 0; i < divs.length; i++) { 
  if (divs[i].className === 'equip-box') { 
   var titleEl = divs[i].querySelector ? divs[i].querySelector('.equip-box-title') : null; 
   if (!titleEl) continue; 
   var titolo = titleEl.textContent.trim(); 
   var catIdx = catTitoli.indexOf(titolo); 
   if (catIdx === -1) continue; 
   var catId = catMap[catIdx]; 
   var items = divs[i][metodo]('li'); 
   for (var li = 0; li < items.length; li++) { 
    var nameEl = items[li].querySelector ? items[li].querySelector('.equip-item-name') : null; 
    var infoEl = items[li].querySelector ? items[li].querySelector('.equip-item-info') : null; 
    if (!nameEl) continue; 
    aggiungiItem(catId); 
    var listaCat = document.getElementById('lista-' + catId); 
    if (!listaCat) continue; 
    var bIdx = listaCat.children.length - 1; 
    setVal(catId + '-nome-' + bIdx, nameEl.textContent.trim()); 
    if (infoEl) { 
     var infoTesto = infoEl.textContent; 
     var qtMatch  = infoTesto.match(/Qt:\s*(\S+)/); 
     if (qtMatch) setVal(catId + '-qt-' + bIdx, qtMatch[1]); 
     var lvMatch  = infoTesto.match(/Lv\.\s*(\S+)/); 
     if (lvMatch && catId !== 'oggetti' && catId !== 'materiali') { 
      var lvVal = parseInt(lvMatch[1]) || 0; 
      if (lvVal > 5) lvVal = 5; 
      setVal(catId + '-lv-' + bIdx, lvVal); 
     } 
     var usiMatch = infoTesto.match(/Usi:\s*(\S+)/); 
     if (usiMatch && catId === 'oggetti') setVal(catId + '-usi-' + bIdx, usiMatch[1]); 
     // Espansione: legge il link se presente, altrimenti il testo 
     var expAnchor = infoEl.querySelector ? infoEl.querySelector('a') : null; 
     if (expAnchor) { 
      setVal(catId + '-exp-nome-' + bIdx, expAnchor.textContent.trim()); 
      setVal(catId + '-exp-link-' + bIdx, expAnchor.getAttribute('href') || ''); 
     } 
    }
    // Descrizione
    var descEl = items[li].querySelector ? items[li].querySelector('.equip-item-desc') : null;
    if (descEl) setVal(catId + '-desc-' + bIdx, descEl.innerHTML.trim());
   } 
  } 
 } 
 
 // ── Immagini ─────────────────────────────────────────────── 
 // Header 
 // ── Helper: legge data-cx/cy/cw/ch dall'<img> importata e popola gli hidden input ──
 function importaCrop(imgEl, cropId) {
  if (!imgEl) return;
  var x = parseFloat(imgEl.getAttribute('data-cx'));
  var y = parseFloat(imgEl.getAttribute('data-cy'));
  var w = parseFloat(imgEl.getAttribute('data-cw'));
  var h = parseFloat(imgEl.getAttribute('data-ch'));
  if (!isNaN(x) && !isNaN(y) && !isNaN(w) && !isNaN(h)) {
   // Prima di scrivere i crop, allineiamo data-crop-url del bottone
   // all'URL appena importato. cropScrivi chiama cropAggiornaBottone,
   // che ha una guardia: se l'URL corrente ≠ data-crop-url, AZZERA i
   // crop (pensando che l'immagine sia cambiata). Senza questo
   // allineamento la guardia scatterebbe e resetterebbe l'inquadratura
   // appena importata dalla scheda.
   var btn = document.getElementById('crop-btn-' + cropId);
   var urlEl = document.getElementById({
    'img-laterale':'campo-img-laterale','img-dati':'campo-img-dati',
    'img-info':'campo-img-info','img-info-a':'campo-img-info-a',
    'img-info-b':'campo-img-info-b','img-nen':'nen-img'
   }[cropId]);
   if (btn && urlEl) btn.setAttribute('data-crop-url', urlEl.value ? urlEl.value.trim() : '');
   cropScrivi(cropId, x, y, w, h);
  }
 }

 var divLaterale = temp['querySelector']('.scheda-img'); 
 if (divLaterale) { var iL = divLaterale['querySelector']('img'); if (iL) { setVal('campo-img-laterale', iL.getAttribute('src')||''); importaCrop(iL, 'img-laterale'); } }
 // Slide Dati 
 var divDati = temp['querySelector']('.img-dati'); 
 if (divDati) { var iD = divDati['querySelector']('img'); if (iD) { setVal('campo-img-dati', iD.getAttribute('src')||''); importaCrop(iD, 'img-dati'); } }
 // Slide Info: controlla se img-info2 (due immagini) o img-info (una) 
 var divInfo2 = temp['querySelector']('.img-info2'); 
 var divInfo1 = temp['querySelector']('.img-info'); 
 if (divInfo2) { 
  var radioDue = document['querySelector']('input[name="img-info-modo"][value="2"]'); 
  if (radioDue) { radioDue.checked = true; aggiornaInputImgInfo(); } 
  var infoImgs = divInfo2['querySelectorAll']('img'); 
  if (infoImgs[0]) { setVal('campo-img-info-a', infoImgs[0].getAttribute('src')||''); importaCrop(infoImgs[0], 'img-info-a'); }
  if (infoImgs[1]) { setVal('campo-img-info-b', infoImgs[1].getAttribute('src')||''); importaCrop(infoImgs[1], 'img-info-b'); }
 } else if (divInfo1) { 
  var radioUna = document['querySelector']('input[name="img-info-modo"][value="1"]'); 
  if (radioUna) { radioUna.checked = true; aggiornaInputImgInfo(); } 
  var iI = divInfo1['querySelector']('img'); 
  if (iI) { setVal('campo-img-info', iI.getAttribute('src')||''); importaCrop(iI, 'img-info'); }
 } 
 
 // ── Musica (src iframe YouTube / SoundCloud) ──────────────────────────── 
 var iframes = temp[metodo]('iframe'); 
 for (var i = 0; i < iframes.length; i++) { 
  var src = iframes[i].getAttribute('src') || ''; 
  var matchYT = src.match(/embed\/([^?&]+)/); 
  var matchSC = src.match(/api\.soundcloud\.com\/tracks\/([^"&?]+)/); 
  if (matchYT) { setVal('campo-musica', matchYT[1]); var pEl=document.getElementById('campo-musica-piattaforma'); if(pEl){pEl.value='youtube';aggiornaMusicaHelp();} break; } 
  if (matchSC) { setVal('campo-musica', matchSC[1]); var pEl=document.getElementById('campo-musica-piattaforma'); if(pEl){pEl.value='soundcloud';aggiornaMusicaHelp();} break; } 
 } 
 
 // Salva classe e style inline del div radice per "Mantieni attuale" 
 var radice = temp.firstElementChild; 
 stato.schedaOriginale = radice; 
 stato.pgId = radice ? (radice.getAttribute('data-pgid') || null) : null; 
 if (radice) { 
  stato.classeOriginale = radice.getAttribute('class') || ''; 
  stato.styleOriginale  = radice.getAttribute('style') || ''; 
 } 
 document.getElementById('campo-importa').value = ''; 

 // ── Modalità ACCREDITI: cattura i valori base e prepara il form ── 
 if (stato.modalita === 'accrediti') { 
  accCatturaBase(temp); 
  accPopolaDopoImport(); 
  return; 
 } 

 aggiornaCompetenze(); 
 // Salva la bozza con i dati appena importati: i setVal dell'import 
 // non emettono eventi, quindi senza questa scrittura esplicita la 
 // scheda importata non finirebbe in memoria (e ricaricando la 
 // pagina la si perderebbe). 
 if (typeof bozzaScriviOra === 'function') bozzaScriviOra(); 
 alert('Dati importati! Controlla i campi e poi genera la scheda.'); 
} 

// Legge i valori base del PG dal DOM importato (indipendente dai campi form) 
function accCatturaBase(temp) { 
 var metodo = 'getElements' + 'ByTagName'; 
 var divs = temp[metodo]('div'); 
 var spans = temp[metodo]('span'); 

 function entryDopoLabel(label) { 
  for (var i = 0; i < spans.length - 1; i++) { 
   if (spans[i].className === 'scheda-label' && spans[i].textContent.trim() === label && spans[i+1].className === 'scheda-entry') { 
    return spans[i+1].textContent.trim(); 
   } 
  } 
  return null; 
 } 

 // Livello dalla riga .dati-pg 
 var livello = 0, exp = 0; 
 for (var i = 0; i < divs.length; i++) { 
  if (divs[i].className === 'dati-pg') { 
   var dp = divs[i][metodo]('span'); 
   for (var p = 0; p < dp.length - 1; p++) { 
    if (dp[p].textContent.trim().replace(':','') === 'Livello') livello = parseInt(dp[p+1].textContent.replace(/[^\d]/g,'')) || 0; 
   } 
   break; 
  } 
 } 
 // EXP dalla span .dati-pg2 
 for (var j = 0; j < spans.length; j++) { 
  if (spans[j].className === 'dati-pg2') { 
   var t = spans[j].textContent.trim(); 
   if (t.indexOf('/') !== -1 && t.indexOf('For') !== -1) { 
    var ep = t.replace('For Level Up!','').trim().split('/'); 
    if (ep.length === 2) exp = parseInt(ep[0].replace(/[^\d]/g,'')) || 0; 
   } 
  } 
 } 
 // Vita, Aura, Tenacia, stat dalle card 
 var vita = 300, aura = 500, tenacia = 10; 
 var statVal = {}; 
 var mapStat = { 'Forza':'forza','Resistenza':'resistenza','Velocità':'velocita','Riflessi':'riflessi','Destrezza':'destrezza','Mira':'mira','Intelligenza':'intelligenza','Carisma':'carisma','Istinto':'istinto','Fortuna':'fortuna' }; 
 for (var d = 0; d < divs.length; d++) { 
  var cn = divs[d].className; 
  if (cn === 'stat-card' || cn === 'stat-card-vitale') { 
   var lblEl = divs[d].querySelector ? divs[d].querySelector('.stat-label') : null; 
   var valEl = divs[d].querySelector ? divs[d].querySelector('.stat-value') : null; 
   if (lblEl && valEl) { 
    var nome = lblEl.textContent.trim(); 
    var v = parseInt(valEl.textContent.replace(/[^\d]/g,'')) || 0; 
    if (nome === 'Vita') vita = v; 
    else if (nome === 'Aura') aura = v; 
    else if (mapStat[nome]) statVal[mapStat[nome]] = v; 
   } 
  } 
  if (cn === 'barra-card') { 
   var bl = divs[d].querySelector ? divs[d].querySelector('.barra-card-label') : null; 
   var bp = divs[d].querySelector ? divs[d].querySelector('.barra-card-pct') : null; 
   if (bl && bp && bl.textContent.trim() === 'Tenacia') tenacia = parseInt(bp.textContent.replace('%','')) || 0; 
  } 
 } 
 // Razza e specie 
 var razza = entryDopoLabel('Razza:') || 'Umano'; 
 var specie = entryDopoLabel('Specie:') || ''; 

 // Jenny / HC dalla riga Soldi 
 var jenny = 0, hc = 0; 
 var soldiRaw = entryDopoLabel('Soldi:'); 
 if (soldiRaw) { 
  var sp = soldiRaw.split('/'); 
  if (sp.length >= 2) { 
   jenny = parseInt(sp[0].replace(/\./g,'').replace(/[^\d]/g,'')) || 0; 
   hc = parseInt(sp[1].replace(/[^\d]/g,'')) || 0; 
  } 
 } 
 // Nen dalla barra-card 
 var nen = 0; 
 for (var bn = 0; bn < divs.length; bn++) { 
  if (divs[bn].className === 'barra-card') { 
   var ble = divs[bn].querySelector ? divs[bn].querySelector('.barra-card-label') : null; 
   var bpe = divs[bn].querySelector ? divs[bn].querySelector('.barra-card-pct') : null; 
   if (ble && bpe && ble.textContent.trim() === 'Nen') nen = parseInt(bpe.textContent.replace('%','')) || 0; 
  } 
 } 

 // Status dalla riga .dati-pg 
 var statusAtt = 'Nessuno'; 
 for (var ds = 0; ds < divs.length; ds++) { 
  if (divs[ds].className === 'dati-pg') { 
   var spDp = divs[ds][metodo]('span'); 
   for (var p2 = 0; p2 < spDp.length - 1; p2++) { 
    if (spDp[p2].textContent.trim().replace(':','') === 'Status') statusAtt = spDp[p2+1].textContent.trim() || 'Nessuno'; 
   } 
   break; 
  } 
 } 
 // Baule dagli .equip-box 
 var bauleAtt = { armi:[], equip:[], oggetti:[], materiali:[] }; 
 var catTit = { 'Armi':'armi','Equipaggiamento':'equip','Oggetti Extra':'oggetti','Materiali':'materiali' }; 
 for (var eb = 0; eb < divs.length; eb++) { 
  if (divs[eb].className === 'equip-box') { 
   var tEl = divs[eb].querySelector ? divs[eb].querySelector('.equip-box-title') : null; 
   if (!tEl) continue; 
   var catId2 = catTit[tEl.textContent.trim()]; 
   if (!catId2) continue; 
   var lis = divs[eb][metodo]('li'); 
   for (var li2 = 0; li2 < lis.length; li2++) { 
    var nmEl = lis[li2].querySelector ? lis[li2].querySelector('.equip-item-name') : null; 
    var inEl = lis[li2].querySelector ? lis[li2].querySelector('.equip-item-info') : null; 
    if (nmEl) { 
     var infoTxt = inEl ? inEl.textContent.trim() : ''; 
     var qtM = infoTxt.match(/Qt:\s*(\S+)/); 
     var lvM = infoTxt.match(/Lv\.\s*(\S+)/); 
     var usiM = infoTxt.match(/Usi:\s*(\S+)/); 
     bauleAtt[catId2].push({ 
      nome: nmEl.textContent.trim(), 
      qt: qtM ? qtM[1] : '', 
      lv: lvM ? lvM[1] : '', 
      usi: usiM ? usiM[1] : '' 
     }); 
    } 
   } 
  } 
 } 

 stato.accBase = { 
  livello: livello, exp: exp, vita: vita, aura: aura, tenacia: tenacia, 
  razza: razza, specie: specie, stat: statVal, 
  jenny: jenny, hc: hc, nen: nen, 
  fedina: entryDopoLabel('Fedina Penale:') || 'Incensurato', 
  classTaglia: entryDopoLabel('Classificazione Taglia:') || 'E', 
  valTaglia: (entryDopoLabel('Valore Taglia:') || '').replace(/\s*Jenny/i,'').trim(), 
  status: statusAtt, baule: bauleAtt 
 }; 
} 

// Dopo l'import in accrediti: popola il riquadro "stato attuale", 
// semina i valori base delle stat, precompila Jenny/HC/Nen/status. 
function accPopolaDopoImport() { 
 var b = stato.accBase; 
 if (!b) return; 
 var attuale = document.getElementById('prog-attuale'); 
 if (attuale) { 
  attuale.innerHTML = '<b style="color:#CFF09E;">Livello attuale:</b> ' + b.livello + 
   ' &nbsp;·&nbsp; <b style="color:#CFF09E;">EXP:</b> ' + b.exp + '/' + calcolaExpTot(b.livello) + 
   ' &nbsp;·&nbsp; <b style="color:#CFF09E;">Vita:</b> ' + b.vita + 
   ' &nbsp;·&nbsp; <b style="color:#CFF09E;">Aura:</b> ' + b.aura + 
   ' &nbsp;·&nbsp; <b style="color:#CFF09E;">Tenacia:</b> ' + b.tenacia + '%'; 
 } 
 // Semina le stat base nella sezione distribuzione 
 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
 for (var i = 0; i < ls.length; i++) { 
  var val = b.stat[ls[i]] != null ? b.stat[ls[i]] : 5; 
  var baseEl = document.getElementById('accstat-base-'+ls[i]); 
  var dispEl = document.getElementById('accstat-'+ls[i]); 
  var exEl   = document.getElementById('accstat-extra-'+ls[i]); 
  if (baseEl) baseEl.textContent = val; 
  if (dispEl) dispEl.textContent = val; 
  if (exEl) exEl.value = '0'; 
  // Pre-attiva la checkbox "over" se la stat importata supera 250 
  var ovEl = document.getElementById('over-'+ls[i]); 
  if (ovEl) ovEl.checked = (parseInt(val) > 250); 
 } 
 // Vita/Aura readonly 
 var vEl = document.getElementById('accstat-vita'); if (vEl) vEl.textContent = b.vita; 
 var aEl = document.getElementById('accstat-aura'); if (aEl) aEl.textContent = b.aura; 
 // Valori diretti: Jenny/HC attuali (readonly) + reset campi aggiunta 
 var jAtt = document.getElementById('acc-jenny-attuale'); if (jAtt) jAtt.textContent = (b.jenny||0).toLocaleString() + ' Jenny'; 
 var hAtt = document.getElementById('acc-hc-attuale');    if (hAtt) hAtt.textContent = (b.hc||0) + ' HC'; 
 var jAdd = document.getElementById('acc-jenny-add'); if (jAdd) jAdd.value = '0'; 
 var hAdd = document.getElementById('acc-hc-add');    if (hAdd) hAdd.value = '0'; 
 var jOp = document.getElementById('acc-jenny-op'); if (jOp) jOp.value = 'add'; 
 var hOp = document.getElementById('acc-hc-op');    if (hOp) hOp.value = 'add'; 
 accAggiornaTotali(); 
 // Nen: precompila col valore attuale 
 var nenEl = document.getElementById('acc-nen'); if (nenEl) nenEl.value = (b.nen != null ? b.nen : 0); 
 // Fedina / Taglia: riflette lo stato attuale del PG 
 var feEl = document.getElementById('campo-fedina'); 
 if (feEl) feEl.value = (b.fedina === 'Ricercato') ? 'Ricercato' : 'Incensurato'; 
 var ctEl = document.getElementById('campo-classtaglia'); 
 if (ctEl && b.classTaglia && b.classTaglia !== 'E') { 
  for (var ci = 0; ci < ctEl.options.length; ci++) { if (ctEl.options[ci].value === b.classTaglia) { ctEl.selectedIndex = ci; break; } } 
 } 
 var vtEl = document.getElementById('campo-valtaglia'); 
 if (vtEl && b.valTaglia) vtEl.value = b.valTaglia; 
 if (vtEl) vtEl.onchange = validaValoreTaglia; 
 if (typeof accAggiornaFedina === 'function') accAggiornaFedina(); 
 accAggiornaContatore(); 
} 
 
function rimuoviElemento(id) { 
 var el = document.getElementById(id); 
 if (el && el.parentNode) el.parentNode.removeChild(el); 
 if (typeof bozzaSalva === 'function') bozzaSalva(); 
} 

// ============================================================ 
// RACCOLTA DATI — MODALITÀ ACCREDITI 
// Compone d leggendo dalla scheda importata i campi NON toccati 
// (così aggiornaHTMLScheda li riscrive identici) e sovrascrive solo 
// i campi economici col motore + input staffer. 
// ============================================================ 
function raccogliDatiAccrediti() { 
 var root = stato.schedaOriginale; 
 var b = stato.accBase || {}; 
 var prog = stato.progressione; 
 var metodo = 'getElements' + 'ByTagName'; 

 function entry(label) { 
  if (!root) return ''; 
  var spans = root[metodo]('span'); 
  for (var i = 0; i < spans.length - 1; i++) { 
   if (spans[i].className === 'scheda-label' && spans[i].textContent.trim() === label && spans[i+1].className === 'scheda-entry') { 
    return spans[i+1]['inn'+'erHTML'].trim(); 
   } 
  } 
  return ''; 
 } 
 function sel1(s) { return root && root.querySelector ? root.querySelector(s) : null; } 

 // Legge la Classe dalla riga .dati-pg (non è uno scheda-entry) 
 function leggiClasseDatiPg() { 
  if (!root) return '—'; 
  var dps = root[metodo]('div'); 
  for (var i = 0; i < dps.length; i++) { 
   if (dps[i].className === 'dati-pg') { 
    var sp = dps[i][metodo]('span'); 
    for (var p = 0; p < sp.length - 1; p++) { 
     if (sp[p].textContent.trim().replace(':','') === 'Classe') { 
      var v = sp[p+1].textContent.trim(); 
      return (v && v !== 'N/D') ? v : '—'; 
     } 
    } 
   } 
  } 
  return '—'; 
 } 

 var livello, exp, exptot, vita, aura, tenacia; 
 if (prog) { 
  livello = prog.livelloA; exp = prog.expResidua; exptot = prog.expTotProssima; 
  vita = prog.vitaA; aura = prog.auraA; tenacia = prog.tenaciaA; 
 } else { 
  livello = b.livello || 0; exp = b.exp || 0; exptot = calcolaExpTot(livello); 
  vita = b.vita || 300; aura = b.aura || 500; tenacia = b.tenacia != null ? b.tenacia : 10; 
 } 

 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
 var stat = {}; 
 for (var i = 0; i < ls.length; i++) { 
  var baseEl = document.getElementById('accstat-base-'+ls[i]); 
  var exEl   = document.getElementById('accstat-extra-'+ls[i]); 
  var baseV = baseEl ? (parseInt(baseEl.textContent) || 0) : (b.stat && b.stat[ls[i]] != null ? b.stat[ls[i]] : 5); 
  var exV   = exEl ? (parseInt(exEl.value) || 0) : 0; 
  stat[ls[i]] = String(baseV + exV); 
 } 
 stat.vita = String(vita); 
 stat.aura = String(aura); 

 // over: legge lo stato dalle checkbox del form (riflette le modifiche staffer) 
 var ovSt = []; 
 var lsOv = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
 for (var oi = 0; oi < lsOv.length; oi++) { 
  var ovc = document.getElementById('over-'+lsOv[oi]); 
  if (ovc && ovc.checked) ovSt.push(lsOv[oi]); 
 } 

 // Jenny / HC: valore attuale (da accBase) +/- importo secondo operazione 
 var jAtt = b.jenny != null ? b.jenny : 0; 
 var hAtt = b.hc != null ? b.hc : 0; 
 var jDelta = accImportoFirmato('acc-jenny-add', 'acc-jenny-op'); 
 var hDelta = accImportoFirmato('acc-hc-add', 'acc-hc-op'); 
 var jenny = jAtt + jDelta; 
 var hc = String(hAtt + hDelta); 

 var nenEl = document.getElementById('acc-nen'); 
 var nen = (nenEl && nenEl.value.trim() !== '') ? (parseInt(nenEl.value) || 0) : (b.nen != null ? b.nen : 0); 

 var status = (function(){ 
  var lista = document.getElementById('lista-status'); 
  if (!lista) return 'Nessuno'; 
  var valori = []; 
  for (var si = 0; si < lista.children.length; si++) { 
   var s = document.getElementById('campo-status-'+si); 
   if (s && s.value) valori.push(s.value); 
  } 
  return valori.length > 0 ? valori.join(' | ') : 'Nessuno'; 
 })(); 

 var feEl = document.getElementById('campo-fedina'); 
 var fedina = feEl ? feEl.value : 'Incensurato'; 
 var classTaglia = '—', valTaglia = '—'; 
 if (fedina === 'Ricercato') { 
  var cte = document.getElementById('campo-classtaglia'); 
  var vte = document.getElementById('campo-valtaglia'); 
  classTaglia = cte ? cte.value : 'E'; 
  var vtRaw = vte ? (parseInt(vte.value.replace(/\./g,'').replace(/[^\d]/g,'')) || VALORE_TAGLIA_BASE[classTaglia]) : VALORE_TAGLIA_BASE[classTaglia]; 
  var vtMin = VALORE_TAGLIA_BASE[classTaglia] || VALORE_TAGLIA_BASE['E']; 
  if (vtRaw < vtMin) vtRaw = vtMin; 
  valTaglia = vtRaw.toLocaleString(); 
 } 

 var cats = ['armi','equip','oggetti','materiali']; 
 var baule = {}; 
 for (var cc = 0; cc < cats.length; cc++) { 
  baule[cats[cc]] = []; 
  var lb = document.getElementById('lista-'+cats[cc]); 
  if (lb) { 
   for (var bb = 0; bb < lb.children.length; bb++) { 
    var item = {}; 
    var nE = document.getElementById(cats[cc]+'-nome-'+bb); 
    var qE = document.getElementById(cats[cc]+'-qt-'+bb); 
    item.nome = nE ? nE.value.trim() : ''; 
    item.qt = qE ? qE.value.trim() : '1'; 
    if (cats[cc]==='oggetti') { var uE=document.getElementById(cats[cc]+'-usi-'+bb); item.usi=uE?uE.value.trim():'0/1'; } 
    else if (cats[cc]!=='materiali') { var lE=document.getElementById(cats[cc]+'-lv-'+bb); item.lv=lE?lE.value.trim():'0'; } 
    var enE=document.getElementById(cats[cc]+'-exp-nome-'+bb); 
    var elE=document.getElementById(cats[cc]+'-exp-link-'+bb); 
    var dE=document.getElementById(cats[cc]+'-desc-'+bb); 
    item.expNome=enE?enE.value.trim():''; 
    item.expLink=elE?elE.value.trim():''; 
    item.desc=dE?dE.value.trim():''; 
    if (item.nome) baule[cats[cc]].push(item); 
   } 
  } 
 } 

 var nomecognomeEl = sel1('.nomecognome'); 

 // Campi NON toccati dall'accredito: vanno letti REALI dalla scheda, 
 // perché aggiornaHTMLScheda li riscrive incondizionatamente. Passare 
 // stringhe vuote li cancellerebbe (es. background, aspetto, aggettivi). 
 function entryInDiv(divSel, label) { 
  var dv = sel1(divSel); 
  if (!dv) return ''; 
  var sp = dv[metodo]('span'); 
  for (var i = 0; i < sp.length - 1; i++) { 
   if (sp[i].className === 'scheda-label' && sp[i].textContent.trim() === label && sp[i+1].className === 'scheda-entry') { 
    return sp[i+1]['inn'+'erHTML'].trim(); 
   } 
  } 
  return ''; 
 } 
 var aggEls = root ? root[metodo]('span') : []; 
 var aggList = []; 
 for (var ae = 0; ae < aggEls.length; ae++) { if (aggEls[ae].className === 'aggettivo') aggList.push(aggEls[ae]['inn'+'erHTML'].trim()); } 
 var citEl = sel1('.info-citazione'); 
 var citazione = ''; 
 if (citEl) { var cs = citEl[metodo]('span'); citazione = cs.length > 0 ? cs[0]['inn'+'erHTML'].trim() : citEl['inn'+'erHTML'].trim(); } 
 var hatsuEl = sel1('.hatsu-card-value'); 

 var d = { 
  pgId: stato.pgId || generaPgId(), 
  nome: entry('Nome:') || '—', 
  cognome: entry('Cognome:') || '', 
  nomecognome: nomecognomeEl ? nomecognomeEl['inn'+'erHTML'].trim() : (entry('Nome:')||'—'), 
  genere: entry('Genere:') || '—', 
  razza: b.razza || 'Umano', 
  specie: b.specie || '', 
  rank: entry('Rank di Pericolosità:') || '—', 
  conservazione: entry('Stato di Conservazione:') || '—', 
  luogo: entry('Luogo di nascita:') || '—', 
  datanascita: entry('Data di nascita:') || '—', 
  segno: entry('Segno zodiacale:') || '—', 
  segnocinese: entry('Segno zodiacale cinese:') || '—', 
  allineamento: entry('Allineamento:') || '—', 
  mestiere: entry('Mestiere:') || '—', 
  classe: leggiClasseDatiPg(), 
  fedina: fedina, classTaglia: classTaglia, valTaglia: valTaglia, 
  status: status, 
  livello: livello, exp: exp, exptot: exptot, 
  jenny: jenny, hc: hc, 
  nen: nen, tenacia: tenacia, 
  stat: stat, ovSt: ovSt, baule: baule, 
  // Campi non toccati: valori REALI dalla scheda importata 
  agg1: aggList[0] || '', agg2: aggList[1] || '', agg3: aggList[2] || '', 
  citazione: citazione, 
  aspetto: entryInDiv('.info-aspetto', 'Descrizione:'), 
  background: entryInDiv('.info-storia', 'Background:'), 
  hatsu: hatsuEl ? hatsuEl.textContent.trim() : null, 
  // Non toccati e non sovrascritti da aggiornaHTMLScheda (protetti da guardie): 
  competenze: null, 
  nenPotere: null, nenImg: '', profili: null, 
  tecniche: null, tecniche25: null, tecniche50: null, tecniche100: null, 
  musica: null, musicaPiattaforma: 'youtube', imgInfoModo: null, 
  // Immagini: null → setImg salta (nessun url), le lascia com'erano 
  imgLaterale: null, imgDati: null, imgInfo: null, imgInfoA: null, imgInfoB: null 
 }; 
 return d; 
} 

// ============================================================ 
// RACCOLTA DATI DAL FORM 
// ============================================================ 
function raccogliDati(isNuova) { 
 // ── RAMO ACCREDITI ──────────────────────────────────────── 
 if (stato.modalita === 'accrediti') { 
  return raccogliDatiAccrediti(); 
 } 
 function val(id) { var e=document.getElementById(id); return e?e.value.trim():''; } 
 
 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
 var stat = {}; 
 function leggiStat(id, def) { 
  var e = document.getElementById(id); 
  if (!e) return def; 
  var v = (e.tagName === 'INPUT') ? e.value.trim() : e.textContent.trim(); 
  return (v !== '' && v !== '0') ? v : def; 
 } 
 for (var i=0;i<ls.length;i++) { 
  stat[ls[i]] = leggiStat('stat-'+ls[i], '5'); 
 } 
 stat.vita = leggiStat('stat-vita', '300'); 
 stat.aura = leggiStat('stat-aura', '500'); 
 
 var ovSt = []; 
 if (!isNuova) { 
  for (var j=0;j<ls.length;j++) { 
   var ov=document.getElementById('over-'+ls[j]); 
   if (ov&&ov.checked) ovSt.push(ls[j]); 
  } 
 } 
 
 var cats = ['armi','equip','oggetti','materiali']; 
 var baule = {}; 
 for (var c=0;c<cats.length;c++) { 
  baule[cats[c]] = []; 
  var lb=document.getElementById('lista-'+cats[c]); 
  if (lb) { 
   for (var bb=0;bb<lb.children.length;bb++) { 
    var item={}; 
    var nE=document.getElementById(cats[c]+'-nome-'+bb); 
    var qE=document.getElementById(cats[c]+'-qt-'+bb); 
    item.nome=nE?nE.value.trim():''; 
    item.qt=qE?qE.value.trim():'1'; 
    if (cats[c]==='oggetti') { var uE=document.getElementById(cats[c]+'-usi-'+bb); item.usi=uE?uE.value.trim():'0/1'; } 
    else if (cats[c]!=='materiali') { var lE=document.getElementById(cats[c]+'-lv-'+bb); item.lv=lE?lE.value.trim():'0'; } 
    var enE=document.getElementById(cats[c]+'-exp-nome-'+bb); 
    var elE=document.getElementById(cats[c]+'-exp-link-'+bb); 
    var dE=document.getElementById(cats[c]+'-desc-'+bb);
    item.expNome=enE?enE.value.trim():''; 
    item.expLink=elE?elE.value.trim():'';
    item.desc=dE?dE.value.trim():''; 
    if (item.nome) baule[cats[c]].push(item); 
   } 
  } 
 } 
 
 var competenze = []; 
 if (!isNuova) { 
  for (var k=0;k<5;k++) { 
   competenze.push({ 
    nome:val('comp-nome-'+k), lv:val('comp-lv-'+k), 
    oggetto:val('comp-oggetto-'+k), desc:val('comp-desc-'+k), 
    sbloccato: !!val('comp-nome-'+k) 
   }); 
  } 
 } 
 
 var isBestia = (function(){ var e=document.getElementById('campo-razza'); return e && e.value==='Bestia Demoniaca'; })(); 
 var specie = isBestia ? (val('campo-specie')||'') : ''; 
 var rank = isBestia && DATI_SPECIE[specie] ? DATI_SPECIE[specie].rank : '—'; 
 var conservazione = isBestia && DATI_SPECIE[specie] ? DATI_SPECIE[specie].conservazione : '—'; 
 // Fedina: in Nuova può essere una select (umani/bestie non-A/B/C) o 
 // un readonly "Ricercato" (bestie A/B/C forzate). Si legge da quello 
 // visibile. In Modifica è sempre la select. 
 var fedina; 
 if (isNuova) { 
  var feN = document.getElementById('campo-fedina'); 
  var fvN = document.getElementById('campo-fedina-val'); 
  var readonlyFedinaVis = fvN && fvN.style.display !== 'none'; 
  if (readonlyFedinaVis) fedina = fvN.textContent.trim(); 
  else fedina = feN ? feN.value : 'Incensurato'; 
 } else { 
  var fe = document.getElementById('campo-fedina'); 
  fedina = fe ? fe.value : 'Incensurato'; 
 } 
 // Taglia 
 var classTaglia = '—', valTaglia = '—'; 
 if (fedina === 'Ricercato') { 
  if (isNuova) { 
   var ctv = document.getElementById('campo-classtaglia-val'); 
   var vtv = document.getElementById('campo-valtaglia-val'); 
   classTaglia = ctv ? ctv.textContent.trim() : 'E'; 
   valTaglia   = vtv ? vtv.textContent.trim() : '1.000'; 
  } else { 
   // La classificazione si legge dalla select (che ora include E quando 
   // riservata alle bestie A/B/C). Il valore è manuale ma non può 
   // scendere sotto il minimo della classificazione scelta. 
   var cte = document.getElementById('campo-classtaglia'); 
   var vte = document.getElementById('campo-valtaglia'); 
   classTaglia = cte ? cte.value : 'E'; 
   var vtRaw = vte ? parseInt(vte.value.replace(/\./g,'').replace(/,/g,'').replace(/[^\d]/g,'')) || VALORE_TAGLIA_BASE[classTaglia] : VALORE_TAGLIA_BASE[classTaglia]; 
   var vtMin = VALORE_TAGLIA_BASE[classTaglia] || VALORE_TAGLIA_BASE['E']; 
   if (vtRaw < vtMin) vtRaw = vtMin; 
   valTaglia = vtRaw.toLocaleString(); 
  } 
 } 
 
 var nomeVal = val('campo-nome')||'—';
 var cognomeVal = val('campo-cognome')||'';

 // Cap lv 5 per armi ed equip 
 for (var ci2=0;ci2<cats.length;ci2++) { 
  if (cats[ci2]==='oggetti'||cats[ci2]==='materiali') continue; 
  for (var bi2=0;bi2<baule[cats[ci2]].length;bi2++) { 
   var lvi = parseInt(baule[cats[ci2]][bi2].lv) || 0; 
   if (lvi > 5) baule[cats[ci2]][bi2].lv = '5'; 
  } 
 } 
 
 return { 
  pgId: isNuova ? generaPgId() : (stato.pgId || generaPgId()), 
  nome: nomeVal, 
  cognome: cognomeVal, 
  nomecognome: (nomeVal==='—'&&cognomeVal==='') ? nomeVal : (nomeVal+' '+cognomeVal).trim(), 
  genere: val('campo-genere')||'—', 
  razza: isBestia ? 'Bestia Demoniaca' : 'Umano', 
  specie: specie, 
  rank: rank, 
  conservazione: conservazione, 
  fedina: fedina, 
  classTaglia: classTaglia, 
  valTaglia: valTaglia, 
  luogo: val('campo-luogo')||'—', 
  datanascita: leggiData('campo-datanascita'), 
  segno: val('campo-segno')||'—', 
  segnocinese: val('campo-segnocinese')||'—', 
  allineamento: val('campo-allineamento')||'—', 
  mestiere: val('campo-mestiere')||'—', 
  classe: isBestia ? '—' : (val('campo-classe')||'—'), 
  status: isNuova ? 'Nessuno' : (function(){
   var lista = document.getElementById('lista-status');
   if (!lista) return val('campo-status')||'Nessuno';
   var valori = [];
   for (var si=0; si<lista.children.length; si++) {
    var sel = document.getElementById('campo-status-'+si);
    if (sel && sel.value) valori.push(sel.value);
   }
   return valori.length > 0 ? valori.join(' | ') : 'Nessuno';
  })(), 
  livello: isNuova ? LIVELLO_INIZIALE : (val('campo-livello')||'0'), 
  exp: isNuova ? EXP_INIZIALE : (val('campo-exp')||'0'), 
  exptot: isNuova ? EXP_MASSIMA : calcolaExpTot(val('campo-livello')||'0'), 
  jenny: isNuova ? JENNY_INIZIALI : (val('campo-jenny')||'0'), 
  hc: isNuova ? HC_INIZIALI : (val('campo-hc')||'0'), 
  imgLaterale: val('campo-img-laterale')||'https://via.placeholder.com/664x184',
  imgLateraleX: (function(){ var e=document.getElementById('crop-x-img-laterale'); return e?parseFloat(e.value)||0:0; })(),
  imgLateraleY: (function(){ var e=document.getElementById('crop-y-img-laterale'); return e?parseFloat(e.value)||0:0; })(),
  imgLateraleW: (function(){ var e=document.getElementById('crop-w-img-laterale'); return e?parseFloat(e.value)||100:100; })(),
  imgLateraleH: (function(){ var e=document.getElementById('crop-h-img-laterale'); return e?parseFloat(e.value)||100:100; })(),
  imgDati: val('campo-img-dati')||'https://via.placeholder.com/154x429',
  imgDatiX: (function(){ var e=document.getElementById('crop-x-img-dati'); return e?parseFloat(e.value)||0:0; })(),
  imgDatiY: (function(){ var e=document.getElementById('crop-y-img-dati'); return e?parseFloat(e.value)||0:0; })(),
  imgDatiW: (function(){ var e=document.getElementById('crop-w-img-dati'); return e?parseFloat(e.value)||100:100; })(),
  imgDatiH: (function(){ var e=document.getElementById('crop-h-img-dati'); return e?parseFloat(e.value)||100:100; })(),
  imgInfoModo: (function(){ var m=document['querySelector']('input[name="img-info-modo"]:checked'); return m?m.value:'1'; })(),
  imgInfo: val('campo-img-info')||val('campo-img-dati')||'https://via.placeholder.com/154x429',
  imgInfoX: (function(){ var e=document.getElementById('crop-x-img-info'); return e?parseFloat(e.value)||0:0; })(),
  imgInfoY: (function(){ var e=document.getElementById('crop-y-img-info'); return e?parseFloat(e.value)||0:0; })(),
  imgInfoW: (function(){ var e=document.getElementById('crop-w-img-info'); return e?parseFloat(e.value)||100:100; })(),
  imgInfoH: (function(){ var e=document.getElementById('crop-h-img-info'); return e?parseFloat(e.value)||100:100; })(),
  imgInfoA: val('campo-img-info-a')||'https://via.placeholder.com/154x204',
  imgInfoAX: (function(){ var e=document.getElementById('crop-x-img-info-a'); return e?parseFloat(e.value)||0:0; })(),
  imgInfoAY: (function(){ var e=document.getElementById('crop-y-img-info-a'); return e?parseFloat(e.value)||0:0; })(),
  imgInfoAW: (function(){ var e=document.getElementById('crop-w-img-info-a'); return e?parseFloat(e.value)||100:100; })(),
  imgInfoAH: (function(){ var e=document.getElementById('crop-h-img-info-a'); return e?parseFloat(e.value)||100:100; })(),
  imgInfoB: val('campo-img-info-b')||'https://via.placeholder.com/154x204',
  imgInfoBX: (function(){ var e=document.getElementById('crop-x-img-info-b'); return e?parseFloat(e.value)||0:0; })(),
  imgInfoBY: (function(){ var e=document.getElementById('crop-y-img-info-b'); return e?parseFloat(e.value)||0:0; })(),
  imgInfoBW: (function(){ var e=document.getElementById('crop-w-img-info-b'); return e?parseFloat(e.value)||100:100; })(),
  imgInfoBH: (function(){ var e=document.getElementById('crop-h-img-info-b'); return e?parseFloat(e.value)||100:100; })(),
 
  agg1: val('campo-agg1')||'Aggettivo 1', 
  agg2: val('campo-agg2')||'Aggettivo 2', 
  agg3: val('campo-agg3')||'Aggettivo 3', 
  citazione: val('campo-citazione')||'...', 
  aspetto: val('campo-aspetto')||'...', 
  background: val('campo-background')||'...', 
  hatsu: isNuova ? null : (val('campo-hatsu')||'—'),
  nen: isNuova ? NEN_INIZIALE : (val('campo-nen')||'0'),
  tenacia: isNuova ? TENACIA_INIZIALE : (val('campo-tenacia')||'10'),
  nenPotere: isNuova ? null : {
   nomepotere:    val('nen-nomepotere')||'—',
   descrizione:   val('nen-descrizione')||'—',
   funzionamento: val('nen-funzionamento')||'—',
   condizioni:    val('nen-condizioni')||'—',
   costo:         val('nen-costo')||''
  },
  nenImg: isNuova ? '' : (val('nen-img')||''),
  nenImgX: (function(){ var e=document.getElementById('crop-x-img-nen'); return e?parseFloat(e.value)||0:0; })(),
  nenImgY: (function(){ var e=document.getElementById('crop-y-img-nen'); return e?parseFloat(e.value)||0:0; })(),
  nenImgW: (function(){ var e=document.getElementById('crop-w-img-nen'); return e?parseFloat(e.value)||100:100; })(),
  nenImgH: (function(){ var e=document.getElementById('crop-h-img-nen'); return e?parseFloat(e.value)||100:100; })(),
  nenModo: (function(){ var r=document['querySelector']('input[name="nen-modalita"]:checked'); return r?r.value:'completo'; })(),
  profili: isNuova ? [] : (function(){
   var radio = document['querySelector']('input[name="nen-modalita"]:checked');
   if (radio && radio.value === 'speedduel') return [];
   var out = [];
   for (var p=1;p<=4;p++) out.push({
    nome:  val('profilo-'+p+'-nome') ||'—',
    desc:  val('profilo-'+p+'-desc') ||'—',
    bonus: val('profilo-'+p+'-bonus')||'—',
    malus: val('profilo-'+p+'-malus')||'—',
    costo: val('profilo-'+p+'-costo')||'—'
   });
   return out;
  })(),
  tecniche25:  isNuova ? [] : raccogliTecnicheBox('25',  2),
  tecniche50:  isNuova ? [] : (function(){ var r=document['querySelector']('input[name="nen-modalita"]:checked'); return raccogliTecnicheBox('50', r&&r.value==='speedduel'?1:2); })(),
  tecniche100: isNuova ? [] : raccogliTecnicheBox('100', 1),
  musica: val('campo-musica')||'', 
  musicaPiattaforma: (function(){ var e=document.getElementById('campo-musica-piattaforma'); return e ? e.value : 'youtube'; })(),
  stat: stat, ovSt: ovSt, baule: baule, competenze: competenze 
 }; 
} 

function raccogliTecnicheBox(id, num) {
 function val(fieldId) { var e=document.getElementById(fieldId); return e?e.value.trim():''; }
 var out = [];
 for (var t=1;t<=num;t++) {
  out.push({
   nome:  val('tecnica-'+id+'-'+t+'-nome') ||'—',
   desc:  val('tecnica-'+id+'-'+t+'-desc') ||'—',
   bonus: val('tecnica-'+id+'-'+t+'-bonus')||'—',
   malus: val('tecnica-'+id+'-'+t+'-malus')||'—',
   costo: val('tecnica-'+id+'-'+t+'-costo')||'—'
  });
 }
 return out;
}

// ============================================================
// ============================================================
// ACCREDITI — FIREBASE (progetto compleanni-4035c, nodo accrediti)
// Caricamento dinamico SDK (jsDelivr + fallback gstatic), come arena.js.
// Scrittura del log solo su conferma esplicita dello staffer.
// ============================================================
var ACC_FB_CONFIG = {
 apiKey: "AIzaSyCfJv-qTCeKD8v4Ma8S9aPjcjdd7zKHMkQ",
 authDomain: "compleanni-4035c.firebaseapp.com",
 databaseURL: "https://compleanni-4035c-default-rtdb.europe-west1.firebasedatabase.app",
 projectId: "compleanni-4035c",
 storageBucket: "compleanni-4035c.firebasestorage.app",
 messagingSenderId: "429393050992",
 appId: "1:429393050992:web:6b1d632e7e1a1dc0dd23b5"
};
var ACC_SDK_URLS = [
 "https://cdn.jsdelivr.net/npm/firebase@10.12.2/firebase-app-compat.js",
 "https://cdn.jsdelivr.net/npm/firebase@10.12.2/firebase-database-compat.js"
];
var ACC_SDK_FALLBACK = [
 "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
 "https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js"
];
var _accDb = null, _accDbOk = false;

function accCaricaScript(url) {
 return new Promise(function(ok, ko) {
  var el = document.createElement('script');
  el.src = url; el.async = false;
  el.onload = function(){ ok(url); };
  el.onerror = function(){ ko(new Error('impossibile caricare ' + url)); };
  document.head.appendChild(el);
 });
}

function accCaricaSDK() {
 if (window.firebase && window.firebase.database) return Promise.resolve(true);
 function caricaLista(lista) {
  var p = Promise.resolve();
  for (var i = 0; i < lista.length; i++) { (function(u){ p = p.then(function(){ return accCaricaScript(u); }); })(lista[i]); }
  return p;
 }
 return caricaLista(ACC_SDK_URLS)
  .then(function(){ return !!(window.firebase && window.firebase.database); })
  .catch(function(){ return caricaLista(ACC_SDK_FALLBACK).then(function(){ return !!(window.firebase && window.firebase.database); }); });
}

function accInitFirebase() {
 // Ritorna una Promise che risolve true se il DB è pronto
 if (_accDbOk) return Promise.resolve(true);
 return accCaricaSDK().then(function(pronto){
  if (!pronto) return false;
  var fb = window.firebase;
  if (!fb.apps.length) fb.initializeApp(ACC_FB_CONFIG);
  _accDb = fb.database();
  _accDbOk = true;
  return true;
 }).catch(function(e){ console.error('[Accrediti] Firebase init:', e); return false; });
}

// ── Calcolo del diff economico tra accBase (importato) e d (nuovo) ──
function accCalcolaDiff(b, d) {
 var mod = [];
 function pushNum(campo, da, a) {
  var na = parseInt(da) || 0, nb = parseInt(a) || 0;
  if (na !== nb) mod.push({ campo: campo, da: String(na), a: String(nb), delta: (nb - na >= 0 ? '+' : '') + (nb - na) });
 }
 function pushTxt(campo, da, a) {
  if ((da||'') !== (a||'')) mod.push({ campo: campo, da: da||'—', a: a||'—', delta: null });
 }
 // EXP totale accreditata (valore puro inserito dallo staffer), come prima voce
 var expTot = parseInt((document.getElementById('acc-exp-delta')||{}).value) || 0;
 if (expTot > 0) mod.push({ campo: 'EXP totale accreditata', da: null, a: String(expTot), delta: 'info' });
 pushNum('Livello', b.livello, d.livello);
 pushNum('EXP residua', b.exp, d.exp);
 pushNum('Jenny', b.jenny, d.jenny);
 pushNum('HC', b.hc, d.hc);
 pushNum('Nen', b.nen, d.nen);
 pushNum('Tenacia', b.tenacia, d.tenacia);
 pushNum('Vita', b.vita, d.stat && d.stat.vita);
 pushNum('Aura', b.aura, d.stat && d.stat.aura);
 // Statistiche singole
 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna'];
 var nomi = ['Forza','Resistenza','Velocità','Riflessi','Destrezza','Mira','Intelligenza','Carisma','Istinto','Fortuna'];
 for (var i = 0; i < ls.length; i++) {
  var da = (b.stat && b.stat[ls[i]] != null) ? b.stat[ls[i]] : 5;
  var a  = (d.stat && d.stat[ls[i]] != null) ? d.stat[ls[i]] : 5;
  pushNum(nomi[i], da, a);
 }
 // Status
 pushTxt('Status', b.status, d.status);
 // Taglia
 pushTxt('Fedina', b.fedina, d.fedina);
 if (d.fedina === 'Ricercato') {
  pushTxt('Classificazione Taglia', b.classTaglia, d.classTaglia);
  pushTxt('Valore Taglia', b.valTaglia, d.valTaglia);
 }
 // Baule: confronto per categoria — aggiunta, rimozione, modifica (qt/lv/usi)
 var cats = ['armi','equip','oggetti','materiali'];
 var catNomi = { armi:'Armi', equip:'Equipaggiamento', oggetti:'Oggetti Extra', materiali:'Materiali' };
 function bauleDettagli(it) {
  var parti = [];
  if (it.qt !== undefined && it.qt !== '' && it.qt !== null) parti.push('Qt ' + it.qt);
  if (it.lv !== undefined && it.lv !== '' && it.lv !== null && it.lv !== '0') parti.push('Lv ' + it.lv);
  if (it.usi !== undefined && it.usi !== '' && it.usi !== null) parti.push('Usi ' + it.usi);
  return parti.join(', ');
 }
 function bauleCampiDiversi(v, n) {
  var qv = String(v.qt||''), qn = String(n.qt||'');
  var lv2 = String(v.lv||''), ln = String(n.lv||'');
  var uv = String(v.usi||''), un = String(n.usi||'');
  if ((lv2==='0'||lv2==='') && (ln==='0'||ln==='')) { lv2=''; ln=''; }
  return qv!==qn || lv2!==ln || uv!==un;
 }
 for (var c = 0; c < cats.length; c++) {
  var listaV = (b.baule && b.baule[cats[c]]) ? b.baule[cats[c]] : [];
  var listaN = (d.baule && d.baule[cats[c]]) ? d.baule[cats[c]] : [];
  var etichetta = catNomi[cats[c]];
  var usatiV = {};
  // 1) Nuovi: aggiunte e modifiche
  for (var ni = 0; ni < listaN.length; ni++) {
   var itn = listaN[ni];
   var itv = null, idxV = -1;
   for (var kv = 0; kv < listaV.length; kv++) { if (listaV[kv].nome === itn.nome && !usatiV[kv]) { itv = listaV[kv]; idxV = kv; break; } }
   if (!itv) {
    mod.push({ campo: etichetta, da: null, a: itn.nome + (bauleDettagli(itn) ? ' (' + bauleDettagli(itn) + ')' : ''), delta: '+1' });
   } else {
    usatiV[idxV] = true;
    if (bauleCampiDiversi(itv, itn)) {
     mod.push({ campo: etichetta + ' — ' + itn.nome, da: bauleDettagli(itv) || '—', a: bauleDettagli(itn) || '—', delta: null });
    }
   }
  }
  // 2) Vecchi non abbinati: rimozioni
  for (var vi = 0; vi < listaV.length; vi++) {
   if (usatiV[vi]) continue;
   var itv2 = listaV[vi];
   mod.push({ campo: etichetta, da: itv2.nome + (bauleDettagli(itv2) ? ' (' + bauleDettagli(itv2) + ')' : ''), a: null, delta: '-1' });
  }
 }
 return mod;
}

// ── Scrittura del log su Firebase (chiamata dal bottone conferma) ──
function accInviaLog() {
 if (!stato.diffAccredito || stato.diffAccredito.length === 0) {
  alert('Nessuna modifica economica da registrare.');
  return;
 }
 var staffer = accNomeStaffer();
 if (!staffer) { alert('Impossibile identificare lo staffer.'); return; }
 var pgId = stato.pgId || 'sconosciuto';
 var nomeAlMomento = stato.accNome || pgId;

 var btn = document.getElementById('acc-conferma-btn');
 if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Invio in corso…'; }

 accInitFirebase().then(function(pronto){
  if (!pronto) {
   alert('Impossibile connettersi a Firebase. La scheda è comunque generata: riprova più tardi o registra l\'accredito manualmente.');
   if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Conferma e invia al registro'; }
   return;
  }
  var record = {
   timestamp: Date.now(),
   staffer: staffer,
   nomeAlMomento: nomeAlMomento,
   modifiche: stato.diffAccredito
  };
  var ref = _accDb.ref('accrediti/' + pgId);
  // Aggiorna nomeCorrente + aggiunge il record
  var updates = {};
  updates['nomeCorrente'] = nomeAlMomento;
  ref.update(updates).then(function(){
   return ref.child('records').push(record);
  }).then(function(){
   if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Accredito registrato ✓'; btn.style.background = '#A8DBA8'; }
   stato.diffAccredito = null; // evita doppio invio
  }).catch(function(e){
   console.error('[Accrediti] scrittura:', e);
   alert('Errore nella scrittura su Firebase: ' + e.message + '. La scheda è comunque generata.');
   if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Conferma e invia al registro'; }
  });
 });
}
