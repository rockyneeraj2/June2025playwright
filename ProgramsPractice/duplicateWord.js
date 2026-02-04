let str= "java,python,java,python,c";
let word= str.split(',')
let map= new Map();

for(let char of word){
    map.set(char,(map.get(char)||0)+1)
}

for(let [key,value] of map){
    if(value>1){
        console.log(key +"" )
    }
}