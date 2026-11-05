// ============================================================ 
// GENERATORE DIARIO — TEMPLATE (HTML finale da incollare sul forum) 
// Hunter x Hunter Forum GDR Remastered 
// Riusa le classi delle schede: .scheda-pg-container (+ palette), 
// .container-nomecognome/.nomecognome, .scheda-bottoni/.bottone-nav, 
// .scheda-slide/.slide-pg, .competenze-grid, .competenza-card, 
// .competenza-nome/.competenza-desc, .scheda-entry. 
// La navigazione tra sezioni usa mostraSlide(this, N), la stessa 
// funzione globale già presente sulla board per le schede PG. 
// ============================================================ 

function costruisciDiarioHTML(d) { 
 var html = ''; 

 // Contenitore-scheda con la palette scelta 
 html += '<div class="scheda-pg-container ' + d.palette + ' diario-container" style="margin:0 auto; height:600px">'; 

 // Intestazione (titolo del diario) 
 html += '<div class="scheda-nomecognome"><p align="center"><span class="container-nomecognome" style="margin-top:2px;">' + 
  '<span class="nomecognome">' + d.titolo + '</span></span></p></div>'; 

 // Barra di navigazione: un bottone per sezione 
 html += '<div class="scheda-bottoni">'; 
 for (var i = 0; i < d.slides.length; i++) { 
  html += '<div class="bottone-nav" onclick="mostraSlide(this,' + i + ')"><b>' + escHtml(d.slides[i].nome) + '</b></div>'; 
 } 
 html += '</div>'; 

 // Slide: una .slide-pg per sezione, con la griglia di card 
 html += '<div class="scheda-slide">'; 
 for (var s = 0; s < d.slides.length; s++) { 
  html += '<div class="slide-pg"><div class="competenze-grid" style="height:430px; max-height:430px; margin:20px 10px 5px 5px !important; width:calc(100% - 15px) !important;">'; 
  var voci = d.slides[s].voci; 
  if (voci.length === 0) { 
   html += '<div class="competenza-card bloccata"><div class="competenza-bloccata-label"><i class="fa-solid fa-feather"></i> Nessuna voce in questa sezione</div></div>'; 
  } else { 
   for (var v = 0; v < voci.length; v++) { 
    html += costruisciCardVoce(voci[v]); 
   } 
  } 
  html += '</div></div>'; 
 } 
 html += '</div>'; // .scheda-slide 

 html += '</div>'; // .scheda-pg-container 
 return html; 
} 

// Una card compatta per voce. 
// Header: nome (linkato se c'è URL). 
// Sottotitolo: data On-Game (omesso se assente). 
// Corpo: note (HTML raw ammesso). 
function costruisciCardVoce(voce) { 
 var nomeVis = voce.nome || 'Voce'; 
 var titoloHtml; 
 if (voce.url) { 
  titoloHtml = '<a style="" href="' + escAttr(voce.url) + '">' + escHtml(nomeVis) + '</a>'; 
 } else { 
  titoloHtml = escHtml(nomeVis); 
 } 

 var html = '<div class="competenza-card">'; 
 html += '<div class="competenza-header"><span class="competenza-nome">' + titoloHtml + '</span></div>'; 
 if (voce.data) { 
  html += '<div class="diario-voce-data" style="font-size:11px; font-variant:small-caps; color:var(--titolo2); opacity:0.85; margin:1px 0 4px;"><i class="fa-solid fa-calendar-day"></i> ' + escHtml(voce.data) + '</div>'; 
 } 
 if (voce.note) { 
  // Note: inserite raw (l'utente può usare HTML). Racchiuse in .competenza-desc. 
  html += '<div class="competenza-desc">' + voce.note + '</div>'; 
 } 
 html += '</div>'; 
 return html; 
} 

// ============================================================
// MODIFICA "MANTIENI LE PERSONALIZZAZIONI"
// Non ricostruisce il diario da zero: riparte dal codice importato e
// aggiorna solo i contenuti (titolo, nomi sezione, voci). Tutto il resto
// (classi, stili inline, altezze, elementi aggiunti a mano, card ritoccate)
// resta com'era. Le voci importate ricordano la card d'origine (orig "s-k"):
// anche se spostate, la loro card personalizzata le segue.
// ============================================================
var _IH = 'inn' + 'erHTML';
var _QSA = 'querySelectorAll';

function _haClasse(el, c) {
 return !!(el && el.className && (' ' + el.className + ' ').indexOf(' ' + c + ' ') !== -1);
}

