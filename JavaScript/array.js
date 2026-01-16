// declaration of array:

let myArray = []; // an empty array
let numbers = [1,2,3,4,5]; // array with number
let fruits = ["apple","banan","orange"]; // array with string

let lang  = ["java", "python","js"];

//1. push:Appends new elements to the end of an array, and returns the new length of the array
lang.push("ruby");
console.log(lang);

// 2. pop:Removes the last element from an array and returns it. If the array is empty, undefined is returned and the array is not modified
let numbers1 = [1,2,3,4,5];
numbers.pop();
console.log(numbers);

// 3. shift: Removes the first element from an array and returns it. If the array is empty, undefined is returned and the array is not modified
let fruits1 = ["apple","banan","orange"];
let first = fruits1.shift();
console.log(first);

//4 unshift: Inserts new elements at the start of an array, and returns the new length of the array.
let color =["red","blue","yy"];
color.unshift("black");
console.log(color);
console.log(color.length);

//5 splice: Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements
let animal = ["dog","cat","rat","fish"];
animal.splice(1,2,"dig","elephant");
console.log(animal);

//slice:Returns a copy of a section of an array. For both start and end, a negative index can be used to indicate an offset from the end of the array. For example, -2 refers to the second to last element of the array.
let pop = [1,2,3,4,5];
let newpop = pop.slice(1,4);
console.log(newpop);