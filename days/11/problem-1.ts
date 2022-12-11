import { parseInput } from "./utils";

function execute(
  current: number,
  operator: "+" | "*",
  operand: number | "old"
) {
  const resolvedOperand = operand === "old" ? current : operand;
  return operator === "*"
    ? current * resolvedOperand
    : current + resolvedOperand;
}

(async () => {
  const monkeys = await parseInput();

  const counts: Array<number> = Array.from({ length: monkeys.length }, () => 0);
  let rounds = 0;

  while (rounds < 20) {
    for (let i = 0; i < monkeys.length; i++) {
      const { items, op, test } = monkeys[i];
      while (items.length) {
        let item = items.shift() as number;
        item = execute(item, op.op, op.value);
        item = Math.floor(item / 3);

        counts[i]++;

        if (item % test.div === 0) {
          monkeys[test.positive].items.push(item);
        } else {
          monkeys[test.negative].items.push(item);
        }
      }
    }

    rounds++;
  }

  counts.sort((a, b) => b - a);

  console.log(`Monkey business: ${counts[0] * counts[1]}`);
})();
