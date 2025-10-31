## Objectives
- Working with Functions
- Working with Modules, Packages & Namespaces
## Functions

### Introduction
A function is a reusable block of code designed to perform a specific task. Functions are fundamental to writing efficient and well-structured programs. By following the DRY (Don't Repeat Yourself) principle, functions help eliminate code duplication and promote cleaner code. They also make it easier to break down complex problems into smaller, manageable parts, resulting in code that is more organized, easier to understand, and simpler to maintain.
### Creating Functions
In TypeScript, we define a function using the `function` keyword, followed by the function name, parameters, and (optionally but recommended) a return type.   
If a function does not return any value, we use the special return type `void`.  
Lets declare simple function named `sayHello` to print `Hello, user!"` we start with the`function` keyword, followed by the function name `sayHello`, and empty parentheses `()` we don't need arguments for this function. Then we put the code that the function executes inside curly braces `{ }`.
```ts
function sayHello(): void {
	console.log("Hello, user!");
}
```
To execute the code inside a function, we need to call it. We do this by writing the function's name followed by parentheses. In our example, the parentheses are empty because the function does not take any arguments.
```ts
// We define the function
function sayHello(): void {
	console.log("Hello, user!");
}

// We call the function to execute its code
sayHello(); // Output: Hello, user!
```
### Function with Parameters
To make a function more powerful, we can allow it to accept values that change its behavior. We do this by adding parameters inside the parentheses after the function name. In TypeScript, we should specify the type for each parameter.
```ts
function sayHello(name: string): void {
	// We use a template literal to insert the variable into the string
	console.log(`Hello, ${name}`);
}

// We call the function and pass "Ali" as an argument
sayHello("Ali"); // Output: Hello, Ali
```
In this example we edited the `sayHello` function, no it have one parametre of type ``string``, and use it to display defferent message depending on the argument we provided, we call the `sayHello` function and pass the value `"Ali"` as an argument. The function receives this value in its parameter `name`, which has the type `string`. It then uses this value to display a personalized greeting.
### Default & Optional Parameters
TypeScript provides more flexibility for parameters.  
**Optional Parameters** We can mark a parameter as optional by adding a `?` after its name. Optional parameters must come after required parameters.
```ts
function greet(firstName: string, lastName?: string): void {
	if (lastName) {
		console.log(`Hello, ${firstName} ${lastName}`);
	} else {
		console.log(`Hello, ${firstName}`);
	}
}

greet("Ahmed"); // Output: Hello, Ahmed
greet("Ahmed", "Ali"); // Output: Hello, Ahmed Ali
```
Here the lastName is optional prameter, we can pass argument to it or ommit using it.   
**Default Parameters** We  can also provide a default value for a parameter by using the `=` operator. This makes the parameter optional, and if no value is provided, the default value is used.
```ts
function greet(name: string, greeting: string = "Hello"): void {
	console.log(`${greeting}, ${name}`);
}

greet("Sara"); // Output: Hello, Sara
greet("Sara", "Hi"); // Output: Hi, Sara
```
### Function Types & Return Types
Functions can do even more: they can also return a value using the `return` keyword. For example, a function can perform a calculation and return the result. In TypeScript, we explicitly define the return type after the parameter list, separated by a colon `:`.
```ts
// Parameters and return type are explicitly typed
function addTwoNumbers(num1: number, num2: number): number {
	const result: number = num1 + num2;
	return result;
}

console.log(addTwoNumbers(4, 5)); // Output: 9
```
Here the ``addTwoNumbers`` accept two argument `num1` and `num2` as `number`, and return `number` the result of `num1 + num2`.      
TypeScript provide us with more powerfull feature called **Function Types** it allow us define a "type" for a function. This is  useful when passing functions as arguments (callbacks).
```ts
// This variable 'add' must hold a function that
// takes two 'number's and returns a 'number'.
let add: (a: number, b: number) => number;

// This assignment is valid
add = (num1: number, num2: number): number => {
	return num1 + num2;
};

// This assignment would cause a TypeScript error
// add = (name: string) => console.log(name);
```
Here for the  ``add`` variabe we declared that it type is function that take two ``number`` as parametres and return ``number``
### Function Overloads
**Function overload** is a feature in TypeScript that allows us to define multiple ways to call the same function. In other words, we can create different function signatures for the same function, where each signature may accept different parameter types and/or return different types.  
When we want to overload a function we start by  writing the overload signatures first, and then provide the actual function implementation that handles all the cases.    
The final function body must be compatible with all the overload signatures.
```ts
// Overload 1: Takes two numbers, returns a number
function combine(a: number, b: number): number;
// Overload 2: Takes two strings, returns a string
function combine(a: string, b: string): string;

function combine(a: any, b: any): any {
	if (typeof a === "number" && typeof b === "number") {
		return a + b;
	}
	if (typeof a === "string" && typeof b === "string") {
		return a + b;
	}
	throw new Error("Invalid arguments");
}

console.log(combine(10, 20)); 
console.log(combine("Hello, ", "World!")); 

```
In this example, we are overloading the `combine` function so it can work in two different ways:
1. If we pass two numbers, it will return a number (their sum).
2. If we pass two strings, it will return a **string** (their concatenation).

The first two function declarations define the overload signatures  they tell TypeScript what kinds of inputs the function accepts and what it returns.  
The final `combine` function is the actual implementation, which uses runtime checks (`typeof`) to decide what to do based on the argument types.  
If we pass anything other than two numbers or two strings, the function throws an error:
### Variable Scope
Scope defines the region within a program where a particular variable or function can be accessed. TypeScript's scoping rules are primarily based on blocks and modules.   
#### Module Scope
In TypeScript, each file is a **module**. By default, everything defined in a file is **unexported** (private) and only accessible within that same file.   
To make an identifier (variable, function, class) visible to other files (modules), you must explicitly **export** it using the `export` keyword. Other files can then **import** it.
```ts
// --- In file: myModule.ts ---

// This function is exported and can be imported by other files
export function exportedFunction() {
	console.log("This is exported");
}

// This function is unexported (private to this file)
function internalFunction() {
	console.log("This is internal");
}
```
Here we importing `exportedFunction` and using it
```ts
// --- In file: main.ts ---
import { exportedFunction } from "./myModule";

exportedFunction(); // OK

// This would cause an error:
// internalFunction();
```
#### Local Scope
Variables declared inside a function are local to that function. With `let` and `const`, variables declared inside a block (like a `for` loop or `if` statement) are local only to that block. This is called **block scope**.
```ts
function printSum(a: number, b: number): void {
	const result = a + b; // 'result' is local to printSum
	console.log(result);

	if (result > 5) {
		const inBlock = "Only visible here"; // 'inBlock' is local to this if-block
		console.log(inBlock);
	}
	// console.log(inBlock); // Error: 'inBlock' is not defined in this scope
}

printSum(3, 5);
// console.log(result); // Error: 'result' is not defined in this scope
```
In this example, variables are only accessible within the scope where they are defined. The variable `result` is created inside the `printSum` function, so it can only be used within that function. Inside the `if` block, we create another variable called `inBlock`, which is only accessible inside that block.

### Rest Parameters
Sometimes, we don't know in advance how many arguments a user will pass, but we still want our function to handle all of them. TypeScript allows us to create functions that accept an arbitrary number of arguments using **rest parameters**. We do this by adding `...` (ellipsis) before the name of the last parameter.  
This gathers all remaining arguments into a single **array**.
```ts
function sayHelloToAll(...names: string[]): void {
	// 'names' will be an array of strings (string[])
	for (const name of names) {
		console.log("Hello", name);
	}
}

// We can pass any number of arguments
sayHelloToAll("Mohamed", "Ali", "Ahmed");
sayHelloToAll("Just_One");
```
Here we created reset parametre of type ``string[]``, this mean our user can provide one or many string to our function, and we will store all those argument inside array called names.   
We can also pass an array to a function that expects rest parameters by using the **spread operator** (`...`).
```ts
function sum(...nums: number[]): number {
	let total = 0;
	for (const num of nums) {
		total += num;
	}
	return total;
}

console.log(sum(1, 2, 3)); // Output: 6

// Pass an array using the spread operator
const myNumbers = [4, 5, 6];
console.log(sum(...myNumbers)); // Output: 15
```
### Recursive Functions
A recursive function is a special function that has the ability to call itself until a condition (which we call a **base case**) is met.  
Let's suppose we want to create a function that calculates the factorial of a number. We know that:  
- 0! is equal to 1
- 1! is equal to 1 \* 0!=1\*1
- 2! is equal to 2 * 1 =2 \* 1!
- 3! is equal to 3 * 2 * 1 = 3 \* 2!
- 4! is equal to 4 * 3 * 2 * 1 =  4 \* 3!
- 5! is equal to 5 * 4 * 3 * 2 * 1 = 5 * 4!

With that in mind, we can set the base case: if n === 0, we return 1. Otherwise, we return n multiplied by the factorial of n-1.
```ts
function factorial(n: number): number {
	if (n === 0) {
		// Base case
		return 1;
	}
	// Recursive step
	return n * factorial(n - 1);
}

console.log(factorial(5)); // Output: 120
```
Here if the value is 0 return 1. else we return ``n \* factorial(n-1)``, for 5 we get the following
- 5 not equal to 0 so we returning ``5 \* factorial(5-1)`` -> ``5 \* factorial(4)``, so to get the value we will need to calculate the factorial of 4.
- 4 not equal to 0 so we returning ``4 \* factorial(4-1)`` -> ``4 \* factorial(3)``, so to get the value we will need to calculate the factorial of 3.
- 3 not equal to 0 so we returning ``3 \* factorial(3-1)`` -> ``3 \* factorial(2)``, so to get the value we will need to calculate the factorial of 2.
- 2 not equal to 0 so we returning ``2 \* factorial(2-1)`` -> ``4 \* factorial(1)``, so to get the value we will need to calculate the factorial of 1.
- 1 not equal to 0 so we returning ``1 \* factorial(1-1)`` -> ``1 \* factorial(0)``, so to get the value we will need to calculate the factorial of 0.
- 0 is equal to 0 so we returning ``1``.

Now we substitute the results back up the chain:
```
factorial(0) = 1
factorial(1) = 1 * factorial(0) = 1 * 1 = 1
factorial(2) = 2 * factorial(1) = 2 * 1 = 2
factorial(3) = 3 * factorial(2) = 3 * 2 = 6
factorial(4) = 4 * factorial(3) = 4 * 6 = 24
factorial(5) = 5 * factorial(4) = 5 * 24 = 120
```
So, `factorial(5)` = **120**.

### Anonymous Functions
Anonymous functions (or function expressions) are functions without a name. They're useful for short, one-time-use functionality, especially for callbacks. They can be assigned to variables or passed as arguments.
```ts
// Assign an anonymous function to a variable
const square = function (n: number): number {
	return n * n;
};

console.log(square(4)); // Output: 16
```
### Arrow Functions
Arrow functions (`=>`) are a more concise syntax for writing anonymous functions. They are one of the most popular features in modern JavaScript and TypeScript.
```ts
// The 'square' function as an arrow function
const square = (n: number): number => {
	return n * n;
};

// If the function body is a single expression,
// we can omit the { } and the 'return' keyword.
const conciseSquare = (n: number): number => n * n;

console.log(conciseSquare(4)); // Output: 16
```
Besides shorter syntax, arrow functions also behave differently with the `this` keyword; they **lexically bind** `this`, meaning `this` retains the value from its surrounding (enclosing) scope.
### Passing Functions as Arguments
In TypeScript, functions are **first-class citizens**, meaning they can be passed as arguments just like variables. This is the foundation of functional programming and is used heavily for **callbacks**.  
To make a function accept another function as a parameter, we use a **function type** for the parameter.
```ts
function greet(name: string): void {
	console.log(`Hello, ${name}`);
}

// 'callback' is a parameter of type '(name: string) => void'
// It accepts any function that takes one string and returns nothing.
function runCallback(callback: (name: string) => void, value: string): void {
	callback(value);
}

// Pass a named function
runCallback(greet, "TypeScript"); // Output: Hello, TypeScript

// Pass an arrow function directly
runCallback((name: string) => {
	console.log(`Hi, ${name}`);
}, "Ali"); // Output: Hi, Ali
```
In this example, `runCallback` accepts two arguments:
1. **callback** a function that takes a `string` and returns `void`
2. **value** a string value that will be passed to the callback function

So calling `runCallback(greet, "TypeScript")` will dall the `greet` function and pass `"TypeScript"` to it.
### Returning Functions
Functions can also return a function. This is useful for creating **“function factories”**: functions that generate other functions, often with customized behavior.  
To return a function, we simply set the return type to a **function type signature**.
```ts
const add = (a: number, b: number): number => a + b;
const multiply = (a: number, b: number): number => a * b;

// This function *returns* a function of type '(a: number, b: number) => number'
function getOperation(opType: string): ((a: number, b: number) => number) | null {
	if (opType === "add") {
		return add;
	} else if (opType === "multiply") {
		return multiply;
	}
	// Return null if the type is unknown
	return null;
}

const operation = getOperation("multiply");

if (operation) {
	// 'operation' now holds the 'multiply' function
	console.log(operation(3, 4)); // Output: 12
}
```
This allows us to **choose which function to execute at runtime** based on a string or some condition, making our code flexible and reusable.

### Functional Programming Concepts

While TypeScript is not a purely functional language (it's a multi-paradigm, object-oriented language), it embraces and strongly supports key functional concepts:

- **Pure functions:** You can (and should) write functions that always produce the same output for the same arguments and have no side effects. This makes code easier to test and reason about.
    
- **Immutability:** While variables are mutable by default (with `let`), TypeScript provides tools to enforce immutability, such as the `const` keyword (for variables) and the `readonly` modifier (for class properties and array types).
    
- **Recursive functions:** Recursion is fully supported.
    
- **First-Class and Higher-Order functions:** As shown, functions are first-class citizens. Functions that take other functions as arguments or return them (higher-order functions) are extremely common, especially with array methods like `.map()`, `.filter()`, and `.reduce()`.

## Modules and Namespaces
### Introduction to Modules
A **module** is TypeScript's fundamental unit for organizing code. In modern TypeScript and JavaScript (ES6+), the system is very simple: each file is its own module.
Modules serve two primary purposes:
1. **Organization**: They keep related code (functions, classes, variables) grouped together in a single file, making large projects manageable.
2. **Encapsulation**: They control which parts of our code are "public" and which are "private." The scope is defined by the file itself.
    - **Exported** (Public): If an identifier (like a function, class, or variable) is prefixed with the `export` keyword, it can be accessed by other modules (files) that `import` it.
    - **Unexported** (Private): If it does not have the `export` keyword, it is private and can only be accessed by other code _within the same file_.
### Using Built-in APIs
TypeScript, running on a JavaScript engine, comes with a powerful set of built-in objects and APIs (like a "standard library"). We don't need to install or import them. For example, we've been using `console.log()` to print to the console. To get a random number, we can use the global `Math` object.
```ts
// No imports are needed for built-in globals
console.log("Hello, TypeScript!");
const myFavoriteNumber = Math.floor(Math.random() * 10);
console.log("My favorite number is", myFavoriteNumber);
```
When running in a browser, this also includes Web APIs like `fetch` or `document`. When running in Node.js, this includes globals like `process`.
### Introduction to Packages (npm)
While modules organize code within files, packages organize modules into a single, shareable unit. A TypeScript/JavaScript package is a collection of related modules (a project) that are versioned together. Packages are how we manage dependencies the other libraries our project needs to run.  
A package is defined by a `package.json` file, which lives in the root directory of our project. This file tracks our project's name and all its dependencies and their specific versions (in `dependencies` and `devDependencies`).
### Creating Our Own Project
To start any new project, our first step should be to create a package. We do this from our terminal using the `npm init` command (or `yarn init`). This command creates the `package.json` file for us.
```shell
# First, create a new directory for our project
mkdir myawesomeproject
cd myawesomeproject

# Now, initialize the project
# The '-y' flag accepts all the defaults
npm init -y
```
This command will create a `package.json` file that looks something like this:
```json
{
	"name": "myawesomeproject",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"keywords": [],
	"author": "",
	"license": "ISC"
}
```
Our project is now officially a package.
### Organizing Project Files 
Now that we have a project, we can easily create and use our own modules (files). Let's create a `calculator` module inside our `myawesomeproject`.  
We start by creating a new directory `calculator`. Inside that directory, we create a new file `add.ts`.  
Our project structure should now look like this:  
```
myawesomeproject/
├── package.json
├── calculator/
│   └── add.ts
└── index.ts      (This will be our main entry point)
```
Next, we add code to `calculator/add.ts`. Note the `export` keyword, which makes the `Add` function public (exported).
```ts
// File: calculator/add.ts

// This function is EXPORTED and can be imported by other files
export function Add(a: number, b: number): number {
	return a + b;
}

// This function is UNEXPORTED and private to this file
function subtract(a: number, b: number): number {
	return a - b;
}
```
Now, we can use our new module from `index.ts`. We import it using a **relative path** (starting with `./`).
```ts
// File: index.ts
import { Add } from "./calculator/add"; // Import our local module

const sum = Add(10, 5);
console.log("The sum is:", sum); // Output: The sum is: 15

// This line would cause a compile error because 'subtract'
// was not exported from './calculator/add.ts':
// const diff = subtract(10, 5);
```
When we compile and run our code, TypeScript (or the JavaScript runtime) sees the import, looks for the `add.ts` file relative to `index.ts`, and uses the exported `Add` function.
### Common Import/Export Patterns
TypeScript uses the ES6 module syntax, which is very flexible.
#### Named Exports: 
Named exports allow us to export multiple values from a file, and other files can import only the ones they need. To use a named export, simply place the `export` keyword in front of each variable, function, or constant you want to make availab
```ts
// utils.ts
export const PI = 3.14;
export function log(message: string) { /* ... */ }
```
Then when we want to use it on other file we just import it 
```ts
// main.ts
import { PI, log } from "./utils";
console.log(PI);
```
#### Default Export
A default export is used when we want to export a single main value from a file. Instead of naming it during export, we mark one item as the default. When importing, we can choose any name we like no curly braces needed.
```ts
// mathTools.ts
export default function multiply(a: number, b: number) {
	return a * b;
}
```
To use it in another file, simply import it and give it a name:
```ts
// app.ts
import mul from "./mathTools";

console.log(multiply(4, 5)); // 20
```
#### Module Aliasing
Sometimes when we importing from modules the function or the variables names might be long or even conflict with names in our file. In these cases, we can **alias** (rename) imports to make them shorter or avoid conflicts.
```ts
import { Add as addNumbers } from "./calculator/add";

console.log(addNumbers(5, 5)); // Output: 10
```
#### Namespace Import
Sometimes we want to import every functions or variables inside module, importing each one individually can get messy. To avoid that, we can use a **namespace import**, which pulls in all named exports under a single object. This way, we can access everything through that namespace without writing multiple import lines.
```ts
// utils.ts
export const PI = 3.14;
export function log(message: string) {
	console.log("Log:", message);
}
```
Instead we do as before we import PI and the log function, we use namespace import
```ts
// main.ts
import * as Utils from "./utils";

console.log(Utils.PI);      // 3.14
Utils.log("Hello");         // Log: Hello
```
### Managing Third-Party Packages (npm)
One of the biggest advantages of the `package.json` system is how easily it lets us use external libraries (third-party packages) from the npm registry.
For example, let's say we want to use the popular `uuid` library.

We start by installing the package We don't need to manually download it. We just tell npm to install it:
```shell
npm install uuid
```
This command does two things:
1. It downloads the `uuid` package into a `node_modules` folder.
2. It automatically adds `uuid` as a dependency in our `package.json` file.

After that, we install the type definitions for a package as a development dependency (using `--save-dev` or `-D`) by prefixing the package name with `@types/`. We need to do this because most JavaScript libraries don’t include TypeScript type information by default, and the `@types` packages provide those typings so TypeScript can understand the code.
```shell
npm install @types/uuid --save-dev
```
Now, TypeScript knows all the functions, types, and signatures for the `uuid` library, giving us autocompletion and type-checking.    
With this set we can use the package in our code, we can now import and use the package just like one of our own modules.
```ts
// File: index.ts
import { Add } from "./calculator/add";
import { v4 as uuidv4 } from "uuid"; // Third-party package import

const sum = Add(10, 5);
console.log("The sum is:", sum);

const newID = uuidv4();
console.log("Generated UUID:", newID);
```

## Tasks
### Task 1

Create a TypeScript function that tests whether a given `number` is a prime number or not. It should return a `boolean`.

### Task 2

Write a TypeScript function that converts a decimal number to its binary representation **using recursion**. It should take a `number` as an argument and return a `number`.

### Task 3

Create a new TypeScript project (e.g., with `npm init`). Inside it, create a new module (a file, e.g., `stats.ts`) that contains the following exported functions:

- A function that returns the largest element in an array of numbers (`number[]`).
    
- A function that returns the smallest element in an array of numbers.
    
- A function that calculates and returns the average of all elements in the array (as a `number`).
    

Then, create a main `index.ts` file that `import`s these functions. In `index.ts`, define an array of numbers and use your imported functions to find and display the largest element, smallest element, and the average.
