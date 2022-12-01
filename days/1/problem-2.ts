import { aggregate, inputToArray, sort } from "./utils";

(async () => {
  const [a, b, c] = sort(aggregate(await inputToArray()));
  console.log(`calories held by elf top 3 elves: ${a + b + c}`);
})();
