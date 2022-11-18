import CardBody from "./CardBody";

export default class ResistCard_F_Body extends CardBody{
    cardName;
    constructor(symbol){
        super();
        this.cardName = symbol;
    }

    getBody(state){
        let cat = state.cats[state.currTurn];
        let planet = state.planets.filter(aPlanet => aPlanet.position === cat.currPlanet);
        let body = {
            playerId: cat.playerId,
            planetPosition: planet.position,
            cardName: this.cardName,
            actionName: 'playCard',
            targetCats: null
        };
        return JSON.stringify(body);;
    }
}