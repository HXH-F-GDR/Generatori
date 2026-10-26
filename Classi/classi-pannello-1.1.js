// ============================================================
// PANNELLO CLASSI 1.1
// La parte fissa (intestazione, box, modulo nuova classe) sta nella
// pagina: lo script riempie solo l'elenco (#pc-root) e il contatore (#pc-conta).
// Pagina staff per limite di posti, posti occupati, periodo e
// chiusura manuale di ogni classe. Ogni modifica si salva subito
// su Firebase (nodo "classi") via REST.
// Richiede classi-core, caricato prima di questo file.
// ============================================================

var PC = { dati: null };

// ------------------------------------------------------------
// Staff (stessa logica del generatore: override, HxHFramework, body)
// ------------------------------------------------------------
function pcStaff() {
 var ov;
 try { ov = localStorage.getItem('af_staff_override'); } catch (e) { ov = null; }
 if (ov === '1') return true;
 if (ov === '0') return false;
 if (window.HxHFramework && window.HxHFramework.groups && window.HxHFramework.groups.isStaff) {
  try { if (window.HxHFramework.groups.isStaff()) return true; } catch (e) {}
 }
 var c = document.body.className || '';
 var staff = /\badmin\b/.test(c) || /\b(g1|g2|g3|g4)\b/.test(c);
 return staff;
}

// ------------------------------------------------------------
// Utilità
// ------------------------------------------------------------
function pcEsc(t) {
 var s = String(t === undefined || t === null ? '' : t);
 s = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
 return s;
}

function pcRoot() {
 var el = document.getElementById('pc-root');
 return el;
}

function pcScrivi(html) {
 var r = pcRoot();
 if (r) r['inn' + 'erHTML'] = html;
}

// Richiesta REST a Firebase sotto il nodo classi
function pcRichiesta(metodo, percorso, corpo) {
 var opzioni = { method: metodo };
 if (corpo !== undefined) opzioni.body = JSON.stringify(corpo);
 var p = fetch(CLASSI_DB_URL + percorso + '.json', opzioni).then(function (r) {
  if (!r.ok) throw new Error('HTTP ' + r.status);
  var j = r.json();
  return j;
 });
 return p;
}

function pcToast(testo, errore) {
 var box = document.getElementById('pc-toast');
 if (!box) {
  box = document.createElement('div');
  box.id = 'pc-toast';
  var wrap = document.getElementById('pannello-classi') || document.body;
  wrap['append' + 'Child'](box);
 }
 box.textContent = testo;
 box.className = errore ? 'pc-toast-errore' : '';
 box.style.display = 'block';
 clearTimeout(box._t);
 box._t = setTimeout(function () { box.style.display = 'none'; }, errore ? 4000 : 1600);
}

// "3/9" → "03/09"
function pcFormattaData(t) {
 var m = String(t || '').match(/^\s*(\d{1,2})\s*\/\s*(\d{1,2})\s*$/);
 if (!m) return '';
 var g = m[1].length === 1 ? '0' + m[1] : m[1];
 var me = m[2].length === 1 ? '0' + m[2] : m[2];
 var out = g + '/' + me;
 return out;
}

function pcClasse(id) {
 var c = classiNorm(PC.dati[id]);
 c.id = id;
 return c;
}

// ------------------------------------------------------------
// Avvio e caricamento
// ------------------------------------------------------------
function pcAvvia() {
 // Bottoni fissi della pagina
 var ric = document.getElementById('pc-ricarica');
 var agg = document.getElementById('pc-aggiungi');
 if (ric) ric.addEventListener('click', pcCarica);
 if (agg) agg.addEventListener('click', pcAggiungi);
 pcScrivi('<div class="pc-vuoto"><i class="fa-solid fa-circle-notch fa-spin"></i> Caricamento…</div>');
 var n = 0;
 function prova() {
  if (pcStaff()) { pcCarica(); return; }
  n++;
  if (n > 24) {
   pcScrivi('<div class="pc-vuoto"><i class="fa-solid fa-lock"></i> Pagina riservata allo staff.</div>');
   return;
  }
  setTimeout(prova, 250);
 }
 prova();
}

function pcCarica() {
 pcScrivi('<div class="pc-vuoto"><i class="fa-solid fa-circle-notch fa-spin"></i> Caricamento delle classi…</div>');
 classiCarica(function (dati, ok, grezzo) {
  if (!ok) {
   pcScrivi('<div class="pc-vuoto"><i class="fa-solid fa-triangle-exclamation"></i> Impossibile leggere i dati da Firebase.<br><br><button type="button" class="pc-btn" onclick="pcCarica()"><i class="fa-solid fa-rotate"></i> Riprova</button></div>');
   return;
  }
  PC.dati = (grezzo && typeof grezzo === 'object') ? grezzo : {};
  pcDisegna();
 });
}

