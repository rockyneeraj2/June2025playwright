  let str = 'Hello, World!';
    let duplicates = "";

    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j < str.length; j++) {
            if (str[i] === str[j] && !duplicates.includes(str[i])) {
                duplicates += str[i];
            }
        }
    }
    console.log(duplicates);