
// get all the nececary elements
var containerEl = document.querySelector(".container")
var headerEl = document.querySelector(".header")
var highScoreEl = document.querySelector(".high-scores")
var timeEl = document.querySelector(".time")
var startBtn = document.querySelector(".startBtn")
var questionEl = document.querySelector(".question")
var answerChoicesEl = document.querySelector(".answers-choice")
var resultScore = document.querySelector(".result-score")
var resultEl = document.querySelector(".result")
var scoreEl = document.querySelector(".score")
var startScreenEl = document.querySelector(".start-screen")
var answerIndex = 0
var score = 0
var questionIndex = 0


// Set the time limit to 2 minutes (in seconds)
const timeLimit = 120

// questions and answers array
const jsQuestions = [{
    question: "What is JavaScript?",
    options: ["Language", "Framework", "Library", "Tool"],
    answer: 2
},
{
    question: "What is the meaning of NaN in JavaScript?",
    options: ["Null and Negative", "Not a Number", "Not Available Now", "No Action Needed"],
    answer: 1
},
{
    question: "What is an event in JavaScript?",
    options: ["Action", "Function", "Variable", "Object"],
    answer: 0
},
{
    question: "What is the difference between var, let, and const?",
    options: ["Access", "Definition", "Declaration", "None"],
    answer: 2
},
{
    question: "What is the difference between == and === in JavaScript?",
    options: ["Operator", "Assignment", "Expression", "Comparison"],
    answer: 3
},
{
    question: "What is the DOM in JavaScript?",
    options: ["Object", "Class", "Function", "Module"],
    answer: 0
},
{
    question: "What is a callback function in JavaScript?",
    options: ["Object", "Class", "Module", "Function"],
    answer: 3
},
{
    question: "What is hoisting in JavaScript?",
    options: ["Assignment", "Declaration", "Initialization", "None"],
    answer: 1
},
{
    question: "What is a prototype in JavaScript?",
    options: ["Object", "Function", "Class", "Module"],
    answer: 2
},
{
    question: "What is a closure in JavaScript?",
    options: ["Function", "Variable", "Object", "Class"],
    answer: 0
}
]


// initialize the game and load the first question
function startQuiz() {

    startBtn.addEventListener("click", function (e) {
        if (startBtn) {
            console.log("Quiz Started")
            headerEl.classList.add("show")
            timeEl.classList.add("show")
            questionEl.classList.add("show")
            resultEl.classList.add("show")
            answerChoicesEl.classList.add("show")
            resultScore.classList.add("show")
            startScreenEl.classList.add("hide")
        }

        loadQuestion()

    }
    )
}


startQuiz()

// Set the initial time remaining to the time limit
let timeRemaining = timeLimit

// Update the timer display every second
const timer = setInterval(() => {
    // Calculate the  and seconds remaining
    timeRemaining % 60

    // Format the time remaining
    const formattedTime = 'Time: ' + timeRemaining

    // Update the timer display
    timeEl.textContent = formattedTime


    // Decrement the time remaining
    timeRemaining--

    // If the time has run out, stop the timer and render the game over screen
    if (timeRemaining < 0) {
        clearInterval(timer)
        timeEl.textContent = 'Time: 0'
        containerEl.innerHTML =
            '<h1>Time is up!</h1>' +
            '<h1>Quiz Complete!</h1>' +
            '<h2>Your score is: ' + score +
            '</h2>' + '<button class="startBtn" onclick="location.reload()">Restart</button>' +
            '<input type="text" id="initials" placeholder="Enter Initials" name="initials" required>' +
            '<button class="submitBtn" onclick="setHighScore()">Submit</button>'


    }
}, 1000)



