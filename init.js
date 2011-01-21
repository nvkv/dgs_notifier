var statusUrl = 'http://www.dragongoserver.net/status.php';
var rssUrl    = 'http://www.dragongoserver.net/rss/status.php';

function checkServerStatus() {
    var request = new XMLHttpRequest();
    request.open("GET", rssUrl, true);
    request.onreadystatechange = function() {
	if (request.readyState == 4) {
	    countGames(request.responseXML.getElementsByTagName('item'));
	}
    }
    request.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 1984 00:00:00 GMT");
    request.send();
}


function countGames(rssItems) {
    if (rssItems.length == 1 && rssItems.item(0).childNodes[1].firstChild.nodeValue == 'Empty lists') {
	chrome.browserAction.setBadgeText({'text': ''});
    } else {
	chrome.browserAction.setBadgeText({'text': rssItems.length.toString()});
    }
}


function findOrOpenDGSStatusTab() {
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


function openDGSTab(dgsTab) {
    if (dgsTab == null) {
	chrome.tabs.create({'url': statusUrl}); 
    } else {
	chrome.tabs.update(dgsTab.id, {'selected' : true, 'url' : statusUrl}, function(){})
    }
}


chrome.browserAction.onClicked.addListener(function(tab) {
    findOrOpenDGSStatusTab();
});


setInterval(checkServerStatus, 5000);
