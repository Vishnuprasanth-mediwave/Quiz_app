// Define the correct answer
const correctAnswer = "Paris";

// Get references to the HTML elements
const questionElement = document.getElementById("question");
const optionsForm = document.getElementById("options");
const resultElement = document.getElementById("result");

// Add a submit event listener to the options form
optionsForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting

    // Get the selected answer
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        // Check if the selected answer is correct
        if (selectedAnswer.value === correctAnswer) {
            resultElement.textContent = "Correct!";
        } else {
            resultElement.textContent = "Incorrect. The correct answer is Paris.";
        }

        // Disable radio buttons after an answer is selected
        const radioButtons = document.querySelectorAll('input[name="answer"]');
        radioButtons.forEach((radioButton) => {
            radioButton.disabled = true;
        });
    }
});