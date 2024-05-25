const sliderBar = document.querySelector(".slider-bar");
const sliderContainer = document.querySelector(".slider");
const views = document.querySelector(".page-views");
const price = document.querySelector(".price-label");

const toggleSwitch = document.querySelector(".toggle-switch");
const switchCircle = document.querySelector(".switch-circle");

let monthlyPlan = true;

sliderBar.addEventListener("input", () => {
  let val = sliderBar.value;
  console.log(val);
  sliderBar.style.backgroundImage = `linear-gradient(
    90deg,
    hsl(174, 86%, 45%) ${val}%,
    hsl(174, 77%, 80%) ${val}%
  )`;
  updatePageViews(val);
  updatePrice(val);
});

function updatePageViews(val) {
  views.textContent = val * 2;
}

function updatePrice(val) {
  price.textContent = `$${((16 / 50) * val).toFixed(2)}`;
}

toggleSwitch.addEventListener("click", () => {
  toggleSwitch.classList.toggle("switch-on");
  switchCircle.classList.toggle("switch-on");
});
