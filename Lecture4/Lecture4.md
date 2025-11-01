## Objectives
- Object Oriented Programming in TypeScript
- Error Handling in TypeScript
## Object Oriented Programming in TypeScript
### Introduction
Object-Oriented Programming (OOP) is a programming paradigm that revolves around the concept of "objects." These objects can contain data in the form of fields (often called properties) and code in the form of procedures (often called methods).  
TypeScript is a typed superset of JavaScript* that is strongly designed for Object-Oriented Programming. It provides classical OOP features like classes, interfaces, and access modifiers, making programs more modular, reusable, and easier to maintain.
#### Core Principles of OOP:
- **Encapsulation:** Combines data and the functions that operate on that data within a single unit or class. This keeps data safe from outside interference and misuse, a concept strongly enforced by TypeScript's access modifiers.
- **Abstraction:** Allows programmers to hide all but the relevant data about an object to reduce complexity and increase efficiency. Interfaces and abstract classes in TypeScript are key tools for abstraction.
- **Inheritance:** Facilitates the creation of new classes based on existing ones. It promotes code reusability by allowing shared behaviors to be defined once and inherited by child classes.
- **Polymorphism:** Enables different classes to be treated through the same interface, often by overriding methods or implementing the same methods in different ways.
### Object Types & Interfaces
Before creating classes, TypeScript allows us to define the “shape” of data meaning what properties an object should have and their types. We do this using **object types** and **interfaces**. Understanding these is essential for writing safe and scalable TypeScript code.
#### Object Typing
In plain JavaScript, objects are flexible sometimes _too_ flexible. That means we can accidentally misspell a property, forget one, or assign the wrong type, and JavaScript won't stop us. This can lead to hard-to-find bugs, especially in large applications.  
TypeScript helps solve this by letting us define the exact shape of an object what properties it must have and what types those properties should be. If we make a mistake, TypeScript catches it before the code runs.  
We can define object shapes using either a **type alias** or an **interface**:
```ts
// Using an interface
interface Person {
  name: string;
  age: number;
}

// Using a type alias
type User = {
  username: string;
  email: string;
};

const person: Person = {
  name: "Alice",
  age: 30,
};
```
Both can describe object shapes, but have key differences:
- **Interfaces** are "open." They can be declared multiple times and will be merged. They are also explicitly designed to be extended by classes.     
- **Type Aliases** are "closed." They cannot be re-opened to add new properties. They are more flexible and can also represent unions, intersections, or tuples.   
#### Readonly & Optional Properties
Once we define the shape of an object, TypeScript also lets us control how those properties behave. This gives us more safety when managing data.  
- `readonly` means the value cannot be changed after the object is created. This is useful for things like IDs, API keys, or configuration values that should never change.
- `?` marks a property as optional. The object may or may not include it, and TypeScript will not complain.
```ts
interface Config {
  readonly apiKey: string;
  theme?: string; // This property is optional
}

const config: Config = { apiKey: "xyz123" };
// config.apiKey = "newKey"; // Error: Cannot assign to 'apiKey' because it is a read-only property.
```
#### Extending Interfaces
As our applications grow, we will often have objects that share some properties but also need their own unique fields. Instead of rewriting the same structure over and over, interfaces let us build on top of each other using the `extends` keyword.  
This creates a clean inheritance chain, just like a “base template” that other types can build from.
```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

const myDog: Dog = { name: "Buddy", breed: "Golden Retriever" };
```
Here, `Dog` automatically includes `name` from `Animal`, plus its own `breed` property. This helps keep our code **organized, reusable, and easy to expand** without duplication.
#### Intersection Types
While interfaces let us extend other interfaces, type aliases have their own way of combining types through intersection types. Using the `&` operator, we can merge multiple types into one, meaning the final type must include **all** properties from each part.  
This is especially useful when different data pieces come from different parts of our program, and we want to build a single, complete type from them.
```ts
type Identity = {
  id: number;
};

type Contact = {
  email: string;
};

type Employee = Identity & Contact;

const emp: Employee = { id: 101, email: "emp@example.com" };
```
Here, `Employee` must have **both** `id` and `email`, since it's a combination of `Identity` and `Contact`. Intersection types give us flexible, powerful ways to construct complex types without repeating ourself.
### Classes & OOP in TypeScript
Classes are the main building block for OOP in TypeScript. A class serves as a blueprint for creating objects, letting us define properties, methods, and a constructor to initialize new instances.
#### Classes, Constructors, and Methods
Each class has a set of **properties** and **methods**:
- **Properties** are variables that store data about the object.
- **Methods** are functions inside a class that define behaviors or actions the object can perform.

