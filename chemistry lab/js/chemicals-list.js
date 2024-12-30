import { getContrastColor, handleDragStart } from './utils.js';

export class ChemicalsList {
    constructor(chemicals) {
        this.chemicals = chemicals;
        this.listElement = document.getElementById('chemicalsList');
        this.searchInput = document.getElementById('searchChemicals');
        this.initialize();
    }

    initialize() {
        this.renderChemicals();
        this.setupSearch();
    }

    renderChemicals() {
        this.chemicals.forEach(chemical => {
            const chemicalElement = document.createElement('div');
            chemicalElement.className = 'chemical-item';
            chemicalElement.draggable = true;
            chemicalElement.innerHTML = `
                ${chemical.name}
                <div class="chemical-formula">${chemical.formula}</div>
            `;
            chemicalElement.style.backgroundColor = chemical.color;
            chemicalElement.style.color = getContrastColor(chemical.color);
            
            chemicalElement.addEventListener('dragstart', (e) => handleDragStart(e, chemical));
            
            this.listElement.appendChild(chemicalElement);
        });
    }

    setupSearch() {
        this.searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const chemicalItems = document.querySelectorAll('.chemical-item');
            
            chemicalItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(searchTerm) ? 'block' : 'none';
            });
        });
    }
}