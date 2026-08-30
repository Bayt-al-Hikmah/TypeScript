// Asynchronous  Programming

// Async/Await and Typing

interface User {
  id: number;
  name: string;
  email: string;
}

// type returned by async function is always Promise<T>
async function getUser(id: number): Promise<User> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  
  // response.json() returns Promise<any>, so we type the result
  const data = await response.json();
  
  return data as User; 
}

// --- How we use it ---

async function main() {
  
  const user: User = await getUser(1);
  console.log(user.name);
}

main();