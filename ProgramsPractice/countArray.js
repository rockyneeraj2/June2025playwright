const a =[1,2,3,44,55,1,2,3,4,55];

let map = new Map();

for(let cc of a){
    map.set(cc,(map.get(cc)||0)+1);
}

for(let [key,value] of map){
    if(value)
    console.log(key +" --" +value);
}