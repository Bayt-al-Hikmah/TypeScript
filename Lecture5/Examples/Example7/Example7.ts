// Asynchronous  Programming

// Working with Promise

interface User { id: number; name: string; }
interface Post { id: number; title: string; userId: number; }


// return promise
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

// Handeling promises with then and catch
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