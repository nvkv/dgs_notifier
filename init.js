var badgeCount = 0;

function checkServerStatus() 
{
    var request = new XMLHttpRequest();
    request.open("GET", "http://www.dragongoserver.net/rss/status.php", true);
    request.onreadystatechange = function() {
	if (request.readyState == 4) {
	    countGames(request.responseXML.getElementsByTagName('item'));
	}
    }
    request.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 1984 00:00:00 GMT");
    request.send();
    badgeCount++;
}


function countGames(rssItems) 
{
    if (rssItems.length == 1 && rssItems.item(0).childNodes[1].firstChild.nodeValue == 'Empty lists') {
	chrome.browserAction.setBadgeText({'text': ''});
    } else {
	chrome.browserAction.setBadgeText({'text': rssItems.length.toString()});
    }
}

setInterval(checkServerStatus, 5000);
