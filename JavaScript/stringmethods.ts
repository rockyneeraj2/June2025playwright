

//# 1. `length`

//Returns the length of the string.

let name1: string = "Neeraj";

console.log(name1.length);

//Output - 6


//# 2. `toUpperCase()` ---Converts string to uppercase.

let name2 = "neeraj";

console.log(name2.toUpperCase());

//Output  -- NEERAJ

//# 3. `toLowerCase()`

let name3 = "NEERAJ";

console.log(name3.toLowerCase());

//Output  ---neeraj

//# 4. `charAt()`  Returns character at specific index.

let name5 = "Neeraj";

console.log(name5.charAt(2));

//Output == e

//# 5. `includes()` --- Checks if substring exists.

let text1 = "Playwright Automation";

console.log(text1.includes("Automation"));

//Output == true

//# 6. `startsWith()`


let text3 = "Neeraj Kumar";

console.log(text3.startsWith("Neeraj"));


//Output -- true


//# 7. `endsWith()`

let text5 = "Neeraj Kumar";

console.log(text5.endsWith("Kumar"));

//Output ===true

//# 8. `indexOf()` --Returns first index of substring.

let text6 = "Automation Testing";

console.log(text6.indexOf("Testing"));

//Output ===11


//# 9. `lastIndexOf()`

let text8 = "hello world hello";

console.log(text8.lastIndexOf("hello"));

//Output ==12

//# 10. `substring()`

let text0 = "Playwright";

console.log(text0.substring(0,4));

//Output ==Play

//# 11. `slice()`

let text23 = "Playwright";

console.log(text23.slice(4,10));
//Output ==wright


//# 12. `replace()`

let text12 = "Hello Neeraj";

console.log(text12.replace("Neeraj", "Kumar"));

//Output ---Hello Kumar

//# 13. `split()` ---Converts string to array.


let text33 = "Neeraj,Kumar,QA";

let result = text33.split(",");

console.log(result);


//Output ---["Neeraj","Kumar","QA"]

//# 14. `trim()` ---Removes spaces.

let text55 = "   Neeraj   ";

console.log(text55.trim());

//Output -- Neeraj

//# 15. `concat()`

let first1 = "Neeraj";
let last = "Kumar";

console.log(first1.concat(" ", last));

//Output ---Neeraj Kumar

/*
1. `split()`
2. `slice()`
3. `substring()`
4. `replace()`
5. `includes()`
6. `startsWith()`
7. `indexOf()`
8. `trim()`
9. `toUpperCase()`
10. `toLowerCase()`

*/

