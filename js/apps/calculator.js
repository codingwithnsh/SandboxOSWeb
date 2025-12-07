// Calculator Application

function openCalculator() {
    const windowId = windowManager.createWindow({
        title: 'Calculator',
        width: 350,
        height: 500,
        content: `
            <div class="calculator-display" id="calc-display">0</div>
            <div class="calculator-buttons" id="calc-buttons"></div>
        `
    });

    const display = document.getElementById('calc-display');
    let currentValue = '0';
    let previousValue = '';
    let operation = null;

    const buttons = [
        ['C', '⌫', '%', '/'],
        ['7', '8', '9', '*'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0', '.', '=', '']
    ];

    const buttonsContainer = document.getElementById('calc-buttons');
    
    buttons.forEach(row => {
        row.forEach(btn => {
            if (!btn) return;
            
            const button = document.createElement('button');
            button.className = 'calculator-button';
            button.textContent = btn;
            
            if (['+', '-', '*', '/', '='].includes(btn)) {
                button.classList.add('operator');
            }
            
            button.addEventListener('click', () => handleButtonClick(btn));
            buttonsContainer.appendChild(button);
        });
    });

    function handleButtonClick(value) {
        if (value === 'C') {
            currentValue = '0';
            previousValue = '';
            operation = null;
            display.textContent = currentValue;
        } else if (value === '⌫') {
            currentValue = currentValue.slice(0, -1) || '0';
            display.textContent = currentValue;
        } else if (value === '=') {
            if (operation && previousValue !== '') {
                try {
                    const result = safeEval(`${previousValue} ${operation} ${currentValue}`);
                    currentValue = String(result);
                    display.textContent = currentValue;
                    previousValue = '';
                    operation = null;
                } catch (e) {
                    display.textContent = 'Error';
                    currentValue = '0';
                }
            }
        } else if (['+', '-', '*', '/', '%'].includes(value)) {
            if (operation && previousValue !== '') {
                try {
                    const result = safeEval(`${previousValue} ${operation} ${currentValue}`);
                    currentValue = String(result);
                    display.textContent = currentValue;
                } catch (e) {
                    display.textContent = 'Error';
                    currentValue = '0';
                }
            }
            previousValue = currentValue;
            currentValue = '0';
            operation = value;
        } else {
            if (currentValue === '0') {
                currentValue = value;
            } else {
                currentValue += value;
            }
            display.textContent = currentValue;
        }
    }
}
