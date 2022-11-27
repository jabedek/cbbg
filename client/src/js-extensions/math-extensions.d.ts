export {};

declare global {
  interface Math {
    randomInt(minIncl: number, maxIncl: number): number;
  }
}
