"use strict";

// Keep personal content here so updates do not require changes to the layout.
const profileFacts = [
  { label: "Education", value: "B.Sc. CSIT", mark: "01" },
  { label: "Based in", value: "Dharan, Nepal", mark: "02" },
  { label: "Current focus", value: "Learning & building", mark: "03" },
  { label: "Looking toward", value: "Software development", mark: "04" }
];

// These describe current interests and exploration areas, not verified proficiency.
// Each item may be a string or { name, proficiency }; proficiency is optional and
// should be a plain label such as "Exploring" or "Interested in" (never a score).
// Empty groups stay visible with an edit hint so you can fill them in when ready.
const skillsData = [
  { category: "Programming Languages", items: [{ name: "Python", proficiency: "Exploring" }] },
  { category: "Frontend Development", items: [{ name: "Web development", proficiency: "Exploring" }] },
  { category: "Backend Development", items: [] },
  { category: "Databases", items: [{ name: "Database concepts", proficiency: "Exploring" }] },
  { category: "Tools & Technologies", items: [] },
  {
    category: "Areas of Interest",
    items: [
      { name: "AI", proficiency: "Interested in" },
      { name: "Software development", proficiency: "Interested in" },
      { name: "Technology", proficiency: "Interested in" }
    ]
  }
];

// Replace these placeholders with real projects as you complete them.
// Optional image paths go in assets/ (for example: assets/project-name.jpg).
// Add a repository/demo URL to show a working project link in its card.
const projectsData = [
  {
    title: "A web project",
    description: "This card is ready for a future project. Add a short description when there is something you would like to share.",
    category: "web",
    categoryLabel: "Web development",
    image: "",
    technologies: [],
    repository: "",
    demo: ""
  },
  {
    title: "A Python project",
    description: "This card is ready for a future project. Add a short description when there is something you would like to share.",
    category: "python",
    categoryLabel: "Python",
    image: "",
    technologies: [],
    repository: "",
    demo: ""
  },
  {
    title: "A database project",
    description: "This card is ready for a future project. Add a short description when there is something you would like to share.",
    category: "other",
    categoryLabel: "Other",
    image: "",
    technologies: [],
    repository: "",
    demo: ""
  },
  {
    title: "Something unexpected",
    description: "This card is ready for a future project. Add a short description when there is something you would like to share.",
    category: "other",
    categoryLabel: "Other",
    image: "",
    technologies: [],
    repository: "",
    demo: ""
  }
];

// Add your study dates, achievements, and certifications here when ready.
const educationData = {
  degree: "B.Sc. Computer Science and Information Technology",
  institution: "Birendra Memorial College, Dharan",
  university: "Tribhuvan University, Nepal",
  startYear: "[Add starting year]",
  graduationYear: "[Add expected graduation year]",
  achievements: "[Add academic achievements or remove this note]",
  certifications: "[Add certifications or remove this note]"
};

const journeyData = [
  {
    title: "Build my foundations",
    description: "Keep strengthening my understanding of programming and core computer science concepts."
  },
  {
    title: "Learn through practice",
    description: "Turn new ideas into small projects and improve them as I learn."
  },
  {
    title: "Grow into the field",
    description: "Work toward opportunities to contribute, collaborate, and develop as a software developer."
  }
];

const contactEmail = "dhungana.puskar01@gmail.com";

// Resume setup: put your real PDF at this path, then change ready to true.
// The button explains this setup until a resume file is provided.
const resumeData = { path: "assets/resume.pdf", ready: false };

const themeButtons = document.querySelectorAll(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navigationPanel = document.querySelector("#navigation-panel");
const navLinks = [...document.querySelectorAll(".nav-link")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setTheme(theme) {
  const nextTheme = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", nextTheme === "dark" ? "#0b1422" : "#f4f8fb");
  themeButtons.forEach((button) => {
    const label = nextTheme === "dark" ? "Switch to light theme" : "Switch to dark theme";
    button.setAttribute("aria-label", label);
    button.title = label;
  });
  try {
    localStorage.setItem("puskar-theme", nextTheme);
  } catch (_) {
    // The theme still works for this visit when browser storage is unavailable.
  }
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });
});

// Force light theme on initial load if no preference is saved yet
try {
  const savedTheme = localStorage.getItem("puskar-theme");
  setTheme(savedTheme === "dark" ? "dark" : "light");
} catch (_) {
  setTheme("light");
}

function closeMobileMenu({ restoreFocus = false } = {}) {
  if (!menuToggle || !navigationPanel) return;
  navigationPanel.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  if (restoreFocus) menuToggle.focus();
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  navigationPanel.classList.toggle("is-open", !isOpen);
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
});

navLinks.forEach((link) => link.addEventListener("click", () => closeMobileMenu()));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    closeMobileMenu({ restoreFocus: true });
  }
});
document.addEventListener("click", (event) => {
  if (menuToggle?.getAttribute("aria-expanded") !== "true") return;
  if (!event.target.closest(".nav-shell")) closeMobileMenu();
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 780) closeMobileMenu();
});

