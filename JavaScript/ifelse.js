function checkAGe(age) {
    if (age >= 18) {
        console.log("vote");
    } else {
        console.log("sorry must be 18 yr old");
    }
}

checkAGe(10);
checkAGe(5);
checkAGe(29);

function checkNum(num) {
    if (num > 0) {
        console.log("positive no");
    }
    else if (num < 0) {
        console.log(object);
    }
    else {
        console.log("zero");
    }
}

checkNum(10);


// nested if else:
function checkGrade(score) {
    let grade;
    if (score >= 90) {
        grade = 'A';
    }
    else if (score >= 80) {
        grade = 'B';
    }
    else {
        if (score >= 70) {
            grade = 'C';
        }
    }

}
//console.log(grade(10));

let browser = "chrome";
if (browser == "chrome") {
    console.log("chrome");
} if (browser == 'firefox') {
    console.log("firefox");
} if (browser == 'edge') {
    console.log("edge");
}
else {
    console.log("please pass the browser");
}


// it will check all the conditions:
let name = "neeraj";
if (browser == "neeraj") {
    console.log("neeraj");
} else if (browser == 'pankaj') {
    console.log("pankaj");
} else if (browser == 'sunny') {
    console.log("sunny");
}
else {
    console.log("please pass the browser");
}

