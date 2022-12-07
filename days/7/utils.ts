import { promises as fsPromises } from "fs";
import path from "path";

export async function parseInput() {
  return (
    await fsPromises.readFile(path.resolve(__dirname, "./input.txt"), {
      encoding: "utf-8",
    })
  )
    .split("$ ")
    .filter(Boolean);
}

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

export function calculateDirSizes(cmds: string[]) {
  const dirSizes: Record<string, number> = {};
  let dirStack = ["/"];

  for (let cmd of cmds) {
    if (cmd.startsWith("cd")) {
      const dir = cd(cmd);

      if (dir === "/") {
        dirStack = [];
      }
      if (dir === "..") {
        dirStack.pop();
        continue;
      }

      dirStack.push(dir);
    } else if (cmd.startsWith("ls")) {
      const size = ls(cmd);
      let dirs = "";
      for (let dir of dirStack) {
        dirs = `${dirs}/${dir}`.replace("//", "/");
        if (!dirSizes[dirs]) {
          dirSizes[dirs] = 0;
        }

        dirSizes[dirs] += size;
      }
    } else {
      throw new Error("Missing command implementation");
    }
  }
  return dirSizes;
}
