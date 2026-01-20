let sentence = "I love java and I love javascript";

let words = sentence.split(" ");   // Step 1
let count = {};                    // Step 2

// Step 3: Count words
for (let word of words) {
  count[word] = (count[word] || 0) + 1;
}

// Step 4: Print duplicate words
for (let word in count) {
  if (count[word] === 1) {
    console.log(word + " = " + count[word]);
  }
}
