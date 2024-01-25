// index page json
const categories = [
  {
    id: 1234,
    name: "Computer Science",
  },
  {
    id: 2345,
    name: "Geology",
  },
];

// questions json

// const questions = [
//   {
//     id: 300,
//     title: "What color is the sky?",
//     options: [
//       { id: 10, text: "Blue", isCorrect: true },
//       { id: 20, text: "Red", isCorrect: false },
//       { id: 30, text: "Green", isCorrect: false },
//     ],
//     category: 2345,
//   },
//   {
//     id: 301,
//     title: "Which is a CPU company?",
//     options: [
//       { id: 10, text: "Intel", isCorrect: false },
//       { id: 20, text: "AMD", isCorrect: false },
//       { id: 30, text: "all the above", isCorrect: true },
//     ],
//     category: 1234,
//   },
// ];

const state = {
  categories: [
    {
      id: 1234,
      name: "Computer Science",
    },
    {
      id: 2345,
      name: "Geology",
    },
  ],
  questions: [
    // {
    //   id: 300,
    //   title: "What color is the sky?",
    //   options: [
    //     { id: 10, text: "Blue", isCorrect: true },
    //     { id: 20, text: "Red", isCorrect: false },
    //     { id: 30, text: "Green", isCorrect: false },
    //   ],
    //   category: 2345,
    // },

    {
      id: 301,
      title: "Which is a CPU company?",
      options: [
        { id: 10, text: "Intel", isCorrect: false },
        { id: 20, text: "AMD", isCorrect: false },
        { id: 30, text: "all the above", isCorrect: true },
      ],
      category: 1234,
    },
    {
      id: 303,
      title: "Which is a CPU company?",
      options: [
        { id: 10, text: "Intel", isCorrect: false },
        { id: 20, text: "AMD", isCorrect: false },
        { id: 30, text: "all the above", isCorrect: true },
      ],
      category: 1234,
    },
    {
      id: 302,
      title: "Which is a CPU company?",
      options: [
        { id: 10, text: "Intel", isCorrect: false },
        { id: 20, text: "AMD", isCorrect: false },
        { id: 30, text: "all the above", isCorrect: true },
      ],
      category: 1234,
    },
  ],
  page: "index", // 'question'
};
const knowledge = [
  {
    id: "1",
    question: "What are the major languages spoken in Andhra Pradesh?",
    options: ["Odia ", "tamil", "Telugu ", " Kannada"],
    correctAns: "Telugu",
  },
  {
    id: "2",
    question: "Which state has the largest area?",
    options: ["maharashtra", "madhya pradesh", "uttar pradesh", "rajasthan"],
    correctAns: "rajasthan",
  },
  {
    id: "3",
    question: "Where is the headquarters of ISRO located?",
    options: ["chennai", "bangalore", "mumbai", "pune"],
    correctAns: "bangalore",
  },
  {
    id: "4",
    question: "How many languages does the Indian constitution recognize?",
    options: ["22 ", "15", "10", "31"],
    correctAns: "22",
  },
];
const sports = [
  {
    id: "1",
    question:
      "Which country is the winner of the SAFF Women’s Championship title in 2022?",
    options: ["india", "nepal", "bangladesh", "sri lanka"],
    correctAns: "bangladesh",
  },
  {
    id: "2",
    question: "Which country is the host of the Commonwealth Games 2026",
    options: ["India", "sri lanka", "Australia", "UAE"],
    correctAns: "Australia",
  },
  {
    id: "3",
    question:
      "Which sportsperson was awarded the ‘Dhyan Chand Khel Ratna Award 2022’?",
    options: ["P V Sindhu", "Sharath Kamal", "Mary Kom", "Virat Kohli"],
    correctAns: "Sharath Kamal",
  },
  {
    id: "4",
    question:
      "Eliud Kipchoge, who was seen in the news, is associated with which sports",
    options: [" Cricket", "Marathon", " Weight-Lifting", "tennis"],
    correctAns: "Marathon",
  },
];
// Function to set data in localStorage
function setLocalStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true; // Data successfully stored
  } catch (error) {
    console.error("Error storing data in localStorage:", error);
    return false; // Failed to store data
  }
}
// Function to get data from localStorage
function getLocalStorageItem(key) {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error("Error retrieving data from localStorage:", error);
    return null;
  }
}
// script la check whether knowledge or sports
const questionCollection = {
  knowledge: knowledge,
  sports: sports,
};
// drop-down
const selectElement = document.getElementById("category");
let selectedValue = "";
const quiz = document.querySelector("#quiz");
quiz.style.display = "none";
const category = [
  {
    name: "knowledge",
    value: "knowledge",
  },
  {
    name: "sports",
    value: "sports",
  },
];
// option created and append into select tag
for (let sub of category) {
  const option = document.createElement("option");
  option.value = sub.value;
  option.textContent = sub.name;
  selectElement.appendChild(option);
}
// Get selected value and move to the respected page when the button is clicked
document.getElementById("proceed").addEventListener("click", function () {
  // Proceed data get
  selectedValue = selectElement.value;
  // Store selectedValue in localStorage
  setLocalStorageItem("selectedCategory", selectedValue);
  // Container hide
  const container = document.querySelector(".container");
  container.style.display = "none";
  // Container hide panitu quiz show panu
  const quiz = document.querySelector("#quiz");
  quiz.style.display = "block";
  // Query selector use pani clear function
  clearContent();
  appendToContent();
  appendToButton();
  updateUiList(selectedValue);
});
// ...
// On page load, retrieve the selected category from localStorage
window.addEventListener("load", function () {
  const storedCategory = getLocalStorageItem("selectedCategory");
  if (storedCategory) {
    selectElement.value = storedCategory;
    // Also, you might want to trigger the event as if the user had clicked "proceed" again
    document.getElementById("proceed").click();
  }
});
function clearContent() {
  const content = document.querySelector("#content");
  content.innerHTML = "";
}
// Function to create a list of questions
function updateUiList(value) {
  const app = document.querySelector("#app");
  for (let mcq of questionCollection[value]) {
    const event = makeQuestionList(mcq);
    app.appendChild(event);
  }
}
// Function to create a question list
function makeQuestionList(mcq) {
  const div = document.createElement("div");
  div.setAttribute("class", "question-container");
  div.setAttribute("id", `question-${mcq["id"]}`);
  const questionDiv = document.createElement("div");
  questionDiv.setAttribute("class", "question");
  const questionParagraph = document.createElement("p");
  questionParagraph.textContent = mcq["question"];
  questionDiv.appendChild(questionParagraph);
  const optionDiv = document.createElement("div");
  optionDiv.setAttribute("class", "options");
  optionDiv.setAttribute("id", "options");
  for (let i = 0; i < mcq.options.length; i++) {
    const label = document.createElement("label");
    // Radio button using the same id for input and checked answers
    const inputRadio = document.createElement("input");
    inputRadio.setAttribute("type", "radio");
    inputRadio.setAttribute("id", `radio-${mcq["id"]}`);
    inputRadio.setAttribute("name", `answer-${mcq["id"]}`);
    inputRadio.value = mcq.options[i];
    label.appendChild(inputRadio);
    label.appendChild(document.createTextNode(mcq.options[i]));
    optionDiv.appendChild(label);
  }
  const resultdiv = document.createElement("div");
  const resultId = `result-${mcq["id"]}`;
  resultdiv.setAttribute("id", resultId);
  resultdiv.className = "ans-div";
  div.appendChild(questionDiv);
  div.appendChild(optionDiv);
  div.appendChild(resultdiv);
  const submit = document.querySelector("#submitBtn");
  submit.addEventListener("click", function () {
    const selected = document.querySelector(
      `input[name="answer-${mcq.id}"]:checked`
    );
    const checkAnswer = mcq.correctAns;
    if (selected) {
      const selectedAnswer = selected.value;
      if (checkAnswer == selectedAnswer) {
        correctAnsShow(checkAnswer, `${mcq["id"]}`, "green");
      } else {
        correctAnsShow(checkAnswer, `${mcq["id"]}`, "red");
      }
    } else {
      correctAnsShow(checkAnswer, `${mcq["id"]}`, "orange");
    }
  });
  return div;
}
// Function to display the correct answer
function correctAnsShow(ans, resultId, add) {
  const divId = `#question-${resultId}`;
  const divClass = "border-" + add;
  const div = document.querySelector(divId);
  div.classList.add(divClass);
  const selector = `#result-${resultId}`;
  const result = document.querySelector(selector);
  result.innerHTML = "Ans: " + ans;
  result.classList.add(add);
}
// Function to append buttons
function appendToButton() {
  const app = document.querySelector("#buttons");
  const submit = document.createElement("button");
  submit.id = "submitBtn";
  submit.innerHTML = "Submit";
  const back = document.createElement("button");
  back.id = "backBtn";
  back.innerHTML = "Back";
  app.appendChild(back);
  app.appendChild(submit);
  // Click function to go back to the main page
  back.addEventListener("click", () => {
    const container = document.querySelector(".container");
    const quiz = document.querySelector("#quiz");
    quiz.style.display = "none";
    container.style.display = "block";
  });
}
// Function to append content
function appendToContent() {
  const content = document.querySelector("#content");
  const appDiv = document.createElement("div");
  appDiv.id = "app";
  // Create another div with the id "buttons"
  const buttonsDiv = document.createElement("div");
  buttonsDiv.id = "buttons";
  // Append the created div elements to the document's body or another parent element
  content.appendChild(appDiv);
  content.appendChild(buttonsDiv);
}
