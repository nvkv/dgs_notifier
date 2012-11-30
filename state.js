var DGSState = {}
DGSState.currentGames = []

DGSState.save = function() {
	var serializedState = JSON.stringify(this.currentGames)
	localStorage.setItem('dgs_status', serializedState)
}

DGSState.restore = function() {
	this.currentGames = JSON.parse(localStorage.getItem('dgs_status'))
}

var DGSOptions = {}

DGSOptions.restore = function() {
	DGSOptions.options = JSON.parse(localStorage.getItem('dgs_options'))
	if (DGSOptions.options == null) {
		DGSOptions.options = {}
		DGSOptions.options.hardcoreMode = false
	}
}

DGSOptions.save = function() {
	localStorage.setItem('dgs_options', JSON.stringify(DGSOptions.options))
}

DGSOptions.init = function() {
	if (DGSOptions.options.hardcoreMode) {
		chrome.browserAction.setPopup({popup: ""})
		chrome.browserAction.onClicked.addListener(function(tab) {
			findOrOpenDGSStatusTab()
		});
	}
	else {
		chrome.browserAction.setPopup({popup: "games_list.html"})
		chrome.browserAction.onClicked.listeners_ = []
	}
}

DGSOptions.restore()
DGSOptions.init()
