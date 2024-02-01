const quizData = [
  {
    question: "There is _______ in your hair. I think it is a bug.",
    answers: ["Nothing", "Something", "Anything"],
    correct: "Something",
  },
  {
    question:
      "I will try to find you _________ you go. You cannot escape from me.",
    answers: ["Nowhere", "Somewhere", "Anywhere"],
    correct: "Anywhere",
  },
  {
    question: "He didn’t say _________useful. All nonsense.",
    answers: ["Everything", "Nothing", "Anything"],
    correct: "Anything",
  },
  {
    question: "Don’t blame yourself for the mistake. ________ is perfect.",
    answers: ["Everybody", "Nobody", "Anybody"],
    correct: "Nobody",
  },
  {
    question:
      "Why are you looking at me so angrily? I didn’t do ________wrong.",
    answers: ["Everything", "Anything", "Nothing"],
    correct: "Anything",
  },
  {
    question:
      "Look I’ve found __________interesting here. Oh, never mind, it’s just a button.",
    answers: ["Everything", "Nothing", "Something"],
    correct: "Something",
  },
  {
    question: "My dictionary was just on the desk. ____________ took it!",
    answers: ["Everybody", "Somebody", "Anybody"],
    correct: "Somebody",
  },
  {
    question:
      "__________we did to rescue the dog was useful. It died despite our efforts.",
    answers: ["Everything", "Something", "Nothing"],
    correct: "Nothing",
  },
  {
    question: "He was so helpful. He helped nearly __________ in the village",
    answers: ["Anybody", "Nobody", "Everybody"],
    correct: "Everybody",
  },
  {
    question: "The police found the murder weapon __________ near the hut.",
    answers: ["Nowhere", "Everywhere", "Somewhere"],
    correct: "Somewhere",
  },
];

const questionContainer = document.getElementById("question-container");
const answersForm = document.getElementById("answers-form");
const submitButton = document.getElementById("submit-button");
const resultContainer = document.getElementById("result-container");
const scoreMessage = document.getElementById("score-message");
const mistakesContainer = document.getElementById("mistakes-container");

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

function loadQuestion() {
  const currentQuizData = quizData[currentQuestion];
  questionContainer.innerHTML = currentQuizData.question;

  answersForm.innerHTML = "";
  currentQuizData.answers.forEach((answer, index) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = answer;
    input.id = `answer${index}`;

    const label = document.createElement("label");
    label.innerHTML = answer;
    label.setAttribute("for", `answer${index}`);

    const div = document.createElement("div");
    div.appendChild(input);
    div.appendChild(label);

    answersForm.appendChild(div);
  });
}

function checkAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (!selectedAnswer) {
    userAnswers.push({
      question: quizData[currentQuestion].question,
      userAnswer: "Not answered",
    });
  } else {
    const isCorrect =
      selectedAnswer.value === quizData[currentQuestion].correct;
    userAnswers.push({
      question: quizData[currentQuestion].question,
      userAnswer: selectedAnswer.value,
      isCorrect,
    });
    if (isCorrect) {
      score++;
    }
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionContainer.innerHTML = "";
  answersForm.innerHTML = "";
  submitButton.style.display = "none";

  scoreMessage.innerHTML = `Your Score: ${score} out of ${quizData.length}`;
  displayUserAnswers();
  resultContainer.style.display = "block";
}

function displayUserAnswers() {
  mistakesContainer.innerHTML = "<h3>Your Answers:</h3>";
  userAnswers.forEach((answer, index) => {
    const status = answer.isCorrect
      ? "<i>Correct</i>"
      : "<span>Incorrect</span>";
    const correctAnswer = quizData[index].correct;
    mistakesContainer.innerHTML += `<p>${index + 1}. ${
      answer.question
    }<br> Your Answer: ${
      answer.userAnswer
    }<br> Correct Answer: ${correctAnswer}<br> Status: ${status}</p>`;
  });
}

submitButton.addEventListener("click", checkAnswer);
loadQuestion();
