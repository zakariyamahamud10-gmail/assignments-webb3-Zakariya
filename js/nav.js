import { assignments } from "./assignments.js";

//hela funktionen som bygger naven

export function createNav(currentPage) {
    const navList = document.getElementById("nav-list");

    if (!navList) return;

    navList.innerHTML = "";
    
    let sökväg = "";

  if (currentPage === "home") {
    sökväg = "";
  } else {
    sökväg = "../";
  }

    for (let i = 0; i < assignments.length; i++) {
        const a = assignments[i];

        let activeClass = "";

        if(a.id === currentPage) {
            activeClass = "active";
        }

          // Skapar en länk i navigationen, här istället för att skriva ut det i html
    navList.innerHTML += `
      <li>
        <a class="${activeClass}" href="${sökväg}${a.link}">
          ${a.title}
        </a>
      </li>
    `;
  }
}
    
