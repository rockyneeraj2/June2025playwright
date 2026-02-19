let str = "neeraj";

let map = new Map();

for(let cc of str){
    if(cc==='a' || cc==='e' || cc==='i' || cc==='o' || cc==='u')
    map.set(cc,(map.get(cc)||0) +1);
}

for(let [key,value] of map){
    if(value){
        console.log(key + "-- " + value);
    }
}