const input = await Bun.file("./inputs/a.txt").text();

const lines = input.split("\n");
const grid = lines.map((line) => line.split(""));

// getAtCoords = gc
const gc = (x: number, y: number) => {
  return grid[y]?.[x];
};

// get all the strings starting from a specific point
const getTextFromPoint = (x: number, y: number) => {
  return [
    gc(x, y) + gc(x + 1, y) + gc(x + 2, y) + gc(x + 3, y),
    gc(x, y) + gc(x - 1, y) + gc(x - 2, y) + gc(x - 3, y),
    gc(x, y) + gc(x, y + 1) + gc(x, y + 2) + gc(x, y + 3),
    gc(x, y) + gc(x, y - 1) + gc(x, y - 2) + gc(x, y - 3),
    gc(x, y) + gc(x + 1, y + 1) + gc(x + 2, y + 2) + gc(x + 3, y + 3),
    gc(x, y) + gc(x - 1, y + 1) + gc(x - 2, y + 2) + gc(x - 3, y + 3),
    gc(x, y) + gc(x + 1, y - 1) + gc(x + 2, y - 2) + gc(x + 3, y - 3),
    gc(x, y) + gc(x - 1, y - 1) + gc(x - 2, y - 2) + gc(x - 3, y - 3),
  ];
};

const checkFromCoordiante = (x: number, y: number, searchString: string) => {
  if (gc(x, y) !== searchString[0]) return 0;

  return getTextFromPoint(x, y).filter(
    (dir) => dir.toLowerCase() === searchString.toLowerCase()
  ).length;
};

const getCross = (x: number, y: number) => {
  return [
    gc(x - 1, y - 1) + gc(x, y) + gc(x + 1, y + 1),
    gc(x - 1, y + 1) + gc(x, y) + gc(x + 1, y - 1),
  ];
};

const a = () => {
  let occ = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      occ += checkFromCoordiante(x, y, "XMAS");
    }
  }

  console.log(occ);
};

const b = () => {
  let occ = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (getCross(x, y).every((dir) => dir === "MAS" || dir === "SAM")) {
        occ++;
      }
    }
  }

  console.log(occ);
};

a();
b();
