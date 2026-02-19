let str ="NeerAANNYY";

let map = new Map();

for(let cc of str){
    if(cc>='A' && cc<='Z')
    map.set(cc,(map.get(cc) || 0 ) +1);
}

for(let [key,value] of map){
    if(value){
        console.log(key +" -- "+value);
    }
}