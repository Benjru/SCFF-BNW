import React, { Component } from "react";
import NewlineText from "./NewlineText";

class BonusCard extends Component{ // with backend: remove planets from state variable and then in componentDidMount make API call to get planets, add to setState

    render(){
        let meowssionAwardType;

        if (this.props.state.meowssionAwardDiscard.length > 0){
            meowssionAwardType = this.props.state.meowssionAwardDiscard[this.props.state.meowssionAwardDiscard.length-1];
        }

        console.log("BONUS CARD DISCARD: " + this.props.state.meowssionAwardDiscard);
        console.log("BONUS CARD TYPE: " + meowssionAwardType);

        const messageMap = new Map();
        messageMap.set('RiseOfBunnies', '-2 fascists from  anywhere on the board.\nThey can come off of different planets.');
        messageMap.set('WelcomedAsHeroes', 'Add +1 Liberation to anywhere. Also remove one scratch from one cat');
        messageMap.set('Turmoil', '-1 Fascist from anywhere. Then one cat may Teleport.');
        messageMap.set('TakeTime', 'Remove up to two scratches total from all cats.\nThese may be removed from different cats');


        return(
            <React.Fragment>
                {
                    meowssionAwardType?
                    <div className="meowssionAwardMessage">
                        <p className="meowssionAwardTitle">Bonus Card:</p>
                        <div className="break"></div>
                        <NewlineText text={messageMap.get(meowssionAwardType)}/>
                    </div>:
                    <React.Fragment/>
                }
            </React.Fragment>
        )
    }
}

export default BonusCard;