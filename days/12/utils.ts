import { promises as fsPromises } from "fs";
import path from "path";

export function to1DIndex(i: number, j: number, m: number) {
  return i * m + j;
}

export function from1DIndex(i: number, m: number): [number, number] {
  return [Math.floor(i / m), i % m];
}

export async function parseInput() {
  const input = (
    await fsPromises.readFile(path.resolve(__dirname, "./input.txt"), {
      encoding: "utf-8",
    })
  )
    .split("\n")
    .filter(Boolean);

  const n = input.length;
  const m = input[0].length;
  const cells: Array<number> = Array.from({ length: n * m });
  let origin: number = -1;
  let destination: number = -1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const d = to1DIndex(i, j, m);
      let char = input[i].charCodeAt(j);

      if (char === 69) {
        // if E then set destination index and update height to max height
        destination = d;
        char = 122;
      } else if (char === 83) {
        // if S then set origin index and update height to min height
        origin = d;
        char = 97;
      }

      cells[d] = char - 96;
    }
  }

  return {
    n,
    m,
    origin,
    destination,
    cells,
  };
}

/**
 * Basic implementation of a priority queue that inserts
 * items into the correct place based on the sort function
 */
export class NaivePriorityQueue<T> {
  q: Array<T> = [];
  // if a less than b return -1, else 0 or 1
  sort: (a: T, b: T) => number;

  constructor(sort: (a: T, b: T) => number) {
    this.sort = sort;
  }

  get size() {
    return this.q.length;
  }

  insert(x: T) {
    const i = this.q.findIndex((item) => this.sort(x, item) < 1);

    if (i === -1) {
      this.q.push(x);
    } else {
      this.q.splice(i, 0, x);
    }
  }

  remove() {
    return this.q.shift();
  }
}

export const vectors = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
] as const;
