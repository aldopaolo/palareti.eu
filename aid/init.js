"use strict"

/*
  l'elemento
    <script src="/aid/init.js">
  accetta l'attributo class. Sono possibili ii seguenti valori:

  - valori generali
    alpa-jQuery-resources: viene caricato lo script jQuery
    alpa-bootstrap-resources: vengono caricati stile e script per bootstrap
    alpa-bootstrap-table-resources: vengono caricati stile e script per bootstrap
      se presente, i valori alpa-jQuery e alpa-bootstrap sono impliciti e quindi non è necessario indicarli
    alpa-treeinfo-resources: vengono caricate le funzioni specifiche per la gestione dell'albero del sito
  - valori relativi alla directory della pagina web; i nomi sono uguali a quelli della directory, cambia l'estensione
    alpa-path-resources: vengono caricati stile e script specifici per la directory della pagina web
      se presente, i valori alpa-path-style e alpa-path-script sono impliciti e quindi non è necessario indicarli
    alpa-path-style: viene caricato lo stile specifico per la directory della pagina web
    alpa-path-script: viene caricato lo script specifico per la directory della pagina web
  - valori relativi alla pagina web; i nomi sono uguali a quelli della pagina, cambia l'estensione
    alpa-page-resource: vengono caricati stile e script specifici per la pagina web
      se presente, i valori alpa-resource-style e alpa-resource-script sono impliciti e quindi non è necessario indicarli
    alpa-page-style: viene caricato lo stile specifico per la pagina web
    alpa-page-script: viene caricato lo script specifico per la pagina web
*/
// ===========================================================
// funzioni necessarie per l'inizializzazione di css e script
function addScript(defer, src, integrity, crossorigin) {
  let script=document.createElement('script');
  script.src=src;
  script.defer=defer;
  if(integrity) {script.setAttribute("integrity", integrity);}
  if(crossorigin) {script.setAttribute("crossorigin", crossorigin);}
  document.head.insertAdjacentElement("afterbegin", script);
};
function addStyle(href, integrity, crossorigin) {
  let style=document.createElement('link');
  style.href=href;
  style.rel="stylesheet";
  if(integrity) {style.setAttribute("integrity", integrity);}
  if(crossorigin) {style.setAttribute("crossorigin", crossorigin);}
  document.head.insertAdjacentElement("afterbegin", style);
}

