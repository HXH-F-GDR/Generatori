// ============================================================
// COSTANTI DI CONFIGURAZIONE NPC
// ============================================================
var LIVELLO_INIZIALE = 1;
var EXP_INIZIALE = 0;
var EXP_MASSIMA = 100;
var JENNY_INIZIALI = 0;
var HC_INIZIALI = 0;
var NEN_INIZIALE = 0;
var TENACIA_INIZIALE = 10;

var STAT_BASE = {
 forza: 5, resistenza: 5, velocita: 5, riflessi: 5, destrezza: 5,
 mira: 5, intelligenza: 5, carisma: 5, istinto: 5, fortuna: 5,
 vita: 300, aura: 500
};

var BONUS_LUOGO = {
 'Narevka':            { destrezza: 5, intelligenza: 5, riflessi: 5 },
 'Solmara':     { forza: 5, carisma: 5, intelligenza: 5 },
 'Yorbian':                 { mira: 5, intelligenza: 5, carisma: 5 },
 'Azia': { intelligenza: 5, istinto: 5, destrezza: 5 },
 'Keth\'ra':                     { istinto: 5, riflessi: 5, carisma: 5 },
 'Vandros':                 { forza: 5, resistenza: 5, fortuna: 5 },
 'Isole di Balsa': { velocita: 5, resistenza: 5, riflessi: 5 },
 'Ryuseigai':                     { forza: 5, resistenza: 5, destrezza: 5 }
};

var LUOGHI_BESTIA = {
 'Kiriko':              ['Insediamento Melioras'],
 'Scimmia Antropomorfa':['Villaggio di Trakey'],
 'Guardiano':           ['Villaggio di Blackbird'],
 'Kitsune':             ['Villaggio delle Nuvole', 'Villaggio dei Fiori'],
 'Dai Tengu':           ['Monte Hiei', 'Monte Kurama'],
 'Karasu Tengu':        ['Monte Hiei', 'Monte Kurama'],
 'Were-pire':           ['Città Eterna'],
 'Formichimera Umana':  Object.keys(BONUS_LUOGO)
};

var DATI_SPECIE = {
 'Kiriko':              { rank: 'E', conservazione: 'Vulnerabile (VU)',                      fedina: 'Incensurato' },
 'Scimmia Antropomorfa':{ rank: 'A', conservazione: 'Rischio Minimo (LC)',                   fedina: 'Ricercato' },
 'Guardiano':           { rank: 'C', conservazione: 'Critico (CR)',                          fedina: 'Ricercato' },
 'Kitsune':             { rank: 'C', conservazione: 'Rischio Minimo (LC)',                   fedina: 'Ricercato' },
 'Dai Tengu':           { rank: 'D', conservazione: 'Vulnerabile (VU)',                      fedina: 'Incensurato' },
 'Karasu Tengu':        { rank: 'D', conservazione: 'Vulnerabile (VU)',                      fedina: 'Incensurato' },
 'Were-pire':           { rank: 'D', conservazione: 'Rischio Minimo (LC)',                   fedina: 'Incensurato' },
 'Formichimera Umana':  { rank: 'B', conservazione: 'Probabilmente Estinto in Natura (PEW)', fedina: 'Ricercato' }
};

var SPECIE_BESTIA = Object.keys(DATI_SPECIE);

var VALORE_TAGLIA_BASE = {
 'E': 1000, 'D': 50000, 'C': 100000, 'B': 250000,
 'A': 750000, 'S': 1500000, 'SS': 3000000, 'SSS': 5000000
};
var CLASSIFICAZIONI_TAGLIA = ['E','D','C','B','A','S','SS','SSS'];

var CLASSI_NPC = Object.keys(CLASSI_CONFIG); // tutte le classi, nessuna esclusa

var LUOGHI_UMANI = Object.keys(BONUS_LUOGO);
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

var TIPI_HATSU = [
 'Sconosciuto',
 'Non ancora sbloccato',
 'Irrobustimento (&#24375;&#21270;)',
 'Emissione (&#25918;&#20986;)',
 'Trasformazione (&#22793;&#21270;)',
 'Manipolazione (&#25805;&#20316;)',
 'Concretizzazione (&#20855;&#29616;&#21270;)',
 'Specializzazione (&#29305;&#36074;)'
];

var STATUS = ['Sconosciuto', 'Nessuno', 'Criminale', 'Hunter', 'Lottatore/trice Celeste', 'Assassino/a', 'Zampa'];

var SEGNI_ZODIACALI = [
 'Ariete', 'Toro', 'Gemelli', 'Cancro', 'Leone', 'Vergine',
 'Bilancia', 'Scorpione', 'Sagittario', 'Capricorno', 'Acquario', 'Pesci'
];

var SEGNI_CINESI = [
 'Topo', 'Bue', 'Tigre', 'Coniglio', 'Drago', 'Serpente',
 'Cavallo', 'Capra', 'Scimmia', 'Gallo', 'Cane', 'Maiale'
];

var MBTI_TIPI = [
 'INTJ', 'INTP', 'ENTJ', 'ENTP',
 'INFJ', 'INFP', 'ENFJ', 'ENFP',
 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
 'ISTP', 'ISFP', 'ESTP', 'ESFP'
];

var ALLINEAMENTI = [
 'Legale Buono', 'Neutrale Buono', 'Caotico Buono',
 'Legale Neutrale', 'Neutrale Puro', 'Caotico Neutrale',
 'Legale Malvagio', 'Neutrale Malvagio', 'Caotico Malvagio'
];

var SLIDE_EXTRA_TIPI = ['nessuna', 'moveset', 'valutazioni', 'altro'];

// ============================================================
// STATO GLOBALE
// ============================================================
var stato = {
 modalita: null,
 palette: null,
 schedaOriginale: null
};

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

function scegliModalita(modalita) {
 stato.modalita = modalita;
 var btnNuova = document.getElementById('btn-nuova');
 var btnModifica = document.getElementById('btn-modifica');
 if (modalita === 'nuova') {
  btnNuova.style.borderColor = 'var(--gs-accento)';
  btnNuova.style.background = 'rgba(var(--gs-accento-rgb),0.12)';
  btnModifica.style.borderColor = 'var(--gs-medio)';
  btnModifica.style.background = 'rgba(0,0,0,0.2)';
 } else {
  btnModifica.style.borderColor = 'var(--gs-accento)';
  btnModifica.style.background = 'rgba(var(--gs-accento-rgb),0.12)';
  btnNuova.style.borderColor = 'var(--gs-medio)';
  btnNuova.style.background = 'rgba(0,0,0,0.2)';
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
  html += '<div class="pal-card" onclick="selezionaPalette(\'mantieni\')" id="card-mantieni" style="cursor:pointer; border:2px dashed var(--gs-medio); border-radius:12px; overflow:hidden; transition:all 0.3s; width:220px; display:inline-block; margin:12px; vertical-align:top; box-shadow:0 4px 15px rgba(0,0,0,0.3);">'; 
  html += '<div style="height:140px; background:var(--gs-fondo); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px;">'; 
  html += '<i class="fa-solid fa-rotate-left" style="font-size:2.2em; color:var(--gs-tenue);"></i>'; 
  html += '<span style="color:var(--gs-tenue); font-size:0.85em; font-style:italic;">Modifica solo il contenuto, non la struttura!</span>'; 
  html += '</div>'; 
  html += '<div style="padding:10px 14px; background:var(--gs-fondo); border-top:1px solid var(--gs-medio);">'; 
  html += '<span style="color:var(--gs-tenue); font-family:\'Montserrat\'; font-size:1.2em;">Mantieni le Personalizzazioni!</span>'; 
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
  sel.style.boxShadow = '0 0 25px rgba(var(--gs-accento-rgb),0.35)'; 
  sel.style.outline = '2px solid var(--gs-accento)'; 
 } 
 setTimeout(function() { 
  mostraSchermata('schermata-form'); 
  costruisciForm(); 
 }, 400); 
} 

// ============================================================
// STILI BASE
// ============================================================
var STILE_SEZIONE = 'background:var(--gs-fondo); border:2px solid var(--gs-scuro); border-radius:12px; padding:25px; margin-bottom:20px;';
var STILE_INPUT = 'width:100%; padding:10px 14px; background:var(--gs-scuro); border:1px solid var(--gs-medio); border-radius:6px; color:var(--gs-chiaro); font-family:\'Montserrat\'; font-size:1em; box-sizing:border-box; outline:none;';
var STILE_LABEL = 'display:block; color:var(--gs-accento); font-size:0.9em; margin-bottom:5px; font-family:\'Montserrat\';';
var STILE_READONLY = 'display:block; padding:10px 14px; background:var(--gs-scuro); border:1px solid var(--gs-medio); border-radius:6px; color:var(--gs-tenue); font-family:\'Montserrat\'; font-size:1em; opacity:0.75;';

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
 var html = '<table style="width:100%; border-collapse:collapse; table-layout:fixed; margin-bottom:8px;"><tr>';
 for (var i = 0; i < celle.length; i++) {
  var pl = i > 0 ? 'padding-left:4px;' : '';
  var pr = i < celle.length - 1 ? 'padding-right:4px;' : '';
  html += '<td style="width:20%; ' + pl + pr + ' vertical-align:top;">' + celle[i] + '</td>';
 }
 html += '</tr></table>';
 return html;
}

// ============================================================
// COSTRUZIONE FORM
// ============================================================
function costruisciForm() {
 var container = document.getElementById('form-container');
 var isNuova = stato.modalita === 'nuova';
 var html = '';

 if (!isNuova) {
  html += sezioneForm('<i class="fa-solid fa-file-import"></i> Importa Scheda Esistente', costruisciImporta());
 }

 html += sezioneForm('<i class="fa-solid fa-user"></i> Dati Personali', costruisciDatiPersonali(isNuova));
 html += sezioneForm('<i class="fa-solid fa-list"></i> Campi Dati Extra', costruisciCampiExtra());
 html += sezioneForm('<i class="fa-solid fa-image"></i> Immagini', costruisciImmagini());
 html += sezioneForm('<i class="fa-solid fa-star"></i> Info &amp; Personalità', costruisciInfo());
 html += sezioneForm('<i class="fa-solid fa-chart-bar"></i> Statistiche', costruisciStatistiche(isNuova));
 html += sezioneForm('<i class="fa-solid fa-fire"></i> Abilità Nen', costruisciNen(isNuova));
 html += sezioneForm('<i class="fa-solid fa-scroll"></i> Apparizioni', costruisciApparizioni(isNuova));
 html += sezioneForm('<i class="fa-solid fa-bag-shopping"></i> Baule', costruisciBalue());
 html += sezioneForm('<i class="fa-solid fa-music"></i> Musica', costruisciMusica());
 html += sezioneForm('<i class="fa-solid fa-layer-group"></i> Slide Extra', costruisciSlideExtra(isNuova));

 html += '<div style="text-align:center; margin-top:40px; padding-bottom:40px;">';
 html += '<button onclick="generaScheda()" style="background:linear-gradient(135deg,var(--gs-verde) 0%,var(--gs-verde2) 100%); color:var(--gs-btn-testo); border:none; padding:18px 60px; font-size:1.3em; font-weight:700; border-radius:10px; cursor:pointer; font-family:\'Montserrat\'; box-shadow:0 6px 25px rgba(0,0,0,0.4); text-transform:uppercase; letter-spacing:2px; transition:all 0.3s;">';
 html += '<i class="fa-solid fa-wand-magic-sparkles"></i> Genera Scheda</button>';
 html += '</div>';

 container.innerHTML = html;

 if (isNuova) {
  var luogoEl = document.getElementById('campo-luogo');
  if (luogoEl) luogoEl.onchange = function(){};
  aggiornaRazza(true);
 } else {
  aggiornaRazza(false);
  var feEl = document.getElementById('campo-fedina');
  if (feEl) feEl.onchange = function(){ aggiornaFedina(false); };
 }
 aggiornaSlideExtra();
}

function sezioneForm(titolo, contenuto) {
 return '<div style="' + STILE_SEZIONE + '">' +
  '<h3 style="color:var(--gs-accento); font-family:\'Montserrat\'; font-size:1.35em; margin-bottom:20px; border-bottom:1px solid var(--gs-medio); padding-bottom:10px;">' + titolo + '</h3>' +
  contenuto + '</div>';
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
 for (var g = 1; g <= 31; g++) { opG += '<option value="' + (g < 10 ? '0'+g : g) + '">' + g + '</option>'; }
 for (var m = 0; m < 12; m++) { opM += '<option value="' + mesi[m] + '">' + mesi[m] + '</option>'; }
 for (var a = 2017; a >= 1900; a--) { opA += '<option value="' + a + '">' + a + '</option>'; }
 var sel = STILE_INPUT + ' background:var(--gs-scuro);';
 return '<div style="margin-bottom:14px;">' +
  '<label style="' + STILE_LABEL + '">' + label + '</label>' +
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' +
  '<td style="width:25%; padding-right:6px; vertical-align:top;"><select id="' + id + '-g" style="' + sel + '">' + opG + '</select><div style="color:var(--gs-tenue); font-size:0.75em; text-align:center; margin-top:3px;">Giorno</div></td>' +
  '<td style="width:45%; padding-left:3px; padding-right:3px; vertical-align:top;"><select id="' + id + '-m" style="' + sel + '">' + opM + '</select><div style="color:var(--gs-tenue); font-size:0.75em; text-align:center; margin-top:3px;">Mese</div></td>' +
  '<td style="width:30%; padding-left:6px; vertical-align:top;"><select id="' + id + '-a" style="' + sel + '">' + opA + '</select><div style="color:var(--gs-tenue); font-size:0.75em; text-align:center; margin-top:3px;">Anno</div></td>' +
  '</tr></table></div>';
}

