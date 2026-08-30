// Working with Utility Types

// Partial<T>

// Makes all properties of the type optional
interface User {
    id: number;
    name: string;
    email: string;
}

// All properties are now optional
type UserUpdate = Partial<User>;

const update: UserUpdate = {
name: "Alice"
};

// We don't need to provide every property
const anotherUpdate: UserUpdate = {
email: "[alice@example.com](mailto:alice@example.com)"
};

// Pick<T, K>

// Creates a new type using only the selected properties
type UserPreview = Pick<User, "name" | "email">;

const preview: UserPreview = {
    name: "Alice",
    email: "[alice@example.com](mailto:alice@example.com)"
};

// 'id' is not part of UserPreview
// const preview: UserPreview = {
//   id: 1,              // Error
//   name: "Alice",
//   email: "[alice@example.com](mailto:alice@example.com)"
// };

// Readonly<T>

// Makes all properties read-only
const user: Readonly<User> = {
    id: 1,
    name: "Alice",
    email: "[alice@example.com](mailto:alice@example.com)"
};

// We can read the properties
console.log(user.name);
// But we cannot modify them
// user.name = "Bob";  // Error: Cannot assign to 'name'

// Record<K, T>

// Creates an object type with specific key and value types
type PriceList = Record<string, number>;

const prices: PriceList = {
    laptop: 1200,
    phone: 800,
    keyboard: 100
};

// Keys must be strings and values must be numbers
// const prices: PriceList = {
//   laptop: "1200"   // Error
// };


// Combining Utility Types

// We can combine utility types to create more specific types
type UserPreviewReadonly = Readonly<Pick<User, "name" | "email">>;

const readonlyPreview: UserPreviewReadonly = {
name: "Alice",
email: "[alice@example.com](mailto:alice@example.com)"
};

// The selected properties cannot be modified
// readonlyPreview.name = "Bob";  // Error
