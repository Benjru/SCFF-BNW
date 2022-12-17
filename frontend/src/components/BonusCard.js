import React, { Component } from "react";
import NewlineText from "./NewlineText";

class BonusCard extends Component{ // with backend: remove planets from state variable and then in componentDidMount make API call to get planets, add to setState

    render(){
        let bonusCardType;

        if (this.props.state.bonusCardDiscard.length > 0){
            bonusCardType = this.props.state.bonusCardDiscard[this.props.state.bonusCardDiscard.length-1];
        }

        console.log("BONUS CARD DISCARD: " + this.props.state.bonusCardDiscard);
        console.log("BONUS CARD TYPE: " + bonusCardType);

        const messageMap = new Map();
        messageMap.set('BonusCard_A', '-2 fascists from  anywhere on the board.\nThey can come off of different planets.');
        messageMap.set('BonusCard_B', 'Add +1 Liberation to anywhere. Also remove one scratch from one cat');
        messageMap.set('BonusCard_C', '-1 Fascist from anywhere. Then one cat may Teleport.');
        messageMap.set('BonusCard_D', 'Remove up to two scratches total from all cats.\nThese may be removed from different cats');


        return(
            <React.Fragment>
                {
                    bonusCardType?
                    <div className="bonusCardMessage">
                        <p className="bonusCardTitle">Bonus Card:</p>
                        <div className="break"></div>
                        <NewlineText text={messageMap.get(bonusCardType)}/>
                    </div>:
                    <React.Fragment/>
                }
            </React.Fragment>
        )
    }
}

export default BonusCard;