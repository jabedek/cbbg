export {};

declare global {
  interface Array<T> {
    random(): T | undefined;
  }
}

if (!Array.prototype.hasOwnProperty('random')) {
  Array.prototype.random = function <T>(this: T[]): T | undefined {
    return this[Math.randomInt(0, this.length - 1)] ?? undefined;
  };
}
