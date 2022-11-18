import ActionBody from "./ActionBody";

export default class RestockBody extends ActionBody{

    constructor(){
        super();
    }

    getBody(state){
        let cat = state.cats[state.currTurn];
        let body = {
            playerId: cat.playerId,
            planetPosition: -1,
            cardName: null,
            actionName: 'restock',
            symbol: null,
            targetCats: null
        };
        return JSON.stringify(body);;
    }
}