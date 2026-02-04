function reverseNumber(num) {
  let reverse = 0;

  for ( num= num > 0; num = Math.floor(num / 10) {
    let digit = num % 10;
    reverse = reverse * 10 + digit;
  }

}

console.log(reverseNumber(12345)); // 54321
