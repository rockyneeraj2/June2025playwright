let arr = [1, 2, 3, 5];
let n = 5; // total numbers from 1 to n

let expectedSum = n * (n + 1) / 2;
let actualSum = 0;

for (let i = 0; i < arr.length; i++) {
    actualSum += arr[i];
}

let missingNumber = expectedSum - actualSum;
console.log("Missing number:", missingNumber);
