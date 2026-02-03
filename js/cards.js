import { assignments } from "./assignments.js";

// exporterar för andra filer så den kan användas
export function buildCards () {
    console.log("buildCard köörs!!!!");

    const cards = document.getElementById("cards");
    console.log("cards elemnetet hittd", cards)

    if (!cards) return;

    cards.innerHTML = "";

    for (let i = 0; i < assignments.length; i++) {
        const a = assignments[i];

        if (a.id !== "home") {
            cards.innerHTML += `
              <article>
                <h2>${a.title}</h2>
                <p>${a.description}</p>
                <a href="${a.link}">Gå till uppgift</a>
              </article>
            `;
        }
    }
}
