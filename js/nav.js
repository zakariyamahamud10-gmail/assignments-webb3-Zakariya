import { assignments } from "./assignments.js";

//hela funktionen som bygger naven

export function createNav(currentPage) {
    const navList = document.getElementById("nav-list");

    if (!navList) return;

    navList.innerHTML = "";

    for (let i = 0; i < assignments.length; i++) {
        const a = assignments[i];

        let activeClass = "";

        if (a.id === currentPage) {
            activeClass = "active";
        }

        let link = a.link;
   // Om vi är på en undersida (inte home)
    if (currentPage !== "home") {
      if (a.id === "home") {
        // till startsidan: gå upp en nivå
        link = "../index.html";
      } else if (a.id === currentPage) {
        // till samma sida: håll dig i mappen
        link = "index.html";
      } else {
        // till andra uppgifter: gå upp och sedan ner
        link = "../" + a.link;
      }
        }



        // Skapar en länk i navigationen, här istället för att skriva ut det i html
        navList.innerHTML += `
      <li>
        <a class="${activeClass}" href="${link}">
          ${a.title}
        </a>
      </li>
    `;
    }
}

