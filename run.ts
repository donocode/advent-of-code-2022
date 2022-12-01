const [, , ...args] = process.argv;

if (args.length !== 2) throw new Error("Needs 2 args, day and problem");

(async () => {
  await import(`./days/${args[0]}/problem-${args[1]}.ts`);
})();
