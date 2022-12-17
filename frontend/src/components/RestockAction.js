import React, { Component } from "react";

export default class RestockAction extends Component{

    restock = () => { 
        this.props.useAction('restock');
    }

    render(){
        return(
            <div>
                <button onClick={this.restock} className="actionButton">Restock</button>
            </div>
        );
    }
}