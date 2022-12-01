import { aggregate, inputToArray, sort } from "./utils";

(async () => {
  console.log(
    `most calories held by elf: ${sort(aggregate(await inputToArray()))[0]}`
  );
})();
