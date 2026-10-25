// ============================================================
// CLASSI CORE 1.0
// Elenco delle classi con limite di posti, posti occupati, periodo
// di disponibilità e chiusura manuale. I dati stanno su Firebase
// (nodo "classi") e si leggono via REST.
// Usato da: generatore schede PG, regolamento, pannello staff.
// Va caricato PRIMA degli script che lo usano.
//
// Struttura su Firebase, una voce per classe (chiave = slug):
// classi/wild-soul: { nome, ordine, limite, occupati, chiusa, da, a }
//  limite   0 = nessun limite
//  da / a   periodo in cui la classe è sceglibile, "gg/mm"
//           (vuoti = sempre). Il periodo può scavalcare l'anno.
//  chiusa   true = non sceglibile anche con posti liberi
// ============================================================

var CLASSI_DB_URL = 'https://compleanni-4035c-default-rtdb.europe-west1.firebasedatabase.app/classi';
var CLASSI_CACHE_KEY = 'hxh_classi_cache';

// Valori di partenza. Servono per inizializzare Firebase dal pannello
// e come riserva se Firebase non risponde e non c'è niente in cache.
var CLASSI_INIZIALI = {
 'aspiring-hunter':        { nome: 'Aspiring Hunter',           ordine: 1,  limite: 0,  occupati: 0, chiusa: false, da: '',      a: '' },
 'wild-soul':              { nome: 'Wild Soul',                 ordine: 2,  limite: 10, occupati: 7, chiusa: false, da: '',      a: '' },
 'silent-killer':          { nome: 'Silent Killer',             ordine: 3,  limite: 10, occupati: 6, chiusa: false, da: '',      a: '' },
 'martial-artist':         { nome: 'Martial Artist',            ordine: 4,  limite: 10, occupati: 5, chiusa: false, da: '',      a: '' },
 'kuruta':                 { nome: 'Descendant of Kuruta Clan', ordine: 5,  limite: 5,  occupati: 5, chiusa: false, da: '',      a: '' },
 'illusionist':            { nome: 'Illusionist',               ordine: 6,  limite: 10, occupati: 3, chiusa: false, da: '',      a: '' },
 'ramingo':                { nome: 'Ramingo',                   ordine: 7,  limite: 10, occupati: 9, chiusa: false, da: '',      a: '' },
 'hacker':                 { nome: 'Hacker',                    ordine: 8,  limite: 10, occupati: 1, chiusa: false, da: '',      a: '' },
 'doctor':                 { nome: 'Doctor',                    ordine: 9,  limite: 10, occupati: 1, chiusa: false, da: '',      a: '' },
 'outlaw':                 { nome: 'Outlaw',                    ordine: 10, limite: 10, occupati: 3, chiusa: false, da: '',      a: '' },
 'undertaker':             { nome: 'Undertaker',                ordine: 11, limite: 5,  occupati: 0, chiusa: false, da: '28/10', a: '03/11' },
 'domaserpi':              { nome: 'Domaserpi',                 ordine: 12, limite: 5,  occupati: 0, chiusa: false, da: '',      a: '' },
 'ninja':                  { nome: 'Ninja',                     ordine: 13, limite: 5,  occupati: 1, chiusa: false, da: '',      a: '' },
 'influencer':             { nome: 'Influencer',                ordine: 14, limite: 5,  occupati: 1, chiusa: false, da: '',      a: '' },
 'hawks-eye':              { nome: "Hawk's eye",                ordine: 15, limite: 5,  occupati: 2, chiusa: false, da: '',      a: '' },
 'apprendista-alchimista': { nome: 'Apprendista Alchimista',    ordine: 16, limite: 5,  occupati: 0, chiusa: false, da: '',      a: '' }
};

var _classiDati = null;
var _classiAscoltatori = [];

// ------------------------------------------------------------
// Lettura dei dati (cache locale, poi valori di partenza)
// ------------------------------------------------------------
function classiCopia(o) {
 var out = JSON.parse(JSON.stringify(o));
 return out;
}

function classiLeggiCache() {
 var dati = null;
 try { dati = JSON.parse(localStorage.getItem(CLASSI_CACHE_KEY)); } catch (e) { dati = null; }
 if (!dati || typeof dati !== 'object') dati = null;
 return dati;
}

// Dati correnti, sempre disponibili in modo sincrono
function classiDati() {
 if (!_classiDati) {
  var c = classiLeggiCache();
  _classiDati = c ? c : classiCopia(CLASSI_INIZIALI);
 }
 return _classiDati;
}

// Valori puliti di una voce (tipi corretti, campi mancanti riempiti)
function classiNorm(c) {
 var v = c || {};
 var out = {
  nome: String(v.nome || ''),
  ordine: parseInt(v.ordine, 10) || 0,
  limite: Math.max(0, parseInt(v.limite, 10) || 0),
  occupati: Math.max(0, parseInt(v.occupati, 10) || 0),
  chiusa: v.chiusa === true,
  da: v.da ? String(v.da) : '',
  a: v.a ? String(v.a) : ''
 };
 return out;
}

