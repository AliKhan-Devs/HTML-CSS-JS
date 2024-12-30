import { chemicals } from './chemicals.js';
import { reactions } from './reactions.js';
import { handleDragOver } from './js/utils.js';
import { ReactionVessel } from './js/vessel.js';
import { ChemicalsList } from './js/chemicals-list.js';
import { ReactionManager } from './js/reaction-manager.js';

class ChemistryLab {
    constructor() {
        this.vessel = new ReactionVessel();
        this.chemicalsList = new ChemicalsList(chemicals);
        this.reactionManager = new ReactionManager(reactions, this.vessel);
        this.setupEventListeners();
    }

    setupEventListeners() {
        const container = document.getElementById('reactionContainer');

        container.addEventListener('dragover', handleDragOver);
        container.addEventListener('drop', (e) => this.handleDrop(e));

        // Setup reset and clean buttons using correct IDs
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('cleanBtn').addEventListener('click', () => this.reset());
    }

    handleDrop(e) {
        e.preventDefault();
        try {
            const chemical = JSON.parse(e.dataTransfer.getData('application/json'));
            const equipmentType = e.target.dataset.type; // Get the type of the dropped equipment (e.g., flask, beaker, burner, pipette)

            if (this.vessel.addChemical(chemical, equipmentType)) {
                this.reactionManager.checkReaction();
            }
        } catch (error) {
            console.error('Error processing drop:', error);
        }
    }



    reset() {
        this.vessel.reset();
        this.reactionManager.reset();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new ChemistryLab();
});

