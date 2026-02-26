export default class Match {
    #a;
    #b;
    #winner = null;
    #aCard;
    #bCard;
    #onPlayed;



    constructor(a, b, onPlayed) {
        this.#a = a;
        this.#b = b;
        this.#onPlayed = onPlayed
    }

    get a() {
        return this.#a;
    }
    get b() {
        return this.#b;
    }

    get winner() {
        return this.#winner;
    }

    get isPlayed() {
        return this.#winner !== null;
    }


    setWinner(contestant) {
        if (this.isPlayed) return;
        // vinnaren måste vara a eller b
        if (contestant !== this.#a && contestant !== this.#b) return;

        this.#winner = contestant;

        if (contestant === this.#a) {
            this.#aCard.classList.add("winner");
            this.#bCard.classList.add("loser");
        } else {
            this.#bCard.classList.add("winner");
            this.#aCard.classList.add("loser");
        }

        this.#onPlayed?.(this);
    }

    #createContestantCard(contestant) {
        const article = document.createElement("article");
        article.classList.add("contestant");

        const img = document.createElement("img");
        img.src = "images/placeholder.png";
        img.alt = contestant.name ?? "Contestant";

        const title = document.createElement("h3");
        title.textContent = contestant.name ?? "Okänt namn";

        const skill = document.createElement("p");
        skill.textContent = `Skill: ${contestant.skillLevel ?? 4}`;

        const phrase = document.createElement("p");
        phrase.textContent = contestant.catchphrase ?? "Ingen catchphrase";

        article.append(img, title, skill, phrase);
        return article;
    }

    createElement() {
        const article = document.createElement("article");
        article.classList.add("match");

        const aCard = this.#createContestantCard(this.a);
        const bCard = this.#createContestantCard(this.b);

        // Spara referenser så setWinner kan lägga klasser
        this.#aCard = aCard;
        this.#bCard = bCard;


        aCard.addEventListener("click", () => this.setWinner(this.a));
        bCard.addEventListener("click", () => this.setWinner(this.b));


        article.append(aCard, bCard);
        return article;
    }
}

console.log(null ?? "A");
console.log(undefined ?? "A");
console.log(0 ?? "A");
console.log(null ?? "zaki");