// function to load the questions and answers
function loadQuestion(question) {
    answerChoicesEl.innerHTML = ""
    if (questionIndex < jsQuestions.length) {
        var question = jsQuestions[questionIndex].question
        var options = jsQuestions[questionIndex].options
        questionEl.textContent = question
        //loop through the options and create buttons for each option
        for (var i = 0; i < options.length; i++) {
            var option = options[i]
            var btn = document.createElement("button")
            btn.textContent = option
            btn.dataset.index = i

            if (timeRemaining > 0) {
                btn.classList.add("btn")
                answerChoicesEl.appendChild(btn)
                btn.addEventListener("click", checkAnswer)
            } else {
                clearInterval(timer)
                questionEl.textContent = ""
                containerEl.innerHTML = endOfQuiz()

                // '<h1>Time is up!</h1>' +
                // '<h1>Quiz Complete!</h1>' +
                // '<h2>Your score is: ' + score + '</h2>' +
                // '<button class="startBtn" onclick="location.reload()">Restart</button>' +
                // '<input type="text" id="initials" placeholder="Enter Initials" name="initials" required>' +
                // '<button class="submitBtn" onclick="setHighScore()">Submit</button>'

            }
            //if there are no more questions, end the quiz
            if (questionIndex >= jsQuestions.length) {
                endOfQuiz()

                // '<h2>Quiz Complete!</h2>' +
                // '<h2>Your score is: ' + score + '</h2>' +
                // '<button class="startBtn" onclick="location.reload()">Restart</button>' +
                // '<input type="text" id="initials" placeholder="Enter Initials" name="initials" required>' +
                // '<button class="submitBtn" onclick="setHighScore()">Submit</button>'
            }
        }
    } else {
        questionEl.textContent = ""
        endOfQuiz()

        // '<h2>Quiz Complete!</h2>' +
        // '<h2>Your score is: ' + score + '</h2>' +
        // '<button class="startBtn" onclick="location.reload()">Restart</button>' +
        // '<input type="text" id="initials" placeholder="Enter Initials" name="initials" required>' +
        // '<button class="submitBtn" onclick="setHighScore()">Submit</button>'
    }
}

// check the answer and if correct, add  points to the score and load the next question and if incorrect, subtract time from the timer
function checkAnswer() {
    var index = this.dataset.index

    if (index == jsQuestions[questionIndex].answer) {

        resultEl.textContent = "Correct!"
        resultEl.style.cssText = "color: green"
        score += 25
        scoreEl.innerHTML = ('Score ' + score)
        console.log(score)
        // resultEl.classList.add("correct")


        setTimeout(function () {
            // answerChoicesEl.innerHTML = ""
            resultEl.textContent = ""

        }, 1000); // 2000 milliseconds = 2 seconds
        questionIndex++
        if (questionIndex >= jsQuestions.length) {

            questionEl.textContent = ""
            endOfQuiz()

        }
        loadQuestion(questionIndex)
        if (localStorage.getItem('highScore') < score) {
            localStorage.setItem('highScore', score);

        }




    } else {
        console.log("wrong")
        resultEl.textContent = "Wrong!"
        resultEl.style.cssText = "color: red"
        timeRemaining -= 10
        score -= 2
        scoreEl.innerHTML = ('Score ' + score)
        setTimeout(function () {
            resultEl.textContent = ""


        }, 1000)
    }
}

// Function to render the game over screen
function endOfQuiz() {


    containerEl.innerHTML = '<h2>Quiz Complete!</h2>' +
        '<h2>Your score is: ' + score + '</h2>' +
        '<button class="startBtn" onclick="location.reload()">Restart</button>' +
        '<input type="text" id="initials" placeholder="Enter Initials" name="initials" required>' +
        '<button class="submitBtn" onclick="setHighScore()">Submit</button>'
}


var highScore = localStorage.getItem('highScore')
var initial = localStorage.getItem('initial')
if (highScore === null) {
    highScore = 0
    initial = ""
}

highScoreEl.textContent = "High Score: " + highScore + " by " + initial


function setHighScore(initial) {

    initial = document.getElementById('initials').value
    if (initial === null) {
        initial = ""

    }
    localStorage.setItem('initial', initial)



}



