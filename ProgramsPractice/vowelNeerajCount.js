const str = "neeraj kumar";
const vowels = "aeiou";
const vowelCount = {};

for (let char of str.toLowerCase()) {
  if (vowels.includes(char)) {
    vowelCount[char] = (vowelCount[char] || 0) + 1;
  }
}

console.log(vowelCount);