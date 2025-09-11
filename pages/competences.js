const canvas = document.getElementById("tree");
const ctx = canvas.getContext("2d");
const container = document.getElementById("canvas-container");

const treeData = {
  label: "Maëlys Barreteau",
  modalContent: "Pour en savoir plus sur moi, rendez-vous sur la page 'À propos' !",
  children: [
    {
      label: "Compétences opérationnelles",
      modalContent: "Tout ce qui se réfaire aux savoirs-faire",
      children: [
        { label: "Accueil", modalContent: "Grâce à mon expérience en tant qu'agent d'accueil à la PAG, je suis capable d'accueillir, d'informer et de guider un public." },
        { label: "Accompagnement", modalContent: "Grâce à mon engagement à l'AFEV Auvergne, je suis dans la capacité de créer un accompagnement sur la durée afin d'aider des personnes dans leurs devoirs. Grâce à mon bénévolat à Vidéoformes, je sais aussi accompagner un public dans une exposition d'art." },
        { label: "Adapter", modalContent: "De part mes différentes expériences professionnels, je suis capable de m'adapter à tout type d'environnement professionnel ou associatif." },
        { label: "Appliquer", modalContent: "De part mes études je suis capable d'appliquer des règles, des méthodes. J'ai acquis une certaine discipline à travers tout mon cursus universitaire." },
      ],
    },
    {
      label: "Compétences comportementales",
      modalContent: "Tout ce qui se réfaire aux savoirs-être",
      children: [
        { label: "Autonomie", modalContent: "Par mes différentes expériences professionnelles - principalement à DistriCenter - je suis capable de gérer mon travail en complète autonomie." },
        { label: "Créativité", modalContent: "A travers mes passions, j'ai appris à être créative, à imaginer des choses que ça soit des dessins, des sites web, des histoires..." },
        { label: "Rigueur", modalContent: "J'ai toujours eu une certaine rigueur qui s'est beaucoup développé grâce à mon cursus scolaire." },
        { label: "Réactivité", modalContent: "Grâce à mon stage d'un mois au Lieu-Dit, j'ai appris à être réactive en cas de soucis." },
      ],
    },
    {
      label: "Connaissances techniques",
      modalContent: "Les outils que je maîtrise, pour voir des exemples de projets, rendez-vous sur la page 'Mes créations' !",
      children: [
        { label: "Github", modalContent: "Depuis que j'ai appris à développer je suis capable d'utiliser github pour push des commit." },
        { label: "Pack Office", modalContent: "Je sais utiliser le suite Office." },
        { label: "Wordpress", modalContent: "Je suis capable de créer et mettre en place des sites internet." },
        { label: "Canva", modalContent: "Je suis capable d'utiliser Canva pour créer différents types de design." },
      ],
    },
  ],
};

const box = { width: 130, height: 50, paddingX: 50, paddingY: 80 };
let boxes = [];

// Polyfill roundRect
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

// Dessiner une boîte
function drawBox(x, y, node){
  ctx.fillStyle = "#ffd591";
  ctx.strokeStyle = "#ff922b";
  ctx.lineWidth = 2;
  ctx.roundRect(x, y, box.width, box.height, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#000";
  ctx.font = "14px 'Patrick Hand', cursive";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const words = node.label.split(" ");
  let line = "";
  const lines = [];
  words.forEach(word => {
    const testLine = line ? line + " " + word : word;
    if(ctx.measureText(testLine).width > box.width - 10){
      lines.push(line);
      line = word;
    } else line = testLine;
  });
  lines.push(line);

  const lineHeight = 16;
  const centerY = y + box.height/2 - ((lines.length-1)*lineHeight)/2;
  lines.forEach((line, i)=> ctx.fillText(line, x + box.width/2, centerY + i*lineHeight));

  boxes.push({x, y, width: box.width, height: box.height, modalContent: node.modalContent});
}

// Calculer largeur d'un sous-arbre
function getSubtreeWidth(node){
  if(!node.children || node.children.length===0) return box.width;
  return node.children.map(getSubtreeWidth).reduce((a,b)=>a+b+box.paddingX, -box.paddingX);
}

// Calculer hauteur totale d'un arbre
function getTreeHeight(node){
  if(!node.children || node.children.length===0) return box.height;
  const heights = node.children.map(getTreeHeight);
  return box.height + box.paddingY + Math.max(...heights);
}

// Dessiner l'arbre récursivement
function drawTree(node, x, y){
  drawBox(x, y, node);
  if(!node.children || node.children.length===0) return;

  const widths = node.children.map(getSubtreeWidth);
  const totalWidth = widths.reduce((a,b)=>a+b+box.paddingX, -box.paddingX);
  let startX = x + box.width/2 - totalWidth/2;

  node.children.forEach((child, i)=>{
    const childWidth = widths[i];
    const childX = startX;
    const childY = y + box.height + box.paddingY;

    ctx.beginPath();
    ctx.moveTo(x + box.width/2, y + box.height);
    ctx.lineTo(childX + box.width/2, childY);
    ctx.strokeStyle = "#8d6e63";
    ctx.lineWidth = 2;
    ctx.stroke();

    drawTree(child, childX, childY);
    startX += childWidth + box.paddingX;
  });
}

// Dessiner l'arbre complet avec canvas aligné à gauche
function draw(){
  boxes = [];
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const treeWidth = getSubtreeWidth(treeData);
  const treeHeight = getTreeHeight(treeData);
  const margin = treeWidth / 2 + box.width + box.paddingX + 25;

  // Canvas = largeur réelle de l'arbre + marge
  canvas.width = treeWidth;
  canvas.height = treeHeight + 40;

  // Commence à gauche avec marge
  const startX = margin;
  const startY = 20;

  drawTree(treeData, startX, startY);
}

// Gestion du clic pour modales
canvas.addEventListener("click", function(event){
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  for(const b of boxes){
    if(mouseX >= b.x && mouseX <= b.x+b.width && mouseY >= b.y && mouseY <= b.y+b.height){
      openModal(b.modalContent);
      break;
    }
  }
});

// Ouvrir modale
function openModal(content){
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");
  modalContent.innerText = content;
  modal.style.display = "block";
  document.body.classList.add("modal-open");
}

// Fermer modale
document.getElementById("modal-close").addEventListener("click", ()=>{
  document.getElementById("modal").style.display = "none";
  document.body.classList.remove("modal-open");
});

draw();
window.addEventListener("resize", draw);
