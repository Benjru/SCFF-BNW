import React from "react";
 

const Planet = (props) => ( // Planet image + cat image on top
    <div>
        {
            props.planet.cats.length === 0?
            <React.Fragment>
                {/* <img className="planetImage"
                    src={`/planets/${props.planetName}-planet.jpg`} 
                    alt={props.planetName}
                /> */}
                {
                    console.log("symbol: " + JSON.stringify(props.planetSymbol))
                }
                <div className="ppiContainer">
                    <div className="planetSymbolContainer">
                        <img
                            className="planetSymbol"
                            src={`/resist_cards/${props.planetSymbol}-symbol.jpg`}
                            alt={props.planetName}
                        />
                    </div>

                    <img className="planetImage"
                        src={`/planets/${props.planetName}-planet.jpg`} 
                        alt={props.planetName}
                    /> 
                </div>
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
                        <img
                            className="planetSymbolWithCat"
                            src={`/resist_cards/${props.planetSymbol}-symbol.jpg`}
                            alt={props.planetName}
                        />
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
