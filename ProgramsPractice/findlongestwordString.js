let str = "I am learning JavaScript automation222";

let words = str.split(" ");
let longestWord = "";

for (let word of words) {
    if (word.length > longestWord.length) {
        longestWord = word;
    }
}

console.log(longestWord);