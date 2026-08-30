// Working with Generic

// Generic Functions
function getFirstElement<T>(arr: T[]): T | undefined{
  return arr[0];
}

// using the function
const firstNum = getFirstElement([1, 2, 3]);
// TypeScript infers that T is 'number'. 'firstNum' is typed as 'number'.

const firstStr = getFirstElement(["a", "b", "c"]);
// TypeScript infers that T is 'string'. 'firstStr' is typed as 'string'.

// firstNum.toUpperCase(); // Compile-Time Error! Property 'toUpperCase' does not exist on type 'number'.

