import React, { Component } from "react";
import Cats from "../components/Cats";
import SelectCat from "../components/SelectCat";

class CatView extends Component{

    setCat = (cat) => {
        this.props.setCat(cat)
    }

    createHand = () => { 
        this.props.createHand();
    }

    startGame = () => {
        this.props.startGame(this.props.state.cats);
    }

    render(){
        // console.log("CatView is getting props: " + JSON.stringify(this.props.state))
        return(
            <React.Fragment>
                <SelectCat state={this.props.state} setCat={this.setCat} startGame={this.startGame}/> 
                <Cats cats={this.props.state.cats}/>
            </React.Fragment>
        );
    }
}

export default CatView