## Objectives:

- Learn About How Computers Work
- Introduction to Programming Languages
- Introduction to TypeScript and Node.js
- TypeScript Basics
- User Input and Output
## How Computers Work
We all have computers, and we use them for a variety of purposes, including watching videos, playing games, performing mathematical calculations, communicating with friends, and many other applications. But the fundamental question is: how do these devices actually work?  
The answer lies in their electrical nature. Computers are essentially electrical devices that perform all calculations using electrical signals. The central processing unit (CPU), often referred to as the "brain" of the computer, executes these calculations. To temporarily store data while the computer is in operation, it relies on memory, specifically Random Access Memory (RAM).  
Crucially, all information within a computer is represented by electrical signals. This includes data stored in memory and the instructions that the CPU executes. These electrical signals exist in one of two distinct states: presence (typically represented by the digit '1') or absence (represented by '0') .
With this binary representation in mind, we can understand that CPU instructions are essentially sequences of 1s and 0s. This sequence of binary digits is known as machine code, which is the most fundamental level of programming language that the CPU can directly understand.

## Introduction to Programming Languages
Programming languages are tools that were developed to facilitate communication with computers. Instead of writing instructions directly in binary code, which can become incredibly cumbersome for large programs, we can use programming languages with their more user-friendly syntax. This simplifies the coding process, making it easier to read, understand, and debug code.  
However, computers cannot directly understand the syntax of these high-level programming languages. To bridge this gap, we use a program called a **compiler** or an **interpreter**. These tools translate the code into machine code, a low-level language consisting of binary instructions that the computer can execute.

## Introduction to TypeScript
### What is TypeScript & Why Use It?
TypeScript is an open-source language developed by Microsoft. It is a strict syntactical superset of JavaScript, which means any valid JavaScript code is also valid TypeScript code.  
The primary feature TypeScript adds to JavaScript is **static typing**.
- **JavaScript (Dynamic Typing):** Types are checked at runtime (when the program is running). This means you can write `let x = 10; x = "hello";` and only discover a problem if you later try to do math with `x`.
- **TypeScript (Static Typing):** Types are checked at compile time (before the program runs). The editor and compiler will warn you immediately if you try to assign a string to a variable you declared as a number.

**Why use it?**
- **Catch Errors Early:** Finds bugs and typos before you even run your code.
- **Better Readability:** Explicit types make it clear what kind of data a function expects or a variable holds.
- **Smarter Tooling:** Enables powerful autocompletion, refactoring, and navigation in code editors like VS Code.
- **Easier Maintenance:** Makes it safer to change and refactor large codebases.
### TypeScript vs. JavaScript
Think of it this way: TypeScript is not a different language. It is JavaScript, but with a powerful, optional layer of type-checking on top.  
A browser or Node.js cannot run TypeScript directly. Our TypeScript code (in `.ts` files) must first be compiled (or transpiled) into plain JavaScript (in `.js` files), which can then be executed anywhere.
## Introduction to Node.js with TypeScript
### Introduction
**Node.js** is a modern, open-source runtime environment that allows us to run JavaScript code outside the web browser. Built on Chrome's V8 JavaScript engine, Node.js enables developers to build scalable network applications using JavaScript on the server side.  
When we use TypeScript with Node.js, we get the best of both worlds:
1. **Node.js:** A powerful, fast, and efficient server-side environment.
2. **TypeScript:** A type-safe language that prevents common errors and improves developer productivity.

