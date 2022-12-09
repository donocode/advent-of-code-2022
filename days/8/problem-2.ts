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

  // function getViewDistance(
  //   input: Array<Array<number>>,
  //   visited: Array<Array<Visited>>,
  //   height: number,
  //   dir: Directions,
  //   i: number,
  //   j: number
  // ): number {
  //   let distance: number = 1;
  //   const vector = vectors[dir];
  //   if (i === n - 1 || j === m - 1 || i === 0 || j === 0) {
  //     distance = 0;
  //   } else if (visited[i - 1][j - 1][dir] !== undefined) {
  //     return visited[i - 1][j - 1][dir]!;
  //   } else if (height > input[i + vector[0]][j + vector[1]]) {
  //     distance =
  //       1 +
  //       getViewDistance(
  //         input,
  //         visited,
  //         height,
  //         dir,
  //         i + vector[0],
  //         j + vector[1]
  //       );
  //   }

  //   if (visited[i - 1] && visited[i - 1][j - 1]) {
  //     visited[i - 1][j - 1][dir] = distance;
  //   }

  //   // console.log({ i, j, dir, distance });

  //   return distance;
  // }

  function getViewDistance(
    input: Array<Array<number>>,
    dir: Directions,
    i: number,
    j: number
  ) {
    const vector = vectors[dir];
    const height = input[i][j];

    let count = 0;
    let ii = i;
    let jj = j;

    do {
      ii += vector[0];
      jj += vector[1];
      count++;

      if (height <= input[ii][jj]) {
        break;
      }
    } while (ii !== 0 && jj !== 0 && ii !== n - 1 && jj !== m - 1);

    return count;
  }

  const visited: Array<Array<Visited>> = Array.from({ length: n - 2 }, (_, i) =>
    Array.from({ length: m - 2 }, (_, j) => {
      return {};
    })
  );

  let maxScenery = 0;

  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < m - 1; j++) {
      let scenery = 1;
      const x: Array<number> = [];
      for (let [dir] of Object.entries(vectors)) {
        const x = getViewDistance(rows, dir as Directions, i, j);
        scenery *= x;
      }

      maxScenery = Math.max(maxScenery, scenery);
    }
  }

  console.log(`Max scenery count: ${maxScenery}`);
})();
