let num =232788;
  let reverse = 0;
    while (num > 0) {
        let digit = num % 10;          // get last digit
        reverse = reverse * 10 + digit;
        num = Math.floor(num / 10);    // remove last digit
    }


console.log(reverse);  // Output: 4321
