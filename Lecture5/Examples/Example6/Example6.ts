// Asynchronous  Programming

// Working with call back

interface User { id: number; name: string; }
interface Post { id: number; title: string; userId: number; }

// function call other function 
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