const a = "neeraj";

let map = new Map();

let vowel=0;
let consonant =0;


for(let cc of a){
    if(cc>='a' && cc<='z'){
        if(cc==='a' || cc==='e' || cc==='i'||cc==='o'|| cc==='u'){
         vowel++;
        }else{
            consonant++;
            
        }
    }
    
}
console.log("vowel--" +vowel);
console.log("consonant--"+consonant);