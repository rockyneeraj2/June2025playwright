let str = "12abc20";
let num = "";
let sum = 0;

for (let i = 0; i < str.length; i++) {

    // Check if character is a number
    if (str[i] >= '0' && str[i] <= '9') {
        num = num + str[i];
    } 
    else {
        // Add number when letter comes
        if (num != "") {
            sum = sum + Number(num);
            num = "";
        }
    }
}

// Add last number
if (num != "") {
    sum = sum + Number(num);
}

console.log(sum); // 32