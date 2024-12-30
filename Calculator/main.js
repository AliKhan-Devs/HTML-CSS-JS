let display = document.querySelector('.display');
let currentValue = '0';


// Use window. to make the function global instead of getting each element by their id

window.appendToDisplay = function (value) {
  if (currentValue === '0') {
    currentValue = value;
  } else {
    currentValue += value;
  }
  updateDisplay();
}

window.clearDisplay = function () {
  currentValue = '0';
  updateDisplay();
}

window.toggleSign = function () {
  try {
    currentValue = String(-eval(currentValue));
    updateDisplay();
  } catch (e) {
    currentValue = 'Error';
    updateDisplay();
  }
}

window.percentage = function () {
  try {
    currentValue = String(eval(currentValue) / 100);
    updateDisplay();
  } catch (e) {
    currentValue = 'Error';
    updateDisplay();
  }
}

window.calculate = function () {
  try {
    currentValue = String(eval(currentValue));

    updateDisplay();
  } catch (e) {
    currentValue = 'Error';
    updateDisplay();
  }
}
window.deleteLast = function () {
  if (currentValue.length > 1) { 
    currentValue = currentValue.slice(0, -1); 
  }
  else { 
    currentValue = '0'; 
  } 
  updateDisplay();
}

function updateDisplay() {
  // Format number to handle scientific notation and long decimals
  let displayValue = currentValue;
  if (!isNaN(displayValue) && displayValue !== 'Error') {
    const num = Number(displayValue);
    displayValue = num.toString().length > 10 ? num.toExponential(6) : num;
  }
  display.textContent = displayValue;
}