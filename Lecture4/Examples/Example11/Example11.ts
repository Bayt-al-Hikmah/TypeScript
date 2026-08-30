// Handling Errors

// Catching runtime errors
try {
    // This line might will fail at runtime 
    const result = JSON.parse('{invalid json}');
    console.log("Parse successful:", result);
    
} catch (error) {
    // 'error' is of type 'unknown'
    console.error("Failed to parse JSON!");

    // We must check the type before accessing properties
    if (error instanceof Error) {
      // Now TypeScript knows 'error' has a 'message' property
      console.log(error.message);
    } else {
      console.log("An unknown error occurred:", error);
    }
    
} finally {
    // This runs no matter what
    console.log("JSON parsing attempt finished.");
}