To properly create objects from a class, we use a constructor a special method that runs automatically when we create (instantiate) an object. It initializes the object’s properties with default or provided values.
```ts
class Animal {
  // Property with a type
  name: string;

  // Constructor to initialize properties
  constructor(name: string) {
	this.name = name;
  }

  // Method with a return type (void)
  speak(): void {
	console.log(`${this.name} makes a sound`);
  }
}

const dog = new Animal("Buddy");
dog.speak(); // Buddy makes a sound
```
#### Access Modifiers: Public, Private, Protected
In plain JavaScript, all class properties are accessible from outside the class. this can be problematic, because sensitive data or internal logic can be modified directly breaking the object’s integrity.  
TypeScript solves this by providing access modifiers that control visibility of class members and help enforce encapsulation (protecting internal data):
- **`public`** (default): Accessible from anywhere.
- **`private`**: Accessible only inside the class.
- **`protected`**: Accessible inside the class and its subclasses.
    ```ts
    class BankAccount {
      private balance: number = 0;
    
      public deposit(amount: number): void {
        this.balance += amount;
      }
    
      public getBalance(): number {
        return this.balance;
      }
    }
    
    const account = new BankAccount();
    account.deposit(100);
    console.log(account.getBalance()); // 100
    // console.log(account.balance); // Error: Property 'balance' is private...
    ```
#### Inheritance
Earlier, we learned that interfaces can use `extends` to inherit properties and build more complex types.  
Classes work in a very similar way but instead of just inheriting structure, they inherit both:
- Properties (data/attributes)
- Methods (behavior/functions)

This means we can create a base class that contains shared functionality, and then create child classes that extend it, gaining access to those features without rewriting them.    
We use the **`extends`** keyword, just like with interfaces, and if the parent has a constructor, we call it using **`super()`**.
```ts
class Dog extends Animal {
  // We don't need to redeclare 'name' or 'constructor' if it's the same

  // Override the parent's speak method
  speak(): void {
	console.log(`${this.name} barks`);
  }
}

const myDog = new Dog("Rex");
myDog.speak(); // Rex barks
```
#### Abstract Classes
Sometimes we need to create a base class that serves only as a **template** for other classes meaning it should **not** be created on its own, this is useful when we know all subclasses should share a common structure or behavior, but each subclass will implement the details differently.
That's where **abstract classes** come in, they can contain `abstract` methods, which have no implementation and must be implemented by any subclass.
```ts
abstract class Shape {
  // An abstract method has no body
  abstract getArea(): number;

  // A regular method can also exist
  printInfo(): void {
	console.log("This is a shape.");
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
	super();
  }

  // We must implement the abstract getArea method
  getArea(): number {
	return Math.PI * this.radius ** 2;
  }
}

// const s = new Shape(); // Error: Cannot create an instance of an abstract class.
const c = new Circle(5);
console.log(c.getArea());
```
#### Polymorphism 
Polymorphism means **"many forms"**, and in OOP it allows different classes to be treated through a **common base type**, while each class can still have its own behavior. this mean we can call the same method name on different objects, and each object can respond in its own unique way. this is often achieved by method overriding, as seen in the `Dog` class overriding the `speak` method.
```ts
class Shape {
  draw(): void {
	console.log("Drawing a shape");
  }
}

class Circle extends Shape {
  draw(): void {
	console.log("Drawing a circle");
  }
}

class Square extends Shape {
  draw(): void {
	console.log("Drawing a square");
  }
}

// All objects are treated as 'Shape'
const shapes: Shape[] = [new Shape(), new Circle(), new Square()];

// The correct 'draw' method is called for each object
shapes.forEach(shape => shape.draw());
```
Output:
```
Drawing a shape
Drawing a circle
Drawing a square
```
#### Static Members 
Sometimes, we have methods or properties that are logically related to a class but don't belong to any specific instance. For example, a utility function (like adding two numbers) or a universal constant (like the value of $PI$) doesn't depend on data from a particular object.  
It would be wasteful to create an entire object just to access them. This is where **static members** come in.  
Static methods and properties belong to the **class itself**, not to any **instance**. This means you access them directly on the class name, making them perfect for:
```ts
class MathHelper {
  static readonly PI: number = 3.14159;

  static add(a: number, b: number): number {
	return a + b;
  }
}

console.log(MathHelper.PI);       // 3.14159
console.log(MathHelper.add(5, 3)); // 8
```
#### Getters and Setters
When we making a property `public` is too simple. What if we need to run code when a property is **read** or **written**?
- **When writing (setting):** We might want to **validate** the new value. For example, we can't just let someone set a `password` to "123" or an `age` to -50.
- **When reading (getting):** We might want to **compute** or **format** the data before returning it. For example, we might store a `firstName` and `lastName`, but you want to provide a `fullName` property that combines them automatically.

