// ============================================================ 
// GENERATORE DIARIO — LOGICA 
// Hunter x Hunter Forum GDR Remastered 
// Scheda separata, a carico dell'utente. Slide 1-6 a nome libero, 
// card-voce compatte (nome linkato + data On-Game + note HTML). 
// Riusa le classi CSS delle schede (.scheda-pg-container, .bottone-nav, 
// .scheda-slide, .competenze-grid, .competenza-card, .scheda-label...). 
// ============================================================ 

var MAX_SLIDE = 6; 
var MIN_SLIDE = 1; 

// Stato globale del generatore 
var stato = { modalita: null, palette: null }; 
// Contatore incrementale per gli id delle voci (non riusa gli indici per 
// evitare collisioni dopo le rimozioni) 
var _voceSeq = 0; 
var _slideSeq = 0; 

// ============================================================ 
// NAVIGAZIONE SCHERMATE 
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
 var boxes = [btnNuova, btnModifica]; 
 for (var bi = 0; bi < boxes.length; bi++) { 
  if (boxes[bi]) { boxes[bi].style.borderColor = '#3B8686'; boxes[bi].style.background = '#0B486B'; } 
 } 
 var attivo = modalita === 'nuova' ? btnNuova : btnModifica; 
 if (attivo) { attivo.style.borderColor = '#CFF09E'; attivo.style.background = 'rgba(207,240,158,0.12)'; } 

 setTimeout(function() { 
  mostraSchermata('schermata-palette'); 
  costruisciGalleriaPalette(); 
 }, 300); 
} 

// ============================================================ 
// GALLERIA PALETTE 
// ============================================================ 
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
// STILI BASE (pannello del generatore, non della scheda finale) 
// ============================================================ 
var STILE_INPUT = 'width:100%; padding:10px 14px; background:#292354; border:1px solid #3B8686; border-radius:6px; color:#E2F7C4; font-family:\'Montserrat\'; font-size:1em; box-sizing:border-box; outline:none;'; 
var STILE_LABEL = 'display:block; color:#CFF09E; font-size:0.9em; margin-bottom:5px; font-family:\'Montserrat\';'; 

function riga2(a, b) { 
 return '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' + 
  '<td style="width:50%; padding-right:8px; vertical-align:top;">' + a + '</td>' + 
  '<td style="width:50%; padding-left:8px; vertical-align:top;">' + b + '</td>' + 
  '</tr></table>'; 
} 

function inputText(id, label, placeholder, valore) { 
 return '<div style="margin-bottom:14px;">' + 
  '<label style="' + STILE_LABEL + '">' + label + '</label>' + 
  '<input type="text" id="' + id + '" placeholder="' + (placeholder||'') + '" value="' + (valore||'') + '" style="' + STILE_INPUT + '">' + 
  '</div>'; 
} 

function inputTextarea(id, label, placeholder, righe) { 
 righe = righe || 3; 
 return '<div style="margin-bottom:14px;">' + 
  '<label style="' + STILE_LABEL + '">' + label + '</label>' + 
  '<textarea id="' + id + '" placeholder="' + (placeholder||'') + '" rows="' + righe + '" style="' + STILE_INPUT + ' resize:vertical;"></textarea>' + 
  '</div>'; 
} 

// Selettore data On-Game (facoltativo). Stessa logica giorno/mese/anno 
// delle schede: qualunque combinazione parziale è ammessa. 
function inputDataOG(id, label) { 
 var mesi = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno', 
  'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']; 
 var opG = '<option value="">—</option>', opM = '<option value="">—</option>', opA = '<option value="">—</option>'; 
 for (var g = 1; g <= 31; g++) opG += '<option value="' + (g < 10 ? '0'+g : g) + '">' + g + '</option>'; 
 for (var m = 0; m < 12; m++) opM += '<option value="' + mesi[m] + '">' + mesi[m] + '</option>'; 
 for (var a = 2017; a >= 1900; a--) opA += '<option value="' + a + '">' + a + '</option>'; 
 var sel = STILE_INPUT + ' background:#292354;'; 
 return '<div style="margin-bottom:14px;">' + 
  '<label style="' + STILE_LABEL + '">' + label + '</label>' + 
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' + 
  '<td style="width:25%; padding-right:6px; vertical-align:top;">' + 
  '<select id="' + id + '-g" style="' + sel + '">' + opG + '</select>' + 
  '<div style="color:#8FBEBA; font-size:0.75em; text-align:center; margin-top:3px;">Giorno</div></td>' + 
  '<td style="width:45%; padding-left:3px; padding-right:3px; vertical-align:top;">' + 
  '<select id="' + id + '-m" style="' + sel + '">' + opM + '</select>' + 
  '<div style="color:#8FBEBA; font-size:0.75em; text-align:center; margin-top:3px;">Mese</div></td>' + 
  '<td style="width:30%; padding-left:6px; vertical-align:top;">' + 
  '<select id="' + id + '-a" style="' + sel + '">' + opA + '</select>' + 
  '<div style="color:#8FBEBA; font-size:0.75em; text-align:center; margin-top:3px;">Anno</div></td>' + 
  '</tr></table></div>'; 
} 

