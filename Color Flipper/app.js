const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const main = document.querySelector("main");
const colorCode = document.querySelector(".color-code");
const colorBtn = document.querySelector(".change-color-btn");

colorBtn.addEventListener("click", () => {
  let hexColor = "#";

  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber()];
  }
  colorCode.textContent = hexColor;
  colorCode.style.color = hexColor;
  main.style.backgroundColor = hexColor;
});

function getRandomNumber() {
  return Math.floor(Math.random() * hex.length);
}
