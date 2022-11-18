import CardBody from "./CardBody";

export default class ResistCard_D_Body extends CardBody{
    cardName;
    constructor(){
        super();
        this.cardName = '-2 Fascists';
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