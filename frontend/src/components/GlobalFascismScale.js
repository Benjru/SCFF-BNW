import React from "react";

const GlobablFascismScale = (props) => { // with backend: remove planets from state variable and then in componentDidMount make API call to get planets, add to setState
    console.log("GlobalFascismScale props: " + props.state.globalFascismScale)
    const barSquares = [];
    if (props.state.globalFascismScale > 0){
        for (let i = 0; i < props.state.globalFascismScale; i++) {
            barSquares.push(<div className="fascistSquare" key={i}> <div className="emptyGlobal"/> </div>);
        }
    }
    for (let i = 0; i < 13; i++){
        barSquares.push(<div className="emptySquare" key={Math.random()}><div className="emptyGlobal"/> </div>)
    }

    return(
        <React.Fragment>
            <div className="globalFascismScale">
                {barSquares}
            </div>
        </React.Fragment>
    )
}

export default GlobablFascismScale;