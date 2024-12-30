// State management
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let totalBalance = 0;

// DOM Elements
const totalBalanceEl = document.getElementById('total-balance');
const transactionForm = document.getElementById('transaction-form');
const transactionsList = document.getElementById('transactions-list');
const expenseChart = document.getElementById('expense-chart');
const barChartEl = document.getElementById('bar-chart');

// Initialize Charts
let chart, barChart;

function initCharts() {
    // Doughnut Chart: Expenses by Category
    const ctx = expenseChart.getContext('2d');
    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#3b82f6', '#ef4444', '#34d399', '#f59e0b',
                    '#8b5cf6', '#ec4899'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'right', labels: { color: '#f3f4f6' }},
                title: { display: true, text: 'Expenses by Category', color: '#f3f4f6', font: { size: 16 }}
            }
        }
    });

    // Bar Chart: Income vs Expense
    const barCtx = barChartEl.getContext('2d');
    barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Income', 'Expense'],
            datasets: [{
                label: 'Total',
                data: [0, 0], // Initial data
                backgroundColor: ['#34d399', '#ef4444'],
                borderColor: ['#2ddf78', '#c83a36'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, ticks: { color: '#f3f4f6' }},
                x: { ticks: { color: '#f3f4f6' }}
            },
            plugins: {
                legend: { position: 'top', labels: { color: '#f3f4f6' }}
            }
        }
    });
}

function updateCharts() {
    // Doughnut chart: Expenses by Category
    const expensesByCategory = {};
    transactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
            expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + parseFloat(t.amount);
        });

    chart.data.labels = Object.keys(expensesByCategory);
    chart.data.datasets[0].data = Object.values(expensesByCategory);
    chart.update();

    // Bar chart: Total Income vs Total Expenses
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + parseFloat(t.amount), 0);
    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + parseFloat(t.amount), 0);

    barChart.data.datasets[0].data = [totalIncome, totalExpense];
    barChart.update();
}

function updateBalance() {
    totalBalance = transactions.reduce((acc, t) => {
        return t.type === 'income' 
            ? acc + parseFloat(t.amount) 
            : acc - parseFloat(t.amount);
    }, 0);
  
    totalBalanceEl.textContent = `$${totalBalance.toFixed(2)}`;
}

function addTransaction(e) {
    e.preventDefault();

    const transaction = {
        id: Date.now(),
        description: document.getElementById('description').value,
        amount: document.getElementById('amount').value,
        type: document.getElementById('type').value,
        category: document.getElementById('category').value,
        date: new Date().toISOString()
    };

    transactions.unshift(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    updateBalance();
    updateTransactionsList();
    updateCharts();

    e.target.reset();
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    updateBalance();
    updateTransactionsList();
    updateCharts();
}

function editTransaction(id) {
    const transaction = transactions.find(transaction => transaction.id === id);
    if (transaction) {
        document.getElementById('description').value = transaction.description;
        document.getElementById('amount').value = transaction.amount;
        document.getElementById('type').value = transaction.type;
        document.getElementById('category').value = transaction.category;

        deleteTransaction(id); // Remove the old transaction while editing
    }
}

function updateTransactionsList() {
    transactionsList.innerHTML = transactions
        .map(t => `
            <div class="transaction-item" data-id="${t.id}">
                <div class="transaction-info">
                    <strong>${t.description}</strong>
                    <div>${t.category}</div>
                    <small>${new Date(t.date).toLocaleDateString()}</small>
                </div>
                <span class="transaction-amount ${t.type}">
                    ${t.type === 'income' ? '+' : '-'}$${parseFloat(t.amount).toFixed(2)}
                </span>
                <div class="transaction-actions">
                    <i class="fa-solid fa-pencil edit-btn"></i>
                    <i class="fa-solid fa-trash delete-btn"></i>
                </div>
            </div>
        `)
        .join('');

    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.transaction-item').dataset.id);
            editTransaction(id);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.transaction-item').dataset.id);
            deleteTransaction(id);
        });
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    transactionForm.addEventListener('submit', addTransaction);

    // Initialize
    initCharts();
    updateBalance();
    updateTransactionsList();
    updateCharts();
});
