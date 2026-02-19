//1. function declaration:

function add(a,b){
    return a+b;
}

function print(){
    console.log("hi this is javascript");
}

const sum =add(5,6);
console.log(sum);

print();

//2. function expression:
const multiply = function(x,y){
    return x*y;
}

const mul = multiply(5,6);
console.log(mul);

//3. Arrow function expression:
const divide = (t1,t2) => t1/t2;
const div =divide(20,2);

//4. function constructor:
const substract = new Function('a','b', 'return a-b;')
const subs = substract(10,2);
console.log(subs);