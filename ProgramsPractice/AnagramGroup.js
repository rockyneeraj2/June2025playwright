/*
[eat,tea,ate]
[tan,nat]
[bat]
*/

let words = ["eat","tea","tan","ate","nat","bat"];

let map = {};

for (let word of words) {

    let key = word.split("").sort().join("");

    if (!map[key]) {
        map[key] = [];
    }

    map[key].push(word);
}

console.log(Object.values(map));