function leggiDataOG(id) { 
 var g = document.getElementById(id + '-g'); 
 var m = document.getElementById(id + '-m'); 
 var a = document.getElementById(id + '-a'); 
 if (!g || !m || !a) return ''; 
 var vg = g.value, vm = m.value, va = a.value; 
 if (vg && vm && va)   return vg + ' ' + vm + ' ' + va; 
 if (vg && vm && !va)  return vg + ' ' + vm; 
 if (!vg && vm && va)  return vm + ' ' + va; 
 if (!vg && vm && !va) return vm; 
 if (!vg && !vm && va) return va; 
 return ''; // giorno da solo o vuoto → nessuna data 
} 

// Imposta i tre select data dai pezzi di una stringa "GG Mese AAAA" 
function impostaDataOG(id, str) { 
 var g = document.getElementById(id + '-g'); 
 var m = document.getElementById(id + '-m'); 
 var a = document.getElementById(id + '-a'); 
 if (!g || !m || !a || !str) return; 
 var parti = str.trim().split(/\s+/); 
 var mesi = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno', 
  'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']; 
 for (var i = 0; i < parti.length; i++) { 
  var p = parti[i]; 
  if (/^\d{1,2}$/.test(p)) { var n = parseInt(p,10); g.value = n < 10 ? '0'+n : ''+n; } 
  else if (/^\d{4}$/.test(p)) { a.value = p; } 
  else { for (var k = 0; k < mesi.length; k++) if (mesi[k].toLowerCase() === p.toLowerCase()) m.value = mesi[k]; } 
 } 
} 

function sezioneForm(titolo, contenuto) { 
 return '<div style="background:#0B486B; border:2px solid #292354; border-radius:12px; padding:22px; margin-bottom:20px;">' + 
  '<h3 style="color:#CFF09E; font-size:1.2em; margin:0 0 18px; border-bottom:1px solid #3B8686; padding-bottom:10px;">' + titolo + '</h3>' + 
  contenuto + '</div>'; 
} 

// ============================================================ 
// COSTRUZIONE FORM 
// ============================================================ 
function costruisciForm() { 
 var container = document.getElementById('form-container'); 
 var html = ''; 

 // Titolo del diario (nome del PG) 
 html += sezioneForm('<i class="fa-solid fa-book"></i> Intestazione', 
  inputText('campo-titolo','Titolo del Diario','Es. Diario di Gon Freecss')); 

 // Contenitore delle slide + bottone aggiungi 
 html += sezioneForm('<i class="fa-solid fa-layer-group"></i> Sezioni del Diario', 
  '<p style="color:#8FBEBA; font-size:0.9em; font-style:italic; margin-top:0;"><i class="fa-solid fa-info-circle"></i> Da 1 a 6 sezioni con nome libero (es. Quest, Role, Allenamenti, Appunti). Ognuna contiene le sue voci.</p>' + 
  '<div id="lista-slide"></div>' + 
  '<button id="btn-aggiungi-slide" onclick="aggiungiSlide()" style="background:transparent; color:#CFF09E; border:1px dashed #3B8686; padding:10px 22px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; margin-top:8px;"><i class="fa-solid fa-plus"></i> Aggiungi Sezione</button>'); 

 // Pulsante genera 
 html += '<div style="text-align:center; margin:10px 0 30px;">' + 
  '<button onclick="generaDiario()" style="background:linear-gradient(135deg,#A8DBA8,#79BD9A); color:#1a2e1a; border:none; padding:14px 40px; font-size:1.1em; font-weight:700; border-radius:8px; cursor:pointer; font-family:\'Montserrat\';"><i class="fa-solid fa-wand-magic-sparkles"></i> Genera Diario</button>' + 
  '</div>'; 

 container.innerHTML = html; 

 // Prima slide di default (solo in "nuova"; in "modifica" le crea l'import) 
 if (stato.modalita === 'nuova') { 
  aggiungiSlide(); 
 } else { 
  costruisciImportBox(); 
 } 
} 

