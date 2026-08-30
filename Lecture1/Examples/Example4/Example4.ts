
// Converting between Types

// Explicit Conversion 

// Convert to Intenger
let var1:string = "45"
let var2:string = "42.5"

let num1:number = Number("45")
let num2:number = parseInt("42.5")
let num3:number = parseFloat("42.5")

console.log(num1);           // result 45   
console.log(num2);           // result 42   
console.log(num3)            // result 42.5 


// Convert to String
let var3 = 100;   
let var4 = 500

let str1:string = var3.toString()  // result "100"
let str2:string = String(var4);    // result "500"

console.log(str1);           // result "100" 
console.log(str2);           // result "500"  

// Type Assertions

let someValue: unknown = "this is a string";
// We tell TypeScript to treat 'someValue' as a 'string'
let strLength: number = (someValue as string).length;


// Create a new type alias for a common union

// Creating Costum type

// Create a new type alias for a common union
type StringOrNumber = string | number;    // new type can be string or number

// using our type
let userId: StringOrNumber;
userId = 123;   // OK
userId = "abc"; // OK