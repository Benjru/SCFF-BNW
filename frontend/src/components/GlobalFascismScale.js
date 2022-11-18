import React from "react";

const GlobablFascismScale = (props) => { // with backend: remove planets from state variable and then in componentDidMount make API call to get planets, add to setState
    console.log("GlobalFascismScale props: " + props.state.globalFascismScale)
    const barSquares = [];
    let galaxyNewsType;
    if (props.state.globalFascismScale > 0){
        for (let i = 0; i < props.state.globalFascismScale; i++) {
            barSquares.push(<div className="fascistSquare" key={i}> <div className="emptyGlobal"/> </div>);
        }
    }
    for (let i = 0; i < 13; i++){
        barSquares.push(<div className="emptySquare" key={Math.random()}><div className="emptyGlobal"/> </div>)
    }

    console.log("globalFascism props: " + JSON.stringify(props.state))
    console.log(props.state.galaxyNewsDiscard);
    if (props.state.galaxyNewsDiscard.length > 0){
        galaxyNewsType = props.state.galaxyNewsDiscard[props.state.galaxyNewsDiscard.length-1].cardId;
    }

    const messageMap = new Map();
    messageMap.set('GalaxyCard_A', '+1 to the fascism scale, you take one scratch.');
    messageMap.set('GalaxyCard_B', '+1 fascist to your planet. Every cat there takes one scratch.');
    messageMap.set('GalaxyCard_C', '+1 to the fascism scale then discard your entire hand.');
    messageMap.set('GalaxyCard_D', '+1 to the fascism scale, +1 fascist to the planet you are on, every cat there takes one scratch.');
    messageMap.set('GalaxyCard_E', 'You take 2 scratches and return to your home planet.');


    return(
        <React.Fragment>
            <div className="globalFascismScale">
                {barSquares}
            </div>
            {
                galaxyNewsType?
                <div className="galaxyNewsMessage">
                    <p>Galaxy News Card:</p>
                    <div className="break"></div>
                    <p>{`${messageMap.get(galaxyNewsType)}`}</p>
                </div>:
                <React.Fragment/>
            }
        </React.Fragment>
    )
}

export default GlobablFascismScale;