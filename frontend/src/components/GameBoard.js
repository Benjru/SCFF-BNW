import React, {Component} from "react";
import Planet from "./Planet";
import FascismBar from "./FascismBar";
import { allPlanets } from "../constants";

export default class GameBoard extends Component{ // with backend: remove planets from state variable and then in componentDidMount make API call to get planets, add to setState

    selectPlanet = (planetPosition) => {
        if (this.props.state.currTurn === this.props.state.myCat.playerId){
            this.props.selectPlanet(planetPosition);
        }
    }

    render() {
        return (
            <div className="gameBoard">
                {console.log("travelling? -> " + this.props.state.myCat.travelling)}
                {
                    this.props.state.planets.map(planet => (
                        <div className="boardSquare" key={planet} onClick={()=>{this.selectPlanet(planet.position)}}>
                            <p className="planetLabel">{`#${planet.number}`} {allPlanets[planet.number-1].name}</p> 
                            <Planet state={this.props.state} planet={planet} planetSymbol={planet.symbol} planetName={allPlanets[planet.number-1].name}/>
                            {console.log("planet.fascismLevel (in GameBoard): " + planet.fascismLevel)}
                            <FascismBar fascismLevel={planet.fascismLevel}/>
                        </div>

                    ))
                }
            </div>
        );
    }
}