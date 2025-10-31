## Objectives
- Using Comparison and Logical Operators
- Writing Conditional Statements
- Working with Loops

## Comparison and Logical Operators
### Comparison
Comparison operators let us check relationships between values like whether one number is greater than another or if two things are equal. They don't change the values; they simply **compare** them and return a boolean (`true` or `false`).
- `>` (Greater than)
- `<` (Less than)
- `==` (Equal to)
- `!=` (Not equal to)
- `>=` (Greater than or equal to)
- `<=` (Less than or equal to)

```ts
console.log(5 > 4)    // => true
console.log(4 == 4)   // => true
console.log("hi" != "hello") // => true
```
### Logical Operators
Logical operators let us combine multiple boolean expressions to build more complex conditions. They help decide what should happen only when several checks are true, or when at least one condition passes.

#### `||` (OR)
Returns `true` if **at least one** condition is true.

```ts
console.log(true || false)  // => true
console.log(false || false) // => false
```
#### `&&` (AND)
Returns `true` only if **all** conditions are true.
```ts
console.log(true && true)   // => true
console.log(true && false)  // => false
```
#### `!` (NOT)
Reverses the logical state.
```ts
console.log(!true)  // => false
console.log(!false) // => true
```
#### Truth Table

|A|B|A && B|A \| B|!A|
|---|---|---|---|---|
|true|true|true|true|false|
|true|false|false|true|false|
|false|true|false|true|true|
|false|false|false|false|true|
## Conditional Statements
So far, our programs have been running from top to bottom in a straight line. But real-world logic often requires choices. Maybe we only want some code to run if a condition is true, or we want different outcomes depending on user input, values, or system state.  
To handle these situations, **TypeScript provides conditional statements** like `if`, `else if`, and `else`. These allow our program to make decisions instead of always following the same flow.
### Single Condition with `if`
We run a block of code only when a condition is true. If the condition is false, TypeScript simply skips that block and continues.
```ts
let age: number = 18;

if (age >= 18) {
  console.log("You are an adult.");
}
```
We start with the `if` keyword, then write a condition inside parentheses. The block `{}` executes only if the condition evaluates to `true`.
### Alternative Path with `if-else`
We can add an **alternative** block using `else`. If the condition is true, the first block runs; otherwise, the `else` block runs.
```ts
let isRaining: boolean = false;

if (isRaining) {
  console.log("Bring an umbrella.");
} else {
  console.log("No umbrella needed today.");
}
```
The `else` statement doesn't need a condition it's simply the fallback if the `if` condition is false.
### Multiple Conditions with `else if`
When we have several possible outcomes, we can chain conditions using `else if`. TypeScript checks each condition in order and executes the first one that is true.
```ts
let score: number = 85;

if (score >= 90) {
  console.log("Excellent performance");
} else if (score >= 80) {
  console.log("Good job");
} else {
  console.log("Room for improvement");
}
```
### Ternary Operator (Shorthand If-Else)
Sometimes we need a quick decision in a single line for example, choosing a value based on a condition. TypeScript gives us a compact way to do this using the ternary operator.  
It works like this:
```ts
condition ? valueIfTrue : valueIfFalse;
```
Example:
```ts
let age: number = 18;

let message = age >= 18 ? "You are an adult." : "You are a minor.";
console.log(message);
```
If the condition is true, the first value is chosen; otherwise, the second one is used.   
This is useful for simple decisions like assigning values or displaying quick messages. If the logic becomes complex, it’s usually better to use a regular `if-else` block for readability.
### `switch` Statement
When checking the same value against many possible matches, we can use a `switch` statement. This makes code cleaner than writing many `else if` statements.
```ts
let day: string = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the week");
    break;
  case "Friday":
    console.log("Almost the weekend!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("It’s the weekend!");
    break;
  default:
    console.log("Just another weekday");
}
```
We `switch` on a value, then write `case` blocks. If a case matches, its code runs. The `default` case handles everything else.
### Condition-Based `switch`
JavaScript and TypeScript don’t have expressionless switch exactly, we can't use comparison operator directly in our case but we can simulate it using `true` as the switch expression:
```ts
let score: number = 85;

switch (true) {
  case score >= 90:
    console.log("Excellent performance");
    break;
  case score >= 80:
    console.log("Good job");
    break;
  default:
    console.log("Room for improvement");
}
```
This lets each case use a boolean condition the first `true` case runs.
## Loops in TypeScript
Loops are a fundamental concept in programming that allow us to repeat a block of code multiple times. This helps us avoid repetition and makes our programs more efficient, whether we're processing all items in an array or running a calculation until a certain condition is met.
### The `while` Loop
We use a `while` loop when we want to repeat something as long as a condition is true. The condition is checked before each iteration.
```ts
let i: number = 0;

while (i < 3) {
  console.log(`i is ${i}`);
  i++; // Don't forget to increment, or you'll have an infinite loop!
}
// Output:
// i is 0
// i is 1
// i is 2
```
This loop keeps running _while_ `i` is less than 3.
### The `do-while` Loop
A `do-while` loop is similar to a `while` loop, but it always runs at least once. This is because the condition is checked after the code block runs, not before.
```ts
let i: number = 0;

do {
  console.log(`i is ${i}`);
  i++;
} while (i < 2);
// Output:
// i is 0
// i is 1
```

