function secondNonRepeating(str) {
    let map = new Map();

    // Count frequency
    for (let char of str) {
        map.set(char, (map.get(char) || 0) + 1);
    }

    let count = 0;

    // Find second non-repeating
    for (let char of str) {
        if (map.get(char) === 1) {
            count++;
            if (count === 2) {
                return char;
            }
        }
    }

    return null; // if not found
}

console.log(secondNonRepeating("aabbcddef")); // e