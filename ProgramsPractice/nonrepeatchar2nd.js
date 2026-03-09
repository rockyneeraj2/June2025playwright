let str = "concerteatikon";

    let map = new Map();

    let count =0;

    // Step 1: count characters
    for (let char of str) {
        map.set(char, (map.get(char) || 0) + 1);
    }

    // Step 2: find first char with count 1
    for (let [key,value] of map ) {
        if (value === 1) {
            count++;
            if(count===2){
            console.log(key);
            break;
        }
        }
    }