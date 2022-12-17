
import React, { Component } from "react";

export default class GrabAgent extends Component{

    grabAgent = () => {
        this.props.grabAgent();
    }

    render(){
        return(
            <div>
                <button onClick={this.grabAgent} className="actionButton">Grab Agent</button>
            </div>
        );
    }
}
