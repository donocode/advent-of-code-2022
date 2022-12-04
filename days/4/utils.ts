import { promises as fsPromises } from "fs";
import path from "path";

export async function inputToArray() {
  const input = await fsPromises.readFile(
    path.resolve(__dirname, "./input.txt"),
    { encoding: "utf-8" }
  );

  return input
    .split("\n")
    .filter(Boolean)
    .map((item) =>
      item
        .split(",")
        .map((item) => item.split("-").map(Number) as [number, number])
    );
}
