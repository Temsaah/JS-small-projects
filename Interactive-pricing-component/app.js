const sliderBar = document.querySelector(".slider-bar");
const sliderContainer = document.querySelector(".slider");
const views = document.querySelector(".page-views");
const price = document.querySelector(".price-label");

const toggleSwitch = document.querySelector(".toggle-switch");
const switchCircle = document.querySelector(".switch-circle");

let plan = "monthly";

let discount = 25;

let val = 50;

sliderBar.addEventListener("input", () => {
  val = sliderBar.value;
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
  if (plan == "monthly") {
    price.textContent = `$${((16 / 50) * val).toFixed(2)}`;
  } else if (plan == "yearly") {
    let yearlyPrice = (16 / 50) * val * 12;
    let discountedPrice = yearlyPrice - yearlyPrice * (discount / 100);
    price.textContent = `$${discountedPrice.toFixed(2)}`;
  }
}

toggleSwitch.addEventListener("click", () => {
  toggleSwitch.classList.toggle("switch-on");
  switchCircle.classList.toggle("switch-on");
  if (plan == "monthly") plan = "yearly";
  else plan = "monthly";

  updatePrice(val);
});
