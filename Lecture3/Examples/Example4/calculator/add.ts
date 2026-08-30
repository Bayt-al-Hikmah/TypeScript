// Creating  module


// exporting the Add function
export function Add(a: number, b: number): number {
	return a + b;
}

// This function is UNEXPORTED and private to this file
function subtract(a: number, b: number): number {
	return a - b;
}