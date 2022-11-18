import ActionBody from "./ActionBody";

export default class FightFascismBody extends ActionBody{

    constructor(){
        super();
    }

    getBody(state){
        let cat = state.myCat;
        let planet = state.planets.filter(aPlanet => aPlanet.position === cat.currPlanet);
        let body = {
            playerId: cat.playerId,
            planetPosition: planet.position,
            cardName: null,
            actionName: 'fightFascism',
            symbol: null,
            targetCats: null
        };
        return JSON.stringify(body);;
    }
}