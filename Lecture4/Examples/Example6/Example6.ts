// Object Oriented Programming

// Abstract Classes

abstract class Shape {
  // An abstract method has no body
  abstract getArea(): number;

  // A regular method can also exist
  printInfo(): void {
	console.log("This is a shape.");
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
	super();
  }

  // We must implement the abstract getArea method
  getArea(): number {
	return Math.PI * this.radius ** 2;
  }
}

// const s = new Shape(); // Error: Cannot create an instance of an abstract class.
const c = new Circle(5);
console.log(c.getArea());