function leggiData(id) {
 var g = document.getElementById(id + '-g');
 var m = document.getElementById(id + '-m');
 var a = document.getElementById(id + '-a');
 if (!g || !m || !a) return '—';
 var vg = g.value, vm = m.value, va = a.value;
 if (vg && !vm && !va) return '—';
 if (!vg && !vm && !va) return '—';
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
  '<select id="' + id + '" style="' + STILE_INPUT + ' background:var(--gs-scuro);">';
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
// SEZIONI DEL FORM
// ============================================================
// Mappa globale: id voce → {label, htmlContenuto} per poter riaggiungere
var VOCI_DATI_CONFIG = {};

// Genera una voce removibile. Se obbligatoria=true niente tasto rimozione.
function voceRemovibile(id, contenuto, obbligatoria) {
 if (!obbligatoria) VOCI_DATI_CONFIG[id] = contenuto; // salva per eventuale riaggiunta
 if (obbligatoria) return '<div id="'+id+'">' + contenuto + '</div>';
 return '<div id="'+id+'" style="position:relative;">' +
  '<button onclick="rimuoviVoceDati(\''+id+'\')" title="Rimuovi questa voce" style="position:absolute; top:0; right:0; background:var(--gs-errore-fondo); color:var(--gs-errore); border:1px solid var(--gs-errore-bordo); padding:3px 8px; border-radius:4px; cursor:pointer; font-size:0.8em; z-index:1;"><i class="fa-solid fa-xmark"></i></button>' +
  contenuto +
  '</div>';
}

// Sostituisce il wrapper con un placeholder "+" che permette di riaggiungere la voce
function rimuoviVoceDati(id) {
 var el = document.getElementById(id);
 if (!el) return;
 var placeholder = document.createElement('div');
 placeholder.id = id + '-placeholder';
 placeholder.style.cssText = 'margin-bottom:6px;';
 var nomeLeggibile = {
  'vd-luogo':'Luogo di nascita', 'vd-data':'Data di nascita',
  'vd-segni':'Segni zodiacali', 'vd-mbti':'MBTI / Allineamento',
  'vd-mestiere':'Mestiere', 'vd-fedina':'Fedina Penale',
  'vd-soldi':'Jenny / HC'
 };
 var label = nomeLeggibile[id] || id;
 placeholder.innerHTML = '<button onclick="riaggiunciVoceDati(\''+id+'\')" style="background:transparent; color:var(--gs-tenue); border:1px dashed var(--gs-medio); padding:5px 14px; border-radius:4px; cursor:pointer; font-family:\'Montserrat\'; font-size:0.85em; width:100%; text-align:left;">' +
  '<i class="fa-solid fa-plus" style="margin-right:6px;"></i>Aggiungi: ' + label + '</button>';
 el.parentNode.insertBefore(placeholder, el);
 el.parentNode.removeChild(el);
}

// Riaggiunge la voce rimossa al posto del placeholder
function riaggiunciVoceDati(id) {
 var placeholder = document.getElementById(id + '-placeholder');
 if (!placeholder) return;
 var contenuto = VOCI_DATI_CONFIG[id];
 if (!contenuto) return;
 var nuovoEl = document.createElement('div');
 nuovoEl.id = id;
 nuovoEl.style.cssText = 'position:relative;';
 nuovoEl.innerHTML =
  '<button onclick="rimuoviVoceDati(\''+id+'\')" title="Rimuovi questa voce" style="position:absolute; top:0; right:0; background:var(--gs-errore-fondo); color:var(--gs-errore); border:1px solid var(--gs-errore-bordo); padding:3px 8px; border-radius:4px; cursor:pointer; font-size:0.8em; z-index:1;"><i class="fa-solid fa-xmark"></i></button>' +
  contenuto;
 placeholder.parentNode.insertBefore(nuovoEl, placeholder);
 placeholder.parentNode.removeChild(placeholder);
 // Se è la fedina, reinizializza l'evento onchange
 if (id === 'vd-fedina') {
  var feEl = document.getElementById('campo-fedina');
  if (feEl) feEl.onchange = function(){ aggiornaFedina(false); };
 }
}

function costruisciDatiPersonali(isNuova) {
 var html = '';
 var opzioniTaglia = '';
 for (var ct = 0; ct < CLASSIFICAZIONI_TAGLIA.length; ct++) {
  opzioniTaglia += '<option value="'+CLASSIFICAZIONI_TAGLIA[ct]+'">'+CLASSIFICAZIONI_TAGLIA[ct]+'</option>';
 }

 // Obbligatori: Nome, Cognome, Razza
 html += voceRemovibile('vd-nomecognome',
  riga2(inputText('campo-nome','Nome','Es. Hisoka'), inputText('campo-cognome','Cognome','Es. Morrow')),
  true
 );
 html += voceRemovibile('vd-generarazza',
  riga2(
   inputText('campo-genere','Genere','Uomo / Donna / Neutro / Ecc.'),
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Razza</label>' +
   '<select id="campo-razza" onchange="aggiornaRazza('+isNuova+')" style="'+STILE_INPUT+' background:var(--gs-scuro);">' +
   '<option value="Umano">Umano</option>' +
   '<option value="Bestia Demoniaca">Bestia Demoniaca</option>' +
   '<option value="Animale">Animale</option>' +
   '</select></div>'
  ),
  true
 );

 // Specie + Rank (visibilità gestita da aggiornaRazza, sempre presenti nel DOM)
 html += '<div id="campo-specie-wrap" style="display:none; margin-bottom:14px;">' +
  '<label style="'+STILE_LABEL+'">Specie</label>' +
  '<select id="campo-specie" onchange="aggiornaRazza('+isNuova+')" style="'+STILE_INPUT+' background:var(--gs-scuro);">';
 for (var sp = 0; sp < SPECIE_BESTIA.length; sp++) {
  html += '<option value="'+SPECIE_BESTIA[sp]+'">'+SPECIE_BESTIA[sp]+'</option>';
 }
 html += '</select></div>';
 // Specie Animale: testo libero, visibile solo se razza === 'Animale'
 html += '<div id="campo-specie-animale-wrap" style="display:none;">' +
  inputText('campo-specie-animale','Specie','Es. Lupo, Aquila, Serpente Chimera...') +
  '</div>';
 html += '<div id="campo-rank-wrap" style="display:none;">' +
  riga2(
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Rank di Pericolosità</label><div id="campo-rank-val" style="'+STILE_READONLY+'">—</div></div>',
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Stato di Conservazione</label><div id="campo-conservazione-val" style="'+STILE_READONLY+'">—</div></div>'
  ) + '</div>';
// Specie Animale: Rank 
  html += '<div id="campo-rank-wrap" style="display:none;">' +
  riga2(
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Rank di Pericolosità</label><div id="campo-rank-val" style="'+STILE_READONLY+'">—</div></div>',
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Stato di Conservazione</label><div id="campo-conservazione-val" style="'+STILE_READONLY+'">—</div></div>'
  ) + '</div>' +
  '<div id="campo-rank-animale-wrap" style="display:none;">' +
  inputText('campo-rank-animale', 'Rank di Pericolosità', 'Es. C, Pericoloso...') +
  '</div>';

 // Removibili
 html += voceRemovibile('vd-luogo', inputSelect('campo-luogo', 'Luogo di nascita', LUOGHI_TUTTI));
 html += voceRemovibile('vd-data', inputDate('campo-datanascita', 'Data di nascita'));
 html += voceRemovibile('vd-segni',
  riga2(inputSelect('campo-segno','Segno zodiacale', SEGNI_ZODIACALI), inputSelect('campo-segnocinese','Segno zodiacale cinese', SEGNI_CINESI))
 );
 html += voceRemovibile('vd-mbti',
  riga2(inputSelect('campo-mbti','MBTI', MBTI_TIPI), inputSelect('campo-allineamento','Allineamento', ALLINEAMENTI))
 );
 html += voceRemovibile('vd-mestiere', inputText('campo-mestiere','Mestiere','Es. Assassino'));
 // Classe — non removibile
 html += voceRemovibile('vd-classe',
  '<div id="campo-classe-wrap"><div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Classe</label>' +
  '<select id="campo-classe" style="'+STILE_INPUT+' background:var(--gs-scuro);"></select></div></div>',
  true
 );
 html += voceRemovibile('vd-fedina',
  '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Fedina Penale</label>' +
  '<select id="campo-fedina" onchange="aggiornaFedina(false)" style="'+STILE_INPUT+' background:var(--gs-scuro);">' +
  '<option value="Incensurato">Incensurato</option>' +
  '<option value="Ricercato">Ricercato</option>' +
  '</select></div>' +
  '<div id="campo-taglia-wrap" style="display:none;">' +
  riga2(
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Classificazione Taglia</label>' +
   '<select id="campo-classtaglia" onchange="aggiornaTaglia()" style="'+STILE_INPUT+' background:var(--gs-scuro);">' + opzioniTaglia + '</select></div>',
   inputText('campo-valtaglia','Valore Taglia (Jenny)','Es. 1000')
  ) + '</div>'
 );
 // Status — non removibile
 html += voceRemovibile('vd-status', costruisciStatusMultipli(), true);
 // Livello ed EXP — non removibili
 html += voceRemovibile('vd-livello',
  riga2(
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Livello</label><input type="text" id="campo-livello" placeholder="Es. 50" style="'+STILE_INPUT+'"></div>',
   inputText('campo-exp','EXP attuale','Es. 80')
  ),
  true
 );
 html += voceRemovibile('vd-soldi',
  riga2(inputText('campo-jenny','Jenny','Es. 500000'), inputText('campo-hc','HC','Es. 0'))
 );
 return html;
}

// ============================================================
// CROP MODAL
// ============================================================
var _cropModal = {
 id: null, slotW: null, slotH: null,
 drag: null
};

function cropLeggi(id) {
 return {
  x: parseFloat(document.getElementById('crop-x-'+id) ? document.getElementById('crop-x-'+id).value : 0) || 0,
  y: parseFloat(document.getElementById('crop-y-'+id) ? document.getElementById('crop-y-'+id).value : 0) || 0,
  w: parseFloat(document.getElementById('crop-w-'+id) ? document.getElementById('crop-w-'+id).value : 100) || 100,
  h: parseFloat(document.getElementById('crop-h-'+id) ? document.getElementById('crop-h-'+id).value : 100) || 100
 };
}

function cropScrivi(id, x, y, w, h) {
 var ex = document.getElementById('crop-x-'+id);
 var ey = document.getElementById('crop-y-'+id);
 var ew = document.getElementById('crop-w-'+id);
 var eh = document.getElementById('crop-h-'+id);
 // Conserviamo 2 decimali invece di arrotondare a intero: l'arrotondamento
 // a intero, propagato attraverso object-position, spostava l'inquadratura
 // finale di frazioni di percentuale visibili a schermo.
 function r2(v){ return Math.round(v * 100) / 100; }
 if (ex) ex.value = r2(x);
 if (ey) ey.value = r2(y);
 if (ew) ew.value = r2(w);
 if (eh) eh.value = r2(h);
 cropAggiornaBottone(id);
}

function cropAggiornaBottone(id) {
 var MAP_CAMPO = {
  'img-laterale':'campo-img-laterale','img-dati':'campo-img-dati','img-nen':'nen-img'
 };
 var btn = document.getElementById('crop-btn-'+id);
 if (!btn) return;
 var urlEl = document.getElementById(MAP_CAMPO[id]);
 if (!urlEl) return;
 var url = urlEl.value ? urlEl.value.trim() : '';

 // Reset del crop quando l'utente cambia immagine: se l'URL corrente è
 // diverso da quello per cui era stato calcolato il crop salvato, azzeriamo
 // i valori così alla riapertura del modal il rettangolo viene ricalcolato
 // con l'aspect ratio giusto per la NUOVA immagine.
 var lastUrl = btn.getAttribute('data-crop-url');
 if (lastUrl !== null && lastUrl !== url) {
  var rx = document.getElementById('crop-x-'+id);
  var ry = document.getElementById('crop-y-'+id);
  var rw = document.getElementById('crop-w-'+id);
  var rh = document.getElementById('crop-h-'+id);
  if (rx) rx.value = 0;
  if (ry) ry.value = 0;
  if (rw) rw.value = 100;
  if (rh) rh.value = 100;
 }
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

function campoCropHTML(campoId, label, cropId, slotW, slotH) {
 var html = '<div style="margin-bottom:14px;">';
 html += '<label style="'+STILE_LABEL+'">'+label+'</label>';
 html += '<input type="text" id="'+campoId+'" placeholder="https://..." '
  + 'oninput="cropAggiornaBottone(\''+cropId+'\')" style="'+STILE_INPUT+'">';
 html += '<div style="margin-top:8px; display:flex; align-items:center; gap:10px;">';
 html += '<button type="button" id="crop-btn-'+cropId+'" '
  + 'onclick="cropApriModal(\''+cropId+'\','+slotW+','+slotH+')" '
  + 'style="background:var(--gs-scuro); color:var(--gs-accento); border:1px solid var(--gs-medio); '
  + 'padding:7px 14px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; '
  + 'font-size:0.85em; display:flex; align-items:center; gap:8px; transition:border-color 0.2s;">'
  + '<i class="fa-solid fa-scissors"></i> Scegli inquadratura'
  + '<span class="crop-btn-thumb" style="display:none; width:40px; height:24px; '
  + 'border-radius:3px; border:1px solid var(--gs-medio); background-size:cover; flex-shrink:0;"></span>'
  + '</button>';
 html += '<span style="color:var(--gs-tenue); font-size:0.75em; font-style:italic;">Slot: '+slotW+'×'+slotH+'px</span>';
 html += '</div>';
 html += '<input type="hidden" id="crop-x-'+cropId+'" value="0">';
 html += '<input type="hidden" id="crop-y-'+cropId+'" value="0">';
 html += '<input type="hidden" id="crop-w-'+cropId+'" value="100">';
 html += '<input type="hidden" id="crop-h-'+cropId+'" value="100">';
 html += '</div>';
 return html;
}

function cropApriModal(id, slotW, slotH) {
 var MAP_CAMPO = {
  'img-laterale':'campo-img-laterale','img-dati':'campo-img-dati','img-nen':'nen-img'
 };
 var campoEl = document.getElementById(MAP_CAMPO[id]);
 var url = campoEl ? campoEl.value.trim() : '';
 if (!url) { alert('Inserisci prima un URL immagine!'); return; }
 _cropModal.id = id; _cropModal.slotW = slotW; _cropModal.slotH = slotH; _cropModal.drag = null;
 var saved = cropLeggi(id);
 _cropModal.crop = { x: saved.x, y: saved.y, w: saved.w, h: saved.h };
 var existing = document.getElementById('crop-modal-overlay');
 if (existing) existing.parentNode.removeChild(existing);
 var overlay = document.createElement('div');
 overlay.id = 'crop-modal-overlay';
 overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:9999;'
  + 'display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;';
 overlay.innerHTML =
  '<div id="crop-modal-box" style="background:var(--gs-fondo);border:2px solid var(--gs-medio);border-radius:14px;'
  + 'padding:24px;width:100%;max-width:600px;max-height:90vh;overflow-y:auto;'
  + 'display:flex;flex-direction:column;gap:16px;font-family:\'Montserrat\';">'
  + '<div style="display:flex;justify-content:space-between;align-items:center;width:100%;">'
  + '<span style="font-size:1.15em;font-weight:700;color:var(--gs-accento);"><i class="fa-solid fa-scissors"></i> Scegli inquadratura</span>'
  + '<button onclick="cropChiudiModal()" style="background:none;border:none;color:var(--gs-tenue);font-size:1.2em;cursor:pointer;padding:4px 8px;border-radius:4px;">✕</button>'
  + '</div>'
  + '<p style="margin:0;font-size:0.82em;color:var(--gs-tenue);">Trascina il riquadro per spostarlo</p>'
  + '<div id="crop-canvas" style="position:relative;width:100%;user-select:none;-webkit-user-select:none;border-radius:8px;overflow:hidden;background:#111;cursor:grab;">'
  + '<img id="crop-modal-img" src="'+url+'" style="display:block;width:100%;height:auto;max-height:400px;object-fit:contain;pointer-events:none;" draggable="false" onload="cropModalImgCaricata()" onerror="document.getElementById(\'crop-canvas-err\').style.display=\'\'">'
  + '<div id="crop-canvas-err" style="display:none;padding:20px;color:var(--gs-errore);font-size:0.9em;">⚠️ Immagine non caricabile. Controlla il URL.</div>'
  + '<div id="crop-darken" style="position:absolute;inset:0;background:rgba(0,0,0,0.5);pointer-events:none;display:none;"></div>'
  + '<div id="crop-box" style="display:none;position:absolute;box-sizing:border-box;cursor:grab;box-shadow:0 0 0 9999px rgba(0,0,0,0.52),inset 0 0 0 2px var(--gs-accento);">'
  + '<div style="position:absolute;inset:0;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);pointer-events:none;">'
  + '<div style="border:1px solid rgba(255,255,255,0.12);"></div><div style="border:1px solid rgba(255,255,255,0.12);"></div><div style="border:1px solid rgba(255,255,255,0.12);"></div>'
  + '<div style="border:1px solid rgba(255,255,255,0.12);"></div><div style="border:1px solid rgba(255,255,255,0.12);"></div><div style="border:1px solid rgba(255,255,255,0.12);"></div>'
  + '<div style="border:1px solid rgba(255,255,255,0.12);"></div><div style="border:1px solid rgba(255,255,255,0.12);"></div><div style="border:1px solid rgba(255,255,255,0.12);"></div>'
  + '</div></div></div>'
  + '<div style="display:flex;justify-content:flex-end;gap:12px;padding-top:12px;border-top:1px solid var(--gs-medio);">'
  + '<button onclick="cropChiudiModal()" style="background:var(--gs-scuro);color:var(--gs-tenue);border:1px solid var(--gs-medio);padding:9px 22px;border-radius:6px;cursor:pointer;font-family:\'Montserrat\';">Annulla</button>'
  + '<button onclick="cropConferma()" style="background:linear-gradient(135deg,var(--gs-verde),var(--gs-verde2));color:var(--gs-btn-testo);border:none;padding:9px 22px;border-radius:6px;cursor:pointer;font-family:\'Montserrat\';font-weight:700;">Conferma</button>'
  + '</div></div>';
 document.body.appendChild(overlay);
 overlay.addEventListener('mousedown', function(e) { if (e.target === overlay) cropChiudiModal(); });
 cropModalBindDrag();
}

function cropModalImgCaricata() {
 setTimeout(function() {
  var img = document.getElementById('crop-modal-img');
  var canvas = document.getElementById('crop-canvas');
  var box = document.getElementById('crop-box');
  var darken = document.getElementById('crop-darken');
  if (!img || !canvas || !box) return;
  darken.style.display = '';
  box.style.display = '';
  var natW = img.naturalWidth; var natH = img.naturalHeight;
  if (!natW || !natH) return;
  // Larghezza disponibile nel canvas (width:100% del box modale), affidabile
  // già al primo layout a differenza dell'altezza.
  var canvasW = canvas.clientWidth || canvas.offsetWidth || 600;
  // Dimensioni REALI dell'immagine renderizzata, calcolate da naturalW/H
  // replicando il CSS (width:100%, height:auto, max-height:400px). Evita la
  // divergenza tra altezza teorica (400) e altezza reale del canvas che
  // sproporzionava il riquadro con immagini orizzontali.
  var MAXH = 400;
  var dispW, dispH;
  var hFull = natH * (canvasW / natW);
  if (hFull <= MAXH) { dispW = canvasW; dispH = hFull; }
  else { dispH = MAXH; dispW = natW * (MAXH / natH); }
  // Facciamo combaciare il canvas con l'immagine: box di crop allineato
  // all'immagine senza offset di centratura (ox=oy=0).
  canvas.style.width = dispW + 'px';
  var canvW = dispW; var canvH = dispH;
  var ox = 0; var oy = 0;
  var slotAR = _cropModal.slotW / _cropModal.slotH;
  var saved = _cropModal.crop; var cx, cy, cw, ch;
  if (saved.w === 100 && saved.h === 100 && saved.x === 0 && saved.y === 0) {
   var imgAR = dispW / dispH; var rectPxW, rectPxH;
   if (slotAR >= imgAR) { rectPxW = dispW; rectPxH = Math.min(dispH, rectPxW / slotAR); }
   else { rectPxH = dispH; rectPxW = Math.min(dispW, rectPxH * slotAR); }
   cw = rectPxW / canvW * 100; ch = rectPxH / canvH * 100;
   cx = (ox + (dispW - rectPxW) / 2) / canvW * 100; cy = (oy + (dispH - rectPxH) / 2) / canvH * 100;
  } else {
   cx = (ox + saved.x / 100 * dispW) / canvW * 100; cy = (oy + saved.y / 100 * dispH) / canvH * 100;
   cw = saved.w / 100 * dispW / canvW * 100; ch = saved.h / 100 * dispH / canvH * 100;
  }
  _cropModal.crop = { x: cx, y: cy, w: cw, h: ch };
  _cropModal.dispW = dispW; _cropModal.dispH = dispH;
  _cropModal.canvW = canvW; _cropModal.canvH = canvH;
  _cropModal.ox = ox; _cropModal.oy = oy;
  cropModalAggiornaBox();
 }, 0);
}

function cropModalAggiornaBox() {
 var box = document.getElementById('crop-box');
 if (!box) return;
 var c = _cropModal.crop;
 box.style.left = c.x+'%'; box.style.top = c.y+'%';
 box.style.width = c.w+'%'; box.style.height = c.h+'%';
}

function cropModalBindDrag() {
 var canvas = document.getElementById('crop-canvas');
 var box = document.getElementById('crop-box');
 if (!canvas || !box) return;
 function getRelPct(e) {
  var r = canvas.getBoundingClientRect();
  var clientX = e.touches ? e.touches[0].clientX : e.clientX;
  var clientY = e.touches ? e.touches[0].clientY : e.clientY;
  return { x: ((clientX - r.left) / r.width) * 100, y: ((clientY - r.top) / r.height) * 100 };
 }
 function onBoxDown(e) {
  e.preventDefault(); e.stopPropagation();
  var p = getRelPct(e);
  _cropModal.drag = { startX:p.x, startY:p.y, startCrop:{ x:_cropModal.crop.x, y:_cropModal.crop.y, w:_cropModal.crop.w, h:_cropModal.crop.h } };
  box.style.cursor = 'grabbing';
 }
 function onMove(e) {
  var d = _cropModal.drag; if (!d) return;
  e.preventDefault();
  var p = getRelPct(e); var sc = d.startCrop;
  var canvW = _cropModal.canvW || canvas.offsetWidth || 1;
  var canvH = _cropModal.canvH || canvas.offsetHeight || 1;
  var dispW = _cropModal.dispW || canvW; var dispH = _cropModal.dispH || canvH;
  var ox = _cropModal.ox != null ? _cropModal.ox : (canvW - dispW) / 2;
  var oy = _cropModal.oy != null ? _cropModal.oy : (canvH - dispH) / 2;
  var imgMinX = ox / canvW * 100; var imgMinY = oy / canvH * 100;
  var imgMaxX = (ox + dispW) / canvW * 100; var imgMaxY = (oy + dispH) / canvH * 100;
  _cropModal.crop.x = Math.max(imgMinX, Math.min(imgMaxX - sc.w, sc.x + (p.x - d.startX)));
  _cropModal.crop.y = Math.max(imgMinY, Math.min(imgMaxY - sc.h, sc.y + (p.y - d.startY)));
  cropModalAggiornaBox();
 }
 function onUp() { _cropModal.drag = null; if (box) box.style.cursor = 'grab'; }
 box.addEventListener('mousedown',  onBoxDown, {passive:false});
 box.addEventListener('touchstart', onBoxDown, {passive:false});
 // I listener globali su document vanno agganciati UNA VOLTA SOLA, altrimenti
 // si accumulano a ogni apertura della modal.
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
 var canvW = _cropModal.canvW || 1; var canvH = _cropModal.canvH || 1;
 var dispW = _cropModal.dispW || canvW; var dispH = _cropModal.dispH || canvH;
 var ox = _cropModal.ox != null ? _cropModal.ox : 0;
 var oy = _cropModal.oy != null ? _cropModal.oy : 0;
 var x = ((c.x / 100 * canvW) - ox) / dispW * 100;
 var y = ((c.y / 100 * canvH) - oy) / dispH * 100;
 var w = (c.w / 100 * canvW) / dispW * 100;
 var h = (c.h / 100 * canvH) / dispH * 100;
 x = Math.max(0, Math.min(100 - w, x)); y = Math.max(0, Math.min(100 - h, y));
 w = Math.min(100, w); h = Math.min(100, h);
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
 return html;
}

function costruisciInfo() {
 var html = riga3(
  inputText('campo-agg1','Aggettivo 1','Es. Enigmatico'),
  inputText('campo-agg2','Aggettivo 2','Es. Pericoloso'),
  inputText('campo-agg3','Aggettivo 3','Es. Imprevedibile')
 );
 html += inputText('campo-citazione','Citazione del personaggio','Citazione...');
 html += inputTextarea('campo-aspetto','Descrizione','Descrivi aspetto fisico e carattere...', 5);
 html += inputTextarea('campo-background','Background','Racconta la storia del personaggio...', 6);
 return html;
}

function costruisciStatistiche(isNuova) {
  // NPC: sempre input liberi, nessuna restrizione
  var html = '<p style="color:var(--gs-tenue); font-size:0.85em; margin-bottom:15px; font-style:italic;">Nessuna restrizione — gli NPC possono avere qualsiasi valore.</p>';
  var nomiStat = ['Forza','Resistenza','Velocità','Riflessi','Destrezza','Mira','Intelligenza','Carisma','Istinto','Fortuna'];
  var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna'];

  function buildStat(nome, id, defaultVal, step) {
    return (
      '<div style="text-align:center; background:var(--gs-scuro); border:1px solid var(--gs-medio); border-radius:8px; padding:8px 4px;">' +
      '<div style="color:var(--gs-tenue); font-size:0.75em; margin-bottom:4px;">' + nome + '</div>' +
      '<input type="text" id="stat-' + id + '" value="' + defaultVal + '" ' +
      'style="width:60px; background:transparent; border:none; color:var(--gs-accento); font-size:1.2em; font-weight:700; text-align:center; padding:2px 0;">' +
      '<div style="display:flex; justify-content:center; gap:4px; margin-top:5px;">' +
      '<button onclick="stepStatNpc(\'' + id + '\',-' + step + ')" style="background:var(--gs-fondo); color:var(--gs-accento); border:1px solid var(--gs-medio); border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">&#8722;</button>' +
      '<button onclick="stepStatNpc(\'' + id + '\',' + step + ')" style="background:var(--gs-fondo); color:var(--gs-accento); border:1px solid var(--gs-medio); border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">+</button>' +
      '<button onclick="document.getElementById(\'stat-' + id + '\').value=\'???\';" style="background:var(--gs-fondo); color:var(--gs-accento); border:1px solid var(--gs-medio); border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.75em; padding:0;">?</button>' +
      '</div></div>'
    );
  }

  var r1 = [], r2 = [];
  for (var i = 0; i < 5; i++)  r1.push(buildStat(nomiStat[i], ls[i], 5, 5));
  for (var j = 5; j < 10; j++) r2.push(buildStat(nomiStat[j], ls[j], 5, 5));

  html += rigaStat5(r1);
  html += rigaStat5(r2);
  html += riga2(
    buildStat('Vita', 'vita', 300, 100),
    buildStat('Aura', 'aura', 500, 100)
  );
 // Competenze: sempre tutte sbloccate, nessuna restrizione di livello
 html += '<div style="margin-top:22px; border-top:1px solid var(--gs-medio); padding-top:18px;">';
 html += '<h4 style="color:var(--gs-accento); font-family:\'Montserrat\'; margin-bottom:14px;"><i class="fa-solid fa-puzzle-piece"></i> Competenze</h4>';
 html += '<p style="color:var(--gs-tenue); font-size:0.85em; margin-bottom:14px; font-style:italic;">Tutti gli slot sono sempre disponibili per gli NPC.</p>';
 for (var n = 0; n < 5; n++) {
  html += '<div style="background:var(--gs-scuro); border:1px solid var(--gs-medio); border-radius:8px; padding:14px; margin-bottom:10px;">';
  html += '<div style="color:var(--gs-accento); font-size:0.82em; margin-bottom:10px;"><i class="fa-solid fa-lock-open"></i> Slot ' + (n+1) + '</div>';
  html += inputText('comp-nome-'+n,'Nome competenza','Es. Maestro del Combattimento');
  html += riga2(inputText('comp-lv-'+n,'Livello','Es. 3'), inputText('comp-oggetto-'+n,'Oggetto','Es. Carte'));
  html += inputTextarea('comp-desc-'+n,'Descrizione','Descrizione della competenza...', 2);
  html += '</div>';
 }
 html += '</div>';
 return html;
}

function costruisciNen(isNuova) {
 var html = inputSelect('campo-hatsu','Tipo Hatsu', TIPI_HATSU);
 html += riga2(inputText('campo-nen','Nen (%)','Es. 100'), inputText('campo-tenacia','Tenacia (%)','Es. 100'));

 // Toggle modalità Hatsu
 html += '<div style="margin-top:16px; border-top:1px solid var(--gs-medio); padding-top:16px; margin-bottom:16px;">';
 html += '<label style="display:block; color:var(--gs-accento); font-size:0.9em; margin-bottom:8px; font-family:\'Montserrat\';">Modalità Hatsu</label>';
 html += '<div style="display:flex; gap:10px;">';
 html += '<label style="cursor:pointer; display:flex; align-items:center; gap:6px; background:var(--gs-scuro); border:1px solid var(--gs-medio); border-radius:6px; padding:8px 16px; color:var(--gs-accento); font-size:0.88em;"><input type="radio" name="nen-modalita" value="completo" checked onchange="aggiornaModoNen()"> Completo</label>';
 html += '<label style="cursor:pointer; display:flex; align-items:center; gap:6px; background:var(--gs-scuro); border:1px solid var(--gs-medio); border-radius:6px; padding:8px 16px; color:var(--gs-accento); font-size:0.88em;"><input type="radio" name="nen-modalita" value="speedduel" onchange="aggiornaModoNen()"> Speed Duel</label>';
 html += '</div></div>';

 // Box 1: Potere Nen
 html += '<div style="margin-top:16px; border-top:1px solid var(--gs-medio); padding-top:16px;">';
 html += '<h4 style="color:var(--gs-accento); font-family:\'Montserrat\'; margin-bottom:12px;"><i class="mdi mdi-fire"></i> Potere Nen</h4>';
 html += '<p style="color:var(--gs-tenue); font-size:0.85em; margin-bottom:12px; font-style:italic;">Il titolo del box sarà il tipo di Hatsu selezionato sopra.</p>';
 html += inputText('nen-nomepotere', 'Nome potere', 'Es. Filo d\'Ambra');
 html += inputTextarea('nen-descrizione', 'Descrizione', 'Descrizione del potere...', 3);
 html += inputTextarea('nen-funzionamento', 'Funzionamento e regole', 'Come funziona il potere, le regole...', 3);
 html += inputTextarea('nen-condizioni', 'Condizioni e restrizioni', 'Eventuali condizioni o restrizioni...', 2);
 html += '</div>';

 // Immagine nen
 html += '<div style="margin-top:16px; border-top:1px solid var(--gs-medio); padding-top:16px;">';
 html += '<h4 style="color:var(--gs-accento); font-family:\'Montserrat\'; margin-bottom:12px;"><i class="fa-solid fa-image"></i> Immagine Nen</h4>';
 html += campoCropHTML('nen-img', 'URL immagine — dimensioni ideali: 664×200px', 'img-nen', 664, 200);
 html += '</div>';

 // Box 2: Profili (nascosto in Speed Duel)
 html += '<div id="nen-sezione-profili" style="margin-top:16px; border-top:1px solid var(--gs-medio); padding-top:16px;">';
 html += '<h4 style="color:var(--gs-accento); font-family:\'Montserrat\'; margin-bottom:12px;"><i class="fa-solid fa-layer-group"></i> Profili</h4>';
 for (var p = 1; p <= 4; p++) {
  html += '<div style="background:var(--gs-box); border:1px solid var(--gs-medio); border-radius:8px; padding:14px; margin-bottom:12px;">';
  html += '<div style="color:var(--gs-accento); font-size:0.9em; font-weight:600; margin-bottom:10px;">Profilo ' + p + '</div>';
  html += inputText('profilo-'+p+'-nome', 'Nome profilo', 'Es. Filo Singolo');
  html += inputTextarea('profilo-'+p+'-desc', 'Descrizione', 'Descrizione del profilo...', 2);
  html += inputTextarea('profilo-'+p+'-bonus', 'Bonus', 'Descrizione del bonus...', 2);
  html += inputTextarea('profilo-'+p+'-malus', 'Eventuali Condizioni e/o Restrizioni e/o Malus', 'Descrizione...', 2);
  html += inputTextarea('profilo-'+p+'-costo', 'Costo per Fase', 'Es. 40 Aura per fase', 1);
  html += '</div>';
 }
 html += '</div>';

 html += costruisciBoxTecniche('25', '25%', 2);
 html += '<div id="nen-sezione-t50">' + costruisciBoxTecniche('50', '50%', 2) + '</div>';
 html += costruisciBoxTecniche('100', '100%', 1);

 return html;
}

function costruisciBoxTecniche(id, label, num) {
 if (num === undefined) num = id === '100' ? 1 : 2;
 var html = '<div style="margin-top:16px; border-top:1px solid var(--gs-medio); padding-top:16px;">';
 html += '<h4 style="color:var(--gs-accento); font-family:\'Montserrat\'; margin-bottom:12px;"><i class="fa-solid fa-bolt"></i> Tecniche ' + label + '</h4>';
 for (var t = 1; t <= num; t++) {
  html += '<div style="background:var(--gs-box); border:1px solid var(--gs-medio); border-radius:8px; padding:14px; margin-bottom:12px;">';
  html += '<div style="color:var(--gs-accento); font-size:0.9em; font-weight:600; margin-bottom:10px;">Tecnica ' + t + '</div>';
  html += inputText('tecnica-'+id+'-'+t+'-nome', 'Nome tecnica', 'Es. Taglio Rapido');
  html += inputTextarea('tecnica-'+id+'-'+t+'-desc', 'Descrizione', 'Descrizione della tecnica...', 2);
  html += inputTextarea('tecnica-'+id+'-'+t+'-bonus', 'Bonus', 'Descrizione del bonus...', 2);
  html += inputTextarea('tecnica-'+id+'-'+t+'-malus', 'Eventuali Condizioni e/o Restrizioni e/o Malus', 'Descrizione...', 2);
  html += inputTextarea('tecnica-'+id+'-'+t+'-costo', 'Costo per Fase', 'Es. 40 Aura per fase', 1);
  html += '</div>';
 }
 html += '</div>';
 return html;
}

function aggiornaModoNen() {
 var radio = document['querySelector']('input[name="nen-modalita"]:checked');
 var modo = radio ? radio.value : 'completo';
 var sezioneP = document.getElementById('nen-sezione-profili');
 var sezioneT50 = document.getElementById('nen-sezione-t50');
 if (sezioneP) sezioneP.style.display = modo === 'speedduel' ? 'none' : '';
 if (sezioneT50) sezioneT50.innerHTML = costruisciBoxTecniche('50', '50%', modo === 'speedduel' ? 1 : 2);
}

function costruisciApparizioni(isNuova) {
 var html = '<div id="lista-apparizioni"></div>';
 html += '<button onclick="aggiungiApparizione()" style="background:transparent; color:var(--gs-tenue); border:1px dashed var(--gs-medio); padding:8px 20px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; margin-top:5px;"><i class="fa-solid fa-plus"></i> Aggiungi Apparizione</button>';
 return html;
}

function aggiungiApparizione() {
 var lista = document.getElementById('lista-apparizioni');
 var idx = lista.children.length;
 var div = document.createElement('div');
 div.id = 'apparizione-row-' + idx;
 div.style.cssText = 'margin-bottom:8px;';
 div.innerHTML =
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' +
  '<td style="width:44%; padding-right:5px; vertical-align:bottom;">' + inputText('apparizione-nome-'+idx,'Nome apparizione','Es. La Prima Missione') + '</td>' +
  '<td style="width:44%; padding-left:5px; padding-right:5px; vertical-align:bottom;">' + inputText('apparizione-link-'+idx,'Link','https://...') + '</td>' +
  '<td style="width:12%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' +
  '<button onclick="rimuoviElemento(\'apparizione-row-'+idx+'\')" style="background:var(--gs-errore-fondo); color:var(--gs-errore); border:1px solid var(--gs-errore-bordo); padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' +
  '</td></tr></table>';
 lista.appendChild(div);
}

// ============================================================
// CAMPI DATI EXTRA (label + valore liberi, aggiungibili)
// ============================================================
function costruisciCampiExtra() {
 var html = '<p style="color:var(--gs-tenue); font-size:0.88em; margin-bottom:12px; font-style:italic;"><i class="fa-solid fa-circle-info"></i> Aggiungi campi personalizzati alla slide Dati. Puoi scegliere sia il testo del label che il contenuto.</p>';
 html += '<div id="lista-campi-extra"></div>';
 html += '<button onclick="aggiungiCampoExtra()" style="background:transparent; color:var(--gs-tenue); border:1px dashed var(--gs-medio); padding:8px 20px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; margin-top:5px;"><i class="fa-solid fa-plus"></i> Aggiungi Campo</button>';
 return html;
}

function aggiungiCampoExtra() {
 var lista = document.getElementById('lista-campi-extra');
 var idx = lista.children.length;
 var div = document.createElement('div');
 div.id = 'extra-row-' + idx;
 div.style.cssText = 'background:var(--gs-box); border:1px solid var(--gs-medio); border-radius:8px; padding:12px; margin-bottom:10px;';
 div.innerHTML =
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' +
  '<td style="width:35%; padding-right:5px; vertical-align:bottom;">' + inputText('extra-label-'+idx,'Testo del Label','Es. Affiliazione:') + '</td>' +
  '<td style="width:53%; padding-left:5px; padding-right:5px; vertical-align:bottom;">' + inputText('extra-val-'+idx,'Contenuto','Es. Associazione Hunter') + '</td>' +
  '<td style="width:12%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' +
  '<button onclick="rimuoviElemento(\'extra-row-'+idx+'\')" style="background:var(--gs-errore-fondo); color:var(--gs-errore); border:1px solid var(--gs-errore-bordo); padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' +
  '</td></tr></table>';
 lista.appendChild(div);
}

// ============================================================
// BAULE
// ============================================================
function costruisciBalue() {
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
  html += '<h4 style="color:var(--gs-accento); font-family:\'Montserrat\'; font-size:1.2em; margin-bottom:8px;">' + cat.nome + '</h4>';
  html += '<div id="lista-' + cat.id + '"></div>';
  html += '<button onclick="aggiungiItem(\'' + cat.id + '\')" style="background:transparent; color:var(--gs-tenue); border:1px dashed var(--gs-medio); padding:6px 16px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; font-size:1em;"><i class="fa-solid fa-plus"></i> Aggiungi</button>';
  html += '</div>';
 }
 return html;
}

function aggiungiItem(categoria) {
 var lista = document.getElementById('lista-' + categoria);
 var idx = lista.children.length;
 var div = document.createElement('div');
 div.id = categoria + '-row-' + idx;
 div.style.cssText = 'background:var(--gs-box); border:1px solid var(--gs-medio); border-radius:8px; padding:12px; margin-bottom:10px;';
 var riga1 = '';
 if (categoria === 'materiali') {
  riga1 = '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' +
   '<td style="width:78%; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-nome-'+idx,'Nome','Es. Erba medicinale') + '</td>' +
   '<td style="width:12%; padding-left:4px; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-qt-'+idx,'Qt','1') + '</td>' +
   '<td style="width:10%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' +
   '<button onclick="rimuoviElemento(\'' + categoria + '-row-' + idx + '\')" style="background:var(--gs-errore-fondo); color:var(--gs-errore); border:1px solid var(--gs-errore-bordo); padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' +
   '</td></tr></table>';
 } else if (categoria === 'oggetti') {
  riga1 = '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' +
   '<td style="width:52%; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-nome-'+idx,'Nome','Es. Pozione') + '</td>' +
   '<td style="width:16%; padding-left:4px; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-qt-'+idx,'Qt','1') + '</td>' +
   '<td style="width:22%; padding-left:4px; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-usi-'+idx,'Usi (es. 0/3)','0/3') + '</td>' +
   '<td style="width:10%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' +
   '<button onclick="rimuoviElemento(\'' + categoria + '-row-' + idx + '\')" style="background:var(--gs-errore-fondo); color:var(--gs-errore); border:1px solid var(--gs-errore-bordo); padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' +
   '</td></tr></table>';
 } else {
  riga1 = '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' +
   '<td style="width:52%; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-nome-'+idx,'Nome','Es. Spada') + '</td>' +
   '<td style="width:16%; padding-left:4px; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-qt-'+idx,'Qt','1') + '</td>' +
   '<td style="width:22%; padding-left:4px; padding-right:4px; vertical-align:bottom;">' +
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Livello (max 5)</label>' +
   '<div style="display:flex; align-items:center; gap:6px;">' +
   '<button onclick="stepLv(\''+categoria+'-lv-'+idx+'\', -1)" style="background:var(--gs-fondo); color:var(--gs-accento); border:1px solid var(--gs-medio); border-radius:4px; width:28px; height:28px; cursor:pointer; font-size:1em; padding:0; flex-shrink:0;">&#8722;</button>' +
   '<input type="number" id="'+categoria+'-lv-'+idx+'" value="0" min="0" max="5" style="'+STILE_INPUT+' text-align:center; flex:1;">' +
   '<button onclick="stepLv(\''+categoria+'-lv-'+idx+'\', 1)" style="background:var(--gs-fondo); color:var(--gs-accento); border:1px solid var(--gs-medio); border-radius:4px; width:28px; height:28px; cursor:pointer; font-size:1em; padding:0; flex-shrink:0;">+</button>' +
   '</div></div>' +
   '</td>' +
   '<td style="width:10%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' +
   '<button onclick="rimuoviElemento(\'' + categoria + '-row-' + idx + '\')" style="background:var(--gs-errore-fondo); color:var(--gs-errore); border:1px solid var(--gs-errore-bordo); padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' +
   '</td></tr></table>';
 }
 var riga2esp = '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' +
  '<td style="width:50%; padding-right:6px; vertical-align:bottom;">' + inputText(categoria+'-exp-nome-'+idx,'Nome espansione','Es. Caccia al Tesoro') + '</td>' +
  '<td style="width:50%; padding-left:6px; vertical-align:bottom;">' + inputText(categoria+'-exp-link-'+idx,'Link espansione','https://...') + '</td>' +
  '</tr></table>';
 var riga3desc = '<div style="margin-bottom:6px;">' +
  '<label style="'+STILE_LABEL+'">Descrizione <span style="color:var(--gs-tenue); font-size:0.85em; font-weight:400;">(opzionale — HTML consentito)</span></label>' +
  '<textarea id="'+categoria+'-desc-'+idx+'" rows="2" placeholder="Es. Una spada antica forgiata in acciaio stellare..." style="'+STILE_INPUT+' font-family:\'Montserrat\'; font-size:0.95em; resize:vertical;"></textarea>' +
  '</div>';
 div.innerHTML = riga1 + riga2esp + riga3desc;
 lista.appendChild(div);
}

