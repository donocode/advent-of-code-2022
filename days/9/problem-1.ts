import {
  clamp,
  getDifferenceVector,
  parseInput,
  Vector,
  vectors,
} from "./utils";

(async () => {
  const moves = await parseInput();

  let head: Vector = [0, 0];
  let tail: Vector = [0, 0];
  const visited = new Set<string>(["0:0"]);

  for (let [dir, count] of moves) {
    const vec = vectors[dir];
    for (let i = 0; i < count; i++) {
      head[0] += vec[0];
      head[1] += vec[1];

      const diff = getDifferenceVector(head, tail);

      if (Math.abs(diff[0]) > 1 || Math.abs(diff[1]) > 1) {
        // head is away from tail in one axis at least 2
        tail[0] += clamp(-1, 1, diff[0]);
        tail[1] += clamp(-1, 1, diff[1]);

        const key = tail.join(":");

        visited.add(key);
      }
    }
  }

  console.log(`Tail visited ${visited.size} cells`);
})();
