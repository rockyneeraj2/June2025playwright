let str = "neeraj kumar yadav";

let st = str.split(' ');

let rev = "";

for(let word of st){

    for(let i=word.length-1;i>=0;i--){
        rev+=word[i];
    }

    rev+= " ";

}
console.log(rev);