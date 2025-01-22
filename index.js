const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "A. Hyperlinks and Text Markup Language", correct: false },
            { text: "B. Hyper Text Markup Language", correct: true },
            { text: "C. Home Tool Markup Language", correct: false },
            { text: "D. Hyper Tool Markup Language", correct: false },
        ]
    },
    {
        question: "Which programming language is known as the 'language of the web'?",
        answers: [
            { text: "A. Python", correct: false },
            { text: "B. C++", correct: false },
            { text: "C. JavaScript", correct: true },
            { text: "D. Java", correct: false },
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "A. Computer Style Sheet", correct: false },
            { text: "B. Cascading Style Sheets", correct: true },
            { text: "C. Creative Style Sheets", correct: false },
            { text: "D. Colorful Style Sheets", correct: false },
        ]
    },
    {
        question: "Which of the following is a version control system?",
        answers: [
            { text: "A. Git", correct: true },
            { text: "B. Docker", correct: false },
            { text: "C. Kubernetes", correct: false },
            { text: "D. React", correct: false },
        ]
    }
];

const questionElement = document.getElementById("Question");
const nextButton = document.getElementById("next-btn");
const option_A = document.getElementById("btn1");
const option_B = document.getElementById("btn2");
const option_C = document.getElementById("btn3");
const option_D = document.getElementById("btn4");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    console.log("startQuiz");
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    showOptions();
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = "Q" + questionNo + "〙" + currentQuestion.question;
    console.log("showQuestion", currentQuestion);
}

function showOptions() {
    let currentQuestion = questions[currentQuestionIndex];
    option_A.innerHTML = currentQuestion.answers[0].text;
    option_B.innerHTML = currentQuestion.answers[1].text;
    option_C.innerHTML = currentQuestion.answers[2].text;
    option_D.innerHTML = currentQuestion.answers[3].text;
    console.log("showOptions", currentQuestion.answers);
}

function nextSequence() {
    currentQuestionIndex++;
    showQuestion();
    showOptions();
    removeClasses();
}

function removeClasses() {
    const buttons = document.getElementsByClassName("btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("correct");
        buttons[i].classList.remove("wrong");
    }
}

let quizStarted = false;

nextButton.addEventListener("click", function () {
    if (!quizStarted) {
        startQuiz();
        quizStarted = true;
        nextButton.innerHTML = "Next";
    } else if (currentQuestionIndex < questions.length - 1) {
        nextSequence();
    } else {
        document.querySelector("h1").innerHTML = "The end of the quiz is not the end of the journey, dear player. Just like Caraval, this was merely the beginning of a grander tale.";
        quizStarted = false;
        nextButton.innerHTML = "Restart";
        showScore();
    }
});

const buttons = document.getElementsByClassName("btn");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        let currentQuestion = questions[currentQuestionIndex];
        let selectedAnswer = currentQuestion.answers[i];

        if (selectedAnswer.correct) {
            score++;
            buttons[i].classList.add("correct");
        } else {
            buttons[i].classList.add("wrong");

            
            let correctAnswer = currentQuestion.answers.find(answer => answer.correct);
            let correctButton = Array.from(buttons).find(button => button.innerHTML === correctAnswer.text);
            if (correctButton) {
                correctButton.classList.add("correct");
            }
        }
    });
}

function showScore() {
    document.querySelector("h2").innerHTML = "Your score is " + score + " out of " + questions.length;
}