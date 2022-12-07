import { calculateDirSizes, parseInput } from "./utils";

(async () => {
  const cmds = await parseInput();

  const dirSizes = calculateDirSizes(cmds);

  const remainingSpace = 70000000 - dirSizes["/"];
  const extraSpaceRequired = 30000000 - remainingSpace;

  const sizeToDelete = Math.min(
    ...Object.values(dirSizes).filter((size) => size >= extraSpaceRequired)
  );

  console.log(
    `Smallest dir to delete which meets requirement: ${sizeToDelete}`
  );
})();
