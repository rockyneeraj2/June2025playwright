let str =["Bangalore","Delhi","Pune","Chennai"];

let lowest = str[0];

for(let ss of str){
    if(ss>lowest){
        lowest = ss;
    }
}
    
    console.log(lowest);