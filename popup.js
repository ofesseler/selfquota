// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


var req = new XMLHttpRequest();
req.open(
    "GET",
    "http://www.selfnet.de/quota.xml",
    true);
req.onload = showQuota;
req.send(null);

$(document).ready(function () {
});




function showQuota() {
  // asd();
  $.plot($("#placeholder"), [ [[0, 0],[1,50],[2,125], [new Date().getDate(), 250]] ], options );

    var options = {
        series: { shadowSize: 0 }, // drawing is faster without shadows
        yaxis: { min: 0, max: getTotal() },
        xaxis: { min: 1, max: new Date().getDate() }
    };
  css();
}

function css() {

  var balken = document.createElement("div");
  var style = document.createAttribute("style")
  var used = req.responseXML.getElementsByTagName("used")[0];
  style.nodeValue="height:100%; width:"+used.getAttribute("percentage")+"%; background:red;";
  balken.setAttributeNode(style);
  balken.appendChild(document.createTextNode("Used: " + used.getAttribute("caption")))
  document.getElementById("cssbalken").appendChild(balken);
}

// function asd() {
//   var total = req.responseXML.getElementsByTagName("total");
//   var used = req.responseXML.getElementsByTagName("used");
//   var availible = req.responseXML.getElementsByTagName("availible");
//   var color = req.responseXML.getElementsByTagName("color");

//   var useddiv = document.createElement("div");
//   var usedText = document.createTextNode("Used: " + used[0].getAttribute("bytes") + " bytes");

//   useddiv.appendChild(usedText);
//   useddiv.appendChild(document.createTextNode(" Total: " + getTotal() + " GB"));
//   document.body.appendChild(useddiv);



//   // for (var i = 0, photo; photo = photos[i]; i++) {
//   //   var img = document.createElement("image");
//   //   img.src = constructImageURL(photo);
//   //   document.body.appendChild(img);
//   // }
// }


function getTotal() {
  var total = req.responseXML.getElementsByTagName("total");
  var kb = total[0].getAttribute("bytes")/1024;
  return (kb / 1024)/1024;
}