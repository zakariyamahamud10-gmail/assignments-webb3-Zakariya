import Match from "./Match.js";

async function start() {
  // 1) Hämta deltagare från JSON (krav: fetch + async/await)
  const response = await fetch("./contestants.json");
  const contestants = await response.json();

  let semiFinals = null;

  // 4) DOM: hämta container + status, töm gammalt innehåll
  const bracket = document.getElementById("bracket");
  const status = document.getElementById("status");

  function renderRound(titleText, matches) {
    const round = document.createElement("div");
    round.classList.add("round");

    const title = document.createElement("h2");
    title.textContent = titleText;

    round.appendChild(title);

    for (const match of matches) {
      round.appendChild(match.createElement());
    }

    bracket.appendChild(round);
  }

  //gemensam callback som alla rundor kan återanvända
  function matchDecided(playedMatch) {
    console.log("Avgjord:", playedMatch.winner?.name);
    createNextRoundIfComplete();
  }

  function createNextRoundIfComplete() {
    let allPlayed = true;

    for (const match of quarterFinals) {
      if (!match.isPlayed) {
        allPlayed = false;
        break;
      }
    }

    if (!allPlayed) return;

    // semifinal redan skapad, skapa inte igen
    if (semiFinals !== null) return;

    console.log("Kvartsfinal är klar brush!!!!");

    const winners = quarterFinals.map(match => match.winner);
    console.log("Vinnare:", winners.map(winner => winner?.name));

    // Skapa semifinaler här (inte utanför), eftersom winners finns här och kvartsfinalen är klar
    semiFinals = [];

    for (let i = 0; i < winners.length; i += 2) {
      const a = winners[i];
      const b = winners[i + 1];

      const semiMatch = new Match(a, b, matchDecided);
      semiFinals.push(semiMatch);
    }

    console.log("semifinaler är skapade:", semiFinals.length);

    // Rendera semifinalerna i DOM som en ny .round
    status.textContent = "Semifinaler";
    renderRound("Semifinal", semiFinals);
  }

  // 2) Skapa första rundan: kvartsfinaler (0–1, 2–3, 4–5, 6–7)
  const quarterFinals = [];
  for (let i = 0; i < 8; i += 2) {
    const a = contestants[i];       // contestant A från JSON
    const b = contestants[i + 1];   // contestant B från JSON

    // 3) Skapa en Match-instans som håller state (a, b, winner, isPlayed)
    // Callbacken körs när matchen blivit avgjord (vinnare vald)
    const match = new Match(a, b, matchDecided);

    // Spara matchen i listan för denna runda
    quarterFinals.push(match);
  }

  status.textContent = "Kvartsfinaler";
  bracket.innerHTML = "";
  renderRound("Kvartsfinal", quarterFinals);

  // 5) Rendera (visa) alla matcher i kvartsfinal-rundan
  // createElement() skapar HTML för EN match, appendChild lägger den i DOM
  // (BORTTAGET eftersom renderRound redan gör rendering)
}

start();