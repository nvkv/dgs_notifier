var DGSOptions = {}

DGSOptions.restore = function() {
  DGSOptions.options = JSON.parse(localStorage.getItem('dgs_options'))
  if (DGSOptions.options == null) {
    DGSOptions.options = {}
  }
}

DGSOptions.save = function() {
  localStorage.setItem('dgs_options', JSON.stringify(DGSOptions.options))
}


DGSOptions.restore()

function save() {
  DGSOptions.options.frequency = Number(document.getElementById('check_frequency').value)
  DGSOptions.options.hardcoreMode = document.getElementById('hardcore_mode').checked 
  DGSOptions.save()
  startChecking()
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#save_options').addEventListener('click', save);

  var freqSelector = document.getElementById('check_frequency')
  var options = freqSelector.options

  for (var i = 0; i < options.length; i++) {
    if (options[i].value == DGSOptions.options.frequency) {
      freqSelector.selectedIndex = i;
    }
  } 

  document.getElementById('hardcore_mode').checked = DGSOptions.options.hardcoreMode
});
