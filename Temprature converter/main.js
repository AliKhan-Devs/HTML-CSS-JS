import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  celsiusToKelvin,
  kelvinToCelsius,
  fahrenheitToKelvin,
  kelvinToFahrenheit,
  formatNumber
} from '/conversions.js';

const fromValue = document.getElementById('fromValue');
const toValue = document.getElementById('toValue');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const fromUnitSymbol = document.getElementById('fromUnitSymbol');
const toUnitSymbol = document.getElementById('toUnitSymbol');
const resetButton = document.getElementById('reset');
const swapButton = document.getElementById('swap');

const unitSymbols = {
  celsius: '°C',
  fahrenheit: '°F',
  kelvin: 'K'
};

function updateUnitSymbols() {
  fromUnitSymbol.textContent = unitSymbols[fromUnit.value];
  toUnitSymbol.textContent = unitSymbols[toUnit.value];
}

function convert(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;
  
  const conversions = {
    'celsius-fahrenheit': celsiusToFahrenheit,
    'celsius-kelvin': celsiusToKelvin,
    'fahrenheit-celsius': fahrenheitToCelsius,
    'fahrenheit-kelvin': fahrenheitToKelvin,
    'kelvin-celsius': kelvinToCelsius,
    'kelvin-fahrenheit': kelvinToFahrenheit
  };

  const key = `${fromUnit}-${toUnit}`;
  return conversions[key](value);
}

function updateResult() {
  const value = parseFloat(fromValue.value);
  if (!isNaN(value)) {
    const result = convert(value, fromUnit.value, toUnit.value);
    toValue.value = formatNumber(result);
  } else {
    toValue.value = '';
  }
}

// Event Listeners
fromValue.addEventListener('input', updateResult);
fromUnit.addEventListener('change', () => {
  updateUnitSymbols();
  updateResult();
});

toUnit.addEventListener('change', () => {
  updateUnitSymbols();
  updateResult();
});

resetButton.addEventListener('click', () => {
  fromValue.value = '';
  toValue.value = '';
});

swapButton.addEventListener('click', () => {
  const tempUnit = fromUnit.value;
  const tempValue = fromValue.value;
  
  fromUnit.value = toUnit.value;
  toUnit.value = tempUnit;
  fromValue.value = toValue.value;
  
  updateUnitSymbols();
  updateResult();
});

// Initialize unit symbols
updateUnitSymbols();