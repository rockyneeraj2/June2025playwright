
let nums = [1,6,7,55];
let target = 7;

for(let i = 0; i < nums.length; i++){

        for(let j = i + 1; j < nums.length; j++){

            if(nums[i] + nums[j] === target){
                console.log(i,j);
            }
        }
    }