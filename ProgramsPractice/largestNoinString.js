let str = "ghabkh123ck43adk5zyx";
let longest = "";

let st = str.match(/\d+/g);

for(let word of st){   
    if(word.length >longest.length){
        longest = word;
    }
}
console.log("Longest:", longest);