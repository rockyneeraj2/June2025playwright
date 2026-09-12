let str = [1,4,3,8,6];

let large = Number.MIN_VALUE;
let seclar = Number.MIN_VALUE;

for(let ss of str){
    if(ss>large){
        seclar = large;
        large = ss;
    }
    else if(ss>seclar && ss!=large){
        seclar = ss;
    }
}

console.log(seclar);