// Slide dirette di .scheda-slide (stesso criterio dell'import)
function _slideDelContainer(cont) {
 var lista = cont[_QSA]('.scheda-slide > .slide-pg');
 if (lista.length === 0) lista = cont[_QSA]('.slide-pg');
 return lista;
}

function costruisciDiarioMantieni(d, htmlOriginale) {
 var root = document.createElement('div');
 root[_IH] = htmlOriginale;
 var cont = root[_QSA]('.diario-container')[0];
 if (!cont) return null;

 // Mappa delle card originali (prima di toccare qualunque cosa)
 var slideOrig = _slideDelContainer(cont);
 var cardOrig = {};
 for (var s = 0; s < slideOrig.length; s++) {
  var cs = slideOrig[s][_QSA]('.competenza-card');
  for (var k = 0; k < cs.length; k++) cardOrig[s + '-' + k] = cs[k];
 }
 var btnOrig = cont[_QSA]('.scheda-bottoni .bottone-nav');

 // Titolo: cambia solo il testo dentro .nomecognome
 var tit = cont[_QSA]('.nomecognome')[0];
 if (tit) {
  if (tit[_IH].trim() !== d.titolo) tit[_IH] = d.titolo;
 }

 // Bottoni di navigazione
 var barra = cont[_QSA]('.scheda-bottoni')[0];
 if (barra) {
  var ancoraBtn = btnOrig.length > 0 ? btnOrig[0] : null;
  var parBtn = ancoraBtn ? ancoraBtn.parentNode : barra;
  for (var i = 0; i < d.slides.length; i++) {
   var sl = d.slides[i];
   var modello = (sl.orig != null && btnOrig[sl.orig]) ? btnOrig[sl.orig] : btnOrig[btnOrig.length - 1];
   var btn;
   if (modello) {
    btn = modello.cloneNode(true);
   } else {
    btn = document.createElement('div');
    btn.className = 'bottone-nav';
    btn[_IH] = '<b></b>';
   }
   btn.setAttribute('onclick', 'mostraSlide(this,' + i + ')');
   var b = btn[_QSA]('b')[0];
   var bersaglio = b || btn;
   if (bersaglio.textContent.trim() !== sl.nome) bersaglio.textContent = sl.nome;
   if (ancoraBtn) parBtn.insertBefore(btn, ancoraBtn); else parBtn.appendChild(btn);
  }
  for (var r = 0; r < btnOrig.length; r++) btnOrig[r].parentNode.removeChild(btnOrig[r]);
 }

 // Slide
 var contSlide = cont[_QSA]('.scheda-slide')[0] || (slideOrig.length ? slideOrig[0].parentNode : null);
 if (contSlide) {
  var ancoraSl = slideOrig.length > 0 ? slideOrig[0] : null;
  var parSl = ancoraSl ? ancoraSl.parentNode : contSlide;
  for (var j = 0; j < d.slides.length; j++) {
   var dati = d.slides[j];
   var esistente = (dati.orig != null && slideOrig[dati.orig]) ? slideOrig[dati.orig] : null;
   var modelloSl = esistente || slideOrig[slideOrig.length - 1];
   var nuova;
   if (modelloSl) {
    nuova = modelloSl.cloneNode(true);
   } else {
    nuova = document.createElement('div');
    nuova.className = 'slide-pg';
    nuova[_IH] = '<div class="competenze-grid" style="height:430px; max-height:430px; margin:20px 10px 5px 5px !important; width:calc(100% - 15px) !important;"></div>';
   }
   var griglia = nuova[_QSA]('.competenze-grid')[0] || nuova;
   // Sezione nuova clonata da un'altra: griglia svuotata del tutto,
   // così non si porta dietro elementi aggiunti a mano in quella sezione
   if (!esistente) {
    while (griglia.firstChild) griglia.removeChild(griglia.firstChild);
   }
   _riempiGriglia(griglia, dati.voci, cardOrig);
   if (ancoraSl) parSl.insertBefore(nuova, ancoraSl); else parSl.appendChild(nuova);
  }
  for (var q = 0; q < slideOrig.length; q++) slideOrig[q].parentNode.removeChild(slideOrig[q]);
 }

 return root[_IH];
}

