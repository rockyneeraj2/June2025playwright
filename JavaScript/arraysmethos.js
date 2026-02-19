//1. map:
let number = [1, 2, 3];
let doubleNumber = number.map((e) => e * 2);
console.log(doubleNumber);

let fmap = [3, 2, 4, 5];

function fashToCel(fah) {
    return (fah - 32) * (5 / 9);

}

let cell = fmap.map(fashToCel);
console.log(cell);


// 2. filter :

console.log("=====even number======");

let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let evenNum = num.filter((e) => e % 2 === 0);
console.log(evenNum);

let emp = [
    { name: 'neeraj', age: '23', gendar: 'male' },
    { name: 'pankaj', age: '23', gendar: 'female' },
    { name: 'neeru', age: '23', gendar: 'male' },
    { name: 'sonu', age: '23', gendar: 'male' }];

   let femaleEmp = emp.filter((e) =>{
        return e.gendar === 'female' && e.age>20;
    });

    console.log(femaleEmp);

    //3 reduce:
    let num1 =[1,2,3,4,5];
    let sum = num1.reduce((acc,num1) =>acc +num1,0);
    console.log(sum);