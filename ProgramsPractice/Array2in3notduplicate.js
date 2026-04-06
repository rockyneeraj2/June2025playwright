let arr1 = [1,2,3,4,5,7,8,9];
let arr2 = [3,4,5];

let result = [];

for(let i=0;i<arr1.length;i++){
    if(!arr2.includes(arr1[i])){
        result.push(arr1[i]);
    }
}

for(let i=0;i<arr2.length;i++){
    if(!arr1.includes(arr2[i])){
        result.push(arr2[i]);
    }
}

console.log(result);