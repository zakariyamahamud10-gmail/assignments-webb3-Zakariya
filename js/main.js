import { assignments } from './assignments.js'; //importerar datastrukturen från assig.js

// Importerar funktioner
import { createNav } from "./nav.js";
import { buildCards } from "./cards.js";

import { about } from "./about.js";

// Hämta about-sektionen
const aboutSection = document.getElementById("about");

if (aboutSection) {
  aboutSection.innerHTML += `
    <p>Namn: ${about.name}</p>
    <p>Kurs: ${about.course}</p>
    <p>Kurs: ${about.courseCode}</p>
    <p>Användarnamn: ${about.username}</p>
  `;
}

const currentPage = document.body.dataset.page;
console.log("aktuell sida:", currentPage)


// Bygger navigation
createNav(currentPage);

// Bygger cards
buildCards();

///jag är för trött så jag börjar använda svenska variabeler
let hemmaLank = "index.html"

if (currentPage !== "home") {
  hemmaLank = "../index.html";
}
console.log("hemmaLank =", hemmaLank);

const tbx = document.getElementById("tbxHhem");

// om den finns -> sätt href
if (tbx) {
  tbx.href = hemmaLank;
}