function costruisciMusica() {
 return '<div style="display:flex; gap:10px; margin-bottom:6px; align-items:center;">' +
  '<label style="color:var(--gs-tenue); font-size:0.85em;">Piattaforma:</label>' +
  '<select id="campo-musica-piattaforma" onchange="aggiornaMusicaHelp()" style="background:var(--gs-scuro); color:var(--gs-accento); border:1px solid var(--gs-medio); border-radius:6px; padding:4px 8px; font-family:\'Montserrat\';">' +
  '<option value="youtube">YouTube</option>' +
  '<option value="soundcloud">SoundCloud</option>' +
  '</select></div>' +
  inputText('campo-musica','ID traccia','Es. cjqwwIRnmuQ') +
  '<p id="musica-help" style="color:var(--gs-tenue); font-size:0.82em; margin-top:-10px; font-style:italic;">Inserisci SOLO l\'ID del video (Gli 11 caratteri dopo "watch?v=" nell\'URL di YouTube)</p>';
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
 return '<p style="color:var(--gs-tenue); font-size:0.88em; margin-bottom:12px; font-style:italic;"><i class="fa-solid fa-circle-info"></i> Incolla il codice HTML della scheda esistente e premi "Importa Dati".</p>' +
  '<label style="' + STILE_LABEL + '">Codice HTML della scheda esistente:</label>' +
  '<textarea id="campo-importa" placeholder="Incolla il codice HTML..." rows="6" style="' + STILE_INPUT + ' font-family:\'Montserrat\'; font-size:1em; resize:vertical;"></textarea>' +
  '<button onclick="importaScheda()" style="margin-top:10px; background:var(--gs-scuro); color:var(--gs-tenue); border:1px solid var(--gs-medio); padding:10px 25px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\';"><i class="fa-solid fa-file-import"></i> Importa Dati</button>';
}

