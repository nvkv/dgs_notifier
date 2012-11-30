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



function parseStatus(statusString)
{
	var lines = statusString.split('\n')
	var games = []

	for (var i = 0; i < lines.length; i++) {
		var line = lines[i]

		/* Ignoring Warnings and blank lines */
		if (line.indexOf("[") == 0 || line == "") {
			continue
		}

		/* Just to be clear: this is struct :) */
		var gameObject = {
			"id": null,
			"opponent": null,
			"color": null,
			"timestamp": null,
			"time_rem": null 
		}

		var pieces = line.split(',')

		var cleanup = function(text) {
			return text.trim().replace(/\'/g, "")
		}

		/* Check line, just in case */
		if (pieces.length > 4) {
			gameObject.id = cleanup(pieces[1])
			gameObject.opponent = cleanup(pieces[2])
			gameObject.color = cleanup(pieces[3]) == "W" ? "○" : "●";
			gameObject.timestamp = cleanup(pieces[4])
			gameObject.time_rem = cleanup(pieces[5])
			games.push(gameObject)		
		}
		else {
			console.log("Error: DGS returned game in strange format")
		}
	}
	return games 
}

