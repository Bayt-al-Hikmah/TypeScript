// Object Oriented Programming

// Working with Classes

// creating class
class Animal {
  // Property with a type
  name: string;

  // Constructor to initialize properties
  constructor(name: string) {
	this.name = name;
  }

  // Method with a return type (void)
  speak(): void {
	console.log(`${this.name} makes a sound`);
  }
}

// creating object from the class
const dog = new Animal("Buddy");
dog.speak(); // Buddy makes a sound