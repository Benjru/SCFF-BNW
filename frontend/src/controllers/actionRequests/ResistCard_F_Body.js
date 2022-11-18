import ActionBody from "./ActionBody";

export default class ResistCard_F_Body extends ActionBody{
    cardName;
    constructor(symbol){
        super();
        this.cardName = "ResistCard_F";
        this.symbol = symbol.toUpperCase();
    }

    getBody(state){
        // let cat = state.cats[state.currTurn];
        let cat = state.myCat[0];
        let body = {
            playerId: cat.playerId,
            planetPosition: -1,
            cardName: this.cardName,
            actionName: 'playCard',
            symbol: this.symbol,
            targetCats: null
        };
        return JSON.stringify(body);;
    }
}