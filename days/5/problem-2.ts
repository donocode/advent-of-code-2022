import { parseInput } from "./utils";

(async () => {
  const { stacks, instructions } = await parseInput();

  for (let { count, origin, target } of instructions) {
    const crates: Array<string> = [];
    for (let i = 0; i < count; i++) {
      const crate = stacks[origin].pop();
      if (!crate) {
        throw new Error("No crate popped");
      }
      crates.unshift(crate);
    }

    stacks[target].push(...crates);
  }

  console.log(`Top of stacks: ${stacks.map((s) => s.at(-1)).join("")}`);
})();
