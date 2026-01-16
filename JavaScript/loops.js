// for loop:
// 1 to 10:

for (let i = 1; i <= 10; i++) {
    console.log(i);
}

console.log("=====for of");

//for ...of loop:
const array = [1, 2, 3, 4, 5];
for (const l of array) {
    console.log(l);
}

for (let i = 0; i < array.length; i++) {
    console.log(array[i]);

}

// while loop:
let p = 1;
while (p <= 10) {
    console.log(p);
    p++;
}

let l = 2;
while (l <= 10) {
    console.log(l);
    l = l + 2;
}

//do while:let 
let h = 1;
do {
    console.log(h);
    h++;
}
while (h <= 10) {

}

// break;
let num = 0;
while (num <= 100) {
    console.log(num);
    if (num % 5) {
        console.log("jim");
    }
    num++
}

console.log("======for in");

//for  ... of loop on object
const user = {
    name: "neeraj",
    city : "patna",
    age : 30,
}
for(const kk in user){
    console.log(kk + " "+user[kk]); //user[name]
}

console.log("======");

const br = ["chrome","firefox","edge","ie"];
for(const kk in br){
    console.log(kk);
}