// import { assignments } from './assignments.js'; //importerar datastrukturen från assig.js

// import { about } from "./about.js";

// document.getElementById("about").innerHTML = `
//   <p>${about.name}</p>
//   <p>${about.course}</p>
//   <p>${about.age}</p>
//     <p>${about.jsKnowledge}</p>
// `;


// //hmtar ul från html, för nav senare
// const navlist = document.getElementById("nav-list");
// // lite självklart men current sida, markeras när den är aktiv
// const currentPage ="assignment1";

// //loopa igenom alla uppgifter i arrayen
// for (let i = 0; i < assignments.length; i++) {
//     //ett objekt i taget, ex. a,b,c osv
//     const a = assignments[i];
//     //tom, ingen aktiv class
//     let activeClass = "";
//     //om uppgiftens id matchar sidan vi är på, då får länken klassen "active", activeclass blir inte tom längre, vi snackar i detta fallet a i objekt arrayen
//     if (a.id === currentPage) {
//         activeClass ="active";
//     }

//    navlist.innerHTML += `
//     <li>
//         <a class="${activeClass}" href="${a.link}">
//             ${a.title}
//         </a>
//     </li>
//     `;

// }

// const cardsSection = document.getElementById("cards");

// for (let i = 0; i < assignments.length; i++) {
//     const a = assignments[i];

//     cardsSection.innerHTML += `
//     <article class="card">
//         <h2>${a.title}</h2>
//         <p>${a.desc}</p>
//         <a href="${a.link}">Gå till uppgift</a>
//     </article>
//     `;
// }

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
