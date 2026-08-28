let str = "I am learning JavaScript automation";

let words = str.split(" ");
let smallestWord = words[0];

for (let word of words) {
    if (word.length < smallestWord.length) {
        smallestWord = word;
    }
}

console.log(smallestWord);