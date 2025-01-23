const questions = [
    {
        text: "Was Christophe Plantin born in Antwerp?",
        answer: "No",
    },
    {
        text: "Did Plantin’s workshop have 22 printing presses at its peak?",
        answer: "Yes",
    },
    {
        text: "Is the Plantin-Moretus Museum a UNESCO World Heritage Site?",
        answer: "Yes",
    },
    {
        text: "Did Plantin create the first-ever printing press?",
        answer: "No",
    },
    {
        text: "Are the Polyglot Bibles printed in multiple languages?",
        answer: "Yes",
    },
];

let currentQuestion = 0;
let score = 0;

const landing = document.getElementById("landing");
const quizPage = document.getElementById("quizPage");
const resultPage = document.getElementById("resultPage");
const questionText = document.getElementById("questionText");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const progressBar = document.getElementById("progressBar");
const resultText = document.getElementById("resultText");
const feedbackText = document.getElementById("feedbackText");

document.getElementById("startQuiz").addEventListener("click", () => {
    landing.classList.add("hidden");
    quizPage.classList.remove("hidden");
    loadQuestion();
});

yesButton.addEventListener("click", () => checkAnswer("Yes"));
noButton.addEventListener("click", () => checkAnswer("No"));

document.getElementById("restartQuiz").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    resultPage.classList.add("hidden");
    quizPage.classList.remove("hidden");
    loadQuestion();
});

const loadQuestion = () => {
    questionText.textContent = questions[currentQuestion].text;
    updateProgress();
}

const checkAnswer = (selected) => {
    if (selected === questions[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

const updateProgress = () => {
    progressBar.innerHTML = questions
        .map((_, index) =>
            `<div class="${index <= currentQuestion ? "active" : ""}"></div>`
        )
        .join("");
}

const showResult = () => {
    quizPage.classList.add("hidden");
    resultPage.classList.remove("hidden");

    resultText.textContent =
        score >= 4 ? "Congrats! 🎉" : "Nice try! Keep practicing.";
    feedbackText.textContent = `You scored ${score}/5.`;
}
