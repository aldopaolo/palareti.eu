// funzioni di supporto per creare gli oevrlay
// va aggiunta la gestione dello zoom
/*
var OvrIndex = 0;
var OvrArray = [];
function creaOvrMarker(LatLng,Info) {
  OvrArray[OvrIndex] = new _creaOvrMarker(LatLng,Info);
  return OvrIndex++
}
*/
function ovrMarker(Info,MinZoom,MaxZoom,LatLng) {
  this.LatLng = LatLng;
  this.Info = Info;
  this.Marker = new GMarker(LatLng);
  this.Ovr = this.Marker;
  this.MinZoom = MinZoom;
  this.MaxZoom = MaxZoom;
}
function ovrPoly(Info,MinZoom,MaxZoom,LatLng,Ovr) {
  this.LatLng = LatLng;
  this.Info = Info;
  this.Marker = new GMarker(LatLng);
  this.Ovr = Ovr;
  this.MinZoom = MinZoom;
  this.MaxZoom = MaxZoom;
}

// queste funzioni richiedono che sia stato definito l'oggetto "map"
// ricentra la mappa su una data posizione con un dato tipo e zoom
function mostraMappa(OvrObj,TipoMappa,Zoom) {
  if (Zoom<OvrObj.MinZoom) { Zoom = OvrObj.MinZoom; }
  else if (Zoom>OvrObj.MaxZoom) { Zoom = OvrObj.MaxZoom; }
  map.setCenter(OvrObj.LatLng,Zoom);
  map.openInfoWindowHtml(OvrObj.LatLng,OvrObj.Info);
//  alert("Tipo:"+TipoMappa);
  map.setMapType(TipoMappa);
}
// ### NON SERVE PIU
//function mostraPoly(Polyline,Zoom,InfoLatLng,Info) {
//  map.openInfoWindowHtml(InfoLatLng,Info);
//  map.addOverlay(Polyline);
//  map.panTo(InfoLatLng);
//}
// ridefinisce lo zoom
function setZoom(MinZoom,MaxZoom) {
  var zoom = map.getZoom();
  if (zoom<MinZoom) { map.setZoom(MinZoom); }
  else if (zoom>MaxZoom) { map.setZoom(MaxZoom); }
}
// aggiunge un overlay statico alla mappa
function addOvr(OvrObj) {
  setZoom(OvrObj.MinZoom,OvrObj.MaxZoom);
  var marker = OvrObj.Marker;
  map.addOverlay(marker);
  if ( marker != OvrObj.Ovr ) { map.addOverlay(OvrObj.Ovr); };
  GEvent.addListener(marker, "click", function() {
    marker.openInfoWindowHtml(OvrObj.Info);
  });
}
// mostra o cancella un overlay dinamico
function switchOvr(Bottone,OvrObj) {
  if ( Bottone.checked ) {
    addOvr(OvrObj);
    OvrObj.Marker.openInfoWindowHtml(OvrObj.Info);
  }
  else {
    map.removeOverlay(OvrObj.Ovr);
    map.removeOverlay(OvrObj.Marker);
    if( map.getInfoWindow().getPoint() == OvrObj.LatLng ) {
      map.closeInfoWindow();
    };
  };
}

// ===============================================================
// gestione d egli overlay fatti da parti modificabili
// struttura dell'oggetto:
//   ovrPartObj.LatLng: coordinate del marker
//   ovrPartObj.Info: contenuto della finestra informativa
//   ovrPartObj.MinZoom, MaxZoom: zoom minimo e massimo di visualizzazione
//   ovrPartObj.Marker: oggetto marker da creare
//   ovrPartObj.Base.Ovr[]: array di overlay corrispondenti al disegno base da fare
//   ovrPartObj.Part[][]: array delle parti; ogni parte corrisponde a un array di overlay
// creatore
function ovrPart(Info,MinZoom,MaxZoom,LatLng,Base) {
  // esempio d'uso:
  // var v = new ovrPart( 'Info' , 10 , 15 , new GLatLng( 45 , 12 ) , [ OvrBase1 , OvrBase2 ] );
  this.LatLng = LatLng;
  this.Info = Info;
  this.Marker = new GMarker(LatLng);
  this.MinZoom = MinZoom;
  this.MaxZoom = MaxZoom;
  this.Base = Base; // questo array di overlay è quello proposto per l'overlay base 
  this.Part = [];
}
// mostra le parti richieste
function modOvrPart(Mostra,OvrArray) {
  // esempi d'uso:
  // modOvrPart( true , OvrArray ) // per mostrare tutte le parti dell'overlay
  // modOvrPart( false , OvrArray ) // per cancellare tutte le parti dell'overlay
  if ( Mostra ) {
    for (var i=0;i<OvrArray.length;i++) {
      map.addOverlay(OvrArray[i]);
    }
  }
  else {
    for (var i=0;i<OvrArray.length;i++) {
      map.removeOverlay(OvrArray[i]);
    }
  }
}
// crea o cancella la parte base di un overlay distinto in molte parti
function switchOvrBase( Bottone , OvrPartObj ) {
  if ( Bottone.checked ) {
    // definisce lo zoom
    setZoom(OvrPartObj.MinZoom,OvrPartObj.MaxZoom);
    // aggiunge gli overlay fissi
    modOvrPart(true,OvrPartObj.Base);
    // crea il marker
    var marker = OvrPartObj.Marker;
    map.addOverlay(marker);
    // aggiunge l'info window e la relativa gestione
    GEvent.addListener(marker, "click", function() {
      marker.openInfoWindowHtml(OvrPartObj.Info);
    });
    marker.openInfoWindowHtml(OvrPartObj.Info);
  }
  else {
    // toglie eventuali overlay parziali aperti
    for (var i=0;i<OvrPartObj.Part.length;i++) {
      modOvrPart(false,OvrPartObj.Part[i]);
    };
    // toglie gli overlay fissi
    modOvrPart(false,OvrPartObj.Base);
    // toglie il marker
    map.removeOverlay(OvrPartObj.Marker);
    // se relativa all'overlay, toglie l'Info Window
    if( map.getInfoWindow().getPoint() == OvrPartObj.LatLng ) {
      map.closeInfoWindow();
    };
  };
}
// crea o cancella solo una parte dell'overlay
function switchOvrPart( Bottone , OvrPartObj , PartN ) {
  modOvrPart(Bottone.checked,OvrPartObj.Part[PartN]);
}
