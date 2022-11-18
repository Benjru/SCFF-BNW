import CardBody from "./CardBody";

export default class ResistCard_B_Body extends CardBody{
    cardName;
    constructor(){
        super();
        this.cardName = 'ResistCard_B';
    }

    getBody(state){
        let cat = state.cats[state.currTurn]
        let targetCats = [cat.name];
        let body = {
            playerId: cat.playerId,
            planetPosition: -1,
            cardName: this.cardName,
            actionName: 'playCard',
            targetCats: targetCats,
            symbol: null
        };
        return JSON.stringify(body);;
    }
}