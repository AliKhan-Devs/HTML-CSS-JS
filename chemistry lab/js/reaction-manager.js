export class ReactionManager {
    constructor(reactions, vessel) {
        this.reactions = reactions;
        this.vessel = vessel;
        this.reactionDetails = document.getElementById('reactionDetails');
    }

    findReaction(reactant1, reactant2) {
        return this.reactions.find(reaction => {
            const reactants = reaction.reactants.sort();
            const testReactants = [reactant1, reactant2].sort();
            return reactants[0] === testReactants[0] && reactants[1] === testReactants[1];
        });
    }

    checkReaction() {
        if (this.vessel.currentReactants.length !== 2) return;

        const reaction = this.findReaction(
            this.vessel.currentReactants[0].formula,
            this.vessel.currentReactants[1].formula
        );

        if (reaction) {
            this.reactionDetails.innerHTML = '';
            this.reactionDetails.innerHTML = `
                <h3>Reaction Occurred!</h3>
                <p>${reaction.equation}</p>
            `;
            
            setTimeout(() => {
                this.vessel.setColor(reaction.color);
            }, 1000);
        } else {
            this.reactionDetails.innerHTML = `
                
                <p>No reaction found.</p>
            `;
        }
    }

    reset() {
        this.reactionDetails.innerHTML = '';
        this.reactionDetails.innerHTML = `
            <p>Drag and drop chemicals to start a reaction</p>
        `;
        
    }
}