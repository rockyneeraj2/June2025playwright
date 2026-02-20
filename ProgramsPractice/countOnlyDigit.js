const a = "neerajkumar34343";

let map = new Map();

for(let cc of a){
    if(cc>='0' && cc<='9')
    map.set(cc,(map.get(cc) || 0)+1);
}

for(let [key,value] of map){
    if(value){
        console.log(key + "--" +value);
    }
}