Getters and setters (also called accessors) let us control access to a property. They are special methods that look and act like regular properties, but they run our code "under the hood."
- A **`get`** method runs when we **read** the property's value.
- A **`set`** method runs when we **assign** a new value to the property.

This is most often used with a private backing field (a variable like `_firstName`) that stores the actual data, while the public getter/setter (`name`) acts as the gatekeeper.
```ts
class User {
  // A private backing field
  private _firstName: string = '';

  // The 'setter' validates the input
  set name(value: string) {
	if (value.length < 3) {
	  console.log('Name is too short.');
	} else {
	  this._firstName = value;
	}
  }

  // The 'getter' can format the output
  get name(): string {
	return this._firstName.toUpperCase();
  }
}

const user = new User();
user.name = 'Al';    // Output: Name is too short.
user.name = 'Alice'; // Calls the setter
console.log(user.name); // Calls the getter. Output: ALICE
```
#### Decorators 
The final feature TypeScript gives us when working with classes is an advanced, experimental concept called **Decorators**.
As your application grows, we will often find yourself needing to add similar pieces of **"meta-logic"** to many different classes and methods. This isn't the core business logic, but rather **"cross-cutting concerns"** like:
- "Log when this method is called."
- "Before running this method, check if the user is an admin."
- "Mark this property so it can be saved to a database."

