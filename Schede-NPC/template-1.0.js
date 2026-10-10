// ── Helper: calcola object-position da valori crop x,y,w,h (%) ──────────
function cropObjPos(x, y, w, h) {
 var px = w < 100 ? ((x / (100 - w)) * 100).toFixed(2) : '50';
 var py = h < 100 ? ((y / (100 - h)) * 100).toFixed(2) : '50';
 return px + '% ' + py + '%';
}

// ── Helper: genera tag <img> con style prima di src (richiesto da ForumFree) ──
function cropImg(url, x, y, w, h, cls) {
 if (!url) return '<img>';
 return '<img' + (cls ? ' class="' + cls + '"' : '')
  + ' style="object-position:' + cropObjPos(x, y, w, h) + '"'
  + ' src="' + url + '"'
  + ' data-cx="' + Math.round(x) + '" data-cy="' + Math.round(y) + '"'
  + ' data-cw="' + Math.round(w) + '" data-ch="' + Math.round(h) + '">';
}

// ============================================================
// AGGIORNA HTML SCHEDA NPC (modalità "Mantieni attuale")
// ============================================================
function aggiornaHTMLSchedaNpc(d) {
 var root = stato.schedaOriginale.cloneNode(true);
 var metodo = 'getElements' + 'ByTagName';

 function qs(sel)  { return root.querySelector ? root.querySelector(sel) : null; }
 function qsa(sel) { return root.querySelectorAll ? root.querySelectorAll(sel) : []; }
 function setEntry(labelTesto, nuovoValore) {
  var spans = root[metodo]('span');
  for (var i = 0; i < spans.length - 1; i++) {
   if (spans[i].className === 'scheda-label' && spans[i].textContent.trim() === labelTesto) {
    if (spans[i+1].className === 'scheda-entry') { spans[i+1]['inn'+'erHTML'] = nuovoValore; return; }
   }
  }
 }
 function setText(sel, val) { var el = qs(sel); if (el) el['inn'+'erHTML'] = val; }
 function setImg(containerSel, url, x, y, w, h) { var c = qs(containerSel); if (!c) return; var imgs = c[metodo]('img'); if (imgs.length > 0) { imgs[0].setAttribute('src', url); imgs[0].style.objectPosition = cropObjPos(x||0, y||0, w||100, h||100); } }

 setText('.nomecognome', d.nomecognome);
 setImg('.scheda-img', d.imgLaterale, d.imgLateraleX, d.imgLateraleY, d.imgLateraleW, d.imgLateraleH);
 setImg('.img-dati', d.imgDati, d.imgDatiX, d.imgDatiY, d.imgDatiW, d.imgDatiH);

 // Musica
 var btn = qs('.custom-player');
 var iframes = root[metodo]('iframe');
 if (d.musica) {
  var nuovoSrc = d.musicaPiattaforma === 'soundcloud'
   ? 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + d.musica
   : 'https://www.youtube.com/embed/' + d.musica + '?enablejsapi=1';
  if (iframes.length > 0) {
   iframes[0].setAttribute('src', nuovoSrc);
  } else {
   var nc = qs('.container-nomecognome');
   if (nc) {
    var newBtn = document.createElement('button'); newBtn.className = 'custom-player'; newBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    var newIframe = document.createElement('iframe'); newIframe.setAttribute('style','display:none;'); newIframe.setAttribute('src', nuovoSrc); newIframe.setAttribute('frameborder','0'); newIframe.setAttribute('allow','autoplay; encrypted-media');
    nc.insertBefore(newIframe, nc.firstChild); nc.insertBefore(newBtn, nc.firstChild);
   }
  }
 } else {
  if (btn && btn.parentNode) btn.parentNode.removeChild(btn);
  if (iframes.length > 0 && iframes[0].parentNode) iframes[0].parentNode.removeChild(iframes[0]);
 }

 // Riga dati-pg
 var datiPg = qs('.dati-pg');
 if (datiPg) datiPg.innerHTML = '<span>Classe:</span> <span>'+(d.classe !== '—' ? d.classe : 'Nessuna')+'</span> | <span>Status:</span> <span>'+d.status+'</span> | <span>Livello:</span> <span>'+d.livello+'</span>';

 // Barra EXP
 var expPct = Math.round((parseInt(d.exp) / parseInt(d.exptot)) * 100) || 0;
 var barraExp = qs('.barra-exp'); if (barraExp) barraExp.style.width = expPct + '%';
 var allSpans2 = root[metodo]('span');
 for (var i = 0; i < allSpans2.length; i++) {
  if (allSpans2[i].className === 'dati-pg2' && allSpans2[i].textContent.indexOf('For Level Up') !== -1) {
   allSpans2[i].innerHTML = '<b>'+d.exp+'/'+d.exptot+'</b> For Level Up!'; break;
  }
 }

 // Dati personali
 setEntry('Nome:', d.nome); setEntry('Cognome:', d.cognome); setEntry('Genere:', d.genere); setEntry('Razza:', d.razza);
 if (d.specie) setEntry('Specie:', d.specie);
 if (d.rank && d.rank !== '—') setEntry('Rank di Pericolosità:', d.rank);
 if (d.conservazione && d.conservazione !== '—') setEntry('Stato di Conservazione:', d.conservazione);
 setEntry('Luogo di nascita:', d.luogo); setEntry('Data di nascita:', d.datanascita);
 setEntry('Segno zodiacale:', d.segno); setEntry('Segno zodiacale cinese:', d.segnocinese);
 setEntry('MBTI:', d.mbti); setEntry('Allineamento:', d.allineamento); setEntry('Mestiere:', d.mestiere);
 setEntry('Fedina Penale:', d.fedina);
 if (d.fedina === 'Ricercato') { setEntry('Classificazione Taglia:', d.classTaglia); setEntry('Valore Taglia:', d.valTaglia + ' Jenny'); }
 setEntry('Soldi:', d.jenny + ' Jenny / ' + d.hc + ' HC');

 // Apparizioni
 var allSpans3 = root[metodo]('span');
 var appLabelIdx = -1;
 for (var i = 0; i < allSpans3.length; i++) {
  if (allSpans3[i].className === 'scheda-label' && (allSpans3[i].textContent.trim() === 'Apparizioni:' || allSpans3[i].textContent.trim() === 'Quest:')) { appLabelIdx = i; break; }
 }
 if (appLabelIdx !== -1) {
  var appLabel = allSpans3[appLabelIdx];
  var parent = appLabel.parentNode;
  var toRemove = []; var node = appLabel.nextSibling;
  while (node) { var next = node.nextSibling; if (node.nodeType === 1 && node.className === 'scheda-entry') toRemove.push(node); else if (node.nodeType === 3) toRemove.push(node); else break; node = next; }
  for (var r = 0; r < toRemove.length; r++) parent.removeChild(toRemove[r]);
  appLabel['inn'+'erHTML'] = 'Apparizioni:';
  if (d.apparizioni.length > 0) {
   var ref = appLabel.nextSibling;
   for (var q = 0; q < d.apparizioni.length; q++) {
    var sp = document.createElement('span'); sp.className = 'scheda-entry';
    sp.innerHTML = '- <a href="'+d.apparizioni[q].link+'">'+(d.apparizioni[q].nome||'Link')+'</a>';
    parent.insertBefore(sp, ref); var tn = document.createTextNode('\n'); parent.insertBefore(tn, ref);
   }
  } else {
   var sp = document.createElement('span'); sp.className = 'scheda-entry'; sp.textContent = '—';
   parent.insertBefore(sp, appLabel.nextSibling);
  }
 }

 // Aggettivi
 var aggs = qsa('.aggettivo');
 if (aggs[0]) aggs[0].textContent = d.agg1;
 if (aggs[1]) aggs[1].textContent = d.agg2;
 if (aggs[2]) aggs[2].textContent = d.agg3;

 // Citazione
 var citDiv = qs('.info-citazione');
 if (citDiv) { var citSpan = citDiv[metodo]('span'); if (citSpan.length > 0) citSpan[0].textContent = d.citazione; else citDiv.textContent = d.citazione; }

 setEntry('Descrizione:', d.aspetto);
 setEntry('Background:', d.background);
 // Aggiunge classe npc a info-aspetto e info-storia se presenti
 var aspEl = root.querySelector ? root.querySelector('.info-aspetto') : null;
 var stoEl = root.querySelector ? root.querySelector('.info-storia') : null;
 if (aspEl && aspEl.className.indexOf('npc') === -1) aspEl.className += ' npc';
 if (stoEl && stoEl.className.indexOf('npc') === -1) stoEl.className += ' npc';

 // Statistiche
 var mapStat = {'Forza':'forza','Resistenza':'resistenza','Velocità':'velocita','Riflessi':'riflessi','Destrezza':'destrezza','Mira':'mira','Intelligenza':'intelligenza','Carisma':'carisma','Istinto':'istinto','Fortuna':'fortuna','Vita':'vita','Aura':'aura'};
 var statCards = root[metodo]('div');
 for (var i = 0; i < statCards.length; i++) {
  var cn = statCards[i].className;
  if (cn === 'stat-card' || cn === 'stat-card-vitale') {
   var lbl = statCards[i].querySelector ? statCards[i].querySelector('.stat-label') : null;
   var val = statCards[i].querySelector ? statCards[i].querySelector('.stat-value') : null;
   if (lbl && val) {
    var sid = mapStat[lbl.textContent.trim()];
    if (sid) {
     var statVal = d.stat[sid];
     if ((sid === 'vita' || sid === 'aura') && statVal !== '???') {
      val.textContent = parseInt(statVal).toLocaleString();
     } else {
      val.textContent = statVal;
     }
    }
   }
  }
 }

 // Competenze
 var compGrid = qs('.competenze-grid');
 if (compGrid) {
  var nuovoComp = '';
  for (var t = 0; t < 5; t++) {
   var comp = d.competenze[t];
   if (comp && comp.sbloccato) nuovoComp += '<div class="competenza-card"><div class="competenza-header"><span class="competenza-nome">'+comp.nome+'</span><span class="competenza-livello">Lv. '+(comp.lv||'1')+'</span></div><div class="competenza-desc">'+comp.desc+'</div><div class="competenza-oggetto"><span class="competenza-oggetto-label">Oggetto:</span> '+(comp.oggetto||'—')+'</div></div>';
   else nuovoComp += '<div class="competenza-card bloccata"><div class="competenza-bloccata-label"><i class="fa-solid fa-lock"></i> Slot vuoto</div></div>';
  }
  compGrid.innerHTML = nuovoComp;
 }

 // Hatsu / Nen / Tenacia
 setText('.hatsu-card-value', d.hatsu || '—');
 var barreCards = root[metodo]('div');
 for (var i = 0; i < barreCards.length; i++) {
  if (barreCards[i].className === 'barra-card') {
   var lblEl = barreCards[i].querySelector ? barreCards[i].querySelector('.barra-card-label') : null;
   var pctEl = barreCards[i].querySelector ? barreCards[i].querySelector('.barra-card-pct') : null;
   var barEl = barreCards[i].querySelector ? barreCards[i].querySelector('.bc-barra') : null;
   if (lblEl && pctEl) { var nome = lblEl.textContent.trim(); var pct = nome==='Nen'?d.nen:(nome==='Tenacia'?d.tenacia:null); if (pct!==null){pctEl.textContent=pct+'%';if(barEl)barEl.style.width=pct+'%;';} }
  }
 }

 // Rigenera il contenuto del poteri-box con la nuova struttura
 var potieriBox = qs('.poteri-box');
 if (potieriBox) potieriBox.innerHTML = costruisciHTMLPoteriBOX(d);

 // Baule
 var catMap=['armi','equip','oggetti','materiali']; var catTitoli=['Armi','Equipaggiamento','Oggetti Extra','Materiali'];
 var equipBoxes = root[metodo]('div');
 for (var i = 0; i < equipBoxes.length; i++) {
  if (equipBoxes[i].className === 'equip-box') {
   var titleEl = equipBoxes[i].querySelector ? equipBoxes[i].querySelector('.equip-box-title') : null; if (!titleEl) continue;
   var catIdx = catTitoli.indexOf(titleEl.textContent.trim()); if (catIdx === -1) continue;
   var catId = catMap[catIdx]; var tipo = catId; var items = d.baule[catId]; var nuovoLi = '';
   if (items && items.length > 0) { for(var x=0;x<items.length;x++){var itm=items[x];var expNome=itm.expNome||'';var expLink=itm.expLink||'';var expTag=expLink?'<a href="'+expLink+'">'+expNome+'</a>':expNome;var hasExp=!!(expNome||expLink);var info='Qt: '+(itm.qt||'1');if(tipo==='armi'||tipo==='equip')info+=' · Lv. '+(itm.lv||'0')+(hasExp?' · Espansione: '+expTag:'');if(tipo==='oggetti')info+=' · Usi: '+(itm.usi||'0/1')+(hasExp?' · Espansione: '+expTag:'');if(tipo==='materiali'&&hasExp)info+=' · Espansione: '+expTag;var descHtml=itm.desc?'<div class="equip-item-desc">'+itm.desc+'</div>':'';nuovoLi+='<li><span class="equip-item-name">'+itm.nome+'</span> <span class="equip-item-info">'+info+'</span>'+descHtml+'</li>';}}
   var bodyEl = equipBoxes[i].querySelector ? equipBoxes[i].querySelector('.equip-box-body') : null;
   if (bodyEl) bodyEl.innerHTML = '<ul>'+nuovoLi+'</ul>';
  }
 }

 return root.outerHTML;
}

