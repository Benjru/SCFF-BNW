import CardBody from "./CardBody";

export default class ResistCard_F_Body extends CardBody{
    cardName;
    constructor(symbol){
        super();
        this.cardName = "ResistCard_F";
        this.symbol = symbol;
    }

    getBody(state){
        let cat = state.cats[state.currTurn];
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