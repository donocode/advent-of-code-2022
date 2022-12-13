import { asArray, PacketValue, parseInput } from "./utils";

/**
 * Recursively test packets for order, implementing the rules from the problem
 * statement.
 *
 * @param left Left packet for comparison
 * @param right Right packet for comparison
 * @returns True if packets are ordered, false if packets are not ordered and null if
 *  further comparison is required
 */
function isPacketInOrder(
  left: PacketValue,
  right: PacketValue
): boolean | null {
  if (typeof left === "number" && typeof right === "number") {
    return left === right ? null : left < right;
  }

  if (!Array.isArray(left) || !Array.isArray(right)) {
    return isPacketInOrder(asArray(left), asArray(right));
  }

  for (let i = 0; i < left.length; i++) {
    if (i >= right.length) break;

    const inOrder = isPacketInOrder(left[i], right[i]);

    if (inOrder !== null) return inOrder;
  }

  return left.length === right.length ? null : left.length < right.length;
}

(async () => {
  const pairs = await parseInput();

  let i = 1;
  let count = 0;
  for (let [left, right] of pairs) {
    if (isPacketInOrder(left, right)) {
      count += i;
    }

    i++;
  }

  console.log(`Sum of in order packet indices: ${count}`);
})();