// ------------------------------------------------------------
// Disegno
// ------------------------------------------------------------
function pcChip(c) {
 var st = classiStato(c);
 var cls = 'pc-chip-ok', txt = '';
 if (st.motivo === 'chiusa') { cls = 'pc-chip-no'; txt = 'Chiusa'; }
 else if (st.motivo === 'fuori-periodo') { cls = 'pc-chip-attesa'; txt = 'Fuori periodo'; }
 else if (st.motivo === 'completa') { cls = 'pc-chip-no'; txt = 'Completa'; }
 else if (c.limite > 0) {
  var lib = c.limite - c.occupati;
  txt = 'Disponibile · ' + lib + (lib === 1 ? ' posto libero' : ' posti liberi');
 } else {
  txt = 'Disponibile · senza limite';
 }
 var out = '<span class="pc-chip ' + cls + '">' + txt + '</span>';
 return out;
}

function pcCard(c, i, tot) {
 var id = c.id;
 var q = "'" + id + "'";
 var h = '<table class="pc-card" id="pc-card-' + id + '"><tr>';
 h += '<td class="pc-fn">' + (i + 1) + '</td><td class="pc-corpo">';
 // Testata: nome, stato, azioni
 h += '<table class="pc-head"><tr>';
 h += '<td class="pc-head-nome"><input type="text" class="pc-input pc-nome" value="' + pcEsc(c.nome) + '" onchange="pcSalvaCampo(' + q + ',\'nome\',this)"></td>';
 h += '<td class="pc-head-azioni">';
 h += '<button type="button" class="pc-icona" title="Sposta su" onclick="pcSposta(' + q + ',-1)"' + (i === 0 ? ' disabled' : '') + '><i class="fa-solid fa-arrow-up"></i></button>';
 h += '<button type="button" class="pc-icona" title="Sposta giù" onclick="pcSposta(' + q + ',1)"' + (i === tot - 1 ? ' disabled' : '') + '><i class="fa-solid fa-arrow-down"></i></button>';
 h += '<button type="button" class="pc-icona" title="Elimina" onclick="pcElimina(' + q + ')"><i class="fa-solid fa-trash-can"></i></button>';
 h += '</td></tr></table>';
 h += '<div class="pc-stato" id="pc-chip-' + id + '">' + pcChip(c) + '</div>';
 // Campi
 h += '<div class="pc-campi">';
 h += '<div class="pc-cella"><label class="pc-label">Limite posti</label>';
 h += '<input type="number" min="0" step="1" class="pc-input pc-centro" value="' + c.limite + '" onchange="pcSalvaCampo(' + q + ',\'limite\',this)">';
 h += '<span class="pc-nota">0 = nessun limite</span></div>';
 h += '<div class="pc-cella"><label class="pc-label">Posti occupati</label>';
 h += '<table class="pc-step"><tr>';
 h += '<td class="pc-step-btn"><button type="button" class="pc-icona" onclick="pcStep(' + q + ',-1)">&#8722;</button></td>';
 h += '<td><input type="number" min="0" step="1" class="pc-input pc-centro" id="pc-occupati-' + id + '" value="' + c.occupati + '" onchange="pcSalvaCampo(' + q + ',\'occupati\',this)"></td>';
 h += '<td class="pc-step-btn"><button type="button" class="pc-icona" onclick="pcStep(' + q + ',1)">+</button></td>';
 h += '</tr></table></div>';
 h += '<div class="pc-cella"><label class="pc-label">Periodo (gg/mm)</label>';
 h += '<table class="pc-periodo"><tr>';
 h += '<td><input type="text" class="pc-input pc-centro" placeholder="dal" value="' + pcEsc(c.da) + '" onchange="pcSalvaCampo(' + q + ',\'da\',this)"></td>';
 h += '<td class="pc-trattino">–</td>';
 h += '<td><input type="text" class="pc-input pc-centro" placeholder="al" value="' + pcEsc(c.a) + '" onchange="pcSalvaCampo(' + q + ',\'a\',this)"></td>';
 h += '</tr></table><span class="pc-nota">Vuoto = sempre disponibile</span></div>';
 h += '<div class="pc-cella"><label class="pc-label">Chiusura manuale</label>';
 h += '<label class="pc-check"><input type="checkbox"' + (c.chiusa ? ' checked' : '') + ' onchange="pcSalvaCampo(' + q + ',\'chiusa\',this)"> Classe chiusa</label>';
 h += '<span class="pc-nota">Non sceglibile anche con posti liberi</span></div>';
 h += '</div></td></tr></table>';
 return h;
}

function pcDisegna() {
 var lista = classiOrdinate(PC.dati);
 var conta = document.getElementById('pc-conta');
 if (conta) conta.textContent = lista.length ? '(' + lista.length + ')' : '';
 var h = '';
 if (!lista.length) {
  h += '<div class="pc-vuoto">Su Firebase non ci sono ancora classi.<br><br>';
  h += '<button type="button" class="pc-btn pc-btn-pieno" onclick="pcInizializza()"><i class="fa-solid fa-download"></i> Carica i valori iniziali</button></div>';
 }
 for (var i = 0; i < lista.length; i++) h += pcCard(lista[i], i, lista.length);
 pcScrivi(h);
}

