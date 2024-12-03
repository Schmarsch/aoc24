import path from "node:path";
import fs from "node:fs";

const lines = fs.readFileSync(path.resolve(__dirname, "./inputs/a.txt"), "utf-8").split("\n");

const saveLines = (nums: number[]) => {
  const diffs = nums.map((n, i) => n - nums[i - 1]);
  diffs.shift();
  return diffs.every((d) => d >= -3 && d < 0) || diffs.every((d) => d <= 3 && d > 0);
};

function a() {
  const nums = lines.map((r) => r.split(" ").map((n) => parseInt(n, 10)));
  return nums.filter((numList) => saveLines(numList));
}

function b() {
  const nums = lines.map((r) => r.split(" ").map((n) => parseInt(n, 10)));

  return nums.filter((numList) => {
    if (saveLines(numList)) return true;

    for (let i = 0; i < numList.length; i++) {
      if (saveLines(numList.toSpliced(i, 1))) return true;
    }
  });
}

console.log(a().length);
console.log(b().length);
