let num = 11;
let isPrime = true;

if (num <= 1) {
    isPrime = false;
} else {
    for (let i = 2; i <= num / 2; i++) {
        if (num % i === 0) {
            isPrime = false;
            break;
        }
    }
}

if (isPrime) {
    console.log(num + " is a Prime number");
} else {
    console.log(num + " is NOT a Prime number");
}

