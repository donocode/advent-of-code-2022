import { calculateDirSizes, parseInput } from "./utils";

function cd(cmd: string): string {
  return cmd.substring(3, cmd.length - 1);
}

function ls(cmd: string): number {
  const [, ...lines] = cmd.split("\n");

  let totalSize = 0;
  for (let line of lines) {
    if (line.startsWith("dir")) continue;

    const [size] = line.split(" ");
    totalSize += Number(size);
  }

  return totalSize;
}

(async () => {
  const cmds = await parseInput();

  const dirSizes = calculateDirSizes(cmds);

  const result = Object.values(dirSizes)
    .filter((size) => size < 100000)
    .reduce((acc, curr) => curr + acc, 0);

  console.log(`Total size of dirs below 100000: ${result}`);
})();
