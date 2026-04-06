let arr1 = [1,2,3,4,5,6,8,9];
let arr2 = [1,2,4];

for(let i=0;i<arr1.length;i++){
    if(!arr2.includes(arr1[i])){
        process.stdout.write(arr1[i]);
    }
}