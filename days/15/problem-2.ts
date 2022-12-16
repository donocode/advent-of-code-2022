import { absDistance, parseInput, taxiDistance } from "./utils";

// const searchSize = 20;
const searchSize = 4000000;

(async () => {
  const input = await parseInput();

  /**
   * Returns false if the point is not inside inside the search space but
   * not inside any of the sensor radii
   */
  function checkPointInside(point: [number, number]): boolean {
    if (
      point[0] > searchSize ||
      point[1] > searchSize ||
      point[0] < 0 ||
      point[1] < 0
    )
      return true;

    for (let { sensor, distance } of input) {
      if (taxiDistance(point, sensor) <= distance) return true;
    }

    return false;
  }

  // Loop through all the sensors and test every point on the perimeter of the sensor's
  // radius against every sensor. As there is only one possible point outside the sensors
  // but inside the search space then it must exist on the perimeter of one or more of the
  // sensors. Solution is slightly suboptimal because on the iteration that finds the point
  // it will still test all 4 target points for that iteration, and checkPointInside will
  // check all sensors even though the points will definitely be outside of the sensor whose
  // perimeter was used to construct the points being checked.
  for (let { sensor, distance } of input) {
    const d = distance + 1;
    const [x, y] = sensor;

    for (let i = 0; i <= d; i++) {
      // Logic for constructing points
      //    .   x + 0, y - distance + 0
      //   . .  x - 1, y - distance + 1 | x + 1, y - distance + 1
      //  .   . x - 2, y - distance + 2 | x + 2, y - distance + 2
      //   . .  x - 1, y + distance - 1 | x + 1, y + distance - 1
      //    .   x - 0, y + distance - 0
      const outsidePoint = (
        [
          [x - i, y - d + i],
          [x + i, y - d + i],
          [x - i, y + d - i],
          [x + i, y + d - i],
        ] as Array<[number, number]>
      ).find((p) => !checkPointInside(p));

      if (outsidePoint) {
        console.log(
          `Tuning frequency for [${outsidePoint.join(", ")}]: ${
            outsidePoint[0] * 4000000 + outsidePoint[1]
          }`
        );
        return;
      }
    }
  }

  console.log("Found nothing");
})();
