// variables
let num1 = num2 = 0;
let op = "+";
let result = 0;
const display = document.querySelector('p');
const numContainer = document.querySelector('.numbers');
const numBtns = numContainer.querySelectorAll('button');
const opContainer = document.querySelector('.operators');
const opBtns = opContainer.querySelectorAll('button');
const eqBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');
const delBtn = document.querySelector('.delete');

// buttons
numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if(display.innerText.includes('.') && btn.innerText === '.'){

        }
        else if((display.innerText === '0' && btn.innerText !== '.')){
            display.innerText = btn.innerText;
        }
        else{
            display.innerText += btn.innerText;
        }
    });
});

opBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        num1 = Number(display.innerText);
        display.innerText = '0';
        op = btn.innerText;
    });
});

eqBtn.addEventListener('click', () => {
    num2 = Number(display.innerText);
    display.innerText = operate(num1, op, num2);
    num1, num2 = 0;
    op = '+';
});

clearBtn.addEventListener('click', () => {
    display.innerText = '0';
    num1, num2 = 0;
    op = '+';
});

delBtn.addEventListener('click', () => {
    if(display.innerText.length === 1){
        display.innerText = '0';
    }
    else{
        display.innerText = display.innerText.slice(0, -1);
    }
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

    return operations[op];
}