// ============================================================
// SLIDE EXTRA
// ============================================================
function costruisciSlideExtra(isNuova) {
 var html = '<p style="color:var(--gs-tenue); font-size:0.88em; margin-bottom:16px; font-style:italic;"><i class="fa-solid fa-circle-info"></i> Puoi aggiungere una slide opzionale alla scheda NPC. Scegli il tipo o lascia "Nessuna".</p>';
 html += '<div style="margin-bottom:20px;">';
 html += '<label style="' + STILE_LABEL + '">Tipo di slide extra</label>';
 html += '<select id="campo-slide-extra" onchange="aggiornaSlideExtra()" style="' + STILE_INPUT + ' background:var(--gs-scuro);">';
 html += '<option value="nessuna">Nessuna</option>';
 html += '<option value="moveset">Moveset</option>';
 html += '<option value="valutazioni">Valutazioni</option>';
 html += '<option value="altro">Altro</option>';
 html += '</select></div>';

 // --- Pannello MOVESET ---
 html += '<div id="pannello-moveset" style="display:none;">';
 html += '<div style="background:var(--gs-box); border:1px solid var(--gs-medio); border-radius:8px; padding:14px; margin-bottom:14px;">';
 html += '<h4 style="color:var(--gs-accento); font-family:\'Montserrat\'; margin-bottom:12px;"><i class="fa-solid fa-fist-raised"></i> Attribuzione Punti</h4>';
 html += riga3(
  inputText('moveset-colpovalido','Colpo Valido','Es. 10'),
  inputText('moveset-colpocritico','Colpo Critico','Es. 20'),
  inputText('moveset-garantiti','Punti Garantiti','Es. 5')
 );
 html += '</div>';
 html += '<div style="background:var(--gs-box); border:1px solid var(--gs-medio); border-radius:8px; padding:14px; margin-bottom:14px;">';
 html += '<h4 style="color:var(--gs-accento); font-family:\'Montserrat\'; margin-bottom:12px;"><i class="fa-solid fa-burst"></i> Attacchi</h4>';
 html += '<div id="lista-attacchi"></div>';
 html += '<button onclick="aggiungiTecnicaSlide(\'lista-attacchi\')" style="background:transparent; color:var(--gs-tenue); border:1px dashed var(--gs-medio); padding:8px 20px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; margin-top:5px;"><i class="fa-solid fa-plus"></i> Aggiungi Attacco</button>';
 html += '</div>';
 html += '<div style="background:var(--gs-box); border:1px solid var(--gs-medio); border-radius:8px; padding:14px; margin-bottom:14px;">';
 html += '<h4 style="color:var(--gs-accento); font-family:\'Montserrat\'; margin-bottom:12px;"><i class="fa-solid fa-shield-halved"></i> Difese</h4>';
 html += '<div id="lista-difese"></div>';
 html += '<button onclick="aggiungiTecnicaSlide(\'lista-difese\')" style="background:transparent; color:var(--gs-tenue); border:1px dashed var(--gs-medio); padding:8px 20px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; margin-top:5px;"><i class="fa-solid fa-plus"></i> Aggiungi Difesa</button>';
 html += '</div>';
 html += '</div>'; // fine pannello-moveset

 // --- Pannello VALUTAZIONI ---
 html += '<div id="pannello-valutazioni" style="display:none;">';
 html += inputText('val-titolo','Titolo valutazione','Valutazione degli Esaminatori');
 html += '<div id="lista-valutazioni"></div>';
 html += '<button onclick="aggiungiValutazione()" style="background:transparent; color:var(--gs-tenue); border:1px dashed var(--gs-medio); padding:8px 20px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; margin-top:5px;"><i class="fa-solid fa-plus"></i> Aggiungi Valutazione</button>';
 html += '<div style="margin-top:18px; border-top:1px solid var(--gs-medio); padding-top:14px;">';
 html += inputText('val-verdetto','Verdetto (opzionale — appare sotto le valutazioni)','Es. Probabilità di promozione: 15%');
 html += '</div>';
 html += '</div>'; // fine pannello-valutazioni

 // --- Pannello ALTRO ---
 html += '<div id="pannello-altro" style="display:none;">';
 html += '<div id="lista-altro"></div>';
 html += '<button onclick="aggiungiCampoAltro()" style="background:transparent; color:var(--gs-tenue); border:1px dashed var(--gs-medio); padding:8px 20px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; margin-top:5px;"><i class="fa-solid fa-plus"></i> Aggiungi Campo</button>';
 html += '</div>'; // fine pannello-altro

 return html;
}

