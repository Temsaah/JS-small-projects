const sideBar = document.querySelector(".sidebar");
const openSideBar = document.querySelector(".open-sidebar");
const closeSideBar = document.querySelector(".close-sidebar");

openSideBar.addEventListener("click", () => {
  sideBar.classList.replace("-translate-x-full", "translate-x-0");
});

closeSideBar.addEventListener("click", () => {
  sideBar.classList.replace("translate-x-0", "-translate-x-full");
});