// Box import per la modalità modifica 
function costruisciImportBox() { 
 var sez = document.getElementById('schermata-form'); 
 var box = document.createElement('div'); 
 box.style.cssText = 'background:#292354; border:2px solid #3B8686; border-radius:12px; padding:22px; margin:0 20px 20px;'; 
 box.innerHTML = 
  '<h3 style="color:#CFF09E; font-size:1.2em; margin:0 0 12px;"><i class="fa-solid fa-file-import"></i> Importa Diario da modificare</h3>' + 
  '<p style="color:#8FBEBA; font-size:0.9em; margin-top:0;">Incolla qui il codice HTML del tuo diario attuale e premi Importa: verranno ricreate tutte le sezioni e le voci, pronte da modificare.</p>' + 
  '<textarea id="campo-import" rows="6" placeholder="Incolla qui il codice del diario..." style="' + STILE_INPUT + ' resize:vertical;"></textarea>' + 
  '<button onclick="importaDiario()" style="margin-top:12px; background:#0B486B; color:#CFF09E; border:1px solid #3B8686; padding:10px 24px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\';"><i class="fa-solid fa-download"></i> Importa</button>'; 
 var formContainer = document.getElementById('form-container'); 
 sez.insertBefore(box, formContainer); 
} 

// ── Slide (sezioni) ─────────────────────────────────────────── 
function aggiungiSlide(nome) { 
 var lista = document.getElementById('lista-slide'); 
 if (!lista) return null; 
 if (lista.children.length >= MAX_SLIDE) { aggiornaBottoneSlide(); return null; } 
 var sid = _slideSeq++; 
 var div = document.createElement('div'); 
 div.id = 'slide-block-' + sid; 
 div.setAttribute('data-slide', sid); 
 div.style.cssText = 'background:#292354; border:1px solid #3B8686; border-radius:10px; padding:16px; margin-bottom:14px;'; 
 div.innerHTML = 
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed; margin-bottom:8px;"><tr>' + 
  '<td style="width:76%; padding-right:8px; vertical-align:bottom;">' + 
  inputText('slide-nome-'+sid,'Nome sezione','Es. Quest', nome) + '</td>' + 
  '<td style="width:12%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' + 
  '<button onclick="spostaSlide(\'slide-block-'+sid+'\',-1)" title="Sposta su" style="background:#0B486B; color:#8FBEBA; border:1px solid #3B8686; padding:6px 9px; border-radius:6px 6px 0 0; cursor:pointer; display:block; width:100%;"><i class="fa-solid fa-chevron-up"></i></button>' + 
  '<button onclick="spostaSlide(\'slide-block-'+sid+'\',1)" title="Sposta giù" style="background:#0B486B; color:#8FBEBA; border:1px solid #3B8686; border-top:none; padding:6px 9px; border-radius:0 0 6px 6px; cursor:pointer; display:block; width:100%;"><i class="fa-solid fa-chevron-down"></i></button>' + 
  '</td>' + 
  '<td style="width:12%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' + 
  '<button onclick="rimuoviSlide(\'slide-block-'+sid+'\')" title="Elimina sezione" style="background:rgba(80,0,0,0.4); color:#F9C6C6; border:1px solid #6b0b0b; padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>' + 
  '</td></tr></table>' + 
  '<div id="lista-voci-'+sid+'"></div>' + 
  '<button onclick="aggiungiVoce('+sid+')" style="background:transparent; color:#8FBEBA; border:1px dashed #3B8686; padding:7px 18px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; margin-top:4px; font-size:0.9em;"><i class="fa-solid fa-plus"></i> Aggiungi voce</button>'; 
 lista.appendChild(div); 
 aggiornaBottoneSlide(); 
 return sid; 
} 

// Sposta una sezione su (dir=-1) o giù (dir=+1) nell'elenco 
function spostaSlide(blockId, dir) { 
 var el = document.getElementById(blockId); 
 if (!el) return; 
 var lista = el.parentNode; 
 if (dir < 0) { 
  var prev = el.previousElementSibling; 
  if (prev) lista.insertBefore(el, prev); 
 } else { 
  var next = el.nextElementSibling; 
  if (next) lista.insertBefore(next, el); 
 } 
} 

