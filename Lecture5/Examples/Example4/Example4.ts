// Working with types

// Union Types

// the id can be string or number
function printId(id: string | number) {
  console.log(`ID: ${id}`);
}

printId(101);       // OK
printId("abc-101"); // OK
// printId(true);   // Error

// Intersection Types

interface Person {
  name: string;
}
interface Employee {
  jobTitle: string;
}

// We merging Person and Employee into the TeamMember type
type TeamMember = Person & Employee;

const member: TeamMember = {
  name: "Alice",
  jobTitle: "Developer"
};

// Type Narrowing

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
printFormattedId(40);

// Costume guard

interface Dog { name: string; breed: string; }
interface Cat { name: string; whiskers: boolean; }

// This is a custom type guard
function isDog(pet: Dog | Cat): pet is Dog {
  // We check for a property unique to Dog.
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