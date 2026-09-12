let product = ["milk", "bread", "eggs", "milk", "cheege"];

let map = new Map();
let result = [];

// Count frequency
for (let item of product) {
    map.set(item, (map.get(item) || 0) + 1);
}

// Add duplicates first
for (let item of product) {
    if (map.get(item) > 1) {
        result.push(item);
    }
}

// Add unique elements
for (let item of product) {
    if (map.get(item) === 1) {
        result.push(item);
    }
}

console.log(result);