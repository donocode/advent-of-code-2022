import { promises as fsPromises } from "fs";
import path from "path";

export type Command = { command: "noop" } | { command: "addx"; value: number };

export async function parseInput(): Promise<Array<Command>> {
  return (
    await fsPromises.readFile(path.resolve(__dirname, "./input.txt"), {
      encoding: "utf-8",
    })
  )
    .split("\n")
    .filter(Boolean)
    .map((row) => {
      const [command, value] = row.split(" ").filter(Boolean);

      return {
        command: command,
        value: command === "addx" ? Number(value) : undefined,
      } as Command;
    });
}
