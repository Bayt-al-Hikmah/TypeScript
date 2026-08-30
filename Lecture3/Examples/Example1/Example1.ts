// Working with Functions

// Creating function

// Function Declaration
function say_hello():void {
    console.log("Hello, user!");
}

say_hello(); // Call the function

// Function Expression
let welcome = function ():void {
    console.log("Hello, user!");
}

welcome(); // Call the function


// function with parameters and return value
function addTwoNumbers(num1:number, num2:number):number {
    let result = num1 + num2;
    return result;
}

let result = addTwoNumbers(2, 3);


// Optional Parameters
function greet(firstName: string, lastName?: string): void {
	if (lastName) {
		console.log(`Hello, ${firstName} ${lastName}`);
	} else {
		console.log(`Hello, ${firstName}`);
	}
}

greet("Ahmed"); // Output: Hello, Ahmed
greet("Ahmed", "Ali"); // Output: Hello, Ahmed Ali

// Default Parameters 
function greet2(name:string = "user"):void {
    console.log(`Hello, ${name}!`);
}

greet2();          // result: Hello, user!
greet2("Mohamed"); // result: Hello, Mohamed!

// Function with arbitrary number of arguments


function greet_names2(greeting:string, ...names:string[]) {
  for (const name of names) {
		console.log(greeting, name);
	}
}
greet_names2('Hello', 'Alice', 'Bob'); // "Hello, Alice and Bob!"


// Variable Scope

let global_message:string = "This is global.";

function my_function(num1:number, num2:number):number {
    // access the global variable
    console.log(global_message);

    // result is a local variable
    let result:number = num1 + num2;
    return result;
}

let sum:number = my_function(2, 3);
console.log(sum);
console.log(result); // Error: Undefined variable result