// Keep the fixed header from obscuring the section currently in view.
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-25% 0px -65% 0px", threshold: 0 });

  document.querySelectorAll("main > section[id]").forEach((section) => sectionObserver.observe(section));
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function renderFacts() {
  const container = document.querySelector("#fact-grid");
  if (!container) return;
  profileFacts.forEach((fact, index) => {
    const card = makeElement("article", "fact-card reveal-item");
    card.append(makeElement("span", "fact-symbol", fact.mark || String(index + 1).padStart(2, "0")));
    card.append(makeElement("p", "fact-label", fact.label));
    card.append(makeElement("p", "fact-value", fact.value));
    container.append(card);
  });
}

function renderSkills() {
  const container = document.querySelector("#skills-grid");
  if (!container) return;
  skillsData.forEach((group, index) => {
    const card = makeElement("article", "skill-group reveal-item");
    const header = makeElement("div", "skill-group-head");
    header.append(makeElement("h3", "", group.category));
    header.append(makeElement("span", "skill-number", String(index + 1).padStart(2, "0")));
    card.append(header);

    if (group.items.length) {
      const chips = makeElement("div", "skill-chips");
      group.items.forEach((item) => {
        const name = typeof item === "string" ? item : item.name;
        const proficiency = typeof item === "string" ? "" : item.proficiency;
        const chip = makeElement("span", "skill-chip");
        chip.append(makeElement("span", "skill-name", name));
        if (proficiency) chip.append(makeElement("span", "skill-stage", proficiency));
        chips.append(chip);
      });
      card.append(chips);
    } else {
      card.append(makeElement("p", "skill-empty", "Add technologies here as you explore them."));
    }
    container.append(card);
  });
}

function safeExternalUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value, window.location.href);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch (_) {
    return "";
  }
}

function appendProjectLink(parent, label, url) {
  const safeUrl = safeExternalUrl(url);
  if (safeUrl) {
    const link = makeElement("a", "project-link", `${label} ↗`);
    link.href = safeUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    parent.append(link);
  } else {
    parent.append(makeElement("span", "project-link--empty", `${label} to add`));
  }
}

function createProjectCard(project, index) {
  const card = makeElement("article", "project-card reveal-item");
  card.dataset.category = project.category;

  const art = makeElement("div", `project-art project-art--${project.category}`);
  art.setAttribute("aria-hidden", project.image ? "false" : "true");
  if (project.image) {
    const image = document.createElement("img");
    image.src = project.image;
    image.alt = project.imageAlt || `${project.title} thumbnail`;
    image.addEventListener("error", () => image.remove(), { once: true });
    art.append(image);
  } else {
    art.append(makeElement("span", "art-code", ["{ }", "Py", "DB", "✳"][index % 4]));
  }
  card.append(art);

  const content = makeElement("div", "project-content");
  const top = makeElement("div", "project-topline");
  top.append(makeElement("span", "project-category", project.categoryLabel || project.category));
  top.append(makeElement("span", "project-status", "Coming soon"));
  content.append(top);
  content.append(makeElement("h3", "", project.title));
  content.append(makeElement("p", "", project.description));

  const tags = makeElement("div", "project-tags");
  const technologies = Array.isArray(project.technologies) && project.technologies.length
    ? project.technologies
    : ["Add technologies"];
  technologies.forEach((technology) => tags.append(makeElement("span", "project-tag", technology)));
  content.append(tags);

  const links = makeElement("div", "project-links");
  appendProjectLink(links, "GitHub", project.repository);
  appendProjectLink(links, "Live demo", project.demo);
  content.append(links);
  card.append(content);
  return card;
}

function renderProjects() {
  const grid = document.querySelector("#projects-grid");
  if (!grid) return;
  projectsData.forEach((project, index) => grid.append(createProjectCard(project, index)));

  const filterButtons = [...document.querySelectorAll(".filter-button")];
  filterButtons.forEach((button) => {
    const category = button.dataset.filter;
    const count = category === "all"
      ? projectsData.length
      : projectsData.filter((project) => project.category === category).length;
    const label = button.textContent.trim().replace(/\s+\d+$/, "");
    button.textContent = "";
    button.append(document.createTextNode(label));
    if (category === "all") button.append(makeElement("span", "", String(count).padStart(2, "0")));
  });
  filterButtons.forEach((button) => button.addEventListener("click", () => filterProjects(button.dataset.filter)));
  filterProjects("all");
}

