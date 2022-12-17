import React, { Component } from "react";

export default class TravelAction extends Component{

    travel = (travelType) => { 
        console.log("traveling with travelType: " + travelType);
        if (this.props.state.currTurn === this.props.state.myCat.playerId){
            this.props.travel(travelType);
        }
    }

    render(){
        return(
            <div>
                <button onClick={() => {this.travel('travel')}} className="actionButton">Travel</button>
            </div>
        );
    }
}