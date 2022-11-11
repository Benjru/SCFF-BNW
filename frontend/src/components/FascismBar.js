import React from "react";

const FascismBar = (props) => { // if fascism level negative, loop through absolute value times, otherwise loop through regular amount
    console.log("props: " + props.fascismLevel)
    const barSquares = [];
    if (props.fascismLevel < 0){
        for (let i = 0; i < -props.fascismLevel; i++) {
            barSquares.push(<div className="liberationSquare" key={-i}> <div className="empty"/> </div>);
        }
    }
    else if (props.fascismLevel > 0){
        for (let i = 0; i < props.fascismLevel; i++) {
            barSquares.push(<div className="fascistSquare" key={i}><div className="empty"/> </div>);
        }
    }
    const remaining = barSquares.length;
    for (let i = 0; i < 4-remaining; i++){
        barSquares.push(<div className="emptySquare" key={Math.random()}><div className="empty"/> </div>)
    }
    return (
        <div className="fascismLevelBar">
            {barSquares}
        </div>
    )
};

export default FascismBar;