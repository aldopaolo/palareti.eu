'use strict'
// ================ modifiche di bootstrap ==================
(function() {
  /*
    cambia le varibili globali usate in bootstrap
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
  );
  /*
  in bootstrap era:
    system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans",
    "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  */
  root.style.setProperty(
    '--bs-font-monospace',
    `"Roboto Mono", SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace`
  );
  /*
    in bootstrap era:
    SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  */
})();

// ================ funzione generica per acqisire un file JSON locale ==================
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
