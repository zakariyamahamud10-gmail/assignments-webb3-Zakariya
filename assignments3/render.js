function createContestantCard(player) {
  const article = document.createElement("article");
  article.classList.add("contestant");

  const img = document.createElement("img");
img.src = player.image ?? "images/placeholder.png";  img.alt = player.name ?? "Contestant";

  const title = document.createElement("h3");
  title.textContent = player.name ?? "Okänt namn";

  const skill = document.createElement("p");
  skill.textContent = `Skill: ${player.skillLevel ?? 4}`;

  const phrase = document.createElement("p");
  phrase.textContent = player.catchphrase ?? "Ingen catchphrase";

  article.append(img, title, skill, phrase);
  return article;
}

function applyResultClasses(p1Card, p2Card, winner, player1, player2) {
  if (winner === player1) {
    p1Card.classList.add("winner");
    p2Card.classList.add("loser");
  } else if (winner === player2) {
    p2Card.classList.add("winner");
    p1Card.classList.add("loser");
  }
}

function createMatchElement(match) {
  const article = document.createElement("article");
  article.classList.add("match");

  const p1Card = createContestantCard(match.player1);
  const p2Card = createContestantCard(match.player2);

  // Manuell variant, klicka för att välja vinnare
  p1Card.addEventListener("click", () => {
    const ok = match.setWinner(match.player1);
    if (!ok) return;

    applyResultClasses(p1Card, p2Card, match.winner, match.player1, match.player2);
  });

  p2Card.addEventListener("click", () => {
    const ok = match.setWinner(match.player2);
    if (!ok) return;

    applyResultClasses(p1Card, p2Card, match.winner, match.player1, match.player2);
  });

  article.append(p1Card, p2Card);
  return article;
}

export function renderRound(bracket, titleText, matches) {
  const round = document.createElement("div");
  round.classList.add("round");

  const title = document.createElement("h2");
  title.textContent = titleText;

  const matchesWrap = document.createElement("div");
  matchesWrap.classList.add("matches");

  round.appendChild(title);

  for (const match of matches) {
    matchesWrap.appendChild(createMatchElement(match));
  }

  round.appendChild(matchesWrap);
  bracket.appendChild(round);
}