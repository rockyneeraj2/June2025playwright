let str = "ghabkh123ck43adk5zyx";
let longest = "";

for (let i = 0; i < str.length; i++) {

    if (str[i] >= '0' && str[i] <= '9') {
        let num = "";

        while (i < str.length && str[i] >= '0' && str[i] <= '9') {
            num = num + str[i];
            i++; 
            /*
            1
           12
          123
           3
          34

            */

          console.log(num);
        } 

        if (num.length > longest.length) {
            longest = num;
        }
    }
}

console.log("Longest:", longest);