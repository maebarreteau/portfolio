const skills = [
  { name: "Compétences accueil et accompagnemement des publics", level: 4, description: "Grâce à mon expérience en tant qu'agent d'accueil à la PAG, je suis capable d'accueillir, d'informer et de guider un public. De plus, j'ai aussi été agent d'accueil à la DRAC. Travailler dans ce milieu culturel a été très enrichissant. Accueillir c'est mettre à l'aise les personnes afin qu'elles passent une bonne expérience. Grâce à mon engagement à l'AFEV Auvergne, je suis capable de créer un accompagnement sur la durée afin d'aider des personnes dans leurs devoirs mais aussi dans leurs découvertes culturelles. Être bénévole à l'AFEV c'est conseiller des musiques, des films, des livres... De plus pendant mon bénévolat à Vidéoformes, j'ai accompagné un groupe de scolaires dans une exposition d'art numérique, il m'a fallu mettre en avant mes capacités d'accompagnement et de médiation culturelle." },
  { name: "Compétence rédactionnelle", level: 4, description: "J'ai toujours beaucoup écrit. Avec l'école, j'ai appris à développer cette compétence à travers des commentaires d'oeuvres ou des dissertations. Depuis la rentrée 2025, je fais partie du journal Quoi D'Neuf Gergo ?, c'est une expérience qui m'a permis d'apprendre à écrire de façon professionnelle avec un ton journalistique. <a href=article.html>Un exemple d'article que j'ai rédigé.</a>" },
  { name: "Capacité à s'adapter", level: 5, description: "J'ai effectué de nombreux métiers et ai été bénvoles pour plusieurs événements. L'ambiance et l'environnement n'étaient jamais les mêmes. J'ai appris à m'intégrer dans chaque endroit où j'ai eu la chance d'exercer une activité professionnelle ou bénévole." },
  { name: "Capacité à être autonome", level: 4, description: "Par mes différentes expériences professionnelles, que ce soit à DistriCenter, aux Galeries Lafayettes ou pendant mon stage au Lieu-Dit, j'ai toujours su faire preuve d'autonomie. J'apprécie pouvoir travailler seule mais j'aime aussi travailler en équipe. J'ai souvent pu mixer les deux durant mes différentes expériences." },
  { name: "Compétence créativité", level: 4, description: "À travers mes passions, j'ai appris à être créative, à imaginer des choses que ça soit des dessins, des sites web, des mini jeux vidéos, des jeux de société. Tout est retrouvable sur ma page <a href=https://maelysbarreteau.wordpress.com/>Wordpress</a>" },
  { name: "Compétence rigeur", level: 5, description: "J'ai toujours eu une certaine rigueur qui s'est beaucoup développée grâce à mon cursus scolaire, à travers les différents devoirs que j'ai dû rendre. Je l'ai développé grâce aux dates de rendu du journal Quoi D'Neuf Gergo?, aux rendez-vous hebdomadaires avec la jeune que je suivais grâce l'AFEV." },
  { name: "Capacité à être réactive", level: 3, description: "Grâce à mon stage d'un mois au Lieu-Dit où j'ai été confrontée à tout type de situation, j'ai appris à être réactive en cas de soucis. Nous avons dû faire face à un cambriolage et à une inondation, ce sont des situations de crise qui ont dû être résolu le plus vite possible." },
  { name: "Capacité à créer du contenu web", level: 3, description: "J'ai appris à coder en auto-didacte. J'ai surtout appris les différentes technologies qui permettent de créer des sites web : HTML, CSS et JavaScript. Je suis capable de faire des sites statiques. Je suis actuellement en train d'apprendre à créer des serveurs avec le système de requêtes et je compte apprendre à utiliser une base de donnée. <a href=https://github.com/maebarreteau>Ici ma page github où vous pouvez retrouver mes différents projets informatiques</a>" },
  { name: "Capacité à utiliser le Pack Office ", level: 3, description: "Je sais utiliser la suite Office, j'ai appris à l'utiliser grâce à l'école et j'en ai eu besoin pendant mon stage au Lieu-Dit. Je suis capable d'utiliser Word, PowerPoint, Excel, Outlook, OneDrive." },
  { name: "Capacité à utiliser Canva", level: 4, description: "Je suis capable d'utiliser Canva pour créer différents types de design et posts pour les réseaux sociaux.  J'ai un <a href=https://www.instagram.com/maetalksaboutgames/>compte instagram</a> où je parle de jeux de société et de jeux vidéos, dessus je fais différents design avec cet outil." },
  { name: "Capacité à utiliser Wordpress", level: 3, description: "Je suis capable de créer et mettre en place des sites internet. Je modifie régulièrement le site de <a href=https://cinefac.o2switch.net/>CinéFac</a>" },
];

const containerRow = document.getElementById("charts-row");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalClose = document.getElementById("modal-close");

skills.forEach(skill => {
  const container = document.createElement("div");
  container.className = "chart-container";

  const canvas = document.createElement("canvas");
  canvas.width = 100;
  canvas.height = 100;
  container.appendChild(canvas);

  const label = document.createElement("div");
  label.className = "label";
  label.innerText = skill.name;
  container.appendChild(label);

  containerRow.appendChild(container);

  const ctx = canvas.getContext("2d");
  const center = { x: canvas.width/2, y: canvas.height/2 };
  const radius = 45;
  const startAngle = -Math.PI/2;
  const endAngle = startAngle + (skill.level/5)*2*Math.PI;

  
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, 2*Math.PI);
  ctx.fillStyle = "#eee";
  ctx.fill();

  
  ctx.beginPath();
  ctx.moveTo(center.x, center.y);
  ctx.arc(center.x, center.y, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fillStyle = "#4f46e5";
  ctx.fill();


  canvas.addEventListener("click", () => {
    modal.style.display = "block";
    modalTitle.innerText = skill.name;
    modalText.innerHTML = `<strong>Niveau :</strong> ${skill.level}/5<br>${skill.description}`;
  });
});


modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});


window.addEventListener("click", (e) => {
  if(e.target == modal) {
    modal.style.display = "none";
  }
});
