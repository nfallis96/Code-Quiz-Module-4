// create needed variables:

// begin with score at 0
var currentScore = 0; 

// beginning of the array of questions 
var questionNumber = 0;

// time left on the timer
var timeLeft = document.querySelector("#time-left");

// the start button for the quiz and timer
var startGame = document.querySelector("#start-button");

// where the questions will be displayed
var quizQuestion = document.querySelector("#quiz-question");

// place where questions, choices, and start button will be held
var card = document.querySelector("#card");

// time for the quiz
var startingTime = 60;

// Interval declared for use in functions
var timerId = 0;

// penalty for incorrect answer
var incorrectPenalty = 15;

// create ul elements
var createList = document.createElement("ol");


// start timer on click and show timer on screen
startGame.addEventListener("click", function() {
    if (timerId === 0) {
        timerId = setInterval(function() {
            startingTime--;
            timeLeft.textContent = "Seconds Left: " + startingTime;

            if (startingTime <= 0) {
                clearInterval(timerId);
                endGame();
                timeLeft.textContent = "Out of Time!"
            }
        }, 1000);
    }
    render(questionNumber);
});

// give question and choices 
function render(questionNumber) {
    questionNumber.innerHTML = "";
    createList.innerHTML = "";
    
    for (var i = 0; i < questions.length; i++) {
        var displayQuestion = questions[questionNumber].question;
        var displayChoices = questions[questionNumber].choices;
        quizQuestion.textContent = displayQuestion;
    }
    // use for each to display choices
    displayChoices.forEach(function (newEl) {
        var li = document.createElement("li");
        li.textContent = newEl;
        quizQuestion.appendChild(createList);
        createList.appendChild(li);
        li.addEventListener("click", (compareAnswer));
    })
}

// if correct answer display that it is correct. if wrong display that it is wrong
// if last question, end the game and display message telling user how many answers they got correct
function compareAnswer(e) {
    var selection = e.target;
    
    if (selection.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (selection.textContent == questions[questionNumber].answer) {
            currentScore++;
            createDiv.textContent = questions[questionNumber].answer + " is correct!";
        } else {
            startingTime = startingTime - incorrectPenalty;
            createDiv.textContent = "That is incorrect, the answer is: " + questions[questionNumber].answer;
        }
    }
    questionNumber++;

    if (questionNumber >= questions.length) {
        createDiv.textContent = "Game Over! You correctly answered " + currentScore + "/" + questions.length + " questions";
        endGame();
    } else {
        render(questionNumber);
    }
    quizQuestion.appendChild(createDiv);
}

// end game function 
function endGame() {
    // clear content from quizQuestion and timeLeft
    quizQuestion.innerHTML = "";
    timeLeft.innerHTML = "";
    var timeRemaining = 0;

    // create Heading that says Quiz Complete and attach to page
    var createHeading = document.createElement("h1");
    createHeading.setAttribute("id", "create-heading");
    createHeading.textContent = "Quiz Complete!";

    quizQuestion.appendChild(createHeading);

    // to display final score
    var createParagraph = document.createElement("p");
    createParagraph.setAttribute("id", "create-paragraph");

    quizQuestion.appendChild(createParagraph);

    // set score equal to time left on the timer
    if (startingTime >= 0) {
        timeRemaining = startingTime;
        clearInterval(timerId);
    }

    createParagraph.textContent = "Final Score: " + timeRemaining;

    // create label for user to enter initials and attach to page
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "create-label");
    createLabel.textContent = "Enter your initials: ";

    quizQuestion.appendChild(createLabel);

    // create input for user to enter initials and attach to page
    var createInput = document.createElement("input");
    createInput.setAttribute("id", "initials");
    createInput.setAttribute("type", "text");
    createInput.textContent = "";

    quizQuestion.appendChild(createInput);

    // create submit button and attach to page
    var createSubmitButton = document.createElement("button");
    createSubmitButton.setAttribute("id", "submit-button");
    createSubmitButton.setAttribute("type", "submit");
    createSubmitButton.textContent = "Submit";

    quizQuestion.appendChild(createSubmitButton);

    // add event listener to submit button so that it responds to click.
    createSubmitButton.addEventListener("click", function() {
        var initials = createInput.value;
        if(initials === null) {
            console.log("No initials entered"); 
        } else {
                var endScore = {
                initials: initials,
                score: timeRemaining
            }
            
            // get all previous scores from local storage
            var allScores = localStorage.getItem("allScores");
            if(allScores === null) {
                allScores = [];
            } else {
                // user JSON.parse to de-stringify scores when pulling out of local storage
                allScores = JSON.parse(allScores);
            }
            // push end score of the quiz to all scores in local storage
            allScores.push(endScore);
            
            // use JSON.stringify to add newAllScores to local storage
            var newAllScores = JSON.stringify(allScores);
            localStorage.setItem("allScores", newAllScores);

            // navigate to leaderboard page
            window.location.replace("./highscores.html");
        }
    });

}

 
