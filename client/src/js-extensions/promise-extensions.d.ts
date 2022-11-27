export {};

declare global {
  interface Promise<T> {
    fireAndForget(): void;
  }
}
