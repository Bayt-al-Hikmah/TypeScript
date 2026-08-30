// Object Oriented Programming 

// Working with object

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


// Creating object
const person: Person = {
  name: "Alice",
  age: 30,
};

console.log(person.name); // access person name


const user:User = {
  username: "Ali",
  email: "ali@gmail.com",
};

console.log(user.email); // access user age

// Read only and Optional properties

interface Config {
  readonly apiKey: string;
  theme?: string; // This property is optional
}

const config: Config = { apiKey: "xyz123" };  // them is optional we can ommit it
// config.apiKey = "newKey"; // Error: Cannot assign to 'apiKey' because it is a read-only property.