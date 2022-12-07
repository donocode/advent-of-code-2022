import { parseInput } from "./utils";

(async () => {
  const input = await parseInput();

  const requiredCount = 14;
  const chars = new Set<string>();
  let start = 0;
  let end = 0;
  const n = input.length;
  while (chars.size < requiredCount && start < n && end < n) {
    const c = input[end];

    if (chars.has(c)) {
      chars.delete(chars.keys().next().value);
      start++;
    } else {
      chars.add(c);
      end++;
    }
  }

  if (chars.size < requiredCount) {
    throw new Error(`No sequence of ${requiredCount} different chars found`);
  }

  console.log(
    `Found chars ${[...chars.keys()].join("")} ending on character ${end}`
  );
})();
