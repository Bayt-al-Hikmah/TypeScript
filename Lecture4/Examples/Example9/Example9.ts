// Object Oriented Programming

// Working with getter and setter

class User {
  // A private backing field
  private _name: string = '';

  // The 'setter' validates the input
  set name(value: string) {
	if (value.length < 3) {
	  console.log('Name is too short.');
	} else {
	  this._name = value;
	}
  }

  // The 'getter' can format the output
  get name(): string {
	return this._name.toUpperCase();
  }
}

const user = new User();
user.name = 'Al';    // Output: Name is too short.
user.name = 'Alice'; // Calls the setter
console.log(user.name); // Calls the getter. Output: ALICE