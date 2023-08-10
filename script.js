// variables
let num1, op, num2;
let flag = true;
let result = 0;
const display = document.querySelector('p');
const numContainer = document.querySelector('.numbers');
const numBtns = numContainer.querySelectorAll('button');
const opContainer = document.querySelector('.operators');
const opBtns = opContainer.querySelectorAll('button');
const eqBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');

// buttons
numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if(display.innerText.includes('.') && btn.innerText === '.'){

        }
        else if((display.innerText === '0' && btn.innerText !== '.') || flag){
            display.innerText = btn.innerText;
            flag = !flag;
        }
        else{
            display.innerText += btn.innerText;
        }
    });
});

opBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        num1 = Number(display.innerText);
        flag = !flag;
        op = btn.innerText;
    });
});

eqBtn.addEventListener('click', () => {
    num2 = Number(display.innerText);
    display.innerText = operate(num1, op, num2);
});

// functions
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
        "×": multiply(num1, num2),
        "÷": divide(num1, num2)
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