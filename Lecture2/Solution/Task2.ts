type User = {
  username: string;
  hobbies: string[];
};

let user: User = {
  username: "skywalker",
  hobbies: ["coding", "gaming", "reading"]
};

console.log("Original user:", user);

user.hobbies.push("traveling");
console.log("After adding hobby:", user);

const upperHobbies: string[]=[]
let hobby:string

for (hobby of user.hobbies){
    upperHobbies.push(hobby.toUpperCase())
}
/* method 2
const upperHobbies: string[] = user.hobbies.map(hobby=>hobby.toUpperCase())
*/
console.log("Uppercase hobbies:", upperHobbies);

const summary: string = `${user.username.toUpperCase()} enjoys ${upperHobbies.join(", ")}.`;
console.log("Summary:", summary);
console.log("\n");