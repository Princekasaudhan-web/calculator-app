
const display = document.getElementById('display');
let currentInput = '';
let isCalculationDone = false;


function appendNumber(number) {
    
    if (isCalculationDone) {
        currentInput = '';
        isCalculationDone = false;
    }
    
    
    if (number === '.' && currentInput.includes('.')) return;
    
    
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    
    updateDisplay();
}


function appendOperator(operator) {
    if (currentInput === '') return; 
    if (isCalculationDone) {
        isCalculationDone = false;
    }
    
    
    const lastChar = currentInput.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + operator; 
    } else {
        currentInput += operator;
    }
    
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    isCalculationDone = false;
    updateDisplay();
}


function updateDisplay() {
    display.innerText = currentInput || '0';
}


function calculate() {
    if (currentInput === '') return;
    try {
        let result = Function(`return ${currentInput}`)();
        if (result === Infinity || result === -Infinity) {
            currentInput = 'Error';
        } else {
            
            currentInput = Number(result.toFixed(4)).toString();
        }
        
        isCalculationDone = true;
    } catch (error) {
        currentInput = 'Error';
        isCalculationDone = true;
    }
    
    updateDisplay();
}