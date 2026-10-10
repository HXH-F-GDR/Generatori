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
