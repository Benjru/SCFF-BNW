//FrontendGameStateController 
import React, { Component } from "react";
import {RestockAction, TravelAction, FightFascismAction} from './FrontendCatController';
import Planet from "../components/Planet";
import FascismBar from "../components/FascismBar";

class GameBoard extends Component{ // with backend: remove planets from state variable and then in componentDidMount make API call to get planets, add to setState


    render() {
        return (
            <div className="gameBoard">
                {
                    this.props.boardSquares.map(boardSquare => (
                        <div className="boardSquare" key={boardSquare.planet}>
                            {/* component should take board square */}
                            <Planet boardSquare={boardSquare}/>
                            <FascismBar fascismLevel={boardSquare.fascismLevel}/>
                        </div>
                    ))
                }
            </div>
        );
    }
}

class TurnDisplay extends Component { // Knows current turn and renders current player's hand, and actions

    actionCount = 0;
    currTurn = 1;
    hand = this.props.players[this.currTurn-1].hand;

    // Pass up to parent component 
    updateHand = (playerIndex, hand) => {
        this.props.updateHand(playerIndex, hand)
    }

    // Pass up to parent component
    updateFascismLevel = (index, fascismLevel) => {
        this.props.updateFascismLevel(index, fascismLevel);
    }

    // Uses an action, if 3 have been used, update turn by calling function from parent
    useAction = () => {
        this.actionCount++;
        if (this.actionCount===3){ // Max actions per turn
            this.props.updateTurn();
            this.actionCount = 0;
            if (this.currTurn === 1){ //Figure out a better way to check turn
                this.currTurn = 2;
            }
            else{
                this.currTurn = 1;
            }
            this.hand = this.props.players[this.currTurn-1].hand;
            this.props.updateTurn(this.currTurn); // not that important
        }
    }

    
    // Uses a card, and then uses an action using function above
    useCard = (card) => {
        //map card to appropriate card handling function. 
        if (this.hand.length === 0){
            alert("Your hand is empty!");
        }
        else{
            console.log("used: " + card)
            this.hand = this.removeItemFromArray(this.hand, card);
            this.props.updateHand(this.currTurn-1, this.hand);
            const player = this.props.players[this.currTurn-1];
            if (card === '+1 liberation'){
                this.props.boardSquares.map((boardSquare, i) => {
                    if (boardSquare.playerOnSquare.currPlanet === player.currPlanet){
                        // Then update fascism level
                        this.updateFascismLevel(i, boardSquare.fascismLevel - 1);
                    }
                    return 0;
                });
            }
            else if (card === 'ears' || card === 'paw' || card === 'tail' || card === 'whiskers'){
                this.props.boardSquares.map((boardSquare, i) => {
                    if (boardSquare.playerOnSquare.currPlanet === player.currPlanet){
                        // Then update fascism level
                        this.updateFascismLevel(i, boardSquare.fascismLevel - 2);
                    }
                    return 0;
                });
            }
            console.log(this.hand)
        }
        this.useAction();
    }

    removeItemFromArray = (array, item) => { 
        for(var i in array){
            if(array[i]===item){
                array.splice(i,1);
                i--;
            }
        }
        return array;
    }

    render(){
        const player = this.props.players[this.currTurn-1];
        return(
            <div className="turnContainer">
                <p className="centeredText">P{player.playerNum}</p>
                <img
                    className="currentTurnCat"
                    src={`/cats/${player.cat.name}-cat.png`}
                    alt={player.cat}
                />
                <div className="turnHandContainer">
                    {player.hand.map(card => (
                        <img
                            src={`/resist_cards/${card}-card.jpg`}
                            onClick={() => this.useCard(card)}
                            alt={card}
                            key={Math.random()}
                            className="card"
                        />
                    ))}
                </div>
                <div className="break"/>
                <div className="turnActionContainer">
                    <RestockAction useAction={this.useAction} updateHand={this.updateHand} players={this.props.players} playerIndex={this.currTurn-1}/>
                    <TravelAction useAction={this.useAction}/>
                    <FightFascismAction useAction={this.useAction} boardSquares={this.props.boardSquares} players={this.props.players} playerIndex={this.currTurn-1} updateFascismLevel={this.updateFascismLevel}/>
                </div>
            </div>
        );
    }

}

export {GameBoard, TurnDisplay};

