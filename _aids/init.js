"use strict";

// ===========================================================
// costanti e funzioni per la gestione degli stili e degli script

// costante per definire il comportamento di default per la minimizzazione
//    true: se non indicato diversamente, uso la versione minimizzata
//    false: uso la versione non minimizzata
// regole definite
// 1: se "manual" viene passato come true o false, lo prendo così com'è
// 2: se questo script se viene chiamato nella forma min ==> true
// 3: se si tratta di una chiamata locale ==> false
// 4: altrimenti ==> true
const globalMin=(manual =>
  manual
  ||document.currentScript.src.endsWith(".min.js")
  ||!location.hostname.match('127\.0\.0|localhost$')
)(null); // non passo parametri, per cui NON è vero il caso 1.

// funzione per caricare uno stile css
//    href:   link al sorgente dello stile
//    min:
//            true, vienme caricata la versione minimizzata
//            null o undefined, si fa riferimento al valore di globalMin
//            false, viene caricata la versione estesa
//    integrity e crossorigin: nel caso siano necessari
function addStyle(href, min, integrity, crossorigin) {
  if(min??globalMin) {href=href.replace(/(\.css(\?|#|$))/, ".min$1");}
  let style=document.createElement('link');
  style.href=href;
  style.rel="stylesheet";
  if(integrity) {style.setAttribute("integrity", integrity);}
  if(crossorigin) {style.setAttribute("crossorigin", crossorigin);}
  document.head.insertAdjacentElement("beforeend", style);
}

// funzione per caricare uno script js
//    defer:  se true, il caricamento viene differito
//    src:    link al sorgente dello script
//    min:
//            true, vienme caricata la versione minimizzata
//            null o undefined, si fa riferimento al valore di globalMin
//            false, viene caricata la versione estesa
//    integrity e crossorigin: nel caso siano necessari
function addScript(defer, src, min, integrity, crossorigin) {
  if(min??globalMin) {src=src.replace(/(\.js(\?|#|$))/, ".min$1");}
  let script=document.createElement('script');
  script.src=src;
  if(defer) {script.defer=defer};
  if(integrity) {script.setAttribute("integrity", integrity);}
  if(crossorigin) {script.setAttribute("crossorigin", crossorigin);}
  document.head.insertAdjacentElement("beforeend", script);
}

// ===========================================================
// altre funzioni da inizializzare

// funzione per acqisire un file JSON locale
function getJson(fileUrl) {
  let xhr=new XMLHttpRequest();
  let response="[]";
  let ret;

  // acquisico il file nella variabile response
  xhr.open('GET', fileUrl, false); // false: chiamata asincrona
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  try {
    xhr.send();
    if(xhr.status===200) {
      response=xhr.response;
    } else {
      alert(`Error in file ${fileUrl}: Status ${xhr.status}, "${xhr.statusText}"`);
    }
  } catch(err) { // instead of onerror
    alert(`Request failed -- file ${fileUrl}`);
  }

  // estraggo il formato Json nella variabile ret
  try {
    ret=JSON.parse(response);
  } catch(err) {
    alert(`Errori nel file json -- file ${fileUrl}`);
    ret=[];
  }

  return ret;
}

// stili e script caricati di default
addStyle('/_aids/palareti.css');
addScript(false, '/_aids/palareti.js');
