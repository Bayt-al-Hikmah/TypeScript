// Working with Generic

// Generic Class

class DataStorage<T> {
  private data: T[] = [];

  // The 'T' placeholder ensures we can only add items of the correct type
  addItem(item: T): void {
    this.data.push(item);
  }

  getItems(): T[] {
    return this.data;
  }
}

// We specify the type when we create an instance
const stringStore = new DataStorage<string>();
stringStore.addItem("Hello");
stringStore.addItem("World");
// stringStore.addItem(123); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.

const numberStore = new DataStorage<number>();
numberStore.addItem(10);