document.querySelectorAll('.polaroid').forEach(polaroid => {
  polaroid.addEventListener('click', () => {
    const content = polaroid.querySelector('.polaroid-content');
    const title = content.querySelector('h2').textContent;
    const desc = content.querySelector('p').innerHTML;
    const img = polaroid.querySelector('img').src;

    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDesc').innerHTML = desc;
    document.getElementById('modalImg').src = img;

    document.getElementById('modal').style.display = 'block';
  });
});

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});