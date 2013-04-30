String.prototype.supplant = function (o) {
	return this.replace(/{([^{}]*)}/g,
		function (a, b) {
			var r = o[b];
			return typeof r === 'string' || typeof r === 'number' ? r : a;
		}
	);
};


function lineForGame(game) 
{
	return ("<div>" + 
			"<a target='blank'" +
			"href='http://www.dragongoserver.net/game.php?gid={id}'>" +
			"{color} {opponent}" +
			"</a>" +
			"</div>").supplant(game)
}


document.addEventListener('DOMContentLoaded', function() {

	document.querySelector('#all_games').addEventListener('click', findOrOpenDGSStatusTab)
	document.querySelector('#clear').addEventListener('click', clearStatus)

	DGSState.restore()

	var listString = ""
	if (DGSState.currentGames == 'Error') {
		document.getElementById('title').innerHTML = "<div stlyle='color:red'>You should really log in DGS first</div>"
	} else if (DGSState.currentGames != null) {
		for (var i = 0; i < DGSState.currentGames.length; i++) {
 			listString += lineForGame(DGSState.currentGames[i])
		}
	} 

	document.getElementById('games_list').innerHTML = listString

	var links = document.querySelectorAll('a')
	for (var i = 0; i < links.length; i++) {
		var link = links[i] 
		link.addEventListener('click', function() {
				chrome.browserAction.setBadgeText({'text': '?'});
		});
	}

	if (DGSState.currentGames && DGSState.currentGames.length == 0) {
		document.getElementById('title').innerHTML = "Take a walk take a rest"
	}
});


