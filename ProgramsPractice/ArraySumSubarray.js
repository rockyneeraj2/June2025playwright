let arr = [1,2,3];

for(let i = 0; i < arr.length; i++){

    let sum = 0;

    for(let j = i; j < arr.length; j++){

        sum = sum + arr[j];
        console.log(sum);

    }

}