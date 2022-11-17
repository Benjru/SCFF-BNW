//FrontendGameStateController 
import React, { Component } from "react";
import {RestockAction, TravelAction, FightFascismAction} from './CatComponents';
import Planet from "./Planet";
import FascismBar from "./FascismBar";

class GameBoard extends Component{ // with backend: remove planets from state variable and then in componentDidMount make API call to get planets, add to setState


    render() {
        return (
            <div className="gameBoard">
                {
                    this.props.boardSquares.map(boardSquare => (
                        <div className="boardSquare" key={boardSquare.planet}>
                            <p className="planetLabel">{boardSquare.planet}</p> 
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

class TurnDisplay extends Component { // Knows current turn and renders current cat's hand, and actions

    actionCount = 0;
    currTurn = 1;
    hand = this.props.cats[this.currTurn-1].hand;

    // Pass up to parent component 
    updateHand = (catIndex, hand) => {
        this.props.updateHand(catIndex, hand)
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
            this.hand = this.props.cats[this.currTurn-1].hand;
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
            const cat = this.props.cats[this.currTurn-1];
            if (card === '+1 liberation'){
                this.props.boardSquares.map((boardSquare, i) => {
                    if (boardSquare.catOnSquare.currPlanet === cat.currPlanet){
                        // Then update fascism level
                        this.updateFascismLevel(i, boardSquare.fascismLevel - 1);
                    }
                    return 0;
                });
            }
            else if (card === 'ears' || card === 'paw' || card === 'tail' || card === 'whiskers'){
                this.props.boardSquares.map((boardSquare, i) => {
                    if (boardSquare.catOnSquare.currPlanet === cat.currPlanet){
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
        let removed = false;
        let i = 0;
        while (i < array.length && !removed){
            if(array[i]===item){
                array.splice(i,1);
                i--;
                removed = true;
            }
            i++;
        }
        return array;
    }

    render(){
        const cat = this.props.cats[this.currTurn-1];
        return(
            <div className="turnContainer">
                <p className="centeredText">P{cat.catNum}</p>
                <img
                    className="currentTurnCat"
                    src={`/cats/${cat.name}-cat.png`}
                    alt={cat}
                />
                <div className="turnHandContainer">
                    {cat.hand.map(card => (
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
                    <RestockAction useAction={this.useAction} updateHand={this.updateHand} cats={this.props.cats} catIndex={this.currTurn-1}/>
                    <TravelAction useAction={this.useAction}/>
                    <FightFascismAction useAction={this.useAction} boardSquares={this.props.boardSquares} cats={this.props.cats} catIndex={this.currTurn-1} updateFascismLevel={this.updateFascismLevel}/>
                </div>
            </div>
        );
    }

}

export {GameBoard, TurnDisplay};

