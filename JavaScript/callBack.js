// callback functions: 
//async call/task: once this task is completed -- then only callback function will be called 

//basic callback:
function greet(name,callback){
    console.log('Hello' +name); //normal sync step/task, could be async call/api 
    callback();
}

//callback function:
function welcome(){
    console.log("welcome");
}

greet('Neeraj',welcome);

console.log("===================");

//callback function with async function:
function printInfo(name, callback){
    //async functions/tasks/step
    setTimeout(function(){
        console.log("printing info " +name);
        callback("please call back")

    },1000);

}

//callback
function displayMessage(msg){
    console.log(msg);

}

printInfo("nnn",displayMessage);

console.log("==========================");

function fetchUserData(userId,callback){
    setTimeout(function(){
        const user = {
            1:{id:1,name:"Neeraj"},
            2:{id:2,name:"tom"},

        };
        const users =user[userId]
        if(user){
            callback(null,user);

        }else{
            callback("user not found",null)
        }

},2000);
}

//callback:
function handleUserData(error,user){
    if(error){
        console.error("Error" +error);
    }
    else{
        console.log("user "+user);
    }

}

fetchUserData(1,handleUserData);