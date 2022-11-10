import React from "react";

const Planet = (props) => (
    <div>
        <p className="planetLabel">{props.boardSquare.planet}</p> 
        {
            props.boardSquare.cat === null ?
            <img className="planetImage"
                src={`/planets/${props.boardSquare.planet}-planet.jpg`} 
                alt={props.boardSquare.planet}
            /> :
            <img className="planetImage"
                src={`/planets/${props.boardSquare.planet}-planet.jpg`} 
                alt={props.boardSquare.planet}
            /> // Planet image + cat image on top
        }
    </div>
);

export default Planet