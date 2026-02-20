
function checkDuplicate(arr, value) {
    const map = new Map();

    // Count frequency of each number
    for (let num of arr) {
        map.set(num, (map.get(num) || 0) + 1);
    }

    // Check frequency of given value
    if ((map.get(value) || 0) > 1) {
        return false;   // duplicate
    } else {
        return true;    // not duplicate
    }
}

// Example
let numbers = [1, 2, 3, 4, 2];

console.log(checkDuplicate(numbers, 3)); // true
console.log(checkDuplicate(numbers, 2)); // false