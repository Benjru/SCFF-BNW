import React from "react";
 

const Planet = (props) => ( // Planet image + cat image on top
    <div>
        {
            props.boardSquare.playerOnSquare === ""?
            <React.Fragment>
                <img className="planetImage"
                    src={`/planets/${props.boardSquare.planet}-planet.jpg`} 
                    alt={props.boardSquare.planet}
                />
            </React.Fragment> :
            <React.Fragment>
                <img className="planetImage"
                    src={`/planets/${props.boardSquare.planet}-planet.jpg`} 
                    alt={props.boardSquare.planet}
                /> 
                {/* <ImageBackground source={`/planets/${props.boardSquare.planet}-planet.jpg`} className="planetImage">    
                    <img className="catOnSquare"
                        src={`/cats/${props.boardSquare.playerOnSquare.cat.name}-cat.png`}
                        alt={props.boardSquare.catOnSquare}
                    />
                </ImageBackground> */}
            </React.Fragment>
        }
    </div>
);

export default Planet
