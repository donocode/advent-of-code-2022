import { getItemPriority, inputToArray } from "./utils";

(async () => {
  const bags = await inputToArray();
  let result = 0;

  for (let i = 0; i < bags.length; i += 3) {
    const set1 = new Set(bags[i]);
    const set2 = new Set(bags[i + 1]);

    for (let item of bags[i + 2]) {
      if (set1.has(item) && set2.has(item)) {
        result += getItemPriority(item);
        break;
      }
    }
  }

  console.log(`Sum of priorities: ${result}`);
})();
