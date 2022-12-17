import BonusEffect from "./BonusEffect";

export default class WelcomedAsHeroes extends BonusEffect{
    constructor(){
        super();
    }

    toggleEffect(prevState){
        return (
            {
                ...prevState,
                // myCat: {
                //     ...prevState.myCat,
                //     healing: true
                // },
                meowssion: {
                    ...prevState.meowssion,
                    numToAddLiberationTo: 1,
                    numToHeal: 1
                }
            }
        );
    }

    checkConditions(state){
        if (state.meowssion.liberate.length === 1 && state.meowssion.heal.length === 1){
            console.log("returning true");
            return true;
        }
        console.log("returning false");
        return false;
    }

    getRequestBody(state){
        let body = {
            removeFascism: [],
            liberate: state.liberate,
            teleport: {},
            heal: state.heal
        }
        return (
            JSON.stringify(body)
        )
    }
}