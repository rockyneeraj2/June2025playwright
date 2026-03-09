function longestWord(sentence){

    let words = sentence.split(" ");
    let longest = "";

    for(let word of words){
        if(word.length > longest.length){
            longest = word;
        }
    }

    return longest;
}

console.log(longestWord("I love learning JavaScript programming"));