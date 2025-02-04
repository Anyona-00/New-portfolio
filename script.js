const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navLinks = document.getElementsByClassName("nav-links")[0];

toggleButton.addEventListener("click", function () {
  navLinks.classList.toggle("active");
  toggleButton.classList.toggle("active");
});

const themeBtn = document.getElementById("modeToggle");
const themeIcons = document.querySelectorAll(".icon");
const arrowIcons = document.querySelectorAll(".arrow");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  setDarkMode();
}

themeBtn.addEventListener("click", function () {
  setTheme();
});

function setTheme() {
  let currentTheme = document.body.getAttribute("theme");

  if (currentTheme === "dark") {
    setLightMode();
  } else {
    setDarkMode();
  }
}

function setDarkMode() {
  document.body.setAttribute("theme", "dark");
  localStorage.setItem("theme", "dark");

  themeIcons.forEach((icon) => {
    icon.src = icon.getAttribute("src-dark");
  });

  arrowIcons.forEach((arrow) => {
    arrow.src = arrow.getAttribute("src-dark");
  });
}

function setLightMode() {
  document.body.removeAttribute("theme");
  localStorage.setItem("theme", "light");

  themeIcons.forEach((icon) => {
    icon.src = icon.getAttribute("src-light");
  });
}

const projectContainer = document.querySelector(".projects-container");
let scrollAmount = 0;
const scrollStep = projectContainer.offsetWidth / 3; // Move by 3 projects width
let autoScroll;

function nextSlide() {
  if (
    scrollAmount <
    projectContainer.scrollWidth - projectContainer.offsetWidth
  ) {
    scrollAmount += scrollStep;
  } else {
    scrollAmount = 0; // Loop back to start
  }
  projectContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
  resetAutoScroll();
}

function prevSlide() {
  if (scrollAmount > 0) {
    scrollAmount -= scrollStep;
  } else {
    scrollAmount = projectContainer.scrollWidth - projectContainer.offsetWidth;
  }
  projectContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
  resetAutoScroll();
}

function startAutoScroll() {
  autoScroll = setInterval(nextSlide, 100000);
}

function resetAutoScroll() {
  clearInterval(autoScroll);
  startAutoScroll();
}

if (window.innerWidth > 600) {
  startAutoScroll(); // Only auto-scroll on desktop
}

const viewAllButton = document.querySelector(".view-all button");
const projects = document.querySelectorAll(".project-one");

viewAllButton.addEventListener("click", function () {
  projects.forEach((project) => {
    project.style.display = "block"; // Show all projects
  });
  viewAllButton.style.display = "none"; // Hide the button after click
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

// Observe all timeline items
document.querySelectorAll(".timeline-item").forEach((item) => {
  observer.observe(item);
});
