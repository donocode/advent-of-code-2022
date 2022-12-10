import { parseInput } from "./utils";

const pixels: Array<"." | "#"> = Array.from({ length: 240 }, () => ".");

(async () => {
  const lines = await parseInput();

  let step = 0;
  let x = 1;

  for (let line of lines) {
    const add = line.command === "addx" ? 2 : 1;
    for (let i = 0; i < add; i++) {
      if (Math.abs((step % 40) - x) <= 1) {
        pixels[step] = "#";
      }
      step++;
    }

    if (line.command === "addx") {
      x += line.value;
    }
  }

  let line = "";
  for (let i = 1; i <= 240; i++) {
    line += pixels[i - 1];

    if (i % 40 === 0) {
      console.log(`|${line}|`);
      line = "";
    }
  }
})();
