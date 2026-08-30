// Object Oriented Programming

// Static Methods and Properties

class MathHelper {
  static readonly PI: number = 3.14159;

  static add(a: number, b: number): number {
	return a + b;
  }
}

console.log(MathHelper.PI);       // 3.14159
console.log(MathHelper.add(5, 3)); // 8

let math = new MathHelper();
console.log(math.add(5, 3));   // error