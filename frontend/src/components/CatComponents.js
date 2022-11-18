//FrontendCatController 
import React, { Component } from "react";
import { allResistCards } from "../constants";

class SelectCat extends Component{

    setCat = (cat) => {
        this.props.setCat(cat);
    }

    createHand = () => { // change to get hand from backend
        this.props.createHand();
    }

    startGame = () => {
        this.props.startGame(this.props.state.cats);
    }

    render() {
        return (
            <div className="catSelect">
                {console.log("SelectCat getting props state: " + JSON.stringify(this.props.state))}
                {
                    this.props.state.catSelected ? 
                    <div>
                        <p className="centeredText">Waiting for other players</p>
                        <div className="break"/>
                        {console.log("readyToStart: " + this.props.state.readyToStart)}
                        {
                            this.props.state.readyToStart?
                            <button onClick={this.startGame} className="startButton">Begin</button>:
                            <React.Fragment/>
                        }
                    </div> :
                    <React.Fragment>
                        <p className="centeredText">SELECT CAT</p> 
                        <br/>
                        <div className="catSelectContainer">
                            {
                                this.props.state.allCats.map(cat => (
                                    <img 
                                        onClick={() => this.setCat(cat)}
                                        key={cat.name}
                                        className="cat"
                                        src={`/cats/${cat.name}-cat.png`} 
                                        alt={cat}
                                    />
                                ))
                            }
                        </div>
                    </React.Fragment>
                }
                <div className="break"/>
            </div>
        );
    }
}

//Actions, click card to fight fascism

class RestockAction extends Component{

    restock = () => { // change to API call
        let hand = this.props.state.myCat.hand;
        if (hand.length === 4){
            alert("You cannot restock");
        }
        else{
            this.props.useAction('restock');
        }
    }

    render(){
        return(
            this.props.state.currTurn === this.props.state.myCat.playerId?
            <div>
                <button onClick={this.restock} className="actionButton">Restock</button>
            </div>:
            <div>
                <button className="actionButton">Restock</button>
            </div>
        );
    }
}

class TravelAction extends Component{

    travel = () => { // change to API call
        console.log("traveling");
        this.props.useAction('travel');
    }

    render(){
        return(
            this.props.state.currTurn === this.props.state.myCat.playerId?
            <div>
                <button onClick={this.travel} className="actionButton">Travel</button>
            </div>:
            <div>
                <button className="actionButton">Travel</button>
            </div>
        );
    }
}

class FightFascismAction extends Component{

    fightFascism = () => { // change to API call
        console.log("fighting fascism");
        this.props.useAction('fightFascism');
    }

    render(){
        return(
            this.props.state.currTurn === this.props.state.myCat.playerId?
            <div>
                <button onClick={this.fightFascism} className="actionButton">Fight Fascism</button>
            </div>:
            <div>
                <button className="actionButton">Fight Fascism</button>
            </div>
        );
    }
}


export {SelectCat, RestockAction, TravelAction, FightFascismAction};