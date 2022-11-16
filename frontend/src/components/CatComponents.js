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
        this.props.startGame(this.props.state.players);
    }

    render() {
        return (
            <div className="catSelect">
                {console.log("CatComponents getting props state: " + JSON.stringify(this.props.state))}
                {
                    this.props.state.readyToStart ? 
                    <div>
                        <p className="centeredText">Let your fight begin</p>
                        <div className="break"/>
                        <button onClick={this.startGame} className="startButton">Begin</button>
                    </div> :
                    <React.Fragment>
                        <p className="centeredText">PLAYER {this.props.state.currPlayerSelecting}</p> 
                        <br/>
                        <div className="catSelectContainer">
                            {
                                this.props.state.cats.map(cat => (
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
        let hand = this.props.players[this.props.playerIndex].hand;
        if (hand.length === 4){
            alert("You cannot restock");
        }
        else{
            while (hand.length < 4){
                const randomPosition = Math.floor(Math.random() * allResistCards.length);
                console.log(randomPosition)
                const card = allResistCards[randomPosition];
                hand.push(card);
                this.props.updateHand(this.props.playerIndex, hand)
            }
            this.props.useAction();
        }
    }

    render(){
        return(
            <div>
                <button onClick={this.restock} className="actionButton">Restock</button>
            </div>
        );
    }
}

class TravelAction extends Component{

    travel = () => { // change to API call
        console.log("traveling");
        this.props.useAction();
    }

    render(){
        return(
            <div>
                <button onClick={this.travel} className="actionButton">Travel</button>
            </div>
        );
    }
}

class FightFascismAction extends Component{

    fightFascism = () => { // change to API call
        console.log("fighting fascism");
        const player = this.props.players[this.props.playerIndex]; // add curr planet property to cat
        this.props.boardSquares.map((boardSquare, i) => {
            console.log(boardSquare.playerOnSquare.currPlanet)
            console.log(player.currPlanet);
            if (boardSquare.playerOnSquare.currPlanet === player.currPlanet){
                // Then update fascism level
                console.log("boardSquare position: " + i)
                if (boardSquare.fascismLevel > 0){
                    this.props.updateFascismLevel(i, boardSquare.fascismLevel - 1);
                    this.props.useAction();
                }
                else{
                    alert("There is no fascism to fight on this planet!")
                }
            }
            return 0;
        });
    }

    render(){
        return(
            <div>
                <button onClick={this.fightFascism} className="actionButton">Fight Fascism</button>
            </div>
        );
    }
}


export {SelectCat, RestockAction, TravelAction, FightFascismAction};