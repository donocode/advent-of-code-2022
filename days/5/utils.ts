import { promises as fsPromises } from "fs";
import path from "path";

export async function parseInput() {
  const input = await fsPromises.readFile(
    path.resolve(__dirname, "./input.txt"),
    { encoding: "utf-8" }
  );

  const [stackInput, instructionsInput] = input.split("\n\n").filter(Boolean);

  const stacks: Array<Array<string>> = [];
  // split the lines and discard the last one because it's just indices
  const stackLines = stackInput.split("\n").filter(Boolean).slice(0, -1);
  for (let line of stackLines) {
    let count = 0;
    for (let i = 1; i < line.length; i += 4) {
      if (!stacks[count]) {
        stacks[count] = [];
      }

      if (line[i] !== " ") {
        stacks[count].unshift(line[i]);
      }
      count++;
    }
  }

  const instructions = instructionsInput
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [, count, , origin, , target] = line.split(" ").filter(Boolean);
      return {
        count: Number(count),
        origin: Number(origin) - 1,
        target: Number(target) - 1,
      };
    });

  return { stacks, instructions };
}
