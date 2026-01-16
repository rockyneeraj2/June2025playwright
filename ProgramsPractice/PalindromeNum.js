function isPalindrome(num) {
  let original = num;
  let reversed = 0;

  while (num > 0) {
    let digit = num % 10;
    reversed = reversed * 10 + digit;
    num = Math.floor(num / 10);
  }

  return original === reversed;
}

console.log(isPalindrome(121)); // true
console.log(isPalindrome(123)); // false
