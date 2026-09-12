let str = "I am learning JavaScript automation222";

let words = str.split(" ");
let longestWord = "";

for (let word of words) {
    if (word.length > longestWord.length) {
        longestWord = word;
    }
}

console.log(longestWord);

/*
let str = ["pune","delhirr","patnauuuu"]

let long = str[0];
for(let ss of str){
    if(ss.length<long.length){
        long = ss;
    }
}

console.log(long);

*/