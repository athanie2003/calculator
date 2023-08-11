// variables
let num1 = num2 = 0;
let op = "+";
let flag = true;
const display = document.querySelector('p');
const numContainer = document.querySelector('.numbers');
const numBtns = numContainer.querySelectorAll('button');
const opContainer = document.querySelector('.operators');
const opBtns = opContainer.querySelectorAll('button');
const eqBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');
const delBtn = document.querySelector('.delete');
// const keys = document.querySelectorAll('.number');

//keys
document.addEventListener('keydown', (event) =>{
    const pressedKey  = event.key;
    if(/^[0-9.]$/.test(pressedKey)){ // check if keys are from 0-9 or '.'
        if(display.innerText.includes('.') && pressedKey === '.'){
            // do nothing
        }
        else if((display.innerText === '0' && pressedKey !== '.' || flag  && pressedKey !== '.')){
            display.innerText = pressedKey;
            flag = !flag;
        }
        else{
            display.innerText += pressedKey;
        }
    }

    if(pressedKey === "Backspace"){
        if(display.innerText.length === 1){
            display.innerText = '0';
            flag = !flag;
        }
        else{
            display.innerText = display.innerText.slice(0, -1);
        }
    }

    // if(pressedKey === "Enter"){
    //     num2 = Number(display.innerText);
    //     display.innerText = operate(num1, op, num2);
    //     num1 = Number(display.innerText);
    //     num2 = null;
    //     op = '+';
    // }
});

// buttons
numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if(display.innerText.includes('.') && btn.innerText === '.'){

        }
        else if((display.innerText === '0' && btn.innerText !== '.' || flag)){
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
        if(num1 !== 0){
            if(num2 !== null){
                num2 = Number(display.innerText);
            }
            num1 = operate(num1, op, num2);
            display.innerText = num1;
            num2 = 0;
        }
        else{
           num1 = Number(display.innerText); 
        }
        
        flag = !flag;
        op = btn.innerText;
    });
});

eqBtn.addEventListener('click', () => {
    num2 = Number(display.innerText);
    display.innerText = operate(num1, op, num2);
    num1 = Number(display.innerText);
    num2 = null;
    op = '+';
});

clearBtn.addEventListener('click', () => {
    display.innerText = '0';
    num1 = num2 = 0;
    op = '+';
    flag = !flag;
});

delBtn.addEventListener('click', () => {
    if(display.innerText.length === 1){
        display.innerText = '0';
        flag = !flag;
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