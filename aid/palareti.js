"use strict";

(function() {
  // ==========================================
  // cambia le varibili usate in bootstrap.css
  // da https://www.w3schools.com/css/css3_variables_javascript.asp
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
    `"Titilium Web",
    system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans",
    "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji"`
    /*
    aggiunge "Titillium Web" all'inizio del valore presente in bootstrap che è:
      system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans",
      "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol", "Noto Color Emoji";
    */
  );
  root.style.setProperty(
    '--bs-font-monospace',
    `"Roboto Mono",
    SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
  );
  /*
    aggiunge "Roboto Mono" all'inizio del valore presente in bootstrap che è:
    SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  */
  // ==========================================
  // modifiche standard alla pagina
  let title=document.getElementsByTagName("title")[0].text.trimEnd(" \n").trimStart(" \n");
  document.body.insertAdjacentHTML("afterbegin", `<h1>${title}</h1>`)
})();
