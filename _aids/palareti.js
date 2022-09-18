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
  )();

  // ____________________________________
  // Fonti
  addStyle('/_fonts/fonts.css', null);

  // ____________________________________
  // Bulma
  if(classBulmaResources||treeinfoResources||classTableResources) {
    /*
    equivalente a
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    NB: versione 0.9.4; si può cambiare la versione o toglierla per avere l'ultima

    viene inoltre sempre aggiunto a Bulma i fogli di stile relativi a Font Awesome, che sono
      Per caricare la fonte regular
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/regular.min.css"
        integrity="sha512-aNH2ILn88yXgp/1dcFPt2/EkSNc03f9HBFX0rqX3Kw37+vjipi1pK3L9W08TZLhMg4Slk810sPLdJlNIjwygFw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
      Per caricare la fonte solid

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/solid.css"
        integrity="sha512-uj2QCZdpo8PSbRGL/g5mXek6HM/APd7k/B5Hx/rkVFPNOxAQMXD+t+bG4Zv8OAdUpydZTU3UHmyjjiHv2Ww0PA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
      Per caricare il css
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/fontawesome.min.css"
        integrity="sha512-RvQxwf+3zJuNwl4e0sZjQeX7kUa3o82bDETpgVCH2RiwYSZVDdFJ7N/woNigN/ldyOOoKw8584jM4plQdt8bhA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    v. https://cdnjs.com/libraries/font-awesome
    */
    const minimizeAwesome=true; // può essere messo a false per debug
    let integrityRegularFont;
    let integritySolidFont;
    let integrityFontawesome;
    if(minimizeAwesome) {
      integrityRegularFont='sha512-aNH2ILn88yXgp/1dcFPt2/EkSNc03f9HBFX0rqX3Kw37+vjipi1pK3L9W08TZLhMg4Slk810sPLdJlNIjwygFw==';
      integritySolidFont='sha512-dcTe66qF6q/NW1X64tKXnDDcaVyRowrsVQ9wX6u7KSQpYuAl5COzdMIYDg+HqAXhPpIz1LO9ilUCL4qCbHN5Ng==';
      integritySolidFont='sha512-uj2QCZdpo8PSbRGL/g5mXek6HM/APd7k/B5Hx/rkVFPNOxAQMXD+t+bG4Zv8OAdUpydZTU3UHmyjjiHv2Ww0PA=='
      integrityFontawesome='sha512-RvQxwf+3zJuNwl4e0sZjQeX7kUa3o82bDETpgVCH2RiwYSZVDdFJ7N/woNigN/ldyOOoKw8584jM4plQdt8bhA==';
    } else {
      integrityRegularFont='sha512-47aaayRMoRK9lao+pcq8IR0qnAutmDRZNoF2WUUV3EneuSIhSwETGmP03fEAjbMWYOt7XynF33m5r3fwfCBCxA==';
      integritySolidFont='sha512-RayiVbmLmW7DvtIA/RblYy7YqTlog8MVBYEwLkPFYY1GTTaVuDdBxC3RaJE6kEyWyCeSwROiH+2rR3rREm6eWQ==';
      integrityFontawesome='sha512-hksROWRSWPuYnv0z5vhyUwobZ49ZBxzhsCdXhwFy9ZDFFMS2UOg1DgCKphTlWkibm7p3Fp6Vq6GffbNDd+tOgg==';
    }
    addStyle('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/regular.css', minimizeAwesome, integrityRegularFont, 'anonymous');
    addStyle('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/solid.css', minimizeAwesome, integritySolidFont, 'anonymous');
    addStyle('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/fontawesome.css', minimizeAwesome, integrityFontawesome, 'anonymous');
    // se si vogliono caricare non minimizzati
    // addStyle('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/regular.css', false, , 'anonymous');
    // addStyle('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/fontawesome.css', false, 'sha512-hksROWRSWPuYnv0z5vhyUwobZ49ZBxzhsCdXhwFy9ZDFFMS2UOg1DgCKphTlWkibm7p3Fp6Vq6GffbNDd+tOgg==', 'anonymous');
    addStyle('https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.css', true);
    //todel <script src="https://kit.fontawesome.com/e2fdea06c0.js" crossorigin="anonymous"></script>
  }

  // ____________________________________
  // Tabelle Bulma
  if(classTableResources) {
    /*
    equivalente a
      <link href="https://unpkg.com/tabulator-tables@5.3.3/dist/css/tabulator.min.css" rel="stylesheet">
      <script type="text/javascript" src="https://unpkg.com/tabulator-tables@5.3.3/dist/js/tabulator.min.js"></script>
    NB: versione 5.3.3; si può cambiare la versione o toglierla per avere l'ultima
    */
    addStyle('https://unpkg.com/tabulator-tables@5.3.3/dist/css/tabulator.css', true);
    addScript(true, 'https://unpkg.com/tabulator-tables@5.3.3/dist/js/tabulator.js', true);
  }

  // ____________________________________
  // modifiche standard comuni a tutte le pagine da eseguire alla fine del caricamento
  window.addEventListener('load', (event) => {
    // acquisico informazioni sulla sezione del sito e sulla pagina attuale
    const pathname=location.pathname
    const treeinfo_json=getJson(`${pathname.replace(/\/[^\/]*$/, '')}/.treeinfo.json`);
    const pageInfo=treeinfo_json.FileHTML.find(object => object.Href.match(object.Href));

    // definisco una funzione per produrre l'HTML del breadcrumb
    // richiede una listaLink della forma [ "Href":Href , "Titolo":Titolo ]
    let creaHTMLBradcrumb=(listaLink, TitoloPaginaAttuale) => {
      let listaBreadcrumb='';
      if(listaLink instanceof Array&&listaLink.length>0) {
        for(let breadcrumbFile of listaLink) {
          listaBreadcrumb+=`<li><a href="${breadcrumbFile.Href}"><span class="icon is-small"><i class="fas fa-sitemap" aria-hidden="true"></i></span>${breadcrumbFile.Titolo}</a></li>`;
        }
        if(TitoloPaginaAttuale) {listaBreadcrumb+=`<li class="is-active"><a href="#">${TitoloPaginaAttuale}</a></li>`;}
        return `<nav aria-label="breadcrumb" class="breadcrumb"><ul>${listaBreadcrumb}</ul></nav>`;
      }
      return '';
    }

    // se non c'è h1, costruisco un hero in base al testo di title
    let title=document.getElementsByTagName("title")[0].text;
    document.body.insertAdjacentHTML(
      "afterbegin"
      , `<section class="hero is-small is-primary"><div class="hero-body"><p class="title" id="page-hero">${title}</p></div></section>`
    );
    // e predispongo comunque una funzione per inserire un sottotitolo qualora fosse necessario
    function insertSubtitleHeroBody(subtitle) {
      document.getElementById('page-hero').insertAdjacentHTML("afterend", `<p class="subtitle">${subtitle}</p>`)
    }

    // aggiungo un footer con contenuto standard
    let linkMappa=(location.pathname.endsWith('/.treeinfo.html'))? '':'<br><a href=".treeinfo.html">Mappa</a> di questa sezione del sito'
    // let copyright=new Date(pageHttpHeaders["last-modified"]).toISOString().substring(0, 7);
    let copyright=pageInfo.CreationTime.substring(0, 7);
    {
      let LastWriteTime=pageInfo.LastWriteTime.substring(0, 7);
      if(LastWriteTime!==copyright) {copyright+=` - ${LastWriteTime}`;}
    }
    document.body.insertAdjacentHTML(
      "beforeend",
      `<footer class="footer"><div class="content"><p>
Sito, codice sorgente e contenuti informatici di <a href="mailto:aldopaolo@palareti.eu"><strong>Aldopaolo Palareti</strong></a>.
<br>Contenuti storici di <a href="mailto:francesco.casadei@unibo.it"><strong>Francesco Casadei</strong></a>.${linkMappa}
<br>© ${copyright} per il contenuto, con licenza <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.it" target="_blank">CC BY NC SA 4.0</a>.
<br>In questo sito non vengono usati cookie
</p></div></footer>`
    );

    // genero treeinfo per le pagine .treeinfo.html
    if(treeinfoResources) {
      // inserisco il titolo della cartella come sottotitolo della pagina
      if(treeinfo_json.Titolo) {
        insertSubtitleHeroBody(treeinfo_json.Titolo);
      }

      // inserisco il breadcrumb
      let treeinfo_breadcrumb=document.getElementById('breadcrumb');
      if(treeinfo_breadcrumb) {
        treeinfo_breadcrumb.outerHTML=creaHTMLBradcrumb(treeinfo_json.Breadcrumb, treeinfo_json.Titolo);
      }

      // Inserisco gli elenchi dei file contenuti nella cartella
      // 1. predispongo la funzione che crea una sezione della pagina treeinfo
      const creaHTMLSezioneLink=(listaLink, titolo, faKey) => {
        if(listaLink instanceof Array&&listaLink.length>0) {
          let listaHTML='';
          for(let File of listaLink) {
            listaHTML+=`<br><p class="icon-text"><span class="icon"><i class="${faKey}"></i></span> <a href="${File.Href}">${File.Titolo}</a></p>`;
          }
          return `<section class="section"><h1 class="title">${titolo}</h1>${listaHTML}</section>`;
        }
        return '';
      }

      let elementSezioni=document.getElementById('sezioni');
      let HTMLSezioni=''
      // inserisco eventuali dir contenute
      HTMLSezioni+=creaHTMLSezioneLink(treeinfo_json.Descendants, 'Sottocartelle incluse nella sezione', 'fas fa-sitemap');
      // inserisco eventuali file HTML presenti
      HTMLSezioni+=creaHTMLSezioneLink(treeinfo_json.FileHTML, 'Documenti HTML disponibili nella sezione', 'far fa-file-code');
      // inserisco eventuali file PDF presenti
      HTMLSezioni+=creaHTMLSezioneLink(treeinfo_json.FilePDF, 'Documenti PDF disponibili nella sezione', 'far fa-file-pdf');
      // inserisco eventuali file PPT presenti
      HTMLSezioni+=creaHTMLSezioneLink(treeinfo_json.FilePPT, 'Documenti PPT disponibili nella sezione', 'far fa-file-powerpoint');

      // creo le sezioni HTML
      elementSezioni.outerHTML=HTMLSezioni;
    }
  });

  // ____________________________________
  // caricamenti comuni a tutta la cartella
  if(classPathResources||classPathStyle||classPathScript) {
    // dal path individuo il nome della cartella
    let dirPath;
    if(pathnameSlashLastPosition===0) {dirPath='root';} else {
      dirPath=location.pathname.substring(0, pathnameSlashLastPosition-1);
      const dirSlashPosition=dirPath.lastIndexOf('/');
      dirPath=dirPath.substring(dirSlashPosition+1);
    }
    // carico js e css relativi alla cartella
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
    // carico js e css relativi alla pagina
    if(classPageResources||classPageStyle) {
      addStyle(`${resource}.css`);
    }
    if(classPageResources||classPageScript) {
      addScript(true, `${resource}.js`);
    }
  }
})();
