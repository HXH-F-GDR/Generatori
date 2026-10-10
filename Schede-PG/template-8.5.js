// ── Helper: calcola object-position da valori crop x,y,w,h (%) ──────────
function cropObjPos(x, y, w, h) {
 var px = w < 100 ? ((x / (100 - w)) * 100).toFixed(2) : '50';
 var py = h < 100 ? ((y / (100 - h)) * 100).toFixed(2) : '50';
 return px + '% ' + py + '%';
}

// ── Helper: genera tag <img> con object-position e data-c* per reimport ──
function cropImg(url, x, y, w, h, cls) {
 if (!url) return '<img>';
 return '<img' + (cls ? ' class="' + cls + '"' : '')
  + ' style="object-position:' + cropObjPos(x, y, w, h) + '"'
  + ' src="' + url + '"'
  + ' data-cx="' + Math.round(x) + '" data-cy="' + Math.round(y) + '"'
  + ' data-cw="' + Math.round(w) + '" data-ch="' + Math.round(h) + '">';
}


// Inserisce/aggiorna/rimuove i campi "Classificazione Taglia" e "Valore 
// Taglia" nel DOM in base alla fedina. Necessario in modalità "mantieni": 
// setEntry aggiorna solo campi già esistenti, mentre qui i campi taglia 
// possono comparire o sparire al variare della fedina. 
// Inserisce/aggiorna/rimuove i campi "Specie", "Rank di Pericolosità" e 
// "Stato di Conservazione" in base alla razza. Necessario in "mantieni": 
// setEntry aggiorna solo campi esistenti, mentre questi tre compaiono o 
// spariscono quando il PG passa Umano <-> Bestia Demoniaca. 
function aggiornaCampiBestia(root, metodo, d) { 
 function trovaLabelSpan(testo) { 
  var spans = root[metodo]('span'); 
  for (var i = 0; i < spans.length; i++) { 
   if (spans[i].className === 'scheda-label' && spans[i].textContent.trim() === testo) return spans[i]; 
  } 
  return null; 
 } 
 function entrySuccessivo(labelSpan) { 
  var n = labelSpan.nextSibling; 
  while (n && !(n.nodeType === 1 && n.className === 'scheda-entry')) n = n.nextSibling; 
  return n; 
 } 
 function rimuoviCampo(labelSpan) { 
  if (!labelSpan) return; 
  var entry = entrySuccessivo(labelSpan); 
  var parent = labelSpan.parentNode; 
  var nodo = labelSpan.nextSibling; 
  while (nodo && nodo !== entry) { var succ = nodo.nextSibling; if (nodo.nodeType === 3) parent.removeChild(nodo); nodo = succ; } 
  if (entry) { 
   var dopo = entry.nextSibling; 
   if (dopo && dopo.nodeType === 3 && /^\s*$/.test(dopo.textContent)) parent.removeChild(dopo); 
   parent.removeChild(entry); 
  } 
  parent.removeChild(labelSpan); 
 } 

 var lblSpecie = trovaLabelSpan('Specie:'); 
 var lblRank   = trovaLabelSpan('Rank di Pericolosità:'); 
 var lblCons   = trovaLabelSpan('Stato di Conservazione:'); 

 var isBestia = (d.razza === 'Bestia Demoniaca') && d.specie && d.specie !== ''; 

 if (isBestia) { 
  // I tre valori da scrivere 
  var valori = [ 
   { label: 'Specie:', val: d.specie }, 
   { label: 'Rank di Pericolosità:', val: (d.rank && d.rank !== '—') ? d.rank : '—' }, 
   { label: 'Stato di Conservazione:', val: (d.conservazione && d.conservazione !== '—') ? d.conservazione : '—' } 
  ]; 
  if (lblSpecie && lblRank && lblCons) { 
   // Esistono: aggiorna i valori 
   var eS = entrySuccessivo(lblSpecie); if (eS) eS['inn'+'erHTML'] = valori[0].val; 
   var eR = entrySuccessivo(lblRank);   if (eR) eR['inn'+'erHTML'] = valori[1].val; 
   var eC = entrySuccessivo(lblCons);   if (eC) eC['inn'+'erHTML'] = valori[2].val; 
  } else { 
   // Non esistono: inserisci i tre campi dopo "Razza:" 
   // Prima rimuovi eventuali campi parziali (robustezza) 
   rimuoviCampo(lblCons); rimuoviCampo(lblRank); rimuoviCampo(lblSpecie); 
   var lblRazza = trovaLabelSpan('Razza:'); 
   if (!lblRazza) return; 
   var entryRazza = entrySuccessivo(lblRazza); 
   var parent = lblRazza.parentNode; 
   var ref = entryRazza ? entryRazza.nextSibling : lblRazza.nextSibling; 
   for (var v = 0; v < valori.length; v++) { 
    parent.insertBefore(document.createTextNode('\n'), ref); 
    var l = document.createElement('span'); l.className = 'scheda-label'; l.textContent = valori[v].label; 
    var sp = document.createTextNode(' '); 
    var e = document.createElement('span'); e.className = 'scheda-entry'; e['inn'+'erHTML'] = valori[v].val; 
    parent.insertBefore(l, ref); parent.insertBefore(sp, ref); parent.insertBefore(e, ref); 
   } 
  } 
 } else { 
  // Umano: rimuovi i tre campi se presenti 
  rimuoviCampo(lblCons); 
  rimuoviCampo(lblRank); 
  rimuoviCampo(lblSpecie); 
 } 
} 

