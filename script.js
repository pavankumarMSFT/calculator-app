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

// Add keyboard input support
document.addEventListener('keydown', function(event) {
  const key = event.key;
  
  // Numbers 0-9
  if (/^[0-9]$/.test(key)) {
    appendValue(key);
  }
  // Operators
  else if (['+', '-', '*', '/'].includes(key)) {
    appendValue(key);
  }
  // Decimal point
  else if (key === '.') {
    appendValue(key);
  }
  // Enter key for calculation
  else if (key === 'Enter') {
    calculateResult();
  }
  // Backspace for deleting last character
  else if (key === 'Backspace') {
    const currentValue = document.getElementById('result').value;
    document.getElementById('result').value = currentValue.slice(0, -1);
  }
  // Escape key for clearing
  else if (key === 'Escape') {
    clearResult();
  }
});