import React, { Component } from "react";

export default class FightFascismAction extends Component{

    fightFascism = () => { 
        console.log("fighting fascism");
        this.props.useAction('fightFascism');
    }

    render(){
        return(
            <div>
                <button onClick={this.fightFascism} className="actionButton">Fight Fascism</button>
            </div>
        );
    }
}