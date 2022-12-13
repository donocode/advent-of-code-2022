import {
  from1DIndex,
  NaivePriorityQueue,
  parseInput,
  to1DIndex,
  vectors,
} from "./utils";

type Node = { i: number; cost: number; height: number };

/**
 * Because of Dijkstra's algo this was really easy to modify for part 2
 * Just reverse the problem, calculate the distances from E and once the
 * distances are all calculated then you can iterate the settled nodes and
 * find the one with height 1 that has the shortest path from E
 */
(async () => {
  const { n, m, destination, cells } = await parseInput();
  const queue = new NaivePriorityQueue<Node>((a, b) => a.cost - b.cost);
  const settled = new Map<number, Node>();
  const distances = Array.from({ length: n * m }, () => Infinity);

  queue.insert({ i: destination, cost: 0, height: cells[destination] });
  distances[destination] = 0;

  while (queue.size) {
    const node = queue.remove();

    if (!node) break;

    if (!settled.has(node.i)) {
      settled.set(node.i, node);

      const [i, j] = from1DIndex(node.i, m);

      for (let vec of vectors) {
        const target = [i + vec[0], j + vec[1]];
        if (target[0] < 0 || target[0] >= n || target[1] < 0 || target[1] >= m)
          continue;
        const d = to1DIndex(target[0], target[1], m);
        if (cells[node.i] - cells[d] > 1) continue;

        const distance = Math.min(node.cost + 1, distances[d]);
        distances[d] = distance;

        const newNode = { i: d, cost: distance, height: cells[d] };
        queue.insert(newNode);
      }
    }
  }

  let min = Infinity;

  for (let node of settled.values()) {
    if (node.height === 1 && node.cost < min) {
      min = node.cost;
    }
  }

  console.log(`Shortest path from E to lowest height: ${min}`);
})();
