const steps = document.querySelectorAll('.timeline-step');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.2 });

steps.forEach(step => observer.observe(step));
