let word = "neeraj kumar yadav neeraj";

let ww =word.split(" ");

let map = new Map();

for(let cc of ww){
    map.set(cc,(map.get(cc) || 0 )+1);
}

for(let [key,value] of map){
    console.log(key +" --"+ value);
}