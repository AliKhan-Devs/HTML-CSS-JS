export class ReactionVessel {
    constructor() {
        this.currentReactants = [];
        this.liquidLevel = document.querySelector('.liquid-level');
        this.vesselElement = document.querySelector('.reaction-vessel');
    }

    updateVessel(equipmentType) {
        // Adjust liquid level height based on number of reactants
        const height = (this.currentReactants.length * 50) + '%';
        this.liquidLevel.style.height = height;

        // Set liquid color based on reactants
        if (this.currentReactants.length === 1) {
            this.liquidLevel.style.backgroundColor = this.currentReactants[0].color;
        } else if (this.currentReactants.length === 2) {
            this.liquidLevel.style.background = `linear-gradient(${this.currentReactants[0].color} 50%, ${this.currentReactants[1].color} 50%)`;
        }

        // Reset the vessel's shape by removing previous equipment shape classes
        this.vesselElement.classList.remove('test-tube', 'flask', 'beaker', 'flat');

        // Change the shape of the reaction vessel based on the equipment type
        if (equipmentType === "test-tube") {
            this.vesselElement.classList.add('test-tube');  // Apply test-tube shape
        } else if (equipmentType === "flask") {
            this.vesselElement.classList.add('flask');  // Apply flask shape
        } else if (equipmentType === "beaker") {
            this.vesselElement.classList.add('beaker');  // Apply beaker shape
        } else if (equipmentType === "burner") {
            this.vesselElement.classList.add('flat');  // Flat shape for burner
        } else if (equipmentType === "pipette") {
            this.vesselElement.classList.add('flat');  // Flat shape for pipette
        }
    }

    reset() {
        this.currentReactants = [];
        this.liquidLevel.style.height = '0';
        this.liquidLevel.style.backgroundColor = 'transparent';
        this.vesselElement.classList.remove('test-tube', 'flask', 'beaker', 'flat');  // Reset shape
    }

    addChemical(chemical, equipmentType) {
        if (this.currentReactants.length < 2) {
            this.currentReactants.push(chemical);
            this.updateVessel(equipmentType);  // Update shape based on equipment type
            return true;
        }
        return false;
    }

    setColor(color) {
        this.liquidLevel.style.background = color;
    }
}
