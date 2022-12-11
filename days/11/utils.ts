import { promises as fsPromises } from "fs";
import path from "path";

export async function parseInput() {
  return (
    await fsPromises.readFile(path.resolve(__dirname, "./input.txt"), {
      encoding: "utf-8",
    })
  )
    .split("\n\n")
    .filter(Boolean)
    .map((row) => {
      const [, itemsInput, opInput, ...testInput] = row
        .split("\n")
        .filter(Boolean);

      const items = itemsInput
        .substring(17)
        .split(", ")
        .filter(Boolean)
        .map(Number);
      const tempOp = opInput.match(/([\*\+]) (\d+|old)/);

      if (!tempOp || !tempOp[1] || !tempOp[2])
        throw new Error("Did not match operation");

      const op = {
        op: tempOp[1] as "*" | "+",
        value:
          tempOp[2] === "old" ? "old" : (Number(tempOp[2]) as "old" | number),
      };

      const test = {
        div: Number(testInput[0].substring(21)),
        positive: Number(testInput[1].substring(29)),
        negative: Number(testInput[2].substring(30)),
      };

      return { items, op, test };
    });
}
