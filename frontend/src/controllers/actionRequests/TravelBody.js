import ActionBody from "./ActionBody";

export default class TravelBody extends ActionBody{

    planetPosition;
    constructor(planetPosition){
        super();
        this.planetPosition = planetPosition
    }

    getBody(state){
        let cat = state.myCat;
        let body = {
            playerId: cat.playerId,
            planetPosition: this.planetPosition,
            cardName: null,
            actionName: 'travel',
            symbol: null,
            targetCats: null
        };
        return JSON.stringify(body);;
    }
}