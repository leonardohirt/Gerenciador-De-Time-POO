export class Repository<T> {
  private items: T[] = [];

  public add(item: T): void {
    this.items.push(item);
  }

  public getAll(): T[] {
    return [...this.items];
  }

  public find(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }

  public remove(predicate: (item: T) => boolean): boolean {
    const index = this.items.findIndex(predicate);

    if (index === -1) return false;

    this.items.splice(index, 1);
    return true;
  }
}
