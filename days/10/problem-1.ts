import { parseInput } from "./utils";

const cycles = new Set([20, 60, 100, 140, 180, 220]);

(async () => {
  const lines = await parseInput();

  let step = 1;
  let x = 1;
  let signal = 0;

  for (let line of lines) {
    const add = line.command === "addx" ? 2 : 1;
    for (let i = 0; i < add; i++) {
      if (cycles.has(step)) {
        signal += step * x;
      }
      step++;
    }

    if (line.command === "addx") {
      x += line.value;
    }
  }

  console.log(`Signal strength: ${signal}`);
})();
