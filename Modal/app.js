const modalBtn = document.querySelector(".modal-btn");
const modalContainer = document.querySelector(".modal-container");

modalBtn.addEventListener("click", () => {
  modalContainer.classList.toggle("hidden");
});

modalContainer.addEventListener("click", () => {
  if (!modalContainer.classList.contains("hidden")) {
    modalContainer.classList.add("hidden");
  }
});
