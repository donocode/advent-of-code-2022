import {
  clamp,
  getDifferenceVector,
  parseInput,
  Vector,
  vectors,
} from "./utils";

(async () => {
  const moves = await parseInput();
  const knots: Array<Vector> = Array.from({ length: 10 }, () => [0, 0]);
  const visited = new Set<string>(["0:0"]);

  for (let [dir, count] of moves) {
    const vec = vectors[dir];
    const [head] = knots;
    for (let i = 0; i < count; i++) {
      head[0] += vec[0];
      head[1] += vec[1];

      for (let j = 1; j < knots.length; j++) {
        const target = knots[j - 1];
        const knot = knots[j];

        const diff = getDifferenceVector(target, knot);

        if (Math.abs(diff[0]) > 1 || Math.abs(diff[1]) > 1) {
          knot[0] += clamp(-1, 1, diff[0]);
          knot[1] += clamp(-1, 1, diff[1]);

          if (j === knots.length - 1) {
            const key = knot.join(":");
            visited.add(key);
          }
        }
      }
    }
  }

  console.log(`Tail visited ${visited.size} cells`);
})();
