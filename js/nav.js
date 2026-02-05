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

// här kollar vi om vi är på startsidan eller inte, är vi inte home så betyder det att vi är nere i en mapp, alltså assignments1

if (currentPage !== "home") {

    console.log("inte på home, vi är i en undermapp ");

    // om länken ska till startsidan, då måste vi gå upp en nivå först annars hittar den inte rätt
    if (a.id === "home") {
        link = "../index.html";
        console.log("går upp en nivå till startsidan");
    } 
    // om man klickar på sidan man redan är på, då ska vi inte gå upp eller ner nånstans
    // bara stanna i samma mapp
    else if (a.id === currentPage) {
        link = "index.html";
    } 
    // annars är det en annan uppgift, då går vi först upp en mapp sen in i rätt
    else {
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