// Sostituisce le card di una griglia mantenendo la posizione delle
// card originali rispetto ad altri elementi personalizzati
function _riempiGriglia(griglia, voci, cardOrig) {
 var vecchie = griglia[_QSA]('.competenza-card');
 var ancora = vecchie.length > 0 ? vecchie[0] : null;
 var par = ancora ? ancora.parentNode : griglia;
 var nuove = [];
 if (voci.length === 0) {
  nuove.push(_daHtml('<div class="competenza-card bloccata"><div class="competenza-bloccata-label"><i class="fa-solid fa-feather"></i> Nessuna voce in questa sezione</div></div>'));
 } else {
  for (var v = 0; v < voci.length; v++) {
   var voce = voci[v];
   var orig = (voce.orig && cardOrig[voce.orig]) ? cardOrig[voce.orig] : null;
   if (orig) {
    var card = orig.cloneNode(true);
    aggiornaCardVoce(card, voce);
    nuove.push(card);
   } else {
    nuove.push(_daHtml(costruisciCardVoce(voce)));
   }
  }
 }
 for (var n = 0; n < nuove.length; n++) {
  if (ancora) par.insertBefore(nuove[n], ancora); else par.appendChild(nuove[n]);
 }
 for (var x = 0; x < vecchie.length; x++) {
  if (vecchie[x].parentNode) vecchie[x].parentNode.removeChild(vecchie[x]);
 }
}

function _daHtml(html) {
 var t = document.createElement('div');
 t[_IH] = html;
 return t.firstChild;
}

// Aggiorna una card clonata toccando solo ciò che è cambiato
function aggiornaCardVoce(card, voce) {
 var nomeVis = voce.nome || 'Voce';

 // Nome e link
 var nomeEl = card[_QSA]('.competenza-nome')[0];
 if (nomeEl) {
  var a = nomeEl[_QSA]('a')[0];
  if (voce.url) {
   if (a) {
    if (a.getAttribute('href') !== voce.url) a.setAttribute('href', voce.url);
    if (a.textContent.trim() !== nomeVis) a.textContent = nomeVis;
   } else {
    nomeEl[_IH] = '<a style="" href="' + escAttr(voce.url) + '">' + escHtml(nomeVis) + '</a>';
   }
  } else if (a || nomeEl.textContent.trim() !== nomeVis) {
   nomeEl.textContent = nomeVis;
  }
 }

 // Data On-Game
 var dataEl = card[_QSA]('.diario-voce-data')[0];
 if (voce.data) {
  if (dataEl) {
   if (dataEl.textContent.trim() !== voce.data) {
    // Toglie solo il testo, lascia l'icona (anche se cambiata a mano)
    var figli = dataEl.childNodes;
    for (var f = figli.length - 1; f >= 0; f--) {
     if (figli[f].nodeType === 3) dataEl.removeChild(figli[f]);
    }
    dataEl.appendChild(document.createTextNode(' ' + voce.data));
   }
  } else {
   var nuovaData = _daHtml('<div class="diario-voce-data" style="font-size:11px; font-variant:small-caps; color:var(--titolo2); opacity:0.85; margin:1px 0 4px;"><i class="fa-solid fa-calendar-day"></i> ' + escHtml(voce.data) + '</div>');
   var header = card[_QSA]('.competenza-header')[0];
   if (header && header.parentNode) header.parentNode.insertBefore(nuovaData, header.nextSibling);
   else card.insertBefore(nuovaData, card.firstChild);
  }
 } else if (dataEl) {
  dataEl.parentNode.removeChild(dataEl);
 }

 // Note
 var noteEl = card[_QSA]('.competenza-desc')[0];
 if (voce.note) {
  if (noteEl) {
   if (noteEl[_IH].trim() !== voce.note) noteEl[_IH] = voce.note;
  } else {
   var nuovaNota = document.createElement('div');
   nuovaNota.className = 'competenza-desc';
   nuovaNota[_IH] = voce.note;
   card.appendChild(nuovaNota);
  }
 } else if (noteEl) {
  noteEl.parentNode.removeChild(noteEl);
 }
}

// ── Escape helper ─────────────────────────────────────────────
// escHtml: per testo semplice (nome, data, nome sezione) — niente HTML iniettato lì. 
function escHtml(str) { 
 if (str == null) return ''; 
 return String(str) 
  .replace(/&/g, '&amp;') 
  .replace(/</g, '&lt;') 
  .replace(/>/g, '&gt;'); 
} 
// escAttr: per l'attributo href. 
function escAttr(str) { 
 if (str == null) return ''; 
 return String(str) 
  .replace(/&/g, '&amp;') 
  .replace(/"/g, '&quot;'); 
}
