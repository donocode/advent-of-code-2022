import { promises as fsPromises } from "fs";
import path from "path";

export async function parseInput(): Promise<
  Array<["R" | "L" | "U" | "D", number]>
> {
  return (
    await fsPromises.readFile(path.resolve(__dirname, "./input.txt"), {
      encoding: "utf-8",
    })
  )
    .split("\n")
    .filter(Boolean)
    .map((row) => {
      const keyVal = row.split(" ");
      if (keyVal.length !== 2) {
        throw new Error("Parsed incorrect number of parts from row");
      }
      return [keyVal[0], Number(keyVal[1])] as ["R" | "L" | "U" | "D", number];
    });
}

export const vectors = {
  U: [0, -1],
  L: [-1, 0],
  R: [1, 0],
  D: [0, 1],
} as const;

export type Vector = [number, number];

export function getDifferenceVector(x: Vector, y: Vector): Vector {
  return [x[0] - y[0], x[1] - y[1]];
}

export function clamp(min: number, max: number, val: number): number {
  if (val > max) return max;
  if (val < min) return min;

  return val;
}
