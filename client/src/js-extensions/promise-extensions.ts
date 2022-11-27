export {};

declare global {
  interface Promise<T> {
    fireAndForget(): void;
  }
}

if (!Promise.prototype.hasOwnProperty('fireAndForget')) {
  Promise.prototype.fireAndForget = function (): void {
    this.then().catch(() => {
      // swallow error by design as run in fire&forget mode
    });
  };
}
