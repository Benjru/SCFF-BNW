import React from "react";

const Planet = (props) => ( // Planet image + cat image on top
    <div>
        <p className="planetLabel">{props.boardSquare.planet}</p> 
        {
            props.boardSquare.catOnSquare === null ?
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
            </React.Fragment>
        }
    </div>
);

export default Planet

{/* <div className="fascismLevelBar">
                <div className="fascistSquare">
                    <div className="empty"/>
                </div>
                <div className="fascistSquare">
                    <div className="empty"/>
                </div>
                <div className="fascistSquare">
                    <div className="empty"/>
                </div>
                <div className="fascistSquare">
                    <div className="empty"/>
                </div>
                <div className="liberationSquare">
                    <div className="empty"/>
                </div>
                <div className="liberationSquare">
                    <div className="empty"/>
                </div>
                <div className="liberationSquare">
                    <div className="empty"/>
                </div>
                <div className="liberationSquare">
                    <div className="empty"/>
                </div>
            </div> */}