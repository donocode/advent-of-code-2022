import { asArray, Packet, PacketValue, parseInput } from "./utils";

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

/**
 * We already know how to determine the order so we can use the built in sort
 * method to sort the packets, simply converting the result of isPacketInOrder
 * into a comparator result. Flatten the pairs array and add the new divider packets
 * in before processing, then find them later by iterating the resulting array.
 */
(async () => {
  const divider1 = [[2]];
  const divider2 = [[6]];
  const packets = (await parseInput()).flat().concat([divider1, divider2]);

  packets.sort((a, b) => (isPacketInOrder(a, b) ? -1 : 1));

  let d1 = -1;
  let d2 = -1;
  for (let i = 0; i < packets.length; i++) {
    const p = packets[i];
    if (p === divider1) {
      d1 = i + 1;
    } else if (p === divider2) {
      d2 = i + 1;
    }

    if (d1 !== -1 && d2 !== -1) break;
  }

  console.log(`Decoder key: ${d1 * d2}`);
})();
