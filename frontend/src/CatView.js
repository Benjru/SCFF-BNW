import React, { Component } from "react";
import Players from "./components/Players";
import { SelectCat } from "./components/CatComponents";

class CatView extends Component{

    setCat = (cat) => {
        this.props.setCat(cat)
    }

    createHand = () => { // change to get hand from backend
        this.props.createHand();
    }

    startGame = () => {
        this.props.startGame(this.props.state.players);
    }

    render(){
        console.log("CatView is getting props: " + JSON.stringify(this.props.state))
        return(
            <React.Fragment>
                <SelectCat state={this.props.state} setCat={this.setCat} startGame={this.startGame}/> 
                <Players players={this.props.state.players}/>
            </React.Fragment>
        );
    }
}

export default CatView