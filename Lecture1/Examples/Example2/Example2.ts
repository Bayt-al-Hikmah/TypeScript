// Creating Variables

// Primitive Types
let age:number = 23;                              // number: int
let pi:number = 3.14;                             // number: float
let message:string = "Hello World";               // string with double quotation mark
let name:string = 'Alice';                        // string with single quotation mark
let greeting:string = `Hello, ${name}!`;          // string with ` allow us to inject variables
let is_adult:boolean = false;                     // boolean
let number:undefined;                             // undefined
let user:null = null;                             // null mean no value
let variable:any = 10                             // any type
variable = "text"                                 // can assign text to it    
let variable2:unknown = "text"                    // any type
variable2 = 45                                    // can assign number to it                                 
const username = "Ali";                           // constant

// Declaring multiple variables in single line
let x: number = 1, y: number = 2, z: number = 3;
console.log(y); 
// modern way
let [host, port] = ["localhost", 8080];
console.log(host); // "localhost"
console.log(port); // 8080

// Object Types

// Interface
interface User {
  name: string;
  id: number;
  isActive: boolean;
  email?: string; 
}

// Object use the interface
let myUser: User = {
  name: "Bob",
  id: 123,
  isActive: true
};

// access value 
console.log(myUser.name);      // using dot notation
console.log(myUser["id"]);     // using bracket notation


// Arrays

// array hold only numbers
let scores: number[] = [100, 85, 92];

// array hold only string
let names: Array<string> = ["Alice", "Bob", "Charlie"];
// access value 
console.log(scores[0])  // we use index starting from 0

// Tuples

let userPair: [string, number]; // defining the tuple
userPair = ["b.wayne", 1];      // creating the tuple

console.log(userPair[1]);       // access element        

// Enum

enum Direction {
  North, // 0
  South, // 1
  East,  // 2
  West   // 3
}

let move: Direction = Direction.North;

// Literal Types

let status: "pending" | "processing" | "complete";

status = "pending"; // OK
// status = "error"; // Error! '"error"' is not assignable...

