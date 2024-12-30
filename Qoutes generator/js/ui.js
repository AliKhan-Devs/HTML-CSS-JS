export function updateQuoteText(element, text) {
  element.style.opacity = 0;
  
  setTimeout(() => {
    element.textContent = text;
    element.style.opacity = 1;
  }, 100);
}

export function setupTransitions(element) {
  element.style.transition = 'opacity 0.5s ease-in-out';
}