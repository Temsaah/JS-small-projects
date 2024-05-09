let count = 0;
const value = document.querySelector(".value");

const controlBtns = document.querySelectorAll(".control-btn");

controlBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("dec-btn")) {
      count--;
    } else if (btn.classList.contains("reset-btn")) {
      count = 0;
    } else if (btn.classList.contains("inc-btn")) {
      count++;
    }
    if (count > 0) value.style.color = "green";
    if (count < 0) value.style.color = "red";
    if (count == 0) value.style.color = "black";
    value.textContent = count;
  });
});