function aggiornaSlideExtra() {
 var sel = document.getElementById('campo-slide-extra');
 if (!sel) return;
 var val = sel.value;
 var pannelli = ['moveset','valutazioni','altro'];
 for (var i = 0; i < pannelli.length; i++) {
  var p = document.getElementById('pannello-' + pannelli[i]);
  if (p) p.style.display = val === pannelli[i] ? '' : 'none';
 }
}

function aggiungiTecnicaSlide(listaId) {
 var lista = document.getElementById(listaId);
 var idx = lista.children.length;
 var div = document.createElement('div');
 div.id = listaId + '-row-' + idx;
 div.style.cssText = 'background:var(--gs-box2); border:1px solid var(--gs-medio); border-radius:8px; padding:12px; margin-bottom:10px;';
 div.innerHTML =
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed; margin-bottom:6px;"><tr>' +
  '<td style="width:88%; padding-right:6px; vertical-align:bottom;">' + inputText(listaId+'-nome-'+idx,'Nome','Es. Pugno di Ferro') + '</td>' +
  '<td style="width:12%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' +
  '<button onclick="rimuoviElemento(\'' + listaId + '-row-' + idx + '\')" style="background:var(--gs-errore-fondo); color:var(--gs-errore); border:1px solid var(--gs-errore-bordo); padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' +
  '</td></tr></table>' +
  inputTextarea(listaId+'-desc-'+idx,'Descrizione','Descrizione...', 2);
 lista.appendChild(div);
}

function aggiungiValutazione() {
 var lista = document.getElementById('lista-valutazioni');
 var idx = lista.children.length;
 var div = document.createElement('div');
 div.id = 'val-row-' + idx;
 div.style.cssText = 'background:var(--gs-box); border:1px solid var(--gs-medio); border-radius:8px; padding:12px; margin-bottom:10px;';
 div.innerHTML =
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' +
  '<td style="width:55%; padding-right:5px; vertical-align:bottom;">' + inputText('val-nome-'+idx,'Nome valutazione','Es. Combattività') + '</td>' +
  '<td style="width:33%; padding-left:5px; padding-right:5px; vertical-align:middle;">' +
  '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Punteggio (1-5)</label>' +
  '<div style="display:flex; gap:6px; align-items:center;">' +
  [1,2,3,4,5].map(function(n){ return '<button onclick="setStella(\'val-stelle-'+idx+'\','+n+')" id="val-stella-'+idx+'-'+n+'" style="background:transparent; border:none; cursor:pointer; font-size:22px; color:var(--gs-medio); padding:0;">★</button>'; }).join('') +
  '<input type="hidden" id="val-stelle-'+idx+'" value="0">' +
  '</div></div>' +
  '</td>' +
  '<td style="width:12%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' +
  '<button onclick="rimuoviElemento(\'val-row-'+idx+'\')" style="background:var(--gs-errore-fondo); color:var(--gs-errore); border:1px solid var(--gs-errore-bordo); padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' +
  '</td></tr></table>';
 lista.appendChild(div);
}

function setStella(hiddenId, valore) {
 var hidden = document.getElementById(hiddenId);
 if (!hidden) return;
 hidden.value = valore;
 // Aggiorna colori bottoni stelle
 var idx = hiddenId.replace('val-stelle-','');
 for (var n = 1; n <= 5; n++) {
  var btn = document.getElementById('val-stella-'+idx+'-'+n);
  if (btn) btn.style.color = n <= valore ? 'var(--gs-accento)' : 'var(--gs-medio)';
 }
}

function aggiungiCampoAltro() {
 var lista = document.getElementById('lista-altro');
 var idx = lista.children.length;
 var div = document.createElement('div');
 div.id = 'altro-row-' + idx;
 div.style.cssText = 'background:var(--gs-box); border:1px solid var(--gs-medio); border-radius:8px; padding:12px; margin-bottom:10px;';
 div.innerHTML =
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' +
  '<td style="width:35%; padding-right:5px; vertical-align:bottom;">' + inputText('altro-label-'+idx,'Testo del Label','Es. Affiliazione:') + '</td>' +
  '<td style="width:53%; padding-left:5px; padding-right:5px; vertical-align:bottom;">' + inputText('altro-val-'+idx,'Contenuto','Es. Associazione Hunter') + '</td>' +
  '<td style="width:12%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' +
  '<button onclick="rimuoviElemento(\'altro-row-'+idx+'\')" style="background:var(--gs-errore-fondo); color:var(--gs-errore); border:1px solid var(--gs-errore-bordo); padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' +
  '</td></tr></table>';
 lista.appendChild(div);
}

// ============================================================
// STATUS MULTIPLI
// ============================================================
function costruisciStatusMultipli() {
 var opzioni = STATUS.map(function(s){ return '<option value="'+s+'">'+s+'</option>'; }).join('');
 var html = '<div style="margin-bottom:14px;">';
 html += '<label style="'+STILE_LABEL+'">Status</label>';
 html += '<div id="lista-status">';
 html += '<div id="status-row-0" style="display:flex; gap:6px; margin-bottom:6px; align-items:center;">';
 html += '<select id="campo-status-0" style="'+STILE_INPUT+' background:var(--gs-scuro); flex:1;">'+opzioni+'</select>';
 html += '</div>';
 html += '</div>';
 html += '<button onclick="aggiungiStatus()" style="background:transparent; color:var(--gs-tenue); border:1px dashed var(--gs-medio); padding:5px 14px; border-radius:4px; cursor:pointer; font-family:\'Montserrat\'; font-size:0.85em; margin-top:2px;"><i class="fa-solid fa-plus"></i> Aggiungi status</button>';
 html += '</div>';
 return html;
}

function aggiungiStatus() {
 var lista = document.getElementById('lista-status');
 var idx = lista.children.length;
 var opzioni = STATUS.map(function(s){ return '<option value="'+s+'">'+s+'</option>'; }).join('');
 var div = document.createElement('div');
 div.id = 'status-row-' + idx;
 div.style.cssText = 'display:flex; gap:6px; margin-bottom:6px; align-items:center;';
 div.innerHTML =
  '<select id="campo-status-'+idx+'" style="'+STILE_INPUT+' background:var(--gs-scuro); flex:1;">'+opzioni+'</select>' +
  '<button onclick="rimuoviElemento(\'status-row-'+idx+'\')" style="background:var(--gs-errore-fondo); color:var(--gs-errore); border:1px solid var(--gs-errore-bordo); padding:8px 10px; border-radius:6px; cursor:pointer; flex-shrink:0;"><i class="fa-solid fa-xmark"></i></button>';
 lista.appendChild(div);
}

// ============================================================
// LOGICA RAZZA
// ============================================================
function aggiornaRazza(isNuova) {
 var razzaEl = document.getElementById('campo-razza');
 var specieEl = document.getElementById('campo-specie');
 if (!razzaEl) return;
 var razza = razzaEl.value;
 var isBestia = razza === 'Bestia Demoniaca';
 var isAnimale = razza === 'Animale';
 var specie = specieEl ? specieEl.value : '';

  var rankWrap = document.getElementById('campo-rank-wrap');
 var rankAnWrap = document.getElementById('campo-rank-animale-wrap');
 if (spWrap) spWrap.style.display = isBestia ? '' : 'none';
 if (spAnWrap) spAnWrap.style.display = isAnimale ? '' : 'none';
 if (rankWrap) rankWrap.style.display = isBestia ? '' : 'none';
 if (rankAnWrap) rankAnWrap.style.display = isAnimale ? '' : 'none';

 // Mostra/nasconde i due wrapper specie
 var spWrap = document.getElementById('campo-specie-wrap');
 var spAnWrap = document.getElementById('campo-specie-animale-wrap');
 var rankWrap = document.getElementById('campo-rank-wrap');
 if (spWrap) spWrap.style.display = isBestia ? '' : 'none';
 if (spAnWrap) spAnWrap.style.display = isAnimale ? '' : 'none';
 if (rankWrap) rankWrap.style.display = isBestia ? '' : 'none';

 if (isBestia && DATI_SPECIE[specie]) {
  var ds = DATI_SPECIE[specie];
  var rv = document.getElementById('campo-rank-val');
  var cv = document.getElementById('campo-conservazione-val');
  if (rv) rv.textContent = ds.rank;
  if (cv) cv.textContent = ds.conservazione;
 }

 // Aggiorna luoghi — NPC vede tutti i luoghi senza restrizioni
 var luogoEl = document.getElementById('campo-luogo');
 if (luogoEl) {
  var luogoCorrente = luogoEl.value;
  luogoEl['inn'+'erHTML'] = '';
  var luoghiDaMostrare = isBestia
   ? (specie && LUOGHI_BESTIA[specie] ? LUOGHI_BESTIA[specie] : LUOGHI_TUTTI)
   : LUOGHI_UMANI;
  // NPC: mostra comunque tutti, senza disabilitare
  for (var li = 0; li < LUOGHI_TUTTI.length; li++) {
   var opt = document.createElement('option');
   opt.value = LUOGHI_TUTTI[li]; opt.text = LUOGHI_TUTTI[li];
   luogoEl['append'+'Child'](opt);
  }
  if (luogoCorrente) {
   for (var oi = 0; oi < luogoEl.options.length; oi++) {
    if (luogoEl.options[oi].value === luogoCorrente) { luogoEl.selectedIndex = oi; break; }
   }
  }
 }

 // Classe — tutte disponibili, nessuna esclusa
 var classeWrap = document.getElementById('campo-classe-wrap');
 var classeEl = document.getElementById('campo-classe');
 if (classeWrap) classeWrap.style.display = isBestia ? 'none' : '';
 if (classeEl && !isBestia) {
  classeEl['inn'+'erHTML'] = '';
  for (var ci = 0; ci < CLASSI_NPC.length; ci++) {
   var optC = document.createElement('option');
   optC.value = CLASSI_NPC[ci]; optC.text = CLASSI_NPC[ci];
   classeEl['append'+'Child'](optC);
  }
 }

 aggiornaFedina(false);
}