Without a special tool, we will have to repeat this boilerplate code inside every single method. This clutters our real logic, makes it hard to read, and violates the **DRY (Don't Repeat Yourself)** principle.  
This is the exact problem **Decorators** solve. A decorator is a special kind of function, prefixed with an **`@`** symbol, that we can attach to a class, method, property, or parameter. It allows us to "wrap" the target to add this new behavior or metadata cleanly. It lets us separate these concerns from our business logic in a declarative way.  

Here is a simple example of a **method decorator** that logs when a method is called.
```ts
// This is the decorator function
function logMethod(originalMethod: any, context: ClassMethodDecoratorContext) {
    
    const propertyName = String(context.name); 

    function replacementMethod(this: any, ...args: any[]) {
        console.log(`Calling "${propertyName}" with args:`, args);
        
        const result = originalMethod.apply(this, args);
        
        console.log(`Method "${propertyName}" returned:`, result);
        return result;
    }

    return replacementMethod;
}

class Calculator {
    @logMethod
    add(a: number, b: number): number {
        return a + b;
    }
}

const calc = new Calculator();
calc.add(2, 3);
```
The `logMethod` decorator receives two arguments: the `originalMethod` it is decorating (in this case, the `add` function) and a `context` object. This `context` object contains metadata about the method, such as its name, which we get using `String(context.name)`.

This decorator **returns a new function** (`replacementMethod`) that will replace the original method. This `replacementMethod` acts as a wrapper: before calling the original method, it logs the method name and its arguments. It then invokes the `originalMethod` using `.apply(this, args)` (to preserve the correct `this` context), captures the returned value, logs that result, and finally returns it.

When we apply `@logMethod` above the `add` method, TypeScript replaces `add` with this new `replacementMethod`. As a result, whenever `add` is called, the decorator's wrapper function intercepts the call, logs the useful information, and then forwards the call to the original `add` logic. This shows how decorators let us transparently add extra behavior—like logging—without modifying the method itself.

## Error Handling in TypeScript

### Introduction
When writing code, errors are inevitable. In JavaScript, these errors often surface at runtime, causing a program to fail. They can be **syntax errors** (typos), **runtime errors** (invalid input), or **logical errors** (flawed logic).  
TypeScript's primary advantage is its **static type system**, which shifts a significant portion of error detection from runtime to compile-time. By checking types before the code is even run, TypeScript can prevent entire classes of errors, such as `TypeError` and `ReferenceError`, that are common in plain JavaScript.  
However, TypeScript cannot prevent all errors. Runtime errors, especially those related to external factors like user input, network responses, or resource limits, must still be handled gracefully using runtime constructs like `try...catch`.
### Categories of Errors in TypeScript
We can broadly categorize errors into two main groups in a TypeScript project.
#### Compile-Time Errors 
These are errors detected by the TypeScript compiler (or shown in your IDE) before your code is transpiled into JavaScript. Fixing these is a core part of the TypeScript workflow.
- **Syntax Errors:** The most basic errors, like a missing parenthesis or curly brace.
    ```ts
    // Syntax Error: ')' expected.
    let x = (5 + 3;
    ```
- **Type Errors:** The most common and valuable errors TypeScript finds. This happens when a value's type doesn't match what's expected.
    ```ts
    function greet(name: string) {
      console.log("Hello, " + name.toUpperCase());
    }
    
    // Compile-Time Type Error:
    // Argument of type 'number' is not assignable to parameter of type 'string'.
    greet(42); 
    ```
- **Reference Errors:** Attempting to use a variable that hasn't been defined. JavaScript would throw this at runtime, but TypeScript catches it at compile-time.
    ```ts
    // Compile-Time Error: Cannot find name 'myVar'.
    console.log(myVar);
    ```
#### Runtime Errors 
These errors occur after your code has been compiled to JavaScript and is running (e.g., in a browser or on a server). These are the errors you must actively manage with error-handling logic.
- **Errors from External Data:** Parsing invalid JSON, handling a failed API call, or processing incorrect user input.
- **Resource Errors:** Running out of memory or creating an infinite loop.
- **Logic-Driven Errors:** Explicitly throwing an error when business logic is violated (e.g., a user tries to withdraw more money than they have).
### Common Runtime Error Types
When your TypeScript code runs as JavaScript, it can still throw these standard JavaScript errors.

| **Error Type**       | **Description**                                         | **TypeScript's Role**                                                                                                          |
| -------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **`TypeError`**      | An operation is performed on a value of the wrong type. | **Mostly prevented at compile-time.** TypeScript's `strictNullChecks` flag is a powerful tool to prevent `... of null` errors. |
| **`ReferenceError`** | Accessing a variable that is not defined.               | **Mostly prevented at compile-time.** TypeScript will error if you try to use an undeclared variable.                          |
| **`SyntaxError`**    | Invalid code structure.                                 | **Always caught at compile-time.** You cannot transpile code with a syntax error.                                              |
| **`RangeError`**     | A numeric value is outside its allowed range.           | **Partially preventable.** Can be caught by runtime logic (e.g., `if (n < 0)`).                                                |
| **`Custom Errors`**  | Developer-defined exceptions.                           | Fully supported and encouraged using `throw`.                                                                                  |

### Using the Console and Source Maps
When a runtime error occurs, the console is our best tool. It shows the error type, message, and line number.  
A key TypeScript feature is **source maps** (`.map` files). These files tell the browser to map the running JavaScript code back to our original TypeScript (`.ts`) file. This means we can debug our code by looking at the `.ts` file we wrote, not the complex transpiled `.js` file.
### Handling Runtime Errors with `try...catch...finally`
The `try...catch` statement is the standard way to handle code that might throw a runtime error.
- **`try` Block:** Contains the "risky" code that might throw an error (e.g., `JSON.parse`, an API call).
- **`catch` Block:** Executes if and only if the `try` block throws an error.
- **`finally` Block (Optional):** Executes _after_ `try` (and `catch`, if it ran), regardless of whether an error occurred. This is perfect for cleanup, like closing a file or a database connection.

In TypeScript, the error variable in the `catch` block is typed as `unknown` by default (with the `useUnknownInCatchVariables` flag in `tsconfig.json`, which is `true` by default in `strict` mode). This is safer than `any` because it forces you to check the error's type before using it.
**Example:**
```ts
function parseRiskyJSON(data: string) {
  try {
    // This line might fail at runtime if 'data' is not valid JSON
    const result = JSON.parse(data);
    console.log("Parse successful:", result);
    
  } catch (error) {
    // 'error' is of type 'unknown'
    console.error("Failed to parse JSON!");

    // We must check the type before accessing properties
    if (error instanceof Error) {
      // Now TypeScript knows 'error' has a 'message' property
      console.log(error.message);
    } else {
      console.log("An unknown error occurred:", error);
    }
    
  } finally {
    // This runs no matter what
    console.log("JSON parsing attempt finished.");
  }
}

// This will work
parseRiskyJSON('{"name": "Alice"}');

// This will fail and be caught
parseRiskyJSON('{invalid json}'); 
```
### Raising Custom Errors
In real applications, things don’t always go as planned users enter invalid data, resources may not exist, and operations can fail. If we don't handle these cases, our program could behave unpredictably or produce wrong results.    
To deal with such situations, TypeScript (and JavaScript) allows us to **throw custom errors**. This stops the function immediately and forces us to handle the failure gracefully.
#### Basic Throw
We can use the `throw` keyword to stop execution and signal that something went wrong. Typically, we throw an `Error` object so we get a useful message and stack trace. TypeScript also analyzes your code and knows that the function may throw an error.
```ts
// TypeScript infers the return type is 'number'
function divide(a: number, b: number): number {
  if (b === 0) {
    // Throwing an error stops the function
    throw new Error("Cannot divide by zero.");
  }
  return a / b;
}

try {
  console.log(divide(10, 0));
} catch (e) {
  if (e instanceof Error) {
    console.log(e.message); // Logs: "Cannot divide by zero."
  }
}
```
#### Advanced: Custom Error Classes
Sometimes, a generic `Error` isn’t enough. In larger applications, different failures may need different handling for example, validation errors vs network errors. If all errors look the same, it becomes difficult to know what went wrong and how to respond.  
To solve this, TypeScript lets us create our own **custom error types** by extending the built-in `Error` class. This gives us more control and allows us to catch specific error types.
```ts
// Define a custom error type
class ValidationError extends Error {
  constructor(message: string) {
    super(message); // Pass the message to the base 'Error' class
    this.name = "ValidationError"; // Set the error name
    Object.setPrototypeOf(this, InsufficientFundsError.prototype)
  }
}

function registerUser(username: string) {
  if (username.length < 3) {
    // Throw our specific error
    throw new ValidationError("Username must be at least 3 characters long.");
  }
  console.log(`User '${username}' registered.`);
}

try {
  registerUser("Al");
} catch (error) {
  // We can check the *type* of error
  if (error instanceof ValidationError) {
    console.warn("Validation failed:", error.message);
  } else if (error instanceof Error) {
    console.error("A system error occurred:", error.message);
  } else {
    console.error("An unknown error occurred.");
  }
}
```
Here we added the ``Object.setPrototypeOf(this, InsufficientFundsError.prototype)`` to fixe the prototype chain so that the ``InsufficientFundsError`` object truly inherits from the Error class. Without this line, JavaScript may treat the thrown error as a generic Error, making error instanceof ``InsufficientFundsError`` fail in Node.js or older JS targets. In simple terms: it tells JavaScript “this error belongs to the ``InsufficientFundsError`` class”, allowing custom error detection to work correctly.
## Tasks
### Task 1: 
Create a Bank System With Error Handling
**Instructions:**
1. Create a class `BankAccount` with:
    - a private property `balance` (number, starting at 0)
    - a public method `deposit(amount: number)`
    - a public method `withdraw(amount: number)`
2. Create a custom error class `InsufficientFundsError` that extends `Error`.
3. In `withdraw`, if the amount is greater than the balance, throw the custom `InsufficientFundsError`.
4. Write test code that:
    - deposits money
    - tries withdrawing more than available balance
    - catches the error and prints a friendly message
### Task 2 
Create a Decorator to Uppercase a Method's Result   
**Instructions:**
- Create a method decorator called `@toUpperCase`.
- This decorator should wrap the original method.
- Inside the wrapper, it should call the original method and get its result.
- It should then check if the result is a `string`. If it is, it should return the string in **UPPERCASE**.
- If the result is _not_ a string (e.g., a `number`), it should just return it without changes.
- Create a class `Greeter` with a method `sayHello(name: string)` that returns a simple greeting string.
- Apply the `@toUpperCase` decorator to the `sayHello` method.
- Create an instance and call the method, then log the result to confirm it's uppercase.
