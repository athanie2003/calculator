const num1 = prompt();
const op = prompt();
const num2 = prompt();


function add(num1, num2){
    return num1 + num2;
}
function subtract(num1, num2){
    return num1 - num2;
}
function multiply(num1, num2){
    return num1 * num2;
}
function divide(num1, num2){
    return num1 / num2;
}

console.log(add(3,5));
console.log(subtract(3,5));
console.log(multiply(3,5));
console.log(divide(3,5));