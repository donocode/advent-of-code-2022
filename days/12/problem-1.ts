import {
  from1DIndex,
  NaivePriorityQueue,
  parseInput,
  to1DIndex,
  vectors,
} from "./utils";

type Node = { i: number; cost: number };

/**
 * Uses Dijkstra's algorithm to calculate the distances to every node
 * and will exit the loop if it already determined the distance to E
 *
 * Because the weight of every edge is 1 there isn't really any need to
 * use Dijkstra's algo but it's fun to learn and there was a chance that
 * part 2 would introduce weights (it didn't)
 */
(async () => {
  const { n, m, origin, destination, cells } = await parseInput();
  const queue = new NaivePriorityQueue<Node>((a, b) => a.cost - b.cost);
  const settled = new Set<number>();
  const distances = Array.from({ length: n * m }, () => Infinity);

  queue.insert({ i: origin, cost: 0 });
  distances[origin] = 0;

  while (queue.size && !settled.has(destination)) {
    const node = queue.remove();

    if (!node) break;

    if (!settled.has(node.i)) {
      settled.add(node.i);

      const [i, j] = from1DIndex(node.i, m);

      for (let vec of vectors) {
        const target = [i + vec[0], j + vec[1]];
        if (target[0] < 0 || target[0] >= n || target[1] < 0 || target[1] >= m)
          continue;
        const d = to1DIndex(target[0], target[1], m);
        if (cells[d] - cells[node.i] > 1) continue;

        const distance = Math.min(node.cost + 1, distances[d]);
        distances[d] = distance;

        queue.insert({ i: d, cost: distance });
      }
    }
  }

  console.log(`Distance to E: ${distances[destination]}`);
})();
