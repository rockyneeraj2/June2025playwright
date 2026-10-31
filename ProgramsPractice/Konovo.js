const results = [
  "PASS", "FAIL", "FAIL", "PASS",
  "FAIL", "FAIL", "FAIL", "PASS", "FAIL"
];

let maxCount = 0;
let count = 0;
let start = -1;
let end = -1;
let currentStart = 0;

for (let i = 0; i < results.length; i++) {

  if (results[i] === "FAIL") {
    if (count === 0) {
      currentStart = i;
    }

    count++;

    if (count > maxCount) {
      maxCount = count;
      start = currentStart;
      end = i;
    }

  } else {
    count = 0;
  }
}

console.log("Maximum failures:", maxCount);
console.log("Start position:", start);
console.log("End position:", end);