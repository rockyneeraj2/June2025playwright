let str = "helolo"
let map = new Map();

// Step 1: Count characters
for (let char of str) {
    map.set(char, (map.get(char) || 0) + 1);
}

// Step 2: Print characters and counts
for (let [key, value] of map) {
    if (value) {
        console.log(key + " = " + value);
    }
}

/*
map.get(char) → gives current count

If character is not present, it returns undefined

undefined || 0 → becomes 0

map.get('h') → undefined
0 + 1 = 1

🔸 for (let [key, value] of map)
This reads Map entries one by one:
*/