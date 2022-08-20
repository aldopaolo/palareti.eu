'use strict'

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
