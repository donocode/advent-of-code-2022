import { inputToArray } from "./utils";

const results = {
  AX: 3,
  AY: 6,
  AZ: 0,
  BX: 0,
  BY: 3,
  BZ: 6,
  CX: 6,
  CY: 0,
  CZ: 3,
};

const values = {
  X: 1,
  Y: 2,
  Z: 3,
};

(async () => {
  const rounds = await inputToArray();
  let score = 0;

  for (let round of rounds) {
    score += values[round[1]];
    score += results[`${round[0]}${round[1]}`];
  }

  console.log(`Final score: ${score}`);
})();
