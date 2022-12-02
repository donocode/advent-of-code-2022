import { inputToArray } from "./utils";

// A = ROCK, B = PAPER, C = SCISSORS
const moves = ["A", "B", "C"] as const;

const moveScores = {
  A: 1,
  B: 2,
  C: 3,
};

const outcomeScores = {
  X: 0,
  Y: 3,
  Z: 6,
};

function getIndex(move: "A" | "B" | "C"): number {
  return move.charCodeAt(0) - 65;
}

// X = LOSS = -1, Y = DRAW = 0, Z = WIN = 1
// Using this offset the correct move index will be chosen for the
// desired outcome
function getOffset(outcome: "X" | "Y" | "Z"): number {
  return outcome.charCodeAt(0) - 89;
}

(async () => {
  const rounds = await inputToArray();
  let score = 0;

  for (let round of rounds) {
    const move = moves.at((getIndex(round[0]) + getOffset(round[1])) % 3)!;
    score += moveScores[move];
    score += outcomeScores[round[1]];
  }

  console.log(`Final score: ${score}`);
})();
