// variables that connect html elements to js
var scores = document.querySelector("#scores");
var clearScores = document.querySelector("#clear-scores");
var backButton = document.querySelector("#back-button");

// clear local storage
clearScores.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

// gabs all scores from local storage to display
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

// if scores exists, then loop through them and creat an li for each score and initial set
if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " - " + allScores[i].score;
        scores.appendChild(createLi);
    }
}

//go back to index.html
backButton.addEventListener("click", function() {
    window.location.replace("./index.html");
});