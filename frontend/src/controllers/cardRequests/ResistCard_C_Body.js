import CardBody from "./CardBody";

export default class ResistCard_C_Body extends CardBody{
    cardName;
    constructor(){
        super();
        this.cardName = 'ResistCard_C';
    }

    getBody(state){
        let cat = state.cats[state.currTurn]
        let targetCats = [cat.name, cat.name];
        let body = {
            playerId: cat.playerId,
            planetPosition: -1,
            cardName: this.cardName,
            actionName: 'playCard',
            targetCats: targetCats,
            symbol: null
        };
        return JSON.stringify(body);
    }
}