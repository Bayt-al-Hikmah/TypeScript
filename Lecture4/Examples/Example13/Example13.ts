// Handling Errors

// Creating Cotsum Errors

// Define a custom error type
class ValidationError extends Error {
  constructor(message: string) {
    super(message); // Pass the message to the base 'Error' class
    this.name = "ValidationError"; // Set the error name
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}

function registerUser(username: string) {
  if (username.length < 3) {
    // Throw our specific error
    throw new ValidationError("Username must be at least 3 characters long.");
  }
  console.log(`User '${username}' registered.`);
}

try {
  registerUser("Al");
} catch (error) {
  // We can check the *type* of error
  if (error instanceof ValidationError) {
    console.warn("Validation failed:", error.message);
  } else if (error instanceof Error) {
    console.error("A system error occurred:", error.message);
  } else {
    console.error("An unknown error occurred.");
  }
}