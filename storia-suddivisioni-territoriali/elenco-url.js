"use strict"

let table=$('#table')
//const table=document.getElementById("table")
document.getElementById("filtrare-tipo").addEventListener("click", function() {
  const selezioneTipo=(document.getElementById("selezione-tipo")).value;
  $('[name="selezione-tipo"]').val()
  switch(selezioneTipo) {
    case "site": table.bootstrapTable('filterBy', {"type": "site"}); break;
    case "url": table.bootstrapTable('filterBy', {"type": "url"}); break;
    case "tinyurl": table.bootstrapTable('filterBy', {"type": "tinyurl"}); break;
    default: table.bootstrapTable('filterBy', {}); break;
  }
})
