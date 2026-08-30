// Working with module

// Working with third party packages

// - Start project with: npm init -y
// - install the package using npm install
// - instll type using :npm install @types/uuid --save-dev

import { v4 as uuidv4 } from "uuid"; // Third-party package import

const newID = uuidv4();
console.log("Generated UUID:", newID);