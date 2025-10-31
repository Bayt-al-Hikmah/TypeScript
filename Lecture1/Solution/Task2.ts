import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,  // Read from the keyboard
  output: process.stdout // Write to the terminal
});

rl.question("Please enter the temperature in Celsius: ", (celsiusString) => {

  const celsius: number = Number(celsiusString);

  if (isNaN(celsius)) {
    console.log("Invalid input. Please enter a valid number for Celsius.");
  } else {
    const fahrenheit: number = (celsius * (9 / 5)) + 32;
    console.log(`${celsius}°C is equal to ${fahrenheit.toFixed(2)}°F`);
  }
  rl.close();
});
