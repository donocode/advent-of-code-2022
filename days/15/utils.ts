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
    .map((row) => {
      const [sensor, beacon] = row.split(":").map((item) => {
        const match = item.match(/x=(-?\d+), y=(-?\d+)/);

        if (!match) throw new Error(`Could not match x,y in string '${item}'`);

        return [Number(match[1]), Number(match[2])] as [number, number];
      });
      return { beacon, sensor, distance: taxiDistance(sensor, beacon) };
    });
}

export function absDistance(start: number, end: number) {
  return Math.abs(start - end);
}

export function taxiDistance(
  start: [number, number],
  end: [number, number]
): number {
  return absDistance(start[0], end[0]) + absDistance(start[1], end[1]);
}
