// variables
let num1 = num2 = 0;
let op = "";
let equation = "";
let isDefault = false;
let reset = false;
const display = document.querySelector('p');
const numContainer = document.querySelector('.numbers');
const numBtns = numContainer.querySelectorAll('button');
const opContainer = document.querySelector('.operators');
const opBtns = opContainer.querySelectorAll('button');
const equalBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');
const delBtn = document.querySelector('.delete');
const negateBtn = document.querySelector('.sign');

// keys
document.addEventListener('keydown', (event) =>{
    const pressedKey  = event.key;

    // number keys
    if(/^[0-9.]$/.test(pressedKey)){ // check if keys are from 0-9 or '.'
        if(reset){
            num1 = 0;
            op = '';
            num2 = 0;
            display.innerText = "0";
            reset = false;
        }
        if(pressedKey === '.'){
            isDefault = false;
        }
        // does not allow multiple decimals
        if(display.innerText.includes('.') && pressedKey === '.'){
            if(pressedKey === '.' && num2 === 0 && op !== ''){
                display.innerText = '0.';
                isDefault = false;
            }
        }
        // change first digit
        else if((display.innerText === '0' && pressedKey !== '.' || isDefault && pressedKey !== '.')){
            display.innerText = pressedKey;
            isDefault = false;
            reset = false;
        }
        else if(pressedKey === '.' && num2 === 0 && op !== ''){
            display.innerText = '0.';
            isDefault = false;
        }
        // add more digits
        else{
            display.innerText += pressedKey;
        }
        equation += pressedKey;
    }

    else if(pressedKey === "Backspace"){
        if(display.innerText.length === 1){
            display.innerText = '0';
            isDefault = true;
            equation = '';
        }
        else{
            display.innerText = display.innerText.slice(0, -1);
            equation = equation.slice(0, -1);
        }
    }

    else if(pressedKey === "Enter"){
        event.preventDefault(); // prevents previously pressed button from being pressed again
        if(op !== ''){
            if(num2 === 0){
                num2 = Number(display.innerText);
            }
            display.innerText = operate(num1, op, num2);
            num1 = Number(display.innerText);
            equation = display.innerText;
            num2 = 0;
            isDefault = true;
            reset = true;
        }
    }

    // operation keys
    else if(/[+\-*/]/.test(pressedKey)){
        reset = false;    
        let arr = equation.split('');
        if(num1 !== 0 && op !== '' && !isNaN(arr[arr.length-1]) && equation !== display.innerText){
            num2 = Number(display.innerText);
            num1 = operate(num1, op, num2);
            num2 = 0;
            display.innerText = num1;
        }
        else{
            num1 = Number(display.innerText); 
        }
        isDefault = true;
        if(pressedKey === '*'){
            op = '×';
            equation += '×';
        }
        else if(pressedKey === '/'){
            op = '÷'
            equation += '÷';
        }
        else{
           op = pressedKey;
           equation += pressedKey;
        }
    }
});

// buttons
numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if(reset){
            num1 = 0;
            op = '';
            num2 = 0;
            display.innerText = "0";
            reset = false;
        }
        if(btn.innerText === '.'){
            isDefault = false;
        }
        // does not allow multiple decimals
        if(display.innerText.includes('.') && btn.innerText === '.'){
            if(btn.innerText === '.' && num2 === 0 && op !== ''){
                display.innerText = '0.';
                isDefault = false;
            }
        }
        // change first digit
        else if((display.innerText === '0' && btn.innerText !== '.' || isDefault && btn.innerText !== '.')){
            display.innerText = btn.innerText;
            isDefault = false;
            reset = false;
        }
        else if(btn.innerText === '.' && num2 === 0 && op !== ''){
            display.innerText = '0.';
            isDefault = false;
        }
        // add more digits
        else{
            display.innerText += btn.innerText;
        }
        equation += btn.innerText;
    });
});

opBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        reset = false;    
        let arr = equation.split('');

        // allows multiple operations
        if(num1 !== 0 && op !== '' && !isNaN(arr[arr.length-1]) && equation !== display.innerText){
            num2 = Number(display.innerText);
            num1 = operate(num1, op, num2);
            num2 = 0;
            display.innerText = num1;
        }
        else{
           num1 = Number(display.innerText); 
        }
        isDefault = true;
        op = btn.innerText;
        equation += btn.innerText;
    });
});

equalBtn.addEventListener('click', () => {
    if(op !== ''){
        if(num2 === 0){
            num2 = Number(display.innerText);
        }
        display.innerText = operate(num1, op, num2);
        num1 = Number(display.innerText);
        equation = display.innerText;
        num2 = 0;
        isDefault = true;
        reset = true;
    }
});

clearBtn.addEventListener('click', () => {
    display.innerText = '0';
    num1 = num2 = 0;
    op = '';
    equation = '';
    isDefault = true;
    negateBtn.disabled = false;
    delBtn.disabled = false;
    numBtns.forEach(btn => btn.disabled = false);
    opBtns.forEach(btn => btn.disabled = false);
    equalBtn.disabled = false;
});

delBtn.addEventListener('click', () => {
    if(display.innerText.length === 1){
        display.innerText = '0';
        isDefault = true;
        equation = '';
    }
    else{
        display.innerText = display.innerText.slice(0, -1);
        equation = equation.slice(0, -1);
    }
});

negateBtn.addEventListener('click', () => {
    display.innerText = -Number(display.innerText);
});

// functions
function add(num1, num2){
    return (num1.toFixed(2)*100 + num2.toFixed(2)*100)/100;
}
function subtract(num1, num2){
    return (num1.toFixed(2)*100 - num2.toFixed(2)*100)/100;
}
function multiply(num1, num2){
    return (num1.toFixed(2) * num2.toFixed(2)*100)/100;
}
function divide(num1, num2){
    return (num1.toFixed(2) / num2.toFixed(2)*100)/100;
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

    if(isNaN(operations[op]) || !isFinite(operations[op])){
        negateBtn.disabled = true;
        delBtn.disabled = true;
        numBtns.forEach(btn => btn.disabled = true);
        opBtns.forEach(btn => btn.disabled = true);
        equalBtn.disabled = true;
        return 'Error';
    }

    return operations[op];
}