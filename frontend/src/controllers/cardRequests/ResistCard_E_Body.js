import CardBody from "./CardBody";

export default class ResistCard_E_Body extends CardBody{
    cardName;
    travelDestination;
    constructor(travelDestination){
        super();
        this.travelDestination = travelDestination;
        this.cardName = '-2 Fascists';
    }

    getBody(state){
        let cat = state.cats[state.currTurn];
        // let planet = state.planets.filter(aPlanet => aPlanet.position === cat.currPlanet); // need to be able to select this
        let body = {
            playerId: cat.playerId,
            planetPosition: this.travelDestination,
            cardName: this.cardName,
            actionName: 'playCard',
            targetCats: null
        };
        return JSON.stringify(body);;
    }
}