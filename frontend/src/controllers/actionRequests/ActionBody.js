export default class ActionBody{
    constructor(){
        if (this.constructor == ActionBody) {
            throw new Error("Abstract classes can't be instantiated.");
        } 
    }

    getBody(state){
        throw new Error("Method getBody() must be implemented");
    }

}