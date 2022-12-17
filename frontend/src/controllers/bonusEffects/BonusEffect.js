export default class BonusEffect{
    constructor(){
        if (this.constructor == BonusEffect) {
            throw new Error("Abstract classes can't be instantiated.");
        } 
    }

    toggleEffect(){
        throw new Error("Method toggleEffect() must be implemented");
    }

    checkConditions(){
        throw new Error("Method checkConditions() must be implemented");
    }

    getRequestBody(){
        throw new Error("Method getRequestBody() must be implemented");
    }

}