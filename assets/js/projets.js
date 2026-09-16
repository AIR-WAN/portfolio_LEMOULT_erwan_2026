const projects = [
  {
    name: "Babyboi",
    date: 2025,
    tag: ["Design Graphique"],
    outil: "Conception d'une cover pour un album fictif",
    image: "/assets/img/mockup cd.png",
    lien: "assets/projects.page/carti.html",
  },
  {
    name: "Street Fusion",
    date: 2025,
    tag: ["UX/UI", "HTML/CSS"],
    outil: "Création d'un site web pour un foodtruck fictif",
    image: "/assets/img/mockup resto.png",
    lien: "assets/projects.page/foodtruck.html",
  },
  {
    name: "The Music Times",
    date: 2025,
    tag: ["Design Graphique"],
    outil: "Conception d'une première page de journal",
    image: "/assets/img/journal.png",
    lien: "assets/projects.page/journal.html",
  },
  {
    name: "Nostalgia",
    date: 2025,
    tag: ["Design Graphique"],
    outil: "Projet personnel pour un album fictif",
    image: "/assets/img/cover cd.webp",
    lien: "assets/projects.page/cd.html",
  },
  {
    name: "Parkease",
    date: 2025,
    tag: ["UX/UI"],
    outil: "Création d'une maquette pour une application mobile fictive",
    image: "/assets/img/mockup tel.png",
    lien: "assets/projects.page/parkease.html",
  },
  {
    name: "Culture & Co",
    date: 2025,
    tag: ["UX/UI"],
    outil: "Création d'une maquette pour une application fictive",
    image: "/assets/img/mockup music.png",
    lien: "assets/projects.page/culture.html",
  },
  {
    name: "Super Mega Pizza 2000",
    date: 2026,
    tag: ["Design Graphique"],
    outil: "Création d'une affiche pour une pizzaria fictive",
    image: "/assets/img/mockup pizza.png",
    lien: "assets/projects.page/superMega.html",
  }
];

function carteProject(listeDeProjets) {
  const projetCard = document.getElementById("projetCard");
  projetCard.innerHTML = "";

  for (let i = 0; i < listeDeProjets.length; i++) {
    const currentProject = document.createElement("div");
    currentProject.className = "carte-projet";

    const projet = listeDeProjets[i];
    console.log(projet);

    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";

    const image = document.createElement("img");
    image.src = projet.image;
    image.alt = projet.name;

    imageContainer.appendChild(image);

    const textContainer = document.createElement("div");
    textContainer.className = "text-container";

    const name = document.createElement("h3");
    name.className = "name";
    name.textContent = projet.name;

    const tag = document.createElement("p");
    tag.className = "tag";
    tag.textContent = projet.tag.join(" • ");

    const outil = document.createElement("p");
    outil.className = "outil";
    outil.textContent = projet.outil;

    textContainer.append(name, outil, tag);

    currentProject.style.cursor = "pointer";
    currentProject.addEventListener("click", function () {
      window.location.href = projet.lien;
    });

    currentProject.append(imageContainer, textContainer);
    projetCard.appendChild(currentProject);
  }
}

carteProject(projects);

// ⭐⭐⭐ NOUVEAU CODE POUR LA BULLE MOBILE ⭐⭐⭐

const boutonsFiltre = document.querySelectorAll("[data-filter]");
const filtresContainer = document.querySelector(".filtres");

// Fonction pour déplacer la bulle vers un bouton
function deplacerBulle(bouton) {
  const rect = bouton.getBoundingClientRect();
  const containerRect = filtresContainer.getBoundingClientRect();

  // Calculer la position relative du bouton dans le container
  const left = rect.left - containerRect.left;
  const width = rect.width;
  const height = rect.height;
  const top = rect.top - containerRect.top;

  // Appliquer les variables CSS pour déplacer la bulle
  filtresContainer.style.setProperty("--bubble-left", `${left}px`);
  filtresContainer.style.setProperty("--bubble-width", `${width}px`);
  filtresContainer.style.setProperty("--bubble-height", `${height}px`);
  filtresContainer.style.setProperty("--bubble-top", `${top}px`);

  // Changer la couleur si c'est le bouton "Tous"
  filtresContainer.style.setProperty(
    "--bubble-bg",
    bouton.getAttribute("data-filter") === "tous"
      ? "rgba(0, 0, 0, 1)"
      : "rgba(255, 255, 255, 0.2)",
  );
}

// Initialiser la position de la bulle au chargement de la page
window.addEventListener("load", function () {
  const activeBtn = document.querySelector("[data-filter].active");
  if (activeBtn) {
    deplacerBulle(activeBtn);

    // ⭐ NOUVEAU : Activer la transition après un court délai
    setTimeout(function () {
      filtresContainer.classList.add("ready");
    }, 50);
  }
});

// Ajouter l'événement de clic sur chaque bouton
boutonsFiltre.forEach(function (bouton) {
  bouton.addEventListener("click", function () {
    const tagSelectionne = bouton.getAttribute("data-filter");

    // Retirer la classe "active" de tous les boutons
    boutonsFiltre.forEach(function (btn) {
      btn.classList.remove("active");
    });

    // Ajouter la classe "active" au bouton cliqué
    bouton.classList.add("active");

    // ⭐ NOUVEAU : Déplacer la bulle vers le bouton cliqué
    deplacerBulle(bouton);

    // Filtrer les projets
    if (tagSelectionne === "tous") {
      carteProject(projects);
    } else {
      const projetsFiltres = projects.filter(function (projet) {
        return projet.tag.includes(tagSelectionne);
      });
      carteProject(projetsFiltres);
    }
  });
});

// Recalculer la position de la bulle lors du redimensionnement de la fenêtre
window.addEventListener("resize", function () {
  const activeBtn = document.querySelector("[data-filter].active");
  if (activeBtn) {
    deplacerBulle(activeBtn);
  }
});
