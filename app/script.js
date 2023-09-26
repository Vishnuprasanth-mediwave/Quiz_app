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
      id: 300,
      question: "What color is the sky?",
      options: [
        { id: 10, text: "Blue", isCorrect: true },
        { id: 20, text: "Red", isCorrect: false },
        { id: 30, text: "Green", isCorrect: false },
      ],
      category: 2345,
    },
    {
      id: 301,
      question: "Which is a CPU company?",
      options: [
        { id: 10, text: "Intel", isCorrect: false },
        { id: 20, text: "AMD", isCorrect: false },
        { id: 30, text: "all the above", isCorrect: true },
      ],
      category: 1234,
    },
  ],
  // page: "index", // 'question'
};

const selectElement = document.getElementById("category");
let selectedValue = "";
const quiz = document.querySelector("#quiz");
quiz.style.display = "none";

//   const category = [
//     {
//       name: "Computer science",
//       value: "computer",
//     },
//     {
//       name: "Biology",
//       value: "bio",
//     },
//   ];

for (let sub of state.categories) {
  const option = document.createElement("option");
  option.id = sub.id;
  option.value = sub.value;
  option.textContent = sub.name;

  selectElement.appendChild(option);
}

function loadQuestionsFromCategory(getId) {
  console.log(getId);
  const container = document.querySelector(".container");
  container.style.display = "none";
  const quiz = document.querySelector("#quiz");
  quiz.style.display = "block";
  setLocalStorageItem("selectedCategory", getId);
  clearContent();
  appendToContent();
  appendToButton();
  updateUiList(getId);
}

// Get the selected value and move to the respected page when the button is clicked
document.getElementById("proceed").addEventListener("click", function () {
  selectedValue = selectElement.value;
  const categoryIndex = state.categories.findIndex((item) => {
    return item.value == selectedValue;
  });
  const getId = state.categories[categoryIndex].id;
  loadQuestionsFromCategory(getId);
});
//----------------------------------------------------------------------
// function callQuestion(value){

// const computer = [
//   {
//     id: "1",
//     question: "Who is the father of Computer science?",
//     options: ["Charles Babbage", "right brothers", "william", "livingston"],
//     correctAns: "Charles Babbage",
//   },
//   {
//     id: "2",
//     question: "In a computer, most processing takes place in _______?",
//     options: ["CPU", "mouse", "keyboard", "monitor"],
//     correctAns: "CPU",
//   },
//   {
//     id: "3",
//     question: "Scientific Name of Computer?",
//     options: ["Sillico sapiens", "Hybrid Computer", "Interpreter", "comdpromt"],
//     correctAns: "Sillico sapiens",
//   },
// ];

// const bio = [
//   {
//     id: "1",
//     question: "The human heart is ",
//     options: [" Neurogenic heart", "Myogenic heart", "Ampullary", "Pulsating"],
//     correctAns: "Myogenic heart",
//   },
//   {
//     id: "2",
//     question: "Spermology is the study of ",
//     options: ["Seed", "Leaf", "Fruit", "Pollen"],
//     correctAns: "Seed",
//   },
//   {
//     id: "3",
//     question: "Who is known as father of Zoology ",
//     options: ["Darwin", "Aristotle", "Aristotle", "Theophrastus"],
//     correctAns: "Aristotle",
//   },
// ];

// const questionCollection = {
//   computer: computer,
//   bio: bio,
// };

function updateUiList(value) {
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
  heading.innerHTML = "welcome to quiz of " + value;
}
function clearContent() {
  const content = document.querySelector("#content");
  content.innerHTML = "";
}

// const urlParams = new URLSearchParams(window.location.search);
// const myType = urlParams.get("type");

// console.log(questionCollection[myType]);

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
      correctAnsShow(
        mcq["options"][correctIndex].text,
        `${mcq["id"]}`,
        "orange"
      );
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
  result.innerHTML = "Ans: " + ans;
  result.ClassName = add;
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
  return true;
}
function getLocalStorageItem(key) {
  return localStorage.getItem(key);
}

function isSavedInlocalStorage() {
  const storedCategory = getLocalStorageItem("selectedCategory");
  if (storedCategory) {
    loadQuestionsFromCategory(storedCategory);
    console.log(storedCategory);
  }
}
isSavedInlocalStorage();
