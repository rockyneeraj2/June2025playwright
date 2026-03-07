 let str = [1,2,3,4,3,3,2];
    let result = [];

    for (let i = 0; i < str.length; i++) {
        if (!result.includes(str[i])) {
            result += str[i];
        }

    }
    console.log(result);