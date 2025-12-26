function findDuplicate(word: string) {
    let duplicate = "";

    for (let i = 0; i < word.length; i++) {
        for (let j = i + 1; j < word.length; j++) {
            if (word[i] === word[j] && !duplicate.includes(word[i])) {
                duplicate = duplicate + word[i];
            }
        }
    }

    return duplicate;
}

console.log(findDuplicate("hello"));
console.log(findDuplicate("programming"));