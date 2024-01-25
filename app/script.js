const state = {
  categories: [
    {
      id: 1234,
      name: "Computer science",
      value: "computer",
    },
    {
      id: 2345,

      name: "Biology",
      value: "bio",
    },
  ],
  questions: [
    {
      id: 307,
      question: "What is the purpose of an IP address?",
      options: [
        {
          id: 15,
          text: "To identify a computer or device on a network",
          isCorrect: true,
        },
        { id: 26, text: "To store data in memory", isCorrect: false },
        { id: 37, text: "To connect to the internet", isCorrect: false },
      ],
      category: 1234,
    },

    {
      id: 308,
      question: "What does HTML stand for?",
      options: [
        { id: 16, text: "Hyper Text Markup Language", isCorrect: true },
        { id: 27, text: "High-level Text Modeling Language", isCorrect: false },
        { id: 38, text: "Home Tool for Modern Language", isCorrect: false },
      ],
      category: 1234,
    },

    {
      id: 309,
      question: "What does CSS stand for?",
      options: [
        { id: 17, text: "Cascading Style Sheets", isCorrect: true },
        { id: 28, text: "Computer Style System", isCorrect: false },
        { id: 39, text: "Code Syntax Structure", isCorrect: false },
      ],
      category: 1234,
    },

    {
      id: 313,
      question:
        "Which part of the human body is responsible for pumping blood?",
      options: [
        { id: 22, text: "Heart", isCorrect: true },
        { id: 33, text: "Lungs", isCorrect: false },
        { id: 44, text: "Kidneys", isCorrect: false },
      ],
      category: 2345,
    },
    {
      id: 312,
      question: "What is the process by which plants make their own food?",
      options: [
        { id: 21, text: "Photosynthesis", isCorrect: true },
        { id: 32, text: "Respiration", isCorrect: false },
        { id: 43, text: "Fermentation", isCorrect: false },
      ],
      category: 2345,
    },
    {
      id: 311,
      question: "What is the powerhouse of the cell?",
      options: [
        { id: 19, text: "Mitochondria", isCorrect: true },
        { id: 30, text: "Nucleus", isCorrect: false },
        { id: 40, text: "Endoplasmic Reticulum", isCorrect: false },
      ],
      category: 2345,
    },
  ],
  // page: "index", // 'question'
};

const selectElement = document.getElementById("category");
let selectedValue = "";
const quiz = document.querySelector("#quiz");
quiz.style.display = "none";
loadQuestionsFromCategory;

for (let sub of state.categories) {
  const option = document.createElement("option");
  option.id = sub.id;
  option.value = sub.value;
  option.textContent = sub.name;

  selectElement.appendChild(option);
}

function loadQuestionsFromCategory(getId, name) {
  console.log(getId, name);
  const container = document.querySelector(".container");
  container.style.display = "none";
  const quiz = document.querySelector("#quiz");
  quiz.style.display = "block";
  const store = { id: getId, name: name };
  localStorage.setItem("selectedCategory", JSON.stringify(store));

  clearContent();
  appendToContent();
  appendToButton();
  updateUiList(getId, name);
}

// Get the selected value and move to the respected page when the button is clicked
document.getElementById("proceed").addEventListener("click", function () {
  selectedValue = selectElement.value;
  const categoryIndex = state.categories.findIndex((item) => {
    return item.value == selectedValue;
  });
  const getId = state.categories[categoryIndex].id;
  const name = state.categories[categoryIndex].name;
  loadQuestionsFromCategory(getId, name);
});

function updateUiList(value, name) {
  const question = state.questions.filter((item) => {
    return item.category == value;
  });
  //  const getcategory=state.categories[categoryIndex].id;

  const app = document.querySelector("#app");
  for (let mcq of question) {
    const event = MakeQuestionList(mcq);
    app.appendChild(event);
  }
  const heading = document.querySelector("#topic");
  heading.innerHTML = `Welcome to ${name} Quiz App `;
}
function clearContent() {
  const content = document.querySelector("#content");
  content.innerHTML = "";
}

function MakeQuestionList(mcq) {
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

    const inputRadio = document.createElement("input");
    inputRadio.setAttribute("type", "radio");
    inputRadio.setAttribute("id", `${mcq["options"][i]["id"]}`);
    inputRadio.setAttribute("name", `answer-${mcq["id"]}`);
    inputRadio.value = mcq.options[i].id;

    label.appendChild(inputRadio);
    label.appendChild(document.createTextNode(mcq.options[i]["text"]));

    console.log(mcq.options[i]);

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
      `input[name="answer-${mcq["id"]}"]:checked`
    );
    if (selected) {
      const userAnswer = selected.value;
      const answerIndex = mcq["options"].findIndex(
        (item) => item.id == userAnswer
      );
      const correctIndex = mcq["options"].findIndex(
        (item) => item.isCorrect == true
      );
      if (mcq["options"][answerIndex].isCorrect) {
        // const crtAns=mcq["options"][answerIndex].text
        correctAnsShow(
          mcq["options"][correctIndex].text,
          `${mcq["id"]}`,
          "green"
        );
      } else {
        correctAnsShow(
          mcq["options"][correctIndex].text,
          `${mcq["id"]}`,
          "red"
        );
      }
    } else {
      const correctIndex = mcq["options"].findIndex(
        (item) => item.isCorrect === true
      );
      correctAnsShow("please select Answer", `${mcq["id"]}`, "orange");
    }
  });

  // findNotAnswering(`result-${mcq["id"]}`);

  return div;
}
function correctAnsShow(ans, resultId, add) {
  const divId = `#question-${resultId}`;
  const divClass = "border-" + add;
  const div = document.querySelector(divId);
  div.className = divClass;
  const selector = `#result-${resultId}`;
  const result = document.querySelector(selector);
  result.className = add;
  result.innerHTML = "Ans: " + ans;
}

function appendToButton() {
  const app = document.querySelector("#buttons");

  const submit = document.createElement("button");
  submit.id = "submitBtn";
  submit.innerHTML = "submit";
  const back = document.createElement("button");
  back.id = "backBtn";
  back.innerHTML = "Back";

  app.appendChild(back);
  app.appendChild(submit);

  back.addEventListener("click", () => {
    const container = document.querySelector(".container");
    const quiz = document.querySelector("#quiz");
    setLocalStorageItem("selectedCategory", "");
    quiz.style.display = "none";
    container.style.display = "block";
  });
}
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

function setLocalStorageItem(key, value) {
  // localStorage.setItem(key, JSON.stringify(value));
  localStorage.setItem(key, value);
  console.log(value);
  return true;
}
function getLocalStorageItem(key) {
  return localStorage.getItem(key);
}

function isSavedInlocalStorage() {
  const storedCategory = JSON.parse(getLocalStorageItem("selectedCategory"));
  if (storedCategory) {
    loadQuestionsFromCategory(storedCategory.id, storedCategory.name);
    console.log(storedCategory.id);
    console.log("hello");
  }
}
isSavedInlocalStorage();
