import { parseInput } from "./utils";

(async () => {
  const input = await parseInput();

  const chars = new Set<string>();
  let start = 0;
  let end = 0;
  const n = input.length;
  while (chars.size < 4 && start < n && end < n) {
    const c = input[end];

    if (chars.has(c)) {
      chars.delete(chars.keys().next().value);
      start++;
    } else {
      chars.add(c);
      end++;
    }
  }

  if (chars.size < 4) {
    throw new Error("No sequence of 4 different chars found");
  }

  console.log(
    `Found chars ${[...chars.keys()].join("")} ending on character ${end}`
  );
})();
