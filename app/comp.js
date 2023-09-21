const computer = [
  {
    id: "1",
    question: "Who is the father of Computer science?",
    options: ["Charles Babbage", "right brothers", "william", "livingston"],
    correctAns: "Charles Babbage",
  },
  {
    id: "2",
    question: "In a computer, most processing takes place in _______?",
    options: ["CPU","mouse", "keyboard", "monitor"],
    correctAns: "CPU",
  },
  {
    id: "3",
    question: "Scientific Name of Computer?",
    options: ["Sillico sapiens", "Hybrid Computer", "Interpreter", "comdpromt"],
    correctAns: "Sillico sapiens",
  },
];

const bio = [
  {
    id: "1",
    question: "The human heart is ",
    options: [" Neurogenic heart", "Myogenic heart", "Ampullary", "Pulsating"],
    correctAns: "Myogenic heart",
  },
  {
    id: "1",
    question: "Spermology is the study of ",
    options: ["Seed", "Leaf", "Fruit", "Pollen"],
    correctAns: "Seed",
  },
  {
    id: "1",
    question: "Who is known as father of Zoology ",
    options: ["Darwin", "Aristotle", "Aristotle", "Theophrastus"],
    correctAns: "Aristotle",
  },
];

const questionCollection = {
  computer: computer,
  bio: bio,
};

function updateUiList() {
  const app = document.querySelector("#app");
  for (let mcq of questionCollection[myType]) {
    const event = MakeQuestionList(mcq);
    app.appendChild(event);
  }
  const submit =document.createElement("button")
  submit.id="submitBtn";
  submit.innerHTML="submit";
  app.appendChild(submit)
}


const urlParams = new URLSearchParams(window.location.search);
const myType = urlParams.get("type");

console.log(questionCollection[myType]);

function MakeQuestionList(mcq) {
  const div = document.createElement("div");
  div.setAttribute("id", `question-${mcq["id"]}`);

  const questionDiv = document.createElement("div");
  questionDiv.setAttribute("class", "question");

  const questionParagraph = document.createElement("p");
  questionParagraph.textContent = mcq["question"];
  questionDiv.appendChild(questionParagraph);

  const optionDiv = document.createElement("div");
  optionDiv.setAttribute("id", "options");

  for (let i = 0; i < mcq.options.length; i++) {
    const label = document.createElement("label");

    const inputRadio = document.createElement("input");
    inputRadio.setAttribute("type", "radio");
    inputRadio.setAttribute("name", `answer-${mcq["id"]}`);
    inputRadio.value = mcq.options[i];

    label.appendChild(inputRadio);
    label.appendChild(document.createTextNode(mcq.options[i]));
    optionDiv.appendChild(label);
  }
  const resultdiv = document.createElement("div");
  resultdiv.setAttribute("id", `result-${mcq["id"]}`);
  
  div.appendChild(questionDiv);
  div.appendChild(optionDiv);
  div.appendChild(resultdiv);
  optionDiv.addEventListener("click", handleRadioClick);
  function handleRadioClick(event) {
    if (event.target.type === "radio") {
        const checkAnswer=mcq.correctAns;

      
      const selectedAnswer = document.querySelector(
        `input[name="answer-${mcq["id"]}"]:checked`
      ).value;
        if(checkAnswer == selectedAnswer){
          correctAnsShow(checkAnswer,`result-${mcq["id"]}`);
        }else{
          correctAnsShow(checkAnswer,`result-${mcq["id"]}`);
        }
  
    }
  }


  return div;
}
function correctAnsShow(ans,resultId){
    const submit=document.querySelector("#submitBtn")
    submit.addEventListener("click",function(e){
      e.preventDefault();
      const selector = `#${resultId}`;
      const result = document.querySelector(selector)
      result.innerHTML=ans;
      console.log(ans)
    })
}

updateUiList();
