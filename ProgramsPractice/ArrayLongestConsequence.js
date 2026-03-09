let arr = [100,4,200,1,3,2];

arr.sort((a,b) => a-b);

let count = 1;
let max = 1;

for(let i=1;i<arr.length;i++){

    if(arr[i] === arr[i-1] + 1){
        count++;
        max = Math.max(max,count);
    }else{
        count = 1;
    }

}

console.log(max);