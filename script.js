const projects = {
  depp: {
    index: "01",
    title: "Plateforme documentaire & chatbot RAG",
    category: "STAGE · FULL-STACK & IA",
    categories: ["web", "ai"],
    summary:
      "Plateforme locale de gestion, de versionnement et d’analyse des rapports des EEP, intégrant un chatbot RAG avec réponses sourcées.",
    context:
      "Stage à la Direction des Entreprises Publiques et de la Privatisation du Ministère de l’Économie et des Finances.",
    problem:
      "Centraliser les rapports, suivre leurs versions et faciliter l’accès à leur contenu ainsi que leur analyse.",
    contribution:
      "J’ai développé une plateforme locale de gestion, de versionnement et d’analyse des rapports des EEP, intégrant un chatbot RAG avec réponses sourcées.",
    solution:
      "La gestion documentaire rassemble les rapports et leurs versions. Le chatbot RAG fournit des réponses sourcées à partir des documents. Power BI Desktop accompagne leur analyse.",
    result:
      "Une plateforme associant gestion documentaire, interrogation par IA et analyse BI.",
    stack: [
      "Angular",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "Ollama / Qwen3",
      "Power BI Desktop"
    ],
    art: "Des rapports aux réponses sourcées.",
    steps: ["Rapports EEP", "Versionnement", "RAG & Power BI"],
    image: "",
    imageAlt: "",
    demo: "",
    repo: ""
  },

  snrt: {
    index: "02",
    title: "SNRT — Gestion des archives radio",
    category: "STAGE · DÉVELOPPEMENT WEB",
    categories: ["web"],
    summary:
      "Application web de gestion des archives radio développée lors de mon stage à la SNRT.",
    context:
      "Stage à la Société Nationale de Radiodiffusion et de Télévision, autour de la gestion des archives radio.",
    problem:
      "Faciliter l’organisation et la consultation des archives radio dans une application web.",
    contribution:
      "J’ai participé au développement des interfaces web et du backend de l’application.",
    solution:
      "Une application web consacrée à la gestion et à la consultation des archives radio.",
    result:
      "Une application de gestion des archives radio.",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "MongoDB",
      "MySQL"
    ],
    art: "Organiser et retrouver les archives radio.",
    steps: ["Archives radio", "Gestion documentaire", "Consultation"],
    image: "",
    imageAlt: "",
    demo: "",
    repo: ""
  },

  games: {
    index: "03",
    title: "Plateforme web multi-jeux",
    category: "PROJET ACADÉMIQUE · FULL-STACK",
    categories: ["web"],
    summary:
      "Application web multi-jeux sécurisée avec gestion des utilisateurs.",
    context:
      "Développement d’une plateforme web réunissant plusieurs jeux.",
    problem:
      "Associer une interface web et un backend avec gestion sécurisée des utilisateurs.",
    contribution: "",
    solution:
      "Une interface React, un backend Spring Boot et une sécurisation avec Spring Security.",
    result:
      "Une application full-stack sécurisée avec gestion des utilisateurs.",
    stack: ["React.js", "Spring Boot", "Spring Security"],
    art: "Une plateforme web. Plusieurs jeux.",
    steps: ["Interface React", "API Spring Boot", "Spring Security"],
    image: "",
    imageAlt: "",
    demo: "",
    repo: ""
  },

  skin: {
    index: "04",
    title: "SmartSkin",
    category: "PROJET ACADÉMIQUE · MOBILE & IA",
    categories: ["mobile", "ai"],
    summary:
      "Application mobile d’analyse et de suivi de la peau par intelligence artificielle.",
    context:
      "Projet mobile autour de l’analyse et du suivi de la peau.",
    problem:
      "Rassembler l’analyse et le suivi dans une expérience mobile.",
    contribution: "",
    solution:
      "Une application Flutter, un backend Node.js et une composante d’intelligence artificielle.",
    result:
      "Une application mobile d’analyse et de suivi de la peau.",
    stack: ["Flutter", "Node.js", "Intelligence artificielle"],
    art: "Analyse & suivi dans une application mobile.",
    steps: ["Flutter", "Backend Node.js", "Intelligence artificielle"],
    image: "",
    imageAlt: "",
    demo: "",
    repo: ""
  }
};

// Ordre des quatre projets principaux.
const projectOrder = ["depp", "snrt", "games", "skin"];

function make(tag, text = "", className = "") {
  const element = document.createElement(tag);

  element.textContent = text;

  if (className) {
    element.className = className;
  }

  return element;
}

