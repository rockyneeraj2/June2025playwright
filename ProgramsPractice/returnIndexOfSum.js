function findIndex(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                return [i, j];
            }
        }
    }
    return "No pair found";
}

let arr = [1,2,3,4,5,5,7];
console.log(findIndex(arr, 10));  