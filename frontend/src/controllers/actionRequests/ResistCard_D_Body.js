import ActionBody from "./ActionBody";

export default class ResistCard_D_Body extends ActionBody{
    cardName;
    constructor(){
        super();
        this.cardName = 'ResistCard_D';
    }

    getBody(state){
        // let cat = state.cats[state.currTurn];
        let cat = state.myCat;
        let planet = state.planets.filter(aPlanet => aPlanet.position === cat.currPlanet);
        let body = {
            playerId: cat.playerId,
            planetPosition: planet.position,
            cardName: this.cardName,
            actionName: 'playCard',
            targetCats: null,
            symbol: null
        };
        return JSON.stringify(body);;
    }
}