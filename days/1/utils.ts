import { promises as fsPromises } from "fs";
import path from "path";

export async function inputToArray() {
  const input = await fsPromises.readFile(
    path.resolve(__dirname, "./input.txt"),
    { encoding: "utf-8" }
  );

  return input
    .split("\n\n")
    .filter(Boolean)
    .map((elfInput) => elfInput.split("\n").filter(Boolean).map(Number));
}

export function aggregate(data: Array<Array<number>>): Array<number> {
  return data.flatMap((calories) =>
    calories.reduce((acc, curr) => acc + curr, 0)
  );
}

export function sort(data: Array<number>): Array<number> {
  return data.sort((a, b) => b - a);
}
