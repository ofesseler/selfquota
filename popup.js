
var req = new XMLHttpRequest();
req.open(
    "GET",
    "http://www.selfnet.de/quota.xml",
    true);
req.onload = css;
req.send(null);

$(document).ready(function () {
});

function css() {

  var balken = document.createElement("div");
  var style = document.createAttribute("style");
  var style_id = document.createAttribute("id");
  style_id.nodeValue="used";
  balken.setAttributeNode(style_id);
  var used = req.responseXML.getElementsByTagName("used")[0];
  var total = req.responseXML.getElementsByTagName("total")[0];
  style.nodeValue="height:100%; width:"+used.getAttribute("percentage")*100+"%;";
  balken.setAttributeNode(style);
  var text = document.createTextNode(used.getAttribute("caption") + " / " + total.getAttribute("caption"));
  
  document.getElementById("cssbalken").appendChild(balken);
  document.getElementById("text").appendChild(text);
}

function getTotal() {
  var total = req.responseXML.getElementsByTagName("total");
  var kb = total[0].getAttribute("bytes")/1024;
  return (kb / 1024)/1024;
}