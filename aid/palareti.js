"use strict";

/*
  l'elemento
    <script src="/aid/init.js">
  accetta l'attributo class. Sono possibili ii seguenti valori:

  - valori generali
    alpa-bulma-resources: viene caricato bulma
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
// inizializzazione di css e script comuni
(function() {
  // ____________________________________
  // estraggo la lista delle classi nello script con src '/aid/init.js'
  // ed inizializzo alcune variabili utili in seguito
  const scriptElements=[...document.getElementsByTagName('script')];
  const scriptWithPathName=scriptElements.find(e => (new URL(e.src)).pathname==='/aid/init.js');
  const classList=scriptWithPathName? [...scriptWithPathName.classList]:[];

  const classBulmaResources=classList.indexOf('alpa-Bulma-resources')>=0;
  const treeinfoResources=location.href.match(/^http.*\/\.treeinfo\.html$/)? true:false;
  const classTableResources=classList.indexOf('alpa-table-resources')>=0;

  const classPathResources=classList.indexOf('alpa-path-resources')>=0;
  const classPathStyle=classList.indexOf('alpa-path-style')>=0;
  const classPathScript=classList.indexOf('alpa-path-script')>=0;

  const classPageResources=classList.indexOf('alpa-page-resources')>=0;
  const classPageStyle=classList.indexOf('alpa-page-style')>=0;
  const classPageScript=classList.indexOf('alpa-page-script')>=0;

  // definisco costanti comuni agli script
  const pathnameSlashLastPosition=location.pathname.lastIndexOf('/');
  const pageHttpHeaders=(
    // da http://truelogic.org/wordpress/2015/09/11/get-all-http-headers-in-javascript/
    function() {
      let req=new XMLHttpRequest();
      req.open('GET', document.location, false);
      req.send(null);
      // associate array to store all values
      let data=new Object();
      // get all headers in one call and parse each item
      let headers=req.getAllResponseHeaders().toLowerCase();
      let aHeaders=headers.split('\n');
      for(let header of aHeaders) {
        let pos=header.indexOf(':');
        let key=header.substring(0, pos);
        let value=header.substring(pos+1).trim(" \n\r");
        data[key]=value;
      }
      data["Referer"]=document.referer;
      data["UserAgent"]=navigator.userAgent;
      return data;
    }
  )()

  // ____________________________________
  // Bulma
  if(classBulmaResources||treeinfoResources||classTableResources) {
    /*
    equivalente a
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    NB: versione 0.9.4; si può cambiare la versione o toglierla per avere l'ultima
    v.
    */
    addStyle(addMin('https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma', 'css', true));
  }

  // ____________________________________
  // Bulma
  if(classTableResources) {
    /*
    equivalente a
      <link href="https://unpkg.com/tabulator-tables@5.3.3/dist/css/tabulator.min.css" rel="stylesheet">
      <script type="text/javascript" src="https://unpkg.com/tabulator-tables@5.3.3/dist/js/tabulator.min.js"></script>
    NB: versione 5.3.3; si può cambiare la versione o toglierla per avere l'ultima
    */
    addStyle(addMin('https://unpkg.com/tabulator-tables@5.3.3/dist/css/tabulator', 'css', true));
    addScript(true, addMin('https://unpkg.com/tabulator-tables@5.3.3/dist/js/tabulator', 'js', true));
  }

  // ____________________________________
  // modifiche standard comuni a tutte le pagine da eseguire alla fine del caricamento
  // se non c'è, metto h1 uguale a title
  window.addEventListener('load', (event) => {
    //todel:
    // if(document.getElementsByTagName('h1').length===0) {
    //   let title=document.getElementsByTagName("title")[0].text.trimEnd(" \n").trimStart(" \n");
    //   document.body.insertAdjacentHTML("afterbegin", `<h1 class="title">${title}</h1>`);
    // }
    let title=document.getElementsByTagName("title")[0].text;
    document.body.insertAdjacentHTML(
      "afterbegin"
      , `<section class="hero is-small is-primary"><div class="hero-body"><p class="title">${title}</p></div></section>`
    );
    let copyright=new Date(pageHttpHeaders.date).toISOString().substring(0, 7);
    document.body.insertAdjacentHTML(
      "beforeend",
      `<footer class="footer"><div class="content"><p>
Sito, codice sorgente e contenuti informatici di <a href="mailto:aldopaolo@palareti.eu"><strong>Aldopaolo Palareti</strong></a>.
<br>Contenuti storici di <a href="mailto:francesco.casadei@unibo.it"><strong>Francesco Casadei</strong></a>.
<br>© ${copyright} per il contenuto, con licenza <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.it" target="_blank">CC BY NC SA 4.0</a> .
<br>In questo sito non vengono usati cookie
</p></div></footer>`
    );
  });

  // genero treeinfo per le pagine .treeinfo.html
  if(treeinfoResources) {
    window.addEventListener('load', (event) => {
      // individuo il file json con informazioni rispetto all'albero
      const path=(location.pathname).replace(/\/[^\/]*$/, '')
      const treeinfo_json=getJson(`${path}/.treeinfo.json`)

      let treeinfo_breadcrumb=document.getElementById('breadcrumb');
      if(treeinfo_breadcrumb) {
        // inserisco il titolo della pagina
        if(treeinfo_json.Titolo) {
          treeinfo_breadcrumb.insertAdjacentHTML("beforebegin", `<h2 class="subtitle">${treeinfo_json.Titolo}<h2>`);
        }
        // aggiungo gli elementi antenati al breadcrumb
        //          let breadcrumbList='<nav aria-label="breadcrumb"><ol class="breadcrumb">';
        let breadcrumbList='<ul>'
        for(let Breadcrumb of treeinfo_json.Breadcrumb) {
          breadcrumbList+=`<li><a href="${Breadcrumb.Href}">${Breadcrumb.Titolo}</a></li>`;
        }
        breadcrumbList+=`<li class="is-active"><a href="#" aria-current="page">${treeinfo_json.Titolo}</a></li></ul>`
        treeinfo_breadcrumb.innerHTML=breadcrumbList;
      }

      let elencaLink=(faKey, lista) => {
        let ret=''
        for(let File of lista) {
          ret+=`<p class="icon-text"><span class="icon"><i class="fas fa-thin ${faKey}"></i></span> <a href="${File.PathName}">${File.Titolo}</p>`
        }
        return ret;
      }

      let treeinfo_html=document.getElementById('treeinfo-html');
      if(treeinfo_html&&treeinfo_json.FileHTML.length) {
        treeinfo_html.insertAdjacentHTML("beforebegin", "<h3 class='title'>Documenti HTML disponibili</h3>");
        treeinfo_html.innerHTML=elencaLink('fa-file-code', treeinfo_json.FileHTML);
      }

      let treeinfo_pdf=document.getElementById('treeinfo-pdf');
      if(treeinfo_pdf&&treeinfo_json.FilePDF.length) {
        treeinfo_pdf.insertAdjacentHTML("beforebegin", "<h3 class='title'>Documenti PDF disponibili</h3>");
        treeinfo_pdf.innerHTML=elencaLink('fa-file-pdf', treeinfo_json.FilePDF);
      }

      let treeinfo_ppt=document.getElementById('treeinfo-ppt');
      if(treeinfo_ppt&&treeinfo_json.FilePPT.length) {
        treeinfo_ppt.insertAdjacentHTML("beforebegin", "<h3 class='title'>Documenti PPT disponibili</h3>");
        treeinfo_ppt.innerHTML=`${treeinfo_json.FilePPT.length} documenti`
        treeinfo_ppt.innerHTML=elencaLink('fa-presentation-screen', treeinfo_json.FilePPT);
      }

      let treeinfo_dir=document.getElementById('treeinfo-dir');
      if(treeinfo_dir&&treeinfo_json.Descendants.length) {
        treeinfo_dir.insertAdjacentHTML("beforebegin", "<h3 class='title'>Cartelle contenute</h3>");
        treeinfo_dir.innerHTML=`${treeinfo_json.Descendants.length} cartelle`
      }
    });
  }

  // ____________________________________
  // caricamenti comuni a tutta la directory
  if(classPathResources||classPathStyle||classPathScript) {
    // dal path individuo il nome della cartella
    let dirPath;
    if(pathnameSlashLastPosition===0) {dirPath='root';} else {
      dirPath=location.pathname.substring(0, pathnameSlashLastPosition-1);
      const dirSlashPosition=dirPath.lastIndexOf('/');
      dirPath=dirPath.substring(dirSlashPosition+1);
    }
    if(classPathResources||classPathStyle) {
      addStyle(`${dirPath}.css`);
    }
    if(classPathResources||classPathScript) {
      addScript(true, `${dirPath}.js`);
    }
  }

  // ____________________________________
  // caricamenti specifici per la pagina
  if(classPageResources||classPageStyle||classPageScript) {
    // dal path tolgo il percorso e gli eventuali query e frammento in modo da avere solo il nome della pagina
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
