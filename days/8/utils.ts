import { promises as fsPromises } from "fs";
import path from "path";

export async function parseInput() {
  return (
    await fsPromises.readFile(path.resolve(__dirname, "./input.txt"), {
      encoding: "utf-8",
    })
  )
    .split("\n")
    .filter(Boolean)
    .map((row) => row.split("").filter(Boolean).map(Number));
}
