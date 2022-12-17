import BonusEffect from "./BonusEffect";

export default class Turmoil extends BonusEffect{
    constructor(){
        super();
    }

    toggleEffect(prevState){
        return (
            {
                ...prevState,
                meowssion: {
                    ...prevState.meowssion,
                    numToRemoveFascismFrom: 1,
                    anyCatTeleport: true
                }
            }
        );
    }

    checkConditions(state){
        console.log("***********************CHECKING CONDITIONS************************")
        console.log(state.meowssion);
        if (state.meowssion.removeFascism.length === 1 && state.meowssion.teleport.catName && state.meowssion.teleport.planetPosition){
            console.log("returning true");
            return true;
        }
        console.log("returning false");
        return false;
    }

    getRequestBody(state){
        let body = {
            removeFascism: state.removeFascism,
            liberate: null,
            teleport: state.teleport,
            heal: null
        }
        return (
            JSON.stringify(body)
        )
    }
}


////////////////////// not sure