function aggiornaCampiTaglia(root, metodo, d) { 
 function trovaLabelSpan(testo) { 
  var spans = root[metodo]('span'); 
  for (var i = 0; i < spans.length; i++) { 
   if (spans[i].className === 'scheda-label' && spans[i].textContent.trim() === testo) return spans[i]; 
  } 
  return null; 
 } 
 function entrySuccessivo(labelSpan) { 
  var n = labelSpan.nextSibling; 
  while (n && !(n.nodeType === 1 && n.className === 'scheda-entry')) n = n.nextSibling; 
  return n; 
 } 
 // Rimuove label + entry + eventuale nodo testo (\n) associato 
 function rimuoviCampo(labelSpan) { 
  if (!labelSpan) return; 
  var entry = entrySuccessivo(labelSpan); 
  var parent = labelSpan.parentNode; 
  // Rimuove i nodi testo tra label ed entry e dopo entry fino al prossimo elemento 
  var nodo = labelSpan.nextSibling; 
  while (nodo && nodo !== entry) { var succ = nodo.nextSibling; if (nodo.nodeType === 3) parent.removeChild(nodo); nodo = succ; } 
  if (entry) { 
   var dopo = entry.nextSibling; 
   if (dopo && dopo.nodeType === 3 && /^\s*$/.test(dopo.textContent)) parent.removeChild(dopo); 
   parent.removeChild(entry); 
  } 
  parent.removeChild(labelSpan); 
 } 

 var lblClass = trovaLabelSpan('Classificazione Taglia:'); 
 var lblVal   = trovaLabelSpan('Valore Taglia:'); 

 if (d.fedina === 'Ricercato') { 
  // Aggiorna se esistono, altrimenti inserisci dopo "Fedina Penale:" 
  if (lblClass && lblVal) { 
   var eC = entrySuccessivo(lblClass); if (eC) eC['inn'+'erHTML'] = d.classTaglia; 
   var eV = entrySuccessivo(lblVal);   if (eV) eV['inn'+'erHTML'] = d.valTaglia + ' Jenny'; 
  } else { 
   var lblFedina = trovaLabelSpan('Fedina Penale:'); 
   if (!lblFedina) return; 
   var entryFedina = entrySuccessivo(lblFedina); 
   var parent = lblFedina.parentNode; 
   // ref = il nodo "\n" che sta tra la fedina e Soldi. Inseriamo i campi 
   // PRIMA di quel "\n", e ogni campo porta il proprio "\n" davanti a sé. 
   // Risultato: Fedina \n Class \n Valore \n Soldi — un solo \n ovunque. 
   var ref = entryFedina ? entryFedina.nextSibling : lblFedina.nextSibling; 
   function creaCampo(labelTesto, valore) { 
    parent.insertBefore(document.createTextNode('\n'), ref); 
    var l = document.createElement('span'); l.className = 'scheda-label'; l.textContent = labelTesto; 
    var sp = document.createTextNode(' '); 
    var e = document.createElement('span'); e.className = 'scheda-entry'; e['inn'+'erHTML'] = valore; 
    parent.insertBefore(l, ref); parent.insertBefore(sp, ref); parent.insertBefore(e, ref); 
   } 
   creaCampo('Classificazione Taglia:', d.classTaglia); 
   creaCampo('Valore Taglia:', d.valTaglia + ' Jenny'); 
  } 
 } else { 
  // Incensurato: rimuovi i campi taglia se presenti 
  rimuoviCampo(lblVal); 
  rimuoviCampo(lblClass); 
 } 
} 

