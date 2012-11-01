var currentGames = []

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
  document.querySelector('#all_games').addEventListener('click', findOrOpenDGSStatusTab);
});


checkServerStatus(function(text) {
  currentGames = parseStatus(text);
  var listString = ""
  for (var i = 0; i < currentGames.length; i++) {
    listString += lineForGame(currentGames[i])
  }
  document.getElementById('games_list').innerHTML = listString
  if (currentGames.length == 0) {
    document.getElementById('title').innerHTML = "Take a walk take a rest"
  }
})