function validURL(value) {
  if (!value) return null;

  try {
    const url = new URL(value);

    return ["https:", "http:"].includes(url.protocol)
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function createProjectCard(key) {
  const project = projects[key];
  const card = make("article", "", "project-card");

  card.id = `projet-${key}`;
  card.dataset.categories = project.categories.join(" ");

  // Visuel du projet.
  const art = make("div", "", "project-art");

  if (project.image) {
    const image = make("img");

    image.src = project.image;
    image.alt = project.imageAlt || project.title;
    image.loading = "lazy";

    art.append(image);
  } else {
    art.append(
      make("p", "VUE SYNTHÉTIQUE DU PROJET", "art-caption"),
      make("span", project.index, "art-index"),
      make("div", project.art, "art-title")
    );

    const flow = make("div", "", "art-flow");

    project.steps.forEach((step, index) => {
      if (index > 0) {
        flow.append(make("b", "↓"));
      }

      flow.append(make("span", step));
    });

    art.append(flow);
  }

  // Présentation.
  const content = make("div", "", "project-content");

  content.append(
    make("p", project.category, "project-meta"),
    make("h3", project.title),
    make("p", project.summary)
  );

  const tags = make("div", "", "tags");

  project.stack.forEach(technology => {
    tags.append(make("span", technology));
  });

  content.append(tags);

  // Étude de cas.
  const button = make(
    "button",
    "Voir l’étude de cas +",
    "case-toggle"
  );

  button.type = "button";
  button.dataset.project = key;
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", `case-${key}`);

  const study = make("div", "", "case-study");

  study.id = `case-${key}`;
  study.hidden = true;

  const sections = [
    ["Contexte", project.context],
    ["Problème", project.problem]
  ];

  if (project.contribution) {
    sections.push(["Ma contribution", project.contribution]);
  }

  sections.push(
    ["Solution", project.solution],
    ["Résultat", project.result]
  );

  sections.forEach(([label, text]) => {
    study.append(
      make("h4", label),
      make("p", text)
    );
  });

  // Liens affichés uniquement si une URL est renseignée.
  const links = make("div", "", "case-links");

  [
    ["Démonstration", project.demo],
    ["Code source", project.repo]
  ].forEach(([label, value]) => {
    const url = validURL(value);

    if (!url) return;

    const link = make("a", label);

    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    links.append(link);
  });

  if (links.childElementCount > 0) {
    study.append(links);
  }

  button.addEventListener("click", () => {
    study.hidden = !study.hidden;

    button.setAttribute(
      "aria-expanded",
      String(!study.hidden)
    );

    button.textContent = study.hidden
      ? "Voir l’étude de cas +"
      : "Réduire l’étude de cas −";
  });

  content.append(button, study);
  card.append(art, content);

  return card;
}

function initPortfolio() {
  // Afficher les projets dans l’ordre demandé.
  const projectList = document.querySelector("#project-list");

  if (projectList) {
    projectList.replaceChildren(
      ...projectOrder.map(createProjectCard)
    );
  }

  // Supprimer la phrase sous la photo.
  document.querySelector(".portrait-caption")?.remove();

  // Menu mobile.
  const menu = document.querySelector(".menu");
  const navigation = document.querySelector("#navigation");

  if (menu && navigation) {
    const closeMenu = () => {
      navigation.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-label", "Ouvrir le menu");
    };

    menu.addEventListener("click", () => {
      const open = navigation.classList.toggle("open");

      menu.setAttribute("aria-expanded", String(open));
      menu.setAttribute(
        "aria-label",
        open ? "Fermer le menu" : "Ouvrir le menu"
      );
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  // Année du pied de page.
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Filtres des projets.
  const filterButtons = document.querySelectorAll("[data-filter]");
  const filterStatus = document.querySelector("#filter-status");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter;
      let count = 0;

      filterButtons.forEach(otherButton => {
        const active = otherButton === button;

        otherButton.classList.toggle("active", active);
        otherButton.setAttribute(
          "aria-pressed",
          String(active)
        );
      });

      document.querySelectorAll(".project-card").forEach(card => {
        const categories = card.dataset.categories.split(" ");

        card.hidden =
          selected !== "all" && !categories.includes(selected);

        if (!card.hidden) {
          count++;
        }
      });

      if (filterStatus) {
        filterStatus.textContent =
          `${count} projet${count > 1 ? "s" : ""} ` +
          `affiché${count > 1 ? "s" : ""}`;
      }
    });
  });

  // Animations respectant la préférence de mouvement réduit.
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08
    });

    document.querySelectorAll(
      ".section-heading, .project-card, " +
      ".skills-grid article, .experience-list article"
    ).forEach(element => {
      element.classList.add("enter");
      observer.observe(element);
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPortfolio);
} else {
  initPortfolio();
}