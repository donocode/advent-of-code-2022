import { promises as fsPromises } from "fs";
import path from "path";

export async function inputToArray() {
  const input = await fsPromises.readFile(
    path.resolve(__dirname, "./input.txt"),
    { encoding: "utf-8" }
  );

  return input.split("\n").filter(Boolean);
}

export function getItemPriority(s: string): number {
  // priority is a-z:0-26, A-Z:27-52. In unicode A-Z come first, so need to
  // transform these characters separately
  const code = s.charCodeAt(0);
  return code >= 97 ? code - 96 : code - 38;
}
