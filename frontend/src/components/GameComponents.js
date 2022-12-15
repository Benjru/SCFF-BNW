//FrontendGameStateController 
import React, { Component } from "react";
import {RestockAction, TravelAction, FightFascismAction} from './CatComponents';
import Planet from "./Planet";
import FascismBar from "./FascismBar";
import { allPlanets, allResistCards } from "../constants";
import ScratchBar from "./ScratchBar";

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
                            <p className="planetLabel">{`#${planet.number}`} {allPlanets[planet.number-1].name}</p> 
                            <Planet state={this.props.state} planet={planet} planetSymbol={planet.symbol} planetName={allPlanets[planet.number-1].name}/>
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

    useAction = (cardFromDeck) => {
        if (cardFromDeck.name === 'teleport'){
            this.travel('teleport')
        }
        else if (cardFromDeck.name === 'heal 1'){
            this.heal(1);
        }
        else if (cardFromDeck.name === 'heal 2'){
            this.heal(2);
        }
        else{
            this.props.useAction(cardFromDeck);
        }
    }


    travel = (travelType) => {
        this.props.travel(travelType);
    }

    heal = (numToHeal) => {
        this.props.heal(numToHeal);
    }

    selectCatToHeal = (cat) => {
        this.props.selectCatToHeal(cat);
    }

    render(){
        console.log(this.props.state.myCat);
        //console.log("myCat hand (in TurnDisplay): " +  JSON.stringify(this.props.state.myCat.hand));
        const myCat = this.props.state.myCat;
        return(
            this.props.state.myCat.travelling?
            <div>
                <h1 className="turnText">Select planet to travel to</h1>
            </div>:
            this.props.state.myCat.healing?
            <div>
                <h1 className="turnText">Select {myCat.numToHeal} to heal</h1>
                {
                    this.props.state.cats.map(cat => {
                        if (cat.currPlanet === this.props.state.myCat.currPlanet){
                            return(
                                <div key={cat.catNum}>
                                    <img 
                                        className="selectedCat"
                                        src={`/cats/${cat.name}-cat.png`} 
                                        onClick={() => this.selectCatToHeal(cat)}
                                        alt={cat.name}
                                    />
                                </div>
                            )
                        }
                        return (
                            <React.Fragment/>
                        )
                    })
                }
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
                    <TravelAction state={this.props.state} travel={this.travel}/>
                    <FightFascismAction state={this.props.state} useAction={this.useAction}/>
                </div>
                <ScratchBar state={this.props.state}/>
            </div>
        );
    }

}

export {GameBoard};
export {TurnDisplay};

