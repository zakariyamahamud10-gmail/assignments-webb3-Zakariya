export default class Match {
  #player1;
  #player2;
  #winner = null;
  #matchDecided;

  constructor(player1, player2, matchDecided) {
    this.#player1 = player1;
    this.#player2 = player2;
    this.#matchDecided = matchDecided;
  }

  get player1() {
    return this.#player1;
  }

  get player2() {
    return this.#player2;
  }

  get winner() {
    return this.#winner;
  }

  get isPlayed() {
    return this.#winner !== null;
  }

  setWinner(player) {
    if (this.isPlayed) return false;

    // vinnaren måste vara player1 eller player2
    if (player !== this.#player1 && player !== this.#player2) return false;

    this.#winner = player;

    // callback till main när matchen är avgjord
    this.#matchDecided?.(this);

    return true;
  }

  
}