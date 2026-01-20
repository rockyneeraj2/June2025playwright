let str1 = "madam";
let str2 = "adamm";

if (str1.length !== str2.length) {
    console.log("Not Anagram");
} else {
    let s1 = str1.split('').sort().join('');
    let s2 = str2.split('').sort().join('');

    if (s1 === s2) {
        console.log("Anagram");
    } else {
        console.log("Not Anagram");
    }
}
