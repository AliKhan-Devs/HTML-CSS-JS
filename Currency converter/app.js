const API_KEY = 'b409c3a101aea1d6e333dd43';
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

// DOM Elements
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');
const swapBtn = document.getElementById('swapBtn');
const themeToggle = document.getElementById('themeToggle');
const fromFlag = document.getElementById('fromFlag');
const toFlag = document.getElementById('toFlag');

// Populate currency dropdowns
function populateCurrencies() {
    for (const currency in countries) {
        const fromOption = document.createElement('option');
        const toOption = document.createElement('option');
        
        fromOption.value = currency;
        fromOption.text = currency;
        toOption.value = currency;
        toOption.text = currency;
        
        fromCurrency.add(fromOption);
        toCurrency.add(toOption);
    }
    
    // Set default values
    fromCurrency.value = 'USD';
    toCurrency.value = 'JPY';
    updateFlags();
}

// Update flags
function updateFlags() {
    const fromCountry = countries[fromCurrency.value];
    const toCountry = countries[toCurrency.value];
    
    fromFlag.src = `https://flagsapi.com/${fromCountry}/flat/64.png`;
    toFlag.src = `https://flagsapi.com/${toCountry}/flat/64.png`;
}

// Convert currency
async function convertCurrency() {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;
    
    try {
        const response = await fetch(`${BASE_URL}/${API_KEY}/latest/${from}`);
        const data = await response.json();
        
        if (data.result === 'success') {
            const rate = data.conversion_rates[to];
            const convertedAmount = (amount * rate).toFixed(2);
            result.innerHTML = `
                <p>${amount} ${from} = ${convertedAmount} ${to}</p>
                <p>1 ${from} = ${rate.toFixed(4)} ${to}</p>
            `;
        }
    } catch (error) {
        result.innerHTML = '<p>Error: Could not convert currency</p>';
    }
}

// Swap currencies
function swapCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    updateFlags();
    convertCurrency();
}

// Toggle theme
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
}

// Event listeners
window.addEventListener('load', () => {
    populateCurrencies();
    convertCurrency();
});

fromCurrency.addEventListener('change', () => {
    updateFlags();
    convertCurrency();
});

toCurrency.addEventListener('change', () => {
    updateFlags();
    convertCurrency();
});

convertBtn.addEventListener('click', convertCurrency);
swapBtn.addEventListener('click', swapCurrencies);
themeToggle.addEventListener('click', toggleTheme);

// Input validation
amountInput.addEventListener('input', (e) => {
    if (e.target.value < 0) {
        e.target.value = Math.abs(e.target.value);
    }
    convertCurrency();
});