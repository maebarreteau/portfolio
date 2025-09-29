const events = document.querySelectorAll(".event");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalClose = document.getElementById("modal-close");

events.forEach(event => {
  event.addEventListener("click", () => {
    modalTitle.textContent = event.getAttribute("data-title");
    modalDesc.textContent = event.getAttribute("data-desc");
    modal.style.display = "block";
  });
});

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if(e.target === modal) {
    modal.style.display = "none";
  }
});