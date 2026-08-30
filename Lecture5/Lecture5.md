## Objectives
- Working wtih Generics
- Learning more about Advanced TypeScript Concepts
- Asynchronous TypeScript
## Generics

### What are Generics and Why Do They Exist?
Lets imagine we building functionthat returns the first element of an array. if we use this function for both string and number we may end up repeating the same function just with other name, argument and return type different.
```ts
function getFirstString(arr: string[]): string {
  return arr[0];
}

function getFirstNumber(arr: number[]): number {
  return arr[0];
}
```
The logic is identical, only the types are different, we might be tempted to use `any` to solve this:
```ts
// Bad solution: Loses all type safety
function getFirst(arr: any[]): any {
  return arr[0];
}

const val = getFirst([1, 2, 3]); // 'val' is of type 'any'
val.toUpperCase(); // No error at compile time, but will crash at runtime!
```
Here we just skiping the Type with any but this might result some errors pass the compilation and crash in runtime.  
This is where **generics** come in. A generic is a **placeholder for a type**. It allows us to write a function, class, or interface that can work over a variety of types while preserving type safety. We "pass in" the type when we use it.
### Generic Functions
Let's rewrite our `getFirst` function using a generic. We use angle brackets `<T>` to declare a "type variable" `T`. This `T` can be any name, but `T` (for Type) is a common convention.
```ts
// 'T' is a placeholder for whatever type we pass in
function getFirstElement<T>(arr: T[]): T | undefined{
  return arr[0];
}

// How TypeScript uses it:
const firstNum = getFirstElement([1, 2, 3]);
// TypeScript infers that T is 'number'. 'firstNum' is typed as 'number'.

const firstStr = getFirstElement(["a", "b", "c"]);
// TypeScript infers that T is 'string'. 'firstStr' is typed as 'string'.

// firstNum.toUpperCase(); // Compile-Time Error! Property 'toUpperCase' does not exist on type 'number'.
```
By using `<T>`, we've created a function that is both flexible (it works with any type) and **safe** (it remembers the type and protects us from errors).
### Generic Classes
This concept extends to classes. Imagine a `DataStorage` class that can hold a collection of items. We want it to be able to store only strings, or only numbers, but not a mix.
```ts
class DataStorage<T> {
  private data: T[] = [];

  // The 'T' placeholder ensures we can only add items of the correct type
  addItem(item: T): void {
    this.data.push(item);
  }

  getItems(): T[] {
    return this.data;
  }
}

// We specify the type when we create an instance
const stringStore = new DataStorage<string>();
stringStore.addItem("Hello");
stringStore.addItem("World");
// stringStore.addItem(123); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.

const numberStore = new DataStorage<number>();
numberStore.addItem(10);
```
`DataStorage<T>` is a generic class, where `T` acts as a placeholder for the type of data the storage will contain. When creating an instance, we specify the actual type, such as `DataStorage<string>` or `DataStorage<number>`. TypeScript then ensures that only values of that type can be added to the storage. This allows the same class to be reused for different types while maintaining type safety.
### Type Constraints
What happens when our generic function needs to work with a property of the type? For example, let's say we want to log the length of an argument.
```ts
function logLength<T>(arg: T) {
  // console.log(arg.length); // Error: Property 'length' does not exist on type 'T'.
}
```
This fails because TypeScript doesn't know that `T` will have a `length` property. It could be a `number`, which doesn't.  
To solve this, we **constrain** the generic type. We use the `extends` keyword to tell TypeScript that `T` must be a type that has a certain shape.
```ts
// This is our constraint: T must be an object with a 'length' property of type 'number'
interface WithLength {
  length: number;
}

function logLength<T extends WithLength>(arg: T): void {
  // Now TypeScript is happy, because it knows 'arg' will have '.length'
  console.log(arg.length);
}

logLength("hello"); // Works (string has length)
logLength([1, 2, 3]); // Works (array has length)
logLength({ length: 10, value: 'test' }); // Works (object has length)
// logLength(123); // Error: Argument of type 'number' is not assignable to parameter of type 'WithLength'.
```
`T extends WithLength` places a constraint on the generic type `T`: the value passed to `logLength()` must have a `length` property whose type is `number`. This allows the function to safely access `arg.length` while still accepting different types, such as strings, arrays, and objects. A number is rejected because it does not have a length property.
## Advanced TypeScript
Basic types are great, but real-world data is complex. It can be a mix of types, optional, or need to be transformed. Advanced types give us the tools to model this complexity safely.
### Union & Intersection Types
#### Union Types (`|`)
A variable can be one of several types. For example, a function might accept a `string` OR a `number` as an ID. TypeScript address this with the `|` (pipe) operator. It means "this OR that."
```ts
function printId(id: string | number) {
  console.log(`ID: ${id}`);
}

printId(101);       // OK
printId("abc-101"); // OK
// printId(true);   // Error
```
#### Intersection Types (`&`)
Sometimes  we need to combine two or more types into a single type that has all the properties of the originals. We do that by using the & (ampersand) operator. It means "this AND that."
```ts
interface Person {
  name: string;
}
interface Employee {
  jobTitle: string;
}

type TeamMember = Person & Employee;

const member: TeamMember = {
  name: "Alice",
  jobTitle: "Developer"
};
```
### Narrowing
When we using union type, like `string | number`, we may fall into error where we use a method that only exists on one type and not the other (e.g., .toUpperCase()).
```ts
function printId(id: string | number) {
  // console.log(id.toUpperCase()); // Error: Property 'toUpperCase' does not exist on type 'number'.
}
```
We must **narrow** the type. We have to run a check to prove to TypeScript which type we are currently working with inside a block of code.  
TypeScript is smart enough to understand these checks:
```ts
function printFormattedId(id: string | number) {
  // 1. typeof guard
  if (typeof id === 'string') {
    // Inside this block, TypeScript *knows* id is a 'string'
    console.log(id.toUpperCase());
  } else {
    // Inside this block, TypeScript *knows* id is a 'number'
    console.log(id.toFixed(2));
  }
}
```
There is other Type Guards, that we can use in Typescript.
**`instanceof` Guard:** Works just like in JavaScript, but for classes. It's perfect for narrowing custom error types.
```ts
class MyError extends Error { ... }
    
    try {
      // ...
    } catch (error) {
      if (error instanceof MyError) {
        // TypeScript knows 'error' is of type 'MyError' here
      }
    }
```
#### Custom Guard
`typeof` and `instanceof` don't work for interfaces (which are erased at runtime). How do we check if an object `pet` of type `Dog | Cat` is a `Dog`? We can do this with special function that returns  `parameterName is Type`.

