const canvas = document.getElementById("tree");
const ctx = canvas.getContext("2d");
const container = document.getElementById("canvas-container");

const mindMapData = {
  center: {
    label: "Maëlys BARRETEAU",
    modalContent: "Pour en savoir plus sur moi, rendez-vous sur la page 'À propos' !",
  },
  branches: [
    {
      label: "Compétences opérationnelles",
      modalContent: "Tout ce qui se réfère aux savoirs-faire",
      color: "#ff922b",
      children: [
        { label: "Accueil", modalContent: "Grâce à mon expérience en tant qu'agent d'accueil à la PAG, je suis capable d'accueillir, d'informer et de guider un public. De plus, j'ai aussi été agent d'accueil à la DRAC. Travailler dans ce milieu culturel a été très enrichissant. Accueillir c'est mettre à l'aise les personnes afin qu'elles passent une bonne expérience." },
        { label: "Accompagnement", modalContent: "Grâce à mon engagement à l'AFEV Auvergne, je suis capable de créer un accompagnement sur la durée afin d'aider des personnes dans leurs devoirs mais aussi dans leurs découvertes culturelles. Être bénévole à l'AFEV c'est conseiller des musiques, des films, des livres... De plus pendant mon bénévolat à Vidéoformes, j'ai accompagné un groupe de scolaires dans une exposition d'art numérique, il m'a fallu mettre en avant mes capacités d'accompagnement et de médiation culturelle." },
        { label: "Adapter", modalContent: "De part mes différentes expériences professionnelles, je suis capable de m'adapter à tout type d'environnement professionnel ou associatif. J'ai souvent changé de métier, j'ai ainsi appris à m'adapter rapidement aux nouvelles situations." },
        { label: "Appliquer", modalContent: `De part mes études je suis capable d'appliquer des règles, des méthodes. J'ai acquis une certaine discipline à travers tout mon cursus universitaire. De plus, je suis depuis septembre 2025 à <a href="https://www.instagram.com/quoideneuf_gergo/">Quoi d'neuf Gergo</a>, cela m'a demandé d'appliquer des méthodes d'écriture que je n'ai pas l'habitude d'utiliser. Le ton journalistique n'était pas quelque chose que je connaissais bien.` },
      ],
    },
    {
      label: "Compétences comportementales",
      modalContent: "Tout ce qui se réfère aux savoirs-être",
      color: "#51cf66",
      children: [
        { label: "Autonomie", modalContent: "Par mes différentes expériences professionnelles, que ce soit à DistriCenter, aux Galeries Lafayettes ou pendant mon stage, j'ai toujours su faire preuve d'autonomie. J'apprécie pouvoir travailler seule mais j'aime aussi travailler en équipe. J'ai souvent pu mixer les deux durant mes différentes expériences. " },
        { label: "Créativité", modalContent: "À travers mes passions, j'ai appris à être créative, à imaginer des choses que ça soit des dessins, des sites web, des mini jeux vidéos, des jeux de société. Tout est retrouvable sur ma page <a href=https://maelysbarreteau.wordpress.com/>Wordpress</a>" },
        { label: "Rigueur", modalContent: "J'ai toujours eu une certaine rigueur qui s'est beaucoup développée grâce à mon cursus scolaire, à travers les différents devoirs que j'ai dû rendre. Je l'ai dévloppé grâce aux dates de rendu du journal, aux rendez-vous hebdomadaires avec la jeune que je suivais avec l'AFEV." },
        { label: "Réactivité", modalContent: "Grâce à mon stage d'un mois au Lieu-Dit où j'ai été confrontée à tout type de situation, j'ai appris à être réactive en cas de soucis." }
      ],
    },
    {
      label: "Connaissances techniques",
      modalContent: "Les outils que je maîtrise, pour voir des exemples de projets, rendez-vous sur la page 'Mes créations' !",
      color: "#339af0",
      children: [
        { label: "Github", modalContent: "Depuis que j'ai appris à coder je suis capable d'utiliser <a href=https://github.com/maebarreteau>Github</a>." },
        { label: "Pack Office", modalContent: "Je sais utiliser la suite Office, j'ai appris à l'utiliser grâce à l'école. Je suis capable d'utiliser Word, PowerPoint, Excel, Outlook, OneDrive." },
        { label: "Wordpress", modalContent: "Je suis capable de créer et mettre en place des sites internet. Je modifie régulièrement le site de <a href=https://cinefac.o2switch.net/>CinéFac</a>" },
        { label: "Canva", modalContent: "Je suis capable d'utiliser Canva pour créer différents types de design et posts pour les réseaux sociaux.  J'ai un <a href=https://www.instagram.com/maetalksaboutgames/>compte instagram</a> où je parle de jeux de société et de jeux vidéos, dessus je fais différents design avec cet outil." },
      ],
    },
  ],
};

const centerBox = { width: 160, height: 60 };
const branchBox = { width: 130, height: 50 };
const childBox = { width: 110, height: 40 };
let boxes = [];
let centerPosition = { x: 0, y: 0 };

if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if(w < 2*r) r=w/2;
    if(h < 2*r) r=h/2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y, x+w, y+h, r);
    this.arcTo(x+w, y+h, x, y+h, r);
    this.arcTo(x, y+h, x, y, r);
    this.arcTo(x, y, x+r, y, r);
    this.closePath();
    return this;
  }
}

