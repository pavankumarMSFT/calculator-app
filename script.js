function appendValue(value) {
  document.getElementById('result').value += value;
}

function clearResult() {
  document.getElementById('result').value = '';
}

function calculateResult() {
  try {
    const result = eval(document.getElementById('result').value);
    document.getElementById('result').value = result;
  } catch {
    alert('Invalid input');
  }
}

function backspace() {
  const currentValue = document.getElementById('result').value;
  document.getElementById('result').value = currentValue.slice(0, -1);
}

// Scientific calculator functions
function calculateTrigFunction(type) {
  try {
    const value = parseFloat(document.getElementById('result').value);
    let result;
    
    // Convert to radians for JavaScript trig functions
    const radians = value * Math.PI / 180;
    
    switch(type) {
      case 'sin':
        result = Math.sin(radians);
        break;
      case 'cos':
        result = Math.cos(radians);
        break;
      case 'tan':
        result = Math.tan(radians);
        break;
      default:
        return;
    }
    
    document.getElementById('result').value = result;
  } catch {
    alert('Invalid input for trigonometric function');
  }
}

function calculateFunction(type) {
  try {
    let result;
    let value = document.getElementById('result').value;
    
    switch(type) {
      case 'sqrt':
        result = Math.sqrt(parseFloat(value));
        break;
      case 'log':
        result = Math.log10(parseFloat(value));
        break;
      case 'ln':
        result = Math.log(parseFloat(value));
        break;
      case 'pi':
        result = Math.PI;
        break;
      case 'exp':
        result = Math.exp(parseFloat(value));
        break;
      case 'percent':
        // Calculate percentage
        try {
          // This evaluates the expression then multiplies by 0.01
          result = eval(value) * 0.01;
        } catch {
          alert('Invalid expression for percentage calculation');
          return;
        }
        break;
      default:
        return;
    }
    
    document.getElementById('result').value = result;
  } catch {
    alert('Invalid input for function');
  }
}

function calculatePower(type) {
  try {
    const value = parseFloat(document.getElementById('result').value);
    let result;
    
    switch(type) {
      case 'square':
        result = Math.pow(value, 2);
        break;
      case 'cube':
        result = Math.pow(value, 3);
        break;
      default:
        return;
    }
    
    document.getElementById('result').value = result;
  } catch {
    alert('Invalid input for power function');
  }
}

// Add keyboard input support
document.addEventListener('keydown', function(event) {
  const key = event.key;
  
  // Numbers 0-9
  if (/^[0-9]$/.test(key)) {
    appendValue(key);
    animateButton(`button:contains('${key}')`);
  }
  // Operators
  else if (['+', '-', '*', '/'].includes(key)) {
    appendValue(key);
    
    // Map operators to their display characters for animation
    const operatorMap = {
      '+': '+',
      '-': '-',
      '*': '×',
      '/': '÷'
    };
    
    animateButton(`button:contains('${operatorMap[key]}')`);
  }
  // Decimal point
  else if (key === '.') {
    appendValue(key);
    animateButton(`button:contains('.')`);
  }
  // Enter key for calculation
  else if (key === 'Enter') {
    calculateResult();
    animateButton('.equals');
  }
  // Backspace for deleting last character
  else if (key === 'Backspace') {
    backspace();
    animateButton('button:contains("⌫")');
  }
  // Escape key for clearing
  else if (key === 'Escape') {
    clearResult();
    animateButton('.function');
  }
  // Parentheses
  else if (key === '(' || key === ')') {
    appendValue(key);
    animateButton(`button:contains('${key}')`);
  }
  // Power key (^)
  else if (key === '^') {
    appendValue('**');
    animateButton(`button:contains('xʸ')`);
  }
});

// Function to provide visual feedback when keys are pressed
function animateButton(selector) {
  const button = document.querySelector(selector);
  if (button) {
    button.classList.add('active');
    setTimeout(() => {
      button.classList.remove('active');
    }, 100);
  }
}

// Focus on the result input when the page loads
window.addEventListener('load', function() {
  document.getElementById('result').focus();
  
  // Update the keyboard hint
  document.querySelector('.keyboard-hint').textContent = 
    'Keyboard input supported (0-9, +, -, *, /, (), ^, Enter, Esc, Backspace)';
});