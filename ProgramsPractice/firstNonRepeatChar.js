let str = "aabbcdde";
let charCount = {};

// Step 1: Count characters
for (let char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
}

// Step 2: Find first non-repeating character
for (let char of str) {
    if (charCount[char] === 1) {
        console.log("First non-repeating character:", char);
        break;
    }
}
