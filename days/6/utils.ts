import { promises as fsPromises } from "fs";
import path from "path";

export async function parseInput() {
  return fsPromises.readFile(path.resolve(__dirname, "./input.txt"), {
    encoding: "utf-8",
  });
}