// ===========================================================
// inizializzazione di css e script comuni
(function() {
  // ____________________________________
  // estraggo la lista delle classi nello script con src '/aid/init.js'
  // ed inizializzo alcune variabili utili in seguito
  const scriptElements=[...document.getElementsByTagName('script')];
  const scriptWithPathName=scriptElements.find(e => (new URL(e.src)).pathname==='/aid/init.js');
  const classList=scriptWithPathName? [...scriptWithPathName.classList]:[];

  const classJQueryResources=classList.indexOf('alpa-jQuery-resources')>=0;
  const classBootstrapResources=classList.indexOf('alpa-bootstrap-resources')>=0;
  const classBootstrapTableResources=classList.indexOf('alpa-bootstrap-table-resources')>=0;
  const classTreeinfoResources=classList.indexOf('alpa-treeinfo-resources')>=0;

  const classPathResources=classList.indexOf('alpa-path-resources')>=0;
  const classPathStyle=classList.indexOf('alpa-path-style')>=0;
  const classPathScript=classList.indexOf('alpa-path-script')>=0;

  const classPageResources=classList.indexOf('alpa-page-resources')>=0;
  const classPageStyle=classList.indexOf('alpa-page-style')>=0;
  const classPageScript=classList.indexOf('alpa-page-script')>=0;

  const pathnameSlashLastPosition=location.pathname.lastIndexOf('/');

  // ____________________________________
  // jquery
  if(classJQueryResources||classBootstrapTableResources) {
    /*
    equivalente a
      <script src="https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js"></script>
    */
    addScript(false, "https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js");
  }

  // ____________________________________
  // bootstrap
  if(classBootstrapResources||classBootstrapTableResources) {
    /*
    equivalente a
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>
    */
    addStyle("https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
      "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC", "anonymous");
    // cambio le varibili usate in bootstrap.css
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
      /*
        aggiunge "Titillium Web" all'inizio del valore presente in bootstrap, che è:
        system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans",
        "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol", "Noto Color Emoji";
      */
      '--bs-font-sans-serif',
      `"Titilium Web",
      system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans",
      "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol", "Noto Color Emoji"`
    );
    root.style.setProperty(
      /*
        aggiunge "Roboto Mono" all'inizio del valore presente in bootstrap, che è:
        SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      */
      '--bs-font-monospace',
      `"Roboto Mono",
      SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
    );
    addScript(false, "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
      "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM", "anonymous");
  }

  // ____________________________________
  // bootstrap table
  if(classBootstrapTableResources) {
    /*
    equivalente a
      <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.21.0/dist/bootstrap-table.min.css">
      <script defer src="https://unpkg.com/bootstrap-table@1.21.0/dist/bootstrap-table.js"></script>
      <script defer src="https://unpkg.com/bootstrap-table@1.21.0/dist/bootstrap-table-locale-it-IT.min.js"></script>
    */
    addStyle("https://unpkg.com/bootstrap-table@1.21.0/dist/bootstrap-table.min.css");
    addScript(false, "https://unpkg.com/bootstrap-table@1.21.0/dist/bootstrap-table.js");
    addScript(false, "https://unpkg.com/bootstrap-table@1.21.0/dist/locale/bootstrap-table-it-IT.min.js")
  }

  // ____________________________________
  // caricamenti comuni a tutto il sito
  /*
  equivalente a
    <link rel="stylesheet" href="/aid/palareti.css">
  */
  addStyle("/aid/palareti.css")

  // modifiche standard comuni a tutte le pagine da eseguire alla fine del caricamento
  window.addEventListener('DOMContentLoaded', (event) => {
    if(document.getElementsByTagName('h1').length===0) {
      let title=document.getElementsByTagName("title")[0].text.trimEnd(" \n").trimStart(" \n");
      document.body.insertAdjacentHTML("afterbegin", `<h1>${title}</h1>`);
    }
  });

  // ____________________________________
  // treeinfo
  if(classTreeinfoResources) {
    window.addEventListener('DOMContentLoaded', (event) => {
      const path=(location.pathname).replace(/\/[^\/]*$/, '')
      const treeinfo_json=getJson(`${path}/.treeinfo.json`)

      let treeinfo_html=document.getElementById('treeinfo-html');
      if(treeinfo_html&&treeinfo_json.Titolo) {
        treeinfo_html.insertAdjacentHTML("beforebegin", `<h2>${treeinfo_json.Titolo}<h2>`)
      }
      if(treeinfo_html&&treeinfo_json.FileHTML) {
        treeinfo_html.innerHTML=treeinfo_json.FileHTML.length+" pagine"
      }

      let treeinfo_pdf=document.getElementById('treeinfo-pdf');
      if(treeinfo_pdf&&treeinfo_json.FilePDF) {
        treeinfo_pdf.innerHTML=treeinfo_json.FilePDF.length+" pagine"
      }

      let treeinfo_ppt=document.getElementById('treeinfo-ppt');
      if(treeinfo_ppt&&treeinfo_json.FilePPT) {
        treeinfo_ppt.innerHTML=treeinfo_json.FilePPT.length+" pagine"
      }

      let treeinfo_dir=document.getElementById('treeinfo-dir');
      if(treeinfo_dir&&treeinfo_json.Descendant) {
        treeinfo_dir.innerHTML=treeinfo_json.Descendant.length+" pagine"
      }
    });
  }

  // ____________________________________
  // caricamenti comuni a tutta la directory
  if(classPathResources||classPathStyle||classPathScript) {
    let dirPath;
    if(pathnameSlashLastPosition===0) {dirPath='root';} else {
      dirPath=location.pathname.substring(0, pathnameSlashLastPosition-1);
      const dirSlashPosition=dirPath.lastIndexOf('/');
      dirPath=dirPath.substring(dirSlashPosition+1);
    }
    if(classPathResources||classPathStyle) {
      addStyle(`${dirPathth}.css`);
    }
    if(classPathResources||classPathScript) {
      addScript(true, `${dirPathth}.js`);
    }
  }

  // ____________________________________
  // caricamenti specifici per la pagina
  if(classPageResources||classPageStyle||classPageScript) {
    let resource=location.pathname.substring(pathnameSlashLastPosition+1);
    const resourceQueryPosition=resource.indexOf('?');
    if(resourceQueryPosition>0) {resource=resource.substring(0, resourceQueryPosition);}
    const resourceFragmentPosition=resource.indexOf('?');
    if(resourceFragmentPosition>0) {resource=resource.substring(0, resourceFragmentPosition);}
    const resourceExtensionPosition=resource.lastIndexOf('.');
    if(resourceExtensionPosition>0) {resource=resource.substring(0, resourceExtensionPosition);}
    if(classPageResources||classPageStyle) {
      addStyle(`${resource}.css`);
    }
    if(classPageResources||classPageScript) {
      addScript(true, `${resource}.js`);
    }
  }
})();

// ===========================================================
// altre funzioni da inizializzare
function urlDetailFormatter(value) {
  let ret;
  if(!value) {
    ret=""
  } else {
    if(value.indexOf("//")<0) {
      ret=`<a href="//${value}" target="_blank">${value}</a>`;
    } else {
      ret=`<a href="${value}" target="_blank">${value}</a>`;
    }
  }
  return ret;
}

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