function aggiornaFedina(isNuova) {
 var feEl = document.getElementById('campo-fedina');
 if (!feEl) return;
 var tagliaWrap = document.getElementById('campo-taglia-wrap');
 if (tagliaWrap) tagliaWrap.style.display = feEl.value === 'Ricercato' ? '' : 'none';
}

function aggiornaTaglia() {
 var ctEl = document.getElementById('campo-classtaglia');
 var vtEl = document.getElementById('campo-valtaglia');
 if (!ctEl || !vtEl) return;
 var classe = ctEl.value;
 var min = VALORE_TAGLIA_BASE[classe] || 1000;
 var attuale = parseInt(vtEl.value.replace(/\./g,'').replace(/,/g,'')) || 0;
 if (attuale < min) vtEl.value = min.toLocaleString();
}

// ============================================================
// STEP STAT NPC (nessun limite)
// ============================================================
function stepStatNpc(sId, delta) {
  var el = document.getElementById('stat-' + sId);
  if (!el) return;
  if (el.value.trim() === '???') return;  // ← unica aggiunta
  var cur = parseInt(el.value) || 0;
  var nv = cur + delta;
  if (nv < 0) nv = 0;
  el.value = nv;
}

function stepLv(id, delta) {
 var el = document.getElementById(id);
 if (!el) return;
 var nv = (parseInt(el.value) || 0) + delta;
 if (nv < 0) nv = 0;
 if (nv > 5) nv = 5;
 el.value = nv;
}

function rimuoviElemento(id) {
 var el = document.getElementById(id);
 if (el && el.parentNode) el.parentNode.removeChild(el);
}

// ============================================================
// RACCOLTA DATI
// ============================================================
function raccogliDati(isNuova) {
 function val(id) { var e=document.getElementById(id); return e?e.value.trim():''; }
 // Restituisce true se il wrapper della voce è presente nel DOM (non rimossa, né solo placeholder)
 function presente(wrapId) {
  return !!document.getElementById(wrapId) && !document.getElementById(wrapId + '-placeholder');
 }

var rank = isBestia && DATI_SPECIE[specie] ? DATI_SPECIE[specie].rank : (isAnimale ? (val('campo-rank-animale')||'—') : '—');
  
 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna'];
 var stat = {};
 for (var i=0;i<ls.length;i++) {
  var e = document.getElementById('stat-'+ls[i]);
  stat[ls[i]] = e ? (e.value.trim()||'5') : '5';
 }
 stat.vita = (function(){ var e = document.getElementById('stat-vita'); if (!e) return '300'; var v = e.value.trim(); return (v === '' ? '300' : v); })();
stat.aura = (function(){ var e = document.getElementById('stat-aura'); if (!e) return '500'; var v = e.value.trim(); return (v === '' ? '500' : v); })();

 var isBestia = (function(){ var e=document.getElementById('campo-razza'); return e && e.value==='Bestia Demoniaca'; })();
 var isAnimale = (function(){ var e=document.getElementById('campo-razza'); return e && e.value==='Animale'; })();
 var specie = isBestia ? (val('campo-specie')||'') : (isAnimale ? (val('campo-specie-animale')||'') : '');
 var rank = isBestia && DATI_SPECIE[specie] ? DATI_SPECIE[specie].rank : (isAnimale ? (val('campo-rank-animale')||'—') : '—');
 var conservazione = isBestia && DATI_SPECIE[specie] ? DATI_SPECIE[specie].conservazione : '—';
 var feEl = document.getElementById('campo-fedina');
 var fedina = feEl ? feEl.value : 'Incensurato';
 var classTaglia = '—', valTaglia = '—';
 if (fedina === 'Ricercato') {
  var cte = document.getElementById('campo-classtaglia');
  var vte = document.getElementById('campo-valtaglia');
  classTaglia = cte ? cte.value : 'E';
  var vtRaw = vte ? parseInt(vte.value.replace(/\./g,'').replace(/,/g,'').replace(/[^\d]/g,'')) || VALORE_TAGLIA_BASE['E'] : VALORE_TAGLIA_BASE['E'];
  var vtMin = VALORE_TAGLIA_BASE[classTaglia] || VALORE_TAGLIA_BASE['E'];
  if (vtRaw < vtMin) vtRaw = vtMin;
  valTaglia = vtRaw.toLocaleString();
 }

 var nomeVal = val('campo-nome')||'—';
 var cognomeVal = val('campo-cognome')||'';

 // Apparizioni
 var apparizioni = [];
 var la = document.getElementById('lista-apparizioni');
 if (la) {
  for (var q=0;q<la.children.length;q++) {
   var an=document.getElementById('apparizione-nome-'+q);
   var al=document.getElementById('apparizione-link-'+q);
   if (an&&al) apparizioni.push({nome:an.value.trim(), link:al.value.trim()});
  }
 }

 // Campi extra
 var campiExtra = [];
 var le = document.getElementById('lista-campi-extra');
 if (le) {
  for (var ce=0;ce<le.children.length;ce++) {
   var elLbl=document.getElementById('extra-label-'+ce);
   var elVal=document.getElementById('extra-val-'+ce);
   if (elLbl && elLbl.value.trim()) campiExtra.push({label:elLbl.value.trim(), valore:elVal?elVal.value.trim():''});
  }
 }

 // Baule
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
    item.nome=nE?nE.value.trim():''; item.qt=qE?qE.value.trim():'1';
    if (cats[c]==='oggetti') { var uE=document.getElementById(cats[c]+'-usi-'+bb); item.usi=uE?uE.value.trim():'0/1'; }
    else if (cats[c]!=='materiali') { var lE=document.getElementById(cats[c]+'-lv-'+bb); item.lv=lE?lE.value.trim():'0'; }
    var enE=document.getElementById(cats[c]+'-exp-nome-'+bb);
    var elE2=document.getElementById(cats[c]+'-exp-link-'+bb);
    var dE=document.getElementById(cats[c]+'-desc-'+bb);
    item.expNome=enE?enE.value.trim():''; item.expLink=elE2?elE2.value.trim():'';
    item.desc=dE?dE.value.trim():'';
    if (item.nome) baule[cats[c]].push(item);
   }
  }
 }

 // Competenze — tutte sempre sbloccate
 var competenze = [];
 for (var k=0;k<5;k++) {
  competenze.push({
   nome:val('comp-nome-'+k), lv:val('comp-lv-'+k),
   oggetto:val('comp-oggetto-'+k), desc:val('comp-desc-'+k),
   sbloccato: !!val('comp-nome-'+k)
  });
 }

 // Tecniche Hatsu — nuova struttura
 var nenPotere = {
  nomepotere:    val('nen-nomepotere')||'—',
  descrizione:   val('nen-descrizione')||'—',
  funzionamento: val('nen-funzionamento')||'—',
  condizioni:    val('nen-condizioni')||'—'
 };
 var nenImg = val('nen-img')||'';
 var nenImgX = (function(){ var e=document.getElementById('crop-x-img-nen'); return e?parseFloat(e.value)||0:0; })();
 var nenImgY = (function(){ var e=document.getElementById('crop-y-img-nen'); return e?parseFloat(e.value)||0:0; })();
 var nenImgW = (function(){ var e=document.getElementById('crop-w-img-nen'); return e?parseFloat(e.value)||100:100; })();
 var nenImgH = (function(){ var e=document.getElementById('crop-h-img-nen'); return e?parseFloat(e.value)||100:100; })();
 var nenRadio = document['querySelector']('input[name="nen-modalita"]:checked');
 var nenModo = nenRadio ? nenRadio.value : 'completo';
 var profili = [];
 if (nenModo !== 'speedduel') {
  for (var p=1;p<=4;p++) profili.push({
   nome:  val('profilo-'+p+'-nome') ||'—',
   desc:  val('profilo-'+p+'-desc') ||'—',
   bonus: val('profilo-'+p+'-bonus')||'—',
   malus: val('profilo-'+p+'-malus')||'—',
   costo: val('profilo-'+p+'-costo')||'—'
  });
 }

 // Slide extra
 var slideExtraTipo = val('campo-slide-extra') || 'nessuna';
 var slideExtraData = {};
 if (slideExtraTipo === 'moveset') {
  slideExtraData.colpovalido  = val('moveset-colpovalido')  || '—';
  slideExtraData.colpocritico = val('moveset-colpocritico') || '—';
  slideExtraData.garantiti    = val('moveset-garantiti')    || '—';
  slideExtraData.attacchi = raccogliListaTecnicaSlide('lista-attacchi');
  slideExtraData.difese   = raccogliListaTecnicaSlide('lista-difese');
 } else if (slideExtraTipo === 'valutazioni') {
  slideExtraData.titolo = val('val-titolo') || 'Valutazione degli Esaminatori';
  slideExtraData.verdetto = val('val-verdetto') || '';
  slideExtraData.voci = [];
  var lv2 = document.getElementById('lista-valutazioni');
  if (lv2) {
   for (var vi=0;vi<lv2.children.length;vi++) {
    var vnEl = document.getElementById('val-nome-'+vi);
    var vsEl = document.getElementById('val-stelle-'+vi);
    if (vnEl && vnEl.value.trim()) {
     slideExtraData.voci.push({nome:vnEl.value.trim(), stelle: parseInt(vsEl?vsEl.value:0)||0});
    }
   }
  }
 } else if (slideExtraTipo === 'altro') {
  slideExtraData.campi = [];
  var lal = document.getElementById('lista-altro');
  if (lal) {
   for (var ai=0;ai<lal.children.length;ai++) {
    var albl=document.getElementById('altro-label-'+ai);
    var aval=document.getElementById('altro-val-'+ai);
    if (albl && albl.value.trim()) slideExtraData.campi.push({label:albl.value.trim(), valore:aval?aval.value.trim():''});
   }
  }
 }

 var expTot = 100;
 var lvNum = parseInt(val('campo-livello')) || 1;
 if (lvNum > 14) expTot = 100 + (lvNum - 14) * 10;

 return {
  nome: nomeVal,
  cognome: cognomeVal,
  nomecognome: (nomeVal==='—'&&cognomeVal==='') ? nomeVal : (nomeVal+' '+cognomeVal).trim(),
  genere: presente('vd-generarazza') ? (val('campo-genere')||'—') : null,
  razza: isBestia ? 'Bestia Demoniaca' : (isAnimale ? 'Animale' : 'Umano'),
  specie: specie,
  rank: rank,
  conservazione: conservazione,
  fedina: presente('vd-fedina') ? fedina : null,
  classTaglia: presente('vd-fedina') ? classTaglia : '—',
  valTaglia: presente('vd-fedina') ? valTaglia : '—',
  luogo: presente('vd-luogo') ? (val('campo-luogo')||'—') : null,
  datanascita: presente('vd-data') ? leggiData('campo-datanascita') : null,
  segno: presente('vd-segni') ? (val('campo-segno')||'—') : null,
  segnocinese: presente('vd-segni') ? (val('campo-segnocinese')||'—') : null,
  mbti: presente('vd-mbti') ? (val('campo-mbti')||'—') : null,
  allineamento: presente('vd-mbti') ? (val('campo-allineamento')||'—') : null,
  mestiere: presente('vd-mestiere') ? (val('campo-mestiere')||'—') : null,
  classe: presente('vd-classe') ? (isBestia ? '—' : (val('campo-classe')||'—')) : null,
  status: presente('vd-status') ? (function(){
   var lista = document.getElementById('lista-status');
   if (!lista) return val('campo-status')||'Nessuno';
   var valori = [];
   for (var si=0; si<lista.children.length; si++) {
    var sel = document.getElementById('campo-status-'+si);
    if (sel && sel.value) valori.push(sel.value);
   }
   return valori.length > 0 ? valori.join(' | ') : 'Nessuno';
  })() : null,
  livello: presente('vd-livello') ? (val('campo-livello')||'1') : null,
  exp: presente('vd-livello') ? (val('campo-exp')||'0') : null,
  exptot: expTot,
  jenny: presente('vd-soldi') ? (val('campo-jenny')||'0') : null,
  hc: presente('vd-soldi') ? (val('campo-hc')||'0') : null,
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
  agg1: val('campo-agg1')||'Aggettivo 1',
  agg2: val('campo-agg2')||'Aggettivo 2',
  agg3: val('campo-agg3')||'Aggettivo 3',
  citazione: val('campo-citazione')||'...',
  aspetto: val('campo-aspetto')||'...',
  background: val('campo-background')||'...',
  hatsu: val('campo-hatsu')||'—',
  nen: val('campo-nen')||'0',
  tenacia: val('campo-tenacia')||'0',
  nenPotere: nenPotere,
  nenImg: nenImg,
  nenImgX: nenImgX, nenImgY: nenImgY, nenImgW: nenImgW, nenImgH: nenImgH,
  nenModo: nenModo,
  profili: profili,
  tecniche25:  raccogliTecnicheBox('25',  2),
  tecniche50:  raccogliTecnicheBox('50',  nenModo === 'speedduel' ? 1 : 2),
  tecniche100: raccogliTecnicheBox('100', 1),
  musica: val('campo-musica')||'',
  musicaPiattaforma: (function(){ var e=document.getElementById('campo-musica-piattaforma'); return e ? e.value : 'youtube'; })(),
  stat: stat, ovSt: [], apparizioni: apparizioni,
  campiExtra: campiExtra,
  baule: baule, competenze: competenze,
  slideExtraTipo: slideExtraTipo,
  slideExtraData: slideExtraData
 };
}

