import React from "react";
 

const Planet = (props) => ( // Planet image + cat image on top
    <div>
        {
            props.planet.cats.length === 0?
            <React.Fragment>
                <img className="planetImage"
                    src={`/planets/${props.planetName}-planet.jpg`} 
                    alt={props.planetName}
                />
            </React.Fragment> :
            <React.Fragment>
                <div className="ppiContainer">

                    <div className="catPlanetIndicator">
                        {/* <h1>catOnPlanet</h1> */}
                        {
                            props.planet.cats.map(catOnPlanet => (
                                // console.log("Inside Planet component. catOnPlant: " + catOnPlanet.name)
                                <h1>{catOnPlanet.name}</h1>
                            ))
                        }
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
