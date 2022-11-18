import React from "react";

const ScratchBar = (props) => { // with backend: remove planets from state variable and then in componentDidMount make API call to get planets, add to setState
    
    const barSquares = [];
    if (props.state.myCat.scratches > 0){
        for (let i = 0; i < props.state.myCat.scratches; i++) {
            barSquares.push(<div className="scratchSquare" key={i}> <div className="emptyScratch"/> </div>);
        }
    }
    const remaining = barSquares.length; 
    for (let i = 0; i < 5-remaining; i++){
        barSquares.push(<div className="emptySquare" key={Math.random()}><div className="emptyScratch"/> </div>)
    }

    console.log("SCRATCHES: " + props.state.myCat.scratches);

    return(
        <React.Fragment>
            <p className="centeredText">Scratches</p>
            <div className="scratchBar">
                <div className="break"/>
                {barSquares}
            </div>
        </React.Fragment>
    )
}

export default ScratchBar;