// Lavora sul DOM dell'originale importato: aggiorna solo i valori 
// noti lasciando intatti tutti gli style/class inline dell'utente. 
// ============================================================ 
function aggiornaHTMLScheda(d) { 
 // Clona il DOM originale per non alterare stato.schedaOriginale 
 var root = stato.schedaOriginale.cloneNode(true); 
 var metodo = 'getElements' + 'ByTagName'; 
 
 // ── Helper ───────────────────────────────────────────────── 
 function qs(sel)  { return root.querySelector ? root.querySelector(sel) : null; } 
 function qsa(sel) { return root.querySelectorAll ? root.querySelectorAll(sel) : []; } 
 // Aggiorna il contenuto di uno span.scheda-entry dopo uno span.scheda-label 
 // Usa innerHTML per supportare tag HTML inline (es. <del>, <b>, <i>...) 
 function setEntry(labelTesto, nuovoValore) { 
  var spans = root[metodo]('span'); 
  for (var i = 0; i < spans.length - 1; i++) { 
   if (spans[i].className === 'scheda-label' && spans[i].textContent.trim() === labelTesto) { 
    if (spans[i+1].className === 'scheda-entry') { 
     spans[i+1]['inn'+'erHTML'] = nuovoValore; 
     return; 
    } 
   } 
  } 
 } 
 // Aggiorna innerHTML di un elemento trovato con querySelector 
 function setText(sel, val) { var el = qs(sel); if (el) el['inn'+'erHTML'] = val; } 
 // Aggiorna src e object-position di un <img> dentro un contenitore
 function setImg(containerSel, url, x, y, w, h) {
  if (url === null || url === undefined) return; // accrediti: lascia l'immagine com'è
  var c = qs(containerSel);
  if (!c) return;
  var imgs = c[metodo]('img');
  if (imgs.length > 0) {
   imgs[0].setAttribute('src', url);
   imgs[0].style.objectPosition = cropObjPos(x, y, w, h);
  }
 }

 // ── Nome / Cognome nel titolo ─────────────────────────────── 
 setText('.nomecognome', d.nomecognome); 
 
 // ── Immagini ─────────────────────────────────────────────── 
 setImg('.scheda-img', d.imgLaterale, d.imgLateraleX||0, d.imgLateraleY||0, d.imgLateraleW||100, d.imgLateraleH||100);
 setImg('.img-dati',   d.imgDati,     d.imgDatiX||0,     d.imgDatiY||0,     d.imgDatiW||100,     d.imgDatiH||100);
 if (d.imgInfoModo === null || d.imgInfoModo === undefined) { /* accrediti: lascia le immagini info com'erano */ } 
 else if (d.imgInfoModo === '2') { 
  var boxInfo = root.querySelector ? root['querySelector']('.img-info2') : null; 
  if (!boxInfo) { 
   var boxInfo1 = root.querySelector ? root['querySelector']('.img-info') : null; 
   if (boxInfo1) { boxInfo1.className = 'img-info2'; } 
   boxInfo = root.querySelector ? root['querySelector']('.img-info2') : null; 
  }
  if (boxInfo) boxInfo['inn'+'erHTML'] =
   cropImg(d.imgInfoA, d.imgInfoAX||0, d.imgInfoAY||0, d.imgInfoAW||100, d.imgInfoAH||100)
   + '<br>'
   + cropImg(d.imgInfoB, d.imgInfoBX||0, d.imgInfoBY||0, d.imgInfoBW||100, d.imgInfoBH||100);
 } else { 
  var boxInfo1b = root.querySelector ? root['querySelector']('.img-info,.img-info2') : null; 
  if (boxInfo1b) { boxInfo1b.className = 'img-info'; boxInfo1b['inn'+'erHTML'] = cropImg(d.imgInfo, d.imgInfoX||0, d.imgInfoY||0, d.imgInfoW||100, d.imgInfoH||100); }
 } 
 
 // ── Musica ───────────────────────────────────────────────── 
 // Guardia accrediti: musica === null significa "non toccare" (il 
 // form accrediti non ha il campo musica). Solo una stringa vuota 
 // esplicita ('') rimuove la musica; un valore la aggiorna. 
 var btn = qs('.custom-player'); 
 var iframes = root[metodo]('iframe'); 
 if (d.musica === null || d.musica === undefined) { 
  /* accrediti: lascia la musica (bottone + iframe) com'era */ 
 } else if (d.musica) { 
  var nuovoSrc = d.musicaPiattaforma === 'soundcloud'
   ? 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + d.musica
   : 'https://www.youtube.com/embed/' + d.musica + '?enablejsapi=1';
  if (iframes.length > 0) { 
   iframes[0].setAttribute('src', nuovoSrc); 
  } else { 
   // Non c'era musica: aggiunge il bottone e l'iframe nel container nomecognome 
   var nc = qs('.container-nomecognome'); 
   if (nc) { 
    var newBtn = document.createElement('button'); 
    newBtn.className = 'custom-player'; 
    newBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>'; 
    var newIframe = document.createElement('iframe'); 
    newIframe.setAttribute('style','display:none;'); 
    newIframe.setAttribute('src', nuovoSrc); 
    newIframe.setAttribute('frameborder','0'); 
    newIframe.setAttribute('allow','autoplay; encrypted-media'); 
    nc.insertBefore(newIframe, nc.firstChild); 
    nc.insertBefore(newBtn,    nc.firstChild); 
   } 
  } 
 } else { 
  // Rimuove musica se vuota 
  if (btn && btn.parentNode) btn.parentNode.removeChild(btn); 
  if (iframes.length > 0 && iframes[0].parentNode) iframes[0].parentNode.removeChild(iframes[0]); 
 } 
 
 // ── Riga dati-pg (Classe / Status / Livello) ─────────────── 
 var datiPg = qs('.dati-pg'); 
 if (datiPg) { 
  datiPg.innerHTML = '<span>Classe:</span> <span>'+(d.classe !== '—' ? d.classe : 'N/D')+'</span> | <span>Status:</span> <span>'+d.status+'</span> | <span>Livello:</span> <span>'+d.livello+'</span>'; 
 } 
 
 // ── Barra EXP ────────────────────────────────────────────── 
 var expPct = Math.round((parseInt(d.exp) / parseInt(d.exptot)) * 100) || 0; 
 var barraExp = qs('.barra-exp'); 
 if (barraExp) barraExp.style.width = expPct + '%'; 
 var datiPg2 = root[metodo]('span'); 
 for (var i = 0; i < datiPg2.length; i++) { 
  if (datiPg2[i].className === 'dati-pg2' && datiPg2[i].textContent.indexOf('For Level Up') !== -1) { 
   datiPg2[i].innerHTML = '<b>'+d.exp+'/'+d.exptot+'</b> For Level Up!'; 
   break; 
  } 
 } 
 
 // ── Dati personali (scheda-entry dopo scheda-label) ───────── 
 setEntry('Nome:',                  d.nome); 
 setEntry('Cognome:',               d.cognome); 
 setEntry('Genere:',                d.genere); 
 setEntry('Razza:',                 d.razza); 
 // Specie / Rank / Conservazione: inserisce, aggiorna o rimuove i campi in 
 // base alla razza. In "mantieni" i campi possono non esistere (PG prima 
 // Umano) o esistere quando non servono più (tornato Umano). setEntry 
 // aggiorna solo campi già presenti, quindi li gestiamo a mano come la taglia. 
 aggiornaCampiBestia(root, metodo, d); 
 setEntry('Luogo di nascita:',      d.luogo); 
 setEntry('Data di nascita:',       d.datanascita); 
 setEntry('Segno zodiacale:',       d.segno); 
 setEntry('Segno zodiacale cinese:',d.segnocinese); 
 setEntry('Allineamento:',          d.allineamento); 
 setEntry('Mestiere:',              d.mestiere); 
 setEntry('Fedina Penale:',         d.fedina); 
 // ── Taglia: inserisce, aggiorna o rimuove i campi in base alla fedina ── 
 // In modalità "mantieni" i campi taglia potrebbero non esistere (PG prima 
 // Incensurato) o esistere quando non servono più (tornato Incensurato). 
 // setEntry aggiorna solo campi già presenti, quindi qui li gestiamo a mano. 
 aggiornaCampiTaglia(root, metodo, d); 
 setEntry('Soldi:', d.jenny.toLocaleString() + ' Jenny / ' + d.hc + ' HC'); 
 
 // ── Aggettivi ─────────────────────────────────────────────── 
 var aggs = qsa('.aggettivo'); 
 if (d.agg1 !== null && d.agg1 !== undefined) { 
  if (aggs[0]) aggs[0]['inn'+'erHTML'] = d.agg1; 
  if (aggs[1]) aggs[1]['inn'+'erHTML'] = d.agg2; 
  if (aggs[2]) aggs[2]['inn'+'erHTML'] = d.agg3; 
 } 
 
 // ── Citazione ─────────────────────────────────────────────── 
 if (d.citazione !== null && d.citazione !== undefined) { 
  var citDiv = qs('.info-citazione'); 
  if (citDiv) { 
   var citSpan = citDiv[metodo]('span'); 
   if (citSpan.length > 0) citSpan[0]['inn'+'erHTML'] = d.citazione; 
   else citDiv['inn'+'erHTML'] = d.citazione; 
  } 
 } 
 
 // ── Descrizione / Background ─────────────────────────────── 
 setEntry('Descrizione:',    d.aspetto); 
 setEntry('Background:', d.background); 
 
 // ── Statistiche (.stat-card e .stat-card-vitale) ──────────── 
 var mapStat = { 
  'Forza':'forza','Resistenza':'resistenza','Velocità':'velocita', 
  'Riflessi':'riflessi','Destrezza':'destrezza','Mira':'mira', 
  'Intelligenza':'intelligenza','Carisma':'carisma','Istinto':'istinto', 
  'Fortuna':'fortuna','Vita':'vita','Aura':'aura' 
 }; 
 var statCards = root[metodo]('div'); 
 for (var i = 0; i < statCards.length; i++) { 
  var cn = statCards[i].className; 
  if (cn === 'stat-card' || cn === 'stat-card-vitale') { 
   var lbl = statCards[i].querySelector ? statCards[i].querySelector('.stat-label') : null; 
   var val = statCards[i].querySelector ? statCards[i].querySelector('.stat-value') : null; 
   if (lbl && val) { 
    var sid = mapStat[lbl.textContent.trim().replace(' over','')]; 
    if (sid) { 
     var newVal = sid === 'vita' || sid === 'aura' 
      ? parseInt(d.stat[sid]).toLocaleString() 
      : d.stat[sid]; 
     val.textContent = newVal; 
     // gestione classe over sul label 
     var isOver = d.ovSt && d.ovSt.indexOf(sid) !== -1; 
     lbl.className = 'stat-label' + (isOver ? ' over' : ''); 
    } 
   } 
  } 
 } 
 
 // ── Competenze ────────────────────────────────────────────── 
 var compGrid = qs('.competenze-grid'); 
 if (compGrid && d.competenze !== null) { 
  var ls2 = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
  var nuovoComp = ''; 
  for (var t = 0; t < 5; t++) { 
   var comp = d.competenze[t]; 
   if (comp && comp.sbloccato) { 
    nuovoComp += '<div class="competenza-card"><div class="competenza-header"><span class="competenza-nome">'+comp.nome+'</span><span class="competenza-livello">Lv. '+(comp.lv||'1')+'</span></div><div class="competenza-desc">'+comp.desc+'</div><div class="competenza-oggetto"><span class="competenza-oggetto-label">Oggetto:</span> '+(comp.oggetto||'—')+'</div></div>'; 
   } else { 
    nuovoComp += '<div class="competenza-card bloccata"><div class="competenza-bloccata-label"><i class="fa-solid fa-lock"></i> Slot bloccato — sbloccabile al Lv. '+SBLOCCO_COMPETENZE[t]+'</div></div>'; 
   } 
  } 
  compGrid.innerHTML = nuovoComp; 
 } 
 
 // ── Hatsu / Nen / Tenacia ─────────────────────────────────── 
 setText('.hatsu-card-value', d.hatsu || '—'); 
 var barreCards = root[metodo]('div'); 
 for (var i = 0; i < barreCards.length; i++) { 
  if (barreCards[i].className === 'barra-card') { 
   var lblEl = barreCards[i].querySelector ? barreCards[i].querySelector('.barra-card-label') : null; 
   var pctEl = barreCards[i].querySelector ? barreCards[i].querySelector('.barra-card-pct') : null; 
   var barEl = barreCards[i].querySelector ? barreCards[i].querySelector('.bc-barra') : null; 
   if (lblEl && pctEl) { 
    var nome = lblEl.textContent.trim(); 
    var pct = nome === 'Nen' ? d.nen : (nome === 'Tenacia' ? d.tenacia : null); 
    if (pct !== null) { 
     pctEl.textContent = pct + '%'; 
     if (barEl) barEl.style.width = pct + '%'; 
    } 
   } 
  } 
 } 
 
 // ── Tecniche Hatsu ────────────────────────────────────────── 
 var potieriBox = qs('.poteri-box'); 
 if (potieriBox && d.tecniche !== null) { 
  var nuovoPoteri = ''; 
  if (d.tecniche && d.tecniche.length > 0) { 
   for (var ti = 0; ti < d.tecniche.length; ti++) { 
    nuovoPoteri += '<span class="scheda-label">'+d.tecniche[ti].nome+':</span> <span class="scheda-entry">'+(d.tecniche[ti].desc||'—')+'</span>\n\n'; 
   } 
  } else { 
   nuovoPoteri = '<span class="scheda-entry">—</span>'; 
  } 
  potieriBox.innerHTML = nuovoPoteri; 
 } 
 
 // ── Baule ─────────────────────────────────────────────────── 
 var catMap    = ['armi','equip','oggetti','materiali']; 
 var catTitoli = ['Armi','Equipaggiamento','Oggetti Extra','Materiali']; 
 var equipBoxes = root[metodo]('div'); 
 for (var i = 0; i < equipBoxes.length; i++) { 
  if (equipBoxes[i].className === 'equip-box') { 
   var titleEl = equipBoxes[i].querySelector ? equipBoxes[i].querySelector('.equip-box-title') : null; 
   if (!titleEl) continue; 
   var catIdx = catTitoli.indexOf(titleEl.textContent.trim()); 
   if (catIdx === -1) continue; 
   var catId = catMap[catIdx]; 
   var tipo  = catId; 
   var items = d.baule[catId]; 
   var nuovoLi = ''; 
   if (items && items.length > 0) { 
    for (var x = 0; x < items.length; x++) { 
     var itm = items[x]; 
     var expNome = itm.expNome || ''; 
     var expLink = itm.expLink || ''; 
     var expTag  = expLink ? '<a href="'+expLink+'">'+expNome+'</a>' : expNome; 
     var hasExp  = !!(expNome || expLink); 
     var info = 'Qt: '+(itm.qt||'1'); 
     if (tipo==='armi'||tipo==='equip') info += ' · Lv. '+(itm.lv||'0') + (hasExp ? ' · Espansione: '+expTag : ''); 
     if (tipo==='oggetti')              info += ' · Usi: '+(itm.usi||'0/1') + (hasExp ? ' · Espansione: '+expTag : ''); 
     if (tipo==='materiali' && hasExp)  info += ' · Espansione: '+expTag; 
     var descHtml = itm.desc ? '<div class="equip-item-desc">'+itm.desc+'</div>' : '';
     nuovoLi += '<li><span class="equip-item-name">'+itm.nome+'</span> <span class="equip-item-info">'+info+'</span>'+descHtml+'</li>'; 
    } 
   } 
   var bodyEl = equipBoxes[i].querySelector ? equipBoxes[i].querySelector('.equip-box-body') : null; 
   if (bodyEl) bodyEl.innerHTML = '<ul>'+nuovoLi+'</ul>'; 
  } 
 } 
 
 // Scrive il pgId sul root se non già presente (schede vecchie importate senza ID) 
 if (d.pgId && !root.getAttribute('data-pgid')) { 
  root.setAttribute('data-pgid', d.pgId); 
 } 
 // Restituisce l'HTML serializzato del DOM aggiornato 
 return root.outerHTML; 
} 
 
