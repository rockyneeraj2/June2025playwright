let arr = ["aaa", "bbb", "hhh", "aaa", "bbb", "aaa"];

let map = new Map();

for (let item of arr) {
    if (map.has(item)) {
        map.set(item, map.get(item) + 1);
    } else {
        map.set(item, 1);
    }
}

console.log(map);