### The  `for` Loop
We use `for` loop when we know exactly how many times we want to repeat something. It consists of three parts separated by semicolons:

1. **Initialization**: Runs once at the beginning (e.g., `let i = 0`).
2. **Condition**: Checked _before_ each loop; if `true`, the loop runs (e.g., `i < 5`).
3. **Increment**: Runs _after_ each loop (e.g., `i++`).
```ts
for (let i: number = 0; i < 5; i++) {
  console.log(`Count: ${i}`);
}
// Output:
// Count: 0
// Count: 1
// Count: 2
// Count: 3
// Count: 4
```
This prints numbers from 0 to 4. `i++` increases the counter each time.
### The `for...of` Loop 
We use a `for...of` loop to go through each **value** in an "iterable" collection, like an **Array** or a **String**. This is the most common and recommended way to loop over array elements.
```ts
const fruits: string[] = ['apple', 'banana', 'cherry'];

for (const fruit of fruits) {
  console.log(fruit);
}
// Output:
// apple
// banana
// cherry
```
This prints each fruit in the array.
### The `for...in` Loop 
Finally we have `for...in` loop, it is used to iterate over the keys (or properties) of an object.
This is different from `for...of`. `for...of` gets values from an array, while `for...in` gets keys from an object.
```ts
const person = {
  name: "Alice",
  age: 30,
  job: "Engineer"
};

for (const key in person) {
  // 'key' will be "name", "age", "job"
  // We use person[key] to get the value
  console.log(`${key}: ${person[key as keyof typeof person]}`);
}
// Output:
// name: Alice
// age: 30
// job: Engineer
```

---

### `break` and `continue`

TypeScript gives us more control over our loops by using `break` and `continue`.
- **`break`**: Immediately stops the loop and exits it completely.
- **`continue`**: Skips the rest of the current iteration and moves to the next one.

**`break` Example:**  
Here we exist our loop when we i reaches 3
```ts
for (let i = 0; i < 5; i++) {
  if (i === 3) {
    break; // Stop the loop when i reaches 3
  }
  console.log(i);
}
// Output:
// 0
// 1
// 2
```
**`continue` Example:**
Here we jumping and skipping when i get the value of 2
```ts
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue; // Skip printing when i is 2
  }
  console.log(i);
}
// Output:
// 0
// 1
// 3
// 4
```
## Tasks
### Task 1: Array Manipulation
You have the following array. Note the explicit `string[]` type.
```ts
let fruits: string[] = ["apple", "banana", "mango"];
```
- Add `"orange"` to the **start** of the array.
- Find the index of `"banana"` (hint: `.indexOf()`) and use that index to replace the element with `"kiwi"`.
- Use `.join(", ")` to turn the array into a single string.
- Print the final string.

### Task 2: Object and Type Manipulation
First, define a `type` or `interface` for a user object:
```ts
// Define a type for our user
type User = {
  username: string;
  hobbies: string[];
};

// Create an object that adheres to the User type
let user: User = {
  username: "skywalker",
  hobbies: ["coding", "gaming", "reading"]
};
```
- Add the new hobby `"traveling"` to the `hobbies` array.
- Create a new array containing all hobbies converted to uppercase use ``map()`` or for loop.
- Create and print a summary string in the format: `"USERNAME enjoys HOBBY1, HOBBY2, HOBBY3..."` (e.g., `"SKYWALKER enjoys CODING, GAMING, READING, TRAVELING."`).
### Task 3: Conditional Logic with Types
Create a script that simulates a decision-making process based on weather conditions.
- Declare variables `isRaining: boolean` and `isWarm: boolean` and assign them initial values (e.g., `true` and `false`).
- Write an `if...else if...else` chain that uses logical operators (`&&`, `||`, `!`) to check the conditions:
    - If it is raining AND not warm, print "Bring an umbrella and wear a jacket."
    - If it is raining BUT warm, print "Bring an umbrella but no jacket needed."
    - If it is not raining BUT warm, print "No umbrella needed, but wear light clothes."
    - For any other case (not raining and not warm), print "No umbrella and no jacket needed."
        
- Test your script by changing the initial boolean values.

### Task 4: The FizzBuzz Loop
Write a script that prints numbers from 1 to 100, but with a twist:
- Use a `for` loop, making sure to type your iterator (e.g., `let i: number = 1`).
- For numbers divisible by 3, print "Fizz".
- For numbers divisible by 5, print "Buzz".
- For numbers divisible by both 3 and 5, print "FizzBuzz".
- For all other numbers, print the number itself.    
- **Hint:** The order of your checks is very important!