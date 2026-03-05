import { renderRound } from "./render.js";
import {
  areAllMatchesPlayed,
  winnersFrom,
  createQuarterFinalMatches,
  createSemiFinalMatches,
  createFinalMatches, 
} from "./tournament.js";

async function start() {
  const response = await fetch("./contestants.json");
  const contestants = await response.json();

  let semiFinals = null;
  let finals = null; 

  const bracket = document.getElementById("bracket");
  const status = document.getElementById("status");
  const resetBtn = document.getElementById("reset-btn");

  // gemensam callback som alla rundor kan återanvända
  function matchDecided(playedMatch) {
    console.log("Avgjord:", playedMatch.winner?.name);
    createNextRoundIfComplete();
  }

  // 2) Skapa första rundan: kvartsfinaler
  let quarterFinals = createQuarterFinalMatches(contestants, matchDecided);

  function createNextRoundIfComplete() {
    //  Är alla kvartsfinaler spelade? annars gör inget
    if (!areAllMatchesPlayed(quarterFinals)) return;

    //Skapa semifinaler bara en gång
    if (semiFinals === null) {
      console.log("Kvartsfinal är klar brush!!!!");

      const winners = winnersFrom(quarterFinals);
      console.log("Vinnare:", winners.map((winner) => winner?.name));

      semiFinals = createSemiFinalMatches(quarterFinals, matchDecided);
      console.log("semifinaler är skapade:", semiFinals.length);

      // Rendera semifinalerna i DOM som en ny .round
      status.textContent = "Semifinaler";
      renderRound(bracket, "Semifinal", semiFinals);

      return; 
    }

    if (semiFinals !== null && finals === null) {
      if (!areAllMatchesPlayed(semiFinals)) return;
      console.log("semi är klar!!! skapar finla");

      finals = createFinalMatches(semiFinals, matchDecided);

      status.textContent = "Finals"
      renderRound(bracket, "Final", finals);
      return;
    }
    
    if (finals !== null) {
      const finalIsDone = areAllMatchesPlayed(finals);

      if (!finalIsDone) return;

      const champion = finals[0]?.winner;

      status.textContent = `Turneringen är över! Mästare: ${champion?.name ?? "Okänd"}`;
      console.log("Turneringen är över! Mästare:", champion?.name);
      return;


      
    }

  }

  status.textContent = "Kvartsfinaler";
  bracket.innerHTML = "";
  renderRound(bracket, "Kvartsfinal", quarterFinals);

  if (!resetBtn) return;

  resetBtn.addEventListener("click", () => {
    semiFinals = null;
    finals = null;

    bracket.innerHTML = "";
   quarterFinals = createQuarterFinalMatches(contestants, matchDecided);

   status.textContent = "Kvartsfinaler";
   renderRound(bracket, "Kvartsfinal", quarterFinals)
  })

  
}

start();