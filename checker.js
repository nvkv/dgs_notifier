var statusUrl = 'http://www.dragongoserver.net/status.php';
var quickStatusUrl = 'http://www.dragongoserver.net/quick_status.php'

function checkServerStatus() {
  var request = new XMLHttpRequest();
  request.open("GET", quickStatusUrl, true);
  request.onreadystatechange = function() {
   if (request.readyState == 4) {
    countGamesInQuickStatus(request.responseText)
   }
 }
 request.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 1984 00:00:00 GMT");
 request.send();
}


function countGamesInQuickStatus(quickStatusText) {
  var count = 0;
  var pattern = "'G'"
  var regex = new RegExp(pattern,'gi');

  while (regex.exec(quickStatusText)){
    count++;
  }

  if (count > 0) {
    chrome.browserAction.setBadgeText({'text': count.toString()});
  }
  else {
    chrome.browserAction.setBadgeText({'text': ''});
  }
}


