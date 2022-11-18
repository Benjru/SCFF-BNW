import ActionBody from "./ActionBody";

export default class ResistCard_B_Body extends ActionBody{
    cardName;
    constructor(){
        super();
        this.cardName = 'ResistCard_B';
    }

    getBody(state){
        // let cat = state.cats[state.currTurn]
        let cat = state.myCat;
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