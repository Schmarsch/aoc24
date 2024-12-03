import path from "node:path";
import fs from "node:fs";

const lines = fs.readFileSync(path.resolve(__dirname, "./inputs/a.txt"), "utf-8").split("\n");

const mulRegex = /mul\((\d+),(\d+)\)/g;

const a = () => {
  const allLinesCombined = lines.join("");

  const matches = allLinesCombined.match(mulRegex)!;

  const pairs = matches.map((m) => m.match(/\d+/g));

  const products = pairs.map((p) => p!.map((n) => parseInt(n, 10)));

  const sum = products.reduce((acc, p) => acc + p[0] * p[1], 0);

  return sum;
};

const mulRegexTwo = /do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g;

const b = () => {
  const allLinesCombined = lines.join("");

  const matches = [...allLinesCombined.matchAll(mulRegexTwo)];

  let doFlag = true;
  let sum = 0;

  for (const match of matches) {
    const instruction = match[0];

    if (instruction === "do()") {
      doFlag = true;
    } else if (instruction === "don't()") {
      doFlag = false;
    } else if (instruction.startsWith("mul")) {
      if (doFlag) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        sum += x * y;
      }
    }
  }

  return sum;
};

console.log(a());
console.log(b());
