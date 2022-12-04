import { inputToArray } from "./utils";

function areRangesOverlapped(
  r1: [number, number],
  r2: [number, number]
): boolean {
  return (
    (r1[0] <= r2[0] && r1[1] >= r2[1]) || (r2[0] <= r1[0] && r2[1] >= r1[1])
  );
}

(async () => {
  const input = await inputToArray();

  let overlapCount = 0;
  for (let [r1, r2] of input) {
    overlapCount += areRangesOverlapped(r1, r2) ? 1 : 0;
  }

  console.log(`Total overlapping ranges: ${overlapCount}`);
})();
