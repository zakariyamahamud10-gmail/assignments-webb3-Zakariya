import { assignments } from "./assignments.js";

export function createNav(currentPage) {
  console.log("createNav körs, currentPage =", currentPage);

  const navList = document.getElementById("nav-list");
  if (!navList) return; // om sidan saknar nav-list så gör vi inget

  navList.innerHTML = ""; // rensa så vi inte dubblar nav

  // hur många länkar som kommer byggas från databasen
  console.log("bygger nav, antal länkar =", assignments.length);

  for (let i = 0; i < assignments.length; i++) {
    const a = assignments[i];

    let activeClass = "";
    if (a.id === currentPage) activeClass = "active"; // markerar aktiv sida css

    let link = a.link; // börja med länken från assignments.js

    // om vi är i undermapp behöver vi fixa relativa länkar ../ osv)
    if (currentPage === "home") {
      link = a.link;
    } else {
      link = "../" + a.link;
    }

    //skriva länken i html
    navList.innerHTML += `
      <li>
        <a class="${activeClass}" href="${link}">
          ${a.title}
        </a>
      </li>
    `;
  }
}
