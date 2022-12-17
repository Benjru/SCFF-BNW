import BonusEffect from "./BonusEffect";

export default class TakeTime extends BonusEffect{
    constructor(){
        super();
    }

    toggleEffect(prevState){
        return (
            {
                ...prevState,
                meowssion: {
                    ...prevState.meowssion,
                    numToHeal: 2
                }
            }
        );
    }

    checkConditions(state){
        console.log("***********************CHECKING CONDITIONS************************")
        console.log(state.meowssion);
        if (state.meowssion.heal.length === 2){
            console.log("returning true");
            return true;
        }
        console.log("returning false");
        return false;
    }

    getRequestBody(state){
        let body = {
            removeFascism: null,
            liberate: null,
            teleport: null,
            heal: state.meowssion.heal
        }
        return (
            body
        )
    }
}