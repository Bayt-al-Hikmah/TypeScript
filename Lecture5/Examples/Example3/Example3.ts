// Working with Generic

// Generic with constrain

// Creating interface that add contrain
interface WithLength {
  length: number;
}

// our generic type extands WithLength which mean it most have .length property 
function logLength<T extends WithLength>(arg: T): void {
  // Now TypeScript is happy, because it knows 'arg' will have '.length'
  console.log(arg.length);
}

logLength("hello"); // Works (string has length)
logLength([1, 2, 3]); // Works (array has length)
logLength({ length: 10, value: 'test' }); // Works (object has length)
// logLength(123); // Error: Argument of type 'number' is not assignable to parameter of type 'WithLength'.