const selectElement = document.getElementById("category");

const category = [
  {
    name: "Computer science",
    value: "computer",
  },
  {
    name: "Biology",
    value: "bio",
  },
];
for (let sub of category){
    const option=document.createElement("option")
    option.value=sub.value;
    option.textContent=sub.name;

    selectElement.appendChild(option)
}
// Get the selected value and move to the respected page when the button is clicked
document.getElementById("proceed").addEventListener("click", function () {
  var selectedValue = selectElement.value;
  window.location.href = `question.html?type=${selectedValue}`;
});
