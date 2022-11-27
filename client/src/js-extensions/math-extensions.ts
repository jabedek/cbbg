export {};

declare global {
  interface Math {
    randomInt(minIncl?: number, maxIncl?: number): number;
  }
}

if (!Math.randomInt) {
  Math.randomInt = function (minIncl = 0, maxIncl = 10000): number {
    minIncl = Math.ceil(minIncl) - 1;
    maxIncl = Math.floor(maxIncl);
    return Math.floor(Math.random() * (maxIncl - minIncl) + (minIncl + 1));
  };
}
