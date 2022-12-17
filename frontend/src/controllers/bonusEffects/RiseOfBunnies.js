import BonusEffect from "./BonusEffect";

export default class RiseOfBunnies extends BonusEffect{
    constructor(){
        super();
    }

    toggleEffect(prevState){
        return (
            {
                ...prevState,
                meowssion:{
                    ...prevState.meowssion,
                    numToRemoveFascismFrom: 2
                }
            }
        );
    }

    checkConditions(state){
        console.log(state.meowssion.removeFascism);
        if (state.meowssion.removeFascism.length === 2){
            console.log("returning true");
            return true;
        }
        console.log("returning false");
        return false;
    }

    getRequestBody(state){
        let body = {
            removeFascism: state.removeFascism,
            liberate: [],
            teleport: {},
            heal: []
        }
        return (
            JSON.stringify(body)
        )
    }
}