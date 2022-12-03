import { getItemPriority, inputToArray } from "./utils";

function splitInHalf(s: string): [string, string] {
  const middle = s.length / 2;

  return [s.substring(0, middle), s.substring(middle)];
}

(async () => {
  const bags = await inputToArray();
  let result = 0;

  for (let bag of bags) {
    const [comp1, comp2] = splitInHalf(bag);
    const comp1Set = new Set(comp1);

    for (let item of comp2) {
      if (comp1Set.has(item)) {
        result += getItemPriority(item);
        break;
      }
    }
  }

  console.log(`Sum of priorities: ${result}`);
})();