function rimuoviSlide(blockId) { 
 var lista = document.getElementById('lista-slide'); 
 if (lista && lista.children.length <= MIN_SLIDE) { 
  alert('Il diario deve avere almeno una sezione.'); 
  return; 
 } 
 var el = document.getElementById(blockId); 
 if (el) el.parentNode.removeChild(el); 
 aggiornaBottoneSlide(); 
} 

// Abilita/disabilita il bottone "Aggiungi Sezione" al raggiungimento del max 
function aggiornaBottoneSlide() { 
 var lista = document.getElementById('lista-slide'); 
 var btn = document.getElementById('btn-aggiungi-slide'); 
 if (!lista || !btn) return; 
 if (lista.children.length >= MAX_SLIDE) { 
  btn.style.opacity = '0.4'; 
  btn.style.cursor = 'not-allowed'; 
  btn.setAttribute('disabled','disabled'); 
 } else { 
  btn.style.opacity = '1'; 
  btn.style.cursor = 'pointer'; 
  btn.removeAttribute('disabled'); 
 } 
} 

// ── Voci (card) ─────────────────────────────────────────────── 
function aggiungiVoce(sid, dati) { 
 var lista = document.getElementById('lista-voci-' + sid); 
 if (!lista) return; 
 var vid = _voceSeq++; 
 var div = document.createElement('div'); 
 div.id = 'voce-row-' + vid; 
 div.style.cssText = 'background:#0B486B; border:1px solid #3B8686; border-radius:8px; padding:12px; margin-bottom:10px;'; 
 div.innerHTML = 
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed; margin-bottom:6px;"><tr>' + 
  '<td style="width:44%; padding-right:6px; vertical-align:bottom;">' + inputText('voce-nome-'+vid,'Nome role','Es. Un incontro inatteso') + '</td>' + 
  '<td style="width:32%; padding-left:6px; padding-right:6px; vertical-align:bottom;">' + inputText('voce-url-'+vid,'URL della role','https://...') + '</td>' + 
  '<td style="width:12%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' + 
  '<button onclick="spostaVoce(\'voce-row-'+vid+'\',-1)" title="Sposta su" style="background:#292354; color:#8FBEBA; border:1px solid #3B8686; padding:5px 8px; border-radius:6px 6px 0 0; cursor:pointer; display:block; width:100%;"><i class="fa-solid fa-chevron-up"></i></button>' + 
  '<button onclick="spostaVoce(\'voce-row-'+vid+'\',1)" title="Sposta giù" style="background:#292354; color:#8FBEBA; border:1px solid #3B8686; border-top:none; padding:5px 8px; border-radius:0 0 6px 6px; cursor:pointer; display:block; width:100%;"><i class="fa-solid fa-chevron-down"></i></button>' + 
  '</td>' + 
  '<td style="width:12%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' + 
  '<button onclick="rimuoviElemento(\'voce-row-'+vid+'\')" title="Elimina voce" style="background:rgba(80,0,0,0.4); color:#F9C6C6; border:1px solid #6b0b0b; padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' + 
  '</td></tr></table>' + 
  inputDataOG('voce-data-'+vid,'Data On-Game (facoltativa)') + 
  inputTextarea('voce-note-'+vid,'Note (facoltative — è ammesso codice HTML)','Note, esito, ricompense, resoconto... anche con tag HTML.', 3); 
 lista.appendChild(div); 

 // Precompila (usato dall'import) 
 if (dati) { 
  setVal('voce-nome-'+vid, dati.nome || ''); 
  setVal('voce-url-'+vid, dati.url || ''); 
  if (dati.data) impostaDataOG('voce-data-'+vid, dati.data); 
  setTextarea('voce-note-'+vid, dati.note || ''); 
 } 
 return vid; 
} 

// Sposta una voce su (dir=-1) o giù (dir=+1) dentro la sua sezione 
function spostaVoce(rowId, dir) { 
 var el = document.getElementById(rowId); 
 if (!el) return; 
 var lista = el.parentNode; 
 if (dir < 0) { 
  var prev = el.previousElementSibling; 
  if (prev) lista.insertBefore(el, prev); 
 } else { 
  var next = el.nextElementSibling; 
  if (next) lista.insertBefore(next, el); 
 } 
} 

function rimuoviElemento(id) { 
 var el = document.getElementById(id); 
 if (el) el.parentNode.removeChild(el); 
} 

