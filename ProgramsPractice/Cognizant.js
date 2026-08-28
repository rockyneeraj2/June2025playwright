//input :Neeraj Kumar
//output : n1e2r2a2j1k1u1m1

let input =["aaaa" , "ppp" , "ooooo"];

let map = new Map();

for(let ss of input){
    map.set(ss,(map.get(ss) || 0)+1);
}

for(let [key,value] of map){
    //  process.stdout.write(key+value);
  //  process.stdout.write();
  
  console.log(key+" "+value);
    
}

/*
let arr = ["aaa", "bbb", "hhh", "aaa", "bbb", "aaa"];
let map = new Map();

for (let value of arr) {
    map.set(value, (map.get(value) || 0) + 1);
}

console.log(map);

*/