function filterProjects(category) {
  const cards = [...document.querySelectorAll(".project-card")];
  let visibleCount = 0;
  cards.forEach((card) => {
    const visible = category === "all" || card.dataset.category === category;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  document.querySelectorAll(".filter-button").forEach((button) => {
    const active = button.dataset.filter === category;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  const count = document.querySelector("#project-count");
  const empty = document.querySelector("#projects-empty");
  const emptyHeading = empty?.querySelector("h3");
  const emptyCopy = empty?.querySelector("p");
  if (count) count.textContent = visibleCount ? `${String(visibleCount).padStart(2, "0")} future project slots` : "No project slots yet";
  if (empty) {
    empty.hidden = visibleCount > 0;
    if (emptyHeading) emptyHeading.textContent = category === "all" ? "The first project is on its way." : "Nothing here just yet.";
    if (emptyCopy) emptyCopy.textContent = category === "all"
      ? "There’s space here for the things I build next. Check back soon."
      : "Try another category, or check back as I add projects.";
  }
}

function renderEducation() {
  const timeline = document.querySelector("#education-timeline");
  if (!timeline) return;
  const item = makeElement("article", "education-item reveal-item");
  item.append(makeElement("span", "education-current", "Currently studying"));
  item.append(makeElement("h3", "", educationData.degree));
  item.append(makeElement("p", "education-institution", educationData.institution));
  item.append(makeElement("p", "", educationData.university));
  item.append(makeElement("p", "education-years", `${educationData.startYear} — ${educationData.graduationYear}`));
  item.append(makeElement("p", "education-detail", `Academic achievements: ${educationData.achievements}`));
  item.append(makeElement("p", "education-detail", `Certifications: ${educationData.certifications}`));
  timeline.append(item);
}

function renderJourney() {
  const list = document.querySelector("#journey-list");
  if (!list) return;
  journeyData.forEach((item, index) => {
    const row = makeElement("article", "journey-item reveal-item");
    row.append(makeElement("span", "journey-index", String(index + 1).padStart(2, "0")));
    const copy = makeElement("div", "");
    copy.append(makeElement("h3", "", item.title));
    copy.append(makeElement("p", "", item.description));
    row.append(copy);
    list.append(row);
  });
}

function setupProfileImage() {
  const image = document.querySelector("#profile-image");
  const placeholder = document.querySelector("#portrait-placeholder");
  if (!image || !placeholder) return;
  const showImage = () => {
    image.hidden = false;
    placeholder.hidden = true;
  };
  image.addEventListener("load", showImage, { once: true });
  image.addEventListener("error", () => {
    image.hidden = true;
    placeholder.hidden = false;
  }, { once: true });
  if (image.complete && image.naturalWidth > 0) showImage();
}

function setupResumeButton() {
  const button = document.querySelector("#resume-button");
  const status = document.querySelector("#resume-status");
  if (!button || !status) return;
  button.addEventListener("click", () => {
    if (!resumeData.ready) {
      status.textContent = `Your resume is not added yet. Place the PDF at ${resumeData.path}, then set resumeData.ready to true in script.js.`;
      status.setAttribute("role", "status");
      return;
    }
    const download = document.createElement("a");
    download.href = resumeData.path;
    download.download = "Puskar-Dhungana-Resume.pdf";
    document.body.append(download);
    download.click();
    download.remove();
    status.textContent = "Resume download started.";
  });
}

function setupContactForm() {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  if (!form || !status) return;
  const fields = [...form.querySelectorAll("input, textarea")];

  fields.forEach((field) => field.addEventListener("input", () => {
    if (field.checkValidity()) field.removeAttribute("aria-invalid");
    status.textContent = "";
    status.classList.remove("is-error");
  }));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const invalidFields = fields.filter((field) => !field.checkValidity());
    fields.forEach((field) => field.setAttribute("aria-invalid", String(!field.checkValidity())));
    if (invalidFields.length) {
      status.textContent = "Please check the highlighted fields and try again.";
      status.classList.add("is-error");
      invalidFields[0].focus();
      invalidFields[0].reportValidity();
      return;
    }

    const data = new FormData(form);
    const name = String(data.get("name")).trim();
    const email = String(data.get("email")).trim();
    const subject = String(data.get("subject")).trim();
    const message = String(data.get("message")).trim();
    const body = `Hi Puskar,\n\n${message}\n\n— ${name}\n${email}`;
    const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    status.classList.remove("is-error");
    status.textContent = "Your email app should open with a draft. Review it there before sending.";
    window.location.href = mailto;
  });
}

function setupBackToTop() {
  const button = document.querySelector("#back-to-top");
  if (!button) return;
  let hideTimer;

  const updateVisibility = () => {
    if (window.scrollY > 500) {
      window.clearTimeout(hideTimer);
      button.hidden = false;
      window.requestAnimationFrame(() => button.classList.add("is-visible"));
      return;
    }
    button.classList.remove("is-visible");
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      if (window.scrollY <= 500) button.hidden = true;
    }, 210);
  };

  window.addEventListener("scroll", updateVisibility, { passive: true });
  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
  });
  updateVisibility();
}

function setupScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-item");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealElements.forEach((element) => revealObserver.observe(element));
}

function setCurrentYear() {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());
}

document.documentElement.classList.add("js-ready");
renderFacts();
renderSkills();
renderProjects();
renderEducation();
renderJourney();
setupProfileImage();
setupResumeButton();
setupContactForm();
setupBackToTop();
setupScrollReveal();
setCurrentYear();
