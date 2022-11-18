import ActionBody from "./ActionBody";

export default class ResistCard_E_Body extends ActionBody{
    cardName;
    travelDestination;
    constructor(travelDestination){
        super();
        this.travelDestination = travelDestination;
        this.cardName = 'ResistCard_E';
    }

    getBody(state){
        // let cat = state.cats[state.currTurn];
        // let planet = state.planets.filter(aPlanet => aPlanet.position === cat.currPlanet); // need to be able to select this
        let cat = state.myCat;
        let body = {
            playerId: cat.playerId,
            planetPosition: this.travelDestination,
            cardName: this.cardName,
            actionName: 'playCard',
            targetCats: null,
            symbol: null
        };
        return JSON.stringify(body);;
    }
}