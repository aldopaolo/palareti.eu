"use strict"
// ===========================================================
// funzioni necessarie per l'inizializzazione di css e script
function addScript(defer, src, integrity, crossorigin) {
  let script=document.createElement('script');
  script.src=src;
  script.defer=defer;
  if(integrity) {script.setAttribute("integrity", integrity);}
  if(crossorigin) {script.setAttribute("crossorigin", crossorigin);}
  document.head.append(script);
};
function addStyle(href, integrity, crossorigin) {
  let style=document.createElement('link');
  style.href=href;
  style.rel="stylesheet";
  if(integrity) {style.setAttribute("integrity", integrity);}
  if(crossorigin) {style.setAttribute("crossorigin", crossorigin);}
  document.head.append(style);
}

// ===========================================================
// inizializzazione di css e script comuni
(function() {
  /*
  questa parte sostituisce i seguenti elementi dell'header html:

  <script src="https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.21.0/dist/bootstrap-table.min.css">
  <script defer src="https://unpkg.com/bootstrap-table@1.21.0/dist/bootstrap-table.js"></script>
  <script defer src="https://unpkg.com/bootstrap-table@1.21.0/dist/bootstrap-table-locale-it-IT.min.js"></script>
  <link rel="stylesheet" href="/aid/palareti.css">
  <script defer src="/aid/palareti.js"></script>
  */
  // jquery
  addScript(false, "https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js");
  // bootstrap
  addStyle("https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC", "anonymous");
  addScript(false, "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
    "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM", "anonymous");
  // bootstrap table
  addStyle("https://unpkg.com/bootstrap-table@1.21.0/dist/bootstrap-table.min.css");
  addScript(false, "https://unpkg.com/bootstrap-table@1.21.0/dist/bootstrap-table.js");
  addScript(false, "https://unpkg.com/bootstrap-table@1.21.0/dist/locale/bootstrap-table-it-IT.min.js")
  // palareti.eu
  addStyle("/aid/palareti.css")
  addScript(true, "/aid/palareti.js")
  // cambia le varibili usate in bootstrap.css
  /*
    da https://www.w3schools.com/css/css3_variables_javascript.asp
  */
  /*
    spiegazione di alcuni nomi che possono apparire in font-family
    -apple-system:
      San Francisco in Safari(on Mac OS X and iOS); Neue Helvetica and Lucida Grande
      on older versions of Mac OS X.
      It properly selects between San Francisco Text and San Francisco Display depending
      on the text’s size.
    system-ui:
      default UI font on a given platform.
    BlinkMacSystemFont:
      equivalent of-apple-system, for Chrome on Mac OS X.
    "Segoe UI":
      Windows(Vista+) and Windows Phone.
    Roboto:
      Android(Ice Cream Sandwich(4.0)+) and Chrome OS.
      It is deliberately listed after Segoe UI so that if you’re an Android developer on
      Windows and have Roboto installed, Segoe UI will be used instead
    Ubuntu:
      all versions of Ubuntu.

    fonti:
    https://github.com/necolas/normalize.css/issues/665
    https://stackoverflow.com/questions/32660748/how-to-use-apples-new-san-francisco-font-on-a-webpage
  */
  const root=document.querySelector(':root');
  root.style.setProperty(
    '--bs-font-sans-serif',
    `"Titilium Web", system-ui, -apple-system,
    "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
    /*
    in bootstrap è:
      system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans",
      "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol", "Noto Color Emoji";
    */
  );
  root.style.setProperty(
    '--bs-font-monospace',
    `"Roboto Mono", SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace`
    /*
      in bootstrap è:
      SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    */
  );

})();

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
