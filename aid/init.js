"use strict"

const globalMin=null??!location.hostname.match('127\.0\.0|localhost$');
// true:minimizza false:non minimizza null:dipende dal contesto
function addMin(src, ext, min) {
  let minStr=(min??globalMin)? '.min.':'.';
  return `${src}${minStr}${ext}`;
}
function addScript(defer, src, integrity, crossorigin) {
  let script=document.createElement('script');
  script.src=src;
  if(defer) {script.defer=defer};
  if(integrity) {script.setAttribute("integrity", integrity);}
  if(crossorigin) {script.setAttribute("crossorigin", crossorigin);}
  document.head.insertAdjacentElement("beforeend", script);
}
function addStyle(href, integrity, crossorigin) {
  let style=document.createElement('link');
  style.href=href;
  style.rel="stylesheet";
  if(integrity) {style.setAttribute("integrity", integrity);}
  if(crossorigin) {style.setAttribute("crossorigin", crossorigin);}
  document.head.insertAdjacentElement("beforeend", style);
}
addScript(false, addMin('/aid/palareti', 'js'));
addStyle(addMin('/aid/palareti', 'css'));
