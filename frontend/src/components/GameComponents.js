//FrontendGameStateController 
import React, { Component } from "react";
import {RestockAction, TravelAction, FightFascismAction} from './CatComponents';
import Planet from "./Planet";
import FascismBar from "./FascismBar";
import { allPlanets, allResistCards } from "../constants";

class GameBoard extends Component{ // with backend: remove planets from state variable and then in componentDidMount make API call to get planets, add to setState


    render() {
        return (
            <div className="gameBoard">
                {
                    this.props.state.planets.map(planet => (
                        <div className="boardSquare" key={planet}>
                            <p className="planetLabel">{allPlanets[planet.number-1]}</p> 
                            {/* component should take board square */}
                            <Planet state={this.props.state} planet={planet} planetName={allPlanets[planet.number-1]}/>
                            {console.log("planet.fascismLevel (in GameBoard): " + planet.fascismLevel)}
                            <FascismBar fascismLevel={planet.fascismLevel}/>
                        </div>
                    ))
                }
            </div>
        );
    }
}

class TurnDisplay extends Component { // Knows current turn and renders current cat's hand, and actions
//     // Pass up to parent component 
//     // updateHand = (catIndex, hand) => {
//     //     this.props.updateHand(catIndex, hand)
//     // }

//     // // Pass up to parent component
//     // updateFascismLevel = (index, fascismLevel) => {
//     //     this.props.updateFascismLevel(index, fascismLevel);
//     // }

//     // Uses an action, if 3 have been used, update turn by calling function from parent
    useAction = () => {
        // this.actionCount++;
        // if (this.actionCount===3){ // Max actions per turn
        //     this.props.updateTurn();
        //     this.actionCount = 0;
        //     if (this.currTurn === 1){ //Figure out a better way to check turn
        //         this.currTurn = 2;
        //     }
        //     else{
        //         this.currTurn = 1;
        //     }
        //     this.hand = this.props.cats[this.currTurn-1].hand;
        //     this.props.updateTurn(this.currTurn); // not that important
        // }
        this.props.useAction();
    }

    
//     // // Uses a card, and then uses an action using function above
//     // useCard = (card) => {
//     //     //map card to appropriate card handling function. 
//     //     if (this.hand.length === 0){
//     //         alert("Your hand is empty!");
//     //     }
//     //     else{
//     //         console.log("used: " + card)
//     //         this.hand = this.removeItemFromArray(this.hand, card);
//     //         this.props.updateHand(this.currTurn-1, this.hand);
//     //         const cat = this.props.cats[this.currTurn-1];
//     //         if (card === '+1 liberation'){
//     //             this.props.boardSquares.map((boardSquare, i) => {
//     //                 if (boardSquare.catOnSquare.currPlanet === cat.currPlanet){
//     //                     // Then update fascism level
//     //                     this.updateFascismLevel(i, boardSquare.fascismLevel - 1);
//     //                 }
//     //                 return 0;
//     //             });
//     //         }
//     //         else if (card === 'ears' || card === 'paw' || card === 'tail' || card === 'whiskers'){
//     //             this.props.boardSquares.map((boardSquare, i) => {
//     //                 if (boardSquare.catOnSquare.currPlanet === cat.currPlanet){
//     //                     // Then update fascism level
//     //                     this.updateFascismLevel(i, boardSquare.fascismLevel - 2);
//     //                 }
//     //                 return 0;
//     //             });
//     //         }
//     //         console.log(this.hand)
//     //     }
//     //     this.useAction();
//     // }

    useCard = (cardFromDeck) => {
        this.props.useCard(cardFromDeck);
    }


    render(){
        console.log(this.props.state.myCat);
        console.log("myCat hand (in TurnDisplay): " +  JSON.stringify(this.props.state.myCat[0].hand));
        const myCat = this.props.state.myCat[0];
        return(
            <div className="turnContainer">
                <p className="centeredText">P{myCat.playerId+1}</p>
                <img
                    className="currentTurnCat"
                    src={`/cats/${myCat.name}-cat.png`}
                    alt={myCat}
                />
                <div className="turnHandContainer">

                    {
                        myCat.hand.map(card => {
                            let cardFromDeck;
                            let cardToFindId = card.cardId;
                            if (card.cardId === 'ResistCard_F'){
                                cardToFindId = cardToFindId + "_" + card.cardEffect;
                            }
                            cardFromDeck = allResistCards.find(resistCard => resistCard.cardId === cardToFindId);
                            let cardName = cardFromDeck.name;
                            console.log("cardName: " + cardName);
                            return(
                                <img
                                    src={`/resist_cards/${cardName}-card.jpg`}
                                    onClick={() => this.useCard(cardFromDeck)}
                                    alt={card}
                                    key={Math.random()}
                                    className="card"
                                />
                            )
                        })
                    }
                </div>
                <div className="break"/>
                <div className="turnActionContainer">
                    <RestockAction state={this.props.state} useAction={this.useAction}/>
                    <TravelAction state={this.props.state} useAction={this.useAction}/>
                    <FightFascismAction state={this.props.state} useAction={this.useAction} />
                </div>
            </div>
        );
    }

}

export {GameBoard};
export {TurnDisplay};

