import { assignments } from "./assignments.js";

//hela funktionen som bygger naven

export function createNav(currentPage) {
    const navList = document.getElementById("nav-list");

    if (!navList) return;

    navList.innerHTML = "";
  
    for (let i = 0; i < assignments.length; i++) {
        const a = assignments[i];

        let activeClass = "";

        if(a.id === currentPage) {
            activeClass = "active";
        }

        let link = a.link;

        if(currentPage !== "home") {
            if(a.id === "home") {
                link = "../index.html"
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
    
