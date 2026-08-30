// Handling Errors

// Raising Errors

function divide(a: number, b: number): number {
  if (b === 0) {
    // Throwing an error stops the function
    throw new Error("Cannot divide by zero.");
  }
  return a / b;
}

try {
  console.log(divide(10, 0));
} catch (e) {
  if (e instanceof Error) {
    console.log(e.message); // Logs: "Cannot divide by zero."
  }
}