function refreshGames()
{
  checkServerStatus(function(text) {
    DGSState.currentGames = parseStatus(text);
    DGSState.save()
    var count = DGSState.currentGames.length
    if (count > 0) {
      chrome.browserAction.setBadgeText({'text': count.toString()});
    }
    else {
      chrome.browserAction.setBadgeText({'text': ''});
    }
  })
}

function startChecking() {

  if (localStorage["background_task_id"] != null) {
    clearInterval(localStorage["background_task_id"])
  }
  
  options = JSON.parse(localStorage['dgs_options'])
  if (options == null) {
    options = {}
  }

  var freq = options.frequency
  if (freq == null) {
    freq = 300000;
  }
  
  var intervalId = setInterval(refreshGames, freq);  
  localStorage["background_task_id"] = intervalId;
  refreshGames()
}

startChecking()
