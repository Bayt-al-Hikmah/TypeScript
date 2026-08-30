// Asynchronous  Programming

// Working with async and await

interface User { id: number; name: string; }
interface Post { id: number; title: string; userId: number; }

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
async function fetchUserData() {
  try {
    const user: User = await getUserPromise(1);
    console.log(`Got user: ${user.name}`);

    const posts: Post[] = await getPostsPromise(user.id);
    console.log(`Got ${posts.length} posts.`);

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

fetchUserData();