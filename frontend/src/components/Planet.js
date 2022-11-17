import React from "react";
 

const Planet = (props) => ( // Planet image + cat image on top
    <div>
        {/* {console.log("CAT ON SQUARE!!!!: " + props.boardSquare.playerOnSquare.cat.name)} */}
        {
            props.boardSquare.playerOnSquare === ""?
            <div>
                <img className="planetImage"
                    src={`/planets/${props.boardSquare.planet}-planet.jpg`} 
                    alt={props.boardSquare.planet}
                />
            </div> :

            <div className="ppiContainer">

                <div className="playerPlanetIndicator">
                    <h1>{props.boardSquare.playerOnSquare.cat.name}</h1>
                </div>

                <img className="planetImage"
                    src={`/planets/${props.boardSquare.planet}-planet.jpg`} 
                    alt={props.boardSquare.planet}
                /> 

                {console.log("CAT ON SQUARE!!!!: " + props.boardSquare.playerOnSquare.cat.name)}
                
            </div>
        }
    </div>
);

export default Planet
