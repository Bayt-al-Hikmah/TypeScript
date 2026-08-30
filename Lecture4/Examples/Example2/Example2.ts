// Object Oriented Programming 

// Working with interface and types

// Extending interface

interface Animal {
  name: string;
}

// extend animal and add property
interface Dog extends Animal {
  breed: string;
}

// have both name and breed
const myDog: Dog = { name: "Buddy", breed: "Golden Retriever" };


type Identity = {
  id: number;
};

type Contact = {
  email: string;
};

// merging Identity and Contact into new type: Employee 
type Employee = Identity & Contact;

const emp: Employee = { id: 101, email: "emp@example.com" };