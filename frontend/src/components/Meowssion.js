import React from "react";
import NewlineText from "./NewlineText";

const Meowssion = (props) => { // with backend: remove planets from state variable and then in componentDidMount make API call to get planets, add to setState
    
    let currentMeowssion = "Meowssion_A"


    const messageMap = new Map();
    messageMap.set('Meowssion_A', 'To Score:\nThe secret agents must be with you when you add \nat least three liberation to one planet in a single turn');
    messageMap.set('Meowssion_B', 'To Score:\nThe secret agents must be with you when you play \nat least two Resist cards when you are on a planet with fascism');
    messageMap.set('Meowssion_C', 'To Score:\nThe secret agents must be with you when you remove \nat least two scratches from a cat in a single turn');
    messageMap.set('Meowssion_D', 'To Score:\nThe secret agents must be with you while you \nrestock on a planet with at least one fascist token');


    return(
        <React.Fragment>
                <div className="meowssion">
                    <p className="meowssionTitle">Meowssion:</p>
                    <div className="break"></div>
                    <NewlineText text={messageMap.get(currentMeowssion)}/>
                </div>
        </React.Fragment>
    )
}

export default Meowssion;