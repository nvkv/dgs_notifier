var DGSState = {}
DGSState.currentGames = []

DGSState.save = function() {
  var serializedState = JSON.stringify(this.currentGames)
  localStorage.setItem('dgs_status', serializedState)
}

DGSState.restore = function() {
  this.currentGames = JSON.parse(localStorage.getItem('dgs_status'))
}
