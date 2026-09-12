let str = "nneeraj";

let map = new Map();

for (let ss of str) {
    map.set(ss, (map.get(ss) || 0) + 1);
}

for (let [key, value] of map) {
    if (value === 1) {
        console.log(key, value);
        break;
    }
}
