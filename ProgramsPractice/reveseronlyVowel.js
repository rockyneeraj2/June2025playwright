let str = "codeshare";
let vowels = "";
let result = "";

// Store vowels
for (let i = 0; i < str.length; i++) {
    if ("aeiou".includes(str[i])) {
        vowels = vowels + str[i];
    }
}

// Reverse only vowels
let j = vowels.length - 1;

for (let i = 0; i < str.length; i++) {
    if ("aeiou".includes(str[i])) {
        result = result + vowels[j];
        j--;
    } else {
        result = result + str[i];
    }
}

console.log(result); // cedashore