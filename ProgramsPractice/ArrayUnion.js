let arr1 = [1,2,3,4];
let arr2 = [3,4,5,6];

let union = [...arr1];

for(let i = 0; i < arr2.length; i++){

    if(!union.includes(arr2[i])){
        union.push(arr2[i]);
    }

}

console.log(union);