
let str ="pwkee";

    let map = new Map();
    let left = 0;
    let maxLength = 0;
    let result = "";

    for (let right = 0; right < str.length; right++) {

        if (map.has(str[right])) {
            left = Math.max(left, map.get(str[right]) + 1);
        }

        map.set(str[right], right);

        if (right - left + 1 > maxLength) {
            maxLength = right - left + 1;
            result = str.substring(left, right + 1);
        }
    }

    console.log(result);

