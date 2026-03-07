let str = "neeraj kumar yadav";

let  st2 = str.split(" ");

let rev = "";

for(let  i=st2.length-1;i>=0;i--){
    rev+= st2[i];

    if(i!=0){
        rev+=" ";
    }
}

console.log(rev);