// ============================================================ 
// GENERA SCHEDA 
// ============================================================ 
function generaScheda() { 
 var isNuova = stato.modalita === 'nuova'; 
 var isAccrediti = stato.modalita === 'accrediti'; 
 // Validazione punti extra per schede nuove 
 if (isNuova) { 
  var rimasti = aggiornaContatoreExtra(); 
  if (rimasti > 0) { 
   alert('Devi ancora distribuire ' + rimasti + ' punti extra nelle statistiche!'); 
   return; 
  } 
 } 
 // Validazione modalità accrediti 
 if (isAccrediti) { 
  if (!stato.schedaOriginale) { 
   alert('Devi prima importare la scheda del PG!'); 
   return; 
  } 
  if (!accNomeStaffer()) { 
   alert('Inserisci il tuo nome staff prima di registrare l\'accredito.'); 
   var wrap = document.getElementById('acc-staffer-wrap'); 
   if (wrap) wrap.style.display = ''; 
   return; 
  } 
  var puntiRimasti = accAggiornaContatore(); 
  if (puntiRimasti > 0) { 
   alert('Devi distribuire tutti i ' + puntiRimasti + ' punti statistica rimanenti prima di registrare l\'accredito!'); 
   return; 
  } 
 } 
 var mantieni = stato.palette === 'mantieni'; 
 var classeContenitore = mantieni ? '' : (stato.palette || 'scheda-darknight'); 
 var classeOriginale = mantieni ? (stato.classeOriginale || '') : ''; 
 var styleOriginale  = mantieni ? (stato.styleOriginale  || '') : ''; 
 var d = raccogliDati(isNuova); 
 
 var htmlScheda, htmlAnteprima; 
 if (mantieni && stato.schedaOriginale) { 
  // Modalità mantieni: aggiorna chirurgicamente il DOM originale 
  htmlScheda = aggiornaHTMLScheda(d); 
  // Per l'anteprima sostituisce \n con <br> 
  htmlAnteprima = htmlScheda.replace(/\\n/g, '<br>').replace(/\n(?=<span)/g, '<br>'); 
 } else { 
  htmlScheda    = costruisciHTMLScheda(d, isNuova, classeContenitore, classeOriginale, styleOriginale); 
  htmlAnteprima = costruisciHTMLAnteprimaScheda(d, isNuova, classeContenitore, classeOriginale, styleOriginale); 
 } 
 
 // Stile anteprima allineato a schede-v4.css per la slide "Info". 
 // Senza il CSS del forum, l'anteprima deve replicare da sé il layout 
 // della slide info, altrimenti la seconda immagine (modo 2 immagini) 
 // risulta sfasata verso il basso. 
 // 
 // Regole copiate 1:1 da schede-v4.css (righe .img-info / .img-info2 / 
 // .info-aspetto / .info-storia). Punti importanti: 
 // - box-sizing di DEFAULT (content-box), NON border-box: sia le 
 //   immagini sia i box testo hanno border 4px + padding 4px, quindi 
 //   entrambi misurano 220+8+8 = 236px reali e si allineano. 
 // - le img sono INLINE (niente display:block, che sommato al <br> 
 //   nel markup spingeva giù la seconda immagine). 
 // - il bordo usa var(--bordo), definita dalla classe palette del 
 //   contenitore scheda presente nell'anteprima. 
 var stileAnteprima = 
  '<style>' + 
  '#anteprima-scheda .img-info,#anteprima-scheda .img-info2{float:left;margin:5px;margin-top:0;}' + 
  '#anteprima-scheda .img-info img{height:445px;border:4px solid var(--bordo);width:170px;padding:4px;object-fit:cover;vertical-align:top;}' + 
  '#anteprima-scheda .img-info2 img{height:220px;border:4px solid var(--bordo);width:170px;padding:4px;object-fit:cover;margin-bottom:5px;vertical-align:top;}' + 
  '#anteprima-scheda .info-aspetto,#anteprima-scheda .info-storia{max-width:505px;height:220px;overflow-y:scroll;margin:5px;border:4px solid var(--bordo);padding:4px;text-align:left;}' + 
  '</style>'; 
 document.getElementById('anteprima-scheda').innerHTML = stileAnteprima + htmlAnteprima; 
 document.getElementById('codice-html').textContent = htmlScheda; 
 document.getElementById('sezione-output').style.display = 'block'; 

 // ── Accrediti: calcola il diff e mostra il bottone di conferma ── 
 if (isAccrediti) { 
  stato.accNome = d.nomecognome || d.nome || (stato.pgId || 'PG'); 
  stato.diffAccredito = accCalcolaDiff(stato.accBase || {}, d); 
  accMostraConferma(stato.diffAccredito); 
 } 

 document.getElementById('sezione-output').scrollIntoView({ behavior:'smooth' }); 
 
 // NB: la bozza NON viene cancellata dopo la generazione. Così, se 
 // guardando l'anteprima ci si accorge che qualcosa va corretto, i 
 // dati sono ancora tutti compilati. La bozza si azzera solo con il 
 // pulsante "Resetta". 
} 

