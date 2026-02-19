let word = "tomorrow";
let vowels = "aeiou";
let count = 0;
let result = "";

for (let i = 0; i < word.length; i++) {
    let letter = word[i];

    if (vowels.includes(letter)) {
        count++;
        
        for (let j = 0; j < count; j++) {
            result += "$";
        }
    } else {
        result += letter;
    }
}

console.log(result);


