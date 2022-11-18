export default class CardBody{
    constructor(){
        if (this.constructor == CardBody) {
            throw new Error("Abstract classes can't be instantiated.");
        } 
    }

    getBody(state){
        throw new Error("Method getBody() must be implemented");
    }


}