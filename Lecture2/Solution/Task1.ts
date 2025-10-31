let fruits: string[] = ["apple", "banana", "mango"];
console.log("Original array:", fruits);

fruits.unshift("orange");
console.log("After unshift:", fruits); 

const bananaIndex: number = fruits.indexOf("banana");
if (bananaIndex !== -1) {
  fruits[bananaIndex] = "kiwi";
}
console.log("After replace:", fruits);

const fruitString: string = fruits.join(", ");
console.log("Joined string:", fruitString);
console.log("\n");
