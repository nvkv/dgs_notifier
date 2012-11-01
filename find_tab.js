function findOrOpenDGSStatusTab() 
{
  chrome.tabs.getAllInWindow(null, function (tabs) {
    var dgsTab = null;
    for (var i = 0; i < tabs.length; i++) {
      var tab = tabs[i];
      if (tab.url == statusUrl) {
        dgsTab = tab;
      }
    }
    openDGSTab(dgsTab);
  });
}


function openDGSTab(dgsTab) 
{
  if (dgsTab == null) {
   chrome.tabs.create({'url': statusUrl});
  } 
  else {
    chrome.tabs.update(dgsTab.id, {'selected' : true, 'url' : statusUrl}, function(){})
  }
}

