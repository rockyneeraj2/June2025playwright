// 1. var: old way
//scope: var
//functional / locally + global

var x = 10; // global scope
function test() {
    var y = 20; // functional scope
}
console.log(x);

var pop = "hello java";
function rel() {
    var top = "hello js";
}
rel();
//console.log(top);
//console.log(pop);

var browser = "chrome";
var browser = "firefox";
browser = "edge";
console.log(browser);

var g;
//console.log(g); // undefined

console.log("---------------");

//issue with var:
var flag = "hey naveen";
var t1 = 4;
if (t1 > 3) {
    var flag = "hello tom";
}
console.log(flag);

console.log("---------let---------");

// let :scope var:
let m = "naveen";
let time = 4;
if(time>3){
    let msg = "neraj";
    console.log(msg);
}
//console.log(msg);
console.log(m);

let mength =4
mength = 5;
console.log(mength);

//const:
const mg = "neeraj kumar";
mg = "pankaj";
//console.log(mg);

const days = 7;
days = 10;
console.log(100*days);

var  p;
//console.log(p); //undefined