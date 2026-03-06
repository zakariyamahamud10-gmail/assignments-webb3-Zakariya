import Match from "./Match.js";

export function areAllMatchesPlayed(matches) {
    for (const match of matches) {
        if (!match.isPlayed) return false;
    }
    return true;
}

export function winnersFrom(matches) {
    return matches.map((match) => match.winner);
}

export function createQuarterFinalMatches(contestants, matchDecided) {
    const quarterFinals = [];

    for (let i = 0; i < contestants.length; i += 2) {
        const player1 = contestants[i];
        const player2 = contestants[i + 1];

        const match = new Match(player1, player2, matchDecided);
        quarterFinals.push(match);
    }

    console.log("Kvarts: contestants =", contestants.length, "matches =", quarterFinals.length);

    return quarterFinals;
}

// Semifinaler skapas från vinnarna av kvartsfinalerna 
export function createSemiFinalMatches(quarterFinals, matchDecided) {
    const winners = winnersFrom(quarterFinals);
    const semiFinals = [];

    for (let i = 0; i < winners.length; i += 2) {
        const player1 = winners[i];
        const player2 = winners[i + 1];

        const semiMatch = new Match(player1, player2, matchDecided);
        semiFinals.push(semiMatch);
    }

    console.log("Semi: winners =", winners.length, "matches =", semiFinals.length);
    return semiFinals;
}

export function createFinalMatches(semiFinals, matchDecided) {
    const winners = winnersFrom(semiFinals);
    const finals = [];

    for (let i = 0; i < winners.length; i += 2) {
        const player1 = winners[i];
        const player2 = winners[i + 1];

        const finalMatch = new Match(player1, player2, matchDecided);
        finals.push(finalMatch);
    }
    console.log("Final: winners =", winners.length, "matches =", finals.length);
    return finals;

}

