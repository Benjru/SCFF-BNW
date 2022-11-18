//FrontendGameStateController 
import React, { Component } from "react";
import {RestockAction, TravelAction, FightFascismAction} from './CatComponents';
import Planet from "./Planet";
import FascismBar from "./FascismBar";
import { allPlanets, allResistCards } from "../constants";

class GameBoard extends Component{ // with backend: remove planets from state variable and then in componentDidMount make API call to get planets, add to setState

    selectPlanet = (planetPosition) => {
        if (this.props.state.currTurn === this.props.state.myCat.playerId){
            this.props.selectPlanet(planetPosition);
        }
    }

    render() {
        return (
            <div className="gameBoard">
                {console.log("travelling? -> " + this.props.state.myCat.travelling)}
                {
                    this.props.state.planets.map(planet => (
                        <div className="boardSquare" key={planet} onClick={()=>{this.selectPlanet(planet.position)}}>
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
    useAction = (action) => {
        this.props.useAction(action);
    }

    // checkPlanetSelected = () => {
    //     if (!this.props.state.planetSelected){
    //         window.setTimeout(this.checkPlanetSelected, 100);
    //     }
    //     else{
    //         return true
    //     }
    // }

    // useCard = (cardFromDeck) => {
    //     if (cardFromDeck.name === 'teleport'){
    //         this.props.travel();
    //         if (this.checkPlanetSelected()){
    //             console.log("calling useCard function")
    //             this.props.useCard(cardFromDeck);
    //         }
    //     }
    //     this.props.useCard(cardFromDeck);
    // }


    render(){
        console.log("myCat: (in turn display)" + JSON.stringify(this.props.state.myCat));
        console.log("myCat hand (in TurnDisplay): " +  JSON.stringify(this.props.state.myCat[0].hand));
        const myCat = this.props.state.myCat[0];
        return(
            this.props.state. myCat.travelling?
            <div>
                <h1 className="turnText">Select planet to travel to</h1>
            </div>:
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
                                    onClick={() => this.useAction(cardFromDeck)}
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

