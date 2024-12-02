import path from "node:path";
import fs from "node:fs";

const input = fs
  .readFileSync(path.resolve(__dirname, "./inputs/a.txt"), "utf-8")
  .split("\n")
  .map((r) => r.split("   ").map((n) => parseInt(n, 10)));

const left = input.map(([a, b]) => a).sort();
const right = input.map(([a, b]) => b).sort();

const diffs = left.map((l, i) => Math.abs(l - right[i]));

const sum = diffs.reduce((acc, curr) => acc + curr, 0);

console.log(sum);