function drawCenterNode(x, y, node) {
  const centerX = x - centerBox.width / 2;
  const centerY = y - centerBox.height / 2;
  
  ctx.fillStyle = "#ffd591";
  ctx.strokeStyle = "#e67700";
  ctx.lineWidth = 3;
  ctx.roundRect(centerX, centerY, centerBox.width, centerBox.height, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#000";
  ctx.font = "bold 16px 'Patrick Hand', cursive";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const words = node.label.split(" ");
  ctx.fillText(words[0], x, y - 8);
  if (words[1]) ctx.fillText(words.slice(1).join(" "), x, y + 8);

  boxes.push({
    x: centerX,
    y: centerY,
    width: centerBox.width,
    height: centerBox.height,
    modalContent: node.modalContent
  });
  return { x: centerX, y: centerY };
}

function drawBranchNode(x, y, node, color) {
  const nodeX = x - branchBox.width / 2;
  const nodeY = y - branchBox.height / 2;
  
  ctx.fillStyle = color + "40";
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.roundRect(nodeX, nodeY, branchBox.width, branchBox.height, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#000";
  ctx.font = "bold 14px 'Patrick Hand', cursive";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const words = node.label.split(" ");
  if (words.length > 1) {
    ctx.fillText(words[0], x, y - 8);
    ctx.fillText(words.slice(1).join(" "), x, y + 8);
  } else {
    ctx.fillText(node.label, x, y);
  }

  boxes.push({
    x: nodeX,
    y: nodeY,
    width: branchBox.width,
    height: branchBox.height,
    modalContent: node.modalContent
  });
}

function drawChildNode(x, y, node, color) {
  const nodeX = x - childBox.width / 2;
  const nodeY = y - childBox.height / 2;
  
  ctx.fillStyle = color + "20";
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.roundRect(nodeX, nodeY, childBox.width, childBox.height, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#000";
  ctx.font = "12px 'Patrick Hand', cursive";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(node.label, x, y);

  boxes.push({
    x: nodeX,
    y: nodeY,
    width: childBox.width,
    height: childBox.height,
    modalContent: node.modalContent
  });
}


function getConnectionPoint(centerX, centerY, boxWidth, boxHeight, targetX, targetY) {
  const dx = targetX - centerX;
  const dy = targetY - centerY;
  const angle = Math.atan2(dy, dx);

  const halfWidth = boxWidth / 2;
  const halfHeight = boxHeight / 2;
  const tanAngle = Math.tan(angle);

  if (Math.abs(dx) / halfWidth > Math.abs(dy) / halfHeight) {
    const x = centerX + (dx > 0 ? halfWidth : -halfWidth);
    const y = centerY + (dx > 0 ? halfWidth : -halfWidth) * tanAngle;
    return { x, y };
  } else {
    const x = centerX + (dy > 0 ? halfHeight : -halfHeight) / tanAngle;
    const y = centerY + (dy > 0 ? halfHeight : -halfHeight);
    return { x, y };
  }
}

function drawCurvedLine(centerX1, centerY1, box1Width, box1Height, centerX2, centerY2, box2Width, box2Height, color) {
  const start = getConnectionPoint(centerX1, centerY1, box1Width, box1Height, centerX2, centerY2);
  const end = getConnectionPoint(centerX2, centerY2, box2Width, box2Height, centerX1, centerY1);

  const controlX = (start.x + end.x) / 2;
  const controlY = (start.y + end.y) / 2;

  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.quadraticCurveTo(controlX, controlY, end.x, end.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();
}

function drawMindMap() {
  boxes = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = 1400;
  canvas.height = 1000;

  centerPosition.x = canvas.width / 2;
  centerPosition.y = canvas.height / 2;

  drawCenterNode(centerPosition.x, centerPosition.y, mindMapData.center);

  const branchCount = mindMapData.branches.length;
  const angleStep = (2 * Math.PI) / branchCount;
  const branchDistance = 280;

  mindMapData.branches.forEach((branch, branchIndex) => {
    const branchAngle = branchIndex * angleStep - Math.PI / 2;
    const branchX = centerPosition.x + Math.cos(branchAngle) * branchDistance;
    const branchY = centerPosition.y + Math.sin(branchAngle) * branchDistance;

    drawCurvedLine(centerPosition.x, centerPosition.y, centerBox.width, centerBox.height,
      branchX, branchY, branchBox.width, branchBox.height, branch.color);

    drawBranchNode(branchX, branchY, branch, branch.color);

    const childCount = branch.children.length;
    const childAngleRange = Math.PI * 0.8;
    const childAngleStep = childAngleRange / (childCount - 1);
    const childDistance = 160;
    const startAngle = branchAngle - childAngleRange / 2;

    branch.children.forEach((child, childIndex) => {
      const childAngle = startAngle + childIndex * childAngleStep;
      const childX = branchX + Math.cos(childAngle) * childDistance;
      const childY = branchY + Math.sin(childAngle) * childDistance;

      const branchConnection = getConnectionPoint(branchX, branchY, branchBox.width, branchBox.height, childX, childY);
      const childConnection = getConnectionPoint(childX, childY, childBox.width, childBox.height, branchX, branchY);

      ctx.beginPath();
      ctx.moveTo(branchConnection.x, branchConnection.y);
      ctx.lineTo(childConnection.x, childConnection.y);
      ctx.strokeStyle = branch.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      drawChildNode(childX, childY, child, branch.color);
    });
  });
}


canvas.addEventListener("click", function(event){
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  for(const b of boxes){
    if(mouseX >= b.x && mouseX <= b.x + b.width && mouseY >= b.y && mouseY <= b.y + b.height){
      openModal(b.modalContent);
      break;
    }
  }
});


function openModal(content){
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = content; 
  modal.style.display = "block";
  document.body.classList.add("modal-open");
}


document.getElementById("modal-close").addEventListener("click", ()=>{
  document.getElementById("modal").style.display = "none";
  document.body.classList.remove("modal-open");
});

drawMindMap();
window.addEventListener("resize", drawMindMap);

