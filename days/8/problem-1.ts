import { parseInput } from "./utils";

const vectors = {
  N: [0, -1],
  W: [-1, 0],
  E: [1, 0],
  S: [0, 1],
} as const;

type Directions = keyof typeof vectors;
type Visited = Partial<Record<Directions, number>>;

(async () => {
  const rows = await parseInput();
  const n = rows.length;
  const m = rows[0].length;

  // this is overengineered to do some dynamic programming, doesn't translate
  // into part 2
  function getMaxHeight(
    input: Array<Array<number>>,
    visited: Array<Array<Visited>>,
    dir: Directions,
    i: number,
    j: number
  ): number {
    let height: number;
    const vector = vectors[dir];
    if (i === n - 1 || j === m - 1 || i === 0 || j === 0) {
      height = 0;
    } else if (visited[i - 1][j - 1][dir] !== undefined) {
      return visited[i - 1][j - 1][dir]!;
    } else {
      height = getMaxHeight(input, visited, dir, i + vector[0], j + vector[1]);
    }

    const maxHeight = Math.max(input[i][j], height);
    if (visited[i - 1] && visited[i - 1][j - 1]) {
      visited[i - 1][j - 1][dir] = maxHeight;
    }

    return maxHeight;
  }

  const visited: Array<Array<Visited>> = Array.from({ length: n - 2 }, (_, i) =>
    Array.from({ length: m - 2 }, (_, j) => {
      return {};
    })
  );

  let count = n + n + m + m - 4;

  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < m - 1; j++) {
      for (let [dir, vector] of Object.entries(vectors)) {
        const visible =
          rows[i][j] >
          getMaxHeight(
            rows,
            visited,
            dir as Directions,
            i + vector[0],
            j + vector[1]
          );

        if (visible) {
          count++;
          break;
        }
      }
    }
  }

  console.log(`Number of visible trees: ${count}`);
})();
