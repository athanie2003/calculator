// variables
let num1 = num2 = 0;
let op = "";
let equation = "";
let flag = false;
let reset = false;
const display = document.querySelector('p');
const numContainer = document.querySelector('.numbers');
const numBtns = numContainer.querySelectorAll('button');
const opContainer = document.querySelector('.operators');
const opBtns = opContainer.querySelectorAll('button');
const eqBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');
const delBtn = document.querySelector('.delete');

// // keys
// document.addEventListener('keydown', (event) =>{
//     const pressedKey  = event.key;
//     if(/^[0-9.]$/.test(pressedKey)){ // check if keys are from 0-9 or '.'
//         if(display.innerText.includes('.') && pressedKey === '.'){
//             // do nothing
//         }
//         else if((display.innerText === '0' && pressedKey !== '.' || flag  && pressedKey !== '.')){
//             display.innerText = pressedKey;
//             flag = false;
//         }
//         else{
//             display.innerText += pressedKey;
//         }
//     }

//     else if(pressedKey === "Backspace"){
//         if(display.innerText.length === 1){
//             display.innerText = '0';
//             flag = true;
//             equation = '';
//         }
//         else{
//             display.innerText = display.innerText.slice(0, -1);
//             equation = equation.slice(0, -1);
//         }
//     }

//     else if(pressedKey === "Enter"){
//         event.preventDefault(); // prevents previously pressed button from being pressed again
//         if(op !== ''){
//             if(num2 === 0){
//                 num2 = Number(display.innerText);
//             }
//             display.innerText = operate(num1, op, num2);
//             num1 = Number(display.innerText);
//         }
//     }

// else if(/[+\-*/]/.test(pressedKey)){
//     let arr = equation.split('');
//         if(num1 !== 0 && op !== '' && !isNaN(arr[arr.length-1])){
//             num2 = Number(display.innerText);
//             num1 = operate(num1, op, num2);
//             num2 = 0;
//             display.innerText = num1;
//         }
//         else{
//            num1 = Number(display.innerText); 
//         }
//         flag = true;
//         if(pressedKey === '*'){
//             op = "×";
//             equation += "×";
//         }
//         else if(pressedKey === '/'){
//             op = "÷";
//             equation += "÷";
//         }
//         else{
//             op = pressedKey;
//             equation += pressedKey;
//         }
// }
// });

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
            flag = false;
        }
        // does not allow multiple decimals
        if(display.innerText.includes('.') && btn.innerText === '.'){
            if(btn.innerText === '.' && num2 === 0 && op !== ''){
                display.innerText = '0.';
                console.log(display.innerText);
                flag = false;
            }
        }
        // change first digit
        else if((display.innerText === '0' && btn.innerText !== '.' || flag && btn.innerText !== '.')){
            display.innerText = btn.innerText;
            flag = false;
            reset = false;
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
        if(num1 !== 0 && op !== '' && !isNaN(arr[arr.length-1]) && equation !== display.innerText && !reset){
            num2 = Number(display.innerText);
            num1 = operate(num1, op, num2);
            num2 = 0;
            display.innerText = num1;
        }
        else{
           num1 = Number(display.innerText); 
        }
        flag = true;
        op = btn.innerText;
        equation += btn.innerText;
    });
});

eqBtn.addEventListener('click', () => {
    if(op !== ''){
        if(num2 === 0){
            num2 = Number(display.innerText);
        }
        display.innerText = operate(num1, op, num2);
        num1 = Number(display.innerText);
        equation = display.innerText;
        num2 = 0;
        flag = true;
        reset = true;
    }
});

clearBtn.addEventListener('click', () => {
    display.innerText = '0';
    num1 = num2 = 0;
    op = '';
    equation = '';
    flag = true;
});

delBtn.addEventListener('click', () => {
    if(display.innerText.length === 1){
        display.innerText = '0';
        flag = true;
        equation = '';
    }
    else{
        display.innerText = display.innerText.slice(0, -1);
        equation = equation.slice(0, -1);
    }
});

// functions
function add(num1, num2){
    return (num1.toFixed(2)*100 + num2.toFixed(2)*100)/100;
}
function subtract(num1, num2){
    return (num1.toFixed(2)*100 - num2.toFixed(2)*100)/100;
}
function multiply(num1, num2){
    return (num1.toFixed(2)*100 * num2.toFixed(2)*100)/100;
}
function divide(num1, num2){
    return (num1.toFixed(2)*100 / num2.toFixed(2)*100)/100;
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