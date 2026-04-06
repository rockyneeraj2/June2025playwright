

let str = "neekkajyz";


let map = new Map();

for(let ss of str){
    map.set(ss,(map.get(ss)||0)+1);
}

for(let i=str.length-1;i>=0;i--){
    if(map.get(str[i])===1){
    console.log(str[i]);
    break;
    
    }
    }