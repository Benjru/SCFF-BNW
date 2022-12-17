import React from "react";
import NewlineText from "./NewlineText";

const GalaxyNews = (props) => { // with backend: remove planets from state variable and then in componentDidMount make API call to get planets, add to setState
    
    let galaxyNewsType;

    if (props.state.galaxyNewsDiscard.length > 0){
        galaxyNewsType = props.state.galaxyNewsDiscard[props.state.galaxyNewsDiscard.length-1].cardId;
    }

    const messageMap = new Map();
    messageMap.set('GalaxyCard_A', '+1 to the fascism scale, you take one scratch.');
    messageMap.set('GalaxyCard_B', '+1 fascist to your planet. Every cat there takes one scratch.');
    messageMap.set('GalaxyCard_C', '+1 to the fascism scale then discard your entire hand.');
    messageMap.set('GalaxyCard_D', '+1 to the fascism scale, +1 fascist to the planet you are on,\nevery cat there takes one scratch.');
    messageMap.set('GalaxyCard_E', 'You take 2 scratches and return to your home planet.');


    return(
        <React.Fragment>
            {
                galaxyNewsType?
                <div className="galaxyNewsMessage">
                    <p className="galaxyNewsTitle">Galaxy News Card:</p>
                    <div className="break"></div>
                    <NewlineText text={messageMap.get(galaxyNewsType)}/>
                </div>:
                <React.Fragment/>
            }
        </React.Fragment>
    )
}

export default GalaxyNews;