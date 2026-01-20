function checkVowelConsonant(ch) {
    ch = ch.toLowerCase();

    if (ch === 'a' || ch === 'e' || ch === 'i' || ch === 'o' || ch === 'u') {
        console.log("Vowel");
    } else {
        console.log("Consonant");
    }
}

checkVowelConsonant('A'); // Vowel
checkVowelConsonant('b');
