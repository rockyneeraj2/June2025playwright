let str = [1,2,3,4,5,3]
let duplicate = [];

for(let i=0;i<str.length;i++){
    for(let j=i+1;j<str.length;j++){
        if(str[i]===str[j] && !duplicate.includes(str[i])){
            duplicate+=str[i];
        }
    }
}
console.log(duplicate)