We will write our code in TypeScript files (e.g., `app.ts`), compile them into JavaScript files (`app.js`), and then run those JavaScript files using Node.js.
### Node.js & TypeScript Installation
Before starting, we need to install Node.js and TypeScript.
1. **Install Node.js:** Download and install Node.js from the official website: [https://nodejs.org/](https://nodejs.org/). This will also install `npm` (Node Package Manager).
2. **Verify Node.js Installation:** After installation, open your terminal and run:
```shell
node --version
npm --version
```
3. **Install TypeScript:** We install TypeScript globally using npm:
```shell
npm install -g typescript
```
4. **Install Helper Tools:**
    - **`ts-node`:** A tool that lets us run TypeScript files directly without the separate compile step (it does it in memory). This is great for development.
    - **`@types/node`:** A package that provides TypeScript with type definitions for all of Node.js's built-in modules (like `fs`, `http`, etc.).

We  install them with this command :
```shell
npm install ts-node @types/node --save-dev
```
    

### TypeScript Compiler & Configuration
In TypeScript projects, the compiler we use is the command-line tool **`tsc`** short for _TypeScript Compiler_.  
This tool takes our `.ts` files and converts them into plain JavaScript that Node.js can execute.  
Before starting with typ
Before writing TypeScript code, we need to configure our project.  we do that by running the following command in the root folder of our project:
```shell
tsc --init
```
This creates a **`tsconfig.json`** file. This file tells the `tsc` compiler how to translate our `.ts` files into `.js` files. 
#### `module: "nodenext"`
This tells TypeScript to use Node’s **modern ES Module system** with `.js`/`.ts` + `package.json` `"type"` rules.  
It makes TypeScript behave like the latest Node environment, supporting native `import`/`export`.
#### `target: "esnext"`
This means “compile to the **latest JavaScript** available.”  
TypeScript will assume we're running in a modern environment and won’t downgrade features unless necessary perfect for up-to-date Node runtimes.
#### `types: []`
By default, TypeScript won’t automatically load extra type packages. We explicitly choose what environment we want (e.g. `@types/node` for Node projects), helping avoid hidden global types.
#### `sourceMap: true`
Generates `.map` files so we can debug **original TypeScript** in our browser or Node debugger instead of the compiled JavaScript.
#### `declaration: true` & `declarationMap: true`
These create `.d.ts` files + source maps so other projects (or tools) know our types.  
Useful if you're building a library your type definitions will stay accurate and traceable back to the source.
#### `noUncheckedIndexedAccess: true`
Adds safety when accessing arrays/objects by index.  
Instead of assuming values always exist, TypeScript makes us handle potential `undefined`, preventing sneaky runtime errors.
#### `exactOptionalPropertyTypes: true`
Makes optional properties behave strictly.  
If a property is optional, it doesn’t automatically allow `undefined` unless you explicitly type it that way. Helps avoid subtle bugs.
#### `strict: true`
Turns on TypeScript’s full strict mode catching more errors before runtime and keeping our codebase solid and predictable.
#### `jsx: "react-jsx"`
If we use React, this enables the **modern JSX transform** (no need for `import React from "react"` in every file).
#### `verbatimModuleSyntax: true`
TypeScript won't rewrite or transform your `import`/`export` statements.  
It outputs them **as we wrote them**, letting Node/ESM handle module logic cleaner and closer to real JavaScript behavior.
#### `isolatedModules: true`
Ensures every file can be compiled on its own important for bundlers and tooling like Vite/Next.js.  
It prevents using TypeScript features that only work when the whole project compiles at once.
#### `noUncheckedSideEffectImports: true`
Warns when importing a file **just for side effects** (e.g., a script that runs code on import). This encourages clean, intentional imports.
#### `moduleDetection: "force"`
Forces TS to treat every `.ts` file as a module unless clearly unused. This avoids accidentally creating global scripts.
#### `skipLibCheck: true`
Finally this skips type-checking `.d.ts` library files to speed up builds.  Still checks our code just not external type definitions.

### Writing & Running our First Program
Now that we are done with the configuration, let’s create our first TypeScript program.  
To begin, we will set up a simple and clean project structure. Create a new folder named `my-app`. 
```shell
mkdir my-app
cd my-app
```
Inside this folder, we run the following command to initialize the typescript configuration file
```shell
tsc --init
```
After that we create a file named `index.ts`. This file will serve as the entry point to our application. Now, add the following code to `index.ts`:
```ts
let message: string = 'Hello, TypeScript world!';
console.log(message);
```
We compile now our typescript file using 
```shell
tsc index.ts
```
This file will generate javascript file for us `index.js` that we can run it using 
```shell
node index.js
```
**Output:**
```shell
Hello, TypeScript world!
```
## TypeScript Basics
### Variables
Variables are fundamental building blocks in TypeScript programs, acting just like they do in JavaScript. They are labeled containers that store data, such as numbers, text (strings), and true/false values (booleans). We typically declare them using `let` (for variables that can be reassigned) or `const` (for variables that cannot).  
TypeScript is a superset of JavaScript that adds optional static typing. While JavaScript itself is dynamically typed (a variable's type can change at runtime), TypeScript allows us to explicitly define a type for a variable. When we do, the TypeScript compiler checks our code to ensure that variable only holds that specific type of data. This "type-checking" catches many common bugs before our code even runs.
### DataTypes
Before working with variables, it’s important to understand the different types of information TypeScript allows us to store. Since it's built on JavaScript, TypeScript uses all of JavaScript's primitive types (like `string`, `number`, `boolean`, `null`, `undefined`, and `symbol`) as well as `object`.  
However, TypeScript adds its own powerful types to help describe your data more accurately, such as:
- **Tuples** (arrays with a fixed number of elements of specific types)
- **Enums** (a way of giving more friendly names to sets of numeric values)
- **Any** (opts out of type-checking)
- **Unknown** (a safer alternative to `any`)
- **Void** (for functions that do not return a value)


Each data type serves a specific purpose and determines how the data is stored and manipulated. We can divide data types into two categories basic (or primitive) types and object types.
### Basic Types
The basic types are the simplest, most fundamental data values. Let's look at the most common ones.
#### String
The `string` type is used for textual data. If you need to store text, like a name, a sentence, or any other sequence of characters, you use the `string` type. You can declare them using single quotes (`'`) or double quotes (`"`).
#### Number
TypeScript, like JavaScript, has only one `number` type. This single type represents _all_ numeric values, including both integers (whole numbers) and floating-point numbers (decimals).
#### Boolean
The `boolean` type is one of the simplest, representing only two possible values: `true` or `false`. It is essential for logic, conditions, and flagging things as "on" or "off."
#### Null
The `null` type has only one value: `null`. This is used to represent the intentional absence of a value. It means "this variable _should_ have an object value, but it doesn't have one right now."
#### Undefined
The `undefined` type also has only one value: `undefined`. This typically represents a variable that has been declared but has not yet been assigned a value.
#### Any
The `any` type is a special "escape hatch" in TypeScript. When you type a variable as `any`, you are telling TypeScript to turn off all type-checking for that variable. This means we can assign anything to it and use it in any way, even if it doesn't make sense.   
This should be avoided whenever possible, as it completely defeats the purpose of using TypeScript.
#### Unknown
The `unknown` type is the **safer alternative to `any`**. Like `any`, it can hold any value. However, TypeScript will not let us use a variable of type `unknown` until we first perform some kindS of type check (like using an `if` statement or `typeof`) to determine what its type actually is.
### Object Types
Besides the basic types, the other main category is **object types**. While a basic type holds a single, simple value (like a number or a string), an object type can hold a more complex collection of values and properties.
#### Object 
TypeScript provides a generic `object` type. This type represents any value that is not a primitive type (so, not a `string`, `number`, `boolean`, `symbol`, `null`, or `undefined`).  
While it exists, it's often not very useful on its own because it's too broad. It's much more common and powerful to define the specific shape of your object.  
#### Interface
The real power of TypeScript is defining the exact structure of our objects. We can do this using an `interface` or a `type` alias. This acts as a blueprint for our object, ensuring it has the correct properties and property types.  
An **interface** is a common way to define this shape:

```ts
interface User {
  name: string;
  id: number;
  isActive: boolean;
  email?: string; 
}

let myUser: User = {
  name: "Bob",
  id: 123,
  isActive: true
};
```

#### Array
An `array` is an ordered list of values. TypeScript allows us to specify what type of values the array can hold. We can define an array in two common ways:
1. By adding `[]` after the type.
2. By using the generic `Array<type>` syntax.
    
```ts
// An array that can ONLY hold numbers
let scores: number[] = [100, 85, 92];

// An array that can ONLY hold strings
let names: Array<string> = ["Alice", "Bob", "Charlie"];
```
#### Tuple

A Tuple is a TypeScript-specific type. It's like an array, but with two key differences:
1. It has a fixed number of elements.
2. The types of those elements are known at specific positions.

This is useful when we have a small, fixed set of related data, like an ID and a name.
```ts
// A tuple that must have a string first, then a number
let userPair: [string, number];

userPair = ["b.wayne", 1]; // This is correct

```
#### Enum
An Enum (short for enumeration) is another TypeScript-specific feature. It allows us to define a set of named constants. This is great for making our code more readable by giving friendly names to numeric values.

```ts
// By default, enums are number-based, starting from 0
enum Direction {
  North, // 0
  South, // 1
  East,  // 2
  West   // 3
}

let move: Direction = Direction.North;
```

### Creating Variables
TypeScript provides us with a few ways to create variables, building directly on JavaScript. The modern standard uses `let` and `const`. Choosing the right one depends on whether you need to reassign the variable (mutaibility) and what its scope should be.
#### Using `let` 
The `let` keyword is the most common way to declare a variable that can be reassigned later. It is block-scoped, meaning it only exists within the curly braces (`{}`) it was declared in.  
We can explicitly state the type, or let TypeScript infer it.
```ts
// Explicitly typed
let age: number = 30;
age = 31; // This is allowed

// Declaring without initializing
let name: string;
name = "Alice"; // 'name' is 'undefined' until this line
```
If you don't provide an initial value or a type, the variable defaults to the `any` type, which should generally be avoided. If we declare it with a type but no value, it gets the value `undefined` until it's assigned.
#### Using `const` 
The `const` keyword is used to declare variables whose reference cannot be changed. This is the preferred way to declare most variables, as it prevents accidental reassignment. Like `let`, it is also block-scoped.
```ts
const message = "Hello, TypeScript!";
// message = "Goodbye!"; // Error! Cannot reassign a 'const'.
```
 `const` makes the variable binding immutable, not the value itself. If a `const` variable holds an object or an array, we can still change the _contents_ of that object or array.
```ts
const user = {
  name: "Bob",
  age: 42
};

user.age = 43; // This is allowed!
// user = { name: "Jane", age: 25 }; // Error! This is reassignment.
```
#### Type Inference
In both of the examples above, we omitted the type. TypeScript is excellent at type inference** it automatically figures out the variable's type from the value we provide.
```ts
// TypeScript infers 'count' is a 'number'
let count = 10;

// TypeScript infers 'message' is a 'string'
const message = "Hello, TypeScript!";
```
This is the most common and concise way to write TypeScript. We generally only add an explicit type (like `let count: number`) when the type isn't obvious or when we're declaring a variable without initializing it.
#### Declaring Multiple Variables
We can also  declare multiple variables in one line,but  it's generally considered more readable to declare each on its own line.
```ts
// This is allowed, but not common
let x: number = 1, y: number = 2, z: number = 3;

// This is the preferred style
let x = 1;
let y = 2;
let z = 3;
```
A more modern and useful "multiple variable" pattern in TypeScript is array and object destructuring:
```ts
// Destructuring an array
let [host, port] = ["localhost", 8080];
console.log(host); // "localhost"
console.log(port); // 8080

// Destructuring an object
const { name, age } = user; // From the 'user' object earlier
console.log(name); // "Bob"
```
#### Literal Types
TypeScript gives us more power by allowing us to use specific, **literal values** as types. This means we aren't limited to general types like `string`; we can define a type that must be one exact string.  
This feature is extremely useful when combined with a **union** (`|`), which lets us create a precise list of allowed values for a variable. if we try to assign any value that is not in that specified list, TypeScript will immediately show us a compile-time error. This is a powerful way to prevent bugs before our code even runs.
```ts
// 'status' can ONLY be one of these three strings.
let status: "pending" | "processing" | "complete";

status = "pending"; // OK
// status = "error"; // Error! '"error"' is not assignable...
```
#### Type Aliases
We can create a custom name for any type using the `type` keyword. This new name is called a Type Alias.If we have a complex type that we use in many places, we can define it once with an alias and reuse that name everywhere.   
We can also create a simple, readable name for a **union** of other types.
```ts
// Create a new type alias for a common union
type StringOrNumber = string | number;

// Now we can use 'StringOrNumber' as a type
let userId: StringOrNumber;
userId = 123;   // OK
userId = "abc"; // OK

let anotherId: StringOrNumber;
anotherId = "xyz-123"; // OK
```
Also when working with objects we can define the exact "shape" or structure of an object, then reuse that type as a blueprint.
```ts
// Define the shape of a Point object
type Point = {
  x: number;
  y: number;
};

// Use the 'Point' type alias to check our object's shape
```
### Type Conversion & Assertions
ometimes, we don't have full control over a value we receive from an **external resource**, like an API response or user input from the DOM. TypeScript's compiler can't always know the exact type of this data (it might be `any` or `unknown`).  
When this happens, we need to make the value fit a "target type" to match our script. TypeScript helps us handle this in two main ways: **explicit conversion** (actually changing the value) and **type assertion** (telling the compiler what we know).
#### Explicit Conversion 
This is not a TypeScript-specific feature but a standard JavaScript one. It involves creating a new value of a different type using built-in functions. This is the safest way to convert types because it actually changes the value at runtime.
```ts
let myString = "123";

let myNum: number = Number(myString);

console.log(myNum + 2); // Outputs 125

// Other common examples
let myBool = Boolean("hello"); // true
let numAsString = String(500); // "500"
```
With the `Number()` function, we can **convert** a string like `"123"` into a true `number` value (123).  
Similarly, the `String()` and `Boolean()` functions let us explicitly **convert** any value into a `string` or a `boolean` ( `true` / `false` ), respectively.
#### Type Assertions
A **type assertion** is a way to tell the TypeScript compiler, "Trust me, I know what I'm doing. This value is of this specific type."  
It's important to understand: this does not perform any runtime conversion or checking. It is only a hint for the compiler to ignore a type mismatch. If we are wrong about the type, our program will likely fail at runtime.  
There are two syntaxes for this.
#### The `as` Keyword
This is the most common and preferred way to do a type assertion. It's especially useful in TSX (React) files, as the other syntax can conflict with JSX.
```ts
let someValue: unknown = "this is a string";

// We tell TypeScript to treat 'someValue' as a 'string'
let strLength: number = (someValue as string).length;

// A more practical example:
// TypeScript only knows this is 'HTMLElement | null'
const myCanvas = document.getElementById("main_canvas");

// We know it's an 'HTMLCanvasElement', so we assert it
const canvas = myCanvas as HTMLCanvasElement;

// Now we can use canvas-specific properties
// (This would fail on 'myCanvas' without the assertion)
canvas.getContext("2d");
```
We write the variable name*, followed by the `as` keyword, and then the type we want to assert it should be treated as.
#### The Angle-Bracket `<>` Syntax
This is the original syntax for type assertions. It works exactly the same as the `as` keyword but is less common in modern code.
```ts
let someValue: unknown = "this is a string";

// This is the same as '(someValue as string).length'
let strLength: number = (<string>someValue).length;

// The same canvas example
const canvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```
### Comments:
Comments are lines of code that the compiler will ignore. They are used to add explanatory notes and improve the readability of our code. There are two ways to create comments:  
**Single-line comments:** Begin with `//` and continue until the end of the current line. All text following `//` on the same line is ignored by the compiler.
```ts
// this single line comment
```
**Multi-line comments:** Begin with `/*` and end with `*/`. Any text between these two symbols, including multiple lines, will be ignored by the compiler.
```ts
/*
	This
	multi-line
	comment
*/
```
## User Input and Output
Our programs aren't complete without interacting with users. So far, we've seen how to create variables, but all our data has been "hard-coded" (written directly into the program). TypeScript, when running in a backend environment like Node.js, offers ways to get information from the user and display information back to the user's terminal.
### Displaying Output to the User
The most common way to display output is by using the `console.log()` method.
- **`console.log()`**: This is the most-used function. It prints its arguments to the terminal, followed by a **new line**.
- **Multiple Arguments**: You can pass multiple arguments to `console.log()`, and it will print them all on the same line, separated by spaces.

A more powerful and modern way to format output is using Template Literals (or "template strings"). These let us embed values directly inside a string.
- They use backticks (`` ` ``) instead of single or double quotes.
- You embed variables by wrapping them in `${...}`.
```ts
const name = "Alice";
const age = 30;
const price = 19.99;

// Using simple console.log()
console.log("Hello and welcome!");

// Using console.log() with multiple arguments
console.log("User:", name, "Age:", age); 
// Output: User: Alice Age: 30

// Using Template Literals to embed values (most common)
console.log(`User: ${name}`);
console.log(`Age: ${age}, Price: ${price}`);

// You can even check the type of a variable using 'typeof'
console.log(`The type of 'name' is ${typeof name}`);
console.log(`The type of 'price' is ${typeof price}`);
```
#### Escape Characters
Sometimes we need to print special characters that aren't easy to type. We can do this with **escape characters**, which are codes that start with a backslash (`\`).
- `\n`: Inserts a **new line**.
- `\t`: Inserts a **tab**.
- `\'`: Inserts a **single quote** (useful if your string is in single quotes).
- `\"`: Inserts a **double quote** (useful if your string is in double quotes).
- `\\`: Inserts a literal **backslash**.

```ts
// Using \n for a new line
console.log("This is line 1.\nThis is line 2.");

// Using \t for a tab
console.log("Column 1\tColumn 2");

// Using \" to include quotes
console.log(`He said: "Hello, TypeScript!"`);
```
### Getting Input from the User (
When running TypeScript in Node.js, there is no simple, built-in function that just pauses the program and waits for input.  
Instead, we must use a built-in module like **`readline`** to read from the standard input (`process.stdin`). This is an **asynchronous, event-based** process.
Here is a standard way to ask a single question and get the user's full line of input.
```ts
// We must import the 'readline' module
import * as readline from 'readline';


const rl = readline.createInterface({
  input: process.stdin,  // Read from the keyboard
  output: process.stdout // Write to the terminal
});

// 2. Ask the user a question
rl.question("Please enter your name: ", (name) => {

  console.log(`Hello, ${name}! Welcome to the program.`);

  rl.close();
});
```
Here we used the built-in Node.js `readline` module to ask the user a question in the terminal. It first creates an **interface** (`rl`) configured to read from the keyboard (`process.stdin`) and write back to the terminal (`process.stdout`).   
The `rl.question()` method prints the prompt "Please enter your name: " and then **asynchronously** waits for the user to type a response and press Enter. Once they do, the callback function (the arrow function `(name) => {...}`) is executed, using the user's input (now stored in the `name` variable) to print a greeting.   
Finally, `rl.close()` is called inside the callback to stop the program from waiting for more input, allowing it to exit.
## Tasks

### Task 1: Circle Surface Area
Write a program that reads the radius of a circle from the user and then displays its surface area (Area = $\pi \times r^2$).  

Save this as `Task1.ts` 
### Task 2: Temperature Converter
Develop a temperature converter that converts from Celsius to Fahrenheit (F = $C \times \frac{9}{5} + 32$).  

Save this as `Task2.ts`.
