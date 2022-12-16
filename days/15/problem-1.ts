import { absDistance, parseInput, taxiDistance } from "./utils";

const inspectRow = 2000000;

(async () => {
  const input = await parseInput();
  const set = new Set<number>();

  for (let { sensor, distance } of input) {
    // get the remaining distance that can be consumed on the target row
    // if this is 0 then one point will be placed, 1 will result in 3 points being placed
    // etc
    const remainder = distance - absDistance(sensor[1], inspectRow);

    if (remainder < 0) continue;

    // add all impacted points
    for (let i = 0; i <= remainder; i++) {
      set.add(sensor[0] - i);
      set.add(sensor[0] + i);
    }
  }

  // the set should contain only points where beacons are not
  // so delete the beacons
  for (let { beacon } of input) {
    if (beacon[1] === inspectRow) {
      set.delete(beacon[0]);
    }
  }

  console.log(`Positions on y=${inspectRow}: ${set.size}`);
})();
