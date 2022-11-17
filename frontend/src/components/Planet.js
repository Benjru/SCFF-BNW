import React from "react";
 

const Planet = (props) => ( // Planet image + cat image on top
    <div>
        {
            props.boardSquare.catOnSquare === ""?
            <React.Fragment>
                <img className="planetImage"
                    src={`/planets/${props.boardSquare.planet}-planet.jpg`} 
                    alt={props.boardSquare.planet}
                />
            </React.Fragment> :
            <React.Fragment>
                <div className="ppiContainer">

                    <div className="catPlanetIndicator">
                        <h1>{props.boardSquare.catOnSquare.name}</h1>
                    </div>

                    <img className="planetImage"
                        src={`/planets/${props.boardSquare.planet}-planet.jpg`} 
                        alt={props.boardSquare.planet}
                    /> 

                </div>
            </React.Fragment>
        }
    </div>
);

export default Planet
