import { promises as fsPromises } from "fs";
import path from "path";

export async function parseInput() {
  const rows = (
    await fsPromises.readFile(path.resolve(__dirname, "./input.txt"), {
      encoding: "utf-8",
    })
  )
    .split("\n")
    .filter(Boolean)
    .map((row) =>
      row
        .split(" -> ")
        .filter(Boolean)
        .map((pair) => pair.split(",").map(Number))
    );

  let minX = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (let row of rows) {
    for (let [x, y] of row) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  const cells = Array.from({ length: maxY + 2 }, () =>
    Array.from({ length: maxX - minX + 1 }, () => 0)
  );

  for (let row of rows) {
    let prev = row[0];
    for (let pair of row) {
      const [x, y] = pair;
      cells[y][x - minX] = 9;

      const vec = [prev[0] - x, prev[1] - y];
      prev = pair;
      const signs = [Math.sign(vec[0]), Math.sign(vec[1])];

      for (let i = 1; i < Math.abs(vec[0]); i++) {
        cells[y][x + i * signs[0] - minX] = 9;
      }

      for (let i = 1; i < Math.abs(vec[1]); i++) {
        cells[y + i * signs[1]][x - minX] = 9;
      }
    }
  }

  return { cells, minX, maxY };
}