// ── Helper valori ───────────────────────────────────────────── 
function val(id) { var e = document.getElementById(id); return e ? e.value.trim() : ''; } 
function setVal(id, v) { var e = document.getElementById(id); if (e) e.value = v; } 
function setTextarea(id, v) { var e = document.getElementById(id); if (e) e.value = v; } 

// ============================================================ 
// RACCOLTA DATI DAL FORM 
// ============================================================ 
function raccogliDati() { 
 var titolo = val('campo-titolo') || 'Diario'; 
 var slides = []; 
 var lista = document.getElementById('lista-slide'); 
 if (lista) { 
  for (var i = 0; i < lista.children.length; i++) { 
   var block = lista.children[i]; 
   var sid = block.getAttribute('data-slide'); 
   var nome = val('slide-nome-' + sid) || ('Sezione ' + (i+1)); 
   var voci = []; 
   var listaVoci = document.getElementById('lista-voci-' + sid); 
   if (listaVoci) { 
    for (var j = 0; j < listaVoci.children.length; j++) { 
     var vrow = listaVoci.children[j]; 
     var vid = vrow.id.replace('voce-row-', ''); 
     var vnome = val('voce-nome-' + vid); 
     var vurl = val('voce-url-' + vid); 
     var vdata = leggiDataOG('voce-data-' + vid); 
     var vnoteEl = document.getElementById('voce-note-' + vid); 
     var vnote = vnoteEl ? vnoteEl.value.trim() : ''; 
     // Salta le voci completamente vuote 
     if (!vnome && !vurl && !vdata && !vnote) continue; 
     voci.push({ nome: vnome, url: vurl, data: vdata, note: vnote }); 
    } 
   } 
   slides.push({ nome: nome, voci: voci }); 
  } 
 } 
 return { 
  titolo: titolo, 
  palette: (stato.palette && stato.palette !== 'mantieni') ? stato.palette : (stato.paletteImportata || 'scheda-darknight'), 
  slides: slides 
 }; 
} 

// ============================================================ 
// GENERAZIONE 
// ============================================================ 
function generaDiario() { 
 var d = raccogliDati(); 
 if (d.slides.length === 0) { alert('Aggiungi almeno una sezione.'); return; } 
 var html = costruisciDiarioHTML(d); 

 var sezOutput = document.getElementById('sezione-output'); 
 var anteprima = document.getElementById('anteprima-diario'); 
 var codice = document.getElementById('codice-html'); 
 if (anteprima) anteprima['inn'+'erHTML'] = html; 
 if (codice) codice.textContent = html; 
 if (sezOutput) sezOutput.style.display = 'block'; 
 if (sezOutput) sezOutput.scrollIntoView({ behavior: 'smooth' }); 
} 

function copiaHTML() { 
 var pre = document.getElementById('codice-html'); 
 if (!pre) return; 
 var testo = pre.textContent; 
 var ta = document.createElement('textarea'); 
 ta.value = testo; 
 document.body.appendChild(ta); 
 ta.select(); 
 try { document.execCommand('copy'); alert('Codice copiato!'); } 
 catch (e) { alert('Copia non riuscita, selezionalo manualmente.'); } 
 document.body.removeChild(ta); 
} 

