// Working with modules

// importing our module
import { Add } from "./calculator/add.js"; // Import our local module

const sum = Add(10, 5);
console.log("The sum is:", sum); // Output: The sum is: 15
// const diff = subtract(10, 5); Error we didnt set it as exported function

// Module aliasing using as
import { multiply as mul} from "./calculator/multiply.js"; // Import our local module

console.log(mul(4, 5));


// Importing as namespace
import * as Utils from "./calculator/utils.js";

console.log(Utils.PI);      // 3.14
Utils.log("Hello");         // Log: Hello