function pcAggiornaChip(id) {
 var td = document.getElementById('pc-chip-' + id);
 if (td) td['inn' + 'erHTML'] = pcChip(pcClasse(id));
}

// ------------------------------------------------------------
// Modifiche
// ------------------------------------------------------------
function pcSalvaCampo(id, campo, el) {
 var c = PC.dati[id];
 if (!c) return;
 var valore;
 if (campo === 'chiusa') {
  valore = !!el.checked;
 } else if (campo === 'limite' || campo === 'occupati') {
  valore = parseInt(el.value, 10);
  if (isNaN(valore) || valore < 0) valore = 0;
  el.value = valore;
 } else if (campo === 'da' || campo === 'a') {
  var t = el.value.trim();
  if (t !== '' && classiGiornoAnno(t) === null) {
   alert('Scrivi la data come gg/mm, per esempio 28/10.');
   el.value = c[campo] || '';
   return;
  }
  valore = pcFormattaData(t);
  el.value = valore;
 } else if (campo === 'nome') {
  valore = el.value.trim();
  if (!valore) { alert('Il nome non può essere vuoto.'); el.value = c.nome; return; }
 } else {
  return;
 }
 var vecchio = c[campo];
 c[campo] = valore;
 pcAggiornaChip(id);
 pcRichiesta('PUT', '/' + id + '/' + campo, valore)
  .then(function () { pcToast('Salvato'); })
  .catch(function (e) {
   console.error('[Pannello classi]', e);
   c[campo] = vecchio;
   pcToast('Errore nel salvataggio: modifica annullata', true);
   pcDisegna();
  });
}

function pcStep(id, delta) {
 var el = document.getElementById('pc-occupati-' + id);
 if (!el) return;
 var v = (parseInt(el.value, 10) || 0) + delta;
 if (v < 0) v = 0;
 el.value = v;
 pcSalvaCampo(id, 'occupati', el);
}

function pcSposta(id, dir) {
 var lista = classiOrdinate(PC.dati);
 var idx = -1;
 for (var i = 0; i < lista.length; i++) if (lista[i].id === id) idx = i;
 var j = idx + dir;
 if (idx === -1 || j < 0 || j >= lista.length) return;
 var tmp = lista[idx]; lista[idx] = lista[j]; lista[j] = tmp;
 // Rinumera tutto da 1, così non restano ordini doppi
 var patch = {};
 for (var k = 0; k < lista.length; k++) {
  PC.dati[lista[k].id].ordine = k + 1;
  patch[lista[k].id + '/ordine'] = k + 1;
 }
 pcDisegna();
 pcRichiesta('PATCH', '', patch)
  .then(function () { pcToast('Ordine salvato'); })
  .catch(function (e) { console.error('[Pannello classi]', e); pcToast('Errore nel salvataggio dell\'ordine', true); pcCarica(); });
}

function pcElimina(id) {
 var c = PC.dati[id];
 if (!c) return;
 if (!confirm('Eliminare la classe "' + c.nome + '"?\nNon comparirà più nel generatore né nel regolamento. Le schede che la usano non cambiano.')) return;
 pcRichiesta('DELETE', '/' + id)
  .then(function () { delete PC.dati[id]; pcDisegna(); pcToast('Classe eliminata'); })
  .catch(function (e) { console.error('[Pannello classi]', e); pcToast('Errore: classe non eliminata', true); });
}

function pcAggiungi() {
 var nEl = document.getElementById('pc-nuova-nome');
 var lEl = document.getElementById('pc-nuova-limite');
 var nome = nEl ? nEl.value.trim() : '';
 if (!nome) { alert('Scrivi il nome della classe.'); return; }
 var lista = classiOrdinate(PC.dati);
 for (var i = 0; i < lista.length; i++) {
  if (lista[i].nome.toLowerCase() === nome.toLowerCase()) { alert('Esiste già una classe con questo nome.'); return; }
 }
 var base = classiSlug(nome), id = base, n = 2;
 while (PC.dati[id]) { id = base + '-' + n; n++; }
 var limite = lEl ? (parseInt(lEl.value, 10) || 0) : 0;
 if (limite < 0) limite = 0;
 var voce = { nome: nome, ordine: lista.length + 1, limite: limite, occupati: 0, chiusa: false, da: '', a: '' };
 pcRichiesta('PUT', '/' + id, voce)
  .then(function () { PC.dati[id] = voce; nEl.value = ''; pcDisegna(); pcToast('Classe aggiunta'); })
  .catch(function (e) { console.error('[Pannello classi]', e); pcToast('Errore: classe non aggiunta', true); });
}

function pcInizializza() {
 if (!confirm('Caricare su Firebase le classi con i valori iniziali?')) return;
 var dati = classiCopia(CLASSI_INIZIALI);
 pcRichiesta('PUT', '', dati)
  .then(function () { PC.dati = dati; pcDisegna(); pcToast('Classi caricate'); })
  .catch(function (e) { console.error('[Pannello classi]', e); pcToast('Errore nel caricamento', true); });
}

(function () {
 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', pcAvvia);
 else pcAvvia();
})();
