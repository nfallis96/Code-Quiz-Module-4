
var questionNumber = 0;
var startGame = document.querySelector("#start-button");
var QuestionsEl = document.querySelector("#questions");
var Time = 60;
var Timerid;
var TimerEl = document.getElementById("time")
var ChoicesEl = document.getElementById("choices")
var Submitbutton = document.getElementById("submit")
var InitialsEl = document.getElementById("initials")

// 
function startquiz() {
    var startscreenEl = document.getElementById("start-screen")
    startscreenEl.setAttribute("class", "hide")
    QuestionsEl.removeAttribute("class")
    Timerid = setInterval(countdown, 1000)
    TimerEl.textContent = Time
    getquestion()
}


// display question and choices to the card
function getquestion() {
    var currentquestion = questions[questionNumber]
    var titleEl = document.getElementById("question-title")
    titleEl.textContent = currentquestion.title
    ChoicesEl.innerHTML = ""
    
    for (var i = 0; i < currentquestion.choices.length; i++) {
       var choice = currentquestion.choices[i]
       var choicenode = document.createElement("button")
       choicenode.setAttribute("class", "choice")
       choicenode.setAttribute("value", choice)
       choicenode.textContent = i + 1 + ". " + choice
       ChoicesEl.appendChild(choicenode)
    }

}

function countdown() {
    Time--
    TimerEl.textContent = Time
    if(Time <= 0) {
        endGame()
    }

}

// 
function compareAnswer(e) {
    var selection = e.target;
 
    if (!selection.matches(".choice")) {
        return
    }

    if (selection.value!==questions[questionNumber].answer) {
        Time-=15
        if (Time<0) {
            Time=0
        }
        TimerEl.textContent=Time
    }
    questionNumber++
    if (Time<=0 || questionNumber===questions.length) {
        endGame()
    }
    else {
        getquestion()
    }


    // if (selection.matches("li")) {
    //     var createDiv = document.createElement("div");
    //     createDiv.setAttribute("id", "createDiv");
    //     if (selection.textContent == questions[questionNumber].answer) {
    //         currentScore++;
    //         createDiv.textContent = questions[questionNumber].answer + " is correct!";
    //     } else {
    //         startingTime = startingTime - incorrectPenalty;
    //         createDiv.textContent = "That is incorrect, the answer is: " + questions[questionNumber].answer;
    //     }
    // }
    questionNumber++;

    if (questionNumber >= questions.length) {
        createDiv.textContent = "Game Over! You correctly answered " + currentScore + "/" + questions.length + " questions";
        endGame();
    } else {
        render(questionNumber);
    }
    quizQuestion.appendChild(createDiv);
}

//  
function endGame() {
    clearInterval(Timerid)
    var endScreen = document.getElementById("end-screen")
    endScreen.removeAttribute("class")
    var finalscore = document.getElementById("final-score")
    finalscore.textContent = Time
    QuestionsEl.setAttribute("class", "hide")
}

function highscores() {
    var initials = InitialsEl.value.trim() 
    if (initials!== "") {
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || []
        var newscore = {
            score: Time, 
            initials: initials,
        }
        highscores.push(newscore)
        window.localStorage.setItem("highscores", JSON.stringify("highscores"))
        window.location.href = "scores.html"
    }
}
Submitbutton.onclick = highscores
startGame.onclick = startquiz
ChoicesEl.onclick = compareAnswer

 
