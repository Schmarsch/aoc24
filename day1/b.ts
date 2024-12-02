import path from "path";
import fs from "fs";

const filePath = path.join(__dirname, "./inputs/b.txt");

const input = fs
  .readFileSync(filePath, "utf-8")
  .split("\n")
  .map((r) => r.split("   ").map((n) => parseInt(n, 10)));

const left = input.map(([a, b]) => a).sort();
const right = input.map(([a, b]) => b).sort();

const occ = left.map((l) => l * right.filter((k) => k === l).length);

const sum = occ.reduce((acc, curr) => acc + curr, 0);

console.log(sum);
