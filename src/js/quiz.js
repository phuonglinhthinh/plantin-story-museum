const questions = [
    {
        text: "Was Christophe Plantin born in Antwerp?",
        answer: "No",
        userAnswer: null,
    },
    {
        text: "Did Plantin’s workshop have 22 printing presses at its peak?",
        answer: "Yes",
        userAnswer: null,
    },
    {
        text: "Is the Plantin-Moretus Museum a UNESCO World Heritage Site?",
        answer: "Yes",
        userAnswer: null,
    },
    {
        text: "Did Plantin create the first-ever printing press?",
        answer: "No",
        userAnswer: null,
    },
    {
        text: "Are the Polyglot Bibles printed in multiple languages?",
        answer: "Yes",
        userAnswer: null,
    },
];

let currentQuestion = 0;

// DOM Elements
const landing = document.querySelector("#landing");
const quizPage = document.querySelector("#quizPage");
const resultPage = document.querySelector("#resultPage");
const questionText = document.querySelector("#questionText");
const yesButton = document.querySelector("#yesButton");
const noButton = document.querySelector("#noButton");
const progressBar = document.querySelector("#progressBar");
const resultText = document.querySelector("#resultText");
const feedbackText = document.querySelector("#feedbackText");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const finishButton = document.querySelector("#finishButton");

// Load the current question
const loadQuestion = () => {
    questionText.textContent = questions[currentQuestion].text;
    updateProgress();

    // Highlight selected answer
    if (questions[currentQuestion].userAnswer === "Yes") {
        yesButton.classList.add("selected");
        noButton.classList.remove("selected");
    } else if (questions[currentQuestion].userAnswer === "No") {
        noButton.classList.add("selected");
        yesButton.classList.remove("selected");
    } else {
        yesButton.classList.remove("selected");
        noButton.classList.remove("selected");
    }

    // Handle button visibility
    prevButton.style.visibility = currentQuestion === 0 ? "hidden" : "visible";
    nextButton.classList.toggle("hidden", currentQuestion === questions.length - 1);
    finishButton.classList.toggle("hidden", currentQuestion !== questions.length - 1);
};

// Handle answer selection
const handleAnswer = (selected) => {
    questions[currentQuestion].userAnswer = selected;

    yesButton.classList.toggle("selected", selected === "Yes");
    noButton.classList.toggle("selected", selected === "No");
};

// Navigate between questions
const navigateQuestion = (direction) => {
    if (currentQuestion === questions.length - 1 && direction === 1) {
        showResult();
    } else {
        currentQuestion += direction;
        loadQuestion();
    }
};

// Update progress bar
const updateProgress = () => {
    progressBar.innerHTML = questions
        .map((_, index) =>
            `<div class="${index === currentQuestion ? "active" : ""}"></div>`
        )
        .join("");
};

// Show result page
const showResult = () => {
    const score = questions.filter((q) => q.userAnswer === q.answer).length;

    quizPage.classList.add("hidden");
    resultPage.classList.remove("hidden");

    resultText.textContent =
        score >= 4 ? "Congrats! 🎉" : "Nice try! Keep practicing.";
    feedbackText.textContent = `You scored ${score}/5.`;
};

// Reset quiz
const resetQuiz = () => {
    currentQuestion = 0;
    questions.forEach((q) => (q.userAnswer = null));
    resultPage.classList.add("hidden");
    quizPage.classList.remove("hidden");
    loadQuestion();
};

// Initialize the quiz functionality
// Initialize the quiz
const init = () => {
    // Landing Page: Start Quiz
    document.querySelector("#startQuiz").addEventListener("click", () => {
        landing.classList.add("hidden");
        quizPage.classList.remove("hidden");
        loadQuestion();
    });

    // Answer Buttons
    yesButton.addEventListener("click", () => handleAnswer("Yes"));
    noButton.addEventListener("click", () => handleAnswer("No"));

    // Navigation Buttons
    prevButton.addEventListener("click", () => navigateQuestion(-1));
    nextButton.addEventListener("click", () => navigateQuestion(1));
    finishButton.addEventListener("click", showResult);

    // Restart Quiz
    document.querySelector("#restartQuiz").addEventListener("click", () => {
        resetQuiz();
    });
};
init();
