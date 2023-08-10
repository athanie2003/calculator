const num1 = prompt(`num1: `);
const op = prompt(`operator: `);
const num2 = prompt(`num2: `);

console.log(operate(num1, op, num2));


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

function operate(num1, op, num2){
    num1 = Number(num1);
    num2 = Number(num2);

    const operations = {
        "+": add(num1, num2),
        "-": subtract(num1, num2),
        "*": multiply(num1, num2),
        "/": divide(num1, num2)
    };

    if(!operations[op] || isNaN(num1) || isNaN(num2)){
        return NaN;
    }

    return operations[op];
}

// console.log(add(3,5));
// console.log(subtract(3,5));
// console.log(multiply(3,5));
// console.log(divide(3,5));