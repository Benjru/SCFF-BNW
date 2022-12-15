import ActionBody from "./ActionBody";

export default class ResistCard_B_Body extends ActionBody{
    cardName;
    targetCats;
    constructor(targetCats){
        super();
        this.cardName = 'ResistCard_B';
        this.targetCats = targetCats;
    }

    getBody(state){
        let cat = state.myCat;
        let body = {
            playerId: cat.playerId,
            planetPosition: -1,
            cardName: this.cardName,
            actionName: 'playCard',
            targetCats: this.targetCats,
            symbol: null
        };
        return JSON.stringify(body);
    }
}