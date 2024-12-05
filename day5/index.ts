const input = await Bun.file("./inputs/a.txt").text();

const parts = input.split("\n\n");

const rules = parts[0].split("\n").map((line) => line.split("|").map(Number));
const pages = parts[1].split("\n").map((line) => line.split(",").map(Number));

const a = () => {
  const validPages = pages.filter((page) => {
    // filter out all pages not adhering to the rules:
    // 1. page1 must be before page2
    // 2. if only page1 or page2 is present, it is fine
    return rules.every(([page1, page2]) => {
      const leftIndex = page.indexOf(page1);
      const rightIndex = page.indexOf(page2);

      return leftIndex === -1 || rightIndex === -1 || leftIndex < rightIndex;
    });
  });

  // find the middle page in all valid pages
  // sum up the middle pages and return the sum
  return validPages
    .map((page) => page[Math.floor(page.length / 2)])
    .reduce((a, b) => a + b, 0);
};

const b = () => {
  const invalidPages = pages.filter((page) => {
    return rules.some(([page1, page2]) => {
      const leftIndex = page.indexOf(page1);
      const rightIndex = page.indexOf(page2);

      return !(leftIndex === -1 || rightIndex === -1 || leftIndex < rightIndex);
    });
  });

  // Reorder the invalid pages so they follow the rules

  const reorderedPages = invalidPages.map((page) => {
    const mustComeBefore: Record<number, Set<number>> = page.reduce(
      (acc, num) => {
        acc[num] = new Set();
        return acc;
      },
      {} as Record<number, Set<number>>
    );

    rules.forEach(([left, right]) => {
      if (page.includes(left) && page.includes(right)) {
        mustComeBefore[right].add(left);
      }
    });

    const result: number[] = [];
    const remaining = new Set(page);

    while (remaining.size > 0) {
      const available = Array.from(remaining).filter((num) =>
        Array.from(mustComeBefore[num]).every((dep) => !remaining.has(dep))
      );

      if (available.length === 0) {
        const next = Array.from(remaining)[0];
        result.push(next);
        remaining.delete(next);
      } else {
        const next = available[0];
        result.push(next);
        remaining.delete(next);
      }
    }
    return result;
  });

  return reorderedPages
    .map((page) => page[Math.floor(page.length / 2)])
    .reduce((a, b) => a + b, 0);
};

console.log(a());
console.log(b());
