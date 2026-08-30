// Working with Functions

// Passing function as argument

function greet(name:string):string {
  return `Hello, ${name}!`;
}

// we need to specify the function argument and return type
function processUserInput(callback:(name:string ) => string):void {
  const name = "Alice";
  console.log(callback(name)); // calling the passed function
}

processUserInput(greet);

// Returning function 

// we need to specify the function argument and return type
function multiplier(factor:number):(a: number) => number {
  return function(x:number):number {
    return x * factor;
  };
}

// we need to specify the function argument and return type
const double:(a: number) => number  = multiplier(2);
const triple:(a: number) => number = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15


// Recursive function

function factorial(n:number):number{
	if (n === 0){
		return 1;
	}else{
	return n * factorial(n - 1);
	}
}

let n:number = 5;
let r:number = factorial(5); // r = 120
console.log(r)