let str1 = "abc";
let str2 = "def";

let result = "";

for (let i = 0; i < str1.length; i++) {
    result += str1[i] + str2[i];
}

console.log(result);