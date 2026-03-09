let str = "swiss";

let map = new Map();

for(let c of str){
    map.set(c,(map.get(c) || 0)+1);
}

for(let i = str.length-1;i>=0;i--){
    if(map.get(str[i])=== 1){
        console.log(str[i]);
          break;
    }
}