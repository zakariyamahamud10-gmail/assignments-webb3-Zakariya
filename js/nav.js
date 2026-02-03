import { assignments } from "./assignments.js";

//hela funktionen som bygger naven

export function buildNav(currentPage) {
    const navList = document.getElementById("nav-list");

    if (!navList) return;

    navList.innerHTML = "";

    for (let i = 0; i < assignments.length; i++) {
        const a = assignments[i];

        let activeClass = "";

        if(a.id === currentPage) {
            activeClass = "active";
        }

          // Skapar en länk i navigationen
    navList.innerHTML += `
      <li>
        <a class="${activeClass}" href="${a.link}">
          ${a.title}
        </a>
      </li>
    `;
  }
}
    