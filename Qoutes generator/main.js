import { fetchAdvice } from './js/api.js';
import { updateQuoteText, setupTransitions } from './js/ui.js';

const quoteText = document.getElementById('quote-text');
const newQuoteButton = document.getElementById('new-quote');

async function displayNewQuote() {
  try {
    const advice = await fetchAdvice();
    updateQuoteText(quoteText, advice);
  } catch (error) {
    updateQuoteText(quoteText, 'Failed to fetch advice. Please try again.');
  }
}

// Setup initial state
setupTransitions(quoteText);
updateQuoteText(quoteText, 'Welcome! Click the button below to get your daily advice.');

// Only fetch advice when button is clicked
newQuoteButton.addEventListener('click', displayNewQuote);