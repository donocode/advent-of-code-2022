import { parseInput } from "./utils";

const origin: [number, number] = [500, 0];
const vecs = [
  [0, 1],
  [-1, 1],
  [1, 1],
];

(async () => {
  const { cells, minX } = await parseInput();
  const n = cells.length;

  let sand: [number, number] | undefined = undefined;
  let count = 0;
  while (cells[0][500 - minX] === 0) {
    if (sand === undefined) sand = origin;

    let moved = false;
    for (let vec of vecs) {
      const x: number = sand[0] + vec[0];
      const y: number = sand[1] + vec[1];

      if (!cells[y]?.[x - minX]) {
        moved = true;
        sand = [x, y];
        break;
      }
    }

    if (!moved || sand[1] === n - 1) {
      const [x, y] = sand;
      cells[y][x - minX] = 1;
      sand = undefined;
      count++;
    }
  }

  console.log(`Units of sand at rest: ${count}`);
})();
