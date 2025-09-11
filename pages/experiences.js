const badges = document.querySelectorAll('.experience-badge');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const modalClose = document.getElementById('modal-close');

badges.forEach(badge => {
  badge.addEventListener('click', () => {
    const content = badge.dataset.content;
    modalText.innerHTML = content; 
    modal.style.display = 'flex';
  });
});

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if(e.target === modal) modal.style.display = 'none';
});
