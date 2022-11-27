export class IdGenerator {
  static counter = 0;
  static generateId = (name: string) => {
    const time = Date.now(); //.toString().substring(5, 13);
    const id = `${IdGenerator.counter}-${name}-${time}`;
    IdGenerator.counter++;

    return id;
  };
}
