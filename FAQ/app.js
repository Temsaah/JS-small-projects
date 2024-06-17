const plusIcons = document.querySelectorAll(".plus-icon");
const minusIcons = document.querySelectorAll(".minus-icon");
const questions = document.querySelectorAll(".question");

questions.forEach((question) => {
  question.addEventListener("click", (e) => {
    if (
      e.target.parentElement.classList.contains("plus-icon") ||
      e.target.parentElement.classList.contains("minus-icon")
    ) {
      question.querySelector(".plus-icon").classList.toggle("hidden");
      question.querySelector(".minus-icon").classList.toggle("hidden");
      question.querySelector(".answer").classList.toggle("hidden");
    }
  });
});
