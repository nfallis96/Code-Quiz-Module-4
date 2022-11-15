function printscores () {
    var highscores = JSON.parse (window.localStorage.getItem("highscores")) || []
    highscores.sort(function (a,b){
        return b.score-a.score 
    })
for(var i=0; i< highscores.length; i++)
}