```ts
interface Dog { name: string; breed: string; }
interface Cat { name: string; whiskers: boolean; }

// This is a custom type guard
function isDog(pet: Dog | Cat): pet is Dog {
  // We check for a property unique to Dog.
  // The '(pet as Dog)' is a type assertion.
  return (pet as Dog).breed !== undefined;
}

function playWithPet(pet: Dog | Cat) {
  if (isDog(pet)) {
	// TypeScript knows 'pet' is 'Dog' here
	console.log(`Playing with ${pet.name}, a ${pet.breed}`);
  } else {
	// TypeScript knows 'pet' is 'Cat' here
	console.log(`Petting ${pet.name}`);
  }
}
```
We created a **custom type guard** to help TypeScript safely work with union types like `Dog | Cat`.

In `playWithPet`, TypeScript doesn’t know if `pet` is a `Dog` or a `Cat`, so we can’t directly access `pet.breed`. The `isDog` function checks at runtime if `pet` has the `breed` property, which only `Dog` has.

The key part is its return type: **`pet is Dog`**. This tells TypeScript that inside the `if` block where `isDog(pet)` is `true`, `pet` is a `Dog`. In the `else` block, TypeScript then knows `pet` must be a `Cat`. This allows safe access to properties specific to each type.

### Utility Types
Suppose we already have an existing type, such as `User`, but we need different variations of it. For example, we might need a type where all properties are optional for updating a user, or a type that contains only the user's name and email for a preview. Creating separate types manually for each case would be repetitive and difficult to maintain.

TypeScript provides Utility Types to solve this problem. Utility types are built-in generic types that allow us to transform existing types into new types without having to redefine their properties manually.
#### `Partial<T>`
`Partial<T>` creates a new type where all properties of `T` become optional.
```ts
interface User { id: number; name: string; email: string; }
// type UserUpdate = { id?: number; name?: string; email?: string; }
type UserUpdate = Partial<User>;
```
This is useful when only some properties need to be provided, such as when updating a user.
#### `Pick<T, K>`
`Pick<T, K>` creates a new type by selecting specific properties from T.
```ts
// type UserPreview = { name: string; email: string; }
type UserPreview = Pick<User, 'name' | 'email'>;
```
#### `Readonly<T>` 
`Readonly<T>` creates a new type where all properties are read-only, meaning they cannot be changed after the object is created.
```ts
const user: Readonly<User> = { id: 1, name: "Alice", email: "a@b.com" };
// user.name = "Bob"; // Error: Cannot assign to 'name' because it is a read-only property.
```
#### `Record<K, T>`
`Record<K, T>` creates an object type where the keys are of type K and the values are of type T. It is especially useful for dictionaries, lookup tables, and maps.
```ts
// Describes an object like { "prod1": 10, "prod2": 25 }
type PriceList = Record<string, number>;
const prices: PriceList = { prod1: 10, prod2: 25, prod3: 15 };
Here, every key must be a string, and every value must be a number.
```
## Asynchronous TypeScript

