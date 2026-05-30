const API_URL = 'http://127.0.0.1:8080/api';

let currentValue = '0';
let firstOperand = null;
let activeOperator = null;
let shouldResetDisplay = false;
let isComputing = false;

const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
const statusDisplay = document.getElementById('status');

const operatorSymbols = {
    sum: '+',
    subtraction: '−',
    multiplication: '×',
    division: '÷'
};

const keyboardOperators = {
    '+': 'sum',
    '-': 'subtraction',
    '*': 'multiplication',
    'x': 'multiplication',
    'X': 'multiplication',
    '/': 'division'
};

function updateDisplay() {
    display.innerText = currentValue;
}

function setStatus(text) {
    statusDisplay.innerText = text;
}

function appendNumber(number) {
    if (isComputing) return;

    if ((currentValue === '0' && number !== '.') || shouldResetDisplay) {
        currentValue = number;
        shouldResetDisplay = false;
    } else {
        if (number === '.' && currentValue.includes('.')) return;
        currentValue += number;
    }

    updateDisplay();
}

function clearAll() {
    currentValue = '0';
    firstOperand = null;
    activeOperator = null;
    shouldResetDisplay = false;
    isComputing = false;
    historyDisplay.innerText = '';
    setStatus('Online');
    updateDisplay();
}

function deleteLastDigit() {
    if (isComputing || shouldResetDisplay) return;

    if (currentValue.length <= 1 || currentValue === 'Erro') {
        currentValue = '0';
    } else {
        currentValue = currentValue.slice(0, -1);
    }

    updateDisplay();
}

// Transformada em async para poder esperar o cálculo da operação anterior
async function chooseOperator(operator) {
    if (isComputing) return;

    // Se já existe uma operação em andamento e o usuário digitou um novo número
    if (activeOperator !== null && !shouldResetDisplay) {
        const success = await compute();
        if (!success) return; // Se deu erro na API, interrompe
    }

    // Define o resultado anterior (ou número atual) como o primeiro operando da NOVA operação
    firstOperand = parseFloat(currentValue);
    activeOperator = operator;
    shouldResetDisplay = true;
    historyDisplay.innerText = `${firstOperand} ${operatorSymbols[operator]}`;
}

// Alterada para retornar um booleano indicando o sucesso do cálculo
async function compute() {
    if (activeOperator === null || shouldResetDisplay || isComputing) return false;

    const secondOperand = parseFloat(currentValue);
    historyDisplay.innerText = `${firstOperand} ${operatorSymbols[activeOperator]} ${secondOperand} =`;

    const requestBody = {
        num1: firstOperand,
        num2: secondOperand
    };

    try {
        isComputing = true;
        setStatus('Calculando...');

        const response = await fetch(`${API_URL}/${activeOperator}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('Erro na operação');
        }

        const data = await response.json();
        const result = Object.values(data)[0];

        currentValue = String(result);
        firstOperand = result;
        activeOperator = null;
        shouldResetDisplay = true;
        setStatus('Online');
        updateDisplay();
        return true; // Retorna verdadeiro se o cálculo deu certo

    } catch (error) {
        currentValue = 'Erro';
        firstOperand = null;
        activeOperator = null;
        shouldResetDisplay = true;
        setStatus('Erro na API');
        updateDisplay();
        return false; // Retorna falso se houve erro

    } finally {
        isComputing = false;
    }
}

function animateButton(key) {
    const normalizedKey = key === 'Enter' || key === '=' ? 'enter' : key;
    const button = document.querySelector(`[data-key="${normalizedKey}"]`);

    if (!button) return;

    button.classList.add('pressed');

    setTimeout(() => {
        button.classList.remove('pressed');
    }, 120);
}

document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (!isNaN(Number(key))) {
        event.preventDefault();
        animateButton(key);
        appendNumber(key);
        return;
    }

    if (key === '.' || key === ',') {
        event.preventDefault();
        animateButton('.');
        appendNumber('.');
        return;
    }

    if (keyboardOperators[key]) {
        event.preventDefault();
        animateButton(key);
        chooseOperator(keyboardOperators[key]);
        return;
    }

    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        animateButton('Enter');
        compute();
        return;
    }

    if (key === 'Backspace') {
        event.preventDefault();
        deleteLastDigit();
        return;
    }

    if (key === 'Escape' || key.toLowerCase() === 'c') {
        event.preventDefault();
        animateButton('c');
        clearAll();
    }
});

updateDisplay();