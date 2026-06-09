let str = "a1b2c3";
let letters = "";
let result = "";

// Store only letters
for (let i = 0; i < str.length; i++) {
    if ((str[i] >= 'a' && str[i] <= 'z') || 
        (str[i] >= 'A' && str[i] <= 'Z')) {
        letters = letters + str[i];
    }
}

// Reverse only letters
let j = letters.length - 1;

for (let i = 0; i < str.length; i++) {
    if ((str[i] >= 'a' && str[i] <= 'z') || 
        (str[i] >= 'A' && str[i] <= 'Z')) {
        result = result + letters[j];
        j--;
    } else {
        result = result + str[i];
    }
}

console.log(result); // c1b2a3