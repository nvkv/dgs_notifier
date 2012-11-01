var statusUrl = 'http://www.dragongoserver.net/status.php';
var quickStatusUrl = 'http://www.dragongoserver.net/quick_status.php'

function checkServerStatus(callback) 
{
  var request = new XMLHttpRequest();
  request.open("GET", quickStatusUrl, true);
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      return callback(request.responseText)
    }
  }
  request.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 1984 00:00:00 GMT");
  request.send();
}


function countGamesInQuickStatus(quickStatusText) 
{
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


function parseStatus(statusString)
{
  var lines = statusString.split('\n')
  var games = []

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i]

    if (line.indexOf("[") == 0 && line != "") {
      continue
    }

    var gameObject = {
      "id": null,
      "opponent": null,
      "color": null,
      "timestamp": null,
      "time_rem": null 
    }

    var pieces = line.split(',')
    if (pieces.length > 1) {
      gameObject.id = pieces[1].trim()
      gameObject.opponent = pieces[2].trim()
      gameObject.color = pieces[3].trim()
      gameObject.timestamp = pieces[4].trim()
      gameObject.time_rem = pieces[5].trim()

      games.push(gameObject)    
    }
  }
  return games 
}

