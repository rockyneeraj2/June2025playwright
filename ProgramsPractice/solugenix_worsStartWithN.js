let str = "Neeraj Nilima sonia nikhil Raj";
let words = str.split(" ");

for (let i = 0; i < words.length; i++) {
    if (words[i][0] === "N") {
        console.log(words[i].toUpperCase());
    }
}