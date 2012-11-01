setInterval(
  function() {
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
  }, 
  6000
);

