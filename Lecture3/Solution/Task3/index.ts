import * as Stats from "./stats";

const myNumbers: number[] = [15, 8, 42, 4, 23, 16];

const largestNum = Stats.largest(myNumbers);
const smallestNum = Stats.smallest(myNumbers);
const averageNum = Stats.average(myNumbers);

console.log("--- Stats for My Array ---");
console.log(`Array:    [${myNumbers.join(", ")}]`);
console.log(`Largest:  ${largestNum}`);
console.log(`Smallest: ${smallestNum}`);
console.log(`Average:  ${averageNum}`);