import * as readline from 'readline';


const rl = readline.createInterface({
  input: process.stdin, 
  output: process.stdout 
});


rl.question("Please enter the radius of the circle: ", (radiusString) => {

  const radius: number = Number(radiusString);

  if (isNaN(radius)) {
    console.log("Invalid input. Please enter a valid number.");
  } else {
    const area: number = Math.PI * Math.pow(radius, 2);
    console.log(`The surface area of a circle with radius ${radius} is: ${area.toFixed(2)}`);
  }

  rl.close();
});