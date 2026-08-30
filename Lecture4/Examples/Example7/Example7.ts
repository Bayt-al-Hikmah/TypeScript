// Object Oriented Programming

// Polymorphism 

class Shape {
  draw(): void {
	console.log("Drawing a shape");
  }
}

class Circle extends Shape {
  draw(): void {
	console.log("Drawing a circle");
  }
}

class Square extends Shape {
  draw(): void {
	console.log("Drawing a square");
  }
}

// All objects are treated as 'Shape'
const shapes: Shape[] = [new Shape(), new Circle(), new Square()];

// The correct 'draw' method is called for each object
shapes.forEach(shape => shape.draw());