// Mostra, nella sezione output, il riepilogo del diff e il bottone che 
// invia il log a Firebase (solo su conferma esplicita dello staffer). 
function accMostraConferma(diff) { 
 var out = document.getElementById('sezione-output'); 
 if (!out) return; 
 var vecchio = document.getElementById('acc-conferma-box'); 
 if (vecchio && vecchio.parentNode) vecchio.parentNode.removeChild(vecchio); 

 var box = document.createElement('div'); 
 box.id = 'acc-conferma-box'; 
 box.style.cssText = 'background:#0B486B; border:2px solid #292354; border-radius:12px; padding:25px; margin-top:20px;'; 
 var html = '<h3 style="color:#CFF09E; font-size:1.35em; margin-bottom:15px; border-bottom:1px solid #3B8686; padding-bottom:10px;"><i class="fa-solid fa-clipboard-check"></i> Registro Accrediti</h3>'; 

 if (!diff || diff.length === 0) { 
  html += '<p style="color:#8FBEBA; font-style:italic;">Nessuna modifica economica rilevata: non c\'è nulla da registrare nel log.</p>'; 
  box.innerHTML = html; 
  out.appendChild(box); 
  return; 
 } 

 html += '<p style="color:#8FBEBA; font-size:0.9em; margin-bottom:12px;">Copia e incolla la scheda nel forum. Quando è tutto a posto, premi il bottone per registrare queste modifiche nel registro:</p>'; 
 html += '<div style="background:#292354; border-radius:8px; padding:14px 18px; margin-bottom:16px;">'; 
 for (var i = 0; i < diff.length; i++) { 
  var m = diff[i]; 
  html += '<div style="color:#E2F7C4; font-size:0.92em; padding:3px 0;">'; 
  html += '<b style="color:#CFF09E;">' + m.campo + ':</b> '; 
  if (m.delta === 'info') { html += '<b>' + m.a + '</b>'; } 
  else if (m.a === null) { html += 'rimosso <b>' + m.da + '</b>'; } 
  else if (m.da === null) { html += 'aggiunto <b>' + m.a + '</b>'; } 
  else { html += m.da + ' <i class="fa-solid fa-arrow-right" style="color:#8FBEBA; font-size:0.85em;"></i> <b>' + m.a + '</b>'; if (m.delta) html += ' <span style="color:#A8DBA8;">(' + m.delta + ')</span>'; } 
  html += '</div>'; 
 } 
 html += '</div>'; 
 html += '<button id="acc-conferma-btn" onclick="accInviaLog()" style="width:100%; background:linear-gradient(135deg,#A8DBA8,#79BD9A); color:#1a2e1a; border:none; padding:14px; font-size:1.05em; font-weight:700; border-radius:8px; cursor:pointer; font-family:\'Montserrat\';"><i class="fa-solid fa-cloud-arrow-up"></i> Conferma e invia al registro</button>'; 
 box.innerHTML = html; 
 out.appendChild(box); 
} 
 