### Introduction
By default, JavaScript code is synchronous (or "blocking"). This means it executes one line at a time, in order. If a task takes a long time (e.g., fetching 10MB of data from a server), the entire program stops and waits for that task to finish before moving to the next line.    
Asynchronous (or "non-blocking") code allows us to start a long-running task (like a network request) and continue running other code while we wait for the task to complete.
We can think of it like a coffee shop:
- **Synchronous:** One barista takes our order, makes our entire drink, hands it to us, and only then takes the next person's order. The line is **blocked**.
- **Asynchronous:** One barista takes our order, starts the espresso machine (a background task), and immediately takes the next person's order. When our drink is ready, they call our name (a "callback" or "promise resolution").

**Why is this critical?** JavaScript run on a single thread. This thread is responsible for everything: running our code, handling events, and re-painting the screen.   
If we start a synchronous network request, we **block this main thread**. For the 5 seconds it takes to get data, our website or application will completely freezes. The user can't click buttons, scroll, or type. This is a terrible user experience.  
Asynchronism solves this. By making network requests asynchronous, the main thread starts the request and is then free to keep the UI responsive.
### The Evolution: Callbacks, Promises, and `async`/`await`
Modern applications are rarely synchronous. We constantly need to fetch data, read files, or wait for timers.
#### Callbacks 
In old JavaScript, this was handled with **callbacks**: functions we pass as an argument to another function, to be "called back" when the task is complete.
This works for a single task, but if we need to perform multiple async tasks in order (e.g., get a user, _then_ get their posts, _then_ get their comments), we get deeply nested, unreadable code. This is nicknamed **"Callback Hell."**

```ts
interface User { id: number; name: string; }
interface Post { id: number; title: string; userId: number; }

function getUser(id: number, callback: (user: User) => void) {
  console.log("Fetching user...");
  setTimeout(() => {
    const user = { id: id, name: "Alice" };
    callback(user);
  }, 1000);
}

function getPosts(userId: number, callback: (posts: Post[]) => void) {
  console.log("Fetching posts...");
  setTimeout(() => {
    const posts = [{ id: 1, title: "My First Post", userId: userId }];
    callback(posts);
  }, 1000);
}

// --- The "Hell" ---
// We want to get user 1, then get their posts.
getUser(1, (user) => {
  console.log(`Got user: ${user.name}`);
  getPosts(user.id, (posts) => {
    console.log(`Got ${posts.length} posts.`);
  });
});
```
This example demonstrates traditional **callback-based asynchronous code**, which can lead to "callback hell." First, `getUser` simulates fetching a user from a server and runs its callback when done. Inside that callback, we call `getPosts` to fetch the user's posts  and that function also uses a callback. Each async action depends on the previous one, so callbacks get nested deeper and deeper, making code harder to read, maintain, and scale. 
#### Promises
A **`Promise`** is an object that represents the eventual completion (or failure) of an asynchronous operation. It can be in one of three states: `pending`, `fulfilled` (succeeded), or `rejected` (failed).  
Promises solve Callback Hell by allowing us to **chain** operations using `.then()` for success and `.catch()` for errors.
```ts
interface User { id: number; name: string; }
interface Post { id: number; title: string; userId: number; }

function getUserPromise(id: number): Promise<User> {
  console.log("Fetching user...");
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = { id: id, name: "Alice" };
      resolve(user);
    }, 1000);
  });
}

function getPostsPromise(userId: number): Promise<Post[]> {
  console.log("Fetching posts...");
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts = [{ id: 1, title: "My First Post", userId: userId }];
      resolve(posts);
    }, 1000);
  });
}

// --- The "Chain" ---
// This is much cleaner and flatter!
getUserPromise(1)
  .then((user) => {
    console.log(`Got user: ${user.name}`);
    return getPostsPromise(user.id);
  })
  .then((posts) => {
    console.log(`Got ${posts.length} posts.`);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
```
Here we made the same async logic as before, but rewritten using Promises instead of nested callbacks. Each function returns a `Promise` that eventually resolves with data. Instead of nesting callbacks inside each other, we use `.then()` to chain steps in order first get the user, then get their posts. The `.catch()` at the end also provides a single place to handle errors, which makes it more reliable and maintainable than multiple nested try/catch blocks or callback error checks.
#### Using `async`/`await`
Working directly with `.then()` and `.catch()` can make asynchronous code difficult to read when several operations depend on each other. TypeScript provides the `async` / `await` syntax to make Promise-based code easier to read and write.

