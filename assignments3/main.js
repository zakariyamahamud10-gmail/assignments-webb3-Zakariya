import Match from "./Match.js";

async function start() {
  const response = await fetch("./contestants.json");
  const contestants = await response.json();

  const quarterFinals = [];

  for (let i = 0; i < 8; i += 2) {
    const a = contestants[i];
    const b = contestants[i + 1];
    quarterFinals.push(
      new Match(a, b, (match) => {
        console.log("Avgjord:", match.winner?.name);
      })
    );
  }

  const bracket = document.getElementById("bracket");
  const status = document.getElementById("status");

  status.textContent = "Kvartsfinaler";
  bracket.innerHTML = "";

  for (const match of quarterFinals) {
    bracket.appendChild(match.createElement());
  }
}

start();