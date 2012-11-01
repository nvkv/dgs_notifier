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
  return ("<li>" + 
         "<a target='blank'" +
         "href='http://www.dragongoserver.net/game.php?gid={id}'>" +
         "{color}: {opponent} ({time_rem})" +
         "</a>" +
         "</li>").supplant(game)
}


document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#all_games').addEventListener('click', findOrOpenDGSStatusTab);
});


checkServerStatus(function(text) {
  currentGames = parseStatus(text);
  var listString = ""
  for (var i = 0; i < currentGames.length; i++) {
    listString += lineForGame(currentGames[i])
  }
  document.getElementById('games_list').innerHTML = listString
})


