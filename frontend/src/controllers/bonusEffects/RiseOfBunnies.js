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
        console.log("***********************CHECKING CONDITIONS************************")
        console.log(state.meowssion.removeFascism);
        if (state.meowssion.removeFascism.length === 2){
            console.log("returning true");
            return true;
        }
        console.log("returning false");
        return false;
    }

    getRequestBody(state){
        console.log("***********************GETTING REQUEST BODY************************")
        let body = {
            removeFascism: state.removeFascism,
            liberate: null,
            teleport: null,
            heal: null
        }
        return (
            body
        )
    }
}