// ============================================================
// HTML SCHEDA NPC (da zero)
// ============================================================
// HELPER: genera il contenuto interno del poteri-box (usato
// sia da costruisciHTMLSchedaNpc che da aggiornaHTMLSchedaNpc)
// ============================================================
function costruisciHTMLPoteriBOX(d) {
 function nenCard(titolo, campi) {
  var s = '<div class="nen-card"><span class="nen-card-title">'+titolo+'</span><br>';
  for (var ci=0;ci<campi.length;ci++) {
   s += '<span class="scheda-label">'+campi[ci].label+'</span> <span class="scheda-entry">'+campi[ci].val+'</span><br>';
  }
  return s + '</div>';
 }
 function boxTecniche(titolo, tecniche) {
  var s = '<div class="nen-box"><div class="nen-box-header"><span class="nen-box-title">'+titolo+'</span></div><div class="nen-box-body">';
  if (tecniche && tecniche.length > 0) {
   for (var ti=0;ti<tecniche.length;ti++) {
    s += nenCard(tecniche[ti].nome, [
     {label:'Descrizione:', val:tecniche[ti].desc},
     {label:'Bonus:', val:tecniche[ti].bonus},
     {label:'Condizioni e/o Restrizioni e/o Malus:', val:tecniche[ti].malus},
     {label:'Costo per Fase:', val:tecniche[ti].costo}
    ]);
   }
  } else { s += '<span class="scheda-entry">—</span>'; }
  return s + '</div></div>';
 }

 // Box 1: Potere Nen
 var htmlBox1 = '<div class="nen-box"><div class="nen-box-header"><span class="nen-box-title">'+(d.hatsu||'—')+'</span></div><div class="nen-box-body">';
 if (d.nenPotere) {
  htmlBox1 +=
   '<span class="scheda-label">Nome potere:</span> <span class="scheda-entry">'+(d.nenPotere.nomepotere||'—')+'</span><br>' +
   '<span class="scheda-label">Descrizione:</span> <span class="scheda-entry">'+(d.nenPotere.descrizione||'—')+'</span><br>' +
   '<span class="scheda-label">Funzionamento e regole:</span> <span class="scheda-entry">'+(d.nenPotere.funzionamento||'—')+'</span><br>' +
   '<span class="scheda-label">Condizioni e restrizioni:</span> <span class="scheda-entry">'+(d.nenPotere.condizioni||'—')+'</span>';
 } else { htmlBox1 += '<span class="scheda-entry">—</span>'; }
 htmlBox1 += '</div></div>';

 // Immagine nen
 var htmlNenImg = d.nenImg ? cropImg(d.nenImg, d.nenImgX||0, d.nenImgY||0, d.nenImgW||100, d.nenImgH||100, 'nen-img') : '';

 // Box 2: Profili (omesso in Speed Duel)
 var htmlBox2 = '';
 if (d.nenModo !== 'speedduel') {
  htmlBox2 = '<div class="nen-box"><div class="nen-box-header"><span class="nen-box-title">Profili</span></div><div class="nen-box-body">';
  if (d.profili && d.profili.length > 0) {
   for (var pi=0;pi<d.profili.length;pi++) {
    var pr = d.profili[pi];
    htmlBox2 += nenCard('Profilo '+(pi+1)+' \u2014 '+pr.nome, [
     {label:'Descrizione:', val:pr.desc},
     {label:'Bonus:', val:pr.bonus},
     {label:'Condizioni e/o Restrizioni e/o Malus:', val:pr.malus},
     {label:'Costo per Fase:', val:pr.costo}
    ]);
   }
  } else { htmlBox2 += '<span class="scheda-entry">—</span>'; }
  htmlBox2 += '</div></div>';
 }

 return htmlBox1 + htmlNenImg + htmlBox2 +
  boxTecniche('Tecniche 25%', d.tecniche25) +
  boxTecniche('Tecniche 50%', d.tecniche50) +
  boxTecniche('Tecnica Finale 100%', d.tecniche100);
}

