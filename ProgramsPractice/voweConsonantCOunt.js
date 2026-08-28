let str = "hello world";
let vowels =0;
let consonants = 0;

for(let cc of str){
    if(cc == 'a' || cc == 'e' || cc == 'i' || cc == 'o' || cc == 'u'){
        voewl++;
    }else if(cc >= 'a' && cc <= 'z'){
        consts++;
    }
}
console.log("Vowels:", voewl);
console.log("Consonants:", consts);