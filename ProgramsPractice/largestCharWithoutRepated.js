function longestSubstring(str){

    let max = 0;

    for(let i = 0; i < str.length; i++){

        let temp = "";

        for(let j = i; j < str.length; j++){

            if(temp.includes(str[j])){
                break;
            }

            temp += str[j];
            max = Math.max(max, temp.length);

        }

    }

    return max;
}

console.log(longestSubstring("abcabcbb"));