// Elenco ordinato: [{ id, nome, ordine, limite, occupati, chiusa, da, a }]
function classiOrdinate(dati) {
 var d = dati || classiDati();
 var lista = [];
 for (var id in d) {
  if (!d.hasOwnProperty(id) || !d[id] || !d[id].nome) continue;
  var c = classiNorm(d[id]);
  c.id = id;
  lista.push(c);
 }
 lista.sort(function (x, y) {
  var r = x.ordine - y.ordine;
  if (r === 0) r = x.nome < y.nome ? -1 : 1;
  return r;
 });
 return lista;
}

// Cerca una classe per nome (senza distinguere maiuscole)
function classiTrova(nome) {
 var cercato = String(nome || '').trim().toLowerCase();
 var lista = classiOrdinate();
 for (var i = 0; i < lista.length; i++) {
  if (lista[i].nome.toLowerCase() === cercato) return lista[i];
 }
 return null;
}

// Slug da usare come chiave su Firebase
function classiSlug(nome) {
 var s = String(nome || '').toLowerCase();
 if (s.normalize) s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
 s = s.replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
 if (!s) s = 'classe';
 return s;
}

// ------------------------------------------------------------
// Disponibilità
// ------------------------------------------------------------
// "28/10" → 1028 (mese*100 + giorno), null se non valida
function classiGiornoAnno(testo) {
 var m = String(testo || '').match(/^\s*(\d{1,2})\s*\/\s*(\d{1,2})\s*$/);
 if (!m) return null;
 var g = parseInt(m[1], 10), me = parseInt(m[2], 10);
 if (g < 1 || g > 31 || me < 1 || me > 12) return null;
 var v = me * 100 + g;
 return v;
}

// Periodo rispettato oggi? Senza periodo completo vale sempre.
// Usa la data reale del dispositivo, estremi compresi.
function classiInPeriodo(c, oggi) {
 var da = classiGiornoAnno(c.da), a = classiGiornoAnno(c.a);
 if (da === null || a === null) return true;
 var d = oggi || new Date();
 var v = (d.getMonth() + 1) * 100 + d.getDate();
 var dentro = da <= a ? (v >= da && v <= a) : (v >= da || v <= a);
 return dentro;
}

// { selezionabile, motivo: '' | 'chiusa' | 'fuori-periodo' | 'completa', etichetta }
function classiStato(c, oggi) {
 var n = classiNorm(c);
 var out = { selezionabile: true, motivo: '', etichetta: '' };
 if (n.chiusa) {
  out.selezionabile = false; out.motivo = 'chiusa'; out.etichetta = 'non disponibile';
 } else if (!classiInPeriodo(n, oggi)) {
  out.selezionabile = false; out.motivo = 'fuori-periodo'; out.etichetta = 'disponibile dal ' + n.da + ' al ' + n.a;
 } else if (n.limite > 0 && n.occupati >= n.limite) {
  out.selezionabile = false; out.motivo = 'completa'; out.etichetta = 'posti esauriti';
 }
 return out;
}

// ------------------------------------------------------------
// Caricamento da Firebase
// ------------------------------------------------------------
// Chi vuole sapere quando arrivano dati freschi si registra qui
function classiOnAggiornate(fn) {
 if (typeof fn === 'function') _classiAscoltatori.push(fn);
}

function classiNotifica(ok) {
 for (var i = 0; i < _classiAscoltatori.length; i++) {
  try { _classiAscoltatori[i](classiDati(), ok); } catch (e) { console.error('[Classi]', e); }
 }
}

// cb(dati, ok, grezzo): ok = Firebase ha risposto; grezzo = quello
// che c'è davvero su Firebase (null se il nodo è vuoto)
function classiCarica(cb) {
 fetch(CLASSI_DB_URL + '.json', { cache: 'no-store' })
  .then(function (r) {
   if (!r.ok) throw new Error('HTTP ' + r.status);
   var j = r.json();
   return j;
  })
  .then(function (grezzo) {
   if (grezzo && typeof grezzo === 'object') {
    _classiDati = grezzo;
    try { localStorage.setItem(CLASSI_CACHE_KEY, JSON.stringify(grezzo)); } catch (e) {}
   }
   classiNotifica(true);
   if (cb) cb(classiDati(), true, grezzo);
  })
  .catch(function (e) {
   console.warn('[Classi] lettura non riuscita:', e);
   classiNotifica(false);
   if (cb) cb(classiDati(), false, null);
  });
}

// ------------------------------------------------------------
// Regolamento: aggiorna i badge "Posti limitati X/Y"
// I badge da aggiornare hanno data-classe="<slug>".
// Classi senza limite: badge nascosto.
// ------------------------------------------------------------
function classiAggiornaRegolamento() {
 var badge = document.querySelectorAll('[data-classe]');
 if (!badge.length) return;
 var dati = classiDati();
 for (var i = 0; i < badge.length; i++) {
  var voce = dati[badge[i].getAttribute('data-classe')];
  if (!voce) continue;
  var c = classiNorm(voce);
  if (c.limite > 0) {
   badge[i].textContent = 'Posti limitati ' + c.occupati + '/' + c.limite;
   badge[i].style.display = '';
  } else {
   badge[i].style.display = 'none';
  }
 }
}

// Avvio: la lettura parte subito; il regolamento si aggiorna appena
// il DOM è pronto (dalla cache) e di nuovo quando arriva Firebase.
classiOnAggiornate(classiAggiornaRegolamento);
classiCarica();
(function () {
 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', classiAggiornaRegolamento);
 else classiAggiornaRegolamento();
})();
