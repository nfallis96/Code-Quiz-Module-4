// starting numeric values for quiz
var currentScore = 0;
var questionNumber = 0;
var startingTime = 60;
var timerId = 0;
var incorrectPenalty = 15;

// variables to connect html elements to the js
var createList = document.createElement("ol");
var timeLeft = document.querySelector("#time-left");
var startGame = document.querySelector("#start-button");
var quizQuestion = document.querySelector("#quiz-question");
var card = document.querySelector("#card");
var createParagraph = document.getElementById("create-paragraph")
var createInitials = document.getElementById("initials")
var createSubmitButton = document.getElementById("submit-button");
var startquiz = document.querySelector(".startQuiz")
var endquiz = document.querySelector(".endQuiz")
endquiz.style.display = "none";

// array of questions, choices, and correct answer
var questions = [
    {
        question: "Javascript is an _________ language.",
        choices: ["Object-Oriented", "Object-Based", "Procedural", "None of the above"],
        answer: "Object-Oriented"
    },
    {
        question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        choices: ["Throws an error", "Ignores the statements", "Gives a warning", "None of the above"],
        answer: "Ignores the statements"
    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        choices: ["document.write()", "console.log()", "window.alert()", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        choices: ["const", "var", "let", "constant"],
        answer: "const"
    },
    {
        question: "Which of the following are closures in Javascript?",
        choices: ["Variables", "Functions", "Objects", "All of the above"],
        answer: "All of the above"
    },
];

// when you click start button, the timer starts and we call teh render questions function
startGame.addEventListener("click", function () {
    if (timerId === 0) {
        timerId = setInterval(function () {
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

// this function shows each question, and choices for each question
function render(questionNumber) {
    createList.innerHTML = "";
    var displayQuestion = questions[questionNumber].question;
    var displayChoices = questions[questionNumber].choices;
    quizQuestion.textContent = displayQuestion;
    // loops through each choice and creates an li for it
    displayChoices.forEach(function (i) {
        var li = document.createElement("li");
        li.textContent = i;
        quizQuestion.appendChild(createList);
        createList.appendChild(li);
        li.addEventListener("click", (compareAnswer));
    })
}

// this function compars what the user clicked on, to what questions[i].answer is to check if what they clicked, is wrong or right
function compareAnswer(e) {
    var selection = e.target;
    if (selection.matches("li")) {
        // if clicked on is correct, then they got it right
        if (selection.textContent == questions[questionNumber].answer) {
            currentScore++;
            // if clicked on not correctm then they got it wrong
        } else {
            startingTime = startingTime - incorrectPenalty;
        }
    }
    // after checking if clicked on is right or wrong, it goes to the next question and set of answers
    questionNumber++;
    // becuase im not using a for loop, i need to tell it when the end of the questions array is hit to end the game
    if (questionNumber >= questions.length) {
        endGame();
    } else {
        render(questionNumber);
    }
}

// this function will end the quiz, and prompt them to enter intials
function endGame() {
    startquiz.style.display = "none"
    endquiz.style.display = "block"
    quizQuestion.innerHTML = "";
    timeLeft.innerHTML = "";
    var timeRemaining = 0;
    if (startingTime >= 0) {
        timeRemaining = startingTime;
        clearInterval(timerId);
    }
    createParagraph.textContent = timeRemaining;
    createSubmitButton.addEventListener("click", function () {
        var initials = createInitials.value;
        if (initials === null || initials == "") {
            console.log("No initials entered");
        } else {
            var endScore = {
                initials: initials,
                score: timeRemaining
            }
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(endScore);
            var newAllScores = JSON.stringify(allScores);
            localStorage.setItem("allScores", newAllScores);
            window.location.replace("scores.html");
        }
    });
}