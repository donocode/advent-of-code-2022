import { promises as fsPromises } from "fs";
import path from "path";

export type PacketValue = number | Array<PacketValue>;
export type Packet = Array<PacketValue>;

export async function parseInput() {
  return (
    await fsPromises.readFile(path.resolve(__dirname, "./input.txt"), {
      encoding: "utf-8",
    })
  )
    .split("\n\n")
    .filter(Boolean)
    .map(
      (row) =>
        row
          .split("\n")
          .filter(Boolean)
          .map((item) => JSON.parse(item)) as [Packet, Packet]
    );
}

export function asArray(packet: PacketValue): PacketValue {
  return Array.isArray(packet) ? packet : [packet];
}