// ============================================================
function costruisciHTMLSchedaNpc(d, classeContenitore, classeOriginale, styleOriginale) {
 var expPct = Math.round((parseInt(d.exp) / parseInt(d.exptot)) * 100) || 0;

 var divApri;
 if (classeOriginale) {
  divApri = '<div class="' + classeOriginale + '"' + (styleOriginale ? ' style="' + styleOriginale + '"' : '') + '>';
 } else if (classeContenitore) {
  divApri = '<div class="' + classeContenitore + '">';
 } else {
  divApri = '<div>';
 }

 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna'];
 var nomiStat = ['Forza','Resistenza','Velocità','Riflessi','Destrezza','Mira','Intelligenza','Carisma','Istinto','Fortuna'];

 // Stats
 var htmlStats = '';
 for (var i=0;i<ls.length;i++) {
  htmlStats += '<div class="stat-card"><span class="stat-label">'+nomiStat[i]+'</span><span class="stat-value">'+d.stat[ls[i]]+'</span></div>';
 }

 // Competenze — slot vuoti invece di "bloccati"
 var htmlComp = '';
 for (var t=0;t<5;t++) {
  var comp=d.competenze[t];
  if (comp&&comp.sbloccato) htmlComp += '<div class="competenza-card"><div class="competenza-header"><span class="competenza-nome">'+comp.nome+'</span><span class="competenza-livello">Lv. '+(comp.lv||'1')+'</span></div><div class="competenza-desc">'+comp.desc+'</div><div class="competenza-oggetto"><span class="competenza-oggetto-label">Oggetto:</span> '+(comp.oggetto||'—')+'</div></div>';
  else htmlComp += '<div class="competenza-card bloccata"><div class="competenza-bloccata-label"><i class="fa-solid fa-minus"></i> Slot vuoto</div></div>';
 }

 // Apparizioni
 var htmlApparizioni = '';
 if (d.apparizioni && d.apparizioni.length > 0) {
  for (var q=0;q<d.apparizioni.length;q++) htmlApparizioni += '<span class="scheda-entry">- <a href="'+d.apparizioni[q].link+'">'+(d.apparizioni[q].nome||'Link')+'</a></span>\n';
 }

 // Campi extra nella slide dati
 var htmlCampiExtra = '';
 if (d.campiExtra && d.campiExtra.length > 0) {
  for (var ce=0;ce<d.campiExtra.length;ce++) {
   htmlCampiExtra += '<span class="scheda-label">'+d.campiExtra[ce].label+'</span> <span class="scheda-entry">'+d.campiExtra[ce].valore+'</span>\n';
  }
 }

 // Nen — usa la funzione helper condivisa
 var htmlNen = '<div class="hatsu-card"><div><span class="hatsu-card-label">Hatsu</span><span class="hatsu-card-value">'+(d.hatsu||'—')+'</span></div><i class="mdi mdi-fire hatsu-card-icon"></i></div>' +
  '<div class="barre-row">' +
  '<div class="barra-card"><div class="barra-card-header"><span class="barra-card-label">Nen</span><span class="barra-card-pct">'+d.nen+'%</span></div><div class="bc-container"><div class="bc-barra bc-nen barra-pg" style="width:'+d.nen+'%;"></div></div></div>' +
  '<div class="barra-card"><div class="barra-card-header"><span class="barra-card-label">Tenacia</span><span class="barra-card-pct">'+d.tenacia+'%</span></div><div class="bc-container"><div class="bc-barra bc-tenacia barra-pg" style="width:'+d.tenacia+'%;"></div></div></div>' +
  '</div>' +
  '<div class="titolo-poteri-box">POTERE NEN</div>' +
  '<div class="poteri-box">' + costruisciHTMLPoteriBOX(d) + '</div>';

 // Musica
 var htmlMusica = '';
 if (d.musica) { var mSrc = d.musicaPiattaforma === 'soundcloud' ? 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'+d.musica : 'https://www.youtube.com/embed/'+d.musica+'?enablejsapi=1'; htmlMusica = '<i'+'frame style="display: none;" src="'+mSrc+'" frameborder="0" allow="autoplay; encrypted-media"></'+'iframe>'; }

 // Baule
 function htmlBauleCategoria(titolo, items, tipo) {
  var li = '';
  if (items&&items.length>0) { for(var x=0;x<items.length;x++){var itm=items[x];var expNome=itm.expNome||'';var expLink=itm.expLink||'';var expTag=expLink?'<a href="'+expLink+'">'+expNome+'</a>':expNome;var hasExp=!!(expNome||expLink);var info='Qt: '+(itm.qt||'1');if(tipo==='armi'||tipo==='equip')info+=' · Lv. '+(itm.lv||'0')+(hasExp?' · Espansione: '+expTag:'');if(tipo==='oggetti')info+=' · Usi: '+(itm.usi||'0/1')+(hasExp?' · Espansione: '+expTag:'');if(tipo==='materiali'&&hasExp)info+=' · Espansione: '+expTag;var descHtml=itm.desc?'<div class="equip-item-desc">'+itm.desc+'</div>':'';li+='<li><span class="equip-item-name">'+itm.nome+'</span> <span class="equip-item-info">'+info+'</span>'+descHtml+'</li>';}}
  return '<div class="equip-box"><div class="equip-box-header"><span class="equip-box-title">'+titolo+'</span></div><div class="equip-box-body"><ul>'+li+'</ul></div></div>';
 }

 // Slide extra
 var htmlSlideExtra = '';
 var bottoneSlideExtra = '';
 var nomeSlideExtra = '';
 if (d.slideExtraTipo && d.slideExtraTipo !== 'nessuna') {
  var idx = 5; // indice slide (dopo le 5 standard: Dati, Info, Statistiche, Abilità, Baule)
  if (d.slideExtraTipo === 'moveset') {
   nomeSlideExtra = 'Moveset';
   bottoneSlideExtra = '<div class="bottone-nav" onclick="mostraSlide(this,'+idx+')"><b>Moveset</b></div>';
   var sd = d.slideExtraData;
   var htmlAttacchi = '';
   if (sd.attacchi && sd.attacchi.length > 0) { for(var ai=0;ai<sd.attacchi.length;ai++) htmlAttacchi+='<div class="entry-block"><span class="scheda-label">'+sd.attacchi[ai].nome+':</span> <span class="scheda-entry">'+(sd.attacchi[ai].desc||'—')+'</span></div>'; }
   else htmlAttacchi = '<span class="scheda-entry">—</span>';
   var htmlDifese = '';
   if (sd.difese && sd.difese.length > 0) { for(var di=0;di<sd.difese.length;di++) htmlDifese+='<div class="entry-block"><span class="scheda-label">'+sd.difese[di].nome+':</span> <span class="scheda-entry">'+(sd.difese[di].desc||'—')+'</span></div>'; }
   else htmlDifese = '<span class="scheda-entry">—</span>';
   htmlSlideExtra =
    '<div class="slide-pg"><div class="slide-moveset">' +
    '<div class="box-npc box-npc-fixed"><div class="box-npc-header"><span class="box-npc-title">Attribuzione Punti</span></div><div class="box-npc-body">' +
    '<span class="scheda-label">Colpo Valido:</span> <span class="scheda-entry">'+(sd.colpovalido||'—')+'</span><br>' +
    '<span class="scheda-label">Colpo Critico:</span> <span class="scheda-entry">'+(sd.colpocritico||'—')+'</span><br>' +
    '<span class="scheda-label">Punti Garantiti:</span> <span class="scheda-entry">'+(sd.garantiti||'—')+'</span>' +
    '</div></div>' +
    '<div class="box-npc"><div class="box-npc-header"><span class="box-npc-title">Attacchi</span></div><div class="box-npc-body">'+htmlAttacchi+'</div></div>' +
    '<div class="box-npc"><div class="box-npc-header"><span class="box-npc-title">Difese</span></div><div class="box-npc-body">'+htmlDifese+'</div></div>' +
    '</div></div>';
  } else if (d.slideExtraTipo === 'valutazioni') {
   nomeSlideExtra = 'Valutazioni';
   bottoneSlideExtra = '<div class="bottone-nav" onclick="mostraSlide(this,'+idx+')"><b>Valutazioni</b></div>';
   var sd = d.slideExtraData;
   var htmlVoci = '';
   if (sd.voci && sd.voci.length > 0) {
    for (var vi=0;vi<sd.voci.length;vi++) {
     var stelleHtml = '';
     for (var sn=1;sn<=5;sn++) stelleHtml += sn<=sd.voci[vi].stelle ? '<span class="stella-on">★</span>' : '<span class="stella-off">★</span>';
     htmlVoci += '<div class="val-card"><span class="val-card-label">'+sd.voci[vi].nome+'</span><div class="stelle-fisse">'+stelleHtml+'</div></div>';
    }
   } else htmlVoci = '<span class="scheda-entry">—</span>';
   htmlSlideExtra =
    '<div class="slide-pg"><div class="slide-valutazioni">' +
    '<div class="val-titolo">'+(sd.titolo||'Valutazione degli Esaminatori')+'</div>' +
    htmlVoci +
    (sd.verdetto ? '<div class="val-titolo" style="margin-top:8px;">'+sd.verdetto+'</div>' : '') +
    '</div></div>';
  } else if (d.slideExtraTipo === 'altro') {
   nomeSlideExtra = 'Altro';
   bottoneSlideExtra = '<div class="bottone-nav" onclick="mostraSlide(this,'+idx+')"><b>Altro</b></div>';
   var sd = d.slideExtraData;
   var htmlCampiAltro = '';
   if (sd.campi && sd.campi.length > 0) { for(var ci=0;ci<sd.campi.length;ci++) htmlCampiAltro+='<span class="scheda-label">'+sd.campi[ci].label+'</span> <span class="scheda-entry">'+sd.campi[ci].valore+'</span><br>'; }
   else htmlCampiAltro = '<span class="scheda-entry">—</span>';
   htmlSlideExtra =
    '<div class="slide-pg"><div class="slide-altro">' +
    '<div class="box-npc"><div class="box-npc-header"><span class="box-npc-title">Informazioni Extra</span></div><div class="box-npc-body">'+htmlCampiAltro+'</div></div>' +
    '</div></div>';
  }
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
  bottoneSlideExtra +
  '</div>' +
  '<div class="scheda-slide">' +

  // SLIDE DATI
  '<div class="slide-pg"><div class="slide-dati">' +
  (d.livello !== null
   ? '<div class="dati-pg"><span>Classe:</span> <span>'+(d.classe !== null && d.classe !== '—' ? d.classe : 'Nessuna')+'</span> | <span>Status:</span> <span>'+(d.status||'Nessuno')+'</span> | <span>Livello:</span> <span>'+d.livello+'</span></div>' +
     '<div class="dati-exp-row"><span class="dati-pg2">Exp</span><div class="container-barra"><div class="barra-pg barra-exp" style="width:'+expPct+'%; height:100%;"></div></div><span class="dati-pg2"><b>'+(d.exp||0)+'/'+d.exptot+'</b> For Level Up!</span></div>'
   : '') +
  '<div class="img-dati">'+cropImg(d.imgDati,d.imgDatiX||0,d.imgDatiY||0,d.imgDatiW||100,d.imgDatiH||100)+'</div>' +
  '<div class="div-dati">' +
  '<span class="scheda-label">Nome:</span> <span class="scheda-entry">'+d.nome+'</span>\n' +
  '<span class="scheda-label">Cognome:</span> <span class="scheda-entry">'+d.cognome+'</span>\n' +
  (d.genere !== null ? '<span class="scheda-label">Genere:</span> <span class="scheda-entry">'+d.genere+'</span>\n' : '') +
  '<span class="scheda-label">Razza:</span> <span class="scheda-entry">'+d.razza+'</span>\n' +
  (d.specie ? '<span class="scheda-label">Specie:</span> <span class="scheda-entry">'+d.specie+'</span>\n' : '') +
  (d.rank && d.rank !== '—' ? '<span class="scheda-label">Rank di Pericolosità:</span> <span class="scheda-entry">'+d.rank+'</span>\n' : '') +
  (d.conservazione && d.conservazione !== '—' ? '<span class="scheda-label">Stato di Conservazione:</span> <span class="scheda-entry">'+d.conservazione+'</span>\n' : '') +
  (d.luogo !== null ? '<span class="scheda-label">Luogo di nascita:</span> <span class="scheda-entry">'+d.luogo+'</span>\n' : '') +
  (d.datanascita !== null ? '<span class="scheda-label">Data di nascita:</span> <span class="scheda-entry">'+d.datanascita+'</span>\n' : '') +
  (d.segno !== null ? '<span class="scheda-label">Segno zodiacale:</span> <span class="scheda-entry">'+d.segno+'</span>\n' : '') +
  (d.segnocinese !== null ? '<span class="scheda-label">Segno zodiacale cinese:</span> <span class="scheda-entry">'+d.segnocinese+'</span>\n' : '') +
  (d.mbti !== null ? '<span class="scheda-label">MBTI:</span> <span class="scheda-entry">'+d.mbti+'</span>\n' : '') +
  (d.allineamento !== null ? '<span class="scheda-label">Allineamento:</span> <span class="scheda-entry">'+d.allineamento+'</span>\n' : '') +
  (d.mestiere !== null ? '<span class="scheda-label">Mestiere:</span> <span class="scheda-entry">'+d.mestiere+'</span>\n' : '') +
  (d.classe !== null ? '<span class="scheda-label">Classe:</span> <span class="scheda-entry">'+(d.classe !== '—' ? d.classe : 'Nessuna')+'</span>\n' : '') +
  (d.fedina !== null ? '<span class="scheda-label">Fedina Penale:</span> <span class="scheda-entry">'+d.fedina+'</span>\n' : '') +
  (d.fedina === 'Ricercato' ? '<span class="scheda-label">Classificazione Taglia:</span> <span class="scheda-entry">'+d.classTaglia+'</span>\n' + '<span class="scheda-label">Valore Taglia:</span> <span class="scheda-entry">'+d.valTaglia+' Jenny</span>\n' : '') +
  (d.jenny !== null ? '<span class="scheda-label">Soldi:</span> <span class="scheda-entry">'+d.jenny+' Jenny / '+d.hc+' HC</span>\n' : '') +
  htmlCampiExtra +
  (htmlApparizioni ? '<span class="scheda-label">Apparizioni:</span> '+htmlApparizioni : '<span class="scheda-label">Apparizioni:</span> <span class="scheda-entry">—</span>') +
  '</div></div></div>' +

  // SLIDE INFO (senza immagini, classi npc su aspetto e storia)
  '<div class="slide-pg"><div class="slide-info">' +
  '<div class="info-aggettivi"><span class="aggettivo">'+d.agg1+'</span><span class="info-sep"></span><span class="aggettivo">'+d.agg2+'</span><span class="info-sep"></span><span class="aggettivo">'+d.agg3+'</span></div>' +
  '<div class="info-citazione"><span>'+d.citazione+'</span></div>' +
  '<div class="info-aspetto npc"><span class="scheda-label">Descrizione:</span> <span class="scheda-entry">'+d.aspetto+'</span></div>' +
  '<div class="info-storia npc"><span class="scheda-label">Background:</span> <span class="scheda-entry">'+d.background+'</span></div>' +
  '</div></div>' +

  // SLIDE STATISTICHE
  '<div class="slide-pg"><div class="slide-statistiche">' +
  '<div class="stats-grid">'+htmlStats+'</div>' +
  '<div class="stats-vitali"><div class="stat-card-vitale"><span class="stat-label">Vita</span><span class="stat-value">'+(d.stat.vita==='???' ? '???' : parseInt(d.stat.vita).toLocaleString())+'</span></div><div class="stat-card-vitale"><span class="stat-label">Aura</span><span class="stat-value">'+(d.stat.aura==='???' ? '???' : parseInt(d.stat.aura).toLocaleString())+'</span></div></div>' +
  '<div class="stats-sep">&#9670; &#9670; &#9670;</div>' +
  '<div class="competenze-grid">'+htmlComp+'</div>' +
  '</div></div>' +

  // SLIDE ABILITÀ
  '<div class="slide-pg"><div class="slide-poteri">' +
  '<div class="div-poteri">'+htmlNen+'</div>' +
  '</div></div>' +

  // SLIDE BAULE
  '<div class="slide-pg"><div class="slide-equip">' +
  htmlBauleCategoria('Armi',d.baule.armi,'armi') +
  htmlBauleCategoria('Equipaggiamento',d.baule.equip,'equip') +
  htmlBauleCategoria('Oggetti Extra',d.baule.oggetti,'oggetti') +
  htmlBauleCategoria('Materiali',d.baule.materiali,'materiali') +
  '</div></div>' +

  // SLIDE EXTRA (opzionale)
  htmlSlideExtra +

  '</div>' +
  '<div class="scheda-copyright"><a href="https://hxhforumgdr.forumcommunity.net/">Hunter x Hunter Forum - GDR Remastered</a></div>' +
  '</div></div>';
}