`async` and `await` do not replace `Promises`. They are a different syntax for working with Promises. An `async` function always returns a `Promise`, while `await` allows us to wait for a Promise's result before continuing with the next statement.

- `async`: Marks a function as asynchronous. The function always returns a `Promise`, even if we return a normal value.
- `await`: Waits for a `Promise` to settle. If the `Promise` fulfills, `await` gives us its resolved value. If it rejects, await throws the error.

One important point is that `await` does not block the entire program. It only pauses the execution of the current `async` function while the `Promise` is being settled. Other code can continue running.
```ts
// --- Same Example with async/await ---
// We re-use the *exact same* promise-based functions:
// getUserPromise() and getPostsPromise()
interface User { id: number; name: string; }
interface Post { id: number; title: string; userId: number; }

function getUserPromise(id: number): Promise<User> {
  console.log("Fetching user...");
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = { id: id, name: "Alice" };
      resolve(user);
    }, 1000);
  });
}

function getPostsPromise(userId: number): Promise<Post[]> {
  console.log("Fetching posts...");
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts = [{ id: 1, title: "My First Post", userId: userId }];
      resolve(posts);
    }, 1000);
  });
}

// function to get data
async function fetchUserData() {
  try {
    const user: User = await getUserPromise(1);
    console.log(`Got user: ${user.name}`);

    const posts: Post[] = await getPostsPromise(user.id);
    console.log(`Got ${posts.length} posts.`);

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

fetchUserData();
```
In this example we take the Promise-based version and make it even easier to read using **async/await**. Instead of chaining `.then()` calls, we write the code in a natural top-to-bottom way that looks synchronous, even though it's still asynchronous behind the scenes. The `await` keyword pauses execution until each Promise resolves, so we can store the result directly in variables like `user` and `posts`. The `try/catch` block gives us clean, centralized error handling.
### Async/Await and Typing
TypeScript has first-class support for `async`/`await`. The rules are simple:
1. An `async` function **always** returns a `Promise`.
2. The type we declare as the function's return value is automatically wrapped in a `Promise`.

If we write `async function getNum(): Promise<number>`, TypeScript understands that this function returns a promise that will, upon success, resolve with a value of type `number`.
```ts
interface User {
  id: number;
  name: string;
  email: string;
}
async function getUser(id: number): Promise<User> {
  const response = await fetch(`https://api.example.com/users/${id}`);
  
  // response.json() returns Promise<any>, so we type the result
  const data = await response.json();
  
  return data as User; 
}

// --- How we use it ---

async function main() {
  
  const user: User = await getUser(1);
  console.log(user.name);
}
```
### Error Handling in Asynchronous Code
When working with Promises and `.then()`, you normally attach a `.catch()` at the end to handle errors. This works, but as chains grow, error handling can become scattered or harder to follow.  
With **`async/await`**, rejected promises throw errors that can be caught using a single `try...catch` block. This means synchronous and asynchronous errors are handled in the same clean, unified way.
```ts
function fetchData(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = false; // change to true to simulate success
      success ? resolve("Data loaded!") : reject("Network error");
    }, 1000);
  });
}

async function loadApp() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

loadApp();
```
Here, `fetchData()` simulates an asynchronous task that may succeed or fail. Instead of chaining `.then()` and `.catch()`, we use `async/await`, which lets us write asynchronous logic in a clean, top-to-bottom style. Inside `loadApp()`, the `await` keyword pauses execution until the promise settles. If it resolves, we get the result and log it. If it rejects, the error is automatically thrown and caught by the `try...catch` block just like normal synchronous code. This makes our async error handling much clearer, cleaner, and easier to maintain.
## Final Project
Using everything we’ve learned during this course, create a TypeScript project that solves a problem you face in your daily life.
Think about tasks you often repeat, information you want to organize, or anything you wish could be automated then build a solution using TypeScript!