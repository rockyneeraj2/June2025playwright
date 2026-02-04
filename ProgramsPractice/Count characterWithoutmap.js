  let str = "neeraj"
  let count = {};

  for (let char of str) {
    count[char] = (count[char] || 0) + 1;
  }

  console.log(count);
