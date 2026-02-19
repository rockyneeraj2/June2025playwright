let str = "r@56vi ku$%mar67";

let result = "";
let sum = 0;

for (let i = 0; i < str.length; i++) {
    let ch = str[i];

    // check if character is letter or space
    if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === ' ') {
        result += ch;
    }

    // check if character is number
    else if (ch >= '0' && ch <= '9') {
        sum += Number(ch);
    }
}

console.log(result + " " + sum);
