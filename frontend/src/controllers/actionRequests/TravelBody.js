import ActionBody from "./ActionBody";

export default class TravelBody extends ActionBody{

    constructor(){
        super();
    }

    getBody(state){
        let cat = state.myCat;
        let body = {
            playerId: cat.playerId,
            planetPosition: -1,
            cardName: null,
            actionName: 'travel',
            symbol: null,
            targetCats: null
        };
        return JSON.stringify(body);;
    }
}