function raccogliListaTecnicaSlide(listaId) {
 var lista = document.getElementById(listaId);
 var out = [];
 if (!lista) return out;
 for (var i=0;i<lista.children.length;i++) {
  var nEl = document.getElementById(listaId+'-nome-'+i);
  var dEl = document.getElementById(listaId+'-desc-'+i);
  if (nEl && nEl.value.trim()) out.push({nome:nEl.value.trim(), desc:dEl?dEl.value.trim():''});
 }
 return out;
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
// GENERA SCHEDA
// ============================================================
function generaScheda() {
 var mantieni = stato.palette === 'mantieni';
 var classeContenitore = mantieni ? '' : (stato.palette || 'scheda-darknight');
 var classeOriginale = mantieni ? (stato.classeOriginale || '') : '';
 var styleOriginale  = mantieni ? (stato.styleOriginale  || '') : '';
 var d = raccogliDati(stato.modalita === 'nuova');

 var htmlScheda, htmlAnteprima;
 if (mantieni && stato.schedaOriginale) {
  htmlScheda   = aggiornaHTMLSchedaNpc(d);
  htmlAnteprima = htmlScheda.replace(/\\n/g, '<br>').replace(/\n(?=<span)/g, '<br>');
 } else {
  htmlScheda    = costruisciHTMLSchedaNpc(d, classeContenitore, classeOriginale, styleOriginale);
  htmlAnteprima = htmlScheda.replace(/\\n/g, '<br>').replace(/\n(?=<span)/g, '<br>');
 }

 document.getElementById('anteprima-scheda').innerHTML = htmlAnteprima;
 document.getElementById('codice-html').textContent = htmlScheda;
 document.getElementById('sezione-output').style.display = 'block';
 document.getElementById('sezione-output').scrollIntoView({ behavior:'smooth' });
}

// ============================================================
// COPIA HTML
// ============================================================
function copiaHTML() {
 var codice = document.getElementById('codice-html').textContent;
 if (!codice||codice.length<10) { alert('Prima genera la scheda!'); return; }
 var textarea = document.createElement('textarea');
 textarea.value = codice;
 textarea.style.position = 'fixed';
 textarea.style.opacity = '0';
 document.body.appendChild(textarea);
 textarea.select();
 try { document.execCommand('copy'); alert('Codice copiato!'); }
 catch(e) { alert('Copia manualmente il codice.'); }
 document.body.removeChild(textarea);
}

// ============================================================
// IMPORTA SCHEDA (modalità modifica)
// ============================================================
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

function importaScheda() {
 var htmlScheda = document.getElementById('campo-importa').value.trim();
 if (!htmlScheda) { alert('Incolla prima il codice HTML!'); return; }
 htmlScheda = bbcodeToHtml(htmlScheda);
 var temp = document.createElement('div');
 temp.innerHTML = htmlScheda;
 var metodo = 'getElements' + 'ByTagName';

 function setVal(id, val) { var e=document.getElementById(id); if(e&&val!==null&&val!==undefined&&val!=='') e.value=val; }
 function setSelect(id, val) {
  var e=document.getElementById(id); if(!e||!val) return; val=val.trim();
  for(var i=0;i<e.options.length;i++) { if(e.options[i].value===val||e.options[i].text===val){e.selectedIndex=i;return;} }
 }
 function setTextarea(id, val) { var e=document.getElementById(id); if(e&&val) e.value=val; }
 function setValHTML(id, val) { var e=document.getElementById(id); if(e&&val!==null&&val!==undefined&&val!=='') e.value=val; }
 function trovaEntryDopoLabel(spans, labelTesto) {
  for(var i=0;i<spans.length-1;i++) {
   if(spans[i].className==='scheda-label'&&spans[i].textContent.trim()===labelTesto) {
    if(spans[i+1].className==='scheda-entry') return spans[i+1].textContent.trim();
   }
  }
  return null;
 }

 var spans = temp[metodo]('span');
 var divs  = temp[metodo]('div');

 // Campi semplici
 var mappaLabel = { 'Nome:':'campo-nome','Cognome:':'campo-cognome','Genere:':'campo-genere','Mestiere:':'campo-mestiere' };
 for(var i=0;i<spans.length-1;i++) {
  var lbl=spans[i].textContent.trim();
  if(mappaLabel[lbl]&&spans[i+1].className==='scheda-entry') setValHTML(mappaLabel[lbl],spans[i+1]['inn'+'erHTML'].trim());
 }

 // Select standard
 var mappaSelect = {
  'Luogo di nascita:':'campo-luogo','Segno zodiacale:':'campo-segno',
  'Segno zodiacale cinese:':'campo-segnocinese','MBTI:':'campo-mbti','Allineamento:':'campo-allineamento'
 };
 for(var i=0;i<spans.length-1;i++) {
  var lbl=spans[i].textContent.trim();
  if(mappaSelect[lbl]&&spans[i+1].className==='scheda-entry') setSelect(mappaSelect[lbl],spans[i+1].textContent.trim());
 }

 // Razza, specie, fedina, taglia, classe
 for(var i=0;i<spans.length-1;i++) {
  if(spans[i].className!=='scheda-label') continue;
  var lbl2=spans[i].textContent.trim();
  var val2=spans[i+1].className==='scheda-entry'?spans[i+1].textContent.trim():null;
  if(!val2) continue;
  if(lbl2==='Razza:')                  setSelect('campo-razza',val2);
  if(lbl2==='Specie:') {
   // Se razza è Animale usa il campo testo libero, altrimenti il select bestia
   var razzaImport = document.getElementById('campo-razza');
   if (razzaImport && razzaImport.value === 'Animale') { var saEl=document.getElementById('campo-specie-animale'); if(saEl) saEl.value=val2; }
   else setSelect('campo-specie',val2);
  }
  if(lbl2==='Fedina Penale:')          setSelect('campo-fedina',val2);
  if(lbl2==='Classificazione Taglia:') setSelect('campo-classtaglia',val2);
  if(lbl2==='Valore Taglia:')          setVal('campo-valtaglia',val2.replace(/\./g,'').replace(/[^\d]/g,''));
  if(lbl2==='Classe:')                 setSelect('campo-classe',val2);
 }
 aggiornaRazza(false);

 // Data di nascita
 var dataRaw = trovaEntryDopoLabel(spans,'Data di nascita:');
 if(dataRaw&&dataRaw!=='—') {
  var mesiNomi=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
  var parti=dataRaw.split(' ');
  if(parti.length===3){setSelect('campo-datanascita-g',parti[0]);setSelect('campo-datanascita-m',parti[1]);setSelect('campo-datanascita-a',parti[2]);}
  else if(parti.length===2){var pm=mesiNomi.indexOf(parti[0])!==-1;if(pm){setSelect('campo-datanascita-m',parti[0]);setSelect('campo-datanascita-a',parti[1]);}else{setSelect('campo-datanascita-g',parti[0]);setSelect('campo-datanascita-m',parti[1]);}}
  else if(parti.length===1){if(mesiNomi.indexOf(parti[0])!==-1)setSelect('campo-datanascita-m',parti[0]);else setSelect('campo-datanascita-a',parti[0]);}
 }

 // Classe, Status, Livello da dati-pg
 for(var i=0;i<divs.length;i++) {
  if(divs[i].className==='dati-pg') {
   var dpSpansNpc=divs[i]['getElements'+'ByTagName']('span');
   for(var p=0;p<dpSpansNpc.length-1;p++){
    var chiaveNpc=dpSpansNpc[p].textContent.trim().replace(':','');
    var valoreNpc=dpSpansNpc[p+1].textContent.trim();
    if(chiaveNpc==='Classe')setSelect('campo-classe',valoreNpc);
    if(chiaveNpc==='Livello')setVal('campo-livello',valoreNpc);
    if(chiaveNpc==='Status'){
     var svNpc=valoreNpc.split('|').map(function(s){return s.trim();});
     setSelect('campo-status-0',svNpc[0]);
     for(var sv=1;sv<svNpc.length;sv++){aggiungiStatus();setSelect('campo-status-'+sv,svNpc[sv]);}
    }
   }
   break;
  }
 }

 // EXP
 for(var i=0;i<spans.length;i++){if(spans[i].className==='dati-pg2'){var t=spans[i].textContent.trim();if(t.indexOf('/')!==-1&&t.indexOf('For')!==-1){var ep=t.replace('For Level Up!','').trim().split('/');if(ep.length===2)setVal('campo-exp',ep[0].replace(/[^\d]/g,'').trim());}}}

 // Jenny e HC
 var soldiRaw=trovaEntryDopoLabel(spans,'Soldi:');
 if(soldiRaw){var sp2=soldiRaw.split('/');if(sp2.length>=2){setVal('campo-jenny',sp2[0].replace('Jenny','').replace(/\./g,'').replace(/[^\d]/g,'').trim());setVal('campo-hc',sp2[1].replace('HC','').replace(/[^\d]/g,'').trim());}}

 // Aggettivi
 var aggTrovati=[];
 for(var i=0;i<spans.length;i++){if(spans[i].className==='aggettivo')aggTrovati.push(spans[i]['inn'+'erHTML'].trim());}
 if(aggTrovati[0])setValHTML('campo-agg1',aggTrovati[0]);
 if(aggTrovati[1])setValHTML('campo-agg2',aggTrovati[1]);
 if(aggTrovati[2])setValHTML('campo-agg3',aggTrovati[2]);

 // Citazione
 for(var i=0;i<divs.length;i++){if(divs[i].className==='info-citazione'){var cs=divs[i][metodo]('span');if(cs.length>0)setValHTML('campo-citazione',cs[0]['inn'+'erHTML'].trim());else setValHTML('campo-citazione',divs[i]['inn'+'erHTML'].trim());break;}}

 // Descrizione e Background — cercati nei div contenitori per evitare conflitti
 var divAspetto=temp['querySelector']('.info-aspetto');
 var divStoria=temp['querySelector']('.info-storia');
 if(divAspetto){var aspSpans=divAspetto[metodo]('span');for(var i=0;i<aspSpans.length-1;i++){if(aspSpans[i].className==='scheda-label'&&aspSpans[i].textContent.trim()==='Descrizione:'&&aspSpans[i+1].className==='scheda-entry'){setTextarea('campo-aspetto',aspSpans[i+1]['inn'+'erHTML'].trim());break;}}}
 if(divStoria){var storSpans=divStoria[metodo]('span');for(var i=0;i<storSpans.length-1;i++){if(storSpans[i].className==='scheda-label'&&storSpans[i].textContent.trim()==='Background:'&&storSpans[i+1].className==='scheda-entry'){setTextarea('campo-background',storSpans[i+1]['inn'+'erHTML'].trim());break;}}}

 // Statistiche
 var mapStat={'Forza':'forza','Resistenza':'resistenza','Velocità':'velocita','Riflessi':'riflessi','Destrezza':'destrezza','Mira':'mira','Intelligenza':'intelligenza','Carisma':'carisma','Istinto':'istinto','Fortuna':'fortuna','Vita':'vita','Aura':'aura'};
 for(var i=0;i<divs.length;i++){var cn=divs[i].className;if(cn==='stat-card'||cn==='stat-card-vitale'){var le2=divs[i].querySelector?divs[i].querySelector('.stat-label'):null;var ve=divs[i].querySelector?divs[i].querySelector('.stat-value'):null;if(le2&&ve){var sid=mapStat[le2.textContent.trim()];if(sid){var inp=document.getElementById('stat-'+sid);if(inp)inp.value=ve.textContent.trim().replace(/\./g,'').replace(/,/g,'');}}}}

 // Hatsu
 for(var i=0;i<divs.length;i++){if(divs[i].className==='hatsu-card'){var ve2=divs[i].querySelector?divs[i].querySelector('.hatsu-card-value'):null;if(ve2)setSelect('campo-hatsu',ve2.textContent.trim());break;}}

 // Nen e Tenacia
 for(var i=0;i<divs.length;i++){if(divs[i].className==='barra-card'){var lb2=divs[i].querySelector?divs[i].querySelector('.barra-card-label'):null;var pe=divs[i].querySelector?divs[i].querySelector('.barra-card-pct'):null;if(lb2&&pe){var nome=lb2.textContent.trim();var valore=pe.textContent.replace('%','').trim();if(nome==='Nen')setVal('campo-nen',valore);if(nome==='Tenacia')setVal('campo-tenacia',valore);}}}

 // Potere Nen, Immagine, Profili, Tecniche
 for(var i=0;i<divs.length;i++){if(divs[i].className==='poteri-box'){
  var nenBoxes=divs[i][metodo]('div');
  var nenBoxList=[];
  for(var nb=0;nb<nenBoxes.length;nb++){if(nenBoxes[nb].className==='nen-box')nenBoxList.push(nenBoxes[nb]);}
  // Box 0: Potere Nen
  if(nenBoxList[0]){var b0s=nenBoxList[0][metodo]('span');for(var s0=0;s0<b0s.length-1;s0++){if(b0s[s0].className==='scheda-label'&&b0s[s0+1].className==='scheda-entry'){var lbl0=b0s[s0].textContent.trim();var val0=b0s[s0+1]['inn'+'erHTML'].trim();if(lbl0==='Nome potere:')setVal('nen-nomepotere',val0);if(lbl0==='Descrizione:')setTextarea('nen-descrizione',val0);if(lbl0==='Funzionamento e regole:')setTextarea('nen-funzionamento',val0);if(lbl0==='Condizioni e restrizioni:')setTextarea('nen-condizioni',val0);}}}
  // Immagine nen
  var nenImgEl=divs[i].querySelector?divs[i].querySelector('.nen-img'):null;
  if(nenImgEl){setVal('nen-img',nenImgEl.getAttribute('src')||'');importaCrop(nenImgEl,'img-nen');}
  // Helper card
  function leggiNenCards(box,prefisso,num){var cards=[];var ad=box[metodo]('div');for(var d2=0;d2<ad.length;d2++){if(ad[d2].className==='nen-card')cards.push(ad[d2]);}for(var ci3=0;ci3<Math.min(cards.length,num);ci3++){var tEl=cards[ci3].querySelector?cards[ci3].querySelector('.nen-card-title'):null;if(tEl){var tt=tEl.textContent.trim();var di=tt.indexOf('\u2014');setVal(prefisso+(ci3+1)+'-nome',di!==-1?tt.substring(di+2).trim():tt);}var cs=cards[ci3][metodo]('span');for(var s2=0;s2<cs.length-1;s2++){if(cs[s2].className==='scheda-label'&&cs[s2+1].className==='scheda-entry'){var lc=cs[s2].textContent.trim();var vc=cs[s2+1]['inn'+'erHTML'].trim();if(lc==='Descrizione:')setTextarea(prefisso+(ci3+1)+'-desc',vc);if(lc==='Bonus:')setTextarea(prefisso+(ci3+1)+'-bonus',vc);if(lc==='Condizioni e/o Restrizioni e/o Malus:')setTextarea(prefisso+(ci3+1)+'-malus',vc);if(lc==='Costo per Fase:')setTextarea(prefisso+(ci3+1)+'-costo',vc);}}}}
  // Rileva Speed Duel leggendo il titolo del box 1
  var isSpeedDuelNpc = true;
  if(nenBoxList[1]){var titB1=nenBoxList[1].querySelector?nenBoxList[1]['querySelector']('.nen-box-title'):null;if(titB1&&titB1.textContent.trim()==='Profili')isSpeedDuelNpc=false;}
  if(isSpeedDuelNpc){
   var rdSdNpc=document['querySelector']('input[name="nen-modalita"][value="speedduel"]');
   if(rdSdNpc){rdSdNpc.checked=true;aggiornaModoNen();}
   if(nenBoxList[1])leggiNenCards(nenBoxList[1],'tecnica-25-',2);
   if(nenBoxList[2])leggiNenCards(nenBoxList[2],'tecnica-50-',1);
   if(nenBoxList[3])leggiNenCards(nenBoxList[3],'tecnica-100-',1);
  } else {
   if(nenBoxList[1])leggiNenCards(nenBoxList[1],'profilo-',4);
   if(nenBoxList[2])leggiNenCards(nenBoxList[2],'tecnica-25-',2);
   if(nenBoxList[3])leggiNenCards(nenBoxList[3],'tecnica-50-',2);
   if(nenBoxList[4])leggiNenCards(nenBoxList[4],'tecnica-100-',1);
  }
  break;
 }}

 // Apparizioni (ex quest)
 for(var i=0;i<spans.length;i++){if(spans[i].className==='scheda-label'&&(spans[i].textContent.trim()==='Apparizioni:'||spans[i].textContent.trim()==='Quest:')){for(var j=i+1;j<spans.length;j++){if(spans[j].className!=='scheda-entry')break;var anchors=spans[j][metodo]('a');for(var a=0;a<anchors.length;a++){aggiungiApparizione();var qIdx=document.getElementById('lista-apparizioni').children.length-1;setVal('apparizione-nome-'+qIdx,anchors[a].textContent.trim());setVal('apparizione-link-'+qIdx,anchors[a].getAttribute('href')||'');}}break;}}

 // Baule
 var catMap=['armi','equip','oggetti','materiali'];var catTitoli=['Armi','Equipaggiamento','Oggetti Extra','Materiali'];
 for(var i=0;i<divs.length;i++){if(divs[i].className==='equip-box'){var titleEl=divs[i].querySelector?divs[i].querySelector('.equip-box-title'):null;if(!titleEl)continue;var titolo=titleEl.textContent.trim();var catIdx=catTitoli.indexOf(titolo);if(catIdx===-1)continue;var catId=catMap[catIdx];var items=divs[i][metodo]('li');for(var li=0;li<items.length;li++){var nameEl=items[li].querySelector?items[li].querySelector('.equip-item-name'):null;var infoEl=items[li].querySelector?items[li].querySelector('.equip-item-info'):null;if(!nameEl)continue;aggiungiItem(catId);var bIdx=document.getElementById('lista-'+catId).children.length-1;setVal(catId+'-nome-'+bIdx,nameEl.textContent.trim());if(infoEl){var infoTesto=infoEl.textContent;var qtMatch=infoTesto.match(/Qt:\s*(\S+)/);if(qtMatch)setVal(catId+'-qt-'+bIdx,qtMatch[1]);var lvMatch=infoTesto.match(/Lv\.\s*(\S+)/);if(lvMatch&&catId!=='oggetti'&&catId!=='materiali'){var lvVal=parseInt(lvMatch[1])||0;if(lvVal>5)lvVal=5;setVal(catId+'-lv-'+bIdx,lvVal);}var usiMatch=infoTesto.match(/Usi:\s*(\S+)/);if(usiMatch&&catId==='oggetti')setVal(catId+'-usi-'+bIdx,usiMatch[1]);var expAnchor=infoEl.querySelector?infoEl.querySelector('a'):null;if(expAnchor){setVal(catId+'-exp-nome-'+bIdx,expAnchor.textContent.trim());setVal(catId+'-exp-link-'+bIdx,expAnchor.getAttribute('href')||'');}}var descEl=items[li].querySelector?items[li].querySelector('.equip-item-desc'):null;if(descEl)setVal(catId+'-desc-'+bIdx,descEl.innerHTML.trim());}}}
 // Competenze
 var compCards = temp['querySelectorAll'] ? temp['querySelectorAll']('.competenza-card:not(.bloccata)') : [];
 for (var i = 0; i < compCards.length; i++) {
  var nomeEl = compCards[i]['querySelector'] ? compCards[i]['querySelector']('.competenza-nome') : null;
  var lvEl   = compCards[i]['querySelector'] ? compCards[i]['querySelector']('.competenza-livello') : null;
  var descEl = compCards[i]['querySelector'] ? compCards[i]['querySelector']('.competenza-desc') : null;
  var oggEl  = compCards[i]['querySelector'] ? compCards[i]['querySelector']('.competenza-oggetto') : null;
  if (!nomeEl) continue;
  setVal('comp-nome-' + i, nomeEl.textContent.trim());
  if (lvEl) setVal('comp-lv-' + i, lvEl.textContent.trim().replace('Lv.','').trim());
  if (descEl) setVal('comp-desc-' + i, descEl.textContent.trim());
  if (oggEl) {
   var oggTesto = oggEl.textContent.trim().replace('Oggetto:','').trim();
   if (oggTesto !== '—') setVal('comp-oggetto-' + i, oggTesto);
  }
 }
 
 // ── Helper: legge data-cx/cy/cw/ch dall'img importata e popola gli hidden input ──
 function importaCrop(imgEl, cropId) {
  if (!imgEl) return;
  var x = parseFloat(imgEl.getAttribute('data-cx'));
  var y = parseFloat(imgEl.getAttribute('data-cy'));
  var w = parseFloat(imgEl.getAttribute('data-cw'));
  var h = parseFloat(imgEl.getAttribute('data-ch'));
  if (!isNaN(x) && !isNaN(y) && !isNaN(w) && !isNaN(h)) cropScrivi(cropId, x, y, w, h);
 }

 // Immagini
 var divLat=temp['querySelector']('.scheda-img');if(divLat){var iL=divLat['querySelector']('img');if(iL){setVal('campo-img-laterale',iL.getAttribute('src')||'');importaCrop(iL,'img-laterale');}}
 var divDati=temp['querySelector']('.img-dati');if(divDati){var iD=divDati['querySelector']('img');if(iD){setVal('campo-img-dati',iD.getAttribute('src')||'');importaCrop(iD,'img-dati');}}

 // Musica
 var iframes=temp[metodo]('iframe');for(var i=0;i<iframes.length;i++){var src=iframes[i].getAttribute('src')||'';var matchYT=src.match(/embed\/([^?&]+)/);var matchSC=src.match(/api\.soundcloud\.com\/tracks\/([^"&?]+)/);if(matchYT){setVal('campo-musica',matchYT[1]);var pEl=document.getElementById('campo-musica-piattaforma');if(pEl){pEl.value='youtube';aggiornaMusicaHelp();}break;}if(matchSC){setVal('campo-musica',matchSC[1]);var pEl=document.getElementById('campo-musica-piattaforma');if(pEl){pEl.value='soundcloud';aggiornaMusicaHelp();}break;}}

 // ── Campi dati extra ────────────────────────────────────────
 // Cerca label personalizzati nella div-dati che non siano quelli standard
 var labelStandard = ['Nome:','Cognome:','Genere:','Razza:','Specie:','Rank di Pericolosità:',
  'Stato di Conservazione:','Luogo di nascita:','Data di nascita:','Segno zodiacale:',
  'Segno zodiacale cinese:','MBTI:','Allineamento:','Mestiere:','Classe:','Fedina Penale:',
  'Classificazione Taglia:','Valore Taglia:','Soldi:','Apparizioni:','Quest:'];
 var divDatiEl = temp['querySelector']('.div-dati');
 if (divDatiEl) {
  var spansExtra = divDatiEl[metodo]('span');
  for (var i=0;i<spansExtra.length-1;i++) {
   if (spansExtra[i].className==='scheda-label' && spansExtra[i+1].className==='scheda-entry') {
    var lbExtra = spansExtra[i].textContent.trim();
    if (labelStandard.indexOf(lbExtra) === -1) {
     aggiungiCampoExtra();
     var ceIdx = document.getElementById('lista-campi-extra').children.length - 1;
     setVal('extra-label-'+ceIdx, lbExtra);
     setVal('extra-val-'+ceIdx, spansExtra[i+1].textContent.trim());
    }
   }
  }
 }

 // ── Rimozione automatica voci assenti nella scheda importata ─
 // Se una label NON compare nel div-dati, la voce era stata rimossa: la rimuoviamo
 var voceALabelMap = {
  'vd-luogo':   ['Luogo di nascita:'],
  'vd-data':    ['Data di nascita:'],
  'vd-segni':   ['Segno zodiacale:','Segno zodiacale cinese:'],
  'vd-mbti':    ['MBTI:','Allineamento:'],
  'vd-mestiere':['Mestiere:'],
  'vd-fedina':  ['Fedina Penale:'],
  'vd-soldi':   ['Soldi:']
 };
 if (divDatiEl) {
  var tuttiLabel = [];
  var spansCheck = divDatiEl[metodo]('span');
  for (var i=0;i<spansCheck.length;i++) {
   if (spansCheck[i].className==='scheda-label') tuttiLabel.push(spansCheck[i].textContent.trim());
  }
  for (var wid in voceALabelMap) {
   var labelsVoce = voceALabelMap[wid];
   var trovata = false;
   for (var li=0;li<labelsVoce.length;li++) { if (tuttiLabel.indexOf(labelsVoce[li]) !== -1) { trovata = true; break; } }
   if (!trovata) rimuoviVoceDati(wid);
  }
 }

 // ── Slide extra ─────────────────────────────────────────────
 // Individua la slide extra cercando le classi specifiche
 var slideMoveset   = temp['querySelector']('.slide-moveset');
 var slideVal       = temp['querySelector']('.slide-valutazioni');
 var slideAltro     = temp['querySelector']('.slide-altro');
 var selSlide = document.getElementById('campo-slide-extra');

 if (slideMoveset) {
  if (selSlide) { selSlide.value = 'moveset'; aggiornaSlideExtra(); }
  // Attribuzione punti
  var spansM = slideMoveset[metodo]('span');
  for (var i=0;i<spansM.length-1;i++) {
   if (spansM[i].className==='scheda-label' && spansM[i+1].className==='scheda-entry') {
    var lm = spansM[i].textContent.trim();
    if (lm==='Colpo Valido:')    setVal('moveset-colpovalido',  spansM[i+1].textContent.trim());
    if (lm==='Colpo Critico:')   setVal('moveset-colpocritico', spansM[i+1].textContent.trim());
    if (lm==='Punti Garantiti:') setVal('moveset-garantiti',    spansM[i+1].textContent.trim());
   }
  }
  // Attacchi
  var boxNpc = slideMoveset[metodo]('div');
  for (var i=0;i<boxNpc.length;i++) {
   if (boxNpc[i].className==='box-npc') {
    var titleEl = boxNpc[i].querySelector ? boxNpc[i].querySelector('.box-npc-title') : null;
    if (!titleEl) continue;
    var titoloBox = titleEl.textContent.trim();
    var listaId = titoloBox==='Attacchi' ? 'lista-attacchi' : (titoloBox==='Difese' ? 'lista-difese' : null);
    if (!listaId) continue;
    var bodyEl = boxNpc[i].querySelector ? boxNpc[i].querySelector('.box-npc-body') : null;
    if (!bodyEl) continue;
    var entryDivs = bodyEl[metodo]('div');
    for (var j=0;j<entryDivs.length;j++) {
     if (entryDivs[j].className==='entry-block') {
      var lbEl = entryDivs[j].querySelector ? entryDivs[j].querySelector('.scheda-label') : null;
      var enEl = entryDivs[j].querySelector ? entryDivs[j].querySelector('.scheda-entry') : null;
      if (lbEl) {
       aggiungiTecnicaSlide(listaId);
       var tIdx = document.getElementById(listaId).children.length - 1;
       setVal(listaId+'-nome-'+tIdx, lbEl.textContent.replace(':','').trim());
       if (enEl) setTextarea(listaId+'-desc-'+tIdx, enEl['inn'+'erHTML'].trim());
      }
     }
    }
   }
  }
 } else if (slideVal) {
  if (selSlide) { selSlide.value = 'valutazioni'; aggiornaSlideExtra(); }
  // Titolo e verdetto
  var valTitoli = slideVal[metodo]('div');
  var titoliTrovati = [];
  for (var i=0;i<valTitoli.length;i++) {
   if (valTitoli[i].className==='val-titolo') titoliTrovati.push(valTitoli[i].textContent.trim());
  }
  if (titoliTrovati[0]) setVal('val-titolo', titoliTrovati[0]);
  if (titoliTrovati[1]) setVal('val-verdetto', titoliTrovati[1]);
  // Valutazioni
  var valCards = slideVal[metodo]('div');
  for (var i=0;i<valCards.length;i++) {
   if (valCards[i].className==='val-card') {
    var lblEl = valCards[i].querySelector ? valCards[i].querySelector('.val-card-label') : null;
    var stelleEl = valCards[i].querySelector ? valCards[i].querySelector('.stelle-fisse') : null;
    if (!lblEl) continue;
    aggiungiValutazione();
    var vIdx = document.getElementById('lista-valutazioni').children.length - 1;
    setVal('val-nome-'+vIdx, lblEl.textContent.trim());
    if (stelleEl) {
     var stelleOn = stelleEl[metodo]('span');
     var count = 0;
     for (var j=0;j<stelleOn.length;j++) { if (stelleOn[j].className==='stella-on') count++; }
     setStella('val-stelle-'+vIdx, count);
    }
   }
  }
 } else if (slideAltro) {
  if (selSlide) { selSlide.value = 'altro'; aggiornaSlideExtra(); }
  var bodyAltro = slideAltro.querySelector ? slideAltro.querySelector('.box-npc-body') : null;
  if (bodyAltro) {
   var spansAlt = bodyAltro[metodo]('span');
   for (var i=0;i<spansAlt.length-1;i++) {
    if (spansAlt[i].className==='scheda-label' && spansAlt[i+1].className==='scheda-entry') {
     aggiungiCampoAltro();
     var aIdx = document.getElementById('lista-altro').children.length - 1;
     setVal('altro-label-'+aIdx, spansAlt[i].textContent.trim());
     setVal('altro-val-'+aIdx, spansAlt[i+1].textContent.trim());
    }
   }
  }
 }

 var radice=temp.firstElementChild;
 stato.schedaOriginale=radice;
 if(radice){stato.classeOriginale=radice.getAttribute('class')||'';stato.styleOriginale=radice.getAttribute('style')||'';}
 document.getElementById('campo-importa').value='';
 alert('Dati importati! Controlla i campi e poi genera la scheda.');
}
