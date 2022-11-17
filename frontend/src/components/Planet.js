import React from "react";
 

const Planet = (props) => ( // Planet image + cat image on top
    <div>
        {
            props.planet.catOnPlanet?
            <React.Fragment>
                <img className="planetImage"
                    src={`/planets/${props.planetName}-planet.jpg`} 
                    alt={props.planetName}
                />
            </React.Fragment> :
            <React.Fragment>
                <div className="ppiContainer">

                    <div className="catPlanetIndicator">
                        <h1>{props.planet.catOnPlanet.name}</h1>
                    </div>

                    <img className="planetImage"
                        src={`/planets/${props.planetName}-planet.jpg`} 
                        alt={props.planetName}
                    /> 

                </div>
            </React.Fragment>
        }
    </div>
);

export default Planet
