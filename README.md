# Code-Quiz-Module-4

## Table of Contents
* [Projects Description](#projects-description)
* [Demo](#demo-of-application)
* [Screenshots - Code examples](#screenshots---code-examples)
* [Technologies Used](#technologies-used)
* [Links](#links)

## Projects Description
In this project, the purpose was to create a coding quiz that tests a user's understanding of javascript. The application is a quiz that is timed with multiple choice questions. 

This application includes JavaScript, HTML and CSS. A few features included in this application are: a timer function that deducts time from the quiz due to incorrect answers, and displays the user's next question when an answer is submitted. Furthermore, it allows the user to save the highest score in the local storage and see them on a page that displays the history of all scores.

## DEMO of Application
demo of application
![Demo](demo.gif)


## Screenshots - Code examples
Screen shot of application
![Code-Quiz Screenshot](code-quiz.png)

 for the multiple choices of the quiz
```js  
    displayChoices.forEach(function (newEl) {
        var li = document.createElement("li");
        li.textContent = newEl;
        quizQuestion.appendChild(createList);
        createList.appendChild(li);
        li.addEventListener("click", (compareAnswer));
    })
 ```

## Technologies Used 
![html badge](https://img.shields.io/badge/language-html-red)
![css badge](https://img.shields.io/badge/language-css-green)
![javascript badge](https://img.shields.io/badge/language-javascript-yellow)

## Links
link to github: https://github.com/nfallis96
link to deployment: https://nfallis96.github.io/Code-Quiz-Module-4/