// ============================================================ 
// IMPORT (modalità modifica) 
// ============================================================ 
// ForumFree converte i tag <a> postati in BBCode [URL=...]testo[/URL]. 
// Al ri-import li riconvertiamo in <a> così il parser DOM li legge. 
// (I diari nuovi hanno <a style=""> e non vengono toccati da FF, restando <a>.) 
function normalizzaBBCode(str) { 
 if (!str) return str; 
 // [URL=indirizzo]testo[/URL]  → <a style="" href="indirizzo">testo</a> 
 str = str.replace(/\[url=([^\]]+)\]([\s\S]*?)\[\/url\]/gi, function(_m, href, testo) { 
  return '<a style="" href="' + href.replace(/^["']|["']$/g, '') + '">' + testo + '</a>'; 
 }); 
 // [URL]indirizzo[/URL]  → <a style="" href="indirizzo">indirizzo</a> 
 str = str.replace(/\[url\]([\s\S]*?)\[\/url\]/gi, function(_m, href) { 
  var h = href.replace(/^["']|["']$/g, ''); 
  return '<a style="" href="' + h + '">' + h + '</a>'; 
 }); 
 return str; 
} 

function importaDiario() { 
 var ta = document.getElementById('campo-import'); 
 if (!ta || !ta.value.trim()) { alert('Incolla prima il codice del diario.'); return; } 
 var sorgente = normalizzaBBCode(ta.value); 
 var temp = document.createElement('div'); 
 temp['inn'+'erHTML'] = sorgente; 

 var dati = leggiDiarioDaDOM(temp); 
 if (!dati) { alert('Codice non riconosciuto. Assicurati di incollare un diario generato da questo strumento.'); return; } 

 // Titolo 
 setVal('campo-titolo', dati.titolo || ''); 
 // Palette importata (per la modalità "mantieni") 
 stato.paletteImportata = dati.palette || 'scheda-darknight'; 

 // Svuota le slide esistenti e ricostruisce 
 var lista = document.getElementById('lista-slide'); 
 if (lista) lista['inn'+'erHTML'] = ''; 
 for (var i = 0; i < dati.slides.length; i++) { 
  var sid = aggiungiSlide(dati.slides[i].nome); 
  var voci = dati.slides[i].voci; 
  for (var j = 0; j < voci.length; j++) aggiungiVoce(sid, voci[j]); 
 } 
 aggiornaBottoneSlide(); 
 alert('Diario importato: ' + dati.slides.length + ' sezioni caricate.'); 
} 

// Legge la struttura del diario dal DOM importato 
function leggiDiarioDaDOM(root) { 
 var metodo = 'querySelectorAll'; 
 var container = root[metodo]('.diario-container'); 
 if (!container || container.length === 0) return null; 
 var cont = container[0]; 

 // Palette: prima classe scheda-* sul container, escluse quelle strutturali 
 var palette = 'scheda-darknight'; 
 var strutturali = { 'scheda-pg-container':1, 'scheda-nomecognome':1, 'scheda-bottoni':1, 'scheda-slide':1, 'scheda-entry':1, 'scheda-label':1, 'scheda-img':1, 'scheda-immagine':1 }; 
 var cls = (cont.className || '').split(/\s+/); 
 for (var c = 0; c < cls.length; c++) { 
  if (cls[c].indexOf('scheda-') === 0 && !strutturali[cls[c]]) { palette = cls[c]; break; } 
 } 

 // Titolo 
 var titEl = cont[metodo]('.nomecognome'); 
 var titolo = titEl.length > 0 ? titEl[0]['inn'+'erHTML'].trim() : ''; 

 // Slide: bottoni-nav danno i nomi, .slide-pg danno le voci 
 var nomiSlide = []; 
 var navBtns = cont[metodo]('.scheda-bottoni .bottone-nav'); 
 for (var n = 0; n < navBtns.length; n++) nomiSlide.push(navBtns[n].textContent.trim()); 

 var slides = []; 
 var slidePg = cont[metodo]('.scheda-slide > .slide-pg'); 
 // Fallback: se il selettore figlio-diretto non prende nulla, prova generico 
 if (slidePg.length === 0) slidePg = cont[metodo]('.slide-pg'); 
 for (var s = 0; s < slidePg.length; s++) { 
  var voci = []; 
  var cards = slidePg[s][metodo]('.competenza-card'); 
  for (var k = 0; k < cards.length; k++) { 
   var card = cards[k]; 
   // Salta la card-placeholder delle sezioni vuote 
   if ((' ' + card.className + ' ').indexOf(' bloccata ') !== -1) continue; 
   var aEl = card[metodo]('.competenza-nome a'); 
   var nomeEl = card[metodo]('.competenza-nome'); 
   var nome = '', url = ''; 
   if (aEl.length > 0) { nome = aEl[0].textContent.trim(); url = aEl[0].getAttribute('href') || ''; } 
   else if (nomeEl.length > 0) { nome = nomeEl[0].textContent.trim(); } 
   var dataEl = card[metodo]('.diario-voce-data'); 
   var data = dataEl.length > 0 ? dataEl[0].textContent.trim() : ''; 
   var noteEl = card[metodo]('.competenza-desc'); 
   var note = noteEl.length > 0 ? noteEl[0]['inn'+'erHTML'].trim() : ''; 
   voci.push({ nome: nome, url: url, data: data, note: note }); 
  } 
  slides.push({ nome: nomiSlide[s] || ('Sezione ' + (s+1)), voci: voci }); 
 } 

 if (slides.length === 0) return null; 
 return { titolo: titolo, palette: palette, slides: slides }; 
}
