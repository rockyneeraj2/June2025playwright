function findDuplicates(arr) {
  const count = {};
  const duplicates = [];

  for (let num of arr) {
    count[num] = (count[num] || 0) + 1;
  }

  for (let key in count) {
    if (count[key] > 1) {
      duplicates.push(Number(key));
    }
  }

  return duplicates;
}

console.log(findDuplicates([10, 20, 10, 30, 20, 40]));
