import ActionBody from "./ActionBody";

export default class ResistCard_F_Body extends ActionBody{
    cardName;
    symbol;
    constructor(symbol){
        super();
        this.cardName = "ResistCard_F";
        this.symbol = symbol.toUpperCase();
    }

    getBody(state){
        // let cat = state.cats[state.currTurn];
        let cat = state.myCat;
        let planet = state.planets.filter(aPlanet => aPlanet.position === cat.currPlanet);
        console.log(this.symbol);
        let body = {
            playerId: cat.playerId,
            planetPosition: planet.position,
            cardName: this.cardName,
            actionName: 'playCard',
            symbol: this.symbol,
            targetCats: null
        };
        return JSON.stringify(body);;
    }
}