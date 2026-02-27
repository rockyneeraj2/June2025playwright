let arr1 = [1, 2, 3, 4, 5];
let arr2 = [3, 4, 5, 6, 7];

let arr3 = [];

let combined = arr1.concat(arr2);

for (let i = 0; i < combined.length; i++) {
    if (!arr3.includes(combined[i])) {
        arr3.push(combined[i]);
    }
}

console.log(arr3);