// ============================================================ 
// HTML SCHEDA 
// ============================================================ 
function costruisciHTMLScheda(d, isNuova, classeContenitore, classeOriginale, styleOriginale) { 
 var expPct = Math.round((parseInt(d.exp) / parseInt(d.exptot)) * 100) || 0; 
 // Costruisce l'attributo del div radice: 
 // - se classeOriginale è valorizzato (modalità mantieni), usa quello + eventuale style originale 
 // - altrimenti usa classeContenitore normale 
 var attrPgId = d.pgId ? ' data-pgid="' + d.pgId + '"' : ''; 
 var divApri; 
 if (classeOriginale) { 
  divApri = '<div class="' + classeOriginale + '"' + (styleOriginale ? ' style="' + styleOriginale + '"' : '') + attrPgId + '>'; 
 } else if (classeContenitore) { 
  divApri = '<div class="' + classeContenitore + '"' + attrPgId + '>'; 
 } else { 
  divApri = '<div' + attrPgId + '>'; 
 } 
 
 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
 var nomiStat = ['Forza','Resistenza','Velocità','Riflessi','Destrezza','Mira','Intelligenza','Carisma','Istinto','Fortuna']; 
 
 var htmlStats = ''; 
 for (var i=0;i<ls.length;i++) { 
  var isOver = d.ovSt && d.ovSt.indexOf(ls[i])!==-1; 
  htmlStats += '<div class="stat-card"><span class="stat-label' + (isOver?' over':'') + '">' + nomiStat[i] + '</span><span class="stat-value">' + d.stat[ls[i]] + '</span></div>'; 
 } 
 
 var htmlComp = ''; 
 if (isNuova) { 
  for (var s=0;s<5;s++) htmlComp += '<div class="competenza-card bloccata"><div class="competenza-bloccata-label"><i class="fa-solid fa-lock"></i> Slot bloccato — sbloccabile al Lv. '+SBLOCCO_COMPETENZE[s]+'</div></div>'; 
 } else { 
  for (var t=0;t<5;t++) { 
   var comp=d.competenze[t]; 
   if (comp&&comp.sbloccato) { 
    htmlComp += '<div class="competenza-card"><div class="competenza-header"><span class="competenza-nome">'+comp.nome+'</span><span class="competenza-livello">Lv. '+(comp.lv||'1')+'</span></div><div class="competenza-desc">'+comp.desc+'</div><div class="competenza-oggetto"><span class="competenza-oggetto-label">Oggetto:</span> '+(comp.oggetto||'—')+'</div></div>'; 
   } else { 
    htmlComp += '<div class="competenza-card bloccata"><div class="competenza-bloccata-label"><i class="fa-solid fa-lock"></i> Slot bloccato — sbloccabile al Lv. '+SBLOCCO_COMPETENZE[t]+'</div></div>'; 
   } 
  } 
 } 
 
 function htmlBauleCategoria(titolo, items, tipo) { 
  var li = ''; 
  if (items&&items.length>0) { 
   for (var x=0;x<items.length;x++) { 
    var itm=items[x]; 
    var expNome = itm.expNome || ''; 
    var expLink = itm.expLink || ''; 
    var expTag = expLink ? '<a href="'+expLink+'">'+expNome+'</a>' : expNome; 
    var hasExp = !!(expNome || expLink); 
    var info='Qt: '+(itm.qt||'1'); 
    if (tipo==='armi'||tipo==='equip') info+=' · Lv. '+(itm.lv||'0') + (hasExp ? ' · Espansione: '+expTag : ''); 
    if (tipo==='oggetti') info+=' · Usi: '+(itm.usi||'0/1') + (hasExp ? ' · Espansione: '+expTag : ''); 
    if (tipo==='materiali' && hasExp) info+=' · Espansione: '+expTag; 
    var descHtml = itm.desc ? '<div class="equip-item-desc">'+itm.desc+'</div>' : '';
    li+='<li><span class="equip-item-name">'+itm.nome+'</span> <span class="equip-item-info">'+info+'</span>'+descHtml+'</li>'; 
   } 
  } 
  return '<div class="equip-box"><div class="equip-box-header"><span class="equip-box-title">'+titolo+'</span></div><div class="equip-box-body"><ul>'+li+'</ul></div></div>'; 
 } 
 
var htmlNen = '';
 if (isNuova) {
  // Scheda nuova: invariato
  htmlNen =
   '<div class="hatsu-card"><div><span class="hatsu-card-label">Hatsu</span><span class="hatsu-card-value">Non ancora sbloccato</span></div><i class="mdi mdi-fire hatsu-card-icon"></i></div>' +
   '<div class="barre-row">' +
   '<div class="barra-card"><div class="barra-card-header"><span class="barra-card-label">Nen</span><span class="barra-card-pct">'+NEN_INIZIALE+'%</span></div><div class="bc-container"><div class="bc-barra bc-nen barra-pg" style="width:'+NEN_INIZIALE+'%;"></div></div></div>' +
   '<div class="barra-card"><div class="barra-card-header"><span class="barra-card-label">Tenacia</span><span class="barra-card-pct">'+TENACIA_INIZIALE+'%</span></div><div class="bc-container"><div class="bc-barra bc-tenacia barra-pg" style="width:'+TENACIA_INIZIALE+'%;"></div></div></div>' +
   '</div>' +
   '<div class="titolo-poteri-box">POTERE NEN</div>' +
   '<div class="poteri-box"><span class="scheda-entry">—</span></div>';
 } else {
  // Helper: genera HTML di una card (profilo o tecnica)
  function htmlNenCard(titolo, campi) {
   var s = '<div class="nen-card"><span class="nen-card-title">'+titolo+'</span><br>';
   for (var ci=0;ci<campi.length;ci++) {
    s += '<span class="scheda-label">'+campi[ci].label+'</span> <span class="scheda-entry">'+campi[ci].val+'</span><br>';
   }
   s += '</div>';
   return s;
  }
 
  // Box 1: Potere Nen
  var htmlBox1 = '<div class="nen-box">' +
   '<div class="nen-box-header"><span class="nen-box-title">'+(d.hatsu||'—')+'</span></div>' +
   '<div class="nen-box-body">';
  if (d.nenPotere) {
   htmlBox1 +=
    '<span class="scheda-label">Nome potere:</span> <span class="scheda-entry">'+(d.nenPotere.nomepotere||'—')+'</span><br>' +
    '<span class="scheda-label">Descrizione:</span> <span class="scheda-entry">'+(d.nenPotere.descrizione||'—')+'</span><br>' +
    '<span class="scheda-label">Funzionamento e regole:</span> <span class="scheda-entry">'+(d.nenPotere.funzionamento||'—')+'</span><br>' +
    '<span class="scheda-label">Condizioni e restrizioni:</span> <span class="scheda-entry">'+(d.nenPotere.condizioni||'—')+'</span>';
   // Costo: campo nuovo, mostrato solo se valorizzato (le schede più
   // vecchie non ce l'hanno e non devono guadagnare un "—").
   if (d.nenPotere.costo) htmlBox1 +=
    '<br><span class="scheda-label">Costo:</span> <span class="scheda-entry">'+d.nenPotere.costo+'</span>';
  } else {
   htmlBox1 += '<span class="scheda-entry">—</span>';
  }
  htmlBox1 += '</div></div>';
 
  // Immagine nen
  var htmlNenImg = d.nenImg ? cropImg(d.nenImg, d.nenImgX||0, d.nenImgY||0, d.nenImgW||100, d.nenImgH||100, 'nen-img') : '';
 
  // Box 2: Profili (omesso in Speed Duel)
  var htmlBox2 = '';
  if (d.nenModo !== 'speedduel') {
   htmlBox2 = '<div class="nen-box">' +
    '<div class="nen-box-header"><span class="nen-box-title">Profili</span></div>' +
    '<div class="nen-box-body">';
   if (d.profili && d.profili.length > 0) {
    for (var pi=0;pi<d.profili.length;pi++) {
     var pr = d.profili[pi];
     htmlBox2 += htmlNenCard('Profilo '+(pi+1)+' \u2014 '+pr.nome, [
      {label:'Descrizione:', val: pr.desc},
      {label:'Effetti e/o Bonus:', val: pr.bonus},
      {label:'Condizioni e/o Restrizioni e/o Malus:', val: pr.malus},
      {label:'Costo:', val: pr.costo}
     ]);
    }
   } else {
    htmlBox2 += '<span class="scheda-entry">—</span>';
   }
   htmlBox2 += '</div></div>';
  }
 
  // Helper box tecniche
  function htmlBoxTecniche(titolo, tecniche) {
   var s = '<div class="nen-box">' +
    '<div class="nen-box-header"><span class="nen-box-title">'+titolo+'</span></div>' +
    '<div class="nen-box-body">';
   if (tecniche && tecniche.length > 0) {
    for (var ti2=0;ti2<tecniche.length;ti2++) {
     var tc = tecniche[ti2];
     s += htmlNenCard(tc.nome, [
      {label:'Descrizione:', val: tc.desc},
      {label:'Effetti e/o Bonus:', val: tc.bonus},
      {label:'Condizioni e/o Restrizioni e/o Malus:', val: tc.malus},
      {label:'Costo:', val: tc.costo}
     ]);
    }
   } else {
    s += '<span class="scheda-entry">—</span>';
   }
   s += '</div></div>';
   return s;
  }
 
  htmlNen =
   '<div class="hatsu-card"><div><span class="hatsu-card-label">Hatsu</span><span class="hatsu-card-value">'+(d.hatsu||'—')+'</span></div><i class="mdi mdi-fire hatsu-card-icon"></i></div>' +
   '<div class="barre-row">' +
   '<div class="barra-card"><div class="barra-card-header"><span class="barra-card-label">Nen</span><span class="barra-card-pct">'+d.nen+'%</span></div><div class="bc-container"><div class="bc-barra bc-nen barra-pg" style="width:'+d.nen+'%;"></div></div></div>' +
   '<div class="barra-card"><div class="barra-card-header"><span class="barra-card-label">Tenacia</span><span class="barra-card-pct">'+d.tenacia+'%</span></div><div class="bc-container"><div class="bc-barra bc-tenacia barra-pg" style="width:'+d.tenacia+'%;"></div></div></div>' +
   '</div>' +
   '<div class="titolo-poteri-box">POTERE NEN</div>' +
   '<div class="poteri-box">' +
   htmlBox1 +
   htmlNenImg +
   htmlBox2 +
   htmlBoxTecniche('Tecniche 25%', d.tecniche25) +
   htmlBoxTecniche('Tecniche 50%', d.tecniche50) +
   htmlBoxTecniche('Tecnica Finale 100%', d.tecniche100) +
   '</div>';
 }
 
 var htmlMusica = ''; 
 if (d.musica) { 
  var mSrc = d.musicaPiattaforma === 'soundcloud'
   ? 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + d.musica
   : 'https://www.youtube.com/embed/' + d.musica + '?enablejsapi=1';
  htmlMusica = '<i' + 'frame style="display: none;" src="' + mSrc + '" frameborder="0" allow="autoplay; encrypted-media"></' + 'iframe>'; 
 } 
 
 return divApri + 
  '<div class="scheda-pg-container">' + 
  '<div class="scheda-immagine"><div class="scheda-img">'+cropImg(d.imgLaterale,d.imgLateraleX||0,d.imgLateraleY||0,d.imgLateraleW||100,d.imgLateraleH||100)+'</div></div>' + 
  '<div class="scheda-nomecognome"><p align="center"><span class="container-nomecognome">' + 
  (d.musica ? '<button class="custom-player"><i class="fa-solid fa-circle-play"></i></button>' + htmlMusica : '') + 
  '<span class="nomecognome">'+d.nomecognome+'</span></span></p></div>' + 
  '<div class="scheda-bottoni">' + 
  '<div class="bottone-nav" onclick="mostraSlide(this,0)"><b>Dati</b></div>' + 
  '<div class="bottone-nav" onclick="mostraSlide(this,1)"><b>Info</b></div>' + 
  '<div class="bottone-nav" onclick="mostraSlide(this,2)"><b>Statistiche</b></div>' + 
  '<div class="bottone-nav" onclick="mostraSlide(this,3)"><b>Abilità</b></div>' + 
  '<div class="bottone-nav" onclick="mostraSlide(this,4)"><b>Baule</b></div>' + 
  '</div>' + 
  '<div class="scheda-slide">' + 
  '<div class="slide-pg"><div class="slide-dati">' + 
  '<div class="dati-pg"><span>Classe:</span> <span>'+(d.classe !== '—' ? d.classe : 'N/D')+'</span> | <span>Status:</span> <span>'+d.status+'</span> | <span>Livello:</span> <span>'+d.livello+'</span></div>' + 
  '<div class="dati-exp-row"><span class="dati-pg2">Exp</span><div class="container-barra"><div class="barra-pg barra-exp" style="width:'+expPct+'%; height:100%;"></div></div><span class="dati-pg2"><b>'+d.exp+'/'+d.exptot+'</b> For Level Up!</span></div>' + 
  '<div class="img-dati">'+cropImg(d.imgDati,d.imgDatiX||0,d.imgDatiY||0,d.imgDatiW||100,d.imgDatiH||100)+'</div>' + 
  '<div class="div-dati">' + 
  '<span class="scheda-label">Nome:</span> <span class="scheda-entry">'+d.nome+'</span>\n' + 
  '<span class="scheda-label">Cognome:</span> <span class="scheda-entry">'+d.cognome+'</span>\n' + 
  '<span class="scheda-label">Genere:</span> <span class="scheda-entry">'+d.genere+'</span>\n' + 
  '<span class="scheda-label">Razza:</span> <span class="scheda-entry">'+d.razza+'</span>\n' + 
  (d.specie ? '<span class="scheda-label">Specie:</span> <span class="scheda-entry">'+d.specie+'</span>\n' : '') + 
  (d.rank && d.rank !== '—' ? '<span class="scheda-label">Rank di Pericolosità:</span> <span class="scheda-entry">'+d.rank+'</span>\n' : '') + 
  (d.conservazione && d.conservazione !== '—' ? '<span class="scheda-label">Stato di Conservazione:</span> <span class="scheda-entry">'+d.conservazione+'</span>\n' : '') + 
  '<span class="scheda-label">Luogo di nascita:</span> <span class="scheda-entry">'+d.luogo+'</span>\n' + 
  '<span class="scheda-label">Data di nascita:</span> <span class="scheda-entry">'+d.datanascita+'</span>\n' + 
  '<span class="scheda-label">Segno zodiacale:</span> <span class="scheda-entry">'+d.segno+'</span>\n' + 
  '<span class="scheda-label">Segno zodiacale cinese:</span> <span class="scheda-entry">'+d.segnocinese+'</span>\n' + 
  '<span class="scheda-label">Allineamento:</span> <span class="scheda-entry">'+d.allineamento+'</span>\n' + 
  '<span class="scheda-label">Mestiere:</span> <span class="scheda-entry">'+d.mestiere+'</span>\n' + 
  '<span class="scheda-label">Fedina Penale:</span> <span class="scheda-entry">'+d.fedina+'</span>\n' + 
  (d.fedina === 'Ricercato' ? '<span class="scheda-label">Classificazione Taglia:</span> <span class="scheda-entry">'+d.classTaglia+'</span>\n' + '<span class="scheda-label">Valore Taglia:</span> <span class="scheda-entry">'+d.valTaglia+' Jenny</span>\n' : '') + 
  '<span class="scheda-label">Soldi:</span> <span class="scheda-entry">'+d.jenny.toLocaleString()+' Jenny / '+d.hc+' HC</span>\n' + 
  '</div></div></div>' + 
  '<div class="slide-pg"><div class="slide-info">' + 
  '<div class="info-aggettivi"><span class="aggettivo">'+d.agg1+'</span><span class="info-sep"></span><span class="aggettivo">'+d.agg2+'</span><span class="info-sep"></span><span class="aggettivo">'+d.agg3+'</span></div>' + 
  '<div class="info-citazione"><span>'+d.citazione+'</span></div>' + 
  (d.imgInfoModo==='2' ? '<div class="img-info2">'+cropImg(d.imgInfoA,d.imgInfoAX||0,d.imgInfoAY||0,d.imgInfoAW||100,d.imgInfoAH||100)+'<br>'+cropImg(d.imgInfoB,d.imgInfoBX||0,d.imgInfoBY||0,d.imgInfoBW||100,d.imgInfoBH||100)+'</div>' : '<div class="img-info">'+cropImg(d.imgInfo,d.imgInfoX||0,d.imgInfoY||0,d.imgInfoW||100,d.imgInfoH||100)+'</div>') + 
  '<div class="info-aspetto"><span class="scheda-label">Descrizione:</span> <span class="scheda-entry">'+d.aspetto+'</span></div>' + 
  '<div class="info-storia"><span class="scheda-label">Background:</span> <span class="scheda-entry">'+d.background+'</span></div>' + 
  '</div></div>' + 
  '<div class="slide-pg"><div class="slide-statistiche">' + 
  '<div class="stats-grid">'+htmlStats+'</div>' + 
  '<div class="stats-vitali"><div class="stat-card-vitale"><span class="stat-label">Vita</span><span class="stat-value">'+parseInt(d.stat.vita).toLocaleString()+'</span></div><div class="stat-card-vitale"><span class="stat-label">Aura</span><span class="stat-value">'+parseInt(d.stat.aura).toLocaleString()+'</span></div></div>' + 
  '<div class="stats-sep">&#9670; &#9670; &#9670;</div>' + 
  '<div class="competenze-grid">'+htmlComp+'</div>' + 
  '</div></div>' + 
  '<div class="slide-pg"><div class="slide-poteri">' + 
   
  '<div class="div-poteri">'+htmlNen+'</div>' + 
  '</div></div>' + 
  '<div class="slide-pg"><div class="slide-equip">' + 
  htmlBauleCategoria('Armi',d.baule.armi,'armi') + 
  htmlBauleCategoria('Equipaggiamento',d.baule.equip,'equip') + 
  htmlBauleCategoria('Oggetti Extra',d.baule.oggetti,'oggetti') + 
  htmlBauleCategoria('Materiali',d.baule.materiali,'materiali') + 
  '</div></div>' + 
  '</div>' + 
  '<div class="scheda-copyright"><a href="https://hxhforumgdr.forumcommunity.net/">Hunter x Hunter Forum - GDR Remastered</a></div>' + 
  '</div></div>'; 
} 
 
// ============================================================ 
// HTML ANTEPRIMA 
// ============================================================ 
function costruisciHTMLAnteprimaScheda(d, isNuova, classeContenitore, classeOriginale, styleOriginale) { 
 var html = costruisciHTMLScheda(d, isNuova, classeContenitore, classeOriginale, styleOriginale); 
 html = html.replace(/\\n/g, '<br>'); 
 html = html.replace(/\n(?=<span)/g, '<br>'); 
 return html; 
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
