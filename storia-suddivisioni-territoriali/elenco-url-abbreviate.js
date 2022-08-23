'use strict';

const elencoUrlCompletoJson=getJson("elenco-url-completo.json")
const elencoUrlAbbreviateJson=getJson("elenco-url-abbreviate.json")
const tbody=document.getElementById('tbody')

let testo=''

for(let urlInfo of elencoUrlCompletoJson) {
  let tdSito, tdTinyurl, tdUrl;
  let url=urlInfo.Url;
  if(url.startsWith('tinyurl.com/')) {
    let tinyurlPath=url.split("/")[1]
    let tinyurlRedirectInfo=elencoUrlAbbreviateJson.find((urlObject) => urlObject.tinyurl==tinyurlPath);
    let urlRedirect=tinyurlRedirectInfo.url;
    let tinyurlRedirectObject=new URL(urlRedirect);
    tdSito=`<a href="${tinyurlRedirectObject.protocol}//${tinyurlRedirectObject.host}" target="_blank"></a>`
    tdTinyurl=`<a href="https://${url}" target="_blank">${url}</a>`
    tdUrl=`<a href='${urlRedirect}' target="_blank">${urlRedirect}</a>`
  } else {
    tdSito=`<a href="${urlInfo.Schema}${(urlInfo.Www==="")? "":"www."}${urlInfo.Dominio}" target="_blank"></a>`
    tdTinyurl=""
    tdUrl=`<a href='${url}' target="_blank">${url}</a>`
  }
  if(urlInfo.Url.indexOf(".")!==-1) {
    testo+=`<tr><td>${tdSito}</td><td>${tdTinyurl}</td><td>${tdUrl}</td></tr>`
  }
}

// for(let tr of elencoUrlAbbreviateJson) {
//   if(tr.attivo==='1') {
//     let url=tr.url;
//     let urlObject=new URL(url);
//     let host=urlObject.host;
//     let tinyurl=`tinyurl.com/${tr.tinyurl}`
//     //    let tdSito=`<a href="${urlObject.protocol}//${host}" target="_blank">${host}</a>`
//     let tdSito=`<a href="${urlObject.protocol}//${host}" target="_blank"></a>`
//     let tdTinyurl=`<a href="https://${tinyurl}" target="_blank">${tinyurl}</a>`
//     let tdUrl=`<a href='${url}' target="_blank">${url}</a>`
//     testo+=`<tr><td>${tdSito}</td><td>${tdTinyurl}</td><td>${tdUrl}</td></tr>`
//   }
// }

tbody.innerHTML=testo;

// funzioni usate in test

// function mostraContenuto(elenco) {
//   console.log(`Lunghezza=${elenco.length}`)
//   for(let x of elenco) {
//     console.log(`  ${x.attivo}: ${x.tinyurl}`)
//   }
// }

// mostraContenuto(elencoUrlAbbreviateJson)
// const elencoUrlAbbreviateCsv=getJson("elenco-url-abbreviate.csv")
// mostraContenuto(elencoUrlAbbreviateCsv)
